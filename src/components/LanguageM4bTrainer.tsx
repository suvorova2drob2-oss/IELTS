import { useEffect, useState } from "react";
import {
  checkLangM4b,
  LANG_M4B_NEXT,
  LANG_M4B_STEPS,
  languageM4b,
} from "../data/languageM4b";

const data = languageM4b;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, LANG_M4B_STEPS.length - 1));
}

function setsEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const sa = [...a].sort();
  const sb = [...b].sort();
  return sa.every((v, i) => v === sb[i]);
}

export function LanguageM4bTrainer({
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
  const [showTips, setShowTips] = useState(false);
  const [match1a, setMatch1a] = useState<Record<number, string>>({});
  const [pickedRef, setPickedRef] = useState<string | null>(null);
  const [gaps, setGaps] = useState<Record<string, string>>({});
  const [pickedWord, setPickedWord] = useState<string | null>(null);
  const [cats, setCats] = useState<Record<string, string[]>>({});
  const [signGaps, setSignGaps] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setShowTips(false);
    setMatch1a({});
    setPickedRef(null);
    setGaps({});
    setPickedWord(null);
    setCats({});
    setSignGaps({});
  }, [restart, initialStep]);

  const usedRefs = new Set(Object.values(match1a));
  const usedSign = new Set(Object.values(signGaps));
  const placedInCats = new Set(Object.values(cats).flat());

  const matchScore = data.match1a.sentences.filter(
    (s) => match1a[s.id] === data.match1a.keys[s.id],
  ).length;

  const gapItems = data.gap2.items;
  const gap2Score =
    (checkLangM4b(gaps["1"] ?? "", gapItems[0].answers ?? []) ? 1 : 0) +
    (checkLangM4b(gaps["2"] ?? "", gapItems[1].answers ?? []) ? 1 : 0) +
    (checkLangM4b(gaps["3"] ?? "", gapItems[2].answers ?? []) ? 1 : 0) +
    (checkLangM4b(gaps["4a"] ?? "", gapItems[3].answersFirst ?? [])
      ? 1
      : 0) +
    (checkLangM4b(gaps["4b"] ?? "", gapItems[3].answersSecond ?? [])
      ? 1
      : 0);

  const catScore = data.categorise3a.categories.filter((c) =>
    setsEqual(cats[c.id] ?? [], c.answers),
  ).length;
  const signScore = data.gap3b.items.filter(
    (it) => signGaps[it.id] === it.key,
  ).length;

  const needsCheck = step !== 1;
  const score =
    step === 0
      ? matchScore
      : step === 2
        ? gap2Score
        : step === 3
          ? catScore
          : signScore;
  const total =
    step === 0
      ? data.match1a.sentences.length
      : step === 2
        ? 5
        : step === 3
          ? data.categorise3a.categories.length
          : data.gap3b.items.length;

  const placeMatch = (id: number) => {
    if (checked) return;
    if (match1a[id]) {
      setMatch1a((m) => {
        const n = { ...m };
        delete n[id];
        return n;
      });
      return;
    }
    if (!pickedRef) return;
    setMatch1a((m) => ({ ...m, [id]: pickedRef }));
    setPickedRef(null);
  };

  const placeGap = (key: string) => {
    if (checked) return;
    if (gaps[key]) {
      setGaps((g) => {
        const n = { ...g };
        delete n[key];
        return n;
      });
      return;
    }
    if (!pickedWord) return;
    setGaps((g) => ({ ...g, [key]: pickedWord }));
    setPickedWord(null);
  };

  const placeSign = (id: number) => {
    if (checked) return;
    if (signGaps[id]) {
      setSignGaps((m) => {
        const n = { ...m };
        delete n[id];
        return n;
      });
      return;
    }
    if (!pickedWord) return;
    setSignGaps((m) => ({ ...m, [id]: pickedWord }));
    setPickedWord(null);
  };

  const toggleCat = (catId: string) => {
    if (checked || !pickedWord) return;
    setCats((m) => {
      const cur = m[catId] ?? [];
      if (cur.includes(pickedWord)) {
        return { ...m, [catId]: cur.filter((x) => x !== pickedWord) };
      }
      return { ...m, [catId]: [...cur, pickedWord] };
    });
  };

  const usedGapWords = new Set(Object.values(gaps));

  const goPrev = () => {
    if (step === 0) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTips(false);
    setPickedRef(null);
    setPickedWord(null);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (step === 1 && !showTips) {
      setShowTips(true);
      return;
    }
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= LANG_M4B_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTips(false);
    setPickedRef(null);
    setPickedWord(null);
    setStep((s) => s + 1);
  };

  const nextLabel =
    step === 1 && !showTips
      ? "Show tips →"
      : needsCheck && !checked
        ? "Check →"
        : LANG_M4B_NEXT[step];

  const slotCls = (val: string | undefined, ready: boolean, ok: boolean) => {
    let cls = "review-m2__slot";
    if (val) cls += " review-m2__slot--filled";
    if (ready && !val) cls += " review-m2__slot--ready";
    if (checked) cls += ok ? " review-m2__slot--ok" : " review-m2__slot--bad";
    return cls;
  };

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
          {LANG_M4B_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
                setShowTips(false);
                setPickedRef(null);
                setPickedWord(null);
              }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="lang-m3b__panel">
          <h2 className="lang-m3b__h">{data.match1a.heading}</h2>
          <p className="write-m2a__expert">{data.grammarRef}</p>
          <p className="lang-m3b__instr">
            <span className="write-m2a__badge">{data.match1a.badge}</span>
            {data.match1a.instruction}
          </p>
          <div className="lang-m3b__bank">
            {data.match1a.referents.map((r) => {
              const used = usedRefs.has(r.id);
              return (
                <button
                  key={r.id}
                  type="button"
                  className={`pr-chip ${pickedRef === r.id ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used}
                  onClick={() => setPickedRef(r.id)}
                >
                  {r.id}. {r.text}
                </button>
              );
            })}
          </div>
          <ol className="lang-m3b__list">
            {data.match1a.sentences.map((s) => {
              const val = match1a[s.id];
              const ok = val === data.match1a.keys[s.id];
              return (
                <li key={s.id}>
                  <strong>{s.id}.</strong> {s.text}{" "}
                  <em>({s.underline})</em>{" "}
                  <button
                    type="button"
                    className={slotCls(val, !!pickedRef, ok)}
                    disabled={checked}
                    onClick={() => placeMatch(s.id)}
                  >
                    {val ?? "—"}
                  </button>
                  {checked && !ok && (
                    <span className="inline-gap-bad">
                      {" "}
                      → {data.match1a.keys[s.id]}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {step === 1 && (
        <section className="lang-m3b__panel">
          <p className="lang-m3b__instr">
            <span className="write-m2a__badge">{data.discuss1b.badge}</span>
            {data.discuss1b.instruction}
          </p>
          <ol className="lang-m3b__list">
            {data.discuss1b.items.map((it) => (
              <li key={it.id}>
                <strong>{it.id}.</strong> {it.q}
                {showTips && (
                  <p className="lang-m3b__tip">→ {it.tip}</p>
                )}
              </li>
            ))}
          </ol>
        </section>
      )}

      {step === 2 && (
        <section className="lang-m3b__panel">
          <p className="lang-m3b__instr">
            <span className="write-m2a__badge">{data.gap2.badge}</span>
            {data.gap2.instruction}
          </p>
          <div className="lang-m3b__bank">
            {data.gap2.bank.map((w) => {
              const used = usedGapWords.has(w);
              return (
                <button
                  key={w}
                  type="button"
                  className={`pr-chip ${pickedWord === w ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used}
                  onClick={() => setPickedWord(w)}
                >
                  {w}
                </button>
              );
            })}
          </div>
          <article className="lang-m3b__passage">
            {data.gap2.items.slice(0, 3).map((it) => {
              const answers = it.answers ?? [];
              const val = gaps[String(it.id)];
              const ok = checkLangM4b(val ?? "", answers);
              return (
                <p key={it.id}>
                  <strong>{it.id}.</strong> {it.before}
                  <button
                    type="button"
                    className={slotCls(val, !!pickedWord, ok)}
                    disabled={checked}
                    onClick={() => placeGap(String(it.id))}
                  >
                    {val ?? "________"}
                  </button>
                  {it.after}
                  {checked && !ok && (
                    <span className="inline-gap-bad"> → {answers[0]}</span>
                  )}
                </p>
              );
            })}
            {(() => {
              const it = data.gap2.items[3];
              const first = it.answersFirst ?? [];
              const second = it.answersSecond ?? [];
              const v1 = gaps["4a"];
              const v2 = gaps["4b"];
              const ok1 = checkLangM4b(v1 ?? "", first);
              const ok2 = checkLangM4b(v2 ?? "", second);
              return (
                <p>
                  <strong>4.</strong>{" "}
                  <button
                    type="button"
                    className={slotCls(v1, !!pickedWord, ok1)}
                    disabled={checked}
                    onClick={() => placeGap("4a")}
                  >
                    {v1 ?? "________"}
                  </button>
                  {it.mid}
                  <button
                    type="button"
                    className={slotCls(v2, !!pickedWord, ok2)}
                    disabled={checked}
                    onClick={() => placeGap("4b")}
                  >
                    {v2 ?? "________"}
                  </button>
                  {it.after}
                  {checked && (!ok1 || !ok2) && (
                    <span className="inline-gap-bad">
                      {" "}
                      → {it.display ?? `${first[0]}, ${second[0]}`}
                    </span>
                  )}
                </p>
              );
            })()}
          </article>
        </section>
      )}

      {step === 3 && (
        <section className="lang-m3b__panel">
          <h2 className="lang-m3b__h">{data.categorise3a.heading}</h2>
          <p className="lang-m3b__instr">
            <span className="write-m2a__badge">{data.categorise3a.badge}</span>
            {data.categorise3a.instruction}
          </p>
          <div className="lang-m3b__bank">
            {data.categorise3a.bank.map((w) => {
              const used = placedInCats.has(w);
              return (
                <button
                  key={w}
                  type="button"
                  className={`pr-chip ${pickedWord === w ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used}
                  onClick={() => setPickedWord(w)}
                >
                  {w}
                </button>
              );
            })}
          </div>
          <div className="lang-m3b__cats">
            {data.categorise3a.categories.map((cat) => {
              const placed = cats[cat.id] ?? [];
              const ok = setsEqual(placed, cat.answers);
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`lang-m3b__cat ${checked ? (ok ? "lang-m3b__cat--ok" : "lang-m3b__cat--bad") : ""}`}
                  disabled={checked}
                  onClick={() => toggleCat(cat.id)}
                >
                  <strong>{cat.label}</strong>
                  <span>{placed.join(", ") || "— drop here —"}</span>
                  {checked && !ok && (
                    <span className="lang-m3b__tip">
                      → {cat.answers.join(", ")}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {step === 4 && (
        <section className="lang-m3b__panel">
          <p className="lang-m3b__instr">
            <span className="write-m2a__badge">{data.gap3b.badge}</span>
            {data.gap3b.instruction}
          </p>
          <div className="lang-m3b__bank">
            {data.gap3b.bank.map((w) => {
              const used = usedSign.has(w);
              return (
                <button
                  key={w}
                  type="button"
                  className={`pr-chip ${pickedWord === w ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used}
                  onClick={() => setPickedWord(w)}
                >
                  {w}
                </button>
              );
            })}
          </div>
          <ol className="lang-m3b__list">
            {data.gap3b.items.map((it) => {
              const val = signGaps[it.id];
              const ok = val === it.key;
              return (
                <li key={it.id}>
                  <strong>{it.id}.</strong> {it.before}
                  <button
                    type="button"
                    className={slotCls(val, !!pickedWord, ok)}
                    disabled={checked}
                    onClick={() => placeSign(it.id)}
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
        {checked && needsCheck ? (
          <span className="flow-footer__result">
            <span className="flow-footer__ok">✓ {score}</span>
            <span className="flow-footer__bad">✗ {total - score}</span>
          </span>
        ) : (
          <span className="flow-footer__step">
            {step + 1} / {LANG_M4B_STEPS.length}
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
