import { Project, ProjectPageData, Publication, TeamMember } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'method',
    title: 'METHOD',
    category: 'Foundation Models',
    description: 'METHOD is a novel LLM based on the transformer architecture specifically designed for healthcare applications. It addresses unique challenges in modeling patient trajectories, featuring a patient-aware attention mechanism and a U-Net inspired architecture with dynamic skip connections.',
    image: 'images/method.png',
    link: '#/method',
    size: 'large',
    year: '2024'
  },
  {
    id: 'pypots',
    title: 'PyPOTS',
    category: 'Open Source Toolkit',
    description: 'We are part of the PyPOTS team. A comprehensive Python toolkit designed for data mining on complex time series with missing values, offering a collection of state-of-the-art neural network models for imputation, classification, and forecasting.',
    image: 'images/pypots.png',
    link: '#/projects/pypots',
    size: 'medium',
    year: '2024'
  },
  {
    id: 'csai',
    title: 'CSAI',
    category: 'Imputation',
    description: 'Conditional Self-Attention Imputation (CSAI) is an innovative Neural Network architecture for handling complex missing data patterns in multivariate healthcare time series, incorporating a domain-informed temporal decay mechanism.',
    image: 'images/csai.png',
    link: '#/projects/csai',
    size: 'small',
    year: '2025'
  },
  {
    id: 'deari',
    title: 'DEARI',
    category: 'Deep Learning',
    description: 'An innovative deep learning model designed to address complex missing data challenges in heterogeneous multivariate time series. It introduces a scalable deep attention recurrent neural network and a Bayesian marginalization strategy.',
    image: 'images/deari.png',
    link: '#/projects/deari',
    size: 'small',
    year: '2024'
  }
];

