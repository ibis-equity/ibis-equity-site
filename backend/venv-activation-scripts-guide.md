# Python Virtual Environment Activation Scripts: Complete Guide

This guide explains all four activation scripts generated in your virtual environment:

- [.venv/Scripts/activate](../.venv/Scripts/activate)
- [.venv/Scripts/activate.bat](../.venv/Scripts/activate.bat)
- [.venv/Scripts/activate.fish](../.venv/Scripts/activate.fish)
- [.venv/Scripts/Activate.ps1](../.venv/Scripts/Activate.ps1)

It covers what each script does, how they differ by shell, which variables they modify, how deactivation restores state, and common troubleshooting steps.

## 1) High-Level Purpose

All activation scripts do the same core job in different shell syntaxes:

1. Mark the current shell as using a specific virtual environment.
2. Prepend the virtual environment executables directory to PATH.
3. Optionally modify the shell prompt so the environment is visible.
4. Store prior shell state so it can be restored when deactivating.

After activation, python and pip resolve to executables inside the virtual environment first.

## 2) Script-by-Script Detailed Behavior

### 2.1 Bash-style script

- File: [.venv/Scripts/activate](../.venv/Scripts/activate)
- Target shells: bash, zsh, and other POSIX-like shells
- Usage model: sourced into the current shell process

Detailed flow:

1. Defines deactivate function.
- Restores PATH from _OLD_VIRTUAL_PATH.
- Restores PYTHONHOME from _OLD_VIRTUAL_PYTHONHOME.
- Restores prompt from _OLD_VIRTUAL_PS1.
- Unsets VIRTUAL_ENV and VIRTUAL_ENV_PROMPT.
- Optionally removes the deactivate function itself.

2. Calls deactivate nondestructive.
- Clears stale values from prior activation while keeping the function available.

3. Resolves and exports VIRTUAL_ENV.
- Includes special path conversion on CYGWIN, MSYS, and MINGW via cygpath.

4. Saves and updates PATH.
- _OLD_VIRTUAL_PATH stores original PATH.
- Venv Scripts directory is prepended.

5. Exports VIRTUAL_ENV_PROMPT.

6. Handles PYTHONHOME.
- Saves old value to _OLD_VIRTUAL_PYTHONHOME and unsets PYTHONHOME.

7. Updates prompt unless disabled.
- If VIRTUAL_ENV_DISABLE_PROMPT is not set, PS1 is prefixed with environment name.

8. Clears command lookup cache.
- hash -r ensures shell uses newly-prepended executables.

Why this matters:
- Without hash -r in shells that cache command locations, python could still point to old path until cache refresh.

### 2.2 Windows cmd script

- File: [.venv/Scripts/activate.bat](../.venv/Scripts/activate.bat)
- Target shell: cmd.exe
- Usage model: executed in the current cmd session

Detailed flow:

1. Turns command echo off.

2. Temporarily switches to UTF-8 code page.
- Captures current code page.
- Switches to 65001.
- Restores original code page before exiting script.

3. Sets VIRTUAL_ENV to venv path.

4. Ensures PROMPT has a baseline if missing.

5. Restores previous prompt and PYTHONHOME if old values exist.

6. Saves prompt and applies new prompt prefix.
- _OLD_VIRTUAL_PROMPT stores original PROMPT.
- PROMPT becomes (.venv) plus original prompt.

7. Saves and clears PYTHONHOME.

8. Restores old PATH if available, then captures current PATH if needed.

9. Prepends venv Scripts to PATH.

10. Sets VIRTUAL_ENV_PROMPT.

Why this matters:
- Code page handling avoids prompt and output corruption in UTF-8 content scenarios.

### 2.3 fish shell script

- File: [.venv/Scripts/activate.fish](../.venv/Scripts/activate.fish)
- Target shell: fish
- Usage model: sourced into current fish session

Detailed flow:

1. Defines deactivate function.
- Restores PATH and PYTHONHOME from old values.
- Removes VIRTUAL_ENV and VIRTUAL_ENV_PROMPT.
- Restores original fish prompt function if overridden.
- Optionally removes deactivate function itself.

