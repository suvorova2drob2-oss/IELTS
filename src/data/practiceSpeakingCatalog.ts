import { practiceSpeakingTest1 } from "./practiceSpeakingTest1";

export type PracticeSpeakingTest = typeof practiceSpeakingTest1;

export interface PracticeSpeakingCatalogItem {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  ready: boolean;
  test?: PracticeSpeakingTest;
}

export const practiceSpeakingCatalog: PracticeSpeakingCatalogItem[] = [
  {
    id: "practice-speaking-1",
    number: 1,
    title: "Practice Test 1",
    subtitle: "Expert speaking · Parts 1–3 (memories / discussion skills)",
    ready: true,
    test: practiceSpeakingTest1,
  },
  {
    id: "practice-speaking-2",
    number: 2,
    title: "Practice Test 2",
    subtitle: "Expert speaking · fluency, notes & complex language",
    ready: false,
  },
];

export function isSpeakingTest1(
  t: PracticeSpeakingTest,
): t is typeof practiceSpeakingTest1 {
  return t.id === "practice-speaking-1";
}