export const PROJECT_PAGES: Record<string, ProjectPageData> = {
  pypots: {
    id: 'pypots',
    title: 'PyPOTS',
    category: 'Open Source Toolkit',
    year: '2024',
    image: 'images/pypots.png',
    imageAlt: 'PyPOTS open-source toolkit workflow diagram',
    headline: 'A Python ecosystem for partially observed time series.',
    summary: 'PyPOTS brings imputation, classification, forecasting, clustering, and anomaly detection workflows into a unified toolkit for partially observed time series.',
    focus: 'Partially observed time series',
    model: 'Toolkit',
    overview: [
      {
        label: 'Problem',
        title: 'Missingness is a default condition in real data.',
        text: 'Clinical and operational time series often arrive with irregular sampling, gaps, and task-specific preprocessing needs that make reproducible experiments difficult.'
      },
      {
        label: 'Approach',
        title: 'Unify tasks behind practical Python APIs.',
        text: 'PyPOTS provides a consistent research-to-tooling layer across imputation, classification, forecasting, clustering, and anomaly detection for partially observed time series.'
      },
      {
        label: 'Outcome',
        title: 'Lower friction for benchmarking and reuse.',
        text: 'The toolkit helps researchers compare models, package experiments, and connect new methods with an ecosystem that is easier to install, document, and extend.'
      }
    ],
    ideas: [
      {
        label: '01',
        title: 'Partially observed time series first',
        text: 'The project is designed around POTS data rather than treating missing values as an afterthought.'
      },
      {
        label: '02',
        title: 'Shared task interface',
        text: 'A unified toolkit structure keeps data preparation, model use, and evaluation closer across common time-series tasks.'
      },
      {
        label: '03',
        title: 'Research-ready documentation',
        text: 'Docs, tutorials, and examples help methods move from a paper implementation into repeatable workflows.'
      },
      {
        label: '04',
        title: 'Open-source maintenance',
        text: 'The project is maintained as a community-facing package, so new algorithms and benchmarks can be added without starting from scratch.'
      }
    ],
    metrics: [
      { value: '5', label: 'Time-series tasks' },
      { value: 'OSS', label: 'Open-source package' },
      { value: 'POTS', label: 'Native data focus' }
    ],
    resources: [
      {
        label: 'Website',
        href: 'https://pypots.com/',
        description: 'Project homepage and overview.',
        primary: true
      },
      {
        label: 'GitHub',
        href: 'https://github.com/WenjieDu/PyPOTS/',
        description: 'Source code and package development.'
      },
      {
        label: 'Documentation',
        href: 'https://docs.pypots.com/',
        description: 'Installation, tutorials, and API reference.'
      }
    ],
    note: 'This page describes MAI-related use of the PyPOTS ecosystem and links out to the upstream open-source project for full documentation.'
  },
  csai: {
    id: 'csai',
    title: 'CSAI',
    category: 'Imputation',
    year: '2025',
    image: 'images/csai.png',
    imageAlt: 'CSAI architecture diagram',
    headline: 'Conditional self-attention for healthcare time-series imputation.',
    summary: 'CSAI targets complex missingness in multivariate healthcare time series with conditional self-attention and domain-informed temporal decay.',
    focus: 'Healthcare imputation',
    model: 'Self-attention',
    overview: [
      {
        label: 'Problem',
        title: 'Healthcare missingness is structured, not random noise.',
        text: 'Clinical measurements are recorded at different frequencies and often reflect care decisions, making simple interpolation or generic masking insufficient.'
      },
      {
        label: 'Approach',
        title: 'Condition attention on clinical time gaps.',
        text: 'CSAI combines self-attention with temporal decay so the model can account for both observed signals and the time elapsed between measurements.'
      },
      {
        label: 'Outcome',
        title: 'A focused model for imputation benchmarks.',
        text: 'The work is presented as a healthcare time-series imputation method and is linked to the project code, PDF, and publication record.'
      }
    ],
    ideas: [
      {
        label: '01',
        title: 'Conditional attention',
        text: 'Attention weights are shaped by the clinical sequence context rather than relying on sequence position alone.'
      },
      {
        label: '02',
        title: 'Temporal decay',
        text: 'Time gaps are treated as meaningful information for imputation instead of being hidden by preprocessing.'
      },
      {
        label: '03',
        title: 'Healthcare time series',
        text: 'The model is framed around multivariate clinical data where measurements are sparse and irregular.'
      },
      {
        label: '04',
        title: 'Reproducible implementation',
        text: 'The page routes readers to the public code and PDF so the method can be inspected beyond the summary view.'
      }
    ],
    metrics: [
      { value: 'JBHI', label: 'Publication venue' },
      { value: '2025', label: 'Publication year' },
      { value: 'PDF', label: 'Paper available' }
    ],
    resources: [
      {
        label: 'GitHub',
        href: 'https://github.com/LinglongQian/CSAI',
        description: 'Project repository and source code.',
        primary: true
      },
      {
        label: 'Paper',
        href: 'https://ieeexplore.ieee.org/abstract/document/11314658',
        description: 'IEEE JBHI publication page.'
      },
      {
        label: 'PDF',
        href: 'https://mai-research.github.io/docs/csai.pdf',
        description: 'Hosted PDF copy from the MAI site.'
      }
    ]
  },
  deari: {
    id: 'deari',
    title: 'DEARI',
    category: 'Deep Learning',
    year: '2024',
    image: 'images/deari.png',
    imageAlt: 'DEARI model architecture diagram',
    headline: 'Deep attention recurrent imputation for heterogeneous time series.',
    summary: 'DEARI studies imputation for heterogeneous multivariate time series using deep attention recurrent modelling and Bayesian marginalization.',
    focus: 'Multivariate time series',
    model: 'Deep recurrent attention',
    overview: [
      {
        label: 'Problem',
        title: 'Incomplete time series remain hard to model robustly.',
        text: 'Different variables can have different missingness patterns, temporal structure, and uncertainty, especially when data sources are heterogeneous.'
      },
      {
        label: 'Approach',
        title: 'Combine recurrent dynamics with attention.',
        text: 'DEARI uses a deep attention recurrent formulation to represent temporal dependencies while accounting for uncertainty in missing observations.'
      },
      {
        label: 'Outcome',
        title: 'A research model for imputation under uncertainty.',
        text: 'The page keeps the focus on the published method and links readers to the arXiv paper for full experimental and mathematical detail.'
      }
    ],
    ideas: [
      {
        label: '01',
        title: 'Deep recurrent backbone',
        text: 'Sequential dynamics are modelled with recurrent structure rather than a purely static imputation rule.'
      },
      {
        label: '02',
        title: 'Attention over temporal evidence',
        text: 'Attention helps the model weigh relevant observations when imputing missing values.'
      },
      {
        label: '03',
        title: 'Bayesian marginalization',
        text: 'The method explicitly reasons about uncertainty instead of collapsing all missing values into one deterministic proxy.'
      },
      {
        label: '04',
        title: 'Heterogeneous settings',
        text: 'The model is motivated by multivariate sequences where variables and observation patterns differ across time.'
      }
    ],
    metrics: [
      { value: 'arXiv', label: 'Paper source' },
      { value: '2024', label: 'Research year' },
      { value: 'RNN', label: 'Model family' }
    ],
    resources: [
      {
        label: 'arXiv',
        href: 'https://arxiv.org/abs/2401.02258',
        description: 'Paper abstract and PDF.',
        primary: true
      }
    ],
    note: 'No separate public repository is linked here because the current project data does not include a verified DEARI code URL.'
  }
};

