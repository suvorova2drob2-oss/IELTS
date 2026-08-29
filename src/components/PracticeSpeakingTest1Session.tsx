import { useEffect, useState } from "react";
import {
  PRACTICE_SPEAK_T1_NEXT,
  PRACTICE_SPEAK_T1_STEPS,
  type PracticeSpeakingTest1,
} from "../data/practiceSpeakingTest1";

type Track = "learn" | "exam";

function clampStep(n: number | undefined, max: number): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, max));
}

export function PracticeSpeakingTest1Session({
  test,
  track,
  onBackToModes,
  onComplete,
}: {
  test: PracticeSpeakingTest1;
  track: Track;
  onBackToModes: () => void;
  onComplete: (scores: {
    training: { score: number; total: number };
    practice: { score: number; total: number };
  }) => void;
}) {
  const examSteps = [0, 2, 3, 4, 6] as const;
  const steps =
    track === "exam"
      ? examSteps.map((i) => PRACTICE_SPEAK_T1_STEPS[i])
      : [...PRACTICE_SPEAK_T1_STEPS];
  const mapExam = (local: number) =>
    track === "exam" ? examSteps[local]! : local;

  const [localStep, setLocalStep] = useState(0);
  const [checked, setChecked] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [tf, setTf] = useState<Record<number, string>>({});
  const [match, setMatch] = useState<Record<number, string>>({});
  const [order, setOrder] = useState<string[]>([]);
  const [gb, setGb] = useState<Record<number, string>>({});
  const [needs, setNeeds] = useState<string[]>([]);
  const [trainScore, setTrainScore] = useState(0);
  const [trainTotal, setTrainTotal] = useState(0);

  const step = mapExam(localStep);

  useEffect(() => {
    setLocalStep(0);
    setChecked(false);
    setShowTip(false);
    setPicked(null);
    setTf({});
    setMatch({});
    setOrder([]);
    setGb({});
    setNeeds([]);
    setTrainScore(0);
    setTrainTotal(0);
  }, [track]);

  const tipSteps = new Set([1, 5]);
  const checkSteps = new Set([0, 2, 3, 4, 5]);
  const needsCheck = track === "learn" && checkSteps.has(step);
  const needsTip =
    track === "learn" && tipSteps.has(step) && !checkSteps.has(step);

  const scoreCurrent = (): { score: number; total: number } => {
    if (step === 0) {
      const items = test.part1.facts.items;
      return {
        score: items.filter((it) => tf[it.id] === it.key).length,
        total: items.length,
      };
    }
    if (step === 1) {
      const items = test.part1.grammar.items;
      return {
        score: items.filter((it) => match[it.id] === it.key).length,
        total: items.length,
      };
    }
    if (step === 2) {
      const ok =
        order.length === test.part2.stages.order.length &&
        order.every((id, i) => id === test.part2.stages.order[i]);
      return { score: ok ? 1 : 0, total: 1 };
    }
    if (step === 3) {
      const items = test.part2.advice.items;
      return {
        score: items.filter((it) => gb[it.id] === it.key).length,
        total: items.length,
      };
    }
    if (step === 4) {
      const keys = test.part3.needs.keys;
      const ok =
        needs.length === keys.length && keys.every((k) => needs.includes(k));
      return { score: ok ? 1 : 0, total: 1 };
    }
    if (step === 5) {
      const items = test.part3.extend.items;
      return {
        score: items.filter((it) => match[it.id] === it.key).length,
        total: items.length,
      };
    }
    return { score: 0, total: 0 };
  };

  const placeMatch = (id: number) => {
    if (checked) return;
    if (match[id]) {
      setMatch((m) => {
        const next = { ...m };
        delete next[id];
        return next;
      });
      return;
    }
    if (!picked) return;
    setMatch((m) => ({ ...m, [id]: picked }));
    setPicked(null);
  };

  const usedMatch = new Set(Object.values(match));

  const goPrev = () => {
    if (localStep === 0) {
      onBackToModes();
      return;
    }
    setChecked(false);
    setShowTip(false);
    setPicked(null);
    setLocalStep((s) => s - 1);
  };

  const goNext = () => {
    if (needsTip && !showTip) {
      setShowTip(true);
      return;
    }
    if (needsCheck && !checked) {
      const { score, total } = scoreCurrent();
      setTrainScore((s) => s + score);
      setTrainTotal((t) => t + total);
      setChecked(true);
      return;
    }
    if (localStep >= steps.length - 1) {
      const last = checked
        ? { score: 0, total: 0 }
        : scoreCurrent();
      const training = {
        score: trainScore + last.score,
        total: Math.max(1, trainTotal + last.total),
      };
      onComplete({
        training,
        practice: { score: 1, total: 1 },
      });
      return;
    }
    setChecked(false);
    setShowTip(false);
    setPicked(null);
    setMatch({});
    setLocalStep((s) => s + 1);
  };

  const nextLabel =
    needsTip && !showTip
      ? "Show tip →"
      : needsCheck && !checked
        ? "Check →"
        : localStep >= steps.length - 1
          ? "Results →"
          : PRACTICE_SPEAK_T1_NEXT[step] ?? "Next →";

  const bank = (
    words: { id: string; text: string }[],
    used: Set<string>,
  ) => (
    <div className="read-m3__bank">
      {words.map((w) => (
        <button
          key={w.id}
          type="button"
          className={`pr-chip ${picked === w.id ? "pr-chip--picked" : ""} ${used.has(w.id) ? "pr-chip--used" : ""}`}
          disabled={checked || used.has(w.id)}
          onClick={() => setPicked(w.id)}
        >
          {w.id}. {w.text}
        </button>
      ))}
    </div>
  );

  return (
    <div className="app-shell reading-flow reading-flow--viewport speak-m3a">
      <div className="reading-chrome">
        <button
          type="button"
          className="back-link reading-chrome__back"
          onClick={onBackToModes}
        >
          ← Modes
        </button>
        <span className="badge reading-chrome__badge">
          {test.title} · {track === "learn" ? "Learn" : "Exam"}
        </span>
        <div className="learn-step-tabs">
          {steps.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === localStep ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setLocalStep(clampStep(i, steps.length - 1));
                setChecked(false);
                setShowTip(false);
                setPicked(null);
                setMatch({});
              }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="speak-m3a__panel" style={{ overflow: "auto" }}>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{test.part1.facts.badge}</span>
            {test.part1.facts.instruction}
          </p>
          <ul className="listen-m1__para-list--grid">
            {test.part1.facts.items.map((it) => {
              const val = tf[it.id];
              const ok = val === it.key;
              return (
                <li key={it.id} className="listen-m1__para-row">
                  <span>
                    {it.id}. {it.text}
                  </span>
                  <div className="read-m3__bank" style={{ marginTop: 6 }}>
                    {(["True", "False"] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        className={`pr-chip ${val === opt ? "pr-chip--picked" : ""} ${checked ? (opt === it.key ? "pr-chip--ok" : val === opt ? "pr-chip--bad" : "") : ""}`}
                        disabled={checked}
                        onClick={() => setTf((m) => ({ ...m, [it.id]: opt }))}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {checked && !ok && (
                    <p className="pr-endings-panel__tip">{it.tip}</p>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 1 && (
        <section className="speak-m3a__panel" style={{ overflow: "auto" }}>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{test.part1.grammar.badge}</span>
            {test.part1.grammar.instruction}
          </p>
          {bank(test.part1.grammar.bank, usedMatch)}
          <ul className="listen-m1__para-list--grid">
            {test.part1.grammar.items.map((it) => {
              const val = match[it.id] ?? "";
              const ok = val === it.key;
              return (
                <li key={it.id}>
                  <span>
                    {it.id}. {it.text}{" "}
                    <button
                      type="button"
                      className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                      disabled={checked}
                      onClick={() => placeMatch(it.id)}
                    >
                      {val || "—"}
                    </button>
                  </span>
                </li>
              );
            })}
          </ul>
          {showTip && (
            <p className="pr-endings-panel__tip">
              {test.part1.sampleAnswers.examinerTip}
            </p>
          )}
        </section>
      )}

      {step === 2 && (
        <section className="speak-m3a__panel" style={{ overflow: "auto" }}>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{test.part2.stages.badge}</span>
            {test.part2.stages.instruction}
          </p>
          <div className="read-m3__bank">
            {test.part2.stages.bank.map((w) => (
              <button
                key={w.id}
                type="button"
                className={`pr-chip ${order.includes(w.id) ? "pr-chip--used" : ""}`}
                disabled={checked || order.includes(w.id)}
                onClick={() => setOrder((o) => [...o, w.id])}
              >
                {w.text}
              </button>
            ))}
          </div>
          <p className="read-m3__instr">
            Your order:{" "}
            <button
              type="button"
              className={`read-m3__slot ${order.length ? "read-m3__slot--filled" : ""} ${checked ? (order.join("") === test.part2.stages.order.join("") ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
              disabled={checked}
              onClick={() => !checked && setOrder([])}
            >
              {order.length ? order.join(" → ") : "— click chips above —"}
            </button>
          </p>
          {checked && (
            <p className="pr-endings-panel__tip">
              Correct: {test.part2.stages.order.join(" → ")}
            </p>
          )}
        </section>
      )}

      {step === 3 && (
        <section className="speak-m3a__panel" style={{ overflow: "auto" }}>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{test.part2.advice.badge}</span>
            {test.part2.advice.instruction}
          </p>
          <ul className="listen-m1__para-list--grid">
            {test.part2.advice.items.map((it) => {
              const val = gb[it.id];
              const ok = val === it.key;
              return (
                <li key={it.id}>
                  <span>
                    {it.id}. {it.text}
                  </span>
                  <div className="read-m3__bank" style={{ marginTop: 6 }}>
                    {(["G", "B"] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        className={`pr-chip ${val === opt ? "pr-chip--picked" : ""} ${checked ? (opt === it.key ? "pr-chip--ok" : val === opt ? "pr-chip--bad" : "") : ""}`}
                        disabled={checked}
                        onClick={() => setGb((m) => ({ ...m, [it.id]: opt }))}
                      >
                        {opt === "G" ? "Good" : "Bad"}
                      </button>
                    ))}
                  </div>
                  {checked && it.tip && !ok && (
                    <p className="pr-endings-panel__tip">{it.tip}</p>
                  )}
                  {checked && it.tip && ok && it.key === "B" && (
                    <p className="pr-endings-panel__tip">{it.tip}</p>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 4 && (
        <section className="speak-m3a__panel" style={{ overflow: "auto" }}>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{test.part3.needs.badge}</span>
            {test.part3.needs.instruction}
          </p>
          <ul className="listen-m1__para-list--grid">
            {test.part3.needs.options.map((opt) => {
              const on = needs.includes(opt.id);
              const should = test.part3.needs.keys.includes(opt.id);
              return (
                <li key={opt.id}>
                  <button
                    type="button"
                    className={`pr-chip ${on ? "pr-chip--picked" : ""} ${checked ? (should ? "pr-chip--ok" : on ? "pr-chip--bad" : "") : ""}`}
                    disabled={checked}
                    onClick={() =>
                      setNeeds((ns) =>
                        ns.includes(opt.id)
                          ? ns.filter((x) => x !== opt.id)
                          : [...ns, opt.id],
                      )
                    }
                  >
                    {opt.id}. {opt.text}
                  </button>
                </li>
              );
            })}
          </ul>
          {checked && (
            <p className="pr-endings-panel__tip">{test.part3.needs.tip}</p>
          )}
        </section>
      )}

      {step === 5 && (
        <section className="speak-m3a__panel" style={{ overflow: "auto" }}>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{test.part3.extend.badge}</span>
            {test.part3.extend.instruction}
          </p>
          {bank(test.part3.extend.bank, usedMatch)}
          <ul className="listen-m1__para-list--grid">
            {test.part3.extend.items.map((it) => {
              const val = match[it.id] ?? "";
              const ok = val === it.key;
              return (
                <li key={it.id}>
                  <span>
                    {it.id}. {it.text}{" "}
                    <button
                      type="button"
                      className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                      disabled={checked}
                      onClick={() => placeMatch(it.id)}
                    >
                      {val || "—"}
                    </button>
                  </span>
                </li>
              );
            })}
          </ul>
          {(showTip || checked) && (
            <p className="pr-endings-panel__tip">
              {test.part3.views.assessTip}
            </p>
          )}
        </section>
      )}

      {step === 6 && (
        <section className="speak-m3a__panel" style={{ overflow: "auto" }}>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{test.practice.badge}</span>
            {test.practice.instruction}
          </p>
          <div className="listen-m1__para-list--grid">
            <article className="read-m3__passage">
              <h3>Part 1</h3>
              <ol>
                {test.practice.part1Prompts.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ol>
            </article>
            <article className="read-m3__passage">
              <h3>Part 2</h3>
              <p>
                <strong>{test.practice.part2Card.title}</strong>
              </p>
              <p>You should say:</p>
              <ul>
                {test.practice.part2Card.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <p className="pr-endings-panel__tip">
                Prep 1 min · speak ~2 min. Notes example:{" "}
                {test.part2.notesTip.grid
                  .map((g) => `${g.label}: ${g.example}`)
                  .join("; ")}
              </p>
            </article>
            <article className="read-m3__passage" style={{ gridColumn: "1 / -1" }}>
              <h3>Part 3</h3>
              <ol>
                {test.practice.part3Prompts.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ol>
            </article>
          </div>
        </section>
      )}

      <footer className="flow-footer">
        <button type="button" className="btn-secondary" onClick={goPrev}>
          ← Back
        </button>
        <button type="button" className="btn-primary" onClick={goNext}>
          {nextLabel}
        </button>
      </footer>
    </div>
  );
}
