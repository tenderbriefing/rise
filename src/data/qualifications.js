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
      'Preparing South Africa\'s workforce for the Fourth Industrial Revolution through QCTO-accredited qualifications in artificial intelligence, data science, cloud computing, and the Internet of Things.',
    icon: Cpu,
    path: '/4ir-academy',
  },
  {
    id: 'agriculture',
    title: 'Agriculture Academy',
    intro:
      'Our agricultural qualifications support food security, rural enterprise development, agricultural productivity, and South Africa\'s growing Green Economy.',
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
    credits: 'As per QCTO requirements',
    saqaId: '118792',
    category: 'Fourth Industrial Revolution (4IR)',
    duration: 'As per QCTO requirements',
    deliveryModes: ['Classroom', 'Online', 'Hybrid'],
    facultyId: '4ir',
    focus: [
      'AI application development fundamentals',
      'Machine learning workflow support',
      'Software integration for intelligent systems',
      'Automation and AI systems support',
    ],
    careerPaths: [
      'AI Software Developer',
      'Machine Learning Assistant',
      'AI Application Developer',
      'Automation Specialist',
      'AI Systems Support Officer',
    ],
    description:
      'This QCTO-accredited qualification develops occupational competence in designing, building, and supporting AI-powered software solutions for modern enterprises and digital service environments.',
  },
  {
    slug: 'iot-developer',
    title: 'Occupational Certificate: Internet of Things (IoT) Developer',
    shortTitle: 'IoT Developer',
    nqf: 'NQF Level 4',
    nqfLevel: 4,
    credits: 'As per QCTO requirements',
    saqaId: '119262',
    category: 'Fourth Industrial Revolution (4IR)',
    duration: 'As per QCTO requirements',
    deliveryModes: ['Classroom', 'Online', 'Hybrid'],
    facultyId: '4ir',
    focus: [
      'IoT device configuration and connectivity',
      'Embedded systems fundamentals',
      'Smart infrastructure monitoring',
      'Industrial IoT support',
    ],
    careerPaths: [
      'IoT Developer',
      'Smart Device Technician',
      'Embedded Systems Technician',
      'Industrial IoT Technician',
      'Smart Infrastructure Support Specialist',
    ],
    description:
      'Learners gain practical competence in developing, configuring, and maintaining connected IoT systems for smart devices, industrial environments, and infrastructure networks.',
  },
  {
    slug: 'cloud-administrator',
    title: 'Occupational Certificate: Cloud Administrator',
    shortTitle: 'Cloud Administrator',
    nqf: 'NQF Level 4',
    nqfLevel: 4,
    credits: 'As per QCTO requirements',
    saqaId: '118699',
    category: 'Information Technology & Digital Skills',
    duration: 'As per QCTO requirements',
    deliveryModes: ['Classroom', 'Online', 'Hybrid'],
    facultyId: '4ir',
    focus: [
      'Cloud platform administration',
      'Infrastructure provisioning and monitoring',
      'Systems support and troubleshooting',
      'Cloud operations and security basics',
    ],
    careerPaths: [
      'Cloud Administrator',
      'Systems Administrator',
      'Cloud Support Technician',
      'Infrastructure Support Officer',
      'Cloud Operations Analyst',
    ],
    description:
      'This qualification prepares learners to administer cloud environments, support infrastructure operations, and maintain reliable digital systems for organisations adopting cloud-first strategies.',
  },
  {
    slug: 'data-science-practitioner',
    title: 'Occupational Certificate: Data Science Practitioner',
    shortTitle: 'Data Science Practitioner',
    nqf: 'NQF Level 5',
    nqfLevel: 5,
    credits: 'As per QCTO requirements',
    saqaId: '118708',
    category: 'Fourth Industrial Revolution (4IR)',
    duration: 'As per QCTO requirements',
    deliveryModes: ['Classroom', 'Online', 'Hybrid'],
    facultyId: '4ir',
    focus: [
      'Data collection and preparation',
      'Analytical modelling support',
      'Data visualisation and reporting',
      'Research and business intelligence workflows',
    ],
    careerPaths: [
      'Data Analyst',
      'Data Scientist',
      'Business Intelligence Analyst',
      'Data Visualisation Specialist',
      'Research Data Officer',
    ],
    description:
      'Develop occupational competence in analysing, interpreting, and communicating data insights that support evidence-based decision-making across public and private sector organisations.',
  },
  {
    slug: 'crop-produce-analyst',
    title: 'Occupational Certificate: Crop Produce Analyst',
    shortTitle: 'Crop Produce Analyst',
    nqf: 'NQF Level 5',
    nqfLevel: 5,
    credits: '265 Credits',
    saqaId: '99256',
    category: 'Sustainable Agriculture',
    duration: 'As per QCTO requirements',
    deliveryModes: ['Classroom', 'Workplace-Integrated'],
    facultyId: 'agriculture',
    focus: [
      'Crop grading and quality assurance systems',
      'Agricultural compliance standards',
      'Supply chain analysis',
      'Commodity inspection processes',
    ],
    careerPaths: [
      'Crop Produce Analyst',
      'Quality Assurance Officer',
      'Agricultural Commodity Inspector',
      'Supply Chain Analyst',
    ],
    description:
      'A QCTO-accredited qualification focused on crop quality, grading standards, and agricultural supply chain compliance for South Africa\'s agri-food sector.',
  },
  {
    slug: 'poultry-farmer',
    title: 'Occupational Certificate: Poultry Farmer',
    shortTitle: 'Poultry Farmer',
    nqf: 'NQF Level 5',
    nqfLevel: 5,
    credits: '226 Credits',
    saqaId: '99027',
    category: 'Sustainable Agriculture',
    duration: 'As per QCTO requirements',
    deliveryModes: ['Classroom', 'Workplace-Integrated'],
    facultyId: 'agriculture',
    focus: [
      'Commercial poultry production',
      'Flock health management',
      'Biosecurity implementation',
      'Poultry farm operations and agricultural business management',
    ],
    careerPaths: [
      'Poultry Farmer',
      'Poultry Production Supervisor',
      'Farm Operations Manager',
      'Agri-Enterprise Owner',
    ],
    description:
      'Develop practical and managerial competence in commercial poultry farming, biosecurity, and sustainable agricultural enterprise operations.',
  },
  {
    slug: 'livestock-farmer',
    title: 'Occupational Certificate: Livestock Farmer (Livestock Farm Supervisor)',
    shortTitle: 'Livestock Farmer',
    nqf: 'NQF Level 3',
    nqfLevel: 3,
    credits: '112 Credits',
    saqaId: '99253',
    category: 'Sustainable Agriculture',
    duration: 'As per QCTO requirements',
    deliveryModes: ['Classroom', 'Workplace-Integrated'],
    facultyId: 'agriculture',
    focus: [
      'Livestock supervision and animal health management',
      'Breeding cycle coordination',
      'Farm operations management',
      'Team leadership in agricultural environments',
    ],
    careerPaths: [
      'Livestock Farmer',
      'Livestock Farm Supervisor',
      'Animal Health Assistant',
      'Farm Team Leader',
    ],
    description:
      'Entry-to-mid level occupational qualification for livestock supervision, animal health coordination, and farm operational leadership.',
  },
  {
    slug: 'project-manager',
    title: 'Occupational Certificate: Project Manager',
    shortTitle: 'Project Manager',
    nqf: 'NQF Level 5',
    nqfLevel: 5,
    credits: '240 Credits',
    saqaId: '101869',
    category: 'Business Management & Compliance',
    duration: 'As per QCTO requirements',
    deliveryModes: ['Classroom', 'Online', 'Hybrid'],
    facultyId: 'business',
    focus: [
      'Project planning and execution',
      'Budget and resource management',
      'Risk and stakeholder management',
      'Project governance, agile and operational methodologies',
    ],
    careerPaths: [
      'Project Manager',
      'Project Coordinator',
      'Programme Administrator',
      'Operations Project Lead',
    ],
    description:
      'Develop occupational competence in planning, executing, and governing projects across corporate, public sector, and infrastructure environments.',
  },
  {
    slug: 'occupational-health-safety-practitioner',
    title: 'Higher Occupational Certificate: Occupational Health and Safety Practitioner',
    shortTitle: 'OHS Practitioner',
    nqf: 'NQF Level 5',
    nqfLevel: 5,
    credits: '120 Credits',
    saqaId: '121527',
    category: 'Occupational Health & Safety',
    duration: 'As per QCTO requirements',
    deliveryModes: ['Classroom', 'Workplace-Integrated'],
    facultyId: 'ohs',
    focus: [
      'Hazard identification and mitigation',
      'Risk assessments and OHS Act compliance',
      'Workplace safety systems',
      'Health and safety auditing',
    ],
    careerPaths: [
      'Occupational Health and Safety Practitioner',
      'Safety Officer',
      'Risk Assessor',
      'Compliance Auditor',
    ],
    description:
      'QCTO-accredited qualification for practitioners responsible for workplace safety systems, hazard control, and OHS Act compliance across all industry sectors.',
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
