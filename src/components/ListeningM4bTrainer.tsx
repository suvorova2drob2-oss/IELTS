import { useEffect, useState } from "react";
import {
  checkListenM4b,
  LISTEN_M4B_NEXT,
  LISTEN_M4B_STEPS,
  listeningM4b,
} from "../data/listeningM4b";

const data = listeningM4b;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, LISTEN_M4B_STEPS.length - 1));
}

export function ListeningM4bTrainer({
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
  const [link2a, setLink2a] = useState<string | null>(null);
  const [link2b, setLink2b] = useState<Record<number, string>>({});
  const [pickedLetter, setPickedLetter] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [assess, setAssess] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setShowTips(false);
    setLink2a(null);
    setLink2b({});
    setPickedLetter(null);
    setAnswers({});
    setAssess({});
  }, [restart, initialStep]);

  const used2b = new Set(Object.values(link2b));
  const link2aOk = link2a === data.links.a2a.key;
  const link2bScore = data.links.a2b.items.filter(
    (it) => link2b[it.id] === it.key,
  ).length;
  const examIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
  const examScore = examIds.filter((id) =>
    checkListenM4b(answers[id] ?? "", data.answerKeys[id]),
  ).length;

  const needsCheck = step === 1 || step === 3;
  const score =
    step === 1 ? (link2aOk ? 1 : 0) + link2bScore : examScore;
  const total =
    step === 1 ? 1 + data.links.a2b.items.length : examIds.length;

  const place2b = (id: number) => {
    if (checked) return;
    if (link2b[id]) {
      setLink2b((m) => {
        const n = { ...m };
        delete n[id];
        return n;
      });
      return;
    }
    if (!pickedLetter) return;
    setLink2b((m) => ({ ...m, [id]: pickedLetter }));
    setPickedLetter(null);
  };

  const goPrev = () => {
    if (step === 0) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTips(false);
    setPickedLetter(null);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if ((step === 0 || step === 2) && !showTips) {
      setShowTips(true);
      return;
    }
    if (step === 1 && !checked) {
      // also reveal 2c tip after check
      setChecked(true);
      return;
    }
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= LISTEN_M4B_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTips(false);
    setPickedLetter(null);
    setStep((s) => s + 1);
  };

  const nextLabel =
    (step === 0 || step === 2) && !showTips
      ? "Show tips →"
      : needsCheck && !checked
        ? "Check →"
        : LISTEN_M4B_NEXT[step];

  const Gap = ({ id }: { id: number }) => {
    const val = answers[id] ?? "";
    const ok = checked && checkListenM4b(val, data.answerKeys[id]);
    const bad = checked && !ok;
    return (
      <span
        className={`inline-gap-wrap ${ok ? "inline-gap-wrap--ok" : ""} ${bad ? "inline-gap-wrap--bad" : ""}`}
      >
        <input
          className={`listen-m3b__input${ok ? " listen-m3b__input--ok" : ""}${bad ? " listen-m3b__input--bad" : ""}`}
          value={val}
          placeholder={`${id}`}
          aria-label={`Answer ${id}`}
          disabled={checked}
          onChange={(e) =>
            setAnswers((a) => ({ ...a, [id]: e.target.value }))
          }
        />
        {checked && !ok && (
          <span className="inline-gap-bad"> → {data.answerKeys[id][0]}</span>
        )}
      </span>
    );
  };

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
          {LISTEN_M4B_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
                setShowTips(false);
                setPickedLetter(null);
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
          <div className="listen-m3b__lead-main">
            <h2 className="listen-m3b__h">{data.before.heading}</h2>
            <p className="listen-m3b__instr">
              <span className="write-m2a__badge">{data.before.badge}</span>
              {data.before.instruction}
            </p>
            <ol className="listen-m3b__preview-list">
              {data.before.questions.map((q, i) => (
                <li key={q}>
                  {q}
                  {showTips && (
                    <p className="listen-m3b__tip">→ {data.before.tips[i]}</p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {step === 1 && (
        <section className="listen-m3b__panel">
          <h2 className="listen-m3b__h">{data.links.heading}</h2>
          <p className="listen-m3b__instr">
            <span className="write-m2a__badge">{data.links.a2a.badge}</span>
            {data.links.a2a.instruction}
          </p>
          <div className="listen-m3b__opts">
            {data.links.a2a.options.map((opt) => {
              const sel = link2a === opt.id;
              let state = "";
              if (checked) {
                if (opt.id === data.links.a2a.key) state = "pr-chip--ok";
                else if (sel) state = "pr-chip--bad";
              } else if (sel) state = "pr-chip--picked";
              return (
                <button
                  key={opt.id}
                  type="button"
                  className={`pr-chip listen-m3b__opt ${state}`}
                  disabled={checked}
                  onClick={() => setLink2a(opt.id)}
                >
                  <strong>{opt.id}</strong> {opt.text}
                </button>
              );
            })}
          </div>
          {checked && (
            <p className="listen-m3b__tip">{data.links.a2a.tip}</p>
          )}

          <p className="listen-m3b__instr">
            <span className="write-m2a__badge">{data.links.a2b.badge}</span>
            {data.links.a2b.instruction}
          </p>
          <div className="listen-m3b__bank">
            {data.links.a2b.options.map((opt) => {
              const used = used2b.has(opt.id);
              return (
                <button
                  key={opt.id}
                  type="button"
                  className={`pr-chip ${pickedLetter === opt.id ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used}
                  onClick={() => setPickedLetter(opt.id)}
                  title={opt.text}
                >
                  {opt.id}. {opt.text}
                </button>
              );
            })}
          </div>
          <ol className="listen-m3b__preview-list">
            {data.links.a2b.items.map((it) => {
              const val = link2b[it.id];
              const ok = val === it.key;
              let cls = "review-m2__slot";
              if (val) cls += " review-m2__slot--filled";
              if (pickedLetter && !val) cls += " review-m2__slot--ready";
              if (checked)
                cls += ok ? " review-m2__slot--ok" : " review-m2__slot--bad";
              return (
                <li key={it.id}>
                  <strong>{it.id}.</strong> {it.text}{" "}
                  <button
                    type="button"
                    className={cls}
                    disabled={checked}
                    onClick={() => place2b(it.id)}
                  >
                    {val ?? "—"}
                  </button>
                  {checked && !ok && (
                    <span className="inline-gap-bad"> → {it.key}</span>
                  )}
                </li>
              );
            })}
          </ol>

          <p className="listen-m3b__instr">
            <span className="write-m2a__badge">{data.links.a2c.badge}</span>
            {data.links.a2c.instruction}
          </p>
          {checked && (
            <p className="listen-m3b__tip">{data.links.a2c.tip}</p>
          )}
        </section>
      )}

      {step === 2 && (
        <section className="listen-m3b__panel">
          <h2 className="listen-m3b__h">{data.predict3a.heading}</h2>
          <p className="listen-m3b__instr">
            <span className="write-m2a__badge">{data.predict3a.badge}</span>
            {data.predict3a.instruction}
          </p>
          {showTips && (
            <ul className="listen-m3b__preview-list">
              {data.predict3a.tips.map((t) => (
                <li key={t}>
                  <p className="listen-m3b__tip">→ {t}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {step === 3 && (
        <section className="listen-m3b__panel">
          <h2 className="listen-m3b__h">{data.exam.heading}</h2>
          <p className="write-m2a__expert">{data.exam.strategies}</p>
          <p className="listen-m3b__instr">
            <span className="write-m2a__badge">{data.exam.badge}</span>
            {data.exam.instruction}
          </p>
          <p className="listen-m3b__audio-note">{data.exam.audioNote}</p>
          <div className="listen-m3b__qgrid">
            <article className="listen-m3b__box">
              <h3>{data.exam.table.title}</h3>
              <p className="listen-m3b__limit">{data.exam.table.limit}</p>
              <table className="listen-m3b__table">
                <thead>
                  <tr>
                    {data.exam.table.headers.map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.exam.table.rows.map((row) => (
                    <tr key={row.gift}>
                      <td>{row.gift}</td>
                      {row.cells.map((cell) => (
                        <td key={cell.id}>
                          {cell.before}
                          <Gap id={cell.id} />
                          {cell.after}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
            <article className="listen-m3b__box">
              <h3>{data.exam.notes.title}</h3>
              <p className="listen-m3b__limit">{data.exam.notes.limit}</p>
              {data.exam.notes.items.map((it) => (
                <p key={it.id}>
                  {it.before}
                  <Gap id={it.id} />
                  {it.after}
                </p>
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
            {data.analysis.instruction}
          </p>
          <ul className="write-m2b__checks">
            {data.analysis.checklist.map((item, i) => (
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
          <span className="flow-footer__hint" />
        )}
        <button type="button" className="flow-footer__btn" onClick={goNext}>
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
