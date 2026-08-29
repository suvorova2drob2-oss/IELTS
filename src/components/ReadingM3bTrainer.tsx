import { useEffect, useState } from "react";
import {
  READ_M3B_NEXT,
  READ_M3B_STEPS,
  readingM3b,
} from "../data/readingM3b";

const data = readingM3b;
const PARAS = ["A", "B", "C", "D", "E"] as const;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, READ_M3B_STEPS.length - 1));
}

export function ReadingM3bTrainer({
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
  const [pickedHead, setPickedHead] = useState<string | null>(null);
  const [paraHeads, setParaHeads] = useState<Record<string, string>>({});
  const [mcPick, setMcPick] = useState<string[]>([]);

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setPickedHead(null);
    setParaHeads({});
    setMcPick([]);
  }, [restart, initialStep]);

  const headScore = PARAS.filter(
    (p) => paraHeads[p] === data.exam.paragraphKeys[p],
  ).length;
  const mcScore = mcPick.filter((k) =>
    (data.exam.mcKeys as readonly string[]).includes(k),
  ).length;
  const needsCheck = step === 1;
  const score = headScore + mcScore;
  const total = 7;
  const usedHeads = new Set(Object.values(paraHeads));

  const placeHead = (para: string) => {
    if (checked) return;
    if (paraHeads[para]) {
      setParaHeads((h) => {
        const next = { ...h };
        delete next[para];
        return next;
      });
      return;
    }
    if (!pickedHead) return;
    setParaHeads((h) => ({ ...h, [para]: pickedHead }));
    setPickedHead(null);
  };

  const toggleMc = (id: string) => {
    if (checked) return;
    setMcPick((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  };

  const goPrev = () => {
    if (step === 0) {
      onBack?.();
      return;
    }
    setChecked(false);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= READ_M3B_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setStep((s) => s + 1);
  };

  const nextLabel =
    needsCheck && !checked ? "Check →" : READ_M3B_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport read-m3">
      <div className="reading-chrome">
        {onBack && (
          <button
            type="button"
            className="back-link reading-chrome__back"
            onClick={onBack}
          >
            ← Модуль
          </button>
        )}
        <span className="badge reading-chrome__badge">
          {data.sectionTitle} · {data.bookPages}
        </span>
        <div className="learn-step-tabs">
          {READ_M3B_STEPS.map((label, i) => (
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

      {step === 0 && (
        <section className="read-m3__panel">
          <h2 className="read-m3__h">{data.beforeYouRead.heading}</h2>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.beforeYouRead.badge}</span>
            {data.beforeYouRead.instruction}
          </p>
          <ol className="read-m3__qs">
            {data.beforeYouRead.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
          <p className="write-m2a__cue">Discuss with a partner</p>
        </section>
      )}

      {step === 1 && (
        <section className="read-m3__split read-m3__split--exam">
          <article className="read-m3__passage">
            <header className="read-m3__hero read-m3__hero--compact">
              <div>
                <h2>{data.title}</h2>
                <p>{data.subtitle}</p>
              </div>
            </header>
            {data.passage.map((p) => (
              <p key={p.id}>
                <strong className="read-m3__para-id">{p.id}</strong> {p.text}
              </p>
            ))}
          </article>
          <aside className="read-m3__side read-m3__side--exam">
            <h2 className="read-m3__h">{data.exam.heading}</h2>
            <p className="write-m2a__expert">{data.exam.strategies}</p>
            <p className="read-m3__instr">
              <span className="write-m2a__badge">{data.exam.badge}</span>
              Questions 1–5
            </p>
            <p className="read-m3__hint">{data.exam.headingsInstr}</p>
            <div className="read-m3__bank">
              {data.headings.map((h) => {
                const used = usedHeads.has(h.id);
                return (
                  <button
                    key={h.id}
                    type="button"
                    className={`pr-chip ${pickedHead === h.id ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                    disabled={checked || used}
                    onClick={() => setPickedHead(h.id)}
                    title={h.text}
                  >
                    {h.id}
                  </button>
                );
              })}
            </div>
            <ul className="read-m3__head-full">
              {data.headings.map((h) => (
                <li key={h.id}>
                  <strong>{h.id}</strong> {h.text}
                </li>
              ))}
            </ul>
            <ul className="read-m3__para-slots">
              {PARAS.map((p, i) => {
                const val = paraHeads[p];
                const ok = val === data.exam.paragraphKeys[p];
                let cls = "read-m3__slot";
                if (val) cls += " read-m3__slot--filled";
                if (pickedHead && !val) cls += " read-m3__slot--ready";
                if (checked)
                  cls += ok ? " read-m3__slot--ok" : " read-m3__slot--bad";
                return (
                  <li key={p}>
                    <span>
                      {i + 1}. Paragraph {p}
                    </span>
                    <button
                      type="button"
                      className={cls}
                      disabled={checked}
                      onClick={() => placeHead(p)}
                    >
                      {val ?? "—"}
                    </button>
                    {checked && !ok && (
                      <span className="inline-gap-bad">
                        → {data.exam.paragraphKeys[p]}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>

            <p className="read-m3__instr read-m3__instr--mt">
              Questions 6–7
            </p>
            <p className="read-m3__hint">{data.exam.mcInstr}</p>
            <ul className="read-m3__mc">
              {data.exam.mcOptions.map((opt) => {
                const on = mcPick.includes(opt.id);
                const isKey = (data.exam.mcKeys as readonly string[]).includes(
                  opt.id,
                );
                let state = "";
                if (checked) {
                  if (isKey) state = "pr-chip--ok";
                  else if (on) state = "pr-chip--bad";
                } else if (on) state = "pr-chip--picked";
                return (
                  <li key={opt.id}>
                    <button
                      type="button"
                      className={`read-m3__opt ${state}`}
                      disabled={checked}
                      onClick={() => toggleMc(opt.id)}
                    >
                      <strong>{opt.id}</strong>
                      <span>{opt.text}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>
        </section>
      )}

      {step === 2 && (
        <section className="read-m3__panel">
          <h2 className="read-m3__h">{data.analysis.heading}</h2>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.analysis.badge}</span>
            {data.analysis.instruction}
          </p>
          <ul className="read-m3__qs">
            {data.analysis.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </section>
      )}

      {step === 3 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.discussion.badge}</span>
            {data.discussion.instruction}
          </p>
          <ol className="read-m3__qs">
            {data.discussion.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
        </section>
      )}

      <div
        className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}
      >
        <button type="button" className="flow-footer__btn" onClick={goPrev}>
          ← Назад
        </button>
        {checked && needsCheck ? (
          <span className="flow-footer__result">
            <span className="flow-footer__ok">✓ {score}</span>
            <span className="flow-footer__bad">✗ {total - score}</span>
          </span>
        ) : (
          <span className="flow-footer__step">
            {step + 1} / {READ_M3B_STEPS.length}
          </span>
        )}
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={goNext}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
