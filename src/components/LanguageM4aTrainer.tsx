import { useEffect, useState } from "react";
import {
  checkLangM4a,
  LANG_M4A_NEXT,
  LANG_M4A_STEPS,
  languageM4a,
} from "../data/languageM4a";

const data = languageM4a;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, LANG_M4A_STEPS.length - 1));
}

function normalizePunct(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\n+/g, " ");
}

export function LanguageM4aTrainer({
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
  const [fragPick, setFragPick] = useState<string[]>([]);
  const [errorTypes, setErrorTypes] = useState<Record<number, string>>({});
  const [pickedType, setPickedType] = useState<string | null>(null);
  const [rewrites, setRewrites] = useState<Record<number, string>>({});
  const [mcq, setMcq] = useState<Record<number, string>>({});
  const [match, setMatch] = useState<Record<string, string>>({});
  const [pickedEnd, setPickedEnd] = useState<string | null>(null);
  const [punct, setPunct] = useState("");
  const [ownIdeas, setOwnIdeas] = useState<Record<number, string>>({});
  const [phraseOrClause, setPhraseOrClause] = useState<string | null>(null);
  const [thatGaps, setThatGaps] = useState<Record<number, string>>({});
  const [pickedThat, setPickedThat] = useState<string | null>(null);

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setFragPick([]);
    setErrorTypes({});
    setPickedType(null);
    setRewrites({});
    setMcq({});
    setMatch({});
    setPickedEnd(null);
    setPunct("");
    setOwnIdeas({});
    setPhraseOrClause(null);
    setThatGaps({});
    setPickedThat(null);
  }, [restart, initialStep]);

  const fragScore = data.fragments1a.fragments.filter((f) =>
    fragPick.includes(f),
  ).length;
  const typeScore = data.errorTypes1b.items.filter(
    (it) => errorTypes[it.id] === it.key,
  ).length;
  const rewriteScore = data.rewrite1c.items.filter((it) =>
    checkLangM4a(rewrites[it.id] ?? "", it.answers),
  ).length;
  const mcqScore = data.mcq2.items.filter((it) => mcq[it.id] === it.key).length;
  const matchScore = data.match3.beginnings.filter(
    (b) => match[b.id] === data.match3.keys[b.id],
  ).length;
  const punctOk =
    normalizePunct(punct) === normalizePunct(data.punctuate4.corrected);
  const thatOk = phraseOrClause === data.thatClauses.q6a.key;
  const thatGapScore = data.thatClauses.gap6b.items.filter(
    (it) => thatGaps[it.id] === it.key,
  ).length;

  const usedTypes = new Set(Object.values(errorTypes));
  const usedEnds = new Set(Object.values(match));
  const usedThat = new Set(Object.values(thatGaps));

  const needsCheck = true;
  const score =
    step === 0
      ? fragScore
      : step === 1
        ? typeScore + rewriteScore
        : step === 2
          ? mcqScore + matchScore
          : step === 3
            ? punctOk
              ? 1
              : 0
            : (thatOk ? 1 : 0) + thatGapScore;
  const total =
    step === 0
      ? data.fragments1a.fragments.length
      : step === 1
        ? data.errorTypes1b.items.length + data.rewrite1c.items.length
        : step === 2
          ? data.mcq2.items.length + data.match3.beginnings.length
          : step === 3
            ? 1
            : 1 + data.thatClauses.gap6b.items.length;

  const toggleFrag = (f: string) => {
    if (checked) return;
    setFragPick((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f],
    );
  };

  const placeType = (id: number) => {
    if (checked) return;
    if (errorTypes[id]) {
      setErrorTypes((m) => {
        const n = { ...m };
        delete n[id];
        return n;
      });
      return;
    }
    if (!pickedType) return;
    setErrorTypes((m) => ({ ...m, [id]: pickedType }));
    setPickedType(null);
  };

  const placeMatch = (beginId: string) => {
    if (checked) return;
    if (match[beginId]) {
      setMatch((m) => {
        const n = { ...m };
        delete n[beginId];
        return n;
      });
      return;
    }
    if (!pickedEnd) return;
    setMatch((m) => ({ ...m, [beginId]: pickedEnd }));
    setPickedEnd(null);
  };

  const placeThat = (id: number) => {
    if (checked) return;
    if (thatGaps[id]) {
      setThatGaps((m) => {
        const n = { ...m };
        delete n[id];
        return n;
      });
      return;
    }
    if (!pickedThat) return;
    setThatGaps((m) => ({ ...m, [id]: pickedThat }));
    setPickedThat(null);
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
    if (!checked) {
      setChecked(true);
      return;
    }
    if (step >= LANG_M4A_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setStep((s) => s + 1);
  };

  const nextLabel = !checked ? "Check →" : LANG_M4A_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport lang-m3b">
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
          {LANG_M4A_STEPS.map((label, i) => (
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
        <section className="lang-m3b__panel">
          <h2 className="lang-m3b__h">{data.fragments1a.heading}</h2>
          <p className="write-m2a__expert">{data.grammarRef}</p>
          <p className="lang-m3b__instr">
            <span className="write-m2a__badge">{data.fragments1a.badge}</span>
            {data.fragments1a.instruction}
          </p>
          <article className="lang-m3b__passage">
            <p>{data.fragments1a.text}</p>
          </article>
          <p className="lang-m3b__hint">
            Tap each fragment below to mark it as incomplete.
          </p>
          <div className="lang-m3b__bank">
            {data.fragments1a.fragments.map((f) => {
              const on = fragPick.includes(f);
              let state = "";
              if (checked) {
                if (on) state = "pr-chip--ok";
              } else if (on) state = "pr-chip--picked";
              return (
                <button
                  key={f}
                  type="button"
                  className={`pr-chip ${state}`}
                  disabled={checked}
                  onClick={() => toggleFrag(f)}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {step === 1 && (
        <section className="lang-m3b__panel">
          <p className="lang-m3b__instr">
            <span className="write-m2a__badge">{data.errorTypes1b.badge}</span>
            {data.errorTypes1b.instruction}
          </p>
          <div className="lang-m3b__bank">
            {data.errorTypes1b.types.map((t) => {
              const used = usedTypes.has(t.id);
              return (
                <button
                  key={t.id}
                  type="button"
                  className={`pr-chip ${pickedType === t.id ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used}
                  onClick={() => setPickedType(t.id)}
                >
                  {t.id} {t.label}
                </button>
              );
            })}
          </div>
          <ol className="lang-m3b__list">
            {data.errorTypes1b.items.map((it) => {
              const val = errorTypes[it.id];
              const ok = val === it.key;
              let cls = "review-m2__slot";
              if (val) cls += " review-m2__slot--filled";
              if (pickedType && !val) cls += " review-m2__slot--ready";
              if (checked)
                cls += ok ? " review-m2__slot--ok" : " review-m2__slot--bad";
              return (
                <li key={it.id}>
                  <strong>{it.id}.</strong> {it.text}{" "}
                  <button
                    type="button"
                    className={cls}
                    disabled={checked}
                    onClick={() => placeType(it.id)}
                  >
                    {val ?? "—"}
                  </button>
                  {checked && (
                    <p className="lang-m3b__tip">{it.tip}</p>
                  )}
                </li>
              );
            })}
          </ol>

          <p className="lang-m3b__instr">
            <span className="write-m2a__badge">{data.rewrite1c.badge}</span>
            {data.rewrite1c.instruction}
          </p>
          <ol className="lang-m3b__list">
            {data.rewrite1c.items.map((it) => {
              const val = rewrites[it.id] ?? "";
              const ok = checkLangM4a(val, it.answers);
              return (
                <li key={it.id}>
                  <p>
                    <strong>{it.id}.</strong> {it.stem}
                  </p>
                  <span
                    className={`inline-gap-wrap ${checked && ok ? "inline-gap-wrap--ok" : ""} ${checked && !ok ? "inline-gap-wrap--bad" : ""}`}
                  >
                    <input
                      className={`inline-gap-input ${checked && ok ? "inline-gap-input--ok" : ""} ${checked && !ok ? "inline-gap-input--bad" : ""}`}
                      value={val}
                      disabled={checked}
                      placeholder="Complete sentence…"
                      onChange={(e) =>
                        setRewrites((r) => ({ ...r, [it.id]: e.target.value }))
                      }
                    />
                    {checked && !ok && (
                      <span className="inline-gap-bad">
                        {" "}
                        → {it.answers[0]}
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {step === 2 && (
        <section className="lang-m3b__panel">
          <h2 className="lang-m3b__h">{data.mcq2.heading}</h2>
          <p className="lang-m3b__instr">
            <span className="write-m2a__badge">{data.mcq2.badge}</span>
            {data.mcq2.instruction}
          </p>
          <ul className="lang-m3b__mc-grid">
            {data.mcq2.items.map((it) => (
              <li key={it.id}>
                <p>
                  <strong>{it.id}.</strong> {it.prompt}
                </p>
                <div className="lang-m3b__bank">
                  {it.options.map((opt) => {
                    const sel = mcq[it.id] === opt.id;
                    let state = "";
                    if (checked) {
                      if (opt.id === it.key) state = "pr-chip--ok";
                      else if (sel) state = "pr-chip--bad";
                    } else if (sel) state = "pr-chip--picked";
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        className={`pr-chip ${state}`}
                        disabled={checked}
                        onClick={() =>
                          setMcq((m) => ({ ...m, [it.id]: opt.id }))
                        }
                      >
                        <strong>{opt.id}</strong> {opt.text}
                      </button>
                    );
                  })}
                </div>
              </li>
            ))}
          </ul>

          <p className="lang-m3b__instr">
            <span className="write-m2a__badge">{data.match3.badge}</span>
            {data.match3.instruction}
          </p>
          <div className="lang-m3b__bank">
            {data.match3.endings.map((e) => {
              const used = usedEnds.has(e.id);
              return (
                <button
                  key={e.id}
                  type="button"
                  className={`pr-chip ${pickedEnd === e.id ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used}
                  onClick={() => setPickedEnd(e.id)}
                >
                  {e.id}. {e.text}
                </button>
              );
            })}
          </div>
          <ol className="lang-m3b__list">
            {data.match3.beginnings.map((b) => {
              const val = match[b.id];
              const ok = val === data.match3.keys[b.id];
              let cls = "review-m2__slot";
              if (val) cls += " review-m2__slot--filled";
              if (pickedEnd && !val) cls += " review-m2__slot--ready";
              if (checked)
                cls += ok ? " review-m2__slot--ok" : " review-m2__slot--bad";
              return (
                <li key={b.id}>
                  <strong>{b.id}.</strong> {b.text}{" "}
                  <button
                    type="button"
                    className={cls}
                    disabled={checked}
                    onClick={() => placeMatch(b.id)}
                  >
                    {val ?? "—"}
                  </button>
                  {checked && !ok && (
                    <span className="inline-gap-bad">
                      {" "}
                      → {data.match3.keys[b.id]}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {step === 3 && (
        <section className="lang-m3b__panel">
          <p className="lang-m3b__instr">
            <span className="write-m2a__badge">{data.punctuate4.badge}</span>
            {data.punctuate4.instruction}
          </p>
          <p className="lang-m3b__hint">{data.punctuate4.flawed}</p>
          <textarea
            rows={6}
            value={punct}
            disabled={checked}
            placeholder="Rewrite with correct punctuation…"
            onChange={(e) => setPunct(e.target.value)}
          />
          {checked && (
            <pre className="lang-m3b__tip" style={{ whiteSpace: "pre-wrap" }}>
              {data.punctuate4.corrected}
            </pre>
          )}
        </section>
      )}

      {step === 4 && (
        <section className="lang-m3b__panel">
          <p className="lang-m3b__instr">
            <span className="write-m2a__badge">{data.ownIdeas5.badge}</span>
            {data.ownIdeas5.instruction}
          </p>
          <ol className="lang-m3b__list">
            {data.ownIdeas5.stems.map((stem, i) => (
              <li key={stem}>
                <p>
                  <strong>{i + 1}.</strong> {stem}
                </p>
                <textarea
                  rows={2}
                  value={ownIdeas[i] ?? ""}
                  onChange={(e) =>
                    setOwnIdeas((o) => ({ ...o, [i]: e.target.value }))
                  }
                />
                {checked && (
                  <p className="lang-m3b__tip">
                    Suggested: {data.ownIdeas5.suggested[i]}
                  </p>
                )}
              </li>
            ))}
          </ol>

          <h2 className="lang-m3b__h">{data.thatClauses.heading}</h2>
          <p className="lang-m3b__instr">
            <span className="write-m2a__badge">
              {data.thatClauses.q6a.badge}
            </span>
            {data.thatClauses.q6a.instruction}
          </p>
          <p className="lang-m3b__hint">{data.thatClauses.q6a.sentence}</p>
          <div className="lang-m3b__bank">
            {data.thatClauses.q6a.options.map((opt) => {
              const sel = phraseOrClause === opt.id;
              let state = "";
              if (checked) {
                if (opt.id === data.thatClauses.q6a.key) state = "pr-chip--ok";
                else if (sel) state = "pr-chip--bad";
              } else if (sel) state = "pr-chip--picked";
              return (
                <button
                  key={opt.id}
                  type="button"
                  className={`pr-chip ${state}`}
                  disabled={checked}
                  onClick={() => setPhraseOrClause(opt.id)}
                >
                  {opt.id} {opt.text}
                </button>
              );
            })}
          </div>
          {checked && (
            <p className="lang-m3b__tip">{data.thatClauses.q6a.tip}</p>
          )}

          <p className="lang-m3b__instr">
            <span className="write-m2a__badge">
              {data.thatClauses.gap6b.badge}
            </span>
            {data.thatClauses.gap6b.instruction}
          </p>
          <div className="lang-m3b__bank">
            {data.thatClauses.gap6b.bank.map((w) => {
              const used = usedThat.has(w);
              return (
                <button
                  key={w}
                  type="button"
                  className={`pr-chip ${pickedThat === w ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used}
                  onClick={() => setPickedThat(w)}
                >
                  {w}
                </button>
              );
            })}
          </div>
          <ol className="lang-m3b__list">
            {data.thatClauses.gap6b.items.map((it) => {
              const val = thatGaps[it.id];
              const ok = val === it.key;
              let cls = "review-m2__slot";
              if (val) cls += " review-m2__slot--filled";
              if (pickedThat && !val) cls += " review-m2__slot--ready";
              if (checked)
                cls += ok ? " review-m2__slot--ok" : " review-m2__slot--bad";
              return (
                <li key={it.id}>
                  <strong>{it.id}.</strong> {it.before}
                  <button
                    type="button"
                    className={cls}
                    disabled={checked}
                    onClick={() => placeThat(it.id)}
                  >
                    {val ?? "________"}
                  </button>
                  {it.after}
                  {checked && !ok && (
                    <span className="inline-gap-bad"> → {it.key}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      )}

      <div
        className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}
      >
        <button type="button" className="flow-footer__btn" onClick={goPrev}>
          ← Назад
        </button>
        {checked ? (
          <span className="flow-footer__result">
            <span className="flow-footer__ok">✓ {score}</span>
            <span className="flow-footer__bad">✗ {total - score}</span>
          </span>
        ) : (
          <span className="flow-footer__step">
            {step + 1} / {LANG_M4A_STEPS.length}
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
