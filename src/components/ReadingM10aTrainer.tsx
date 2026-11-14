import { useEffect, useState } from "react";
import {
  READ_M10A_NEXT,
  READ_M10A_STEPS,
  readingM10a,
} from "../data/readingM10a";
import { ExpertDiscussPanel } from "./ExpertDiscussPanel";
import { PhraseFlipBoard } from "./PhraseFlipBoard";

const data = readingM10a;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, READ_M10A_STEPS.length - 1));
}

export function ReadingM10aTrainer({
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
  const [words, setWords] = useState<Record<number, string>>({});
  const [endings, setEndings] = useState<Record<number, string>>({});
  const [mcq, setMcq] = useState<Record<number, string>>({});
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setShowTip(false);
    setPicked(null);
    setWords({});
    setEndings({});
    setMcq({});
    setFlipped({});
  }, [restart, initialStep]);

  const usedWords = new Set(Object.values(words));
  const usedEndings = new Set(Object.values(endings));
  const wordsScore = data.words.items.filter(
    (it) => words[it.id] === it.key,
  ).length;
  const endingScore = data.exam.endingStems.filter(
    (s) => endings[s.id] === s.key,
  ).length;
  const mcqScore = data.exam.mcq.filter((q) => mcq[q.id] === q.key).length;

  const needsCheck = step === 2 || step === 3 || step === 4;
  const endingTotal = data.exam.endingStems.length;
  const mcqTotal = data.exam.mcq.length;
  const score =
    step === 2
      ? wordsScore
      : step === 3
        ? endingScore
        : step === 4
          ? mcqScore
          : 0;
  const total =
    step === 2
      ? data.words.items.length
      : step === 3
        ? endingTotal
        : step === 4
          ? mcqTotal
          : 0;

  const placeWord = (id: number) => {
    if (checked) return;
    if (words[id]) {
      setWords((m) => {
        const next = { ...m };
        delete next[id];
        return next;
      });
      return;
    }
    if (!picked) return;
    setWords((m) => ({ ...m, [id]: picked }));
    setPicked(null);
  };

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
    if ((step === 0 || step === 1) && !showTip) {
      setShowTip(true);
      return;
    }
    if (needsCheck && !checked) {
      setChecked(true);
      setPicked(null);
      return;
    }
    if (step >= READ_M10A_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTip(false);
    setPicked(null);
    setStep((s) => s + 1);
  };

  const nextLabel =
    (step === 0 || step === 1) && !showTip
      ? "Show tip →"
      : needsCheck && !checked
        ? "Check →"
        : READ_M10A_NEXT[step];

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
          {READ_M10A_STEPS.map((label, i) => (
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
        <section className="read-m3__split">
          {passagePane}
          <aside className="read-m3__side">
            <p className="read-m3__instr">
              <span className="write-m2a__badge">{data.skim.badge}</span>
              {data.skim.instruction}
            </p>
            {showTip && <p className="read-m3__tip">{data.skim.tip}</p>}
          </aside>
        </section>
      )}

      {step === 2 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.words.badge}</span>
            {data.words.instruction}
          </p>
          <div className="read-m3__bank">
            {data.words.bank.map((w) => (
              <button
                key={w}
                type="button"
                className={`pr-chip ${picked === w ? "pr-chip--picked" : ""} ${usedWords.has(w) ? "pr-chip--used" : ""}`}
                disabled={checked || usedWords.has(w)}
                onClick={() => setPicked(w)}
              >
                {w}
              </button>
            ))}
          </div>
          <ul className="read-m3__para-slots listen-m3b__grid">
            {data.words.items.map((it) => {
              const val = words[it.id] ?? "";
              const ok = val === it.key;
              return (
                <li key={it.id}>
                  <span>
                    {it.id}. {it.text}{" "}
                    <button
                      type="button"
                      className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                      disabled={checked}
                      onClick={() => placeWord(it.id)}
                    >
                      {val || "—"}
                    </button>
                    {checked && !ok && (
                      <span className="inline-gap-bad"> → {it.key}</span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
          {checked && (
            <p className="read-m3__score">
              {score} / {total}
            </p>
          )}
        </section>
      )}

      {step === 3 && (
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
                ? `Selected ${picked} — click a gap (1–5) to place. Click a filled gap to undo.`
                : "Click a letter A–G, then a gap (1–5). Each ending is used once."}
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

      {step === 4 && (
        <section className="read-m3__split read-m3__split--exam">
          {passagePane}
          <aside className="read-m3__side read-m3__side--exam">
            <p className="write-m2a__expert">{data.exam.strategies}</p>
            <p className="read-m3__instr">
              <span className="write-m2a__badge">{data.exam.mcqBadge}</span>
              {data.exam.mcqInstruction}
            </p>
            <h3 className="read-m3__hint">{data.exam.mcqTitle}</h3>
            <ul className="read-m3__para-slots read-m3__para-slots--mcq">
              {data.exam.mcq.map((q) => {
                const sel = mcq[q.id] ?? "";
                return (
                  <li key={q.id}>
                    <p className="read-m3__mcq-stem">
                      <strong>{q.id}.</strong> {q.stem}
                    </p>
                    <div className="read-m3__mcq-opts">
                      {q.options.map((opt) => {
                        let state = "";
                        if (checked) {
                          if (opt.id === q.key) state = "pr-chip--ok";
                          else if (sel === opt.id) state = "pr-chip--bad";
                        } else if (sel === opt.id) {
                          state = "pr-chip--picked";
                        }
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            className={`pr-chip ${state}`}
                            disabled={checked}
                            onClick={() =>
                              setMcq((m) => ({ ...m, [q.id]: opt.id }))
                            }
                          >
                            <strong>{opt.id}</strong> {opt.text}
                          </button>
                        );
                      })}
                    </div>
                    {checked && sel !== q.key && (
                      <span className="inline-gap-bad"> → {q.key}</span>
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

      {step === 5 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.wrongAnswers.badge}</span>
            {data.wrongAnswers.instruction}
          </p>
          <ul className="read-m3__qs">
            {data.wrongAnswers.items.map((it) => (
              <li key={it.id}>
                <strong>Q{it.id}:</strong> {it.wrong}
                <p className="read-m3__tip">{it.tip}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {step === 6 && (
        <ExpertDiscussPanel
          key="discussion"
          badge={data.discussion.badge}
          instruction={data.discussion.instruction}
          questions={data.discussion.questions}
          suggestedTitle={data.discussion.suggestedTitle}
          suggestedAnswer={data.discussion.suggestedAnswer}
        />
      )}

      {step === 7 && (
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
