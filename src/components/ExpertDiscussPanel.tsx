import { useState, type ReactNode } from "react";

export type ExpertDiscussPanelProps = {
  badge?: string;
  heading?: string;
  instruction: string;
  cue?: string;
  questions?: readonly string[];
  options?: readonly string[];
  topics?: readonly string[];
  statements?: readonly string[];
  suggestedTitle?: string;
  suggestedAnswer?: string | readonly string[];
  languageFocus?: readonly string[];
  children?: ReactNode;
  /** centered — full-step card; panel — inside an existing panel; inline — compact block */
  variant?: "centered" | "panel" | "inline";
  className?: string;
};

function toParagraphs(answer: string | readonly string[]): string[] {
  return typeof answer === "string" ? [answer] : [...answer];
}

function NumberedList({
  items,
  className,
}: {
  items: readonly string[];
  className: string;
}) {
  return (
    <ol className={className}>
      {items.map((item, i) => (
        <li key={i}>
          <span className="ex-discuss__list-n">{i + 1}</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

export function ExpertDiscussPanel({
  badge,
  heading,
  instruction,
  cue = "Discuss with a partner",
  questions,
  options,
  topics,
  statements,
  suggestedTitle = "Suggested answer",
  suggestedAnswer,
  languageFocus,
  children,
  variant = "centered",
  className = "",
}: ExpertDiscussPanelProps) {
  const [showSuggested, setShowSuggested] = useState(false);
  const listItems = questions ?? options ?? topics ?? statements;
  const listClass =
    options != null
      ? "ex-discuss__opts"
      : topics != null
        ? "ex-discuss__topics"
        : "ex-discuss__questions";
  const paras = suggestedAnswer ? toParagraphs(suggestedAnswer) : null;

  const card = (
    <article className="ex-discuss__card">
      {badge != null && (
        <span className="ex-discuss__num" aria-hidden>
          {badge}
        </span>
      )}
      <p className="ex-discuss__q">{instruction}</p>
      {listItems != null && listItems.length > 0 && (
        <NumberedList items={listItems} className={listClass} />
      )}
      {children && <div className="ex-discuss__extra">{children}</div>}
      {cue && <p className="ex-discuss__cue">{cue}</p>}
    </article>
  );

  const suggestedBlock = paras && (
    <>
      <button
        type="button"
        className={`ex-discuss__toggle ${showSuggested ? "ex-discuss__toggle--open" : ""}`}
        aria-expanded={showSuggested}
        onClick={() => setShowSuggested((open) => !open)}
      >
        {showSuggested ? "Hide suggested answer" : suggestedTitle}
      </button>
      {showSuggested && (
        <aside className="ex-discuss__suggested">
          {paras.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
          {languageFocus && languageFocus.length > 0 && (
            <div className="ex-discuss__language">
              <strong>IELTS language</strong>
              <div className="ex-discuss__language-chips">
                {languageFocus.map((phrase) => (
                  <span key={phrase}>{phrase}</span>
                ))}
              </div>
            </div>
          )}
        </aside>
      )}
    </>
  );

  if (variant === "inline") {
    return (
      <div
        className={`ex-discuss ex-discuss--inline ${showSuggested ? "ex-discuss--open" : ""} ${className}`.trim()}
      >
        {heading && <h2 className="ex-discuss__heading">{heading}</h2>}
        {badge != null && !card ? null : (
          <>
            <p className="ex-discuss__instr">
              {badge != null && (
                <span className="ex-discuss__badge">{badge}</span>
              )}
              {instruction}
            </p>
            {listItems != null && listItems.length > 0 && (
              <NumberedList items={listItems} className={listClass} />
            )}
            {children}
            {cue && <p className="ex-discuss__cue ex-discuss__cue--inline">{cue}</p>}
          </>
        )}
        {suggestedBlock}
      </div>
    );
  }

  if (variant === "panel") {
    return (
      <div
        className={`ex-discuss ex-discuss--panel ${showSuggested ? "ex-discuss--open" : ""} ${className}`.trim()}
      >
        {heading && <h2 className="ex-discuss__heading">{heading}</h2>}
        <p className="ex-discuss__instr">
          {badge != null && <span className="ex-discuss__badge">{badge}</span>}
          {instruction}
        </p>
        {listItems != null && listItems.length > 0 && (
          <NumberedList items={listItems} className={listClass} />
        )}
        {children}
        {cue && <p className="ex-discuss__cue ex-discuss__cue--panel">{cue}</p>}
        {suggestedBlock}
      </div>
    );
  }

  return (
    <section
      className={`ex-discuss ex-discuss--centered ${showSuggested ? "ex-discuss--open" : ""} ${className}`.trim()}
    >
      <div className="ex-discuss__stage">
        <div className="ex-discuss__stack">
          {heading && (
            <h2 className="ex-discuss__heading ex-discuss__heading--stack">
              {heading}
            </h2>
          )}
          {card}
          {suggestedBlock}
        </div>
      </div>
    </section>
  );
}
