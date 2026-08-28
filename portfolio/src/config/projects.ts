import { socials } from "./site";

export interface Project {
  id: string;
  title: string;
  year: string;
  summary: string;
  stack: string[];
  tags: string[];
  /** External / live link. Pointed at the GitHub profile until exact repo URLs are confirmed. */
  link: string;
  /** Source repository. Same as above for now. */
  repo: string;
  /** Local placeholder thumbnail — replace with real asset when provided. */
  image: string;
  /** Optional showcase video. Left empty until real media is supplied. */
  video?: string;
}

export const projects: Project[] = [
  {
    id: "elephant-detection",
    title: "Elephant Detection",
    year: "2026",
    summary:
      "Trained a YOLOv8 computer vision model on a custom Roboflow dataset to detect elephants from a Raspberry Pi camera feed, broadcasting live WebSocket alerts to a mobile app to reduce human-wildlife conflict. Deployed on edge hardware for on-device inference, avoiding cloud round-trip latency for time-critical alerts.",
    stack: ["Python", "YOLOv8", "OpenCV", "Raspberry Pi", "WebSocket", "Expo/React Native"],
    tags: ["Edge CV", "YOLOv8", "On-device inference", "Real-time alerts"],
    link: socials.github,
    repo: socials.github,
    image: "/projects/elephant.svg",
  },
  {
    id: "aegis-cps",
    title: "AEGIS-CPS",
    year: "2026",
    summary:
      "Enterprise cyber-physical security platform protecting connected robots and industrial systems using a six-layer detection engine, explainable evidence fusion, AI-assisted incident investigation, digital twin monitoring, and live network telemetry. Includes an autonomous SOC workflow with AI investigation agents and human-in-the-loop response approval.",
    stack: ["Python", "FastAPI", "Streamlit", "AI Agents", "Digital Twin", "Network Security", "Incident Response"],
    tags: ["Cyber-Physical", "Digital Twin", "Autonomous SOC", "Evidence Fusion"],
    link: socials.github,
    repo: socials.github,
    image: "/projects/aegis.svg",
  },
  {
    id: "agentic-social",
    title: "Agentic AI Social Media Automation",
    year: "2026",
    summary:
      "Autonomous multi-agent system generating captions with Groq LLaMA 3.3 70B and images with a locally-run Stable Diffusion 1.5 pipeline, then auto-publishing across Facebook, Instagram, and LinkedIn via Playwright. Engineered a 3-strategy fallback upload flow with persistent session handling for reliable posting despite frequent platform UI changes.",
    stack: ["Python", "Groq LLM", "Stable Diffusion", "Playwright"],
    tags: ["Multi-Agent", "LLM", "Auto-Publishing", "Fallback Orchestration"],
    link: socials.github,
    repo: socials.github,
    image: "/projects/agentic.svg",
  },
  {
    id: "nivesh-ai",
    title: "Nivesh.ai",
    year: "2025",
    summary:
      "Gemini-powered Retrieval-Augmented Generation (RAG) platform delivering a 0–100 funding readiness score and a personalised 5-step action checklist for early-stage Indian founders, in their preferred language. ChromaDB vector-retrieval pipeline paired with a PostgreSQL backend grounds recommendations in real startup data rather than raw LLM output.",
    stack: ["React", "FastAPI", "Gemini API", "ChromaDB", "PostgreSQL"],
    tags: ["RAG", "Multilingual", "Vector Search", "Founder Tooling"],
    link: socials.github,
    repo: socials.github,
    image: "/projects/nivesh.svg",
  },
];