export const PUBLICATIONS: Publication[] = [
  {
    id: 'p2025-csai',
    title: 'CSAI: Conditional Self-Attention Imputation for Healthcare Time-series',
    journal: 'IEEE JBHI',
    year: '2025',
    authors: ['Qian, L., Raj, J. A., Ellis, H. L., Zhang, A., Zhang, Y., Wang, T., Dobson, R. J., & Ibrahim, Z.'],
    link: 'https://ieeexplore.ieee.org/abstract/document/11314658',
    pdf: 'https://mai-research.github.io/docs/csai.pdf',
    doi: ''
  },
  {
    id: 'p2025-early-warning',
    title: 'The early warning paradox',
    journal: 'npj Digital Medicine 8, 81 (2025)',
    year: '2025',
    authors: ['Logan Ellis, H., Palmer, E., Teo, J.T. et al.'],
    link: 'https://doi.org/10.1038/s41746-024-01408-x',
    doi: ''
  },
  {
    id: 'p2024-fine-tuning',
    title: 'Fine-tuning – a Transfer Learning approach',
    journal: '2024',
    year: '2024',
    authors: ['Raj, J. A., Qian, L., & Ibrahim, Z.'],
    link: 'https://arxiv.org/abs/2411.03941',
    doi: ''
  },
  {
    id: 'p2025-how-deep',
    title: 'How Deep is your Guess? A Fresh Perspective on Deep Learning for Medical Time-Series Imputation',
    journal: '2025',
    year: '2025',
    authors: ['Qian, L., Wang, T., Wang, J., Ellis, H. L., Mitra, R., Dobson, R., & Ibrahim, Z.'],
    link: 'https://ieeexplore.ieee.org/document/10994403',
    doi: ''
  },
  {
    id: 'p2024-survey',
    title: 'Deep Learning for Multivariate Time Series Imputation: A Survey',
    journal: '2024',
    year: '2024',
    authors: ['Wang, J., Du, W., Yang, Y., Qian, L., Cao, W., Zhang, K., Wang, W., Liang, Y. and Wen, Q.'],
    link: 'https://arxiv.org/abs/2402.04059',
    doi: ''
  },
  {
    id: 'p2024-tsi-bench',
    title: 'TSI-Bench: Benchmarking Time Series Imputation',
    journal: '2024',
    year: '2024',
    authors: ['Du, W., Wang, J., Qian, L., Yang, Y., Ibrahim, Z., Liu, F., Wang, Z., Liu, H., Zhao, Z., Zhou, Y., Wang, W., Ding, K., Liang, Y., Prakash, B. A., & Wen, Q.'],
    link: 'https://arxiv.org/abs/2406.12747',
    doi: ''
  },
  {
    id: 'p2025-beyond-random',
    title: 'Beyond Random Missingness: Clinically Rethinking for Healthcare Time Series Imputation',
    journal: '2025',
    year: '2025',
    authors: ['Qian, L., Yang, Y., Du, W., Wang, J., Dobsoni, R., & Ibrahim, Z.'],
    link: 'https://arxiv.org/abs/2405.17508',
    doi: ''
  },
  {
    id: 'p2024-darnn',
    title: 'Uncertainty-Aware Deep Attention Recurrent Neural Network for Heterogeneous Time Series Imputation',
    journal: '2024',
    year: '2024',
    authors: ['Qian, L., Ibrahim, Z., & Dobson, R.'],
    link: 'https://arxiv.org/abs/2401.02258',
    doi: ''
  },
  {
    id: 'p2024-radiology-llm',
    title: 'Exploring Multimodal Large Language Models for Radiology Report Error-checking',
    journal: '2024',
    year: '2024',
    authors: ['Wu, J., Kim, Y., Keller, E. C., Chow, J., Levine, A. P., Pontikos, N., Ibrahim, Z., Taylor, P., Williams, M. C., & Wu, H.'],
    link: 'https://arxiv.org/abs/2312.13103',
    doi: ''
  },
  {
    id: 'p2023-myhealthe',
    title: 'Moving from development to implementation of digital innovations within the NHS: myHealthE',
    journal: 'DIGITAL HEALTH (2023)',
    year: '2023',
    authors: ['Morris AC, Ibrahim Z, Moghraby OS, et al.'],
    link: 'https://doi.org/10.1177/20552076231211551',
    doi: ''
  },
  {
    id: 'p2023-discharge-summary',
    title: 'Discharge summary hospital course summarisation of in patient Electronic Health Record text',
    journal: 'Journal of Biomedical Informatics, 141, 104358 (2023)',
    year: '2023',
    authors: ['Searle, T., Ibrahim, Z., Teo, J., & Dobson, R. J. B.'],
    link: 'https://doi.org/10.1016/j.jbi.2023.104358',
    doi: ''
  },
  {
    id: 'p2023-camhs',
    title: 'Assessing the feasibility of a web-based outcome measurement system in CAMHS – myHealthE',
    journal: 'Child Adolesc Ment Health, 28: 128–147 (2023)',
    year: '2023',
    authors: ['Morris, A.C., Ibrahim, Z., Heslin, M., Moghraby, O.S., et al.'],
    link: 'https://doi.org/10.1111/camh.12571',
    doi: ''
  },
  {
    id: 'p2023-class-imbalance',
    title: 'Addressing Class Imbalance in Electronic Health Records Data Imputation',
    journal: '6th Int. Workshop on Knowledge Discovery From Healthcare Data (2023)',
    year: '2023',
    authors: ['Qian, L., Ibrahim, Z., Zhang, A., Dobson, R.J.B.'],
    link: 'https://ceur-ws.org/Vol-3479/paper7.pdf',
    pdf: 'https://ceur-ws.org/Vol-3479/paper7.pdf',
    doi: ''
  },
  {
    id: 'p2022-optima',
    title: 'OPTIMA: Remote recruitment and assessment for ADHD referrals',
    journal: 'Pilot Feasibility Stud 8, 1 (2022)',
    year: '2022',
    authors: ['Kostyrka-Allchorne, K., Ballard, C., Byford, S. et al.'],
    link: 'https://doi.org/10.1186/s40814-021-00959-0',
    doi: ''
  },
  {
    id: 'p2022-summarisation',
    title: 'Summarisation of Electronic Health Records with Clinical Concept Guidance',
    journal: '2022',
    year: '2022',
    authors: ['Searle, T., Ibrahim, Z., Teo, J., & Dobson, R.'],
    link: 'https://kclpure.kcl.ac.uk/portal/files/188150736/2211.07126v1.pdf',
    pdf: 'https://kclpure.kcl.ac.uk/portal/files/188150736/2211.07126v1.pdf',
    doi: ''
  },
  {
    id: 'p2022-multimodal-latent',
    title: 'Multi-modal Latent-Space Self-alignment for Super-Resolution Cardiac MR Segmentation',
    journal: 'STACOM 2022, LNCS vol. 13593',
    year: '2022',
    authors: ['Deng, Y. et al.'],
    link: 'https://doi.org/10.1007/978-3-031-23443-9_3',
    doi: ''
  },
  {
    id: 'p2022-urban-features',
    title: 'Evaluating physical urban features in several mental illnesses',
    journal: 'Frontiers in Digital Health (2022)',
    year: '2022',
    authors: ['Mahabadi, Z., Mahabadi, M., Velupillai, S., Roberts, A., McGuire, P., Ibrahim, Z., & Patel, R.'],
    link: 'https://doi.org/10.3389/fdgth.2022.874237',
    doi: ''
  },
  {
    id: 'p2022-geoexplorer',
    title: 'GEOexplorer: a webserver for gene expression analysis and visualisation',
    journal: 'Nucleic Acids Research, 50(W1): W367–W374 (2022)',
    year: '2022',
    authors: ['Hunt, G. P., Grassi, L., Henkin, R., Smeraldi, F., et al.'],
    link: 'https://doi.org/10.1093/nar/gkac364',
    doi: ''
  },
  {
    id: 'p2021-redundancy',
    title: 'Estimating redundancy in clinical text',
    journal: 'Journal of Biomedical Informatics, 124, 103938 (2021)',
    year: '2021',
    authors: ['Searle, T., Ibrahim, Z., Teo, J., & Dobson, R.'],
    link: 'https://doi.org/10.1016/j.jbi.2021.103938',
    doi: ''
  },
  {
    id: 'p2021-medcat',
    title: 'Multi-domain clinical natural language processing with MedCAT: The Medical Concept Annotation Toolkit',
    journal: 'Artificial Intelligence in Medicine, 117, 102083 (2021)',
    year: '2021',
    authors: ['Kraljevic, Z., Searle, T., Shek, A., Roguski, L., Noor, K., Bean, D., Mascio, A., Zhu, L., Folarin, A. A., Roberts, A., Bendayan, R., Richardson, M. P., Stewart, R., Shah, A. D., Wong, W. K., Ibrahim, Z., Teo, J. T., & Dobson, R. J. B.'],
    link: 'https://doi.org/10.1016/j.artmed.2021.102083',
    doi: ''
  },
  {
    id: 'p2022-knowledge-distillation',
    title: 'A Knowledge Distillation Ensemble Framework for Predicting Short- and Long-Term Hospitalization Outcomes From Electronic Health Records Data',
    journal: 'IEEE Journal of Biomedical and Health Informatics, vol. 26, no. 1, pp. 423-435 (2022)',
    year: '2022',
    authors: ['Z. M. Ibrahim et al.'],
    link: 'https://doi.org/10.1109/JBHI.2021.3089287',
    doi: ''
  },
  {
    id: 'p2021-ensemble-covid',
    title: 'Ensemble learning for poor prognosis predictions: A case study on SARS-CoV-2',
    journal: 'Journal of the American Medical Informatics Association, Volume 28, Issue 4, Pages 791–800 (2021)',
    year: '2021',
    authors: ['Honghan Wu, Huayu Zhang, Andreas Karwath, Zina Ibrahim, Ting Shi, Xin Zhang, Kun Wang, Jiaxing Sun, Kevin Dhaliwal, Daniel Bean, Victor Roth Cardoso, Kezhi Li, James T Teo, Amitava Banerjee, Fang Gao-Smith, Tony Whitehouse, Tonny Veenith, Georgios V Gkoutos, Xiaodong Wu, Richard Dobson, Bruce Guthrie'],
    link: 'https://doi.org/10.1093/jamia/ocaa295',
    doi: ''
  },
  {
    id: 'p2020-clozapine',
    title: 'The side effect profile of Clozapine in real world data of three large mental health hospitals',
    journal: 'PLOS ONE 15(12): e0243437 (2020)',
    year: '2020',
    authors: ['Iqbal E, Govind R, Romero A, Dzahini O, Broadbent M, et al.'],
    link: 'https://doi.org/10.1371/journal.pone.0243437',
    doi: ''
  },
  {
    id: 'p2020-epigenome',
    title: 'An epigenome-wide association study of Alzheimer\'s disease blood highlights robust DNA hypermethylation in the HOXB6 gene',
    journal: 'Neurobiology of Aging, 95, 26–45 (2020)',
    year: '2020',
    authors: ['Roubroeks, J. A. Y., Smith, A. R., Smith, R. G., Pishva, E., Ibrahim, Z., et al.'],
    link: 'https://doi.org/10.1016/j.neurobiolaging.2020.06.023',
    doi: ''
  },
  {
    id: 'p2020-biomarkers',
    title: 'Added value of biomarkers and polygenic risk scores as risk factors for coronary artery disease',
    journal: 'GENETIC EPIDEMIOLOGY, Vol. 44, No. 5, pp. 516-516 (2020)',
    year: '2020',
    authors: ['Sharapova, N., Maxwell, J. M., Glanville, K., Hagenaars, S. P., Russell, R., Ibrahim, Z. M., & Lewis, C. M.'],
    link: '',
    doi: ''
  },
  {
    id: 'p2020-silver-standard',
    title: 'Experimental Evaluation and Development of a Silver-Standard for the MIMIC-III Clinical Coding Dataset',
    journal: 'Proceedings of the 19th SIGBioMed Workshop on Biomedical Language Processing (2020)',
    year: '2020',
    authors: ['Searle, T., Ibrahim, Z., & Dobson, R.'],
    link: 'https://doi.org/10.18653/v1/2020.bionlp-1.8',
    doi: ''
  },
  {
    id: 'p2020-alzheimers-speech',
    title: 'Comparing Natural Language Processing Techniques for Alzheimer\'s Dementia Prediction in Spontaneous Speech',
    journal: '(2020)',
    year: '2020',
    authors: ['Searle, T., Ibrahim, Z., & Dobson, R.'],
    link: 'https://arxiv.org/abs/2006.07358',
    doi: ''
  },
  {
    id: 'p2020-sepsis',
    title: 'On classifying sepsis heterogeneity in the ICU: insight using machine learning',
    journal: 'Journal of the American Medical Informatics Association, Volume 27, Issue 3, Pages 437–443 (2020)',
    year: '2020',
    authors: ['Zina M Ibrahim, Honghan Wu, Ahmed Hamoud, Lukas Stappen, Richard J B Dobson, Andrea Agarossi'],
    link: 'https://doi.org/10.1093/jamia/ocz211',
    doi: ''
  },
  {
    id: 'p2020-semehr',
    title: 'Identifying physical health comorbidities in a cohort of individuals with severe mental illness: An application of SemEHR',
    journal: '(2020)',
    year: '2020',
    authors: ['Bendayan, R., Wu, H., Kraljevic, Z., Stewart, R., Searle, T., Chaturvedi, J., Das-Munshi, J., Ibrahim, Z., Mascio, A., Roberts, A., Bean, D., & Dobson, R.'],
    link: 'https://arxiv.org/abs/2002.08901',
    doi: ''
  }
];

