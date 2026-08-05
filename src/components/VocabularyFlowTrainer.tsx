import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  checkDefinitionMatch,
  checkGapWord,
  checkWordClass,
  TREND_LABELS,
  VOCAB_FLOW_NEXT,
  VOCAB_FLOW_STEPS,
  VOCAB_RESULT_STEP,
  vocabularyM1,
  type CollocationType,
  type TextSegment,
  type TrendCategory,
  type VocabularyM1Data,
  type WordClass,
} from "../data/vocabularyM1";
import { VOCABULARY_STEP_KEY } from "../hooks/useCourseData";

const CLASS_LABELS: Record<WordClass, string> = {
  noun: "noun",
  verb: "verb",
  both: "both",
};

function OralBanner({ children }: { children: ReactNode }) {
  return (
    <div className="oral-banner">
      <span className="oral-banner__icon" aria-hidden>
        🎤
      </span>
      <p>{children}</p>
    </div>
  );
}

function loadStep(restart?: boolean, initialStep?: number): number {
  if (initialStep != null) return initialStep;
  if (restart) return 0;
  try {
    const raw = sessionStorage.getItem(VOCABULARY_STEP_KEY);
    if (raw != null) {
      const n = Number(raw);
      if (n >= 0 && n < VOCAB_FLOW_STEPS.length) return n;
    }
  } catch {
    /* ignore */
  }
  return 0;
}

function WordTypeRow({
  word,
  value,
  onChange,
  showResult,
  expected,
}: {
  word: string;
  value: WordClass | "";
  onChange: (v: WordClass) => void;
  showResult: boolean;
  expected: WordClass;
}) {
  const options: WordClass[] = ["noun", "verb", "both"];
  const correct = value === expected;

  return (
    <tr className={showResult ? (correct ? "vocab-row--ok" : "vocab-row--bad") : ""}>
      <td className="vocab-word">{word}</td>
      {options.map((opt) => (
        <td key={opt}>
          <label className="vocab-type-option">
            <input
              type="radio"
              name={`type-${word}`}
              checked={value === opt}
              onChange={() => onChange(opt)}
              disabled={showResult}
            />
            {CLASS_LABELS[opt]}
          </label>
        </td>
      ))}
      {showResult && (
        <td className="vocab-row__answer">{correct ? "✓" : expected}</td>
      )}
    </tr>
  );
}

function AppsTextReader({
  title,
  paragraphs,
  selected,
  onToggle,
  showResult,
  correctIds,
}: {
  title: string;
  paragraphs: TextSegment[][];
  selected: Set<string>;
  onToggle: (id: string) => void;
  showResult: boolean;
  correctIds: Set<string>;
}) {
  const renderSegment = (seg: TextSegment, key: string) => {
    if (!seg.phraseId) {
      return <span key={key}>{seg.text}</span>;
    }

    const id = seg.phraseId;
    const isSelected = selected.has(id);
    const isCorrect = correctIds.has(id);
    let className = "vocab-phrase";
    if (isSelected) className += " vocab-phrase--on";
    if (showResult && isCorrect) className += " vocab-phrase--ok";
    if (showResult && isSelected && !isCorrect) className += " vocab-phrase--bad";
    if (showResult && !isSelected && isCorrect) className += " vocab-phrase--missed";

    return (
      <button
        key={key}
        type="button"
        className={className}
        onClick={() => !showResult && onToggle(id)}
        disabled={showResult}
        title={seg.phraseType === "verb-adv" ? "verb + adverb" : "adjective + noun"}
      >
        {seg.text}
      </button>
    );
  };

  return (
    <article className="vocab-apps-text">
      <h3 className="vocab-apps-text__title">{title}</h3>
      {paragraphs.map((para, pi) => (
        <p key={pi} className="vocab-apps-text__p">
          {para.map((seg, si) => renderSegment(seg, `${pi}-${si}`))}
        </p>
      ))}
      <p className="vocab-apps-text__legend">
        Click collocations in the text.{" "}
        <span className="vocab-phrase vocab-phrase--legend-va">verb + adverb</span>{" "}
        <span className="vocab-phrase vocab-phrase--legend-an">adjective + noun</span>
      </p>
    </article>
  );
}

