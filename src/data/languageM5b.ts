export const LANG_M5B_STEPS = [
  "1a Noun phrases",
  "1b Articles",
  "2–4 Practice",
  "5a Reporting verbs",
  "5b Choose verbs",
] as const;

export const LANG_M5B_NEXT = [
  "1b Articles →",
  "2–4 Practice →",
  "5a Reporting →",
  "5b Choose →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ");
}

export function checkLangM5b(input: string, answers: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return answers.some((a) => normalize(a) === n);
}

export const languageM5b = {
  id: "language-m5b-flow",
  bookPages: "p. 80 in your coursebook",
  sectionTitle: "Language · Noun phrases & reporting verbs",
  grammarRef: "EXPERT GRAMMAR page 179",
  match1a: {
    badge: "1a",
    heading: "Noun phrases",
    instruction: "Match the noun phrases (1–4) with the structures (A–D).",
    items: [
      {
        id: 1,
        text: "students who study hard",
        key: "D",
      },
      {
        id: 2,
        text: "a laptop bag",
        key: "C",
      },
      {
        id: 3,
        text: "the book on the shelf",
        key: "A",
      },
      {
        id: 4,
        text: "striped wallpaper",
        key: "B",
      },
    ],
    options: [
      { id: "A", text: "noun + prepositional phrase" },
      { id: "B", text: "adjective + noun" },
      { id: "C", text: "noun + noun (compound)" },
      { id: "D", text: "noun + relative clause" },
    ],
  },
  articles1b: {
    badge: "b",
    instruction: "Choose the correct article rule for each situation.",
    items: [
      {
        id: 1,
        text: "First mention of a countable singular noun in general",
        key: "a",
      },
      {
        id: 2,
        text: "Something already known / unique / specific",
        key: "the",
      },
    ],
  },
  practice: {
    badge: "2–4",
    match2: {
      badge: "2",
      instruction: "Match the noun phrases with the sentence endings (A–D).",
      items: [
        {
          id: 1,
          text: "A quarter of all inventors",
          key: "C",
        },
        {
          id: 2,
          text: "New alarm systems",
          key: "B",
        },
        {
          id: 3,
          text: "Futuristic design",
          key: "A",
        },
        {
          id: 4,
          text: "Families who embrace new technology",
          key: "D",
        },
      ],
      options: [
        { id: "A", text: "… attracts tourists to new museums." },
        { id: "B", text: "… can reduce break-ins in smart homes." },
        { id: "C", text: "… never see their ideas go into production." },
        { id: "D", text: "… often upgrade devices every year." },
      ],
    },
    tips3: [
      "technological change / new (forms of) technology / using new technology",
      "that makes our lives easier",
      "The majority of new inventions",
    ],
    tips4: [
      "is a teleportation device",
      "is environmental damage",
      "that I would like to visit",
      "that could work as doctors",
    ],
  },
  reporting5a: {
    badge: "5a",
    heading: "Reporting verbs",
    instruction: "Complete the sentences with the correct reporting verbs.",
    bank: ["claim", "highlighted", "insist", "proved", "warn"],
    items: [
      {
        id: 1,
        before: "Critics ",
        after: " that space hotels are too expensive for ordinary travellers.",
        answers: ["claim"],
      },
      {
        id: 2,
        before: "The report ",
        after: " several risks linked to long stays in low gravity.",
        answers: ["highlighted"],
      },
      {
        id: 3,
        before: "Engineers ",
        after: " that the thrusters are completely safe.",
        answers: ["insist"],
      },
      {
        id: 4,
        before: "Tests have ",
        after: " that the heat shield works during re-entry.",
        answers: ["proved"],
      },
      {
        id: 5,
        before: "Scientists ",
        after: " people not to ignore radiation levels in orbit.",
        answers: ["warn"],
      },
    ],
  },
  reporting5b: {
    badge: "b",
    instruction: "Choose the correct reporting verb for each sentence.",
    bank: ["warned", "deny", "proved", "suggest", "claimed", "claim"],
    items: [
      {
        id: 1,
        before: "Officials ",
        after: " residents about possible flooding.",
        answers: ["warned"],
      },
      {
        id: 2,
        before: "The company continues to ",
        after: " any responsibility for the fault.",
        answers: ["deny"],
      },
      {
        id: 3,
        before: "Further research ",
        after: " that the design was viable.",
        answers: ["proved"],
      },
      {
        id: 4,
        before: "Experts ",
        after: " waiting until costs fall.",
        answers: ["suggest"],
      },
      {
        id: 5,
        before: "She ",
        after: " that the hotel would open within five years.",
        answers: ["claimed", "claim"],
      },
    ],
  },
};
