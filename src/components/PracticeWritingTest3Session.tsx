import { useEffect, useMemo, useState } from "react";
import { practiceWritingTest3 } from "../data/practiceWritingTest3";
import { WordCountMeter, countWords } from "./WordCountMeter";

type Track = "learn" | "exam";
type Phase =
  | "discuss"
  | "vocab"
  | "causeWords"
  | "brainstorm"
  | "introMatch"
  | "introParts"
  | "thesisMatch"
  | "essayPlan"
  | "write";

type ScorePair = { score: number; total: number };

const LEARN_FLOW: Phase[] = [
  "discuss",
  "vocab",
  "causeWords",
  "brainstorm",
  "introMatch",
  "introParts",
  "thesisMatch",
  "essayPlan",
  "write",
];
const EXAM_FLOW: Phase[] = ["write"];

function sameSet(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const sa = [...a].map((x) => x.toLowerCase()).sort();
  const sb = [...b].map((x) => x.toLowerCase()).sort();
  return sa.every((v, i) => v === sb[i]);
}

export function PracticeWritingTest3Session({
  track,
  onBackToModes,
  onComplete,
}: {
  track: Track;
  onBackToModes: () => void;
  onComplete: (scores: { training: ScorePair; write: ScorePair }) => void;
}) {
  const test = practiceWritingTest3;
  const flow = track === "exam" ? EXAM_FLOW : LEARN_FLOW;
  const [phase, setPhase] = useState<Phase>(flow[0]);
  const [trainParts, setTrainParts] = useState<ScorePair[]>([]);

  const goNext = () => {
    const i = flow.indexOf(phase);
    if (i < 0 || i >= flow.length - 1) {
      onBackToModes();
      return;
    }
    setPhase(flow[i + 1]);
  };

  const goBack = () => {
    const i = flow.indexOf(phase);
    if (i <= 0) onBackToModes();
    else setPhase(flow[i - 1]);
  };

  const addTrain = (s: ScorePair) => setTrainParts((p) => [...p, s]);

  const finish = (write: ScorePair) => {
    const training =
      track === "exam"
        ? write
        : {
            score: trainParts.reduce((n, t) => n + t.score, 0),
            total: Math.max(
              1,
              trainParts.reduce((n, t) => n + t.total, 0),
            ),
          };
    onComplete({ training, write });
  };

  if (phase === "discuss") {
    return (
      <DiscussPhase data={test.leadIn} onBack={goBack} onNext={goNext} />
    );
  }
  if (phase === "vocab") {
    return (
      <VocabPhase
        data={test.vocab}
        onBack={goBack}
        onNext={(s) => {
          addTrain(s);
          goNext();
        }}
      />
    );
  }
  if (phase === "causeWords") {
    return (
      <CauseWordsPhase
        data={test.causeWords}
        onBack={goBack}
        onNext={(s) => {
          addTrain(s);
          goNext();
        }}
      />
    );
  }
  if (phase === "brainstorm") {
    return (
      <BrainstormPhase
        data={test.brainstorm}
        onBack={goBack}
        onNext={goNext}
      />
    );
  }
  if (phase === "introMatch") {
    return (
      <IntroMatchPhase
        data={test.introMatch}
        onBack={goBack}
        onNext={(s) => {
          addTrain(s);
          goNext();
        }}
      />
    );
  }
  if (phase === "introParts") {
    return (
      <IntroPartsPhase
        data={test.introParts}
        onBack={goBack}
        onNext={(s) => {
          addTrain(s);
          goNext();
        }}
      />
    );
  }
  if (phase === "thesisMatch") {
    return (
      <ThesisMatchPhase
        data={test.thesisMatch}
        onBack={goBack}
        onNext={(s) => {
          addTrain(s);
          goNext();
        }}
      />
    );
  }
  if (phase === "essayPlan") {
    return (
      <EssayPlanPhase data={test.essayPlan} onBack={goBack} onNext={goNext} />
    );
  }

  return (
    <WriteEssayPhase
      data={test.writeTask}
      exam={track === "exam"}
      onBack={goBack}
      onNext={finish}
    />
  );
}

function DiscussPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceWritingTest3.leadIn;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="pw-shell pw-shell--wide">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Modes
        </button>
        <div className="pr-exam__chrome-title">
          <span>Learn · Lead-in</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <div className="pw-leadin">
        <figure className="pw-hero">
          <img src={data.image} alt={data.imageAlt} />
        </figure>
        <section className="pw-panel">
          <p className="pr-leadin__instruction">
            <span>1</span>
            {data.discussInstruction.replace(/^\d+\s*/, "")}
          </p>
          <ol className="pr-leadin__statements">
            {data.discussQuestions.map((q, i) => (
              <li key={q}>
                <strong>{i + 1}</strong>
                <span>{q}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        <span className="flow-footer__step">Discuss</span>
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={onNext}
        >
          Vocabulary →
        </button>
      </footer>
    </div>
  );
}

function VocabPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceWritingTest3.vocab;
  onBack: () => void;
  onNext: (s: ScorePair) => void;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const gapIds = Object.keys(data.keys).map(Number);
  const score = gapIds.filter((id) => answers[id] === data.keys[id]).length;

  return (
    <div className="pw-shell">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Learn</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <section className="pw-panel pw-panel--fill">
        <p className="pr-leadin__instruction">
          <span>2</span>
          {data.instruction.replace(/^\d+\s*/, "")}
        </p>
        <p className="pw-prep-para">
          {data.parts.map((part, i) => {
            if (typeof part === "string") {
              return <span key={i}>{part}</span>;
            }
            const val = answers[part.gap] ?? "";
            const ok = val === data.keys[part.gap];
            return (
              <span key={i} className="pw-prep-gap">
                <strong>{part.gap}</strong>
                <select
                  className={
                    checked
                      ? ok
                        ? "pr-match-select pr-match-select--ok"
                        : "pr-match-select pr-match-select--bad"
                      : "pr-match-select"
                  }
                  value={val}
                  disabled={checked}
                  onChange={(e) =>
                    setAnswers((a) => ({ ...a, [part.gap]: e.target.value }))
                  }
                >
                  <option value="">—</option>
                  {part.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                {checked && !ok && (
                  <span className="pl-blank__key">→ {data.keys[part.gap]}</span>
                )}
              </span>
            );
          })}
        </p>
      </section>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        <span className="flow-footer__step">
          {checked ? `✓ ${score}/${gapIds.length}` : "Prepositions"}
        </span>
        {!checked ? (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={() => setChecked(true)}
          >
            Check →
          </button>
        ) : (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={() => onNext({ score, total: gapIds.length })}
          >
            Next →
          </button>
        )}
      </footer>
    </div>
  );
}

function CauseWordsPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceWritingTest3.causeWords;
  onBack: () => void;
  onNext: (s: ScorePair) => void;
}) {
  const [picked, setPicked] = useState<Record<number, string[]>>({});
  const [checked, setChecked] = useState(false);

  const score = data.items.filter((item) =>
    sameSet(picked[item.id] ?? [], item.keys),
  ).length;

  const toggle = (qid: number, token: string) => {
    if (checked) return;
    setPicked((prev) => {
      const cur = prev[qid] ?? [];
      const next = cur.includes(token)
        ? cur.filter((t) => t !== token)
        : [...cur, token];
      return { ...prev, [qid]: next };
    });
  };

  return (
    <div className="pw-shell">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Learn · Training</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <section className="pw-panel pw-panel--fill">
        <p className="pr-leadin__instruction">
          <span>3</span>
          {data.instruction.replace(/^\d+\s*/, "")}
        </p>
        <p className="pw-hint">
          Tap the cause / effect word(s) in each question.
        </p>
        <ol className="pw-cause-list">
          {data.items.map((item) => {
            const sel = picked[item.id] ?? [];
            const ok = checked && sameSet(sel, item.keys);
            const bad = checked && !ok;
            return (
              <li key={item.id}>
                <p className="pw-cause-list__q">
                  <strong>{item.id}.</strong> {item.text}
                </p>
                <div className="pw-token-row">
                  {item.tokens.map((t, ti) => {
                    const on = sel.includes(t);
                    const isKey = item.keys.some(
                      (k) => k.toLowerCase() === t.toLowerCase(),
                    );
                    return (
                      <button
                        key={`${item.id}-${ti}-${t}`}
                        type="button"
                        className={[
                          "pw-token",
                          on ? "pw-token--on" : "",
                          checked && isKey ? "pw-token--key" : "",
                          checked && on && !isKey ? "pw-token--bad" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        disabled={checked}
                        onClick={() => toggle(item.id, t)}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
                {bad && (
                  <p className="pl-blank__key">
                    → {item.keys.join(" · ")}
                  </p>
                )}
                {ok && <p className="pw-cause-ok">✓</p>}
              </li>
            );
          })}
        </ol>
      </section>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        <span className="flow-footer__step">
          {checked ? `✓ ${score}/${data.items.length}` : "Cause & effect"}
        </span>
        {!checked ? (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={() => setChecked(true)}
          >
            Check →
          </button>
        ) : (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={() => onNext({ score, total: data.items.length })}
          >
            Next →
          </button>
        )}
      </footer>
    </div>
  );
}

function BrainstormPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceWritingTest3.brainstorm;
  onBack: () => void;
  onNext: () => void;
}) {
  const [qid, setQid] = useState(0);
  const [rows, setRows] = useState([
    { cause: "", effect: "" },
    { cause: "", effect: "" },
    { cause: "", effect: "" },
  ]);

  return (
    <div className="pw-shell">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Learn</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <section className="pw-panel pw-panel--fill">
        <p className="pr-leadin__instruction">
          <span>4</span>
          {data.instruction.replace(/^\d+\s*/, "")}
        </p>
        <label className="pw-field">
          <span>Question</span>
          <select
            className="pr-match-select pw-field__select"
            value={qid}
            onChange={(e) => setQid(Number(e.target.value))}
          >
            {data.questions.map((_, i) => (
              <option key={i} value={i}>
                Q{i + 1}
              </option>
            ))}
          </select>
        </label>
        <p className="pw-prompt">{data.questions[qid]}</p>
        <table className="pw-ce-table">
          <thead>
            <tr>
              <th>Cause</th>
              <th>Effect</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>
                  <input
                    value={r.cause}
                    onChange={(e) =>
                      setRows((all) =>
                        all.map((row, j) =>
                          j === i ? { ...row, cause: e.target.value } : row,
                        ),
                      )
                    }
                    placeholder="…"
                  />
                </td>
                <td>
                  <input
                    value={r.effect}
                    onChange={(e) =>
                      setRows((all) =>
                        all.map((row, j) =>
                          j === i ? { ...row, effect: e.target.value } : row,
                        ),
                      )
                    }
                    placeholder="…"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        <span className="flow-footer__step">Brainstorm</span>
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={onNext}
        >
          Introduction →
        </button>
      </footer>
    </div>
  );
}

function IntroMatchPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceWritingTest3.introMatch;
  onBack: () => void;
  onNext: (s: ScorePair) => void;
}) {
  const [choice, setChoice] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const ok = choice === data.key;

  return (
    <div className="pw-shell">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Learn</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <section className="pw-panel pw-panel--fill">
        <p className="pr-leadin__instruction">
          <span>5</span>
          {data.instruction.replace(/^\d+\s*/, "")}
        </p>
        <ol className="pw-intro-box">
          {data.introSentences.map((s, i) => (
            <li key={s}>
              <strong>{i + 1}</strong> {s}
            </li>
          ))}
        </ol>
        <ul className="pw-mc">
          {data.options.map((o) => {
            const selected = choice === o.id;
            const showOk = checked && o.id === data.key;
            const showBad = checked && selected && o.id !== data.key;
            return (
              <li key={o.id}>
                <button
                  type="button"
                  className={[
                    "pw-mc__btn",
                    selected ? "pw-mc__btn--on" : "",
                    showOk ? "pw-mc__btn--ok" : "",
                    showBad ? "pw-mc__btn--bad" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  disabled={checked}
                  onClick={() => setChoice(o.id)}
                >
                  <strong>{o.id}</strong>
                  <span>{o.text}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        <span className="flow-footer__step">
          {checked ? (ok ? "✓ 1/1" : "→ Question 3") : "Choose one"}
        </span>
        {!checked ? (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            disabled={choice == null}
            onClick={() => setChecked(true)}
          >
            Check →
          </button>
        ) : (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={() => onNext({ score: ok ? 1 : 0, total: 1 })}
          >
            Next →
          </button>
        )}
      </footer>
    </div>
  );
}

function IntroPartsPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceWritingTest3.introParts;
  onBack: () => void;
  onNext: (s: ScorePair) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const used = useMemo(
    () => new Set(Object.values(answers).filter(Boolean)),
    [answers],
  );
  const score = data.sentences.filter((s) => answers[s.id] === data.keys[s.id])
    .length;

  return (
    <div className="pw-shell">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Learn</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <section className="pw-panel pw-panel--fill">
        <p className="pr-leadin__instruction">
          <span>6</span>
          {data.instruction.replace(/^\d+\s*/, "")}
        </p>
        <ol className="pw-intro-box">
          {data.introSentences.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <ol className="pl-map-qs">
          {data.sentences.map((s) => {
            const val = answers[s.id] ?? "";
            const ok = val === data.keys[s.id];
            return (
              <li key={s.id}>
                <span className="pr-mc__num">{s.id}</span>
                <span className="pl-match-prompt pl-match-prompt--long">
                  {s.text}
                </span>
                <select
                  className={
                    checked
                      ? ok
                        ? "pr-match-select pr-match-select--ok"
                        : "pr-match-select pr-match-select--bad"
                      : "pr-match-select"
                  }
                  value={val}
                  disabled={checked}
                  onChange={(e) =>
                    setAnswers((a) => ({ ...a, [s.id]: e.target.value }))
                  }
                >
                  <option value="">—</option>
                  {data.roles.map((r) => (
                    <option
                      key={r.id}
                      value={r.id}
                      disabled={used.has(r.id) && answers[s.id] !== r.id}
                    >
                      {r.label}
                    </option>
                  ))}
                </select>
                {checked && !ok && (
                  <span className="pl-blank__key">
                    → Sentence {data.keys[s.id]}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </section>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        <span className="flow-footer__step">
          {checked ? `✓ ${score}/4` : "Match A–D"}
        </span>
        {!checked ? (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={() => setChecked(true)}
          >
            Check →
          </button>
        ) : (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={() => onNext({ score, total: 4 })}
          >
            Next →
          </button>
        )}
      </footer>
    </div>
  );
}

function ThesisMatchPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceWritingTest3.thesisMatch;
  onBack: () => void;
  onNext: (s: ScorePair) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const used = useMemo(
    () => new Set(Object.values(answers).filter(Boolean)),
    [answers],
  );
  const score = data.statements.filter(
    (s) => answers[s.id] === data.keys[s.id],
  ).length;

  return (
    <div className="pw-shell">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Learn</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <section className="pw-panel pw-panel--fill">
        <p className="pr-leadin__instruction">
          <span>7</span>
          {data.instruction.replace(/^\d+\s*/, "")}
        </p>
        <ol className="pl-map-qs">
          {data.statements.map((s) => {
            const val = answers[s.id] ?? "";
            const ok = val === data.keys[s.id];
            return (
              <li key={s.id}>
                <span className="pr-mc__num">{s.id}</span>
                <span className="pl-match-prompt pl-match-prompt--long">
                  {s.text}
                </span>
                <select
                  className={
                    checked
                      ? ok
                        ? "pr-match-select pr-match-select--ok"
                        : "pr-match-select pr-match-select--bad"
                      : "pr-match-select"
                  }
                  value={val}
                  disabled={checked}
                  onChange={(e) =>
                    setAnswers((a) => ({ ...a, [s.id]: e.target.value }))
                  }
                >
                  <option value="">—</option>
                  {data.questions.map((q) => (
                    <option
                      key={q.id}
                      value={q.id}
                      disabled={used.has(q.id) && answers[s.id] !== q.id}
                    >
                      {q.short}
                    </option>
                  ))}
                </select>
                {checked && !ok && (
                  <span className="pl-blank__key">→ Q{data.keys[s.id]}</span>
                )}
              </li>
            );
          })}
        </ol>
      </section>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        <span className="flow-footer__step">
          {checked ? `✓ ${score}/3` : "Match A–C"}
        </span>
        {!checked ? (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={() => setChecked(true)}
          >
            Check →
          </button>
        ) : (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={() => onNext({ score, total: 3 })}
          >
            Next →
          </button>
        )}
      </footer>
    </div>
  );
}

function EssayPlanPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceWritingTest3.essayPlan;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="pw-shell">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Learn · Plan</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <section className="pw-panel pw-panel--fill">
        <p className="pr-leadin__instruction">
          <span>8</span>
          {data.instruction.replace(/^\d+\s*/, "")}
        </p>
        <ol className="pw-plan-qa">
          {data.questions.map((q, i) => (
            <li key={q}>
              <p>
                <strong>{i + 1}.</strong> {q}
              </p>
              <div className="pw-sample pw-sample--inline">
                <p className="pw-sample__h">Sample</p>
                <p>{data.sampleAnswers[i]}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        <span className="flow-footer__step">Plan + samples</span>
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={onNext}
        >
          Write essay →
        </button>
      </footer>
    </div>
  );
}

function WriteEssayPhase({
  data,
  exam,
  onBack,
  onNext,
}: {
  data: typeof practiceWritingTest3.writeTask;
  exam: boolean;
  onBack: () => void;
  onNext: (s: ScorePair) => void;
}) {
  const [text, setText] = useState(() =>
    exam ? "" : data.structure.map((b) => b.starter).join("\n\n"),
  );
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(data.timeSec);
  const [done, setDone] = useState(false);
  const [checks, setChecks] = useState<Record<number, boolean>>({});
  const [showSample, setShowSample] = useState(false);
  const [showModel, setShowModel] = useState(!exam);
  const words = countWords(text);

  useEffect(() => {
    if (!running || timeLeft <= 0) return;
    const id = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setRunning(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running, timeLeft]);

  const m = Math.floor(timeLeft / 60);
  const s = (timeLeft % 60).toString().padStart(2, "0");
  const checkedCount = Object.values(checks).filter(Boolean).length;

  const insertTemplate = () => {
    setText(data.structure.map((b) => b.starter).join("\n\n"));
  };

  const finishWriting = () => {
    setRunning(false);
    setDone(true);
    setShowSample(true);
    setShowModel(false);
  };

  return (
    <div className="pw-shell pw-shell--wide">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>{exam ? "Exam" : "Learn"} · Task 2</span>
          <strong>{data.title}</strong>
        </div>
      </header>

      <ol className="pw-flow-steps" aria-label="Writing steps">
        <li className={done ? "pw-flow-steps__done" : "pw-flow-steps__on"}>
          1 Write
        </li>
        <li className={done ? "pw-flow-steps__done" : ""}>2 Check</li>
        <li className={done && showSample ? "pw-flow-steps__on" : ""}>
          3 Sample
        </li>
      </ol>

      <div className="pw-write pw-write--essay">
        <aside className="pw-write__side">
          {!done && (
            <div className="pw-plan">
              <div className="pw-plan__head">
                <strong>Essay template (4 parts)</strong>
              </div>
              <ol className="pw-plan__list">
                {data.structure.map((block) => (
                  <li key={block.label}>
                    <strong>{block.label}</strong>
                    <span>{block.tip}</span>
                  </li>
                ))}
              </ol>
              <button
                type="button"
                className="btn-start pw-plan__insert"
                onClick={insertTemplate}
              >
                Reset to starter template →
              </button>
              <button
                type="button"
                className="pw-plan__toggle"
                onClick={() => setShowModel((v) => !v)}
              >
                {showModel ? "Hide full sample" : "Show full sample →"}
              </button>
            </div>
          )}
          {done && (
            <div className="pw-plan">
              <div className="pw-plan__head">
                <strong>Self-check</strong>
              </div>
              <ul className="pw-checklist">
                {data.checklist.map((c, i) => (
                  <li key={c}>
                    <label>
                      <input
                        type="checkbox"
                        checked={Boolean(checks[i])}
                        onChange={(e) =>
                          setChecks((x) => ({
                            ...x,
                            [i]: e.target.checked,
                          }))
                        }
                      />
                      <span>{c}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
        <section className="pw-write__main">
          <p className="pw-time-label">{data.timeLabel}</p>
          <p className="pw-prompt">{data.prompt}</p>
          <div className="pw-write__meta">
            <WordCountMeter
              words={words}
              minWords={data.minWords}
              label="IELTS Task 2 minimum · at least 250 words"
            />
            <span
              className={
                timeLeft === 0
                  ? "pw-timer pw-timer--done"
                  : running
                    ? "pw-timer pw-timer--run"
                    : "pw-timer"
              }
            >
              ⏱ {m}:{s}
            </span>
            {!running && !done && (
              <button
                type="button"
                className="btn-start"
                onClick={() => setRunning(true)}
              >
                Start timer →
              </button>
            )}
            {running && (
              <button
                type="button"
                className="nav-btn"
                onClick={() => setRunning(false)}
              >
                Pause
              </button>
            )}
          </div>

          {!done && (
            <div className="pw-scaffold">
              {data.structure.map((block) => (
                <div key={block.label} className="pw-scaffold__block">
                  <p className="pw-scaffold__label">{block.label}</p>
                  <p className="pw-scaffold__tip">{block.tip}</p>
                  <p className="pw-scaffold__ex">{block.starter}</p>
                </div>
              ))}
            </div>
          )}

          {!done && showModel && (
            <div className="pw-sample">
              <p className="pw-sample__h">Full sample answer (write from this)</p>
              <p className="pw-sample__body">{data.sampleAnswer}</p>
            </div>
          )}

          <textarea
            className="pw-textarea pw-textarea--essay"
            value={text}
            disabled={done}
            onChange={(e) => setText(e.target.value)}
            placeholder={
              "Write 4 paragraphs:\n1) intro + thesis\n2) positive effects\n3) negative effects\n4) balanced conclusion"
            }
          />

          {done && showSample && (
            <div className="pw-after">
              <div className="pw-sample">
                <p className="pw-sample__h">Sample answer</p>
                <p className="pw-sample__body">{data.sampleAnswer}</p>
              </div>
            </div>
          )}
        </section>
      </div>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        <span className="flow-footer__step">
          {!done
            ? "Write → Finish → Sample"
            : `Checklist ${checkedCount}/${data.checklist.length}`}
        </span>
        {!done ? (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={finishWriting}
          >
            Finish → see sample
          </button>
        ) : (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={() =>
              onNext({
                score: Math.max(1, checkedCount),
                total: data.checklist.length,
              })
            }
          >
            Results →
          </button>
        )}
      </footer>
    </div>
  );
}
