/** Module 4 Review · p. 70 */

export const REVIEW_M4_STEPS = [
  "1a Vocabulary",
  "1b Match",
  "1c Signposting",
  "2a Punctuation",
  "2b Pronouns",
] as const;

export const REVIEW_M4_NEXT = [
  "1b Match →",
  "1c Signposting →",
  "2a Punctuation →",
  "2b Pronouns →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ");
}

export function checkReviewM4(input: string, answers: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return answers.some((a) => normalize(a) === n);
}

export type ReviewM4GapBit =
  | { text: string }
  | { gap: number; key: string };

export function isReviewM4Gap(
  part: ReviewM4GapBit,
): part is { gap: number; key: string } {
  return "gap" in part;
}

export const reviewM4 = {
  id: "review-m4-flow",
  bookPages: "p. 70 in your coursebook",
  sectionTitle: "Review",
  vocab1a: {
    badge: "1a",
    instruction:
      "Complete the sentences with the correct form of the words below.",
    bank: [
      "conceive",
      "contradicts",
      "pass",
      "speculate",
      "faith",
      "convince",
    ],
    items: [
      {
        id: 1,
        before: "It is hard to ",
        after:
          " of a modern lifestyle without smartphones and other digital devices.",
        answers: ["conceive"],
      },
      {
        id: 2,
        before:
          "The latest research into landfill waste ",
        after:
          " the claim that household recycling rates are already high enough.",
        answers: ["contradicts"],
      },
      {
        id: 3,
        before: "Consumers should not ",
        after:
          " judgement on people who cannot afford ethically produced goods.",
        answers: ["pass"],
      },
      {
        id: 4,
        before: "Economists ",
        after:
          " that demand for rare metals in gadgets will keep rising for decades.",
        answers: ["speculate"],
      },
      {
        id: 5,
        before: "Many shoppers no longer have ",
        after:
          " in advertising claims about how 'green' a product really is.",
        answers: ["faith"],
      },
      {
        id: 6,
        before: "It can be difficult to ",
        after:
          " people that repairing an old appliance is better than buying a new one.",
        answers: ["convince"],
      },
    ],
  },
  match1b: {
    badge: "b",
    instruction: "Match 1–5 with A–E to form collocations.",
    left: [
      { id: 1, text: "to take" },
      { id: 2, text: "to have" },
      { id: 3, text: "to be" },
      { id: 4, text: "to resign" },
      { id: 5, text: "to pass" },
    ],
    right: [
      { id: "A", text: "a lot of faith in something" },
      { id: "B", text: "oneself to something" },
      { id: "C", text: "something into consideration" },
      { id: "D", text: "judgement on something" },
      { id: "E", text: "open to ideas" },
    ],
    keys: { 1: "C", 2: "A", 3: "E", 4: "B", 5: "D" } as Record<
      number,
      string
    >,
  },
  signpost1c: {
    badge: "c",
    instruction:
      "Complete the text with the signposting words and phrases below.",
    bank: [
      "initially",
      "For instance,",
      "Despite",
      "due to",
      "In particular",
      "Furthermore",
      "Consequently",
      "Although",
    ],
    parts: [
      { text: "Many cities have tried to cut waste. " },
      { gap: 1, key: "initially" },
      {
        text: ", they focused on educating households about recycling. ",
      },
      { gap: 2, key: "For instance," },
      {
        text: " leaflets explained how to separate plastics from food waste. ",
      },
      { gap: 3, key: "Despite" },
      {
        text: " these campaigns, contamination rates remained high ",
      },
      { gap: 4, key: "due to" },
      {
        text: " confusion about packaging labels. ",
      },
      { gap: 5, key: "In particular" },
      {
        text: ", soft plastics caused problems at sorting plants. ",
      },
      { gap: 6, key: "Furthermore" },
      {
        text: ", some residents still preferred the convenience of throwing everything away. ",
      },
      { gap: 7, key: "Consequently" },
      {
        text: ", councils introduced fines for mixed bins. ",
      },
      { gap: 8, key: "Although" },
      {
        text: " the new rules were unpopular at first, recycling quality improved within a year.",
      },
    ] satisfies ReviewM4GapBit[],
  },
  punctuate2a: {
    badge: "2a",
    instruction:
      "Rewrite the sentences with correct punctuation and clause structure.",
    items: [
      {
        id: 1,
        broken:
          "Many consumers believe that it is cost effective to buy cheaply and replace goods frequently",
        answers: [
          "Many consumers believe that it is cost effective to buy cheaply and replace goods frequently.",
        ],
      },
      {
        id: 2,
        broken:
          "While the decreasing cost of fashion is beneficial for consumers the impact on factory workers' salaries has been negative",
        answers: [
          "While the decreasing cost of fashion is beneficial for consumers, the impact on factory workers' salaries has been negative.",
        ],
      },
      {
        id: 3,
        broken:
          "It can seem difficult to keep up with the latest technology because there are so many rapid developments in this area",
        answers: [
          "It can seem difficult to keep up with the latest technology because there are so many rapid developments in this area.",
        ],
      },
      {
        id: 4,
        broken:
          "Although there are frequent complaints about rising prices this has not reduced the average household's consumption",
        answers: [
          "Although there are frequent complaints about rising prices, this has not reduced the average household's consumption.",
        ],
      },
      {
        id: 5,
        broken:
          "There is a common belief that the more you pay the better the quality",
        answers: [
          "There is a common belief that the more you pay, the better the quality.",
        ],
      },
      {
        id: 6,
        broken:
          "If people turned off their house lights their electricity consumption would be reduced",
        answers: [
          "If people turned off their house lights, their electricity consumption would be reduced.",
        ],
      },
      {
        id: 7,
        broken:
          "Whereas young people are interested in buying the latest products older people prefer things built to last",
        answers: [
          "Whereas young people are interested in buying the latest products, older people prefer things built to last.",
          "Young people are interested in buying the latest products, whereas older people prefer things built to last.",
        ],
      },
      {
        id: 8,
        broken:
          "Products will not be ethically produced unless consumers demand it",
        answers: [
          "Products will not be ethically produced unless consumers demand it.",
          "Unless consumers demand it, products will not be ethically produced.",
        ],
      },
    ],
  },
  pronouns2b: {
    badge: "b",
    instruction: "Complete the sentences with suitable pronouns.",
    bank: [
      "they",
      "these",
      "This",
      "you",
      "their",
      "his",
      "her",
      "it",
    ],
    items: [
      {
        id: 1,
        before:
          "Many products are designed to be replaced quickly; ",
        after: " often end up in landfill within a few years.",
        answers: ["they", "these"],
      },
      {
        id: 2,
        before:
          "People buy bottled water even where tap water is safe. ",
        after: " creates unnecessary plastic waste.",
        answers: ["This"],
      },
      {
        id: 3,
        before:
          "If shoppers read labels carefully, ",
        after: " can avoid packaging that cannot be recycled.",
        answers: ["they", "you"],
      },
      {
        id: 4,
        before:
          "When consumers demand ethical production, companies listen because ",
        after: " control the market through purchasing choices.",
        answers: ["they", "you"],
      },
      {
        id: 5,
        before:
          "Second-hand clothes and repaired gadgets both reduce waste; ",
        after: " options deserve more support.",
        answers: ["these"],
      },
      {
        id: 6,
        before:
          "A responsible consumer thinks about ",
        after: " impact on the environment before buying.",
        answers: ["their", "his", "her"],
      },
      {
        id: 7,
        before:
          "Recycling is useful, but ",
        after: " cannot solve overconsumption on its own.",
        answers: ["it"],
      },
    ],
  },
};
