/** Visible word-count target + progress for Writing practice. */
export function WordCountMeter({
  words,
  minWords,
  label = "Minimum for this task",
}: {
  words: number;
  minWords: number;
  /** Short label under the bar, e.g. "Task 1 · exam minimum" */
  label?: string;
}) {
  const pct = Math.min(100, Math.round((words / Math.max(1, minWords)) * 100));
  const ok = words >= minWords;
  const need = Math.max(0, minWords - words);

  return (
    <div
      className={ok ? "pw-wc pw-wc--ok" : "pw-wc"}
      aria-live="polite"
      aria-label={`${words} of ${minWords} words`}
    >
      <div className="pw-wc__row">
        <strong className="pw-wc__count">
          {words}
          <span> / {minWords} words</span>
        </strong>
        <span className="pw-wc__status">
          {ok ? "✓ Goal reached" : `Need ${need} more`}
        </span>
      </div>
      <div className="pw-wc__track" aria-hidden>
        <div className="pw-wc__fill" style={{ width: `${pct}%` }} />
      </div>
      <p className="pw-wc__label">{label}</p>
    </div>
  );
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
