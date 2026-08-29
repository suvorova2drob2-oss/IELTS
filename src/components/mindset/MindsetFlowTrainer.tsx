import { useEffect, useState, type ReactNode } from "react";
import type {
  FlowStep,
  GapItem,
  KeysItem,
  MatchItem,
  McItem,
  MindsetFlowData,
  YnngItem,
} from "../../data/mindset/flowTypes";
import { WordCountMeter, countWords } from "../WordCountMeter";
import {
  MsBarPairGraph,
  MsPiePairGraph,
  MS_U5_WORKFORCE_BARS,
  MS_U7_NEWS_PIES,
} from "./MsTask1Charts";
import { chipExhausted, gapChipExhausted } from "./bankChipUse";

function norm(s: string): string {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

function matchesKey(val: string, key: string, alts?: string[]): boolean {
  const n = norm(val);
  return [key, ...(alts ?? [])].some((k) => norm(k) === n);
}

export function MindsetFlowTrainer({
  data,
  onBack,
  restart,
  initialStep,
}: {
  data: MindsetFlowData;
  onBack?: () => void;
  restart?: boolean;
  initialStep?: number;
}) {
  const steps = data.steps;
  const panels = data.panels;

  function clampStep(n: number | undefined): number {
    if (n == null || Number.isNaN(n)) return 0;
    return Math.max(0, Math.min(n, steps.length - 1));
  }

  const [step, setStep] = useState(() => clampStep(initialStep));
  const [checked, setChecked] = useState(false);
  const [mcPick, setMcPick] = useState<Record<string, string>>({});
  const [multiPick, setMultiPick] = useState<Record<string, string[]>>({});
  const [ynngPick, setYnngPick] = useState<Record<string, string>>({});
  const [matchPick, setMatchPick] = useState<Record<string, string>>({});
  const [pickedMatch, setPickedMatch] = useState<string | null>(null);
  const [gapPick, setGapPick] = useState<Record<string, string>>({});
  const [pickedGap, setPickedGap] = useState<string | null>(null);
  const [oddPick, setOddPick] = useState<Record<string, string>>({});
  const [draft, setDraft] = useState("");
  const [showSample, setShowSample] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const resetAnswers = () => {
    setChecked(false);
    setMcPick({});
    setMultiPick({});
    setYnngPick({});
    setMatchPick({});
    setPickedMatch(null);
    setGapPick({});
    setPickedGap(null);
    setOddPick({});
    setDraft("");
    setShowSample(false);
    setShowTips(false);
  };

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    resetAnswers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restart, initialStep]);

  const panel: FlowStep | undefined = panels[step];

  const scoreable =
    panel &&
    (panel.kind === "mc" ||
      panel.kind === "ynng" ||
      panel.kind === "match" ||
      panel.kind === "gaps" ||
      panel.kind === "oddOut" ||
      panel.kind === "passageExam" ||
      panel.kind === "keysOnly");

  const scorePanel = (p: FlowStep): { score: number; total: number } => {
    if (p.kind === "mc") {
      let score = 0;
      let total = 0;
      const multiIds = new Set(Object.keys(p.multiKeys ?? {}));
      if (p.multi && p.multiKeys) {
        for (const [id, keys] of Object.entries(p.multiKeys)) {
          total += keys.length;
          const chosen = new Set(multiPick[id] ?? []);
          for (const k of keys) if (chosen.has(k)) score += 1;
        }
      }
      for (const it of p.items) {
        if (multiIds.has(it.id)) continue;
        total += 1;
        if (mcPick[it.id] === it.key) score += 1;
      }
      return { score, total };
    }
    if (p.kind === "ynng") {
      let score = 0;
      for (const it of p.items) if (ynngPick[it.id] === it.key) score += 1;
      return { score, total: p.items.length };
    }
    if (p.kind === "match") {
      let score = 0;
      for (const it of p.items) if (matchPick[it.id] === it.key) score += 1;
      return { score, total: p.items.length };
    }
    if (p.kind === "gaps" || p.kind === "keysOnly") {
      const items = p.items as (GapItem | KeysItem)[];
      let score = 0;
      for (const it of items) {
        if (matchesKey(gapPick[it.id] ?? "", it.key, it.altKeys)) score += 1;
      }
      let total = items.length;
      if (p.kind === "keysOnly" && p.mc) {
        for (const it of p.mc) {
          total += 1;
          if (mcPick[it.id] === it.key) score += 1;
        }
      }
      return { score, total };
    }
    if (p.kind === "oddOut") {
      let score = 0;
      for (const g of p.groups) if (oddPick[g.id] === g.key) score += 1;
      return { score, total: p.groups.length };
    }
    if (p.kind === "passageExam") {
      let score = 0;
      let total = 0;
      if (p.ynng) {
        total += p.ynng.items.length;
        for (const it of p.ynng.items)
          if (ynngPick[it.id] === it.key) score += 1;
      }
      if (p.match) {
        total += p.match.items.length;
        for (const it of p.match.items)
          if (matchPick[it.id] === it.key) score += 1;
      }
      if (p.mc) {
        total += p.mc.items.length;
        for (const it of p.mc.items) if (mcPick[it.id] === it.key) score += 1;
      }
      if (p.gaps) {
        total += p.gaps.items.length;
        for (const it of p.gaps.items) {
          if (matchesKey(gapPick[it.id] ?? "", it.key, it.altKeys)) score += 1;
        }
      }
      return { score, total };
    }
    return { score: 0, total: 0 };
  };

  const { score, total } = panel ? scorePanel(panel) : { score: 0, total: 0 };
  const needsCheck = Boolean(scoreable && total > 0);

  const placeMatch = (itemId: string) => {
    if (checked) return;
    if (matchPick[itemId]) {
      setMatchPick((m) => {
        const next = { ...m };
        delete next[itemId];
        return next;
      });
      return;
    }
    if (!pickedMatch) return;
    setMatchPick((m) => ({ ...m, [itemId]: pickedMatch }));
    setPickedMatch(null);
  };

  const placeGap = (itemId: string) => {
    if (checked) return;
    if (gapPick[itemId]) {
      setGapPick((g) => {
        const next = { ...g };
        delete next[itemId];
        return next;
      });
      return;
    }
    if (!pickedGap) return;
    setGapPick((g) => ({ ...g, [itemId]: pickedGap }));
    setPickedGap(null);
  };

  const matchKeysNeeded = (items: MatchItem[]) => items.map((it) => it.key);
  const matchPlaced = () => Object.values(matchPick);

  const goPrev = () => {
    if (step === 0) {
      onBack?.();
      return;
    }
    setChecked(false);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= steps.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowSample(false);
    setShowTips(false);
    setStep((s) => s + 1);
  };

  const nextLabel =
    needsCheck && !checked ? "Check →" : (data.nextLabels[step] ?? "Next →");

  const mcList = (
    items: McItem[],
    picks: Record<string, string>,
    set: (id: string, v: string) => void,
  ) => (
    <div className="ms-mc-grid">
      {items.map((it) => (
        <div key={it.id} className="ms-mc-card">
          <p className="ms-mc-card__stem">
            <strong>{it.id}.</strong> {it.stem}
          </p>
          <ul className="read-m3__opts">
            {it.options.map((opt) => {
              let state = "";
              if (checked) {
                if (opt.id === it.key) state = "read-m3__opt--ok";
                else if (picks[it.id] === opt.id) state = "read-m3__opt--bad";
              } else if (picks[it.id] === opt.id) state = "read-m3__opt--on";
              return (
                <li key={opt.id}>
                  <button
                    type="button"
                    className={`read-m3__opt ${state}`}
                    disabled={checked}
                    onClick={() => set(it.id, opt.id)}
                  >
                    <strong>{opt.id}.</strong> {opt.text}
                  </button>
                </li>
              );
            })}
          </ul>
          {checked && it.tip && (
            <p className="ms-mc-card__stem" style={{ marginTop: 6, opacity: 0.9 }}>
              {it.tip}
            </p>
          )}
        </div>
      ))}
    </div>
  );

  const ynngList = (items: YnngItem[], labels: string[]) => (
    <ul className="read-m3__qs">
      {items.map((it) => (
        <li key={it.id}>
          <p>
            <strong>{it.id}.</strong> {it.stem}
          </p>
          <div className="pr-chip-bank">
            {labels.map((lab) => {
              let cls = "pr-chip";
              if (checked) {
                if (lab === it.key) cls += " pr-chip--ok";
                else if (ynngPick[it.id] === lab) cls += " pr-chip--bad";
              } else if (ynngPick[it.id] === lab) cls += " pr-chip--on";
              return (
                <button
                  key={lab}
                  type="button"
                  className={cls}
                  disabled={checked}
                  onClick={() =>
                    setYnngPick((m) => ({ ...m, [it.id]: lab }))
                  }
                >
                  {lab}
                </button>
              );
            })}
          </div>
          {checked && it.tip && <p className="read-m3__hint">{it.tip}</p>}
        </li>
      ))}
    </ul>
  );

  const matchBlock = (
    bank: { id: string; text: string }[],
    items: MatchItem[],
    _bankReuse = false,
  ) => (
    <>
      <div className="pr-chip-bank">
        {bank.map((b) => {
          const used = chipExhausted(
            b.id,
            matchKeysNeeded(items),
            matchPlaced(),
          );
          return (
            <button
              key={b.id}
              type="button"
              className={`pr-chip ${pickedMatch === b.id ? "pr-chip--on" : ""} ${used ? "pr-chip--used" : ""}`}
              disabled={checked || used}
              onClick={() => setPickedMatch(b.id)}
            >
              {b.text === b.id ? (
                <strong>{b.id}</strong>
              ) : (
                <>
                  <strong>{b.id}</strong> {b.text}
                </>
              )}
            </button>
          );
        })}
      </div>
      <ul className="read-m3__qs">
        {items.map((it) => {
          const ok = matchPick[it.id] === it.key;
          const picked = matchPick[it.id];
          const bankItem = bank.find((b) => b.id === picked);
          const gapLabel = !picked
            ? "___"
            : bankItem && bankItem.text !== bankItem.id
              ? `${bankItem.id} · ${bankItem.text}`
              : picked;
          return (
            <li key={it.id}>
              <strong>{it.id}.</strong> {it.stem}{" "}
              <button
                type="button"
                className={`inline-gap ${checked ? (ok ? "inline-gap-ok" : "inline-gap-bad") : ""}`}
                disabled={checked}
                onClick={() => placeMatch(it.id)}
              >
                {gapLabel}
              </button>
              {checked && !ok && (
                <span className="inline-gap-bad"> → {it.key}</span>
              )}
              {checked && it.tip && (
                <p className="read-m3__hint">{it.tip}</p>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );

  const gapsBlock = (bank: string[], items: GapItem[] | KeysItem[]) => (
    <>
      <div className="pr-chip-bank">
        {bank.map((w) => {
          const used = gapChipExhausted(
            w,
            items,
            Object.values(gapPick),
            norm,
          );
          return (
            <button
              key={w}
              type="button"
              className={`pr-chip ${pickedGap === w ? "pr-chip--on" : ""} ${used ? "pr-chip--used" : ""}`}
              disabled={checked || used}
              onClick={() => setPickedGap(w)}
            >
              {w}
            </button>
          );
        })}
      </div>
      <ul className="read-m3__qs">
        {items.map((it) => {
          const label = "label" in it ? it.label : it.stem;
          const ok = matchesKey(gapPick[it.id] ?? "", it.key, it.altKeys);
          return (
            <li key={it.id}>
              <strong>{it.id}.</strong> {label}{" "}
              <button
                type="button"
                className={`inline-gap ${checked ? (ok ? "inline-gap-ok" : "inline-gap-bad") : ""}`}
                disabled={checked}
                onClick={() => placeGap(it.id)}
              >
                {gapPick[it.id] ?? "___"}
              </button>
              {checked && !ok && (
                <span className="inline-gap-bad"> → {it.key}</span>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );

  const examShell = (
    passage: string | undefined,
    _title: string | undefined,
    body: ReactNode,
  ) => {
    if (!passage) {
      return (
        <section className="read-m3__panel">
          {body}
        </section>
      );
    }
    return (
      <section className="read-m3__split read-m3__split--exam">
        <article className="read-m3__passage">
          <header className="read-m3__passage-label">
            <h2>Reading passage</h2>
            <p>Use this text to answer the questions on the right.</p>
          </header>
          <p style={{ whiteSpace: "pre-wrap", margin: 0 }}>{passage}</p>
        </article>
        <aside className="read-m3__side read-m3__side--exam">{body}</aside>
      </section>
    );
  };

  const renderPanel = (p: FlowStep) => {
    switch (p.kind) {
      case "intro":
        return (
          <section className="read-m3__panel">
            {(p.goals ?? data.unitGoals).length > 0 && (
              <>
                <div className="ms-unit-goals">
                <p className="ms-unit-goals__title">In this unit you will learn how to</p>
                <ul className="ms-unit-goals__list">
                  {(p.goals ?? data.unitGoals).map((g) => (
                    <li key={g}>{g}</li>
                  ))}
                </ul>
              </div>
              </>
            )}
            {p.instruction && (
              <p className="read-m3__instr">
                {p.badge && (
                  <span className="write-m2a__badge">{p.badge}</span>
                )}
                {p.instruction}
              </p>
            )}
            {p.passage && (
              <article className="read-m3__passage read-m3__passage--solo">
                <p style={{ whiteSpace: "pre-wrap" }}>{p.passage}</p>
              </article>
            )}
            {p.discuss && (
              <ol className="read-m3__qs">
                {p.discuss.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ol>
            )}
            {p.tips && p.tips.length > 0 && (
              <>
                <button
                  type="button"
                  className="pr-chip"
                  onClick={() => setShowTips((v) => !v)}
                >
                  {showTips ? "Hide tips" : "Show tips / sample answers"}
                </button>
                {showTips && (
                  <ul className="read-m3__qs" style={{ marginTop: 8 }}>
                    {p.tips.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </section>
        );
      case "mc":
        return examShell(
          p.passage,
          p.badge,
          <>
            <p className="read-m3__instr">
              {p.badge && (
                <span className="write-m2a__badge">{p.badge}</span>
              )}
              {p.instruction}
            </p>
            {p.tip && <p className="write-m2a__cue">{p.tip}</p>}
            {p.items.map((it) => {
              const multiKeys = p.multiKeys?.[it.id];
              if (p.multi && multiKeys) {
                const keys = new Set(multiKeys);
                const chosen = new Set(multiPick[it.id] ?? []);
                return (
                  <div key={it.id} className="ms-mc-card" style={{ marginBottom: 8 }}>
                    <p className="ms-mc-card__stem">
                      <strong>{it.id}.</strong> {it.stem}
                    </p>
                    <ul className="read-m3__opts">
                      {it.options.map((opt) => {
                        const on = chosen.has(opt.id);
                        let state = on ? "read-m3__opt--on" : "";
                        if (checked) {
                          if (keys.has(opt.id) && on)
                            state = "read-m3__opt--ok";
                          else if (keys.has(opt.id) && !on)
                            state = "read-m3__opt--bad";
                          else if (!keys.has(opt.id) && on)
                            state = "read-m3__opt--bad";
                        }
                        return (
                          <li key={opt.id}>
                            <button
                              type="button"
                              className={`read-m3__opt ${state}`}
                              disabled={checked}
                              onClick={() => {
                                setMultiPick((m) => {
                                  const cur = new Set(m[it.id] ?? []);
                                  if (cur.has(opt.id)) cur.delete(opt.id);
                                  else cur.add(opt.id);
                                  return { ...m, [it.id]: [...cur] };
                                });
                              }}
                            >
                              <strong>{opt.id}.</strong> {opt.text}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                    {checked && (
                      <p className="ms-mc-card__stem" style={{ marginTop: 6 }}>
                        Keys: {[...keys].join(", ")}
                      </p>
                    )}
                  </div>
                );
              }
              return (
                <div key={it.id}>
                  {mcList([it], mcPick, (id, v) =>
                    setMcPick((m) => ({ ...m, [id]: v })),
                  )}
                </div>
              );
            })}
          </>,
        );
      case "ynng":
        return examShell(
          p.passage,
          p.badge,
          <>
            <p className="read-m3__instr">
              {p.badge && (
                <span className="write-m2a__badge">{p.badge}</span>
              )}
              {p.instruction}
            </p>
            {p.tip && <p className="write-m2a__cue">{p.tip}</p>}
            {ynngList(
              p.items,
              p.labels ?? ["Yes", "No", "Not Given"],
            )}
          </>,
        );
      case "match":
        return examShell(
          p.passage,
          p.badge,
          <>
            <p className="read-m3__instr">
              {p.badge && (
                <span className="write-m2a__badge">{p.badge}</span>
              )}
              {p.instruction}
            </p>
            {p.tip && <p className="write-m2a__cue">{p.tip}</p>}
            {matchBlock(p.bank, p.items, Boolean(p.bankReuse))}
          </>,
        );
      case "gaps":
        return examShell(
          p.passage,
          p.badge,
          <>
            <p className="read-m3__instr">
              {p.badge && (
                <span className="write-m2a__badge">{p.badge}</span>
              )}
              {p.instruction}
            </p>
            {p.tip && <p className="write-m2a__cue">{p.tip}</p>}
            {gapsBlock(p.bank, p.items)}
          </>,
        );
      case "oddOut":
        return (
          <section className="read-m3__panel">
            <p className="read-m3__instr">
              {p.badge && (
                <span className="write-m2a__badge">{p.badge}</span>
              )}
              {p.instruction}
            </p>
            {p.tip && <p className="write-m2a__cue">{p.tip}</p>}
            <ul className="read-m3__qs">
              {p.groups.map((g) => (
                <li key={g.id}>
                  <p>
                    <strong>{g.id}.</strong>{" "}
                    {g.words.join(" · ")}
                  </p>
                  <div className="pr-chip-bank">
                    {g.words.map((w) => {
                      let cls = "pr-chip";
                      if (checked) {
                        if (w === g.key) cls += " pr-chip--ok";
                        else if (oddPick[g.id] === w) cls += " pr-chip--bad";
                      } else if (oddPick[g.id] === w) cls += " pr-chip--on";
                      return (
                        <button
                          key={w}
                          type="button"
                          className={cls}
                          disabled={checked}
                          onClick={() =>
                            setOddPick((m) => ({ ...m, [g.id]: w }))
                          }
                        >
                          {w}
                        </button>
                      );
                    })}
                  </div>
                  {checked && (
                    <p className="read-m3__hint">{g.reason}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        );
      case "passageExam":
        return (
          <section className="read-m3__split read-m3__split--exam">
            <article className="read-m3__passage">
              <header className="read-m3__passage-label">
                <h2>Reading passage</h2>
                <p>Use this text to answer the questions on the right.</p>
              </header>
              <p style={{ whiteSpace: "pre-wrap", margin: 0 }}>{p.passage}</p>
            </article>
            <aside className="read-m3__side read-m3__side--exam">
              <p className="read-m3__instr">{p.instruction}</p>
              {p.ynng && (
                <>
                  <p className="read-m3__instr read-m3__instr--mt">
                    {p.ynng.instruction}
                  </p>
                  {ynngList(p.ynng.items, ["Yes", "No", "Not Given"])}
                </>
              )}
              {p.match && (
                <>
                  <p className="read-m3__instr read-m3__instr--mt">
                    {p.match.instruction}
                  </p>
                  {matchBlock(p.match.bank, p.match.items)}
                </>
              )}
              {p.mc && (
                <>
                  <p className="read-m3__instr read-m3__instr--mt">
                    {p.mc.instruction}
                  </p>
                  {mcList(p.mc.items, mcPick, (id, v) =>
                    setMcPick((m) => ({ ...m, [id]: v })),
                  )}
                </>
              )}
              {p.gaps && (
                <>
                  <p className="read-m3__instr read-m3__instr--mt">
                    {p.gaps.instruction}
                  </p>
                  {gapsBlock(p.gaps.bank, p.gaps.items)}
                </>
              )}
            </aside>
          </section>
        );
      case "writing":
        return (
          <section className="read-m3__panel">
            <p className="read-m3__instr">
              {p.badge && (
                <span className="write-m2a__badge">{p.badge}</span>
              )}
              {p.instruction}
            </p>
            {p.cue && <p className="write-m2a__cue">{p.cue}</p>}
            <article className="read-m3__passage read-m3__passage--solo">
              <p style={{ whiteSpace: "pre-wrap" }}>{p.prompt}</p>
              {p.chart === "u5-workforce-bars" && (
                <MsBarPairGraph
                  title={MS_U5_WORKFORCE_BARS.title}
                  groups={MS_U5_WORKFORCE_BARS.groups}
                  series={MS_U5_WORKFORCE_BARS.series}
                />
              )}
              {p.chart === "u7-news-pies" && (
                <MsPiePairGraph
                  title={MS_U7_NEWS_PIES.title}
                  left={MS_U7_NEWS_PIES.left}
                  right={MS_U7_NEWS_PIES.right}
                />
              )}
              {p.tableNote && (
                <p className="write-m2a__cue">{p.tableNote}</p>
              )}
            </article>
            <WordCountMeter
              words={countWords(draft)}
              minWords={p.minWords}
              label={`Writing · minimum ${p.minWords} words`}
            />
            <textarea
              className="write-m2a__area"
              rows={10}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Write your answer here…"
            />
            <button
              type="button"
              className="pr-chip"
              onClick={() => setShowSample((v) => !v)}
            >
              {showSample ? "Hide sample answer" : "Show sample answer"}
            </button>
            {showSample && (
              <article
                className="read-m3__passage read-m3__passage--solo"
                style={{ marginTop: 8 }}
              >
                <p style={{ whiteSpace: "pre-wrap" }}>{p.sample}</p>
              </article>
            )}
          </section>
        );
      case "keysOnly":
        return (
          <section className="read-m3__panel">
            <p className="read-m3__instr">
              {p.badge && (
                <span className="write-m2a__badge">{p.badge}</span>
              )}
              {p.instruction}
            </p>
            {p.note && (
              <p className="write-m2a__cue">
                Keys-only practice (no audio). Place answers from the bank.
              </p>
            )}
            {p.tip && <p className="write-m2a__cue">{p.tip}</p>}
            {gapsBlock(p.bank, p.items)}
            {p.mc &&
              mcList(p.mc, mcPick, (id, v) =>
                setMcPick((m) => ({ ...m, [id]: v })),
              )}
          </section>
        );
      case "speak":
        return (
          <section className="read-m3__panel">
            <p className="read-m3__instr">
              {p.badge && (
                <span className="write-m2a__badge">{p.badge}</span>
              )}
              {p.instruction}
            </p>
            {p.card && (
              <article className="read-m3__passage read-m3__passage--solo">
                <p style={{ whiteSpace: "pre-wrap" }}>{p.card}</p>
              </article>
            )}
            {p.prompts && (
              <ol className="read-m3__qs">
                {p.prompts.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ol>
            )}
            {p.tips && (
              <ul className="read-m3__qs">
                {p.tips.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            )}
            {p.samples && (
              <>
                <button
                  type="button"
                  className="pr-chip"
                  onClick={() => setShowSample((v) => !v)}
                >
                  {showSample ? "Hide samples" : "Show sample ideas"}
                </button>
                {showSample && (
                  <ul className="read-m3__qs" style={{ marginTop: 8 }}>
                    {p.samples.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </section>
        );
      case "reveal":
        return (
          <section className="read-m3__panel">
            <p className="read-m3__instr">
              {p.badge && (
                <span className="write-m2a__badge">{p.badge}</span>
              )}
              {p.instruction}
            </p>
            <button
              type="button"
              className="pr-chip"
              onClick={() => setShowTips((v) => !v)}
            >
              {showTips ? "Hide key points" : "Show key points"}
            </button>
            {showTips &&
              p.blocks.map((b) => (
                <div key={b.title} style={{ marginTop: 8 }}>
                  <h3 className="read-m3__h">{b.title}</h3>
                  <ul className="read-m3__qs">
                    {b.lines.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                </div>
              ))}
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-shell reading-flow reading-flow--viewport read-m3">
      <div className="reading-chrome">
        {onBack && (
          <button
            type="button"
            className="back-link reading-chrome__back"
            onClick={onBack}
          >
            ← Unit
          </button>
        )}
        <span className="badge reading-chrome__badge">
          {data.sectionTitle} · {data.bookPages}
        </span>
        <div className="learn-step-tabs">
          {steps.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
              }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      {panel && renderPanel(panel)}

      <footer
        className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}
      >
        <button type="button" className="flow-footer__btn" onClick={goPrev}>
          ← Back
        </button>
        <span className="flow-footer__step">
          {step + 1} / {steps.length}
        </span>
        {checked && needsCheck && (
          <span className="flow-footer__result">
            <span
              className={
                score === total ? "flow-footer__ok" : "flow-footer__bad"
              }
            >
              {score}/{total}
            </span>
          </span>
        )}
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={goNext}
        >
          {nextLabel}
        </button>
      </footer>
    </div>
  );
}
