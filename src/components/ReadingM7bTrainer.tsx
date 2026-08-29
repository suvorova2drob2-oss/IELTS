import { useEffect, useState } from "react";
import {
  READ_M7B_NEXT,
  READ_M7B_STEPS,
  readingM7b,
} from "../data/readingM7b";

const data = readingM7b;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, READ_M7B_STEPS.length - 1));
}

export function ReadingM7bTrainer({
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
  const [picked, setPicked] = useState<string | null>(null);
  const [strat, setStrat] = useState<Record<number, string>>({});
  const [match, setMatch] = useState<Record<number, string>>({});
  const [summary, setSummary] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setPicked(null);
    setStrat({});
    setMatch({});
    setSummary({});
  }, [restart, initialStep]);

  const needsCheck = step === 1 || step === 2;
  const stratScore = data.strategies.items.filter((i) => strat[i.id] === i.key).length;
  const matchScore = data.matching.stems.filter((s) => match[s.id] === s.key).length;
  const summaryScore = data.summary.gaps.filter((g) => summary[g.id] === g.key).length;
  const score = step === 1 ? stratScore : matchScore + summaryScore;
  const total =
    step === 1
      ? data.strategies.items.length
      : data.matching.stems.length + data.summary.gaps.length;

  const place = (
    map: Record<number, string>,
    setMap: (fn: (m: Record<number, string>) => Record<number, string>) => void,
    id: number,
  ) => {
    if (checked) return;
    if (map[id]) {
      setMap((m) => {
        const next = { ...m };
        delete next[id];
        return next;
      });
      return;
    }
    if (!picked) return;
    setMap((m) => ({ ...m, [id]: picked }));
    setPicked(null);
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
    if (step >= READ_M7B_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setPicked(null);
    setStep((s) => s + 1);
  };

  const nextLabel = needsCheck && !checked ? "Check →" : READ_M7B_NEXT[step];

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
          <button type="button" className="back-link reading-chrome__back" onClick={onBack}>
            ← Модуль
          </button>
        )}
        <span className="badge reading-chrome__badge">
          {data.sectionTitle} · {data.bookPages}
        </span>
        <div className="learn-step-tabs">
          {READ_M7B_STEPS.map((label, i) => (
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
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.strategies.badge}</span>
            {data.strategies.instruction}
          </p>
          <div className="read-m3__bank">
            {data.strategies.options.map((o) => (
              <button
                key={o.id}
                type="button"
                className={`pr-chip ${picked === o.id ? "pr-chip--picked" : ""}`}
                disabled={checked}
                onClick={() => setPicked(o.id)}
              >
                {o.id}
              </button>
            ))}
          </div>
          <ul className="read-m3__opts">
            {data.strategies.options.map((o) => (
              <li key={o.id}>
                <strong>{o.id}</strong> {o.text}
              </li>
            ))}
          </ul>
          <ul className="read-m3__para-slots listen-m3b__grid">
            {data.strategies.items.map((it) => {
              const val = strat[it.id] ?? "";
              const ok = val === it.key;
              return (
                <li key={it.id}>
                  <span>
                    {it.id}. {it.text}
                  </span>
                  <button
                    type="button"
                    className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                    disabled={checked}
                    onClick={() => place(strat, setStrat, it.id)}
                  >
                    {val || "—"}
                  </button>
                  {checked && !ok && <span className="inline-gap-bad"> → {it.key}</span>}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 2 && (
        <section className="read-m3__split read-m3__split--exam">
          {passagePane}
          <aside className="read-m3__side read-m3__side--exam">
            <p className="write-m2a__expert">{data.matching.strategies}</p>
            <p className="read-m3__instr">
              <span className="write-m2a__badge">{data.matching.badge}</span>
              {data.matching.instruction}
            </p>
            <div className="read-m3__bank">
              {data.matching.endings.map((e) => {
                const used = Object.values(match).includes(e.id);
                return (
                  <button
                    key={e.id}
                    type="button"
                    className={`pr-chip ${picked === e.id ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                    disabled={checked || used}
                    onClick={() => setPicked(e.id)}
                  >
                    {e.id}
                  </button>
                );
              })}
            </div>
            <ul className="pr-endings__bank">
              {data.matching.endings.map((e) => (
                <li key={e.id}>
                  <strong>{e.id}</strong> {e.text}
                </li>
              ))}
            </ul>
            <ul className="read-m3__para-slots">
              {data.matching.stems.map((it) => {
                const val = match[it.id];
                const ok = val === it.key;
                return (
                  <li key={it.id}>
                    <span>
                      {it.id}. {it.text}
                    </span>
                    <button
                      type="button"
                      className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                      disabled={checked}
                      onClick={() => place(match, setMatch, it.id)}
                    >
                      {val ?? "—"}
                    </button>
                    {checked && !ok && <span className="inline-gap-bad"> → {it.key}</span>}
                  </li>
                );
              })}
            </ul>
            <p className="read-m3__instr read-m3__instr--mt">
              <span className="write-m2a__badge">{data.summary.badge}</span>
              {data.summary.instruction}
            </p>
            <p className="read-m3__hint">
              <strong>{data.summary.title}</strong>
            </p>
            <div className="read-m3__bank">
              {data.summary.bank.map((b) => {
                const used = Object.values(summary).includes(b.id);
                return (
                  <button
                    key={b.id}
                    type="button"
                    className={`pr-chip ${picked === b.id ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                    disabled={checked || used}
                    onClick={() => setPicked(b.id)}
                  >
                    {b.id} {b.text}
                  </button>
                );
              })}
            </div>
            <article className="read-m3__hint">
              <p>
                {data.summary.before6}{" "}
                {[6, 7, 8, 9, 10].map((id, idx) => {
                  const keys = ["E", "G", "A", "I", "D"];
                  const afters = [
                    data.summary.after6,
                    data.summary.after7,
                    data.summary.after8,
                    data.summary.after9,
                    data.summary.after10,
                  ];
                  const val = summary[id];
                  const ok = val === keys[idx];
                  return (
                    <span key={id}>
                      <button
                        type="button"
                        className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                        disabled={checked}
                        onClick={() => place(summary, setSummary, id)}
                      >
                        {val ?? String(id)}
                      </button>{" "}
                      {afters[idx]}{" "}
                    </span>
                  );
                })}
              </p>
            </article>
          </aside>
        </section>
      )}

      {step === 3 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.discussion.badge}</span>
            {data.discussion.instruction}
          </p>
          <ol className="read-m3__qs">
            {data.discussion.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
        </section>
      )}

      <div className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}>
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
            {step + 1} / {READ_M7B_STEPS.length}
          </span>
        )}
        <button type="button" className="flow-footer__btn flow-footer__btn--primary" onClick={goNext}>
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
