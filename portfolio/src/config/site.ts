export const site = {
  name: "Akhilesh M P",
  shortName: "Akhilesh",
  role: "AI/ML Engineer · Full-Stack Developer",
  // Verbatim from provided resume / GitHub profile — do not embellish.
  bio: "Aspiring AI/ML Engineer and Full-Stack Developer pursuing a B.E. in CSE (AI & ML) at Sri Eshwar College of Engineering (2024–2028). I build across machine learning, computer vision, LLM-based agentic AI, RAG pipelines, and MERN full-stack applications — from edge-deployed wildlife detection systems to enterprise cyber-physical security platforms.",
  email: "Palanisamyakhil@gmail.com",
  phone: "+91 9791485630",
  phoneHref: "tel:+919791485630",
  location: "Coimbatore, India",
  // TODO: replace with final domain once provided. Used for canonical/OG/sitemap.
  canonicalUrl: "https://your-domain.example",
  resume: "/resume.pdf",
} as const;

export const socials = {
  github: "https://github.com/akhil151",
  linkedin: "https://www.linkedin.com/in/akhilesh-m-p",
  email: "mailto:Palanisamyakhil@gmail.com",
  // Profile URLs not confirmed — left empty so UI can omit the link rather than invent one.
  leetcode: "",
  skillrack: "",
} as const;

export const codingStats = [
  { label: "LeetCode", value: "170+", detail: "Problems Solved" },
  { label: "SkillRack", value: "1200+", detail: "Problems Solved" },
] as const;

export const navItems = [
  { name: "About", url: "/about" },
  { name: "Works", url: "/works" },
  { name: "Services", url: "/services" },
  { name: "Connect", url: "/connect" },
] as const;

export type SiteConfig = typeof site;
