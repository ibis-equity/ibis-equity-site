import { Routes } from '@angular/router';
import { SplashComponent } from './splash/splash';
import { HomeComponent } from './home/home';
import { MapDestinationComponent } from './map-destination/map-destination';

export const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'home/healthcare',
    component: MapDestinationComponent,
    data: {
      icon: '⚕️',
      iconTone: 'positive',
      title: 'Healthcare',
      description: 'Healthcare solutions and insights for patient outcomes, operations, and care delivery performance.',
      rag: {
        knowledgeBaseId: 'kb-healthcare',
        modelId: 'anthropic.claude-3-5-sonnet',
        topK: 5,
        systemPrompt: 'Answer with healthcare-specific recommendations, include practical next steps and compliance-aware guidance.'
      },
      capabilities: [
        'Care pathway analytics and service-line optimization',
        'Clinical workflow intelligence for providers and staff',
        'Patient experience and access performance dashboards'
      ],
      useCases: [
        'Readmission risk reduction and discharge coordination',
        'ED throughput and bed-capacity balancing',
        'Population health outreach and preventive care targeting'
      ]
    }
  },
  {
    path: 'home/law-legal-services',
    component: MapDestinationComponent,
    data: {
      icon: '⚖️',
      iconTone: 'ink',
      title: 'Law & Legal Services',
      description: 'Legal and advisory solutions to support case workflows, contract analysis, and compliance operations.',
      rag: {
        knowledgeBaseId: 'kb-law-legal',
        modelId: 'anthropic.claude-3-5-sonnet',
        topK: 5,
        systemPrompt: 'Answer in legal operations context with emphasis on risk, policy clarity, and defensible process design.'
      },
      capabilities: [
        'Contract lifecycle analysis and obligation tracking',
        'Case intake triage and workload balancing',
        'Regulatory change monitoring and policy alignment'
      ],
      useCases: [
        'Clause extraction for vendor and customer agreements',
        'Matter prioritization with risk scoring',
        'Compliance evidence assembly for audits and reviews'
      ]
    }
  },
  {
    path: 'home/insurance',
    component: MapDestinationComponent,
    data: {
      icon: '🛡️',
      iconTone: 'accent',
      title: 'Insurance',
      description: 'Insurance-focused capabilities for underwriting, claims efficiency, fraud detection, and risk assessment.',
      rag: {
        knowledgeBaseId: 'kb-insurance',
        modelId: 'anthropic.claude-3-5-sonnet',
        topK: 5,
        systemPrompt: 'Answer with insurance-domain recommendations for claims, underwriting, and fraud controls.'
      },
      capabilities: [
        'Underwriting data enrichment and pricing support',
        'Claims workflow optimization and leakage detection',
        'Portfolio risk segmentation and renewal forecasting'
      ],
      useCases: [
        'Fast-track adjudication for low-risk claims',
        'Fraud pattern detection across channels',
        'Retention strategies for high-value policyholders'
      ]
    }
  },
  {
    path: 'home/education',
    component: MapDestinationComponent,
    data: {
      icon: '🎓',
      iconTone: 'accent',
      title: 'Education',
      description: 'Education services that improve learner engagement, institutional planning, and instructional effectiveness.',
      rag: {
        knowledgeBaseId: 'kb-education',
        modelId: 'anthropic.claude-3-5-sonnet',
        topK: 5,
        systemPrompt: 'Answer with education-specific guidance for student outcomes, retention, and instructional improvement.'
      },
      capabilities: [
        'Learner engagement analytics and intervention alerts',
        'Curriculum performance tracking by cohort',
        'Institutional planning for staffing and program demand'
      ],
      useCases: [
        'Student success early-warning dashboards',
        'Course sequencing optimization for completion rates',
        'Resource allocation planning across departments'
      ]
    }
  },
  {
    path: 'home/agriculture',
    component: MapDestinationComponent,
    data: {
      icon: '🌾',
      iconTone: 'positive',
      title: 'Agriculture',
      description: 'Agriculture applications for yield optimization, sustainability initiatives, and supply visibility.',
      rag: {
        knowledgeBaseId: 'kb-agriculture',
        modelId: 'anthropic.claude-3-5-sonnet',
        topK: 5,
        systemPrompt: 'Answer with agriculture-focused guidance around yield, resource efficiency, and supply planning.'
      },
      capabilities: [
        'Field-level yield forecasting and crop health tracking',
        'Water, fertilizer, and input optimization insights',
        'Supply chain visibility from harvest to distribution'
      ],
      useCases: [
        'Planting and harvest timing recommendations',
        'Irrigation efficiency and stress monitoring',
        'Post-harvest quality and spoilage prevention'
      ]
    }
  },
  {
    path: 'home/manufacturing',
    component: MapDestinationComponent,
    data: {
      icon: '🏭',
      iconTone: 'ink',
      title: 'Manufacturing',
      description: 'Manufacturing intelligence for process optimization, quality control, and predictive maintenance.',
      rag: {
        knowledgeBaseId: 'kb-manufacturing',
        modelId: 'anthropic.claude-3-5-sonnet',
        topK: 5,
        systemPrompt: 'Answer with manufacturing guidance for throughput, quality, reliability, and plant operations.'
      },
      capabilities: [
        'Production line bottleneck and OEE analytics',
        'Quality variance detection with root-cause tracing',
        'Predictive maintenance scheduling for critical assets'
      ],
      useCases: [
        'Scrap reduction through process tuning',
        'Downtime prevention for constrained stations',
        'Supplier quality performance monitoring'
      ]
    }
  },
  {
    path: 'home/energy-utilities',
    component: MapDestinationComponent,
    data: {
      icon: '⚡',
      iconTone: 'negative',
      title: 'Energy & Utilities',
      description: 'Energy and utilities support for grid resilience, demand planning, and infrastructure performance.',
      rag: {
        knowledgeBaseId: 'kb-energy-utilities',
        modelId: 'anthropic.claude-3-5-sonnet',
        topK: 5,
        systemPrompt: 'Answer for energy and utilities with focus on resilience, outages, and demand planning.'
      },
      capabilities: [
        'Load forecasting and demand-response planning',
        'Grid asset condition and outage risk monitoring',
        'Network performance optimization and loss analysis'
      ],
      useCases: [
        'Peak demand mitigation planning',
        'Predictive fault detection for substations',
        'Service restoration prioritization during disruptions'
      ]
    }
  },
  {
    path: 'home/transportation-logistics',
    component: MapDestinationComponent,
    data: {
      icon: '🚚',
      iconTone: 'accent',
      title: 'Transportation & Logistics',
      description: 'Transportation and logistics optimization for routing, fleet utilization, and delivery reliability.',
      rag: {
        knowledgeBaseId: 'kb-transport-logistics',
        modelId: 'anthropic.claude-3-5-sonnet',
        topK: 5,
        systemPrompt: 'Answer with transportation and logistics guidance for routing, fleet productivity, and SLA reliability.'
      },
      capabilities: [
        'Route optimization with real-time network conditions',
        'Fleet utilization and maintenance cycle intelligence',
        'Shipment visibility and SLA compliance monitoring'
      ],
      useCases: [
        'Last-mile performance and ETA accuracy improvements',
        'Backhaul and empty-mile reduction planning',
        'Warehouse-to-distribution handoff optimization'
      ]
    }
  },
  {
    path: 'home/hospitality-travel',
    component: MapDestinationComponent,
    data: {
      icon: '🧳',
      iconTone: 'positive',
      title: 'Hospitality Travel',
      description: 'Hospitality and travel experiences focused on guest personalization and operational excellence.',
      rag: {
        knowledgeBaseId: 'kb-hospitality-travel',
        modelId: 'anthropic.claude-3-5-sonnet',
        topK: 5,
        systemPrompt: 'Answer with hospitality and travel recommendations that improve guest experience and operational quality.'
      },
      capabilities: [
        'Guest segmentation and personalization strategies',
        'Revenue management and occupancy forecasting',
        'Service quality insights across touchpoints'
      ],
      useCases: [
        'Dynamic package recommendations for travelers',
        'Front-desk and staffing demand planning',
        'Guest sentiment monitoring and service recovery'
      ]
    }
  },
  {
    path: 'home/retail-ecommerce',
    component: MapDestinationComponent,
    data: {
      icon: '🛍️',
      iconTone: 'negative',
      title: 'Retail & E-Commerce',
      description: 'Retail and e-commerce intelligence for merchandising, customer insights, and conversion growth.',
      rag: {
        knowledgeBaseId: 'kb-retail-ecommerce',
        modelId: 'anthropic.claude-3-5-sonnet',
        topK: 5,
        systemPrompt: 'Answer in retail and e-commerce context with practical actions for merchandising and conversion growth.'
      },
      capabilities: [
        'Merchandising analytics and assortment optimization',
        'Customer behavior insights across channels',
        'Conversion funnel diagnostics and growth planning'
      ],
      useCases: [
        'Personalized recommendations and cross-sell offers',
        'Inventory balancing by location and demand signal',
        'Campaign attribution and ROAS optimization'
      ]
    }
  },
  {
    path: 'home/government-public-sector',
    component: MapDestinationComponent,
    data: {
      icon: '🏛️',
      iconTone: 'ink',
      title: 'Government & Public Sector',
      description: 'Public sector solutions for service delivery, resource planning, and mission-focused outcomes.',
      rag: {
        knowledgeBaseId: 'kb-government-public',
        modelId: 'anthropic.claude-3-5-sonnet',
        topK: 5,
        systemPrompt: 'Answer for public sector scenarios with clear, accountable, mission-focused recommendations.'
      },
      capabilities: [
        'Program performance monitoring and KPI governance',
        'Citizen service workflow optimization',
        'Budget and resource allocation intelligence'
      ],
      useCases: [
        'Case resolution acceleration in service centers',
        'Grant program impact measurement',
        'Operational planning for emergency response'
      ]
    }
  },
  {
    path: 'home/real-estate-construction',
    component: MapDestinationComponent,
    data: {
      icon: '🏗️',
      iconTone: 'accent',
      title: 'Real Estate & Construction',
      description: 'Real estate and construction insights for project controls, asset performance, and development planning.',
      rag: {
        knowledgeBaseId: 'kb-real-estate-construction',
        modelId: 'anthropic.claude-3-5-sonnet',
        topK: 5,
        systemPrompt: 'Answer for real estate and construction with guidance on delivery risk, cost control, and asset performance.'
      },
      capabilities: [
        'Project controls and schedule risk intelligence',
        'Asset performance and lifecycle analytics',
        'Development pipeline and cost forecasting support'
      ],
      useCases: [
        'Change-order impact analysis for active projects',
        'Occupancy and tenant-performance trend monitoring',
        'Capital planning for renovation and expansion'
      ]
    }
  },
  {
    path: 'home/data-sciences',
    component: MapDestinationComponent,
    data: {
      icon: '📊',
      iconTone: 'accent',
      title: 'Data Sciences',
      description: 'Data science strategy and delivery spanning analytics, experimentation, and productionized AI capabilities.',
      rag: {
        knowledgeBaseId: 'kb-data-sciences',
        modelId: 'anthropic.claude-3-5-sonnet',
        topK: 5,
        systemPrompt: 'Answer with data-science guidance focused on measurable outcomes, model quality, and operationalization.'
      },
      capabilities: [
        'Predictive and prescriptive analytics roadmap design',
        'Feature engineering, model validation, and MLOps enablement',
        'Experimentation frameworks with KPI and business impact tracking'
      ],
      useCases: [
        'Demand and risk forecasting for strategic planning',
        'Customer and operations segmentation for targeted decisions',
        'Model monitoring for drift, performance, and governance'
      ]
    }
  },
  { path: '**', redirectTo: '' }
];
