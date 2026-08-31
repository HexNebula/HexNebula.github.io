// Single source of truth — drives both the terminal VFS and the page sections.

export const profile = {
  name: 'Anas Madani',
  role: 'Full-Stack Software Engineer',
  location: 'Casablanca, Morocco',
  tagline:
    'I design microservices and industrialize the infrastructure that runs them — Spring Boot and React on top of Docker, Kafka and CI/CD.',
  bio: 'Software engineer from ENSIAS (Software Engineering, 2025) with hands-on experience in banking and industrial environments — from architecture design through infrastructure industrialization, with a strong focus on code quality. Terminal obsessive: if it can be done in a shell, it will be.',
  email: 'anasmadani49@gmail.com',
  phone: '+212 6 66 32 24 50',
  github: 'https://github.com/HexNebula',
  githubHandle: 'HexNebula',
  linkedin: 'https://www.linkedin.com/in/anas-madani-3b8937246/',
  resume: '/resume.pdf',
};

export interface Experience {
  slug: string;
  company: string;
  role: string;
  location: string;
  period: string;
  points: string[];
  stack: string[];
}

export const experience: Experience[] = [
  {
    slug: 'bcp',
    company: 'Banque Centrale Populaire (BCP)',
    role: 'Software Engineer Intern — Graduation Project',
    location: 'Casablanca, Morocco',
    period: 'Feb 2025 – Jul 2025',
    points: [
      'Designed and developed a microservices architecture for a banking recommendation platform — Java/Spring Boot backend, React/TypeScript frontend.',
      'Industrialized the infrastructure (Docker, Kafka, Redis, Keycloak) within an Agile/Scrum team.',
    ],
    stack: [
      'Java',
      'Spring Boot/Cloud',
      'React',
      'TypeScript',
      'Python',
      'FastAPI',
      'PostgreSQL',
      'Redis',
      'Kafka',
      'Keycloak',
      'Docker',
    ],
  },
  {
    slug: 'nplusone',
    company: 'N+ONE Datacenters',
    role: 'Software Engineer Intern',
    location: 'Casablanca, Morocco',
    period: 'Aug 2024 – Sep 2024',
    points: [
      'Built a full-stack platform (Django / React) containerized with Docker Compose — backend, frontend, Nginx reverse proxy, PostgreSQL.',
      'Set up a CI/CD pipeline (GitHub Actions) and an asynchronous monitoring module.',
      'Implemented cryptographic document security with AES-256-GCM encryption.',
    ],
    stack: [
      'Python',
      'Django REST Framework',
      'React',
      'Vite',
      'PostgreSQL',
      'Docker',
      'Nginx',
      'GitHub Actions',
    ],
  },
  {
    slug: 'errich',
    company: 'Commune Er-rich',
    role: 'Software Engineer Intern',
    location: 'Er-rich, Morocco',
    period: 'Jul 2023 – Aug 2023',
    points: [
      'Independently built a worker-management application to digitalize the municipality’s administrative processes.',
      'Led the transition from paper-based workflows to a centralized digital solution.',
    ],
    stack: ['Java', 'Spring Boot', 'React', 'Tailwind CSS', 'PostgreSQL'],
  },
];

export interface Project {
  slug: string;
  name: string;
  description: string;
  stack: string[];
  repo: string;
}

export const projects: Project[] = [
  {
    slug: 'busconnect',
    name: 'BusConnect',
    description:
      'Bus reservation platform on a microservices architecture — Spring Boot 3, Spring Cloud (Eureka, API Gateway), React 18, deployed on Kubernetes. Polyglot persistence: PostgreSQL, MySQL and MongoDB per service.',
    stack: ['Spring Boot 3', 'Spring Cloud', 'React 18', 'Kubernetes', 'PostgreSQL', 'MongoDB'],
    repo: 'https://github.com/HexNebula/BusManagementV2',
  },
  {
    slug: 'mlops-generator',
    name: 'MLOps Pipeline Generator',
    description:
      'MLOps code generator based on Model-Driven Engineering — Eclipse Ecore metamodels + Acceleo templates generate Python scripts, Dockerfiles and Kubernetes configs from an SWT/EMF Forms interface.',
    stack: ['MDE', 'Eclipse Ecore', 'Acceleo', 'Python', 'Docker', 'Kubernetes'],
    repo: 'https://github.com/HexNebula/MLOps-Pipeline-Code-Generator',
  },
  {
    slug: 'bacsurveillance',
    name: 'BacSurveillance',
    description:
      'Exam supervision management platform — greedy + backtracking algorithm for automatic teacher assignment. FastAPI/PostgreSQL backend, React 19 (TypeScript) frontend, Word/Excel export, bilingual Arabic/French UI.',
    stack: ['FastAPI', 'PostgreSQL', 'React 19', 'TypeScript', 'Algorithms'],
    repo: 'https://github.com/HexNebula/BacSurveillance',
  },
  {
    slug: 'fithub',
    name: 'FitHub',
    description:
      'Full-stack gym management application on a microservices architecture, with CI/CD pipelines via GitHub Actions.',
    stack: ['Microservices', 'GitHub Actions', 'CI/CD'],
    repo: 'https://github.com/HexNebula/fitnesshub-backend',
  },
];

export const skills: Record<string, string[]> = {
  Backend: ['Spring Boot', 'Spring Cloud', 'FastAPI', 'Django REST Framework'],
  Frontend: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
  'DevOps & Infra': ['Docker', 'Kafka', 'GitHub Actions', 'Nginx', 'Linux', 'Kubernetes'],
  Databases: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis'],
  Languages: ['C', 'C++', 'Python', 'Java', 'JavaScript', 'SQL'],
  Spoken: ['Arabic (native)', 'French (fluent)', 'English (fluent)'],
};

export const education = [
  {
    school: 'ENSIAS — École Nationale Supérieure d’Informatique et d’Analyse des Systèmes',
    degree: 'Engineering Degree, Software Engineering',
    period: '2022 – 2025',
    location: 'Rabat, Morocco',
  },
  {
    school: 'CPGE Settat',
    degree: 'Preparatory Classes (TSI)',
    period: '2019 – 2022',
    location: 'Settat, Morocco',
  },
];
