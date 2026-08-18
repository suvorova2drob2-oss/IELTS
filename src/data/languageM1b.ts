/** Module 1B · Untapped resources · Language p. 16 · Describe trends. */

export type TrendCol = "up" | "down" | "stable";

export const LANG_M1B_STEPS = ["2a Table", "b Verb forms"] as const;

export const languageM1b = {
  id: "language-m1b-flow",
  module: 1,
  bookPages: "p. 16 in your coursebook",
  table: {
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
  instruction:
    "b Complete the sentences with the correct form of the verbs in brackets.",
  tenseCues: [
    { marker: "Since / this century", tense: "present perfect (have + V3)" },
    { marker: "In the future / coming years", tense: "will / going to" },
    { marker: "At the end of the 20th century", tense: "past simple" },
    { marker: "after … had worn off", tense: "past simple" },
  ],
  items: [
    {
      id: 1,
      before: "Since this academic year started, the students’ grades ",
      after: " steadily.",
      verb: "rise",
      answers: ["have risen", "have been rising"],
      tip: "Since + started → present perfect.",
    },
    {
      id: 2,
      before:
        "The number of students taking online higher education courses ",
      after: " after the initial excitement had worn off.",
      verb: "plummet",
      answers: ["plummeted"],
      tip: "had worn off → past simple after that.",
    },
    {
      id: 3,
      before: "In the future, the use of technology in all types of learning ",
      after: " beyond what we can now imagine.",
      verb: "soar",
      answers: ["will soar", "is going to soar", "will be soaring"],
      tip: "In the future → will / going to.",
    },
    {
      id: 4,
      before: "The need for IT and science knowledge for the future workforce ",
      after: " considerably this century.",
      verb: "grow",
      answers: ["has grown", "has been growing"],
      tip: "this century = still going on → present perfect.",
    },
    {
      id: 5,
      before: "The popularity of media degrees ",
      after: " because there are now many unemployed media graduates.",
      verb: "decline",
      answers: ["is declining", "has declined", "has been declining"],
      tip: "now → present / present perfect.",
    },
    {
      id: 6,
      before: "The government has said that it ",
      after:
        " funding for sport in primary and secondary education over the coming years.",
      verb: "reduce",
      answers: ["will reduce", "is going to reduce", "would reduce"],
      tip: "coming years → future after has said.",
    },
    {
      id: 7,
      before:
        "At the end of the 20th century the importance of studying languages in the UK ",
      after: ".",
      verb: "decrease",
      answers: ["decreased"],
      tip: "At the end of the 20th century → finished time, past simple.",
    },
    {
      id: 8,
      before: "The government has announced that they ",
      after: " tuition fees for the next academic year.",
      verb: "increase",
      answers: [
        "will increase",
        "are going to increase",
        "are increasing",
        "would increase",
      ],
      tip: "next academic year → future after has announced.",
    },
  ],
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

export type LanguageM1bData = typeof languageM1b;
