import { useEffect, useState } from "react";
import {
  MS_U2_WRITE_STEPS,
  MS_U2_WRITE_NEXT,
  writingU2,
} from "../../data/mindset/writingU2";
import { WordCountMeter, countWords } from "../WordCountMeter";

const data = writingU2;

type StepView = {
  kind: string;
  badge?: string;
  instruction?: string;
  passage?: string;
  bullets?: string[];
  tip?: string;
  bank?: string[];
  items?: Array<{
    id: string;
    stem?: string;
    text?: string;
    key: string;
    options?: { id: string; text: string }[];
    tip?: string;
    alts?: string[];
  }>;
  heading?: string;
  prompts?: string[];
  topic?: string;
  prompt?: string;
  minWords?: number;
  wcLabel?: string;
  sample?: string;
};


function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, MS_U2_WRITE_STEPS.length - 1));
}

function norm(s: string): string {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

export function WritingU2Trainer({
  onBack,
  restart,
  initialStep,
}: {
  onBack?: () => void;
  restart?: boolean;
  initialStep?: number;
}) {
  const [step, setStep] = useState(() => clampStep(initialStep));
  const [checked, setChecked] = useState(false);
  const [mc, setMc] = useState<Record<string, string>>({});
  const [gaps, setGaps] = useState<Record<string, string>>({});
  const [picked, setPicked] = useState<string | null>(null);
  const [sides, setSides] = useState<Record<string, "adv" | "dis">>({});
  const [draft, setDraft] = useState("");
  const [showSample, setShowSample] = useState(false);

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setMc({});
    setGaps({});
    setPicked(null);
    setSides({});
    setDraft("");
    setShowSample(false);
  }, [restart, initialStep]);

  const curKind = (data.steps[step] as StepView)?.kind;
  const needsCheck =
    step < MS_U2_WRITE_STEPS.length - 1 &&
    curKind !== "exam" &&
    curKind !== "intro";

  const placeGap = (id: string) => {
    if (checked) return;
    if (gaps[id]) {
      setGaps((g) => {
        const n = { ...g };
        delete n[id];
        return n;
      });
      return;
    }
    if (!picked) return;
    setGaps((g) => ({ ...g, [id]: picked }));
    setPicked(null);
  };

  const usedGaps = new Set(Object.values(gaps));

  const scoreFor = (): { score: number; total: number } => {
    const cur = data.steps[step] as StepView;
    if (!cur || cur.kind === "intro" || cur.kind === "exam") return { score: 0, total: 0 };
    const its = cur.items ?? [];
    if (cur.kind === "mcq") {
      return { score: its.filter((it) => mc[it.id] === it.key).length, total: its.length };
    }
    if (cur.kind === "gaps" || cur.kind === "match") {
      return {
        score: its.filter((it) => norm(gaps[it.id] ?? "") === norm(it.key)).length,
        total: its.length,
      };
    }
    if (cur.kind === "sort") {
      return {
        score: its.filter((it) => sides[it.id] === it.key).length,
        total: its.length,
      };
    }
    return { score: 0, total: 0 };
  };

  const { score, total } = scoreFor();

  const goPrev = () => {
    if (step === 0) {
      onBack?.();
      return;
    }
    setChecked(false);
    setStep((x) => x - 1);
  };

  const goNext = () => {
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= MS_U2_WRITE_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setPicked(null);
    setStep((x) => x + 1);
  };

  const nextLabel =
    needsCheck && !checked ? "Check →" : MS_U2_WRITE_NEXT[step];
  const s = data.steps[step] as StepView;
  const items = s.items ?? [];
  const bank = s.bank ?? [];

  return (
    <div className="app-shell reading-flow reading-flow--viewport write-m2a">
      <div className="reading-chrome">
        {onBack && (
          <button type="button" className="back-link reading-chrome__back" onClick={onBack}>
            ← Unit
          </button>
        )}
        <span className="badge reading-chrome__badge">
          {data.sectionTitle} · {data.bookPages}
        </span>
        <div className="learn-step-tabs">
          {MS_U2_WRITE_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => { setStep(i); setChecked(false); }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      {s?.kind === "intro" && (
        <section className="write-m2a__panel">
          <div className="ms-unit-goals">
          <p className="ms-unit-goals__title">In this unit you will learn how to</p>
          <ul className="ms-unit-goals__list">
            {data.unitGoals.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
          <p className="write-m2a__instr">
            <span className="write-m2a__badge">{s.badge}</span>
            {s.instruction}
          </p>
          {s.tip && <p className="write-m2a__cue">{s.tip}</p>}
        </section>
      )}

      {s?.kind === "sort" && (
        <section className="write-m2a__panel">
          <p className="write-m2a__instr">
            <span className="write-m2a__badge">{s.badge}</span>
            {s.instruction}
          </p>
          <div className="write-m2a__grid2">
            {items.map((it) => (
              <div key={it.id} className="write-m2a__card">
                <p>{it.text ?? ""}</p>
                <div className="pr-chip-row">
                  {(["adv", "dis"] as const).map((side) => {
                    let state = "";
                    if (checked) {
                      if (side === it.key) state = "pr-chip--ok";
                      else if (sides[it.id] === side) state = "pr-chip--bad";
                    } else if (sides[it.id] === side) state = "pr-chip--picked";
                    return (
                      <button
                        key={side}
                        type="button"
                        className={`pr-chip ${state}`}
                        disabled={checked}
                        onClick={() => setSides((x) => ({ ...x, [it.id]: side }))}
                      >
                        {side === "adv" ? "Advantages" : "Disadvantages"}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {s?.kind === "mcq" && (
        <section className="write-m2a__panel">
          <p className="write-m2a__instr">
            <span className="write-m2a__badge">{s.badge}</span>
            {s.instruction}
          </p>
          {s.topic && <p className="write-m2a__cue"><em>{s.topic}</em></p>}
          {items.map((it) => (
            <div key={it.id} style={{ marginBottom: 10 }}>
              <p className="write-m2a__instr">
                <strong>{it.id}.</strong> {it.stem ?? ""}
              </p>
              <ul className="read-m3__opts">
                {(it.options ?? []).map((opt) => {
                  let state = "";
                  if (checked) {
                    if (opt.id === it.key) state = "pr-chip--ok";
                    else if (mc[it.id] === opt.id) state = "pr-chip--bad";
                  } else if (mc[it.id] === opt.id) state = "pr-chip--picked";
                  return (
                    <li key={opt.id}>
                      <button
                        type="button"
                        className={`read-m3__opt ${state}`}
                        disabled={checked}
                        onClick={() => setMc((m) => ({ ...m, [it.id]: opt.id }))}
                      >
                        <strong>{opt.id}</strong>
                        <span>{opt.text}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              {checked && it.tip && <p className="write-m2a__cue">{it.tip}</p>}
            </div>
          ))}
        </section>
      )}

      {(s?.kind === "gaps" || s?.kind === "match") && (
        <section className="write-m2a__panel">
          <p className="write-m2a__instr">
            <span className="write-m2a__badge">{s.badge}</span>
            {s.instruction}
          </p>
          <div className="pr-chip-row" style={{ marginBottom: 8 }}>
            {bank.map((b) => {
              const used = usedGaps.has(b);
              return (
                <button
                  key={b}
                  type="button"
                  className={`pr-chip ${picked === b ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used}
                  onClick={() => setPicked(b)}
                >
                  {b}
                </button>
              );
            })}
          </div>
          <ul className="write-m2a__list">
            {items.map((it) => {
              const val = gaps[it.id];
              const ok = norm(val ?? "") === norm(it.key);
              let cls = "inline-gap";
              if (checked) cls += ok ? " inline-gap--ok" : " inline-gap--bad";
              return (
                <li key={it.id}>
                  <span>{it.id}. {it.stem ?? ""} </span>
                  <button type="button" className={cls} disabled={checked} onClick={() => placeGap(it.id)}>
                    {val ?? "—"}
                  </button>
                  {checked && !ok && <span className="inline-gap-bad"> → {it.key}</span>}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {s?.kind === "exam" && (
        <section className="write-m2a__panel">
          <p className="write-m2a__instr">
            <span className="write-m2a__badge">EXAM</span>
            {s.instruction}
          </p>
          <p className="write-m2a__cue">{s.prompt}</p>
          <WordCountMeter words={countWords(draft)} minWords={s.minWords ?? 250} label={s.wcLabel ?? "Task minimum"} />
          <textarea
            className="write-m2a__draft"
            rows={10}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Write your answer here…"
          />
          <button type="button" className="pr-chip" onClick={() => setShowSample((v) => !v)}>
            {showSample ? "Hide sample" : "Show sample"}
          </button>
          {showSample && <article className="read-m3__passage"><p>{s.sample}</p></article>}
        </section>
      )}

      <footer className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}>
        <button type="button" className="flow-footer__btn" onClick={goPrev}>← Back</button>
        <span className="flow-footer__step">{step + 1} / {MS_U2_WRITE_STEPS.length}</span>
        {checked && needsCheck && total > 0 && (
          <span className="flow-footer__result">
            <span className={score === total ? "flow-footer__ok" : "flow-footer__bad"}>{score}/{total}</span>
          </span>
        )}
        <button type="button" className="flow-footer__btn flow-footer__btn--primary" onClick={goNext}>
          {nextLabel}
        </button>
      </footer>
    </div>
  );
}
