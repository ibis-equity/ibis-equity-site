#Requires -Version 5.1
<#
.SYNOPSIS
    Start frontend and backend services, then run backend smoke tests.

.DESCRIPTION
    This script clears ports 4202 and 8010, starts the Angular frontend (port 4202)
    and FastAPI backend (port 8010) concurrently, waits for them to be ready,
    then runs a comprehensive set of smoke tests against backend endpoints.

.EXAMPLE
    .\start-and-test.ps1
#>

param(
    [int]$FrontendPort = 4202,
    [int]$BackendPort = 8010,
    [int]$StartupWaitSeconds = 15,
    [int]$HealthCheckRetries = 10
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Continue"

# Colors for output
function Write-Heading {
    param([string]$Text)
    Write-Host "`n" -NoNewline
    Write-Host "╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "║ $($Text.PadRight(59)) ║" -ForegroundColor Cyan
    Write-Host "╚═══════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
    Write-Host ""
}

function Write-Section {
    param([string]$Text)
    Write-Host "`n$Text" -ForegroundColor Yellow
    Write-Host ("-" * $Text.Length) -ForegroundColor Yellow
}

function Write-Success {
    param([string]$Text)
    Write-Host "✓ $Text" -ForegroundColor Green
}

function Write-Error-Custom {
    param([string]$Text)
    Write-Host "✗ $Text" -ForegroundColor Red
}

function Write-Info {
    param([string]$Text)
    Write-Host "ℹ $Text" -ForegroundColor Cyan
}

function Write-Warning-Custom {
    param([string]$Text)
    Write-Host "⚠ $Text" -ForegroundColor Yellow
}

# Step 1: Clear any processes on target ports
Write-Heading "STEP 1: Clear Existing Processes"

try {
    $procIds = @()
    foreach ($port in @($FrontendPort, $BackendPort)) {
        $connections = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
        foreach ($conn in $connections) {
            $procIds += $conn.OwningProcess
        }
    }
    
    if ($procIds.Count -gt 0) {
        Write-Info "Found processes on ports $BackendPort and/or $FrontendPort, terminating..."
        $procIds | Select-Object -Unique | ForEach-Object {
            Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue
            Write-Success "Terminated process $_"
        }
        Start-Sleep -Seconds 2
    } else {
        Write-Success "Ports $BackendPort and $FrontendPort are free"
    }
} catch {
    Write-Warning-Custom "Could not check port status: $_"
}

# Step 2: Start services
Write-Heading "STEP 2: Starting Services"

Write-Info "Spawning npm run start:full (frontend + backend concurrent)..."
$proc = Start-Process -FilePath "npm" -ArgumentList "run start:full" -NoNewWindow -PassThru
Write-Success "Services started (PID: $($proc.Id))"

Write-Info "Waiting $StartupWaitSeconds seconds for services to initialize..."
Start-Sleep -Seconds $StartupWaitSeconds

# Step 3: Verify services are responding
Write-Heading "STEP 3: Verify Services Are Running"

$backendReady = $false
$frontendReady = $false

# Check backend
Write-Info "Checking backend health..."
for ($i = 1; $i -le $HealthCheckRetries; $i++) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:$BackendPort/health" -Method GET -UseBasicParsing -TimeoutSec 2
        if ($response.StatusCode -eq 200) {
            Write-Success "Backend is healthy (http://localhost:$BackendPort)"
            $backendReady = $true
            break
        }
    } catch {
        Write-Info "Attempt $i/$HealthCheckRetries: Waiting for backend..."
        Start-Sleep -Seconds 2
    }
}

if (-not $backendReady) {
    Write-Error-Custom "Backend failed to respond after $HealthCheckRetries retries"
}

# Check frontend
Write-Info "Checking frontend availability..."
for ($i = 1; $i -le 5; $i++) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:$FrontendPort/" -Method GET -UseBasicParsing -TimeoutSec 2
        if ($response.StatusCode -eq 200) {
            Write-Success "Frontend is available (http://localhost:$FrontendPort)"
            $frontendReady = $true
            break
        }
    } catch {
        Write-Info "Attempt $i/5: Waiting for frontend..."
        Start-Sleep -Seconds 2
    }
}

if (-not $frontendReady) {
    Write-Warning-Custom "Frontend not responding yet (may still be compiling)"
}

if (-not $backendReady) {
    Write-Heading "SERVICE STARTUP FAILED"
    exit 1
}

# Step 4: Run smoke tests
Write-Heading "STEP 4: Backend Smoke Tests"

$testsPassed = 0
$testsFailed = 0

