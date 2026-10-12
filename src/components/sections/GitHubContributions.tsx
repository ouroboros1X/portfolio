"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";
import fallbackSnapshot from "@/data/githubSnapshot.json";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionWeek {
  days: ContributionDay[];
}

interface MonthLabel {
  name: string;
  weekIndex: number;
}

interface GitHubContributionsData {
  username: string;
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  totalDays: number;
  avgPerDay: number;
  avgPerWeek: number;
  createdAt: string;
  from: string;
  to: string;
  weeks: ContributionWeek[];
  months: MonthLabel[];
}

interface GitHubContributionsProps {
  username?: string;
}

// Portfolio-matched cyan intensity palette:
// Level 0: very dark charcoal
// Level 1: muted dark cyan
// Level 2: medium cyan
// Level 3: bright electric cyan
// Level 4: primary electric cyan accent (#00F0FF)
const LEVEL_COLORS = [
  "#161b22", // Level 0: very dark charcoal
  "#004851", // Level 1: muted dark cyan
  "#007d8c", // Level 2: medium cyan
  "#00b8c9", // Level 3: bright electric cyan
  "#00f0ff", // Level 4: primary electric cyan accent
];

export const GitHubContributions: React.FC<GitHubContributionsProps> = ({
  username = "ouroboros1X",
}) => {
  // Use deterministic snapshot for SSR & initial client hydration (eliminates hydration mismatch)
  const [data, setData] = useState<GitHubContributionsData | null>(
    (fallbackSnapshot?.data as GitHubContributionsData) ?? null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hoveredDay, setHoveredDay] = useState<{
    day: ContributionDay;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchContributions() {
      try {
        const res = await fetch(
          `/api/github-contributions?username=${encodeURIComponent(username)}`
        );
        const json = await res.json();
        if (!isMounted) return;

        if (json.ok && json.data) {
          setData(json.data);
          setError(null);
        } else {
          setError((prev) => prev || json.error || "Failed to load GitHub activity");
        }
      } catch (err: unknown) {
        if (!isMounted) return;
        const msg =
          err instanceof Error
            ? err.message
            : "Network error loading GitHub activity";
        setError((prev) => prev || msg);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchContributions();
    return () => {
      isMounted = false;
    };
  }, [username]);

  const profileUrl = siteConfig.github || `https://github.com/${username}`;

  // Helper to format date "YYYY-MM-DD" -> "MMM D, YYYY"
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-").map(Number);
    const date = new Date(Date.UTC(y, m - 1, d));
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  };

  // Format exact account creation date: "25 JUN 2026"
  const formatMemberSince = (isoStr?: string) => {
    if (!isoStr) return "25 JUN 2026";
    const date = new Date(isoStr);
    const day = date.getUTCDate();
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    return `${day} ${month} ${year}`;
  };

  // Format count: e.g. "1.6K contributions" or "745 contributions"
  const formatTotalCount = (total: number) => {
    if (total >= 1000) {
      const kValue = (total / 1000).toFixed(1);
      return `${kValue}K contributions`;
    }
    return `${total} contributions`;
  };

  // SVG coordinate configuration
  // 53 columns total. Grid starts at x = 28, cell = 10.5, gap = 2.2 -> colStep = 12.7
  // Grid starts at y = 18, row = 10.5, gap = 2.2 -> rowStep = 12.7
  const startX = 28;
  const startY = 18;
  const cellSize = 10.5;
  const cellGap = 2.2;
  const step = cellSize + cellGap; // 12.7
  const svgWidth = 710;
  const svgHeight = 110;

  return (
    <div className="space-y-3.5 font-mono">
      {/* 1. Header: Monospace Section Title & GitHub Profile Link */}
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-bold text-[#00F0FF] uppercase tracking-wider flex items-center gap-2.5">
          <span>■ GITHUB CONTRIBUTIONS / LAST 12 MONTHS</span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/40 font-mono font-bold tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
            LIVE SYNC
          </span>
        </div>

        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-white/50 hover:text-[#00F0FF] transition-colors flex items-center gap-1 shrink-0"
          title={`View @${username} on GitHub`}
        >
          <span>@{username}</span>
          <span className="text-[#00F0FF]">↗</span>
        </a>
      </div>

      {/* 2. Loading State */}
      {loading && (
        <div className="py-5 space-y-2.5 animate-pulse select-none">
          <div className="h-7 bg-white/10 w-48" />
          <div className="h-3.5 bg-white/5 w-80" />
          <div className="h-24 bg-[#161b22]/40 w-full mt-3 flex items-center justify-center">
            <span className="text-[11px] text-white/30">
              FETCHING GITHUB CONTRIBUTIONS...
            </span>
          </div>
        </div>
      )}

      {/* 3. Error Fallback (No fake data!) */}
      {!loading && error && (
        <div className="py-5 space-y-2.5">
          <div className="text-xs text-white/70">
            CONTRIBUTION ACTIVITY TEMPORARILY UNAVAILABLE
          </div>
          <p className="text-[11px] text-white/40 font-sans max-w-md">
            GitHub activity could not be loaded at this time. View my full
            verified contribution history directly on GitHub.
          </p>
          <div className="pt-1">
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white text-[#050505] font-bold text-xs hover:bg-[#00F0FF] transition-colors border border-[#050505]"
            >
              <span>VIEW PROFILE ON GITHUB</span>
              <span>→</span>
            </a>
          </div>
        </div>
      )}

      {/* 4. Complete Responsive Heatmap (Zero Horizontal Scrolling) */}
      {!loading && !error && data && (
        <div className="space-y-2.5">
          {/* Contribution Summary & Metadata Row */}
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none">
              {formatTotalCount(data.totalContributions)}
            </div>

            {/* Restrained Metadata Row with Streaks, Average & Account Age */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-white/50 pt-0.5">
              <span>
                CURRENT STREAK:{" "}
                <strong className="text-white/80 font-bold">
                  {data.currentStreak}D
                </strong>
              </span>
              <span className="text-white/20 select-none">·</span>
              <span>
                LONGEST:{" "}
                <strong className="text-white/80 font-bold">
                  {data.longestStreak}D
                </strong>
              </span>
              <span className="text-white/20 select-none">·</span>
              <span>
                AVG / DAY:{" "}
                <strong className="text-white/80 font-bold">
                  {data.avgPerDay.toFixed(1)}
                </strong>
              </span>
              <span className="text-white/20 select-none">·</span>
              <span
                title={`Account created on ${formatDate(data.createdAt)}`}
                className="cursor-help"
              >
                GITHUB MEMBER SINCE{" "}
                <strong className="text-white/80 font-bold">
                  {formatMemberSince(data.createdAt)}
                </strong>
              </span>
            </div>
          </div>

          {/* Responsive SVG Grid: Fits container perfectly without horizontal scrollbar */}
          <div className="w-full pt-1">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-auto block select-none overflow-visible"
              preserveAspectRatio="xMinYMin meet"
              aria-label="GitHub contribution calendar"
            >
              {/* Month Labels across the top */}
              {data.months.map((m, idx) => {
                const xPos = startX + m.weekIndex * step;
                return (
                  <text
                    key={`${m.name}-${idx}`}
                    x={xPos}
                    y={10}
                    fill="#9ca3af"
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="600"
                    className="uppercase tracking-wider select-none"
                  >
                    {m.name}
                  </text>
                );
              })}

              {/* Weekday Labels on the left (Mon, Wed, Fri aligned with rows 1, 3, 5) */}
              <text
                x={0}
                y={startY + 1 * step + 8.5}
                fill="#6b7280"
                fontSize="8"
                fontFamily="monospace"
                className="select-none"
              >
                Mon
              </text>
              <text
                x={0}
                y={startY + 3 * step + 8.5}
                fill="#6b7280"
                fontSize="8"
                fontFamily="monospace"
                className="select-none"
              >
                Wed
              </text>
              <text
                x={0}
                y={startY + 5 * step + 8.5}
                fill="#6b7280"
                fontSize="8"
                fontFamily="monospace"
                className="select-none"
              >
                Fri
              </text>

              {/* 53 Columns of Weeks × 7 Days */}
              {data.weeks.map((week, wIdx) => {
                const colX = startX + wIdx * step;
                return (
                  <g key={`week-${wIdx}`}>
                    {week.days.map((day, dIdx) => {
                      const rowY = startY + dIdx * step;
                      const fillColor =
                        LEVEL_COLORS[day.level] || LEVEL_COLORS[0];
                      const isHovered = hoveredDay?.day.date === day.date;

                      return (
                        <rect
                          key={day.date}
                          x={colX}
                          y={rowY}
                          width={cellSize}
                          height={cellSize}
                          rx={1}
                          fill={fillColor}
                          stroke={isHovered ? "#00F0FF" : "transparent"}
                          strokeWidth={isHovered ? 1.5 : 0}
                          tabIndex={0}
                          role="gridcell"
                          aria-label={`${day.count} contributions on ${formatDate(
                            day.date
                          )}`}
                          className="cursor-pointer transition-colors duration-100 hover:outline-none"
                          onMouseEnter={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setHoveredDay({
                              day,
                              x: rect.left + rect.width / 2,
                              y: rect.top,
                            });
                          }}
                          onMouseLeave={() => setHoveredDay(null)}
                          onFocus={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setHoveredDay({
                              day,
                              x: rect.left + rect.width / 2,
                              y: rect.top,
                            });
                          }}
                          onBlur={() => setHoveredDay(null)}
                        />
                      );
                    })}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Minimal Bottom Legend & Date Range */}
          <div className="flex items-center justify-between text-[10px] text-white/40 pt-1">
            <div className="hidden sm:flex items-center gap-2 text-[10px]">
              <span className="text-white/50">
                {formatDate(data.from)} — {formatDate(data.to)}
              </span>
              <span className="text-white/20 select-none">·</span>
              <span className="text-[#00F0FF]/80 font-bold tracking-wide">
                AUTOMATIC DAILY SYNC
              </span>
            </div>

            <div className="flex items-center gap-1.5 ml-auto">
              <span>Less</span>
              <div className="flex gap-[2.5px] items-center">
                {LEVEL_COLORS.map((color, idx) => (
                  <span
                    key={`legend-${idx}`}
                    className="w-[9px] h-[9px] rounded-xs"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>


        </div>
      )}

      {/* Floating Interactive Tooltip */}
      {hoveredDay && (
        <div
          className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full px-2.5 py-1.5 bg-[#050505] text-white border border-[#00F0FF] shadow-[2px_2px_0_#00F0FF] text-[10px] font-mono whitespace-nowrap mb-1.5"
          style={{
            left: `${hoveredDay.x}px`,
            top: `${hoveredDay.y - 4}px`,
          }}
        >
          <div className="font-bold text-[#00F0FF]">
            {hoveredDay.day.count === 0
              ? "No contributions"
              : `${hoveredDay.day.count} ${
                  hoveredDay.day.count === 1 ? "contribution" : "contributions"
                }`}
          </div>
          <div className="text-white/60 text-[9px]">
            {formatDate(hoveredDay.day.date)}
          </div>
        </div>
      )}
    </div>
  );
};
