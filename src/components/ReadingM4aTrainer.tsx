import { useEffect, useState } from "react";
import {
  checkReadM4a,
  READ_M4A_NEXT,
  READ_M4A_STEPS,
  readingM4a,
} from "../data/readingM4a";
import { ExpertDiscussPanel } from "./ExpertDiscussPanel";

const data = readingM4a;
const LETTERS = ["A", "B", "C", "D", "E"] as const;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, READ_M4A_STEPS.length - 1));
}

export function ReadingM4aTrainer({
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
  const [types, setTypes] = useState<string[]>([]);
  const [fnNotes, setFnNotes] = useState<Record<string, string>>({});
  const [match, setMatch] = useState<Record<number, string>>({});
  const [pickedLetter, setPickedLetter] = useState<string | null>(null);
  const [summary, setSummary] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setTypes([]);
    setFnNotes({});
    setMatch({});
    setPickedLetter(null);
    setSummary({});
  }, [restart, initialStep]);

  const typeOk =
    types.length === data.passageType.keys.length &&
    data.passageType.keys.every((k) => types.includes(k));
  const matchScore = data.matchingInfo.items.filter(
    (it) => match[it.id] === it.key,
  ).length;
  const summaryScore = data.summary.partB.gaps.filter((g) =>
    checkReadM4a(summary[g.id] ?? "", g.answers),
  ).length;

  const needsCheck = step === 1 || step === 3 || step === 4;
  const score =
    step === 1
      ? typeOk
        ? 1
        : 0
      : step === 3
        ? matchScore
        : summaryScore;
  const total =
    step === 1
      ? 1
      : step === 3
        ? data.matchingInfo.items.length
        : data.summary.partB.gaps.length;

  const toggleType = (id: string) => {
    if (checked) return;
    setTypes((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
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
    if (!pickedLetter) return;
    setMatch((m) => ({ ...m, [id]: pickedLetter }));
    setPickedLetter(null);
  };

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
    if (step >= READ_M4A_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setStep((s) => s + 1);
  };

  const nextLabel =
    needsCheck && !checked ? "Check →" : READ_M4A_NEXT[step];

  const passagePane = (
    <article className="read-m3__passage">
      <header className="read-m3__hero read-m3__hero--compact">
        <div>
          <h2>{data.title}</h2>
        </div>
      </header>
      {data.passage.map((p) => (
        <p key={p.id}>
          <strong className="read-m3__para-id">{p.id}</strong> {p.text}
        </p>
      ))}
    </article>
  );

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
          {READ_M4A_STEPS.map((label, i) => (
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
          {passagePane}
          <aside className="read-m3__side">
            <p className="read-m3__instr">
              <span className="write-m2a__badge">{data.passageType.badge}</span>
              {data.passageType.instruction}
            </p>
            <p className="read-m3__hint">
              Select every type that applies, then Check.
            </p>
            <ul className="read-m3__opts">
              {data.passageType.options.map((opt) => {
                const on = types.includes(opt.id);
                const isKey = data.passageType.keys.includes(opt.id);
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
                      onClick={() => toggleType(opt.id)}
                    >
                      <strong>{opt.label}</strong>
                    </button>
                  </li>
                );
              })}
            </ul>
            {checked && (
              <p className="read-m3__tip">{data.passageType.tip}</p>
            )}
          </aside>
        </section>
      )}

      {step === 2 && (
        <section className="read-m3__split">
          {passagePane}
          <aside className="read-m3__side">
            <p className="read-m3__instr">
              <span className="write-m2a__badge">3a</span>
              Skim each paragraph and note its main function in the passage.
            </p>
            <ul className="read-m3__para-slots">
              {LETTERS.map((id) => (
                <li key={id}>
                  <span>Paragraph {id}</span>
                  <input
                    className="inline-gap-input"
                    value={fnNotes[id] ?? ""}
                    placeholder="function…"
                    onChange={(e) =>
                      setFnNotes((n) => ({ ...n, [id]: e.target.value }))
                    }
                  />
                </li>
              ))}
            </ul>
          </aside>
        </section>
      )}

      {step === 3 && (
        <section className="read-m3__split read-m3__split--exam">
          {passagePane}
          <aside className="read-m3__side read-m3__side--exam">
            <p className="write-m2a__expert">{data.matchingInfo.strategies}</p>
            <p className="read-m3__instr">
              <span className="write-m2a__badge">
                {data.matchingInfo.badge}
              </span>
              {data.matchingInfo.instruction}
            </p>
            <div className="read-m3__bank">
              {LETTERS.map((L) => (
                <button
                  key={L}
                  type="button"
                  className={`pr-chip ${pickedLetter === L ? "pr-chip--picked" : ""}`}
                  disabled={checked}
                  onClick={() => setPickedLetter(L)}
                >
                  {L}
                </button>
              ))}
            </div>
            <ul className="read-m3__para-slots">
              {data.matchingInfo.items.map((it) => {
                const val = match[it.id];
                const ok = val === it.key;
                let cls = "read-m3__slot";
                if (val) cls += " read-m3__slot--filled";
                if (pickedLetter && !val) cls += " read-m3__slot--ready";
                if (checked)
                  cls += ok ? " read-m3__slot--ok" : " read-m3__slot--bad";
                return (
                  <li key={it.id}>
                    <span>
                      {it.id}. {it.text}
                    </span>
                    <button
                      type="button"
                      className={cls}
                      disabled={checked}
                      onClick={() => placeMatch(it.id)}
                    >
                      {val ?? "—"}
                    </button>
                    {checked && !ok && (
                      <span className="inline-gap-bad"> → {it.key}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </aside>
        </section>
      )}

      {step === 4 && (
        <section className="read-m3__split read-m3__split--exam">
          {passagePane}
          <aside className="read-m3__side read-m3__side--exam">
            <p className="write-m2a__expert">{data.summary.strategies}</p>
            <p className="read-m3__instr">
              <span className="write-m2a__badge">{data.summary.badge}</span>
              Summary completion
            </p>
            <p className="read-m3__hint">
              <span className="write-m2a__badge">
                {data.summary.partA.badge}
              </span>{" "}
              <strong>{data.summary.partA.title}</strong> —{" "}
              {data.summary.partA.text} ({data.summary.partA.key})
            </p>
            <p className="read-m3__instr read-m3__instr--mt">
              <span className="write-m2a__badge">
                {data.summary.partB.badge}
              </span>
              {data.summary.partB.instruction}
            </p>
            <article className="read-m3__hint">
              <p>
                {data.summary.partB.intro}{" "}
                {data.summary.partB.gaps.map((g) => {
                  const val = summary[g.id] ?? "";
                  const ok = checkReadM4a(val, g.answers);
                  return (
                    <span key={g.id}>
                      <strong className="read-m3__para-id">{g.id}</strong>{" "}
                      <span
                        className={`inline-gap-wrap ${checked && ok ? "inline-gap-wrap--ok" : ""} ${checked && !ok ? "inline-gap-wrap--bad" : ""}`}
                      >
                        <input
                          className={`inline-gap-input ${checked && ok ? "inline-gap-input--ok" : ""} ${checked && !ok ? "inline-gap-input--bad" : ""}`}
                          value={val}
                          disabled={checked}
                          onChange={(e) =>
                            setSummary((s) => ({
                              ...s,
                              [g.id]: e.target.value,
                            }))
                          }
                        />
                        {checked && !ok && (
                          <span className="inline-gap-bad">
                            {" "}
                            → {g.answers[0]}
                          </span>
                        )}
                      </span>{" "}
                      {g.after}{" "}
                    </span>
                  );
                })}
              </p>
            </article>
          </aside>
        </section>
      )}

      {step === 5 && (
        <ExpertDiscussPanel
          key="discussion"
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
            {step + 1} / {READ_M4A_STEPS.length}
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
