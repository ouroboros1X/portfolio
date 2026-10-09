export interface SystemLayer {
  id: string;
  index: string;
  name: string;
  scope: string;
  description: string;
  technologies: string[];
  keyInspection: string;
}

export const systemLayers: SystemLayer[] = [
  {
    id: "layer-code",
    index: "01",
    name: "CODE",
    scope: "SOURCE & SYNTAX",
    description:
      "Strictly typed, idiomatic code in C++, TypeScript, Go, and Python. Designing explicit contracts, modular abstractions, and zero-redundancy interfaces.",
    technologies: ["C++17", "TypeScript", "Go", "Python"],
    keyInspection: "Clean static typing · Deterministic behavior · Explicit error handling",
  },
  {
    id: "layer-runtime",
    index: "02",
    name: "RUNTIME",
    scope: "EXECUTION ENGINE",
    description:
      "Understanding compilation targets, CPU execution loops, V8 JIT & libuv event loop in Node, and bare-metal native binaries without GC pauses.",
    technologies: ["LLVM / Clang", "V8 / Node.js", "Go Runtime", "Python C-Extensions"],
    keyInspection: "Event loop queuing · Instruction pipelines · Goroutine scheduler",
  },
  {
    id: "layer-memory",
    index: "03",
    name: "MEMORY",
    scope: "ALLOCATION & CACHE",
    description:
      "Managing contiguous float buffers in C++, avoiding heap fragmentation, leveraging CPU L1/L2 cache locality, and designing circular ring buffers.",
    technologies: ["Stack vs Heap", "Cache Locality", "Flat Float Buffers", "Memory Alignment"],
    keyInspection: "Zero runtime allocations in hot loops · Memory footprint minimization",
  },
  {
    id: "layer-network",
    index: "04",
    name: "NETWORK",
    scope: "PROTOCOLS & STREAMS",
    description:
      "Full-duplex WebSocket frames, low-latency UDP ingestion, HTTP/2 streaming, and serialization formats for high-frequency data pipelines.",
    technologies: ["WebSockets (ws)", "TCP / UDP", "HTTP/2", "REST", "JSON / Binary Protocol"],
    keyInspection: "Sub-millisecond packet broadcasting · Reconnection backoff · Socket pooling",
  },
  {
    id: "layer-services",
    index: "05",
    name: "SERVICES",
    scope: "APPLICATION LOGIC",
    description:
      "Building resilient APIs, background worker queues, in-memory matching engines, and double-entry ledger state persistence.",
    technologies: ["Express", "FastAPI", "Prisma ORM", "PostgreSQL", "Redis"],
    keyInspection: "Transactional integrity · In-memory state consistency · Microservices",
  },
  {
    id: "layer-infrastructure",
    index: "06",
    name: "INFRASTRUCTURE",
    scope: "SYSTEMS & LINUX",
    description:
      "Operating deep inside Linux. Using cgroups, namespaces, Docker containerization, Kubernetes orchestration, and declarative Terraform IaC.",
    technologies: ["Linux (Ubuntu/Arch)", "Docker", "Kubernetes (EKS)", "Terraform", "ArgoCD"],
    keyInspection: "cgroups resource limits · Cluster orchestration · GitOps continuous delivery",
  },
  {
    id: "layer-production",
    index: "07",
    name: "PRODUCTION",
    scope: "OBSERVABILITY & RELIABILITY",
    description:
      "Telemetry metrics, Prometheus scrapers, Grafana visual dashboards, real-world availability, and predictable system degradation.",
    technologies: ["Prometheus", "Grafana", "CloudWatch", "GitHub Actions CI/CD", "AWS / GCP"],
    keyInspection: "SLOs & SLAs · Latency percentiles (p95/p99) · Automated health checks",
  },
];