function resetAllAnswers(data: VocabularyM1Data) {
  return {
    types: Object.fromEntries(data.words.map((w) => [w, ""])) as Record<
      string,
      WordClass | ""
    >,
    matches: Object.fromEntries(data.definitions.map((d) => [d.id, ""])) as Record<
      number,
      string
    >,
    choices: Object.fromEntries(
      data.chooseSentences.map((s) => [s.id, ""]),
    ) as Record<number, "a" | "b" | "">,
    gaps: Object.fromEntries(
      data.collocations.gaps.map((g) => [g.id, ""]),
    ) as Record<number, string>,
    selectedPhrases: new Set<string>(),
    trends: Object.fromEntries(
      data.appsText.trendItems.map((t) => [t.id, ""]),
    ) as Record<string, TrendCategory | "">,
    dictChecks: data.dictionarySkills.tasks.map(() => false),
  };
}

export function VocabularyFlowTrainer({
  data,
  onBack,
  contextLabel,
  restart,
  initialStep,
}: {
  data: VocabularyM1Data;
  onBack?: () => void;
  contextLabel?: string;
  restart?: boolean;
  initialStep?: number;
}) {
  const initial = resetAllAnswers(data);
  const [step, setStep] = useState(() => loadStep(restart, initialStep));
  const [mode, setMode] = useState<"practice" | "exam">("practice");
  const [types, setTypes] = useState(initial.types);
  const [matches, setMatches] = useState(initial.matches);
  const [choices, setChoices] = useState(initial.choices);
  const [gaps, setGaps] = useState(initial.gaps);
  const [selectedPhrases, setSelectedPhrases] = useState(initial.selectedPhrases);
  const [trends, setTrends] = useState(initial.trends);
  const [dictChecks, setDictChecks] = useState(initial.dictChecks);
  const [checked, setChecked] = useState(false);

  const phraseIds = useMemo(
    () => new Set(data.appsText.phrases.map((p) => p.id)),
    [data.appsText.phrases],
  );

  useEffect(() => {
    if (restart) {
      setStep(initialStep ?? 0);
      setChecked(false);
      const r = resetAllAnswers(data);
      setTypes(r.types);
      setMatches(r.matches);
      setChoices(r.choices);
      setGaps(r.gaps);
      setSelectedPhrases(r.selectedPhrases);
      setTrends(r.trends);
      setDictChecks(r.dictChecks);
      try {
        sessionStorage.removeItem(VOCABULARY_STEP_KEY);
      } catch {
        /* ignore */
      }
    }
  }, [restart, initialStep, data]);

  useEffect(() => {
    if (initialStep != null) setStep(initialStep);
  }, [initialStep]);

  useEffect(() => {
    try {
      sessionStorage.setItem(VOCABULARY_STEP_KEY, String(step));
    } catch {
      /* ignore */
    }
  }, [step]);

  const typeScore = data.words.filter((w) =>
    checkWordClass(w, types[w], data.wordClasses),
  ).length;

  const matchScore = data.definitions.filter((d) =>
    checkDefinitionMatch(matches[d.id] ?? "", d.word),
  ).length;

  const choiceScore = data.chooseSentences.filter(
    (s) => choices[s.id] === s.correct,
  ).length;

  const gapScore = data.collocations.gaps.filter((g) =>
    checkGapWord(gaps[g.id] ?? "", g.answer),
  ).length;

  const phraseScore = data.appsText.phrases.filter((p) =>
    selectedPhrases.has(p.id),
  ).length;

  const trendScore = data.appsText.trendItems.filter(
    (t) => trends[t.id] === t.category,
  ).length;

  const totalItems =
    data.words.length +
    data.definitions.length +
    data.chooseSentences.length +
    data.collocations.gaps.length +
    data.appsText.phrases.length +
    data.appsText.trendItems.length;

  const totalScore =
    typeScore + matchScore + choiceScore + gapScore + phraseScore + trendScore;

  const isLastStep = step === VOCAB_RESULT_STEP;

  const canAdvance = useMemo(() => {
    if (step === 1) return data.words.every((w) => types[w] !== "");
    if (step === 2) return data.definitions.every((d) => matches[d.id]?.trim());
    if (step === 3) return data.chooseSentences.every((s) => choices[s.id] !== "");
    if (step === 4)
      return data.collocations.gaps.every((g) => gaps[g.id]?.trim());
    if (step === 5) {
      return [...phraseIds].every((id) => selectedPhrases.has(id));
    }
    if (step === 6)
      return data.appsText.trendItems.every((t) => trends[t.id] !== "");
    return true;
  }, [step, types, matches, choices, gaps, selectedPhrases, trends, data, phraseIds]);

  const goPrev = () => {
    setStep((s) => {
      if (s === VOCAB_RESULT_STEP) setChecked(false);
      return Math.max(0, s - 1);
    });
  };

  const goNext = () => {
    if (step === 7) {
      setChecked(true);
      setStep(VOCAB_RESULT_STEP);
      return;
    }
    if (step === VOCAB_RESULT_STEP) {
      onBack?.();
      return;
    }
    setStep((s) => Math.min(s + 1, VOCAB_RESULT_STEP));
  };

  const nextLabel = VOCAB_FLOW_NEXT[step] ?? "Дальше →";

  const togglePhrase = (id: string) => {
    setSelectedPhrases((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const jumpTo = (s: number) => {
    setStep(s);
    if (s < VOCAB_RESULT_STEP) setChecked(false);
  };

  const phraseCounts = useMemo(() => {
    const va = data.appsText.phrases.filter((p) => p.type === "verb-adv").length;
    const an = data.appsText.phrases.filter((p) => p.type === "adj-noun").length;
    const selVa = data.appsText.phrases.filter(
      (p) => p.type === "verb-adv" && selectedPhrases.has(p.id),
    ).length;
    const selAn = data.appsText.phrases.filter(
      (p) => p.type === "adj-noun" && selectedPhrases.has(p.id),
    ).length;
    return { va, an, selVa, selAn };
  }, [data.appsText.phrases, selectedPhrases]);

  return (
    <div className="app-shell vocabulary-flow">
      {onBack && isLastStep && (
        <button type="button" className="back-link" onClick={onBack}>
          ← Назад к модулю
        </button>
      )}
      {contextLabel && <p className="trainer-context">{contextLabel}</p>}

      <div className="top-bar">
        <span className="badge">
          Module {data.module} · Vocabulary · {data.bookPages}
        </span>
        <div className="controls mode-toggle">
          <button
            type="button"
            className={mode === "practice" ? "active" : ""}
            onClick={() => {
              setMode("practice");
              setChecked(false);
            }}
          >
            Practice
          </button>
          <button
            type="button"
            className={mode === "exam" ? "active" : ""}
            onClick={() => {
              setMode("exam");
              setChecked(false);
            }}
          >
            Exam
          </button>
        </div>
      </div>

      <div className="flow-progress">
        {VOCAB_FLOW_STEPS.map((label, i) => (
          <button
            key={label}
            type="button"
            className={`flow-progress__dot ${i === step ? "flow-progress__dot--on" : ""} ${i < step ? "flow-progress__dot--done" : ""}`}
            onClick={() => jumpTo(i)}
            title={label}
          />
        ))}
      </div>
      <p className="flow-progress__label">
        Step {step + 1}/{VOCAB_FLOW_STEPS.length}:{" "}
        <strong>{VOCAB_FLOW_STEPS[step]}</strong>
      </p>

      <div className="flow-stage-jump">
        <span className="flow-stage-jump__label">Перейти к этапу:</span>
        <button
          type="button"
          className={step === 0 ? "flow-stage-jump__btn--on" : ""}
          onClick={() => jumpTo(0)}
        >
          Intro
        </button>
        <button
          type="button"
          className={step >= 1 && step <= 3 ? "flow-stage-jump__btn--on" : ""}
          onClick={() => jumpTo(1)}
        >
          1a–1c
        </button>
        <button
          type="button"
          className={step === 4 ? "flow-stage-jump__btn--on" : ""}
          onClick={() => jumpTo(4)}
        >
          2
        </button>
        <button
          type="button"
          className={step === 5 ? "flow-stage-jump__btn--on" : ""}
          onClick={() => jumpTo(5)}
        >
          3a
        </button>
        <button
          type="button"
          className={step === 6 ? "flow-stage-jump__btn--on" : ""}
          onClick={() => jumpTo(6)}
        >
          3b
        </button>
        <button
          type="button"
          className={step === 7 ? "flow-stage-jump__btn--on" : ""}
          onClick={() => jumpTo(7)}
        >
          Dictionary
        </button>
      </div>

      {step === 0 && (
        <section className="card flow-card">
          <h2 className="card-title">
            <span className="dot" />
            Vocabulary · p. 10
          </h2>
          <p className="article-preview__label">Expert IELTS 7.5 · Module 1</p>
          <p className="question-text">
            Полный поток по странице 10: <strong>The language of learning</strong>{" "}
            (1a–1c), <strong>Collocations</strong> (2), текст про apps (3a–3b),{" "}
            <strong>Dictionary skills</strong>.
          </p>
          <ul className="vocab-outline-list">
            <li>
              <strong>1a–1c</strong> — word types, definitions, choose the option
            </li>
            <li>
              <strong>2</strong> — verb + noun collocations (child prodigies)
            </li>
            <li>
              <strong>3a–3b</strong> — find collocations in text; sort trends
            </li>
            <li>
              <strong>Dictionary</strong> — работа со словарём (устно)
            </li>
          </ul>
          <div className="vocab-panel">
            <h4>Words in 1a</h4>
            <div className="vocab-tags">
              {data.words.map((w) => (
                <span key={w} className="vocab-tag">
                  {w}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {step === 1 && (
        <section className="card flow-card">
          <h2 className="card-title">
            <span className="dot" />
            1a — Are the words nouns, verbs or both?
          </h2>
          <p className="article-preview__label">{data.sectionTitle}</p>
          <table className="vocab-type-table">
            <thead>
              <tr>
                <th>Word</th>
                <th>noun</th>
                <th>verb</th>
                <th>both</th>
                {checked && <th>Answer</th>}
              </tr>
            </thead>
            <tbody>
              {data.words.map((word) => (
                <WordTypeRow
                  key={word}
                  word={word}
                  value={types[word]}
                  onChange={(v) => setTypes((p) => ({ ...p, [word]: v }))}
                  showResult={checked}
                  expected={data.wordClasses[word]}
                />
              ))}
            </tbody>
          </table>
          {mode === "practice" && !checked && (
            <p className="gap-hint">
              💡 Three words can be both noun and verb: focus, process, research.
            </p>
          )}
        </section>
      )}

      {step === 2 && (
        <section className="card flow-card">
          <h2 className="card-title">
            <span className="dot" />
            1b — Match the words with the definitions
          </h2>
          <p className="section-hint">
            There are definitions for words that are both nouns and verbs — use the
            same word more than once if needed.
          </p>
          <ol className="vocab-match-list">
            {data.definitions.map((def) => {
              const val = matches[def.id] ?? "";
              const ok = checked && checkDefinitionMatch(val, def.word);
              const bad = checked && !ok;
              return (
                <li
                  key={def.id}
                  className={ok ? "vocab-match--ok" : bad ? "vocab-match--bad" : ""}
                >
                  <span className="vocab-match__num">{def.id}.</span>
                  <span className="vocab-match__text">{def.text}</span>
                  <select
                    value={val}
                    onChange={(e) =>
                      setMatches((p) => ({ ...p, [def.id]: e.target.value }))
                    }
                    disabled={checked}
                    className="vocab-match__select"
                  >
                    <option value="">— word —</option>
                    {data.words.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                  {bad && (
                    <span className="vocab-match__correct">{def.word}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {step === 3 && (
        <section className="card flow-card">
          <h2 className="card-title">
            <span className="dot" />
            1c — Choose the correct option
          </h2>
          <p className="section-hint">
            Click the word that completes each sentence correctly.
          </p>
          <ol className="vocab-choose-list">
            {data.chooseSentences.map((s) => {
              const picked = choices[s.id];
              const show = checked;
              return (
                <li key={s.id} className="vocab-choose-item">
                  <p className="vocab-choose-line">
                    <span>{s.id}. </span>
                    {s.before}{" "}
                    <button
                      type="button"
                      className={`vocab-choose-btn ${picked === "a" ? "vocab-choose-btn--on" : ""} ${show && s.correct === "a" ? "vocab-choose-btn--ok" : ""} ${show && picked === "a" && s.correct !== "a" ? "vocab-choose-btn--bad" : ""}`}
                      onClick={() =>
                        !checked && setChoices((p) => ({ ...p, [s.id]: "a" }))
                      }
                      disabled={checked}
                    >
                      {s.optionA}
                    </button>{" "}
                    /{" "}
                    <button
                      type="button"
                      className={`vocab-choose-btn ${picked === "b" ? "vocab-choose-btn--on" : ""} ${show && s.correct === "b" ? "vocab-choose-btn--ok" : ""} ${show && picked === "b" && s.correct !== "b" ? "vocab-choose-btn--bad" : ""}`}
                      onClick={() =>
                        !checked && setChoices((p) => ({ ...p, [s.id]: "b" }))
                      }
                      disabled={checked}
                    >
                      {s.optionB}
                    </button>{" "}
                    {s.after}
                  </p>
                  {mode === "practice" && !checked && s.hint && (
                    <p className="gap-hint">💡 {s.hint}</p>
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {step === 4 && (
        <section className="card flow-card">
          <h2 className="card-title">
            <span className="dot" />
            2 — Collocations
          </h2>
          <p className="article-preview__label">Verb + noun collocations</p>
          <p className="question-text">{data.collocations.instruction}</p>
          <div className="vocab-panel">
            <h4>Word bank</h4>
            <div className="vocab-tags">
              {data.collocations.wordBank.map((w) => (
                <span key={w} className="vocab-tag">
                  {w}
                </span>
              ))}
            </div>
          </div>
          {mode === "practice" && !checked && (
            <p className="gap-hint">
              💡 One word from the bank is not used:{" "}
              <strong>{data.collocations.unusedWord}</strong>
            </p>
          )}
          <div className="vocab-collocation-text">
            {data.collocations.gaps.map((g, i) => {
              const val = gaps[g.id] ?? "";
              const ok = checked && checkGapWord(val, g.answer);
              const bad = checked && val && !ok;
              return (
                <p key={g.id} className="vocab-collocation-line">
                  {g.before}{" "}
                  <span className="inline-gap-wrap">
                    <select
                      value={val}
                      onChange={(e) =>
                        setGaps((p) => ({ ...p, [g.id]: e.target.value }))
                      }
                      disabled={checked}
                      className={`vocab-gap-select ${ok ? "vocab-gap-select--ok" : bad ? "vocab-gap-select--bad" : ""}`}
                    >
                      <option value="">{g.id}</option>
                      {data.collocations.wordBank.map((w) => (
                        <option key={w} value={w}>
                          {w}
                        </option>
                      ))}
                    </select>
                  </span>{" "}
                  {g.after}
                  {mode === "practice" && !checked && g.hint && (
                    <span className="line-hint"> 💡 {g.hint}</span>
                  )}
                  {bad && (
                    <span className="inline-gap-bad"> → {g.answer}</span>
                  )}
                  {i < data.collocations.gaps.length - 1 && i === 2 && (
                    <span className="vocab-collocation-break" />
                  )}
                </p>
              );
            })}
          </div>
        </section>
      )}

      {step === 5 && (
        <section className="card flow-card">
          <h2 className="card-title">
            <span className="dot" />
            3a — Find collocations in the text
          </h2>
          <p className="article-preview__label">Collocations · The growing popularity of apps</p>
          <p className="question-text">{data.appsText.instruction3a}</p>
          <p className="vocab-phrase-progress">
            Selected: {phraseCounts.selVa}/{phraseCounts.va} verb + adverb ·{" "}
            {phraseCounts.selAn}/{phraseCounts.an} adjective + noun
            {phraseCounts.selAn < phraseCounts.an && (
              <span className="vocab-phrase-progress__note">
                {" "}
                (title: «growing popularity» — выберите в заголовке ниже)
              </span>
            )}
          </p>
          <AppsTextReader
            title={data.appsText.title}
            paragraphs={[
              [
                {
                  text: "The ",
                },
                {
                  text: "growing popularity",
                  phraseId: "growing-popularity",
                  phraseType: "adj-noun" as CollocationType,
                },
                { text: " of apps" },
              ],
              ...data.appsText.paragraphs,
            ]}
            selected={selectedPhrases}
            onToggle={togglePhrase}
            showResult={checked}
            correctIds={phraseIds}
          />
        </section>
      )}

      {step === 6 && (
        <section className="card flow-card">
          <h2 className="card-title">
            <span className="dot" />
            3b — Trend categories
          </h2>
          <p className="question-text">{data.appsText.instruction3b}</p>
          <ol className="vocab-trend-list">
            {data.appsText.trendItems.map((item) => {
              const val = trends[item.id] ?? "";
              const ok = checked && val === item.category;
              const bad = checked && val && val !== item.category;
              return (
                <li
                  key={item.id}
                  className={ok ? "vocab-match--ok" : bad ? "vocab-match--bad" : ""}
                >
                  <span className="vocab-trend-phrase">{item.phrase}</span>
                  <select
                    value={val}
                    onChange={(e) =>
                      setTrends((p) => ({
                        ...p,
                        [item.id]: e.target.value as TrendCategory,
                      }))
                    }
                    disabled={checked}
                    className="vocab-match__select"
                  >
                    <option value="">— category —</option>
                    {(Object.keys(TREND_LABELS) as TrendCategory[]).map((k) => (
                      <option key={k} value={k}>
                        {TREND_LABELS[k]}
                      </option>
                    ))}
                  </select>
                  {bad && (
                    <span className="vocab-match__correct">
                      {TREND_LABELS[item.category]}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
          <div className="vocab-trend-key">
            <p>
              <strong>1.</strong> go up · <strong>2.</strong> go down ·{" "}
              <strong>3.</strong> move up and down
            </p>
          </div>
        </section>
      )}

      {step === 7 && (
        <section className="card flow-card">
          <h2 className="card-title">
            <span className="dot" />
            Dictionary skills
          </h2>
          <p className="article-preview__label">Vocabulary · p. 10</p>
          <p className="question-text">{data.dictionarySkills.instruction}</p>
          <OralBanner>
            Откройте словарь (бумажный или онлайн). Писать не нужно — выполните
            задания вслух или в парах.
          </OralBanner>
          <div className="vocab-panel">
            <h4>Choose a word</h4>
            <div className="vocab-tags">
              {data.dictionarySkills.words.map((w) => (
                <span key={w} className="vocab-tag">
                  {w}
                </span>
              ))}
            </div>
          </div>
          <ol className="vocab-dict-tasks">
            {data.dictionarySkills.tasks.map((task, i) => (
              <li key={task}>
                <label>
                  <input
                    type="checkbox"
                    checked={dictChecks[i]}
                    onChange={() =>
                      setDictChecks((p) => p.map((v, j) => (j === i ? !v : v)))
                    }
                  />
                  {task}
                </label>
              </li>
            ))}
          </ol>
        </section>
      )}

      {step === VOCAB_RESULT_STEP && (
        <section className="card flow-card">
          <h2 className="card-title">
            <span className="dot" />
            Result — Vocabulary p. 10
          </h2>
          <p className="score-display">
            {totalScore} / {totalItems}
          </p>
          <ul className="vocab-score-breakdown">
            <li>
              1a word types: {typeScore} / {data.words.length}
            </li>
            <li>
              1b definitions: {matchScore} / {data.definitions.length}
            </li>
            <li>
              1c sentences: {choiceScore} / {data.chooseSentences.length}
            </li>
            <li>
              2 collocations: {gapScore} / {data.collocations.gaps.length}
            </li>
            <li>
              3a phrases found: {phraseScore} / {data.appsText.phrases.length}
            </li>
            <li>
              3b trends: {trendScore} / {data.appsText.trendItems.length}
            </li>
          </ul>
          <p className="section-hint">
            Dictionary skills — устное задание, не входит в счёт.
          </p>
          <button
            type="button"
            className="nav-btn"
            onClick={() => {
              const r = resetAllAnswers(data);
              setStep(0);
              setChecked(false);
              setTypes(r.types);
              setMatches(r.matches);
              setChoices(r.choices);
              setGaps(r.gaps);
              setSelectedPhrases(r.selectedPhrases);
              setTrends(r.trends);
              setDictChecks(r.dictChecks);
              try {
                sessionStorage.removeItem(VOCABULARY_STEP_KEY);
              } catch {
                /* ignore */
              }
            }}
          >
            Start again
          </button>
        </section>
      )}

      <div className="flow-footer">
        <button
          type="button"
          className="flow-footer__btn"
          disabled={step === 0}
          onClick={goPrev}
        >
          ← Назад
        </button>
        <span className="flow-footer__step">
          {step + 1} / {VOCAB_FLOW_STEPS.length}
        </span>
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          disabled={!canAdvance}
          onClick={goNext}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}

export { vocabularyM1 };
