import { useEffect, useState } from "react";
import {
  checkSpeakM3b,
  isSpeakGap,
  SPEAK_M3B_NEXT,
  SPEAK_M3B_STEPS,
  speakingM3b,
  type SpeakGapBit,
} from "../data/speakingM3b";

const data = speakingM3b;
const GAP_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, SPEAK_M3B_STEPS.length - 1));
}

function gapKey(parts: SpeakGapBit[], gap: number): string {
  const bit = parts.find((p) => isSpeakGap(p) && p.gap === gap);
  return bit && isSpeakGap(bit) ? bit.key : "";
}

export function SpeakingM3bTrainer({
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
  const [picked, setPicked] = useState<string | null>(null);
  const [gaps, setGaps] = useState<Record<number, string>>({});
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [assess, setAssess] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setPicked(null);
    setGaps({});
    setNotes({});
    setAssess({});
  }, [restart, initialStep]);

  const allParts = [...data.gapFill.parts, ...data.gapFill.parts2];
  const used = new Set(Object.values(gaps));
  const gapScore = GAP_IDS.filter((g) => {
    const key = gapKey(allParts, g);
    return checkSpeakM3b(gaps[g] ?? "", [key]);
  }).length;

  const needsCheck = step === 1;

  const placeGap = (gap: number) => {
    if (checked) return;
    if (gaps[gap]) {
      setGaps((g) => {
        const next = { ...g };
        delete next[gap];
        return next;
      });
      return;
    }
    if (!picked) return;
    setGaps((g) => ({ ...g, [gap]: picked }));
    setPicked(null);
  };

  const renderParts = (parts: SpeakGapBit[]) =>
    parts.map((part, i) => {
      if (!isSpeakGap(part)) {
        return <span key={i}>{part.text}</span>;
      }
      const val = gaps[part.gap];
      const ok = checkSpeakM3b(val ?? "", [part.key]);
      let cls = "review-m2__slot";
      if (val) cls += " review-m2__slot--filled";
      if (picked && !val) cls += " review-m2__slot--ready";
      if (checked) cls += ok ? " review-m2__slot--ok" : " review-m2__slot--bad";
      return (
        <button
          key={i}
          type="button"
          className={cls}
          disabled={checked}
          onClick={() => placeGap(part.gap)}
        >
          <strong>{part.gap}</strong>
          {val ? ` ${val}` : " ______"}
        </button>
      );
    });

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
    if (step >= SPEAK_M3B_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setStep((s) => s + 1);
  };

  const nextLabel =
    needsCheck && !checked ? "Check →" : SPEAK_M3B_NEXT[step];

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
          {SPEAK_M3B_STEPS.map((label, i) => (
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
        <section className="speak-m3a__lead">
          <figure className="speak-m3a__hero">
            <img src={data.image} alt={data.imageAlt} />
          </figure>
          <div className="speak-m3a__quiz">
            <p className="speak-m3a__instr">
              <span className="write-m2a__badge">{data.leadIn.badge}</span>
              {data.leadIn.instruction}
            </p>
            <p className="write-m2a__cue">Discuss with a partner</p>
          </div>
        </section>
      )}

      {step === 1 && (
        <section className="speak-m3a__panel">
          <h2 className="speak-m3a__h">{data.gapFill.heading}</h2>
          <p className="speak-m3a__instr">
            <span className="write-m2a__badge">{data.gapFill.badge}</span>
            {data.gapFill.instruction}
          </p>
          <div className="speak-m3a__bank">
            {data.gapFill.bank.map((w) => {
              const isUsed = used.has(w);
              return (
                <button
                  key={w}
                  type="button"
                  className={`pr-chip ${picked === w ? "pr-chip--picked" : ""} ${isUsed ? "pr-chip--used" : ""}`}
                  disabled={checked || isUsed}
                  onClick={() => setPicked(w)}
                >
                  {w}
                </button>
              );
            })}
          </div>
          <article className="speak-m3a__examiner">
            <p>{renderParts(data.gapFill.parts)}</p>
            <p>{renderParts(data.gapFill.parts2)}</p>
          </article>
          {checked && gapScore < GAP_IDS.length && (
            <p className="speak-m3a__tip">
              Key:{" "}
              {GAP_IDS.map((g) => `${g} ${gapKey(allParts, g)}`).join(" · ")}
            </p>
          )}
          <p className="speak-m3a__instr">{data.gapFill.followUp}</p>
        </section>
      )}

      {step === 2 && (
        <section className="speak-m3a__panel">
          <p className="speak-m3a__instr">
            <span className="write-m2a__badge">{data.part3a.badge}</span>
            {data.part3a.instruction}
          </p>
          <ol className="speak-m3a__tech">
            {data.part3a.list1.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
          <p className="write-m2a__cue">Discuss with a partner</p>
        </section>
      )}

      {step === 3 && (
        <section className="speak-m3a__panel">
          <p className="speak-m3a__instr">
            <span className="write-m2a__badge">{data.part3b.badge}</span>
            {data.part3b.instruction}
          </p>
          <p className="write-m2a__cue">List 1 (examiner / candidate)</p>
          <div className="speak-m3a__notes-grid">
            {data.part3a.list1.map((q, i) => (
              <article key={q} className="speak-m3a__note-card">
                <p>
                  <strong>{i + 1}.</strong> {q}
                </p>
              </article>
            ))}
          </div>
          <p className="write-m2a__cue">List 2 — your notes</p>
          <div className="speak-m3a__notes-grid">
            {data.part3b.list2.map((q, i) => (
              <article key={q} className="speak-m3a__note-card">
                <p>
                  <strong>{i + 1}.</strong> {q}
                </p>
                <label>
                  Notes
                  <textarea
                    rows={3}
                    value={notes[i] ?? ""}
                    onChange={(e) =>
                      setNotes((n) => ({ ...n, [i]: e.target.value }))
                    }
                  />
                </label>
              </article>
            ))}
          </div>
        </section>
      )}

      {step === 4 && (
        <section className="speak-m3a__panel">
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
            <span className="flow-footer__ok">✓ {gapScore}</span>
            <span className="flow-footer__bad">
              ✗ {GAP_IDS.length - gapScore}
            </span>
          </span>
        ) : (
          <span className="flow-footer__step">
            {step + 1} / {SPEAK_M3B_STEPS.length}
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
