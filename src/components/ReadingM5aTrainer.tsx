import { useEffect, useState } from "react";
import {
  checkReadM5a,
  READ_M5A_NEXT,
  READ_M5A_STEPS,
  readingM5a,
} from "../data/readingM5a";
import { ExpertDiscussPanel } from "./ExpertDiscussPanel";

const data = readingM5a;
const LETTERS = ["A", "B", "C", "D"] as const;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, READ_M5A_STEPS.length - 1));
}

export function ReadingM5aTrainer({
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
  const [match, setMatch] = useState<Record<number, string>>({});
  const [pickedLetter, setPickedLetter] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setMatch({});
    setPickedLetter(null);
    setNotes({});
  }, [restart, initialStep]);

  const matchScore = data.matchingFeatures.items.filter(
    (it) => match[it.id] === it.key,
  ).length;
  const notesScore = data.notes.gaps.filter((g) =>
    checkReadM5a(notes[g.id] ?? "", g.answers),
  ).length;

  const needsCheck = step === 3 || step === 4;
  const score = step === 3 ? matchScore : notesScore;
  const total =
    step === 3
      ? data.matchingFeatures.items.length
      : data.notes.gaps.length;

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
    if (step >= READ_M5A_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setStep((s) => s + 1);
  };

  const nextLabel =
    needsCheck && !checked ? "Check →" : READ_M5A_NEXT[step];

  const passagePane = (
    <article className="read-m3__passage">
      <header className="read-m3__hero read-m3__hero--compact">
        <div>
          <h2>{data.title}</h2>
          <p className="read-m3__subtitle">{data.subtitle}</p>
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
          {READ_M5A_STEPS.map((label, i) => (
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
        </section>
      )}

      {step === 1 && (
        <section className="read-m3__split">
          {passagePane}
          <aside className="read-m3__side">
            <p className="read-m3__instr">
              <span className="write-m2a__badge">{data.skim.badge}</span>
              {data.skim.instruction}
            </p>
            <p className="read-m3__tip">
              Key figure: <strong>{data.skim.tip}</strong>
            </p>
          </aside>
        </section>
      )}

      {step === 2 && (
        <section className="read-m3__split">
          {passagePane}
          <aside className="read-m3__side">
            <p className="read-m3__instr">
              <span className="write-m2a__badge">{data.reference.badge}</span>
              {data.reference.instruction}
            </p>
            <p className="read-m3__tip">{data.reference.tip}</p>
          </aside>
        </section>
      )}

      {step === 3 && (
        <section className="read-m3__split read-m3__split--exam">
          {passagePane}
          <aside className="read-m3__side read-m3__side--exam">
            <p className="write-m2a__expert">
              {data.matchingFeatures.strategies}
            </p>
            <p className="read-m3__instr">
              <span className="write-m2a__badge">
                {data.matchingFeatures.badge}
              </span>
              {data.matchingFeatures.instruction}
            </p>
            <ul className="read-m3__opts">
              {data.matchingFeatures.people.map((p) => (
                <li key={p.id}>
                  <strong>{p.id}</strong> {p.name}
                </li>
              ))}
            </ul>
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
              {data.matchingFeatures.items.map((it) => {
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
            <p className="write-m2a__expert">{data.notes.strategies}</p>
            <p className="read-m3__instr">
              <span className="write-m2a__badge">{data.notes.badge}</span>
              {data.notes.instruction}
            </p>
            <h3 className="read-m3__hint">{data.notes.title}</h3>
            <ul className="read-m3__para-slots">
              {data.notes.gaps.map((g) => {
                const val = notes[g.id] ?? "";
                const ok = checkReadM5a(val, g.answers);
                return (
                  <li key={g.id}>
                    <span>
                      {g.id}. {g.before}
                      <span
                        className={`inline-gap-wrap ${checked && ok ? "inline-gap-wrap--ok" : ""} ${checked && !ok ? "inline-gap-wrap--bad" : ""}`}
                      >
                        <input
                          className={`inline-gap-input ${checked && ok ? "inline-gap-input--ok" : ""} ${checked && !ok ? "inline-gap-input--bad" : ""}`}
                          value={val}
                          disabled={checked}
                          onChange={(e) =>
                            setNotes((s) => ({
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
                      </span>
                      {g.after}
                    </span>
                  </li>
                );
              })}
            </ul>
            {checked && (
              <p className="read-m3__tip">{data.analyse.tip}</p>
            )}
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
            {step + 1} / {READ_M5A_STEPS.length}
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
