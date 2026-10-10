import { useMemo, useState } from "react";
import type { Question } from "../data/leadInIntelligence";

/** Module 4 p. 55 — blue / green responsible spender quiz (coursebook layout). */
export function LeadInConsumerQuiz({
  classify,
}: {
  classify: NonNullable<Question["classify"]>;
}) {
  const [ticked, setTicked] = useState<Record<string, boolean>>({});

  const { blueItems, greenItems } = useMemo(() => {
    const blueItems = classify.items.filter((it) => it.key === 0);
    const greenItems = classify.items.filter((it) => it.key === 1);
    return { blueItems, greenItems };
  }, [classify.items]);

  const blueCount = blueItems.filter((it) => ticked[it.id]).length;
  const greenCount = greenItems.filter((it) => ticked[it.id]).length;

  const toggle = (id: string) => {
    setTicked((t) => ({ ...t, [id]: !t[id] }));
  };

  const renderColumn = (
    tone: "blue" | "green",
    title: string,
    items: typeof classify.items,
  ) => (
    <div
      className={`lead-in-consumer-quiz__col lead-in-consumer-quiz__col--${tone}`}
    >
      <h2 className="lead-in-consumer-quiz__col-title">{title}</h2>
      <ul className="lead-in-consumer-quiz__list">
        {items.map((it) => {
          const on = !!ticked[it.id];
          return (
            <li key={it.id}>
              <button
                type="button"
                className={`lead-in-consumer-quiz__row${on ? " lead-in-consumer-quiz__row--on" : ""}`}
                aria-pressed={on}
                onClick={() => toggle(it.id)}
              >
                <span
                  className={`lead-in-consumer-quiz__box${on ? " lead-in-consumer-quiz__box--on" : ""}`}
                  aria-hidden
                />
                <span className="lead-in-consumer-quiz__text">{it.text}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <div className="lead-in-consumer-quiz">
      <p className="lead-in-consumer-quiz__heading">
        Are you a responsible spender?
      </p>
      <p className="lead-in-consumer-quiz__sub">
        Tick the statements that describe you. Then count how many blue boxes and
        how many green boxes you ticked.
      </p>
      <div className="lead-in-consumer-quiz__grid">
        {renderColumn("blue", classify.labels[0], blueItems)}
        {renderColumn("green", classify.labels[1], greenItems)}
      </div>
      <p className="lead-in-consumer-quiz__totals" aria-live="polite">
        Blue ticks: <strong>{blueCount}</strong> · Green ticks:{" "}
        <strong>{greenCount}</strong>
      </p>
    </div>
  );
}
