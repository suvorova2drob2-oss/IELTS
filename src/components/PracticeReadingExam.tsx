import { useMemo, useState } from "react";
import type {
  EndingId,
  HeadingId,
  ParaLetter,
  PracticeReadingTest,
  PracticeReadingTask,
  TfngValue,
} from "../data/practiceReadingTest1";
import { PracticeReadingPassage } from "./PracticeReadingPassage";

const TFNG_OPTIONS: TfngValue[] = ["TRUE", "FALSE", "NOT GIVEN"];
const ENDING_IDS: EndingId[] = ["A", "B", "C", "D", "E", "F", "G", "H"];
const PARA_LETTERS: ParaLetter[] = ["A", "B", "C", "D", "E", "F"];

function normAnswer(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

function acceptsAnswer(value: string, accept: string[]): boolean {
  const n = normAnswer(value);
  return accept.some((a) => normAnswer(a) === n);
}

export type ExamTaskResult = { score: number; total: number };

export function PracticeReadingExam({
  test,
  task,
  taskLabel,
  onBack,
  onNext,
  nextLabel,
  onFinish,
}: {
  test: PracticeReadingTest;
  task: PracticeReadingTask;
  taskLabel?: string;
  onBack: () => void;
  onNext?: () => void;
  nextLabel?: string;
  /** Called with score when leaving after Check (Next or Done). */
  onFinish: (result: ExamTaskResult) => void;
}) {
  if (
    task.type === "coming" ||
    task.type === "vocab-followup" ||
    task.type === "learn-pack"
  ) {
    return null;
  }

  if (task.type === "matching-headings") {
    return (
      <MatchingExam
        test={test}
        task={task}
        taskLabel={taskLabel}
        onBack={onBack}
        onNext={onNext}
        nextLabel={nextLabel}
        onFinish={onFinish}
      />
    );
  }

  if (task.type === "tfng") {
    return (
      <TfngExam
        test={test}
        task={task}
        taskLabel={taskLabel}
        onBack={onBack}
        onNext={onNext}
        nextLabel={nextLabel}
        onFinish={onFinish}
      />
    );
  }

  if (task.type === "sentence-endings") {
    return (
      <EndingsExam
        test={test}
        task={task}
        taskLabel={taskLabel}
        onBack={onBack}
        onNext={onNext}
        nextLabel={nextLabel}
        onFinish={onFinish}
      />
    );
  }

  if (task.type === "sentence-completion") {
    return (
      <CompletionExam
        test={test}
        task={task}
        taskLabel={taskLabel}
        onBack={onBack}
        onNext={onNext}
        nextLabel={nextLabel}
        onFinish={onFinish}
      />
    );
  }

  if (task.type === "matching-information") {
    return (
      <MatchingInfoExam
        test={test}
        task={task}
        taskLabel={taskLabel}
        onBack={onBack}
        onNext={onNext}
        nextLabel={nextLabel}
        onFinish={onFinish}
      />
    );
  }

  if (task.type === "summary-completion") {
    return (
      <SummaryExam
        test={test}
        task={task}
        taskLabel={taskLabel}
        onBack={onBack}
        onNext={onNext}
        nextLabel={nextLabel}
        onFinish={onFinish}
      />
    );
  }

  return null;
}

function MatchingExam({
  test,
  task,
  taskLabel,
  onBack,
  onNext,
  nextLabel,
  onFinish,
}: {
  test: PracticeReadingTest;
  task: Extract<PracticeReadingTask, { type: "matching-headings" }>;
  taskLabel?: string;
  onBack: () => void;
  onNext?: () => void;
  nextLabel?: string;
  onFinish: (result: ExamTaskResult) => void;
}) {
  const [answers, setAnswers] = useState<Record<number, HeadingId | undefined>>(
    {},
  );
  const [checked, setChecked] = useState(false);
  const [activeQ, setActiveQ] = useState<number | null>(null);
  /** After Check: which heading statement is hovered → yellow proof on left. */
  const [hoverHeading, setHoverHeading] = useState<HeadingId | null>(null);

  const paragraphByHeading = useMemo(() => {
    const map = new Map<HeadingId, string>();
    map.set(task.example.headingId, task.example.paragraphId);
    for (const q of task.questions) {
      const h = answers[q.id];
      if (h) map.set(h, q.paragraphId);
    }
    return map;
  }, [answers, task.example, task.questions]);

  const usedParagraphs = useMemo(() => {
    const set = new Set<string>([task.example.paragraphId]);
    for (const q of task.questions) {
      if (answers[q.id]) set.add(q.paragraphId);
    }
    return set;
  }, [answers, task.example.paragraphId, task.questions]);

  const score = useMemo(
    () => task.questions.filter((q) => answers[q.id] === q.key).length,
    [answers, task.questions],
  );

  const active = task.questions.find((q) => q.id === activeQ);
  const evidence = checked && active ? active.evidence : [];

  const hoverQuestion = useMemo(() => {
    if (!checked || !hoverHeading) return null;
    return task.questions.find((q) => q.key === hoverHeading) ?? null;
  }, [checked, hoverHeading, task.questions]);

  const focusParagraphId =
    hoverQuestion?.paragraphId ?? (checked ? active?.paragraphId : null) ?? null;
  const leftEvidence = hoverQuestion?.evidence ?? evidence;
  const leftHighlight = Boolean(
    checked && leftEvidence.length > 0 && (hoverQuestion || activeQ != null),
  );

  const assignHeadingToParagraph = (headingId: HeadingId, paragraphId: string) => {
    const q = task.questions.find((item) => item.paragraphId === paragraphId);
    if (!q) return;
    setActiveQ(q.id);
    setAnswers((prev) => {
      const next = { ...prev };
      for (const item of task.questions) {
        if (next[item.id] === headingId) delete next[item.id];
      }
      next[q.id] = headingId;
      return next;
    });
  };

  const clearHeading = (headingId: HeadingId) => {
    setAnswers((prev) => {
      const next = { ...prev };
      for (const item of task.questions) {
        if (next[item.id] === headingId) delete next[item.id];
      }
      return next;
    });
  };

  return (
    <div className="pr-exam">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Tasks
        </button>
        <div className="pr-exam__chrome-title">
          <span>{taskLabel ?? `Task ${task.index}`}</span>
          <strong>{task.title}</strong>
        </div>
      </header>

      <div className="pr-exam__split pr-exam__split--match">
        <PracticeReadingPassage
          readingLabel={test.readingLabel}
          passageTitle={test.passageTitle}
          paragraphs={test.paragraphs}
          evidence={leftEvidence}
          highlight={leftHighlight}
          focusParagraphId={focusParagraphId}
          showParagraphIds={test.showParagraphIds !== false}
        />

        <aside className="pr-headings-rail">
          <p className="pr-exam__col-label">List of Headings</p>
          <p className="pr-exam__instruction pr-headings-rail__hint">
            {task.instruction}
          </p>
          <p className="pr-exam__instruction pr-headings-rail__hint">
            Example: Paragraph {task.example.paragraphId} →{" "}
            {task.example.headingId}
          </p>
          {checked && (
            <p className="pr-exam__instruction pr-headings-rail__hint">
              Hover a heading to see proof in the passage (yellow).
            </p>
          )}
          <ul className="pr-headings">
            {task.headings.map((h) => {
              const isExample = h.id === task.example.headingId;
              const paragraphId = paragraphByHeading.get(h.id);
              const matchedQ = task.questions.find((q) => answers[q.id] === h.id);
              const correctQ = task.questions.find((q) => q.key === h.id);
              const ok = matchedQ != null && matchedQ.key === h.id;
              const shouldHaveMatch = correctQ != null;
              const hovering = hoverHeading === h.id;
              let selectState = "";
              if (checked && shouldHaveMatch) {
                selectState = ok
                  ? "pr-match-select--ok"
                  : "pr-match-select--bad";
              } else if (checked && !shouldHaveMatch && paragraphId) {
                selectState = "pr-match-select--bad";
              }

              return (
                <li
                  key={h.id}
                  className={[
                    isExample
                      ? "pr-headings__item--example"
                      : matchedQ
                        ? "pr-headings__item--picked"
                        : "",
                    hovering && checked && shouldHaveMatch
                      ? "pr-headings__item--hover"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ") || undefined}
                  onMouseEnter={() => {
                    if (!checked || !shouldHaveMatch) return;
                    setHoverHeading(h.id);
                    if (correctQ) setActiveQ(correctQ.id);
                  }}
                  onMouseLeave={() => {
                    if (hoverHeading === h.id) setHoverHeading(null);
                  }}
                >
                  <strong>{h.id}</strong>
                  <span className="pr-headings__text">{h.text}</span>
                  {isExample ? (
                    <span className="pr-match-row__ans">
                      {task.example.paragraphId}
                    </span>
                  ) : (
                    <select
                      className={`pr-match-select ${selectState}`}
                      disabled={checked}
                      value={paragraphId && paragraphId !== task.example.paragraphId ? paragraphId : ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (!val) clearHeading(h.id);
                        else assignHeadingToParagraph(h.id, val);
                      }}
                      onFocus={() => {
                        if (correctQ && checked) {
                          setHoverHeading(h.id);
                          setActiveQ(correctQ.id);
                        } else if (matchedQ) {
                          setActiveQ(matchedQ.id);
                        }
                      }}
                    >
                      <option value="">—</option>
                      {task.questions.map((q) => {
                        const taken =
                          usedParagraphs.has(q.paragraphId) &&
                          paragraphId !== q.paragraphId;
                        return (
                          <option
                            key={q.paragraphId}
                            value={q.paragraphId}
                            disabled={taken}
                          >
                            {q.paragraphId}
                            {taken ? " (used)" : ""}
                          </option>
                        );
                      })}
                    </select>
                  )}
                  {checked && shouldHaveMatch && (
                    <span
                      className={
                        ok ? "pr-headings__key pr-headings__key--ok" : "pr-headings__key"
                      }
                    >
                      → {correctQ?.paragraphId}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </aside>
      </div>

      <ExamFooter
        checked={checked}
        score={score}
        total={task.questions.length}
        answered={Object.keys(answers).length}
        questionIds={task.questions.map((q) => q.id)}
        isOk={(id) => answers[id] === task.questions.find((q) => q.id === id)?.key}
        activeQ={activeQ}
        setActiveQ={setActiveQ}
        onBack={onBack}
        onReset={() => {
          setChecked(false);
          setAnswers({});
          setActiveQ(null);
          setHoverHeading(null);
        }}
        onCheck={() => setChecked(true)}
        onNext={onNext}
        nextLabel={nextLabel}
        onFinish={() => onFinish({ score, total: task.questions.length })}
      />
    </div>
  );
}

function TfngExam({
  test,
  task,
  taskLabel,
  onBack,
  onNext,
  nextLabel,
  onFinish,
}: {
  test: PracticeReadingTest;
  task: Extract<PracticeReadingTask, { type: "tfng" }>;
  taskLabel?: string;
  onBack: () => void;
  onNext?: () => void;
  nextLabel?: string;
  onFinish: (result: ExamTaskResult) => void;
}) {
  const [answers, setAnswers] = useState<Record<number, TfngValue | undefined>>(
    {},
  );
  const [checked, setChecked] = useState(false);
  const [activeQ, setActiveQ] = useState<number | null>(null);

  const score = useMemo(
    () => task.questions.filter((q) => answers[q.id] === q.key).length,
    [answers, task.questions],
  );

  const active = task.questions.find((q) => q.id === activeQ);
  const evidence = checked && active ? active.evidence : [];

  return (
    <div className="pr-exam">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Tasks
        </button>
        <div className="pr-exam__chrome-title">
          <span>{taskLabel ?? `Task ${task.index}`}</span>
          <strong>{task.title}</strong>
        </div>
      </header>

      <div className="pr-exam__split">
        <PracticeReadingPassage
          readingLabel={test.readingLabel}
          passageTitle={test.passageTitle}
          paragraphs={test.paragraphs}
          evidence={evidence}
          highlight={checked && activeQ != null}
          showParagraphIds={test.showParagraphIds !== false}
        />

        <aside className="pr-exam__questions pr-exam__questions--fit">
          <p className="pr-exam__col-label">Questions</p>
          <p className="pr-exam__instruction">{task.instruction}</p>
          <div className="pr-task-box pr-task-box--tfng">
            <p className="pr-tfng__legend-line">
              {task.legend.map((l, i) => (
                <span key={l.value}>
                  {i > 0 ? " · " : ""}
                  <strong>{l.value}</strong>
                </span>
              ))}
            </p>

            <ol className="pr-tfng">
              {task.questions.map((q) => {
                const selected = answers[q.id];
                const ok = selected === q.key;
                return (
                  <li
                    key={q.id}
                    className={activeQ === q.id ? "pr-tfng__item--on" : undefined}
                    onMouseEnter={() => checked && setActiveQ(q.id)}
                  >
                    <span className="pr-mc__num">{q.id}</span>
                    <p className="pr-tfng__prompt">
                      {q.statement}
                      {checked && (
                        <span className="pr-tfng__mark">
                          {ok ? (
                            <span className="inline-gap-ok"> ✓</span>
                          ) : (
                            <span className="inline-gap-bad"> → {q.key}</span>
                          )}
                        </span>
                      )}
                    </p>
                    <div className="pr-tfng__choices">
                      {TFNG_OPTIONS.map((opt) => {
                        let state = "";
                        if (checked) {
                          if (opt === q.key) state = "pr-chip--ok";
                          else if (selected === opt) state = "pr-chip--bad";
                        } else if (selected === opt) {
                          state = "pr-chip--picked";
                        }
                        return (
                          <button
                            key={opt}
                            type="button"
                            className={`pr-chip pr-chip--tfng ${state}`}
                            title={opt}
                            onClick={() => {
                              if (checked) {
                                setActiveQ(q.id);
                                return;
                              }
                              setAnswers((a) => ({ ...a, [q.id]: opt }));
                              setActiveQ(q.id);
                            }}
                          >
                            {opt === "NOT GIVEN" ? "NG" : opt}
                          </button>
                        );
                      })}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </aside>
      </div>

      <ExamFooter
        checked={checked}
        score={score}
        total={task.questions.length}
        answered={Object.keys(answers).length}
        questionIds={task.questions.map((q) => q.id)}
        isOk={(id) => answers[id] === task.questions.find((q) => q.id === id)?.key}
        activeQ={activeQ}
        setActiveQ={setActiveQ}
        onBack={onBack}
        onReset={() => {
          setChecked(false);
          setAnswers({});
          setActiveQ(null);
        }}
        onCheck={() => setChecked(true)}
        onNext={onNext}
        nextLabel={nextLabel}
        onFinish={() => onFinish({ score, total: task.questions.length })}
      />
    </div>
  );
}

function EndingsExam({
  test,
  task,
  taskLabel,
  onBack,
  onNext,
  nextLabel,
  onFinish,
}: {
  test: PracticeReadingTest;
  task: Extract<PracticeReadingTask, { type: "sentence-endings" }>;
  taskLabel?: string;
  onBack: () => void;
  onNext?: () => void;
  nextLabel?: string;
  onFinish: (result: ExamTaskResult) => void;
}) {
  const [answers, setAnswers] = useState<
    Record<number, EndingId | undefined>
  >({});
  const [checked, setChecked] = useState(false);
  const [activeQ, setActiveQ] = useState<number | null>(null);

  const usedEndings = useMemo(() => {
    const set = new Set<EndingId>();
    for (const q of task.questions) {
      const e = answers[q.id];
      if (e) set.add(e);
    }
    return set;
  }, [answers, task.questions]);

  const score = useMemo(
    () => task.questions.filter((q) => answers[q.id] === q.key).length,
    [answers, task.questions],
  );

  const active = task.questions.find((q) => q.id === activeQ);
  const evidence = checked && active ? active.evidence : [];

  return (
    <div className="pr-exam">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Tasks
        </button>
        <div className="pr-exam__chrome-title">
          <span>{taskLabel ?? `Task ${task.index}`}</span>
          <strong>{task.title}</strong>
        </div>
      </header>

      <div className="pr-exam__split pr-exam__split--match">
        <PracticeReadingPassage
          readingLabel={test.readingLabel}
          passageTitle={test.passageTitle}
          paragraphs={test.paragraphs}
          evidence={evidence}
          highlight={checked && activeQ != null}
          showParagraphIds={test.showParagraphIds !== false}
        />

        <aside className="pr-exam__questions pr-exam__questions--fit pr-endings-panel">
          <p className="pr-exam__col-label">Questions 1–6</p>
          <p className="pr-exam__instruction pr-endings-panel__hint">
            Complete each sentence with the correct ending, A–H.
          </p>

          <div className="pr-task-box pr-task-box--endings">
            <ol className="pr-endings">
              {task.questions.map((q) => {
                const selected = answers[q.id];
                const ok = selected === q.key;
                let selectState = "";
                if (checked) {
                  selectState = ok
                    ? "pr-match-select--ok"
                    : "pr-match-select--bad";
                }
                return (
                  <li
                    key={q.id}
                    className={
                      activeQ === q.id ? "pr-endings__item--on" : undefined
                    }
                    onMouseEnter={() => checked && setActiveQ(q.id)}
                  >
                    <span className="pr-mc__num">{q.id}</span>
                    <p className="pr-endings__stem">
                      {q.stem}
                      {checked && !ok && (
                        <span className="inline-gap-bad"> → {q.key}</span>
                      )}
                    </p>
                    <select
                      className={`pr-match-select ${selectState}`}
                      disabled={checked}
                      value={selected ?? ""}
                      onChange={(e) => {
                        const val = e.target.value as EndingId | "";
                        setActiveQ(q.id);
                        setAnswers((prev) => {
                          const next = { ...prev };
                          if (!val) delete next[q.id];
                          else next[q.id] = val;
                          return next;
                        });
                      }}
                      onFocus={() => setActiveQ(q.id)}
                    >
                      <option value="">—</option>
                      {ENDING_IDS.filter((id) =>
                        task.endings.some((e) => e.id === id),
                      ).map((id) => {
                        const taken =
                          usedEndings.has(id) && selected !== id;
                        return (
                          <option key={id} value={id} disabled={taken}>
                            {id}
                            {taken ? " (used)" : ""}
                          </option>
                        );
                      })}
                    </select>
                  </li>
                );
              })}
            </ol>

            <ul className="pr-endings__bank">
              {task.endings.map((e) => (
                <li
                  key={e.id}
                  className={
                    usedEndings.has(e.id) ? "pr-endings__bank-item--used" : ""
                  }
                >
                  <strong>{e.id}</strong>
                  <span>{e.text}</span>
                </li>
              ))}
            </ul>

            {checked && active?.tip && (
              <p className="pr-endings-panel__tip">{active.tip}</p>
            )}
          </div>
        </aside>
      </div>

      <ExamFooter
        checked={checked}
        score={score}
        total={task.questions.length}
        answered={Object.keys(answers).length}
        questionIds={task.questions.map((q) => q.id)}
        isOk={(id) =>
          answers[id] === task.questions.find((q) => q.id === id)?.key
        }
        activeQ={activeQ}
        setActiveQ={setActiveQ}
        onBack={onBack}
        onReset={() => {
          setChecked(false);
          setAnswers({});
          setActiveQ(null);
        }}
        onCheck={() => setChecked(true)}
        onNext={onNext}
        nextLabel={nextLabel}
        onFinish={() => onFinish({ score, total: task.questions.length })}
      />
    </div>
  );
}

function CompletionExam({
  test,
  task,
  taskLabel,
  onBack,
  onNext,
  nextLabel,
  onFinish,
}: {
  test: PracticeReadingTest;
  task: Extract<PracticeReadingTask, { type: "sentence-completion" }>;
  taskLabel?: string;
  onBack: () => void;
  onNext?: () => void;
  nextLabel?: string;
  onFinish: (result: ExamTaskResult) => void;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [activeQ, setActiveQ] = useState<number | null>(null);

  const score = useMemo(
    () =>
      task.questions.filter((q) =>
        acceptsAnswer(answers[q.id] ?? "", q.accept),
      ).length,
    [answers, task.questions],
  );

  const active = task.questions.find((q) => q.id === activeQ);
  const evidence = checked && active ? active.evidence : [];

  return (
    <div className="pr-exam">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Tasks
        </button>
        <div className="pr-exam__chrome-title">
          <span>{taskLabel ?? `Task ${task.index}`}</span>
          <strong>{task.title}</strong>
        </div>
      </header>

      <div className="pr-exam__split">
        <PracticeReadingPassage
          readingLabel={test.readingLabel}
          passageTitle={test.passageTitle}
          paragraphs={test.paragraphs}
          evidence={evidence}
          highlight={checked && activeQ != null}
          showParagraphIds={test.showParagraphIds !== false}
        />

        <aside className="pr-exam__questions pr-exam__questions--fit pr-completion-panel">
          <p className="pr-exam__col-label">Questions 7–12</p>
          <p className="pr-exam__instruction pr-endings-panel__hint">
            Complete the sentences. NO MORE THAN THREE WORDS from the passage.
          </p>

          <div className="pr-task-box pr-task-box--completion">
            <ol className="pr-completion">
              {task.questions.map((q) => {
                const val = answers[q.id] ?? "";
                const ok = acceptsAnswer(val, q.accept);
                const parts = q.stem.split("__________");
                return (
                  <li
                    key={q.id}
                    className={
                      activeQ === q.id
                        ? "pr-completion__item--on"
                        : undefined
                    }
                    onMouseEnter={() => checked && setActiveQ(q.id)}
                  >
                    <span className="pr-mc__num">{q.id}</span>
                    <p className="pr-completion__stem">
                      {parts[0]}
                      <input
                        className={
                          checked
                            ? ok
                              ? "pr-completion__input pr-completion__input--ok"
                              : "pr-completion__input pr-completion__input--bad"
                            : "pr-completion__input"
                        }
                        value={val}
                        disabled={checked}
                        placeholder="…"
                        onFocus={() => setActiveQ(q.id)}
                        onChange={(e) => {
                          setActiveQ(q.id);
                          setAnswers((a) => ({
                            ...a,
                            [q.id]: e.target.value,
                          }));
                        }}
                      />
                      {parts.slice(1).join("__________")}
                      {checked && !ok && (
                        <span className="inline-gap-bad"> → {q.key}</span>
                      )}
                    </p>
                  </li>
                );
              })}
            </ol>
            {checked && active?.tip && (
              <p className="pr-endings-panel__tip">{active.tip}</p>
            )}
          </div>
        </aside>
      </div>

      <ExamFooter
        checked={checked}
        score={score}
        total={task.questions.length}
        answered={
          Object.values(answers).filter((v) => v.trim().length > 0).length
        }
        questionIds={task.questions.map((q) => q.id)}
        isOk={(id) => {
          const q = task.questions.find((item) => item.id === id);
          return q
            ? acceptsAnswer(answers[id] ?? "", q.accept)
            : false;
        }}
        activeQ={activeQ}
        setActiveQ={setActiveQ}
        onBack={onBack}
        onReset={() => {
          setChecked(false);
          setAnswers({});
          setActiveQ(null);
        }}
        onCheck={() => setChecked(true)}
        onNext={onNext}
        nextLabel={nextLabel}
        onFinish={() => onFinish({ score, total: task.questions.length })}
      />
    </div>
  );
}

function MatchingInfoExam({
  test,
  task,
  taskLabel,
  onBack,
  onNext,
  nextLabel,
  onFinish,
}: {
  test: PracticeReadingTest;
  task: Extract<PracticeReadingTask, { type: "matching-information" }>;
  taskLabel?: string;
  onBack: () => void;
  onNext?: () => void;
  nextLabel?: string;
  onFinish: (result: ExamTaskResult) => void;
}) {
  const [answers, setAnswers] = useState<
    Record<number, ParaLetter | undefined>
  >({});
  const [checked, setChecked] = useState(false);
  const [activeQ, setActiveQ] = useState<number | null>(null);

  const score = useMemo(
    () => task.questions.filter((q) => answers[q.id] === q.key).length,
    [answers, task.questions],
  );

  const active = task.questions.find((q) => q.id === activeQ);
  const evidence = checked && active ? active.evidence : [];

  return (
    <div className="pr-exam">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Tasks
        </button>
        <div className="pr-exam__chrome-title">
          <span>{taskLabel ?? `Task ${task.index}`}</span>
          <strong>{task.title}</strong>
        </div>
      </header>

      <div className="pr-exam__split pr-exam__split--match">
        <PracticeReadingPassage
          readingLabel={test.readingLabel}
          passageTitle={test.passageTitle}
          paragraphs={test.paragraphs}
          evidence={evidence}
          highlight={checked && activeQ != null}
          focusParagraphId={
            checked
              ? (active?.key ?? null)
              : activeQ != null
                ? (answers[activeQ] ?? null)
                : null
          }
          showParagraphIds={test.showParagraphIds !== false}
        />

        <aside className="pr-exam__questions pr-exam__questions--fit pr-endings-panel">
          <p className="pr-exam__col-label">Questions 1–6</p>
          <p className="pr-exam__instruction pr-endings-panel__hint">
            Which paragraph contains the information? A–F · letters may repeat
          </p>

          <div className="pr-task-box pr-task-box--endings pr-task-box--matchinfo">
            <ol className="pr-endings pr-matchinfo">
              {task.questions.map((q) => {
                const selected = answers[q.id];
                const isOk = selected === q.key;
                let selectState = "";
                if (checked) {
                  selectState = isOk
                    ? "pr-match-select--ok"
                    : "pr-match-select--bad";
                }
                return (
                  <li
                    key={q.id}
                    className={
                      activeQ === q.id ? "pr-endings__item--on" : undefined
                    }
                    onMouseEnter={() => checked && setActiveQ(q.id)}
                  >
                    <span className="pr-mc__num">{q.id}</span>
                    <p className="pr-endings__stem">
                      {q.statement}
                      {checked && !isOk && (
                        <span className="inline-gap-bad"> → {q.key}</span>
                      )}
                    </p>
                    <select
                      className={`pr-match-select ${selectState}`}
                      disabled={checked}
                      value={selected ?? ""}
                      onChange={(e) => {
                        const val = e.target.value as ParaLetter | "";
                        setActiveQ(q.id);
                        setAnswers((prev) => {
                          const next = { ...prev };
                          if (!val) delete next[q.id];
                          else next[q.id] = val;
                          return next;
                        });
                      }}
                      onFocus={() => setActiveQ(q.id)}
                    >
                      <option value="">—</option>
                      {PARA_LETTERS.map((id) => (
                        <option key={id} value={id}>
                          {id}
                        </option>
                      ))}
                    </select>
                  </li>
                );
              })}
            </ol>
            {checked && active?.tip && (
              <p className="pr-endings-panel__tip">{active.tip}</p>
            )}
          </div>
        </aside>
      </div>

      <ExamFooter
        checked={checked}
        score={score}
        total={task.questions.length}
        answered={Object.keys(answers).length}
        questionIds={task.questions.map((q) => q.id)}
        isOk={(id) =>
          answers[id] === task.questions.find((q) => q.id === id)?.key
        }
        activeQ={activeQ}
        setActiveQ={setActiveQ}
        onBack={onBack}
        onReset={() => {
          setChecked(false);
          setAnswers({});
          setActiveQ(null);
        }}
        onCheck={() => setChecked(true)}
        onNext={onNext}
        nextLabel={nextLabel}
        onFinish={() => onFinish({ score, total: task.questions.length })}
      />
    </div>
  );
}

function SummaryExam({
  test,
  task,
  taskLabel,
  onBack,
  onNext,
  nextLabel,
  onFinish,
}: {
  test: PracticeReadingTest;
  task: Extract<PracticeReadingTask, { type: "summary-completion" }>;
  taskLabel?: string;
  onBack: () => void;
  onNext?: () => void;
  nextLabel?: string;
  onFinish: (result: ExamTaskResult) => void;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [activeQ, setActiveQ] = useState<number | null>(null);

  const score = useMemo(
    () =>
      task.blanks.filter((b) =>
        acceptsAnswer(answers[b.id] ?? "", b.accept),
      ).length,
    [answers, task.blanks],
  );

  const active = task.blanks.find((b) => b.id === activeQ);
  const evidence = checked && active ? active.evidence : [];

  const parts = task.summary.split(/\{\{(\d+)\}\}/g);

  return (
    <div className="pr-exam">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Tasks
        </button>
        <div className="pr-exam__chrome-title">
          <span>{taskLabel ?? `Task ${task.index}`}</span>
          <strong>{task.title}</strong>
        </div>
      </header>

      <div className="pr-exam__split">
        <PracticeReadingPassage
          readingLabel={test.readingLabel}
          passageTitle={test.passageTitle}
          paragraphs={test.paragraphs}
          evidence={evidence}
          highlight={checked && activeQ != null}
          showParagraphIds={test.showParagraphIds !== false}
        />

        <aside className="pr-exam__questions pr-exam__questions--fit pr-completion-panel">
          <p className="pr-exam__col-label">Questions 7–12</p>
          <p className="pr-exam__instruction pr-endings-panel__hint">
            Complete the summary · ONE WORD ONLY · paragraphs D–F
          </p>

          <div className="pr-task-box pr-task-box--completion pr-task-box--summary">
            <p className="pr-summary">
              {parts.map((part, i) => {
                if (i % 2 === 1) {
                  const id = Number(part);
                  const blank = task.blanks.find((b) => b.id === id);
                  if (!blank) return null;
                  const val = answers[id] ?? "";
                  const isOk = acceptsAnswer(val, blank.accept);
                  return (
                    <span
                      key={`b-${id}`}
                      className={
                        activeQ === id
                          ? "pr-summary__blank pr-summary__blank--on"
                          : "pr-summary__blank"
                      }
                    >
                      <span className="pr-summary__num">{id}</span>
                      <input
                        className={
                          checked
                            ? isOk
                              ? "pr-completion__input pr-completion__input--ok"
                              : "pr-completion__input pr-completion__input--bad"
                            : "pr-completion__input"
                        }
                        value={val}
                        disabled={checked}
                        placeholder="…"
                        onFocus={() => setActiveQ(id)}
                        onChange={(e) => {
                          setActiveQ(id);
                          setAnswers((a) => ({ ...a, [id]: e.target.value }));
                        }}
                      />
                      {checked && !isOk && (
                        <span className="inline-gap-bad"> {blank.key}</span>
                      )}
                    </span>
                  );
                }
                return <span key={`t-${i}`}>{part}</span>;
              })}
            </p>
            {checked && active?.tip && (
              <p className="pr-endings-panel__tip">{active.tip}</p>
            )}
          </div>
        </aside>
      </div>

      <ExamFooter
        checked={checked}
        score={score}
        total={task.blanks.length}
        answered={
          Object.values(answers).filter((v) => v.trim().length > 0).length
        }
        questionIds={task.blanks.map((b) => b.id)}
        isOk={(id) => {
          const b = task.blanks.find((item) => item.id === id);
          return b ? acceptsAnswer(answers[id] ?? "", b.accept) : false;
        }}
        activeQ={activeQ}
        setActiveQ={setActiveQ}
        onBack={onBack}
        onReset={() => {
          setChecked(false);
          setAnswers({});
          setActiveQ(null);
        }}
        onCheck={() => setChecked(true)}
        onNext={onNext}
        nextLabel={nextLabel}
        onFinish={() => onFinish({ score, total: task.blanks.length })}
      />
    </div>
  );
}

function ExamFooter({
  checked,
  score,
  total,
  answered,
  questionIds,
  isOk,
  activeQ,
  setActiveQ,
  onBack,
  onReset,
  onCheck,
  onNext,
  nextLabel,
  onFinish,
}: {
  checked: boolean;
  score: number;
  total: number;
  answered: number;
  questionIds: number[];
  isOk: (id: number) => boolean;
  activeQ: number | null;
  setActiveQ: (id: number) => void;
  onBack: () => void;
  onReset: () => void;
  onCheck: () => void;
  onNext?: () => void;
  nextLabel?: string;
  onFinish: () => void;
}) {
  const leave = () => {
    onFinish();
    onNext?.();
  };

  return (
    <footer className="flow-footer">
      <button type="button" className="flow-footer__btn" onClick={onBack}>
        ← Back
      </button>
      {checked ? (
        <div className="flow-footer__result">
          <span className="flow-footer__ok">✓ {score} верно</span>
          <span className="flow-footer__bad">✗ {total - score} неверно</span>
          <div className="flow-footer__palette">
            {questionIds.map((id) => (
              <button
                key={id}
                type="button"
                className={`exam-review__q ${isOk(id) ? "exam-review__q--ok" : "exam-review__q--bad"} ${activeQ === id ? "exam-review__q--on" : ""}`}
                onMouseEnter={() => setActiveQ(id)}
                onClick={() => setActiveQ(id)}
              >
                {id}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <span className="flow-footer__step">
          {answered}/{total} answered
        </span>
      )}
      <button type="button" className="flow-footer__btn" onClick={onReset}>
        Заново
      </button>
      {!checked ? (
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={onCheck}
        >
          Check answers →
        </button>
      ) : (
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={leave}
        >
          {onNext ? (nextLabel ?? "Next task →") : "Done →"}
        </button>
      )}
    </footer>
  );
}
