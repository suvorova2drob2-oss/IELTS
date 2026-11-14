import type { Dispatch, SetStateAction } from "react";

export type PhraseFlipCard = {
  en: string;
  ru: string;
  tip?: string;
  inPassage?: string;
  example?: string;
  exampleRu?: string;
};

export type PhraseFlipSection = {
  id: string;
  title: string;
  cards: PhraseFlipCard[];
};

function isRichCard(card: PhraseFlipCard): boolean {
  return !!(card.example || card.inPassage || card.exampleRu);
}

function RichCardBack({ card }: { card: PhraseFlipCard }) {
  return (
  <>
      <span className="read-m4a__flip-kicker">RU</span>
      <span className="read-m7a__flip-ru">{card.ru}</span>
      {card.inPassage && (
        <span className="read-m7a__flip-tip read-m7a__flip-passage">
          In the text: {card.inPassage}
        </span>
      )}
      {card.tip && <span className="read-m7a__flip-tip">{card.tip}</span>}
      {card.example && (
        <blockquote className="read-m7a__flip-example">{card.example}</blockquote>
      )}
      {card.exampleRu && (
        <span className="read-m7a__flip-tip read-m7a__flip-example-ru">
          {card.exampleRu}
        </span>
      )}
    </>
  );
}

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
  const allRich = cards.every(isRichCard);

  return (
    <section
      className={`read-m4a__flips read-m7a__phrase-flips ${allRich ? "read-m7a__phrase-flips--expand" : ""}`}
    >
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
      <div
        className={`read-m4a__flip-grid ${allRich ? "read-m7a__phrase-grid--expand" : "read-m7a__phrase-grid--full"}`}
      >
        {cards.map((card, i) => {
          const on = !!flipped[i];
          const rich = isRichCard(card);

          if (rich) {
            return (
              <button
                key={`${i}-${card.en}`}
                type="button"
                className={`read-m7a__phrase-expand ${on ? "read-m7a__phrase-expand--on" : ""}`}
                aria-pressed={on}
                onClick={() =>
                  setFlipped((prev) => ({ ...prev, [i]: !prev[i] }))
                }
              >
                <span className="read-m7a__phrase-expand-front">
                  <span className="read-m4a__flip-kicker">{i + 1}</span>
                  {card.en}
                </span>
                {on && (
                  <span className="read-m7a__phrase-expand-back">
                    <RichCardBack card={card} />
                  </span>
                )}
              </button>
            );
          }

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
                  {card.tip && (
                    <span className="read-m7a__flip-tip">{card.tip}</span>
                  )}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}