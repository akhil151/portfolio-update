import { socials } from "./site";

export const about = {
  eyebrow: "ABOUT ME",
  introName: "Akhilesh M P",
  lead: "Aspiring AI/ML Engineer and Full-Stack Developer building across machine learning, computer vision, and LLM-based agentic AI — from edge-deployed wildlife detection to enterprise cyber-physical security platforms.",
  focus: [
    "Machine Learning & Deep Learning",
    "Computer Vision & Edge AI",
    "LLM Agents & Retrieval-Augmented Generation",
    "Full-Stack (MERN) & API Engineering",
    "Cyber-Physical Systems & Digital Twins",
  ],
  education: [
    {
      school: "Sri Eshwar College of Engineering",
      degree: "B.E. CSE (AI & ML)",
      meta: "CGPA 8.51 · up to 4th Semester",
      years: "2024 – 2028",
    },
    {
      school: "ST. ANTONY'S Matric Higher Secondary School",
      degree: "HSC",
      meta: "92.3%",
      years: "2023 – 2024",
    },
    {
      school: "ST. ANTONY'S Matric Higher Secondary School",
      degree: "SSLC",
      meta: "86.6%",
      years: "2021 – 2022",
    },
  ],
  experience: [
    {
      role: "Agentic AI Intern",
      org: "AptitudeGuru",
      year: "2026",
      stack: "Python · LLM Agents · Transformers · Prompt Engineering",
    },
    {
      role: "MERN Stack Development Intern",
      org: "EduCentro",
      year: "2025",
      stack: "MongoDB · Express.js · React · Node.js · REST APIs",
    },
  ],
};

export interface ServiceField {
  title: string;
  tags: string[];
  img: string;
  info: string;
}

export const services: ServiceField[] = [
  {
    title: "AI & Machine Learning",
    tags: ["Deep Learning", "NLP", "LLM Agents", "RAG", "Prompt Engineering"],
    img: "/services/ai.svg",
    info: "Training and shipping applied ML — from CNNs and transformers to production inference with TensorFlow, PyTorch, and Scikit-Learn.",
  },
  {
    title: "Computer Vision",
    tags: ["OpenCV", "YOLOv8", "Object Detection", "Image Processing"],
    img: "/services/cv.svg",
    info: "Building detection and perception systems that run on-device — edge deployment for time-critical, low-latency alerts.",
  },
  {
    title: "Agentic AI & RAG",
    tags: ["Multi-agent Orchestration", "Gemini / Groq", "ChromaDB", "Evidence Fusion"],
    img: "/services/agents.svg",
    info: "Designing autonomous agents and retrieval pipelines that stay grounded in real data instead of raw model output.",
  },
  {
    title: "Full-Stack Development",
    tags: ["ReactJS", "React Native", "Node.js", "FastAPI", "REST APIs", "MERN"],
    img: "/services/fullstack.svg",
    info: "End-to-end products — typed front-ends, resilient APIs, and databases wired together for real users.",
  },
  {
    title: "Cyber-Physical & Systems",
    tags: ["Digital Twins", "Network Security", "Edge Deployment", "Incident Response"],
    img: "/services/cps.svg",
    info: "Monitoring and protecting connected robots and industrial systems with explainable, human-in-the-loop workflows.",
  },
];

export interface Achievement {
  name: string;
  badge: string;
  icon: string;
  hoverImg: string;
  url: string;
}

export const achievements: Achievement[] = [
  {
    name: "Creatathon — 1st Place (Web Development)",
    badge: "' 1",
    icon: "/achievements/creathon.svg",
    hoverImg: "/achievements/creathon.svg",
    url: socials.linkedin,
  },
  {
    name: "Project Expo — 1st Prize (Design Thinking)",
    badge: "' 1",
    icon: "/achievements/projectexpo.svg",
    hoverImg: "/achievements/projectexpo.svg",
    url: socials.linkedin,
  },
  {
    name: "SCI-FIXX — 3rd Place (Bug Fixing)",
    badge: "' 3",
    icon: "/achievements/scifixx.svg",
    hoverImg: "/achievements/scifixx.svg",
    url: socials.linkedin,
  },
  {
    name: "4+ National-Level Hackathons",
    badge: "' 4+",
    icon: "/achievements/hackathons.svg",
    hoverImg: "/achievements/hackathons.svg",
    url: socials.github,
  },
  {
    name: "LeetCode — 170+ Problems",
    badge: "' 170+",
    icon: "/achievements/leetcode.svg",
    hoverImg: "/achievements/leetcode.svg",
    url: socials.github,
  },
  {
    name: "SkillRack — 1200+ Problems",
    badge: "' 1200+",
    icon: "/achievements/skillrack.svg",
    hoverImg: "/achievements/skillrack.svg",
    url: socials.github,
  },
];

export const certifications = [
  { name: "Fundamentals of Deep Learning", issuer: "NVIDIA", year: "2026" },
  { name: "Data Analytics Virtual Job Simulation", issuer: "Deloitte (Forage)", year: "2026" },
  { name: "Design Thinking", issuer: "NPTEL", year: "2026" },
  { name: "Introduction to Machine Learning", issuer: "NPTEL", year: "2025" },
  { name: "Introduction to Python", issuer: "Udemy", year: "2025" },
  { name: "DSA Basics in C++", issuer: "Udemy", year: "2025" },
  { name: "Oracle Badge in Java", issuer: "Oracle", year: "2025" },
];

export const skills = {
  languages: ["Python", "Java", "C", "C++", "JavaScript", "SQL", "HTML", "CSS"],
  aiMl: ["Deep Learning", "Computer Vision", "NLP", "LLM Agents", "RAG", "Prompt Engineering", "TensorFlow/PyTorch", "Scikit-Learn", "Keras"],
  cv: ["OpenCV", "YOLOv8", "Object Detection", "Image Processing"],
  generativeAi: ["Gemini API", "Groq LLaMA 3.3 70B", "Stable Diffusion", "ChromaDB"],
  web: ["ReactJS", "React Native", "Node.js", "Express.js", "FastAPI", "REST APIs", "WebSocket", "Socket.IO", "MERN Stack"],
  databases: ["MongoDB", "PostgreSQL", "ChromaDB", "SQL"],
  tools: ["Git", "GitHub", "VS Code", "Playwright", "Raspberry Pi", "Tableau", "Power BI"],
} as const;
