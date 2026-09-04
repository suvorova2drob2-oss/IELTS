import { useEffect, useState } from "react";
import {
  WRITE_M3A_NEXT,
  WRITE_M3A_STEPS,
  writingM3a,
} from "../data/writingM3a";
import { ExpertDiscussPanel } from "./ExpertDiscussPanel";
import { WritingComposePanel } from "./WritingComposePanel";

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

function WriteM3aFollowLetters({
  instruction,
  letters,
  referenceHint,
  introduces,
  supports,
  setIntroduces,
  setSupports,
  introducesKey,
  supportsKey,
  checked,
  introduceLabel = "Introduces the solution",
  supportLabel = "Supports the solution",
}: {
  instruction?: string;
  letters: string[];
  referenceHint?: string;
  introduces: string | null;
  supports: string | null;
  setIntroduces: (id: string) => void;
  setSupports: (id: string) => void;
  introducesKey: string;
  supportsKey: string;
  checked: boolean;
  introduceLabel?: string;
  supportLabel?: string;
}) {
  const followOk =
    introduces === introducesKey && supports === supportsKey;

  const chipState = (
    id: string,
    selected: string | null,
    key: string,
  ): string => {
    if (checked) {
      if (id === key) return "write-m3a__follow-letter--ok";
      if (selected === id) return "write-m3a__follow-letter--bad";
      return "";
    }
    if (selected === id) return "write-m3a__follow-letter--picked";
    return "";
  };

  return (
    <div className="write-m3a__follow-compact">
      {instruction ? (
        <p className="write-m3a__follow-compact-h">{instruction}</p>
      ) : null}
      {referenceHint ? (
        <p className="write-m3a__follow-ref-hint">{referenceHint}</p>
      ) : null}
      <div className="write-m3a__follow-letter-rows">
        <div className="write-m3a__follow-letter-row">
          <span className="write-m3a__follow-letter-label">{introduceLabel}</span>
          <div className="write-m3a__follow-letter-bank">
            {letters.map((id) => (
              <button
                key={`intro-${id}`}
                type="button"
                className={`write-m3a__follow-letter ${chipState(id, introduces, introducesKey)}`}
                disabled={checked}
                onClick={() => setIntroduces(id)}
              >
                {id}
              </button>
            ))}
          </div>
        </div>
        <div className="write-m3a__follow-letter-row">
          <span className="write-m3a__follow-letter-label">{supportLabel}</span>
          <div className="write-m3a__follow-letter-bank">
            {letters.map((id) => (
              <button
                key={`supp-${id}`}
                type="button"
                className={`write-m3a__follow-letter ${chipState(id, supports, supportsKey)}`}
                disabled={checked}
                onClick={() => setSupports(id)}
              >
                {id}
              </button>
            ))}
          </div>
        </div>
      </div>
      {checked && !followOk && (
        <p className="write-m3a__tip write-m3a__tip--block">
          → Introduces {introducesKey}, supports {supportsKey}
        </p>
      )}
    </div>
  );
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
        <section className="write-m3a__panel write-m3a__panel--stage">
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
          <div className="write-m3a__structs flow-stage__body">
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
        <section className="write-m3a__panel write-m3a__panel--stage">
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">{data.para3a.badge}</span>
            {data.para3a.instruction}
          </p>
          <ol className="write-m3a__sent-grid flow-stage__body">
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
        <section className="write-m3a__panel write-m3a__panel--fn write-m3a__panel--fn-split">
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">{data.functions.badge}</span>
            {data.functions.instruction}
          </p>
          <div className="write-m3a__fn-split">
            <aside className="write-m3a__fn-ref">
              <p className="write-m3a__fn-ref-h">Sentences from Exercise 3a</p>
              <ol className="write-m3a__fn-ref-list">
                {data.para3a.sentences.map((s) => {
                  const used = usedLetters.has(s.id);
                  const picked = pickedLetter === s.id;
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        className={`write-m3a__fn-ref-letter pr-chip ${picked ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                        disabled={checked || used}
                        onClick={() => setPickedLetter(s.id)}
                        aria-label={`Select sentence ${s.id}`}
                      >
                        {s.id}
                      </button>
                      <span className="write-m3a__fn-ref-text">
                        <strong>{s.id}.</strong> {s.text}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </aside>
            <div className="write-m3a__fn-work">
              <div className="write-m3a__fn-match">
                <p className="write-m3a__fn-section-h">Part 1 — Match functions</p>
                <p className="write-m3a__place-hint">
                  {pickedLetter
                    ? `Selected ${pickedLetter} — click a function row to place it`
                    : "Pick a letter (A–F) on the left, then click a function (1–6)."}
                </p>
                <ol className="write-m3a__fn-list flow-stage__body">
                  {data.functions.slots.map((slot) => {
                    const val = fnMatch[slot.id];
                    const ok = val === slot.key;
                    let cls = "write-m3a__fn-row";
                    if (val) cls += " write-m3a__fn-row--filled";
                    if (pickedLetter && !val) cls += " write-m3a__fn-row--ready";
                    if (checked)
                      cls += ok
                        ? " write-m3a__fn-row--ok"
                        : " write-m3a__fn-row--bad";
                    return (
                      <li key={slot.id}>
                        <button
                          type="button"
                          className={cls}
                          disabled={checked}
                          onClick={() => placeFn(slot.id)}
                        >
                          <span className="write-m3a__fn-row-num">{slot.id}.</span>
                          <span className="write-m3a__fn-row-label">
                            {slot.label}
                          </span>
                          <span
                            className={`write-m3a__fn-row-letter${val ? " write-m3a__fn-row-letter--filled" : ""}`}
                          >
                            {val ?? "?"}
                          </span>
                        </button>
                        {checked && !ok && (
                          <span className="write-m3a__tip">→ {slot.key}</span>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </div>
              <div className="write-m3a__fn-follow">
                <p className="write-m3a__fn-section-h">Part 2 — Solution sentences</p>
                <WriteM3aFollowLetters
                  instruction={data.functions.followUp.instruction}
                  letters={data.para3a.sentences.map((s) => s.id)}
                  referenceHint="Use sentences A–F on the left."
                  introduces={introduces}
                  supports={supports}
                  setIntroduces={setIntroduces}
                  setSupports={setSupports}
                  introducesKey={data.functions.followUp.introducesKey}
                  supportsKey={data.functions.followUp.supportsKey}
                  checked={checked}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {step === 4 && (
        <section className="write-m3a__panel write-m3a__panel--notes write-m3a__panel--stage">
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">{data.para3c.badge}</span>
            {data.para3c.instruction}
          </p>
          <div className="write-m3a__notes-split flow-stage__body">
            <aside className="write-m3a__context">
              <div className="write-m3a__context-block">
                <p className="write-m3a__context-h">Essay task (Exercise 2)</p>
                <blockquote className="write-m3a__context-quote">
                  {data.structures.title}
                </blockquote>
              </div>
              <div className="write-m3a__context-block">
                <p className="write-m3a__context-h">
                  Paragraph structure (Exercise 3b)
                </p>
                <ol className="write-m3a__context-slots">
                  {data.functions.slots.map((slot) => (
                    <li key={slot.id}>
                      <strong>{slot.id}.</strong> {slot.label}
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
            <div className="write-m3a__notes-main">
              <p className="write-m3a__notes-label">
                Your paragraph (new issue + problems + solutions):
              </p>
              <textarea
                className="write-m3a__textarea write-m3a__textarea--notes"
                value={notes3c}
                onChange={(e) => setNotes3c(e.target.value)}
                placeholder="Topic sentence → problems → solutions (structure from 3b)…"
              />
            </div>
          </div>
        </section>
      )}

      {step === 5 && (
        <section className="write-m3a__panel write-m3a__panel--stage write-m3a__panel--order">
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">{data.order4a.badge}</span>
            <strong>{data.order4a.heading}</strong> —{" "}
            {data.order4a.instruction}
          </p>
          <p className="write-m3a__hint">
            Click a sentence to add it to the sequence (1–6). Click a filled
            slot to undo.
          </p>
          <div className="write-m3a__order-grid flow-stage__body">
            <div className="write-m3a__order-card">
              <p className="write-m3a__order-card-h">Your order</p>
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
                        {id ?? "— click a sentence →"}
                      </button>
                      {checked && id && id !== orderKey[i] && (
                        <span className="write-m3a__tip">→ {orderKey[i]}</span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
            <div className="write-m3a__order-card">
              <p className="write-m3a__order-card-h">Sentences</p>
              <ul className="write-m3a__sent-list write-m3a__sent-list--pick">
                {data.order4a.items.map((it) => {
                  const used = sentOrder.includes(it.id);
                  return (
                    <li key={it.id}>
                      <button
                        type="button"
                        className={`write-m3a__sent-pick ${used ? "write-m3a__sent-pick--used" : ""}`}
                        disabled={checked || used || orderDone}
                        onClick={() => placeSent(it.id)}
                      >
                        <span className="write-m3a__sent-pick-id">{it.id}</span>
                        <span className="write-m3a__sent-pick-text">
                          {it.text}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {checked && orderScore < orderKey.length && (
            <p className="write-m3a__tip write-m3a__tip--block">
              Order: {orderKey.join(" → ")}
            </p>
          )}
        </section>
      )}

      {step === 6 && (
        <section className="write-m3a__panel write-m3a__panel--stage write-m3a__panel--sol4">
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">{data.sol4b.badge}</span>
            {data.sol4b.instruction}
          </p>
          <div className="write-m3a__sol4-split flow-stage__body">
            <aside className="write-m3a__fn-ref">
              <p className="write-m3a__fn-ref-h">
                Ordered paragraph (Exercise 4a)
              </p>
              <ol className="write-m3a__fn-ref-list">
                {data.order4a.key.map((id, i) => {
                  const it = data.order4a.items.find((x) => x.id === id)!;
                  return (
                    <li key={id}>
                      <span className="write-m3a__fn-ref-letter write-m3a__fn-ref-letter--static">
                        {i + 1}
                      </span>
                      <span className="write-m3a__fn-ref-text">
                        <strong>{id}.</strong> {it.text}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </aside>
            <div className="write-m3a__sol4-main">
              <WriteM3aFollowLetters
                letters={data.order4a.items.map((s) => s.id)}
                referenceHint="Use the ordered paragraph on the left (letters A–F)."
                introduces={intro4}
                supports={supp4}
                setIntroduces={setIntro4}
                setSupports={setSupp4}
                introducesKey={data.sol4b.introducesKey}
                supportsKey={data.sol4b.supportsKey}
                checked={checked}
              />
            </div>
          </div>
        </section>
      )}

      {step === 7 && (
        <section className="write-m3a__panel write-m3a__panel--stage write-m3a__panel--write">
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">{data.write.badge}</span>
            <strong>{data.write.heading}</strong>
          </p>
          <blockquote className="write-m3a__title-box write-m3a__title-box--write">
            {data.write.title}
          </blockquote>
          <div className="write-m3a__write-stage flow-stage__body">
            <aside className="write-m3a__write-ref">
              <div className="write-m3a__context-block">
                <p className="write-m3a__context-h">{data.write.strategies.heading}</p>
                <ul className="write-m2a__strategies write-m3a__strategies">
                  {data.write.strategies.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="write-m3a__context-block">
                <p className="write-m3a__context-h">{data.write.expertTips.heading}</p>
                <ul className="write-m2a__strategies write-m3a__strategies">
                  {data.write.expertTips.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="write-m3a__context-block">
                <p className="write-m3a__context-h">
                  Structures from Exercise 2 — pick one (5c)
                </p>
                <div className="write-m3a__write-structs">
                  {data.structures.options.map((opt) => {
                    const picked = structWrite === opt.id;
                    const suitable = data.structures.keys.includes(opt.id);
                    let cls = `write-m3a__struct write-m3a__struct--pick write-m3a__struct--${opt.tone}`;
                    if (picked) cls += " write-m3a__struct--on";
                    if (suitable) cls += " write-m3a__struct--suitable";
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        className={cls}
                        onClick={() => setStructWrite(opt.id)}
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
                <p className="write-m3a__struct-note">{data.structures.tip}</p>
              </div>
            </aside>
            <div className="write-m3a__plan-col">
              <p className="write-m3a__col-h">Plan (5a–5c)</p>
              <ul className="write-m3a__write-steps">
                <li>
                  <span className="write-m3a__badge">{data.write.planA.badge}</span>
                  {data.write.planA.instruction}
                </li>
                <li>
                  <span className="write-m3a__badge">{data.write.planB.badge}</span>
                  {data.write.planB.instruction}
                </li>
                <li>
                  <span className="write-m3a__badge">{data.write.planC.badge}</span>
                  {data.write.planC.instruction}
                </li>
              </ul>
              <textarea
                className="write-m3a__textarea write-m3a__textarea--plan"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                placeholder="Problems · solutions · support ideas…"
              />
            </div>
            <div className="write-m3a__essay-col">
              <p className="write-m3a__col-h">
                <span className="write-m3a__badge">{data.write.writeD.badge}</span>
                {data.write.writeD.instruction}
              </p>
              <WritingComposePanel
                draft={draft}
                onDraftChange={setDraft}
                minWords={data.write.minWords}
                placeholder="Write your essay here (at least 250 words)…"
                rows={12}
                showModel={false}
                onToggleModel={() => {}}
                textareaClassName="write-m3a__textarea write-m3a__textarea--essay write-compose__ta"
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
