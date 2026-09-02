import { useEffect, useState } from "react";
import {
  WRITE_M3A_NEXT,
  WRITE_M3A_STEPS,
  writingM3a,
} from "../data/writingM3a";
import { ExpertDiscussPanel } from "./ExpertDiscussPanel";
import { WordCountMeter, countWords } from "./WordCountMeter";

const data = writingM3a;
const STEP_KEY = "ielts-writing-m3a-step";
const DRAFT_KEY = "ielts-writing-m3a-draft";
const PLAN_KEY = "ielts-writing-m3a-plan";

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, WRITE_M3A_STEPS.length - 1));
}

function load(key: string): string {
  try {
    return sessionStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}

export function WritingM3aTrainer({
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
  const [structPick, setStructPick] = useState<number[]>([]);
  const [ps, setPs] = useState<Record<string, string>>({});
  const [fnMatch, setFnMatch] = useState<Record<number, string>>({});
  const [pickedLetter, setPickedLetter] = useState<string | null>(null);
  const [introduces, setIntroduces] = useState<string | null>(null);
  const [supports, setSupports] = useState<string | null>(null);
  const [notes3c, setNotes3c] = useState("");
  const [sentOrder, setSentOrder] = useState<string[]>([]);
  const [intro4, setIntro4] = useState<string | null>(null);
  const [supp4, setSupp4] = useState<string | null>(null);
  const [plan, setPlan] = useState(() => load(PLAN_KEY));
  const [structWrite, setStructWrite] = useState<number | null>(null);
  const [draft, setDraft] = useState(() => load(DRAFT_KEY));

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setStructPick([]);
    setPs({});
    setFnMatch({});
    setPickedLetter(null);
    setIntroduces(null);
    setSupports(null);
    setNotes3c("");
    setSentOrder([]);
    setIntro4(null);
    setSupp4(null);
    setPlan("");
    setStructWrite(null);
    setDraft("");
    try {
      sessionStorage.removeItem(STEP_KEY);
      sessionStorage.removeItem(DRAFT_KEY);
      sessionStorage.removeItem(PLAN_KEY);
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

  useEffect(() => {
    try {
      sessionStorage.setItem(PLAN_KEY, plan);
    } catch {
      /* ignore */
    }
  }, [plan]);

  const structOk =
    structPick.length === data.structures.keys.length &&
    data.structures.keys.every((k) => structPick.includes(k));

  const psScore = data.para3a.sentences.filter(
    (s) => ps[s.id] === s.key,
  ).length;

  const fnScore = data.functions.slots.filter(
    (s) => fnMatch[s.id] === s.key,
  ).length;
  const usedLetters = new Set(Object.values(fnMatch));
  const followOk =
    introduces === data.functions.followUp.introducesKey &&
    supports === data.functions.followUp.supportsKey;

  const orderKey = data.order4a.key;
  const orderScore = sentOrder.filter((id, i) => id === orderKey[i]).length;
  const orderDone = sentOrder.length === orderKey.length;

  const sol4Ok =
    intro4 === data.sol4b.introducesKey && supp4 === data.sol4b.supportsKey;

  const checkSteps = new Set([1, 2, 3, 5, 6]);
  const needsCheck = checkSteps.has(step);

  const score =
    step === 1
      ? structOk
        ? 1
        : 0
      : step === 2
        ? psScore
        : step === 3
          ? fnScore + (followOk ? 1 : 0)
          : step === 5
            ? orderScore
            : sol4Ok
              ? 1
              : 0;

  const total =
    step === 1
      ? 1
      : step === 2
        ? data.para3a.sentences.length
        : step === 3
          ? data.functions.slots.length + 1
          : step === 5
            ? orderKey.length
            : 1;

  const toggleStruct = (id: number) => {
    if (checked) return;
    setStructPick((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const placeFn = (slotId: number) => {
    if (checked) return;
    if (fnMatch[slotId]) {
      setFnMatch((m) => {
        const n = { ...m };
        delete n[slotId];
        return n;
      });
      return;
    }
    if (!pickedLetter) return;
    setFnMatch((m) => ({ ...m, [slotId]: pickedLetter }));
    setPickedLetter(null);
  };

  const placeSent = (id: string) => {
    if (checked || sentOrder.includes(id)) return;
    setSentOrder((o) => [...o, id]);
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
    if (step >= WRITE_M3A_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setStep((s) => s + 1);
  };

  const nextLabel =
    needsCheck && !checked ? "Check →" : WRITE_M3A_NEXT[step];

  const words = countWords(draft);

  return (
    <div className="app-shell reading-flow reading-flow--viewport write-m3a">
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
          {WRITE_M3A_STEPS.map((label, i) => (
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
        <ExpertDiscussPanel
          key="lead-in"
          heading={data.leadIn.heading}
          badge={data.leadIn.badge}
          instruction={data.leadIn.instruction}
          questions={data.leadIn.questions}
          suggestedTitle={data.leadIn.suggestedTitle}
          suggestedAnswer={data.leadIn.suggestedAnswer}
          languageFocus={data.leadIn.languageFocus}
        />
      )}

      {step === 1 && (
        <section className="write-m3a__panel">
          <p className="write-m3a__expert">{data.expertWriting}</p>
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">{data.structures.badge}</span>
            <strong>{data.structures.heading}</strong> —{" "}
            {data.structures.instruction}
          </p>
          <blockquote className="write-m3a__title-box">
            {data.structures.title}
          </blockquote>
          <p className="write-m3a__hint">
            Select every suitable structure, then Check.
          </p>
          <div className="write-m3a__structs">
            {data.structures.options.map((opt) => {
              const on = structPick.includes(opt.id);
              const isKey = data.structures.keys.includes(opt.id);
              let cls = `write-m3a__struct write-m3a__struct--${opt.tone}`;
              if (on) cls += " write-m3a__struct--on";
              if (checked) {
                if (isKey) cls += " write-m3a__struct--ok";
                else if (on) cls += " write-m3a__struct--bad";
              }
              return (
                <button
                  key={opt.id}
                  type="button"
                  className={cls}
                  disabled={checked}
                  onClick={() => toggleStruct(opt.id)}
                >
                  <strong>{opt.label}</strong>
                  <ul>
                    {opt.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
          {checked && (
            <p className="write-m3a__tip">{data.structures.tip}</p>
          )}
        </section>
      )}

      {step === 2 && (
        <section className="write-m3a__panel">
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">{data.para3a.badge}</span>
            {data.para3a.instruction}
          </p>
          <ol className="write-m3a__sent-grid">
            {data.para3a.sentences.map((s) => {
              const sel = ps[s.id];
              const ok = sel === s.key;
              return (
                <li key={s.id}>
                  <p>
                    <strong>{s.id}</strong> {s.text}
                  </p>
                  <div className="write-m3a__ps-btns">
                    {(["problem", "solution"] as const).map((opt) => {
                      let state = "";
                      if (checked) {
                        if (opt === s.key) state = "pr-chip--ok";
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
                            setPs((p) => ({ ...p, [s.id]: opt }))
                          }
                        >
                          {opt === "problem" ? "Problem" : "Solution"}
                        </button>
                      );
                    })}
                    {checked && !ok && (
                      <span className="write-m3a__tip">
                        → {s.key === "problem" ? "Problem" : "Solution"}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {step === 3 && (
        <section className="write-m3a__panel write-m3a__panel--fn">
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">{data.functions.badge}</span>
            {data.functions.instruction}
          </p>
          <div className="write-m3a__fn-bank">
            {data.para3a.sentences.map((s) => {
              const used = usedLetters.has(s.id);
              return (
                <button
                  key={s.id}
                  type="button"
                  className={`pr-chip write-m3a__letter ${pickedLetter === s.id ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used}
                  onClick={() => setPickedLetter(s.id)}
                  title={s.text}
                >
                  {s.id}
                </button>
              );
            })}
          </div>
          <ol className="write-m3a__fn-slots">
            {data.functions.slots.map((slot) => {
              const val = fnMatch[slot.id];
              const ok = val === slot.key;
              let cls = "write-m3a__slot";
              if (val) cls += " write-m3a__slot--filled";
              if (pickedLetter && !val) cls += " write-m3a__slot--ready";
              if (checked)
                cls += ok ? " write-m3a__slot--ok" : " write-m3a__slot--bad";
              return (
                <li key={slot.id}>
                  <button
                    type="button"
                    className={cls}
                    disabled={checked}
                    onClick={() => placeFn(slot.id)}
                  >
                    <strong>{slot.id}.</strong> {slot.label}
                    {val ? ` — ${val}` : " — click to place"}
                  </button>
                  {checked && !ok && (
                    <span className="write-m3a__tip">→ {slot.key}</span>
                  )}
                </li>
              );
            })}
          </ol>
          <p className="write-m3a__instr write-m3a__instr--sub">
            {data.functions.followUp.instruction}
          </p>
          <div className="write-m3a__follow">
            <div className="write-m3a__follow-row">
              <span>Introduces</span>
              {data.para3a.sentences.map((s) => {
                let state = "";
                if (checked) {
                  if (s.id === data.functions.followUp.introducesKey)
                    state = "pr-chip--ok";
                  else if (introduces === s.id) state = "pr-chip--bad";
                } else if (introduces === s.id) state = "pr-chip--picked";
                return (
                  <button
                    key={`i-${s.id}`}
                    type="button"
                    className={`pr-chip ${state}`}
                    disabled={checked}
                    onClick={() => setIntroduces(s.id)}
                  >
                    {s.id}
                  </button>
                );
              })}
            </div>
            <div className="write-m3a__follow-row">
              <span>Supports</span>
              {data.para3a.sentences.map((s) => {
                let state = "";
                if (checked) {
                  if (s.id === data.functions.followUp.supportsKey)
                    state = "pr-chip--ok";
                  else if (supports === s.id) state = "pr-chip--bad";
                } else if (supports === s.id) state = "pr-chip--picked";
                return (
                  <button
                    key={`s-${s.id}`}
                    type="button"
                    className={`pr-chip ${state}`}
                    disabled={checked}
                    onClick={() => setSupports(s.id)}
                  >
                    {s.id}
                  </button>
                );
              })}
            </div>
            {checked && !followOk && (
              <span className="write-m3a__tip">
                → Introduces {data.functions.followUp.introducesKey}, supports{" "}
                {data.functions.followUp.supportsKey}
              </span>
            )}
          </div>
        </section>
      )}

      {step === 4 && (
        <section className="write-m3a__panel write-m3a__panel--notes">
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">{data.para3c.badge}</span>
            {data.para3c.instruction}
          </p>
          <textarea
            className="write-m3a__textarea"
            value={notes3c}
            onChange={(e) => setNotes3c(e.target.value)}
            placeholder="Your issue + paragraph (topic → problems → solutions)…"
            rows={8}
          />
        </section>
      )}

      {step === 5 && (
        <section className="write-m3a__panel">
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">{data.order4a.badge}</span>
            <strong>{data.order4a.heading}</strong> —{" "}
            {data.order4a.instruction}
          </p>
          <p className="write-m3a__hint">
            Click a sentence letter to add it to the sequence. Click a filled
            slot to undo.
          </p>
          <div className="write-m3a__order-grid">
            <ol className="write-m3a__seq">
              {orderKey.map((_, i) => {
                const id = sentOrder[i];
                let cls = "write-m3a__slot";
                if (checked && id) {
                  cls +=
                    id === orderKey[i]
                      ? " write-m3a__slot--ok"
                      : " write-m3a__slot--bad";
                } else if (id) cls += " write-m3a__slot--filled";
                return (
                  <li key={i}>
                    <span className="write-m3a__slot-n">{i + 1}</span>
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
                    {checked && id && id !== orderKey[i] && (
                      <span className="write-m3a__tip">→ {orderKey[i]}</span>
                    )}
                  </li>
                );
              })}
            </ol>
            <ul className="write-m3a__sent-list">
              {data.order4a.items.map((it) => {
                const used = sentOrder.includes(it.id);
                return (
                  <li key={it.id}>
                    <button
                      type="button"
                      className={`pr-chip write-m3a__letter ${used ? "pr-chip--used" : ""}`}
                      disabled={checked || used || orderDone}
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
          {checked && orderScore < orderKey.length && (
            <p className="write-m3a__tip write-m3a__tip--block">
              Order: {orderKey.join(" → ")}
            </p>
          )}
        </section>
      )}

      {step === 6 && (
        <section className="write-m3a__panel write-m3a__panel--sol4">
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">{data.sol4b.badge}</span>
            {data.sol4b.instruction}
          </p>
          <p className="write-m3a__hint">
            Use the ordered nutrition paragraph from 4a (B–D–E–C–F–A).
          </p>
          <ul className="write-m3a__sent-list write-m3a__sent-list--ref">
            {data.order4a.key.map((id) => {
              const it = data.order4a.items.find((x) => x.id === id)!;
              return (
                <li key={id}>
                  <strong>{id}</strong>
                  <span>{it.text}</span>
                </li>
              );
            })}
          </ul>
          <div className="write-m3a__follow">
            <div className="write-m3a__follow-row">
              <span>Introduces the solution</span>
              {data.order4a.items.map((s) => {
                let state = "";
                if (checked) {
                  if (s.id === data.sol4b.introducesKey) state = "pr-chip--ok";
                  else if (intro4 === s.id) state = "pr-chip--bad";
                } else if (intro4 === s.id) state = "pr-chip--picked";
                return (
                  <button
                    key={`i4-${s.id}`}
                    type="button"
                    className={`pr-chip ${state}`}
                    disabled={checked}
                    onClick={() => setIntro4(s.id)}
                  >
                    {s.id}
                  </button>
                );
              })}
            </div>
            <div className="write-m3a__follow-row">
              <span>Supports the solution</span>
              {data.order4a.items.map((s) => {
                let state = "";
                if (checked) {
                  if (s.id === data.sol4b.supportsKey) state = "pr-chip--ok";
                  else if (supp4 === s.id) state = "pr-chip--bad";
                } else if (supp4 === s.id) state = "pr-chip--picked";
                return (
                  <button
                    key={`s4-${s.id}`}
                    type="button"
                    className={`pr-chip ${state}`}
                    disabled={checked}
                    onClick={() => setSupp4(s.id)}
                  >
                    {s.id}
                  </button>
                );
              })}
            </div>
            {checked && !sol4Ok && (
              <span className="write-m3a__tip">
                → Introduces {data.sol4b.introducesKey}, supports{" "}
                {data.sol4b.supportsKey}
              </span>
            )}
          </div>
        </section>
      )}

      {step === 7 && (
        <section className="write-m3a__panel write-m3a__panel--write">
          <p className="write-m3a__expert">{data.testStrategies}</p>
          <h2 className="write-m3a__title">{data.write.heading}</h2>
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">{data.write.planA.badge}</span>
            {data.write.planA.instruction}
          </p>
          <blockquote className="write-m3a__title-box">
            {data.write.title}
          </blockquote>
          <div className="write-m3a__write-grid">
            <div className="write-m3a__plan-col">
              <p className="write-m3a__instr write-m3a__instr--sub">
                <span className="write-m3a__badge">
                  {data.write.planB.badge}
                </span>
                {data.write.planB.instruction}
              </p>
              <p className="write-m3a__instr write-m3a__instr--sub">
                <span className="write-m3a__badge">
                  {data.write.planC.badge}
                </span>
                {data.write.planC.instruction}
              </p>
              <div className="write-m3a__struct-mini">
                {data.structures.options.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    className={`pr-chip ${structWrite === opt.id ? "pr-chip--picked" : ""}`}
                    onClick={() => setStructWrite(opt.id)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <textarea
                className="write-m3a__textarea write-m3a__textarea--plan"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                placeholder="Problems · solutions · support ideas…"
                rows={6}
              />
            </div>
            <div className="write-m3a__essay-col">
              <p className="write-m3a__instr write-m3a__instr--sub">
                <span className="write-m3a__badge">
                  {data.write.writeD.badge}
                </span>
                {data.write.writeD.instruction}
              </p>
              <WordCountMeter
                words={words}
                minWords={data.write.minWords}
                label="Task 2 · exam minimum"
              />
              <textarea
                className="write-m3a__textarea write-m3a__textarea--essay"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Write your essay here…"
                rows={12}
              />
            </div>
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
