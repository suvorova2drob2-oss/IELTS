import { useEffect, useState } from "react";
import {
  MS_U1_WRITE_NEXT,
  MS_U1_WRITE_STEPS,
  writingU1,
} from "../../data/mindset/writingU1";
import { WordCountMeter, countWords } from "../WordCountMeter";

const data = writingU1;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, MS_U1_WRITE_STEPS.length - 1));
}

function norm(s: string): string {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

export function WritingU1Trainer({
  onBack,
  restart,
  initialStep,
}: {
  onBack?: () => void;
  restart?: boolean;
  initialStep?: number;
}) {
  const [step, setStep] = useState(() => clampStep(initialStep));
  const [checked, setChecked] = useState(false);
  const [tenseGaps, setTenseGaps] = useState<Record<string, string>>({});
  const [pickedTense, setPickedTense] = useState<string | null>(null);
  const [showOverview, setShowOverview] = useState(false);
  const [showWeak, setShowWeak] = useState(false);
  const [critiqueMap, setCritiqueMap] = useState<Record<string, string>>({});
  const [pickedComment, setPickedComment] = useState<string | null>(null);
  const [conclusion, setConclusion] = useState<string | null>(null);
  const [adjGaps, setAdjGaps] = useState<Record<string, string>>({});
  const [pickedAdj, setPickedAdj] = useState<string | null>(null);
  const [badAdv, setBadAdv] = useState<Set<string>>(new Set());
  const [showRewrite, setShowRewrite] = useState(false);
  const [draft, setDraft] = useState("");
  const [showSample, setShowSample] = useState(false);

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setTenseGaps({});
    setPickedTense(null);
    setShowOverview(false);
    setShowWeak(false);
    setCritiqueMap({});
    setPickedComment(null);
    setConclusion(null);
    setAdjGaps({});
    setPickedAdj(null);
    setBadAdv(new Set());
    setShowRewrite(false);
    setDraft("");
    setShowSample(false);
  }, [restart, initialStep]);

  const needsCheck = step === 0 || step === 2 || step === 3 || step === 4;

  const tenseItems = data.leadIn.items.filter((it) => !it.given);
  const tenseScore = tenseItems.filter((it) => {
    const v = tenseGaps[it.id] ?? "";
    const keys = [it.key, ...(it.altKeys ?? [])];
    return keys.some((k) => norm(k) === norm(v));
  }).length;

  const critiqueScore = Object.entries(data.critique.keys).filter(
    ([n, k]) => critiqueMap[n] === k,
  ).length;

  const conclusionScore = conclusion === data.conclusions.key ? 1 : 0;

  const adjIds = ["1", "2", "3", "4", "5", "6", "7"];
  const adjKeys: Record<string, string> = {
    "1": "highest",
    "2": "overall",
    "3": "notable",
    "4": "consistent",
    "5": "stable",
    "6": "lowest",
    "7": "joint-lowest",
  };
  const adjScore = adjIds.filter((id) => adjGaps[id] === adjKeys[id]).length;
  const badKey = new Set(data.adjAdv.inappropriate);
  const badScore =
    badAdv.size === badKey.size && [...badAdv].every((a) => badKey.has(a))
      ? 1
      : 0;

  const score =
    step === 0
      ? tenseScore
      : step === 2
        ? critiqueScore
        : step === 3
          ? conclusionScore
          : step === 4
            ? adjScore + badScore
            : 0;
  const total =
    step === 0
      ? tenseItems.length
      : step === 2
        ? 4
        : step === 3
          ? 1
          : step === 4
            ? adjIds.length + 1
            : 0;

  const placeTense = (id: string) => {
    if (checked) return;
    if (tenseGaps[id]) {
      setTenseGaps((g) => {
        const next = { ...g };
        delete next[id];
        return next;
      });
      return;
    }
    if (!pickedTense) return;
    setTenseGaps((g) => ({ ...g, [id]: pickedTense }));
    setPickedTense(null);
  };

  const placeCritique = (sec: string) => {
    if (checked) return;
    if (critiqueMap[sec]) {
      setCritiqueMap((m) => {
        const next = { ...m };
        delete next[sec];
        return next;
      });
      return;
    }
    if (!pickedComment) return;
    setCritiqueMap((m) => ({ ...m, [sec]: pickedComment }));
    setPickedComment(null);
  };

  const placeAdj = (id: string) => {
    if (checked) return;
    if (adjGaps[id]) {
      setAdjGaps((g) => {
        const next = { ...g };
        delete next[id];
        return next;
      });
      return;
    }
    if (!pickedAdj) return;
    setAdjGaps((g) => ({ ...g, [id]: pickedAdj }));
    setPickedAdj(null);
  };

  const toggleBad = (adv: string) => {
    if (checked) return;
    setBadAdv((s) => {
      const next = new Set(s);
      if (next.has(adv)) next.delete(adv);
      else next.add(adv);
      return next;
    });
  };

  const usedTense = new Set(Object.values(tenseGaps));
  const usedComments = new Set(Object.values(critiqueMap));
  const usedAdj = new Set(Object.values(adjGaps));

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
    if (step >= MS_U1_WRITE_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setStep((s) => s + 1);
  };

  const nextLabel =
    needsCheck && !checked ? "Check →" : MS_U1_WRITE_NEXT[step];

  const gapBtn = (
    filled: string | undefined,
    onClick: () => void,
    ok?: boolean,
  ) => (
    <button
      type="button"
      className={`inline-gap ${filled ? "inline-gap--filled" : ""} ${
        checked && filled
          ? ok
            ? "inline-gap--ok"
            : "inline-gap--bad"
          : ""
      }`}
      disabled={checked}
      onClick={onClick}
    >
      {filled ?? "——"}
    </button>
  );

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
          {MS_U1_WRITE_STEPS.map((label, i) => (
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

      {step === 0 && (
        <section className="read-m3__panel" style={{ overflow: "auto" }}>
          <h2 className="read-m3__h">In this unit you will learn how to</h2>
          <ul className="read-m3__qs">
            {data.unitGoals.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.leadIn.badge}</span>
            {data.leadIn.instruction}
          </p>
          <div className="pr-chip-bank" style={{ marginBottom: 8 }}>
            {tenseItems.map((it) => {
              const label = it.bankLabel ?? it.key;
              const used = usedTense.has(label) || usedTense.has(it.key);
              return (
                <button
                  key={it.id}
                  type="button"
                  className={`pr-chip ${pickedTense === label ? "pr-chip--on" : ""} ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used}
                  onClick={() => setPickedTense(label)}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <ol className="read-m3__qs">
            {data.leadIn.items.map((it) => (
              <li key={it.id}>
                {it.given ? (
                  <>
                    {it.stem.replace("__________", it.key)}{" "}
                    <span className="write-m2a__cue">(given)</span>
                  </>
                ) : (
                  <>
                    {it.stem.split("__________")[0]}
                    {gapBtn(
                      tenseGaps[it.id],
                      () => placeTense(it.id),
                      [it.key, ...(it.altKeys ?? [])].some(
                        (k) => norm(k) === norm(tenseGaps[it.id] ?? ""),
                      ),
                    )}
                    {it.stem.split("__________")[1]}
                    {checked &&
                      ![it.key, ...(it.altKeys ?? [])].some(
                        (k) => norm(k) === norm(tenseGaps[it.id] ?? ""),
                      ) && (
                        <span className="inline-gap-bad"> → {it.key}</span>
                      )}
                  </>
                )}
              </li>
            ))}
          </ol>
          <p className="write-m2a__cue">{data.leadIn.partnerCue}</p>
          <p className="read-m3__hint">{data.leadIn.example}</p>
          <div className="read-m3__split">
            <div>
              <h3 className="read-m3__h">Verb</h3>
              <ul className="read-m3__qs">
                {data.leadIn.verbs.map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="read-m3__h">Adverb</h3>
              <ul className="read-m3__qs">
                {data.leadIn.adverbs.map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="read-m3__h">Time phrase</h3>
              <ul className="read-m3__qs">
                {data.leadIn.timePhrases.map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {step === 1 && (
        <section className="read-m3__panel" style={{ overflow: "auto" }}>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">
              {data.taskAchievement.badge}
            </span>
            {data.taskAchievement.intro}
          </p>
          <ul className="read-m3__qs">
            {data.taskAchievement.mistakes.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
          <p className="read-m3__instr read-m3__instr--mt">
            <span className="write-m2a__badge">
              {data.taskAchievement.badge3}
            </span>
            {data.taskAchievement.instruction3}
          </p>
          <article className="read-m3__passage read-m3__passage--solo">
            <p style={{ whiteSpace: "pre-wrap" }}>
              {data.taskAchievement.prompt}
            </p>
            <p className="write-m2a__cue">
              Categories: {data.taskAchievement.categories.join(" · ")} · Years:{" "}
              {data.taskAchievement.years.join(", ")}
            </p>
          </article>
          <h3 className="read-m3__h">As you look at a graph for the first time</h3>
          <ul className="read-m3__qs">
            {data.taskAchievement.firstLook.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
          <button
            type="button"
            className="pr-chip"
            onClick={() => setShowOverview((v) => !v)}
          >
            {showOverview ? "Hide suggested features" : "Show suggested features"}
          </button>
          {showOverview && (
            <ul className="read-m3__qs" style={{ marginTop: 8 }}>
              {data.taskAchievement.overviewKeyPoints.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          )}
          <p className="read-m3__instr read-m3__instr--mt">
            <span className="write-m2a__badge">
              {data.taskAchievement.badge4}
            </span>
            {data.taskAchievement.instruction4}
          </p>
          <article className="read-m3__passage read-m3__passage--solo">
            <h3 className="read-m3__h">Answer 1</h3>
            <p style={{ whiteSpace: "pre-wrap" }}>
              {data.taskAchievement.weakAnswer}
            </p>
          </article>
          <button
            type="button"
            className="pr-chip"
            onClick={() => setShowWeak((v) => !v)}
          >
            {showWeak ? "Hide TA problems" : "Show TA problems"}
          </button>
          {showWeak && (
            <ul className="read-m3__qs" style={{ marginTop: 8 }}>
              {data.taskAchievement.weakProblems.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          )}
        </section>
      )}

      {step === 2 && (
        <section className="read-m3__split">
          <article
            className="read-m3__passage"
            style={{ overflow: "auto" }}
          >
            <p className="read-m3__instr">
              <span className="write-m2a__badge">{data.critique.badge}</span>
              {data.critique.instruction}
            </p>
            <h3 className="read-m3__h">Answer 2</h3>
            <p style={{ whiteSpace: "pre-wrap", fontSize: "0.92em" }}>
              {data.critique.answer2}
            </p>
          </article>
          <aside className="read-m3__side" style={{ overflow: "auto" }}>
            <h2 className="read-m3__h">Match comments A–D</h2>
            <p className="write-m2a__cue">Click a comment, then a section (1–4).</p>
            <div className="pr-chip-bank">
              {data.critique.comments.map((c) => {
                const used = usedComments.has(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    className={`pr-chip ${pickedComment === c.id ? "pr-chip--on" : ""} ${used ? "pr-chip--used" : ""}`}
                    disabled={checked || used}
                    onClick={() => setPickedComment(c.id)}
                    title={c.text}
                  >
                    {c.id}
                  </button>
                );
              })}
            </div>
            <ul className="read-m3__qs">
              {(["1", "2", "3", "4"] as const).map((sec) => {
                const val = critiqueMap[sec];
                const ok = val === data.critique.keys[sec];
                return (
                  <li key={sec}>
                    Section ({sec}):{" "}
                    {gapBtn(val, () => placeCritique(sec), ok)}
                    {checked && !ok && (
                      <span className="inline-gap-bad">
                        {" "}
                        → {data.critique.keys[sec]}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
            {data.critique.comments.map((c) => (
              <p key={c.id} className="read-m3__hint">
                <strong>{c.id}.</strong> {c.text}
              </p>
            ))}
          </aside>
        </section>
      )}

      {step === 3 && (
        <section className="read-m3__panel" style={{ overflow: "auto" }}>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">
              {data.conclusions.badge}
            </span>
            {data.conclusions.instruction}
          </p>
          <p className="write-m2a__expert">{data.conclusions.tip}</p>
          <ul className="read-m3__opts">
            {data.conclusions.options.map((opt) => {
              let state = "";
              if (conclusion === opt.id) state = "read-m3__opt--on";
              if (checked && opt.id === data.conclusions.key)
                state = "read-m3__opt--ok";
              else if (
                checked &&
                conclusion === opt.id &&
                opt.id !== data.conclusions.key
              )
                state = "read-m3__opt--bad";
              return (
                <li key={opt.id}>
                  <button
                    type="button"
                    className={`read-m3__opt ${state}`}
                    disabled={checked}
                    onClick={() => setConclusion(opt.id)}
                  >
                    <strong>{opt.id}.</strong> {opt.text}
                  </button>
                </li>
              );
            })}
          </ul>
          {checked &&
            data.conclusions.options.map((opt) => (
              <p key={opt.id} className="read-m3__tip">
                <strong>{opt.id}:</strong> {data.conclusions.tips[opt.id]}
              </p>
            ))}
        </section>
      )}

      {step === 4 && (
        <section className="read-m3__panel" style={{ overflow: "auto" }}>
          <h2 className="read-m3__h">{data.adjAdv.title}</h2>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.adjAdv.badge}</span>
            {data.adjAdv.instruction}
          </p>
          <div className="pr-chip-bank">
            {data.adjAdv.bank.map((w) => {
              const used = usedAdj.has(w);
              return (
                <button
                  key={w}
                  type="button"
                  className={`pr-chip ${pickedAdj === w ? "pr-chip--on" : ""} ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used}
                  onClick={() => setPickedAdj(w)}
                >
                  {w}
                </button>
              );
            })}
          </div>
          <div className="read-m3__qs" style={{ display: "grid", gap: 8 }}>
            <p>
              Rising cost of living: the (
              {gapBtn(adjGaps["1"], () => placeAdj("1"), adjGaps["1"] === "highest")}
              ) point of / main reason, in any year (85,000 in 2000); the only
              one to decrease (to 80,000 in 2010)
              {checked && adjGaps["1"] !== "highest" && (
                <span className="inline-gap-bad"> → highest</span>
              )}
            </p>
            <p>
              Traffic: greatest (
              {gapBtn(adjGaps["2"], () => placeAdj("2"), adjGaps["2"] === "overall")}
              ) rise (40,000); most (
              {gapBtn(adjGaps["3"], () => placeAdj("3"), adjGaps["3"] === "notable")}
              ) rise between 2000 and 2010 (25,000)
              {checked &&
                (adjGaps["2"] !== "overall" || adjGaps["3"] !== "notable") && (
                  <span className="inline-gap-bad">
                    {" "}
                    → overall / notable
                  </span>
                )}
            </p>
            <p>
              Lifestyle: Most (
              {gapBtn(
                adjGaps["4"],
                () => placeAdj("4"),
                adjGaps["4"] === "consistent",
              )}
              ) trend / (
              {gapBtn(adjGaps["5"], () => placeAdj("5"), adjGaps["5"] === "stable")}
              ) increase (only 20,000); remained the (
              {gapBtn(adjGaps["6"], () => placeAdj("6"), adjGaps["6"] === "lowest")}
              ) of all three reasons
              {checked &&
                (adjGaps["4"] !== "consistent" ||
                  adjGaps["5"] !== "stable" ||
                  adjGaps["6"] !== "lowest") && (
                  <span className="inline-gap-bad">
                    {" "}
                    → consistent / stable / lowest
                  </span>
                )}
            </p>
            <p>
              Traffic and Lifestyle: (
              {gapBtn(
                adjGaps["7"],
                () => placeAdj("7"),
                adjGaps["7"] === "joint-lowest",
              )}
              ) in the first year presented (20,000 in 1990)
              {checked && adjGaps["7"] !== "joint-lowest" && (
                <span className="inline-gap-bad"> → joint-lowest</span>
              )}
            </p>
          </div>

          <p className="read-m3__instr read-m3__instr--mt">
            <span className="write-m2a__badge">{data.adjAdv.badge8}</span>
            {data.adjAdv.instruction8}
          </p>
          <p className="write-m2a__cue">
            Tap every adverb that is inappropriate for Task 1.
          </p>
          <div className="pr-chip-bank">
            {data.adjAdv.allAdverbs.map((adv) => {
              const on = badAdv.has(adv);
              let cls = on ? "pr-chip--on" : "";
              if (checked) {
                if (badKey.has(adv) && on) cls = "pr-chip--ok";
                else if (badKey.has(adv) && !on) cls = "pr-chip--bad";
                else if (!badKey.has(adv) && on) cls = "pr-chip--bad";
              }
              return (
                <button
                  key={adv}
                  type="button"
                  className={`pr-chip ${cls}`}
                  disabled={checked}
                  onClick={() => toggleBad(adv)}
                >
                  {adv}
                </button>
              );
            })}
          </div>
          {checked && (
            <p className="read-m3__tip">{data.adjAdv.inappropriateTip}</p>
          )}
          <p className="write-m2a__expert">{data.adjAdv.tip}</p>

          <p className="read-m3__instr read-m3__instr--mt">
            <span className="write-m2a__badge">{data.adjAdv.badge10}</span>
            {data.adjAdv.instruction10}
          </p>
          <button
            type="button"
            className="pr-chip"
            onClick={() => setShowRewrite((v) => !v)}
          >
            {showRewrite ? "Hide sample rewrites" : "Show sample rewrites"}
          </button>
          {showRewrite && (
            <ol className="read-m3__qs" style={{ marginTop: 8 }}>
              {data.adjAdv.rewrite.map((r) => (
                <li key={r.id}>
                  <p>{r.original}</p>
                  <p className="write-m2a__cue">→ {r.sample}</p>
                </li>
              ))}
            </ol>
          )}
        </section>
      )}

      {step === 5 && (
        <section className="read-m3__panel" style={{ overflow: "auto" }}>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.exam.badge}</span>
            {data.exam.instruction}
          </p>
          <p className="write-m2a__cue">{data.exam.timeNote}</p>
          <article className="read-m3__passage read-m3__passage--solo">
            <p style={{ whiteSpace: "pre-wrap" }}>{data.exam.prompt}</p>
            <p className="write-m2a__cue">
              Survey results · {data.exam.categories.join(" · ")} ·{" "}
              {data.exam.years.join("–")}
            </p>
          </article>
          <WordCountMeter
            words={countWords(draft)}
            minWords={data.exam.minWords}
            label="Task 1 · exam minimum"
          />
          <textarea
            className="write-m2a__area"
            rows={12}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Write your Task 1 response here…"
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
              <p style={{ whiteSpace: "pre-wrap" }}>{data.exam.sample}</p>
            </article>
          )}
        </section>
      )}

      <footer
        className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}
      >
        <button type="button" className="flow-footer__btn" onClick={goPrev}>
          ← Back
        </button>
        <span className="flow-footer__step">
          {step + 1} / {MS_U1_WRITE_STEPS.length}
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