function Test-Endpoint {
    param(
        [string]$Name,
        [string]$Method,
        [string]$Endpoint,
        [string]$Body,
        [int]$ExpectedStatus
    )
    
    Write-Section "Test: $Name"
    
    try {
        $params = @{
            Uri = "http://localhost:$BackendPort$Endpoint"
            Method = $Method
            UseBasicParsing = $true
            TimeoutSec = 5
        }
        
        if ($Body) {
            $params['Body'] = $Body
            $params['ContentType'] = 'application/json'
        }
        
        $response = Invoke-WebRequest @params
        
        if ($response.StatusCode -eq $ExpectedStatus) {
            Write-Success "Status: $($response.StatusCode) (expected: $ExpectedStatus)"
            return $true
        } else {
            Write-Error-Custom "Status: $($response.StatusCode) (expected: $ExpectedStatus)"
            return $false
        }
    } catch {
        $statusCode = $_.Exception.Response.StatusCode.Value__
        if ($statusCode -eq $ExpectedStatus) {
            Write-Success "Status: $statusCode (expected: $ExpectedStatus) - validation error as expected"
            return $true
        } else {
            Write-Error-Custom "Request failed: $($_.Exception.Message)"
            return $false
        }
    }
}

# Test 1: Health check
if (Test-Endpoint -Name "Health Check" -Method GET -Endpoint "/health" -ExpectedStatus 200) {
    $testsPassed++
} else {
    $testsFailed++
}

# Test 2: Health config
if (Test-Endpoint -Name "Health Config" -Method GET -Endpoint "/health/config" -ExpectedStatus 200) {
    $testsPassed++
    try {
        $resp = Invoke-WebRequest -Uri "http://localhost:$BackendPort/health/config" -Method GET -UseBasicParsing
        $data = $resp.Content | ConvertFrom-Json
        Write-Info "  Ready: $($data.ready)"
    } catch {}
} else {
    $testsFailed++
}

# Test 3: KB health
if (Test-Endpoint -Name "Knowledge Base Health" -Method GET -Endpoint "/health/kb" -ExpectedStatus 200) {
    $testsPassed++
    try {
        $resp = Invoke-WebRequest -Uri "http://localhost:$BackendPort/health/kb" -Method GET -UseBasicParsing
        $data = $resp.Content | ConvertFrom-Json
        Write-Info "  Status: $($data.status)"
    } catch {}
} else {
    $testsFailed++
}

# Test 4: Contact form validation
if (Test-Endpoint -Name "Contact Form (Validation)" -Method POST -Endpoint "/api/contact/submit" -Body '{}' -ExpectedStatus 422) {
    $testsPassed++
} else {
    $testsFailed++
}

# Test 5: RAG query with real payload
Write-Section "Test: RAG Query (Functional)"
try {
    $ragPayload = @{
        question = "What is Ibis Equity Consulting?"
        topK = 5
    } | ConvertTo-Json
    
    $resp = Invoke-WebRequest -Uri "http://localhost:$BackendPort/api/bedrock/rag/query" `
        -Method POST -Body $ragPayload -ContentType 'application/json' -UseBasicParsing -TimeoutSec 10
    
    if ($resp.StatusCode -eq 200) {
        Write-Success "Status: 200"
        $data = $resp.Content | ConvertFrom-Json
        Write-Info "  Answer length: $($data.answer.Length) characters"
        Write-Info "  Sources: $($data.sources.Count)"
        $testsPassed++
    } else {
        Write-Error-Custom "Status: $($resp.StatusCode)"
        $testsFailed++
    }
} catch {
    Write-Warning-Custom "RAG query failed: $($_.Exception.Message)"
    Write-Info "  (This is expected if KB aliases are not configured)"
    $testsFailed++
}

# Test 6: Speech synthesis validation
if (Test-Endpoint -Name "Speech Synthesis (Validation)" -Method POST -Endpoint "/api/speech/synthesize" -Body '{}' -ExpectedStatus 422) {
    $testsPassed++
} else {
    $testsFailed++
}

# Summary
Write-Heading "Test Summary"
Write-Host ""
Write-Success "$testsPassed tests passed"
if ($testsFailed -gt 0) {
    Write-Error-Custom "$testsFailed tests failed"
}
Write-Host ""
Write-Info "Frontend: http://localhost:$FrontendPort"
Write-Info "Backend:  http://localhost:$BackendPort"
Write-Host ""

if ($testsFailed -eq 0) {
    Write-Success "All smoke tests passed! ✓"
    exit 0
} else {
    Write-Error-Custom "Some tests failed."
    exit 1
}
