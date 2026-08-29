import { useEffect, useState } from "react";
import {
  LANG_M5A_NEXT,
  LANG_M5A_STEPS,
  languageM5a,
} from "../data/languageM5a";

const data = languageM5a;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, LANG_M5A_STEPS.length - 1));
}

export function LanguageM5aTrainer({
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
  const [answers, setAnswers] = useState<Record<number | string, string>>({});
  const [draft, setDraft] = useState("");
  void draft;
  void setDraft;
  const [showModel, setShowModel] = useState(false);
  void showModel;
  void setShowModel;

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setPicked(null);
    setAnswers({});
    setDraft("");
    setShowModel(false);
  }, [restart, initialStep]);

  const used = new Set(Object.values(answers));
  void used;
  const needsCheck = step === 3 || step === 4;

  const placeWord = (id: number | string) => {
    if (checked) return;
    if (answers[id]) {
      setAnswers((m) => {
        const next = { ...m };
        delete next[id];
        return next;
      });
      return;
    }
    if (!picked) return;
    setAnswers((m) => ({ ...m, [id]: picked }));
    setPicked(null);
  };

  const goPrev = () => {
    if (step === 0) { onBack?.(); return; }
    setChecked(false);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (needsCheck && !checked) { setChecked(true); return; }
    if (step >= LANG_M5A_STEPS.length - 1) { onBack?.(); return; }
    setChecked(false);
    setShowModel(false);
    setAnswers({});
    setPicked(null);
    setStep((s) => s + 1);
  };

  const nextLabel = needsCheck && !checked ? "Check →" : LANG_M5A_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport lang-m3b">
      <div className="reading-chrome">
        {onBack && (
          <button type="button" className="back-link reading-chrome__back" onClick={onBack}>
            ← Модуль
          </button>
        )}
        <span className="badge reading-chrome__badge">
          {data.sectionTitle} · {data.bookPages}
        </span>
        <div className="learn-step-tabs">
          {LANG_M5A_STEPS.map((label, i) => (
            <button key={label} type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => { setStep(i); setChecked(false); setAnswers({}); }}>
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      <p className="write-m2a__expert">{data.grammarRef}</p>
      {step === 0 && (
        <section className="lang-m3b__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.texts1a.badge}</span>{data.texts1a.instruction}</p>
          {data.texts1a.texts.map((t, i) => <p key={i} className="read-m3__hint">{t}</p>)}
        </section>
      )}
      {step === 1 && (
        <section className="lang-m3b__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.rules1b.badge}</span>{data.rules1b.instruction}</p>
          <ul className="read-m3__para-slots">{data.rules1b.items.map((it) => (
            <li key={it.id}><strong>{it.id}.</strong> {it.q}<p className="read-m3__tip">{it.tip}</p></li>
          ))}</ul>
        </section>
      )}
      {step === 2 && (
        <section className="lang-m3b__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.verbs2.badge}</span>{data.verbs2.instruction}</p>
          <p className="read-m3__tip">{data.verbs2.tip}</p>
        </section>
      )}
      {step === 3 && (
        <section className="lang-m3b__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.structures5a.badge}</span>
            {data.structures5a.instruction}
          </p>
          <div className="listen-m3b__qgrid">
            <article className="listen-m3b__box">
              <ul className="read-m3__opts">
                {data.structures5a.structures.map((s) => (
                  <li key={s.id}>
                    <strong>{s.id}</strong> {s.text}
                  </li>
                ))}
              </ul>
              <div className="read-m3__bank">
                {data.structures5a.structures.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`pr-chip ${picked === String(s.id) ? "pr-chip--picked" : ""}`}
                    disabled={checked}
                    onClick={() => setPicked(String(s.id))}
                  >
                    {s.id}
                  </button>
                ))}
              </div>
            </article>
            <article className="listen-m3b__box">
              <ul className="read-m3__para-slots">
                {data.structures5a.examples.map((ex) => {
                  const val = answers[ex.id] ?? "";
                  const ok = val === ex.key;
                  return (
                    <li key={ex.id}>
                      <span>
                        <strong>{ex.id}.</strong> {ex.text}
                      </span>
                      <button
                        type="button"
                        className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                        disabled={checked}
                        onClick={() => placeWord(ex.id)}
                      >
                        {val || "—"}
                      </button>
                      {checked && !ok && (
                        <span className="inline-gap-bad"> → {ex.key}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </article>
          </div>
        </section>
      )}
      {step === 4 && (
        <section className="lang-m3b__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.complete5b.badge}</span>{data.complete5b.instruction}</p>
          <div className="read-m3__bank">{data.complete5b.bank.map((bw) => (
            <button key={bw} type="button" className={`pr-chip ${picked === bw ? "pr-chip--picked" : ""}`} disabled={checked} onClick={() => setPicked(bw)}>{bw}</button>
          ))}</div>
          <ul className="read-m3__para-slots">{data.complete5b.items.map((it) => {
            const val = answers[it.id] ?? "";
            const ok = it.answers.some((a) => a.toLowerCase() === val.toLowerCase());
            return (
              <li key={it.id}><span>{it.id}. {it.before}
                <button type="button" className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                  disabled={checked} onClick={() => placeWord(it.id)}>{val || "—"}</button>
                {it.after}{checked && !ok && <span className="inline-gap-bad"> → {it.answers[0]}</span>}
              </span></li>
            );
          })}</ul>
        </section>
      )}
      {step === 5 && (
        <section className="lang-m3b__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.rewrite.badge}</span>{data.rewrite.instruction}</p>
          <ul className="read-m3__para-slots">{data.rewrite.items.map((it) => (
            <li key={it.id}><strong>{it.id}.</strong> {it.stem}<p className="read-m3__tip">{it.model}</p></li>
          ))}</ul>
        </section>
      )}

      <div className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}>
        <button type="button" className="flow-footer__btn" onClick={goPrev}>← Назад</button>
        <span className="flow-footer__step">{step + 1} / {LANG_M5A_STEPS.length}</span>
        <button type="button" className="flow-footer__btn flow-footer__btn--primary" onClick={goNext}>
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
