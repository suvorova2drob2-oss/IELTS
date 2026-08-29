export const LANG_M4B_STEPS = [
  "1a Match pronouns",
  "1b Pronoun types",
  "2 Gap fill",
  "3a Categorise",
  "3b Signposting",
] as const;

export const LANG_M4B_NEXT = [
  "1b Pronoun types →",
  "2 Gap fill →",
  "3a Categorise →",
  "3b Signposting →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[.,;:!?]+$/g, "");
}

export function checkLangM4b(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export type LangM4bGap =
  | { text: string }
  | { gap: number; key: string };

export function isLangM4bGap(
  part: LangM4bGap,
): part is { gap: number; key: string } {
  return "gap" in part;
}

export const languageM4b = {
  id: "language-m4b-flow",
  bookPages: "p. 64 in your coursebook",
  sectionTitle: "Language development · Pronouns & signposting",
  grammarRef: "EXPERT GRAMMAR page 178",
  match1a: {
    badge: "1a",
    heading: "Pronoun referencing",
    instruction:
      "Match the underlined pronouns (1–10) with what they refer to (A–J).",
    sentences: [
      {
        id: 1,
        text: "Many shoppers buy brand-name goods because they believe these products will impress their friends.",
        underline: "they",
        key: "E",
      },
      {
        id: 2,
        text: "Fast fashion produces huge volumes of clothing, and much of it ends up in landfill within a year.",
        underline: "it",
        key: "G",
      },
      {
        id: 3,
        text: "Sarah sold her old phone online; she used the money to buy a refurbished model instead.",
        underline: "she",
        key: "B",
      },
      {
        id: 4,
        text: "People often keep gadgets they no longer need, which creates unnecessary clutter at home.",
        underline: "which",
        key: "I",
      },
      {
        id: 5,
        text: "Tom and Maya started a repair café. Their aim is to help neighbours fix broken appliances.",
        underline: "Their",
        key: "A",
      },
      {
        id: 6,
        text: "Recycling schemes work best when local councils support them with clear information.",
        underline: "them",
        key: "D",
      },
      {
        id: 7,
        text: "If you leave packaging on the counter, someone else has to deal with this later.",
        underline: "this",
        key: "H",
      },
      {
        id: 8,
        text: "Consumers want convenience, yet that often conflicts with environmental goals.",
        underline: "that",
        key: "J",
      },
      {
        id: 9,
        text: "The factory closed last year. Since then, those workers have struggled to find similar jobs.",
        underline: "those",
        key: "F",
      },
      {
        id: 10,
        text: "Landfill sites are filling up quickly, and we cannot ignore this problem any longer.",
        underline: "we",
        key: "C",
      },
    ],
    referents: [
      { id: "A", text: "Tom and Maya" },
      { id: "B", text: "Sarah" },
      { id: "C", text: "people in general / society" },
      { id: "D", text: "recycling schemes" },
      { id: "E", text: "many shoppers" },
      { id: "F", text: "the workers from the factory" },
      { id: "G", text: "clothing produced by fast fashion" },
      { id: "H", text: "leaving packaging on the counter" },
      { id: "I", text: "keeping gadgets they no longer need" },
      { id: "J", text: "wanting convenience" },
    ],
    keys: {
      1: "E",
      2: "G",
      3: "B",
      4: "I",
      5: "A",
      6: "D",
      7: "H",
      8: "J",
      9: "F",
      10: "C",
    } as Record<number, string>,
  },
  discuss1b: {
    badge: "b",
    instruction: "Answer the questions about pronoun types.",
    items: [
      {
        id: 1,
        q: "Which pronouns usually refer to people?",
        tip: "he, she, his, her, they, we, our, you, your, etc.",
      },
      {
        id: 2,
        q: "What can they / these / those refer to besides people?",
        tip: "plural nouns and people, longer phrases or ideas",
      },
      {
        id: 3,
        q: "Can this / that refer to a single noun and to a whole idea?",
        tip: "both",
      },
      {
        id: 4,
        q: "What do which, who and where usually refer to?",
        tip: "which – nouns and whole phrases/ideas, who – people, where – places",
      },
    ],
  },
  gap2: {
    badge: "2",
    instruction:
      "Complete the text with suitable pronouns. More than one answer may be possible.",
    bank: ["which", "This", "Their", "they", "These", "their"],
    items: [
      {
        id: 1,
        before: "Many electronic devices contain rare metals ",
        after: " are difficult to extract.",
        answers: ["which"],
      },
      {
        id: 2,
        before: "",
        after:
          " means manufacturers must plan carefully when designing new models.",
        answers: ["This", "Their", "this", "their"],
      },
      {
        id: 3,
        before: "When consumers upgrade phones every year, ",
        after: " create mountains of e-waste.",
        answers: ["they"],
      },
      {
        id: 4,
        before: "",
        mid: " discarded gadgets still have parts that could be reused if ",
        after: " owners recycled them responsibly.",
        answersFirst: ["These", "This", "these", "this"],
        answersSecond: ["their"],
        /** Display keys for click-to-place: first blank, second blank */
        display: "These/This, their",
      },
    ],
  },
  categorise3a: {
    badge: "3a",
    heading: "Signposting words",
    instruction:
      "Put the signposting words below into the correct category.",
    bank: [
      "furthermore",
      "in addition",
      "finally",
      "in conclusion",
      "initially",
      "although",
      "despite",
      "however",
      "nevertheless",
      "on the contrary",
      "whereas",
      "for instance",
      "in particular",
      "consequently",
      "due to",
      "therefore",
    ],
    categories: [
      {
        id: "add",
        label: "To add more information",
        answers: ["furthermore", "in addition"],
      },
      {
        id: "order",
        label: "To show the order of things",
        answers: ["finally", "in conclusion", "initially"],
      },
      {
        id: "contrast",
        label: "To compare or contrast",
        answers: [
          "although",
          "despite",
          "however",
          "nevertheless",
          "on the contrary",
          "whereas",
        ],
      },
      {
        id: "examples",
        label: "To give examples",
        answers: ["for instance", "in particular"],
      },
      {
        id: "reason",
        label: "To show reasons and results",
        answers: ["consequently", "due to", "therefore"],
      },
    ],
  },
  gap3b: {
    badge: "b",
    instruction:
      "Complete the sentences with the correct signposting words below.",
    bank: [
      "Although",
      "Furthermore",
      "However",
      "In addition",
      "Initially",
      "On the contrary",
      "due to",
      "in particular",
      "therefore",
    ],
    items: [
      {
        id: 1,
        before:
          "Some people claim that individuals cannot help the environment. ",
        after:
          ", small daily choices such as refusing plastic bags do make a difference.",
        key: "On the contrary",
      },
      {
        id: 2,
        before: "",
        after:
          " recycling facilities have improved, many households still mix their waste incorrectly.",
        key: "Although",
      },
      {
        id: 3,
        before: "Factories have cut production ",
        after: " rising energy costs.",
        key: "due to",
      },
      {
        id: 4,
        before:
          "Councils provide kerbside collection. ",
        after: ", they run education campaigns in schools.",
        key: "In addition",
      },
      {
        id: 5,
        before: "",
        after:
          ", the company focused on reducing packaging; later it invested in renewable energy.",
        key: "Initially",
      },
      {
        id: 6,
        before:
          "Second-hand shopping can save money. ",
        after: ", some shoppers still prefer brand-new goods.",
        key: "However",
      },
      {
        id: 7,
        before:
          "Repair cafés reduce waste. ",
        after: ", they help people learn practical skills.",
        key: "Furthermore",
      },
      {
        id: 8,
        before:
          "Young consumers are influenced by advertising, ",
        after: " by social media influencers.",
        key: "in particular",
      },
      {
        id: 9,
        before:
          "Landfill space is limited; ",
        after: " governments must promote reuse and recycling.",
        key: "therefore",
      },
    ],
  },
};
