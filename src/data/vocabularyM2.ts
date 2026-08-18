export const VOCAB_M2_STEPS = [
  "1a Match",
  "1b Verb forms",
  "2a Spoken / written",
  "2b–2c Phrasal",
  "3a Process verbs",
  "3b Word forms",
] as const;

export const VOCAB_M2_NEXT: Record<number, string> = {
  0: "1b →",
  1: "2a →",
  2: "2b →",
  3: "3a →",
  4: "3b →",
  5: "К модулю ←",
};

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/\s+/g, " ");
}

export function checkVocabM2(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export type FormCell =
  | { given: string }
  | { id: number; answers: string[] };

export type GapBit = { text: string } | { gap: number; answers: string[] };

export type ProcessBit =
  | { text: string }
  | { gap: number; options: string[]; key: string };

export function isFormBlank(
  cell: FormCell,
): cell is { id: number; answers: string[] } {
  return "id" in cell;
}

export function isGapBit(
  part: GapBit,
): part is { gap: number; answers: string[] } {
  return "gap" in part;
}

export function isProcessGap(
  part: ProcessBit,
): part is { gap: number; options: string[]; key: string } {
  return "gap" in part;
}

export const vocabularyM2 = {
  id: "vocabulary-m2-flow",
  module: 2,
  bookPages: "p. 26",
  sectionTitle: "Academic verbs · Written and spoken · Process verbs",
  verbs: [
    "disappear",
    "emerge",
    "enable",
    "progress",
    "settle",
    "transform",
  ] as const,
  meanings: [
    {
      id: 1,
      text: "to improve or develop things so that they are at a more advanced stage",
      key: "progress",
    },
    {
      id: 2,
      text: "to make it possible for someone to do something or for something to happen",
      key: "enable",
    },
    {
      id: 3,
      text: "to go and live somewhere, usually permanently",
      key: "settle",
    },
    {
      id: 4,
      text: "to completely change the appearance, form or character of something or someone, especially in a way that improves it",
      key: "transform",
    },
    {
      id: 5,
      text: "to begin to be known or noticed",
      key: "emerge",
    },
    {
      id: 6,
      text: "to stop existing or reduce rapidly",
      key: "disappear",
    },
  ],
  gapText: {
    instruction:
      "Complete the text with the correct form of the verbs from Exercise 1a. There is one extra verb.",
    title: "An alternative world?",
    unused: "progress",
    parts: [
      { text: "One little-known revolution " },
      { gap: 1, answers: ["transformed"] },
      {
        text: " the future of the USA: the Haitian Revolution. In 1791, the black slaves on the island of Haiti rebelled against their French colonisers who had ",
      },
      { gap: 2, answers: ["settled"] },
      {
        text: " on the island as part of Napoléon Bonaparte's empire, which was growing rapidly. His ultimate plan was to conquer the United States as a French colony. This would ",
      },
      { gap: 3, answers: ["enable"] },
      {
        text: " France to have more power across the world. However, when he sent his army to stop this uprising, there was an outbreak of disease which killed many of his men. With his finances ",
      },
      { gap: 4, answers: ["disappearing", "disappeared"] },
      {
        text: " due to the expense of waging war on this island, he had to shift his attention from the United States. This has had far-reaching effects; perhaps French would have even ",
      },
      { gap: 5, answers: ["emerged"] },
      { text: " as the prominent language." },
    ] satisfies GapBit[],
  },
  spokenWritten: {
    instruction: "Look at the sentences. Which is spoken and which is written? Why?",
    items: [
      {
        id: 1,
        text: "To better manage modern life, many people have to expand their skill sets.",
        key: "written" as const,
        why: "Formal: To better manage, expand their skill sets — typical of writing.",
      },
      {
        id: 2,
        text: "It's important to build up a lot of different skills so you can deal with life these days.",
        key: "spoken" as const,
        why: "Spoken: It's, build up, deal with, these days.",
      },
    ],
  },
  phrasal: {
    instruction:
      "Adapt the questions into spoken English. Replace the words in bold with the correct form of one of the phrases below. There is one extra phrase.",
    bank: [
      "die out",
      "get on",
      "make it possible for",
      "put down roots",
      "spring up",
    ],
    extra: "get on",
    items: [
      {
        id: 1,
        before: "Are there any traditions in your country that you think are ",
        bold: "disappearing",
        after: "? Can you give any examples?",
        answers: ["dying out"],
      },
      {
        id: 2,
        before: "What changes have ",
        bold: "enabled",
        after: " people to have an easier life?",
        answers: ["made it possible for"],
      },
      {
        id: 3,
        before: "Why do people ",
        bold: "settle",
        after: " in new countries?",
        answers: ["put down roots"],
      },
      {
        id: 4,
        before: "What changes in society have ",
        bold: "suddenly emerged",
        after: " in your country in the last 20 years?",
        answers: ["sprung up", "sprung up suddenly", "suddenly sprung up"],
      },
    ],
    discuss: "Work in pairs and discuss the questions in Exercise 2b.",
  },
  process: {
    instruction: "Choose the correct option in italics to complete the text.",
    title: "Humans: friend or foe?",
    parts: [
      { text: "A lot has changed in the world over the last 2000 years. Developments such as the " },
      { gap: 1, options: ["construction", "construct"], key: "construction" },
      { text: " of buildings, towns and cities, the ability to " },
      { gap: 2, options: ["hot", "heat"], key: "heat" },
      { text: " and " },
      { gap: 3, options: ["cool", "cold"], key: "cool" },
      { text: " the environments we live in, the ability to " },
      { gap: 4, options: ["connect", "connection"], key: "connect" },
      {
        text: " to people all around the world at the click of a button, have made our lives more comfortable and infinitely more enjoyable. However, human ",
      },
      { gap: 5, options: ["adds", "additions"], key: "additions" },
      { text: " to the planet have not always been positive. Although we have seen civilisations " },
      { gap: 6, options: ["develop", "development"], key: "develop" },
      { text: ", we have also seen the " },
      { gap: 7, options: ["destruction", "destroy"], key: "destruction" },
      { text: " of some natural habitats and animal life due to human intervention." },
    ] satisfies ProcessBit[],
  },
  wordTable: {
    instruction: "Complete the table.",
    rows: [
      {
        noun: { id: 1, answers: ["heat", "heating"] },
        verb: { id: 2, answers: ["heat"] },
        adj: { given: "hot/heated" },
      },
      {
        noun: { id: 3, answers: ["cooling", "coolness", "cool"] },
        verb: { given: "cool" },
        adj: { id: 4, answers: ["cool", "cooled", "cooling"] },
      },
      {
        noun: { id: 5, answers: ["construction"] },
        verb: { given: "construct" },
        adj: { id: 6, answers: ["constructive", "constructed"] },
      },
      {
        noun: { given: "connection" },
        verb: { id: 7, answers: ["connect"] },
        adj: { id: 8, answers: ["connected", "connective"] },
      },
      {
        noun: { id: 9, answers: ["development"] },
        verb: { given: "develop" },
        adj: { id: 10, answers: ["developed", "developing", "developmental"] },
      },
      {
        noun: { id: 11, answers: ["addition"] },
        verb: { given: "add" },
        adj: { id: 12, answers: ["additional", "added"] },
      },
      {
        noun: { id: 13, answers: ["destruction"] },
        verb: { id: 14, answers: ["destroy"] },
        adj: { given: "destroyed/destructible" },
      },
      {
        noun: { id: 15, answers: ["rise"] },
        verb: { given: "rise" },
        adj: { id: 16, answers: ["rising", "risen"] },
      },
      {
        noun: { given: "rotation/rotator" },
        verb: { id: 17, answers: ["rotate"] },
        adj: { id: 18, answers: ["rotating", "rotary", "rotational"] },
      },
      {
        noun: { id: 19, answers: ["transfer", "transference"] },
        verb: { given: "transfer" },
        adj: { id: 20, answers: ["transferable", "transferred"] },
      },
      {
        noun: { id: 21, answers: ["extraction", "extract"] },
        verb: { given: "extract" },
        adj: { id: 22, answers: ["extractable", "extracted"] },
      },
    ] satisfies { noun: FormCell; verb: FormCell; adj: FormCell }[],
  },
};

export function vocabM2GapIds(): number[] {
  return vocabularyM2.gapText.parts.filter(isGapBit).map((p) => p.gap);
}

export function vocabM2TableBlanks(): { id: number; answers: string[] }[] {
  const out: { id: number; answers: string[] }[] = [];
  for (const row of vocabularyM2.wordTable.rows) {
    for (const cell of [row.noun, row.verb, row.adj]) {
      if (isFormBlank(cell)) out.push(cell);
    }
  }
  return out;
}
