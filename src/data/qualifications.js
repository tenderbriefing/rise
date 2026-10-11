import {
  Briefcase,
  Building2,
  ClipboardCheck,
  Cloud,
  Cpu,
  Database,
  GraduationCap,
  Leaf,
  Network,
  ShieldCheck,
} from 'lucide-react'

export const SA_PROVINCES = [
  'Eastern Cape',
  'Free State',
  'Gauteng',
  'KwaZulu-Natal',
  'Limpopo',
  'Mpumalanga',
  'Northern Cape',
  'North West',
  'Western Cape',
]

export const programmeStats = [
  { label: '9 QCTO Qualifications', icon: Briefcase, highlight: '9' },
  { label: '4 Specialised Academies', icon: GraduationCap, highlight: '4' },
  { label: '100% Industry-Aligned Training', icon: ClipboardCheck, highlight: '100%' },
  { label: 'National Training Provider', icon: Building2, highlight: 'National' },
]

export const fourIrPillars = [
  { title: 'Artificial Intelligence', icon: Cpu, description: 'Build intelligent applications and automation systems.' },
  { title: 'Data Science', icon: Database, description: 'Transform data into strategic business insight.' },
  { title: 'Cloud Computing', icon: Cloud, description: 'Administer modern cloud infrastructure at scale.' },
  { title: 'Internet of Things', icon: Network, description: 'Connect devices, sensors, and smart infrastructure.' },
]

export const faculties = [
  {
    id: '4ir',
    title: '4IR Academy',
    intro:
      "Preparing South Africa's workforce for the Fourth Industrial Revolution through QCTO-accredited qualifications in artificial intelligence, data science, cloud computing, and the Internet of Things.",
    icon: Cpu,
    path: '/4ir-academy',
  },
  {
    id: 'agriculture',
    title: 'Agriculture Academy',
    intro:
      "Our agricultural qualifications support food security, rural enterprise development, agricultural productivity, and South Africa's growing Green Economy.",
    icon: Leaf,
    path: '/agriculture-academy',
  },
  {
    id: 'business',
    title: 'Faculty of Business Management',
    intro:
      'Business qualifications that develop operationally critical skills applicable across virtually every industry sector in South Africa.',
    icon: Briefcase,
    path: '/programmes',
  },
  {
    id: 'ohs',
    title: 'Occupational Health & Safety',
    intro:
      'Workplace safety qualifications aligned to the OHS Act, equipping practitioners to protect people, assets, and operational continuity.',
    icon: ShieldCheck,
    path: '/occupational-health-safety',
  },
]

