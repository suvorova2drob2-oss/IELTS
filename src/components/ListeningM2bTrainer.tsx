import { useEffect, useState } from "react";
import {
  checkListenM2b,
  LEARN_STEP_NEXT_L2B,
  LEARN_STEPS_L2B,
  listeningM2b,
} from "../data/listeningM2b";
import { AudioPlayer } from "./AudioPlayer";
import { ExpertDiscussPanel } from "./ExpertDiscussPanel";

const data = listeningM2b;
const STEP_KEY = "ielts-listening-m2b-step";

function loadStep(restart?: boolean, initialStep?: number): number {
  if (initialStep != null) return initialStep;
  if (restart) return 0;
  try {
    const raw = sessionStorage.getItem(STEP_KEY);
    if (raw != null) {
      const n = Number(raw);
      if (n >= 0 && n < LEARN_STEPS_L2B.length) return n;
      /* legacy: Form + Map were separate steps */
      if (n === 4) return 3;
      if (n === 5) return 4;
    }
  } catch {
    /* ignore */
  }
  return 0;
}

export function ListeningM2bTrainer({
  onBack,
  restart,
  initialStep,
}: {
  onBack?: () => void;
  restart?: boolean;
  initialStep?: number;
}) {
  const [step, setStep] = useState(() => loadStep(restart, initialStep));
  const [polly, setPolly] = useState<string | null>(null);
  const [errAns, setErrAns] = useState<Record<number, string>>({});
  const [formAns, setFormAns] = useState<Record<number, string>>({});
  const [mapPick, setMapPick] = useState<string | null>(null);
  const [mapAns, setMapAns] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (restart) {
      setStep(initialStep ?? 0);
      setPolly(null);
      setErrAns({});
      setFormAns({});
      setMapPick(null);
      setMapAns({});
      setChecked(false);
      try {
        sessionStorage.removeItem(STEP_KEY);
      } catch {
        /* ignore */
      }
    }
  }, [restart, initialStep]);

  useEffect(() => {
    if (initialStep != null) {
      setStep(initialStep);
      setChecked(false);
      setMapPick(null);
    }
  }, [initialStep]);

  useEffect(() => {
    try {
      sessionStorage.setItem(STEP_KEY, String(step));
    } catch {
      /* ignore */
    }
  }, [step]);

  const formGaps = data.test.fields.flatMap((f) =>
    typeof f.id === "number" && f.answers
      ? [{ id: f.id, label: f.label, answers: f.answers, prefix: f.prefix, suffix: f.suffix }]
      : [],
  );
  const formScore = formGaps.filter((g) =>
    checkListenM2b(formAns[g.id] ?? "", g.answers),
  ).length;
  const errScore = data.errors.items.filter((it) =>
    checkListenM2b(errAns[it.id] ?? "", it.answers),
  ).length;
  const mapScore = data.test.mapItems.filter(
    (it) => mapAns[it.id] === it.key,
  ).length;
  const usedMap = new Set(Object.values(mapAns).filter(Boolean));
  const pollyOk = polly === data.script.key;

  const checkSteps = new Set([1, 2, 3]);
  const needsCheck = checkSteps.has(step);
  const examScore = formScore + mapScore;
  const examTotal = formGaps.length + data.test.mapItems.length;

  const placeMap = (qid: number) => {
    if (checked || !mapPick) return;
    setMapAns((m) => {
      const next = { ...m };
      for (const [k, v] of Object.entries(next)) {
        if (v === mapPick) delete next[Number(k)];
      }
      if (next[qid] === mapPick) delete next[qid];
      else next[qid] = mapPick;
      return next;
    });
    setMapPick(null);
  };

  const goNext = () => {
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= LEARN_STEPS_L2B.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setMapPick(null);
    setStep((s) => s + 1);
  };

  const nextLabel =
    needsCheck && !checked
      ? "Check →"
      : (LEARN_STEP_NEXT_L2B[step] ?? "Дальше →");

  const score =
    step === 1
      ? pollyOk
        ? 1
        : 0
      : step === 2
        ? errScore
        : step === 3
          ? examScore
          : 0;
  const total =
    step === 1
      ? 1
      : step === 2
        ? data.errors.items.length
        : step === 3
          ? examTotal
          : 0;

  return (
    <div className="app-shell reading-flow reading-flow--viewport listen-m2b">
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
          {data.unitTitle} · {data.sectionTitle} · {data.bookPages}
        </span>
        <div className="learn-step-tabs">
          {LEARN_STEPS_L2B.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
                setMapPick(null);
              }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <ExpertDiscussPanel
          key="before-listen"
          variant="centered"
          heading={data.beforeYouListen.heading}
          badge={data.beforeYouListen.badge}
          instruction={data.beforeYouListen.instruction}
          options={data.beforeYouListen.options}
          suggestedTitle={data.beforeYouListen.suggestedTitle}
          suggestedAnswer={data.beforeYouListen.suggestedAnswer}
          languageFocus={data.beforeYouListen.languageFocus}
        />
      )}

      {step === 1 && (
        <section className="listen-m2b__script-step">
          <header className="listen-m2b__head">
            <h2 className="listen-m2b__heading">{data.script.heading}</h2>
            <p className="listen-m2b__instr">
              <span className="listen-m2b__badge">{data.script.badge}</span>
              {data.script.instruction}
            </p>
          </header>
          <div className="listen-m2b__script-split">
            <article className="listen-m2b__script">
              {data.script.lines.map((line, i) => (
                <p key={i}>
                  <strong>{line.who}:</strong> {line.text}
                </p>
              ))}
            </article>
            <div className="listen-m2b__answer">
              <p className="listen-m2b__answer-label">Your answer</p>
              <ul className="listen-m2b__mc">
                {data.script.options.map((opt) => {
                  let state = "";
                  if (checked) {
                    if (opt.id === data.script.key) state = "listen-m2b__mc--ok";
                    else if (polly === opt.id) state = "listen-m2b__mc--bad";
                  } else if (polly === opt.id) state = "listen-m2b__mc--picked";
                  return (
                    <li key={opt.id}>
                      <button
                        type="button"
                        className={`listen-m2b__mc-btn ${state}`}
                        disabled={checked}
                        onClick={() => setPolly(opt.id)}
                      >
                        <span>{opt.id.toUpperCase()}</span>
                        <span>{opt.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              {checked && (
                <p className="listen-m2b__tip">
                  {pollyOk ? "✓ " : "→ "}
                  {data.script.tip}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="listen-m2b__errors-step">
          <header className="listen-m2b__head">
            <p className="listen-m2b__instr">
              <span className="listen-m2b__badge">{data.errors.badge}</span>
              {data.errors.instruction}
            </p>
            <p className="listen-m2b__sub">{data.errors.formInstr}</p>
          </header>
          <div className="listen-m2b__errors-split">
            <div className="listen-m2b__form listen-m2b__form--errors">
              <p>
                <strong>Name:</strong> {data.errors.given.name}
              </p>
              {data.errors.items.map((it) => {
                const ok = checkListenM2b(errAns[it.id] ?? "", it.answers);
                return (
                  <div key={it.id} className="listen-m2b__err-row">
                    <p>
                      <strong>
                        {it.label} [{it.id}]
                      </strong>
                      <span className="listen-m2b__wrong">
                        Wrong: {it.wrong}
                      </span>
                    </p>
                    <div className="listen-m2b__err-fix">
                      {it.prefix && <span>{it.prefix}</span>}
                      <input
                        className={`listen-m2b__input ${checked ? (ok ? "listen-m2b__input--ok" : "listen-m2b__input--bad") : ""}`}
                        value={errAns[it.id] ?? ""}
                        disabled={checked}
                        placeholder="Correct answer…"
                        onChange={(e) =>
                          setErrAns((a) => ({ ...a, [it.id]: e.target.value }))
                        }
                      />
                    </div>
                    {checked && (
                      <p className="listen-m2b__tip">
                        {ok ? "✓ " : `→ ${it.answers[0]} · `}
                        {it.errorType}
                      </p>
                    )}
                  </div>
                );
              })}
              <p>
                <strong>Telephone number:</strong> {data.errors.given.phone}
              </p>
              <p>
                <strong>Flight number:</strong> {data.errors.given.flight}
              </p>
            </div>
            <aside className="listen-m2b__script-ref">
              <p className="listen-m2b__script-ref-label">
                {data.script.badge} · {data.script.heading}
              </p>
              <article className="listen-m2b__script">
                {data.script.lines.map((line, i) => (
                  <p key={i}>
                    <strong>{line.who}:</strong> {line.text}
                  </p>
                ))}
              </article>
            </aside>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="listen-m2b__exam-step">
          <header className="listen-m2b__head">
            <p className="listen-m2b__instr">
              <span className="listen-m2b__badge">{data.test.badge}</span>
              {data.test.instruction}
            </p>
            <AudioPlayer src={data.test.audio} label={data.test.audioLabel} />
            <div className="listen-m2b__exam-instrs">
              <p className="listen-m2b__sub">{data.test.formInstr}</p>
              <p className="listen-m2b__sub">{data.test.mapInstr}</p>
            </div>
            <p className="listen-m2b__hint">
              One listen only — complete Q1–5 and Q6–10. Click a letter A–G,
              then a map question; click a filled gap to undo.
            </p>
          </header>
          <div className="listen-m2b__exam-split">
            <div className="listen-m2b__form listen-m2b__form--exam">
              <h3>{data.test.formTitle}</h3>
              {data.test.fields.map((f, i) => {
                if (typeof f.id !== "number" || !f.answers) {
                  return (
                    <p key={i}>
                      <strong>{f.label}:</strong>{" "}
                      {"given" in f ? f.given : ""}
                    </p>
                  );
                }
                const ok = checkListenM2b(formAns[f.id] ?? "", f.answers);
                return (
                  <p key={f.id} className="listen-m2b__form-gap">
                    <strong>
                      {f.label}: {f.prefix ?? ""}
                    </strong>
                    <input
                      className={`listen-m2b__input ${checked ? (ok ? "listen-m2b__input--ok" : "listen-m2b__input--bad") : ""}`}
                      value={formAns[f.id] ?? ""}
                      disabled={checked}
                      placeholder={`${f.id}`}
                      aria-label={`Q${f.id}`}
                      onChange={(e) =>
                        setFormAns((a) => ({
                          ...a,
                          [f.id as number]: e.target.value,
                        }))
                      }
                    />
                    {f.suffix && <strong>{f.suffix}</strong>}
                    {checked && !ok && (
                      <span className="listen-m2b__tip">
                        → {f.answers[0]}
                      </span>
                    )}
                  </p>
                );
              })}
            </div>
            <div className="listen-m2b__map-task listen-m2b__map-task--inline">
              <div className="listen-m2b__letters">
                {data.test.letters.map((L) => {
                  const used = usedMap.has(L);
                  return (
                    <button
                      key={L}
                      type="button"
                      className={`pr-chip ${mapPick === L ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                      disabled={checked || used}
                      onClick={() => setMapPick((p) => (p === L ? null : L))}
                    >
                      {L}
                    </button>
                  );
                })}
              </div>
              <ol className="listen-m2b__map-qs listen-m2b__map-qs--grid">
                {data.test.mapItems.map((it) => {
                  const letter = mapAns[it.id];
                  const ok = letter === it.key;
                  let gap = "listen-m2b__gap";
                  if (checked) {
                    gap += ok
                      ? " listen-m2b__gap--ok"
                      : " listen-m2b__gap--bad";
                  } else if (letter) gap += " listen-m2b__gap--filled";
                  else if (mapPick) gap += " listen-m2b__gap--ready";
                  return (
                    <li key={it.id}>
                      <span className="listen-m2b__n">{it.id}</span>
                      <span>{it.text}</span>
                      <button
                        type="button"
                        className={gap}
                        disabled={checked}
                        onClick={() => {
                          if (checked) return;
                          if (letter && !mapPick) {
                            setMapAns((m) => {
                              const next = { ...m };
                              delete next[it.id];
                              return next;
                            });
                            return;
                          }
                          placeMap(it.id);
                        }}
                      >
                        {letter ?? "—"}
                      </button>
                      {checked && !ok && (
                        <span className="listen-m2b__tip">→ {it.key}</span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
            <figure className="listen-m2b__map">
              <figcaption>{data.test.mapTitle}</figcaption>
              <img src={data.test.map} alt={data.test.mapAlt} />
            </figure>
          </div>
        </section>
      )}

      {step === 4 && (
        <ExpertDiscussPanel
          key="discussion"
          badge={data.discussion.badge}
          heading={data.discussion.heading}
          instruction={data.discussion.instruction}
          suggestedTitle={data.discussion.suggestedTitle}
          suggestedAnswer={data.discussion.suggestedAnswer}
        />
      )}

      <div
        className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}
      >
        <button
          type="button"
          className="flow-footer__btn"
          disabled={step === 0}
          onClick={() => {
            setChecked(false);
            setMapPick(null);
            setStep((s) => Math.max(0, s - 1));
          }}
        >
          ← Назад
        </button>
        {checked && needsCheck ? (
          <span className="flow-footer__result">
            <span className="flow-footer__ok">✓ {score}</span>
            <span className="flow-footer__bad">✗ {total - score}</span>
          </span>
        ) : (
          <span className="flow-footer__step">
            {step + 1} / {LEARN_STEPS_L2B.length}
          </span>
        )}
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={goNext}
          disabled={step === 1 && !checked && !polly}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
