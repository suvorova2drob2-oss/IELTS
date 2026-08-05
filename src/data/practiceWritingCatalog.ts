import { practiceWritingTest1 } from "./practiceWritingTest1";
import { practiceWritingTest2 } from "./practiceWritingTest2";
import { practiceWritingTest3 } from "./practiceWritingTest3";
import { practiceWritingTest4 } from "./practiceWritingTest4";

export type PracticeWritingTest =
  | typeof practiceWritingTest1
  | typeof practiceWritingTest2
  | typeof practiceWritingTest3
  | typeof practiceWritingTest4;

export interface PracticeWritingCatalogItem {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  ready: boolean;
  test?: PracticeWritingTest;
}

export const practiceWritingCatalog: PracticeWritingCatalogItem[] = [
  {
    id: "practice-writing-1",
    number: 1,
    title: "Practice Test 1",
    subtitle: "Outdoor activities · Line graph Task 1",
    ready: true,
    test: practiceWritingTest1,
  },
  {
    id: "practice-writing-2",
    number: 2,
    title: "Practice Test 2",
    subtitle: "Online food shopping · Process diagram",
    ready: true,
    test: practiceWritingTest2,
  },
  {
    id: "practice-writing-3",
    number: 3,
    title: "Practice Test 3",
    subtitle: "Travel & tourism · Cause & effect Task 2",
    ready: true,
    test: practiceWritingTest3,
  },
  {
    id: "practice-writing-4",
    number: 4,
    title: "Practice Test 4",
    subtitle: "Technology & the elderly · Problem–solution Task 2",
    ready: true,
    test: practiceWritingTest4,
  },
];

export function isWritingTest1(
  t: PracticeWritingTest,
): t is typeof practiceWritingTest1 {
  return t.id === "practice-writing-1";
}

export function isWritingTest2(
  t: PracticeWritingTest,
): t is typeof practiceWritingTest2 {
  return t.id === "practice-writing-2";
}

export function isWritingTest3(
  t: PracticeWritingTest,
): t is typeof practiceWritingTest3 {
  return t.id === "practice-writing-3";
}

export function isWritingTest4(
  t: PracticeWritingTest,
): t is typeof practiceWritingTest4 {
  return t.id === "practice-writing-4";
}
