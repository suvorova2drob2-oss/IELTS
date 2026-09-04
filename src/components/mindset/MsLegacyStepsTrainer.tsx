import { chipExhausted, gapChipExhausted } from "./bankChipUse";
/* Shared renderer for Mindset U2–U4 step arrays (intro/mcq/match/gaps/discuss/sort/exam). */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { WritingComposePanel } from "../WritingComposePanel";

function norm(s: string): string {
  return s.toLowerCase().replace(/[()]/g, "").replace(/\s+/g, " ").trim();
}

function matches(val: string, key: string, alts?: string[]): boolean {
  const pool = [key, ...(alts ?? [])].map(norm);
  return pool.includes(norm(val));
}

export type MsLegacyUnitData = {
  id: string;
  bookPages: string;
  sectionTitle: string;
  unitGoals: string[];
  steps: any[];
};

export function MsLegacyStepsTrainer({
  data,
  stepLabels,
  nextLabels,
  onBack,
  restart,
  initialStep,
}: {
  data: MsLegacyUnitData;
  stepLabels: readonly string[];
  nextLabels: readonly string[];
  onBack?: () => void;
  restart?: boolean;
  initialStep?: number;
}) {
  function clampStep(n: number | undefined): number {
    if (n == null || Number.isNaN(n)) return 0;
    return Math.max(0, Math.min(n, stepLabels.length - 1));
  }

  const [step, setStep] = useState(() => clampStep(initialStep));
  const [checked, setChecked] = useState(false);
  const [mc, setMc] = useState<Record<string, string>>({});
  const [gaps, setGaps] = useState<Record<string, string>>({});
  const [picked, setPicked] = useState<string | null>(null);
  const [match, setMatch] = useState<Record<string, string>>({});
  const [pickedMatch, setPickedMatch] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [showSample, setShowSample] = useState(false);

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setMc({});
    setGaps({});
    setPicked(null);
    setMatch({});
    setPickedMatch(null);
    setDraft("");
    setShowSample(false);
  }, [restart, initialStep]);

  const s = data.steps[step] as any;
  const kind = s?.kind as string | undefined;

  const needsCheck =
    kind !== "intro" && kind !== "discuss" && kind !== "exam" && Boolean(kind);

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


  const scoreFor = (): { score: number; total: number } => {
    if (!s) return { score: 0, total: 0 };
    if (kind === "mcq") {
      const items = s.items ?? [];
      return {
        score: items.filter((it: any) => mc[it.id] === it.key).length,
        total: items.length,
      };
    }
    if (kind === "match" || kind === "sort") {
      const items = s.items ?? [];
      return {
        score: items.filter((it: any) => match[it.id] === it.key).length,
        total: items.length,
      };
    }
    if (kind === "gaps") {
      const items = s.items ?? [];
      return {
        score: items.filter((it: any) =>
          matches(gaps[it.id] ?? "", it.key, it.alts),
        ).length,
        total: items.length,
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
    if (step >= stepLabels.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setPicked(null);
    setPickedMatch(null);
    setShowSample(false);
    setStep((x) => x + 1);
  };

  const nextLabel =
    needsCheck && !checked ? "Check →" : (nextLabels[step] ?? "Next →");

  const bank = (s?.bank ?? []) as string[];
  const items = (s?.items ?? []) as any[];

  return (
    <div className="app-shell reading-flow reading-flow--viewport read-m3">
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
          {stepLabels.map((label, i) => (
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

      {kind === "intro" && (
        <section className="read-m3__panel">
          <div className="ms-unit-goals">
          <p className="ms-unit-goals__title">In this unit you will learn how to</p>
          <ul className="ms-unit-goals__list">
            {data.unitGoals.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
          <p className="read-m3__instr">
            {s.badge && (
              <span className="write-m2a__badge">{s.badge}</span>
            )}
            {s.instruction}
          </p>
          {s.passage && (
            <article className="read-m3__passage read-m3__passage--solo">
              <p style={{ whiteSpace: "pre-wrap" }}>{s.passage}</p>
            </article>
          )}
          {s.bullets && (
            <ul className="read-m3__qs">
              {s.bullets.map((b: string) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
          {s.tip && <p className="write-m2a__cue">{s.tip}</p>}
        </section>
      )}

      {kind === "mcq" && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            {s.badge && (
              <span className="write-m2a__badge">{s.badge}</span>
            )}
            {s.instruction}
          </p>
          {s.passage && (
            <article className="read-m3__passage read-m3__passage--solo">
              <p style={{ whiteSpace: "pre-wrap" }}>{s.passage}</p>
            </article>
          )}
          <div className="listen-m3b__list">
            {items.map((it) => (
              <div key={it.id} className="listen-m3b__row">
                <p className="read-m3__instr">
                  <strong>{it.id}.</strong> {it.stem}
                </p>
                <ul className="read-m3__opts">
                  {(it.options ?? []).map((opt: any) => {
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
          {s.tip && checked && (
            <p className="write-m2a__cue">{s.tip}</p>
          )}
        </section>
      )}

      {(kind === "match" || kind === "sort") && (
        <section
          className={
            s.passage
              ? "read-m3__split read-m3__split--exam"
              : "read-m3__panel"
          }
          style={s.passage ? undefined : { overflow: "auto" }}
        >
          {s.passage && (
            <article className="read-m3__passage">
              <header className="read-m3__passage-label">
                <h2>Reading passage</h2>
                <p>Use this text to answer the questions on the right.</p>
              </header>
              <p style={{ whiteSpace: "pre-wrap", margin: 0 }}>{s.passage}</p>
            </article>
          )}
          <aside
            className={
              s.passage ? "read-m3__side read-m3__side--exam" : undefined
            }
            style={s.passage ? undefined : { display: "contents" }}
          >
            <p className="read-m3__instr">
              {s.badge && (
                <span className="write-m2a__badge">{s.badge}</span>
              )}
              {s.instruction}
            </p>
            <div className="pr-chip-bank" style={{ marginBottom: 8 }}>
              {bank.map((b) => {
                const used = chipExhausted(b, items.map((it) => it.key), Object.values(match));
                return (
                  <button
                    key={b}
                    type="button"
                    className={`pr-chip ${pickedMatch === b ? "pr-chip--on" : ""} ${used ? "pr-chip--used" : ""}`}
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
                const ok = val === it.key;
                return (
                  <li key={it.id}>
                    <strong>{it.id}.</strong> {it.stem}{" "}
                    <button
                      type="button"
                      className={`inline-gap ${checked ? (ok ? "inline-gap-ok" : "inline-gap-bad") : ""}`}
                      disabled={checked}
                      onClick={() => placeMatch(it.id)}
                    >
                      {val ?? "___"}
                    </button>
                    {checked && !ok && (
                      <span className="inline-gap-bad"> → {it.key}</span>
                    )}
                  </li>
                );
              })}
            </ul>
            {s.tip && checked && (
              <p className="write-m2a__cue">{s.tip}</p>
            )}
          </aside>
        </section>
      )}

      {kind === "gaps" && (
        <section
          className={
            s.passage
              ? "read-m3__split read-m3__split--exam"
              : "read-m3__panel"
          }
          style={s.passage ? undefined : { overflow: "auto" }}
        >
          {s.passage && (
            <article className="read-m3__passage">
              <header className="read-m3__passage-label">
                <h2>Reading passage</h2>
                <p>Use this text to answer the questions on the right.</p>
              </header>
              <p style={{ whiteSpace: "pre-wrap", margin: 0 }}>{s.passage}</p>
            </article>
          )}
          <aside
            className={
              s.passage ? "read-m3__side read-m3__side--exam" : undefined
            }
            style={s.passage ? undefined : { display: "contents" }}
          >
            <p className="read-m3__instr">
              {s.badge && (
                <span className="write-m2a__badge">{s.badge}</span>
              )}
              {s.instruction}
            </p>
            <div className="pr-chip-bank" style={{ marginBottom: 8 }}>
              {bank.map((b) => {
                const used = gapChipExhausted(
                  b,
                  items,
                  Object.values(gaps),
                  norm,
                );
                return (
                  <button
                    key={b}
                    type="button"
                    className={`pr-chip ${picked === b ? "pr-chip--on" : ""} ${used ? "pr-chip--used" : ""}`}
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
                const ok = matches(gaps[it.id] ?? "", it.key, it.alts);
                return (
                  <li key={it.id}>
                    <strong>{it.id}.</strong> {it.stem}{" "}
                    <button
                      type="button"
                      className={`inline-gap ${checked ? (ok ? "inline-gap-ok" : "inline-gap-bad") : ""}`}
                      disabled={checked}
                      onClick={() => placeGap(it.id)}
                    >
                      {gaps[it.id] ?? "___"}
                    </button>
                    {checked && !ok && (
                      <span className="inline-gap-bad"> → {it.key}</span>
                    )}
                  </li>
                );
              })}
            </ul>
            {s.tip && checked && (
              <p className="write-m2a__cue">{s.tip}</p>
            )}
          </aside>
        </section>
      )}

      {kind === "discuss" && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            {s.badge && (
              <span className="write-m2a__badge">{s.badge}</span>
            )}
            {s.instruction}
          </p>
          {s.heading && <h3 className="read-m3__h">{s.heading}</h3>}
          {s.prompts && (
            <ol className="read-m3__qs">
              {s.prompts.map((p: string) => (
                <li key={p}>{p}</li>
              ))}
            </ol>
          )}
          {s.bullets && (
            <ul className="read-m3__qs">
              {s.bullets.map((b: string) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
          {s.tip && <p className="write-m2a__cue">{s.tip}</p>}
        </section>
      )}

      {kind === "exam" && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            {s.badge && (
              <span className="write-m2a__badge">{s.badge}</span>
            )}
            {s.instruction}
          </p>
          {s.prompt && (
            <article className="read-m3__passage read-m3__passage--solo">
              <p style={{ whiteSpace: "pre-wrap" }}>{s.prompt}</p>
            </article>
          )}
          <WritingComposePanel
            draft={draft}
            onDraftChange={setDraft}
            minWords={s.minWords ?? 150}
            placeholder="Write your answer here…"
            rows={10}
            modelAnswer={s.sample}
            modelTitle="Sample answer"
            modelOpenLabel="Show sample"
            modelCloseLabel="Hide sample"
            showModel={showSample}
            onToggleModel={() => setShowSample((v) => !v)}
            textareaClassName="write-m2a__area write-compose__ta"
          />
        </section>
      )}

      <footer
        className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}
      >
        <button type="button" className="flow-footer__btn" onClick={goPrev}>
          ← Back
        </button>
        <span className="flow-footer__step">
          {step + 1} / {stepLabels.length}
        </span>
        {checked && needsCheck && (
          <span className="flow-footer__result">
            <span
              className={
                score === total ? "flow-footer__ok" : "flow-footer__bad"
              }
            >
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