2. Calls deactivate nondestructive.
- Clears prior activation state safely.

3. Exports VIRTUAL_ENV.

4. Saves and prepends PATH.
- _OLD_VIRTUAL_PATH stores original list.

5. Sets VIRTUAL_ENV_PROMPT.

6. Handles PYTHONHOME.
- Saves to _OLD_VIRTUAL_PYTHONHOME and removes current value.

7. Handles prompt via function override.
- fish_prompt is copied to _old_fish_prompt.
- New fish_prompt prints colored environment prefix then calls original prompt.
- Preserves prior command exit status.

Why this matters:
- fish prompt is function-based, not variable-based, so behavior differs from bash and cmd.

### 2.4 PowerShell script

- File: [.venv/Scripts/Activate.ps1](../.venv/Scripts/Activate.ps1)
- Target shell: PowerShell
- Usage model: invoked into current PowerShell session context

Detailed flow:

1. Includes comment-based help.
- Synopsis, description, parameters, examples, and notes on execution policy.

2. Defines optional parameters.
- VenvDir for explicit virtual environment path.
- Prompt for explicit prompt text.

3. Defines global deactivate function.
- Restores old prompt function.
- Restores PYTHONHOME.
- Restores PATH.
- Removes VIRTUAL_ENV and VIRTUAL_ENV_PROMPT.
- Removes prompt prefix variable.
- Optionally removes deactivate function itself.

4. Defines Get-PyVenvConfig helper.
- Reads pyvenv.cfg.
- Parses key = value pairs.
- Strips surrounding quotes when present.

5. Determines effective VenvDir.
- Uses parameter if provided.
- Otherwise derives from activation script location.

6. Determines effective prompt text.
- Priority order: Prompt parameter, pyvenv.cfg prompt, folder-name fallback.

7. Calls deactivate -nondestructive.

8. Sets Env:VIRTUAL_ENV and Env:VIRTUAL_ENV_PROMPT.

9. Optionally overrides prompt function.
- Stores original prompt in Function:_OLD_VIRTUAL_PROMPT.
- Creates read-only global prefix variable.
- New global prompt writes colored prefix then calls old prompt.

10. Saves and clears PYTHONHOME.

11. Saves PATH and prepends venv executable directory.

12. Includes signature block.
- Digital signature metadata block for script trust/integrity context.

Why this matters:
- This script is the most feature-rich and supports explicit parameters and pyvenv.cfg prompt customization.

## 3) Side-by-Side Mapping

| Concern | activate | activate.bat | activate.fish | Activate.ps1 |
|---|---|---|---|---|
| Shell type | POSIX-like | cmd.exe | fish | PowerShell |
| Main activation marker | VIRTUAL_ENV | VIRTUAL_ENV | VIRTUAL_ENV | Env:VIRTUAL_ENV |
| Prompt marker variable | VIRTUAL_ENV_PROMPT | VIRTUAL_ENV_PROMPT | VIRTUAL_ENV_PROMPT | Env:VIRTUAL_ENV_PROMPT |
| Save old PATH | _OLD_VIRTUAL_PATH | _OLD_VIRTUAL_PATH | _OLD_VIRTUAL_PATH | Env:_OLD_VIRTUAL_PATH |
| Save old PYTHONHOME | _OLD_VIRTUAL_PYTHONHOME | _OLD_VIRTUAL_PYTHONHOME | _OLD_VIRTUAL_PYTHONHOME | Env:_OLD_VIRTUAL_PYTHONHOME |
| Prompt mechanism | PS1 string | PROMPT variable | fish_prompt function override | prompt function override |
| Old prompt storage | _OLD_VIRTUAL_PS1 | _OLD_VIRTUAL_PROMPT | _old_fish_prompt + marker | Function:_OLD_VIRTUAL_PROMPT |
| Prompt-disable behavior | VIRTUAL_ENV_DISABLE_PROMPT | none explicit | VIRTUAL_ENV_DISABLE_PROMPT | VIRTUAL_ENV_DISABLE_PROMPT |
| Session reset entry | deactivate nondestructive | inline restore logic | deactivate nondestructive | deactivate -nondestructive |
| Extra special behavior | hash -r command cache reset | temporary UTF-8 code page switch | preserves fish exit status in prompt wrapper | parses pyvenv.cfg, supports parameters, signed script block |

