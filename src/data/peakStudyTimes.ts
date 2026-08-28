/** Peak study times of UK secondary school students in a day · Language 1B 2b. */

export const peakStudyTimes = [
  "08.00",
  "10.00",
  "12.00",
  "14.00",
  "16.00",
  "18.00",
  "20.00",
  "22.00",
] as const;

/** Approximate coursebook line (%). */
export const peakStudyValues = [20, 85, 68, 76, 88, 95, 82, 45] as const;

/** Circled segment markers 1–5 on the coursebook graph. */
export const peakStudyMarkers = [
  { id: 1, from: 0, to: 1 },
  { id: 2, from: 1, to: 2 },
  { id: 3, from: 2, to: 4 },
  { id: 4, from: 4, to: 6 },
  { id: 5, from: 6, to: 7 },
] as const;

export const PEAK_STUDY_TITLE =
  "Peak study times of UK secondary school students in a day.";
