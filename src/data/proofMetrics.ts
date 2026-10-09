export interface ProofCard {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  metadata: {
    label: string;
    value: string;
  };
  tags: string[];
}

export const proofCards: ProofCard[] = [
  {
    id: "proof-gpt2",
    eyebrow: "C++ / MACHINE LEARNING",
    title: "C++ / GPT-2 INFERENCE ENGINE",
    description: "Built a GPT-2 inference engine from scratch in C++.",
    metadata: {
      label: "ARCHITECTURE",
      value: "12-LAYER TRANSFORMER · 768-DIM",
    },
    tags: ["C++17", "NO RUNTIME LIBS", "CPU DIRECT"],
  },
  {
    id: "proof-ai-harness",
    eyebrow: "AI / DEVELOPER TOOLS",
    title: "AI CODING HARNESS",
    description: "Building a Claude Code-style local AI development harness.",
    metadata: {
      label: "CAPABILITY",
      value: "LOCAL IPC · BASH TOOLING · LLM LOOP",
    },
    tags: ["TYPESCRIPT", "AGENTIC LOOP", "CLI ENGINE"],
  },
  {
    id: "proof-opensource",
    eyebrow: "COMMUNITY / PUBLIC CODE",
    title: "OPEN SOURCE PROJECTS",
    description: "Building and experimenting in public.",
    metadata: {
      label: "REPOSITORIES",
      value: "CORE RUNTIMES · TOOLS · INFRA",
    },
    tags: ["OPEN SOURCE", "SYSTEMS", "PUBLIC BUILDS"],
  },
  {
    id: "proof-systems",
    eyebrow: "INFRASTRUCTURE & SYSTEMS",
    title: "SYSTEMS ENGINEERING",
    description: "Working close to runtime, infrastructure and developer tooling.",
    metadata: {
      label: "DEPLOYMENT",
      value: "LINUX · DOCKER · K8S · TERRAFORM",
    },
    tags: ["CEX ENGINE", "KUBERNETES", "LINUX KERNEL"],
  },
];
