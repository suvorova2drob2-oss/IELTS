/** Module 2 Review · p. 38 */

export const REVIEW_M2_STEPS = [
  "1a Vocabulary",
  "1b Italics",
  "2a Passive forms",
  "2b Relative clauses",
] as const;

export const REVIEW_M2_NEXT = [
  "1b Italics →",
  "2a Passive →",
  "2b Relative →",
  "← К модулю",
] as const;

export type ReviewItalBit =
  | { text: string }
  | { gap: number; options: string[]; key: string };

export function isReviewItalGap(
  part: ReviewItalBit,
): part is { gap: number; options: string[]; key: string } {
  return "gap" in part;
}

export type MarsBit = { text: string } | { gap: number };

export function isMarsGap(part: MarsBit): part is { gap: number } {
  return "gap" in part;
}

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/\s+/g, " ");
}

export function checkReviewM2Gap(input: string, answers: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return answers.some((a) => normalize(a) === n);
}

export const reviewM2 = {
  id: "review-m2-flow",
  bookPages: "p. 38 in your coursebook",
  sectionTitle: "Review",
  vocab: {
    badge: "1a",
    instruction:
      "Complete the sentences with the correct word or phrase (A, B or C).",
    items: [
      {
        id: 1,
        stem: "Due to climate change, it is likely that some species of animal will _______ over the next century.",
        options: ["transform", "die out", "emerge"] as const,
        key: 1,
      },
      {
        id: 2,
        stem: "The museum was greatly improved by the _______ of a new, larger gallery.",
        options: ["addition", "connection", "transference"] as const,
        key: 0,
      },
      {
        id: 3,
        stem: "I moved around a lot during my childhood, so it was nice when my family decided to come back to London and _______ .",
        options: ["spring up", "make it possible", "put down roots"] as const,
        key: 2,
      },
      {
        id: 4,
        stem: "The station is _______ here. It should only take you about ten minutes to walk there.",
        options: [
          "not too far from",
          "directly ahead of",
          "halfway down",
        ] as const,
        key: 0,
      },
      {
        id: 5,
        stem: "At the end of a long winter, animals such as bears _______ from hibernation.",
        options: ["emerge", "transform", "progress"] as const,
        key: 0,
      },
    ],
  },
  italics: {
    badge: "b",
    instruction:
      "Choose the correct option in italics to complete the text.",
    title: "My favourite trip",
    parts: [
      {
        text: "One of the greatest places I’ve ever visited is the Masai Mara in Kenya. When I went there last year I stayed in a beautiful camp which had been renovated in traditional style. All the buildings were wooden ",
      },
      {
        gap: 1,
        options: ["constructions", "constructed"],
        key: "constructions",
      },
      {
        text: ". It was an amazing trip because it was so varied. ",
      },
      {
        gap: 2,
        options: ["During", "While"],
        key: "During",
      },
      {
        text: " my stay I was able to meet and spend time with some Masai people as well as seeing the animals on safari.\n\nThe Masai people ",
      },
      {
        gap: 3,
        options: ["settled", "transformed"],
        key: "settled",
      },
      {
        text: " there in the 17th and 18th centuries. They are nomadic people, who farm the land and keep animals. They feel especially ",
      },
      {
        gap: 4,
        options: ["added", "connected"],
        key: "connected",
      },
      {
        text: " to cattle, which are a central part of their lifestyle. I spent two weeks living this nomadic lifestyle. At first I found it unusual, but then I got used to their simple way of life. Spending time with the Masai ",
      },
      {
        gap: 5,
        options: ["enabled", "progressed"],
        key: "enabled",
      },
      {
        text: " me to rethink some aspects of my stressful lifestyle.",
      },
    ] satisfies ReviewItalBit[],
  },
  passive: {
    badge: "2a",
    instruction:
      "Complete the sentences with the correct passive form of the verbs in brackets.",
    items: [
      {
        id: 1,
        before: "Crops such as rice and wheat ",
        verb: "grow",
        after: " all around the world for thousands of years.",
        answers: ["have been grown"],
      },
      {
        id: 2,
        before: "Modern life, with all the machines and gadgets that we love, ",
        verb: "start",
        after: " by the industrial revolution.",
        answers: ["was started"],
      },
      {
        id: 3,
        before: "Nowadays great progress ",
        verb: "make",
        after: " in finding treatments and cures for a variety of diseases.",
        answers: ["is being made", "has been made"],
      },
      {
        id: 4,
        before: "Some people believe we ",
        verb: "develop",
        after: " self-driving cars by the end of this decade.",
        answers: ["will have developed"],
      },
      {
        id: 5,
        before: "Before the invention of the internet, ideas ",
        verb: "spread",
        after: " by word of mouth.",
        answers: ["were spread"],
      },
      {
        id: 6,
        before: "The holiday resort ",
        verb: "construct",
        after:
          " before the airport was built so very few tourists went there at first.",
        answers: ["had been constructed"],
      },
      {
        id: 7,
        before: "The building ",
        verb: "repair",
        after:
          " when the builders found the old paintings in the cellar.",
        answers: ["was being repaired"],
      },
      {
        id: 8,
        before:
          "There is a new viewing platform on the hill and from here the animals in the park ",
        verb: "observe",
        after: " more easily.",
        answers: ["can be observed", "are observed", "may be observed"],
      },
    ],
  },
  mars: {
    badge: "b",
    instruction:
      "Complete the text about the mission to Mars using the words below. There are more words than you need.",
    bank: [
      "that",
      "while",
      "which",
      "during",
      "when",
      "who",
      "before",
      "whose",
    ],
    title: "A trip to Mars",
    key: {
      1: ["which", "that"],
      2: ["who"],
      3: ["when"],
      4: ["before"],
      5: ["that", "who"],
    } as Record<number, string[]>,
    parts: [
      { text: "Mars One is an organisation " },
      { gap: 1 },
      {
        text: " is based in the Netherlands. Its aim is to take the first humans to Mars and establish a permanent colony there by 2027. The project is being managed by a Dutch entrepreneur, ",
      },
      { gap: 2 },
      {
        text: " announced the project to the world in 2012.\n\nThe crew will be made up of people with a broad variety of skills including scientific knowledge, IT expertise and communication skills. In 2013, ",
      },
      { gap: 3 },
      {
        text: " the initial application period closed, over 2,500 people had applied to be an astronaut on the programme. The applicants have to complete a series of rigorous tests ",
      },
      { gap: 4 },
      {
        text: " being accepted onto the project. The applicants ",
      },
      { gap: 5 },
      {
        text: " are chosen for the mission will then spend seven years training.",
      },
    ] satisfies MarsBit[],
  },
};

export type ReviewM2Data = typeof reviewM2;
