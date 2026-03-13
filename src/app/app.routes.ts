import { Routes } from '@angular/router';
import { SplashComponent } from './splash/splash';
import { HomeComponent } from './home/home';
import { MapDestinationComponent } from './map-destination/map-destination';

export const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'home/machine-learning',
    component: MapDestinationComponent,
    data: {
      icon: '🧠',
      iconTone: 'accent',
      title: 'Machine Learning',
      description: 'Machine learning services for predictive modeling, intelligent automation, and production-ready model operations.',
      headerImageSrc: '/images/Machine Learning.jpg',
      headerImageAlt: 'Machine Learning service',
      featureContent: {
        title: 'Data Science & Machine Learning at Ibis Equity',
        subtitle: 'Turning complexity into clarity, and data into operational intelligence',
        intro: [
          'In a world defined by automation, cloud platforms, algorithms, and ever expanding data streams, few capabilities are as essential or as misunderstood as data science and machine learning. Their power comes not only from their real world impact, but from the way they integrate mathematics, statistics, computer science, engineering, and domain expertise into a single discipline of insight and action.',
          'At Ibis Equity, we help organizations navigate this landscape with confidence. We do not treat data science as a collection of black box recipes. We treat it as a rigorous, interpretable, and strategically aligned practice, one that leaders can trust when the stakes are high and the assumptions behind the model matter.'
        ],
        sections: [
          {
            title: 'Why Data Science Matters',
            paragraphs: [
              'Data science provides the conceptual and analytical foundation for understanding and working with data.'
            ],
            bullets: [
              'Designing how data is collected',
              'Ensuring data quality and structure',
              'Analyzing and interpreting numerical information',
              'Extracting patterns, signals, and operational meaning',
              'Transforming raw information into organizational clarity'
            ]
          },
          {
            title: 'Where Machine Learning Fits',
            paragraphs: [
              'Machine learning extends data science by building algorithms that learn from data, adapting, predicting, and improving over time. Effective ML requires more than simply running models.'
            ],
            bullets: [
              'What assumptions does the algorithm make',
              'What happens when those assumptions break',
              'How should the model be adapted to real world constraints',
              'How do we ensure the results are reliable, fair, and explainable',
              'How to turn machine learning into a strategic asset instead of a fragile experiment'
            ]
          },
          {
            title: 'The Ibis Equity Data Science Lifecycle',
            paragraphs: [
              'Our approach mirrors the real flow of a modern data science engagement: structured, transparent, and aligned with operational outcomes.'
            ],
            steps: [
              {
                title: 'Data Acquisition & Discovery',
                description: 'We identify the right data sources, design collection strategies, and ensure the information aligns with the research or business question.'
              },
              {
                title: 'Cleaning, Structuring & Exploration',
                description: 'We transform raw data into usable form, uncover early patterns, and visualize the landscape to guide modeling decisions.'
              },
              {
                title: 'Modeling & Statistical Analysis',
                description: 'We apply the appropriate mathematical and algorithmic techniques, including predictive models, statistical inference, optimization, and machine learning, grounded in domain context.'
              },
              {
                title: 'Decision Intelligence & Deployment',
                description: 'We translate model outputs into operational decisions, forecasts, and recommendations that leaders can act on with confidence.'
              }
            ]
          }
        ],
        closingTitle: 'The Ibis Perspective',
        closingParagraphs: [
          'Many organizations settle for off the shelf tools. We help them go deeper.',
          'Because when assumptions fail, when data shifts, or when the environment changes, leaders need more than a black box. They need a partner who understands the mathematics, the engineering, and the operational reality.'
        ],
        closingHighlight: 'That is where Ibis Equity excels: we make advanced data science and machine learning understandable, trustworthy, and strategically aligned with the mission of your organization.'
      },
      rag: {
        knowledgeBaseId: 'kb-machine-learning',
        modelId: 'anthropic.claude-3-5-sonnet',
        topK: 5,
        systemPrompt: 'Answer with machine-learning-focused recommendations covering model selection, deployment readiness, and measurable impact.'
      },
      capabilities: [
        'Supervised and unsupervised model strategy aligned to business outcomes',
        'Feature engineering, validation frameworks, and experiment tracking',
        'MLOps pipelines for deployment, monitoring, and governance'
      ],
      useCases: [
        'Demand forecasting and risk prediction for planning decisions',
        'Anomaly detection across operations, security, and quality workflows',
        'Personalization and recommendation systems at enterprise scale'
      ]
    }
  },
  {
    path: 'home/generative-ai',
    component: MapDestinationComponent,
    data: {
      icon: '✨',
      iconTone: 'accent',
      title: 'Generative AI',
      description: 'Generative AI services for content intelligence, agentic workflows, and enterprise-ready copilots.',
      headerImageSrc: '/images/Generative AI.jpg',
      headerImageAlt: 'Generative AI service',
      featureContent: {
        title: 'Generative AI',
        subtitle: 'A new layer of organizational cognition—engineered for clarity, grounded in truth, built for impact.',
        intro: [],
        sections: []
      },
      rag: {
        knowledgeBaseId: 'kb-generative-ai',
        modelId: 'anthropic.claude-3-5-sonnet',
        topK: 5,
        systemPrompt: 'Answer with practical generative-AI guidance focused on governance, quality, and measurable business outcomes.'
      },
      capabilities: [
        'Enterprise use-case design for copilots, assistants, and automated content workflows',
        'Prompt strategy, retrieval grounding, and guardrail design for safer generation',
        'Model evaluation, observability, and lifecycle governance for production adoption'
      ],
      useCases: [
        'Knowledge assistants for policy, operations, and customer support teams',
        'Document summarization, transformation, and drafting with human-in-the-loop review',
        'Agentic automation across multi-step business processes and internal tools'
      ]
    }
  },
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
      headerImageSrc: '/images/Data Science service.png',
      headerImageAlt: 'Data Science service',
      featureContent: {
        title: 'The Discipline of Data Science at Ibis Equity',
        subtitle: 'Data science as strategic insight, storytelling, and decision intelligence for high-stakes environments.',
        intro: [
          'Data science is the discipline of transforming raw information into strategic insight through rigorous analysis, storytelling, and decision intelligence. At Ibis Equity, we treat it as both a technical craft and a narrative art, built to serve high-stakes, real-world complexity. It is not simply the act of analyzing data, but the orchestration of mathematics, engineering, and human judgment into a coherent system of understanding.',
          'Where many organizations see data science as a collection of tools, we see it as a framework for clarity: a structured way of interrogating reality, revealing patterns, and guiding decisions that matter.'
        ],
        sections: [
          {
            title: 'Data Science as a System of Thought',
            paragraphs: [
              'At its core, data science is a way of thinking that blends technical depth with practical decision making.'
            ],
            bullets: [
              'Mathematical rigor to quantify uncertainty and structure hypotheses',
              'Statistical reasoning to separate signal from noise',
              'Computational engineering to scale analysis across modern data ecosystems',
              'Domain fluency to ensure relevance and operational alignment',
              'Narrative intelligence to translate complexity into decisions',
              'Evidence-driven strategy that preserves real-world nuance'
            ]
          },
          {
            title: 'The Ibis Philosophy: Data Science as Narrative Architecture',
            paragraphs: [
              'Most teams focus on models. We focus on meaning.',
              'At Ibis Equity, data science is a narrative architecture: a way of constructing explanations, insights, and decisions that are coherent, defensible, and aligned with mission-critical outcomes. Every dataset tells a story, but only when it is framed, interrogated, and contextualized with intention.'
            ],
            bullets: [
              'Illuminate the underlying structure of a problem',
              'Reveal the forces shaping outcomes',
              'Quantify risk, opportunity, and uncertainty',
              'Provide leaders with clarity they can act on',
              'Build intelligence that stands up to scrutiny in regulated sectors'
            ]
          },
          {
            title: 'From Raw Data to Decision Intelligence',
            paragraphs: [
              'The journey from raw data to strategic insight is not linear. It is iterative, exploratory, and deeply analytical.'
            ],
            steps: [
              {
                title: 'Discovery & Data Acquisition',
                description: 'We begin by clarifying the question behind the question: what decision must be made and what uncertainty must be reduced. Then we identify the right data sources and design the right collection strategy.'
              },
              {
                title: 'Cleaning, Structuring & Exploration',
                description: 'Raw data is rarely ready for analysis. We resolve inconsistencies, engineer features, and explore patterns that shape the modeling strategy. This is where intuition meets mathematics.'
              },
              {
                title: 'Modeling & Statistical Analysis',
                description: 'We apply predictive modeling, statistical inference, optimization, and machine learning grounded in domain context and mathematical rigor. Every model is interrogated for assumptions, fairness, and interpretability.'
              },
              {
                title: 'Decision Intelligence & Deployment',
                description: 'The final output is not a model. It is a decision. We translate analytical results into operational pathways, forecasts, and recommendations leaders can trust.'
              }
            ]
          },
          {
            title: 'Why This Matters in High-Stakes Environments',
            paragraphs: [
              'In sectors like healthcare, legal, energy, insurance, and public policy, decisions carry real consequences. A flawed assumption, a biased model, or an opaque algorithm can cause harm.'
            ],
            bullets: [
              'Transparency in how insights are generated',
              'Interpretability for stakeholders who must act on results',
              'Governance aligned with regulatory and ethical standards',
              'Equity as a foundational design principle',
              'Rigor that withstands scrutiny from experts and auditors',
              'Trustworthy intelligence systems, not isolated models'
            ]
          },
          {
            title: 'Python for Data Science & Machine Learning',
            subtitle: 'From raw data to refined intelligence with the power of Python',
            imageSrc: '/images/Unified Python for Data.png',
            imageAlt: 'Unified Python for Data',
            imageWidthPercent: 65,
            paragraphs: [
              'At Ibis Equity, we treat Python not just as a programming language, but as a strategic toolkit for transforming data into insight. Its ecosystem of libraries, including NumPy, Pandas, Seaborn, Matplotlib, and Plotly, forms the backbone of our data science and machine learning workflows, enabling everything from statistical modeling to interactive dashboards.',
              'We use Python to build systems that are modular, interpretable, and aligned with your mission.',
              'At Ibis, we use Python to bridge the gap between raw data and strategic clarity.'
            ],
            bullets: [
              'Rapid prototyping and experimentation',
              'Scalable data pipelines and ML models',
              'Seamless integration with cloud platforms and APIs',
              'Rich visualization and reporting capabilities'
            ],
            cardGridTitle: 'Core Libraries We Deploy',
            cardGridSubtitle: 'The Python ecosystem that powers our data science and machine learning workflows.',
            cards: [
              {
                name: 'NumPy',
                role: 'High-performance numerical computing, array manipulation, and mathematical operations.',
                highlights: [
                  'Vectorized operations for speed and scalability',
                  'Linear algebra, statistics, and numerical routines',
                  'Foundation for many other Python libraries'
                ]
              },
              {
                name: 'Pandas',
                role: 'Data wrangling, cleaning, and tabular analysis with intuitive DataFrame structures.',
                highlights: [
                  'Time series, joins, grouping, and aggregation',
                  'Fast CSV, Parquet, SQL, and API integration',
                  'Ideal for exploratory and production data pipelines'
                ]
              },
              {
                name: 'Seaborn',
                role: 'Statistical visualization heatmaps, distributions, and categorical plots.',
                highlights: [
                  'High-level API for complex statistical plots',
                  'Built on Matplotlib for fine-grained control',
                  'Great for pattern discovery and EDA narratives'
                ]
              },
              {
                name: 'Matplotlib',
                role: 'Foundational plotting library for static, publication-quality charts.',
                highlights: [
                  'Full control over axes, styles, and layouts',
                  'Suitable for reports, papers, and PDFs',
                  'Backbone for many higher-level viz libraries'
                ]
              },
              {
                name: 'Plotly',
                role: 'Interactive, web-ready visualizations for dashboards and executive reporting.',
                highlights: [
                  'Hover, zoom, and drill-down interactions',
                  'Seamless integration with web apps and BI flows',
                  'Ideal for decision-maker-facing dashboards'
                ]
              }
            ]
          },
          {
            title: 'Our Python-Driven Lifecycle',
            steps: [
              {
                title: 'Data Acquisition & Structuring',
                description: 'We ingest structured and unstructured data from diverse sources, using Pandas and NumPy to clean, transform, and prepare it for analysis.'
              },
              {
                title: 'Exploration & Visualization',
                description: 'We use Seaborn and Matplotlib to uncover patterns, trends, and anomalies, guiding model selection and stakeholder understanding.'
              },
              {
                title: 'Modeling & Machine Learning',
                description: 'We build predictive models using Python\'s ML stack (for example, Scikit-learn and XGBoost), integrating statistical rigor and domain context.'
              },
              {
                title: 'Decision Intelligence & Deployment',
                description: 'We deploy insights via Plotly dashboards, APIs, and automated reporting systems, ensuring leaders can act with confidence.'
              }
            ],
            subtitle: 'The Ibis Difference',
            paragraphs: [
              'Most teams use Python as a tool. We use it as a framework for clarity.',
              'Our systems are modular, testable, and built for real-world complexity. Whether you are forecasting demand, optimizing operations, or building explainable AI, Ibis delivers Python-powered solutions engineered for trust and impact.'
            ]
          }
        ],
        closingTitle: 'The Ibis Difference',
        closingParagraphs: [
          'Where others deliver dashboards, we deliver decision frameworks.',
          'Where others provide models, we provide narratives leaders can act on.',
          'Where others focus on tools, we focus on clarity, governance, and mission alignment.',
          'Data science is not about predicting the future. It is about understanding the present well enough to shape the future with intention.'
        ],
        closingHighlight: 'That is the work Ibis Equity was built to do.'
      },
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