const qualificationRecords = [
  {
    slug: 'ai-software-developer',
    title: 'Occupational Certificate: Artificial Intelligence Software Developer',
    shortTitle: 'AI Software Developer',
    nqf: 'NQF Level 5',
    nqfLevel: 5,
    credits: 209,
    creditsLabel: '209 Credits',
    saqaId: '118792',
    category: 'Fourth Industrial Revolution (4IR)',
    duration: '12–24 months',
    durationMonths: '12–24',

    entryRequirements: 'NQF Level 4 qualification (or equivalent) with Mathematical Literacy preferred',
    deliveryModes: ['Classroom', 'Online', 'Hybrid'],
    facultyId: '4ir',
    focus: [
      'AI application development fundamentals',
      'Machine learning workflow support',
      'Software integration for intelligent systems',
      'Automation and AI systems support',
    ],
    learningOutcomes: [
      'Interpret AI solution designs and build application functionality using AI algorithms and logic',
      'Support machine learning and deep learning workflows within IT project deliverables',
      'Test, deploy, and improve AI-enabled software components',
      'Integrate AI APIs so other applications can consume intelligent services',
      'Apply design-thinking and ethical practice when implementing AI solutions',
    ],
    careerPaths: [
      'AI Software Developer',
      'Machine Learning Assistant',
      'AI Application Developer',
      'Automation Specialist',
      'AI Systems Support Officer',
    ],
    description:
      'QCTO-accredited NQF 5 qualification (SAQA 118792, 209 credits) for building, testing, and supporting AI-powered software solutions in enterprise and digital-service environments.',
  },
  {
    slug: 'iot-developer',
    title: 'Occupational Certificate: Internet of Things (IoT) Developer',
    shortTitle: 'IoT Developer',
    nqf: 'NQF Level 4',
    nqfLevel: 4,
    credits: 141,
    creditsLabel: '141 Credits',
    saqaId: '119262',
    category: 'Fourth Industrial Revolution (4IR)',
    duration: '12–18 months',
    durationMonths: '12–18',

    entryRequirements: 'NQF Level 3 / Grade 11 equivalent with Mathematical Literacy preferred',
    deliveryModes: ['Classroom', 'Online', 'Hybrid'],
    facultyId: '4ir',
    focus: [
      'IoT device configuration and connectivity',
      'Embedded systems fundamentals',
      'Smart infrastructure monitoring',
      'Industrial IoT support',
    ],
    learningOutcomes: [
      'Configure IoT devices, sensors, and connectivity for smart and industrial environments',
      'Support embedded systems and network fundamentals for connected solutions',
      'Integrate and monitor IoT data flows for operational decision-making',
      'Maintain and troubleshoot IoT deployments across infrastructure and analytics layers',
      'Apply workplace-ready practices aligned to 4IR digital skills demands',
    ],
    careerPaths: [
      'IoT Developer',
      'Smart Device Technician',
      'Embedded Systems Technician',
      'Industrial IoT Technician',
      'Smart Infrastructure Support Specialist',
    ],
    description:
      'QCTO-accredited NQF 4 qualification (SAQA 119262, 141 credits) focused on developing, configuring, and maintaining connected IoT systems.',
  },
  {
    slug: 'cloud-administrator',
    title: 'Occupational Certificate: Cloud Administrator',
    shortTitle: 'Cloud Administrator',
    nqf: 'NQF Level 4',
    nqfLevel: 4,
    credits: 149,
    creditsLabel: '149 Credits',
    saqaId: '118699',
    category: 'Information Technology & Digital Skills',
    duration: '12–18 months',
    durationMonths: '12–18',

    entryRequirements: 'NQF Level 3 / Grade 11 equivalent with Mathematical Literacy preferred',
    deliveryModes: ['Classroom', 'Online', 'Hybrid'],
    facultyId: '4ir',
    focus: [
      'Cloud platform administration',
      'Infrastructure provisioning and monitoring',
      'Systems support and troubleshooting',
      'Cloud operations and security basics',
    ],
    learningOutcomes: [
      'Administer cloud platforms, storage, and on-demand server resources',
      'Monitor availability, capacity, and performance of cloud services',
      'Implement foundational cloud security and integrity controls',
      'Support cloud network administration for reliable operations',
      'Apply cloud governance, ethics, and 4IR workplace practices',
    ],
    careerPaths: [
      'Cloud Administrator',
      'Systems Administrator',
      'Cloud Support Technician',
      'Infrastructure Support Officer',
      'Cloud Operations Analyst',
    ],
    description:
      'QCTO-accredited NQF 4 qualification (SAQA 118699, 149 credits) preparing learners to administer cloud environments and support digital infrastructure.',
  },
  {
    slug: 'data-science-practitioner',
    title: 'Occupational Certificate: Data Science Practitioner',
    shortTitle: 'Data Science Practitioner',
    nqf: 'NQF Level 5',
    nqfLevel: 5,
    credits: 185,
    creditsLabel: '185 Credits',
    saqaId: '118708',
    category: 'Fourth Industrial Revolution (4IR)',
    duration: '12–18 months',
    durationMonths: '12–18',

    entryRequirements: 'NQF Level 4 qualification with Mathematical Literacy',
    deliveryModes: ['Classroom', 'Online', 'Hybrid'],
    facultyId: '4ir',
    focus: [
      'Data collection and preparation',
      'Analytical modelling support',
      'Data visualisation and reporting',
      'Research and business intelligence workflows',
    ],
    learningOutcomes: [
      'Collect, prepare, and quality-check datasets for analysis',
      'Support analytical modelling and insight generation for business problems',
      'Visualise and communicate findings for evidence-based decisions',
      'Complete applied data projects using appropriate toolkits',
      'Operate ethically and effectively in data-driven workplace teams',
    ],
    careerPaths: [
      'Data Analyst',
      'Data Scientist',
      'Business Intelligence Analyst',
      'Data Visualisation Specialist',
      'Research Data Officer',
    ],
    description:
      'QCTO-accredited NQF 5 qualification (SAQA 118708, 185 credits) for analysing, interpreting, and communicating data insights across sectors.',
  },
  {
    slug: 'crop-produce-analyst',
    title: 'Occupational Certificate: Crop Produce Analyst',
    shortTitle: 'Crop Produce Analyst',
    nqf: 'NQF Level 5',
    nqfLevel: 5,
    credits: 265,
    creditsLabel: '265 Credits',
    saqaId: '99256',
    category: 'Sustainable Agriculture',
    duration: '24–36 months',
    durationMonths: '24–36',

    entryRequirements: 'NQF Level 4 qualification with Mathematical Literacy',
    deliveryModes: ['Classroom', 'Workplace-Integrated'],
    facultyId: 'agriculture',
    focus: [
      'Crop grading and quality assurance systems',
      'Agricultural compliance standards',
      'Supply chain analysis',
      'Commodity inspection processes',
    ],
    learningOutcomes: [
      'Grade and analyse crop produce against quality and compliance standards',
      'Apply agricultural inspection processes across supply-chain stages',
      'Support commodity quality assurance and reporting systems',
      'Interpret production and quality trends for agri-business decisions',
      'Operate safely and professionally in packhouse and farm environments',
    ],
    careerPaths: [
      'Crop Produce Analyst',
      'Quality Assurance Officer',
      'Agricultural Commodity Inspector',
      'Supply Chain Analyst',
    ],
    description:
      'QCTO-accredited NQF 5 qualification (SAQA 99256, 265 credits) focused on crop quality, grading, and agri-food supply-chain compliance.',
  },
  {
    slug: 'poultry-farmer',
    title: 'Occupational Certificate: Poultry Farmer',
    shortTitle: 'Poultry Farmer',
    nqf: 'NQF Level 5',
    nqfLevel: 5,
    credits: 226,
    creditsLabel: '226 Credits',
    saqaId: '99027',
    category: 'Sustainable Agriculture',
    duration: '18–36 months',
    durationMonths: '18–36',

    entryRequirements: 'NQF Level 4 with Mathematical Literacy',
    deliveryModes: ['Classroom', 'Workplace-Integrated'],
    facultyId: 'agriculture',
    focus: [
      'Commercial poultry production',
      'Flock health management',
      'Biosecurity implementation',
      'Poultry farm operations and agricultural business management',
    ],
    learningOutcomes: [
      'Manage commercial poultry production systems and facility utilisation',
      'Implement flock health, husbandry, and biosecurity measures',
      'Lead farm teams and report on production performance',
      'Apply poultry enterprise and business management practices',
      'Monitor production trends and respond to operational risks',
    ],
    careerPaths: [
      'Poultry Farmer',
      'Poultry Production Supervisor',
      'Farm Operations Manager',
      'Agri-Enterprise Owner',
    ],
    description:
      'QCTO-accredited NQF 5 qualification (SAQA 99027, 226 credits) for commercial poultry farming, biosecurity, and agri-enterprise operations.',
  },
  {
    slug: 'livestock-farmer',
    title: 'Occupational Certificate: Livestock Farmer (Livestock Farm Supervisor)',
    shortTitle: 'Livestock Farmer',
    nqf: 'NQF Level 3',
    nqfLevel: 3,
    credits: 112,
    creditsLabel: '112 Credits',
    saqaId: '99253',
    category: 'Sustainable Agriculture',
    duration: '12–18 months',
    durationMonths: '12–18',

    entryRequirements: 'NQF Level 1 with Mathematical Literacy & Communication (Grade 10 equivalent)',
    deliveryModes: ['Classroom', 'Workplace-Integrated'],
    facultyId: 'agriculture',
    focus: [
      'Livestock supervision and animal health management',
      'Breeding cycle coordination',
      'Farm operations management',
      'Team leadership in agricultural environments',
    ],
    learningOutcomes: [
      'Supervise livestock health and production activities on extensive farms',
      'Coordinate breeding cycles and day-to-day farm operations',
      'Lead work teams in livestock farming environments',
      'Plan and direct livestock farming activities within scope',
      'Support sustainable red-meat production practices',
    ],
    careerPaths: [
      'Livestock Farmer',
      'Livestock Farm Supervisor',
      'Animal Health Assistant',
      'Farm Team Leader',
    ],
    description:
      'QCTO-accredited NQF 3 qualification (SAQA 99253, 112 credits) for livestock supervision, animal health coordination, and farm leadership.',
  },
  {
    slug: 'project-manager',
    title: 'Occupational Certificate: Project Manager',
    shortTitle: 'Project Manager',
    nqf: 'NQF Level 5',
    nqfLevel: 5,
    credits: 240,
    creditsLabel: '240 Credits',
    saqaId: '101869',
    category: 'Business Management & Compliance',
    duration: '18–24 months',
    durationMonths: '18–24',

    entryRequirements: 'NQF Level 4 qualification (or equivalent)',
    deliveryModes: ['Classroom', 'Online', 'Hybrid'],
    facultyId: 'business',
    focus: [
      'Project planning and execution',
      'Budget and resource management',
      'Risk and stakeholder management',
      'Project governance, agile and operational methodologies',
    ],
    learningOutcomes: [
      'Initiate projects aligned to defined objectives and scope',
      'Plan schedules, costs, quality systems, and resource approaches',
      'Execute and control delivery against the project management plan',
      'Manage stakeholders, risk, procurement, and communications',
      'Close out projects with controlled handover and reporting',
    ],
    careerPaths: [
      'Project Manager',
      'Project Coordinator',
      'Programme Administrator',
      'Operations Project Lead',
    ],
    description:
      'QCTO-accredited NQF 5 qualification (SAQA 101869, 240 credits) for planning, executing, and governing projects across sectors.',
  },
  {
    slug: 'occupational-health-safety-practitioner',
    title: 'Higher Occupational Certificate: Occupational Health and Safety Practitioner',
    shortTitle: 'OHS Practitioner',
    nqf: 'NQF Level 5',
    nqfLevel: 5,
    credits: 120,
    creditsLabel: '120 Credits',
    saqaId: '121527',
    category: 'Occupational Health & Safety',
    duration: '12 months',
    durationMonths: '12',

    entryRequirements: 'NQF Level 4 qualification (or equivalent)',
    deliveryModes: ['Classroom', 'Workplace-Integrated'],
    facultyId: 'ohs',
    focus: [
      'Hazard identification and mitigation',
      'Risk assessments and OHS Act compliance',
      'Workplace safety systems',
      'Health and safety auditing',
    ],
    learningOutcomes: [
      'Identify workplace hazards and implement mitigation controls',
      'Conduct risk assessments aligned to the OHS Act',
      'Maintain workplace health and safety management systems',
      'Support compliance auditing and continuous improvement',
      'Protect people, assets, and operational continuity across industries',
    ],
    careerPaths: [
      'Occupational Health and Safety Practitioner',
      'Safety Officer',
      'Risk Assessor',
      'Compliance Auditor',
    ],
    description:
      'QCTO-accredited NQF 5 qualification (SAQA 121527, 120 credits) for workplace safety systems, hazard control, and OHS Act compliance.',
  },
]


