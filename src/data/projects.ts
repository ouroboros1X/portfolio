export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  technicalDetails: string[];
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  sourceCtaLabel?: string;
  exploreCtaLabel?: string;
  caseStudyAvailable: boolean;
  pipeline: {
    title?: string;
    steps: {
      name: string;
      desc: string;
      badge?: string;
    }[];
  };
  metrics: {
    label: string;
    value: string;
  }[];
  deepDive: {
    modalEyebrow?: string;
    problem: string;
    implementation: string;
    keyTakeaway: string;
    codeSnippet?: {
      filename: string;
      language: string;
      code: string;
    };
  };
}

export const projectsData: Project[] = [
  {
    id: "gpt2-inference-engine",
    number: "PROJECT 01",
    title: "GPT-2 INFERENCE ENGINE",
    category: "SYSTEMS · MACHINE LEARNING RUNTIME",
    tagline: "Transformer forward pass implemented from first principles in C++17.",
    description:
      "A GPT-2 inference engine implemented in C++ to explore the mechanics of transformer inference. The project focuses on model execution, tensor operations, transformer computation, and token generation without relying on a high-level inference runtime. Loads GPT-2 Small binary weights into contiguous memory buffers and executes the full forward computation graph. Generates text autoregressively with causal self-attention and temperature-scaled sampling.",
    technicalDetails: [
      "Custom tensor buffer memory management without runtime allocations during forward loop",
      "Manual matrix multiplication kernels with cache-friendly loop tiling and SIMD-friendly layout",
      "Full Transformer block: LayerNorm, causal masked MHA (12 heads), MLP with GELU, and residual sums",
      "Greedy and temperature-based autoregressive decoding loop predicting 50,257 vocabulary logits",
    ],
    tags: ["C++", "C++17", "ML", "INFERENCE", "SYSTEMS"],
    githubUrl: "https://github.com/ouroboros1X/GPT2_INFERENCE-ENGINE",
    caseStudyAvailable: true,
    pipeline: {
      title: "INFERENCE PIPELINE",
      steps: [
        { name: "INPUT", desc: "Raw ASCII string stream", badge: "std::string" },
        { name: "TOKENIZATION", desc: "Byte-pair encoding lookup", badge: "vocab.bpe" },
        { name: "EMBEDDINGS", desc: "WTE token + WPE position sum", badge: "768-dim" },
        { name: "TRANSFORMER", desc: "12× Causal MHA · LayerNorm · MLP · Residuals", badge: "124M params" },
        { name: "LOGITS", desc: "Vocab projection to 50,257 dimensions", badge: "Float32" },
        { name: "NEXT TOKEN", desc: "Argmax / Top-K autoregressive sampling", badge: "Emit token" },
      ],
    },
    metrics: [
      { label: "FRAMEWORKS USED", value: "0 (PURE C++)" },
      { label: "MODEL PARAMETERS", value: "124,439,808" },
      { label: "TRANSFORMER LAYERS", value: "12 BLOCKS" },
      { label: "ATTENTION HEADS", value: "12 HEADS / 768 DIM" },
    ],
    deepDive: {
      problem:
        "Modern deep learning libraries hide the exact memory access patterns, floating-point math, and caching implications of autoregressive transformers behind opaque C++/CUDA bindings.",
      implementation:
        "Implemented the GPT-2 Small forward computation graph strictly in standard C++17. The model loads weights from binary dumps into flat contiguous float buffers. Attention heads are computed with causal lower-triangular masking to ensure no future token leakage.",
      keyTakeaway:
        "Understanding cache locality, memory layout (row-major vs column-major), and floating-point stability is essential before optimizing any neural network runtime.",
      codeSnippet: {
        filename: "gpt2_attention.cpp",
        language: "cpp",
        code: `// Causal Multi-Head Self-Attention in pure C++
void causal_self_attention(
    const float* x,        // [seq_len, 768]
    const float* qkv_w,    // [768, 3 * 768]
    float* out,            // [seq_len, 768]
    int seq_len,
    int n_head = 12,
    int d_head = 64
) {
    // 1. Project Q, K, V
    // 2. Transpose for multi-head parallelism [n_head, seq_len, d_head]
    // 3. Dot product attention: Q @ K.T / sqrt(d_head)
    // 4. Apply causal mask (-INFINITY where col > row)
    // 5. Row-wise Softmax & Matmul with V
}`,
      },
    },
  },
  {
    id: "ai-coding-harness",
    number: "PROJECT 02",
    title: "AI CODING HARNESS",
    category: "DEVELOPER TOOLS · AGENTIC RUNTIME",
    tagline: "Local CLI software-engineering harness inspired by agentic coding workflows.",
    description:
      "A local developer tool inspired by agentic coding workflows, built to experiment with model APIs, tool execution and software-engineering agents. Implements an autonomous agent loop that executes commands, inspects files, and iterates on code within terminal sessions. Provides deterministic tool dispatch with compiler diagnostics and error recovery feedback loops. Compacts and prunes conversation context to prevent prompt overflow during long debugging runs.",
    technicalDetails: [
      "Pluggable provider interface supporting Anthropic Claude 3.5 Sonnet and OpenAI GPT-4o",
      "Deterministic tool calling protocol: bash runner, file read/write, pattern grep, ripgrep inspection",
      "Conversation context compaction and pruning to prevent prompt overflow during long debugging runs",
      "Robust error recovery: feedback loops when shell commands fail or edits do not match file markers",
    ],
    tags: ["TYPESCRIPT", "LLM", "AGENTS", "CLI", "SYSTEMS"],
    githubUrl: "https://github.com/ouroboros1X/claudecode-harnes",
    caseStudyAvailable: true,
    pipeline: {
      title: "AGENTIC WORKFLOW",
      steps: [
        { name: "USER GOAL", desc: "Natural language feature request", badge: "CLI prompt" },
        { name: "WORKSPACE DISCOVERY", desc: "Index tree & active git diffs", badge: "ripgrep" },
        { name: "AGENTIC LOOP", desc: "Prompt assembly & model invocation", badge: "Provider" },
        { name: "TOOL DISPATCH", desc: "Execute bash commands / file edits", badge: "IPC" },
        { name: "OBSERVATION", desc: "Stdout / Stderr / Diff validation", badge: "Feedback" },
        { name: "VERIFIED PATCH", desc: "Run linter/tests & output patch", badge: "Git diff" },
      ],
    },
    metrics: [
      { label: "TOOL SUITE", value: "BASH · FS · GREP" },
      { label: "PROVIDERS", value: "CLAUDE · OPENAI" },
      { label: "RUNTIME", value: "NODE.JS / TYPESCRIPT" },
      { label: "MODE", value: "LOCAL CLI HARNESS" },
    ],
    deepDive: {
      problem:
        "Generic chatbot interfaces fail at real software engineering tasks because they lack deterministic access to system shells, live build feedback, and structured file manipulation with rollbacks.",
      implementation:
        "Engineered an agent loop that runs locally in terminal. Designed strict tool schemas that force the LLM to output discrete invocations. The agent reads compiler diagnostics, runs tests, and iterates until the solution is valid without human intervention.",
      keyTakeaway:
        "Agentic reliability is 80% prompt engineering & tool harness architecture, and 20% raw model capability. Stricter tool boundaries prevent hallucinations.",
      codeSnippet: {
        filename: "agent_loop.ts",
        language: "typescript",
        code: `export async function runAgentStep(state: AgentState): Promise<StepResult> {
  const response = await state.provider.createMessage({
    system: SYSTEM_PROMPT,
    messages: state.history,
    tools: REGISTERED_TOOLS,
  });

  if (response.toolCalls.length > 0) {
    const outputs = await executeTools(response.toolCalls);
    state.history.push({ role: 'tool_output', content: outputs });
    return { shouldContinue: true };
  }
  return { shouldContinue: false, answer: response.text };
}`,
      },
    },
  },
  {
    id: "cex-matching-engine",
    number: "PROJECT 03",
    title: "CEX MATCHING ENGINE & ORDER BOOK",
    category: "DISTRIBUTED SYSTEMS · FINANCIAL INFRASTRUCTURE",
    tagline: "First-principles centralized crypto exchange matching engine and transaction ledger.",
    description:
      "A centralized crypto exchange (CEX) core built from scratch to demystify high-throughput financial infrastructure. Implements an in-memory limit order book matching engine with FIFO price-time priority, double-entry balance locks, atomic trade executions, and real-time order book broadcasts. Decouples fast in-memory execution from asynchronous ledger persistence for auditability and sub-millisecond matching performance.",
    technicalDetails: [
      "In-memory price-level red-black tree / sorted doubly linked list order book for deterministic sub-millisecond matching",
      "Strict price-time priority matching algorithm for both LIMIT and MARKET orders with partial fills",
      "Double-entry bookkeeping preventing fractional balance discrepancies or double-spend race conditions",
      "Event-driven transaction log for state reconstruction and failure recovery",
    ],
    tags: ["TYPESCRIPT", "MATCHING ENGINE", "ORDER BOOK", "POSTGRESQL", "LOW LATENCY"],
    githubUrl: "https://github.com/ouroboros1X/centralized-exchange",
    caseStudyAvailable: true,
    pipeline: {
      title: "MATCHING ARCHITECTURE",
      steps: [
        { name: "ORDER SUBMISSION", desc: "User submits LIMIT/MARKET order", badge: "REST / WS" },
        { name: "BALANCE LOCK", desc: "Atomically reserve user assets", badge: "Ledger check" },
        { name: "IN-MEMORY BOOK", desc: "Insert into sorted bid/ask queue", badge: "Price-Time" },
        { name: "CROSS MATCHING", desc: "Execute trades against opposite side", badge: "FIFO match" },
        { name: "LEDGER COMMIT", desc: "Write trade settlements & update balances", badge: "Postgres / Prisma" },
        { name: "ORDER BOOK STREAM", desc: "Push L2 depth updates to subscribers", badge: "WebSocket" },
      ],
    },
    metrics: [
      { label: "MATCHING ALGO", value: "PRICE-TIME FIFO" },
      { label: "ORDER TYPES", value: "LIMIT · MARKET" },
      { label: "LEDGER DESIGN", value: "DOUBLE-ENTRY" },
      { label: "STATE PERSISTENCE", value: "POSTGRESQL / PRISMA" },
    ],
    deepDive: {
      problem:
        "Building financial exchanges cannot rely on conventional REST CRUD patterns. Any race condition between matching and balance updates destroys integrity.",
      implementation:
        "Decoupled the matching loop from database persistence. The engine maintains all active bids and asks in fast in-memory data structures, matches trades deterministically, and produces an append-only transaction event log for persistence.",
      keyTakeaway:
        "Separation of in-memory matching from asynchronous persistence enables high throughput while guaranteeing strict auditability.",
      codeSnippet: {
        filename: "orderbook.ts",
        language: "typescript",
        code: `// In-memory Price-Time FIFO matching
export class OrderBook {
  private bids: Map<number, Order[]> = new Map();
  private asks: Map<number, Order[]> = new Map();

  public matchLimitOrder(incoming: Order): MatchResult {
    // 1. Traverse opposite book in best-price order
    // 2. Consume liquidity at price levels FIFO
    // 3. Generate Trade executions & deduct remaining quantities
    // 4. Insert leftover unfilled volume into own book
  }
}`,
      },
    },
  },
];
