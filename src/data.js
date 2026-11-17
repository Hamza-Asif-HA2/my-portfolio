import portrait from './assets/portrait.webp';
import trendyImage from './assets/trendy-ecommerce.png';
import assignmentImage from './assets/getyourassignment.png';

const imgs = import.meta.glob('./assets/work/*.webp', { eager: true, import: 'default' });
const shots = (key) =>
  Object.keys(imgs)
    .filter((p) => p.includes(`/work/${key}-`))
    .sort()
    .map((p) => imgs[p]);

export const profile = {
  name: 'Hamza Asif',
  first: 'Hamza',
  last: 'Asif',
  role: 'AI & Full-Stack Engineer',
  location: 'Lahore, Pakistan',
  email: 'hamzaasif0726@gmail.com',
  github: 'https://github.com/Hamza-Asif-HA2',
  githubHandle: 'Hamza-Asif-HA2',
  linkedin: 'https://www.linkedin.com/in/hamza-asif-6a550321a/',
  portrait,
  summary:
    "I help businesses turn ideas into working digital systems: production-ready AI backends, n8n automation, RAG applications and full-stack web and mobile apps, built with technical precision and practical business value.",
  facts: [
    { label: 'Current role', value: 'Associate Software Engineer', sub: 'Frontend + backend at Inotexel' },
    { label: 'Core focus', value: 'AI backends & full-stack', sub: 'FastAPI · Node.js · React' },
    { label: 'Education', value: 'BS Computer Science', sub: 'Lahore Garrison University' },
  ],
  tags: ['AI Agents', 'n8n', 'RAG', 'FastAPI', 'React / Next.js'],
};

/*
 * Experience. LinkedIn could not be read automatically, so this comes from the
 * portfolio PDF and the earlier resume. Check the dates and adjust as needed.
 */
export const journey = [
  {
    when: 'Now',
    title: 'Associate Software Engineer',
    org: 'Inotexel',
    text: 'Frontend and backend engineering on client products: FastAPI and Node.js services, React interfaces, AI backends and n8n automation workflows.',
  },
  {
    when: 'Ongoing',
    title: 'Independent ML research',
    org: 'Personal work',
    text: 'Explainable few-shot Swin Transformer for paddy disease classification, a garbage classification article, and tumor classification notebooks on Kaggle and Colab.',
  },
  {
    when: '2023',
    title: 'Computer Lecturer',
    org: 'Study Connections Academy',
    text: 'Taught computer science to Matric and Intermediate students (grades 9 to 12), covering curriculum development, classroom instruction and assessment.',
  },
  {
    when: '2022',
    title: 'BS Computer Science',
    org: 'Lahore Garrison University',
    text: 'Bachelor’s degree, 2022 to 2026.',
  },
  {
    when: 'Certs',
    title: 'Meta Front-End Certificates',
    org: 'Coursera',
    text: 'Introduction to Front-End Development · Programming with JavaScript.',
  },
];

export const services = [
  { title: 'AI Agents & Automation', text: 'n8n workflows, AI agents and tool integrations that remove repetitive work.' },
  { title: 'RAG & LLM Apps', text: 'LangChain pipelines, vector search with pgvector, LLM-powered APIs.' },
  { title: 'Full-Stack Web', text: 'React, Next.js, Node.js and Supabase apps, dashboards and admin panels.' },
  { title: 'Mobile Apps', text: 'Cross-platform React Native / Expo apps with live backends.' },
  { title: 'ML & Computer Vision', text: 'PyTorch / TensorFlow models, ViT & CNNs, explainable AI.' },
  { title: 'Technical Writing', text: 'IEEE-style LaTeX papers and clear project documentation.' },
];

export const process = [
  { title: 'Brief', text: 'A call, then a written brief on what the work has to achieve, by when, and how we will know it worked.' },
  { title: 'Build', text: 'Backend, frontend and automation handled by one engineer, so nothing waits in a queue.' },
  { title: 'Review', text: 'You see work in progress, not just a final build. Revisions are part of the scope.' },
  { title: 'Hand over', text: 'Source code, access and documentation, with ongoing support if you want it.' },
];

