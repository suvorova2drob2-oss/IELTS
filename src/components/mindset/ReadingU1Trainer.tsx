import { useEffect, useState } from "react";
import {
  MS_U1_READ_NEXT,
  MS_U1_READ_STEPS,
  readingU1,
} from "../../data/mindset/readingU1";

const data = readingU1;
const EXAM_PARAS = ["A", "B", "C", "D", "E", "F"] as const;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, MS_U1_READ_STEPS.length - 1));
}

export function ReadingU1Trainer({
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

  const [auroTopic, setAuroTopic] = useState<string | null>(null);
  const [auroFull, setAuroFull] = useState<string | null>(null);
  const [longOpen, setLongOpen] = useState<string | null>(null);
  const [longFull, setLongFull] = useState<string | null>(null);
  const [marlElim, setMarlElim] = useState<string | null>(null);
  const [marlFull, setMarlFull] = useState<string | null>(null);
  const [hallHead, setHallHead] = useState<string | null>(null);
  const [prefixMean, setPrefixMean] = useState<Record<string, string>>({});
  const [pickedPrefix, setPickedPrefix] = useState<string | null>(null);
  const [formGaps, setFormGaps] = useState<Record<string, string>>({});
  const [pickedForm, setPickedForm] = useState<string | null>(null);
  const [paraHeads, setParaHeads] = useState<Record<string, string>>({});
  const [pickedHead, setPickedHead] = useState<string | null>(null);
  const [showArticles, setShowArticles] = useState(false);

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setAuroTopic(null);
    setAuroFull(null);
    setLongOpen(null);
    setLongFull(null);
    setMarlElim(null);
    setMarlFull(null);
    setHallHead(null);
    setPrefixMean({});
    setPickedPrefix(null);
    setFormGaps({});
    setPickedForm(null);
    setParaHeads({});
    setPickedHead(null);
    setShowArticles(false);
  }, [restart, initialStep]);

  const needsCheck = step >= 1 && step <= 5;

  const auroScore =
    (auroTopic === data.auroville.topicKey ? 1 : 0) +
    (auroFull === data.auroville.fullKey ? 1 : 0);
  const longScore =
    (longOpen === data.longyearbyen.openingKey ? 1 : 0) +
    (longFull === data.longyearbyen.fullKey ? 1 : 0);
  const marlScore =
    (marlElim === data.marloth.eliminateKey ? 1 : 0) +
    (marlFull === data.marloth.fullKey ? 1 : 0) +
    (hallHead === data.hallstatt.key ? 1 : 0);
  const prefixScore =
    data.prefixes.identify.items.filter(
      (it) => prefixMean[it.id] === it.meaning,
    ).length +
    data.prefixes.form.items.filter((it) => {
      const v = (formGaps[it.id] ?? "").toLowerCase().replace(/\s+/g, "");
      const keys = [it.key, ...it.altKeys].map((k) =>
        k.toLowerCase().replace(/\s+/g, ""),
      );
      return keys.includes(v);
    }).length;
  const examScore = EXAM_PARAS.filter(
    (p) => paraHeads[p] === data.exam.paragraphKeys[p],
  ).length;

  const score =
    step === 1
      ? auroScore
      : step === 2
        ? longScore
        : step === 3
          ? marlScore
          : step === 4
            ? prefixScore
            : step === 5
              ? examScore
              : 0;
  const total =
    step === 1
      ? 2
      : step === 2
        ? 2
        : step === 3
          ? 3
          : step === 4
            ? data.prefixes.identify.items.length +
              data.prefixes.form.items.length
            : step === 5
              ? 6
              : 0;

  const placeHead = (para: string) => {
    if (checked) return;
    if (paraHeads[para]) {
      setParaHeads((h) => {
        const next = { ...h };
        delete next[para];
        return next;
      });
      return;
    }
    if (!pickedHead) return;
    setParaHeads((h) => ({ ...h, [para]: pickedHead }));
    setPickedHead(null);
  };

  const placePrefixMeaning = (itemId: string) => {
    if (checked) return;
    if (prefixMean[itemId]) {
      setPrefixMean((m) => {
        const next = { ...m };
        delete next[itemId];
        return next;
      });
      return;
    }
    if (!pickedPrefix) return;
    setPrefixMean((m) => ({ ...m, [itemId]: pickedPrefix }));
    setPickedPrefix(null);
  };

  const placeForm = (itemId: string) => {
    if (checked) return;
    if (formGaps[itemId]) {
      setFormGaps((g) => {
        const next = { ...g };
        delete next[itemId];
        return next;
      });
      return;
    }
    if (!pickedForm) return;
    const item = data.prefixes.form.items.find((i) => i.id === pickedForm);
    if (!item) return;
    setFormGaps((g) => ({ ...g, [itemId]: item.key }));
    setPickedForm(null);
  };

  const usedHeads = new Set(Object.values(paraHeads));
  const usedFormKeys = new Set(Object.values(formGaps));
  const usedMeanings = new Set(Object.values(prefixMean));

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
    if (step >= MS_U1_READ_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setStep((s) => s + 1);
  };

  const nextLabel =
    needsCheck && !checked ? "Check →" : MS_U1_READ_NEXT[step];

  const mcBtn = (
    opts: { id: string; text: string }[],
    value: string | null,
    key: string,
    set: (v: string) => void,
  ) => (
    <ul className="read-m3__opts">
      {opts.map((opt) => {
        let state = "";
        if (checked) {
          if (opt.id === key) state = "pr-chip--ok";
          else if (value === opt.id) state = "pr-chip--bad";
        } else if (value === opt.id) state = "pr-chip--picked";
        return (
          <li key={opt.id}>
            <button
              type="button"
              className={`read-m3__opt ${state}`}
              disabled={checked}
              onClick={() => set(opt.id)}
            >
              <strong>{opt.id}</strong>
              <span>{opt.text}</span>
            </button>
          </li>
        );
      })}
    </ul>
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
            ← Unit
          </button>
        )}
        <span className="badge reading-chrome__badge">
          {data.sectionTitle} · {data.bookPages}
        </span>
        <div className="learn-step-tabs">
          {MS_U1_READ_STEPS.map((label, i) => (
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
        <section className="read-m3__panel" style={{ overflow: "auto" }}>
          <h2 className="read-m3__h">In this unit you will learn how to</h2>
          <ul className="read-m3__qs">
            {data.unitGoals.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.leadIn.badge}</span>
            {data.leadIn.instruction}
          </p>
          <article className="read-m3__passage read-m3__passage--solo">
            <p>{data.leadIn.passage}</p>
          </article>
          <p className="write-m2a__cue">{data.leadIn.followUp}</p>
          <button
            type="button"
            className="pr-chip"
            onClick={() => setShowArticles((v) => !v)}
          >
            {showArticles ? "Hide article tips" : "Show article tips"}
          </button>
          {showArticles && (
            <div className="read-m3__split" style={{ marginTop: 8 }}>
              <div>
                <h3 className="read-m3__h">No article</h3>
                <ul className="read-m3__qs">
                  {data.leadIn.noArticle.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="read-m3__h">Use &apos;the&apos;</h3>
                <ul className="read-m3__qs">
                  {data.leadIn.useThe.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <p className="read-m3__instr read-m3__instr--mt">
            <strong>Matching headings</strong> — {data.matchingIntro.discuss}
          </p>
          <p className="read-m3__hint">
            Title: <em>{data.matchingIntro.title}</em>
          </p>
          <p className="write-m2a__expert">{data.matchingIntro.tip}</p>
        </section>
      )}

      {step === 1 && (
        <section className="read-m3__split">
          <article
            className="read-m3__passage"
            style={{ overflow: "auto" }}
          >
            <p className="read-m3__instr">
              <span className="write-m2a__badge">{data.auroville.badge}</span>
              Topic sentence
            </p>
            <p>{data.auroville.topicSentence}</p>
            <p className="read-m3__instr read-m3__instr--mt">
              <span className="write-m2a__badge">
                {data.auroville.fullBadge}
              </span>
              Full paragraph
            </p>
            <p>{data.auroville.fullParagraph}</p>
          </article>
          <aside className="read-m3__side" style={{ overflow: "auto" }}>
            <h2 className="read-m3__h">Auroville · headings</h2>
            <p className="read-m3__instr">{data.auroville.instruction}</p>
            {mcBtn(
              [...data.auroville.options],
              auroTopic,
              data.auroville.topicKey,
              setAuroTopic,
            )}
            {checked && (
              <p className="read-m3__tip">{data.auroville.topicTip}</p>
            )}
            <p className="read-m3__instr read-m3__instr--mt">
              {data.auroville.fullInstruction}
            </p>
            {mcBtn(
              [...data.auroville.options],
              auroFull,
              data.auroville.fullKey,
              setAuroFull,
            )}
          </aside>
        </section>
      )}

      {step === 2 && (
        <section className="read-m3__split">
          <article
            className="read-m3__passage"
            style={{ overflow: "auto" }}
          >
            <p className="read-m3__instr">
              <span className="write-m2a__badge">
                {data.longyearbyen.badge}
              </span>
              Opening sentence
            </p>
            <p>{data.longyearbyen.openingSentence}</p>
            <p className="read-m3__instr read-m3__instr--mt">
              <span className="write-m2a__badge">
                {data.longyearbyen.fullBadge}
              </span>
              Full paragraph
            </p>
            <p>{data.longyearbyen.fullParagraph}</p>
            {checked && (
              <p className="read-m3__tip">
                Topic sentence: {data.longyearbyen.topicSentence}
              </p>
            )}
          </article>
          <aside className="read-m3__side" style={{ overflow: "auto" }}>
            <h2 className="read-m3__h">Longyearbyen</h2>
            <p className="read-m3__instr">
              {data.longyearbyen.instruction}
            </p>
            <p className="write-m2a__expert">{data.longyearbyen.tip}</p>
            {mcBtn(
              [...data.longyearbyen.options],
              longOpen,
              data.longyearbyen.openingKey,
              setLongOpen,
            )}
            <p className="read-m3__hint">{data.longyearbyen.tip2}</p>
            <p className="read-m3__instr read-m3__instr--mt">
              {data.longyearbyen.fullInstruction}
            </p>
            {mcBtn(
              [...data.longyearbyen.options],
              longFull,
              data.longyearbyen.fullKey,
              setLongFull,
            )}
            {checked && (
              <p className="read-m3__tip">{data.longyearbyen.fullTip}</p>
            )}
            <p className="write-m2a__cue">
              {data.longyearbyen.topicInstruction}
            </p>
          </aside>
        </section>
      )}

      {step === 3 && (
        <section className="read-m3__split">
          <article
            className="read-m3__passage"
            style={{ overflow: "auto" }}
          >
            <p className="read-m3__instr">
              <span className="write-m2a__badge">{data.marloth.badge}</span>
              Marloth Park · opening
            </p>
            <p>{data.marloth.openingSentence}</p>
            <p className="read-m3__instr read-m3__instr--mt">
              <span className="write-m2a__badge">
                {data.marloth.fullBadge}
              </span>
              Rest of paragraph
            </p>
            <p>{data.marloth.fullParagraph}</p>
            {checked && (
              <p className="read-m3__tip">
                Topic sentence: {data.marloth.topicSentence}
              </p>
            )}
            <p className="read-m3__instr read-m3__instr--mt">
              <span className="write-m2a__badge">
                {data.hallstatt.badge}
              </span>
              {data.hallstatt.instruction}
            </p>
            <p>{data.hallstatt.paragraph}</p>
            <p className="read-m3__hint">{data.hallstatt.footnote}</p>
          </article>
          <aside className="read-m3__side" style={{ overflow: "auto" }}>
            <h2 className="read-m3__h">Marloth Park</h2>
            <p className="read-m3__instr">{data.marloth.instruction}</p>
            <p className="write-m2a__expert">{data.marloth.tip}</p>
            <ul className="read-m3__head-full">
              {data.marloth.paraphraseMatches.map((m) => (
                <li key={m.id}>
                  <strong>
                    {m.id} ({m.label})
                  </strong>{" "}
                  → {m.match}
                </li>
              ))}
            </ul>
            <p className="read-m3__instr read-m3__instr--mt">
              <span className="write-m2a__badge">
                {data.marloth.eliminateBadge}
              </span>
              {data.marloth.eliminateInstruction}
            </p>
            {mcBtn(
              [...data.marloth.options],
              marlElim,
              data.marloth.eliminateKey,
              setMarlElim,
            )}
            {checked && (
              <p className="read-m3__tip">{data.marloth.eliminateTip}</p>
            )}
            <p className="read-m3__instr read-m3__instr--mt">
              {data.marloth.fullInstruction}
            </p>
            {mcBtn(
              [...data.marloth.options],
              marlFull,
              data.marloth.fullKey,
              setMarlFull,
            )}
            {checked && (
              <p className="read-m3__tip">{data.marloth.fullTip}</p>
            )}
            <p className="write-m2a__cue">
              {data.marloth.topicInstruction}
            </p>
            <p className="read-m3__instr read-m3__instr--mt">
              {data.hallstatt.chooseInstruction}
            </p>
            {mcBtn(
              [...data.hallstatt.options],
              hallHead,
              data.hallstatt.key,
              setHallHead,
            )}
          </aside>
        </section>
      )}

      {step === 4 && (
        <section className="read-m3__panel" style={{ overflow: "auto" }}>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">
              {data.prefixes.identify.badge}
            </span>
            {data.prefixes.identify.instruction}
          </p>
          <ul className="read-m3__head-full">
            {data.prefixes.identify.stems.map((s) => (
              <li key={s.id}>
                <strong>{s.id}</strong> {s.text}
              </li>
            ))}
          </ul>
          <div className="read-m3__bank" style={{ marginTop: 8 }}>
            {data.prefixes.identify.items.map((it) => {
              const used = usedMeanings.has(it.meaning);
              return (
                <button
                  key={it.id}
                  type="button"
                  className={`pr-chip ${pickedPrefix === it.meaning ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used}
                  onClick={() => setPickedPrefix(it.meaning)}
                >
                  {it.meaning}
                </button>
              );
            })}
          </div>
          <ul className="read-m3__para-slots">
            {data.prefixes.identify.items.map((it) => {
              const val = prefixMean[it.id];
              const ok = val === it.meaning;
              let cls = "read-m3__slot";
              if (val) cls += " read-m3__slot--filled";
              if (pickedPrefix && !val) cls += " read-m3__slot--ready";
              if (checked)
                cls += ok ? " read-m3__slot--ok" : " read-m3__slot--bad";
              return (
                <li key={it.id}>
                  <span>
                    {it.prefix} in <em>{it.word}</em>
                  </span>
                  <button
                    type="button"
                    className={cls}
                    disabled={checked}
                    onClick={() => placePrefixMeaning(it.id)}
                  >
                    {val ?? "—"}
                  </button>
                  {checked && !ok && (
                    <span className="inline-gap-bad">→ {it.meaning}</span>
                  )}
                </li>
              );
            })}
          </ul>

          <p className="read-m3__instr read-m3__instr--mt">
            <span className="write-m2a__badge">
              {data.prefixes.bank.badge}
            </span>
            {data.prefixes.bank.instruction}
          </p>
          <div className="read-m3__bank">
            {data.prefixes.bank.prefixes.map((p) => (
              <span key={p.id} className="pr-chip" title={p.examples}>
                {p.id}
              </span>
            ))}
          </div>
          {checked && (
            <ul className="read-m3__head-full">
              {data.prefixes.bank.prefixes.map((p) => (
                <li key={p.id}>
                  <strong>{p.id}</strong> = {p.meaning} — {p.examples}
                </li>
              ))}
            </ul>
          )}

          <p className="read-m3__instr read-m3__instr--mt">
            <span className="write-m2a__badge">
              {data.prefixes.form.badge}
            </span>
            {data.prefixes.form.instruction}
          </p>
          <div className="read-m3__bank">
            {data.prefixes.form.items.map((it) => {
              const used = usedFormKeys.has(it.key);
              return (
                <button
                  key={it.id}
                  type="button"
                  className={`pr-chip ${pickedForm === it.id ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used}
                  onClick={() => setPickedForm(it.id)}
                >
                  {it.chip}
                </button>
              );
            })}
          </div>
          <ul className="read-m3__para-slots">
            {data.prefixes.form.items.map((it) => {
              const val = formGaps[it.id];
              const keys = [it.key, ...it.altKeys].map((k) =>
                k.toLowerCase().replace(/\s+/g, ""),
              );
              const ok =
                !!val &&
                keys.includes(val.toLowerCase().replace(/\s+/g, ""));
              let cls = "read-m3__slot";
              if (val) cls += " read-m3__slot--filled";
              if (pickedForm && !val) cls += " read-m3__slot--ready";
              if (checked)
                cls += ok ? " read-m3__slot--ok" : " read-m3__slot--bad";
              return (
                <li key={it.id}>
                  <span>
                    <strong>{it.id}.</strong> {it.before}
                    <button
                      type="button"
                      className={cls}
                      disabled={checked}
                      onClick={() => placeForm(it.id)}
                    >
                      {val ?? `___${it.stem}___`}
                    </button>
                    {it.after}
                  </span>
                  {checked && !ok && (
                    <span className="inline-gap-bad">→ {it.key}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 5 && (
        <section className="read-m3__split read-m3__split--exam">
          <article
            className="read-m3__passage"
            style={{ overflow: "auto" }}
          >
            <header className="read-m3__hero read-m3__hero--compact">
              <div>
                <h2>{data.exam.title}</h2>
              </div>
            </header>
            {data.exam.passage.map((p) => (
              <p key={p.id}>
                <strong className="read-m3__para-id">{p.id}</strong> {p.text}
              </p>
            ))}
          </article>
          <aside
            className="read-m3__side read-m3__side--exam"
            style={{ overflow: "auto" }}
          >
            <h2 className="read-m3__h">{data.exam.badge}</h2>
            <p className="read-m3__instr">{data.exam.instruction}</p>
            <p className="read-m3__hint">List of headings</p>
            <div className="read-m3__bank">
              {data.exam.headings.map((h) => {
                const used = usedHeads.has(h.id);
                return (
                  <button
                    key={h.id}
                    type="button"
                    className={`pr-chip ${pickedHead === h.id ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                    disabled={checked || used}
                    onClick={() => setPickedHead(h.id)}
                    title={h.text}
                  >
                    {h.id}
                  </button>
                );
              })}
            </div>
            <ul className="read-m3__head-full">
              {data.exam.headings.map((h) => (
                <li key={h.id}>
                  <strong>{h.id}</strong> {h.text}
                </li>
              ))}
            </ul>
            <ul className="read-m3__para-slots">
              {data.exam.questions.map((q) => {
                const p = q.para;
                const val = paraHeads[p];
                const ok = val === data.exam.paragraphKeys[p];
                let cls = "read-m3__slot";
                if (val) cls += " read-m3__slot--filled";
                if (pickedHead && !val) cls += " read-m3__slot--ready";
                if (checked)
                  cls += ok ? " read-m3__slot--ok" : " read-m3__slot--bad";
                return (
                  <li key={q.id}>
                    <span>
                      {q.id}. Paragraph {p}
                    </span>
                    <button
                      type="button"
                      className={cls}
                      disabled={checked}
                      onClick={() => placeHead(p)}
                    >
                      {val ?? "—"}
                    </button>
                    {checked && !ok && (
                      <span className="inline-gap-bad">
                        → {data.exam.paragraphKeys[p]}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </aside>
        </section>
      )}

      {step === 6 && (
        <section className="read-m3__panel">
          <h2 className="read-m3__h">{data.discussion.heading}</h2>
          <ol className="read-m3__qs">
            {data.discussion.prompts.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
          <p className="write-m2a__cue">Discuss with a partner</p>
        </section>
      )}

      <footer
        className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}
      >
        <button type="button" className="flow-footer__btn" onClick={goPrev}>
          ← Back
        </button>
        <span className="flow-footer__step">
          {step + 1} / {MS_U1_READ_STEPS.length}
        </span>
        {checked && needsCheck && (
          <span className="flow-footer__result">
            <span className={score === total ? "flow-footer__ok" : "flow-footer__bad"}>
              {score}/{total}
            </span>
          </span>
        )}
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={goNext}
        >
          {nextLabel}
        </button>
      </footer>
    </div>
  );
}
