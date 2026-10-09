export interface StackCategory {
  id: string;
  category: string;
  posture: "CORE / BUILDING" | "DATA & STORAGE" | "EXPLORING / LEARNING" | "SYSTEMS / EXPERIMENTAL" | "WORKFLOW / INFRA";
  description: string;
  skills: {
    name: string;
    level: "Building" | "Learning" | "Exploring";
  }[];
  projectReference?: {
    name: string;
    href: string;
  };
}

export const stackCategories: StackCategory[] = [
  {
    id: "frontend",
    category: "FRONTEND & WEB APPS",
    posture: "CORE / BUILDING",
    description:
      "Crafting responsive web applications, interactive dashboards, and design systems with strict TypeScript types, server components, and clean CSS.",
    skills: [
      { name: "TypeScript", level: "Building" },
      { name: "JavaScript (ES6+)", level: "Building" },
      { name: "React 19", level: "Building" },
      { name: "Next.js", level: "Building" },
      { name: "Tailwind CSS", level: "Building" },
      { name: "HTML5 / CSS3", level: "Building" },
    ],
    projectReference: {
      name: "F1 Telemetry Dashboard",
      href: "#work",
    },
  },
  {
    id: "backend",
    category: "BACKEND & APIS",
    posture: "CORE / BUILDING",
    description:
      "Designing HTTP/RESTful services, event-driven WebSocket connections, background processes, and exploring Go and Python backends.",
    skills: [
      { name: "Node.js", level: "Building" },
      { name: "Express", level: "Building" },
      { name: "REST APIs", level: "Building" },
      { name: "WebSockets (ws)", level: "Building" },
      { name: "Python", level: "Exploring" },
      { name: "Go", level: "Learning" },
    ],
    projectReference: {
      name: "CEX Matching Engine",
      href: "#work",
    },
  },
  {
    id: "databases",
    category: "DATABASES & DATA",
    posture: "DATA & STORAGE",
    description:
      "Relational schema modeling, type-safe queries, in-memory caching, double-entry financial ledgers, and data persistence guarantees.",
    skills: [
      { name: "PostgreSQL", level: "Building" },
      { name: "Prisma ORM", level: "Building" },
      { name: "Redis", level: "Building" },
      { name: "SQL", level: "Building" },
      { name: "In-Memory State", level: "Building" },
    ],
    projectReference: {
      name: "CEX Matching Engine",
      href: "#work",
    },
  },
  {
    id: "ai-ml",
    category: "AI & MACHINE LEARNING",
    posture: "EXPLORING / LEARNING",
    description:
      "Exploring model architectures from the ground up: Transformer attention mechanisms, local CLI agent loops, tool dispatch protocols, and on-device inference.",
    skills: [
      { name: "LLM API Integration", level: "Building" },
      { name: "AI Coding Agents", level: "Building" },
      { name: "Tool Calling Protocols", level: "Building" },
      { name: "Transformer Forward Pass", level: "Exploring" },
      { name: "On-Device Inference", level: "Learning" },
    ],
    projectReference: {
      name: "AI Coding Harness",
      href: "#work",
    },
  },
  {
    id: "systems",
    category: "SYSTEMS & PERFORMANCE",
    posture: "SYSTEMS / EXPERIMENTAL",
    description:
      "Investigating performance close to hardware: cache-conscious loops, zero-allocation buffers, SIMD parallelism, and direct 2D Canvas rendering.",
    skills: [
      { name: "C++17", level: "Exploring" },
      { name: "Cache Locality & Tiling", level: "Exploring" },
      { name: "Circular Ring Buffers", level: "Building" },
      { name: "HTML5 2D Canvas", level: "Building" },
      { name: "SIMD / AVX2 (Concepts)", level: "Learning" },
    ],
    projectReference: {
      name: "GPT-2 Inference Engine",
      href: "#work",
    },
  },
  {
    id: "devops",
    category: "DEVOPS & INFRASTRUCTURE",
    posture: "WORKFLOW / INFRA",
    description:
      "Operating inside Linux environments, containerizing services with Docker, git-centric continuous integration, and cloud service deployments.",
    skills: [
      { name: "Linux (Ubuntu / Shell)", level: "Building" },
      { name: "Docker", level: "Building" },
      { name: "Git & GitHub Actions", level: "Building" },
      { name: "AWS (EC2, S3)", level: "Exploring" },
      { name: "Prometheus / Metrics", level: "Learning" },
    ],
    projectReference: {
      name: "Infrastructure & Systems",
      href: "#systems",
    },
  },
];