export const stack = [
  { group: 'AI & Backend', items: ['Python', 'FastAPI', 'Node.js', 'Express', 'LangChain', 'RAG', 'pgvector', 'n8n', 'Gemini API', 'Groq', 'Whisper'] },
  { group: 'Frontend & Mobile', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'Three.js', 'React Native', 'Expo'] },
  { group: 'Data & Cloud', items: ['PostgreSQL', 'MongoDB', 'Supabase', 'SQL Server', 'Docker', 'Render', 'Resend'] },
  { group: 'Machine Learning', items: ['PyTorch', 'TensorFlow', 'Vision Transformer', 'Swin', 'CNNs', 'Grad-CAM', 'LIME', 'ONNX', 'TFLite'] },
  { group: 'Tools', items: ['Git & GitHub', 'LaTeX', 'Kaggle', 'Colab', 'REST APIs', 'draw.io'] },
];

export const workflowSteps = [
  { tag: 'Trigger', title: 'Ideation', text: 'Pillar, template, keywords' },
  { tag: 'AI', title: 'Draft generation', text: 'Claude / Groq / Gemini' },
  { tag: 'Audit', title: 'Quality & SEO', text: 'Scored before review' },
  { tag: 'Human', title: 'Editorial review', text: 'Editor refines the draft' },
  { tag: 'Human', title: 'Visual curation', text: 'Pexels · Pixabay · Unsplash' },
  { tag: 'Transform', title: 'Publish prep', text: 'Markdown → HTML, images' },
  { tag: 'API', title: 'Blogger upload', text: 'OAuth, draft mode' },
  { tag: 'Notify', title: 'Team handoff', text: 'Slack status & cost' },
];