## 4) Variable Lifecycle (Activation to Deactivation)

Common lifecycle across scripts:

1. Capture old state.
- PATH and often prompt and PYTHONHOME are saved into internal _OLD_ variables.

2. Apply new active state.
- VIRTUAL_ENV is set.
- Venv executable directory is placed first in PATH.
- Prompt is optionally updated.

3. Deactivate and restore.
- _OLD_ variables are copied back to active variables.
- VIRTUAL_ENV and VIRTUAL_ENV_PROMPT are removed.
- Optional helper functions are removed.

## 5) Practical Examples

### Example A: Why PYTHONHOME is cleared

If PYTHONHOME points to a global Python installation, Python inside the venv can resolve libraries incorrectly. Clearing PYTHONHOME avoids mixing global and venv interpreter paths.

### Example B: Why PATH is prepended, not appended

Prepending ensures the venv python and pip are selected first by command resolution.

### Example C: Why prompt override is shell-specific

- bash uses PS1 text.
- fish requires function override.
- PowerShell uses prompt function.
Because each shell draws prompts differently, activation must use shell-native mechanisms.

### Example D: Why deactivate nondestructive appears

The activation script first cleans previous state while keeping deactivate function available for the current activation lifecycle.

## 6) Usage Examples

### Bash/zsh

- source .venv/Scripts/activate
- python --version
- which python
- deactivate

### cmd.exe

- .venv\Scripts\activate.bat
- python --version
- where python
- deactivate is not function-based in cmd; restore occurs via activation script state handling and session behavior

### fish

- source .venv/Scripts/activate.fish
- python --version
- which python
- deactivate

### PowerShell

- . .venv/Scripts/Activate.ps1
- python --version
- Get-Command python
- deactivate

## 7) Troubleshooting

1. Script does not run in PowerShell.
- Likely execution policy restriction.
- Use process-scope policy for current shell session if needed.

2. Prompt does not show environment name.
- Check VIRTUAL_ENV_DISABLE_PROMPT.
- In cmd, behavior differs and may depend on current PROMPT state.

3. python still resolves globally.
- Check command cache behavior (bash hash -r handles this).
- Inspect PATH order after activation.

4. Nested activations create odd prompt/path behavior.
- Run deactivate before activating a different environment.

5. fish prompt looks wrong after deactivate.
- Ensure fish prompt function restoration completed and no custom prompt plugin conflicts exist.

## 8) Key Takeaways

1. All four scripts implement the same activation model with shell-specific syntax.
2. Most activation issues are prompt-function differences, PATH order, or policy restrictions.
3. PowerShell variant includes the most robust configuration and metadata handling.
4. Deactivation is a full state-restore operation, not just unsetting VIRTUAL_ENV.

## 9) Appendix: Line-Range Map by Script

This appendix maps meaningful line ranges to behavior so you can read each script quickly in context.

### 9.1 POSIX activate

- File: [.venv/Scripts/activate](../.venv/Scripts/activate)
- Total lines: 76

Line ranges:

