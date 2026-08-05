export interface GapItem {
  id: number;
  label: string;
  hint: string;
  answers: string[];
  maxWords: number;
}

export interface ReadingCompletionData {
  id: string;
  module: number;
  title: string;
  subtitle: string;
  bookPages: string;
  predictSection: {
    context: string;
    questions: {
      text: string;
      hint: string;
      answers: string[];
    }[];
  };
  notes: {
    title: string;
    instruction: string;
    items: GapItem[];
  };
  table: {
    title: string;
    instruction: string;
    rows: {
      category: string;
      advice: GapItem[];
      benefits: GapItem[];
    }[];
  };
}

export const readingCompletionM1: ReadingCompletionData = {
  id: "reading-completion-m1",
  module: 1,
  title: "Reading",
  subtitle: "Predict language · Note & table completion",
  bookPages: "pp. 8–9 in your coursebook",
  predictSection: {
    context:
      "Look at question 1. Read around the gap: «keep times of highest ___ for most important work».",
    questions: [
      {
        text: "What class of word are you looking for? (verb, noun, adjective, adverb?)",
        hint: "After «highest» we usually describe a quality or state — not an action.",
        answers: ["noun"],
      },
      {
        text: "What word collocates with «highest»? What will the missing word mean?",
        hint: "Think: when during the day is your brain at its best? «highest ___»",
        answers: ["alertness", "concentration"],
      },
    ],
  },
  notes: {
    title: "Using your time effectively",
    instruction:
      "Complete the notes. NO MORE THAN TWO WORDS from the passage for each answer.",
    items: [
      {
        id: 1,
        label: "keep times of highest ___ for most important work",
        hint: "Scan for «highest» in the passage. What peaks during the day?",
        answers: ["alertness"],
        maxWords: 2,
      },
      {
        id: 2,
        label: "do not send an email that requires a non-urgent ___ until main work done",
        hint: "What might an email require from you? (one word)",
        answers: ["reply", "response"],
        maxWords: 2,
      },
      {
        id: 3,
        label: "a drop in ___ affects mental power — avoid early/post-lunch hours",
        hint: "What can «drop» in your body after meals?",
        answers: ["blood sugar", "glucose"],
        maxWords: 2,
      },
      {
        id: 4,
        label: "___ is a good way of «switching off»",
        hint: "What activity helps you relax and reset?",
        answers: ["meditation", "mindfulness"],
        maxWords: 2,
      },
    ],
  },
  table: {
    title: "Brain boosting",
    instruction:
      "Complete the table. NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage.",
    rows: [
      {
        category: "Exercise",
        advice: [
          {
            id: 5,
            label: "___ not necessary",
            hint: "What expensive thing is NOT required to exercise?",
            answers: ["gym membership", "a gym membership"],
            maxWords: 3,
          },
        ],
        benefits: [
          {
            id: 6,
            label: "reduces ___ ; improves mood",
            hint: "Exercise lowers levels of what?",
            answers: ["stress"],
            maxWords: 2,
          },
        ],
      },
      {
        category: "Food",
        advice: [
          {
            id: 7,
            label: "breakfast rich in ___",
            hint: "What nutrient should breakfast contain?",
            answers: ["protein"],
            maxWords: 2,
          },
          {
            id: 8,
            label: "stop eating when ___ full",
            hint: "How full should you feel? (number + word or adverb)",
            answers: ["completely", "80%", "80 percent", "eighty percent"],
            maxWords: 2,
          },
        ],
        benefits: [],
      },
      {
        category: "Study/Work area",
        advice: [],
        benefits: [
          {
            id: 9,
            label: "more freedom of ___",
            hint: "A tidy desk gives freedom of what?",
            answers: ["thought"],
            maxWords: 2,
          },
        ],
      },
    ],
  },
};

function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

export function checkAnswer(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  return accepted.some((a) => normalize(a) === n);
}
