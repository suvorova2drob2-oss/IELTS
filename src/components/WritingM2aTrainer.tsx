import { useEffect, useState } from "react";
import {
  checkWriteM2a,
  WRITE_M2A_NEXT,
  WRITE_M2A_STEPS,
  writingM2a,
} from "../data/writingM2a";
import { WordCountMeter, countWords } from "./WordCountMeter";
import { ExpertDiscussPanel } from "./ExpertDiscussPanel";

const data = writingM2a;
const STEP_KEY = "ielts-writing-m2a-step";
const DRAFT_KEY = "ielts-writing-m2a-draft";

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, WRITE_M2A_STEPS.length - 1));
}

function loadDraft(): string {
  try {
    return sessionStorage.getItem(DRAFT_KEY) ?? "";
  } catch {
    return "";
  }
}

export function WritingM2aTrainer({
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
  const [wordOrder, setWordOrder] = useState<string[]>([]);
  const [sentOrder, setSentOrder] = useState<string[]>([]);
  const [pickedSent, setPickedSent] = useState<string | null>(null);
  const [introPick, setIntroPick] = useState<number | null>(null);
  const [apPick, setApPick] = useState<Record<number, string>>({});
  const [voice, setVoice] = useState<Record<number, string>>({});
  const [draft, setDraft] = useState(loadDraft);
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setWordOrder([]);
    setSentOrder([]);
    setPickedSent(null);
    setIntroPick(null);
    setApPick({});
    setVoice({});
    setDraft("");
    setShowModel(false);
    try {
      sessionStorage.removeItem(STEP_KEY);
      sessionStorage.removeItem(DRAFT_KEY);
    } catch {
      /* ignore */
    }
  }, [restart, initialStep]);

  useEffect(() => {
    try {
      sessionStorage.setItem(STEP_KEY, String(step));
    } catch {
      /* ignore */
    }
  }, [step]);

  useEffect(() => {
    try {
      sessionStorage.setItem(DRAFT_KEY, draft);
    } catch {
      /* ignore */
    }
  }, [draft]);

  const wordKey = data.orderWords.key;
  const wordScore = wordOrder.filter((w, i) => w === wordKey[i]).length;
  const wordDone = wordOrder.length === wordKey.length;

  const sentKey = data.orderSentences.key;
  const sentScore = sentOrder.filter((id, i) => id === sentKey[i]).length;
  const sentDone = sentOrder.length === sentKey.length;

  const introOk = introPick === data.intro.key;
  const apScore = data.activePassive.items.filter(
    (it) => apPick[it.id] === it.key,
  ).length;
  const voiceScore = data.changeVoice.items.filter((it) =>
    checkWriteM2a(voice[it.id] ?? "", it.answers),
  ).length;

  const checkSteps = new Set([2, 3, 4, 5, 6]);
  const needsCheck = checkSteps.has(step);

  const placeWord = (w: string) => {
    if (checked || wordOrder.includes(w)) return;
    setWordOrder((o) => [...o, w]);
  };

  const placeSent = (id: string) => {
    if (checked || sentOrder.includes(id)) return;
    setSentOrder((o) => [...o, id]);
    setPickedSent(null);
  };

  const goPrev = () => {
    if (step === 0) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowModel(false);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step === 8 && !showModel) {
      setShowModel(true);
      return;
    }
    if (step >= WRITE_M2A_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowModel(false);
    setStep((s) => s + 1);
  };

  const nextLabel =
    needsCheck && !checked
      ? "Check →"
      : step === 8 && !showModel
        ? "Show model →"
        : WRITE_M2A_NEXT[step];

  const score =
    step === 2
      ? wordScore
      : step === 3
        ? sentScore
        : step === 4
          ? introOk
            ? 1
            : 0
          : step === 5
            ? apScore
            : step === 6
              ? voiceScore
              : 0;
  const total =
    step === 2
      ? wordKey.length
      : step === 3
        ? sentKey.length
        : step === 4
          ? 1
          : step === 5
            ? data.activePassive.items.length
            : step === 6
              ? data.changeVoice.items.length
              : 0;

  return (
    <div className="app-shell reading-flow reading-flow--viewport write-m2a">
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
          {WRITE_M2A_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
                setShowModel(false);
              }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <ExpertDiscussPanel
          key="lead-in"
          badge={data.leadIn.badge}
          instruction={data.leadIn.instruction}
          suggestedTitle={data.leadIn.suggestedTitle}
          suggestedAnswer={data.leadIn.suggestedAnswer}
        />
      )}

      {step === 1 && (
        <section className="write-m2a__diagram write-m2a__diagram--split">
          <div className="write-m2a__diagram-copy">
            <header className="write-m2a__head">
              <h2 className="write-m2a__title">{data.diagram.heading}</h2>
              <p className="write-m2a__expert">{data.diagram.expert}</p>
              <p className="write-m2a__instr">
                <span className="write-m2a__badge">{data.diagram.badge}</span>
                {data.diagram.instruction}
              </p>
            </header>
            <p className="write-m2a__cue">Discuss with a partner</p>
          </div>
          <figure className="write-m2a__fig write-m2a__fig--diagram">
            <div className="write-m2a__fig-media">
              <img src={data.diagram.image} alt={data.diagram.imageAlt} />
            </div>
          </figure>
        </section>
      )}

      {step === 2 && (
        <section className="write-m2a__order">
          <div className="write-m2a__order-side">
            <p className="write-m2a__instr">
              <span className="write-m2a__badge">{data.orderWords.badge}</span>
              {data.orderWords.instruction}
            </p>
            <p className="write-m2a__hint">
              Click a word, then click the next empty slot (or click the word to
              append). Click a filled slot to undo.
            </p>
            <div className="write-m2a__bank">
              {data.orderWords.bank.map((w) => {
                const used = wordOrder.includes(w);
                return (
                  <button
                    key={w}
                    type="button"
                    className={`pr-chip ${used ? "pr-chip--used" : ""}`}
                    disabled={checked || used}
                    onClick={() => placeWord(w)}
                  >
                    {w}
                  </button>
                );
              })}
            </div>
            <ol className="write-m2a__slots">
              {wordKey.map((_, i) => {
                const val = wordOrder[i];
                let cls = "write-m2a__slot";
                if (checked && val) {
                  cls +=
                    val === wordKey[i]
                      ? " write-m2a__slot--ok"
                      : " write-m2a__slot--bad";
                } else if (val) {
                  cls += " write-m2a__slot--filled";
                }
                return (
                  <li key={i}>
                    <span className="write-m2a__slot-n">{i + 1}</span>
                    <button
                      type="button"
                      className={cls}
                      disabled={checked}
                      onClick={() => {
                        if (checked || !val) return;
                        setWordOrder((o) => o.filter((_, j) => j !== i));
                      }}
                    >
                      {val ?? "—"}
                    </button>
                    {checked && val && val !== wordKey[i] && (
                      <span className="write-m2a__tip">→ {wordKey[i]}</span>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
          <figure className="write-m2a__fig write-m2a__fig--side">
            <div className="write-m2a__fig-media">
              <img src={data.diagram.image} alt={data.diagram.imageAlt} />
            </div>
          </figure>
        </section>
      )}

      {step === 3 && (
        <section className="write-m2a__sents write-m2a__sents--split">
          <div className="write-m2a__sents-main">
            <p className="write-m2a__instr">
              <span className="write-m2a__badge">{data.orderSentences.badge}</span>
              {data.orderSentences.instruction}
            </p>
            <p className="write-m2a__hint">
              Click a sentence letter to add it to the sequence. Click a number to
              remove.
            </p>
            <div className="write-m2a__sent-grid">
              <ol className="write-m2a__seq">
                {sentKey.map((_, i) => {
                  const id = sentOrder[i];
                  let cls = "write-m2a__slot";
                  if (checked && id) {
                    cls +=
                      id === sentKey[i]
                        ? " write-m2a__slot--ok"
                        : " write-m2a__slot--bad";
                  } else if (id) cls += " write-m2a__slot--filled";
                  return (
                    <li key={i}>
                      <span className="write-m2a__slot-n">{i + 1}</span>
                      <button
                        type="button"
                        className={cls}
                        disabled={checked}
                        onClick={() => {
                          if (checked || !id) return;
                          setSentOrder((o) => o.filter((_, j) => j !== i));
                        }}
                      >
                        {id ?? "—"}
                      </button>
                      {checked && id && id !== sentKey[i] && (
                        <span className="write-m2a__tip">→ {sentKey[i]}</span>
                      )}
                    </li>
                  );
                })}
              </ol>
              <ul className="write-m2a__sent-list">
                {data.orderSentences.items.map((it) => {
                  const used = sentOrder.includes(it.id);
                  return (
                    <li key={it.id}>
                      <button
                        type="button"
                        className={`pr-chip write-m2a__letter ${pickedSent === it.id ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                        disabled={checked || used || sentDone}
                        onClick={() => placeSent(it.id)}
                      >
                        {it.id}
                      </button>
                      <span>{it.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <figure className="write-m2a__fig write-m2a__fig--side">
            <div className="write-m2a__fig-media">
              <img src={data.diagram.image} alt={data.diagram.imageAlt} />
            </div>
          </figure>
        </section>
      )}

      {step === 4 && (
        <section className="write-m2a__intro">
          <p className="write-m2a__instr">
            <span className="write-m2a__badge">{data.intro.badge}</span>
            {data.intro.instruction}
          </p>
          <ul className="write-m2a__intro-opts">
            {data.intro.options.map((opt) => {
              let state = "";
              if (checked) {
                if (opt.id === data.intro.key) state = "write-m2a__opt--ok";
                else if (introPick === opt.id) state = "write-m2a__opt--bad";
              } else if (introPick === opt.id) {
                state = "write-m2a__opt--picked";
              }
              return (
                <li key={opt.id}>
                  <button
                    type="button"
                    className={`write-m2a__opt ${state}`}
                    disabled={checked}
                    onClick={() => setIntroPick(opt.id)}
                  >
                    <strong>{opt.id}</strong>
                    <span>{opt.text}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 5 && (
        <section className="write-m2a__ap">
          <h2 className="write-m2a__title">{data.activePassive.heading}</h2>
          <p className="write-m2a__instr">
            <span className="write-m2a__badge">{data.activePassive.badge}</span>
            {data.activePassive.instruction}
          </p>
          <ul className="write-m2a__ap-list">
            {data.activePassive.items.map((it) => {
              const pick = apPick[it.id];
              return (
                <li key={it.id}>
                  <p>
                    <strong>{it.id}.</strong> {it.text}
                  </p>
                  <div className="write-m2a__ap-btns">
                    {(["active", "passive"] as const).map((lab) => {
                      let state = "";
                      if (checked) {
                        if (lab === it.key) state = "write-m2a__opt--ok";
                        else if (pick === lab) state = "write-m2a__opt--bad";
                      } else if (pick === lab) state = "write-m2a__opt--picked";
                      return (
                        <button
                          key={lab}
                          type="button"
                          className={`write-m2a__mini ${state}`}
                          disabled={checked}
                          onClick={() =>
                            setApPick((p) => ({ ...p, [it.id]: lab }))
                          }
                        >
                          {lab}
                        </button>
                      );
                    })}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 6 && (
        <section className="write-m2a__voice write-m2a__voice--split">
          <div className="write-m2a__voice-main">
            <p className="write-m2a__instr">
              <span className="write-m2a__badge">{data.changeVoice.badge}</span>
              {data.changeVoice.instruction}
            </p>
            <ol className="write-m2a__voice-list write-m2a__voice-list--grid">
              {data.changeVoice.items.map((it) => {
                const ok = checkWriteM2a(voice[it.id] ?? "", it.answers);
                return (
                  <li key={it.id}>
                    <p className="write-m2a__stem">
                      <strong>{it.id}.</strong> {it.text}
                    </p>
                    <input
                      className={`write-m2a__input ${checked ? (ok ? "write-m2a__input--ok" : "write-m2a__input--bad") : ""}`}
                      value={voice[it.id] ?? ""}
                      disabled={checked}
                      placeholder="Rewrite…"
                      onChange={(e) =>
                        setVoice((v) => ({ ...v, [it.id]: e.target.value }))
                      }
                    />
                    {checked && !ok && (
                      <p className="write-m2a__tip">→ {it.answers[0]}</p>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
          <figure className="write-m2a__fig write-m2a__fig--side">
            <div className="write-m2a__fig-media">
              <img src={data.diagram.image} alt={data.diagram.imageAlt} />
            </div>
          </figure>
        </section>
      )}

      {step === 7 && (
        <ExpertDiscussPanel
          key="discuss-process"
          badge={data.discussProcess.badge}
          instruction={data.discussProcess.instruction}
          cue={data.discussProcess.cue}
          suggestedTitle={data.discussProcess.suggestedTitle}
          suggestedAnswer={data.discussProcess.suggestedAnswer}
        />
      )}

      {step === 8 && (
        <section className="write-m2a__write">
          <div className="write-m2a__write-side">
            <p className="write-m2a__instr">
              <span className="write-m2a__badge">{data.write.badge}</span>
              {data.write.planInstruction}
            </p>
            <p className="write-m2a__instr write-m2a__instr--sub">
              {data.write.writeInstruction}
            </p>
            <ul className="write-m2a__strategies">
              {data.write.strategies.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <figure className="write-m2a__fig write-m2a__fig--oils">
              <figcaption>{data.write.title}</figcaption>
              <div className="write-m2a__fig-media">
                <img src={data.write.image} alt={data.write.imageAlt} />
              </div>
            </figure>
          </div>
          <div className="write-m2a__compose">
            <WordCountMeter
              words={countWords(draft)}
              minWords={150}
              label="Task 1 · exam minimum"
            />
            <textarea
              className="write-m2a__ta"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Write your process description…"
              rows={12}
            />
            {showModel && (
              <aside className="write-m2a__model">
                <strong>Suggested answer</strong>
                {data.write.suggestedAnswer.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </aside>
            )}
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
          <span className="flow-footer__step">
            {step + 1} / {WRITE_M2A_STEPS.length}
          </span>
        )}
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={goNext}
          disabled={
            (step === 4 && !checked && introPick == null) ||
            (step === 2 && !checked && !wordDone) ||
            (step === 3 && !checked && !sentDone)
          }
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