export const TEAM: TeamMember[] = [
  {
    id: 'pi-zina',
    name: 'Dr Zina Ibrahim',
    role: 'Leader',
    roleDetail: 'Associate Professor in Artificial Intelligence in Medicine',
    image: 'images/zina.png',
    bio: "Zina's research spans theoretical foundations and applications of knowledge representation, deep learning, and multi-agent systems, specifically in biomedical knowledge discovery, healthcare delivery, and medical decision support.",
    socials: {
      email: 'zina.ibrahim@kcl.ac.uk',
      github: 'https://github.com/zibrahim',
      linkedin: 'https://linkedin.com/in/zina-ibrahim-756ab01a'
    }
  },
  {
    id: 'postdoc-linglong',
    name: 'Dr. Linglong Qian',
    role: 'Postdoctoral Researcher',
    roleDetail: 'Expert in medical LLMs and deep learning',
    image: 'images/linglong.jpg',
    bio: "Linglong's research bridges deep learning, symbolic reasoning, and medical data science, with a focus on the integration of temporal dynamics, multimodal signals, and clinical text. He is developing the foundational frameworks for health outcome forecasting, such as METHOD models, and contributes to open-source tools for time-series imputation and benchmarking.",
    socials: {
      email: 'linglong.qian@kcl.ac.uk',
      github: 'https://github.com/LinglongQian',
      linkedin: 'https://linkedin.com/in/linglongqian'
    }
  },
  {
    id: 'phd-hugh',
    name: 'Dr Hugh Logan-Ellis',
    role: 'Clinical Lecturer, St Thomas\' Hospital Campus',
    roleDetail: 'Physician (General Internal Medicine & Endocrinology) and scientist (clinical AI and latent health status measurement)',
    image: 'images/hugh.png',
    bio: "Hugh's research focuses on the \"pragmatic extraction\" of health measures from electronic health records (EHRs), addressing critical gaps in clinical decision support. Hugh's research coined the \"early warning paradox,\" exploring how retrospective AI validation can undervalue life-saving tools, and the \"polar bear problem,\" where models learn to mirror clinical suspicion rather than pure physiology. Hugh's current work aims to move AI from \"predicting fate\" to \"measuring state\" by developing \"digital twins\"— physiological simulators that leverage foundation models and clinical embeddings to provide transparent, real-time insights into a patient's underlying physiological reserve.",
    socials: {
      email: 'hugh.logan_ellis@kcl.ac.uk',
      github: 'https://github.com/HughLoganEllis',
      linkedin: 'https://linkedin.com/in/hugh-logan-ellis'
    }
  },
  {
    id: 'phd-joseph',
    name: 'Mr Joseph Arul Raj',
    role: 'PhD Student (DRIVE-Health CDT)',
    roleDetail: 'NeuroSymbolic and Multimodal AI for Healthcare',
    image: 'images/joseph.jpg',
    bio: "Joseph is a PhD student at King's College London. His research focuses on developing NeuroSymbolic models for healthcare data, particularly using brain imaging data. With a background in computer science and big data analytics, he specializes in enhancing predictive models for adverse clinical outcomes from hospital records. His past work has involved developing pipelines and frameworks for electronic health records, with a focus on missing data imputation, feature selection bias, and knowledge graph enrichment.",
    socials: {
      email: 'joseph_arul_raj@kcl.ac.uk',
      github: 'https://github.com/joseph-arulraj',
      linkedin: 'https://linkedin.com/in/joseph-arul-raj-aa6915164'
    }
  },
  {
    id: 'phd-joshua',
    name: 'Dr Zhangshu Joshua Jiang',
    role: 'PhD Student (DRIVE-Health CDT)',
    roleDetail: 'Neurosciences Fellow, Cleveland Clinic London',
    image: 'images/josh.png',
    bio: "Joshua combines clinical neuroscience practice with research into trustworthy generative AI for healthcare. He is currently a Neurosciences Fellow at Cleveland Clinic London and a PhD student in Health Data Science at King's College London, where his research focuses on building AI systems that reason more like clinicians and less like black boxes. His current work includes conducting clinical neurology and neuro-rehabilitation at Cleveland Clinic London. He also develops multi-agent generative AI systems for clinical decision support as part of his doctoral research, and explores approaches to make AI reasoning transparent, interpretable, and aligned with real clinical workflows.",
    socials: {
      email: 'zhangshu.j.jiang@kcl.ac.uk',
      github: 'https://github.com/z0shua',
      linkedin: 'https://linkedin.com/in/zhangshu-jiang'
    }
  },
  {
    id: 'researcher-haoyu',
    name: 'Mr Haoyu Wang',
    role: 'Researcher',
    roleDetail: 'Multimodal Clinical Data Analysis',
    image: 'images/haoyu.jpg',
    bio: "Haoyu's research focuses on reproducible benchmarks for multimodal clinical data analysis, particularly the time-aligned fusion of ICU time-series and clinical notes. He is currently developing TIMELY-Bench, a benchmark framework for evaluating fusion strategies across vital signs, lab results, medications, and clinical text in MIMIC-III/IV datasets. With a background in computer science and experience in deep learning for time-series forecasting, his broader interests include multimodal learning for healthcare and applying large language models to unstructured clinical reports.",
    socials: {
      email: 'haoyu.7.wang@kcl.ac.uk',
      github: 'https://github.com/haoyu-haoyu',
      linkedin: 'https://www.linkedin.com/in/haoyu-wang-abb052236/'
    }
  },
  {
    id: 'researcher-zitong',
    name: 'Ms Zitong Li',
    role: 'Researcher',
    roleDetail: 'Trustworthy Clinical AI',
    image: 'images/zitong-li.png',
    imagePosition: '50% 21%',
    bio: "Zitong's research focuses on trustworthy clinical AI, with a particular interest in large language models, sparse electronic health records, and ICU time-series. Her work combines MIMIC-IV clinical trajectories, missing-data imputation, forecasting, and evidence-grounded reasoning evaluation to study whether model outputs are clinically plausible, temporally grounded, and reliable. Her broader interests lie in clinically grounded medical foundation models, temporal reasoning over sparse EHR data, robust missing-data modelling, and the trustworthy evaluation of AI systems for real-world clinical decision support.",
    socials: {
      email: 'zitong.2.li@kcl.ac.uk'
    }
  }
];
