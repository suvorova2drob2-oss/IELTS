import { useEffect, useState } from "react";
import {
  checkSpeakM4a,
  SPEAK_M4A_NEXT,
  SPEAK_M4A_STEPS,
  speakingM4a,
} from "../data/speakingM4a";

const data = speakingM4a;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, SPEAK_M4A_STEPS.length - 1));
}

export function SpeakingM4aTrainer({
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
  const [match2a, setMatch2a] = useState<Record<number, string>>({});
  const [answer3a, setAnswer3a] = useState("");
  const [match3c, setMatch3c] = useState<Record<number, string>>({});
  const [gap3d, setGap3d] = useState<Record<number, string>>({});
  const [assess, setAssess] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setShowTip(false);
    setPicked(null);
    setMatch2a({});
    setAnswer3a("");
    setMatch3c({});
    setGap3d({});
    setAssess({});
  }, [restart, initialStep]);

  const used2a = new Set(Object.values(match2a));
  const used3d = new Set(Object.values(gap3d));

  const match2aScore = data.match2a.items.filter(
    (it) => match2a[it.id] === it.key,
  ).length;
  const match3cScore = data.connectors.match3c.items.filter(
    (it) => match3c[it.id] === it.key,
  ).length;
  const gap3dScore = data.connectors.gap3d.items.filter((it) =>
    checkSpeakM4a(gap3d[it.id] ?? "", it.answers),
  ).length;

  const needsCheck = step === 1 || step === 2;
  const score =
    step === 1 ? match2aScore : match3cScore + gap3dScore;
  const total =
    step === 1
      ? data.match2a.items.length
      : data.connectors.match3c.items.length +
        data.connectors.gap3d.items.length;

  const place = (
    map: Record<number, string>,
    setMap: (fn: (m: Record<number, string>) => Record<number, string>) => void,
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
    if (step === 0 && !showTip) {
      setShowTip(true);
      return;
    }
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= SPEAK_M4A_STEPS.length - 1) {
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
        : SPEAK_M4A_NEXT[step];

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
          {SPEAK_M4A_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
                setShowTip(false);
                setPicked(null);
              }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="speak-m3a__panel">
          <h2 className="speak-m3a__h">{data.quote.heading}</h2>
          <p className="speak-m3a__instr">
            <span className="write-m2a__badge">{data.quote.badge}</span>
            {data.quote.instruction}
          </p>
          <blockquote className="speak-m3a__examiner">
            <p>{data.quote.text}</p>
          </blockquote>
          <p className="write-m2a__cue">Discuss with a partner</p>
          {showTip && <p className="speak-m3a__tip">{data.quote.tip}</p>}
        </section>
      )}

      {step === 1 && (
        <section className="speak-m3a__panel">
          <h2 className="speak-m3a__h">{data.match2a.heading}</h2>
          <p className="speak-m3a__instr">
            <span className="write-m2a__badge">{data.match2a.badge}</span>
            {data.match2a.instruction}
          </p>
          <div className="speak-m3a__bank">
            {data.match2a.bank.map((w) => {
              const used = used2a.has(w);
              return (
                <button
                  key={w}
                  type="button"
                  className={`pr-chip ${picked === w ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used}
                  onClick={() => setPicked(w)}
                >
                  {w}
                </button>
              );
            })}
          </div>
          <ol className="speak-m3a__tech">
            {data.match2a.items.map((it) => {
              const val = match2a[it.id];
              const ok = val === it.key;
              let cls = "review-m2__slot";
              if (val) cls += " review-m2__slot--filled";
              if (picked && !val) cls += " review-m2__slot--ready";
              if (checked)
                cls += ok ? " review-m2__slot--ok" : " review-m2__slot--bad";
              return (
                <li key={it.id}>
                  <strong>{it.id}.</strong> {it.text}{" "}
                  <button
                    type="button"
                    className={cls}
                    disabled={checked}
                    onClick={() => place(match2a, setMatch2a, it.id)}
                  >
                    {val ?? "________"}
                  </button>
                  {checked && !ok && (
                    <span className="inline-gap-bad"> → {it.key}</span>
                  )}
                </li>
              );
            })}
          </ol>
          <p className="speak-m3a__instr">
            <span className="write-m2a__badge">{data.write2b.badge}</span>
            {data.write2b.instruction}
          </p>
          <ul className="speak-m3a__tech">
            {data.write2b.suggested.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </section>
      )}

      {step === 2 && (
        <section className="speak-m3a__panel">
          <h2 className="speak-m3a__h">{data.connectors.heading}</h2>
          <p className="speak-m3a__instr">
            <span className="write-m2a__badge">
              {data.connectors.write3a.badge}
            </span>
            {data.connectors.write3a.instruction}
          </p>
          <p className="write-m2a__cue">{data.connectors.write3a.question}</p>
          <textarea
            rows={2}
            value={answer3a}
            placeholder="Your answer…"
            onChange={(e) => setAnswer3a(e.target.value)}
          />
          {checked && (
            <p className="speak-m3a__tip">
              Suggested: {data.connectors.write3a.suggested}
            </p>
          )}
          <p className="speak-m3a__instr">
            <span className="write-m2a__badge">
              {data.connectors.bank3b.badge}
            </span>
            {data.connectors.bank3b.instruction}
          </p>
          <div className="speak-m3a__bank">
            {data.connectors.bank3b.bank.map((w) => (
              <span key={w} className="pr-chip pr-chip--used">
                {w}
              </span>
            ))}
          </div>
          {checked && (
            <p className="speak-m3a__tip">{data.connectors.bank3b.suggested}</p>
          )}

          <p className="speak-m3a__instr">
            <span className="write-m2a__badge">
              {data.connectors.match3c.badge}
            </span>
            {data.connectors.match3c.instruction}
          </p>
          <div className="speak-m3a__bank">
            {data.connectors.match3c.bank.map((w) => (
              <button
                key={w}
                type="button"
                className={`pr-chip ${picked === w ? "pr-chip--picked" : ""}`}
                disabled={checked}
                onClick={() => setPicked(w)}
              >
                {w}
              </button>
            ))}
          </div>
          <ol className="speak-m3a__tech">
            {data.connectors.match3c.items.map((it) => {
              const val = match3c[it.id];
              const ok = val === it.key;
              let cls = "review-m2__slot";
              if (val) cls += " review-m2__slot--filled";
              if (picked && !val) cls += " review-m2__slot--ready";
              if (checked)
                cls += ok ? " review-m2__slot--ok" : " review-m2__slot--bad";
              return (
                <li key={it.id}>
                  <strong>{it.id}.</strong> {it.text}{" "}
                  <button
                    type="button"
                    className={cls}
                    disabled={checked}
                    onClick={() => place(match3c, setMatch3c, it.id)}
                  >
                    {val ?? "________"}
                  </button>
                  {checked && !ok && (
                    <span className="inline-gap-bad"> → {it.key}</span>
                  )}
                </li>
              );
            })}
          </ol>

          <p className="speak-m3a__instr">
            <span className="write-m2a__badge">
              {data.connectors.gap3d.badge}
            </span>
            {data.connectors.gap3d.instruction}
          </p>
          <div className="speak-m3a__bank">
            {data.connectors.gap3d.bank.map((w) => {
              const used = used3d.has(w);
              return (
                <button
                  key={w}
                  type="button"
                  className={`pr-chip ${picked === w ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used}
                  onClick={() => setPicked(w)}
                >
                  {w}
                </button>
              );
            })}
          </div>
          <ol className="speak-m3a__tech">
            {data.connectors.gap3d.items.map((it) => {
              const val = gap3d[it.id];
              const ok = checkSpeakM4a(val ?? "", it.answers);
              let cls = "review-m2__slot";
              if (val) cls += " review-m2__slot--filled";
              if (picked && !val) cls += " review-m2__slot--ready";
              if (checked)
                cls += ok ? " review-m2__slot--ok" : " review-m2__slot--bad";
              return (
                <li key={it.id}>
                  <strong>{it.id}.</strong> {it.before}
                  <button
                    type="button"
                    className={cls}
                    disabled={checked}
                    onClick={() => place(gap3d, setGap3d, it.id)}
                  >
                    {val ?? "________"}
                  </button>
                  {it.after}
                  {checked && !ok && (
                    <span className="inline-gap-bad"> → {it.answers[0]}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {step === 3 && (
        <section className="speak-m3a__panel">
          <h2 className="speak-m3a__h">{data.part3.heading}</h2>
          <p className="write-m2a__expert">{data.part3.strategies}</p>
          <p className="speak-m3a__instr">
            <span className="write-m2a__badge">{data.part3.badge}</span>
            {data.part3.instruction}
          </p>
          <div className="speak-m3a__notes-grid">
            {data.part3.questions.map((q, i) => (
              <article key={q} className="speak-m3a__note-card">
                <p>
                  <strong>{i + 1}.</strong> {q}
                </p>
                <details>
                  <summary>Suggested answer</summary>
                  <p>{data.part3.suggestedAnswers[i]}</p>
                </details>
              </article>
            ))}
          </div>
        </section>
      )}

      {step === 4 && (
        <section className="speak-m3a__panel">
          <h2 className="speak-m3a__h">{data.assess.heading}</h2>
          <p className="speak-m3a__instr">
            <span className="write-m2a__badge">{data.assess.badge}</span>
            {data.assess.instruction}
          </p>
          <ul className="write-m2b__checks">
            {data.assess.items.map((item, i) => (
              <li key={item}>
                <label className="write-m2b__check">
                  <input
                    type="checkbox"
                    checked={!!assess[i]}
                    onChange={() =>
                      setAssess((a) => ({ ...a, [i]: !a[i] }))
                    }
                  />
                  <span>{item}</span>
                </label>
              </li>
            ))}
          </ul>
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
            {step + 1} / {SPEAK_M4A_STEPS.length}
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
