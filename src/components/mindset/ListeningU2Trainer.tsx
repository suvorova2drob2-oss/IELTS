import { useEffect, useState } from "react";
import {
  MS_U2_LISTEN_STEPS,
  MS_U2_LISTEN_NEXT,
  listeningU2,
} from "../../data/mindset/listeningU2";

const data = listeningU2;

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
  return Math.max(0, Math.min(n, MS_U2_LISTEN_STEPS.length - 1));
}

function norm(s: string): string {
  return s.toLowerCase().replace(/[()]/g, "").replace(/\s+/g, " ").trim();
}

function matches(val: string, key: string, alts?: string[]): boolean {
  const pool = [key, ...(alts ?? [])].map(norm);
  return pool.includes(norm(val));
}

export function ListeningU2Trainer({
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
  const [match, setMatch] = useState<Record<string, string>>({});
  const [pickedMatch, setPickedMatch] = useState<string | null>(null);
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setMc({});
    setGaps({});
    setPicked(null);
    setMatch({});
    setPickedMatch(null);
    setShowTip(false);
  }, [restart, initialStep]);

  const needsCheck =
    (data.steps[step] as StepView)?.kind !== "intro" &&
    (data.steps[step] as StepView)?.kind !== "discuss";

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

  const placeMatch = (id: string) => {
    if (checked) return;
    if (match[id]) {
      setMatch((m) => {
        const n = { ...m };
        delete n[id];
        return n;
      });
      return;
    }
    if (!pickedMatch) return;
    setMatch((m) => ({ ...m, [id]: pickedMatch }));
    setPickedMatch(null);
  };

  const usedGaps = new Set(Object.values(gaps));
  const usedMatch = new Set(Object.values(match));

  const scoreFor = (): { score: number; total: number } => {
    const cur = data.steps[step] as StepView;
    if (!cur || cur.kind === "intro" || cur.kind === "discuss") return { score: 0, total: 0 };
    const its = cur.items ?? [];
    if (cur.kind === "mcq") {
      return { score: its.filter((it) => mc[it.id] === it.key).length, total: its.length };
    }
    if (cur.kind === "match") {
      return { score: its.filter((it) => match[it.id] === it.key).length, total: its.length };
    }
    if (cur.kind === "gaps") {
      return {
        score: its.filter((it) => matches(gaps[it.id] ?? "", it.key, it.alts)).length,
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
    if (step >= MS_U2_LISTEN_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setPicked(null);
    setPickedMatch(null);
    setStep((x) => x + 1);
  };

  const nextLabel =
    needsCheck && !checked ? "Check →" : MS_U2_LISTEN_NEXT[step];

  const s = data.steps[step] as StepView;
  const items = s.items ?? [];
  const bank = s.bank ?? [];
  const bullets = s.bullets ?? [];
  const prompts = s.prompts ?? [];

  return (
    <div className="app-shell reading-flow reading-flow--viewport listen-m3b">
      <div className="reading-chrome">
        {onBack && (
          <button
            type="button"
            className="back-link reading-chrome__back"
            onClick={onBack}
          >
            ← Unit
          </button>
        )}
        <span className="badge reading-chrome__badge">
          {data.sectionTitle} · {data.bookPages}
        </span>
        <div className="learn-step-tabs">
          {MS_U2_LISTEN_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
              }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      {s?.kind === "intro" && (
        <section className="listen-m3b__panel" style={{ overflow: "auto" }}>
          <div className="ms-unit-goals">
          <p className="ms-unit-goals__title">In this unit you will learn how to</p>
          <ul className="ms-unit-goals__list">
            {data.unitGoals.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{s.badge}</span>
            {s.instruction}
          </p>
          {s.passage && (
            <article className="read-m3__passage read-m3__passage--solo">
              <p>{s.passage}</p>
            </article>
          )}
          {s.bullets && (
            <ul className="read-m3__qs">
              {bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
          {s.tip && <p className="write-m2a__cue">{s.tip}</p>}
        </section>
      )}

      {s?.kind === "mcq" && (
        <section className="listen-m3b__panel" style={{ overflow: "auto" }}>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{s.badge}</span>
            {s.instruction}
          </p>
          {s.passage && (
            <article className="read-m3__passage read-m3__passage--solo">
              <p>{s.passage}</p>
            </article>
          )}
          <div className="listen-m3b__list">
            {items.map((it) => (
              <div key={it.id} className="listen-m3b__row">
                <p className="read-m3__instr">
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
                          onClick={() =>
                            setMc((m) => ({ ...m, [it.id]: opt.id }))
                          }
                        >
                          <strong>{opt.id}</strong>
                          <span>{opt.text}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
                {checked && it.tip && (
                  <p className="write-m2a__cue">{it.tip}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {s?.kind === "match" && (
        <section className="listen-m3b__panel" style={{ overflow: "auto" }}>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{s.badge}</span>
            {s.instruction}
          </p>
          {s.passage && (
            <article className="read-m3__passage read-m3__passage--solo">
              <p>{s.passage}</p>
            </article>
          )}
          <div className="pr-chip-row" style={{ marginBottom: 8 }}>
            {bank.map((b) => {
              const used = usedMatch.has(b);
              return (
                <button
                  key={b}
                  type="button"
                  className={`pr-chip ${pickedMatch === b ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used}
                  onClick={() => setPickedMatch(b)}
                >
                  {b}
                </button>
              );
            })}
          </div>
          <ul className="read-m3__qs">
            {items.map((it) => {
              const val = match[it.id];
              let cls = "inline-gap";
              if (checked) cls += val === it.key ? " inline-gap--ok" : " inline-gap--bad";
              return (
                <li key={it.id}>
                  <span>
                    {it.id}. {it.stem ?? ""}{" "}
                  </span>
                  <button
                    type="button"
                    className={cls}
                    disabled={checked}
                    onClick={() => placeMatch(it.id)}
                  >
                    {val ?? "—"}
                  </button>
                  {checked && val !== it.key && (
                    <span className="inline-gap-bad"> → {it.key}</span>
                  )}
                </li>
              );
            })}
          </ul>
          {s.tip && <p className="write-m2a__cue">{s.tip}</p>}
        </section>
      )}

      {s?.kind === "gaps" && (
        <section className="listen-m3b__panel" style={{ overflow: "auto" }}>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{s.badge}</span>
            {s.instruction}
          </p>
          {s.passage && (
            <article className="read-m3__passage read-m3__passage--solo">
              <p>{s.passage}</p>
            </article>
          )}
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
          <ul className="read-m3__qs">
            {items.map((it) => {
              const val = gaps[it.id];
              const ok = matches(val ?? "", it.key, it.alts);
              let cls = "inline-gap";
              if (checked) cls += ok ? " inline-gap--ok" : " inline-gap--bad";
              return (
                <li key={it.id}>
                  <span>
                    {it.id}. {it.stem ?? ""}{" "}
                  </span>
                  <button
                    type="button"
                    className={cls}
                    disabled={checked}
                    onClick={() => placeGap(it.id)}
                  >
                    {val ?? "—"}
                  </button>
                  {checked && !ok && (
                    <span className="inline-gap-bad"> → {it.key}</span>
                  )}
                </li>
              );
            })}
          </ul>
          {s.tip && (
            <>
              <button
                type="button"
                className="pr-chip"
                onClick={() => setShowTip((v) => !v)}
              >
                {showTip ? "Hide tip" : "Show tip"}
              </button>
              {showTip && <p className="write-m2a__cue">{s.tip}</p>}
            </>
          )}
        </section>
      )}

      {s?.kind === "discuss" && (
        <section className="listen-m3b__panel" style={{ overflow: "auto" }}>
          <h2 className="read-m3__h">{s.heading}</h2>
          <ol className="read-m3__qs">
            {prompts.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
          <p className="write-m2a__cue">Discuss with a partner</p>
        </section>
      )}

      <footer
        className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}
      >
        <button type="button" className="flow-footer__btn" onClick={goPrev}>
          ← Back
        </button>
        <span className="flow-footer__step">
          {step + 1} / {MS_U2_LISTEN_STEPS.length}
        </span>
        {checked && needsCheck && total > 0 && (
          <span className="flow-footer__result">
            <span className={score === total ? "flow-footer__ok" : "flow-footer__bad"}>
              {score}/{total}
            </span>
          </span>
        )}
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={goNext}
        >
          {nextLabel}
        </button>
      </footer>
    </div>
  );
}
