import { useEffect, useState, type ReactNode } from "react";
import {
  checkVocabM2,
  isGapBit,
  isProcessGap,
  VOCAB_M2_NEXT,
  VOCAB_M2_STEPS,
  vocabM2GapIds,
  vocabM2TableBlanks,
  vocabularyM2,
  type FormCell,
} from "../data/vocabularyM2";

const STEP_KEY = "ielts-vocabulary-m2-step";
const data = vocabularyM2;
const gapIds = vocabM2GapIds();
const tableBlanks = vocabM2TableBlanks();

function loadStep(restart?: boolean, initialStep?: number): number {
  if (initialStep != null) return initialStep;
  if (restart) return 0;
  try {
    const raw = sessionStorage.getItem(STEP_KEY);
    if (raw != null) {
      const n = Number(raw);
      if (n >= 0 && n < VOCAB_M2_STEPS.length) return n;
    }
  } catch {
    /* ignore */
  }
  return 0;
}

function OralBanner({ children }: { children: ReactNode }) {
  return (
    <div className="oral-banner">
      <span className="oral-banner__icon" aria-hidden>
        🎤
      </span>
      <p>{children}</p>
    </div>
  );
}

function TableCell({
  cell,
  values,
  onChange,
  checked,
}: {
  cell: FormCell;
  values: Record<number, string>;
  onChange: (id: number, v: string) => void;
  checked: boolean;
}) {
  if ("given" in cell) {
    return <span className="vm2-given">{cell.given}</span>;
  }
  const val = values[cell.id] ?? "";
  const ok = checkVocabM2(val, cell.answers);
  return (
    <span className="vm2-blank">
      <input
        className={`inline-gap-input ${checked ? (ok ? "inline-gap-input--ok" : "inline-gap-input--bad") : ""}`}
        value={val}
        disabled={checked}
        placeholder={`${cell.id}`}
        onChange={(e) => onChange(cell.id, e.target.value)}
      />
      {checked && !ok && (
        <span className="inline-gap-bad"> → {cell.answers[0]}</span>
      )}
    </span>
  );
}

