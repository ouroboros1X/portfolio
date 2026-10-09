"use client";

import React, { useState } from "react";
import {
  activeTracks,
  explorationAreas,
  openToOpportunities,
} from "@/data/currentlyBuilding";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BrutalCard } from "@/components/ui/BrutalCard";
import { TechBadge } from "@/components/ui/TechBadge";

export const CurrentlyBuilding: React.FC = () => {
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<
    { command: string; output: string }[]
  >([
    {
      command: "uname -a",
      output: "Linux vinayak-system 6.8.0-x86_64 #1 SMP PREEMPT GNU/Linux",
    },
    {
      command: "cat sprint_status.txt",
      output:
        "All active sprints operational. Focusing on AI agents, on-device inference & C++ kernels.",
    },
  ]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let output = "";
    if (cmd === "help") {
      output = "Available commands: status, projects, stack, open, contact, clear";
    } else if (cmd === "status") {
      output = "STATUS: BUILDING · Active on 3 technical initiatives.";
    } else if (cmd === "projects") {
      output =
        "1. AI Coding Harness (85%)\n2. On-Device Chromium LLM (70%)\n3. GPT-2 Inference Engine (95%)";
    } else if (cmd === "stack") {
      output = "C++17, TypeScript, Go, Python, Docker, Kubernetes, Linux";
    } else if (cmd === "open") {
      output = "OPEN TO: Software roles, internships, and open-source systems collaborations.";
    } else if (cmd === "contact") {
      output = "Email: vinayak.supreme1@gmail.com | GitHub: github.com/ouroboros1X";
    } else if (cmd === "clear") {
      setTerminalHistory([]);
      setTerminalInput("");
      return;
    } else {
      output = `command not found: ${cmd}. Type 'help' for available commands.`;
    }

    setTerminalHistory((prev) => [...prev, { command: terminalInput, output }]);
    setTerminalInput("");
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
            Live sprint telemetry. Qualitative status indicators reflecting active exploration and systems engineering.
          </p>
        </div>

        {/* Terminal Container */}
        <BrutalCard
          borderWidth={2}
          shadow="lg"
          className="bg-[#050505] text-[#F5F5F0] overflow-hidden"
        >
          {/* Terminal Window Header Bar */}
          <div className="bg-[#151515] border-b-2 border-white/20 px-4 py-3 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#FF5F56] border border-black inline-block" />
              <span className="w-3 h-3 bg-[#FFBD2E] border border-black inline-block" />
              <span className="w-3 h-3 bg-[#27C93F] border border-black inline-block" />
              <span className="ml-3 text-white/70 font-semibold hidden sm:inline-block">
                vinayak@system: ~/active-sprints (bash)
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#00F0FF]">
              <span className="w-2 h-2 bg-[#00F0FF] animate-pulse" />
              <span>LIVE TERMINAL FEED</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-10">
            {/* 1. Active Projects Grid */}
            <div>
              <div className="font-mono text-xs font-bold text-[#00F0FF] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>■ CURRENT PROJECT</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
                {activeTracks.map((track) => (
                  <div
                    key={track.id}
                    className="p-5 bg-[#121212] border-2 border-white/15 hover:border-[#00F0FF] transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[10px] text-white/50 uppercase tracking-wider mb-1">
                        {track.phase}
                      </div>
                      <div className="text-sm font-bold text-white mb-3">
                        {track.title}
                      </div>

                      {/* Progress Bar Display */}
                      <div className="p-2.5 bg-black border border-white/20 mb-3">
                        <div className="text-[10px] text-white/60 mb-1 flex justify-between">
                          <span>QUALITATIVE STATUS:</span>
                          <span className="text-[#00F0FF] font-bold">
                            {track.percentageText}
                          </span>
                        </div>
                        <div className="text-xs text-[#00F0FF] font-bold tracking-widest break-all">
                          {track.statusVisual}
                        </div>
                      </div>

                      <p className="text-xs text-white/75 font-sans leading-relaxed mb-4">
                        {track.focus}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                      {track.tags.map((t) => (
                        <TechBadge key={t} label={t} variant="ghost" className="text-white/80 border-white/20" />
                      ))}
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
                  <span>■ EXPLORING</span>
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
                  <span>■ OPEN TO</span>
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

            {/* 3. Interactive Shell Input */}
            <div className="border-t border-white/20 pt-6 font-mono text-xs">
              <div className="text-[11px] text-white/50 mb-3">
                INTERACTIVE CONSOLE (Type &apos;help&apos;, &apos;projects&apos;, &apos;status&apos;, &apos;stack&apos;, &apos;contact&apos;, &apos;clear&apos;)
              </div>

              {/* Terminal Logs */}
              <div className="space-y-2 max-h-48 overflow-y-auto mb-3 font-mono text-xs">
                {terminalHistory.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center gap-2 text-[#00F0FF]">
                      <span>vinayak@system:~$</span>
                      <span className="text-white">{item.command}</span>
                    </div>
                    <div className="text-white/75 whitespace-pre-line pl-4">
                      {item.output}
                    </div>
                  </div>
                ))}
              </div>

              {/* Terminal Input Form */}
              <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2">
                <span className="text-[#00F0FF] font-bold">vinayak@system:~$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="type a command..."
                  className="flex-1 bg-transparent text-white outline-none border-b border-white/30 focus:border-[#00F0FF] font-mono text-xs py-1"
                  autoComplete="off"
                  spellCheck="false"
                  id="terminal-cli-input"
                />
              </form>
            </div>
          </div>
        </BrutalCard>
      </div>
    </section>
  );
};