1. [Lines 1-2](../.venv/Scripts/activate#L1): Usage note; script must be sourced.
2. [Lines 4-34](../.venv/Scripts/activate#L4): deactivate function definition and restore logic.
3. [Line 37](../.venv/Scripts/activate#L37): deactivate nondestructive pre-clean step.
4. [Lines 40-50](../.venv/Scripts/activate#L40): Platform-specific VIRTUAL_ENV path handling (including cygpath branch).
5. [Lines 52-55](../.venv/Scripts/activate#L52): Save old PATH and prepend venv Scripts path.
6. [Lines 57-58](../.venv/Scripts/activate#L57): Set VIRTUAL_ENV_PROMPT.
7. [Lines 60-66](../.venv/Scripts/activate#L60): Save and unset PYTHONHOME.
8. [Lines 68-72](../.venv/Scripts/activate#L68): Prompt update via PS1 unless disabled.
9. [Lines 74-76](../.venv/Scripts/activate#L74): hash -r command cache reset.

### 9.2 CMD activate.bat

- File: [.venv/Scripts/activate.bat](../.venv/Scripts/activate.bat)
- Total lines: 34

Line ranges:

1. [Line 1](../.venv/Scripts/activate.bat#L1): Echo disabled.
2. [Lines 3-9](../.venv/Scripts/activate.bat#L3): Save current code page and switch to UTF-8.
3. [Line 11](../.venv/Scripts/activate.bat#L11): Set VIRTUAL_ENV path.
4. [Lines 13-18](../.venv/Scripts/activate.bat#L13): Prompt defaults and restore of old prompt/PYTHONHOME.
5. [Lines 19-20](../.venv/Scripts/activate.bat#L19): Save and prefix PROMPT.
6. [Lines 21-22](../.venv/Scripts/activate.bat#L21): Save and clear PYTHONHOME.
7. [Lines 24-27](../.venv/Scripts/activate.bat#L24): Save/restore PATH state and prepend venv Scripts.
8. [Line 28](../.venv/Scripts/activate.bat#L28): Set VIRTUAL_ENV_PROMPT.
9. [Lines 30-34](../.venv/Scripts/activate.bat#L30): Restore prior code page.

### 9.3 fish activate.fish

- File: [.venv/Scripts/activate.fish](../.venv/Scripts/activate.fish)
- Total lines: 69

Line ranges:

1. [Lines 1-2](../.venv/Scripts/activate.fish#L1): Usage note; script must be sourced.
2. [Lines 4-31](../.venv/Scripts/activate.fish#L4): deactivate function restore and self-remove behavior.
3. [Line 34](../.venv/Scripts/activate.fish#L34): deactivate nondestructive pre-clean step.
4. [Line 36](../.venv/Scripts/activate.fish#L36): Set VIRTUAL_ENV.
5. [Lines 38-40](../.venv/Scripts/activate.fish#L38): Save old PATH, prepend venv Scripts, set VIRTUAL_ENV_PROMPT.
6. [Lines 42-45](../.venv/Scripts/activate.fish#L42): Save and unset PYTHONHOME.
7. [Lines 48-68](../.venv/Scripts/activate.fish#L48): Prompt override via fish_prompt function with status preservation.

### 9.4 PowerShell Activate.ps1

- File: [.venv/Scripts/Activate.ps1](../.venv/Scripts/Activate.ps1)
- Total lines: 529

Line ranges:

1. [Lines 1-49](../.venv/Scripts/Activate.ps1#L1): Comment-based help and execution-policy note.
2. [Lines 51-58](../.venv/Scripts/Activate.ps1#L51): Param block (VenvDir, Prompt).
3. [Lines 73-113](../.venv/Scripts/Activate.ps1#L73): global deactivate function.
4. [Lines 131-165](../.venv/Scripts/Activate.ps1#L131): Get-PyVenvConfig function.
5. [Lines 171-212](../.venv/Scripts/Activate.ps1#L171): Resolve script location, VenvDir, and prompt priority.
6. [Line 216](../.venv/Scripts/Activate.ps1#L216): deactivate -nondestructive pre-clean step.
7. [Lines 220-222](../.venv/Scripts/Activate.ps1#L220): Set VIRTUAL_ENV and VIRTUAL_ENV_PROMPT.
8. [Lines 224-238](../.venv/Scripts/Activate.ps1#L224): Prompt function override and global prefix variable.
9. [Lines 240-243](../.venv/Scripts/Activate.ps1#L240): Save and clear PYTHONHOME.
10. [Lines 246-248](../.venv/Scripts/Activate.ps1#L246): Save and prepend PATH.
11. [Lines 250-529](../.venv/Scripts/Activate.ps1#L250): Digital signature block (metadata, not activation logic).

## 10) Fast Verification Checklist

Use these checks after activation in your shell:

1. VIRTUAL_ENV points to your venv path.
2. PATH starts with venv Scripts directory.
3. python resolves to venv interpreter.
4. Prompt prefix appears unless prompt is intentionally disabled.
5. After deactivation, all values restore to their original state.
