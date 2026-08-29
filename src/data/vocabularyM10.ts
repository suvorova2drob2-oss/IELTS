export const VOCAB_M10_STEPS = [
  "1a Match meanings",
  "1b Verb forms",
  "2 Gap-fill",
  "3 Discuss",
  "4a Collocations",
  "4b–5 Practice",
] as const;

export const VOCAB_M10_NEXT = [
  "1b Verb forms →",
  "2 Gap-fill →",
  "3 Discuss →",
  "4a Collocations →",
  "4b–5 Practice →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ");
}

export function checkVocabM10(input: string, answers: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return answers.some((a) => normalize(a) === n);
}

export const vocabularyM10 = {
  id: "vocabulary-m10-flow",
  bookPages: "p. 154 in your coursebook",
  sectionTitle: "Vocabulary · Hypothesising & speculation",
  match1a: {
    badge: "1a",
    heading: "Nouns for hypothesising",
    instruction: "Match the words (1–6) with the correct definitions (A–F).",
    bank: [
      "assumption",
      "concept",
      "implication",
      "insight",
      "speculation",
      "inference",
    ],
    items: [
      {
        id: 1,
        text: "A possible future effect or result of an action, event or decision.",
        key: "implication",
      },
      {
        id: 2,
        text: "An abstract idea of how something is.",
        key: "concept",
      },
      {
        id: 3,
        text: "When you guess about the possible causes or effects of something without knowing all the facts.",
        key: "speculation",
      },
      {
        id: 4,
        text: "Something that you believe is true although you have no definite proof.",
        key: "assumption",
      },
      {
        id: 5,
        text: "A conclusion formed on information that you have.",
        key: "inference",
      },
      {
        id: 6,
        text: "A deep understanding of something, especially a complicated situation or idea.",
        key: "insight",
      },
    ],
  },
  forms1b: {
    badge: "b",
    instruction:
      "Write the verb forms for the nouns in Exercise 1a. Which noun does not have a verb form? Place the correct verb (or ‘no verb’) for each noun.",
    bank: ["assume", "conceive", "imply", "no verb", "speculate", "infer"],
    items: [
      {
        id: 1,
        before: "assumption → ",
        after: "",
        answers: ["assume"],
      },
      {
        id: 2,
        before: "concept → ",
        after: "",
        answers: ["conceive"],
      },
      {
        id: 3,
        before: "implication → ",
        after: "",
        answers: ["imply"],
      },
      {
        id: 4,
        before: "insight → ",
        after: "",
        answers: ["no verb"],
      },
      {
        id: 5,
        before: "speculation → ",
        after: "",
        answers: ["speculate"],
      },
      {
        id: 6,
        before: "inference → ",
        after: "",
        answers: ["infer"],
      },
    ],
  },
  collocations2a: {
    badge: "2",
    heading: "Creativity is for everyone",
    instruction:
      "Choose the correct option to complete the text (Teacher’s Book keys).",
    bank: ["assume", "conceive", "implications", "concept"],
    items: [
      {
        id: 1,
        before: "Many people ",
        after:
          " that creativity is something that humans are born with or without.",
        answers: ["assume"],
      },
      {
        id: 2,
        before:
          "However, this is actually conjecture and not based on actual evidence. Recent academic studies have shown that creativity is present in everyone, but that most people cannot ",
        after: " of it in themselves.",
        answers: ["conceive"],
      },
      {
        id: 3,
        before:
          "A study of 300 elderly people at George Washington University found that creative activities slowed the ageing process. There are several positive ",
        after:
          " of this study including fewer hospital visits and improved mental health in the elderly.",
        answers: ["implications"],
      },
      {
        id: 4,
        before: "Experts suggest we need to expand our ",
        after:
          " of creativity. As neurologist Richard Restak says, ‘Creativity is critical to solving problems in all parts of our lives.’",
        answers: ["concept"],
      },
    ],
  },
  speaking2b: {
    badge: "3",
    instruction:
      "Work in groups and discuss the questions. Answer fully (at least 30 seconds per question). These are like Speaking Part 3.",
    tip: "1 I assume that creative people are constantly positive and see the world differently from the rest of us — as though everything is an artistic opportunity. 2 I think this is because it is so elusive and individual. We can never really understand the inspiration of an artist, so people like to speculate on various possibilities. 3 The implications are extremely serious in my opinion. Children and young people are supremely creative and society needs to ensure that schools are places where this creativity can be explored and enhanced.",
  },
  mcq3a: {
    badge: "4a",
    instruction:
      "Choose the correct adjectives (A–C) to complete the sentences below.",
    items: [
      {
        id: 1,
        stem: "Innovation is good, but some advances have ______ implications for society, such as nuclear power.",
        options: [
          { id: "A", text: "underlying" },
          { id: "B", text: "wider" },
          { id: "C", text: "abstract" },
        ],
        key: "B",
      },
      {
        id: 2,
        stem: "The ______ perception of modern art varies from appreciation to disdain.",
        options: [
          { id: "A", text: "intense" },
          { id: "B", text: "abstract" },
          { id: "C", text: "public" },
        ],
        key: "C",
      },
      {
        id: 3,
        stem: "There has been ______ speculation about the provenance of the newly discovered painting.",
        options: [
          { id: "A", text: "heavy" },
          { id: "B", text: "underlying" },
          { id: "C", text: "intense" },
        ],
        key: "C",
      },
      {
        id: 4,
        stem: "There is an ______ assumption that creating art is a compulsive action for many creative people.",
        options: [
          { id: "A", text: "underlying" },
          { id: "B", text: "everlasting" },
          { id: "C", text: "omnipotent" },
        ],
        key: "A",
      },
      {
        id: 5,
        stem: "Communicating ______ concepts to young children can be very challenging.",
        options: [
          { id: "A", text: "public" },
          { id: "B", text: "abstract" },
          { id: "C", text: "straightforward" },
        ],
        key: "B",
      },
    ],
  },
  practice3b: {
    badge: "4b–5",
    instruction:
      "Complete with collocations / speculation phrases (concept, perception, assumption, implications; impression, surprised, chances, confident, likelihood, guess).",
    bank: [
      "concept",
      "perception",
      "assumption",
      "implications",
      "impression",
      "surprised",
      "chances",
      "confident",
      "likelihood",
      "guess",
    ],
    items: [
      {
        id: 1,
        before:
          "Many respondents cited the abstract ",
        after:
          " of creativity as critical to the success of the global economy.",
        answers: ["concept"],
      },
      {
        id: 2,
        before: "Although the public ",
        after:
          " of creativity concentrates on the traditional art forms, business leaders see things differently.",
        answers: ["perception"],
      },
      {
        id: 3,
        before: "There is certainly an underlying ",
        after:
          " that the ‘imagination’ economy will be responsible for creating new solutions to many of the world’s problems.",
        answers: ["assumption"],
      },
      {
        id: 4,
        before:
          "The manner in which the world of business harnesses creativity to foster new ideas will have wider ",
        after: " for problems such as climate change and disease.",
        answers: ["implications"],
      },
      {
        id: 5,
        before: "I get the ",
        after:
          " that it is difficult for creative people to predict how successful their work will be.",
        answers: ["impression"],
      },
      {
        id: 6,
        before: "I would not be ",
        after:
          " if many cultures lost some of their traditional artistic practices.",
        answers: ["surprised"],
      },
      {
        id: 7,
        before: "The ",
        after:
          " are that everyone can find something creative that they can do competently.",
        answers: ["chances"],
      },
      {
        id: 8,
        before: "I am ",
        after:
          " that creativity in children can be fully developed if they are given encouragement.",
        answers: ["confident"],
      },
      {
        id: 9,
        before: "In all ",
        after:
          ", music will only be available electronically in the future.",
        answers: ["likelihood"],
      },
      {
        id: 10,
        before: "My ",
        after:
          " is that in the future, science-fiction novels will become a thing of the past.",
        answers: ["guess"],
      },
    ],
  },
  discuss3c: {
    badge: "Extra",
    instruction:
      "Discuss: How can we inspire young people to continue studying? Use nouns for hypothesising, academic collocations and phrases for speculation.",
    tip: "Speaking: phrases for speculation, nouns for hypothesising, academic collocations. Writing: nouns for hypothesising, academic collocations.",
  },
};
