import { useEffect, useState } from "react";
import {
  checkLangM3a,
  isTextGap,
  LANG_M3A_NEXT,
  LANG_M3A_STEPS,
  languageM3a,
} from "../data/languageM3a";

const data = languageM3a;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, LANG_M3A_STEPS.length - 1));
}

type GapFillChunk = { text: string } | { gap: number; cap?: boolean };

function gapFillRows(
  parts: Array<{ text: string } | { gap: number; cap?: boolean }>,
): GapFillChunk[][] {
  const rows: GapFillChunk[][] = [];
  let row: GapFillChunk[] = [];

  const pushRow = () => {
    if (row.length) {
      rows.push(row);
      row = [];
    }
  };

  for (const part of parts) {
    if ("text" in part) {
      part.text.split("\n\n").forEach((piece, idx) => {
        if (idx > 0) pushRow();
        if (piece) row.push({ text: piece });
      });
    } else {
      row.push({ gap: part.gap, cap: part.cap });
    }
  }
  pushRow();
  return rows;
}

export function LanguageM3aTrainer({
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
  const [realUnreal, setRealUnreal] = useState<Record<number, string>>({});
  const [types, setTypes] = useState<Record<string, string>>({});
  const [pickedSent, setPickedSent] = useState<string | null>(null);
  const [mcq, setMcq] = useState<Record<number, string>>({});
  const [supersize, setSupersize] = useState<Record<number, string>>({});
  const [match, setMatch] = useState<Record<string, string>>({});
  const [pickedEnd, setPickedEnd] = useState<string | null>(null);
  const [matchReal, setMatchReal] = useState<Record<number, string>>({});
  const [gaps, setGaps] = useState<Record<number, string>>({});
  const [pickedWord, setPickedWord] = useState<string | null>(null);
  const [rewrite, setRewrite] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setRealUnreal({});
    setTypes({});
    setPickedSent(null);
    setMcq({});
    setSupersize({});
    setMatch({});
    setPickedEnd(null);
    setMatchReal({});
    setGaps({});
    setPickedWord(null);
    setRewrite({});
  }, [restart, initialStep]);

  const realScore = data.realUnreal.items.filter(
    (it) => realUnreal[it.id] === it.key,
  ).length;

  const typeOk = (slotId: string): boolean => {
    const slot = data.types.slots.find((s) => s.id === slotId);
    if (!slot) return false;
    const val = types[slotId];
    return !!val && slot.answers.includes(val);
  };
  const typeScore = data.types.slots.filter((s) => typeOk(s.id)).length;
  const mcqScore = data.mcq.items.filter((it) => mcq[it.id] === it.key).length;

  const supersizeOk = (id: number): boolean =>
    checkLangM3a(supersize[id] ?? "", data.supersize.answers[id] ?? []);
  const supersizeScore = Object.keys(data.supersize.answers).filter((k) =>
    supersizeOk(Number(k)),
  ).length;

  const matchScore = data.match.beginnings.filter(
    (b) => match[b.id] === data.match.keys[b.id],
  ).length;
  const usedEnds = new Set(Object.values(match));

  const matchRealScore = data.matchReal.items.filter(
    (it) => matchReal[it.id] === it.key,
  ).length;

  const gapOk = (id: number): boolean => {
    const val = gaps[id] ?? "";
    const key = data.gapFill.keys[id];
    return normalizeChip(val) === normalizeChip(key);
  };
  const gapScore = Object.keys(data.gapFill.keys).filter((k) =>
    gapOk(Number(k)),
  ).length;
  const usedGapWords = new Set(Object.values(gaps).map(normalizeChip));

  const rewriteScore = data.rewrite.items.filter((it) =>
    checkLangM3a(rewrite[it.id] ?? "", it.answers),
  ).length;

  const score =
    step === 0
      ? realScore
      : step === 1
        ? typeScore + mcqScore
        : step === 2
          ? supersizeScore
          : step === 3
            ? matchScore + matchRealScore
            : step === 4
              ? gapScore
              : rewriteScore;

  const total =
    step === 0
      ? data.realUnreal.items.length
      : step === 1
        ? data.types.slots.length + data.mcq.items.length
        : step === 2
          ? Object.keys(data.supersize.answers).length
          : step === 3
            ? data.match.beginnings.length + data.matchReal.items.length
            : step === 4
              ? Object.keys(data.gapFill.keys).length
              : data.rewrite.items.length;

  const needsCheck = true;

  const placeType = (slotId: string) => {
    if (checked) return;
    if (types[slotId]) {
      setTypes((t) => {
        const n = { ...t };
        delete n[slotId];
        return n;
      });
      return;
    }
    if (!pickedSent) return;
    setTypes((t) => ({ ...t, [slotId]: pickedSent }));
    setPickedSent(null);
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

  const placeGap = (gapId: number) => {
    if (checked) return;
    if (gaps[gapId]) {
      setGaps((g) => {
        const n = { ...g };
        delete n[gapId];
        return n;
      });
      return;
    }
    if (!pickedWord) return;
    setGaps((g) => ({ ...g, [gapId]: pickedWord }));
    setPickedWord(null);
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
    if (step >= LANG_M3A_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setStep((s) => s + 1);
  };

  const nextLabel =
    needsCheck && !checked ? "Check →" : LANG_M3A_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport lang-m3a">
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
        <p className="lang-m3a__grammar-ref">{data.grammarRef}</p>
        <div className="learn-step-tabs">
          {LANG_M3A_STEPS.map((label, i) => (
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
        <section className="lang-m3a__panel">
          <p className="lang-m3a__instr">
            <span className="lang-m3a__badge">{data.realUnreal.badge}</span>
            {data.realUnreal.instruction}
          </p>
          <ol className="lang-m3a__real-list flow-stage__body">
            {data.realUnreal.items.map((it) => {
              const sel = realUnreal[it.id];
              const ok = sel === it.key;
              return (
                <li key={it.id}>
                  <p>
                    <strong>{it.id}.</strong> {it.text}
                  </p>
                  <div className="lang-m3a__real-btns">
                    {(["real", "unreal"] as const).map((opt) => {
                      let state = "";
                      if (checked) {
                        if (opt === it.key) state = "pr-chip--ok";
                        else if (sel === opt) state = "pr-chip--bad";
                      } else if (sel === opt) {
                        state = "pr-chip--picked";
                      }
                      return (
                        <button
                          key={opt}
                          type="button"
                          className={`pr-chip ${state}`}
                          disabled={checked}
                          onClick={() =>
                            setRealUnreal((r) => ({ ...r, [it.id]: opt }))
                          }
                        >
                          {opt === "real" ? "Real" : "Unreal"}
                        </button>
                      );
                    })}
                    {checked && !ok && (
                      <span className="lang-m3a__tip">
                        → {it.key === "real" ? "Real" : "Unreal"}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {step === 1 && (
        <section className="lang-m3a__panel lang-m3a__panel--split">
          <div className="lang-m3a__col">
            <p className="lang-m3a__instr">
              <span className="lang-m3a__badge">{data.types.badge}</span>
              {data.types.instruction}
            </p>
            <div className="lang-m3a__chip-row">
              {data.types.sentenceChips.map((n) => {
                const used = Object.values(types).includes(n);
                return (
                  <button
                    key={n}
                    type="button"
                    className={`pr-chip ${pickedSent === n ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                    disabled={checked || used}
                    onClick={() => setPickedSent(n)}
                  >
                    Sentence {n}
                  </button>
                );
              })}
            </div>
            <ol className="lang-m3a__type-slots">
              {data.types.slots.map((slot) => {
                const val = types[slot.id];
                const ok = typeOk(slot.id);
                let cls = "lang-m3a__slot";
                if (val) cls += " lang-m3a__slot--filled";
                if (pickedSent && !val) cls += " lang-m3a__slot--ready";
                if (checked) cls += ok ? " lang-m3a__slot--ok" : " lang-m3a__slot--bad";
                return (
                  <li key={slot.id}>
                    <button
                      type="button"
                      className={cls}
                      disabled={checked}
                      onClick={() => placeType(slot.id)}
                    >
                      <strong>{slot.label}</strong>
                      {val ? ` — Sentence ${val}` : " — click to place"}
                    </button>
                    {checked && !ok && (
                      <span className="lang-m3a__tip">
                        → Sentence {slot.answers[0]}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
          <div className="lang-m3a__col">
            <p className="lang-m3a__instr">
              <span className="lang-m3a__badge">{data.mcq.badge}</span>
              {data.mcq.instruction}
            </p>
            <ol className="lang-m3a__mcq">
              {data.mcq.items.map((it) => (
                <li key={it.id}>
                  <p>
                    <strong>{it.id}.</strong> {it.prompt}
                  </p>
                  <div className="lang-m3a__mcq-opts">
                    {it.options.map((opt) => {
                      const sel = mcq[it.id];
                      let state = "";
                      if (checked) {
                        if (opt.id === it.key) state = "pr-chip--ok";
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
                            setMcq((m) => ({ ...m, [it.id]: opt.id }))
                          }
                        >
                          {opt.id}: {opt.text}
                        </button>
                      );
                    })}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="lang-m3a__panel">
          <p className="lang-m3a__instr">
            <span className="lang-m3a__badge">{data.supersize.badge}</span>
            {data.supersize.instruction}
          </p>
          <article className="lang-m3a__passage lang-m3a__passage--green">
            <h3>{data.supersize.title}</h3>
            <p>
              {data.supersize.parts.map((part, i) => {
                if (!isTextGap(part)) {
                  return (
                    <span key={i}>
                      {part.text.split("\n\n").map((chunk, j, arr) => (
                        <span key={j}>
                          {chunk}
                          {j < arr.length - 1 ? (
                            <>
                              <br />
                              <br />
                            </>
                          ) : null}
                        </span>
                      ))}
                    </span>
                  );
                }
                const ok = supersizeOk(part.gap);
                return (
                  <span key={i} className="lang-m3a__form-gap">
                    <strong className="lang-m3a__n">{part.gap}</strong>
                    <input
                      className={`lang-m3a__input ${checked ? (ok ? "lang-m3a__input--ok" : "lang-m3a__input--bad") : ""}`}
                      value={supersize[part.gap] ?? ""}
                      disabled={checked}
                      placeholder="________"
                      aria-label={`Gap ${part.gap}`}
                      onChange={(e) =>
                        setSupersize((s) => ({
                          ...s,
                          [part.gap]: e.target.value,
                        }))
                      }
                    />
                    <em className="lang-m3a__hint">({part.hint})</em>
                    {checked && !ok && (
                      <span className="lang-m3a__tip">
                        → {data.supersize.answers[part.gap][0]}
                      </span>
                    )}
                  </span>
                );
              })}
            </p>
          </article>
        </section>
      )}

      {step === 3 && (
        <section className="lang-m3a__panel lang-m3a__panel--match">
          <p className="lang-m3a__instr">
            <span className="lang-m3a__badge">{data.match.badge}</span>
            {data.match.instruction}
          </p>
          <div className="lang-m3a__match-grid">
            <div className="lang-m3a__match-col">
              <p className="lang-m3a__match-h">Endings</p>
              {data.match.endings.map((end) => {
                const used = usedEnds.has(end.id);
                return (
                  <button
                    key={end.id}
                    type="button"
                    className={`pr-chip lang-m3a__end-chip ${pickedEnd === end.id ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                    disabled={checked || used}
                    onClick={() => setPickedEnd(end.id)}
                  >
                    <strong>{end.id}.</strong> {end.text}
                  </button>
                );
              })}
            </div>
            <ol className="lang-m3a__match-col lang-m3a__match-starts">
              {data.match.beginnings.map((beg) => {
                const val = match[beg.id];
                const ok = val === data.match.keys[beg.id];
                let cls = "lang-m3a__slot lang-m3a__slot--wide";
                if (val) cls += " lang-m3a__slot--filled";
                if (pickedEnd && !val) cls += " lang-m3a__slot--ready";
                if (checked) cls += ok ? " lang-m3a__slot--ok" : " lang-m3a__slot--bad";
                return (
                  <li key={beg.id}>
                    <button
                      type="button"
                      className={cls}
                      disabled={checked}
                      onClick={() => placeMatch(beg.id)}
                    >
                      <strong>{beg.id}.</strong> {beg.text}
                      {val ? ` ${data.match.endings.find((e) => e.id === val)?.text ?? val}` : " …"}
                    </button>
                    {checked && !ok && (
                      <span className="lang-m3a__tip">
                        → {data.match.keys[beg.id]}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
          <p className="lang-m3a__instr lang-m3a__instr--sub">
            <span className="lang-m3a__badge">{data.matchReal.badge}</span>
            {data.matchReal.instruction}
          </p>
          <ol className="lang-m3a__real-list lang-m3a__real-list--compact">
            {data.matchReal.items.map((it) => {
              const sel = matchReal[it.id];
              const ok = sel === it.key;
              return (
                <li key={it.id}>
                  <p>
                    <strong>{it.id}.</strong> {it.text}
                  </p>
                  <div className="lang-m3a__real-btns">
                    {(["real", "unreal"] as const).map((opt) => {
                      let state = "";
                      if (checked) {
                        if (opt === it.key) state = "pr-chip--ok";
                        else if (sel === opt) state = "pr-chip--bad";
                      } else if (sel === opt) {
                        state = "pr-chip--picked";
                      }
                      return (
                        <button
                          key={opt}
                          type="button"
                          className={`pr-chip ${state}`}
                          disabled={checked}
                          onClick={() =>
                            setMatchReal((r) => ({ ...r, [it.id]: opt }))
                          }
                        >
                          {opt === "real" ? "Real" : "Unreal"}
                        </button>
                      );
                    })}
                    {checked && !ok && (
                      <span className="lang-m3a__tip">
                        → {it.key === "real" ? "Real" : "Unreal"}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {step === 4 && (
        <section className="lang-m3a__panel">
          <p className="lang-m3a__instr">
            <span className="lang-m3a__badge">{data.gapFill.badge}</span>
            {data.gapFill.instruction}
          </p>
          <p className="lang-m3a__place-hint">
            {pickedWord
              ? `Selected “${pickedWord}” — click a gap in the sentence`
              : "Click a word from the box, then click a gap in the sentence."}
          </p>
          <div className="lang-m3a__bank">
            {data.gapFill.bank.map((w) => {
              const used = usedGapWords.has(normalizeChip(w));
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
          <article className="lang-m3a__passage lang-m3a__passage--gap flow-stage__body">
            <ol className="lang-m3a__gap-sentences">
              {gapFillRows(data.gapFill.parts).map((chunks, ri) => (
                <li key={ri} className="lang-m3a__gap-row">
                  {chunks.map((chunk, ci) => {
                    if ("text" in chunk) {
                      return <span key={ci}>{chunk.text}</span>;
                    }
                    const val = gaps[chunk.gap];
                    const ok = gapOk(chunk.gap);
                    let cls = "lang-m3a__gap-chip";
                    if (val) cls += " lang-m3a__gap-chip--filled";
                    if (pickedWord && !val) cls += " lang-m3a__gap-chip--ready";
                    if (checked)
                      cls += ok
                        ? " lang-m3a__gap-chip--ok"
                        : " lang-m3a__gap-chip--bad";
                    const display =
                      val && chunk.cap
                        ? val.charAt(0).toUpperCase() + val.slice(1)
                        : val;
                    return (
                      <button
                        key={ci}
                        type="button"
                        className={cls}
                        disabled={checked}
                        onClick={() => placeGap(chunk.gap)}
                      >
                        {display ?? "—"}
                      </button>
                    );
                  })}
                </li>
              ))}
            </ol>
            {checked && gapScore < Object.keys(data.gapFill.keys).length && (
              <p className="lang-m3a__tip lang-m3a__tip--block">
                Answers: 1 otherwise · 2 provided that · 3 Unless · 4
                Supposing
              </p>
            )}
          </article>
        </section>
      )}

      {step === 5 && (
        <section className="lang-m3a__panel lang-m3a__panel--rewrite">
          <p className="lang-m3a__instr">
            <span className="lang-m3a__badge">{data.rewrite.badge}</span>
            {data.rewrite.instruction}
          </p>
          <ol className="lang-m3a__rewrite flow-stage__body">
            {data.rewrite.items.map((it) => {
              const ok = checkLangM3a(rewrite[it.id] ?? "", it.answers);
              return (
                <li key={it.id}>
                  <p className="lang-m3a__active">
                    <strong>{it.id}.</strong> {it.active}{" "}
                    <em>({it.hint})</em>
                  </p>
                  <input
                    className={`lang-m3a__input lang-m3a__input--wide ${checked ? (ok ? "lang-m3a__input--ok" : "lang-m3a__input--bad") : ""}`}
                    value={rewrite[it.id] ?? ""}
                    disabled={checked}
                    placeholder="Rewritten sentence…"
                    aria-label={`Rewrite ${it.id}`}
                    onChange={(e) =>
                      setRewrite((r) => ({
                        ...r,
                        [it.id]: e.target.value,
                      }))
                    }
                  />
                  {checked && !ok && (
                    <p className="lang-m3a__tip">→ {it.answers[0]}</p>
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
          <span className="flow-footer__hint" />
        )}
        <button type="button" className="flow-footer__btn" onClick={goNext}>
          {nextLabel}
        </button>
      </div>
    </div>
  );
}

function normalizeChip(s: string): string {
  return s.trim().toLowerCase();
}
