"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  activeTracks,
  explorationAreas,
  openToOpportunities,
} from "@/data/currentlyBuilding";
import { siteConfig } from "@/data/siteConfig";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BrutalCard } from "@/components/ui/BrutalCard";
import { TechBadge } from "@/components/ui/TechBadge";

interface HistoryEntry {
  command: string;
  output: string;
}

export const CurrentlyBuilding: React.FC = () => {
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<HistoryEntry[]>([
    {
      command: "welcome",
      output:
        "Antigravity Terminal v1.0 [Browser Client Simulator]\nType 'help' to inspect available commands.",
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);

  const terminalLogsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll terminal log to bottom on new output
  useEffect(() => {
    if (terminalLogsRef.current) {
      terminalLogsRef.current.scrollTop = terminalLogsRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const dispatchCommand = (rawCmd: string): string => {
    const cmd = rawCmd.trim().toLowerCase();

    switch (cmd) {
      case "help":
        return [
          "SUPPORTED COMMANDS:",
          "  about      — Concise background & professional positioning",
          "  projects   — Verified portfolio projects & current status",
          "  stack      — Technologies categorised by actual usage",
          "  currently  — Active building tracks & engineering focus",
          "  contact    — Verified contact information and links",
          "  whoami     — Professional identity",
          "  uname -a   — Environment diagnostics",
          "  clear      — Reset the terminal display",
        ].join("\n");

      case "about":
        return [
          `${siteConfig.fullName} — Software Engineer based in ${siteConfig.location}.`,
          "PRIMARY FOCUS: Full-stack web development, SaaS products, and building useful software.",
          "ENGINEERING INTERESTS: Understanding AI & LLMs from the fundamentals, C++ systems, and backend platforms.",
        ].join("\n");

      case "projects":
        return [
          "PORTFOLIO PROJECTS:",
          "  1. GPT-2 INFERENCE ENGINE",
          "     - Transformer forward pass in pure C++17 (no PyTorch/ONNX).",
          "     - Status: COMPLETED / FUNCTIONAL PROTOTYPE",
          "  2. AI CODING HARNESS",
          "     - Developer CLI exploring agentic loops, tool calling & sandbox IPC.",
          "     - Status: BUILDING / ACTIVE WORK",
          "  3. F1 TELEMETRY / DATA PLATFORM",
          "     - OpenF1 ingestion, WebSocket streaming & HTML5 2D Canvas rendering.",
          "     - Status: PERSONAL EXPERIMENT / WORKING PROTOTYPE",
          "  4. CEX MATCHING ENGINE & ORDER BOOK",
          "     - In-memory price-time FIFO matching engine with double-entry ledger.",
          "     - Status: COMPLETED / REPOSITORY VERIFIED",
        ].join("\n");

      case "stack":
        return [
          "TECHNOLOGY STACK:",
          "  [FRONTEND]       TypeScript, React, Next.js, HTML5, CSS3, Tailwind CSS",
          "  [BACKEND & APIS] Node.js, Express, REST APIs, WebSockets, Python, Go",
          "  [DATABASES]      PostgreSQL, Prisma ORM, Redis, SQL",
          "  [AI & SYSTEMS]   C++17, Transformer Inference, Agent Loops, WebGPU (Exploring)",
          "  [DEVOPS & INFRA] Linux, Docker, Git & GitHub, AWS, CI/CD, Prometheus basics",
        ].join("\n");

      case "currently":
        return [
          "ACTIVE WORK & LEARNING TRACKS:",
          "  ■ AI Coding Harness: Multi-step tool dispatch, context eviction & git diff patching",
          "  ■ Chromium LLM: Local on-device inference experiments inside browser contexts",
          "  ■ Web & SaaS: Building full-stack web products with real-time architectures",
        ].join("\n");

      case "contact":
        return [
          "VERIFIED CONTACT LINKS:",
          `  Email:    ${siteConfig.email}`,
          `  GitHub:   ${siteConfig.github}`,
          `  LinkedIn: ${siteConfig.linkedin}`,
          `  Resume:   ${siteConfig.resumeUrl}`,
        ].join("\n");

      case "whoami":
        return `${siteConfig.fullName.toLowerCase()} — Full-Stack & SaaS Engineer exploring AI from first principles.`;

      case "uname -a":
        return "Simulated Web Terminal (React 19 / Client-Side Environment) — No remote shell execution.";

      case "welcome":
        return "Antigravity Terminal v1.0 [Browser Client Simulator]\nType 'help' to inspect available commands.";

      default:
        return `Command not found: '${rawCmd}'. Type 'help' to see available commands.`;
    }
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = terminalInput.trim();

    if (!trimmed) {
      // Empty input: just advance prompt cleanly
      setTerminalHistory((prev) => [...prev, { command: "", output: "" }]);
      setTerminalInput("");
      return;
    }

    if (trimmed.toLowerCase() === "clear") {
      setTerminalHistory([]);
      setTerminalInput("");
      setCommandHistory((prev) => [...prev, trimmed]);
      setHistoryPointer(-1);
      return;
    }

    const output = dispatchCommand(trimmed);

    setTerminalHistory((prev) => [...prev, { command: trimmed, output }]);
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryPointer(-1);
    setTerminalInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (commandHistory.length === 0) return;

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const nextPointer =
        historyPointer === -1
          ? commandHistory.length - 1
          : Math.max(0, historyPointer - 1);
      setHistoryPointer(nextPointer);
      setTerminalInput(commandHistory[nextPointer] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyPointer === -1) return;
      const nextPointer = historyPointer + 1;
      if (nextPointer >= commandHistory.length) {
        setHistoryPointer(-1);
        setTerminalInput("");
      } else {
        setHistoryPointer(nextPointer);
        setTerminalInput(commandHistory[nextPointer] || "");
      }
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "BUILDING":
        return "bg-[#00F0FF] text-[#050505] border-[#050505]";
      case "COMPLETED":
        return "bg-white text-[#050505] border-[#050505]";
      case "EXPERIMENTING":
      default:
        return "bg-[#151515] text-[#00F0FF] border-[#00F0FF]/40";
    }
  };

  return (
    <section id="building" className="py-20 sm:py-28 border-b border-[#050505]">
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20">
          <SectionLabel label="CURRENTLY BUILDING" />
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#050505] mt-3">
            WHAT I&apos;M WORKING ON NOW.
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#050505]/70 mt-2 max-w-xl">
            Active projects, ongoing experiments, and engineering initiatives currently in progress.
          </p>
        </div>

        {/* Terminal Container */}
        <BrutalCard
          bg="dark"
          borderWidth={2}
          shadow="lg"
          className="overflow-hidden"
        >
          {/* Terminal Window Header Bar */}
          <div className="bg-[#151515] border-b-2 border-white/20 px-4 py-3 flex items-center justify-between font-mono text-xs select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#FF5F56] border border-black inline-block" />
              <span className="w-3 h-3 bg-[#FFBD2E] border border-black inline-block" />
              <span className="w-3 h-3 bg-[#27C93F] border border-black inline-block" />
              <span className="ml-3 text-white/70 font-semibold hidden sm:inline-block">
                vinayak@browser: ~/active-initiatives (simulated)
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#00F0FF]">
              <span className="w-2 h-2 bg-[#00F0FF] animate-pulse" />
              <span>INTERACTIVE TERMINAL</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-10">
            {/* 1. Active Projects Grid — Transparent Status, No Fake Percentages */}
            <div>
              <div className="font-mono text-xs font-bold text-[#00F0FF] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>■ CURRENT INITIATIVES & STATUS</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
                {activeTracks.map((track) => (
                  <div
                    key={track.id}
                    className="p-5 bg-[#121212] border-2 border-white/15 hover:border-[#00F0FF] transition-colors flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Status & Category */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] text-white/50 uppercase tracking-wider truncate">
                          {track.category}
                        </span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 border ${getStatusBadgeVariant(
                            track.status
                          )} shrink-0`}
                        >
                          {track.statusBadge}
                        </span>
                      </div>

                      {/* Project Title */}
                      <div className="text-sm font-bold text-white mb-3">
                        {track.title}
                      </div>

                      {/* Description */}
                      <p className="text-xs text-white/75 font-sans leading-relaxed mb-4">
                        {track.description}
                      </p>
                    </div>

                    <div>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10 mb-3">
                        {track.technologies.map((t) => (
                          <TechBadge
                            key={t}
                            label={t}
                            variant="ghost"
                            className="text-white/80 border-white/20"
                          />
                        ))}
                      </div>

                      {/* Link Action */}
                      {track.linkUrl && (
                        <a
                          href={track.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#00F0FF] hover:underline"
                        >
                          {track.linkText || "VIEW PROJECT →"}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Exploring & Open To Columns */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-white/20 pt-8 font-mono">
              {/* Exploring */}
              <div className="md:col-span-6 space-y-4">
                <div className="text-xs font-bold text-[#00F0FF] uppercase tracking-wider flex items-center gap-2">
                  <span>■ EXPLORATION & LEARNING FOCUS</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {explorationAreas.map((area) => (
                    <div
                      key={area}
                      className="p-2.5 bg-[#121212] border border-white/10 flex items-center gap-2 text-white/90"
                    >
                      <span className="text-[#00F0FF] font-bold">▹</span>
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Open To */}
              <div className="md:col-span-6 space-y-4">
                <div className="text-xs font-bold text-[#00F0FF] uppercase tracking-wider flex items-center gap-2">
                  <span>■ OPEN TO OPPORTUNITIES</span>
                </div>
                <div className="space-y-2 text-xs">
                  {openToOpportunities.map((op) => (
                    <div
                      key={op.title}
                      className="p-3 bg-[#121212] border border-white/10"
                    >
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <span className="text-[#00F0FF]">●</span>
                        <span>{op.title}</span>
                      </div>
                      <div className="text-[11px] text-white/70 font-sans mt-0.5">
                        {op.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Interactive Shell Input — Functional Simulator with Arrow History */}
            <div
              className="border-t border-white/20 pt-6 font-mono text-xs cursor-text"
              onClick={() => inputRef.current?.focus()}
            >
              <div className="flex items-center justify-between text-[11px] text-white/50 mb-3">
                <span>
                  INTERACTIVE CONSOLE (Type &apos;help&apos;, &apos;about&apos;, &apos;projects&apos;, &apos;stack&apos;, &apos;currently&apos;, &apos;contact&apos;, &apos;whoami&apos;, &apos;clear&apos;)
                </span>
                <span className="hidden sm:inline-block text-[#00F0FF]/80">
                  ↑ / ↓ FOR HISTORY
                </span>
              </div>

              {/* Terminal Logs */}
              <div
                ref={terminalLogsRef}
                className="space-y-2 max-h-56 overflow-y-auto mb-3 font-mono text-xs pr-1"
                tabIndex={0}
                aria-label="Terminal output log"
              >
                {terminalHistory.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    {item.command && (
                      <div className="flex items-center gap-2 text-[#00F0FF]">
                        <span>vinayak@portfolio:~$</span>
                        <span className="text-white font-semibold">{item.command}</span>
                      </div>
                    )}
                    {item.output && (
                      <div className="text-white/80 whitespace-pre-line pl-4 font-mono text-[11px] sm:text-xs leading-relaxed">
                        {item.output}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Terminal Input Form */}
              <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 pt-1">
                <span className="text-[#00F0FF] font-bold shrink-0">
                  vinayak@portfolio:~$
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="type command (e.g. 'help')..."
                  className="flex-1 bg-transparent text-white outline-none border-b border-white/30 focus:border-[#00F0FF] font-mono text-xs py-1"
                  autoComplete="off"
                  spellCheck="false"
                  id="terminal-cli-input"
                  aria-label="Terminal command input"
                />
              </form>
            </div>
          </div>
        </BrutalCard>
      </div>
    </section>
  );
};
