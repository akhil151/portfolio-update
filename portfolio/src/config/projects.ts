export interface Project {
  id: string;
  title: string;
  year: string;
  summary: string;
  stack: string[];
  tags: string[];
  link: string;
  repo: string;
  demo?: string;
  image: string;
  video?: string;
}

export const projects: Project[] = [
  {
    id: "aegis-cps",
    title: "AEGIS-CPS",
    year: "2026",
    summary:
      "Enterprise cyber-physical security platform protecting connected robots and industrial systems using a six-layer detection engine, explainable evidence fusion, AI-assisted incident investigation, digital twin monitoring, and live network telemetry. Includes an autonomous SOC workflow with AI investigation agents and human-in-the-loop response approval.",
    stack: ["Python", "FastAPI", "Streamlit", "AI Agents", "Digital Twin", "Network Security", "Incident Response"],
    tags: ["Cyber-Physical", "Digital Twin", "Autonomous SOC", "Evidence Fusion"],
    link: "https://github.com/akhil151/agent1.git",
    repo: "https://github.com/akhil151/agent1.git",
    image: "/assests/projects/aegis.jpeg",
  },
  {
    id: "elephant-detection",
    title: "Elephant Detection",
    year: "2026",
    summary:
      "Trained a YOLOv8 computer vision model on a custom Roboflow dataset to detect elephants from a Raspberry Pi camera feed, broadcasting live WebSocket alerts to a mobile app to reduce human-wildlife conflict. Deployed on edge hardware for on-device inference, avoiding cloud round-trip latency for time-critical alerts.",
    stack: ["Python", "YOLOv8", "OpenCV", "Raspberry Pi", "WebSocket", "Expo/React Native"],
    tags: ["Edge CV", "YOLOv8", "On-device inference", "Real-time alerts"],
    link: "https://github.com/deepakramaswamy2006/Elephant_Detection.git",
    repo: "https://github.com/deepakramaswamy2006/Elephant_Detection.git",
    image: "/assests/projects/elephant.jpeg",
  },
  {
    id: "nivesh-ai",
    title: "Nivesh.ai",
    year: "2025",
    summary:
      "Gemini-powered Retrieval-Augmented Generation (RAG) platform delivering a 0–100 funding readiness score and a personalised 5-step action checklist for early-stage Indian founders, in their preferred language. ChromaDB vector-retrieval pipeline paired with a PostgreSQL backend grounds recommendations in real startup data rather than raw LLM output.",
    stack: ["React", "FastAPI", "Gemini API", "ChromaDB", "PostgreSQL"],
    tags: ["RAG", "Multilingual", "Vector Search", "Founder Tooling"],
    link: "https://github.com/akhil151/ai-verse.git",
    repo: "https://github.com/akhil151/ai-verse.git",
    demo: "https://ai-verse-zhe6.vercel.app/",
    image: "/assests/projects/nivesh.jpeg",
  },
  {
    id: "agentic-ai",
    title: "Agentic AI",
    year: "2026",
    summary:
      "Autonomous multi-agent framework that plans, executes, and verifies complex tasks autonomously with specialized agents. Features multi-agent orchestration, goal-oriented execution, self-verifying outputs, persistent memory, and tool integration for reliable automated workflows.",
    stack: ["Python", "Groq LLM", "Multi-Agent", "Playwright", "FastAPI"],
    tags: ["Multi-Agent", "Autonomous Agents", "Tool Integration", "Self-Verification"],
    link: "https://github.com/akhil151/agenticai.git",
    repo: "https://github.com/akhil151/agenticai.git",
    image: "/assests/projects/agenticai.png",
  },
];
