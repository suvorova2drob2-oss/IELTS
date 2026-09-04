import { useEffect, useState } from "react";
import {
  WRITE_M4A_NEXT,
  WRITE_M4A_STEPS,
  writingM4a,
} from "../data/writingM4a";
import { WritingComposePanel } from "./WritingComposePanel";

const data = writingM4a;
const DRAFT_KEY = "ielts-writing-m4a-draft";
const PLAN_KEY = "ielts-writing-m4a-plan";

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, WRITE_M4A_STEPS.length - 1));
}

function load(key: string): string {
  try {
    return sessionStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ");
}

export function WritingM4aTrainer({
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
  const [showJoke, setShowJoke] = useState(false);
  const [paraOrder, setParaOrder] = useState<string[]>([]);
  const [analyse, setAnalyse] = useState<Record<number, string>>({});
  const [plan, setPlan] = useState(() => load(PLAN_KEY));
  const [draft, setDraft] = useState(() => load(DRAFT_KEY));
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setShowJoke(false);
    setParaOrder([]);
    setAnalyse({});
    setPlan("");
    setDraft("");
    setShowModel(false);
    try {
      sessionStorage.removeItem(DRAFT_KEY);
      sessionStorage.removeItem(PLAN_KEY);
    } catch {
      /* ignore */
    }
  }, [restart, initialStep]);

  useEffect(() => {
    try {
      sessionStorage.setItem(DRAFT_KEY, draft);
    } catch {
      /* ignore */
    }
  }, [draft]);

  useEffect(() => {
    try {
      sessionStorage.setItem(PLAN_KEY, plan);
    } catch {
      /* ignore */
    }
  }, [plan]);

  const orderKey = data.order2.key;
  const orderScore = paraOrder.filter((id, i) => id === orderKey[i]).length;
  const orderDone = paraOrder.length === orderKey.length;
  const analyseScore = data.analyse3.items.filter((it) =>
    normalize(analyse[it.id] ?? "").includes(normalize(it.key).slice(0, 20)) ||
    normalize(analyse[it.id] ?? "") === normalize(it.key),
  ).length;

  const needsCheck = step === 1 || step === 2;
  const score = step === 1 ? orderScore : analyseScore;
  const total =
    step === 1 ? orderKey.length : data.analyse3.items.length;

  const placePara = (id: string) => {
    if (checked || paraOrder.includes(id)) return;
    setParaOrder((o) => [...o, id]);
  };

  const goPrev = () => {
    if (step === 0) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowJoke(false);
    setShowModel(false);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (step === 0 && !showJoke) {
      setShowJoke(true);
      return;
    }
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= WRITE_M4A_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowJoke(false);
    setShowModel(false);
    setStep((s) => s + 1);
  };

  const nextLabel =
    step === 0 && !showJoke
      ? "Show joke tip →"
      : needsCheck && !checked
        ? "Check →"
        : WRITE_M4A_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport write-m3a">
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
          {WRITE_M4A_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
                setShowJoke(false);
                setShowModel(false);
              }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="write-m3a__panel">
          <h2 className="write-m3a__h">{data.cartoon.heading}</h2>
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">{data.cartoon.badge}</span>
            {data.cartoon.instruction}
          </p>
          {showJoke && (
            <p className="write-m3a__tip write-m3a__tip--block">
              {data.cartoon.jokeTip}
            </p>
          )}
          <ol className="write-m3a__qs">
            {data.cartoon.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
          <p className="write-m2a__cue">Discuss in small groups</p>
        </section>
      )}

      {step === 1 && (
        <section className="write-m3a__panel">
          <h2 className="write-m3a__h">{data.order2.heading}</h2>
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">{data.order2.badge}</span>
            {data.order2.instruction}
          </p>
          <p className="write-m3a__task-title">{data.order2.title}</p>
          <p className="write-m3a__hint">
            Click a paragraph letter to add it to the sequence. Click a filled
            slot to undo.
          </p>
          <div className="write-m3a__order-grid">
            <ol className="write-m3a__seq">
              {orderKey.map((_, i) => {
                const id = paraOrder[i];
                let cls = "write-m3a__slot";
                if (checked && id) {
                  cls +=
                    id === orderKey[i]
                      ? " write-m3a__slot--ok"
                      : " write-m3a__slot--bad";
                } else if (id) cls += " write-m3a__slot--filled";
                return (
                  <li key={i}>
                    <span className="write-m3a__slot-n">{i + 1}</span>
                    <button
                      type="button"
                      className={cls}
                      disabled={checked}
                      onClick={() => {
                        if (checked || !id) return;
                        setParaOrder((o) => o.filter((_, j) => j !== i));
                      }}
                    >
                      {id ?? "—"}
                    </button>
                    {checked && id && id !== orderKey[i] && (
                      <span className="write-m3a__tip">→ {orderKey[i]}</span>
                    )}
                  </li>
                );
              })}
            </ol>
            <ul className="write-m3a__sent-list">
              {data.order2.paragraphs.map((p) => {
                const used = paraOrder.includes(p.id);
                return (
                  <li key={p.id}>
                    <button
                      type="button"
                      className={`pr-chip write-m3a__letter ${used ? "pr-chip--used" : ""}`}
                      disabled={checked || used || orderDone}
                      onClick={() => placePara(p.id)}
                    >
                      {p.id}
                    </button>
                    <span>{p.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          {checked && orderScore < orderKey.length && (
            <p className="write-m3a__tip write-m3a__tip--block">
              Order: {orderKey.join(" → ")}
            </p>
          )}
        </section>
      )}

      {step === 2 && (
        <section className="write-m3a__panel">
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">{data.analyse3.badge}</span>
            {data.analyse3.instruction}
          </p>
          <ol className="write-m3a__qs">
            {data.analyse3.items.map((it) => {
              const val = analyse[it.id] ?? "";
              const ok =
                normalize(val) === normalize(it.key) ||
                (val.length > 8 &&
                  normalize(val).includes(normalize(it.key).slice(0, 24)));
              return (
                <li key={it.id}>
                  <p>
                    <strong>{it.id}.</strong> {it.q}
                  </p>
                  <span
                    className={`inline-gap-wrap ${checked && ok ? "inline-gap-wrap--ok" : ""} ${checked && !ok ? "inline-gap-wrap--bad" : ""}`}
                  >
                    <input
                      className={`inline-gap-input ${checked && ok ? "inline-gap-input--ok" : ""} ${checked && !ok ? "inline-gap-input--bad" : ""}`}
                      value={val}
                      disabled={checked}
                      onChange={(e) =>
                        setAnalyse((a) => ({ ...a, [it.id]: e.target.value }))
                      }
                    />
                    {checked && !ok && (
                      <span className="inline-gap-bad"> → {it.key}</span>
                    )}
                  </span>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {step === 3 && (
        <section className="write-m3a__panel write-m3a__panel--write">
          <h2 className="write-m3a__h">{data.write4.heading}</h2>
          <p className="write-m2a__expert">{data.expertWriting}</p>
          <p className="write-m2a__expert">{data.testStrategies}</p>
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">{data.write4.planA.badge}</span>
            {data.write4.planA.instruction}
          </p>
          <p className="write-m3a__task-title">{data.write4.title}</p>
          <textarea
            rows={3}
            value={plan}
            placeholder="Plan: opinion · main ideas · support…"
            onChange={(e) => setPlan(e.target.value)}
          />
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">{data.write4.writeB.badge}</span>
            {data.write4.writeB.instruction}
          </p>
          <WritingComposePanel
            draft={draft}
            onDraftChange={setDraft}
            minWords={250}
            placeholder="Write your essay…"
            rows={10}
            modelAnswer={data.write4.modelAnswer}
            modelTitle={data.write4.modelLabel}
            modelOpenLabel={data.write4.modelLabel}
            showModel={showModel}
            onToggleModel={() => setShowModel((v) => !v)}
          />
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">{data.write4.peerC.badge}</span>
            {data.write4.peerC.instruction}
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
          <span className="flow-footer__step">
            {step + 1} / {WRITE_M4A_STEPS.length}
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
