export const VOCAB_M5_STEPS = [
  "1a Word forms",
  "1b Complete",
  "1c Discuss",
  "2a Quantity",
  "3a Adverbs",
  "3b Opinions",
] as const;

export const VOCAB_M5_NEXT = [
  "1b Complete →",
  "1c Discuss →",
  "2a Quantity →",
  "3a Adverbs →",
  "3b Opinions →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ");
}

export function checkVocabM5(input: string, answers: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return answers.some((a) => normalize(a) === n);
}

export const vocabularyM5 = {
  id: "vocabulary-m5-flow",
  bookPages: "p. 74 in your coursebook",
  sectionTitle: "Vocabulary · Invention & innovation",
  forms1a: {
    badge: "1a",
    heading: "The language of invention and innovation",
    instruction:
      "Complete the sentences with the correct form of the words in brackets.",
    bank: [
      "innovation",
      "experimentation",
      "controversial",
      "intelligence",
      "accessible",
      "automation",
    ],
    items: [
      {
        id: 1,
        before: "Constant ",
        after: " is essential if technology companies want to stay ahead.",
        answers: ["innovation"],
        stem: "innovate",
      },
      {
        id: 2,
        before: "A lot of scientific ",
        after: " ends in failure before a breakthrough is made.",
        answers: ["experimentation"],
        stem: "experiment",
      },
      {
        id: 3,
        before: "GM food remains a highly ",
        after: " topic in many countries.",
        answers: ["controversial"],
        stem: "controversy",
      },
      {
        id: 4,
        before: "Artificial ",
        after: " is already built into many household devices.",
        answers: ["intelligence"],
        stem: "intelligent",
      },
      {
        id: 5,
        before: "Wifi-connected gadgets have made smart homes more ",
        after: " to ordinary consumers.",
        answers: ["accessible"],
        stem: "access",
      },
      {
        id: 6,
        before: "Factory ",
        after: " has reduced the need for repetitive manual labour.",
        answers: ["automation"],
        stem: "automate",
      },
    ],
  },
  complete1b: {
    badge: "b",
    instruction:
      "Complete the sentences with the correct form of the words from Exercise 1a.",
    bank: [
      "controversial",
      "innovation",
      "accessible",
      "experimentation",
      "intelligence",
      "automation",
    ],
    items: [
      {
        id: 1,
        before: "Drones for delivery are still ",
        after: " because of privacy concerns.",
        answers: ["controversial"],
      },
      {
        id: 2,
        before: "The latest phone is marketed as a breakthrough in ",
        after: ".",
        answers: ["innovation"],
      },
      {
        id: 3,
        before: "Public transport should be ",
        after: " to everyone, including people with disabilities.",
        answers: ["accessible"],
      },
      {
        id: 4,
        before: "Scientific ",
        after: " often leads to unexpected discoveries.",
        answers: ["experimentation"],
      },
      {
        id: 5,
        before: "Emotional ",
        after: " is something robots still struggle with.",
        answers: ["intelligence"],
      },
      {
        id: 6,
        before: "Home ",
        after: " systems can control lighting and heating from a phone.",
        answers: ["automation"],
      },
    ],
  },
  discuss1c: {
    badge: "c",
    instruction:
      "Which of the topics below do you find most controversial? Why?",
    topics: [
      "GM food",
      "electronic cigarettes",
      "drones",
      "car satellite navigation systems",
      "wind turbines",
    ],
    tip: "Numbers 1 and 2 (GM food / e-cigarettes) are often seen as most controversial because they place uncertainty on the future role of humans and health.",
  },
  quantity2a: {
    badge: "2a",
    heading: "Expressing quantity",
    instruction:
      "Complete the sentences with the phrases below. These phrases are useful for Writing Task 1.",
    bank: [
      "Both",
      "Few",
      "The majority",
      "a third",
      "Three quarters",
      "Most",
    ],
    items: [
      {
        id: 1,
        before: "",
        after: " of the inventions in the exhibition were practical rather than decorative.",
        answers: ["Most"],
      },
      {
        id: 2,
        before: "",
        after: " students agreed that robots could help with housework.",
        answers: ["The majority"],
      },
      {
        id: 3,
        before: "Exactly ",
        after: " of energy use went on water heating.",
        answers: ["a third"],
      },
      {
        id: 4,
        before: "",
        after: " people in the survey owned a smart speaker.",
        answers: ["Few"],
      },
      {
        id: 5,
        before: "",
        after: " gadgets in the list were designed for older users.",
        answers: ["Both"],
      },
      {
        id: 6,
        before: "",
        after: " of respondents said they would buy a household robot.",
        answers: ["Three quarters"],
      },
    ],
  },
  adverbs3a: {
    badge: "3a",
    heading: "Agreement and disagreement",
    instruction:
      "Put the adverbs into the correct group: weak opinion or strong opinion.",
    bank: [
      "marginally",
      "partly",
      "slightly",
      "somewhat",
      "entirely",
      "firmly",
      "thoroughly",
      "totally",
      "utterly",
      "wholeheartedly",
    ],
    weak: ["marginally", "partly", "slightly", "somewhat"],
    strong: [
      "entirely",
      "firmly",
      "thoroughly",
      "totally",
      "utterly",
      "wholeheartedly",
    ],
  },
  opinions3b: {
    badge: "b",
    instruction:
      "How far do you agree with each statement? Use an adverb from Exercise 3a and justify your view.",
    statements: [
      "Smartphones have ruined face-to-face conversation.",
      "Car satellite navigation systems make people worse drivers.",
      "Most gadgets are too expensive and complicated.",
      "Inventions and gadgets are a waste of money.",
    ],
  },
};
