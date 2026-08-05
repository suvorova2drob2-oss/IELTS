export type Mode = "practice" | "exam";

export interface BeforeYouReadData {
  id: string;
  module: number;
  skill: string;
  title: string;
  articleTitle: string;
  introduction: string;
  bookPages: string;
  predictHints: string[];
  predictPrompts: string[];
  checkQuestions: string[];
  keyVocab: string[];
}

export const beforeYouReadM1: BeforeYouReadData = {
  id: "before-you-read-m1",
  module: 1,
  skill: "Reading",
  title: "Before you read",
  articleTitle: "Using neuroscience to manage your time",
  introduction:
    "When we feel under pressure, our instinct is to study or work for as long as we can. So why do we still feel we have not accomplished enough at the end of the day?",
  bookPages: "pp. 8–9 in your coursebook",
  predictHints: [
    "Look at the title: neuroscience + time — what might the writer explain?",
    "Think about: brain, habits, rest, productivity, guilt, deadlines.",
    "The intro mentions pressure and not feeling you have done enough — predict why.",
  ],
  predictPrompts: [
    "What will the writer say about how the brain works when we study?",
    "Will the text suggest we should work longer or differently?",
    "What problems with time management might be mentioned?",
  ],
  checkQuestions: [
    "Were your predictions about the brain and studying mentioned?",
    "Did the text explain why working longer does not always help?",
    "Did you find ideas about managing time in a smarter way?",
  ],
  keyVocab: [
    "neuroscience",
    "instinct",
    "accomplish",
    "pressure",
    "productivity",
    "deadline",
    "manage",
    "efficient",
  ],
};
