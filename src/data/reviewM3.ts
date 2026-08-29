/** Module 3 Review · p. 54 */

export const REVIEW_M3_STEPS = [
  "1a Vocabulary",
  "1b–1c Text",
  "2a Conditionals",
  "2b–2c Grammar",
] as const;

export const REVIEW_M3_NEXT = [
  "1b–1c Text →",
  "2a Conditionals →",
  "2b–2c Grammar →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ");
}

export function checkReviewM3(input: string, answers: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return answers.some((a) => normalize(a) === n);
}

export type ReviewM3GapBit =
  | { text: string }
  | { gap: number; options: string[]; key: string };

export function isReviewM3Gap(
  part: ReviewM3GapBit,
): part is { gap: number; options: string[]; key: string } {
  return "gap" in part;
}

export const reviewM3 = {
  id: "review-m3-flow",
  bookPages: "p. 54 in your coursebook",
  sectionTitle: "Review",
  vocab1a: {
    badge: "1a",
    instruction:
      "Complete the sentences with one word. The first letter is given.",
    items: [
      {
        id: 1,
        stem: "One m______ of losing weight is to reduce carbohydrate intake.",
        answers: ["method"],
      },
      {
        id: 2,
        stem: "Smoking is a real t______ to good health.",
        answers: ["threat"],
      },
      {
        id: 3,
        stem: "The c______ of poor sleep is a lack of concentration.",
        answers: ["consequence"],
      },
      {
        id: 4,
        stem: "Exercising regularly can have positive o______ both physically and mentally.",
        answers: ["outcomes"],
      },
      {
        id: 5,
        stem: "People who have a forward-looking a______ to life are often happiest.",
        answers: ["approach", "attitude"],
      },
      {
        id: 6,
        stem: "Investing money in medical technology should be a p______ for the government.",
        answers: ["priority"],
      },
    ],
  },
  vocab1b: {
    badge: "b",
    instruction: "Complete the text with the words and phrases below.",
    bank: [
      "challenges",
      "evidently",
      "pose",
      "quick fix",
      "tackle",
      "the tip of the iceberg",
    ],
    parts: [
      { text: "Child food allergies are on the rise. One of the " },
      { gap: 1, options: ["challenges"], key: "challenges" },
      {
        text: " that the modern world faces is the rise in food allergies in children. In the UK alone, it has been estimated that approximately half of all children suffer from some type of food allergy. Some experts suggest that this number could be ",
      },
      { gap: 2, options: ["the tip of the iceberg"], key: "the tip of the iceberg" },
      {
        text: " because not many parents have their children tested for allergies. Experts in child health suggest that the modern diet and lifestyle ",
      },
      { gap: 3, options: ["pose"], key: "pose" },
      {
        text: " a threat to children's health and that we must work hard to find solutions that work. ",
      },
      { gap: 4, options: ["Evidently", "evidently"], key: "Evidently" },
      {
        text: " there is no ",
      },
      { gap: 5, options: ["quick fix"], key: "quick fix" },
      {
        text: " for this situation because people's lifestyles are different and a wide range of factors contribute to allergies. It is difficult to isolate which aspects are most problematic, which means that it is a challenge for doctors to ",
      },
      { gap: 6, options: ["tackle"], key: "tackle" },
      {
        text: " the issue of food allergies in children. For example, a method that works for one child may not be suitable for another.",
      },
    ] satisfies ReviewM3GapBit[],
  },
  vocab1c: {
    badge: "c",
    instruction:
      "Choose the correct attitude adverb in italics to complete the sentences.",
    items: [
      {
        id: 1,
        stem: "______ , I wasn't able to attend the event because my friend was visiting me from overseas.",
        options: ["Unfortunately", "Undoubtedly"],
        key: "Unfortunately",
      },
      {
        id: 2,
        stem: "Climbing Mount Fuji was ______ the most exciting experience of my life.",
        options: ["evidently", "undoubtedly"],
        key: "undoubtedly",
      },
      {
        id: 3,
        stem: "Children can become stressed when faced with competition at school. ______ , teachers should try to reduce this.",
        options: ["Evidently", "Unfortunately"],
        key: "Evidently",
      },
      {
        id: 4,
        stem: "Making sure you get enough exercise is ______ the best thing you can do to reduce stress levels.",
        options: ["unfortunately", "undeniably"],
        key: "undeniably",
      },
    ],
  },
  conditionals: {
    badge: "2a",
    instruction:
      "Complete the sentences with the correct conditional form of the verbs in brackets.",
    items: [
      {
        id: 1,
        before: "If doctors ",
        mid: " (visit) people at home, patients ",
        after: " (receive) better service.",
        answers: ["visited", "would receive"],
      },
      {
        id: 2,
        before: "Unless you ",
        mid: " (stop) smoking, you ",
        after: " (have) serious health problems later in life.",
        answers: ["stop", "will have"],
      },
      {
        id: 3,
        before: "If I ",
        mid: " (take up) horse riding, I ",
        after: " (have) enough money, but it's too expensive for me.",
        answers: ["took up", "would have"],
      },
      {
        id: 4,
        before: "When ",
        mid: " (have) some free time at the weekends, ",
        after: " (go walking) in the mountains.",
        answers: ["I have", "I go walking"],
      },
      {
        id: 5,
        before: "If children ",
        mid: " (learn) to cook, they are more likely ",
        after: " (grow up) to become healthier adults.",
        answers: ["learn", "to grow up"],
      },
    ],
  },
  passive: {
    badge: "2b",
    instruction: "Rewrite the sentences using modal passive forms.",
    items: [
      {
        id: 1,
        stem: "The government should spend more money on medical research.",
        answers: [
          "more money should be spent on medical research (by the government)",
          "more money should be spent on medical research",
        ],
      },
      {
        id: 2,
        stem: "We could easily solve the problem of stress if we worked less.",
        answers: [
          "the problem of stress could easily be solved if we worked less",
          "the problem of stress could be easily solved if we worked less",
        ],
      },
    ],
  },
  modals: {
    badge: "2c",
    instruction:
      "Choose the correct option in italics to complete the sentences.",
    items: [
      {
        id: 1,
        options: ["should", "would"],
        key: "should",
        parts: [
          { text: "I suggest that everyone " },
          { gap: true },
          { text: " take a holiday once a year in order to destress from work." },
        ],
      },
      {
        id: 2,
        options: ["will", "must"],
        key: "must",
        parts: [
          {
            text: "Increasing the amount of protein and fibre in your diet ",
          },
          { gap: true },
          { text: " have beneficial effects." },
        ],
      },
    ],
  },
};
