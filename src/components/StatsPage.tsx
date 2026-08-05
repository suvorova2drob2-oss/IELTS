import { useMemo } from "react";
import { computeSmartStats } from "../data/practiceStats";

function formatDate(ts: number): string {
  return new Date(ts).toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function StatsPage({ onBack }: { onBack: () => void }) {
  const stats = useMemo(() => computeSmartStats(), []);

  return (
    <div className="stats-page">
      <header className="pr-hub__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Home
        </button>
        <div>
          <h1>Statistics</h1>
          <p>Practice Reading · smart overview</p>
        </div>
      </header>

      <div className="stats-page__grid">
        <section className="stats-card stats-card--hero">
          <p className="stats-card__label">Overall accuracy</p>
          <p className="stats-card__big">
            {stats.overallTotal > 0 ? `${stats.overallPct}%` : "—"}
          </p>
          <p className="stats-card__meta">
            {stats.overallScore}/{stats.overallTotal || "–"} correct ·{" "}
            {stats.attempts.length} attempt
            {stats.attempts.length === 1 ? "" : "s"}
          </p>
          <div
            className="stats-bar"
            role="progressbar"
            aria-valuenow={stats.overallPct}
          >
            <span style={{ width: `${stats.overallPct}%` }} />
          </div>
        </section>

        <section className="stats-card">
          <p className="stats-card__label">Tests covered</p>
          <p className="stats-card__big">
            {stats.testsTouched}/{stats.testsReady}
          </p>
          <p className="stats-card__meta">unique practice tests touched</p>
          <div
            className="stats-bar"
            role="progressbar"
            aria-valuenow={stats.progressPct}
          >
            <span style={{ width: `${stats.progressPct}%` }} />
          </div>
        </section>

        <section className="stats-card stats-card--wide">
          <p className="stats-card__label">Insight</p>
          <p className="stats-insight">{stats.insight}</p>
          {stats.trend !== "none" && (
            <p className="stats-card__meta">
              Trend:{" "}
              {stats.trend === "up"
                ? `↑ +${stats.trendDelta}%`
                : stats.trend === "down"
                  ? `↓ ${stats.trendDelta}%`
                  : "→ stable"}{" "}
              vs previous attempt
            </p>
          )}
        </section>

        <section className="stats-card stats-card--wide">
          <p className="stats-card__label">By skill</p>
          {stats.skills.length === 0 ? (
            <p className="stats-card__meta">No skill data yet</p>
          ) : (
            <ul className="stats-skills">
              {stats.skills.map((s) => (
                <li key={s.kind}>
                  <div className="stats-skills__row">
                    <span>{s.label}</span>
                    <strong>
                      {s.pct}% · {s.score}/{s.total}
                    </strong>
                  </div>
                  <div className="stats-bar stats-bar--thin">
                    <span style={{ width: `${s.pct}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="stats-card">
          <p className="stats-card__label">Best attempt</p>
          {stats.bestAttempt ? (
            <>
              <p className="stats-card__mid">
                {stats.bestAttempt.score}/{stats.bestAttempt.total}
              </p>
              <p className="stats-card__meta">
                {stats.bestAttempt.testTitle}
                <br />
                {formatDate(stats.bestAttempt.at)}
              </p>
            </>
          ) : (
            <p className="stats-card__meta">—</p>
          )}
        </section>

        <section className="stats-card">
          <p className="stats-card__label">Latest</p>
          {stats.latestAttempt ? (
            <>
              <p className="stats-card__mid">
                {stats.latestAttempt.score}/{stats.latestAttempt.total}
              </p>
              <p className="stats-card__meta">
                {stats.latestAttempt.testTitle}
                <br />
                {formatDate(stats.latestAttempt.at)}
              </p>
            </>
          ) : (
            <p className="stats-card__meta">—</p>
          )}
        </section>

        <section className="stats-card stats-card--wide">
          <p className="stats-card__label">Recent attempts</p>
          {stats.attempts.length === 0 ? (
            <p className="stats-card__meta">No attempts yet</p>
          ) : (
            <ul className="stats-attempts">
              {stats.attempts.slice(0, 8).map((a) => (
                <li key={a.id}>
                  <div>
                    <strong>{a.testTitle}</strong>
                    <span>{formatDate(a.at)}</span>
                  </div>
                  <em>
                    {a.score}/{a.total}
                  </em>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
