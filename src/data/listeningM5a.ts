export const LISTEN_M5A_STEPS = [
  "1 Before listen",
  "2 Agreement",
  "3a–3b Prep",
  "4 Exam matching",
  "5 Discussion",
] as const;

export const LISTEN_M5A_NEXT = [
  "2 Agreement →",
  "3a–3b Prep →",
  "4 Exam →",
  "5 Discussion →",
  "← К модулю",
] as const;

export const listeningM5a = {
  id: "listening-m5a-flow",
  bookPages: "p. 76 in your coursebook",
  sectionTitle: "Listening · Section 3",
  noAudioNote:
    "Аудио пока нет — можно пройти подготовку и matching. Ответы 1–4: A, A, C, B (скрипт 5.2 / 5.3, когда появятся треки).",
  before: {
    badge: "1",
    heading: "Before you listen",
    instruction:
      "Look at the weird inventions (LED slippers, picnic pants, body umbrella). Discuss which look practical and how they might make life easier.",
    tip: "LED slippers help people avoid bumping into things at night without turning on bright lights. Picnic pants could keep food from falling on the floor.",
  },
  agreement: {
    badge: "2",
    heading: "Listen for agreement",
    instruction:
      "Who agrees with each idea — Scott or Charlotte? What reason do they give? (Audio later.)",
    items: [
      {
        id: 1,
        text: "LED slippers are a good idea.",
        key: "Scott agrees — people won't bump into things and bright main lights won't wake them up completely.",
      },
      {
        id: 2,
        text: "Picnic pants could be dangerous.",
        key: "Charlotte agrees — dangerous if eating something hot.",
      },
    ],
  },
  prep: {
    badge: "3a",
    instruction:
      "Look at the body-umbrella invention. What might the speakers say about it?",
    tip: "It covers the whole body so you are less likely to get wet, but it looks cumbersome and you might not see through it well on busy streets.",
    paraphrase: {
      badge: "b",
      instruction:
        "Match possible paraphrases you might hear with the ideas below.",
      items: [
        {
          id: 1,
          text: "considered first suggestion to be fine",
        },
        {
          id: 2,
          text: "overly difficult",
        },
        {
          id: 3,
          text: "unnecessary to construct",
        },
        {
          id: 4,
          text: "achieve a high grade",
        },
      ],
    },
  },
  exam: {
    badge: "4",
    heading: "Test practice",
    strategies: "TEST STRATEGIES page 169",
    instruction:
      "What do Scott and Charlotte decide about each point? Choose the correct letter, A, B or C.",
    audioNote: "Tracks 5.2 / 5.3 — audio will be added later.",
    options: [
      { id: "A", text: "They both agree." },
      { id: "B", text: "They both disagree." },
      { id: "C", text: "They disagree with each other." },
    ],
    items: [
      {
        id: 1,
        text: "Whether the first design idea is acceptable",
        key: "A",
      },
      {
        id: 2,
        text: "Whether the project is too difficult",
        key: "A",
      },
      {
        id: 3,
        text: "Whether it is unnecessary to build a prototype",
        key: "C",
      },
      {
        id: 4,
        text: "Whether they can achieve a high grade",
        key: "B",
      },
    ],
  },
  discussion: {
    badge: "5",
    instruction: "Discuss the questions (Part 3 style).",
    questions: [
      "Have you seen any strange inventions? Did they help people?",
      "Do all inventions make life easier, or can some waste time?",
      "If you could invent anything, what would it be and why?",
    ],
  },
};