export const allQualifications = qualificationRecords.map((qual) => {
  const faculty = faculties.find((f) => f.id === qual.facultyId)
  return {
    ...qual,
    facultyTitle: faculty?.title || '',
    facultyPath: faculty?.path || '/programmes',
  }
})

faculties.forEach((faculty) => {
  faculty.qualifications = allQualifications.filter((q) => q.facultyId === faculty.id)
})

export function getAllQualifications() {
  return allQualifications
}

export function getQualificationBySlug(slug) {
  return allQualifications.find((q) => q.slug === slug) || null
}

export function getQualificationsByFacultyId(facultyId) {
  return allQualifications.filter((q) => q.facultyId === facultyId)
}

export function getQualificationCategories() {
  return [...new Set(allQualifications.map((q) => q.category))]
}

export const learningMethodology = [
  {
    step: 1,
    title: 'Knowledge Modules',
    description:
      'Comprehensive theoretical instruction delivered by experienced facilitators and industry professionals.',
    icon: ClipboardCheck,
  },
  {
    step: 2,
    title: 'Practical Modules',
    description:
      'Hands-on simulation and applied learning conducted within controlled practical environments.',
    icon: Leaf,
  },
  {
    step: 3,
    title: 'Workplace Experience Modules',
    description:
      'Structured workplace exposure through employer partnerships and hosted industry placements.',
    icon: Briefcase,
  },
]

export const seoKeywords =
  'QCTO Accredited Training, Artificial Intelligence Courses South Africa, Data Science Training South Africa, Cloud Computing Training South Africa, IoT Training South Africa, Project Management Qualification, Occupational Health and Safety Qualification, learnerships Gauteng, B-BBEE skills development'
