import {
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  isListeningTest1,
  isListeningTest2,
  isListeningTest3,
  isListeningTest4,
  practiceListeningCatalog,
  type PracticeListeningCatalogItem,
  type PracticeListeningTest,
} from "../data/practiceListeningCatalog";
import { practiceListeningTest1 } from "../data/practiceListeningTest1";
import {
  savePracticeAttempt,
  type PracticeTaskResult,
  type SkillKind,
} from "../data/practiceStats";
import { AudioPlayer } from "./AudioPlayer";
import {
  PracticeReadingResults,
  type TaskScore,
} from "./PracticeReadingResults";
import { PracticeListeningTest2Session } from "./PracticeListeningTest2Session";
import { PracticeListeningTest3Session } from "./PracticeListeningTest3Session";
import { PracticeListeningTest4Session } from "./PracticeListeningTest4Session";

type Screen = "catalog" | "modes" | "session" | "results";
type Track = "learn" | "exam";
type Phase =
  | "discuss"
  | "ads"
  | "advice"
  | "table"
  | "predict"
  | "short"
  | "followup";

type ScorePair = { score: number; total: number };

function norm(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "'")
    .replace(/\s+/g, " ");
}

function accepts(value: string, accept: string[]): boolean {
  const n = norm(value);
  return accept.some((a) => norm(a) === n);
}

const LEARN_FLOW: Phase[] = [
  "discuss",
  "ads",
  "advice",
  "table",
  "predict",
  "short",
  "followup",
];
const EXAM_FLOW: Phase[] = ["table", "short"];

function listeningTaskScores(
  test: PracticeListeningTest,
  task1: ScorePair | null,
  task2: ScorePair | null,
): TaskScore[] {
  if (isListeningTest2(test)) {
    return [
      {
        label: "Map labelling",
        score: task1?.score ?? 0,
        total: task1?.total ?? test.mapTask.questions.length,
      },
      {
        label: "Matching",
        score: task2?.score ?? 0,
        total: task2?.total ?? test.matchTask.questions.length,
      },
    ];
  }
  if (isListeningTest3(test)) {
    return [
      {
        label: "Multiple matching + short answers",
        score: task1?.score ?? 0,
        total: task1?.total ?? 4,
      },
      {
        label: "Multiple choice",
        score: task2?.score ?? 0,
        total: task2?.total ?? test.part2.questions.length,
      },
    ];
  }
  if (isListeningTest4(test)) {
    return [
      {
        label: "Matching + flow chart",
        score: task1?.score ?? 0,
        total: task1?.total ?? 6,
      },
      {
        label: "Summary completion",
        score: task2?.score ?? 0,
        total: task2?.total ?? 4,
      },
    ];
  }
  return [
    {
      label: "Table completion",
      score: task1?.score ?? 0,
      total: task1?.total ?? test.tableTask.blanks.length,
    },
    {
      label: "Short answers",
      score: task2?.score ?? 0,
      total: task2?.total ?? test.shortTask.questions.length,
    },
  ];
}

function skillKindForLabel(label: string): SkillKind {
  const lower = label.toLowerCase();
  if (lower.includes("map")) return "map-labelling";
  if (lower.includes("multiple choice")) return "multiple-choice";
  if (lower.includes("multiple matching")) return "multiple-matching";
  if (lower.includes("summary")) return "summary-completion";
  if (lower.includes("flow")) return "flow-chart";
  if (lower.includes("matching")) return "matching-letters";
  if (lower.includes("table")) return "table-completion";
  if (lower.includes("short")) return "short-answers";
  return "other";
}

function toStatTasks(tasks: TaskScore[]): PracticeTaskResult[] {
  return tasks.map((t) => ({
    key: t.label.toLowerCase().replace(/\s+/g, "-"),
    label: t.label,
    kind: skillKindForLabel(t.label),
    score: t.score,
    total: t.total,
  }));
}

