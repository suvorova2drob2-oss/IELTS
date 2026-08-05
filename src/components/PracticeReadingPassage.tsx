import type { PassageParagraph } from "../data/practiceReadingTest1";

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightText(text: string, terms: string[], active: boolean) {
  if (!active || terms.length === 0) return text;
  const sorted = [...terms].sort((a, b) => b.length - a.length);
  const regex = new RegExp(`(${sorted.map(escapeRegex).join("|")})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    sorted.some((t) => part.toLowerCase() === t.toLowerCase()) ? (
      <mark key={i} className="passage-evidence">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function PracticeReadingPassage({
  readingLabel,
  passageTitle,
  paragraphs,
  evidence = [],
  highlight = false,
  focusParagraphId,
  showParagraphIds = true,
}: {
  readingLabel: string;
  passageTitle: string;
  paragraphs: PassageParagraph[];
  evidence?: string[];
  highlight?: boolean;
  focusParagraphId?: string | null;
  showParagraphIds?: boolean;
}) {
  return (
    <div className="pr-exam__passage">
      <p className="pr-exam__col-label">{readingLabel}</p>
      <article className="pr-exam__article">
        <h2>{passageTitle}</h2>
        {paragraphs.map((p) => (
          <p
            key={p.id}
            className={[
              "pr-para",
              !showParagraphIds ? "pr-para--plain" : "",
              focusParagraphId === p.id ? "pr-para--on" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {showParagraphIds && (
              <strong className="pr-para__id">{p.id}</strong>
            )}
            {highlightText(p.text, evidence, highlight)}
          </p>
        ))}
      </article>
    </div>
  );
}
