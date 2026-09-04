import { useEffect, useState } from "react";
import {
  checkVocabM4,
  isVocabM4Gap,
  VOCAB_M4_NEXT,
  VOCAB_M4_STEPS,
  vocabularyM4,
} from "../data/vocabularyM4";

const data = vocabularyM4;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, VOCAB_M4_STEPS.length - 1));
}

type RuleSlots = Record<number, [string | null, string | null]>;

function emptyRules(): RuleSlots {
  const out: RuleSlots = {};
  for (const it of data.rules2b.items) out[it.id] = [null, null];
  return out;
}

export function VocabularyM4Trainer({
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
  const [match1a, setMatch1a] = useState<Record<number, string>>({});
  const [gap1b, setGap1b] = useState<Record<number, string>>({});
  const [style2a, setStyle2a] = useState<
    Record<number, "impersonal" | "personal" | undefined>
  >({});
  const [rules2b, setRules2b] = useState<RuleSlots>(() => emptyRules());
  const [forms3, setForms3] = useState<Record<number, string>>({});
  const [improve4, setImprove4] = useState<Record<number, string>>({});
  const [colo5a, setColo5a] = useState<Record<number, string>>({});
  const [pickedLetter, setPickedLetter] = useState<string | null>(null);
  const [colo5b, setColo5b] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setPicked(null);
    setMatch1a({});
    setGap1b({});
    setStyle2a({});
    setRules2b(emptyRules());
    setForms3({});
    setImprove4({});
    setColo5a({});
    setPickedLetter(null);
    setColo5b({});
  }, [restart, initialStep]);

  const gap1bParts = data.gap1b.parts.filter(isVocabM4Gap);

  const match1aScore = data.match1a.items.filter(
    (it) => match1a[it.id] === it.key,
  ).length;
  const gap1bScore = gap1bParts.filter((g) => gap1b[g.gap] === g.key).length;
  const style2aScore = data.impersonal2a.items.filter(
    (it) => style2a[it.id] === it.key,
  ).length;
  const rules2bScore = data.rules2b.items.reduce((n, it) => {
    const slots = rules2b[it.id] ?? [null, null];
    return (
      n +
      (slots[0] === it.answers[0] ? 1 : 0) +
      (slots[1] === it.answers[1] ? 1 : 0)
    );
  }, 0);
  const forms3Score = data.wordForms3.items.filter((it) =>
    checkVocabM4(forms3[it.id] ?? "", it.answers),
  ).length;
  const improve4Score = data.improve4.items.filter((it) =>
    checkVocabM4(improve4[it.id] ?? "", it.answers),
  ).length;
  const colo5aScore = data.collocations5a.left.filter(
    (it) => colo5a[it.id] === data.collocations5a.keys[it.id],
  ).length;
  const colo5bScore = data.collocations5b.items.filter(
    (it) => colo5b[it.id] === it.key,
  ).length;

  const usedMatch1a = new Set(Object.values(match1a));
  const usedGap1b = new Set(Object.values(gap1b));
  const usedLetters = new Set(Object.values(colo5a));
  const usedColo5b = new Set(Object.values(colo5b));

  const rulesNeeded: Record<string, number> = {};
  for (const it of data.rules2b.items) {
    for (const a of it.answers) {
      rulesNeeded[a] = (rulesNeeded[a] ?? 0) + 1;
    }
  }
  const rulesUsedCount: Record<string, number> = {};
  for (const slots of Object.values(rules2b)) {
    for (const w of slots) {
      if (w) rulesUsedCount[w] = (rulesUsedCount[w] ?? 0) + 1;
    }
  }

  const needsCheck = true;

  const placeMatch1a = (id: number) => {
    if (checked) return;
    if (match1a[id]) {
      setMatch1a((m) => {
        const n = { ...m };
        delete n[id];
        return n;
      });
      return;
    }
    if (!picked) return;
    setMatch1a((m) => ({ ...m, [id]: picked }));
    setPicked(null);
  };

  const placeGap1b = (gap: number) => {
    if (checked) return;
    if (gap1b[gap]) {
      setGap1b((g) => {
        const n = { ...g };
        delete n[gap];
        return n;
      });
      return;
    }
    if (!picked) return;
    setGap1b((g) => ({ ...g, [gap]: picked }));
    setPicked(null);
  };

  const placeRuleSlot = (id: number, slot: 0 | 1) => {
    if (checked) return;
    const cur = rules2b[id] ?? [null, null];
    if (cur[slot]) {
      setRules2b((r) => {
        const next = [...(r[id] ?? [null, null])] as [string | null, string | null];
        next[slot] = null;
        return { ...r, [id]: next };
      });
      return;
    }
    if (!picked) return;
    setRules2b((r) => {
      const next = [...(r[id] ?? [null, null])] as [string | null, string | null];
      next[slot] = picked;
      return { ...r, [id]: next };
    });
    setPicked(null);
  };

  const placeColo5a = (id: number) => {
    if (checked) return;
    if (colo5a[id]) {
      setColo5a((m) => {
        const n = { ...m };
        delete n[id];
        return n;
      });
      return;
    }
    if (!pickedLetter) return;
    setColo5a((m) => ({ ...m, [id]: pickedLetter }));
    setPickedLetter(null);
  };

  const placeColo5b = (id: number) => {
    if (checked) return;
    if (colo5b[id]) {
      setColo5b((m) => {
        const n = { ...m };
        delete n[id];
        return n;
      });
      return;
    }
    if (!picked) return;
    setColo5b((m) => ({ ...m, [id]: picked }));
    setPicked(null);
  };

  const clearPick = () => {
    setPicked(null);
    setPickedLetter(null);
  };

  const goPrev = () => {
    if (step === 0) {
      onBack?.();
      return;
    }
    setChecked(false);
    clearPick();
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= VOCAB_M4_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    clearPick();
    setStep((s) => s + 1);
  };

  const score =
    step === 0
      ? match1aScore
      : step === 1
        ? gap1bScore
        : step === 2
          ? style2aScore + rules2bScore
          : step === 3
            ? forms3Score
            : step === 4
              ? improve4Score
              : colo5aScore + colo5bScore;
  const total =
    step === 0
      ? data.match1a.items.length
      : step === 1
        ? gap1bParts.length
        : step === 2
          ? data.impersonal2a.items.length + data.rules2b.items.length * 2
          : step === 3
            ? data.wordForms3.items.length
            : step === 4
              ? data.improve4.items.length
              : data.collocations5a.left.length + data.collocations5b.items.length;

  const gapCls = (
    val: string | null | undefined,
    ready: boolean,
    ok: boolean,
    base = "vocab-m3__gap",
  ) => {
    let cls = base;
    if (val) cls += ` ${base}--filled`;
    if (ready && !val) cls += ` ${base}--ready`;
    if (checked) cls += ok ? ` ${base}--ok` : ` ${base}--bad`;
    return cls;
  };

  return (
    <div className="app-shell reading-flow reading-flow--viewport vocab-m4">
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
          {VOCAB_M4_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
                clearPick();
              }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="vocab-m3__panel vocab-m3__panel--fill">
          <h2 className="vocab-m3__h">{data.match1a.heading}</h2>
          <p className="vocab-m3__instr">
            <span className="write-m2a__badge">{data.match1a.badge}</span>
            {data.match1a.instruction}
          </p>
          <p className="vocab-m3__place-hint">
            {picked
              ? `Selected “${picked}” — click a gap`
              : "Click a word from the bank, then click a gap."}
          </p>
          <div className="vocab-m3__bank">
            {data.match1a.bank.map((w) => {
              const used = usedMatch1a.has(w);
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
            {data.match1a.items.map((it) => {
              const val = match1a[it.id];
              const ok = val === it.key;
              return (
                <li key={it.id}>
                  <strong>{it.id}.</strong> {it.text}{" "}
                  <button
                    type="button"
                    className={gapCls(val, !!picked, ok)}
                    disabled={checked}
                    onClick={() => placeMatch1a(it.id)}
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
        </section>
      )}

      {step === 1 && (
        <section className="vocab-m3__panel vocab-m3__panel--passage">
          <p className="vocab-m3__instr">
            <span className="write-m2a__badge">{data.gap1b.badge}</span>
            {data.gap1b.instruction}
          </p>
          <div className="vocab-m3__bank vocab-m3__bank--passage">
            {data.gap1b.bank.map((w) => {
              const used = usedGap1b.has(w);
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
          <article className="vocab-m3__passage vocab-m3__passage--fit">
            <p>
              {data.gap1b.parts.map((part, i) => {
                if (!isVocabM4Gap(part)) {
                  return <span key={i}>{part.text}</span>;
                }
                const val = gap1b[part.gap];
                const ok = val === part.key;
                return (
                  <span key={i} className="vocab-m3__ital">
                    <strong className="vocab-m3__n">{part.gap}</strong>
                    <span className="vocab-m3__ital-opts">
                      <button
                        type="button"
                        className={gapCls(val, !!picked, ok)}
                        disabled={checked}
                        onClick={() => placeGap1b(part.gap)}
                      >
                        {val ?? "—"}
                      </button>
                    </span>
                    {checked && !ok && (
                      <span className="inline-gap-bad"> → {part.key}</span>
                    )}
                  </span>
                );
              })}
            </p>
          </article>
        </section>
      )}

      {step === 2 && (
        <section className="vocab-m3__panel vocab-m3__panel--fill">
          <h2 className="vocab-m3__h">{data.impersonal2a.heading}</h2>
          <p className="vocab-m3__instr">
            <span className="write-m2a__badge">{data.impersonal2a.badge}</span>
            {data.impersonal2a.instruction}
          </p>
          <ol className="review-m2__mc">
            {data.impersonal2a.items.map((it) => {
              const sel = style2a[it.id];
              return (
                <li key={it.id}>
                  <p>
                    <strong>{it.id}.</strong> {it.text}
                  </p>
                  <div className="review-m2__opts">
                    {(["impersonal", "personal"] as const).map((opt) => {
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
                          disabled={checked}
                          onClick={() =>
                            setStyle2a((a) => ({ ...a, [it.id]: opt }))
                          }
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </li>
              );
            })}
          </ol>

          <p className="vocab-m3__instr">
            <span className="write-m2a__badge">{data.rules2b.badge}</span>
            {data.rules2b.instruction}
          </p>
          <ul className="vocab-m3__qs">
            {data.rules2b.examples.map((ex) => (
              <li key={ex}>{ex}</li>
            ))}
          </ul>
          <div className="vocab-m3__bank review-m2__bank">
            {data.rules2b.bank.map((w) => {
              const used =
                (rulesUsedCount[w] ?? 0) >= (rulesNeeded[w] ?? 1);
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
          <ol className="review-m2__passive">
            {data.rules2b.items.map((it) => {
              const slots = rules2b[it.id] ?? [null, null];
              const ok0 = slots[0] === it.answers[0];
              const ok1 = slots[1] === it.answers[1];
              const parts = it.label.split("______");
              return (
                <li key={it.id}>
                  <p>
                    <strong>{it.id}.</strong> {parts[0]}
                    <button
                      type="button"
                      className={gapCls(slots[0], !!picked, ok0, "review-m2__slot")}
                      disabled={checked}
                      onClick={() => placeRuleSlot(it.id, 0)}
                    >
                      {slots[0] ?? "________"}
                    </button>
                    {parts[1]}
                    <button
                      type="button"
                      className={gapCls(slots[1], !!picked, ok1, "review-m2__slot")}
                      disabled={checked}
                      onClick={() => placeRuleSlot(it.id, 1)}
                    >
                      {slots[1] ?? "________"}
                    </button>
                    {parts[2]}
                    {checked && !(ok0 && ok1) && (
                      <span className="inline-gap-bad">
                        {" "}
                        → {it.display}
                      </span>
                    )}
                  </p>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {step === 3 && (
        <section className="vocab-m3__panel vocab-m3__panel--fill">
          <p className="vocab-m3__instr">
            <span className="write-m2a__badge">{data.wordForms3.badge}</span>
            {data.wordForms3.instruction}
          </p>
          <ol className="review-m2__passive">
            {data.wordForms3.items.map((it) => {
              const val = forms3[it.id] ?? "";
              const ok = checkVocabM4(val, it.answers);
              return (
                <li key={it.id}>
                  <p>
                    <strong>{it.id}.</strong> {it.before}
                    <span
                      className={`inline-gap-wrap ${checked && ok ? "inline-gap-wrap--ok" : ""} ${checked && !ok ? "inline-gap-wrap--bad" : ""}`}
                    >
                      <input
                        className={`inline-gap-input ${checked && ok ? "inline-gap-input--ok" : ""} ${checked && !ok ? "inline-gap-input--bad" : ""}`}
                        value={val}
                        disabled={checked}
                        placeholder="________"
                        aria-label={`Gap ${it.id}`}
                        onChange={(e) =>
                          setForms3((f) => ({
                            ...f,
                            [it.id]: e.target.value,
                          }))
                        }
                      />
                      {checked && !ok && (
                        <span className="inline-gap-bad">
                          {" "}
                          → {it.answers[0]}
                        </span>
                      )}
                    </span>
                    {it.after}{" "}
                    <em className="language-flow__verb">{it.prompt}</em>
                  </p>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {step === 4 && (
        <section className="vocab-m3__panel vocab-m3__panel--fill">
          <p className="vocab-m3__instr">
            <span className="write-m2a__badge">{data.improve4.badge}</span>
            {data.improve4.instruction}
          </p>
          <article className="vocab-m3__passage review-m2__passage">
            <p>{data.improve4.text}</p>
          </article>
          <ol className="review-m2__passive">
            {data.improve4.items.map((it) => {
              const val = improve4[it.id] ?? "";
              const ok = checkVocabM4(val, it.answers);
              return (
                <li key={it.id}>
                  <p>
                    <strong>{it.id}.</strong> {it.prompt}
                  </p>
                  <span
                    className={`inline-gap-wrap ${checked && ok ? "inline-gap-wrap--ok" : ""} ${checked && !ok ? "inline-gap-wrap--bad" : ""}`}
                  >
                    <input
                      className={`inline-gap-input ${checked && ok ? "inline-gap-input--ok" : ""} ${checked && !ok ? "inline-gap-input--bad" : ""}`}
                      value={val}
                      disabled={checked}
                      placeholder="Improved phrase…"
                      aria-label={`Improve ${it.id}`}
                      onChange={(e) =>
                        setImprove4((f) => ({
                          ...f,
                          [it.id]: e.target.value,
                        }))
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

      {step === 5 && (
        <section className="vocab-m3__panel vocab-m3__panel--fill">
          <h2 className="vocab-m3__h">{data.collocations5a.heading}</h2>
          <p className="vocab-m3__instr">
            <span className="write-m2a__badge">{data.collocations5a.badge}</span>
            {data.collocations5a.instruction}
          </p>
          <p className="vocab-m3__place-hint">
            {pickedLetter
              ? `Selected ${pickedLetter} — click a gap`
              : "Click a letter (A–G), then click a gap beside a phrase."}
          </p>
          <div className="vocab-m3__idiom-grid">
            <div className="vocab-m3__idiom-col">
              <p className="vocab-m3__idiom-colhead">Phrases 1–7</p>
              <ol className="vocab-m3__idiom-left">
              {data.collocations5a.left.map((it) => {
                const val = colo5a[it.id];
                const ok = val === data.collocations5a.keys[it.id];
                return (
                  <li key={it.id}>
                    <strong>{it.id}.</strong> {it.text}{" "}
                    <button
                      type="button"
                      className={gapCls(val, !!pickedLetter, ok)}
                      disabled={checked}
                      onClick={() => placeColo5a(it.id)}
                    >
                      {val ?? "—"}
                    </button>
                    {checked && !ok && (
                      <span className="inline-gap-bad">
                        {" "}
                        → {data.collocations5a.keys[it.id]}
                      </span>
                    )}
                  </li>
                );
              })}
              </ol>
            </div>
            <div className="vocab-m3__idiom-col">
              <p className="vocab-m3__idiom-colhead">Meanings A–G</p>
              <ul className="vocab-m3__idiom-right">
              {data.collocations5a.right.map((m) => {
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

          <p className="vocab-m3__instr vocab-m3__instr--mt">
            <span className="write-m2a__badge">{data.collocations5b.badge}</span>
            {data.collocations5b.instruction}
          </p>
          <p className="vocab-m3__place-hint">
            {picked
              ? `Selected “${picked}” — click a gap`
              : "Click a phrase from the bank, then click a gap."}
          </p>
          <div className="vocab-m3__bank">
            {data.collocations5b.bank.map((w) => {
              const used = usedColo5b.has(w);
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
            {data.collocations5b.items.map((it) => {
              const val = colo5b[it.id];
              const ok = val === it.key;
              return (
                <li key={it.id}>
                  <strong>{it.id}.</strong> {it.before}
                  <button
                    type="button"
                    className={gapCls(val, !!picked, ok)}
                    disabled={checked}
                    onClick={() => placeColo5b(it.id)}
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
            {step + 1} / {VOCAB_M4_STEPS.length}
          </span>
        )}
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={goNext}
        >
          {needsCheck && !checked ? "Check →" : VOCAB_M4_NEXT[step]}
        </button>
      </div>
    </div>
  );
}