export const projects = [
  {
    id: 'ai-video-studio',
    title: 'AI Video Studio',
    tagline: 'Templates, voice & motion graphics.',
    kicker: 'AI video editor · Blogger Studio / IQPrompt',
    description:
      'AI-based video editor and studio with a 260+ template library, voice-over generation through ElevenLabs, automated scene scripting and editable motion graphics.',
    capabilities: [
      'Template library with 260+ styles and dynamic layouts',
      'ElevenLabs voice-over integration and timeline editor',
      'Editable motion graphics with custom animations',
    ],
    stack: ['Next.js', 'ElevenLabs API', 'Claude Opus', 'Timeline UI', 'Remotion'],
    images: shots('video'),
    accent: '#7b5cff',
  },
  {
    id: 'blogger-studio',
    title: 'Blogger Studio',
    tagline: 'From idea to drafted post.',
    kicker: 'Human-in-the-loop AI publishing',
    description:
      'An AI publishing system that takes a topic from idea to a drafted Blogger post, with editorial checks, image curation and team handoff built in. Workflow state, articles, SEO, QA, image curation and model costs live in Supabase (Postgres + Auth + RLS).',
    capabilities: [
      'Long-form AI drafts with SEO pack, QA report and cost tracking',
      'Editorial audit, human review and stock-image curation',
      'One-click Blogger draft upload with Slack team updates',
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'Supabase', 'Claude', 'Groq', 'Gemini', 'Blogger API'],
    images: [],
    kind: 'workflow',
    accent: '#3fb67b',
  },
  {
    id: 'navexa-ai',
    title: 'Navexa AI',
    tagline: 'Hands-free AI for the road.',
    kicker: 'Voice-first driving assistant · Android',
    description:
      'A voice-first AI driving assistant for Android. It listens for a wake word, verifies the speaker, understands the request and responds through maps and music.',
    capabilities: [
      'Wake-word detection and speaker verification',
      'Custom voice pipeline with Whisper and LLMs',
      'Google Maps and Spotify integration',
    ],
    stack: ['React Native', 'Expo', 'Node.js', 'MongoDB', 'Gemini', 'Groq'],
    images: shots('navexa'),
    kind: 'phone',
    accent: '#22c55e',
  },
  {
    id: 'cas-energy',
    title: 'The CAS Energy',
    tagline: 'A new wave of solar.',
    kicker: 'Solar company website',
    description:
      'Website for a solar company offering commercial, residential and off-grid systems, with a project portfolio the team manages themselves.',
    capabilities: [
      'Animated gradient hero and portfolio carousels',
      'Contact form with dual email notifications',
      'Admin panel to add, update and remove projects',
    ],
    stack: ['React', 'Vite', 'Tailwind CSS', 'Express', 'Nodemailer', 'Supabase'],
    images: shots('cas'),
    links: [{ label: 'thecasenergy.online', url: 'https://thecasenergy.online' }],
    accent: '#f5b301',
  },
  {
    id: 'bilzaam',
    title: 'Bilzaam',
    tagline: 'Ideas into impact.',
    kicker: 'Creative & technology studio website',
    description:
      'Marketing and portfolio website for a creative and technology studio, presenting six service pillars, case-study pages, a journal and a contact flow.',
    capabilities: [
      'Service pages and portfolio case studies',
      'Journal (blog) and contact flow',
      'Fast, SEO-friendly Next.js build',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    images: shots('bilzaam'),
    links: [{ label: 'bilzaam.com', url: 'https://bilzaam.com' }],
    accent: '#ff5a1f',
  },
  {
    id: 'medicore',
    title: 'MediCore HMS',
    tagline: 'Hospital management, end to end.',
    kicker: 'Full-stack hospital management system',
    description:
      'A full-stack hospital management system covering clinical and administrative workflows (admissions, appointments, billing, rooms, equipment, doctor and patient portals) on a relational SQL Server database.',
    capabilities: [
      'Admin, doctor and patient-facing workflows',
      'Relational data model on SQL Server',
      'Cloud-deployed on Render',
    ],
    stack: ['Node.js', 'Express', 'SQL Server', 'Render'],
    images: shots('medicore'),
    accent: '#38bdf8',
  },
  {
    id: 'autoscholar',
    title: 'AutoScholar',
    tagline: 'From Kaggle models to research paper.',
    kicker: 'Autonomous ML research platform',
    description:
      'An ML research and paper generation platform built on Kaggle datasets (for example the explainable Swin Transformer and garbage classification models) that drafts research papers from the experiments.',
    capabilities: [
      'Kaggle dataset and Swin Transformer benchmarking',
      'Garbage classification and explainable AI pipelines',
      'IEEE / ACM LaTeX export and Colab telemetry',
    ],
    stack: ['Python', 'FastAPI', 'PyTorch', 'Swin Transformer', 'Kaggle API', 'LaTeX'],
    images: shots('autoscholar'),
    accent: '#8b8ff7',
  },
  {
    id: 'research',
    title: 'Personal Research',
    tagline: 'Independent ML work and notebooks.',
    kicker: 'Papers, articles & notebooks',
    description:
      'Personal ML research notes, articles and notebooks, separate from client work: independent experiments and paper writing, including an explainable few-shot Swin Transformer for paddy disease classification in low-resource smart agriculture.',
    capabilities: [
      'Garbage classification research article',
      'Explainable Swin Transformer research paper',
      'Kaggle and Colab notebooks for model exploration',
    ],
    stack: ['PyTorch', 'TensorFlow', 'ViT', 'Swin', 'Grad-CAM'],
    images: shots('research'),
    kind: 'document',
    links: [
      { label: 'Garbage classification · Kaggle', url: 'https://www.kaggle.com/code/hamzaasif07/garbage-classification' },
      { label: 'Tumor classification · Kaggle', url: 'https://www.kaggle.com/code/hamzaasif07/tumor-classification-4classes' },
      { label: 'Colab notebook', url: 'https://colab.research.google.com/drive/11a8LyrS4LKVx2gRMemK0FnRGaEzrfAc_?usp=sharing' },
    ],
    accent: '#e879f9',
  },
  {
    id: 'ai-assignment',
    title: 'AI Assignment Generator',
    tagline: 'Assignments on demand.',
    kicker: 'Earlier work · Gemini-powered web app',
    description:
      'A responsive, AI-powered assignment generator. The Gemini API creates academic content from user input, with Firebase Authentication and Firestore for accounts and storage.',
    capabilities: [
      'Gemini API content generation from user prompts',
      'Firebase Authentication and Firestore storage',
      'Responsive React + Tailwind interface',
    ],
    stack: ['React', 'Tailwind CSS', 'Firebase', 'Gemini API'],
    images: [assignmentImage],
    links: [
      { label: 'Live demo', url: 'https://getyourassignment-git-main-hamza-asifs-projects-81b51cbf.vercel.app/' },
      { label: 'GitHub', url: 'https://github.com/Hamza-Asif-HA2/aiassignment' },
    ],
    accent: '#60a5fa',
  },
  {
    id: 'trendy',
    title: 'Trendy',
    tagline: 'A full-stack storefront.',
    kicker: 'Earlier work · e-commerce web app',
    description:
      'A full-stack clothing and accessories store with product browsing, cart, checkout and an admin dashboard for product management, backed by Firebase.',
    capabilities: [
      'Product browsing, cart and checkout',
      'Admin dashboard for product management',
      'Firebase database and authentication',
    ],
    stack: ['React', 'React Router', 'Context API', 'Firebase'],
    images: [trendyImage],
    links: [
      { label: 'Live demo', url: 'https://trendy-ecommerce.vercel.app/' },
      { label: 'GitHub', url: 'https://github.com/Hamza-Asif-HA2/Trendy-Ecommerce-Web-App' },
    ],
    accent: '#f472b6',
  },
];
