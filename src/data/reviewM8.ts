export const REVIEW_M8_STEPS = [
  "1a Match",
  "1b Collocations",
  "1c Linking",
  "2a Future forms",
  "2b Error correction",
  "2c Rewrite",
] as const;

export const REVIEW_M8_NEXT = [
  "1b Collocations →",
  "1c Linking →",
  "2a Future forms →",
  "2b Errors →",
  "2c Rewrite →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ");
}

export function checkReviewM8(input: string, answers: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return answers.some((a) => normalize(a) === n);
}

/** Review p.134 — Trainer maps: step0=match UI via vocab1a as letters A–E gaps… use match1c for 1a. */
export const reviewM8 = {
  id: "review-m8-flow",
  bookPages: "p. 134 in your coursebook",
  sectionTitle: "Review",
  /** step 0 — linking phrases (shown as 1a in tabs; content = 1c keys; remapped below in trainer labels) */
  vocab1a: {
    badge: "1a",
    instruction:
      "Match each item with the correct letter A–E (click letter → click gap). Keys: 1D 2A 3E 4B 5C.",
    bank: ["D", "A", "E", "B", "C"],
    items: [
      { id: 1, before: "1 → ", after: "", answers: ["D"] },
      { id: 2, before: "2 → ", after: "", answers: ["A"] },
      { id: 3, before: "3 → ", after: "", answers: ["E"] },
      { id: 4, before: "4 → ", after: "", answers: ["B"] },
      { id: 5, before: "5 → ", after: "", answers: ["C"] },
    ],
  },
  thereIt1b: {
    badge: "b",
    instruction:
      "Complete with the collocation words (click to place). TB: cause/poverty; impact/migration; issue/overcrowding; benefits/diversity.",
    bank: [
      "cause",
      "poverty",
      "impact",
      "migration",
      "issue",
      "overcrowding",
      "benefits",
      "diversity",
    ],
    items: [
      {
        id: 1,
        before: "the ",
        after: " of poverty",
        answers: ["cause"],
      },
      {
        id: 2,
        before: "the ",
        after: " of migration",
        answers: ["impact"],
      },
      {
        id: 3,
        before: "the ",
        after: " of overcrowding",
        answers: ["issue"],
      },
      {
        id: 4,
        before: "the ",
        after: " of diversity",
        answers: ["benefits"],
      },
      {
        id: 5,
        before: "linked to ",
        after: " in urban areas",
        answers: ["poverty"],
      },
      {
        id: 6,
        before: "driven by ",
        after: " from rural regions",
        answers: ["migration"],
      },
      {
        id: 7,
        before: "problems of ",
        after: " in city centres",
        answers: ["overcrowding"],
      },
      {
        id: 8,
        before: "celebrating cultural ",
        after: "",
        answers: ["diversity"],
      },
    ],
  },
  match1c: {
    badge: "c",
    instruction: "Complete with the linking phrases below.",
    bank: [
      { id: "because of", text: "because of" },
      { id: "due", text: "due" },
      { id: "therefore", text: "therefore" },
      { id: "As a result", text: "As a result" },
    ],
    items: [
      {
        id: 1,
        text: "… rising rents, many young people share flats.",
        key: "because of",
      },
      {
        id: 2,
        text: "Migration increased … to conflict in the region.",
        key: "due",
      },
      {
        id: 3,
        text: "Local services were stretched; …, waiting times grew.",
        key: "therefore",
      },
      {
        id: 4,
        text: "…, neighbourhood groups organised more events.",
        key: "As a result",
      },
    ],
    tip: "TB 1c: because of; due; therefore; As a result.",
  },
  linking2a: {
    badge: "2a",
    instruction: "Complete with the correct future forms.",
    bank: [
      "was going to build",
      "will have been appointed",
      "is going to receive",
      "will be celebrating",
      "will be provided",
      "I'll be moving",
      "was going to open",
      "will be announced",
    ],
    items: [
      {
        id: 1,
        before: "The council ",
        after: " a new community centre, but funding was cut.",
        answers: ["was going to build"],
      },
      {
        id: 2,
        before: "By next month a new chair ",
        after: ".",
        answers: ["will have been appointed"],
      },
      {
        id: 3,
        before: "The charity ",
        after: " a major donation this week.",
        answers: ["is going to receive"],
      },
      {
        id: 4,
        before: "This time next year we ",
        after: " ten years of the project.",
        answers: ["will be celebrating"],
      },
      {
        id: 5,
        before: "Extra support ",
        after: " for new residents.",
        answers: ["will be provided"],
      },
      {
        id: 6,
        before: "",
        after: " closer to the city centre next month.",
        answers: ["I'll be moving"],
      },
      {
        id: 7,
        before: "The café ",
        after: " last spring, but building work was delayed.",
        answers: ["was going to open"],
      },
      {
        id: 8,
        before: "The winner ",
        after: " at the awards ceremony.",
        answers: ["will be announced"],
      },
    ],
  },
  cleft2b: {
    badge: "b",
    instruction:
      "Error correction: fix the linking-word grammar. Compare with the models.",
    items: [
      {
        id: 1,
        stem: "Because should be followed by a clause; Because of by a noun.",
        model:
          "The students couldn’t study abroad that summer because the university couldn’t fund the places. / … because of the lack of funding.",
      },
      {
        id: 2,
        stem: "As needs to precede a clause.",
        model: "The carnival was cancelled at the last minute as it was raining.",
      },
      {
        id: 3,
        stem: "As a result should be followed by a clause; As a result of by a noun.",
        model:
          "As a result of the rise in house prices, many people struggled to buy a property in the area.",
      },
      {
        id: 4,
        stem: "Due to must precede a noun.",
        model: "The student won a scholarship due to her excellent results.",
      },
      {
        id: 5,
        stem: "Therefore must precede a clause.",
        model:
          "Many people gathered in the town square to celebrate; therefore it was crowded.",
      },
    ],
  },
  cleft2c: {
    badge: "c",
    instruction:
      "Rewrite using general + specific noun phrases. Check the models.",
    items: [
      {
        id: 1,
        stem: "Loneliness among teenagers may well be caused by a lack of ‘real’ friendships.",
        model:
          "The cause of loneliness among teenagers may well be a lack of ‘real’ friendships.",
      },
      {
        id: 2,
        stem: "Cyberbullying must not be underestimated.",
        model: "The issue of cyberbullying must not be underestimated.",
      },
      {
        id: 3,
        stem: "Online personal security needs to be further addressed.",
        model:
          "The question of online personal security needs to be further addressed.",
      },
      {
        id: 4,
        stem: "Spending too much time online often results in headaches and tired eyes.",
        model:
          "The result of spending too much time online is often headaches and tired eyes.",
      },
      {
        id: 5,
        stem: "Online communication is impersonal.",
        model:
          "The problem with online communication is that it is impersonal.",
      },
    ],
  },
};
