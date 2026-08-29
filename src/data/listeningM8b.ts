export const LISTEN_M8B_STEPS = [
  "1 Before listen",
  "2a Adjectives",
  "3a–3b Opinion",
  "4 Exam",
  "Extra discuss",
] as const;

export const LISTEN_M8B_NEXT = [
  "2a Adjectives →",
  "3a–3b Opinion →",
  "4 Exam →",
  "Extra discuss →",
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

export function checkListenM8b(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export const listeningM8b = {
  id: "listening-m8b-flow",
  bookPages: "p. 127 in your coursebook",
  sectionTitle: "Listening · Section 4 (super recognisers)",
  noAudioNote:
    "Аудио пока нет — можно пройти подготовку и exam. Ключи: 1A 2A 3B 4C · 5 software · 6 low quality · 7 changing · 8 humans · 9 holistically · 10 cameras. TB keys: 1 C  2 B  3 A  4 D  5 a bestseller  6 final three/3 days  7 sympathetic  8 writer  9 talked about  10 B. ",
  before: {
    badge: "1",
    heading: "Before you listen",
    instruction:
      "Discuss whether you are good at noticing and remembering names, faces, birthdays, places, what you ate yesterday, or what you studied last week.",
  },
  adjectives2a: {
    badge: "2a",
    instruction:
      "Are these adjectives positive or negative? Discuss meanings.",
    positive: [
      "convincing",
      "fascinating",
      "perceptive",
      "remarkable",
      "significant",
    ],
    negative: ["flawed", "improbable", "misleading", "superficial"],
  },
  opinion3: {
    badge: "3a",
    instruction:
      "Listen for opinion language. Choose the correct letter, A, B or C.",
    items: [
      {
        id: 1,
        text: "According to the lecturer, what is true about super recognisers?",
        options: [
          { id: "A", text: "Their ability is remarkable / amazing." },
          { id: "B", text: "They are easy to train in large numbers." },
          { id: "C", text: "They mainly work with DNA evidence." },
        ],
        key: "A",
      },
      {
        id: 2,
        text: "What does the lecturer think about the research overall?",
        options: [
          { id: "A", text: "It is unimportant." },
          { id: "B", text: "It is significant." },
          { id: "C", text: "It is misleading." },
        ],
        key: "B",
      },
    ],
    adjectives3b: {
      badge: "b",
      instruction: "Which adjectives in the script signal these opinions?",
      tip: "Q1 amazing · Q2 significant",
    },
  },
  exam4: {
    badge: "4",
    strategies: "TEST STRATEGIES page 168",
    instruction:
      "Choose the correct letter, A, B or C for questions 1–4. Then complete 5–10 with words from the recording (NO MORE THAN TWO WORDS).",
    mcq: [
      {
        id: 1,
        text: "What point does the speaker make about facial recognition technology?",
        options: [
          { id: "A", text: "It has clear strengths in some contexts." },
          { id: "B", text: "It has replaced human officers completely." },
          { id: "C", text: "It is never used by police." },
        ],
        key: "A",
      },
      {
        id: 2,
        text: "What is said about super recognisers compared with computers?",
        options: [
          { id: "A", text: "In some tasks humans still outperform software." },
          { id: "B", text: "Computers always win." },
          { id: "C", text: "Neither is useful." },
        ],
        key: "A",
      },
      {
        id: 3,
        text: "What problem can affect automated systems?",
        options: [
          { id: "A", text: "They are too expensive to install." },
          { id: "B", text: "Image quality and conditions can limit accuracy." },
          { id: "C", text: "They only work indoors." },
        ],
        key: "B",
      },
      {
        id: 4,
        text: "What does the speaker conclude about future policing?",
        options: [
          { id: "A", text: "Only drones will be needed." },
          { id: "B", text: "Human judgement will disappear." },
          { id: "C", text: "A combined approach is most effective." },
        ],
        key: "C",
      },
    ],
    gaps: [
      {
        id: 5,
        before: "Face-matching ",
        after: " is improving but still imperfect",
        answers: ["software"],
      },
      {
        id: 6,
        before: "Problems with ",
        after: " images",
        answers: ["low quality"],
      },
      {
        id: 7,
        before: "Difficulty with ",
        after: " faces / appearance",
        answers: ["changing"],
      },
      {
        id: 8,
        before: "In complex cases, ",
        after: " remain essential",
        answers: ["humans"],
      },
      {
        id: 9,
        before: "Need to assess evidence ",
        after: "",
        answers: ["holistically"],
      },
      {
        id: 10,
        before: "Widespread use of security ",
        after: "",
        answers: ["cameras"],
      },
    ],
  },
  extra: {
    badge: "Extra",
    instruction:
      "If you can, look up ‘super recognisers’ online. What tests or research have been done?",
  },
};
