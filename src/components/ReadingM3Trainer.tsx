import { useEffect, useState } from "react";
import {
  READ_M3_NEXT,
  READ_M3_STEPS,
  readingM3,
} from "../data/readingM3";
import { ExpertDiscussPanel } from "./ExpertDiscussPanel";

const data = readingM3;
const PARAS = ["A", "B", "C", "D"] as const;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, READ_M3_STEPS.length - 1));
}

export function ReadingM3Trainer({
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
  const [summary, setSummary] = useState<string | null>(null);
  const [heading2b, setHeading2b] = useState<string | null>(null);
  const [pickedHead, setPickedHead] = useState<string | null>(null);
  const [paraHeads, setParaHeads] = useState<Record<string, string>>({});
  const [mcPick, setMcPick] = useState<string[]>([]);
  const [strat, setStrat] = useState<Record<number, string>>({});
  const [useful, setUseful] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setSummary(null);
    setHeading2b(null);
    setPickedHead(null);
    setParaHeads({});
    setMcPick([]);
    setStrat({});
    setUseful({});
  }, [restart, initialStep]);

  const headScore = PARAS.filter(
    (p) => paraHeads[p] === data.exam.paragraphKeys[p],
  ).length;
  const mcOk =
    mcPick.length === 2 &&
    data.exam.mcKeys.every((k) => mcPick.includes(k));
  const mcScore = mcOk ? 2 : mcPick.filter((k) =>
    (data.exam.mcKeys as readonly string[]).includes(k),
  ).length;
  const stratScore = data.analysis.items.filter(
    (it) => strat[it.id] === it.key,
  ).length;

  const needsCheck = step === 1 || step === 2 || step === 3 || step === 4;

  const placeHead = (para: string) => {
    if (checked) return;
    if (paraHeads[para]) {
      setParaHeads((h) => {
        const next = { ...h };
        delete next[para];
        return next;
      });
      return;
    }
    if (!pickedHead) return;
    setParaHeads((h) => ({ ...h, [para]: pickedHead }));
    setPickedHead(null);
  };

  const toggleMc = (id: string) => {
    if (checked) return;
    setMcPick((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  };

  const usedHeads = new Set(Object.values(paraHeads));

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
    if (step >= READ_M3_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setStep((s) => s + 1);
  };

  const score =
    step === 1
      ? summary === data.mainIdea.key
        ? 1
        : 0
      : step === 2
        ? heading2b === data.matchHeading.key
          ? 1
          : 0
        : step === 3
          ? headScore + mcScore
          : step === 4
            ? stratScore
            : 0;
  const total =
    step === 1
      ? 1
      : step === 2
        ? 1
        : step === 3
          ? 6
          : step === 4
            ? data.analysis.items.length
            : 0;

  const nextLabel =
    needsCheck && !checked ? "Check →" : READ_M3_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport read-m3">
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
          {READ_M3_STEPS.map((label, i) => (
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
        <section className="read-m3__panel">
          <h2 className="read-m3__h">{data.beforeYouRead.heading}</h2>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.beforeYouRead.badge}</span>
            {data.beforeYouRead.instruction}
          </p>
          <ol className="read-m3__qs">
            {data.beforeYouRead.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
          <p className="write-m2a__cue">Discuss with a partner</p>
        </section>
      )}

      {step === 1 && (
        <section className="read-m3__split">
          <article className="read-m3__passage read-m3__passage--solo">
            <header className="read-m3__hero">
              <img src={data.banner} alt="" />
              <div>
                <h2>{data.title}</h2>
                <p>{data.subtitle}</p>
              </div>
            </header>
            <p>
              <strong className="read-m3__para-id">A</strong>{" "}
              {data.passage[0].text}
            </p>
          </article>
          <aside className="read-m3__side">
            <h2 className="read-m3__h">{data.mainIdea.heading}</h2>
            <p className="read-m3__instr">
              <span className="write-m2a__badge">{data.mainIdea.badge}</span>
              {data.mainIdea.instruction}
            </p>
            <p className="read-m3__q">
              <strong>1.</strong> {data.mainIdea.q1}
            </p>
            <p className="read-m3__q">
              <strong>2.</strong> {data.mainIdea.q2}
            </p>
            {checked && (
              <p className="read-m3__tip">
                Topic sentence: {data.mainIdea.topicSentence}
                <br />
                {data.mainIdea.structureTip}
              </p>
            )}
            <p className="read-m3__q">
              <strong>3.</strong> {data.mainIdea.q3}
            </p>
            <ul className="read-m3__opts">
              {data.mainIdea.options.map((opt) => {
                let state = "";
                if (checked) {
                  if (opt.id === data.mainIdea.key) state = "pr-chip--ok";
                  else if (summary === opt.id) state = "pr-chip--bad";
                } else if (summary === opt.id) state = "pr-chip--picked";
                return (
                  <li key={opt.id}>
                    <button
                      type="button"
                      className={`read-m3__opt ${state}`}
                      disabled={checked}
                      onClick={() => setSummary(opt.id)}
                    >
                      <strong>{opt.id}</strong>
                      <span>{opt.text}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>
        </section>
      )}

      {step === 2 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.matchHeading.badge}</span>
            {data.matchHeading.instruction}
          </p>
          <p className="read-m3__hint">
            Summary from 2a:{" "}
            <em>
              {
                data.mainIdea.options.find((o) => o.id === data.mainIdea.key)
                  ?.text
              }
            </em>
          </p>
          <ul className="read-m3__head-list">
            {data.headings.map((h) => {
              let state = "";
              if (checked) {
                if (h.id === data.matchHeading.key) state = "pr-chip--ok";
                else if (heading2b === h.id) state = "pr-chip--bad";
              } else if (heading2b === h.id) state = "pr-chip--picked";
              return (
                <li key={h.id}>
                  <button
                    type="button"
                    className={`read-m3__head-btn ${state}`}
                    disabled={checked}
                    onClick={() => setHeading2b(h.id)}
                  >
                    <strong>{h.id}</strong>
                    <span>{h.text}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 3 && (
        <section className="read-m3__split read-m3__split--exam">
          <article className="read-m3__passage">
            <header className="read-m3__hero read-m3__hero--compact">
              <div>
                <h2>{data.title}</h2>
                <p>{data.subtitle}</p>
              </div>
            </header>
            {data.passage.map((p) => (
              <p key={p.id}>
                <strong className="read-m3__para-id">{p.id}</strong> {p.text}
              </p>
            ))}
          </article>
          <aside className="read-m3__side read-m3__side--exam">
            <h2 className="read-m3__h">{data.exam.heading}</h2>
            <p className="write-m2a__expert">{data.exam.strategies}</p>
            <p className="read-m3__instr">
              <span className="write-m2a__badge">{data.exam.badge}</span>
              Questions 1–4
            </p>
            <p className="read-m3__hint">{data.exam.headingsInstr}</p>
            <div className="read-m3__bank">
              {data.headings.map((h) => {
                const used = usedHeads.has(h.id);
                return (
                  <button
                    key={h.id}
                    type="button"
                    className={`pr-chip ${pickedHead === h.id ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                    disabled={checked || used}
                    onClick={() => setPickedHead(h.id)}
                    title={h.text}
                  >
                    {h.id}
                  </button>
                );
              })}
            </div>
            <ul className="read-m3__head-full">
              {data.headings.map((h) => (
                <li key={h.id}>
                  <strong>{h.id}</strong> {h.text}
                </li>
              ))}
            </ul>
            <ul className="read-m3__para-slots">
              {PARAS.map((p, i) => {
                const val = paraHeads[p];
                const ok = val === data.exam.paragraphKeys[p];
                let cls = "read-m3__slot";
                if (val) cls += " read-m3__slot--filled";
                if (pickedHead && !val) cls += " read-m3__slot--ready";
                if (checked) cls += ok ? " read-m3__slot--ok" : " read-m3__slot--bad";
                return (
                  <li key={p}>
                    <span>
                      {i + 1}. Paragraph {p}
                    </span>
                    <button
                      type="button"
                      className={cls}
                      disabled={checked}
                      onClick={() => placeHead(p)}
                    >
                      {val ?? "—"}
                    </button>
                    {checked && !ok && (
                      <span className="inline-gap-bad">
                        → {data.exam.paragraphKeys[p]}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>

            <p className="read-m3__instr read-m3__instr--mt">
              Questions 5–6
            </p>
            <p className="read-m3__hint">{data.exam.mcInstr}</p>
            <ul className="read-m3__mc">
              {data.exam.mcOptions.map((opt) => {
                const on = mcPick.includes(opt.id);
                const isKey = (data.exam.mcKeys as readonly string[]).includes(
                  opt.id,
                );
                let state = "";
                if (checked) {
                  if (isKey) state = "pr-chip--ok";
                  else if (on) state = "pr-chip--bad";
                } else if (on) state = "pr-chip--picked";
                return (
                  <li key={opt.id}>
                    <button
                      type="button"
                      className={`read-m3__opt ${state}`}
                      disabled={checked}
                      onClick={() => toggleMc(opt.id)}
                    >
                      <strong>{opt.id}</strong>
                      <span>{opt.text}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>
        </section>
      )}

      {step === 4 && (
        <section className="read-m3__panel">
          <h2 className="read-m3__h">{data.analysis.heading}</h2>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.analysis.badge}</span>
            {data.analysis.instruction}
          </p>
          <ul className="read-m3__strat">
            {data.analysis.items.map((it) => {
              const pick = strat[it.id];
              return (
                <li key={it.id}>
                  <p>
                    <strong>{it.id}.</strong> {it.text}
                  </p>
                  <div className="read-m3__strat-btns">
                    {(["a", "b", "c"] as const).map((lab) => {
                      let state = "";
                      if (checked) {
                        if (lab === it.key) state = "pr-chip--ok";
                        else if (pick === lab) state = "pr-chip--bad";
                      } else if (pick === lab) state = "pr-chip--picked";
                      return (
                        <button
                          key={lab}
                          type="button"
                          className={`pr-chip ${state}`}
                          disabled={checked}
                          onClick={() =>
                            setStrat((s) => ({ ...s, [it.id]: lab }))
                          }
                        >
                          {lab}
                        </button>
                      );
                    })}
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="read-m3__instr read-m3__instr--mt">
            <span className="write-m2a__badge">{data.analysis.b.badge}</span>
            {data.analysis.b.instruction}
          </p>
          <ul className="read-m3__useful">
            {data.analysis.items.map((it) => (
              <li key={`u-${it.id}`}>
                <label className="write-m2b__check">
                  <input
                    type="checkbox"
                    checked={!!useful[it.id]}
                    onChange={() =>
                      setUseful((u) => ({ ...u, [it.id]: !u[it.id] }))
                    }
                  />
                  <span>
                    {it.id}. {it.text}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </section>
      )}

      {step === 5 && (
        <ExpertDiscussPanel
          key="discussion"
          heading={data.discussion.heading}
          badge={data.discussion.badge}
          instruction={data.discussion.instruction}
          questions={data.discussion.questions}
          suggestedTitle={data.discussion.suggestedTitle}
          suggestedAnswer={data.discussion.suggestedAnswer}
        />
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
            {step + 1} / {READ_M3_STEPS.length}
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
