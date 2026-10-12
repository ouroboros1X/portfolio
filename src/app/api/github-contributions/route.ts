import { NextResponse } from "next/server";
import fallbackSnapshot from "@/data/githubSnapshot.json";

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export interface MonthLabel {
  name: string;
  weekIndex: number;
}

export interface GitHubContributionsData {
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

// In-memory cache for live responses (15-minute TTL to keep data fresh throughout the day)
const CACHE_TTL_MS = 15 * 60 * 1000;
const memoryCache = new Map<
  string,
  { timestamp: number; data: GitHubContributionsData }
>();

function parseContributionsHtml(
  html: string,
  username: string
): GitHubContributionsData {
  const totalMatch = html.match(/([\d,]+)\s+contributions\s+in the last year/i);
  const totalContributions = totalMatch
    ? parseInt(totalMatch[1].replace(/,/g, ""), 10)
    : 0;

  const tooltipMap = new Map<string, string>();
  for (const match of html.matchAll(
    /<tool-tip[^>]*for="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/g
  )) {
    tooltipMap.set(match[1], match[2].trim());
  }

  const cellRegex =
    /<td\b([^>]*\bclass="[^"]*ContributionCalendar-day[^"]*"[^>]*)>/g;
  const days: ContributionDay[] = [];
  for (const m of html.matchAll(cellRegex)) {
    const attrs = m[1];
    const date = (attrs.match(/data-date="([^"]+)"/) || [])[1];
    const level = parseInt(
      (attrs.match(/data-level="([^"]+)"/) || [])[1] || "0",
      10
    );
    const id = (attrs.match(/id="([^"]+)"/) || [])[1];
    const tip = tooltipMap.get(id) || "";
    let count = 0;
    const countMatch = tip.match(/^(\d+)\s+contribution/i);
    if (countMatch) count = parseInt(countMatch[1], 10);
    if (date) {
      days.push({ date, level, count });
    }
  }

  days.sort((a, b) => a.date.localeCompare(b.date));

  // Streaks calculation
  let longestStreak = 0;
  let tempStreak = 0;
  for (const d of days) {
    if (d.count > 0) {
      tempStreak++;
      if (tempStreak > longestStreak) longestStreak = tempStreak;
    } else {
      tempStreak = 0;
    }
  }

  let currentStreak = 0;
  let startIndex = days.length - 1;
  if (days[startIndex]?.count === 0 && (days[startIndex - 1]?.count ?? 0) > 0) {
    startIndex--;
  }
  for (let i = startIndex; i >= 0; i--) {
    if (days[i].count > 0) {
      currentStreak++;
    } else {
      break;
    }
  }

  const weeks: ContributionWeek[] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push({ days: days.slice(i, i + 7) });
  }

  const months: MonthLabel[] = [];
  const theadMatch = html.match(/<thead>([\s\S]*?)<\/thead>/);
  if (theadMatch) {
    let colIndex = 0;
    for (const m of theadMatch[1].matchAll(
      /<td[^>]*class="ContributionCalendar-label"[^>]*colspan="(\d+)"[^>]*>[\s\S]*?<span aria-hidden="true"[^>]*>([^<]+)<\/span>/g
    )) {
      const colspan = parseInt(m[1], 10);
      const name = m[2].trim();
      months.push({ name, weekIndex: colIndex });
      colIndex += colspan;
    }
  }

  const from = days[0]?.date || "";
  const to = days[days.length - 1]?.date || "";
  const totalDays = days.length;
  const avgPerDay =
    totalDays > 0 ? Number((totalContributions / totalDays).toFixed(1)) : 0;
  const avgPerWeek =
    weeks.length > 0 ? Number((totalContributions / weeks.length).toFixed(1)) : 0;

  const createdAt = "2026-06-25T14:16:37Z";

  return {
    username,
    totalContributions,
    currentStreak,
    longestStreak,
    totalDays,
    avgPerDay,
    avgPerWeek,
    createdAt,
    from,
    to,
    weeks,
    months,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = (searchParams.get("username") || "ouroboros1X").toLowerCase();

  // 1. Check if warm in-memory cache is valid (< 15 mins)
  const cached = memoryCache.get(username);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return NextResponse.json(
      { ok: true, data: cached.data, live: true, cached: true },
      {
        headers: {
          "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
        },
      }
    );
  }

  // 2. Fetch fresh live contributions from GitHub
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8500);

    const res = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)",
        Accept: "text/html,application/xhtml+xml",
      },
      cache: "no-store",
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId));

    if (!res.ok) {
      throw new Error(`GitHub responded with status ${res.status}`);
    }

    const html = await res.text();
    const liveData = parseContributionsHtml(html, username);

    // Save to memory cache
    memoryCache.set(username, { timestamp: Date.now(), data: liveData });

    return NextResponse.json(
      { ok: true, data: liveData, live: true },
      {
        headers: {
          "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
        },
      }
    );
  } catch (err: unknown) {
    // If live fetch failed (e.g. timeout or rate-limit), fallback gracefully
    if (cached) {
      return NextResponse.json(
        { ok: true, data: cached.data, stale: true },
        {
          headers: {
            "Cache-Control": "public, s-maxage=300",
          },
        }
      );
    }

    if (username === "ouroboros1x" && fallbackSnapshot?.data) {
      return NextResponse.json(
        {
          ok: true,
          data: fallbackSnapshot.data as GitHubContributionsData,
          fallback: true,
        },
        {
          headers: {
            "Cache-Control": "public, s-maxage=300",
          },
        }
      );
    }

    const message =
      err instanceof Error ? err.message : "Failed to fetch GitHub activity";
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