export function PracticeListeningHub({ onBack }: { onBack: () => void }) {
  const [screen, setScreen] = useState<Screen>("catalog");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [track, setTrack] = useState<Track | null>(null);
  const [phase, setPhase] = useState<Phase>("discuss");
  const [tableScore, setTableScore] = useState<ScorePair | null>(null);
  const [shortScore, setShortScore] = useState<ScorePair | null>(null);

  const selected: PracticeListeningCatalogItem | null = useMemo(
    () =>
      selectedId
        ? (practiceListeningCatalog.find((t) => t.id === selectedId) ?? null)
        : null,
    [selectedId],
  );

  const test = selected?.test ?? null;
  const flow = track === "exam" ? EXAM_FLOW : LEARN_FLOW;
  const nextCatalogItem = selected
    ? practiceListeningCatalog.find((t) => t.number === selected.number + 1)
    : null;

  const resetToCatalog = () => {
    setScreen("catalog");
    setSelectedId(null);
    setTrack(null);
    setPhase("discuss");
    setTableScore(null);
    setShortScore(null);
  };

  const goNext = () => {
    const i = flow.indexOf(phase);
    if (i < 0 || i >= flow.length - 1) {
      setPhase(flow[0]);
      setTrack(null);
      setScreen("modes");
      return;
    }
    setPhase(flow[i + 1]);
  };

  const openTest = (item: PracticeListeningCatalogItem) => {
    if (!item.ready || !item.test) return;
    setSelectedId(item.id);
    setTrack(null);
    setTableScore(null);
    setShortScore(null);
    setScreen("modes");
  };

  const completeSession = (
    task1?: ScorePair | null,
    task2?: ScorePair | null,
  ) => {
    if (!selected || !test || !track) return;
    const t1 = task1 !== undefined ? task1 : tableScore;
    const t2 = task2 !== undefined ? task2 : shortScore;
    if (t1) setTableScore(t1);
    if (t2) setShortScore(t2);
    const tasks = listeningTaskScores(test, t1, t2);
    const scoreSum = tasks.reduce((n, t) => n + t.score, 0);
    const totalSum = tasks.reduce((n, t) => n + t.total, 0);
    savePracticeAttempt({
      testId: selected.id,
      testTitle: `${selected.title} · ${track === "exam" ? "Exam" : "Learn"}`,
      tasks: toStatTasks(tasks),
      score: scoreSum,
      total: totalSum,
    });
    setScreen("results");
  };

  if (screen === "results" && selected && test) {
    const tasks = listeningTaskScores(test, tableScore, shortScore);
    return (
      <PracticeReadingResults
        testTitle={`${selected.title} · ${track === "exam" ? "Exam" : "Learn"}`}
        tasks={tasks}
        onBackToTests={resetToCatalog}
        footerStep={track === "exam" ? "Exam complete" : "Learn complete"}
        onNextTest={
          nextCatalogItem
            ? () => {
                if (nextCatalogItem.ready) openTest(nextCatalogItem);
                else resetToCatalog();
              }
            : undefined
        }
        nextTestLabel={
          nextCatalogItem ? `${nextCatalogItem.title} →` : undefined
        }
        nextTestReady={Boolean(nextCatalogItem?.ready)}
      />
    );
  }

  if (screen === "session" && test && track && isListeningTest2(test)) {
    return (
      <PracticeListeningTest2Session
        track={track}
        onBackToModes={() => {
          setTrack(null);
          setScreen("modes");
        }}
        onComplete={({ map, match }) => completeSession(map, match)}
      />
    );
  }

  if (screen === "session" && test && track && isListeningTest3(test)) {
    return (
      <PracticeListeningTest3Session
        track={track}
        onBackToModes={() => {
          setTrack(null);
          setScreen("modes");
        }}
        onComplete={({ part1, part2 }) => completeSession(part1, part2)}
      />
    );
  }

  if (screen === "session" && test && track && isListeningTest4(test)) {
    return (
      <PracticeListeningTest4Session
        track={track}
        onBackToModes={() => {
          setTrack(null);
          setScreen("modes");
        }}
        onComplete={({ flowMatch, summary }) =>
          completeSession(flowMatch, summary)
        }
      />
    );
  }

  if (screen === "session" && test && track && isListeningTest1(test)) {
    return (
      <ListeningSession
        test={test}
        track={track}
        phase={phase}
        onTableDone={(s) => setTableScore(s)}
        onShortDone={(s) => setShortScore(s)}
        onBack={() => {
          if (track === "exam" && phase === "table") {
            setTrack(null);
            setScreen("modes");
            return;
          }
          const i = flow.indexOf(phase);
          if (i <= 0) {
            setTrack(null);
            setScreen("modes");
          } else setPhase(flow[i - 1]);
        }}
        onNext={goNext}
        onComplete={(shortOverride) =>
          completeSession(undefined, shortOverride)
        }
      />
    );
  }

  if (screen === "modes" && selected && test) {
    const examBlurb = isListeningTest4(test)
      ? "Questions 1–10 → result"
      : isListeningTest3(test)
        ? "Questions 1–4 → Multiple choice 5–10 → result"
        : isListeningTest2(test)
          ? "Map 1–6 → Matching 7–10 → result"
          : "Table 1–5 → Short answers 6–10 → result";
    const learnBlurb = isListeningTest4(test)
      ? "Lead-in → synonyms → listening → follow-up"
      : isListeningTest3(test)
        ? "Lead-in → listening → tips → MC → language → follow-up"
        : isListeningTest2(test)
          ? "Lead-in → map → matching → language → follow-up"
          : "Lead-in → training → listening → follow-up";
    return (
      <div className="pr-hub pr-hub--modes">
        <header className="pr-hub__chrome">
          <button
            type="button"
            className="back-link"
            onClick={() => {
              setScreen("catalog");
              setSelectedId(null);
            }}
          >
            ← All tests
          </button>
          <div>
            <h1>{selected.title}</h1>
            <p>{selected.subtitle}</p>
          </div>
        </header>
        <section className="pr-hub__modes">
          <button
            type="button"
            className="pr-hub__mode"
            onClick={() => {
              setTrack("learn");
              setPhase("discuss");
              setTableScore(null);
              setShortScore(null);
              setScreen("session");
            }}
          >
            <strong>Learn</strong>
            <span>{learnBlurb}</span>
          </button>
          <button
            type="button"
            className="pr-hub__mode"
            onClick={() => {
              setTrack("exam");
              setPhase(
                isListeningTest1(test) ? "table" : "discuss",
              );
              setTableScore(null);
              setShortScore(null);
              setScreen("session");
            }}
          >
            <strong>Exam</strong>
            <span>{examBlurb}</span>
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="pr-hub pr-hub--fill">
      <header className="pr-hub__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Home
        </button>
        <div>
          <h1>Practice Listening</h1>
          <p>4 tests · open any</p>
        </div>
      </header>
      <section className="pr-hub__tasks">
        <h2>Choose a test</h2>
        <div className="pr-hub__task-grid">
          {practiceListeningCatalog.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`pr-hub__task ${item.ready ? "" : "pr-hub__task--soon"}`}
              disabled={!item.ready}
              onClick={() => openTest(item)}
            >
              <span className="pr-hub__task-num">Test {item.number}</span>
              <strong>{item.title}</strong>
              <span className="pr-hub__task-meta">{item.subtitle}</span>
              <span className="pr-hub__task-go">
                {item.ready ? "Open" : "Soon"}
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function ListeningSession({
  test,
  track,
  phase,
  onTableDone,
  onShortDone,
  onBack,
  onNext,
  onComplete,
}: {
  test: typeof practiceListeningTest1;
  track: Track;
  phase: Phase;
  onTableDone: (s: ScorePair) => void;
  onShortDone: (s: ScorePair) => void;
  onBack: () => void;
  onNext: () => void;
  onComplete: (shortOverride?: ScorePair | null) => void;
}) {
  if (phase === "discuss") {
    return (
      <DiscussPhase
        data={test.leadIn}
        onBack={onBack}
        onNext={onNext}
      />
    );
  }
  if (phase === "ads") {
    return <AdsPhase data={test.leadIn} onBack={onBack} onNext={onNext} />;
  }
  if (phase === "advice") {
    return <AdvicePhase data={test.advice} onBack={onBack} onNext={onNext} />;
  }
  if (phase === "table") {
    return (
      <TablePhase
        data={test.tableTask}
        onBack={onBack}
        onNext={(s) => {
          onTableDone(s);
          onNext();
        }}
      />
    );
  }
  if (phase === "predict") {
    return <PredictPhase data={test.predict} onBack={onBack} onNext={onNext} />;
  }
  if (phase === "short") {
    return (
      <ShortPhase
        data={test.shortTask}
        script={test.tableTask.script}
        onBack={onBack}
        onNext={(s) => {
          onShortDone(s);
          if (track === "exam") onComplete(s);
          else onNext();
        }}
      />
    );
  }

  return (
    <FollowupPhase
      data={test.followUp}
      onBack={onBack}
      onNext={() => onComplete()}
    />
  );
}

function DiscussPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceListeningTest1.leadIn;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="pl-shell">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Modes
        </button>
        <div className="pr-exam__chrome-title">
          <span>Learn · Lead-in</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <div className="pl-leadin-discuss">
        <figure className="pl-hero pl-hero--photo">
          <img src={data.image} alt={data.imageAlt} />
        </figure>
        <section className="pl-panel pl-panel--discuss">
          <p className="pr-leadin__instruction">
            <span>1</span>
            {data.discussInstruction.replace(/^\d+\s*/, "")}
          </p>
          <ol className="pr-leadin__statements">
            {data.discussQuestions.map((q, i) => (
              <li key={q}>
                <strong>{i + 1}</strong>
                <span>{q}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        <span className="flow-footer__step">Discuss in pairs</span>
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={onNext}
        >
          Job adverts →
        </button>
      </footer>
    </div>
  );
}

function AdsPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceListeningTest1.leadIn;
  onBack: () => void;
  onNext: () => void;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [active, setActive] = useState<number | null>(1);
  const used = useMemo(
    () => new Set(Object.values(answers).map(norm).filter(Boolean)),
    [answers],
  );
  const score = data.adverts.filter(
    (a) => norm(answers[a.id] ?? "") === norm(a.key),
  ).length;

  return (
    <div className="pl-shell">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Lead-in</span>
          <strong>Job adverts</strong>
        </div>
      </header>
      <div className="pl-split pl-split--ads">
        <section className="pl-panel">
          <p className="pr-leadin__instruction">
            <span>2</span>
            {data.adsInstruction.replace(/^\d+\s*/, "")}
          </p>
          <div className="pr-leadin__chips">
            {data.wordBox.map((w) => (
              <button
                key={w}
                type="button"
                className={`pr-leadin__chip ${used.has(norm(w)) ? "pr-leadin__chip--used" : ""}`}
                disabled={checked || used.has(norm(w)) || active == null}
                onClick={() => {
                  if (active == null) return;
                  setAnswers((a) => ({ ...a, [active]: w }));
                  const next = data.adverts.find((ad) => !answers[ad.id] && ad.id !== active);
                  setActive(next?.id ?? active);
                }}
              >
                {w}
              </button>
            ))}
          </div>
        </section>
        <section className="pl-panel pl-ads">
          {data.adverts.map((ad) => {
            const val = answers[ad.id] ?? "";
            const ok = norm(val) === norm(ad.key);
            return (
              <article
                key={ad.id}
                className={`pl-ad ${active === ad.id ? "pl-ad--on" : ""}`}
                onClick={() => !checked && setActive(ad.id)}
              >
                <span className="pr-mc__num">{ad.id}</span>
                <p>
                  {ad.before}
                  <button
                    type="button"
                    className={
                      checked
                        ? ok
                          ? "pl-ad__blank pl-ad__blank--ok"
                          : "pl-ad__blank pl-ad__blank--bad"
                        : "pl-ad__blank"
                    }
                    onClick={() => !checked && setActive(ad.id)}
                  >
                    {val || "____________"}
                  </button>
                  {ad.after}
                  {checked && !ok && (
                    <span className="inline-gap-bad"> → {ad.key}</span>
                  )}
                </p>
              </article>
            );
          })}
        </section>
      </div>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        {checked ? (
          <span className="flow-footer__step">
            ✓ {score}/{data.adverts.length}
          </span>
        ) : (
          <span className="flow-footer__step">Tap a gap, then a word</span>
        )}
        <button
          type="button"
          className="flow-footer__btn"
          onClick={() => {
            setChecked(false);
            setAnswers({});
          }}
        >
          Заново
        </button>
        {!checked ? (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={() => setChecked(true)}
          >
            Check →
          </button>
        ) : (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={onNext}
          >
            Task advice →
          </button>
        )}
      </footer>
    </div>
  );
}

function AdvicePhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceListeningTest1.advice;
  onBack: () => void;
  onNext: () => void;
}) {
  const [placed, setPlaced] = useState<Record<string, number[]>>({
    before: [],
    during: [],
    after: [],
  });
  const [activeCol, setActiveCol] = useState<string>("before");
  const [checked, setChecked] = useState(false);

  const used = useMemo(() => new Set(Object.values(placed).flat()), [placed]);

  const score = data.columns.filter((c) => {
    const got = [...(placed[c.id] ?? [])].sort((a, b) => a - b);
    const want = [...c.keys].sort((a, b) => a - b);
    return got.length === want.length && got.every((n, i) => n === want[i]);
  }).length;

  return (
    <div className="pl-shell">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Training</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <div className="pl-split pl-split--advice">
        <section className="pl-panel">
          <p className="pr-leadin__instruction">
            <span>3</span>
            {data.instruction.replace(/^\d+\s*/, "")}
          </p>
          <ol className="pl-tips">
            {data.tips.map((t, i) => {
              const n = i + 1;
              const taken = used.has(n);
              return (
                <li key={n}>
                  <button
                    type="button"
                    className={`pl-tip-num ${taken ? "pl-tip-num--used" : ""}`}
                    disabled={checked || taken}
                    onClick={() => {
                      setPlaced((p) => ({
                        ...p,
                        [activeCol]: [...(p[activeCol] ?? []), n].sort(
                          (a, b) => a - b,
                        ),
                      }));
                    }}
                  >
                    {n}
                  </button>
                  <span>{t}</span>
                </li>
              );
            })}
          </ol>
        </section>
        <section className="pl-advice-table">
          {data.columns.map((c) => {
            const vals = placed[c.id] ?? [];
            const want = c.keys;
            const colOk =
              checked &&
              vals.length === want.length &&
              [...vals].sort((a, b) => a - b).every((n, i) => n === want[i]);
            return (
              <button
                key={c.id}
                type="button"
                className={`pl-advice-col ${activeCol === c.id ? "pl-advice-col--on" : ""} ${checked ? (colOk ? "pl-advice-col--ok" : "pl-advice-col--bad") : ""}`}
                onClick={() => !checked && setActiveCol(c.id)}
              >
                <strong>{c.label}</strong>
                <div className="pl-advice-col__nums">
                  {vals.length
                    ? vals.map((n) => (
                        <span
                          key={n}
                          className="pl-advice-chip"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (checked) return;
                            setPlaced((p) => ({
                              ...p,
                              [c.id]: (p[c.id] ?? []).filter((x) => x !== n),
                            }));
                          }}
                        >
                          {n}
                        </span>
                      ))
                    : "—"}
                </div>
                {checked && !colOk && (
                  <span className="pl-advice-col__key">
                    → {want.join(", ")}
                  </span>
                )}
              </button>
            );
          })}
        </section>
      </div>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        {checked ? (
          <span className="flow-footer__step">
            ✓ {score}/{data.columns.length} columns
          </span>
        ) : (
          <span className="flow-footer__step">Select a column, tap a tip №</span>
        )}
        <button
          type="button"
          className="flow-footer__btn"
          onClick={() => {
            setChecked(false);
            setPlaced({ before: [], during: [], after: [] });
          }}
        >
          Заново
        </button>
        {!checked ? (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={() => setChecked(true)}
          >
            Check →
          </button>
        ) : (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={onNext}
          >
            Listening 1.1 →
          </button>
        )}
      </footer>
    </div>
  );
}

