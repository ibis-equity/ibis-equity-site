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
      headerImageSrc: '/images/mach-learning.jpg',
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
        sections: [
          {
            title: 'What is Generative AI?',
            paragraphs: [
              'Generative AI refers to systems that can produce original content—text, images, code, audio, and even structured decisions—based on learned patterns from vast datasets. Powered by deep learning architectures like transformers and diffusion models, these systems can synthesize meaning, construct narratives, and generate entirely new artifacts that feel intentional, coherent, and contextually aware.',
              'But the true significance of generative AI extends far beyond its ability to create content. It represents a fundamental shift in how organizations understand, reason, and operate. These models learn not only the surface patterns of language or imagery, but the deeper structures of logic, causality, and representation embedded within them. They can interpret ambiguous inputs, infer relationships, and produce outputs that reflect both the explicit and implicit knowledge encoded in their training.',
              'This makes generative AI a new form of organizational cognition—a system capable of drafting, summarizing, reasoning, and exploring possibilities at a scale and speed that traditional tools cannot match. It is not simply a technological upgrade; it is a transformation in how institutions create clarity, make decisions, and communicate across complex environments.',
              'At Ibis Equity, we view generative AI through this broader lens. We treat it not as a novelty or a convenience, but as a strategic capability for domains where narrative, decision-making, and operational intelligence converge. In healthcare, legal, insurance, public sector, and other high-stakes arenas, generative AI becomes a meaning engine—one that can interpret dense information, surface relevant insights, and produce grounded, explainable outputs that align with institutional truth.',
              'Transformers enable these systems to model relationships across vast sequences of text, capturing nuance, intent, and context. Diffusion models allow them to generate high-fidelity images and simulations that reflect complex visual patterns. Multimodal architectures combine text, images, audio, and structured data into unified reasoning systems capable of cross-domain synthesis.',
              'Together, these technologies allow generative AI to:'
            ],
            bullets: [
              'Compose narratives that reflect domain-specific logic',
              'Interpret complex documents, data, and signals',
              'Synthesize insights across fragmented sources',
              'Adapt tone, structure, and reasoning to audience and context',
              'Generate decisions, recommendations, and structured outputs',
              'Collaborate with human experts through iterative refinement'
            ]
          },
          {
            title: 'What You Can Build With This',
            subtitle: 'Generative systems that think, reason, and operate alongside your teams',
            paragraphs: [
              'With a grounded, governed generative AI layer, your organization can build solutions that were previously impossible—or prohibitively expensive. These systems don\'t just automate tasks; they amplify human judgment and create new pathways for clarity, speed, and strategic insight.'
            ],
            cardGridTitle: 'Six Categories of Generative Systems',
            cards: [
              {
                name: '1. Intelligent Document Systems',
                role: 'Drafting, summarization, and narrative generation at scale',
                highlights: [
                  'Clinical notes, legal briefs, claims summaries, policy drafts',
                  'Consistent, contextualized outputs grounded in your knowledge base',
                  'Human-in-the-loop workflows for safety and accuracy'
                ]
              },
              {
                name: '2. Decision Support Agents',
                role: 'Retrieval-grounded reasoning for high-stakes decisions',
                highlights: [
                  'Case analysis, risk modeling, scenario exploration',
                  'Transparent, explainable logic paths',
                  'Domain-specific constraints encoded into the system'
                ]
              },
              {
                name: '3. Operational Automation Pipelines',
                role: 'Multi-step agents that execute complex workflows',
                highlights: [
                  'Intake → analysis → drafting → validation → escalation',
                  'Automated documentation and compliance pathways',
                  'Integration with existing systems and APIs'
                ]
              },
              {
                name: '4. Personalized Communication Engines',
                role: 'Adaptive, audience-aware messaging',
                highlights: [
                  'Patient education, citizen communication, customer support',
                  'Multilingual, accessible, and context-sensitive',
                  'Consistent tone and narrative across channels'
                ]
              },
              {
                name: '5. Knowledge Intelligence Platforms',
                role: 'Turning institutional knowledge into a living system',
                highlights: [
                  'Semantic search, vectorized archives, contextual retrieval',
                  'Dynamic updates as new information enters the ecosystem',
                  'A single source of truth for the entire organization'
                ]
              },
              {
                name: '6. Strategic Insight Generators',
                role: 'Narratives that guide leadership decisions',
                highlights: [
                  'Forecasts, risk narratives, opportunity maps',
                  'Synthesized insights across documents, data, and history',
                  'Executive-ready outputs with clarity and authority'
                ]
              }
            ]
          },
          {
            title: 'The AI Stack',
            subtitle: 'The layered architecture that turns raw data into governed, operational intelligence. The AI stack is the full set of technologies, layers, and workflows that enable artificial intelligence systems to ingest information, learn from it, reason about it, and deliver usable outputs to humans and applications. It\'s not one tool or one model - it\'s an ecosystem. Think of it as the intelligence infrastructure beneath every modern AI system.<br><strong>The 7-Layer AI Stack (Ibis Equity Architecture)</strong>',
            cardLayout: 'ai-stack',
            cards: [
              {
                name: '1. Data Layer',
                role: '',
                description: 'The raw material of intelligence: all structured and unstructured inputs.',
                highlights: [
                  'Databases & data warehouses',
                  'Documents, PDFs, logs, events',
                  'Images, audio, video',
                  'External APIs & feeds'
                ]
              },
              {
                name: '2. Processing & Feature Layer',
                role: '',
                description: 'Preparing data for learning, retrieval, and reasoning.',
                highlights: [
                  'ETL/ELT pipelines',
                  'Cleaning & normalization',
                  'OCR & document ingestion',
                  'Feature extraction & embeddings'
                ]
              },
              {
                name: '3. Model Layer',
                role: '',
                description: 'The cognitive engine that learns patterns and generates outputs.',
                highlights: [
                  'LLMs & vision models',
                  'Diffusion & multimodal models',
                  'Fine-tuned domain models',
                  'Compression & optimization'
                ]
              },
              {
                name: '4. Retrieval & Knowledge Layer',
                role: '',
                description: 'Grounding intelligence in institutional truth and context.',
                highlights: [
                  'Vector databases & semantic search',
                  'Chunking & indexing pipelines',
                  'Knowledge graphs',
                  'RAG architectures'
                ]
              },
              {
                name: '5. Orchestration Layer',
                role: '',
                description: 'Shaping how models think, reason, and respond.',
                highlights: [
                  'Prompt engineering & templates',
                  'Chain-of-thought orchestration',
                  'Tool/function calling',
                  'Workflow engines'
                ]
              },
              {
                name: '6. Agentic Layer',
                role: '',
                description: 'Turning intelligence into multi-step, operational action.',
                highlights: [
                  'Planning & task decomposition',
                  'Reflection & validation loops',
                  'Multi-agent coordination',
                  'Human-in-the-loop checkpoints'
                ]
              },
              {
                name: '7. Application & Experience Layer',
                role: '',
                description: 'Where humans and systems interact with the intelligence.',
                highlights: [
                  'Dashboards & analytics',
                  'Conversational & document UIs',
                  'Embedded assistants & widgets',
                  'APIs & system integrations'
                ]
              }
            ]
          }
        ],
        closingTitle: 'The Throughline',
        closingParagraphs: [
          'This is why generative AI is not merely a tool—it is an intelligence layer. And when engineered with governance, retrieval, and orchestration, it becomes a reliable partner in environments where accuracy, transparency, and trust are non-negotiable.',
          'At Ibis Equity, we architect generative systems that are grounded, interpretable, and mission-aligned. We ensure that every output is anchored in verified knowledge, shaped by domain constraints, and designed to withstand scrutiny. The result is generative intelligence that enhances human judgment, accelerates complex workflows, and transforms how organizations think, decide, and act.',
          'Generative AI is not the product.',
          'The system you build with it is the product.'
        ],
        closingHighlight: 'And at Ibis Equity, we architect systems that endure.'
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
    path: 'home/deep-learning',
    component: MapDestinationComponent,
    data: {
      icon: '🧬',
      iconTone: 'accent',
      title: 'Deep Learning',
      description: 'Deep learning solutions for representation learning, computer vision, language understanding, and high-impact predictive systems.',
      headerImageSrc: '/images/deep learn.jpg',
      headerImageAlt: 'Deep Learning service',
      featureContent: {
        title: 'Deep Learning',
        subtitle: 'The architecture of modern intelligence—pattern recognition at scale, engineered for high-stakes environments.',
        intro: [
          'Deep Learning represents the most powerful class of machine learning systems ever developed. Built on layered neural architectures capable of modeling complex, nonlinear relationships, deep learning systems can perceive, classify, predict, and generate with a level of fidelity that rivals human cognition in specific domains.',
          'At Ibis Equity, we treat Deep Learning not as a black box, but as strategic infrastructure—a disciplined, interpretable, and mission-aligned intelligence layer that supports clinical, legal, operational, and analytical decision making.'
        ],
        sections: [
          {
            title: '1. What Deep Learning Is',
            subtitle: 'A layered computational system that learns hierarchical representations of data.',
            paragraphs: [
              'Deep Learning uses multi-layer neural networks—often with millions or billions of parameters—to learn patterns directly from raw data. Unlike traditional machine learning, which relies on hand-crafted features, deep learning systems discover the features themselves.',
              'They excel at:'
            ],
            bullets: [
              'Image classification, detection, segmentation',
              'Speech recognition and audio understanding',
              'Natural language modeling',
              'Time-series forecasting',
              'Anomaly detection',
              'Multimodal reasoning (text + image + audio)'
            ]
          },
          {
            title: '2. Why Deep Learning Matters Now',
            subtitle: 'Because the complexity of modern data exceeds human-designed rules.',
            paragraphs: [
              'Organizations today generate and consume data at a scale that defies manual interpretation. Deep Learning thrives in environments where:'
            ],
            bullets: [
              'Patterns are subtle or high dimensional',
              'Inputs are unstructured (images, text, audio)',
              'Relationships are nonlinear',
              'Precision and recall matter',
              'Real-time inference is required'
            ]
          },
          {
            title: '3. The Deep Learning Architecture',
            subtitle: 'A disciplined, multi-layer system engineered for clarity and performance.',
            paragraphs: [
              'Below is the Ibis Equity Deep Learning architecture—modular, interpretable, and designed for high-stakes domains.'
            ]
          },
          {
            title: '3.1 Input Layer',
            paragraphs: [
              'Raw data enters the system:'
            ],
            bullets: [
              'Images',
              'Text sequences',
              'Audio waveforms',
              'Sensor data',
              'Time-series signals',
              'This layer defines the shape and structure of the problem.'
            ]
          },
          {
            title: '3.2 Representation Layers',
            subtitle: 'Where deep learning becomes powerful.',
            bullets: [
              'Convolutional Neural Networks (CNNs): For spatial data (images, medical scans, documents).',
              'Recurrent Networks (RNNs, LSTMs, GRUs): For sequential data (time-series, speech, EHR timelines).',
              'Transformers: For long-range dependencies in text, images, and multimodal tasks.',
              'Graph Neural Networks (GNNs): For relational data (claims networks, legal citations, patient histories).',
              'Each architecture captures a different dimension of meaning.'
            ]
          },
          {
            title: '3.3 Latent Space',
            subtitle: 'The internal representation of knowledge.',
            paragraphs: [
              'Deep Learning models compress raw data into dense, meaningful vectors—latent representations that encode:'
            ],
            bullets: [
              'Structure',
              'Semantics',
              'Context',
              'Relationships',
              'This is where the model understands the world.'
            ]
          },
          {
            title: '3.4 Task Heads',
            paragraphs: [
              'Specialized layers for specific outputs:'
            ],
            bullets: [
              'Classification',
              'Regression',
              'Detection',
              'Segmentation',
              'Sequence generation',
              'Embedding extraction',
              'These heads translate learned representations into actionable predictions.'
            ]
          },
          {
            title: '3.5 Output Layer',
            paragraphs: [
              'The final predictions, probabilities, or generated sequences—ready for downstream systems or human review.'
            ]
          },
          {
            title: '4. The Deep Learning Workflow',
            subtitle: 'A lifecycle built for rigor, governance, and continuous improvement.'
          },
          {
            title: '4.1 Data Collection & Labeling',
            paragraphs: [
              'High-quality labeled data is the foundation of deep learning. This includes:'
            ],
            bullets: [
              'Annotation pipelines',
              'Labeling guidelines',
              'Quality control loops',
              'Bias and representativeness checks'
            ]
          },
          {
            title: '4.2 Model Design & Experimentation',
            paragraphs: [
              'Architectural choices depend on:'
            ],
            bullets: [
              'Data type',
              'Task complexity',
              'Latency requirements',
              'Interpretability needs',
              'We design models that balance performance with governance.'
            ]
          },
          {
            title: '4.3 Training & Optimization',
            paragraphs: [
              'Training involves:'
            ],
            bullets: [
              'Loss functions',
              'Optimizers (Adam, SGD, RMSProp)',
              'Regularization',
              'Hyperparameter tuning',
              'Distributed training for large models'
            ]
          },
          {
            title: '4.4 Validation & Evaluation',
            paragraphs: [
              'We evaluate models using:'
            ],
            bullets: [
              'Accuracy, precision, recall, F1',
              'ROC/AUC',
              'Calibration curves',
              'Fairness and bias metrics',
              'Domain-specific KPIs',
              'Deep Learning must be trusted, not just accurate.'
            ]
          },
          {
            title: '4.5 Deployment & Monitoring',
            paragraphs: [
              'Models are deployed via:'
            ],
            bullets: [
              'APIs',
              'Edge devices',
              'Cloud inference',
              'Batch pipelines',
              'Monitoring includes drift detection, performance degradation, bias re-emergence, and safety checks.'
            ]
          },
          {
            title: '5. Deep Learning Across Industries',
            subtitle: 'Sector-specific intelligence built on domain-aligned architectures.',
            cardGridTitle: 'Industry Use Cases',
            cards: [
              {
                name: 'Healthcare',
                role: 'Clinical intelligence from imaging, records, and trajectories.',
                highlights: [
                  'Medical imaging analysis',
                  'Clinical risk prediction',
                  'EHR sequence modeling',
                  'Patient trajectory forecasting'
                ]
              },
              {
                name: 'Legal',
                role: 'Document and relationship intelligence for legal operations.',
                highlights: [
                  'Document classification',
                  'Citation graph modeling',
                  'Contract clause extraction',
                  'Case similarity search'
                ]
              },
              {
                name: 'Insurance',
                role: 'Risk and fraud intelligence across claims and portfolios.',
                highlights: [
                  'Fraud detection',
                  'Claims image analysis',
                  'Risk scoring',
                  'Time-series forecasting'
                ]
              },
              {
                name: 'Public Sector',
                role: 'High-scale analysis for operations, access, and planning.',
                highlights: [
                  'Satellite imagery analysis',
                  'Resource allocation modeling',
                  'Accessibility systems',
                  'Multilingual document processing'
                ]
              },
              {
                name: 'Retail & E-Commerce',
                role: 'Demand, discovery, and personalization intelligence.',
                highlights: [
                  'Recommendation systems',
                  'Demand forecasting',
                  'Visual search',
                  'Customer segmentation'
                ]
              },
              {
                name: 'Education',
                role: 'Learner-focused prediction and support systems.',
                highlights: [
                  'Learning analytics',
                  'Automated grading',
                  'Accessibility tools',
                  'Student risk modeling'
                ]
              }
            ]
          },
          {
            title: '6. Governance & Safety in Deep Learning',
            subtitle: 'Because high-stakes AI requires more than accuracy.',
            paragraphs: [
              'We embed governance at every layer:'
            ],
            bullets: [
              'Explainability (Grad-CAM, SHAP)',
              'Bias detection',
              'Human-in-the-loop review',
              'Audit trails',
              'Model cards & documentation',
              'Risk scoring',
              'Deep Learning must be transparent, accountable, and aligned with mission.'
            ]
          },
          {
            title: '7. The Ibis Equity Approach',
            subtitle: 'Deep Learning as strategic infrastructure.',
            paragraphs: [
              'We design deep learning systems that are:'
            ],
            bullets: [
              'Modular — built from reusable architectural components',
              'Interpretable — explainable at every stage',
              'Governed — safe for regulated environments',
              'Integrated — embedded into real workflows',
              'Mission aligned — shaped by domain constraints'
            ]
          },
          {
            title: 'Deep Learning vs Machine Learning vs Generative AI',
            subtitle: 'Three layers of modern intelligence—related, overlapping, but not interchangeable.',
            cardLayout: 'ai-compare',
            cards: [
              {
                name: 'Machine Learning',
                role: 'Learning patterns from data to make predictions.',
                highlights: [
                  '<strong>Core idea:</strong> Algorithms learn a mapping from inputs to outputs using features engineered by humans.',
                  '<strong>Typical models:</strong> Linear/logistic regression, decision trees, random forests, gradient boosting, SVMs.',
                  '<strong>Strengths:</strong> Interpretable (often), data-efficient, strong for tabular and structured data.',
                  '<strong>Common uses:</strong> Risk scoring, churn prediction, pricing, basic classification/regression.',
                  '<strong>Role in stack:</strong> Foundational predictive layer for many analytics and decision systems.'
                ]
              },
              {
                name: 'Deep Learning',
                role: 'Hierarchical neural networks for complex, high-dimensional data.',
                highlights: [
                  '<strong>Core idea:</strong> Multi-layer neural networks automatically learn rich feature representations from raw data.',
                  '<strong>Typical models:</strong> CNNs, RNNs/LSTMs, transformers, autoencoders, GNNs.',
                  '<strong>Strengths:</strong> Excels on images, text, audio, sequences; captures nonlinear, high-dimensional patterns.',
                  '<strong>Common uses:</strong> Medical imaging, speech recognition, fraud detection, recommendation, time-series modeling.',
                  '<strong>Role in stack:</strong> The core perception and representation engine of modern AI systems.'
                ]
              },
              {
                name: 'Generative AI',
                role: 'Systems that create new content and structured decisions.',
                highlights: [
                  '<strong>Core idea:</strong> Models learn the distribution of data and generate new text, images, code, or audio from it.',
                  '<strong>Typical models:</strong> Large language models, diffusion models, generative transformers, VAEs, GANs.',
                  '<strong>Strengths:</strong> Drafting, summarization, reasoning, simulation, multimodal content creation.',
                  '<strong>Common uses:</strong> Document generation, assistants, code copilots, image/video generation, RAG systems.',
                  '<strong>Role in stack:</strong> The organizational cognition layer—narrative, reasoning, and interactive intelligence.'
                ]
              }
            ]
          }
        ],
        closingTitle: 'The Throughline',
        closingParagraphs: [
          'Although Machine Learning, Deep Learning, and Generative AI are often discussed together, they operate at different layers of the intelligence stack. Machine Learning provides the predictive foundation. Deep Learning adds high-dimensional perception and representation. Generative AI builds on both to create a new layer of organizational cognition—systems that can draft, reason, and synthesize with context and intent. Together, they form a continuum: from learning patterns, to understanding complexity, to generating new possibilities.'
        ]
      },
      rag: {
        knowledgeBaseId: 'kb-machine-learning',
        modelId: 'anthropic.claude-3-5-sonnet',
        topK: 5,
        systemPrompt: 'Answer with deep-learning-focused recommendations across model architecture, training strategy, and production readiness.'
      },
      capabilities: [
        'Neural network architecture design for vision, language, and multimodal workloads',
        'Training optimization, model evaluation, and deployment hardening for production scale',
        'Explainability, drift monitoring, and governance controls for high-stakes AI systems'
      ],
      useCases: [
        'Computer vision pipelines for detection, classification, and quality automation',
        'Natural language intelligence for summarization, extraction, and decision support',
        'Sequence and time-series modeling for forecasting, anomaly detection, and risk analytics'
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
      featureContent: {
        title: 'Healthcare ML + RAG + Data Science',
        intro: [
          'Modern healthcare operates at the intersection of biological complexity, operational pressure, regulatory constraint, and human variability. Every clinical encounter, every operational decision, and every financial transaction generates data—structured, semi structured, and overwhelmingly unstructured. Traditional data science and machine learning have helped health systems extract value from this data, but the field has reached a critical inflection point: prediction alone cannot support the cognitive, operational, and equity demands of contemporary care.',
          'Machine Learning (ML) excels at forecasting. It identifies patterns in historical data to predict sepsis risk, readmission probability, length of stay, staffing needs, denial likelihood, and population level disease burden. These models provide foresight, but they operate primarily on structured inputs and produce outputs—scores, classifications, clusters—that require interpretation and contextualization by clinicians and administrators. ML tells us what is likely to happen, but not why, according to what evidence, or how to act in a way that aligns with guidelines, policies, and patient specific realities.',
          'Healthcare requires more than prediction. It requires contextual reasoning.',
          'This is where Retrieval Augmented Generation (RAG) becomes essential. RAG systems bridge the gap between predictive analytics and real time decision support by grounding large language models in the actual knowledge ecosystem of a health system: clinical guidelines, care pathways, consult notes, imaging reports, payer rules, formulary restrictions, social work documentation, and community resource directories. Instead of generating free floating answers, a RAG system retrieves the most relevant documents, constrains the model to those sources, and produces traceable, citation anchored outputs.'
        ],
        sections: [
          {
            title: 'In Practice: A Unified Intelligence Layer',
            paragraphs: [
              'In practice, ML and RAG form a unified intelligence layer:'
            ],
            bullets: [
              'ML provides the signal—risk scores, forecasts, anomaly detection, and prioritization.',
              'RAG provides the reasoning—summaries, guideline alignment, medication safety explanations, discharge planning, and patient friendly education.',
              'Data science provides the foundation—data engineering, ontology mapping, feature pipelines, corpus governance, and evaluation frameworks.'
            ]
          },
          {
            title: 'Operational Impact and Governance',
            paragraphs: [
              'Together, they create a system that can predict, interpret, and explain—all while respecting clinical nuance, operational constraints, and equity considerations.',
              'This combined architecture reduces cognitive load for clinicians by synthesizing thousands of data points into coherent, evidence grounded narratives. It supports nursing and care coordination with real time handoff summaries and protocol retrieval. It strengthens operations by pairing ML based forecasting with RAG based policy interpretation. It improves revenue cycle performance by aligning documentation with payer rules. And it enhances population health by integrating predictive risk with contextual understanding of social determinants and community resources.',
              'Crucially, this intelligence layer is governed. Every model is validated, monitored, and audited. Every retrieved document is version controlled. Every output is transparent and attributable. The system augments clinical judgment rather than replacing it, ensuring that decisions remain safe, equitable, and aligned with institutional standards.'
            ]
          },
          {
            title: 'A Unified ML + RAG Narrative for the Entire Healthcare Ecosystem'
          },
          {
            title: '1. Clinical Care: Real-Time, Evidence-Grounded Support',
            paragraphs: [
              'Healthcare\'s core challenge is cognitive overload. Clinicians must synthesize:'
            ],
            bullets: [
              'Guidelines',
              'Prior notes',
              'Labs, imaging, vitals',
              'Medications',
              'Social context',
              'Payer constraints',
              'A RAG-enabled clinical assistant retrieves the right evidence and patient-specific context, then generates visit prep briefs, guideline-aligned options, medication safety checks, differential-supporting summaries, and patient-friendly explanations.',
              'Every statement is traceable to retrieved sources, not hallucinated.'
            ]
          },
          {
            title: '2. Diagnostics and Imaging: Precision Retrieval + ML Patterning',
            paragraphs: [
              'Diagnostics blend structured and unstructured data. ML + RAG supports:'
            ],
            bullets: [
              'Imaging report summarization with citations',
              'Retrieval of similar prior cases',
              'Protocol selection (for example, contrast vs non-contrast)',
              'Lab interpretation grounded in institutional ranges',
              'Cross-modal synthesis (imaging + labs + notes)',
              'ML handles pattern recognition; RAG handles context, guidelines, and reasoning.'
            ]
          },
          {
            title: '3. Pharmacy and Medication Management',
            paragraphs: [
              'Medication safety is a knowledge problem as much as a data problem.'
            ],
            bullets: [
              'RAG retrieves formulary rules, renal/hepatic dosing guidelines, drug-drug interactions, prior authorization criteria, and patient-specific adherence barriers.',
              'ML models predict non-adherence risk, adverse event likelihood, and optimal titration windows.',
              'Together, they produce safe, personalized medication plans.'
            ]
          },
          {
            title: '4. Behavioral Health and Social Determinants',
            paragraphs: [
              'Behavioral health documentation is narrative-heavy. RAG excels at extracting risk factors, summarizing longitudinal therapy notes, surfacing crisis plans, and identifying social barriers such as housing, food, and transportation.',
              'ML models forecast crisis risk, readmission likelihood, and engagement probability.',
              'The combined system supports whole-person care.'
            ]
          },
          {
            title: '5. Nursing and Care Coordination',
            paragraphs: [
              'Nursing workflows are the operational backbone of care.'
            ],
            bullets: [
              'RAG supports shift-change summaries, care plan updates, protocol retrieval (falls, restraints, wound care), and patient education generation.',
              'ML supports staffing optimization, acuity prediction, and early deterioration detection.',
              'This creates a closed-loop, context-aware nursing intelligence layer.'
            ]
          },
          {
            title: '6. Operations, Throughput, and Capacity',
            paragraphs: [
              'Hospitals run on flow.'
            ],
            bullets: [
              'ML models forecast ED arrivals, bed demand, OR utilization, length of stay, and discharge probability.',
              'RAG retrieves local policies, staffing rules, unit-specific constraints, historical patterns, and escalation pathways.',
              'Together, they produce actionable, policy-aligned operational recommendations.'
            ]
          },
          {
            title: '7. Revenue Cycle and Payer Intelligence',
            paragraphs: [
              'Revenue cycle is a maze of rules, documentation, and payer variation.'
            ],
            bullets: [
              'RAG retrieves coverage policies, prior authorization rules, documentation requirements, denial patterns, and coding guidelines.',
              'ML predicts denial risk, DRG shifts, documentation gaps, and optimal sequencing for appeals.',
              'This creates a learning revenue cycle engine that reduces friction and waste.'
            ]
          },
          {
            title: '8. Research, Trials, and Innovation',
            bullets: [
              'RAG accelerates research by retrieving protocols, inclusion/exclusion criteria, prior studies, adverse event patterns, and regulatory requirements.',
              'ML models support cohort identification, outcome prediction, signal detection, and adaptive trial design.',
              'This becomes a research intelligence platform.'
            ]
          },
          {
            title: '9. Compliance, Governance, and Safety',
            subtitle: 'Healthcare AI must be governed with rigor.',
            bullets: [
              'RAG retrieves institutional policies, regulatory requirements, audit trails, consent rules, and sensitive data boundaries.',
              'ML monitors drift, bias, outlier behavior, and safety signals.',
              'This forms a governed, transparent AI ecosystem.'
            ]
          },
          {
            title: '10. Public Health and Population Management',
            paragraphs: [
              'Population health requires both prediction and context.'
            ],
            bullets: [
              'ML models forecast outbreak risk, chronic disease burden, high-risk cohorts, and utilization spikes.',
              'RAG retrieves community resources, public health advisories, local epidemiology, and social service programs.',
              'This enables community-aligned, equity-centered interventions.'
            ]
          },
          {
            title: 'The Unifying Architecture: A Healthcare-Wide RAG Backbone',
            steps: [
              {
                title: '1. Multi-modal ingestion',
                description: 'EHR notes, imaging reports, labs, claims, policies, guidelines, social work notes, community resources, and patient-generated data.'
              },
              {
                title: '2. Normalization and tagging',
                description: 'Clinical ontologies (SNOMED, LOINC, ICD), metadata (encounter, specialty, version, population), and sensitivity flags (behavioral health, reproductive health, HIV).'
              },
              {
                title: '3. Hybrid retrieval',
                description: 'Semantic + keyword + structured filters, patient-specific context, and role-based access.'
              },
              {
                title: '4. Grounded generation',
                description: 'No hallucinations, citations required, equity-aware prompts, and safety guardrails.'
              },
              {
                title: '5. Continuous learning',
                description: 'Clinician feedback, drift detection, guideline updates, and bias audits.'
              }
            ],
            paragraphs: [
              'This becomes the single intelligence layer that sits across the entire health system.'
            ]
          },
          {
            title: 'The Narrative in One Sentence',
            paragraphs: [
              'A unified ML + RAG platform transforms healthcare by grounding every clinical, operational, financial, and patient-facing decision in the right evidence, the right context, and the right safeguards - all delivered in real time, with full transparency and equity at the core.'
            ]
          },
          {
            title: 'Data Science in Healthcare',
            paragraphs: [
              'Data science is the analytical backbone of modern healthcare. It transforms raw, fragmented information into structured insight that clinicians, administrators, and operational leaders can act on. In a domain defined by heterogeneity-clinical notes, imaging, labs, claims, device streams, social determinants, and policy constraints-data science provides the methodological discipline that makes advanced intelligence possible.',
              'At its core, healthcare data science integrates statistical reasoning, computational engineering, and domain expertise to answer three foundational questions:'
            ],
            steps: [
              {
                title: '1. What is happening?',
                description: 'Descriptive analytics, cohort profiling, utilization patterns, care variation, and quality metrics.'
              },
              {
                title: '2. Why is it happening?',
                description: 'Causal inference, feature attribution, pathway analysis, and root cause exploration.'
              },
              {
                title: '3. What should we do next?',
                description: 'Predictive modeling, optimization, simulation, and decision intelligence.'
              }
            ]
          },
          {
            title: 'From Analytics to Clinical Intelligence',
            paragraphs: [
              'This analytical continuum supports every layer of the health system-from bedside care to enterprise operations.',
              'But healthcare complexity demands more than traditional analytics. Data is siloed, unstructured, and often incomplete. Clinical workflows require real-time context, not retrospective dashboards. And equity considerations require systems that surface social and structural factors, not just physiological ones.',
              'This is where data science becomes the foundation for ML and RAG.'
            ]
          },
          {
            title: 'How Data Science Powers ML and RAG in Healthcare'
          },
          {
            title: 'Data Science Pillars for ML and RAG in Healthcare',
            subtitle: 'Five connected capabilities turn fragmented data into safe, contextual, real-time intelligence.',
            cardLayout: 'healthcare-pillars',
            cards: [
              {
                name: '1. Data Engineering and Integration',
                role: 'Builds reliable, clinical-grade pipelines from fragmented sources.',
                highlights: [
                  'EHR extraction and normalization',
                  'Claims and financial data integration',
                  'Ontology mapping (SNOMED, LOINC, ICD, RxNorm) with metadata tagging',
                  'Text processing for notes and imaging reports',
                  'SDOH enrichment with resource linkage',
                  'Without this foundation, ML drifts and RAG hallucinates.'
                ]
              },
              {
                name: '2. Feature Engineering and Model Readiness',
                role: 'Converts raw records into robust predictive signal.',
                highlights: [
                  'Temporal features (trends, deltas, trajectories)',
                  'Clinical abstractions (severity scores, comorbidity indices)',
                  'Operational signals (bed occupancy, staffing ratios)',
                  'Behavioral and social indicators (adherence patterns, access barriers)',
                  'These features convert raw data into predictive signal.'
                ]
              },
              {
                name: '3. Corpus Engineering for RAG',
                role: 'Curates trustworthy knowledge retrieval for contextual reasoning.',
                highlights: [
                  'Chunking guidelines and pathways into meaningful units',
                  'Embedding generation with hybrid search tuning',
                  'Version control, lifecycle management, and sensitivity tagging',
                  'Retrieval quality evaluation and continuous improvement',
                  'This helps RAG retrieve the right evidence at the right time.'
                ]
              },
              {
                name: '4. Evaluation, Monitoring, and Governance',
                role: 'Defines guardrails for safety, fairness, and compliance.',
                highlights: [
                  'Model performance, drift, and fairness',
                  'Retrieval precision/recall and hallucination rates',
                  'Guideline alignment and documentation completeness',
                  'Equity audits across language, race, insurance, and geography',
                  'Human-in-the-loop feedback cycles that support compliance and clinical trust'
                ]
              },
              {
                name: '5. Decision Intelligence and Workflow Integration',
                role: 'Translates ML and RAG outputs into clinical and operational action.',
                highlights: [
                  'Embedding predictions into clinical workflows',
                  'Translating risk into action pathways',
                  'Aligning recommendations with institutional policy',
                  'Designing prompts and templates clinicians trust',
                  'Measuring downstream impact on outcomes, cost, and experience to operationalize analytics'
                ]
              }
            ]
          },
          {
            title: 'Unified Narrative: Data Science + ML + RAG in Healthcare',
            paragraphs: [
              'Data science provides the structure.',
              'ML provides the foresight.',
              'RAG provides the context and reasoning.',
              'Together, they form a unified intelligence layer that:'
            ],
            bullets: [
              'Predicts deterioration, readmission, utilization, and operational bottlenecks',
              'Retrieves the right guidelines, notes, and policies for the current patient',
              'Generates transparent, citation-anchored explanations',
              'Surfaces social and structural factors that shape care',
              'Supports clinicians, nurses, care managers, operations, finance, and research',
              'Ensures every recommendation is safe, equitable, and aligned with institutional standards',
              'This is the modern healthcare intelligence stack: predictive, contextual, explainable, and governed.'
            ]
          },
          {
            title: 'Healthcare ML vs Healthcare RAG vs Data Science - Comparison Grid',
            cardLayout: 'ml-rag-ds-comparison',
            comparisonRows: [
              {
                dimension: 'Core Function',
                ml: 'Predicts outcomes, risks, and patterns from historical structured data.',
                rag: 'Generates grounded, contextual answers using retrieved clinical content.',
                dataScience: 'Transforms raw data into insight through statistics, engineering, and domain expertise.'
              },
              {
                dimension: 'Primary Strength',
                ml: 'Forecasting (risk, utilization, deterioration, adherence, denials).',
                rag: 'Evidence-anchored reasoning across guidelines, notes, policies, and patient context.',
                dataScience: 'Framing questions, integrating data, and evaluating models and workflows.'
              },
              {
                dimension: 'Data Focus',
                ml: 'Structured: labs, vitals, claims, meds, flowsheets, imaging features.',
                rag: 'Unstructured: notes, guidelines, pathways, policies, consults, social work docs.',
                dataScience: 'All types: structured, semi-structured, unstructured, external and SDOH data.'
              },
              {
                dimension: 'How It Works',
                ml: 'Trains models on labeled datasets; outputs scores, classes, clusters.',
                rag: 'Retrieves relevant documents, then constrains generation to those sources.',
                dataScience: 'Builds pipelines, features, corpora, and evaluation frameworks for ML and RAG.'
              },
              {
                dimension: 'Typical Outputs',
                ml: 'Risk scores, predictions, classifications, segmentations.',
                rag: 'Summaries, recommendations, explanations, checklists with citations.',
                dataScience: 'Dashboards, cohorts, metrics, model evaluations, decision frameworks.'
              },
              {
                dimension: 'Ideal Use Cases',
                ml: 'Sepsis prediction, readmission risk, LOS, staffing, denial risk, imaging detection.',
                rag: 'Visit prep, guideline alignment, discharge planning, patient education, policy interpretation.',
                dataScience: 'Quality measurement, variation analysis, cohort design, corpus curation, governance.'
              },
              {
                dimension: 'Time Horizon',
                ml: 'Future-oriented (predictive and prescriptive).',
                rag: 'Present-oriented (contextual and interpretive).',
                dataScience: 'Past- and present-oriented (descriptive, diagnostic, and design for future models).'
              },
              {
                dimension: 'Governance Focus',
                ml: 'Model validation, drift, fairness, retraining pipelines.',
                rag: 'Corpus quality, retrieval performance, hallucination monitoring, access control.',
                dataScience: 'Metric design, bias audits, study design, risk registers, policy alignment.'
              },
              {
                dimension: 'Strategic Role',
                ml: 'Predictive backbone of clinical and operational decision-making.',
                rag: 'Knowledge-anchored reasoning layer for transparent, explainable support.',
                dataScience: 'Analytical foundation that makes ML and RAG reliable, safe, and meaningful.'
              }
            ]
          }
        ],
        closingParagraphs: [
          'In a landscape defined by complexity, ML + RAG + Data Science offer a new paradigm: a healthcare system that not only sees the future, but understands the present—deeply, contextually, and responsibly.'
        ]
      },
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
