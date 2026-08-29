import { practiceListeningCatalog } from "./practiceListeningCatalog";
import { practiceReadingCatalog } from "./practiceReadingCatalog";
import { practiceSpeakingCatalog } from "./practiceSpeakingCatalog";
import { practiceWritingCatalog } from "./practiceWritingCatalog";

const STATS_KEY = "ielts-practice-stats-v1";

export type SkillKind =
  | "matching-headings"
  | "tfng"
  | "sentence-endings"
  | "sentence-completion"
  | "matching-information"
  | "summary-completion"
  | "table-completion"
  | "short-answers"
  | "map-labelling"
  | "matching-letters"
  | "multiple-choice"
  | "multiple-matching"
  | "flow-chart"
  | "task-1-graph"
  | "task-1-process"
  | "task-2-essay"
  | "other";

export interface PracticeTaskResult {
  key: string;
  label: string;
  kind: SkillKind;
  score: number;
  total: number;
}

export interface PracticeAttempt {
  id: string;
  testId: string;
  testTitle: string;
  at: number;
  tasks: PracticeTaskResult[];
  score: number;
  total: number;
}

export interface PracticeStatsStore {
  attempts: PracticeAttempt[];
}

function emptyStore(): PracticeStatsStore {
  return { attempts: [] };
}

export function loadPracticeStats(): PracticeStatsStore {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return emptyStore();
    const parsed = JSON.parse(raw) as PracticeStatsStore;
    if (!Array.isArray(parsed.attempts)) return emptyStore();
    return parsed;
  } catch {
    return emptyStore();
  }
}