function ScriptPanel({
  lines,
  label = "Tapescript",
  side = false,
}: {
  lines: { speaker: string; text: string }[];
  label?: string;
  /** Always visible panel on the right (no collapse to empty). */
  side?: boolean;
}) {
  const [open, setOpen] = useState(true);
  const showBody = side || open;
  return (
    <aside className={`pl-script ${side ? "pl-script--side" : ""} ${showBody ? "pl-script--open" : ""}`}>
      <div className="pl-script__toggle">
        <span>{label}</span>
        {!side && (
          <button
            type="button"
            className="pl-script__chev"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "▾ Hide" : "▸ Show"}
          </button>
        )}
      </div>
      {showBody && (
        <div className="pl-script__body">
          {lines.map((l, i) => (
            <p key={`${l.speaker}-${i}`}>
              <strong>{l.speaker}:</strong> {l.text}
            </p>
          ))}
        </div>
      )}
    </aside>
  );
}

function TablePhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceListeningTest1.tableTask;
  onBack: () => void;
  onNext: (s: { score: number; total: number }) => void;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const score = data.blanks.filter((b) =>
    accepts(answers[b.id] ?? "", b.accept),
  ).length;

  return (
    <div className={`pl-shell ${checked ? "pl-shell--wide" : ""}`}>
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Questions 1–5</span>
          <strong>{data.title}</strong>
        </div>
      </header>

      <div
        className={`pl-listen pl-listen--table ${checked ? "pl-listen--with-script" : ""}`}
      >
        <div className="pl-listen__main">
          <div className="pl-listen__top">
            <p className="pl-task-header pl-task-header--inline">
              Questions 1–5 · Complete the table ·{" "}
              <strong>NO MORE THAN TWO WORDS</strong>
            </p>
            <AudioPlayer src={data.audioUrl} label={data.audioLabel} />
          </div>

          <div className="pl-table-card">
            <table className="pl-table pl-table--exam">
              <colgroup>
                <col style={{ width: "22%" }} />
                <col style={{ width: "30%" }} />
                <col style={{ width: "22%" }} />
                <col style={{ width: "26%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">Job</th>
                  <th scope="col">Employer</th>
                  <th scope="col">Work day(s)</th>
                  <th scope="col">Duties</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>kitchen assistant</td>
                  <td>
                    <span className="pl-cell-line">
                      The{" "}
                      <Blank
                        id={1}
                        answers={answers}
                        setAnswers={setAnswers}
                        checked={checked}
                        accept={data.blanks[0].accept}
                        keyAns={data.blanks[0].key}
                      />{" "}
                      Café
                    </span>
                  </td>
                  <td>weekends</td>
                  <td>
                    <span className="pl-cell-line">
                      <Blank
                        id={2}
                        answers={answers}
                        setAnswers={setAnswers}
                        checked={checked}
                        accept={data.blanks[1].accept}
                        keyAns={data.blanks[1].key}
                      />
                      , wash dishes
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Blank
                      id={3}
                      answers={answers}
                      setAnswers={setAnswers}
                      checked={checked}
                      accept={data.blanks[2].accept}
                      keyAns={data.blanks[2].key}
                      wide
                    />
                  </td>
                  <td>Bellamy&apos;s Restaurant</td>
                  <td>Thursday and Friday evening</td>
                  <td>serve customers, wipe tables</td>
                </tr>
                <tr>
                  <td>barista</td>
                  <td>
                    <span className="pl-cell-line">
                      <Blank
                        id={4}
                        answers={answers}
                        setAnswers={setAnswers}
                        checked={checked}
                        accept={data.blanks[3].accept}
                        keyAns={data.blanks[3].key}
                      />{" "}
                      department store
                    </span>
                  </td>
                  <td>Saturday</td>
                  <td>
                    <span className="pl-cell-line">
                      prepare drinks,{" "}
                      <Blank
                        id={5}
                        answers={answers}
                        setAnswers={setAnswers}
                        checked={checked}
                        accept={data.blanks[4].accept}
                        keyAns={data.blanks[4].key}
                      />
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {checked && (
          <ScriptPanel side lines={data.script} label="Tapescript 1.1" />
        )}
      </div>

      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        {checked ? (
          <span className="flow-footer__step">
            ✓ {score}/{data.blanks.length}
          </span>
        ) : (
          <span className="flow-footer__step">NO MORE THAN TWO WORDS</span>
        )}
        <button
          type="button"
          className="flow-footer__btn"
          onClick={() => {
            setChecked(false);
            setAnswers({});
          }}
        >
          Заново
        </button>
        {!checked ? (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={() => setChecked(true)}
          >
            Check →
          </button>
        ) : (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={() => onNext({ score, total: data.blanks.length })}
          >
            Next →
          </button>
        )}
      </footer>
    </div>
  );
}

function Blank({
  id,
  answers,
  setAnswers,
  checked,
  accept,
  keyAns,
  wide = false,
}: {
  id: number;
  answers: Record<number, string>;
  setAnswers: Dispatch<SetStateAction<Record<number, string>>>;
  checked: boolean;
  accept: string[];
  keyAns: string;
  wide?: boolean;
}) {
  const val = answers[id] ?? "";
  const ok = accepts(val, accept);
  return (
    <span
      className={[
        "pl-blank",
        wide ? "pl-blank--wide" : "",
        checked ? (ok ? "pl-blank--ok" : "pl-blank--bad") : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="pl-blank__n" aria-hidden>
        {id}
      </span>
      <input
        className="pl-blank__input"
        value={val}
        disabled={checked}
        autoComplete="off"
        spellCheck={false}
        aria-label={`Answer ${id}`}
        onChange={(e) => setAnswers((a) => ({ ...a, [id]: e.target.value }))}
      />
      {checked && !ok && <span className="pl-blank__key">→ {keyAns}</span>}
    </span>
  );
}

function PredictPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceListeningTest1.predict;
  onBack: () => void;
  onNext: () => void;
}) {
  const [answers, setAnswers] = useState<Record<number, "T" | "F" | undefined>>(
    {},
  );
  const [checked, setChecked] = useState(false);
  const score = data.items.filter((it) => answers[it.id] === it.key).length;

  return (
    <div className="pl-shell">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Training</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <div className="pl-listen">
        <p className="pr-leadin__instruction">
          <span>5</span>
          {data.instruction.replace(/^\d+\s*/, "")}
        </p>
        <ol className="pl-predict">
          {data.items.map((it) => {
            const sel = answers[it.id];
            const ok = sel === it.key;
            return (
              <li key={it.id}>
                <span className="pr-mc__num">{it.id}</span>
                <div className="pl-predict__body">
                  <p>{it.statement}</p>
                  <div className="pr-tfng__choices">
                    {(["T", "F"] as const).map((opt) => {
                      let state = "";
                      if (checked) {
                        if (opt === it.key) state = "pr-chip--ok";
                        else if (sel === opt) state = "pr-chip--bad";
                      } else if (sel === opt) state = "pr-chip--picked";
                      return (
                        <button
                          key={opt}
                          type="button"
                          className={`pr-chip pr-chip--tfng ${state}`}
                          onClick={() => {
                            if (checked) return;
                            setAnswers((a) => ({ ...a, [it.id]: opt }));
                          }}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {checked && !ok && it.correction && (
                    <span className="inline-gap-bad"> → {it.correction}</span>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        {checked ? (
          <span className="flow-footer__step">
            ✓ {score}/{data.items.length}
          </span>
        ) : (
          <span className="flow-footer__step">T or F</span>
        )}
        <button
          type="button"
          className="flow-footer__btn"
          onClick={() => {
            setChecked(false);
            setAnswers({});
          }}
        >
          Заново
        </button>
        {!checked ? (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={() => setChecked(true)}
          >
            Check →
          </button>
        ) : (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={onNext}
          >
            Listening 1.2 →
          </button>
        )}
      </footer>
    </div>
  );
}

function ShortPhase({
  data,
  script,
  onBack,
  onNext,
}: {
  data: typeof practiceListeningTest1.shortTask;
  script: typeof practiceListeningTest1.tableTask.script;
  onBack: () => void;
  onNext: (s: { score: number; total: number }) => void;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const score = data.questions.filter((q) =>
    accepts(answers[q.id] ?? "", q.accept),
  ).length;

  return (
    <div className={`pl-shell ${checked ? "pl-shell--wide" : ""}`}>
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Questions 6–10</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <div
        className={`pl-listen ${checked ? "pl-listen--with-script" : ""}`}
      >
        <div className="pl-listen__main">
          <div className="pl-listen__top">
            <p className="pl-task-header pl-task-header--inline">
              Questions 6–10 · Short answers ·{" "}
              <strong>NO MORE THAN THREE WORDS AND/OR NUMBERS</strong>
            </p>
            <AudioPlayer src={data.audioUrl} label={data.audioLabel} />
          </div>
          <ol className="pl-short">
            {data.questions.map((q) => {
              const val = answers[q.id] ?? "";
              const ok = accepts(val, q.accept);
              return (
                <li key={q.id}>
                  <span className="pr-mc__num">{q.id}</span>
                  <div className="pl-short__body">
                    <p>{q.prompt}</p>
                    <span
                      className={
                        checked
                          ? ok
                            ? "pl-blank pl-blank--ok"
                            : "pl-blank pl-blank--bad"
                          : "pl-blank"
                      }
                    >
                      <input
                        className="pl-blank__input pl-blank__input--wide"
                        value={val}
                        disabled={checked}
                        placeholder="answer…"
                        onChange={(e) =>
                          setAnswers((a) => ({ ...a, [q.id]: e.target.value }))
                        }
                      />
                      {checked && !ok && (
                        <span className="pl-blank__key">→ {q.key}</span>
                      )}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {checked && (
          <ScriptPanel side lines={script} label="Tapescript 1.2" />
        )}
      </div>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        {checked ? (
          <span className="flow-footer__step">
            ✓ {score}/{data.questions.length}
          </span>
        ) : (
          <span className="flow-footer__step">
            ≤ 3 words and/or numbers
          </span>
        )}
        <button
          type="button"
          className="flow-footer__btn"
          onClick={() => {
            setChecked(false);
            setAnswers({});
          }}
        >
          Заново
        </button>
        {!checked ? (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={() => setChecked(true)}
          >
            Check →
          </button>
        ) : (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={() => onNext({ score, total: data.questions.length })}
          >
            Next →
          </button>
        )}
      </footer>
    </div>
  );
}

function FollowupPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceListeningTest1.followUp;
  onBack: () => void;
  onNext: () => void;
}) {
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(data.speakSec);

  useEffect(() => {
    if (!running || timeLeft <= 0) return;
    const id = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setRunning(false);
          setDone(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running, timeLeft]);

  const m = Math.floor(timeLeft / 60);
  const s = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <div className="pl-shell">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Follow-up</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <div className="pl-split">
        <section className="pl-panel">
          <p className="pr-leadin__instruction">
            <span>7</span>
            {data.instruction.replace(/^\d+\s*/, "")}
          </p>
          <h3 className="pl-role__h">Student A</h3>
          <p className="pl-role__p">{data.studentA}</p>
        </section>
        <section className="pl-panel">
          <h3 className="pl-role__h">Student B</h3>
          <p className="pl-role__p">{data.studentB}</p>
          <div className="pr-leadin__speak">
            <div
              className={
                done
                  ? "pr-leadin__timer pr-leadin__timer--done"
                  : running
                    ? "pr-leadin__timer pr-leadin__timer--run"
                    : "pr-leadin__timer"
              }
            >
              <span className="pr-leadin__clock">
                ⏱ {m}:{s}
              </span>
              {!running && !done && (
                <button
                  type="button"
                  className="btn-start"
                  onClick={() => setRunning(true)}
                >
                  Start →
                </button>
              )}
              {running && (
                <button
                  type="button"
                  className="nav-btn"
                  onClick={() => {
                    setRunning(false);
                    setDone(true);
                  }}
                >
                  Stop
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        <span className="flow-footer__step">Role-play</span>
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={onNext}
        >
          Done →
        </button>
      </footer>
    </div>
  );
}
