import { useEffect, useState } from "react";
import {
  MS_U1_SPEAK_NEXT,
  MS_U1_SPEAK_STEPS,
  speakingU1,
} from "../../data/mindset/speakingU1";

const data = speakingU1;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, MS_U1_SPEAK_STEPS.length - 1));
}

export function SpeakingU1Trainer({
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
  const [quiz, setQuiz] = useState<Record<string, string>>({});
  const [notAsked, setNotAsked] = useState<Set<string>>(new Set());
  const [showWeak, setShowWeak] = useState(false);
  const [cardPick, setCardPick] = useState<string | null>(null);
  const [showListenTip, setShowListenTip] = useState(false);
  const [matchAns, setMatchAns] = useState<Record<string, string>>({});
  const [pickedQ, setPickedQ] = useState<string | null>(null);
  const [funcMap, setFuncMap] = useState<Record<string, string>>({});
  const [pickedFunc, setPickedFunc] = useState<string | null>(null);
  const [critMap, setCritMap] = useState<Record<string, string>>({});
  const [pickedCrit, setPickedCrit] = useState<string | null>(null);
  const [futureGaps, setFutureGaps] = useState<Record<string, string>>({});
  const [pickedFuture, setPickedFuture] = useState<string | null>(null);
  const [showDiscuss, setShowDiscuss] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setQuiz({});
    setNotAsked(new Set());
    setShowWeak(false);
    setCardPick(null);
    setShowListenTip(false);
    setMatchAns({});
    setPickedQ(null);
    setFuncMap({});
    setPickedFunc(null);
    setCritMap({});
    setPickedCrit(null);
    setFutureGaps({});
    setPickedFuture(null);
    setShowDiscuss(false);
    setNotes("");
  }, [restart, initialStep]);

  const needsCheck = step <= 4;

  const quizScore = data.quiz.items.filter((it) => quiz[it.id] === it.key)
    .length;

  const notAskedKey = new Set(data.part1.notAskedKeys);
  const notAskedScore =
    notAsked.size === notAskedKey.size &&
    [...notAsked].every((id) => notAskedKey.has(id))
      ? 1
      : 0;

  const cardScore = cardPick === data.part2.key ? 1 : 0;

  const matchScore = Object.entries(data.part3.matchKeys).filter(
    ([n, k]) => matchAns[n] === k,
  ).length;
  const funcScore = Object.entries(data.part3.functionKeys).filter(
    ([q, k]) => funcMap[q] === k,
  ).length;
  const critScore = data.part3.criteria.filter(
    (c) => critMap[c.id] === c.key,
  ).length;

  const futureScore = data.future.gaps.filter(
    (g) => futureGaps[g.id] === g.key,
  ).length;

  const score =
    step === 0
      ? quizScore
      : step === 1
        ? notAskedScore
        : step === 2
          ? cardScore
          : step === 3
            ? matchScore + funcScore + critScore
            : step === 4
              ? futureScore
              : 0;
  const total =
    step === 0
      ? data.quiz.items.length
      : step === 1
        ? 1
        : step === 2
          ? 1
          : step === 3
            ? 5 + 5 + data.part3.criteria.length
            : step === 4
              ? data.future.gaps.length
              : 0;

  const usedMatch = new Set(Object.values(matchAns));
  const usedFunc = new Set(Object.values(funcMap));
  const usedFuture = new Set(Object.values(futureGaps));

  const place = (
    gaps: Record<string, string>,
    setGaps: (fn: (g: Record<string, string>) => Record<string, string>) => void,
    picked: string | null,
    setPicked: (v: string | null) => void,
    id: string,
  ) => {
    if (checked) return;
    if (gaps[id]) {
      setGaps((g) => {
        const next = { ...g };
        delete next[id];
        return next;
      });
      return;
    }
    if (!picked) return;
    setGaps((g) => ({ ...g, [id]: picked }));
    setPicked(null);
  };

  const toggleNotAsked = (id: string) => {
    if (checked) return;
    setNotAsked((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
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
    if (step >= MS_U1_SPEAK_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setStep((s) => s + 1);
  };

  const nextLabel =
    needsCheck && !checked ? "Check →" : MS_U1_SPEAK_NEXT[step];

  const gapBtn = (
    filled: string | undefined,
    onClick: () => void,
    ok?: boolean,
  ) => (
    <button
      type="button"
      className={`inline-gap ${filled ? "inline-gap--filled" : ""} ${
        checked && filled ? (ok ? "inline-gap--ok" : "inline-gap--bad") : ""
      }`}
      disabled={checked}
      onClick={onClick}
    >
      {filled ?? "——"}
    </button>
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
          {MS_U1_SPEAK_STEPS.map((label, i) => (
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
        <section className="read-m3__panel">
          <div className="ms-unit-goals">
          <p className="ms-unit-goals__title">In this unit you will learn how to</p>
          <ul className="ms-unit-goals__list">
            {data.unitGoals.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.quiz.badge}</span>
            {data.quiz.instruction}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
            }}
          >
            {data.quiz.items.map((it) => (
              <div key={it.id} className="ms-mc-card">
                <p className="ms-mc-card__stem">
                  <strong>{it.id}.</strong> {it.stem}
                </p>
                <ul className="read-m3__opts">
                  {it.options.map((opt) => {
                    let state = "";
                    if (quiz[it.id] === opt.id) state = "read-m3__opt--on";
                    if (checked && opt.id === it.key)
                      state = "read-m3__opt--ok";
                    else if (
                      checked &&
                      quiz[it.id] === opt.id &&
                      opt.id !== it.key
                    )
                      state = "read-m3__opt--bad";
                    return (
                      <li key={opt.id}>
                        <button
                          type="button"
                          className={`read-m3__opt ${state}`}
                          disabled={checked}
                          onClick={() =>
                            setQuiz((m) => ({ ...m, [it.id]: opt.id }))
                          }
                        >
                          <strong>{opt.id}.</strong> {opt.text}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          <p className="write-m2a__cue">{data.quiz.discuss}</p>
        </section>
      )}

      {step === 1 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.part1.badge}</span>
            {data.part1.instruction}
          </p>
          <p className="write-m2a__expert">{data.part1.tip}</p>
          <p className="write-m2a__cue">
            Tap every question that would NOT be asked in Part 1.
          </p>
          <ul className="read-m3__opts">
            {data.part1.questions.map((q) => {
              const on = notAsked.has(q.id);
              let state = on ? "read-m3__opt--on" : "";
              if (checked) {
                if (q.notAsked && on) state = "read-m3__opt--ok";
                else if (q.notAsked && !on) state = "read-m3__opt--bad";
                else if (!q.notAsked && on) state = "read-m3__opt--bad";
              }
              return (
                <li key={q.id}>
                  <button
                    type="button"
                    className={`read-m3__opt ${state}`}
                    disabled={checked}
                    onClick={() => toggleNotAsked(q.id)}
                  >
                    <strong>{q.id}.</strong> {q.text}
                  </button>
                </li>
              );
            })}
          </ul>
          {checked && (
            <p className="read-m3__tip">
              The following questions would not be asked:{" "}
              {data.part1.notAskedKeys.join(", ")}
            </p>
          )}
          <p className="write-m2a__expert">{data.part1.tip2}</p>
          <p className="read-m3__instr read-m3__instr--mt">
            <span className="write-m2a__badge">
              {data.part1.weakAnswers.badge}
            </span>
            {data.part1.weakAnswers.instruction}
          </p>
          <button
            type="button"
            className="pr-chip"
            onClick={() => setShowWeak((v) => !v)}
          >
            {showWeak ? "Hide weak-answer notes" : "Show weak-answer notes"}
          </button>
          {showWeak && (
            <ul className="read-m3__qs" style={{ marginTop: 8 }}>
              {data.part1.weakAnswers.notes.map((n) => (
                <li key={n.id}>{n.text}</li>
              ))}
              {data.part1.weakAnswers.advice.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          )}
        </section>
      )}

      {step === 2 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.part2.badge}</span>
            {data.part2.instruction}
          </p>
          <p className="write-m2a__expert">{data.part2.tip}</p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 8,
            }}
          >
            {data.part2.cards.map((c) => {
              let state = "";
              if (cardPick === c.id) state = "read-m3__opt--on";
              if (checked && c.id === data.part2.key)
                state = "read-m3__opt--ok";
              else if (
                checked &&
                cardPick === c.id &&
                c.id !== data.part2.key
              )
                state = "read-m3__opt--bad";
              return (
                <button
                  key={c.id}
                  type="button"
                  className={`read-m3__opt ${state}`}
                  disabled={checked}
                  onClick={() => setCardPick(c.id)}
                  style={{
                    whiteSpace: "pre-wrap",
                    textAlign: "left",
                    height: "100%",
                  }}
                >
                  <strong>Task card {c.id}</strong>
                  {"\n"}
                  {c.text}
                </button>
              );
            })}
          </div>
          {checked && (
            <p className="read-m3__tip">Correct: Task card {data.part2.key}</p>
          )}
          <p className="write-m2a__cue" style={{ marginTop: 10 }}>
            {data.part2.listenNote}
          </p>
          <button
            type="button"
            className="pr-chip"
            onClick={() => setShowListenTip((v) => !v)}
          >
            {showListenTip ? "Hide examiner note" : "Show examiner note"}
          </button>
          {showListenTip && (
            <p className="read-m3__tip">{data.part2.listenTip}</p>
          )}
        </section>
      )}

      {step === 3 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.part3.badge}</span>
            {data.part3.matchInstruction}
          </p>
          <div className="pr-chip-bank">
            {data.part3.questions.map((q) => {
              const used = usedMatch.has(q.id);
              return (
                <button
                  key={q.id}
                  type="button"
                  className={`pr-chip ${pickedQ === q.id ? "pr-chip--on" : ""} ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used}
                  onClick={() => setPickedQ(q.id)}
                  title={q.text}
                >
                  {q.id}
                </button>
              );
            })}
          </div>
          <ul className="read-m3__qs">
            {data.part3.answers.map((n) => {
              const ok = matchAns[n] === data.part3.matchKeys[n];
              return (
                <li key={n}>
                  Answer {n} → question{" "}
                  {gapBtn(
                    matchAns[n],
                    () =>
                      place(matchAns, setMatchAns, pickedQ, setPickedQ, n),
                    ok,
                  )}
                  {checked && !ok && (
                    <span className="inline-gap-bad">
                      {" "}
                      → {data.part3.matchKeys[n]}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="read-m3__qs" style={{ marginTop: 6 }}>
            {data.part3.questions.map((q) => (
              <p key={q.id} className="read-m3__hint">
                <strong>{q.id}.</strong> {q.text}
              </p>
            ))}
          </div>

          <p className="read-m3__instr read-m3__instr--mt">
            {data.part3.functionInstruction}
          </p>
          <p className="write-m2a__cue">{data.part3.tip}</p>
          <div className="pr-chip-bank">
            {data.part3.functions.map((f) => {
              const used = usedFunc.has(f.id);
              return (
                <button
                  key={f.id}
                  type="button"
                  className={`pr-chip ${pickedFunc === f.id ? "pr-chip--on" : ""} ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used}
                  onClick={() => setPickedFunc(f.id)}
                >
                  {f.id} · {f.text}
                </button>
              );
            })}
          </div>
          <ul className="read-m3__qs">
            {data.part3.questions.map((q) => {
              const ok = funcMap[q.id] === data.part3.functionKeys[q.id];
              return (
                <li key={q.id}>
                  Question {q.id}:{" "}
                  {gapBtn(
                    funcMap[q.id],
                    () =>
                      place(
                        funcMap,
                        setFuncMap,
                        pickedFunc,
                        setPickedFunc,
                        q.id,
                      ),
                    ok,
                  )}
                  {checked && !ok && (
                    <span className="inline-gap-bad">
                      {" "}
                      → {data.part3.functionKeys[q.id]}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>

          <p className="read-m3__instr read-m3__instr--mt">
            {data.part3.criteriaInstruction}
          </p>
          <div className="pr-chip-bank">
            {data.part3.criteriaBank.map((c) => (
              <button
                key={c}
                type="button"
                className={`pr-chip ${pickedCrit === c ? "pr-chip--on" : ""}`}
                disabled={checked}
                onClick={() => setPickedCrit(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <ul className="read-m3__qs">
            {data.part3.criteria.map((c) => {
              const ok = critMap[c.id] === c.key;
              return (
                <li key={c.id}>
                  <strong>{c.id}.</strong> {c.text}{" "}
                  {gapBtn(
                    critMap[c.id],
                    () =>
                      place(
                        critMap,
                        setCritMap,
                        pickedCrit,
                        setPickedCrit,
                        c.id,
                      ),
                    ok,
                  )}
                  {checked && !ok && (
                    <span className="inline-gap-bad"> → {c.key}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 4 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.future.badge}</span>
            {data.future.instruction}
          </p>
          <p className="write-m2a__cue">
            <em>{data.future.wrong}</em>
          </p>
          <p className="read-m3__tip">{data.future.wrongTip}</p>
          <p className="read-m3__instr read-m3__instr--mt">
            <span className="write-m2a__badge">{data.future.badge12}</span>
            {data.future.instruction12}
          </p>
          <div className="pr-chip-bank">
            {data.future.bank.map((w) => {
              const used = usedFuture.has(w);
              return (
                <button
                  key={w}
                  type="button"
                  className={`pr-chip ${pickedFuture === w ? "pr-chip--on" : ""} ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used}
                  onClick={() => setPickedFuture(w)}
                >
                  {w}
                </button>
              );
            })}
          </div>
          <ul className="read-m3__qs">
            {data.future.gaps.map((g) => {
              const ok = futureGaps[g.id] === g.key;
              return (
                <li key={g.id}>
                  <strong>{g.id}.</strong>{" "}
                  {gapBtn(
                    futureGaps[g.id],
                    () =>
                      place(
                        futureGaps,
                        setFutureGaps,
                        pickedFuture,
                        setPickedFuture,
                        g.id,
                      ),
                    ok,
                  )}
                  {g.after}
                  {checked && !ok && (
                    <span className="inline-gap-bad"> → {g.key}</span>
                  )}
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            className="pr-chip"
            onClick={() => setShowDiscuss((v) => !v)}
          >
            {showDiscuss ? "Hide discussion tips" : "Show discussion tips"}
          </button>
          {showDiscuss && (
            <ol className="read-m3__qs" style={{ marginTop: 8 }}>
              {data.future.discuss.map((q, i) => (
                <li key={q}>
                  {q}
                  <p className="write-m2a__cue">{data.future.discussTips[i]}</p>
                </li>
              ))}
            </ol>
          )}
        </section>
      )}

      {step === 5 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.exam.badge}</span>
            {data.exam.part1.instruction}
          </p>
          <ul className="read-m3__qs">
            {data.exam.part1.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
          <p className="read-m3__instr read-m3__instr--mt">
            {data.exam.part2.instruction}
          </p>
          <article className="read-m3__passage read-m3__passage--solo">
            <p style={{ whiteSpace: "pre-wrap" }}>{data.exam.part2.card}</p>
          </article>
          <textarea
            className="write-m2a__area"
            rows={5}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="1-minute notes for your long turn…"
          />
          <p className="read-m3__instr read-m3__instr--mt">
            {data.exam.part3.instruction}
          </p>
          <ol className="read-m3__qs">
            {data.exam.part3.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
        </section>
      )}

      <footer
        className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}
      >
        <button type="button" className="flow-footer__btn" onClick={goPrev}>
          ← Back
        </button>
        <span className="flow-footer__step">
          {step + 1} / {MS_U1_SPEAK_STEPS.length}
        </span>
        {checked && needsCheck && (
          <span className="flow-footer__result">
            <span
              className={
                score === total ? "flow-footer__ok" : "flow-footer__bad"
              }
            >
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
