import { useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import {
  checkListenM3a,
  examAnswerOkM3a,
  LISTEN_M3A_NEXT,
  LISTEN_M3A_STEPS,
  listeningM3a,
} from "../data/listeningM3a";
import { AudioPlayer } from "./AudioPlayer";
import { ExpertDiscussPanel } from "./ExpertDiscussPanel";

const data = listeningM3a;
const PREVIEW_QS = [1, 2, 3, 4] as const;
const EXAM_SINGLES = [1, 2, 3, 4, 7, 8, 9] as const;

function highlightPhrase(sentence: string, phrase: string): ReactNode {
  const i = sentence.indexOf(phrase);
  if (i === -1) return sentence;
  return (
    <>
      {sentence.slice(0, i)}
      <mark className="read-m3__lang-mark">{phrase}</mark>
      {sentence.slice(i + phrase.length)}
    </>
  );
}

function ListenScriptPanel({
  label,
  lines,
}: {
  label: string;
  lines: readonly { speaker: string; text: string }[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <aside
      className={`pl-script listen-m3a__script-panel ${open ? "pl-script--open" : ""}`}
    >
      <div className="pl-script__toggle">
        <span>{label}</span>
        <button
          type="button"
          className="pl-script__chev"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "▾ Hide script" : "▸ Read along"}
        </button>
      </div>
      {open && (
        <div className="pl-script__body listen-m3a__script-body">
          {lines.map((line, i) => (
            <p key={`${line.speaker}-${i}`}>
              {line.speaker === "Narrator" ? (
                <>
                  <strong>Narrator: </strong>
                  {line.text}
                </>
              ) : (
                line.text
              )}
            </p>
          ))}
        </div>
      )}
    </aside>
  );
}

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, LISTEN_M3A_STEPS.length - 1));
}

function ListenM3aGap({
  id,
  step,
  checked,
  answers,
  setAnswers,
}: {
  id: number;
  step: number;
  checked: boolean;
  answers: Record<number, string>;
  setAnswers: Dispatch<SetStateAction<Record<number, string>>>;
}) {
  const val = answers[id] ?? "";
  const onExam = step === 4;
  const keys = data.examKeys[id];
  const ok =
    checked &&
    (onExam
      ? examAnswerOkM3a(id, val, answers)
      : checkListenM3a(val, keys));
  const bad =
    checked &&
    val &&
    !(onExam
      ? examAnswerOkM3a(id, val, answers)
      : checkListenM3a(val, keys));
  let cls = "listen-m3a__input";
  if (ok) cls += " listen-m3a__input--ok";
  if (bad) cls += " listen-m3a__input--bad";
  const showKey =
    bad &&
    keys &&
    ![5, 6].includes(id) &&
    (onExam || PREVIEW_QS.includes(id as (typeof PREVIEW_QS)[number]));
  return (
    <>
      <input
        className={cls}
        value={val}
        placeholder={`${id}`}
        aria-label={`Answer ${id}`}
        onChange={(e) =>
          setAnswers((a) => ({ ...a, [id]: e.target.value }))
        }
      />
      {showKey && (
        <span className="inline-gap-bad"> → {keys[0]}</span>
      )}
      {bad && checked && [5, 6].includes(id) && onExam && (
        <span className="inline-gap-bad">
          {" "}
          → pair: giving up smoking · eating more healthily
        </span>
      )}
    </>
  );
}

