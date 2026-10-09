export interface PhilosophyPrinciple {
  number: string;
  title: string;
  coreStatement: string;
  elaboration: string;
}

export const philosophyPrinciples: PhilosophyPrinciple[] = [
  {
    number: "01",
    title: "UNDERSTAND THE SYSTEM",
    coreStatement: "Don't just make it work. Understand why it works.",
    elaboration:
      "Abstractions are convenient until they leak. Peeling back high-level libraries to see memory buffers, network packets, and CPU instructions builds true engineering intuition.",
  },
  {
    number: "02",
    title: "BUILD BEFORE OVERENGINEERING",
    coreStatement: "Start small. Measure. Then make it better.",
    elaboration:
      "Avoid solving problems you do not have yet. Write working code, profile the hot paths under realistic workloads, and optimize with empirical benchmark data.",
  },
  {
    number: "03",
    title: "PERFORMANCE IS A FEATURE",
    coreStatement: "Latency, memory, cost and reliability matter.",
    elaboration:
      "Speed is not an afterthought. Thoughtful data structures, cache-conscious memory layouts, and low overhead translate directly into user responsiveness and lower cloud costs.",
  },
  {
    number: "04",
    title: "SHIP THE THING",
    coreStatement: "A finished imperfect system teaches more than an unfinished perfect architecture.",
    elaboration:
      "Architectures drawn in diagrams prove nothing until bytes execute on real silicon. Build the prototype, run the tests, deploy it, break it, and iterate in public.",
  },
];
