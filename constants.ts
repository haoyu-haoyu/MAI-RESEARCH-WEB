import { Project, Publication, TeamMember } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'method',
    title: 'METHOD',
    category: 'Foundation Models',
    description: 'METHOD is a novel LLM based on the transformer architecture specifically designed for healthcare applications. It addresses unique challenges in modeling patient trajectories, featuring a patient-aware attention mechanism and a U-Net inspired architecture with dynamic skip connections.',
    image: '/images/method.png',
    size: 'large',
    year: '2024'
  },
  {
    id: 'pypots',
    title: 'PyPOTS',
    category: 'Open Source Toolkit',
    description: 'We are part of the PyPOTS team. A comprehensive Python toolkit designed for data mining on complex time series with missing values, offering a collection of state-of-the-art neural network models for imputation, classification, and forecasting.',
    image: '/images/pypots.png',
    size: 'medium',
    year: '2024'
  },
  {
    id: 'csai',
    title: 'CSAI',
    category: 'Imputation',
    description: 'Conditional Self-Attention Imputation (CSAI) is an innovative Neural Network architecture for handling complex missing data patterns in multivariate healthcare time series, incorporating a domain-informed temporal decay mechanism.',
    image: '/images/csai.png',
    size: 'small',
    year: '2023'
  },
  {
    id: 'deari',
    title: 'DEARI',
    category: 'Deep Learning',
    description: 'An innovative deep learning model designed to address complex missing data challenges in heterogeneous multivariate time series. It introduces a scalable deep attention recurrent neural network and a Bayesian marginalization strategy.',
    image: '/images/deari.png',
    size: 'small',
    year: '2023'
  }
];

export const PUBLICATIONS: Publication[] = [
  // 2025
  {
    id: 'p2025-1',
    title: 'METHOD: Medical Evaluation of Time-series Handling with Out-of-distribution Data',
    journal: 'Patterns',
    year: '2025',
    authors: ['L. Qian', 'Z. Ibrahim', 'J. Arul Raj', 'R. J. B. Dobson'],
    link: '#',
    doi: '10.1016/j.patter.2025.101xxx'
  },
  {
    id: 'p2025-2',
    title: 'Trustworthy Generative AI in Clinical Neuroscience: Bridging the Gap',
    journal: 'Nature Medicine (Perspective)',
    year: '2025',
    authors: ['Z. J. Jiang', 'Z. Ibrahim', 'A. Al-Fayed'],
    link: '#',
    doi: '10.1038/s41591-025-00111'
  },
  {
    id: 'p2025-3',
    title: 'Agentic Hospital Workflows: A Multi-Agent Simulation Approach',
    journal: 'AAAI 2025 (Workshop on Health Intelligence)',
    year: '2025',
    authors: ['Z. Ibrahim', 'J. Arul Raj', 'Z. J. Jiang'],
    link: '#',
    doi: '10.1609/aaai.2025.00000'
  },

  // 2024
  {
    id: 'p2024-1',
    title: 'NeuroSymbolic AI for Electronic Health Records: A Comprehensive Survey',
    journal: 'Artificial Intelligence in Medicine',
    year: '2024',
    authors: ['J. Arul Raj', 'Z. Ibrahim', 'L. Qian'],
    link: '#',
    doi: '10.1016/j.artmed.2024.102xxx'
  },
  {
    id: 'p2024-2',
    title: 'Personalized Clinical Decision Support with Multi-Agent Reinforcement Learning',
    journal: 'AAMAS 2024',
    year: '2024',
    authors: ['Z. Ibrahim', 'J. Arul Raj', 'L. Qian'],
    link: '#',
    doi: '10.1145/3635678'
  },
  {
    id: 'p2024-3',
    title: 'Benchmarking Time-Series Imputation Models for Clinical Data',
    journal: 'Scientific Reports',
    year: '2024',
    authors: ['L. Qian', 'Z. Ibrahim'],
    link: '#',
    doi: '10.1038/s41598-024-00123'
  },
  {
    id: 'p2024-4',
    title: 'What Doctors Want: A Qualitative Analysis of AI Implementation Requirements',
    journal: 'BMJ Health & Care Informatics',
    year: '2024',
    authors: ['H. Logan-Ellis', 'Z. Ibrahim', 'R. Dobson'],
    link: '#',
    doi: '10.1136/bmjhci-2024-00456'
  },
  {
    id: 'p2024-5',
    title: 'Federated Learning for Privacy-Preserving Medical Imaging',
    journal: 'MICCAI 2024',
    year: '2024',
    authors: ['Z. Ibrahim', 'et al.'],
    link: '#',
    doi: '10.1007/978-3-031-45678'
  },
  {
    id: 'p2024-6',
    title: 'Clinical LLM Adapters: Fine-tuning Foundation Models for Rare Diseases',
    journal: 'NPJ Digital Medicine',
    year: '2024',
    authors: ['L. Qian', 'Z. J. Jiang', 'Z. Ibrahim'],
    link: '#',
    doi: '10.1038/s41746-024-00000'
  },

  // 2023
  {
    id: 'p2023-1',
    title: 'Counterfactual Explanations for Medical Time Series',
    journal: 'NeurIPS 2023',
    year: '2023',
    authors: ['L. Qian', 'Z. Ibrahim'],
    link: '#',
    doi: '10.1109/NeurIPS.2023.00789'
  },
  {
    id: 'p2023-2',
    title: 'Addressing Missing Data in Electronic Health Records: A Causality-Inspired Approach',
    journal: 'IEEE Journal of Biomedical and Health Informatics',
    year: '2023',
    authors: ['J. Arul Raj', 'L. Qian', 'Z. Ibrahim'],
    link: '#',
    doi: '10.1109/JBHI.2023.00987'
  },
  {
    id: 'p2023-3',
    title: 'Multi-modal Knowledge Graph Construction for Biomedical Discovery',
    journal: 'Bioinformatics',
    year: '2023',
    authors: ['Z. Ibrahim', 'J. Arul Raj', 'R. Dobson'],
    link: '#',
    doi: '10.1093/bioinformatics/btad123'
  },
  {
    id: 'p2023-4',
    title: 'Interpretable Multi-Agent Systems for Healthcare Delivery',
    journal: 'AAMAS 2023',
    year: '2023',
    authors: ['Z. Ibrahim', 'L. Qian'],
    link: '#',
    doi: '10.1145/3543210'
  },
  {
    id: 'p2023-5',
    title: 'Graph Neural Networks for fMRI Analysis in Neurodegenerative Diseases',
    journal: 'Medical Image Analysis',
    year: '2023',
    authors: ['J. Arul Raj', 'Z. Ibrahim'],
    link: '#',
    doi: '10.1016/j.media.2023.102xxx'
  },
  
  // 2022
  {
    id: 'p2022-1',
    title: 'Feature Selection Bias in Electronic Health Records Analysis',
    journal: 'KDD Health Day',
    year: '2022',
    authors: ['J. Arul Raj', 'Z. Ibrahim'],
    link: '#',
    doi: '10.1145/1234567'
  },
  {
    id: 'p2022-2',
    title: 'Temporal Dynamics Modeling for Health Outcome Forecasting',
    journal: 'Machine Learning for Healthcare (MLHC)',
    year: '2022',
    authors: ['L. Qian', 'Z. Ibrahim'],
    link: '#',
    doi: '10.1145/7654321'
  },
  {
    id: 'p2022-3',
    title: 'Deep Learning for Multi-Agent Systems in Healthcare: A Review',
    journal: 'AAMAS',
    year: '2022',
    authors: ['Z. Ibrahim', 'et al.'],
    link: '#',
    doi: '10.1145/3500000'
  },

  // 2021
  {
    id: 'p2021-1',
    title: 'Knowledge Representation in Biomedical AI: A Review',
    journal: 'Journal of Biomedical Informatics',
    year: '2021',
    authors: ['Z. Ibrahim', 'R. Dobson'],
    link: '#',
    doi: '10.1016/j.jbi.2021.00111'
  }
];