export function ListeningM3aTrainer({
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
  const [showAnalysisTips, setShowAnalysisTips] = useState(false);
  const [assess, setAssess] = useState<Record<number, boolean>>({});
  const [picked, setPicked] = useState<string | null>(null);
  const [match, setMatch] = useState<Record<string, string>>({});
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [openLangTheme, setOpenLangTheme] = useState<string | null>(null);

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setShowTips(false);
    setShowAnalysisTips(false);
    setAssess({});
    setPicked(null);
    setMatch({});
    setAnswers({});
    setOpenLangTheme(null);
  }, [restart, initialStep]);

  const matchScore = data.match.targets.filter((t) => {
    const val = match[t.id];
    return val === t.key || t.also.includes(val);
  }).length;
  const used = new Set(Object.values(match));
  const needsCheck = step === 2 || step === 3 || step === 4;

  const previewScore = PREVIEW_QS.filter((id) =>
    checkListenM3a(answers[id] ?? "", data.examKeys[id]),
  ).length;

  const examSingleScore = EXAM_SINGLES.filter((id) =>
    checkListenM3a(answers[id] ?? "", data.examKeys[id]),
  ).length;
  const examPairScore = data.pairKeys.filter((pair) => {
    const vals = pair.ids.map((id) =>
      (answers[id] ?? "").trim().toLowerCase().replace(/\s+/g, " "),
    );
    return (
      vals.every(Boolean) &&
      pair.answers.every((a) =>
        vals.includes(a.trim().toLowerCase().replace(/\s+/g, " ")),
      ) &&
      new Set(vals).size === pair.answers.length
    );
  }).length;
  const examScore = examSingleScore + examPairScore * 2;
  const examTotal = 9;

  const checkTotal =
    step === 2
      ? data.match.targets.length
      : step === 3
        ? PREVIEW_QS.length
        : step === 4
          ? examTotal
          : 0;
  const checkScore =
    step === 2
      ? matchScore
      : step === 3
        ? previewScore
        : step === 4
          ? examScore
          : 0;

  const place = (id: string) => {
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

  const goPrev = () => {
    if (step === 0) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTips(false);
    setShowAnalysisTips(false);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (step === 1 && !showTips) {
      setShowTips(true);
      return;
    }
    if (step === 5 && !showAnalysisTips) {
      setShowAnalysisTips(true);
      return;
    }
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= LISTEN_M3A_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTips(false);
    setShowAnalysisTips(false);
    setStep((s) => s + 1);
  };

  const nextLabel =
    step === 1 && !showTips
      ? "Show tips →"
      : step === 5 && !showAnalysisTips
        ? "Show tips →"
        : needsCheck && !checked
          ? "Check →"
          : LISTEN_M3A_NEXT[step];

  const formatKey = (id: number): string => {
    if (id === 5 || id === 6) {
      return "giving up smoking · eating more healthily";
    }
    return data.examKeys[id][0];
  };

  const compareRows = Array.from({ length: 9 }, (_, i) => i + 1).map((id) => {
    const val = (answers[id] ?? "").trim();
    const ok = examAnswerOkM3a(id, answers[id] ?? "", answers);
    return {
      id,
      yours: val || "—",
      key: formatKey(id),
      ok,
      note: data.analysis.perQuestionNotes[id],
    };
  });

  const gapProps = { step, checked, answers, setAnswers };

  const ReadOnlyQs = () => (
    <div className="listen-m3a__qgrid listen-m3a__qgrid--read">
      <article className="listen-m3a__box">
        <h3>Questions 1–2</h3>
        <p className="listen-m3a__limit">
          Complete the sentences below. Write{" "}
          <strong>NO MORE THAN TWO WORDS AND/OR A NUMBER</strong> for each
          answer.
        </p>
        <p>
          <strong>1</strong> There are <u>few</u> ________ on the <u>benefits</u>{" "}
          of meditation.
        </p>
        <p>
          <strong>2</strong> There is <u>some indication</u> that meditation{" "}
          <u>may be able to</u> <u>increase our</u> ________.
        </p>
      </article>
      <article className="listen-m3a__box">
        <h3>Questions 3–4</h3>
        <p className="listen-m3a__limit">
          Answer the questions below. Write{" "}
          <strong>NO MORE THAN THREE WORDS AND/OR A NUMBER</strong> for each
          answer.
        </p>
        <p>
          <u>In what ways</u> can meditation help us <u>physically</u>?
        </p>
        <p>
          <strong>3</strong> ________
        </p>
        <p>
          <strong>4</strong> ________
        </p>
      </article>
      <article className="listen-m3a__box">
        <h3>Questions 5–6</h3>
        <p className="listen-m3a__limit">
          Write <strong>NO MORE THAN THREE WORDS AND/OR A NUMBER</strong> for
          each answer.
        </p>
        <p>What are two indirect benefits of meditation?</p>
        <p>
          <strong>5</strong> ________
        </p>
        <p>
          <strong>6</strong> ________
        </p>
      </article>
      <article className="listen-m3a__box">
        <h3>Questions 7–9</h3>
        <p className="listen-m3a__limit">
          Complete the sentences below. Write{" "}
          <strong>NO MORE THAN TWO WORDS AND/OR A NUMBER</strong> for each
          answer.
        </p>
        <p>
          <strong>7</strong> A lot of research has been done in the area of
          meditation and ________.
        </p>
        <p>
          <strong>8</strong> ________ of daily meditation can improve a person’s
          mental well-being.
        </p>
        <p>
          <strong>9</strong> In most cases, meditation should not be a
          replacement for ________.
        </p>
      </article>
    </div>
  );

  return (
    <div className="app-shell reading-flow reading-flow--viewport listen-m3a">
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
          {LISTEN_M3A_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
                setShowTips(false);
                setShowAnalysisTips(false);
                if (i !== 7) setOpenLangTheme(null);
              }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="listen-m3a__panel">
          <h2 className="listen-m3a__h">{data.quotes.heading}</h2>
          <p className="listen-m3a__instr">
            <span className="write-m2a__badge">{data.quotes.badge}</span>
            {data.quotes.instruction}
          </p>
          <div className="listen-m3a__quotes flow-stage__body">
            {data.quotes.items.map((q) => (
              <blockquote
                key={q.id}
                className={`listen-m3a__quote listen-m3a__quote--${q.color}`}
              >
                <p>{q.text}</p>
                <footer>{q.attribution}</footer>
              </blockquote>
            ))}
          </div>
        </section>
      )}

      {step === 1 && (
        <section className="listen-m3a__panel listen-m3a__panel--split">
          <h2 className="listen-m3a__h">{data.preview.heading}</h2>
          <p className="listen-m3a__instr">
            <span className="write-m2a__badge">{data.preview.badge}</span>
            {data.preview.instruction}
          </p>
          <p className="listen-m3a__predict">{data.preview.predictCue}</p>
          <p className="listen-m3a__read-hint">{data.preview.readHint}</p>
          <div className="listen-m3a__split">
            <div className="listen-m3a__split-qs">
              <h3 className="listen-m3a__split-title">Questions 1–9</h3>
              <ReadOnlyQs />
            </div>
            <aside className="listen-m3a__split-analyse">
              <p className="listen-m3a__instr">
                <span className="write-m2a__badge">{data.analyse.badge}</span>
                {data.analyse.instruction}
              </p>
              <ol className="listen-m3a__analyse listen-m3a__analyse--split">
                {data.analyse.items.map((item, i) => (
                  <li key={item}>
                    <p>{item}</p>
                    {showTips && (
                      <p className="listen-m3a__tip">→ {data.analyse.tips[i]}</p>
                    )}
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="listen-m3a__panel listen-m3a__panel--match">
          <p className="listen-m3a__instr">
            <span className="write-m2a__badge">{data.match.badge}</span>
            {data.match.instruction}
          </p>
          <p className="listen-m3a__match-hint">
            Click a phrase, then an underlined word. Click a filled gap to undo.
          </p>
          <div className="listen-m3a__bank">
            {data.match.bank.map((w) => {
              const isUsed = used.has(w);
              return (
                <button
                  key={w}
                  type="button"
                  className={`pr-chip ${picked === w ? "pr-chip--picked" : ""} ${isUsed ? "pr-chip--used" : ""}`}
                  disabled={checked || isUsed}
                  onClick={() => setPicked(w)}
                >
                  {w}
                </button>
              );
            })}
          </div>
          <div className="listen-m3a__match-stage flow-stage__body">
            <ul className="listen-m3a__targets">
            {data.match.targets.map((t) => {
              const val = match[t.id];
              const ok = val === t.key || t.also.includes(val);
              let cls = "listen-m3a__slot";
              if (val) cls += " listen-m3a__slot--filled";
              if (picked && !val) cls += " listen-m3a__slot--ready";
              if (checked)
                cls += ok ? " listen-m3a__slot--ok" : " listen-m3a__slot--bad";
              return (
                <li key={t.id}>
                  <u>{t.label}</u>
                  <button
                    type="button"
                    className={cls}
                    disabled={checked}
                    onClick={() => place(t.id)}
                  >
                    {val ?? "________"}
                  </button>
                  {checked && !ok && (
                    <span className="inline-gap-bad"> → {t.key}</span>
                  )}
                </li>
              );
            })}
            </ul>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="listen-m3a__panel">
          <header className="listen-m3a__exam-head">
            <h2 className="listen-m3a__h">{data.previewListen.heading}</h2>
            <p className="listen-m3a__instr">
              <span className="write-m2a__badge">{data.previewListen.badge}</span>
              {data.previewListen.instruction}
            </p>
            <AudioPlayer
              src={data.previewListen.audio}
              label={data.previewListen.audioLabel}
            />
            <p className="listen-m3a__read-hint">{data.previewListen.hint}</p>
            <ListenScriptPanel
              label={data.previewListen.scriptLabel}
              lines={data.previewListen.script}
            />
          </header>
          <div className="listen-m3a__exam listen-m3a__exam--preview flow-stage__body">
            <article className="listen-m3a__box">
              <h3>Questions 1–2</h3>
              <p className="listen-m3a__limit">
                Write <strong>NO MORE THAN TWO WORDS AND/OR A NUMBER</strong>{" "}
                for each answer.
              </p>
              <p>
                <strong>1</strong> There are <u>few</u> <ListenM3aGap id={1} {...gapProps} /> on the{" "}
                <u>benefits</u> of meditation.
              </p>
              <p>
                <strong>2</strong> There is <u>some indication</u> that
                meditation <u>may be able to</u> <u>increase our</u>{" "}
                <ListenM3aGap id={2} {...gapProps} />.
              </p>
            </article>
            <article className="listen-m3a__box">
              <h3>Questions 3–4</h3>
              <p className="listen-m3a__limit">
                Write <strong>NO MORE THAN THREE WORDS AND/OR A NUMBER</strong>{" "}
                for each answer.
              </p>
              <p>
                <u>In what ways</u> can meditation help us <u>physically</u>?
              </p>
              <p>
                <strong>3</strong> <ListenM3aGap id={3} {...gapProps} />
              </p>
              <p>
                <strong>4</strong> <ListenM3aGap id={4} {...gapProps} />
              </p>
            </article>
          </div>
        </section>
      )}

      {step === 4 && (
        <section className="listen-m3a__panel">
          <header className="listen-m3a__exam-head">
            <h2 className="listen-m3a__h">{data.exam.heading}</h2>
            <p className="write-m2a__expert">{data.exam.strategies}</p>
            <p className="listen-m3a__instr">
              <span className="write-m2a__badge">{data.exam.badge}</span>
              {data.exam.instruction}
            </p>
            <AudioPlayer src={data.exam.audio} label={data.exam.audioLabel} />
            <p className="listen-m3a__read-hint">{data.exam.hint}</p>
            <ListenScriptPanel
              label={data.exam.scriptLabel}
              lines={data.exam.script}
            />
          </header>
          <div className="listen-m3a__exam flow-stage__body">
            <article className="listen-m3a__box">
              <h3>Questions 1–2</h3>
              <p>
                <strong>1</strong> There are <u>few</u> <ListenM3aGap id={1} {...gapProps} /> on the{" "}
                <u>benefits</u> of meditation.
              </p>
              <p>
                <strong>2</strong> There is <u>some indication</u> that
                meditation <u>may be able to</u> <u>increase our</u>{" "}
                <ListenM3aGap id={2} {...gapProps} />.
              </p>
            </article>
            <article className="listen-m3a__box">
              <h3>Questions 3–4</h3>
              <p>
                <u>In what ways</u> can meditation help us <u>physically</u>?
              </p>
              <p>
                <strong>3</strong> <ListenM3aGap id={3} {...gapProps} />
              </p>
              <p>
                <strong>4</strong> <ListenM3aGap id={4} {...gapProps} />
              </p>
            </article>
            <article className="listen-m3a__box">
              <h3>Questions 5–6</h3>
              <p>What are two indirect benefits of meditation?</p>
              <p>
                <strong>5</strong> <ListenM3aGap id={5} {...gapProps} />
              </p>
              <p>
                <strong>6</strong> <ListenM3aGap id={6} {...gapProps} />
              </p>
            </article>
            <article className="listen-m3a__box">
              <h3>Questions 7–9</h3>
              <p>
                <strong>7</strong> A lot of research has been done in the area
                of meditation and <ListenM3aGap id={7} {...gapProps} />.
              </p>
              <p>
                <strong>8</strong> <ListenM3aGap id={8} {...gapProps} /> of daily
                meditation can improve a person’s mental well-being.
              </p>
              <p>
                <strong>9</strong> In most cases, meditation should not be a
                replacement for <ListenM3aGap id={9} {...gapProps} />.
              </p>
            </article>
          </div>
        </section>
      )}

      {step === 5 && (
        <section className="listen-m3a__panel listen-m3a__panel--analysis">
          <header className="listen-m3a__exam-head">
            <h2 className="listen-m3a__h">{data.analysis.heading}</h2>
            <p className="listen-m3a__instr">
              <span className="write-m2a__badge">{data.analysis.badge}</span>
              {data.analysis.a}
            </p>
            <AudioPlayer
              src={data.analysis.audio}
              label={data.analysis.audioLabel}
            />
            <ListenScriptPanel
              label={data.exam.scriptLabel}
              lines={data.exam.script}
            />
          </header>

          <div className="listen-m3a__compare flow-stage__body">
            <div className="listen-m3a__compare-head">
              <span>Q</span>
              <span>Your answer</span>
              <span>Key</span>
              <span />
            </div>
            {compareRows.map((row) => (
              <div
                key={row.id}
                className={`listen-m3a__compare-row ${row.ok ? "listen-m3a__compare-row--ok" : "listen-m3a__compare-row--bad"}`}
              >
                <span className="listen-m3a__compare-q">{row.id}</span>
                <span className="listen-m3a__compare-yours">{row.yours}</span>
                <span className="listen-m3a__compare-key">{row.key}</span>
                <span className="listen-m3a__compare-mark">
                  {row.ok ? "✓" : "✗"}
                </span>
                {showAnalysisTips && (
                  <p className="listen-m3a__compare-note">→ {row.note}</p>
                )}
              </div>
            ))}
          </div>

          <div className="listen-m3a__analysis-b">
            <p className="listen-m3a__instr">
              <span className="write-m2a__badge">{data.analysis.b.badge}</span>
              {data.analysis.b.instruction}
            </p>
            <ul className="listen-m3a__checks">
              {data.analysis.b.checklist.map((item, i) => (
                <li key={item}>
                  <label className="listen-m3a__check">
                    <input
                      type="checkbox"
                      checked={!!assess[i]}
                      onChange={() =>
                        setAssess((a) => ({ ...a, [i]: !a[i] }))
                      }
                    />
                    <span>{item}</span>
                  </label>
                  {showAnalysisTips && (
                    <p className="listen-m3a__tip">
                      → {data.analysis.b.tips[i]}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {step === 6 && (
        <ExpertDiscussPanel
          key="discussion"
          heading={data.discussion.heading}
          badge={data.discussion.badge}
          instruction={data.discussion.instruction}
          suggestedTitle={data.discussion.suggestedTitle}
          suggestedAnswer={data.discussion.suggestedAnswer}
        />
      )}

      {step === 7 && (
        <section className="read-m3__panel read-m3__panel--lang listen-m3a__lang-pack">
          <h2 className="read-m3__h">{data.languagePack.heading}</h2>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.languagePack.badge}</span>
            {data.languagePack.instruction}
          </p>
          <ul className="read-m3__lang-list">
            {data.languagePack.themes.map((theme) => {
              const open = openLangTheme === theme.id;
              return (
                <li key={theme.id} className="read-m3__lang-theme">
                  <button
                    type="button"
                    className={`read-m3__lang-tab ${open ? "read-m3__lang-tab--on" : ""}`}
                    aria-expanded={open}
                    onClick={() =>
                      setOpenLangTheme((id) =>
                        id === theme.id ? null : theme.id,
                      )
                    }
                  >
                    <span className="read-m3__lang-tab-label">
                      {theme.tabLabel}
                    </span>
                    <span className="read-m3__lang-tab-chevron" aria-hidden>
                      {open ? "▾" : "▸"}
                    </span>
                  </button>
                  {open && (
                    <div className="read-m3__lang-body">
                      <p className="read-m3__tip read-m3__lang-hint">
                        <strong>Use it:</strong> {theme.useHint}
                      </p>
                      <ul className="read-m3__lang-items">
                        {theme.items.map((item) => (
                          <li key={item.phrase} className="read-m3__lang-item">
                            <p className="read-m3__lang-phrase">{item.phrase}</p>
                            <blockquote className="read-m3__lang-sentence">
                              {highlightPhrase(item.sentence, item.phrase)}
                            </blockquote>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
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
            <span className="flow-footer__ok">✓ {checkScore}</span>
            <span className="flow-footer__bad">
              ✗ {checkTotal - checkScore}
            </span>
          </span>
        ) : (
          <span className="flow-footer__step">
            {step + 1} / {LISTEN_M3A_STEPS.length}
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
