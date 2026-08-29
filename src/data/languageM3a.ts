export const LANG_M3A_STEPS = [
  "1a Real / unreal",
  "1b Types + 1c",
  "2 Supersize Me",
  "3a Match + 3b",
  "4 Gap fill",
  "5 Rewrite",
] as const;

export const LANG_M3A_NEXT = [
  "1b Types + 1c →",
  "2 Supersize Me →",
  "3a Match + 3b →",
  "4 Gap fill →",
  "5 Rewrite →",
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

export function checkLangM3a(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export type TextPart = { text: string } | { gap: number; hint: string };

export function isTextGap(
  part: TextPart,
): part is { gap: number; hint: string } {
  return "gap" in part;
}

export const languageM3a = {
  id: "language-m3a-flow",
  bookPages: "p. 44–45 in your coursebook",
  sectionTitle: "Language development · Conditionals",
  grammarRef: "EXPERT GRAMMAR page 177",
  realUnreal: {
    badge: "1a",
    instruction:
      "Read the sentences and decide if the conditionals are describing real situations or unreal (imaginary) ones.",
    items: [
      {
        id: 1,
        text: "If children eat too much sugar, they usually put on weight, which can have serious consequences.",
        key: "real",
      },
      {
        id: 2,
        text: "If the government really wanted to tackle the problem of obesity, they would raise the price of unhealthy food and drink.",
        key: "unreal",
      },
      {
        id: 3,
        text: "Elderly people will notice an improvement in their overall fitness if they add just 15 minutes of walking into their daily routine.",
        key: "real",
      },
      {
        id: 4,
        text: "If cooking skills were a compulsory school subject, the overall health of young people could be improved.",
        key: "unreal",
      },
      {
        id: 5,
        text: "When a person takes up a new hobby, they often report having a more positive outlook on life.",
        key: "real",
      },
    ],
  },
  types: {
    badge: "1b",
    instruction:
      "Choose a sentence from Exercise 1a to match the conditional forms below.",
    slots: [
      { id: "zero", label: "Zero conditional", answers: ["1", "5"] },
      { id: "first", label: "First conditional", answers: ["3"] },
      { id: "second", label: "Second conditional", answers: ["2", "4"] },
    ],
    sentenceChips: ["1", "2", "3", "4", "5"],
  },
  mcq: {
    badge: "1c",
    instruction: "Answer the questions about real and unreal conditionals.",
    items: [
      {
        id: 1,
        prompt: "Which two conditionals express real situations?",
        options: [
          { id: "A", text: "zero and second" },
          { id: "B", text: "zero and first" },
          { id: "C", text: "first and second" },
        ],
        key: "B",
      },
      {
        id: 2,
        prompt: "Which conditional expresses an unreal or imaginary situation?",
        options: [
          { id: "A", text: "zero" },
          { id: "B", text: "first" },
          { id: "C", text: "second" },
        ],
        key: "C",
      },
    ],
  },
  supersize: {
    badge: "2",
    instruction:
      "Complete the text using the correct conditional form of the verbs in brackets.",
    title: "The perils of fast food",
    parts: [
      {
        text: "Supersize Me is a film about the effects of eating fast food. The director wanted to see what ",
      },
      { gap: 1, hint: "happen" },
      { text: " if he " },
      { gap: 2, hint: "consumed" },
      {
        text: " nothing but fast food for a month. Each day he consumed 5,000 calories through eating three fast food meals. When humans ",
      },
      { gap: 3, hint: "put" },
      { text: " that much energy into their bodies, they " },
      { gap: 4, hint: "not use" },
      {
        text: " most of it in one day. This means there is leftover energy, which is converted into fat and stored in the body. If the body ",
      },
      { gap: 5, hint: "not need" },
      {
        text: " this energy because the following day it receives another 5,000 calories, this fat ",
      },
      { gap: 6, hint: "remain" },
      { text: " in the body's fat cells. If this habit " },
      { gap: 7, hint: "continue" },
      { text: ", it is likely that the person " },
      { gap: 8, hint: "put on" },
      {
        text: " more and more weight. This is exactly what happened and the film director put on 11 kilos. He made the documentary because he wanted to show how quickly fast food can cause weight gain. Doctors have suggested that if a teenager ",
      },
      { gap: 9, hint: "eat" },
      { text: " a diet of over 2,500 calories, they " },
      { gap: 10, hint: "increase" },
      {
        text: " their body weight to obese levels within a few years.",
      },
    ] satisfies TextPart[],
    answers: {
      1: ["would happen"],
      2: ["consumed"],
      3: ["put"],
      4: ["do not use", "don't use"],
      5: ["does not need", "doesn't need"],
      6: ["remains"],
      7: ["continues"],
      8: ["will put on"],
      9: ["eats"],
      10: ["will increase", "they will increase"],
    } as Record<number, string[]>,
  },
  match: {
    badge: "3a",
    instruction:
      "Match the beginnings of the sentences (1–5) with the endings (A–E).",
    beginnings: [
      {
        id: "1",
        text: "Lifting weights is a good way to build body strength",
      },
      {
        id: "2",
        text: "People who have stressful jobs should find time to relax every day",
      },
      {
        id: "3",
        text: "Supposing everyone grew and ate their own fruit and vegetables,",
      },
      {
        id: "4",
        text: "There is no need to take vitamin supplements",
      },
      {
        id: "5",
        text: "Unless people get more than seven hours' sleep,",
      },
    ],
    endings: [
      {
        id: "A",
        text: "they would improve nutrition levels easily.",
      },
      {
        id: "B",
        text: "otherwise their health might suffer.",
      },
      {
        id: "C",
        text: "provided that it is done safely.",
      },
      {
        id: "D",
        text: "their brain will not function well.",
      },
      {
        id: "E",
        text: "as long as you are eating a balanced diet.",
      },
    ],
    keys: {
      "1": "C",
      "2": "B",
      "3": "A",
      "4": "E",
      "5": "D",
    } as Record<string, string>,
  },
  matchReal: {
    badge: "3b",
    instruction:
      "Which of the sentences in Exercise 3a express real situations and which express unreal (imaginary) ones?",
    items: [
      {
        id: 1,
        text: "Lifting weights is a good way to build body strength provided that it is done safely.",
        key: "real",
      },
      {
        id: 2,
        text: "People who have stressful jobs should find time to relax every day otherwise their health might suffer.",
        key: "real",
      },
      {
        id: 3,
        text: "Supposing everyone grew and ate their own fruit and vegetables, they would improve nutrition levels easily.",
        key: "unreal",
      },
      {
        id: 4,
        text: "There is no need to take vitamin supplements as long as you are eating a balanced diet.",
        key: "real",
      },
      {
        id: 5,
        text: "Unless people get more than seven hours' sleep, their brain will not function well.",
        key: "real",
      },
    ],
  },
  gapFill: {
    badge: "4",
    instruction: "Complete the sentences with the words in the box.",
    bank: ["otherwise", "provided that", "supposing", "unless"],
    parts: [
      { text: "It is important to make time to learn new skills " },
      { gap: 1 },
      { text: " life becomes boring." },
      { text: "\n\nWe can all improve our outlook on life " },
      { gap: 2 },
      { text: " we practise positive thinking." },
      { text: "\n\n" },
      { gap: 3, cap: true },
      { text: " people use sunscreen, there is a danger of developing skin conditions." },
      { text: "\n\n" },
      { gap: 4, cap: true },
      { text: " the world focused on generosity more, might society be happier?" },
    ] as Array<
      | { text: string }
      | { gap: number; cap?: boolean }
    >,
    keys: {
      1: "otherwise",
      2: "provided that",
      3: "unless",
      4: "supposing",
    } as Record<number, string>,
  },
  rewrite: {
    badge: "5",
    instruction:
      "Rewrite the sentences using the words in brackets. You may need to change the grammatical form or the order of the clauses.",
    items: [
      {
        id: 1,
        active:
          "People might be more productive and less stressed if they worked fewer hours per week.",
        hint: "supposing",
        answers: [
          "Supposing people worked fewer hours per week, they might be more productive and less stressed.",
          "Supposing people worked fewer hours a week, they might be more productive and less stressed.",
        ],
      },
      {
        id: 2,
        active:
          "If children do lots of exercise, it does not matter what they eat.",
        hint: "as long as",
        answers: [
          "It does not matter what children eat as long as they do lots of exercise.",
          "Children can eat what they like as long as they do lots of exercise.",
          "Children can eat whatever they like as long as they do lots of exercise.",
        ],
      },
      {
        id: 3,
        active:
          "Improved health will not happen if people do not change their attitudes.",
        hint: "unless",
        answers: [
          "Improved health will not happen unless people change their attitudes.",
        ],
      },
      {
        id: 4,
        active:
          "If governments do not limit the growth of supermarkets, small food shops will not be able to survive.",
        hint: "otherwise",
        answers: [
          "Small food shops will not be able to survive if governments do not limit the growth of supermarkets.",
          "Small food shops will not be able to survive unless governments limit the growth of supermarkets.",
          "Otherwise, small food shops will not be able to survive if governments do not limit the growth of supermarkets.",
        ],
      },
    ],
  },
};