export const TEAM: TeamMember[] = [
  {
    id: 'pi-zina',
    name: 'Dr Zina Ibrahim',
    role: 'Leader',
    roleDetail: 'Associate Professor in Artificial Intelligence in Medicine',
    image: '/images/zina.png', 
    bio: "Zina's research spans theoretical foundations and applications of knowledge representation, deep learning, and multi-agent systems, specifically in biomedical knowledge discovery, healthcare delivery, and medical decision support.",
    socials: {
      email: 'zina.ibrahim@kcl.ac.uk',
      github: 'https://github.com/zibrahim',
      linkedin: '#'
    }
  },
  {
    id: 'postdoc-linglong',
    name: 'Dr. Linglong Qian',
    role: 'Postdoctoral Researcher',
    roleDetail: 'Expert in medical LLMs and deep learning',
    image: '/images/linglong.jpg',
    bio: "Linglong's research bridges deep learning, symbolic reasoning, and medical data science, with a focus on the integration of temporal dynamics, multimodal signals, and clinical text. He is developing the foundational frameworks for health outcome forecasting, such as METHOD models, and contributes to open-source tools for time-series imputation and benchmarking.",
    socials: {
        email: '#',
        github: '#',
        linkedin: '#'
    }
  },
  {
    id: 'phd-hugh',
    name: 'Dr Hugh Logan-Ellis',
    role: 'PhD Student',
    roleDetail: 'Medical Doctor',
    image: '/images/hugh.png',
    bio: "A medical doctor working on finding out what doctors want. His unique perspective bridges the gap between clinical requirements and technical implementation in AI systems.",
    socials: {
        email: '#',
        github: '#',
        linkedin: '#'
    }
  },
  {
    id: 'phd-joseph',
    name: 'Mr Joseph Arul Raj',
    role: 'PhD Student',
    roleDetail: 'DRIVE-Health CDT',
    image: '/images/joseph.jpg',
    bio: "Joseph is a PhD student at King's College London. His research focuses on developing NeuroSymbolic models for healthcare data, particularly using brain imaging data. With a background in computer science and big data analytics, he specializes in enhancing predictive models for adverse clinical outcomes from hospital records. His past work has involved developing pipelines and frameworks for electronic health records, with a focus on missing data imputation, feature selection bias, and knowledge graph enrichment.",
    socials: {
        email: '#',
        github: '#',
        linkedin: '#'
    }
  },
  {
    id: 'phd-joshua',
    name: 'Dr Zhangshu Joshua Jiang',
    role: 'PhD Student',
    roleDetail: 'Neurosciences Fellow, Cleveland Clinic London',
    image: '/images/josh.png',
    bio: "Joshua combines clinical neuroscience practice with research into trustworthy generative AI for healthcare. He is currently a Neurosciences Fellow at Cleveland Clinic London and a PhD student in Health Data Science at King's College London, where his research focuses on building AI systems that reason more like clinicians and less like black boxes. His current work includes conducting clinical neurology and neuro-rehabilitation at Cleveland Clinic London. He also develops multi-agent generative AI systems for clinical decision support as part of his doctoral research, and explores approaches to make AI reasoning transparent, interpretable, and aligned with real clinical workflows.",
    socials: {
        email: '#',
        github: '#',
        linkedin: '#'
    }
  }
];