export function savePracticeAttempt(
  attempt: Omit<PracticeAttempt, "id" | "at"> & { at?: number },
): PracticeAttempt {
  const store = loadPracticeStats();
  const full: PracticeAttempt = {
    ...attempt,
    id: `att-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    at: attempt.at ?? Date.now(),
  };
  store.attempts.unshift(full);
  store.attempts = store.attempts.slice(0, 50);
  localStorage.setItem(STATS_KEY, JSON.stringify(store));
  return full;
}

export function inferSkillKind(label: string): SkillKind {
  const lower = label.toLowerCase();
  if (lower.includes("matching information")) {
    return "matching-information";
  }
  if (lower.includes("summary")) {
    return "summary-completion";
  }
  if (lower.includes("sentence ending") || lower.includes("endings")) {
    return "sentence-endings";
  }
  if (lower.includes("map")) {
    return "map-labelling";
  }
  if (lower.includes("multiple choice") || lower.includes("multiple-choice")) {
    return "multiple-choice";
  }
  if (lower.includes("multiple matching") || lower.includes("multiple-matching")) {
    return "multiple-matching";
  }
  if (lower.includes("flow")) {
    return "flow-chart";
  }
  if (lower.includes("process")) {
    return "task-1-process";
  }
  if (lower.includes("task 2") || lower.includes("essay")) {
    return "task-2-essay";
  }
  if (lower.includes("task 1") || lower.includes("graph")) {
    return "task-1-graph";
  }
  if (lower.includes("matching") && !lower.includes("heading") && !lower.includes("information") && !lower.includes("ending")) {
    return "matching-letters";
  }
  if (lower.includes("table")) {
    return "table-completion";
  }
  if (lower.includes("short answer")) {
    return "short-answers";
  }
  if (lower.includes("sentence completion") || lower.includes("completion")) {
    return "sentence-completion";
  }
  if (lower.includes("matching") || lower.includes("heading")) {
    return "matching-headings";
  }
  if (
    lower.includes("true") ||
    lower.includes("false") ||
    lower.includes("not given") ||
    lower.includes("tfng")
  ) {
    return "tfng";
  }
  return "other";
}

export interface SkillAggregate {
  kind: SkillKind;
  label: string;
  score: number;
  total: number;
  pct: number;
  attempts: number;
}

export interface SmartPracticeStats {
  attempts: PracticeAttempt[];
  testsReady: number;
  testsTouched: number;
  progressPct: number;
  overallScore: number;
  overallTotal: number;
  overallPct: number;
  bestAttempt: PracticeAttempt | null;
  latestAttempt: PracticeAttempt | null;
  skills: SkillAggregate[];
  trend: "up" | "down" | "flat" | "none";
  trendDelta: number;
  insight: string;
}

const SKILL_LABELS: Record<SkillKind, string> = {
  "matching-headings": "Matching headings",
  tfng: "True / False / Not given",
  "sentence-endings": "Matching sentence endings",
  "sentence-completion": "Sentence completion",
  "matching-information": "Matching information",
  "summary-completion": "Summary completion",
  "table-completion": "Table completion",
  "short-answers": "Short answers",
  "map-labelling": "Map labelling",
  "matching-letters": "Matching (listening)",
  "multiple-choice": "Multiple choice",
  "multiple-matching": "Multiple matching",
  "flow-chart": "Flow chart",
  "task-1-graph": "Writing Task 1 · Graph",
  "task-1-process": "Writing Task 1 · Process",
  "task-2-essay": "Writing Task 2 · Essay",
  other: "Other",
};

export function computeSmartStats(
  store: PracticeStatsStore = loadPracticeStats(),
): SmartPracticeStats {
  const attempts = store.attempts;
  const testsReady =
    practiceReadingCatalog.filter((t) => t.ready).length +
    practiceListeningCatalog.filter((t) => t.ready).length +
    practiceWritingCatalog.filter((t) => t.ready).length +
    practiceSpeakingCatalog.filter((t) => t.ready).length;
  const touched = new Set(attempts.map((a) => a.testId));
  const testsTouched = touched.size;
  const progressPct = Math.round((testsTouched / Math.max(testsReady, 1)) * 100);

  let overallScore = 0;
  let overallTotal = 0;
  const skillMap = new Map<SkillKind, { score: number; total: number; n: number }>();

  for (const a of attempts) {
    overallScore += a.score;
    overallTotal += a.total;
    for (const t of a.tasks) {
      const kind = t.kind || inferSkillKind(t.label);
      const cur = skillMap.get(kind) ?? { score: 0, total: 0, n: 0 };
      cur.score += t.score;
      cur.total += t.total;
      cur.n += 1;
      skillMap.set(kind, cur);
    }
  }

  const skills: SkillAggregate[] = (
    [
      "matching-headings",
      "tfng",
      "sentence-endings",
      "sentence-completion",
      "matching-information",
      "summary-completion",
      "table-completion",
      "short-answers",
      "map-labelling",
      "matching-letters",
      "multiple-choice",
      "multiple-matching",
      "flow-chart",
      "task-1-graph",
      "task-1-process",
      "task-2-essay",
      "other",
    ] as SkillKind[]
  )
    .filter((k) => skillMap.has(k))
    .map((kind) => {
      const cur = skillMap.get(kind)!;
      return {
        kind,
        label: SKILL_LABELS[kind],
        score: cur.score,
        total: cur.total,
        pct: cur.total ? Math.round((cur.score / cur.total) * 100) : 0,
        attempts: cur.n,
      };
    });

  const bestAttempt =
    attempts.length === 0
      ? null
      : [...attempts].sort((a, b) => {
          const ap = a.total ? a.score / a.total : 0;
          const bp = b.total ? b.score / b.total : 0;
          return bp - ap || b.at - a.at;
        })[0];

  const latestAttempt = attempts[0] ?? null;

  let trend: SmartPracticeStats["trend"] = "none";
  let trendDelta = 0;
  if (attempts.length >= 2) {
    const a = attempts[0];
    const b = attempts[1];
    const ap = a.total ? (a.score / a.total) * 100 : 0;
    const bp = b.total ? (b.score / b.total) * 100 : 0;
    trendDelta = Math.round(ap - bp);
    if (trendDelta >= 5) trend = "up";
    else if (trendDelta <= -5) trend = "down";
    else trend = "flat";
  }

  const overallPct = overallTotal
    ? Math.round((overallScore / overallTotal) * 100)
    : 0;

  let insight =
    "Пройди Exam в Practice Reading или Listening — статистика появится здесь.";
  if (attempts.length > 0) {
    const weakest = [...skills].sort((a, b) => a.pct - b.pct)[0];
    const strongest = [...skills].sort((a, b) => b.pct - a.pct)[0];
    if (weakest && strongest && weakest.kind !== strongest.kind) {
      insight = `Сильнее всего: ${strongest.label} (${strongest.pct}%). Подтянуть: ${weakest.label} (${weakest.pct}%).`;
    } else if (overallPct >= 80) {
      insight = "Отличный уровень accuracy — держи темп и переходи к следующему тесту.";
    } else if (overallPct >= 55) {
      insight = "Середина пути: после Check смотри evidence в тексте — так растет accuracy.";
    } else {
      insight =
        "Пока много ошибок. В Learn пройди Task advice, потом снова Exam.";
    }
    if (trend === "up") {
      insight = `Рост +${trendDelta}% к прошлой попытке. ${insight}`;
    } else if (trend === "down") {
      insight = `Минус ${Math.abs(trendDelta)}% к прошлой попытке. ${insight}`;
    }
  }

  return {
    attempts,
    testsReady,
    testsTouched,
    progressPct,
    overallScore,
    overallTotal,
    overallPct,
    bestAttempt,
    latestAttempt,
    skills,
    trend,
    trendDelta,
    insight,
  };
}
