import { useMemo, useState } from "react";
import type { AdviceGap } from "../data/practiceReadingTest1";

type BlankRef = { gapId: number; slot: number; key: string };

function blanksFor(gaps: AdviceGap[]): BlankRef[] {
  const out: BlankRef[] = [];
  for (const g of gaps) {
    out.push({ gapId: g.id, slot: 0, key: g.key });
    g.extra?.forEach((e, i) => {
      out.push({ gapId: g.id, slot: i + 1, key: e.key });
    });
  }
  return out;
}

function blankKey(b: BlankRef): string {
  return `${b.gapId}:${b.slot}`;
}

export function PracticeReadingAdvice({
  title,
  instruction,
  wordBox,
  gaps,
  onContinue,
  onBack,
}: {
  title: string;
  instruction: string;
  wordBox: string[];
  gaps: AdviceGap[];
  onContinue: () => void;
  onBack: () => void;
}) {
  const blanks = useMemo(() => blanksFor(gaps), [gaps]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [active, setActive] = useState<string | null>(
    blanks[0] ? blankKey(blanks[0]) : null,
  );

  const used = useMemo(() => new Set(Object.values(answers)), [answers]);
  const remaining = wordBox.filter((w) => !used.has(w));

  const score = useMemo(
    () => blanks.filter((b) => answers[blankKey(b)] === b.key).length,
    [answers, blanks],
  );

  const placeWord = (word: string) => {
    if (checked || active == null) return;
    setAnswers((a) => ({ ...a, [active]: word }));
    const afterPlace = { ...answers, [active]: word };
    const next = blanks.find((b) => !afterPlace[blankKey(b)]);
    setActive(next ? blankKey(next) : active);
  };

  const renderBlank = (b: BlankRef) => {
    const id = blankKey(b);
    const val = answers[id];
    let state = "";
    if (checked && val) {
      state = val === b.key ? "pr-advice__blank--ok" : "pr-advice__blank--bad";
    } else if (active === id) {
      state = "pr-advice__blank--on";
    }
    return (
      <button
        key={id}
        type="button"
        className={`pr-advice__blank ${val ? "" : "pr-advice__blank--empty"} ${state}`}
        onClick={() => {
          if (checked) return;
          if (val) {
            setAnswers((a) => {
              const n = { ...a };
              delete n[id];
              return n;
            });
          }
          setActive(id);
        }}
      >
        {val ?? "____________"}
      </button>
    );
  };

  return (
    <div className="pr-advice">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Learn · training</span>
          <strong>{title}</strong>
        </div>
      </header>

      <div className="pr-advice__card">
        <p className="pr-advice__instruction">{instruction}</p>

        <div className="pr-advice__box">
          {remaining.map((w) => (
            <button
              key={w}
              type="button"
              className="pr-advice__chip"
              disabled={checked || active == null}
              onClick={() => placeWord(w)}
            >
              {w}
            </button>
          ))}
          {remaining.length === 0 && (
            <span className="pr-advice__box-empty">All words placed</span>
          )}
        </div>

        <ol className="pr-advice__gaps">
          {gaps.map((g) => {
            const main: BlankRef = { gapId: g.id, slot: 0, key: g.key };
            return (
              <li key={g.id}>
                <span className="pr-advice__num">{g.id}</span>
                <span>
                  {g.before}
                  {renderBlank(main)}
                  {g.extra?.map((e, i) => (
                    <span key={`${g.id}-${i}`}>
                      {e.before}
                      {renderBlank({ gapId: g.id, slot: i + 1, key: e.key })}
                    </span>
                  ))}
                  {g.after}
                </span>
                {checked &&
                  blanks
                    .filter((b) => b.gapId === g.id)
                    .map((b) =>
                      answers[blankKey(b)] !== b.key ? (
                        <span key={blankKey(b)} className="pr-advice__key">
                          → {b.key}
                        </span>
                      ) : null,
                    )}
              </li>
            );
          })}
        </ol>
      </div>

      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        {checked ? (
          <span className="flow-footer__step">
            ✓ {score}/{blanks.length}
          </span>
        ) : (
          <span className="flow-footer__step">
            Select a gap, then tap a word
          </span>
        )}
        <button
          type="button"
          className="flow-footer__btn"
          onClick={() => {
            setChecked(false);
            setAnswers({});
            setActive(blanks[0] ? blankKey(blanks[0]) : null);
          }}
        >
          Заново
        </button>
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
            onClick={onContinue}
          >
            Continue to task →
          </button>
        )}
      </footer>
    </div>
  );
}
