import { useEffect, useState } from "react";
import {
  checkReadM4b,
  READ_M4B_NEXT,
  READ_M4B_STEPS,
  readingM4b,
} from "../data/readingM4b";
import { ExpertDiscussPanel } from "./ExpertDiscussPanel";

function highlightHits(text: string, hits: string[]) {
  const lower = text.toLowerCase();
  const ranges: { start: number; end: number }[] = [];
  const sorted = [...hits].sort((a, b) => b.length - a.length);
  for (const hit of sorted) {
    const start = lower.indexOf(hit.toLowerCase());
    if (start < 0) continue;
    const end = start + hit.length;
    if (ranges.some((r) => start < r.end && end > r.start)) continue;
    ranges.push({ start, end });
  }
  ranges.sort((a, b) => a.start - b.start);
  const out = [];
  let cursor = 0;
  for (const [i, r] of ranges.entries()) {
    if (cursor < r.start) out.push(text.slice(cursor, r.start));
    out.push(
      <em key={i} className="read-m4a__flip-hit">
        {text.slice(r.start, r.end)}
      </em>,
    );
    cursor = r.end;
  }
  if (cursor < text.length) out.push(text.slice(cursor));
  return out;
}

const data = readingM4b;
const LETTERS = ["A", "B", "C", "D", "E", "F"] as const;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, READ_M4B_STEPS.length - 1));
}

export function ReadingM4bTrainer({
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
  const [summary, setSummary] = useState<Record<number, string>>({});
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setMatch({});
    setPickedLetter(null);
    setSummary({});
    setFlipped({});
  }, [restart, initialStep]);

  const matchScore = data.exam.matching.filter(
    (it) => match[it.id] === it.key,
  ).length;
  const summaryScore = data.exam.summaryGaps.filter((g) =>
    checkReadM4b(summary[g.id] ?? "", g.answers),
  ).length;

  const needsCheck = step === 1;
  const score = matchScore + summaryScore;
  const total = data.exam.matching.length + data.exam.summaryGaps.length;

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
    setPickedLetter(null);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= READ_M4B_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setPickedLetter(null);
    setStep((s) => s + 1);
  };

  const nextLabel =
    needsCheck && !checked ? "Check →" : READ_M4B_NEXT[step];

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
          {READ_M4B_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
                setPickedLetter(null);
              }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <ExpertDiscussPanel
          key="before-you-read"
          badge={data.beforeYouRead.badge}
          instruction={data.beforeYouRead.instruction}
          questions={data.beforeYouRead.questions}
          cue="Discuss in groups"
        />
      )}

      {step === 1 && (
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
            <p className="write-m2a__expert">{data.exam.strategies}</p>
            <p className="read-m3__instr">
              <span className="write-m2a__badge">{data.exam.badge}</span>
              {data.exam.matchingInstr}
            </p>
            <p className="read-m3__place-hint">
              {pickedLetter
                ? `Selected ${pickedLetter} — click a question row to place it`
                : "Click A–F, then click the dash on a question. Click a filled answer to undo."}
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
            <ul className="read-m3__para-slots read-m3__para-slots--match-rows">
              {data.exam.matching.map((it) => {
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
                      aria-label={`Answer ${it.id}`}
                    >
                      {val ?? "—"}
                    </button>
                    {checked && !ok && (
                      <span className="read-m3__tip">→ {it.key}</span>
                    )}
                  </li>
                );
              })}
            </ul>

            <p className="read-m3__instr read-m3__instr--mt">
              {data.exam.summaryInstr}
            </p>
            <h3 className="read-m3__h">{data.exam.summaryTitle}</h3>
            <p className="read-m3__summary">
              {data.exam.summaryIntro}
              {data.exam.summaryGaps.map((g) => {
                const val = summary[g.id] ?? "";
                const ok = checked && checkReadM4b(val, g.answers);
                const bad = checked && val && !ok;
                return (
                  <span key={g.id}>
                    {" "}
                    <strong>{g.id}</strong>{" "}
                    <input
                      className={`listen-m3b__input${ok ? " listen-m3b__input--ok" : ""}${bad ? " listen-m3b__input--bad" : ""}`}
                      value={val}
                      disabled={checked}
                      onChange={(e) =>
                        setSummary((s) => ({ ...s, [g.id]: e.target.value }))
                      }
                    />
                    {checked && !ok && (
                      <span className="read-m3__tip"> → {g.answers[0]}</span>
                    )}{" "}
                    {g.after}
                  </span>
                );
              })}
            </p>
          </aside>
        </section>
      )}

      {step === 2 && (
        <section className="read-m3__panel">
          <h2 className="read-m3__h">{data.analysis.heading}</h2>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.analysis.badge}</span>
            {data.analysis.instruction}
          </p>
          <ol className="read-m3__qs">
            {data.analysis.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
        </section>
      )}

      {step === 3 && (
        <ExpertDiscussPanel
          key="discussion"
          badge={data.discussion.badge}
          instruction={data.discussion.instruction}
          statements={data.discussion.statements}
          suggestedTitle={data.discussion.suggestedTitle}
          suggestedAnswer={data.discussion.suggestedAnswer}
        />
      )}

      {step === 4 && (
        <section className="read-m4a__phrases">
          <h2 className="read-m3__h">Cool phrases</h2>
          <ol className="read-m4a__phrase-grid">
            {data.coolPhrases.map((phrase, i) => (
              <li key={phrase}>
                <span>{i + 1}</span>
                {phrase}
              </li>
            ))}
          </ol>
        </section>
      )}

      {step === 5 && (
        <section className="read-m4a__flips">
          <p className="read-m3__instr">Click a card to see the upgrade.</p>
          <div className="read-m4a__flip-grid">
            {data.flipCards.map((card, i) => {
              const on = !!flipped[i];
              return (
                <button
                  key={card.plain}
                  type="button"
                  className={`read-m4a__flip ${on ? "read-m4a__flip--on" : ""}`}
                  aria-pressed={on}
                  onClick={() =>
                    setFlipped((prev) => ({ ...prev, [i]: !prev[i] }))
                  }
                >
                  <span className="read-m4a__flip-inner">
                    <span className="read-m4a__flip-face">
                      <span className="read-m4a__flip-kicker">{i + 1}</span>
                      {card.plain}
                    </span>
                    <span className="read-m4a__flip-face read-m4a__flip-back">
                      <span className="read-m4a__flip-kicker">Upgrade</span>
                      <span>{highlightHits(card.upgrade, card.hits)}</span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {step === 6 && (
        <section className="read-m4a__case">
          <article className="read-m4a__case-brief">
            <p className="read-m4a__case-kicker">{data.keepYourself.kicker}</p>
            <h2 className="read-m3__h">{data.keepYourself.heading}</h2>
            <p className="read-m4a__case-task">{data.keepYourself.instruction}</p>
            <p className="read-m4a__case-situation">
              {data.keepYourself.situation}
            </p>
          </article>
          <ol className="read-m4a__case-list">
            {data.keepYourself.checklist.map((item, i) => (
              <li key={item}>
                <span>{i + 1}</span>
                {item}
              </li>
            ))}
          </ol>
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
