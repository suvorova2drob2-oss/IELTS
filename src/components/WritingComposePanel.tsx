import { countWords } from "./WordCountMeter";

export function WritingComposePanel({
  draft,
  onDraftChange,
  minWords,
  placeholder = "Write your answer…",
  rows = 10,
  modelAnswer,
  modelTitle = "Suggested answer",
  modelOpenLabel = "Suggested answer",
  modelCloseLabel = "Hide suggested answer",
  showModel,
  onToggleModel,
  onSave,
  savedFlash = false,
  className = "",
  textareaClassName = "write-compose__ta",
}: {
  draft: string;
  onDraftChange: (value: string) => void;
  minWords: number;
  placeholder?: string;
  rows?: number;
  modelAnswer?: string;
  modelTitle?: string;
  modelOpenLabel?: string;
  modelCloseLabel?: string;
  showModel: boolean;
  onToggleModel: () => void;
  onSave?: () => void;
  savedFlash?: boolean;
  className?: string;
  textareaClassName?: string;
}) {
  const words = countWords(draft);
  const modelParas =
    modelAnswer?.includes("\n\n") === true
      ? modelAnswer.split("\n\n")
      : modelAnswer
        ? [modelAnswer]
        : [];

  return (
    <div
      className={`write-compose${showModel && modelAnswer ? " write-compose--model" : ""} ${className}`.trim()}
    >
      <div className="write-compose__bar">
        <span className="write-compose__wc">
          <strong>{words}</strong> / {minWords} words minimum
        </span>
        <div className="write-compose__actions">
          {onSave && (
            <button
              type="button"
              className={`write-compose__btn${savedFlash ? " write-compose__btn--ok" : ""}`}
              onClick={onSave}
            >
              {savedFlash ? "Saved ✓" : "Save writing"}
            </button>
          )}
          {modelAnswer && (
            <button
              type="button"
              className="write-compose__btn"
              aria-expanded={showModel}
              onClick={onToggleModel}
            >
              {showModel ? modelCloseLabel : modelOpenLabel}
            </button>
          )}
        </div>
      </div>
      <div className="write-compose__panes">
        <textarea
          className={textareaClassName}
          value={draft}
          onChange={(e) => onDraftChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
        />
        {showModel && modelAnswer && (
          <aside className="write-compose__model">
            <strong>{modelTitle}</strong>
            {modelParas.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </aside>
        )}
      </div>
    </div>
  );
}
