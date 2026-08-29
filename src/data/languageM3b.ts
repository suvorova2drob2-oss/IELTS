export const LANG_M3B_STEPS = [
  "1a Certainty scale",
  "1b Modal meanings",
  "2 Italics text",
  "3 Modal gaps",
  "4a–4b Adverbs",
  "4c–4d Perspective",
] as const;

export const LANG_M3B_NEXT = [
  "1b Modal meanings →",
  "2 Italics text →",
  "3 Modal gaps →",
  "4a–4b Adverbs →",
  "4c–4d Perspective →",
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

export function checkLangM3b(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export type ItalBit =
  | { text: string }
  | { gap: number; options: string[]; key: string };

export function isItalGap(
  part: ItalBit,
): part is { gap: number; options: string[]; key: string } {
  return "gap" in part;
}

export const languageM3b = {
  id: "language-m3b-flow",
  bookPages: "p. 49–50 in your coursebook",
  sectionTitle: "Language development · Modals & adverbs",
  grammarRef: "EXPERT GRAMMAR page 177",
  scale: {
    badge: "1a",
    heading: "Modal forms; Degrees of certainty",
    instruction:
      "Put the modals below in the correct place on the line to show the degree of certainty each one expresses.",
    modals: ["could", "may", "might", "must", "should", "will", "would"],
    labels: { low: "Certain 0%", high: "Certain 100%" },
    key: ["could", "may", "might", "should", "would", "will", "must"],
  },
  meanings: {
    badge: "1b",
    instruction:
      "Match the modal verbs below with the meanings they express. Some words have more than one meaning.",
    modals: [
      "can",
      "can't",
      "don't have to",
      "may",
      "must",
      "need to",
      "ought to",
      "shouldn't",
      "will",
    ],
    categories: [
      { id: "obligation", label: "obligation", answers: ["can't", "don't have to", "must", "need to"] },
      { id: "advice", label: "advice", answers: ["ought to", "shouldn't"] },
      { id: "possibility", label: "possibility", answers: ["can", "may"] },
      { id: "ability", label: "ability", answers: ["can", "can't"] },
      { id: "prediction", label: "prediction", answers: ["will"] },
    ],
  },
  italics: {
    badge: "2",
    instruction: "Choose the correct option in italics to complete the text.",
    parts: [
      { text: "According to a recent study, having strong leg muscles " },
      {
        gap: 1,
        options: ["may", "must"],
        key: "may",
      },
      {
        text: " contribute to a healthy brain. It is thought that exercise ",
      },
      {
        gap: 2,
        options: ["will", "could"],
        key: "could",
      },
      {
        text: " be connected to brain health, but until recently this has been difficult to validate. This is because healthy brains can be determined by genes and childhood environment. In order to undertake research on this topic, scientists ",
      },
      {
        gap: 3,
        options: ["must", "may"],
        key: "must",
      },
      {
        text: " use identical twins because they have the same genes, which would mean that any differences in results ",
      },
      {
        gap: 4,
        options: ["should", "would"],
        key: "would",
      },
      {
        text: " not be related to genetics. The recent experiment showed that among the sets of identical twins, those who had the most powerful leg muscles ten years ago performed as well on cognitive tests as they had done a decade before. However, the study did not focus on how muscle power is connected to brain power although the scientists ",
      },
      {
        gap: 5,
        options: ["will", "should"],
        key: "will",
      },
      {
        text: " do research into this in the future. The scientists concluded that people ",
      },
      {
        gap: 6,
        options: ["might", "should"],
        key: "should",
      },
      {
        text: " exercise more if they want to increase their brain health.",
      },
    ] satisfies ItalBit[],
  },
  modalGaps: {
    badge: "3",
    instruction:
      "Complete the sentences with the correct modal form below. There is one extra modal form.",
    bank: ["might", "must", "should", "won't", "would"],
    items: [
      {
        id: 1,
        before:
          "Teachers often suggest to parents that they ",
        after:
          " take their children out into nature more as a fun way to learn about the world.",
        key: "should",
      },
      {
        id: 2,
        before: "In order to lose weight, you ",
        after: " do more exercise and eat less calorific foods.",
        key: "must",
      },
      {
        id: 3,
        before:
          "Why not try spending some time alone reading fiction? This ",
        after: " help with relaxation.",
        key: "might",
      },
      {
        id: 4,
        before:
          "Although the government plans to improve the quality of school meals, sceptics believe this ",
        after: " have a large impact on childhood obesity.",
        key: "won't",
      },
    ],
    extra: "would",
  },
  adverbs: {
    heading: "Adverbs of attitude",
    match4a: {
      badge: "4a",
      instruction:
        "Match the sentences (1–2) with the speaker's opinion (A–B).",
      sentences: [
        {
          id: "1",
          text: "Unfortunately, it is really difficult to find time to exercise when you work full time.",
        },
        {
          id: "2",
          text: "Naturally, it is really difficult to find time to exercise when you work full time.",
        },
      ],
      opinions: [
        {
          id: "A",
          text: "The speaker thinks that this situation is obvious.",
        },
        {
          id: "B",
          text: "The speaker thinks this situation is regrettable or unlucky.",
        },
      ],
      keys: { "1": "B", "2": "A" } as Record<string, string>,
    },
    apparently: {
      badge: "4b",
      instruction:
        "Read the sentence and choose the correct meaning for the underlined word.",
      sentence:
        "Apparently, walking for 30 minutes a day has more health benefits than running or going to the gym.",
      highlight: "Apparently",
      options: [
        { id: "1", text: "I think this statement is wrong." },
        { id: "2", text: "I really believe that this statement is true." },
        {
          id: "3",
          text: "I have heard this statement, but I'm not sure if it's true.",
        },
        { id: "4", text: "I hope this statement is true." },
      ],
      key: "3",
    },
    perspective: {
      badge: "4c",
      instruction:
        "Match each underlined word to how it is used to show perspective.",
      items: [
        {
          id: 1,
          before: "",
          word: "Unfortunately",
          after: " I couldn't come to work because I was too ill.",
          options: [
            { id: "A", text: "you think the situation is unlucky" },
            { id: "B", text: "you think something is not important" },
          ],
          key: "A",
        },
        {
          id: 2,
          before: "Having regular health checks is ",
          word: "undoubtedly",
          after:
            " helpful in detecting signs of serious illness.",
          options: [
            { id: "A", text: "you think something is definitely true" },
            { id: "B", text: "you have a negative opinion of something" },
          ],
          key: "A",
        },
        {
          id: 3,
          before: "",
          word: "Evidently",
          after: ", working too many hours causes people to become stressed.",
          options: [
            { id: "A", text: "you know something is wrong" },
            { id: "B", text: "you can see that something is true" },
          ],
          key: "B",
        },
        {
          id: 4,
          before: "",
          word: "Naturally",
          after: ", people put on weight when they eat lots of junk food.",
          options: [
            { id: "A", text: "you believe something is very important" },
            {
              id: "B",
              text: "you think something is normal and not surprising",
            },
          ],
          key: "B",
        },
        {
          id: 5,
          before: "Drinking water is ",
          word: "undeniably",
          after: " good for your health.",
          options: [
            { id: "A", text: "you think something cannot be rejected" },
            {
              id: "B",
              text: "you cannot understand why others think this way",
            },
          ],
          key: "A",
        },
      ],
    },
    opinions: {
      badge: "4d",
      instruction:
        "Give your opinions on the following topics using the adverbs from Exercise 4c.",
      topics: [
        "The best way to be healthy is to be vegetarian.",
        "Happiness cannot be achieved through material wealth.",
        "Self-confidence comes through being successful.",
      ],
      adverbs: [
        "Unfortunately",
        "undoubtedly",
        "Evidently",
        "Naturally",
        "undeniably",
      ],
    },
  },
};
