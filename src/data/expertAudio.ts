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
