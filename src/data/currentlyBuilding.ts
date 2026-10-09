export type TrackStatus = "BUILDING" | "EXPERIMENTING" | "LEARNING" | "COMPLETED";

export interface ActiveTrack {
  id: string;
  title: string;
  category: string;
  status: TrackStatus;
  statusBadge: string;
  description: string;
  technologies: string[];
  linkUrl?: string;
  linkText?: string;
}

export const activeTracks: ActiveTrack[] = [
  {
    id: "ai-harness",
    title: "AI CODING HARNESS",
    category: "DEVELOPER TOOLS · AGENTIC RUNTIME",
    status: "BUILDING",
    statusBadge: "ACTIVE WORK",
    description:
      "A developer-tooling project exploring AI-assisted coding workflows, multi-provider model integration, deterministic tool execution loops, and automated feedback diffs.",
    technologies: ["TypeScript", "Agent Loops", "Tool Calling", "CLI"],
    linkUrl: "https://github.com/ouroboros1X/claudecode-harnes",
    linkText: "VIEW REPO →",
  },
  {
    id: "chromium-llm",
    title: "ON-DEVICE CHROMIUM LLM ENGINE",
    category: "LOCAL INFERENCE · BROWSER RUNTIME",
    status: "EXPERIMENTING",
    statusBadge: "EXPLORATION",
    description:
      "An engineering investigation exploring local AI model inference inside browser and Chromium runtimes for private DOM reasoning and zero-cloud API workflows.",
    technologies: ["Chromium", "C++", "Local Inference", "WebGPU"],
    linkUrl: "https://github.com/ouroboros1X",
    linkText: "RESEARCH LOG →",
  },
  {
    id: "gpt2-engine",
    title: "GPT-2 C++ INFERENCE ENGINE",
    category: "SYSTEMS · MACHINE LEARNING RUNTIME",
    status: "COMPLETED",
    statusBadge: "FUNCTIONAL PROTOTYPE",
    description:
      "A transformer forward pass implemented from first principles in standard C++17, focused on understanding the mechanics of GPT-2 inference without PyTorch, ONNX, or runtime libraries.",
    technologies: ["C++17", "Attention Kernels", "Cache Tiling", "SIMD"],
    linkUrl: "https://github.com/ouroboros1X/GPT2_INFERENCE-ENGINE",
    linkText: "VIEW SOURCE →",
  },
];

export const explorationAreas = [
  "LLM AGENT LOOPS",
  "TOOL USE PROTOCOLS",
  "C++17 SYSTEMS",
  "GO RUNTIMES",
  "DATABASE INTERNALS",
  "STREAMING WEBSOCKETS",
];

export const openToOpportunities = [
  {
    title: "FULL-STACK & SAAS ROLES",
    desc: "Building high-utility web applications, scalable SaaS products, and resilient backend services.",
  },
  {
    title: "SYSTEMS & BACKEND PLATFORMS",
    desc: "Engineering high-throughput services, distributed dataflows, and developer infrastructure.",
  },
  {
    title: "OPEN SOURCE COLLABORATIONS",
    desc: "Collaborating in public on developer tools, inference experiments, and first-principles software.",
  },
];
