export interface TaskScore {
  label: string;
  score: number;
  total: number;
}

export function PracticeReadingResults({
  testTitle,
  tasks,
  onBackToTests,
  onNextTest,
  nextTestLabel,
  nextTestReady,
  footerStep = "Exam complete",
}: {
  testTitle: string;
  tasks: TaskScore[];
  onBackToTests: () => void;
  onNextTest?: () => void;
  nextTestLabel?: string;
  nextTestReady?: boolean;
  footerStep?: string;
}) {
  const score = tasks.reduce((s, t) => s + t.score, 0);
  const total = tasks.reduce((s, t) => s + t.total, 0);

  return (
    <div className="pr-results">
      <header className="pr-hub__chrome">
        <button type="button" className="back-link" onClick={onBackToTests}>
          ← All tests
        </button>
        <div>
          <h1>Results</h1>
          <p>{testTitle}</p>
        </div>
      </header>

      <div className="pr-results__card">
        <p className="pr-results__total">
          <strong>
            {score}/{total}
          </strong>
          <span>overall</span>
        </p>
        <ul className="pr-results__list">
          {tasks.map((t) => (
            <li key={t.label}>
              <span>{t.label}</span>
              <strong>
                {t.score}/{t.total}
              </strong>
            </li>
          ))}
        </ul>
      </div>

      <footer className="flow-footer">
        <button
          type="button"
          className="flow-footer__btn"
          onClick={onBackToTests}
        >
          ← All tests
        </button>
        <span className="flow-footer__step">{footerStep}</span>
        {onNextTest && (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            disabled={!nextTestReady}
            onClick={onNextTest}
          >
            {nextTestReady
              ? (nextTestLabel ?? "Practice Test 2 →")
              : "Test 2 · Soon"}
          </button>
        )}
      </footer>
    </div>
  );
}
