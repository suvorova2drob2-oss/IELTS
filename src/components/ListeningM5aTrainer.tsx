import { useEffect, useState } from "react";
import {
  LISTEN_M5A_NEXT,
  LISTEN_M5A_STEPS,
  listeningM5a,
} from "../data/listeningM5a";

const data = listeningM5a;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, LISTEN_M5A_STEPS.length - 1));
}

export function ListeningM5aTrainer({
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
  const [showTip, setShowTip] = useState(false);
  void showTip;
  void setShowTip;

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setPicked(null);
    setAnswers({});
    setDraft("");
    setShowModel(false);
    setShowTip(false);
  }, [restart, initialStep]);

  const used = new Set(Object.values(answers));
  void used;
  const needsCheck = step === 3;

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
    if (step === 0) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTip(false);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= LISTEN_M5A_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTip(false);
    setShowModel(false);
    setAnswers({});
    setPicked(null);
    setStep((s) => s + 1);
  };

  const nextLabel = needsCheck && !checked ? "Check →" : LISTEN_M5A_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport listen-m3b">
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
          {LISTEN_M5A_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => { setStep(i); setChecked(false); setAnswers({}); }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      {data.noAudioNote && <p className="listen-m3b__note">{data.noAudioNote}</p>}
      {step === 0 && (
        <section className="listen-m3b__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.before.badge}</span>{data.before.instruction}</p>
          <p className="read-m3__tip">{data.before.tip}</p>
        </section>
      )}
      {step === 1 && (
        <section className="listen-m3b__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.agreement.badge}</span>{data.agreement.instruction}</p>
          <ul className="read-m3__para-slots">
            {data.agreement.items.map((it) => (
              <li key={it.id}><strong>{it.id}.</strong> {it.text}<p className="read-m3__tip">{it.key}</p></li>
            ))}
          </ul>
        </section>
      )}
      {step === 2 && (
        <section className="listen-m3b__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.prep.badge}</span>{data.prep.instruction}</p>
          <p className="read-m3__tip">{data.prep.tip}</p>
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.prep.paraphrase.badge}</span>{data.prep.paraphrase.instruction}</p>
          <ul className="read-m3__qs">{data.prep.paraphrase.items.map((it) => <li key={it.id}>{it.id}. {it.text}</li>)}</ul>
        </section>
      )}
      {step === 3 && (
        <section className="listen-m3b__panel">
          <p className="write-m2a__expert">{data.exam.strategies}</p>
          <p className="listen-m3b__note">{data.exam.audioNote}</p>
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.exam.badge}</span>{data.exam.instruction}</p>
          <ul className="read-m3__opts">{data.exam.options.map((o) => <li key={o.id}><strong>{o.id}</strong> {o.text}</li>)}</ul>
          <div className="read-m3__bank">
            {data.exam.options.map((o) => (
              <button key={o.id} type="button" className={`pr-chip ${picked === o.id ? "pr-chip--picked" : ""}`}
                disabled={checked} onClick={() => setPicked(o.id)}>{o.id}</button>
            ))}
          </div>
          <ul className="read-m3__para-slots listen-m3b__grid">
            {data.exam.items.map((it) => {
              const val = answers[it.id] ?? "";
              const ok = val === it.key;
              return (
                <li key={it.id}>
                  <span>{it.id}. {it.text}</span>
                  <button type="button" className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                    disabled={checked} onClick={() => placeWord(it.id)}>{val || "—"}</button>
                  {checked && !ok && <span className="inline-gap-bad"> → {it.key}</span>}
                </li>
              );
            })}
          </ul>
        </section>
      )}
      {step === 4 && (
        <section className="listen-m3b__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.discussion.badge}</span>{data.discussion.instruction}</p>
          <ol className="read-m3__qs">{data.discussion.questions.map((q) => <li key={q}>{q}</li>)}</ol>
        </section>
      )}

      <div className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}>
        <button type="button" className="flow-footer__btn" onClick={goPrev}>← Назад</button>
        <span className="flow-footer__step">{step + 1} / {LISTEN_M5A_STEPS.length}</span>
        <button type="button" className="flow-footer__btn flow-footer__btn--primary" onClick={goNext}>
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
