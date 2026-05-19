import { Briefcase, ClipboardCheck, Leaf } from 'lucide-react'

export const faculties = [
  {
    id: 'agriculture',
    title: 'Faculty of Sustainable Agriculture',
    intro:
      'Our agricultural qualifications are designed to support food security, rural enterprise development, agricultural productivity, and South Africa’s growing Green Economy.',
    icon: Leaf,
    qualifications: [
      {
        title: 'Occupational Certificate: Crop Produce Analyst',
        nqf: 'NQF Level 5',
        credits: '265 Credits',
        saqaId: '99256',
        focus: [
          'Crop grading and quality assurance systems',
          'Agricultural compliance standards',
          'Supply chain analysis',
          'Commodity inspection processes',
        ],
      },
      {
        title: 'Occupational Certificate: Poultry Farmer',
        nqf: 'NQF Level 5',
        credits: '226 Credits',
        saqaId: '99027',
        focus: [
          'Commercial poultry production',
          'Flock health management',
          'Biosecurity implementation',
          'Poultry farm operations and agricultural business management',
        ],
      },
      {
        title: 'Occupational Certificate: Livestock Farmer (Livestock Farm Supervisor)',
        nqf: 'NQF Level 3',
        credits: '112 Credits',
        saqaId: '99253',
        focus: [
          'Livestock supervision and animal health management',
          'Breeding cycle coordination',
          'Farm operations management',
          'Team leadership in agricultural environments',
        ],
      },
    ],
  },
  {
    id: 'business',
    title: 'Faculty of Business Management & Compliance',
    intro:
      'Our business and compliance qualifications develop operationally critical skills applicable across virtually every industry sector in South Africa.',
    icon: Briefcase,
    qualifications: [
      {
        title: 'Occupational Certificate: Project Manager',
        nqf: 'NQF Level 5',
        credits: '240 Credits',
        saqaId: '101869',
        focus: [
          'Project planning and execution',
          'Budget and resource management',
          'Risk and stakeholder management',
          'Project governance, agile and operational methodologies',
        ],
      },
      {
        title: 'Higher Occupational Certificate: Occupational Health and Safety Practitioner',
        nqf: 'NQF Level 5',
        credits: '120 Credits',
        saqaId: '121527',
        focus: [
          'Hazard identification and mitigation',
          'Risk assessments and OHS Act compliance',
          'Workplace safety systems',
          'Health and safety auditing',
        ],
      },
    ],
  },
]

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
