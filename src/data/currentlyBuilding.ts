export interface ActiveTrack {
  id: string;
  title: string;
  phase: string;
  statusVisual: string;
  percentageText: string;
  focus: string;
  tags: string[];
}

export const activeTracks: ActiveTrack[] = [
  {
    id: "ai-harness",
    title: "AI CODING HARNESS (MYPI)",
    phase: "AGENT RUNTIME & TOOL SANDBOX",
    statusVisual: "███████████░",
    percentageText: "85%",
    focus: "Refining multi-step bash execution, diff-based file patching, and context eviction algorithms.",
    tags: ["TypeScript", "Agent Loops", "Tool Calling", "CLI"],
  },
  {
    id: "chromium-llm",
    title: "ON-DEVICE CHROMIUM LLM ENGINE",
    phase: "CORE INTEGRATION & INFERENCE",
    statusVisual: "████████░░░░",
    percentageText: "70%",
    focus: "Executing local models on-device inside browser context for private DOM reasoning without cloud APIs.",
    tags: ["Chromium", "C++", "Local Inference", "Privacy"],
  },
  {
    id: "gpt2-engine",
    title: "GPT-2 C++ INFERENCE ENGINE",
    phase: "SIMD & BENCHMARKING",
    statusVisual: "████████████",
    percentageText: "95%",
    focus: "Verifying numerical token logit alignment against PyTorch reference tensors and AVX2 vectorization.",
    tags: ["C++17", "Transformers", "AVX2", "Systems"],
  },
];

export const explorationAreas = [
  "LLM AGENTS",
  "TOOL USE",
  "C++",
  "GO",
  "SYSTEM DESIGN",
];

export const openToOpportunities = [
  {
    title: "INTERNSHIPS",
    desc: "AI infrastructure, systems engineering, backend platforms, and developer tools.",
  },
  {
    title: "COLLABORATIONS",
    desc: "Working alongside teams shipping high-performance software and real runtimes.",
  },
  {
    title: "OPEN SOURCE",
    desc: "Building tools, compilers, inference engines, and open infrastructure in public.",
  },
];
