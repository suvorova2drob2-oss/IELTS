import { useEffect, useState } from "react";
import {
  checkListenM2aPlace,
  isDirGap,
  LEARN_STEP_NEXT_L2A,
  LEARN_STEPS_L2A,
  listenM2aWalkBlanks,
  listeningM2a,
} from "../data/listeningM2a";
import { AudioPlayer } from "./AudioPlayer";

const STEP_KEY = "ielts-listening-m2a-step";
const data = listeningM2a;
const walkBlanks = listenM2aWalkBlanks();

function loadStep(restart?: boolean, initialStep?: number): number {
  if (initialStep != null) return initialStep;
  if (restart) return 0;
  try {
    const raw = sessionStorage.getItem(STEP_KEY);
    if (raw != null) {
      const n = Number(raw);
      if (n >= 0 && n < LEARN_STEPS_L2A.length) return n;
    }
  } catch {
    /* ignore */
  }
  return 0;
}

type WalkAns = Record<string, string>;

function walkKey(who: string, id: number) {
  return `${who}-${id}`;
}

export function ListeningM2aTrainer({
  onBack,
  restart,
  initialStep,
}: {
  onBack?: () => void;
  restart?: boolean;
  initialStep?: number;
}) {
  const [step, setStep] = useState(() => loadStep(restart, initialStep));
  const [showKey, setShowKey] = useState(false);
  const [walkAns, setWalkAns] = useState<WalkAns>({});
  const [walkChecked, setWalkChecked] = useState(false);
  const [dirAns, setDirAns] = useState<Record<number, string>>({});
  const [dirChecked, setDirChecked] = useState(false);
  const [matchPick, setMatchPick] = useState<string | null>(null);
  const [matchAns, setMatchAns] = useState<Record<number, string>>({});
  const [matchChecked, setMatchChecked] = useState(false);
  const [campPick, setCampPick] = useState<string | null>(null);
  const [campAns, setCampAns] = useState<Record<number, string>>({});
  const [campChecked, setCampChecked] = useState(false);

  useEffect(() => {
    if (restart) {
      setStep(initialStep ?? 0);
      setShowKey(false);
      setWalkAns({});
      setWalkChecked(false);
      setDirAns({});
      setDirChecked(false);
      setMatchPick(null);
      setMatchAns({});
      setMatchChecked(false);
      setCampPick(null);
      setCampAns({});
      setCampChecked(false);
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
      setShowKey(false);
      setWalkChecked(false);
      setDirChecked(false);
      setMatchChecked(false);
      setMatchPick(null);
      setCampChecked(false);
      setCampPick(null);
    }
  }, [initialStep]);

  useEffect(() => {
    try {
      sessionStorage.setItem(STEP_KEY, String(step));
    } catch {
      /* ignore */
    }
  }, [step]);

  const walkScore = walkBlanks.filter((b) =>
    checkListenM2aPlace(walkAns[walkKey(b.who, b.id)] ?? "", b.answers),
  ).length;

  const dirGaps = data.directions.parts.filter(isDirGap);
  const dirScore = dirGaps.filter((g) => dirAns[g.gap] === g.key).length;
  const matchScore = data.match.phrases.filter(
    (p) => matchAns[p.id] === p.key,
  ).length;
  const usedLetters = new Set(Object.values(matchAns).filter(Boolean));
  const campScore = data.campLabel.items.filter(
    (it) => campAns[it.id] === it.key,
  ).length;
  const usedCampLetters = new Set(Object.values(campAns).filter(Boolean));

  const placeMatch = (phraseId: number) => {
    if (matchChecked || !matchPick) return;
    setMatchAns((m) => {
      const next = { ...m };
      for (const [k, v] of Object.entries(next)) {
        if (v === matchPick) delete next[Number(k)];
      }
      if (next[phraseId] === matchPick) {
        delete next[phraseId];
      } else {
        next[phraseId] = matchPick;
      }
      return next;
    });
    setMatchPick(null);
  };

  const placeCamp = (itemId: number) => {
    if (campChecked || !campPick) return;
    setCampAns((m) => {
      const next = { ...m };
      for (const [k, v] of Object.entries(next)) {
        if (v === campPick) delete next[Number(k)];
      }
      if (next[itemId] === campPick) {
        delete next[itemId];
      } else {
        next[itemId] = campPick;
      }
      return next;
    });
    setCampPick(null);
  };

  const goNext = () => {
    if (step === 1 && !showKey) {
      setShowKey(true);
      return;
    }
    if (step === 2 && !walkChecked) {
      setWalkChecked(true);
      return;
    }
    if (step === 3 && !dirChecked) {
      setDirChecked(true);
      return;
    }
    if (step === 4 && !matchChecked) {
      setMatchChecked(true);
      return;
    }
    if (step === 6 && !campChecked) {
      setCampChecked(true);
      return;
    }
    if (step >= LEARN_STEPS_L2A.length - 1) {
      onBack?.();
      return;
    }
    setShowKey(false);
    setWalkChecked(false);
    setDirChecked(false);
    setMatchChecked(false);
    setMatchPick(null);
    setCampChecked(false);
    setCampPick(null);
    setStep((s) => s + 1);
  };

  const nextLabel =
    step === 1 && !showKey
      ? "Show suggested answer →"
      : step === 2 && !walkChecked
        ? "Check answers →"
        : step === 3 && !dirChecked
          ? "Check answers →"
          : step === 4 && !matchChecked
            ? "Check answers →"
            : step === 6 && !campChecked
              ? "Check answers →"
              : (LEARN_STEP_NEXT_L2A[step] ?? "Дальше →");

  const resetStepFlags = () => {
    setShowKey(false);
    setWalkChecked(false);
    setDirChecked(false);
    setMatchChecked(false);
    setMatchPick(null);
    setCampChecked(false);
    setCampPick(null);
  };

  return (
    <div className="app-shell reading-flow reading-flow--viewport listen-m2a">
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
          {LEARN_STEPS_L2A.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                resetStepFlags();
              }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="listen-m2a__lead">
          <figure className="listen-m2a__hero">
            <img
              src={data.beforeYouListen.image}
              alt={data.beforeYouListen.imageAlt}
            />
          </figure>
          <div className="listen-m2a__prompt">
            <h2 className="listen-m2a__heading">
              {data.beforeYouListen.heading}
            </h2>
            <p className="listen-m2a__instr">
              <span className="listen-m2a__badge">
                {data.beforeYouListen.badge}
              </span>
              {data.beforeYouListen.instruction}
            </p>
            <ol className="listen-m2a__qs">
              {data.beforeYouListen.questions.map((q, i) => (
                <li key={i}>
                  <span className="listen-m2a__q-n">{i + 1}</span>
                  <span>{q}</span>
                </li>
              ))}
            </ol>
            <p className="listen-m2a__cue">Discuss in groups</p>
          </div>
        </section>
      )}

      {step === 1 && (
        <section className="listen-m2a__map-step">
          <div className="listen-m2a__map-side">
            <p className="listen-m2a__instr">
              <span className="listen-m2a__badge">{data.mapTalk.badge}</span>
              {data.mapTalk.instruction}
            </p>
            <p className="listen-m2a__bank">
              {data.mapTalk.bank.map((w) => (
                <span key={w} className="listen-m2a__chip">
                  {w}
                </span>
              ))}
            </p>
            <p className="listen-m2a__example">
              <em>{data.mapTalk.example}</em>
            </p>
            <p className="listen-m2a__places">
              <strong>Places:</strong> {data.mapTalk.places}
            </p>
            {showKey && (
              <div className="listen-m2a__suggested">
                <strong>Suggested answer</strong>
                <p>{data.mapTalk.suggestedAnswer}</p>
              </div>
            )}
            <p className="listen-m2a__cue">Talk with a partner</p>
          </div>
          <figure className="listen-m2a__map">
            <img src={data.mapTalk.map} alt={data.mapTalk.mapAlt} />
          </figure>
        </section>
      )}

      {step === 2 && (
        <section className="listen-m2a__walks">
          <header className="listen-m2a__walks-head">
            <p className="listen-m2a__instr">
              <span className="listen-m2a__badge">{data.walks.badge}</span>
              {data.walks.instruction}
            </p>
            <AudioPlayer
              src={data.walks.audio}
              label={data.walks.audioLabel}
            />
          </header>
          <div className="listen-m2a__walks-cols">
            {data.walks.columns.map((col) => (
              <div key={col.name} className="listen-m2a__walk-col">
                <h3>{col.name}</h3>
                <ol>
                  {col.gaps.map((g) => {
                    if (g.given) {
                      return (
                        <li key={g.id}>
                          <span className="listen-m2a__walk-n">{g.id}</span>
                          <span className="listen-m2a__walk-given">
                            {g.given}
                          </span>
                        </li>
                      );
                    }
                    const k = walkKey(col.name, g.id);
                    const val = walkAns[k] ?? "";
                    const ok = checkListenM2aPlace(val, g.answers);
                    let cls = "listen-m2a__walk-input";
                    if (walkChecked) {
                      cls += ok
                        ? " listen-m2a__walk-input--ok"
                        : " listen-m2a__walk-input--bad";
                    }
                    return (
                      <li key={g.id}>
                        <span className="listen-m2a__walk-n">{g.id}</span>
                        <input
                          className={cls}
                          value={val}
                          disabled={walkChecked}
                          placeholder="________"
                          aria-label={`${col.name} place ${g.id}`}
                          onChange={(e) =>
                            setWalkAns((a) => ({
                              ...a,
                              [k]: e.target.value,
                            }))
                          }
                        />
                        {walkChecked && !ok && (
                          <span className="listen-m2a__walk-tip">
                            → {g.answers[0]}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="listen-m2a__dir">
          <p className="listen-m2a__instr">
            <span className="listen-m2a__badge">{data.directions.badge}</span>
            {data.directions.instruction}
          </p>
          <div className="listen-m2a__dir-split">
            <article className="listen-m2a__dir-text">
              <p>
                {data.directions.parts.map((part, i) => {
                  if (!isDirGap(part)) {
                    return <span key={i}>{part.text}</span>;
                  }
                  const sel = dirAns[part.gap];
                  return (
                    <span key={i} className="listen-m2a__dir-gap">
                      <strong className="listen-m2a__dir-n">{part.gap}</strong>
                      {part.options.map((opt) => {
                        let state = "";
                        if (dirChecked) {
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
                            disabled={dirChecked}
                            onClick={() =>
                              setDirAns((a) => ({ ...a, [part.gap]: opt }))
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
            <figure className="listen-m2a__map listen-m2a__map--dir">
              <img src={data.mapTalk.map} alt={data.mapTalk.mapAlt} />
              <figcaption>Map from Exercise 2</figcaption>
            </figure>
          </div>
        </section>
      )}

      {step === 4 && (
        <section className="listen-m2a__match">
          <p className="listen-m2a__instr">
            <span className="listen-m2a__badge">{data.match.badge}</span>
            {data.match.instruction}
          </p>
          <p className="listen-m2a__match-hint">
            Click a letter, then a phrase. Click a filled gap to undo.
          </p>
          <div className="listen-m2a__match-grid">
            <ol className="listen-m2a__phrases">
              {data.match.phrases.map((p) => {
                const letter = matchAns[p.id];
                const ok = letter === p.key;
                let gapCls = "listen-m2a__match-gap";
                if (matchChecked) {
                  gapCls += ok
                    ? " listen-m2a__match-gap--ok"
                    : " listen-m2a__match-gap--bad";
                } else if (letter) {
                  gapCls += " listen-m2a__match-gap--filled";
                } else if (matchPick) {
                  gapCls += " listen-m2a__match-gap--ready";
                }
                return (
                  <li key={p.id}>
                    <span className="listen-m2a__walk-n">{p.id}</span>
                    <button
                      type="button"
                      className={gapCls}
                      disabled={matchChecked}
                      onClick={() => {
                        if (matchChecked) return;
                        if (letter && !matchPick) {
                          setMatchAns((m) => {
                            const next = { ...m };
                            delete next[p.id];
                            return next;
                          });
                          return;
                        }
                        placeMatch(p.id);
                      }}
                    >
                      {letter ?? "—"}
                    </button>
                    <span className="listen-m2a__phrase-text">{p.text}</span>
                    {matchChecked && !ok && (
                      <span className="listen-m2a__walk-tip">→ {p.key}</span>
                    )}
                  </li>
                );
              })}
            </ol>
            <ul className="listen-m2a__meanings">
              {data.match.meanings.map((m) => {
                const used = usedLetters.has(m.id);
                return (
                  <li key={m.id}>
                    <button
                      type="button"
                      className={`pr-chip listen-m2a__letter ${matchPick === m.id ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                      disabled={matchChecked || used}
                      onClick={() =>
                        setMatchPick((p) => (p === m.id ? null : m.id))
                      }
                    >
                      {m.id}
                    </button>
                    <span>{m.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {step === 5 && (
        <section className="listen-m2a__camp">
          <p className="listen-m2a__instr">
            <span className="listen-m2a__badge">{data.campPreview.badge}</span>
            {data.campPreview.instruction}
          </p>
          <figure className="listen-m2a__camp-map">
            <img
              src={data.campPreview.map}
              alt={data.campPreview.mapAlt}
            />
          </figure>
          <p className="listen-m2a__cue">Describe locations A–E with a partner</p>
        </section>
      )}

      {step === 6 && (
        <section className="listen-m2a__camp listen-m2a__camp--label">
          <header className="listen-m2a__camp-head">
            <p className="listen-m2a__instr">
              <span className="listen-m2a__badge">{data.campLabel.badge}</span>
              {data.campLabel.instruction}
            </p>
            <AudioPlayer
              src={data.campLabel.audio}
              label={data.campLabel.audioLabel}
            />
          </header>
          <div className="listen-m2a__camp-label">
            <div className="listen-m2a__camp-task">
              <h3>{data.campLabel.taskHeader}</h3>
              <p className="listen-m2a__match-hint">{data.campLabel.taskInstr}</p>
              <p className="listen-m2a__match-hint">
                Click a letter A–E, then a question. Click a filled gap to undo.
              </p>
              <div className="listen-m2a__camp-letters">
                {data.campLabel.letters.map((L) => {
                  const used = usedCampLetters.has(L);
                  return (
                    <button
                      key={L}
                      type="button"
                      className={`pr-chip listen-m2a__letter ${campPick === L ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                      disabled={campChecked || used}
                      onClick={() =>
                        setCampPick((p) => (p === L ? null : L))
                      }
                    >
                      {L}
                    </button>
                  );
                })}
              </div>
              <ol className="listen-m2a__camp-qs">
                {data.campLabel.items.map((it) => {
                  const letter = campAns[it.id];
                  const ok = letter === it.key;
                  let gapCls = "listen-m2a__match-gap";
                  if (campChecked) {
                    gapCls += ok
                      ? " listen-m2a__match-gap--ok"
                      : " listen-m2a__match-gap--bad";
                  } else if (letter) {
                    gapCls += " listen-m2a__match-gap--filled";
                  } else if (campPick) {
                    gapCls += " listen-m2a__match-gap--ready";
                  }
                  return (
                    <li key={it.id}>
                      <span className="listen-m2a__walk-n">{it.id}</span>
                      <span className="listen-m2a__phrase-text">{it.text}</span>
                      <button
                        type="button"
                        className={gapCls}
                        disabled={campChecked}
                        onClick={() => {
                          if (campChecked) return;
                          if (letter && !campPick) {
                            setCampAns((m) => {
                              const next = { ...m };
                              delete next[it.id];
                              return next;
                            });
                            return;
                          }
                          placeCamp(it.id);
                        }}
                      >
                        {letter ?? "—"}
                      </button>
                      {campChecked && !ok && (
                        <span className="listen-m2a__walk-tip">→ {it.key}</span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
            <figure className="listen-m2a__camp-map listen-m2a__camp-map--side">
              <img
                src={data.campPreview.map}
                alt={data.campPreview.mapAlt}
              />
            </figure>
          </div>
        </section>
      )}

      <div
        className={`flow-footer ${(walkChecked && step === 2) || (dirChecked && step === 3) || (matchChecked && step === 4) || (campChecked && step === 6) ? "flow-footer--checked" : ""}`}
      >
        <button
          type="button"
          className="flow-footer__btn"
          disabled={step === 0}
          onClick={() => {
            resetStepFlags();
            setStep((s) => Math.max(0, s - 1));
          }}
        >
          ← Назад
        </button>
        {walkChecked && step === 2 ? (
          <span className="flow-footer__result">
            <span className="flow-footer__ok">✓ {walkScore}</span>
            <span className="flow-footer__bad">
              ✗ {walkBlanks.length - walkScore}
            </span>
          </span>
        ) : dirChecked && step === 3 ? (
          <span className="flow-footer__result">
            <span className="flow-footer__ok">✓ {dirScore}</span>
            <span className="flow-footer__bad">
              ✗ {dirGaps.length - dirScore}
            </span>
          </span>
        ) : matchChecked && step === 4 ? (
          <span className="flow-footer__result">
            <span className="flow-footer__ok">✓ {matchScore}</span>
            <span className="flow-footer__bad">
              ✗ {data.match.phrases.length - matchScore}
            </span>
          </span>
        ) : campChecked && step === 6 ? (
          <span className="flow-footer__result">
            <span className="flow-footer__ok">✓ {campScore}</span>
            <span className="flow-footer__bad">
              ✗ {data.campLabel.items.length - campScore}
            </span>
          </span>
        ) : (
          <span className="flow-footer__step">
            {step + 1} / {LEARN_STEPS_L2A.length}
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
