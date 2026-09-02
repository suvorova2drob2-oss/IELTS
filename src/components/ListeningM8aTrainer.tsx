import { useEffect, useState } from "react";
import {
  checkListenM8a,
  LISTEN_M8A_NEXT,
  LISTEN_M8A_STEPS,
  listeningM8a,
} from "../data/listeningM8a";
import { ExpertDiscussPanel } from "./ExpertDiscussPanel";

const data = listeningM8a;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, LISTEN_M8A_STEPS.length - 1));
}

export function ListeningM8aTrainer({
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
  const [mcq, setMcq] = useState<Record<number, string>>({});
  const [tone, setTone] = useState<Record<number, string>>({});
  const [gaps, setGaps] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setShowTip(false);
    setPicked(null);
    setMcq({});
    setTone({});
    setGaps({});
  }, [restart, initialStep]);

  const usedTone = new Set(Object.values(tone));
  const usedGaps = new Set(Object.values(gaps));
  const needsCheck = step === 1 || step === 2 || step === 3 || step === 4;

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
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (step === 0 && !showTip) {
      setShowTip(true);
      return;
    }
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= LISTEN_M8A_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTip(false);
    setPicked(null);
    setStep((s) => s + 1);
  };

  const nextLabel =
    step === 0 && !showTip
      ? "Show tip →"
      : needsCheck && !checked
        ? "Check →"
        : LISTEN_M8A_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport listen-m3b">
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
          {LISTEN_M8A_STEPS.map((label, i) => (
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

      <p className="write-m2a__cue">{data.noAudioNote}</p>

      {step === 0 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.before.badge}</span>
            {data.before.instruction}
          </p>
          {showTip && <p className="read-m3__tip">{data.before.tip}</p>}
        </section>
      )}

      {step === 1 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.attitude2a.badge}</span>
            {data.attitude2a.instruction}
          </p>
          <ul className="read-m3__para-slots listen-m3b__grid">
            {data.attitude2a.items.map((it) => (
              <li key={it.id}>
                <p>
                  {it.id}. {it.text}
                </p>
                <div className="read-m3__bank">
                  {it.options.map((opt) => {
                    const on = mcq[it.id] === opt.id;
                    const ok = opt.id === it.key;
                    let cls = "";
                    if (checked) {
                      if (ok) cls = "pr-chip--ok";
                      else if (on) cls = "pr-chip--bad";
                    } else if (on) cls = "pr-chip--picked";
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        className={`pr-chip ${cls}`}
                        disabled={checked}
                        onClick={() =>
                          setMcq((m) => ({ ...m, [it.id]: opt.id }))
                        }
                      >
                        {opt.id}. {opt.text}
                      </button>
                    );
                  })}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {step === 2 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.tone2b.badge}</span>
            {data.tone2b.instruction}
          </p>
          <div className="read-m3__bank">
            {data.tone2b.bank.map((w) => (
              <button
                key={w}
                type="button"
                className={`pr-chip ${picked === w ? "pr-chip--picked" : ""} ${usedTone.has(w) ? "pr-chip--used" : ""}`}
                disabled={checked || usedTone.has(w)}
                onClick={() => setPicked(w)}
              >
                {w}
              </button>
            ))}
          </div>
          <ul className="read-m3__para-slots">
            {data.tone2b.items.map((it) => {
              const val = tone[it.id] ?? "";
              const ok = val === it.key;
              return (
                <li key={it.id}>
                  {it.id}. {it.text}{" "}
                  <button
                    type="button"
                    className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                    disabled={checked}
                    onClick={() => place(tone, setTone, it.id)}
                  >
                    {val || "—"}
                  </button>
                  {checked && !ok && (
                    <span className="inline-gap-bad"> → {it.key}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 3 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.prep3.badge}</span>
            {data.prep3.instruction}
          </p>
          <ul className="read-m3__para-slots listen-m3b__grid">
            {data.prep3.items.map((it) => (
              <li key={it.id}>
                <p>
                  {it.id}. {it.text}
                </p>
                <div className="read-m3__bank">
                  {it.options.map((opt) => {
                    const on = mcq[it.id] === opt.id;
                    const ok = opt.id === it.key;
                    let cls = "";
                    if (checked) {
                      if (ok) cls = "pr-chip--ok";
                      else if (on) cls = "pr-chip--bad";
                    } else if (on) cls = "pr-chip--picked";
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        className={`pr-chip ${cls}`}
                        disabled={checked}
                        onClick={() =>
                          setMcq((m) => ({ ...m, [it.id]: opt.id }))
                        }
                      >
                        {opt.id}. {opt.text}
                      </button>
                    );
                  })}
                </div>
              </li>
            ))}
          </ul>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.prep3.gaps3b.badge}</span>
            {data.prep3.gaps3b.instruction}
          </p>
          <div className="read-m3__bank">
            {data.prep3.gaps3b.gaps.flatMap((g) => g.answers).filter((v, i, a) => a.indexOf(v) === i).map((w) => (
              <button
                key={w}
                type="button"
                className={`pr-chip ${picked === w ? "pr-chip--picked" : ""} ${usedGaps.has(w) ? "pr-chip--used" : ""}`}
                disabled={checked || usedGaps.has(w)}
                onClick={() => setPicked(w)}
              >
                {w}
              </button>
            ))}
          </div>
          <ul className="read-m3__para-slots">
            {data.prep3.gaps3b.gaps.map((g) => {
              const val = gaps[g.id] ?? "";
              const ok = checkListenM8a(val, g.answers);
              return (
                <li key={g.id}>
                  {g.id}. {g.before}
                  <button
                    type="button"
                    className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                    disabled={checked}
                    onClick={() => place(gaps, setGaps, g.id)}
                  >
                    {val || "—"}
                  </button>
                  {g.after}
                  {checked && !ok && (
                    <span className="inline-gap-bad"> → {g.answers[0]}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 4 && (
        <section className="read-m3__panel">
          <p className="write-m2a__expert">{data.exam4.strategies}</p>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.exam4.badge}</span>
            {data.exam4.instruction}
          </p>
          <div className="read-m3__bank">
            {data.exam4.gaps.flatMap((g) => g.answers).map((w) => (
              <button
                key={w}
                type="button"
                className={`pr-chip ${picked === w ? "pr-chip--picked" : ""} ${usedGaps.has(w) ? "pr-chip--used" : ""}`}
                disabled={checked || usedGaps.has(w)}
                onClick={() => setPicked(w)}
              >
                {w}
              </button>
            ))}
          </div>
          <ul className="read-m3__para-slots">
            {data.exam4.gaps.map((g) => {
              const val = gaps[g.id] ?? "";
              const ok = checkListenM8a(val, g.answers);
              return (
                <li key={g.id}>
                  {g.id}. {g.before}
                  <button
                    type="button"
                    className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                    disabled={checked}
                    onClick={() => place(gaps, setGaps, g.id)}
                  >
                    {val || "—"}
                  </button>
                  {g.after}
                  {checked && !ok && (
                    <span className="inline-gap-bad"> → {g.answers[0]}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 5 && (
        <ExpertDiscussPanel
          key="discussion"
          badge={data.discussion.badge}
          instruction={data.discussion.instruction}
          suggestedTitle={data.discussion.suggestedTitle}
          suggestedAnswer={data.discussion.suggestedAnswer}
        />
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
