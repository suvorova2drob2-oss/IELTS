export const SPEAK_M5A_STEPS = [
  "1 Discuss",
  "2a Vocab match",
  "2b Discuss",
  "3a–3b Techniques",
  "4 Part 2",
  "5 Assess",
] as const;

export const SPEAK_M5A_NEXT = [
  "2a Vocab →",
  "2b Discuss →",
  "3 Techniques →",
  "4 Part 2 →",
  "5 Assess →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ");
}

export function checkSpeakM5a(input: string, answers: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return answers.some((a) => normalize(a) === n);
}

export const speakingM5a = {
  id: "speaking-m5a-flow",
  bookPages: "p. 75 in your coursebook",
  sectionTitle: "Speaking · Part 2",
  testStrategies: "TEST STRATEGIES page 174",
  discuss1: {
    badge: "1",
    heading: "Lead-in",
    instruction:
      "Discuss how gadgets have changed our lives. Think about mobile phones, tablets and TV streaming services. What did people do before these existed?",
  },
  match2a: {
    badge: "2a",
    heading: "Develop topic-specific vocabulary",
    instruction: "Match the words below with the definitions (1–6).",
    bank: [
      "revolutionary",
      "user-friendly",
      "outdated",
      "versatile",
      "labour-saving",
      "state-of-the-art",
    ],
    items: [
      {
        id: 1,
        text: "Completely new and having a major effect on the way something is done.",
        key: "revolutionary",
      },
      {
        id: 2,
        text: "Easy to use or understand, even for people who are not experts.",
        key: "user-friendly",
      },
      {
        id: 3,
        text: "No longer modern or useful because something newer exists.",
        key: "outdated",
      },
      {
        id: 4,
        text: "Able to be used for many different purposes.",
        key: "versatile",
      },
      {
        id: 5,
        text: "Designed to reduce the amount of work people have to do.",
        key: "labour-saving",
      },
      {
        id: 6,
        text: "Using the most modern and advanced ideas and features available.",
        key: "state-of-the-art",
      },
    ],
  },
  discuss2b: {
    badge: "b",
    instruction: "Discuss the questions with a partner.",
    questions: [
      "Which gadget do you think is the most labour-saving? Why?",
      "Which invention has revolutionised the world the most?",
      "Do you value user-friendliness more than versatility in a gadget?",
      "What does a state-of-the-art gadget look like to you?",
      "Why do gadgets become outdated so quickly?",
    ],
  },
  techniques3: {
    badge: "3a–3b",
    heading: "Techniques for adding detail",
    sampleTip:
      "Model answer (computer): Yes. It is a computer. She uses it every day for work and pleasure. It helps with work, keeps her entertained and makes her feel less isolated.",
    instruction:
      "Match the techniques (A–E) with the example developments (1–5).",
    techniques: [
      { id: "A", label: "adding a relative clause" },
      { id: "B", label: "giving an example" },
      { id: "C", label: "adding a contrast" },
      { id: "D", label: "explaining a consequence" },
      { id: "E", label: "mentioning another person" },
    ],
    examples: [
      {
        id: 1,
        text: "Which is the latest top-spec model with serious gaming power?",
        key: "A",
      },
      {
        id: 2,
        text: "For example, it facilitates the way I communicate both face-to-face and online at work.",
        key: "B",
      },
      {
        id: 3,
        text: "My mother's recently bought a computer but she needs my help to work out how to use it.",
        key: "E",
      },
      {
        id: 4,
        text: "Without my home computer, I might become lonely and would struggle to entertain myself.",
        key: "D",
      },
      {
        id: 5,
        text: "However, it has other uses besides this.",
        key: "C",
      },
    ],
  },
  part2: {
    badge: "4",
    heading: "Test practice · Part 2",
    instruction:
      "You have 1 minute to make notes, then speak for up to 2 minutes.",
    cue: {
      intro: "Describe a gadget or invention that you find useful.",
      shouldSay: "You should say:",
      bullets: [
        "what the gadget or invention is",
        "how often you use it",
        "what you use it for",
      ],
      andWhy: "and explain why it is important to you.",
    },
  },
  assess5: {
    badge: "5",
    instruction:
      "Discuss your performance with a partner using these questions.",
    questions: [
      "Did you cover all the points on the card?",
      "Did you speak for close to two minutes?",
      "Which techniques from Exercise 3 did you use to add detail?",
      "What would you improve next time?",
    ],
  },
};
