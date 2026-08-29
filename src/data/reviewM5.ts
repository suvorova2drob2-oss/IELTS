export const REVIEW_M5_STEPS = [
  "1a Vocabulary",
  "1b Strong/Weak",
  "1c Noun phrases",
  "1d Match",
  "2a Reported speech",
  "2b Structures",
] as const;

export const REVIEW_M5_NEXT = [
  "1b Strong/Weak →",
  "1c Noun phrases →",
  "1d Match →",
  "2a Reported →",
  "2b Structures →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ");
}

export function checkReviewM5(input: string, answers: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return answers.some((a) => normalize(a) === n);
}

export type ReviewM5Gap =
  | { text: string }
  | { gap: number; key: string };

export function isReviewM5Gap(
  part: ReviewM5Gap,
): part is { gap: number; key: string } {
  return "gap" in part;
}

export const reviewM5 = {
  id: "review-m5-flow",
  bookPages: "p. 86 in your coursebook",
  sectionTitle: "Review",
  vocab1a: {
    badge: "1a",
    instruction:
      "Complete the sentences with the correct form of the words below.",
    bank: [
      "innovations",
      "versatile",
      "state-of-the-art",
      "accessible",
      "automation",
      "The majority",
      "user-friendly",
    ],
    items: [
      {
        id: 1,
        before: "Recent ",
        after: " in battery technology have made electric cars more practical.",
        answers: ["innovations"],
      },
      {
        id: 2,
        before: "A tablet is a ",
        after: " device because you can use it for work and entertainment.",
        answers: ["versatile"],
      },
      {
        id: 3,
        before: "The laboratory uses ",
        after: " equipment.",
        answers: ["state-of-the-art"],
      },
      {
        id: 4,
        before: "Online courses have made education more ",
        after: " to remote learners.",
        answers: ["accessible"],
      },
      {
        id: 5,
        before: "Factory ",
        after: " has changed manufacturing jobs.",
        answers: ["automation"],
      },
      {
        id: 6,
        before: "",
        after: " of students preferred the interactive whiteboard.",
        answers: ["The majority"],
      },
      {
        id: 7,
        before: "The new app is very ",
        after: " even for beginners.",
        answers: ["user-friendly"],
      },
    ],
  },
  strength1b: {
    badge: "b",
    instruction:
      "Are the adverbs strong (S) or weak (W) opinions?",
    items: [
      { id: 1, text: "entirely", key: "S" },
      { id: 2, text: "somewhat", key: "W" },
      { id: 3, text: "wholeheartedly", key: "S" },
      { id: 4, text: "marginally", key: "W" },
    ],
  },
  phrases1c: {
    badge: "c",
    instruction: "Rewrite as noun phrases.",
    items: [
      {
        id: 1,
        stem: "a gadget that is cost-effective",
        answers: ["a cost-effective gadget"],
      },
      {
        id: 2,
        stem: "the heating that is under the floor",
        answers: ["the heating under the floor"],
      },
      {
        id: 3,
        stem: "how long a battery lasts",
        answers: ["battery life"],
      },
      {
        id: 4,
        stem: "a device which uses less energy",
        answers: ["a device which uses less energy"],
      },
    ],
  },
  match1d: {
    badge: "d",
    instruction: "Match 1–4 with A–D.",
    items: [
      { id: 1, text: "Item / idea 1", key: "C" },
      { id: 2, text: "Item / idea 2", key: "D" },
      { id: 3, text: "Item / idea 3", key: "A" },
      { id: 4, text: "Item / idea 4", key: "B" },
    ],
    options: [
      { id: "A", text: "Option A" },
      { id: "B", text: "Option B" },
      { id: "C", text: "Option C" },
      { id: "D", text: "Option D" },
    ],
  },
  reported2a: {
    badge: "2a",
    instruction: "Rewrite in reported speech.",
    items: [
      {
        id: 1,
        stem: "Cynthia: 'Too much money has been spent on building new houses… I want to see more public facilities.'",
        answers: [
          "Cynthia claimed that too much money had been spent on building new houses in her neighbourhood and she said that she wanted to see more public facilities.",
        ],
      },
      {
        id: 2,
        stem: "Simon to David: 'If you renovate your house, you will increase its value.'",
        answers: [
          "Simon told David that he thought that if he renovated his house, he would increase its value.",
        ],
      },
      {
        id: 3,
        stem: "Joanne: 'I'll lend you my new camera for your holiday.'",
        answers: [
          "Joanne promised to lend me her new camera for my holiday",
          "Joanne promised that she was going to lend me her new camera for my holiday.",
        ],
      },
      {
        id: 4,
        stem: "Jack: 'It will be easy to use the laptop when you have installed the correct software.'",
        answers: [
          "Jack explained that it would be easy to use the laptop when I had installed the correct software.",
        ],
      },
      {
        id: 5,
        stem: "Leah: 'I don't like the new office block which was built last year.'",
        answers: [
          "Leah complained that she didn't like the new office block which had been built last year.",
        ],
      },
      {
        id: 6,
        stem: "Leah to Mary: 'I think we will need to move to a bigger house next year.'",
        answers: [
          "Leah told Mary that she thought they would need to move to a bigger house the following year.",
        ],
      },
    ],
  },
  structures2b: {
    badge: "b",
    instruction: "Choose the correct structure (A or B) for each sentence.",
    items: [
      { id: 1, key: "A" },
      { id: 2, key: "A" },
      { id: 3, key: "B" },
      { id: 4, key: "A" },
    ],
  },
};
