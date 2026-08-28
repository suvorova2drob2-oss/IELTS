/** Module 1B · Untapped resources · Language p. 16 */

export type TrendCol = "up" | "down" | "stable";

export const LANG_M1B_STEPS = [
  "2a Describe trends",
  "2b Correct errors",
  "b Verb forms",
  "c Choose options",
] as const;

export type LangM1bChoiceBit =
  | { text: string }
  | { gap: number; options: [string, string]; key: string };

export function isLangM1bChoiceGap(
  part: LangM1bChoiceBit,
): part is { gap: number; options: [string, string]; key: string } {
  return "gap" in part;
}

export const languageM1b = {
  id: "language-m1b-flow",
  module: 1,
  bookPages: "p. 16 in your coursebook",
  table: {
    heading: "Describe trends",
    instruction: "2a Write the words below in the correct place in the table.",
    columns: [
      { id: "up" as TrendCol, label: "Go up" },
      { id: "down" as TrendCol, label: "Go down" },
      { id: "stable" as TrendCol, label: "No movement" },
    ],
    words: [
      { id: "climb", key: "up" as TrendCol },
      { id: "decline", key: "down" as TrendCol },
      { id: "decrease", key: "down" as TrendCol },
      { id: "drop", key: "down" as TrendCol },
      { id: "grow", key: "up" as TrendCol },
      { id: "lessen", key: "down" as TrendCol },
      { id: "plummet", key: "down" as TrendCol },
      { id: "reduce", key: "down" as TrendCol },
      { id: "remain stable", key: "stable" as TrendCol },
      { id: "soar", key: "up" as TrendCol },
    ],
  },
  /** Coursebook 2b · TB corrections in parentheses. */
  step2b: {
    instruction:
      "b Read the sentences about the graph and underline the errors. Correct the errors.",
    items: [
      {
        id: 1,
        before: "Firstly, the line ",
        error: "remains stable",
        after: " then it falls sharply.",
        options: ["rises", "increases", "climbs"],
        answers: ["rises", "increases", "climbs"],
      },
      {
        id: 2,
        before: "Next the line ",
        error: "increases",
        after: " gradually.",
        options: ["decreases", "drops"],
        answers: ["decreases", "drops"],
      },
      {
        id: 3,
        before: "Then the line rises ",
        error: "sharply",
        after: ".",
        options: ["gradually", "steadily"],
        answers: ["gradually", "steadily"],
      },
      {
        id: 4,
        before: "After this, the line ",
        error: "plummets",
        after: ".",
        options: ["fluctuates"],
        answers: ["fluctuates"],
      },
      {
        id: 5,
        before: "Finally, there is a ",
        error: "slight",
        after: " drop.",
        options: ["sharp", "significant"],
        answers: ["sharp", "significant"],
      },
    ],
    tip: "1 rises/increases/climbs · 2 decreases/drops · 3 gradually/steadily · 4 fluctuates · 5 sharp/significant",
  },
  /** Coursebook b · TB keys. */
  instruction:
    "b Complete the sentences with the correct form of the verbs in brackets.",
  items: [
    {
      id: 1,
      before: "Last week I ",
      after:
        " the application forms to the three universities I’m interested in.",
      verb: "complete",
      answers: ["completed"],
      tip: "Last week → past simple.",
    },
    {
      id: 2,
      before:
        "My sister started an online English course last month and her vocabulary ",
      after: " every day.",
      verb: "increase",
      answers: ["is increasing"],
      tip: "every day (now) → present continuous.",
    },
    {
      id: 3,
      before: "When I saw my teacher smiling I knew I ",
      after: " a high mark for my essay.",
      verb: "achieve",
      answers: ["had achieved"],
      tip: "knew + earlier result → past perfect.",
    },
    {
      id: 4,
      before: "Since my friends and I started a band, I ",
      after: " much less nervous about performing in public.",
      verb: "become",
      answers: ["have become"],
      tip: "Since + started → present perfect.",
    },
    {
      id: 5,
      before: "Next year, my tutor ",
      after: " a new programming module into our course.",
      verb: "introduce",
      answers: [
        "is going to introduce",
        "’s going to introduce",
        "'s going to introduce",
      ],
      tip: "Next year (plan) → be going to.",
    },
    {
      id: 6,
      before:
        "After speaking to my parents about the benefits, I now know that I ",
      after: " abroad to study.",
      verb: "go",
      answers: ["will go", "’ll go", "'ll go"],
      tip: "now know that → will (decision / prediction).",
    },
  ],
  /** Coursebook c · TB: 're going to show · 'll outline · wanted · 'd thought · 've tried · love */
  stepC: {
    instruction:
      "c Choose the correct option in italics to complete the text.",
    parts: [
      {
        text: "Hello everyone and welcome to our presentation. Today we ",
      },
      {
        gap: 1,
        options: ["’re going to show", "show"] as [string, string],
        key: "’re going to show",
      },
      {
        text: " you our app, which is a phrasebook app. We ",
      },
      {
        gap: 2,
        options: ["’ve outlined", "’ll outline"] as [string, string],
        key: "’ll outline",
      },
      {
        text: " the reasons why we chose it, and then give you a demonstration. So, firstly, we ",
      },
      {
        gap: 3,
        options: ["want", "wanted"] as [string, string],
        key: "wanted",
      },
      {
        text: " to make an app that could help us travel around. As students we often travel, so it’d be really useful. We ",
      },
      {
        gap: 4,
        options: ["’d thought", "’re thinking"] as [string, string],
        key: "’d thought",
      },
      {
        text: " that there weren’t many apps on the market for this, but we were surprised to find out that quite a few existed. We ",
      },
      {
        gap: 5,
        options: ["’ve tried", "’d tried"] as [string, string],
        key: "’ve tried",
      },
      {
        text: " to make ours different though so we designed it like a cartoon. Students ",
      },
      {
        gap: 6,
        options: ["’re loving", "love"] as [string, string],
        key: "love",
      },
      {
        text: " gaming and cartoons so we thought this would appeal to them.",
      },
    ] as LangM1bChoiceBit[],
    tip: "1 ’re going to show · 2 ’ll outline · 3 wanted · 4 ’d thought · 5 ’ve tried · 6 love",
  },
};

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/’/g, "'")
    .replace(/\s+/g, " ");
}

export function checkTrendForm(input: string, answers: string[]): boolean {
  const n = normalize(input);
  return answers.some((a) => normalize(a) === n);
}

export function sameLangChoice(a: string, b: string): boolean {
  return normalize(a) === normalize(b);
}

export type LanguageM1bData = typeof languageM1b;
