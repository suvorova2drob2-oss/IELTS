import { practiceListeningTest1 } from "./practiceListeningTest1";
import { practiceListeningTest2 } from "./practiceListeningTest2";
import { practiceListeningTest3 } from "./practiceListeningTest3";
import { practiceListeningTest4 } from "./practiceListeningTest4";

export type PracticeListeningTest =
  | typeof practiceListeningTest1
  | typeof practiceListeningTest2
  | typeof practiceListeningTest3
  | typeof practiceListeningTest4;

export interface PracticeListeningCatalogItem {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  ready: boolean;
  test?: PracticeListeningTest;
}

export const practiceListeningCatalog: PracticeListeningCatalogItem[] = [
  {
    id: "practice-listening-1",
    number: 1,
    title: "Practice Test 1",
    subtitle: "Restaurant & café jobs",
    ready: true,
    test: practiceListeningTest1,
  },
  {
    id: "practice-listening-2",
    number: 2,
    title: "Practice Test 2",
    subtitle: "Te Papa Museum · Map + Matching",
    ready: true,
    test: practiceListeningTest2,
  },
  {
    id: "practice-listening-3",
    number: 3,
    title: "Practice Test 3",
    subtitle: "Friendships · Matching + Multiple choice",
    ready: true,
    test: practiceListeningTest3,
  },
  {
    id: "practice-listening-4",
    number: 4,
    title: "Practice Test 4",
    subtitle: "Urban planning · Flow chart + Summary",
    ready: true,
    test: practiceListeningTest4,
  },
];

export function isListeningTest1(
  t: PracticeListeningTest,
): t is typeof practiceListeningTest1 {
  return t.id === "practice-listening-1";
}

export function isListeningTest2(
  t: PracticeListeningTest,
): t is typeof practiceListeningTest2 {
  return t.id === "practice-listening-2";
}

export function isListeningTest3(
  t: PracticeListeningTest,
): t is typeof practiceListeningTest3 {
  return t.id === "practice-listening-3";
}

export function isListeningTest4(
  t: PracticeListeningTest,
): t is typeof practiceListeningTest4 {
  return t.id === "practice-listening-4";
}
