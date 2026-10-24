import type { Dispatch, SetStateAction } from "react";

export type PhraseFlipCard = { en: string; ru: string; tip: string };

export type PhraseFlipSection = {
  id: string;
  title: string;
  cards: PhraseFlipCard[];
};

export function PhraseFlipBoard({
  badge,
  instruction,
  sections,
  flipped,
  setFlipped,
}: {
  badge: string;
  instruction: string;
  sections: PhraseFlipSection[];
  flipped: Record<number, boolean>;
  setFlipped: Dispatch<SetStateAction<Record<number, boolean>>>;
}) {
  const cards = sections.flatMap((s) => s.cards);

  return (
    <section className="read-m4a__flips read-m7a__phrase-flips">
      <p className="read-m3__instr read-m7a__phrase-instr">
        <span className="write-m2a__badge">{badge}</span>
        {instruction}
      </p>
      <div className="read-m7a__phrase-bands">
        {sections.map((sec) => (
          <span key={sec.id} className="read-m7a__phrase-band">
            {sec.title}
          </span>
        ))}
      </div>
      <div className="read-m4a__flip-grid read-m7a__phrase-grid--full">
        {cards.map((card, i) => {
          const on = !!flipped[i];
          return (
            <button
              key={`${i}-${card.en}`}
              type="button"
              className={`read-m4a__flip ${on ? "read-m4a__flip--on" : ""}`}
              aria-pressed={on}
              onClick={() => setFlipped((prev) => ({ ...prev, [i]: !prev[i] }))}
            >
              <span className="read-m4a__flip-inner">
                <span className="read-m4a__flip-face">
                  <span className="read-m4a__flip-kicker">{i + 1}</span>
                  {card.en}
                </span>
                <span className="read-m4a__flip-face read-m4a__flip-back">
                  <span className="read-m4a__flip-kicker">RU</span>
                  <span>{card.ru}</span>
                  <span className="read-m7a__flip-tip">{card.tip}</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
