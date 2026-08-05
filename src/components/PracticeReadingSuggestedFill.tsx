import { useMemo, useState } from "react";
import type { SuggestedFillItem } from "../data/practiceReadingTest1";

function norm(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

function ok(value: string, item: SuggestedFillItem): boolean {
  const n = norm(value);
  return [item.key, ...item.accept].some((a) => norm(a) === n);
}

export function PracticeReadingSuggestedFill({
  title,
  instruction,
  items,
  onContinue,
  onBack,
}: {
  title: string;
  instruction: string;
  items: SuggestedFillItem[];
  onContinue: () => void;
  onBack: () => void;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);

  const score = useMemo(
    () => items.filter((it) => ok(answers[it.id] ?? "", it)).length,
    [answers, items],
  );

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
        <ol className="pr-suggested">
          {items.map((it) => {
            const val = answers[it.id] ?? "";
            const good = ok(val, it);
            return (
              <li key={it.id}>
                <span className="pr-mc__num">{it.id}</span>
                <span className="pr-suggested__line">
                  <span>{it.prompt}</span>
                  <input
                    className={
                      checked
                        ? good
                          ? "pr-completion__input pr-completion__input--ok"
                          : "pr-completion__input pr-completion__input--bad"
                        : "pr-completion__input"
                    }
                    value={val}
                    disabled={checked}
                    placeholder="synonym…"
                    onChange={(e) =>
                      setAnswers((a) => ({ ...a, [it.id]: e.target.value }))
                    }
                  />
                  {checked && !good && (
                    <span className="inline-gap-bad"> → {it.key}</span>
                  )}
                </span>
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
            ✓ {score}/{items.length}
          </span>
        ) : (
          <span className="flow-footer__step">Suggested answers after Check</span>
        )}
        <button
          type="button"
          className="flow-footer__btn"
          onClick={() => {
            setChecked(false);
            setAnswers({});
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
