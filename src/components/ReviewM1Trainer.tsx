import { useEffect, useState } from "react";
import {
  REVIEW_M1_STEPS,
  checkReviewGap,
  reviewM1,
} from "../data/reviewM1";

const LETTERS = ["A", "B", "C"] as const;
const PARTS = ["A", "B", "C", "D"] as const;

function ReviewGraph({
  kind,
  highlight,
}: {
  kind: "match" | "write";
  highlight?: string;
}) {
  const W = 520;
  const H = 168;
  const pad = { t: 14, r: 14, b: 26, l: 14 };
  const y = (t: number) => pad.t + (1 - t) * (H - pad.t - pad.b);
  const x = (t: number) => pad.l + t * (W - pad.l - pad.r);
  const matchSegs = [
    { id: "A", d: `M ${x(0)} ${y(0.18)} L ${x(0.25)} ${y(0.9)}` },
    { id: "B", d: `M ${x(0.25)} ${y(0.9)} L ${x(0.5)} ${y(0.34)}` },
    { id: "C", d: `M ${x(0.5)} ${y(0.34)} L ${x(0.75)} ${y(0.34)}` },
    { id: "D", d: `M ${x(0.75)} ${y(0.34)} L ${x(1)} ${y(0.12)}` },
  ];
  const writeSegs = [
    { id: "A", d: `M ${x(0)} ${y(0.9)} L ${x(0.25)} ${y(0.16)}` },
    {
      id: "B",
      d: `M ${x(0.25)} ${y(0.16)} L ${x(0.36)} ${y(0.16)} L ${x(0.5)} ${y(0.48)}`,
    },
    { id: "C", d: `M ${x(0.5)} ${y(0.48)} L ${x(0.75)} ${y(0.48)}` },
    { id: "D", d: `M ${x(0.75)} ${y(0.48)} L ${x(1)} ${y(0.92)}` },
  ];
  const segs = kind === "match" ? matchSegs : writeSegs;
  const labels = [
    { id: "A", at: 0.125 },
    { id: "B", at: 0.375 },
    { id: "C", at: 0.625 },
    { id: "D", at: 0.875 },
  ];

  return (
    <svg
      className="review-graph"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Line graph with four labelled parts A to D"
    >
      <line
        x1={pad.l}
        x2={W - pad.r}
        y1={H - pad.b}
        y2={H - pad.b}
        className="pw-graph__grid"
      />
      <line
        x1={pad.l}
        x2={pad.l}
        y1={pad.t}
        y2={H - pad.b}
        className="pw-graph__grid"
      />
      {[0.25, 0.5, 0.75].map((t) => (
        <line
          key={t}
          x1={x(t)}
          x2={x(t)}
          y1={pad.t}
          y2={H - pad.b}
          className="pw-graph__grid"
        />
      ))}
      {segs.map((s) => (
        <path
          key={s.id}
          d={s.d}
          fill="none"
          stroke={highlight === s.id ? "#f0c75e" : "#e08a3c"}
          strokeWidth={highlight === s.id ? 3.6 : 2.6}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      ))}
      {labels.map((l) => (
        <text
          key={l.id}
          x={x(l.at)}
          y={H - 6}
          className="pw-graph__tick pw-graph__tick--x"
        >
          {l.id}
        </text>
      ))}
    </svg>
  );
}

function WordFormText({
  values,
  onChange,
  checked,
}: {
  values: Record<number, string>;
  onChange: (id: number, v: string) => void;
  checked: boolean;
}) {
  const parts = reviewM1.wordForm.text.split(/(\{\{\d\}\})/g);
  return (
    <p className="review-wf__text">
      {parts.map((part, i) => {
        const m = part.match(/\{\{(\d)\}\}/);
        if (!m) return part;
        const id = Number(m[1]);
        const val = values[id] ?? "";
        const answers = reviewM1.wordForm.gaps[id];
        const ok = checked && checkReviewGap(val, answers);
        const bad = checked && !ok;
        return (
          <span
            key={`${id}-${i}`}
            className={`inline-gap-wrap ${ok ? "inline-gap-wrap--ok" : ""} ${bad ? "inline-gap-wrap--bad" : ""}`}
          >
            <span className="gap-num">{id}</span>
            <input
              className={`inline-gap-input ${ok ? "inline-gap-input--ok" : ""} ${bad ? "inline-gap-input--bad" : ""}`}
              value={val}
              disabled={checked}
              onChange={(e) => onChange(id, e.target.value)}
            />
            {bad && (
              <span className="inline-gap-bad"> → {answers[0]}</span>
            )}
          </span>
        );
      })}
    </p>
  );
}

