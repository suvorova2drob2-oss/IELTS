/** Coursebook audio — files in public/audio/expert/module-{n}/ */

function expertTrack(module: number, trackId: string): string {
  const file = `Expert IELTS_Cbk_7_5 Track ${trackId}.mp3`;
  return `./audio/expert/module-${module}/${encodeURIComponent(file)}`;
}

/** Module 2 · A world of change (Listening p. 28–31) */
export const EXPERT_M2_AUDIO = {
  /** 2.2 Robert & Filipo walks */
  track02_02: expertTrack(2, "02_02"),
  /** 6b Camp Horizon map labelling */
  track02_03: expertTrack(2, "02_03"),
  /** 3 Turtle Bay Safari Camp form + map */
  track02_04: expertTrack(2, "02_04"),
} as const;

/** Module 3 · The feel-good factor (Listening p. 44–48, Speaking p. 43) */
export const EXPERT_M3_AUDIO = {
  /** Speaking 2c — model Part 3 answer */
  track03_01: expertTrack(3, "03_01"),
  /** Speaking 3a — Anya vs other speaker */
  track03_02: expertTrack(3, "03_02"),
  /** Speaking 3b / 3c — phrases A–E + examples */
  track03_03: expertTrack(3, "03_03"),
  /** Listening 2d — preview listen (Q1–4) */
  track03_04: expertTrack(3, "03_04"),
  /** Listening 3 — Section 4 exam (script 3.5) */
  track03_05: expertTrack(3, "03_05"),
  /** Listening 3b — Section 4 exam (script 3.6) */
  track03_06: expertTrack(3, "03_06"),
  /** Speaking 5 — model answers */
  track03_07: expertTrack(3, "03_07"),
} as const;