export function VocabularyM2Trainer({
  onBack,
  restart,
  initialStep,
}: {
  onBack?: () => void;
  restart?: boolean;
  initialStep?: number;
}) {
  const [step, setStep] = useState(() => loadStep(restart, initialStep));
  const [checked, setChecked] = useState(false);
  const [matches, setMatches] = useState<Record<number, string>>({});
  const [picked, setPicked] = useState<string | null>(null);
  const [gaps, setGaps] = useState<Record<number, string>>({});
  const [styleAns, setStyleAns] = useState<
    Record<number, "spoken" | "written" | undefined>
  >({});
  const [phrasal, setPhrasal] = useState<Record<number, string>>({});
  const [process, setProcess] = useState<Record<number, string>>({});
  const [table, setTable] = useState<Record<number, string>>({});

  useEffect(() => {
    if (restart) {
      setStep(initialStep ?? 0);
      setChecked(false);
    }
  }, [restart, initialStep]);

  useEffect(() => {
    if (initialStep != null) {
      setStep(initialStep);
      setChecked(false);
    }
  }, [initialStep]);

  useEffect(() => {
    try {
      sessionStorage.setItem(STEP_KEY, String(step));
    } catch {
      /* ignore */
    }
  }, [step]);

  const matchScore = data.meanings.filter((m) => matches[m.id] === m.key).length;
  const gapScore = data.gapText.parts.filter(isGapBit).filter((p) =>
    checkVocabM2(gaps[p.gap] ?? "", p.answers),
  ).length;
  const styleScore = data.spokenWritten.items.filter(
    (it) => styleAns[it.id] === it.key,
  ).length;
  const phrasalScore = data.phrasal.items.filter((it) =>
    checkVocabM2(phrasal[it.id] ?? "", it.answers),
  ).length;
  const processScore = data.process.parts.filter(isProcessGap).filter(
    (p) => process[p.gap] === p.key,
  ).length;
  const tableScore = tableBlanks.filter((b) =>
    checkVocabM2(table[b.id] ?? "", b.answers),
  ).length;

  const score =
    step === 0
      ? matchScore
      : step === 1
        ? gapScore
        : step === 2
          ? styleScore
          : step === 3
            ? phrasalScore
            : step === 4
              ? processScore
              : tableScore;
  const total =
    step === 0
      ? data.meanings.length
      : step === 1
        ? gapIds.length
        : step === 2
          ? data.spokenWritten.items.length
          : step === 3
            ? data.phrasal.items.length
            : step === 4
              ? 7
              : tableBlanks.length;

  const usedVerbs = new Set(Object.values(matches).filter(Boolean));

  const placeVerb = (meaningId: number) => {
    if (checked || !picked) return;
    setMatches((m) => {
      const next = { ...m };
      for (const [k, v] of Object.entries(next)) {
        if (v === picked) delete next[Number(k)];
      }
      next[meaningId] = picked;
      return next;
    });
    setPicked(null);
  };

  const goNext = () => {
    if (!checked) {
      setChecked(true);
      return;
    }
    if (step >= VOCAB_M2_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setPicked(null);
    setStep((s) => s + 1);
  };

  return (
    <div className="app-shell reading-flow reading-flow--viewport vocab-m2">
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
          Vocabulary · {data.bookPages}
        </span>
        <div className="learn-step-tabs">
          {VOCAB_M2_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
                setPicked(null);
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="card flow-card vm2-card">
          <h2 className="card-title">
            <span className="dot" />
            1a Academic verbs
          </h2>
          <p className="learn-screen__hint">
            Match the verbs with their meanings. Click a verb, then a meaning.
          </p>
          <div className="vm2-match">
            <div className="vm2-bank">
              {data.verbs.map((v) => {
                const used = usedVerbs.has(v);
                return (
                  <button
                    key={v}
                    type="button"
                    className={`pr-chip ${picked === v ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                    disabled={checked}
                    onClick={() => setPicked((p) => (p === v ? null : v))}
                  >
                    {v}
                  </button>
                );
              })}
            </div>
            <ol className="vm2-meanings">
              {data.meanings.map((m) => {
                const val = matches[m.id];
                const ok = val === m.key;
                return (
                  <li
                    key={m.id}
                    className={
                      checked
                        ? ok
                          ? "vm2-meanings__ok"
                          : "vm2-meanings__bad"
                        : picked
                          ? "vm2-meanings__drop"
                          : ""
                    }
                  >
                    <button
                      type="button"
                      disabled={checked}
                      onClick={() => placeVerb(m.id)}
                    >
                      <span className="pr-mc__num">{m.id}</span>
                      <span>{m.text}</span>
                      {val && <strong>{val}</strong>}
                      {checked && !ok && (
                        <span className="inline-gap-bad"> → {m.key}</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      )}

      {step === 1 && (
        <section className="card flow-card vm2-card">
          <h2 className="card-title">
            <span className="dot" />
            1b Verb forms
          </h2>
          <p className="learn-screen__hint">{data.gapText.instruction}</p>
          <p className="vm2-bank">
            {data.verbs.map((v) => (
              <span key={v} className="vocab-tag">
                {v}
              </span>
            ))}
          </p>
          <article className="vm2-passage">
            <h3>{data.gapText.title}</h3>
            <p>
              {data.gapText.parts.map((part, i) => {
                if (!isGapBit(part)) return <span key={i}>{part.text}</span>;
                const val = gaps[part.gap] ?? "";
                const ok = checkVocabM2(val, part.answers);
                return (
                  <span key={i} className="inline-gap-wrap">
                    <strong className="vm2-n">{part.gap}</strong>
                    <input
                      className={`inline-gap-input ${checked ? (ok ? "inline-gap-input--ok" : "inline-gap-input--bad") : ""}`}
                      value={val}
                      disabled={checked}
                      onChange={(e) =>
                        setGaps((g) => ({ ...g, [part.gap]: e.target.value }))
                      }
                    />
                    {checked && !ok && (
                      <span className="inline-gap-bad"> → {part.answers[0]}</span>
                    )}
                  </span>
                );
              })}
            </p>
            {checked && (
              <p className="line-hint">Extra verb: {data.gapText.unused}</p>
            )}
          </article>
        </section>
      )}

      {step === 2 && (
        <section className="card flow-card vm2-card">
          <h2 className="card-title">
            <span className="dot" />
            2a Written and spoken vocabulary
          </h2>
          <p className="learn-screen__hint">{data.spokenWritten.instruction}</p>
          <ul className="vm2-style">
            {data.spokenWritten.items.map((it) => {
              const sel = styleAns[it.id];
              return (
                <li key={it.id}>
                  <p>
                    <strong>{it.id}.</strong> {it.text}
                  </p>
                  <div className="pr-tfng__choices">
                    {(["written", "spoken"] as const).map((opt) => {
                      let state = "";
                      if (checked) {
                        if (opt === it.key) state = "pr-chip--ok";
                        else if (sel === opt) state = "pr-chip--bad";
                      } else if (sel === opt) state = "pr-chip--picked";
                      return (
                        <button
                          key={opt}
                          type="button"
                          className={`pr-chip ${state}`}
                          onClick={() =>
                            !checked &&
                            setStyleAns((a) => ({ ...a, [it.id]: opt }))
                          }
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {checked && <p className="line-hint">{it.why}</p>}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 3 && (
        <section className="card flow-card vm2-card">
          <h2 className="card-title">
            <span className="dot" />
            2b Spoken forms
          </h2>
          <p className="learn-screen__hint">{data.phrasal.instruction}</p>
          <p className="vm2-bank">
            {data.phrasal.bank.map((p) => (
              <span key={p} className="vocab-tag">
                {p}
              </span>
            ))}
          </p>
          <ol className="vm2-phrasal">
            {data.phrasal.items.map((it) => {
              const val = phrasal[it.id] ?? "";
              const ok = checkVocabM2(val, it.answers);
              return (
                <li key={it.id}>
                  <p>
                    {it.before}
                    <em>{it.bold}</em>
                    {it.after}
                  </p>
                  <input
                    className={`inline-gap-input ${checked ? (ok ? "inline-gap-input--ok" : "inline-gap-input--bad") : ""}`}
                    value={val}
                    disabled={checked}
                    placeholder="spoken phrase"
                    onChange={(e) =>
                      setPhrasal((a) => ({ ...a, [it.id]: e.target.value }))
                    }
                  />
                  {checked && !ok && (
                    <span className="inline-gap-bad"> → {it.answers[0]}</span>
                  )}
                </li>
              );
            })}
          </ol>
          {checked && (
            <p className="line-hint">Extra phrase: {data.phrasal.extra}</p>
          )}
          <OralBanner>{data.phrasal.discuss}</OralBanner>
        </section>
      )}

      {step === 4 && (
        <section className="card flow-card vm2-card">
          <h2 className="card-title">
            <span className="dot" />
            3a Process verbs
          </h2>
          <p className="learn-screen__hint">{data.process.instruction}</p>
          <article className="vm2-passage">
            <h3>{data.process.title}</h3>
            <p>
              {data.process.parts.map((part, i) => {
                if (!isProcessGap(part)) return <span key={i}>{part.text}</span>;
                const sel = process[part.gap];
                return (
                  <span key={i} className="vm2-italics">
                    <strong className="vm2-n">{part.gap}</strong>
                    {part.options.map((opt) => {
                      let state = "";
                      if (checked) {
                        if (opt === part.key) state = "pr-chip--ok";
                        else if (sel === opt) state = "pr-chip--bad";
                      } else if (sel === opt) state = "pr-chip--picked";
                      return (
                        <button
                          key={opt}
                          type="button"
                          className={`pr-chip ${state}`}
                          onClick={() =>
                            !checked &&
                            setProcess((p) => ({ ...p, [part.gap]: opt }))
                          }
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </span>
                );
              })}
            </p>
          </article>
        </section>
      )}

      {step === 5 && (
        <section className="card flow-card vm2-card">
          <h2 className="card-title">
            <span className="dot" />
            3b Word forms
          </h2>
          <p className="learn-screen__hint">{data.wordTable.instruction}</p>
          <table className="vm2-table">
            <thead>
              <tr>
                <th>Noun</th>
                <th>Verb</th>
                <th>Adjective</th>
              </tr>
            </thead>
            <tbody>
              {data.wordTable.rows.map((row, i) => (
                <tr key={i}>
                  <td>
                    <TableCell
                      cell={row.noun}
                      values={table}
                      onChange={(id, v) => setTable((t) => ({ ...t, [id]: v }))}
                      checked={checked}
                    />
                  </td>
                  <td>
                    <TableCell
                      cell={row.verb}
                      values={table}
                      onChange={(id, v) => setTable((t) => ({ ...t, [id]: v }))}
                      checked={checked}
                    />
                  </td>
                  <td>
                    <TableCell
                      cell={row.adj}
                      values={table}
                      onChange={(id, v) => setTable((t) => ({ ...t, [id]: v }))}
                      checked={checked}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <div className={`flow-footer ${checked ? "flow-footer--checked" : ""}`}>
        <button
          type="button"
          className="flow-footer__btn"
          disabled={step === 0}
          onClick={() => {
            setChecked(false);
            setPicked(null);
            setStep((s) => Math.max(0, s - 1));
          }}
        >
          ← Назад
        </button>
        {checked ? (
          <span className="flow-footer__result">
            <span className="flow-footer__ok">✓ {score}</span>
            <span className="flow-footer__bad">✗ {total - score}</span>
          </span>
        ) : (
          <span className="flow-footer__step">
            {step + 1} / {VOCAB_M2_STEPS.length}
          </span>
        )}
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={goNext}
        >
          {checked ? VOCAB_M2_NEXT[step] : "Check →"}
        </button>
      </div>
    </div>
  );
}
