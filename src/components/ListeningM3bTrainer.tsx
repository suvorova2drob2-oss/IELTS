import { useEffect, useState } from "react";
import {
  checkListenM3b,
  LISTEN_M3B_NEXT,
  LISTEN_M3B_STEPS,
  listeningM3b,
} from "../data/listeningM3b";

const data = listeningM3b;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, LISTEN_M3B_STEPS.length - 1));
}

function normalizePair(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

function examAnswerOk(
  id: number,
  value: string,
  answers: Record<number, string>,
): boolean {
  if ([6, 7, 9, 10].includes(id)) {
    const pair = data.pairKeys.find((p) => p.ids.includes(id));
    if (!pair) return false;
    const vals = pair.ids.map((i) => normalizePair(answers[i] ?? ""));
    return (
      vals.every(Boolean) &&
      pair.answers.every((a) => vals.includes(normalizePair(a))) &&
      new Set(vals).size === pair.answers.length
    );
  }
  return checkListenM3b(value, data.answerKeys[id]);
}

export function ListeningM3bTrainer({
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
  const [showTips, setShowTips] = useState(false);
  const [mistake, setMistake] = useState<string | null>(null);
  const [effects, setEffects] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [reasons, setReasons] = useState<string[]>([]);

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setShowTips(false);
    setMistake(null);
    setEffects([]);
    setAnswers({});
    setReasons([]);
  }, [restart, initialStep]);

  const mistakeOk = mistake === data.wrongAnswers.mistakeKey;
  const effectsOk =
    effects.length === 2 &&
    data.wrongAnswers.correctEffects.every((e) => effects.includes(e));
  const needsCheck = step === 1 || step === 3;

  const singles = [1, 2, 3, 4, 5, 8] as const;
  const singleScore = singles.filter((id) =>
    checkListenM3b(answers[id] ?? "", data.answerKeys[id]),
  ).length;
  const pairScore = data.pairKeys.filter((pair) => {
    const vals = pair.ids.map((id) => normalizePair(answers[id] ?? ""));
    return (
      vals.every(Boolean) &&
      pair.answers.every((a) => vals.includes(normalizePair(a))) &&
      new Set(vals).size === pair.answers.length
    );
  }).length;
  const examScore = singleScore + pairScore * 2;
  const examTotal = 10;

  const score =
    step === 1
      ? (mistakeOk ? 1 : 0) + (effectsOk ? 1 : 0)
      : step === 3
        ? examScore
        : 0;
  const total = step === 1 ? 2 : step === 3 ? examTotal : 0;

  const toggleEffect = (word: string) => {
    if (checked) return;
    setEffects((prev) => {
      if (prev.includes(word)) return prev.filter((w) => w !== word);
      if (prev.length >= 2) return prev;
      return [...prev, word];
    });
  };

  const toggleReason = (r: string) => {
    setReasons((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r],
    );
  };

  const goPrev = () => {
    if (step === 0) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTips(false);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (step === 2 && !showTips) {
      setShowTips(true);
      return;
    }
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= LISTEN_M3B_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTips(false);
    setStep((s) => s + 1);
  };

  const nextLabel =
    step === 2 && !showTips
      ? "Show tips →"
      : needsCheck && !checked
        ? "Check →"
        : LISTEN_M3B_NEXT[step];

  const Gap = ({ id }: { id: number }) => {
    const val = answers[id] ?? "";
    const ok = checked && examAnswerOk(id, val, answers);
    const bad = checked && val && !ok;
    return (
      <input
        className={`listen-m3b__input${ok ? " listen-m3b__input--ok" : ""}${bad ? " listen-m3b__input--bad" : ""}`}
        value={val}
        placeholder={`${id}`}
        aria-label={`Answer ${id}`}
        onChange={(e) =>
          setAnswers((a) => ({ ...a, [id]: e.target.value }))
        }
      />
    );
  };

  const effectBank = [
    "tiredness",
    "insomnia",
    "feeling sick",
    "weight gain",
    "headaches",
  ];

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
          {LISTEN_M3B_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
                setShowTips(false);
              }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      <p className="listen-m3b__banner">{data.noAudioNote}</p>

      {step === 0 && (
        <section className="listen-m3b__panel listen-m3b__panel--lead">
          <figure className="listen-m3b__hero">
            <img src={data.before.image} alt={data.before.imageAlt} />
          </figure>
          <div className="listen-m3b__lead-main">
            <h2 className="listen-m3b__h">{data.before.heading}</h2>
            <p className="listen-m3b__instr">
              <span className="write-m2a__badge">{data.before.badge}</span>
              {data.before.instruction}
            </p>
            <div className="listen-m3b__bank">
              {data.before.treatments.map((t) => (
                <span key={t} className="listen-m3b__tag">
                  {t}
                </span>
              ))}
            </div>
            <p className="listen-m3b__cue">Discuss with a partner</p>
          </div>
        </section>
      )}

      {step === 1 && (
        <section className="listen-m3b__panel listen-m3b__panel--wrong">
          <h2 className="listen-m3b__h">{data.wrongAnswers.heading}</h2>
          <p className="listen-m3b__instr">
            <span className="write-m2a__badge">{data.wrongAnswers.badge}</span>
            {data.wrongAnswers.instruction}
          </p>
          <blockquote className="listen-m3b__excerpt">
            {data.wrongAnswers.excerpt}
          </blockquote>
          <div className="listen-m3b__student-box">
            <p className="listen-m3b__student-q">
              {data.wrongAnswers.question}
            </p>
            <ol className="listen-m3b__student-ans">
              {data.wrongAnswers.studentAnswers.map((a, i) => (
                <li key={i}>
                  <span className="listen-m3b__hand">{a}</span>
                </li>
              ))}
            </ol>
          </div>
          <p className="listen-m3b__subq">
            What is wrong with the student's second answer?
          </p>
          <div className="listen-m3b__opts">
            {data.wrongAnswers.mistakeOptions.map((opt) => {
              const sel = mistake === opt.id;
              let state = "";
              if (checked) {
                if (opt.id === data.wrongAnswers.mistakeKey)
                  state = "pr-chip--ok";
                else if (sel) state = "pr-chip--bad";
              } else if (sel) state = "pr-chip--picked";
              return (
                <button
                  key={opt.id}
                  type="button"
                  className={`pr-chip listen-m3b__opt ${state}`}
                  disabled={checked}
                  onClick={() => setMistake(opt.id)}
                >
                  {opt.text}
                </button>
              );
            })}
          </div>
          <p className="listen-m3b__subq">
            Choose the TWO correct side effects of cutting out sugar:
          </p>
          <div className="listen-m3b__bank">
            {effectBank.map((w) => {
              const on = effects.includes(w);
              const isKey = data.wrongAnswers.correctEffects.includes(w);
              let state = "";
              if (checked) {
                if (isKey) state = "pr-chip--ok";
                else if (on) state = "pr-chip--bad";
              } else if (on) state = "pr-chip--picked";
              return (
                <button
                  key={w}
                  type="button"
                  className={`pr-chip ${state}`}
                  disabled={checked}
                  onClick={() => toggleEffect(w)}
                >
                  {w}
                </button>
              );
            })}
          </div>
          {checked && (
            <p className="listen-m3b__tip">{data.wrongAnswers.explanation}</p>
          )}
        </section>
      )}

      {step === 2 && (
        <section className="listen-m3b__panel">
          <h2 className="listen-m3b__h">{data.preview.heading}</h2>
          <p className="write-m2a__expert">{data.preview.strategies}</p>
          <p className="listen-m3b__instr">
            <span className="write-m2a__badge">{data.preview.badge}</span>
            {data.preview.instruction}
          </p>
          <ol className="listen-m3b__preview-list">
            {data.preview.prompts.map((p, i) => (
              <li key={p}>
                <strong>{i + 1}.</strong> {p}
                {showTips && (
                  <p className="listen-m3b__tip">→ {data.preview.tips[i]}</p>
                )}
              </li>
            ))}
          </ol>
          <div className="listen-m3b__qgrid">
            <article className="listen-m3b__box">
              <h3>Questions 1–5</h3>
              <p className="listen-m3b__limit">{data.q1to5.limit}</p>
              {data.q1to5.items.map((it) => (
                <p key={it.id}>
                  <strong>{it.id}</strong> {it.before}________{it.after}
                </p>
              ))}
            </article>
            <article className="listen-m3b__box">
              <h3>Questions 6–10</h3>
              <p className="listen-m3b__limit">{data.q6to10.limit}</p>
              {data.q6to10.groups.map((g) => (
                <div key={g.prompt} className="listen-m3b__group">
                  <p>{g.prompt}</p>
                  {g.ids.map((id) => (
                    <p key={id}>
                      <strong>{id}</strong> ________
                    </p>
                  ))}
                </div>
              ))}
            </article>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="listen-m3b__panel">
          <h2 className="listen-m3b__h">{data.preview.heading}</h2>
          <p className="write-m2a__expert">{data.preview.strategies}</p>
          <p className="listen-m3b__instr">
            <span className="write-m2a__badge">{data.exam.badge}</span>
            {data.exam.instruction}
          </p>
          <p className="listen-m3b__audio-note">{data.exam.audioNote}</p>
          <div className="listen-m3b__qgrid">
            <article className="listen-m3b__box">
              <h3>Questions 1–5</h3>
              <p className="listen-m3b__limit">{data.q1to5.limit}</p>
              {data.q1to5.items.map((it) => (
                <p key={it.id}>
                  <strong>{it.id}</strong> {it.before}
                  <Gap id={it.id} />
                  {it.after}
                </p>
              ))}
            </article>
            <article className="listen-m3b__box">
              <h3>Questions 6–10</h3>
              <p className="listen-m3b__limit">{data.q6to10.limit}</p>
              {data.q6to10.groups.map((g) => (
                <div key={g.prompt} className="listen-m3b__group">
                  <p>{g.prompt}</p>
                  {g.ids.map((id) => (
                    <p key={id}>
                      <strong>{id}</strong> <Gap id={id} />
                    </p>
                  ))}
                </div>
              ))}
            </article>
          </div>
        </section>
      )}

      {step === 4 && (
        <section className="listen-m3b__panel">
          <h2 className="listen-m3b__h">{data.analysis.heading}</h2>
          <p className="listen-m3b__instr">
            <span className="write-m2a__badge">{data.analysis.badge}</span>
            {data.analysis.a}
          </p>
          <p className="listen-m3b__instr">
            <span className="write-m2a__badge">{data.analysis.b.badge}</span>
            {data.analysis.b.instruction}
          </p>
          <ul className="listen-m3b__reasons">
            {data.analysis.b.reasons.map((r) => (
              <li key={r}>
                <button
                  type="button"
                  className={`pr-chip ${reasons.includes(r) ? "pr-chip--picked" : ""}`}
                  onClick={() => toggleReason(r)}
                >
                  {r}
                </button>
              </li>
            ))}
          </ul>
          <p className="listen-m3b__cue">
            Compare your exam answers with script 3.6 on page 204.
          </p>
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
          <span className="flow-footer__hint" />
        )}
        <button type="button" className="flow-footer__btn" onClick={goNext}>
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