export function ReviewM1Trainer({
  onBack,
  initialStep,
}: {
  onBack?: () => void;
  restart?: boolean;
  initialStep?: number;
}) {
  const [step, setStep] = useState(() =>
    initialStep != null && initialStep >= 0 && initialStep < 4
      ? initialStep
      : 0,
  );
  const [checked, setChecked] = useState(false);
  const [closest, setClosest] = useState<Record<number, number>>({});
  const [verbs, setVerbs] = useState<Record<string, string>>({});
  const [hoverPart, setHoverPart] = useState<string | undefined>();
  const [forms, setForms] = useState<Record<number, string>>({});
  const [describe, setDescribe] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialStep != null && initialStep >= 0 && initialStep < 4) {
      setStep(initialStep);
      setChecked(false);
    }
  }, [initialStep]);

  const closestScore = reviewM1.closest.items.filter(
    (it) => closest[it.id] === it.key,
  ).length;
  const verbScore = reviewM1.graph.verbs.filter(
    (v) => verbs[v.id] === v.key,
  ).length;
  const formScore = Object.entries(reviewM1.wordForm.gaps).filter(([id, ans]) =>
    checkReviewGap(forms[Number(id)] ?? "", ans),
  ).length;

  const describeScore = reviewM1.describe.samples.filter((s) =>
    (describe[s.part] ?? "").trim(),
  ).length;

  const score =
    step === 0
      ? closestScore
      : step === 1
        ? verbScore
        : step === 2
          ? describeScore
          : formScore;
  const total =
    step === 0
      ? reviewM1.closest.items.length
      : step === 1
        ? reviewM1.graph.verbs.length
        : step === 2
          ? reviewM1.describe.samples.length
          : Object.keys(reviewM1.wordForm.gaps).length;

  const goNext = () => {
    if (!checked) {
      setChecked(true);
      return;
    }
    if (step >= 3) {
      onBack?.();
      return;
    }
    setChecked(false);
    setStep((s) => s + 1);
  };

  return (
    <div className="app-shell reading-flow reading-flow--viewport review-flow">
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
          Review · {reviewM1.bookPages}
        </span>
      </div>

      <p className="flow-progress__label writing-flow__step">
        Step {step + 1}/4: <strong>{REVIEW_M1_STEPS[step]}</strong>
      </p>

      {step === 0 && (
        <div className="review-flow__quiz">
          <p className="language-flow__instruction">
            {reviewM1.closest.instruction}
          </p>
          <ol className="review-closest">
            {reviewM1.closest.items.map((it) => {
              const chosen = closest[it.id];
              const bad = checked && chosen !== it.key;
              return (
                <li key={it.id} className="review-closest__item">
                  <p>
                    {it.id}. {it.before}
                    <u>{it.word}</u>
                    {it.after}
                  </p>
                  <div className="writing-flow__opts">
                    {it.options.map((opt, oi) => (
                      <button
                        key={opt}
                        type="button"
                        className={[
                          chosen === oi ? "active" : "",
                          checked && oi === it.key
                            ? "writing-flow__opt--ok"
                            : "",
                          checked && chosen === oi && bad
                            ? "writing-flow__opt--bad"
                            : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        disabled={checked}
                        onClick={() =>
                          setClosest((x) => ({ ...x, [it.id]: oi }))
                        }
                      >
                        {LETTERS[oi]} {opt}
                      </button>
                    ))}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      )}

      {step === 1 && (
        <div className="review-flow__graph-step">
          <p className="language-flow__instruction">
            {reviewM1.graph.instruction}
          </p>
          <ReviewGraph kind="match" highlight={hoverPart} />
          <ul className="review-verbs">
            {reviewM1.graph.verbs.map((v) => {
              const chosen = verbs[v.id] ?? "";
              const bad = checked && chosen !== v.key;
              return (
                <li key={v.id}>
                  <span>{v.id}</span>
                  <div className="writing-flow__opts">
                    {PARTS.map((p) => (
                      <button
                        key={p}
                        type="button"
                        className={[
                          chosen === p ? "active" : "",
                          checked && p === v.key ? "writing-flow__opt--ok" : "",
                          checked && chosen === p && bad
                            ? "writing-flow__opt--bad"
                            : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        disabled={checked}
                        onMouseEnter={() => setHoverPart(p)}
                        onMouseLeave={() => setHoverPart(undefined)}
                        onClick={() =>
                          setVerbs((x) => ({ ...x, [v.id]: p }))
                        }
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {step === 2 && (
        <div className="review-describe">
          <p className="language-flow__instruction">
            {reviewM1.describe.instruction}
          </p>
          <div className="review-describe__split">
            <ReviewGraph kind="write" />
            <ol className="review-describe__lines">
              {reviewM1.describe.samples.map((s) => (
                <li key={s.part}>
                  <label>
                    <strong>{s.part}</strong>
                    <input
                      value={describe[s.part] ?? ""}
                      disabled={checked}
                      placeholder={`Describe section ${s.part}…`}
                      onChange={(e) =>
                        setDescribe((x) => ({
                          ...x,
                          [s.part]: e.target.value,
                        }))
                      }
                    />
                  </label>
                  {checked && <p className="line-hint">{s.text}</p>}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="review-wf">
          <p className="language-flow__instruction">
            {reviewM1.wordForm.instruction}
          </p>
          <p className="review-wf__bank">
            {reviewM1.wordForm.bank.map((w) => (
              <span key={w}>{w}</span>
            ))}
          </p>
          <article className="review-wf__box">
            <h3>{reviewM1.wordForm.title}</h3>
            <WordFormText
              values={forms}
              checked={checked}
              onChange={(id, v) => setForms((x) => ({ ...x, [id]: v }))}
            />
          </article>
        </div>
      )}

      <footer
        className={`flow-footer ${checked ? "flow-footer--checked" : ""}`}
      >
        <button
          type="button"
          className="flow-footer__btn"
          onClick={() => {
            if (step === 0) {
              onBack?.();
              return;
            }
            setChecked(false);
            setStep((s) => s - 1);
          }}
        >
          ← Back
        </button>
        <span className="flow-footer__step">{REVIEW_M1_STEPS[step]}</span>
        {checked && (
          <span className="flow-footer__result">
            <span className="flow-footer__ok">{score}</span>
            {" / "}
            {total}
          </span>
        )}
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={goNext}
        >
          {!checked
            ? "Check answers →"
            : step >= 3
              ? "← К модулю"
              : `Continue → ${REVIEW_M1_STEPS[step + 1]}`}
        </button>
      </footer>
    </div>
  );
}
