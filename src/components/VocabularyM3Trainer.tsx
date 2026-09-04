import { useEffect, useState } from "react";
import {
  isVocabM3Ital,
  VOCAB_M3_NEXT,
  VOCAB_M3_STEPS,
  vocabularyM3,
} from "../data/vocabularyM3";
import { ExpertDiscussPanel } from "./ExpertDiscussPanel";

const data = vocabularyM3;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, VOCAB_M3_STEPS.length - 1));
}

export function VocabularyM3Trainer({
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
  const [match, setMatch] = useState<Record<number, string>>({});
  const [ital, setItal] = useState<Record<number, string>>({});
  const [colo, setColo] = useState<Record<number, string>>({});
  const [idiomMap, setIdiomMap] = useState<Record<number, string>>({});
  const [pickedLetter, setPickedLetter] = useState<string | null>(null);
  const [fill, setFill] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setPicked(null);
    setMatch({});
    setItal({});
    setColo({});
    setIdiomMap({});
    setPickedLetter(null);
    setFill({});
  }, [restart, initialStep]);

  const italGaps = data.yoga.parts.filter(isVocabM3Ital);
  const matchScore = data.match.items.filter(
    (it) => match[it.id] === it.key,
  ).length;
  const italScore = italGaps.filter((g) => ital[g.gap] === g.key).length;
  const coloScore = data.collocations.items.filter(
    (it) => colo[it.id] === it.key,
  ).length;
  const idiomScore = data.idioms.items.filter(
    (it) => idiomMap[it.id] === it.key,
  ).length;
  const fillScore = data.idiomFill.items.filter(
    (it) => fill[it.id] === it.key,
  ).length;

  const usedMatch = new Set(Object.values(match));
  const usedColo = new Set(Object.values(colo));
  const usedLetters = new Set(Object.values(idiomMap));
  const usedFill = new Set(Object.values(fill));

  const needsCheck = step !== 3;

  const placeMatch = (id: number) => {
    if (checked) return;
    if (match[id]) {
      setMatch((m) => {
        const n = { ...m };
        delete n[id];
        return n;
      });
      return;
    }
    if (!picked) return;
    setMatch((m) => ({ ...m, [id]: picked }));
    setPicked(null);
  };

  const placeColo = (id: number) => {
    if (checked) return;
    if (colo[id]) {
      setColo((c) => {
        const n = { ...c };
        delete n[id];
        return n;
      });
      return;
    }
    if (!picked) return;
    setColo((c) => ({ ...c, [id]: picked }));
    setPicked(null);
  };

  const placeIdiom = (id: number) => {
    if (checked) return;
    if (idiomMap[id]) {
      setIdiomMap((m) => {
        const n = { ...m };
        delete n[id];
        return n;
      });
      return;
    }
    if (!pickedLetter) return;
    setIdiomMap((m) => ({ ...m, [id]: pickedLetter }));
    setPickedLetter(null);
  };

  const placeFill = (id: number) => {
    if (checked) return;
    if (fill[id]) {
      setFill((f) => {
        const n = { ...f };
        delete n[id];
        return n;
      });
      return;
    }
    if (!picked) return;
    setFill((f) => ({ ...f, [id]: picked }));
    setPicked(null);
  };

  const goPrev = () => {
    if (step === 0) {
      onBack?.();
      return;
    }
    setChecked(false);
    setPicked(null);
    setPickedLetter(null);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= VOCAB_M3_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setPicked(null);
    setPickedLetter(null);
    setStep((s) => s + 1);
  };

  const score =
    step === 0
      ? matchScore
      : step === 1
        ? italScore
        : step === 2
          ? coloScore
          : step === 4
            ? idiomScore
            : step === 5
              ? fillScore
              : 0;
  const total =
    step === 0
      ? data.match.items.length
      : step === 1
        ? italGaps.length
        : step === 2
          ? data.collocations.items.length
          : step === 4
            ? data.idioms.items.length
            : step === 5
              ? data.idiomFill.items.length
              : 0;

  return (
    <div className="app-shell reading-flow reading-flow--viewport vocab-m3">
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
          {VOCAB_M3_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
                setPicked(null);
                setPickedLetter(null);
              }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="vocab-m3__panel vocab-m3__panel--fill">
          <h2 className="vocab-m3__h">{data.match.heading}</h2>
          <p className="vocab-m3__instr">
            <span className="write-m2a__badge">{data.match.badge}</span>
            {data.match.instruction}
          </p>
          <p className="vocab-m3__place-hint">
            {picked
              ? `Selected “${picked}” — click a gap in 1–6`
              : "Click a word from the bank, then click a gap in the sentence."}
          </p>
          <div className="vocab-m3__bank">
            {data.match.bank.map((w) => {
              const used = usedMatch.has(w);
              return (
                <button
                  key={w}
                  type="button"
                  className={`pr-chip ${picked === w ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used}
                  onClick={() => setPicked(w)}
                >
                  {w}
                </button>
              );
            })}
          </div>
          <ol className="vocab-m3__list">
            {data.match.items.map((it) => {
              const val = match[it.id];
              const ok = val === it.key;
              let cls = "vocab-m3__gap";
              if (val) cls += " vocab-m3__gap--filled";
              if (picked && !val) cls += " vocab-m3__gap--ready";
              if (checked) cls += ok ? " vocab-m3__gap--ok" : " vocab-m3__gap--bad";
              return (
                <li key={it.id}>
                  <strong>{it.id}.</strong> {it.before}
                  <u>{it.underline}</u>
                  {" → "}
                  <button
                    type="button"
                    className={cls}
                    disabled={checked}
                    onClick={() => placeMatch(it.id)}
                  >
                    {val ?? "—"}
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

      {step === 1 && (
        <section className="vocab-m3__panel vocab-m3__panel--passage">
          <p className="vocab-m3__instr">
            <span className="write-m2a__badge">{data.yoga.badge}</span>
            {data.yoga.instruction}
          </p>
          <article className="vocab-m3__passage vocab-m3__passage--fit">
            <h3>{data.yoga.title}</h3>
            <p>
              {data.yoga.parts.map((part, i) => {
                if (!isVocabM3Ital(part)) {
                  return <span key={i}>{part.text}</span>;
                }
                const sel = ital[part.gap];
                return (
                  <span key={i} className="vocab-m3__ital">
                    <strong className="vocab-m3__n">{part.gap}</strong>
                    <span className="vocab-m3__ital-opts">
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
                            className={`pr-chip vocab-m3__ital-chip ${state}`}
                            disabled={checked}
                            onClick={() =>
                              setItal((a) => ({ ...a, [part.gap]: opt }))
                            }
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </span>
                  </span>
                );
              })}
            </p>
          </article>
        </section>
      )}

      {step === 2 && (
        <section className="vocab-m3__panel vocab-m3__panel--fill">
          <h2 className="vocab-m3__h">{data.collocations.heading}</h2>
          <p className="vocab-m3__instr">
            <span className="write-m2a__badge">{data.collocations.badge}</span>
            {data.collocations.instruction}
          </p>
          <p className="vocab-m3__place-hint">
            {picked
              ? `Selected “${picked}” — click a gap`
              : "Click a collocation from the bank, then click a gap."}
          </p>
          <div className="vocab-m3__bank">
            {data.collocations.bank.map((w) => {
              const used = usedColo.has(w);
              return (
                <button
                  key={w}
                  type="button"
                  className={`pr-chip ${picked === w ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used}
                  onClick={() => setPicked(w)}
                >
                  {w}
                </button>
              );
            })}
          </div>
          <ol className="vocab-m3__list">
            {data.collocations.items.map((it) => {
              const val = colo[it.id];
              const ok = val === it.key;
              let cls = "vocab-m3__gap";
              if (val) cls += " vocab-m3__gap--filled";
              if (picked && !val) cls += " vocab-m3__gap--ready";
              if (checked) cls += ok ? " vocab-m3__gap--ok" : " vocab-m3__gap--bad";
              return (
                <li key={it.id}>
                  <strong>{it.id}.</strong> {it.before}
                  <button
                    type="button"
                    className={cls}
                    disabled={checked}
                    onClick={() => placeColo(it.id)}
                  >
                    {val ?? "—"}
                  </button>
                  {it.after}
                  <strong>{it.bold}</strong>
                  {it.end}
                  {checked && !ok && (
                    <span className="inline-gap-bad"> → {it.key}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {step === 3 && (
        <ExpertDiscussPanel
          key="discuss"
          badge={data.discuss.badge}
          instruction={data.discuss.instruction}
          questions={data.discuss.questions}
          suggestedTitle={data.discuss.suggestedTitle}
          suggestedAnswer={data.discuss.suggestedAnswer}
          languageFocus={data.discuss.languageFocus}
        />
      )}

      {step === 4 && (
        <section className="vocab-m3__idioms vocab-m3__panel--fill">
          <h2 className="vocab-m3__h">{data.idioms.heading}</h2>
          <p className="vocab-m3__instr">
            <span className="write-m2a__badge">{data.idioms.badge}</span>
            {data.idioms.instruction}
          </p>
          <p className="vocab-m3__place-hint">
            {pickedLetter
              ? `Selected ${pickedLetter} — click a gap beside an idiom (1–7)`
              : "Click a meaning (A–G), then click the gap beside an idiom."}
          </p>
          <div className="vocab-m3__idiom-grid">
            <div className="vocab-m3__idiom-col">
              <p className="vocab-m3__idiom-colhead">Idioms 1–7</p>
              <ol className="vocab-m3__idiom-left">
              {data.idioms.items.map((it) => {
                const val = idiomMap[it.id];
                const ok = val === it.key;
                let cls = "vocab-m3__gap";
                if (val) cls += " vocab-m3__gap--filled";
                if (pickedLetter && !val) cls += " vocab-m3__gap--ready";
                if (checked) cls += ok ? " vocab-m3__gap--ok" : " vocab-m3__gap--bad";
                return (
                  <li key={it.id}>
                    <strong>{it.id}.</strong> {it.idiom}{" "}
                    <button
                      type="button"
                      className={cls}
                      disabled={checked}
                      onClick={() => placeIdiom(it.id)}
                    >
                      {val ?? "—"}
                    </button>
                    {checked && !ok && (
                      <span className="inline-gap-bad"> → {it.key}</span>
                    )}
                  </li>
                );
              })}
              </ol>
            </div>
            <div className="vocab-m3__idiom-col">
              <p className="vocab-m3__idiom-colhead">Meanings A–G</p>
              <ul className="vocab-m3__idiom-right">
              {data.idioms.meanings.map((m) => {
                const used = usedLetters.has(m.id);
                return (
                  <li key={m.id}>
                    <button
                      type="button"
                      className={`vocab-m3__meaning ${pickedLetter === m.id ? "vocab-m3__meaning--on" : ""} ${used ? "vocab-m3__meaning--used" : ""}`}
                      disabled={checked || used}
                      onClick={() => setPickedLetter(m.id)}
                    >
                      <strong>{m.id}</strong>
                      <span>{m.text}</span>
                    </button>
                  </li>
                );
              })}
              </ul>
            </div>
          </div>
        </section>
      )}

      {step === 5 && (
        <section className="vocab-m3__panel vocab-m3__panel--fill">
          <p className="vocab-m3__instr">
            <span className="write-m2a__badge">{data.idiomFill.badge}</span>
            {data.idiomFill.instruction}
          </p>
          <p className="vocab-m3__place-hint">
            {picked
              ? `Selected “${picked}” — click a gap in 1–5`
              : "Click an idiom from the bank, then click a gap in the sentence."}
          </p>
          <div className="vocab-m3__bank">
            {data.idiomFill.bank.map((w) => {
              const used = usedFill.has(w);
              return (
                <button
                  key={w}
                  type="button"
                  className={`pr-chip ${picked === w ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used}
                  onClick={() => setPicked(w)}
                >
                  {w}
                </button>
              );
            })}
          </div>
          <ol className="vocab-m3__list">
            {data.idiomFill.items.map((it) => {
              const val = fill[it.id];
              const ok = val === it.key;
              let cls = "vocab-m3__gap";
              if (val) cls += " vocab-m3__gap--filled";
              if (picked && !val) cls += " vocab-m3__gap--ready";
              if (checked) cls += ok ? " vocab-m3__gap--ok" : " vocab-m3__gap--bad";
              return (
                <li key={it.id}>
                  <strong>{it.id}.</strong> {it.before}
                  <button
                    type="button"
                    className={cls}
                    disabled={checked}
                    onClick={() => placeFill(it.id)}
                  >
                    {val ?? "—"}
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
        {checked && needsCheck ? (
          <span className="flow-footer__result">
            <span className="flow-footer__ok">✓ {score}</span>
            <span className="flow-footer__bad">✗ {total - score}</span>
          </span>
        ) : (
          <span className="flow-footer__step">
            {step + 1} / {VOCAB_M3_STEPS.length}
          </span>
        )}
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={goNext}
        >
          {needsCheck && !checked ? "Check →" : VOCAB_M3_NEXT[step]}
        </button>
      </div>
    </div>
  );
}
