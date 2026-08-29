export const VOCAB_M7_STEPS = [
  "1a Meanings",
  "1b Complete",
  "2 Word families",
  "3 Collocations",
  "4 Match meanings",
] as const;

export const VOCAB_M7_NEXT = [
  "1b Complete →",
  "2 Word families →",
  "3 Collocations →",
  "4 Match →",
  "← К модулю",
] as const;

export const vocabularyM7 = {
  id: "vocabulary-m7-flow",
  bookPages: "p. 106 in your coursebook",
  sectionTitle: "Vocabulary · Academic nouns & plan collocations",
  meanings1a: {
    badge: "1a",
    heading: "Academic nouns",
    instruction: "For each word (1–12), choose the closest meaning (A or B).",
    items: [
      {
        id: 1,
        word: "infrastructure",
        a: "a set of systems in place",
        b: "a traditional method of building",
        key: "A",
      },
      {
        id: 2,
        word: "implementation",
        a: "developing a plan",
        b: "putting a plan into action",
        key: "B",
      },
      {
        id: 3,
        word: "expansion",
        a: "a better version of something",
        b: "an increase in size",
        key: "B",
      },
      {
        id: 4,
        word: "parameter",
        a: "a set of fixed limits",
        b: "something which is large",
        key: "A",
      },
      {
        id: 5,
        word: "investment",
        a: "money given to improve something",
        b: "training people to work as a team",
        key: "A",
      },
      {
        id: 6,
        word: "distribution",
        a: "receiving something for free",
        b: "sharing things in a planned way",
        key: "B",
      },
      {
        id: 7,
        word: "integration",
        a: "combining things to work effectively",
        b: "the fair division of resources",
        key: "A",
      },
      {
        id: 8,
        word: "construction",
        a: "a modern approach to design",
        b: "the process of building houses, roads, etc.",
        key: "B",
      },
      {
        id: 9,
        word: "initiative",
        a: "a new approach to problem-solving",
        b: "a controversial decision to delay an effect",
        key: "A",
      },
      {
        id: 10,
        word: "maintenance",
        a: "repairs to keep things in a good condition",
        b: "the movement of people in cities",
        key: "A",
      },
      {
        id: 11,
        word: "co-ordination",
        a: "the flow of ideas between people",
        b: "organising things or people",
        key: "B",
      },
      {
        id: 12,
        word: "compensation",
        a: "money paid to someone for a loss",
        b: "the feeling of sympathy for someone",
        key: "A",
      },
    ],
  },
  complete1b: {
    badge: "b",
    instruction: "Choose the correct option in italics to complete the text.",
    bank: [
      "investment",
      "infrastructure",
      "implementation",
      "construction",
      "co-ordination",
      "expansion",
    ],
    items: [
      {
        id: 1,
        before:
          "The Brazilian city of Curitiba has one of the best Bus Rapid Transit (BRT) systems in the world. These bus systems are comparable to subways but operate above ground. They can be cost effective because little ",
        after:
          " is required from the government because the roads provide the",
        answers: ["investment"],
      },
      {
        id: 2,
        before: " ",
        after:
          ". In the case of Curitiba, the",
        answers: ["infrastructure"],
      },
      {
        id: 3,
        before: " ",
        after:
          " of the BRT was gradual; the city planners avoided large-scale projects. In place of that, the",
        answers: ["implementation"],
      },
      {
        id: 4,
        before: " ",
        after:
          " process of the BRT comprised several small improvements. The design of the system required the",
        answers: ["construction"],
      },
      {
        id: 5,
        before: " ",
        after:
          " of several departments of the city. This focus on small-scale developments and people working together, in effect, led to the",
        answers: ["co-ordination"],
      },
      {
        id: 6,
        before: " ",
        after: " of the BRT being a complete success.",
        answers: ["expansion"],
      },
    ],
  },
  families2: {
    badge: "2",
    heading: "Word families",
    instruction: "Complete the table with the correct verb forms.",
    items: [
      { id: 1, noun: "implementation", answers: ["implement"] },
      { id: 2, noun: "investment", answers: ["invest"] },
      { id: 3, noun: "distribution", answers: ["distribute"] },
      { id: 4, noun: "expansion", answers: ["expand"] },
      { id: 5, noun: "maintenance", answers: ["maintain"] },
      { id: 6, noun: "compensation", answers: ["compensate"] },
    ],
  },
  collocations3: {
    badge: "3",
    heading: "Collocations with plan",
    instruction:
      "Complete the text with the correct form of the verbs below.",
    bank: ["draw up", "go ahead", "oppose", "put forward", "unveil"],
    items: [
      {
        id: 1,
        before:
          "The New York High Line is a park which has been constructed on a derelict elevated railway line. People can walk along the tracks high up in the city, completely surrounded by plants and flowers. The plans for this park were first ",
        after:
          " by Joshua David and Robert Hammond, whose ambition was to create a park in the sky. Initially the plans were",
        answers: ["put forward", "unveiled"],
      },
      {
        id: 2,
        before: " ",
        after:
          " by local residents and businesses because their intention was to remove the tracks so as to improve the area's appearance. However, David and Hammond were so enthused by their idea that they enlisted the help of some local architects to help",
        answers: ["opposed"],
      },
      {
        id: 3,
        before: " ",
        after:
          " a more cohesive set of plans. When they finally",
        answers: ["draw up"],
      },
      {
        id: 4,
        before: " ",
        after:
          " the plans, the rail company that owned the tracks was so impressed that they agreed that the plans could",
        answers: ["unveiled", "put forward"],
      },
      {
        id: 5,
        before: " ",
        after:
          ". Now the park offers unrivalled views of this part of New York.",
        answers: ["go ahead"],
      },
    ],
  },
  match4: {
    badge: "4",
    instruction: "Match the collocations (1–6) with their meanings (A–F).",
    items: [
      { id: 1, text: "to draw up a plan", key: "E" },
      { id: 2, text: "to put forward a plan", key: "A" },
      { id: 3, text: "to unveil a plan", key: "F" },
      { id: 4, text: "to go ahead with a plan", key: "B" },
      { id: 5, text: "to shelve a plan", key: "D" },
      { id: 6, text: "to oppose a plan", key: "C" },
    ],
    meanings: [
      { id: "A", text: "to suggest a plan for consideration" },
      { id: "B", text: "to start to implement a plan" },
      { id: "C", text: "to disagree with a plan" },
      { id: "D", text: "to postpone a plan until later" },
      { id: "E", text: "to prepare a plan, usually in writing" },
      { id: "F", text: "to show a plan to other people for the first time" },
    ],
  },
};
