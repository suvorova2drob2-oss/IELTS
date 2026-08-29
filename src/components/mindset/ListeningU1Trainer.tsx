import { useEffect, useState } from "react";
import {
  MS_U1_LISTEN_NEXT,
  MS_U1_LISTEN_STEPS,
  listeningU1,
} from "../../data/mindset/listeningU1";

const data = listeningU1;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, MS_U1_LISTEN_STEPS.length - 1));
}

function norm(s: string): string {
  return s.toLowerCase().replace(/[£()]/g, "").replace(/\s+/g, " ").trim();
}

function matchesKey(val: string, key: string, alts?: string[]): boolean {
  const pool = [key, ...(alts ?? [])].map(norm);
  return pool.includes(norm(val));
}

export function ListeningU1Trainer({
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
  const [synPick, setSynPick] = useState<Record<string, string>>({});
  const [predictGaps, setPredictGaps] = useState<Record<string, string>>({});
  const [pickedPredict, setPickedPredict] = useState<string | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [formGaps, setFormGaps] = useState<Record<string, string>>({});
  const [pickedForm, setPickedForm] = useState<string | null>(null);
  const [notHear, setNotHear] = useState<Record<string, string[]>>({});
  const [mcPick, setMcPick] = useState<Record<string, string>>({});
  const [condGaps, setCondGaps] = useState<Record<string, string>>({});
  const [pickedCond, setPickedCond] = useState<string | null>(null);
  const [examGaps, setExamGaps] = useState<Record<string, string>>({});
  const [pickedExam, setPickedExam] = useState<string | null>(null);
  const [examMc, setExamMc] = useState<Record<string, string>>({});
  const [showSamples, setShowSamples] = useState(false);

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setSynPick({});
    setPredictGaps({});
    setPickedPredict(null);
    setShowHints(false);
    setFormGaps({});
    setPickedForm(null);
    setNotHear({});
    setMcPick({});
    setCondGaps({});
    setPickedCond(null);
    setExamGaps({});
    setPickedExam(null);
    setExamMc({});
    setShowSamples(false);
  }, [restart, initialStep]);

  const needsCheck = true;

  const synScore = data.leadIn.items.filter((it) => {
    const p = synPick[it.id];
    if (it.notSynonym === "ALL") return p === "ALL";
    return p === it.notSynonym;
  }).length;

  const predictScore = Object.entries(data.predict.keys).filter(([id, k]) =>
    matchesKey(predictGaps[id] ?? "", k, data.predict.altKeys[id]),
  ).length;

  const formScore = data.form.fields.filter((f) =>
    matchesKey(formGaps[f.id] ?? "", f.key, f.alts),
  ).length;

  const notHearScore = data.notHear.items.filter((it) => {
    const sel = new Set(notHear[it.id] ?? []);
    const keys = new Set(it.keys);
    return (
      sel.size === keys.size && [...keys].every((k) => sel.has(k))
    );
  }).length;

  const mcScore = data.mc.items.filter((it) => mcPick[it.id] === it.key)
    .length;

  const condScore = Object.entries(data.conditionals.keys).filter(
    ([id, k]) => condGaps[id] === k,
  ).length;

  const examGapScore = data.exam.fields.filter((f) =>
    matchesKey(examGaps[f.id] ?? "", f.key, f.alts),
  ).length;
  const examMcScore = data.exam.mc.filter((it) => examMc[it.id] === it.key)
    .length;

  const score =
    step === 0
      ? synScore
      : step === 1
        ? predictScore
        : step === 2
          ? formScore
          : step === 3
            ? notHearScore + mcScore
            : step === 4
              ? condScore
              : examGapScore + examMcScore;
  const total =
    step === 0
      ? data.leadIn.items.length
      : step === 1
        ? 5
        : step === 2
          ? data.form.fields.length
          : step === 3
            ? data.notHear.items.length + data.mc.items.length
            : step === 4
              ? 4
              : data.exam.fields.length + data.exam.mc.length;

  const usedPredict = new Set(Object.values(predictGaps));
  const usedForm = new Set(Object.values(formGaps));
  const usedCond = new Set(Object.values(condGaps));
  const usedExam = new Set(Object.values(examGaps));

  const placeGap = (
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

  const toggleNotHear = (qid: string, opt: string) => {
    if (checked) return;
    setNotHear((m) => {
      const cur = new Set(m[qid] ?? []);
      if (cur.has(opt)) cur.delete(opt);
      else cur.add(opt);
      return { ...m, [qid]: [...cur] };
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
    if (step >= MS_U1_LISTEN_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setStep((s) => s + 1);
  };

  const nextLabel =
    needsCheck && !checked ? "Check →" : MS_U1_LISTEN_NEXT[step];

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

  const mcList = (
    items: { id: string; stem: string; options: { id: string; text: string }[]; key: string }[],
    picks: Record<string, string>,
    setPick: (id: string, v: string) => void,
  ) => (
    <div className="ms-mc-grid">
      {items.map((it) => (
        <div key={it.id} className="ms-mc-card">
          <p className="ms-mc-card__stem">
            <strong>{it.id}.</strong> {it.stem}
          </p>
          <ul className="read-m3__opts">
            {it.options.map((opt) => {
              let state = "";
              if (picks[it.id] === opt.id) state = "read-m3__opt--on";
              if (checked && opt.id === it.key) state = "read-m3__opt--ok";
              else if (
                checked &&
                picks[it.id] === opt.id &&
                opt.id !== it.key
              )
                state = "read-m3__opt--bad";
              return (
                <li key={opt.id}>
                  <button
                    type="button"
                    className={`read-m3__opt ${state}`}
                    disabled={checked}
                    onClick={() => setPick(it.id, opt.id)}
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
  );

  return (
    <div className="app-shell reading-flow reading-flow--viewport read-m3 ms-listen-u1">
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
          {MS_U1_LISTEN_STEPS.map((label, i) => (
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
        <section className="read-m3__panel ms-listen-lead">
          <div className="ms-listen-lead__top">
            <div className="ms-listen-lead__intro">
              <div className="ms-unit-goals">
              <p className="ms-unit-goals__title">In this unit you will learn how to</p>
              <ul className="ms-unit-goals__list">
                {data.unitGoals.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </div>
              <p className="read-m3__instr">
                <span className="write-m2a__badge">{data.leadIn.badge}</span>
                {data.leadIn.discuss}
              </p>
              <ul className="read-m3__qs read-m3__qs--compact ms-listen-lead__opts">
                {data.leadIn.options.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="read-m3__instr ms-listen-lead__instr">
            <span className="write-m2a__badge">{data.leadIn.badge2}</span>
            {data.leadIn.instruction}
          </p>
          <p className="write-m2a__cue">
            Tap the word that is NOT a synonym (or &quot;no synonyms&quot; for
            item 3).
          </p>
          <div className="ms-listen-syn-grid">
            {data.leadIn.items.map((it) => {
              const pick = synPick[it.id];
              return (
                <div key={it.id} className="read-m3__passage ms-listen-syn-card">
                  <p className="read-m3__hint">
                    <strong>({it.id})</strong> {it.context}
                  </p>
                  <div className="pr-chip-bank">
                    {it.words.map((w) => {
                      let cls = pick === w ? "pr-chip--picked" : "";
                      if (checked) {
                        if (it.notSynonym === w && pick === w)
                          cls = "pr-chip--ok";
                        else if (pick === w && it.notSynonym !== w)
                          cls = "pr-chip--bad";
                        else if (it.notSynonym === w) cls = "pr-chip--ok";
                      }
                      return (
                        <button
                          key={w}
                          type="button"
                          className={`pr-chip ${cls}`}
                          disabled={checked}
                          onClick={() =>
                            setSynPick((m) => ({ ...m, [it.id]: w }))
                          }
                        >
                          {w}
                        </button>
                      );
                    })}
                    {it.notSynonym === "ALL" && (
                      <button
                        type="button"
                        className={`pr-chip ${
                          pick === "ALL"
                            ? checked
                              ? "pr-chip--ok"
                              : "pr-chip--picked"
                            : ""
                        }`}
                        disabled={checked}
                        onClick={() =>
                          setSynPick((m) => ({ ...m, [it.id]: "ALL" }))
                        }
                      >
                        no synonyms
                      </button>
                    )}
                  </div>
                  {checked && <p className="read-m3__tip">{it.tip}</p>}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {step === 1 && (
        <section className="read-m3__panel">
          <p className="write-m2a__expert">{data.predict.tip}</p>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.predict.badge3}</span>
            {data.predict.instruction}
          </p>
          <button
            type="button"
            className="pr-chip"
            onClick={() => setShowHints((v) => !v)}
          >
            {showHints ? "Hide prediction hints" : "Show prediction hints"}
          </button>
          {showHints && (
            <ul className="read-m3__qs" style={{ marginTop: 8 }}>
              {data.predict.predictHints.map((h) => (
                <li key={h.id}>
                  Gap {h.id}: {h.hint}
                </li>
              ))}
            </ul>
          )}
          <p className="read-m3__instr read-m3__instr--mt">
            <span className="write-m2a__badge">{data.predict.badge4}</span>
            {data.predict.instruction4}
          </p>
          <div className="pr-chip-bank">
            {data.predict.bank.map((w) => {
              const used = usedPredict.has(w);
              return (
                <button
                  key={w}
                  type="button"
                  className={`pr-chip ${pickedPredict === w ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used}
                  onClick={() => setPickedPredict(w)}
                >
                  {w}
                </button>
              );
            })}
          </div>
          <article className="read-m3__passage read-m3__passage--solo">
            {data.predict.passageParts.map((p) => {
              const ok = matchesKey(
                predictGaps[p.gap] ?? "",
                data.predict.keys[p.gap],
                data.predict.altKeys[p.gap],
              );
              return (
                <p key={p.gap}>
                  {p.before}
                  {gapBtn(
                    predictGaps[p.gap],
                    () =>
                      placeGap(
                        predictGaps,
                        setPredictGaps,
                        pickedPredict,
                        setPickedPredict,
                        p.gap,
                      ),
                    ok,
                  )}
                  {p.after}
                  {checked && !ok && (
                    <span className="inline-gap-bad">
                      {" "}
                      → {data.predict.keys[p.gap]}
                    </span>
                  )}
                </p>
              );
            })}
          </article>
          {checked && (
            <>
              <h3 className="read-m3__h">Paraphrases in the recording</h3>
              <ul className="read-m3__qs">
                {data.predict.paraphrases.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </>
          )}
        </section>
      )}

      {step === 2 && (
        <section className="read-m3__panel">
          <p className="write-m2a__expert">{data.form.tip}</p>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.form.badge}</span>
            {data.form.instruction}
          </p>
          <h2 className="read-m3__h">{data.form.title}</h2>
          <p className="write-m2a__cue">{data.form.subtitle}</p>
          <div className="pr-chip-bank">
            {data.form.bank.map((w) => {
              const used = [...usedForm].some((u) => norm(u) === norm(w));
              return (
                <button
                  key={w}
                  type="button"
                  className={`pr-chip ${pickedForm === w ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used}
                  onClick={() => setPickedForm(w)}
                >
                  {w}
                </button>
              );
            })}
          </div>
          <ul className="read-m3__qs">
            {data.form.fields.map((f) => {
              const ok = matchesKey(formGaps[f.id] ?? "", f.key, f.alts);
              return (
                <li key={f.id}>
                  <strong>{f.id}.</strong> {f.label}{" "}
                  {gapBtn(
                    formGaps[f.id],
                    () =>
                      placeGap(
                        formGaps,
                        setFormGaps,
                        pickedForm,
                        setPickedForm,
                        f.id,
                      ),
                    ok,
                  )}
                  {f.suffix ?? ""}
                  {checked && !ok && (
                    <span className="inline-gap-bad"> → {f.key}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 3 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.notHear.badge}</span>
            {data.notHear.instruction}
          </p>
          <p className="write-m2a__cue">{data.notHear.tip}</p>
          <p className="write-m2a__cue">
            Select every option you would NOT hear (some items have two).
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
            }}
          >
            {data.notHear.items.map((it) => {
              const sel = new Set(notHear[it.id] ?? []);
              const keys = new Set(it.keys);
              return (
                <div key={it.id} className="ms-mc-card">
                  <p className="ms-mc-card__stem">
                    <strong>{it.id}.</strong> {it.stem}
                  </p>
                  <ul className="read-m3__opts">
                    {it.options.map((opt) => {
                      const on = sel.has(opt.id);
                      let state = on ? "read-m3__opt--on" : "";
                      if (checked) {
                        if (keys.has(opt.id) && on) state = "read-m3__opt--ok";
                        else if (keys.has(opt.id) && !on)
                          state = "read-m3__opt--bad";
                        else if (!keys.has(opt.id) && on)
                          state = "read-m3__opt--bad";
                      }
                      return (
                        <li key={opt.id}>
                          <button
                            type="button"
                            className={`read-m3__opt ${state}`}
                            disabled={checked}
                            onClick={() => toggleNotHear(it.id, opt.id)}
                          >
                            <strong>{opt.id}.</strong> {opt.text}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                  {checked && (
                    <p className="ms-mc-card__stem" style={{ marginTop: 6, opacity: 0.9 }}>
                      NOT hear: {it.keys.join(", ")}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          <p className="write-m2a__expert" style={{ marginTop: 10 }}>
            {data.mc.tip}
          </p>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.mc.badge9}</span>
            {data.mc.instruction}
          </p>
          {mcList(data.mc.items, mcPick, (id, v) =>
            setMcPick((m) => ({ ...m, [id]: v })),
          )}
        </section>
      )}

      {step === 4 && (
        <section className="read-m3__panel ms-listen-cond">
          <div className="ms-listen-cond__head">
            <p className="read-m3__instr">
              <span className="write-m2a__badge">
                {data.conditionals.badge}
              </span>
              {data.conditionals.instruction}
            </p>
            <p className="read-m3__instr">
              <span className="write-m2a__badge">
                {data.conditionals.badge13}
              </span>
              {data.conditionals.instruction13}
            </p>
          </div>
          <div className="pr-chip-bank ms-listen-cond__bank">
            {data.conditionals.bank.map((w) => {
              const used = usedCond.has(w);
              return (
                <button
                  key={w}
                  type="button"
                  className={`pr-chip ${pickedCond === w ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used}
                  onClick={() => setPickedCond(w)}
                >
                  {w}
                </button>
              );
            })}
          </div>
          <div className="ms-listen-cond__grid">
            {data.conditionals.sentences.map((s) => {
              const ok = condGaps[s.id] === data.conditionals.keys[s.id];
              return (
                <div key={s.id} className="read-m3__passage ms-listen-cond__card">
                  <p className="read-m3__hint">
                    <strong>({s.id})</strong> {s.text}
                  </p>
                  <p className="ms-listen-cond__gap-row">
                    Condition word:{" "}
                    {gapBtn(
                      condGaps[s.id],
                      () =>
                        placeGap(
                          condGaps,
                          setCondGaps,
                          pickedCond,
                          setPickedCond,
                          s.id,
                        ),
                      ok,
                    )}
                    {checked && !ok && (
                      <span className="inline-gap-bad">
                        {" "}
                        → {data.conditionals.keys[s.id]}
                      </span>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="ms-listen-cond__foot">
            {checked && (
              <p className="read-m3__tip">{data.conditionals.replaceTip}</p>
            )}
            <p className="write-m2a__expert ms-listen-cond__rule">
              {data.conditionals.rule}
            </p>
            <div className="ms-listen-cond__samples-row">
              <p className="read-m3__instr">
                <span className="write-m2a__badge">
                  {data.conditionals.badge15}
                </span>
                {data.conditionals.instruction15}
              </p>
              <button
                type="button"
                className="pr-chip"
                onClick={() => setShowSamples((v) => !v)}
              >
                {showSamples ? "Hide samples" : "Show sample sentences"}
              </button>
            </div>
            {showSamples && (
              <ol className="ms-listen-cond__samples">
                {data.conditionals.samples.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            )}
          </div>
        </section>
      )}

      {step === 5 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.exam.badge}</span>
            {data.exam.instruction}
          </p>
          <p className="write-m2a__cue">{data.exam.notesIntro}</p>
          <div className="pr-chip-bank">
            {data.exam.bank.map((w) => {
              const used = [...usedExam].some((u) => norm(u) === norm(w));
              return (
                <button
                  key={w}
                  type="button"
                  className={`pr-chip ${pickedExam === w ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used}
                  onClick={() => setPickedExam(w)}
                >
                  {w}
                </button>
              );
            })}
          </div>
          <ul className="read-m3__qs">
            {data.exam.fields.map((f) => {
              const ok = matchesKey(examGaps[f.id] ?? "", f.key, f.alts);
              return (
                <li key={f.id}>
                  <strong>{f.id}.</strong> {f.label}{" "}
                  {gapBtn(
                    examGaps[f.id],
                    () =>
                      placeGap(
                        examGaps,
                        setExamGaps,
                        pickedExam,
                        setPickedExam,
                        f.id,
                      ),
                    ok,
                  )}
                  {f.suffix ?? ""}
                  {"note" in f && f.note ? (
                    <span className="write-m2a__cue"> ({f.note})</span>
                  ) : null}
                  {checked && !ok && (
                    <span className="inline-gap-bad"> → {f.key}</span>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="read-m3__instr read-m3__instr--mt">
            {data.exam.mcIntro}
          </p>
          {mcList(data.exam.mc, examMc, (id, v) =>
            setExamMc((m) => ({ ...m, [id]: v })),
          )}
        </section>
      )}

      <footer
        className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}
      >
        <button type="button" className="flow-footer__btn" onClick={goPrev}>
          ← Back
        </button>
        <span className="flow-footer__step">
          {step + 1} / {MS_U1_LISTEN_STEPS.length}
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
