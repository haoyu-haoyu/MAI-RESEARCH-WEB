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
    title: 'How Deep is your Guess? A Fresh Perspective on Deep Learning for Medical Time-Series Imputation',
    journal: 'IEEE',
    year: '2025',
    authors: ['L. Qian', 'T. Wang', 'J. Wang', 'H. L. Ellis', 'R. Mitra', 'R. Dobson', 'Z. Ibrahim'],
    link: 'https://ieeexplore.ieee.org/document/10994403',
    doi: ''
  },
  {
    id: 'p2025-2',
    title: 'The early warning paradox',
    journal: 'npj Digital Medicine 8, 81',
    year: '2025',
    authors: ['H. Logan Ellis', 'E. Palmer', 'J. T. Teo', 'et al.'],
    link: 'https://doi.org/10.1038/s41746-024-01408-x',
    doi: '10.1038/s41746-024-01408-x'
  },
  {
    id: 'p2025-3',
    title: 'Beyond Random Missingness: Clinically Rethinking for Healthcare Time Series Imputation',
    journal: 'arXiv',
    year: '2025',
    authors: ['L. Qian', 'Y. Yang', 'W. Du', 'J. Wang', 'R. Dobson', 'Z. Ibrahim'],
    link: 'https://arxiv.org/abs/2405.17508',
    doi: ''
  },
  {
    id: 'p2025-4',
    title: 'CSAI: Conditional Self-Attention Imputation for Healthcare Time-series',
    journal: 'IEEE JBHI',
    year: '2025',
    authors: ['L. Qian', 'J. A. Raj', 'H. L. Ellis', 'A. Zhang', 'Y. Zhang', 'T. Wang', 'R. J. Dobson', 'Z. Ibrahim'],
    link: 'https://ieeexplore.ieee.org/abstract/document/11314658',
    doi: ''
  },

  // 2024
  {
    id: 'p2024-1',
    title: 'Fine-tuning – a Transfer Learning approach',
    journal: 'arXiv',
    year: '2024',
    authors: ['J. A. Raj', 'L. Qian', 'Z. Ibrahim'],
    link: 'https://arxiv.org/abs/2411.03941',
    doi: ''
  },
  {
    id: 'p2024-2',
    title: 'Deep Learning for Multivariate Time Series Imputation: A Survey',
    journal: 'arXiv',
    year: '2024',
    authors: ['J. Wang', 'W. Du', 'Y. Yang', 'L. Qian', 'W. Cao', 'K. Zhang', 'W. Wang', 'Y. Liang', 'Q. Wen'],
    link: 'https://arxiv.org/abs/2402.04059',
    doi: ''
  },
  {
    id: 'p2024-3',
    title: 'TSI-Bench: Benchmarking Time Series Imputation',
    journal: 'arXiv',
    year: '2024',
    authors: ['W. Du', 'J. Wang', 'L. Qian', 'Y. Yang', 'Z. Ibrahim', 'F. Liu', 'Z. Wang', 'H. Liu', 'Z. Zhao', 'Y. Zhou', 'W. Wang', 'K. Ding', 'Y. Liang', 'B. A. Prakash', 'Q. Wen'],
    link: 'https://arxiv.org/abs/2406.12747',
    doi: ''
  },
  {
    id: 'p2024-4',
    title: 'Uncertainty-Aware Deep Attention Recurrent Neural Network for Heterogeneous Time Series Imputation',
    journal: 'arXiv',
    year: '2024',
    authors: ['L. Qian', 'Z. Ibrahim', 'R. Dobson'],
    link: 'https://arxiv.org/abs/2401.02258',
    doi: ''
  },
  {
    id: 'p2024-5',
    title: 'Exploring Multimodal Large Language Models for Radiology Report Error-checking',
    journal: 'arXiv',
    year: '2024',
    authors: ['J. Wu', 'Y. Kim', 'E. C. Keller', 'J. Chow', 'A. P. Levine', 'N. Pontikos', 'Z. Ibrahim', 'P. Taylor', 'M. C. Williams', 'H. Wu'],
    link: 'https://arxiv.org/abs/2312.13103',
    doi: ''
  },

  // 2023
  {
    id: 'p2023-1',
    title: 'Moving from development to implementation of digital innovations within the NHS: myHealthE',
    journal: 'DIGITAL HEALTH',
    year: '2023',
    authors: ['A. C. Morris', 'Z. Ibrahim', 'O. S. Moghraby', 'et al.'],
    link: 'https://doi.org/10.1177/20552076231211551',
    doi: '10.1177/20552076231211551'
  },
  {
    id: 'p2023-2',
    title: 'Discharge summary hospital course summarisation of in patient Electronic Health Record text',
    journal: 'Journal of Biomedical Informatics, 141, 104358',
    year: '2023',
    authors: ['T. Searle', 'Z. Ibrahim', 'J. Teo', 'R. J. B. Dobson'],
    link: 'https://doi.org/10.1016/j.jbi.2023.104358',
    doi: '10.1016/j.jbi.2023.104358'
  },
  {
    id: 'p2023-3',
    title: 'Assessing the feasibility of a web-based outcome measurement system in CAMHS – myHealthE',
    journal: 'Child Adolesc Ment Health, 28: 128–147',
    year: '2023',
    authors: ['A. C. Morris', 'Z. Ibrahim', 'M. Heslin', 'O. S. Moghraby', 'et al.'],
    link: 'https://doi.org/10.1111/camh.12571',
    doi: '10.1111/camh.12571'
  },
  {
    id: 'p2023-4',
    title: 'Addressing Class Imbalance in Electronic Health Records Data Imputation',
    journal: '6th Int. Workshop on Knowledge Discovery From Healthcare Data',
    year: '2023',
    authors: ['L. Qian', 'Z. Ibrahim', 'A. Zhang', 'R. J. B. Dobson'],
    link: 'https://ceur-ws.org/Vol-3479/paper7.pdf',
    doi: ''
  },

  // 2022
  {
    id: 'p2022-1',
    title: 'OPTIMA: Remote recruitment and assessment for ADHD referrals',
    journal: 'Pilot Feasibility Stud 8, 1',
    year: '2022',
    authors: ['K. Kostyrka-Allchorne', 'C. Ballard', 'S. Byford', 'et al.'],
    link: 'https://doi.org/10.1186/s40814-021-00959-0',
    doi: '10.1186/s40814-021-00959-0'
  },
  {
    id: 'p2022-2',
    title: 'Summarisation of Electronic Health Records with Clinical Concept Guidance',
    journal: 'arXiv',
    year: '2022',
    authors: ['T. Searle', 'Z. Ibrahim', 'J. Teo', 'R. Dobson'],
    link: 'https://kclpure.kcl.ac.uk/portal/files/188150736/2211.07126v1.pdf',
    doi: ''
  },
  {
    id: 'p2022-3',
    title: 'Multi-modal Latent-Space Self-alignment for Super-Resolution Cardiac MR Segmentation',
    journal: 'STACOM 2022, LNCS vol. 13593',
    year: '2022',
    authors: ['Y. Deng', 'et al.'],
    link: 'https://doi.org/10.1007/978-3-031-23443-9_3',
    doi: '10.1007/978-3-031-23443-9_3'
  },
  {
    id: 'p2022-4',
    title: 'Evaluating physical urban features in several mental illnesses',
    journal: 'Frontiers in Digital Health',
    year: '2022',
    authors: ['Z. Mahabadi', 'M. Mahabadi', 'S. Velupillai', 'A. Roberts', 'P. McGuire', 'Z. Ibrahim', 'R. Patel'],
    link: 'https://doi.org/10.3389/fdgth.2022.874237',
    doi: '10.3389/fdgth.2022.874237'
  },
  {
    id: 'p2022-5',
    title: 'GEOexplorer: a webserver for gene expression analysis and visualisation',
    journal: 'Nucleic Acids Research, 50(W1): W367–W374',
    year: '2022',
    authors: ['G. P. Hunt', 'L. Grassi', 'R. Henkin', 'F. Smeraldi', 'et al.'],
    link: 'https://doi.org/10.1093/nar/gkac364',
    doi: '10.1093/nar/gkac364'
  },
  {
    id: 'p2022-6',
    title: 'A Knowledge Distillation Ensemble Framework for Predicting Short- and Long-Term Hospitalization Outcomes From Electronic Health Records Data',
    journal: 'IEEE Journal of Biomedical and Health Informatics, vol. 26, no. 1, pp. 423-435',
    year: '2022',
    authors: ['Z. M. Ibrahim', 'et al.'],
    link: 'https://doi.org/10.1109/JBHI.2021.3089287',
    doi: '10.1109/JBHI.2021.3089287'
  },

  // 2021
  {
    id: 'p2021-1',
    title: 'Estimating redundancy in clinical text',
    journal: 'Journal of Biomedical Informatics, 124, 103938',
    year: '2021',
    authors: ['T. Searle', 'Z. Ibrahim', 'J. Teo', 'R. Dobson'],
    link: 'https://doi.org/10.1016/j.jbi.2021.103938',
    doi: '10.1016/j.jbi.2021.103938'
  },
  {
    id: 'p2021-2',
    title: 'Multi-domain clinical natural language processing with MedCAT: The Medical Concept Annotation Toolkit',
    journal: 'Artificial Intelligence in Medicine, 117, 102083',
    year: '2021',
    authors: ['Z. Kraljevic', 'T. Searle', 'A. Shek', 'L. Roguski', 'K. Noor', 'D. Bean', 'A. Mascio', 'L. Zhu', 'A. A. Folarin', 'A. Roberts', 'R. Bendayan', 'M. P. Richardson', 'R. Stewart', 'A. D. Shah', 'W. K. Wong', 'Z. Ibrahim', 'J. T. Teo', 'R. J. B. Dobson'],
    link: 'https://doi.org/10.1016/j.artmed.2021.102083',
    doi: '10.1016/j.artmed.2021.102083'
  },
  {
    id: 'p2021-3',
    title: 'Ensemble learning for poor prognosis predictions: A case study on SARS-CoV-2',
    journal: 'Journal of the American Medical Informatics Association, Volume 28, Issue 4, Pages 791–800',
    year: '2021',
    authors: ['H. Wu', 'H. Zhang', 'A. Karwath', 'Z. Ibrahim', 'T. Shi', 'X. Zhang', 'K. Wang', 'J. Sun', 'K. Dhaliwal', 'D. Bean', 'V. R. Cardoso', 'K. Li', 'J. T. Teo', 'A. Banerjee', 'F. Gao-Smith', 'T. Whitehouse', 'T. Veenith', 'G. V. Gkoutos', 'X. Wu', 'R. Dobson', 'B. Guthrie'],
    link: 'https://doi.org/10.1093/jamia/ocaa295',
    doi: '10.1093/jamia/ocaa295'
  },

  // 2020
  {
    id: 'p2020-1',
    title: 'The side effect profile of Clozapine in real world data of three large mental health hospitals',
    journal: 'PLOS ONE 15(12): e0243437',
    year: '2020',
    authors: ['E. Iqbal', 'R. Govind', 'A. Romero', 'O. Dzahini', 'M. Broadbent', 'et al.'],
    link: 'https://doi.org/10.1371/journal.pone.0243437',
    doi: '10.1371/journal.pone.0243437'
  },
  {
    id: 'p2020-2',
    title: 'An epigenome-wide association study of Alzheimer\'s disease blood highlights robust DNA hypermethylation in the HOXB6 gene',
    journal: 'Neurobiology of Aging, 95, 26–45',
    year: '2020',
    authors: ['J. A. Y. Roubroeks', 'A. R. Smith', 'R. G. Smith', 'E. Pishva', 'Z. Ibrahim', 'et al.'],
    link: 'https://doi.org/10.1016/j.neurobiolaging.2020.06.023',
    doi: '10.1016/j.neurobiolaging.2020.06.023'
  },
  {
    id: 'p2020-3',
    title: 'Added value of biomarkers and polygenic risk scores as risk factors for coronary artery disease',
    journal: 'GENETIC EPIDEMIOLOGY, Vol. 44, No. 5, pp. 516-516',
    year: '2020',
    authors: ['N. Sharapova', 'J. M. Maxwell', 'K. Glanville', 'S. P. Hagenaars', 'R. Russell', 'Z. M. Ibrahim', 'C. M. Lewis'],
    link: '#',
    doi: ''
  },
  {
    id: 'p2020-4',
    title: 'Experimental Evaluation and Development of a Silver-Standard for the MIMIC-III Clinical Coding Dataset',
    journal: 'Proceedings of the 19th SIGBioMed Workshop on Biomedical Language Processing',
    year: '2020',
    authors: ['T. Searle', 'Z. Ibrahim', 'R. Dobson'],
    link: 'https://doi.org/10.18653/v1/2020.bionlp-1.8',
    doi: '10.18653/v1/2020.bionlp-1.8'
  },
  {
    id: 'p2020-5',
    title: 'Comparing Natural Language Processing Techniques for Alzheimer\'s Dementia Prediction in Spontaneous Speech',
    journal: 'arXiv',
    year: '2020',
    authors: ['T. Searle', 'Z. Ibrahim', 'R. Dobson'],
    link: 'https://arxiv.org/abs/2006.07358',
    doi: ''
  },
  {
    id: 'p2020-6',
    title: 'On classifying sepsis heterogeneity in the ICU: insight using machine learning',
    journal: 'Journal of the American Medical Informatics Association, Volume 27, Issue 3, Pages 437–443',
    year: '2020',
    authors: ['Z. M. Ibrahim', 'H. Wu', 'A. Hamoud', 'L. Stappen', 'R. J. B. Dobson', 'A. Agarossi'],
    link: 'https://doi.org/10.1093/jamia/ocz211',
    doi: '10.1093/jamia/ocz211'
  },
  {
    id: 'p2020-7',
    title: 'Identifying physical health comorbidities in a cohort of individuals with severe mental illness: An application of SemEHR',
    journal: 'arXiv',
    year: '2020',
    authors: ['R. Bendayan', 'H. Wu', 'Z. Kraljevic', 'R. Stewart', 'T. Searle', 'J. Chaturvedi', 'J. Das-Munshi', 'Z. Ibrahim', 'A. Mascio', 'A. Roberts', 'D. Bean', 'R. Dobson'],
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
    image: '/images/zina.png',
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
    image: '/images/linglong.jpg',
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
    image: '/images/hugh.png',
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
    image: '/images/joseph.jpg',
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
    image: '/images/josh.png',
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
    image: '/images/haoyu.jpg',
    bio: "Haoyu's research focuses on reproducible benchmarks for multimodal clinical data analysis, particularly the time-aligned fusion of ICU time-series and clinical notes. He is currently developing TIMELY-Bench, a benchmark framework for evaluating fusion strategies across vital signs, lab results, medications, and clinical text in MIMIC-III/IV datasets. With a background in computer science and experience in deep learning for time-series forecasting, his broader interests include multimodal learning for healthcare and applying large language models to unstructured clinical reports.",
    socials: {
      email: 'haoyu.7.wang@kcl.ac.uk',
      github: 'https://github.com/haoyu-haoyu',
      linkedin: 'https://www.linkedin.com/in/haoyu-wang-abb052236/'
    }
  }
];