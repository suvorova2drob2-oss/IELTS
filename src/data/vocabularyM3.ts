export const VOCAB_M3_STEPS = [
  "1 Match",
  "2 Yoga italics",
  "3a Collocations",
  "3b Discuss",
  "4a Idioms",
  "4b Complete",
] as const;

export const VOCAB_M3_NEXT = [
  "2 Yoga →",
  "3a Collocations →",
  "3b Discuss →",
  "4a Idioms →",
  "4b Complete →",
  "← К модулю",
] as const;

export type ItalBit =
  | { text: string }
  | { gap: number; options: string[]; key: string };

export function isVocabM3Ital(
  part: ItalBit,
): part is { gap: number; options: string[]; key: string } {
  return "gap" in part;
}

export const vocabularyM3 = {
  id: "vocabulary-m3-flow",
  bookPages: "p. 42 in your coursebook",
  sectionTitle: "Vocabulary · Problems and solutions",
  match: {
    badge: "1",
    heading: "Problems and solutions",
    instruction:
      "Match the words below with the underlined words with a similar meaning in 1–6.",
    bank: ["danger", "method", "outcome", "priority", "problem", "test"],
    items: [
      {
        id: 1,
        before: "Knee injuries can be a frequent ",
        underline: "result",
        after: " of too much running.",
        key: "outcome",
      },
      {
        id: 2,
        before: "One serious ",
        underline: "issue",
        after:
          " in society is how to take care of the growing number of elderly people.",
        key: "problem",
      },
      {
        id: 3,
        before: "Setting realistic weight-loss goals is a good ",
        underline: "approach",
        after: " for anyone wanting to diet.",
        key: "method",
      },
      {
        id: 4,
        before: "Making sure children exercise regularly should be a ",
        underline: "key concern",
        after: " for parents.",
        key: "priority",
      },
      {
        id: 5,
        before: "Getting young people to eat vegetables can be a real ",
        underline: "challenge",
        after: ".",
        key: "test",
      },
      {
        id: 6,
        before: "Pollution can be a ",
        underline: "threat",
        after: " to the health of people with allergies.",
        key: "danger",
      },
    ],
  },
  yoga: {
    badge: "2",
    instruction:
      "Choose the correct option in italics to complete the text.",
    title: "Yoga – the perfect way to destress at work",
    parts: [
      {
        text: "Research shows that stress dominates the modern workplace and reduces productivity. The ",
      },
      {
        gap: 1,
        options: ["consequence", "issue"],
        key: "consequence",
      },
      {
        text: " of this stress is that employees who are overtired are less able to concentrate. As a result, some companies have started to introduce free lunchtime yoga classes. Doctors claim that reducing stress should be a ",
      },
      {
        gap: 2,
        options: ["priority", "problem"],
        key: "priority",
      },
      {
        text: " for employers and they support the introduction of yoga as a ",
      },
      {
        gap: 3,
        options: ["method", "concern"],
        key: "method",
      },
      {
        text: " of relaxation. The ",
      },
      {
        gap: 4,
        options: ["approach", "factor"],
        key: "approach",
      },
      {
        text: " which yoga takes is to increase our ability to remain calm by using physical exercises and teaching us how to control our breathing. The ",
      },
      {
        gap: 5,
        options: ["challenge", "aspect"],
        key: "challenge",
      },
      {
        text: " is to encourage people to take up yoga in the middle of the working day. However, studies show that the ",
      },
      {
        gap: 6,
        options: ["outcome", "threat"],
        key: "outcome",
      },
      {
        text: " of breaking up the day with yoga is almost always beneficial to employees.",
      },
    ] satisfies ItalBit[],
  },
  collocations: {
    badge: "3a",
    heading: "Academic collocations",
    instruction:
      "Complete the sentences with the correct verbs below to make collocations.",
    bank: ["face", "find", "make", "pose", "tackle"],
    items: [
      {
        id: 1,
        before: "It is the government’s responsibility to ",
        after: " a ",
        bold: "solution",
        end: " to the obesity crisis.",
        key: "find",
      },
      {
        id: 2,
        before: "It can be good to ",
        after: " a new ",
        bold: "challenge",
        end: " in order to learn new skills.",
        key: "face",
      },
      {
        id: 3,
        before: "Society must find new ways to ",
        after: " ",
        bold: "issues",
        end: " relating to mental health.",
        key: "tackle",
      },
      {
        id: 4,
        before: "Schools should ",
        after: " exercising every day a ",
        bold: "priority",
        end: " for children.",
        key: "make",
      },
      {
        id: 5,
        before: "Eating a diet that contains a lot of sugar can ",
        after: " a ",
        bold: "threat",
        end: " to our health.",
        key: "pose",
      },
    ],
  },
  discuss: {
    badge: "b",
    instruction: "Work in pairs and answer the questions.",
    questions: [
      "What would you say are the biggest threats to people’s health in developing nations?",
      "How does the situation in developing nations compare to developed nations?",
      "Which aspects of healthcare should be a priority in society? Why?",
      "What are the main challenges in our everyday lives?",
    ],
    suggestedTitle: "Suggested answer",
    suggestedAnswer: [
      "In developing nations, the biggest threats often include infectious disease, limited access to clean water and insufficient medical facilities. Poverty can also make healthy food and treatment hard to afford.",
      "By contrast, developed countries tend to face more lifestyle-related problems such as obesity, stress and chronic illness. Healthcare systems may be better funded, yet inequality and long waiting times still exist.",
      "I would prioritise prevention: vaccination, health education and early screening. In everyday life, people also struggle with poor sleep, work pressure and unbalanced diets, so practical support for healthy routines is essential.",
    ],
    languageFocus: [
      "By contrast",
      "tend to",
      "lifestyle-related",
      "I would prioritise",
      "infectious disease",
      "chronic illness",
      "prevention",
    ],
  },
  idioms: {
    badge: "4a",
    heading: "Idiomatic phrases for problems and solutions",
    instruction:
      "Match the idioms (1–7) with the correct meanings (A–G).",
    items: [
      { id: 1, idiom: "the crux of the matter", key: "E" },
      { id: 2, idiom: "a quick fix", key: "A" },
      { id: 3, idiom: "the tip of the iceberg", key: "F" },
      { id: 4, idiom: "a thorny issue", key: "B" },
      { id: 5, idiom: "a vicious cycle", key: "C" },
      { id: 6, idiom: "a knock-on effect", key: "G" },
      { id: 7, idiom: "the last resort", key: "D" },
    ],
    meanings: [
      {
        id: "A",
        text: "an easy solution which is often temporary and does not address the problem fully",
      },
      {
        id: "B",
        text: "an issue which is difficult to deal with or solve",
      },
      {
        id: "C",
        text: "a repeating situation where one problem leads to another problem which makes the first problem worse",
      },
      {
        id: "D",
        text: "the final action used when all other possibilities have failed",
      },
      {
        id: "E",
        text: "the basic or central point of a problem",
      },
      {
        id: "F",
        text: "a small part of a larger problem which is hidden",
      },
      {
        id: "G",
        text: "the effect that an action has on other situations",
      },
    ],
  },
  idiomFill: {
    badge: "b",
    instruction: "Complete the sentences with idioms from Exercise 4a.",
    bank: [
      "the crux of the matter",
      "a quick fix",
      "the tip of the iceberg",
      "a thorny issue",
      "a vicious cycle",
      "a knock-on effect",
      "the last resort",
    ],
    items: [
      {
        id: 1,
        before:
          "Using alternative medicine to treat serious illnesses is ",
        after:
          " for many people because there is conflicting evidence for its success.",
        key: "the last resort",
      },
      {
        id: 2,
        before: "A lack of exercise can have ",
        after: " on other areas of our lives.",
        key: "a knock-on effect",
      },
      {
        id: 3,
        before: "The consumption of fast food is just ",
        after:
          ". People also eat many other foods which are bad for their health.",
        key: "the tip of the iceberg",
      },
      {
        id: 4,
        before: "Telling people how to improve their health can be ",
        after: " because nobody likes to be criticised.",
        key: "a thorny issue",
      },
      {
        id: 5,
        before:
          "Increasing the number of doctors employed is often seen as ",
        after:
          " to healthcare problems although this fails to tackle the underlying issues.",
        key: "a quick fix",
      },
    ],
  },
};

export type VocabularyM3Data = typeof vocabularyM3;
