import { useEffect, useState } from "react";
import {
  SPEAK_M9A_NEXT,
  SPEAK_M9A_STEPS,
  speakingM9a,
} from "../data/speakingM9a";

const data = speakingM9a;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, SPEAK_M9A_STEPS.length - 1));
}

export function SpeakingM9aTrainer({
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
  const [showTip, setShowTip] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [match, setMatch] = useState<Record<number, string>>({});
  const [match3c, setMatch3c] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setShowTip(false);
    setPicked(null);
    setMatch({});
    setMatch3c({});
  }, [restart, initialStep]);

  const used = new Set(Object.values(match));
  const used3 = new Set(Object.values(match3c));
  const needsCheck = step === 1 || step === 3;

  const place = (
    map: Record<number, string>,
    setMap: React.Dispatch<React.SetStateAction<Record<number, string>>>,
    id: number,
  ) => {
    if (checked) return;
    if (map[id]) {
      setMap((m) => {
        const next = { ...m };
        delete next[id];
        return next;
      });
      return;
    }
    if (!picked) return;
    setMap((m) => ({ ...m, [id]: picked }));
    setPicked(null);
  };

  const goPrev = () => {
    if (step === 0) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTip(false);
    setPicked(null);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if ((step === 0 || step === 2 || step === 4 || step === 5) && !showTip) {
      setShowTip(true);
      return;
    }
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= SPEAK_M9A_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTip(false);
    setPicked(null);
    setStep((s) => s + 1);
  };

  const nextLabel =
    (step === 0 || step === 2 || step === 4 || step === 5) && !showTip
      ? "Show tip →"
      : needsCheck && !checked
        ? "Check →"
        : SPEAK_M9A_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport speak-m3a">
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
          {SPEAK_M9A_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
                setShowTip(false);
              }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.photos1.badge}</span>
            {data.photos1.instruction}
          </p>
          {showTip && <p className="read-m3__tip">{data.photos1.tip}</p>}
        </section>
      )}

      {step === 1 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.match2a.badge}</span>
            {data.match2a.instruction}
          </p>
          <div className="read-m3__bank">
            {data.match2a.bank.map((b) => (
              <button
                key={b.id}
                type="button"
                className={`pr-chip ${picked === b.id ? "pr-chip--picked" : ""} ${used.has(b.id) ? "pr-chip--used" : ""}`}
                disabled={checked || used.has(b.id)}
                onClick={() => setPicked(b.id)}
              >
                {b.id}. {b.text}
              </button>
            ))}
          </div>
          <ul className="read-m3__para-slots listen-m3b__grid">
            {data.match2a.items.map((it) => {
              const val = match[it.id] ?? "";
              const ok = val === it.key;
              return (
                <li key={it.id}>
                  <span>
                    {it.id}. {it.text}{" "}
                    <button
                      type="button"
                      className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                      disabled={checked}
                      onClick={() => place(match, setMatch, it.id)}
                    >
                      {val || "—"}
                    </button>
                    {checked && !ok && (
                      <span className="inline-gap-bad"> → {it.key}</span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 2 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.discuss2b.badge}</span>
            {data.discuss2b.instruction}
          </p>
          <ul className="read-m3__qs">
            {data.discuss2b.topics.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          {showTip && <p className="read-m3__tip">{data.discuss2b.tip}</p>}
        </section>
      )}

      {step === 3 && (
        <section className="read-m3__panel">
          <p className="write-m2a__expert">{data.testStrategies}</p>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.structure3.badge}</span>
            {data.structure3.instruction}
          </p>
          <p className="read-m3__tip">{data.structure3.questionTip}</p>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">
              {data.structure3.match3c.badge}
            </span>
            {data.structure3.match3c.instruction}
          </p>
          <div className="read-m3__bank">
            {data.structure3.match3c.bank.map((b) => (
              <button
                key={b.id}
                type="button"
                className={`pr-chip ${picked === b.id ? "pr-chip--picked" : ""} ${used3.has(b.id) ? "pr-chip--used" : ""}`}
                disabled={checked || used3.has(b.id)}
                onClick={() => setPicked(b.id)}
              >
                {b.id}. {b.text}
              </button>
            ))}
          </div>
          <ul className="read-m3__para-slots listen-m3b__grid">
            {data.structure3.match3c.items.map((it) => {
              const val = match3c[it.id] ?? "";
              const ok = val === it.key;
              return (
                <li key={it.id}>
                  <span>
                    {it.id}. {it.text}{" "}
                    <button
                      type="button"
                      className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                      disabled={checked}
                      onClick={() => place(match3c, setMatch3c, it.id)}
                    >
                      {val || "—"}
                    </button>
                    {checked && !ok && (
                      <span className="inline-gap-bad"> → {it.key}</span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 4 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.part3.badge}</span>
            {data.part3.instruction}
          </p>
          <ol className="read-m3__qs">
            {data.part3.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
          {showTip &&
            data.part3.tips.map((t) => (
              <p key={t} className="read-m3__tip">
                {t}
              </p>
            ))}
        </section>
      )}

      {step === 5 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.assess7.badge}</span>
            {data.assess7.instruction}
          </p>
        </section>
      )}

      <footer className="flow-footer">
        <button type="button" className="btn-secondary" onClick={goPrev}>
          ← Back
        </button>
        <button type="button" className="btn-start" onClick={goNext}>
          {nextLabel}
        </button>
      </footer>
    </div>
  );
}
