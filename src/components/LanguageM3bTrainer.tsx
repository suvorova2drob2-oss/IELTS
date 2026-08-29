import { useEffect, useState } from "react";
import {
  isItalGap,
  LANG_M3B_NEXT,
  LANG_M3B_STEPS,
  languageM3b,
} from "../data/languageM3b";

const data = languageM3b;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, LANG_M3B_STEPS.length - 1));
}

function setsEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const sa = [...a].sort();
  const sb = [...b].sort();
  return sa.every((v, i) => v === sb[i]);
}

export function LanguageM3bTrainer({
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
  const [scaleOrder, setScaleOrder] = useState<string[]>([]);
  const [pickedModal, setPickedModal] = useState<string | null>(null);
  const [meaningPlaced, setMeaningPlaced] = useState<Record<string, string[]>>(
    {},
  );
  const [ital, setItal] = useState<Record<number, string>>({});
  const [modalGaps, setModalGaps] = useState<Record<number, string>>({});
  const [pickedWord, setPickedWord] = useState<string | null>(null);
  const [opinionMatch, setOpinionMatch] = useState<Record<string, string>>({});
  const [pickedOp, setPickedOp] = useState<string | null>(null);
  const [apparently, setApparently] = useState<string | null>(null);
  const [perspective, setPerspective] = useState<Record<number, string>>({});
  const [opinions, setOpinions] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setScaleOrder([]);
    setPickedModal(null);
    setMeaningPlaced({});
    setItal({});
    setModalGaps({});
    setPickedWord(null);
    setOpinionMatch({});
    setPickedOp(null);
    setApparently(null);
    setPerspective({});
    setOpinions({});
  }, [restart, initialStep]);

  const scaleKey = data.scale.key;
  const scaleScore = scaleOrder.filter((w, i) => w === scaleKey[i]).length;
  const scaleDone = scaleOrder.length === scaleKey.length;

  const meaningScore = data.meanings.categories.filter((cat) =>
    setsEqual(meaningPlaced[cat.id] ?? [], cat.answers),
  ).length;

  const italGaps = data.italics.parts.filter(isItalGap);
  const italScore = italGaps.filter((g) => ital[g.gap] === g.key).length;

  const gapScore = data.modalGaps.items.filter(
    (it) => modalGaps[it.id] === it.key,
  ).length;
  const usedGapWords = new Set(Object.values(modalGaps));

  const match4aScore = data.adverbs.match4a.sentences.filter(
    (s) => opinionMatch[s.id] === data.adverbs.match4a.keys[s.id],
  ).length;
  const usedOps = new Set(Object.values(opinionMatch));

  const apparentlyOk = apparently === data.adverbs.apparently.key;

  const perspScore = data.adverbs.perspective.items.filter(
    (it) => perspective[it.id] === it.key,
  ).length;

  const needsCheck = step < LANG_M3B_STEPS.length - 1;

  const score =
    step === 0
      ? scaleScore
      : step === 1
        ? meaningScore
        : step === 2
          ? italScore
          : step === 3
            ? gapScore
            : step === 4
              ? match4aScore + (apparentlyOk ? 1 : 0)
              : perspScore;

  const total =
    step === 0
      ? scaleKey.length
      : step === 1
        ? data.meanings.categories.length
        : step === 2
          ? italGaps.length
          : step === 3
            ? data.modalGaps.items.length
            : step === 4
              ? data.adverbs.match4a.sentences.length + 1
              : data.adverbs.perspective.items.length;

  const placeScale = (word: string) => {
    if (checked || scaleOrder.includes(word)) return;
    setScaleOrder((o) => [...o, word]);
  };

  const toggleMeaning = (catId: string) => {
    if (checked || !pickedModal) return;
    setMeaningPlaced((m) => {
      const cur = m[catId] ?? [];
      if (cur.includes(pickedModal)) {
        return { ...m, [catId]: cur.filter((x) => x !== pickedModal) };
      }
      return { ...m, [catId]: [...cur, pickedModal] };
    });
  };

  const placeGap = (id: number) => {
    if (checked) return;
    if (modalGaps[id]) {
      setModalGaps((g) => {
        const n = { ...g };
        delete n[id];
        return n;
      });
      return;
    }
    if (!pickedWord) return;
    setModalGaps((g) => ({ ...g, [id]: pickedWord }));
    setPickedWord(null);
  };

  const placeOpinion = (sentId: string) => {
    if (checked) return;
    if (opinionMatch[sentId]) {
      setOpinionMatch((m) => {
        const n = { ...m };
        delete n[sentId];
        return n;
      });
      return;
    }
    if (!pickedOp) return;
    setOpinionMatch((m) => ({ ...m, [sentId]: pickedOp }));
    setPickedOp(null);
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
    if (step >= LANG_M3B_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setStep((s) => s + 1);
  };

  const nextLabel =
    needsCheck && !checked ? "Check →" : LANG_M3B_NEXT[step];

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
        <p className="lang-m3b__grammar-ref">{data.grammarRef}</p>
        <div className="learn-step-tabs">
          {LANG_M3B_STEPS.map((label, i) => (
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
          <p className="lang-m3b__instr">
            <span className="lang-m3b__badge">{data.scale.badge}</span>
            <strong>{data.scale.heading}</strong> — {data.scale.instruction}
          </p>
          <div className="lang-m3b__scale-labels">
            <span>{data.scale.labels.low}</span>
            <span>{data.scale.labels.high}</span>
          </div>
          <div className="lang-m3b__scale-track" aria-hidden />
          <ol className="lang-m3b__scale-slots">
            {scaleKey.map((_, i) => {
              const val = scaleOrder[i];
              let cls = "lang-m3b__slot";
              if (checked && val) {
                cls +=
                  val === scaleKey[i]
                    ? " lang-m3b__slot--ok"
                    : " lang-m3b__slot--bad";
              } else if (val) cls += " lang-m3b__slot--filled";
              return (
                <li key={i}>
                  <button
                    type="button"
                    className={cls}
                    disabled={checked}
                    onClick={() => {
                      if (checked || !val) return;
                      setScaleOrder((o) => o.filter((_, j) => j !== i));
                    }}
                  >
                    {val ?? "—"}
                  </button>
                  {checked && val && val !== scaleKey[i] && (
                    <span className="lang-m3b__tip">→ {scaleKey[i]}</span>
                  )}
                </li>
              );
            })}
          </ol>
          <div className="lang-m3b__bank">
            {data.scale.modals.map((w) => {
              const used = scaleOrder.includes(w);
              return (
                <button
                  key={w}
                  type="button"
                  className={`pr-chip ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used || scaleDone}
                  onClick={() => placeScale(w)}
                >
                  {w}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {step === 1 && (
        <section className="lang-m3b__panel lang-m3b__panel--meanings">
          <p className="lang-m3b__instr">
            <span className="lang-m3b__badge">{data.meanings.badge}</span>
            {data.meanings.instruction}
          </p>
          <div className="lang-m3b__bank">
            {data.meanings.modals.map((w) => (
              <button
                key={w}
                type="button"
                className={`pr-chip ${pickedModal === w ? "pr-chip--picked" : ""}`}
                disabled={checked}
                onClick={() => setPickedModal(w)}
              >
                {w}
              </button>
            ))}
          </div>
          <ol className="lang-m3b__meaning-grid">
            {data.meanings.categories.map((cat) => {
              const placed = meaningPlaced[cat.id] ?? [];
              const ok = setsEqual(placed, cat.answers);
              return (
                <li key={cat.id}>
                  <button
                    type="button"
                    className={`lang-m3b__cat ${pickedModal ? "lang-m3b__cat--ready" : ""} ${checked ? (ok ? "lang-m3b__cat--ok" : "lang-m3b__cat--bad") : ""}`}
                    disabled={checked}
                    onClick={() => toggleMeaning(cat.id)}
                  >
                    <strong>{cat.label}</strong>
                    <span>
                      {placed.length
                        ? placed.join(", ")
                        : "click to place modal(s)"}
                    </span>
                  </button>
                  {checked && !ok && (
                    <span className="lang-m3b__tip">
                      → {cat.answers.join(", ")}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {step === 2 && (
        <section className="lang-m3b__panel">
          <p className="lang-m3b__instr">
            <span className="lang-m3b__badge">{data.italics.badge}</span>
            {data.italics.instruction}
          </p>
          <article className="lang-m3b__passage">
            <p>
              {data.italics.parts.map((part, i) => {
                if (!isItalGap(part)) {
                  return <span key={i}>{part.text}</span>;
                }
                const sel = ital[part.gap];
                return (
                  <span key={i} className="lang-m3b__gap">
                    <strong className="lang-m3b__n">{part.gap}</strong>
                    {part.options.map((opt) => {
                      let state = "";
                      if (checked) {
                        if (opt === part.key) state = "pr-chip--ok";
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
                            setItal((a) => ({ ...a, [part.gap]: opt }))
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

      {step === 3 && (
        <section className="lang-m3b__panel">
          <p className="lang-m3b__instr">
            <span className="lang-m3b__badge">{data.modalGaps.badge}</span>
            {data.modalGaps.instruction}
          </p>
          <div className="lang-m3b__bank">
            {data.modalGaps.bank.map((w) => {
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
          <ol className="lang-m3b__gap-list">
            {data.modalGaps.items.map((it) => {
              const val = modalGaps[it.id];
              const ok = val === it.key;
              let cls = "lang-m3b__slot lang-m3b__slot--inline";
              if (val) cls += " lang-m3b__slot--filled";
              if (pickedWord && !val) cls += " lang-m3b__slot--ready";
              if (checked) cls += ok ? " lang-m3b__slot--ok" : " lang-m3b__slot--bad";
              return (
                <li key={it.id}>
                  <p>
                    <strong>{it.id}.</strong> {it.before}
                    <button
                      type="button"
                      className={cls}
                      disabled={checked}
                      onClick={() => placeGap(it.id)}
                    >
                      {val || " ______ "}
                    </button>
                    {it.after}
                  </p>
                  {checked && !ok && (
                    <span className="lang-m3b__tip">→ {it.key}</span>
                  )}
                </li>
              );
            })}
          </ol>
          <p className="lang-m3b__hint">
            Extra modal: {data.modalGaps.extra}
          </p>
        </section>
      )}

      {step === 4 && (
        <section className="lang-m3b__panel lang-m3b__panel--split">
          <div className="lang-m3b__col">
            <h2 className="lang-m3b__subh">{data.adverbs.heading}</h2>
            <p className="lang-m3b__instr">
              <span className="lang-m3b__badge">
                {data.adverbs.match4a.badge}
              </span>
              {data.adverbs.match4a.instruction}
            </p>
            <div className="lang-m3b__bank">
              {data.adverbs.match4a.opinions.map((op) => {
                const used = usedOps.has(op.id);
                return (
                  <button
                    key={op.id}
                    type="button"
                    className={`pr-chip ${pickedOp === op.id ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                    disabled={checked || used}
                    onClick={() => setPickedOp(op.id)}
                    title={op.text}
                  >
                    {op.id}
                  </button>
                );
              })}
            </div>
            <ol className="lang-m3b__match-sents">
              {data.adverbs.match4a.sentences.map((s) => {
                const val = opinionMatch[s.id];
                const ok = val === data.adverbs.match4a.keys[s.id];
                let cls = "lang-m3b__slot";
                if (val) cls += " lang-m3b__slot--filled";
                if (pickedOp && !val) cls += " lang-m3b__slot--ready";
                if (checked)
                  cls += ok ? " lang-m3b__slot--ok" : " lang-m3b__slot--bad";
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      className={cls}
                      disabled={checked}
                      onClick={() => placeOpinion(s.id)}
                    >
                      <strong>{s.id}.</strong> {s.text}
                      {val ? ` → ${val}` : ""}
                    </button>
                    {checked && !ok && (
                      <span className="lang-m3b__tip">
                        → {data.adverbs.match4a.keys[s.id]}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
          <div className="lang-m3b__col">
            <p className="lang-m3b__instr">
              <span className="lang-m3b__badge">
                {data.adverbs.apparently.badge}
              </span>
              {data.adverbs.apparently.instruction}
            </p>
            <p className="lang-m3b__sentence">
              <u>{data.adverbs.apparently.highlight}</u>, walking for 30 minutes a
              day has more health benefits than running or going to the gym.
            </p>
            <div className="lang-m3b__mcq">
              {data.adverbs.apparently.options.map((opt) => {
                let state = "";
                if (checked) {
                  if (opt.id === data.adverbs.apparently.key)
                    state = "pr-chip--ok";
                  else if (apparently === opt.id) state = "pr-chip--bad";
                } else if (apparently === opt.id) state = "pr-chip--picked";
                return (
                  <button
                    key={opt.id}
                    type="button"
                    className={`pr-chip lang-m3b__opt ${state}`}
                    disabled={checked}
                    onClick={() => setApparently(opt.id)}
                  >
                    <strong>{opt.id}.</strong> {opt.text}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {step === 5 && (
        <section className="lang-m3b__panel lang-m3b__panel--split">
          <div className="lang-m3b__col">
            <p className="lang-m3b__instr">
              <span className="lang-m3b__badge">
                {data.adverbs.perspective.badge}
              </span>
              {data.adverbs.perspective.instruction}
            </p>
            <ol className="lang-m3b__persp">
              {data.adverbs.perspective.items.map((it) => {
                const sel = perspective[it.id];
                return (
                  <li key={it.id}>
                    <p>
                      <strong>{it.id}.</strong> {it.before}
                      <u>{it.word}</u>
                      {it.after}
                    </p>
                    <div className="lang-m3b__persp-opts">
                      {it.options.map((opt) => {
                        let state = "";
                        if (checked) {
                          if (opt.id === it.key) state = "pr-chip--ok";
                          else if (sel === opt.id) state = "pr-chip--bad";
                        } else if (sel === opt.id) state = "pr-chip--picked";
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            className={`pr-chip ${state}`}
                            disabled={checked}
                            onClick={() =>
                              setPerspective((p) => ({
                                ...p,
                                [it.id]: opt.id,
                              }))
                            }
                          >
                            <strong>{opt.id}</strong> {opt.text}
                          </button>
                        );
                      })}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
          <div className="lang-m3b__col">
            <p className="lang-m3b__instr">
              <span className="lang-m3b__badge">
                {data.adverbs.opinions.badge}
              </span>
              {data.adverbs.opinions.instruction}
            </p>
            <p className="lang-m3b__hint">
              Use: {data.adverbs.opinions.adverbs.join(", ")}
            </p>
            <ol className="lang-m3b__opinion-write">
              {data.adverbs.opinions.topics.map((topic, i) => (
                <li key={i}>
                  <p>
                    <strong>{i + 1}.</strong> {topic}
                  </p>
                  <textarea
                    className="lang-m3b__textarea"
                    value={opinions[i + 1] ?? ""}
                    onChange={(e) =>
                      setOpinions((o) => ({ ...o, [i + 1]: e.target.value }))
                    }
                    placeholder="Your opinion with an adverb…"
                    rows={3}
                  />
                </li>
              ))}
            </ol>
          </div>
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
