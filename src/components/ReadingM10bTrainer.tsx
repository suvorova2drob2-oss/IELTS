import { useEffect, useState } from "react";
import {
  READ_M10B_NEXT,
  READ_M10B_STEPS,
  readingM10b,
} from "../data/readingM10b";
import { ExpertDiscussPanel } from "./ExpertDiscussPanel";
import { PhraseFlipBoard } from "./PhraseFlipBoard";

const data = readingM10b;
const YNNG = ["Yes", "No", "Not given"] as const;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, READ_M10B_STEPS.length - 1));
}

export function ReadingM10bTrainer({
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
  const [showTip, setShowTip] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [endings, setEndings] = useState<Record<number, string>>({});
  const [ynng, setYnng] = useState<Record<number, string>>({});
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setShowTip(false);
    setPicked(null);
    setEndings({});
    setYnng({});
    setFlipped({});
  }, [restart, initialStep]);

  const endingScore = data.exam.endingStems.filter(
    (s) => endings[s.id] === s.key,
  ).length;
  const ynngScore = data.exam.ynng.filter((s) => ynng[s.id] === s.key).length;
  const needsCheck = step === 1 || step === 2;
  const endingTotal = data.exam.endingStems.length;
  const ynngTotal = data.exam.ynng.length;
  const score =
    step === 1 ? endingScore : step === 2 ? ynngScore : 0;
  const total =
    step === 1 ? endingTotal : step === 2 ? ynngTotal : 0;

  const placeEnding = (id: number) => {
    if (checked) return;
    if (endings[id]) {
      setEndings((m) => {
        const next = { ...m };
        delete next[id];
        return next;
      });
      return;
    }
    if (!picked) return;
    setEndings((m) => ({ ...m, [id]: picked }));
    setPicked(null);
  };

  const placeYnng = (id: number) => {
    if (checked) return;
    if (ynng[id]) {
      setYnng((m) => {
        const next = { ...m };
        delete next[id];
        return next;
      });
      return;
    }
    if (!picked) return;
    setYnng((m) => ({ ...m, [id]: picked }));
    setPicked(null);
  };

  const usedEndings = new Set(Object.values(endings));

  const goPrev = () => {
    if (step === 0) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTip(false);
    setPicked(null);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (step === 0 && !showTip) {
      setShowTip(true);
      return;
    }
    if (needsCheck && !checked) {
      setChecked(true);
      setPicked(null);
      return;
    }
    if (step >= READ_M10B_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTip(false);
    setPicked(null);
    setStep((s) => s + 1);
  };

  const nextLabel =
    step === 0 && !showTip
      ? "Show tip →"
      : needsCheck && !checked
        ? "Check →"
        : READ_M10B_NEXT[step];

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
          {READ_M10B_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
                setShowTip(false);
                setPicked(null);
                setFlipped({});
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
          {showTip && <p className="read-m3__tip">{data.beforeYouRead.tip}</p>}
        </section>
      )}

      {step === 1 && (
        <section className="read-m3__split read-m3__split--exam">
          {passagePane}
          <aside className="read-m3__side read-m3__side--exam">
            <p className="write-m2a__expert">{data.exam.strategies}</p>
            <p className="read-m3__instr">
              <span className="write-m2a__badge">{data.exam.endingsBadge}</span>
              {data.exam.endingsInstruction}
            </p>
            <h3 className="read-m3__hint">{data.exam.endingsTitle}</h3>
            <p className="read-m3__place-hint">
              {picked
                ? `Selected ${picked} — click a gap (1–4). Click a filled gap to undo.`
                : "Click a letter A–F, then a gap (1–4). Each ending is used once."}
            </p>
            <div className="read-m3__bank">
              {data.exam.endings.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  className={`pr-chip ${picked === o.id ? "pr-chip--picked" : ""} ${usedEndings.has(o.id) ? "pr-chip--used" : ""}`}
                  disabled={checked || usedEndings.has(o.id)}
                  onClick={() => setPicked(o.id)}
                >
                  {o.id}
                </button>
              ))}
            </div>
            <ul className="pr-endings__bank">
              {data.exam.endings.map((o) => (
                <li
                  key={o.id}
                  className={
                    usedEndings.has(o.id)
                      ? "pr-endings__bank-item--used"
                      : undefined
                  }
                >
                  <strong>{o.id}</strong> {o.text}
                </li>
              ))}
            </ul>
            <ul className="read-m3__para-slots read-m3__para-slots--endings">
              {data.exam.endingStems.map((s) => {
                const val = endings[s.id] ?? "";
                const ok = val === s.key;
                return (
                  <li key={s.id}>
                    <span>
                      {s.id}. {s.text}
                    </span>
                    <button
                      type="button"
                      className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${picked && !val ? "read-m3__slot--ready" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                      disabled={checked}
                      onClick={() => placeEnding(s.id)}
                    >
                      {val || "—"}
                    </button>
                    {checked && !ok && (
                      <span className="inline-gap-bad"> → {s.key}</span>
                    )}
                  </li>
                );
              })}
            </ul>
            {checked && (
              <p className="read-m3__score">
                {score} / {total}
              </p>
            )}
          </aside>
        </section>
      )}

      {step === 2 && (
        <section className="read-m3__split read-m3__split--exam">
          {passagePane}
          <aside className="read-m3__side read-m3__side--exam">
            <p className="write-m2a__expert">{data.exam.strategies}</p>
            <p className="read-m3__instr">
              <span className="write-m2a__badge">{data.exam.ynngBadge}</span>
              {data.exam.ynngInstruction}
            </p>
            <h3 className="read-m3__hint">{data.exam.ynngTitle}</h3>
            <p className="read-m3__place-hint">
              {picked
                ? `Selected ${picked} — click a statement (5–9). Click a filled gap to undo.`
                : "Click Yes, No or Not given, then a statement (5–9)."}
            </p>
            <div className="read-m3__bank">
              {YNNG.map((L) => (
                <button
                  key={L}
                  type="button"
                  className={`pr-chip ${picked === L ? "pr-chip--picked" : ""}`}
                  disabled={checked}
                  onClick={() => setPicked(L)}
                >
                  {L}
                </button>
              ))}
            </div>
            <ul className="read-m3__para-slots read-m3__para-slots--ynng">
              {data.exam.ynng.map((s) => {
                const val = ynng[s.id] ?? "";
                const ok = val === s.key;
                return (
                  <li key={s.id}>
                    <span>
                      {s.id}. {s.text}
                    </span>
                    <button
                      type="button"
                      className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${picked && !val ? "read-m3__slot--ready" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                      disabled={checked}
                      onClick={() => placeYnng(s.id)}
                    >
                      {val || "—"}
                    </button>
                    {checked && !ok && (
                      <span className="inline-gap-bad"> → {s.key}</span>
                    )}
                  </li>
                );
              })}
            </ul>
            {checked && (
              <p className="read-m3__score">
                {score} / {total}
              </p>
            )}
          </aside>
        </section>
      )}

      {step === 3 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.analyse.badge}</span>
            {data.analyse.instruction}
          </p>
        </section>
      )}

      {step === 4 && (
        <ExpertDiscussPanel
          key="discussion"
          badge={data.discussion.badge}
          instruction={data.discussion.instruction}
          questions={data.discussion.questions}
          suggestedTitle={data.discussion.suggestedTitle}
          suggestedAnswer={data.discussion.suggestedAnswer}
        />
      )}

      {step === 5 && (
        <PhraseFlipBoard
          badge={data.phraseFlips.badge}
          instruction={data.phraseFlips.instruction}
          sections={data.phraseFlips.sections}
          flipped={flipped}
          setFlipped={setFlipped}
        />
      )}

      <footer className="flow-footer">
        <button type="button" className="btn-secondary" onClick={goPrev}>
          ← Back
        </button>
        <button type="button" className="btn-start" onClick={goNext}>
          {nextLabel}
        </button>
      </footer>
    </div>
  );
}
