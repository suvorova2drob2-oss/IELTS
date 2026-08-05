import {
  practiceReadingTest1,
  type PracticeReadingTest,
} from "./practiceReadingTest1";
import { practiceReadingTest2 } from "./practiceReadingTest2";
import { practiceReadingTest3 } from "./practiceReadingTest3";

export interface PracticeReadingCatalogItem {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  ready: boolean;
  test?: PracticeReadingTest;
}

export const practiceReadingCatalog: PracticeReadingCatalogItem[] = [
  {
    id: "practice-reading-1",
    number: 1,
    title: "Practice Test 1",
    subtitle: "Examining the African Hunting Debate",
    ready: true,
    test: practiceReadingTest1,
  },
  {
    id: "practice-reading-2",
    number: 2,
    title: "Practice Test 2",
    subtitle:
      "Despite appearances, the human race is losing its appetite for violence and suffering",
    ready: true,
    test: practiceReadingTest2,
  },
  {
    id: "practice-reading-3",
    number: 3,
    title: "Practice Test 3",
    subtitle: "The ketchup conundrum",
    ready: true,
    test: practiceReadingTest3,
  },
];
