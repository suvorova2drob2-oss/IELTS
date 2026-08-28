import { useEffect, useState } from "react";
import {
  LANG_M1A_STEPS,
  checkLangAnswer,
  languageM1a,
} from "../data/languageM1a";

const STEP_KEY = "ielts-language-m1a-step";
const data = languageM1a;
const PREFIX_BLANK_IDS = Object.keys(data.step2a.keys);

function loadStep(restart?: boolean, initialStep?: number): number {
  if (initialStep != null) return initialStep;
  if (restart) return 0;
  try {
    const raw = sessionStorage.getItem(STEP_KEY);
    if (raw != null) {
      const n = Number(raw);
      if (n >= 0 && n < LANG_M1A_STEPS.length) return n;
    }
  } catch {
    /* ignore */
  }
  return 0;
}

export function LanguageM1aTrainer({
  onBack,
  restart,
  initialStep,
}: {
  onBack?: () => void;
  restart?: boolean;
  initialStep?: number;
}) {
  const [step, setStep] = useState(() => loadStep(restart, initialStep));
  const [matches, setMatches] = useState<Record<number, string>>({});
  const [pickedWord, setPickedWord] = useState<number | null>(null);
  const [pickedLetter, setPickedLetter] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [wordIn, setWordIn] = useState<Record<number, string>>({});
  const [synIn, setSynIn] = useState<Record<number, string>>({});
  const [picked1b, setPicked1b] = useState<
    | { kind: "word"; text: string }
    | { kind: "syn"; text: string }
    | null
  >(null);
  const [prefixes, setPrefixes] = useState<Record<string, string>>({});
  const [pickedPrefix, setPickedPrefix] = useState<string | null>(null);
  const [pickedBlank, setPickedBlank] = useState<string | null>(null);
  const [meanMatches, setMeanMatches] = useState<Record<number, string>>({});
  const [pickedMeanLeft, setPickedMeanLeft] = useState<number | null>(null);
  const [pickedMeanLetter, setPickedMeanLetter] = useState<string | null>(
    null,
  );
  const [formPicks, setFormPicks] = useState<
    Record<number, "noun" | "verb" | "adjective" | "adverb" | "">
  >({});
  const [wfStem, setWfStem] = useState<Record<number, string>>({});
  const [pickedWfStem, setPickedWfStem] = useState<string | null>(null);
  const [paraStem, setParaStem] = useState<Record<number, string>>({});
  const [pickedPara, setPickedPara] = useState<string | null>(null);
  const [activeGap, setActiveGap] = useState<number | null>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(STEP_KEY, String(step));
    } catch {
      /* ignore */
    }
  }, [step]);

  const formByStem = Object.fromEntries(
    data.step3b.bank.map((b) => [b.stem, b.form]),
  );
  const paraFormByPrompt = Object.fromEntries(
    data.step4a.items.map((it) => [it.prompt, it.display]),
  );

  const usedLetters = new Set(Object.values(matches).filter(Boolean));
  const synById = Object.fromEntries(
    data.step1a.right.map((r) => [r.id, r.text]),
  );
  const usedPrefixes = new Set(Object.values(prefixes).filter(Boolean));
  const usedMeanLetters = new Set(Object.values(meanMatches).filter(Boolean));
  const meanById = Object.fromEntries(
    data.step2b.right.map((r) => [r.id, r.text]),
  );

  const usedWords1b = new Set(Object.values(wordIn).filter(Boolean));
  const usedSyns1b = new Set(Object.values(synIn).filter(Boolean));
  const usedWfStems = new Set(Object.values(wfStem).filter(Boolean));
  const usedParaPrompts = new Set(Object.values(paraStem).filter(Boolean));

  const place1bWord = (itemId: number, text: string) => {
    if (checked) return;
    setWordIn((m) => {
      const next = { ...m };
      for (const [k, v] of Object.entries(next)) {
        if (v === text) delete next[Number(k)];
      }
      next[itemId] = text;
      return next;
    });
    setPicked1b(null);
  };

  const place1bSyn = (itemId: number, text: string) => {
    if (checked) return;
    setSynIn((m) => {
      const next = { ...m };
      for (const [k, v] of Object.entries(next)) {
        if (v === text) delete next[Number(k)];
      }
      next[itemId] = text;
      return next;
    });
    setPicked1b(null);
  };

  const on1bSlot = (itemId: number, side: "word" | "syn") => {
    if (checked) return;
    if (picked1b) {
      if (side === "word" && picked1b.kind === "word") {
        place1bWord(itemId, picked1b.text);
        return;
      }
      if (side === "syn" && picked1b.kind === "syn") {
        place1bSyn(itemId, picked1b.text);
        return;
      }
      return;
    }
    if (side === "word" && wordIn[itemId]) {
      setWordIn((m) => {
        const n = { ...m };
        delete n[itemId];
        return n;
      });
    }
    if (side === "syn" && synIn[itemId]) {
      setSynIn((m) => {
        const n = { ...m };
        delete n[itemId];
        return n;
      });
    }
  };

  const placeWf = (gapId: number, stem: string) => {
    if (checked) return;
    setWfStem((m) => {
      const next = { ...m };
      for (const [k, v] of Object.entries(next)) {
        if (v === stem) delete next[Number(k)];
      }
      next[gapId] = stem;
      return next;
    });
    setPickedWfStem(null);
  };

  const onWfGap = (gapId: number) => {
    if (checked) return;
    if (pickedWfStem) {
      placeWf(gapId, pickedWfStem);
      return;
    }
    if (wfStem[gapId]) {
      setWfStem((m) => {
        const n = { ...m };
        delete n[gapId];
        return n;
      });
    }
  };

  const placePara = (itemId: number, prompt: string) => {
    if (checked) return;
    setParaStem((m) => {
      const next = { ...m };
      for (const [k, v] of Object.entries(next)) {
        if (v === prompt) delete next[Number(k)];
      }
      next[itemId] = prompt;
      return next;
    });
    setPickedPara(null);
  };

  const onParaGap = (itemId: number) => {
    if (checked) return;
    if (pickedPara) {
      placePara(itemId, pickedPara);
      return;
    }
    if (paraStem[itemId]) {
      setParaStem((m) => {
        const n = { ...m };
        delete n[itemId];
        return n;
      });
    }
  };

  const place = (wordId: number, letter: string) => {
    if (checked) return;
    setMatches((m) => {
      const next = { ...m };
      for (const [k, v] of Object.entries(next)) {
        if (v === letter) delete next[Number(k)];
      }
      next[wordId] = letter;
      return next;
    });
    setPickedWord(null);
    setPickedLetter(null);
  };

  const clearMatch = (wordId: number) => {
    if (checked) return;
    setMatches((m) => {
      const next = { ...m };
      delete next[wordId];
      return next;
    });
  };

  const onWordClick = (wordId: number) => {
    if (checked) return;
    if (pickedLetter) {
      place(wordId, pickedLetter);
      return;
    }
    if (matches[wordId]) {
      clearMatch(wordId);
      return;
    }
    setPickedWord((p) => (p === wordId ? null : wordId));
  };

  const onSynClick = (letter: string) => {
    if (checked || usedLetters.has(letter)) return;
    if (pickedWord != null) {
      place(pickedWord, letter);
      return;
    }
    setPickedLetter((p) => (p === letter ? null : letter));
  };

  const placePrefix = (blankId: string, prefix: string) => {
    if (checked) return;
    setPrefixes((p) => {
      const next = { ...p };
      for (const [k, v] of Object.entries(next)) {
        if (v === prefix) delete next[k];
      }
      next[blankId] = prefix;
      return next;
    });
    setPickedPrefix(null);
    setPickedBlank(null);
  };

  const clearPrefix = (blankId: string) => {
    if (checked) return;
    setPrefixes((p) => {
      const next = { ...p };
      delete next[blankId];
      return next;
    });
  };

  const onBlankClick = (blankId: string) => {
    if (checked) return;
    if (pickedPrefix) {
      placePrefix(blankId, pickedPrefix);
      return;
    }
    if (prefixes[blankId]) {
      clearPrefix(blankId);
      return;
    }
    setPickedBlank((b) => (b === blankId ? null : blankId));
  };

  const onPrefixChipClick = (prefix: string) => {
    if (checked || usedPrefixes.has(prefix)) return;
    if (pickedBlank) {
      placePrefix(pickedBlank, prefix);
      return;
    }
    setPickedPrefix((p) => (p === prefix ? null : prefix));
  };

  const placeMean = (leftId: number, letter: string) => {
    if (checked) return;
    setMeanMatches((m) => {
      const next = { ...m };
      for (const [k, v] of Object.entries(next)) {
        if (v === letter) delete next[Number(k)];
      }
      next[leftId] = letter;
      return next;
    });
    setPickedMeanLeft(null);
    setPickedMeanLetter(null);
  };

  const clearMean = (leftId: number) => {
    if (checked) return;
    setMeanMatches((m) => {
      const next = { ...m };
      delete next[leftId];
      return next;
    });
  };

  const onMeanLeftClick = (leftId: number) => {
    if (checked) return;
    if (pickedMeanLetter) {
      placeMean(leftId, pickedMeanLetter);
      return;
    }
    if (meanMatches[leftId]) {
      clearMean(leftId);
      return;
    }
    setPickedMeanLeft((p) => (p === leftId ? null : leftId));
  };

  const onMeanRightClick = (letter: string) => {
    if (checked || usedMeanLetters.has(letter)) return;
    if (pickedMeanLeft != null) {
      placeMean(pickedMeanLeft, letter);
      return;
    }
    setPickedMeanLetter((p) => (p === letter ? null : letter));
  };

  const matchScore = data.step1a.left.filter(
    (item) => matches[item.id] === data.step1a.keys[item.id],
  ).length;

  const gapScore = data.step1b.items.filter((item) => {
    const wOk = checkLangAnswer(wordIn[item.id] ?? "", item.wordAnswers);
    const sOk = checkLangAnswer(synIn[item.id] ?? "", item.synonymAnswers);
    return wOk && sOk;
  }).length;

  const prefixScore = PREFIX_BLANK_IDS.filter(
    (id) => prefixes[id] === data.step2a.keys[id],
  ).length;

  const meanScore = data.step2b.left.filter(
    (item) => meanMatches[item.id] === data.step2b.keys[item.id],
  ).length;

  const formScore = ([1, 2, 3, 4, 5, 6, 7, 8] as const).filter(
    (id) => formPicks[id] === data.step3a.keys[id],
  ).length;

  const wfScore = data.step3b.items.filter((item) => {
    const stem = wfStem[item.id];
    if (!stem) return false;
    return checkLangAnswer(formByStem[stem] ?? "", item.answers);
  }).length;

  const paraScore = data.step4a.items.filter((item) => {
    const stem = paraStem[item.id];
    if (!stem) return false;
    return stem === item.prompt;
  }).length;

  const scores = [
    matchScore,
    gapScore,
    prefixScore,
    meanScore,
    formScore,
    wfScore,
    paraScore,
    0,
  ];
  const totals = [
    data.step1a.left.length,
    data.step1b.items.length,
    PREFIX_BLANK_IDS.length,
    data.step2b.left.length,
    8,
    data.step3b.items.length,
    data.step4a.items.length,
    data.step4b.questions.length,
  ];

  const goPrev = () => {
    setChecked(false);
    setActiveGap(null);
    setStep((s) => Math.max(0, s - 1));
  };

  const goNext = () => {
    if (step === 7) {
      onBack?.();
      return;
    }
    if (!checked) {
      setChecked(true);
      return;
    }
    if (step >= LANG_M1A_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setPickedWord(null);
    setPickedLetter(null);
    setPickedPrefix(null);
    setPickedBlank(null);
    setPickedMeanLeft(null);
    setPickedMeanLetter(null);
    setActiveGap(null);
    setPicked1b(null);
    setPickedWfStem(null);
    setPickedPara(null);
    setStep((s) => s + 1);
  };

  const nextLabels = [
    "Continue → 1b",
    "Continue → 2a",
    "Continue → 2b",
    "Continue → 3a",
    "Continue → 3b",
    "Continue → 4a",
    "Continue → 4b",
    "← К модулю",
  ];
  const nextLabel =
    step === 7
      ? "← К модулю"
      : !checked
        ? "Check →"
        : nextLabels[step];

  const clearPicks = () => {
    setChecked(false);
    setPickedWord(null);
    setPickedLetter(null);
    setPickedPrefix(null);
    setPickedBlank(null);
    setPickedMeanLeft(null);
    setPickedMeanLetter(null);
    setActiveGap(null);
    setPicked1b(null);
    setPickedWfStem(null);
    setPickedPara(null);
  };

  return (
    <div className="app-shell reading-flow reading-flow--viewport lang-m1a">
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
          Language · {data.bookPages}
        </span>
        <div className="learn-step-tabs">
          {LANG_M1A_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                clearPicks();
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="card flow-card lang-m1a__panel">
          <h2 className="card-title">
            <span className="dot" />
            1a · Match synonyms
          </h2>
          <p className="learn-screen__hint">{data.step1a.instruction}</p>
          <p className="lang-m1a__hint">
            Click a word or a synonym, then the other side. Click a match to
            undo.
          </p>
          <div className="lang-m1a__match">
            <ul className="lang-m1a__left">
              {data.step1a.left.map((item) => {
                const letter = matches[item.id] ?? "";
                const synText = letter ? synById[letter] : "";
                const key = data.step1a.keys[item.id];
                let state = "";
                if (checked) {
                  state =
                    letter === key ? "lang-m1a__row--ok" : "lang-m1a__row--bad";
                } else if (pickedWord === item.id) {
                  state = "lang-m1a__row--picked";
                } else if (letter) {
                  state = "lang-m1a__row--filled";
                }
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`lang-m1a__row ${state}`}
                      disabled={checked}
                      onClick={() => onWordClick(item.id)}
                    >
                      <strong>{item.id}.</strong>
                      <span className="lang-m1a__word">{item.text}</span>
                      {letter ? (
                        <span className="lang-m1a__placed">
                          <span className="lang-m1a__placed-letter">
                            {letter}
                          </span>
                          {synText}
                        </span>
                      ) : (
                        <span className="lang-m1a__slot">drop here</span>
                      )}
                    </button>
                    {checked && letter !== key && (
                      <span className="lang-m1a__fix">
                        {key} · {synById[key]}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="lang-m1a__right">
              {data.step1a.right.map((opt) => {
                const used = usedLetters.has(opt.id);
                const active = pickedLetter === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    className={`lang-m1a__syn ${used ? "lang-m1a__syn--used" : ""} ${active ? "lang-m1a__syn--picked" : ""}`}
                    disabled={checked || used}
                    onClick={() => onSynClick(opt.id)}
                  >
                    <strong>{opt.id}</strong>
                    <span>{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
          {checked && (
            <p className="pr-endings-panel__tip">
              Score: {matchScore} / {data.step1a.left.length} · Keys: 1C · 2B ·
              3A · 4D
            </p>
          )}
        </section>
      )}

      {step === 1 && (
        <section className="card flow-card lang-m1a__panel">
          <h2 className="card-title">
            <span className="dot" />
            1b · Complete the sentences
          </h2>
          <p className="learn-screen__hint">{data.step1b.instruction}</p>
          <p className="lang-m1a__hint">
            Click a word or synonym chip, then a slot.
          </p>
          <div className="lang-m1a__1b-layout">
            <div className="lang-m1a__prefix-bank lang-m1a__prefix-bank--compact">
              {data.step1a.left.map((w) => {
                const used = usedWords1b.has(w.text);
                const active =
                  picked1b?.kind === "word" && picked1b.text === w.text;
                return (
                  <button
                    key={w.id}
                    type="button"
                    className={`lang-m1a__prefix-chip ${used ? "lang-m1a__prefix-chip--used" : ""} ${active ? "lang-m1a__prefix-chip--picked" : ""}`}
                    disabled={checked || used}
                    onClick={() =>
                      setPicked1b((p) =>
                        p?.kind === "word" && p.text === w.text
                          ? null
                          : { kind: "word", text: w.text },
                      )
                    }
                  >
                    {w.id} {w.text}
                  </button>
                );
              })}
              {data.step1a.right.map((s) => {
                const used = usedSyns1b.has(s.text);
                const active =
                  picked1b?.kind === "syn" && picked1b.text === s.text;
                return (
                  <button
                    key={s.id}
                    type="button"
                    className={`lang-m1a__prefix-chip ${used ? "lang-m1a__prefix-chip--used" : ""} ${active ? "lang-m1a__prefix-chip--picked" : ""}`}
                    disabled={checked || used}
                    onClick={() =>
                      setPicked1b((p) =>
                        p?.kind === "syn" && p.text === s.text
                          ? null
                          : { kind: "syn", text: s.text },
                      )
                    }
                  >
                    {s.id} {s.text}
                  </button>
                );
              })}
            </div>
            <ol className="lang-m1a__gaps lang-m1a__gaps--grid">
              {data.step1b.items.map((item) => {
                const w = wordIn[item.id] ?? "";
                const s = synIn[item.id] ?? "";
                const wOk = checkLangAnswer(w, item.wordAnswers);
                const sOk = checkLangAnswer(s, item.synonymAnswers);
                return (
                  <li key={item.id}>
                    <p className="lang-m1a__sent">
                      <strong>{item.id}.</strong> {item.before}
                      <span className="lang-m1a__blank">____</span>
                      {item.after}
                    </p>
                    <div className="lang-m1a__dual">
                      <button
                        type="button"
                        className={`lang-m1a__slot-btn ${
                          checked
                            ? wOk
                              ? "lang-m1a__slot-btn--ok"
                              : "lang-m1a__slot-btn--bad"
                            : w
                              ? "lang-m1a__slot-btn--filled"
                              : ""
                        }`}
                        disabled={checked}
                        onClick={() => on1bSlot(item.id, "word")}
                      >
                        {w || "Word 1–4"}
                      </button>
                      <button
                        type="button"
                        className={`lang-m1a__slot-btn ${
                          checked
                            ? sOk
                              ? "lang-m1a__slot-btn--ok"
                              : "lang-m1a__slot-btn--bad"
                            : s
                              ? "lang-m1a__slot-btn--filled"
                              : ""
                        }`}
                        disabled={checked}
                        onClick={() => on1bSlot(item.id, "syn")}
                      >
                        {s || "Synonym A–D"}
                      </button>
                    </div>
                    {checked && (
                      <p className="lang-m1a__key">Ideas: {item.display}</p>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
          {checked && (
            <p className="pr-endings-panel__tip">
              Score: {gapScore} / {data.step1b.items.length} (both forms
              correct)
            </p>
          )}
        </section>
      )}

      {step === 2 && (
        <section className="card flow-card lang-m1a__panel">
          <h2 className="card-title">
            <span className="dot" />
            2a · Prefixes
          </h2>
          <p className="learn-screen__hint">{data.step2a.instruction}</p>
          <div className="lang-m1a__prefix-bank">
            {data.step2a.prefixes.map((p) => {
              const used = usedPrefixes.has(p);
              const active = pickedPrefix === p;
              return (
                <button
                  key={p}
                  type="button"
                  className={`lang-m1a__prefix-chip ${used ? "lang-m1a__prefix-chip--used" : ""} ${active ? "lang-m1a__prefix-chip--picked" : ""}`}
                  disabled={checked || used}
                  onClick={() => onPrefixChipClick(p)}
                >
                  {p}
                </button>
              );
            })}
          </div>
          <ol className="lang-m1a__prefix-sents">
            {data.step2a.sentences.map((sent) => (
              <li key={sent.id}>
                <strong>{sent.id}.</strong>{" "}
                {sent.parts.map((part, i) => {
                  if ("t" in part && part.t != null && !("blank" in part)) {
                    return <span key={i}>{part.t}</span>;
                  }
                  if ("blank" in part && part.blank) {
                    const val = prefixes[part.blank] ?? "";
                    const key = data.step2a.keys[part.blank];
                    let state = "";
                    if (checked) {
                      state =
                        val === key
                          ? "lang-m1a__gap--ok"
                          : "lang-m1a__gap--bad";
                    } else if (pickedBlank === part.blank) {
                      state = "lang-m1a__gap--picked";
                    } else if (val) {
                      state = "lang-m1a__gap--filled";
                    }
                    return (
                      <span key={i} className="lang-m1a__gap-wrap">
                        <button
                          type="button"
                          className={`lang-m1a__gap ${state}`}
                          disabled={checked}
                          onClick={() => onBlankClick(part.blank)}
                        >
                          {val || "···"}
                        </button>
                        {part.after}
                        {checked && val !== key && (
                          <span className="lang-m1a__gap-fix">{key}</span>
                        )}
                      </span>
                    );
                  }
                  return null;
                })}
              </li>
            ))}
          </ol>
          {checked && (
            <p className="pr-endings-panel__tip">
              Score: {prefixScore} / {PREFIX_BLANK_IDS.length} · inter · un · in
              · re · en / mis
            </p>
          )}
        </section>
      )}

      {step === 3 && (
        <section className="card flow-card lang-m1a__panel">
          <h2 className="card-title">
            <span className="dot" />
            2b · Match meanings
          </h2>
          <p className="learn-screen__hint">{data.step2b.instruction}</p>
          <div className="lang-m1a__match lang-m1a__match--mean">
            <ul className="lang-m1a__left">
              {data.step2b.left.map((item) => {
                const letter = meanMatches[item.id] ?? "";
                const text = letter ? meanById[letter] : "";
                const key = data.step2b.keys[item.id];
                let state = "";
                if (checked) {
                  state =
                    letter === key ? "lang-m1a__row--ok" : "lang-m1a__row--bad";
                } else if (pickedMeanLeft === item.id) {
                  state = "lang-m1a__row--picked";
                } else if (letter) {
                  state = "lang-m1a__row--filled";
                }
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`lang-m1a__row lang-m1a__row--mean ${state}`}
                      disabled={checked}
                      onClick={() => onMeanLeftClick(item.id)}
                    >
                      <strong>{item.id}.</strong>
                      <span className="lang-m1a__word">{item.text}</span>
                      {letter ? (
                        <span className="lang-m1a__placed">
                          <span className="lang-m1a__placed-letter">
                            {letter}
                          </span>
                          {text}
                        </span>
                      ) : (
                        <span className="lang-m1a__slot">drop here</span>
                      )}
                    </button>
                    {checked && letter !== key && (
                      <span className="lang-m1a__fix">
                        {key} · {meanById[key]}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="lang-m1a__right">
              {data.step2b.right.map((opt) => {
                const used = usedMeanLetters.has(opt.id);
                const active = pickedMeanLetter === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    className={`lang-m1a__syn ${used ? "lang-m1a__syn--used" : ""} ${active ? "lang-m1a__syn--picked" : ""}`}
                    disabled={checked || used}
                    onClick={() => onMeanRightClick(opt.id)}
                  >
                    <strong>{opt.id}</strong>
                    <span>{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
          {checked && (
            <p className="pr-endings-panel__tip">
              Score: {meanScore} / {data.step2b.left.length} · 1D · 2B · 3E · 4A
              · 5C
            </p>
          )}
        </section>
      )}

      {step === 4 && (
        <section className="card flow-card lang-m1a__panel">
          <h2 className="card-title">
            <span className="dot" />
            3a · Word forms
          </h2>
          <p className="learn-screen__hint">{data.step3a.instruction}</p>
          <div className="lang-m1a__wf-layout">
            <div className="lang-m1a__wf-main">
              <p className="lang-m1a__passage-title">{data.step3a.title}</p>
              <p className="lang-m1a__passage">
                {data.wordFormationPassage.map((part, i) => {
                  if ("t" in part && part.t) return <span key={i}>{part.t}</span>;
                  if ("gap" in part && part.gap != null) {
                    const id = part.gap;
                    const pick = formPicks[id] ?? "";
                    const key = data.step3a.keys[id];
                    let state = "";
                    if (checked) {
                      state =
                        pick === key
                          ? "lang-m1a__wf-gap--ok"
                          : "lang-m1a__wf-gap--bad";
                    } else if (activeGap === id) {
                      state = "lang-m1a__wf-gap--picked";
                    } else if (pick) {
                      state = "lang-m1a__wf-gap--filled";
                    }
                    return (
                      <button
                        key={i}
                        type="button"
                        className={`lang-m1a__wf-gap ${state}`}
                        disabled={checked}
                        onClick={() =>
                          setActiveGap((g) => (g === id ? null : id))
                        }
                      >
                        <span className="lang-m1a__wf-num">{id}</span>
                        {pick || "····"}
                      </button>
                    );
                  }
                  return null;
                })}
              </p>
            </div>
            <div className="lang-m1a__form-bank lang-m1a__form-bank--side">
              <p className="lang-m1a__form-bank-label">Word form</p>
              {data.step3a.forms.map((f) => (
                <button
                  key={f}
                  type="button"
                  className="lang-m1a__form-chip"
                  disabled={checked || activeGap == null}
                  onClick={() => {
                    if (activeGap == null) return;
                    setFormPicks((p) => ({ ...p, [activeGap]: f }));
                    setActiveGap(null);
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          {checked && (
            <p className="pr-endings-panel__tip">
              Score: {formScore} / 8 · adverb · adverb · verb · adjective ·
              adjective · verb · noun · verb
            </p>
          )}
        </section>
      )}

      {step === 5 && (
        <section className="card flow-card lang-m1a__panel">
          <h2 className="card-title">
            <span className="dot" />
            3b · Word formation
          </h2>
          <p className="learn-screen__hint">{data.step3b.instruction}</p>
          <p className="lang-m1a__hint">
            Click a stem, then a gap (the form of that stem appears). Wrong gap
            = wrong answer. You can Check anytime — even with empty or wrong
            gaps. Click a filled gap to undo.
          </p>
          <div className="lang-m1a__wf-layout">
            <div className="lang-m1a__wf-main">
              <p className="lang-m1a__passage-title">{data.step3b.title}</p>
              <p className="lang-m1a__passage">
                {data.wordFormationPassage.map((part, i) => {
                  if ("t" in part && part.t) return <span key={i}>{part.t}</span>;
                  if ("gap" in part && part.gap != null) {
                    const item = data.step3b.items.find((x) => x.id === part.gap)!;
                    const stem = wfStem[item.id] ?? "";
                    const val = stem ? (formByStem[stem] ?? "") : "";
                    const ok = checkLangAnswer(val, item.answers);
                    let state = "";
                    if (checked) {
                      state = ok
                        ? "lang-m1a__wf-gap--ok"
                        : "lang-m1a__wf-gap--bad";
                    } else if (pickedWfStem && !stem) {
                      state = "lang-m1a__wf-gap--picked";
                    } else if (val) {
                      state = "lang-m1a__wf-gap--filled";
                    }
                    return (
                      <button
                        key={i}
                        type="button"
                        className={`lang-m1a__wf-gap ${state}`}
                        disabled={checked}
                        onClick={() => onWfGap(item.id)}
                        title={
                          checked && !ok
                            ? `Answer: ${item.display}`
                            : undefined
                        }
                      >
                        <span className="lang-m1a__wf-num">{item.id}</span>
                        {checked && !ok && !val
                          ? `→ ${item.answers[0]}`
                          : val || "····"}
                      </button>
                    );
                  }
                  return null;
                })}
              </p>
            </div>
            <div className="lang-m1a__form-bank lang-m1a__form-bank--side">
              <p className="lang-m1a__form-bank-label">Stems</p>
              {data.step3b.bank.map((b) => {
                const used = usedWfStems.has(b.stem);
                const active = pickedWfStem === b.stem;
                return (
                  <button
                    key={b.stem}
                    type="button"
                    className={`lang-m1a__prefix-chip ${used ? "lang-m1a__prefix-chip--used" : ""} ${active ? "lang-m1a__prefix-chip--picked" : ""}`}
                    disabled={checked || used}
                    onClick={() =>
                      setPickedWfStem((p) => (p === b.stem ? null : b.stem))
                    }
                  >
                    {b.stem}
                  </button>
                );
              })}
            </div>
          </div>
          {checked && (
            <p className="pr-endings-panel__tip">
              Score: {wfScore} / {data.step3b.items.length} ·{" "}
              {data.step3b.items.map((it) => `${it.id} ${it.display}`).join(" · ")}
            </p>
          )}
        </section>
      )}

      {step === 6 && (
        <section className="card flow-card lang-m1a__panel">
          <h2 className="card-title">
            <span className="dot" />
            4a · Paraphrase sentences
          </h2>
          <p className="learn-screen__hint">
            {data.step4a.instruction} Click a stem chip, then the gap.
          </p>
          <div className="lang-m1a__para-layout">
            <ol className="lang-m1a__para">
              {data.step4a.items.map((item) => {
                const stem = paraStem[item.id] ?? "";
                const val = stem ? (paraFormByPrompt[stem] ?? "") : "";
                const ok = stem === item.prompt;
                const shown =
                  checked && !ok
                    ? item.display
                    : val || (checked ? "—" : "····");
                return (
                  <li key={item.id}>
                    <p className="lang-m1a__para-src">
                      <strong>{item.id}.</strong> {item.source}
                    </p>
                    <p className="lang-m1a__para-target">
                      {item.before}
                      <button
                        type="button"
                        className={`lang-m1a__wf-gap ${
                          checked
                            ? ok
                              ? "lang-m1a__wf-gap--ok"
                              : "lang-m1a__wf-gap--bad"
                            : val
                              ? "lang-m1a__wf-gap--filled"
                              : pickedPara
                                ? "lang-m1a__wf-gap--picked"
                                : ""
                        }`}
                        disabled={checked}
                        onClick={() => onParaGap(item.id)}
                      >
                        {shown}
                      </button>
                      {item.after}
                    </p>
                  </li>
                );
              })}
            </ol>
            <div className="lang-m1a__form-bank lang-m1a__form-bank--side">
              <p className="lang-m1a__form-bank-label">Stems</p>
              {data.step4a.items.map((item) => {
                const used = usedParaPrompts.has(item.prompt);
                const active = pickedPara === item.prompt;
                return (
                  <button
                    key={item.prompt}
                    type="button"
                    className={`lang-m1a__prefix-chip ${used ? "lang-m1a__prefix-chip--used" : ""} ${active ? "lang-m1a__prefix-chip--picked" : ""}`}
                    disabled={checked || used}
                    onClick={() =>
                      setPickedPara((p) =>
                        p === item.prompt ? null : item.prompt,
                      )
                    }
                  >
                    {item.prompt}
                  </button>
                );
              })}
            </div>
          </div>
          {checked && (
            <p className="pr-endings-panel__tip">
              Score: {paraScore} / {data.step4a.items.length} · Keys:{" "}
              {data.step4a.items
                .map((it) => `${it.id} ${it.display}`)
                .join(" · ")}
            </p>
          )}
        </section>
      )}

      {step === 7 && (
        <section className="card flow-card lang-m1a__panel">
          <h2 className="card-title">
            <span className="dot" />
            4b · Discussion
          </h2>
          <div className="lang-m1a__discuss">
            <ol className="lead-in-stack__questions lang-m1a__discuss-q">
              {data.step4b.questions.map((q, i) => (
                <li key={i}>
                  <span className="lead-in-stack__num">{i + 1}</span>
                  <span>{q}</span>
                </li>
              ))}
            </ol>
            <aside className="lang-m1a__discuss-advice">
              <p className="lang-m1a__discuss-advice-title">
                Advice from Exercise 4a
              </p>
              <ol>
                {data.step4a.items.map((item) => (
                  <li key={item.id}>
                    <p className="lang-m1a__discuss-advice-src">{item.source}</p>
                    <p className="lang-m1a__discuss-advice-para">
                      → {item.before}
                      <strong>{item.display}</strong>
                      {item.after}
                    </p>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
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
          {step + 1} / {LANG_M1A_STEPS.length}
          {checked && step !== 7 ? ` · ${scores[step]}/${totals[step]}` : ""}
        </span>
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
