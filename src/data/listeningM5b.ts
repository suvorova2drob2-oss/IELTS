export const LISTEN_M5B_STEPS = [
  "1 Before listen",
  "2a–2b Diagram",
  "2c Language",
  "3 Matching + notes",
  "4 Analysis",
] as const;

export const LISTEN_M5B_NEXT = [
  "2a–2b Diagram →",
  "2c Language →",
  "3 Exam →",
  "4 Analysis →",
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

export function checkListenM5b(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export const listeningM5b = {
  id: "listening-m5b-flow",
  bookPages: "p. 79 in your coursebook",
  sectionTitle: "Listening · Section 3",
  noAudioNote:
    "Аудио пока нет — можно пройти подготовку и задания. Ключи: 1 (the) atmosphere, 2 re-entry, 3 thrusters, 4 fuel; matching 1D 2C 3B 4A 5A; 6 aquarium … 10 cottages.",
  before: {
    badge: "1",
    heading: "Before you listen",
    instruction:
      "What is your idea of a top hotel? Describe a great hotel you have stayed in (or imagined) and what made it great.",
  },
  diagram: {
    badge: "2a–2b",
    heading: "Label a diagram",
    instruction:
      "Look at the spaceship / space-hotel diagram. Answers are likely to be nouns or noun phrases. Complete labels 1–4. Write NO MORE THAN TWO WORDS for each answer.",
    tip: "2a: The answers are all likely to be nouns or noun phrases.",
    gaps: [
      {
        id: 1,
        before: "Outer layer / ",
        after: "",
        answers: ["(the) atmosphere", "the atmosphere", "atmosphere"],
      },
      {
        id: 2,
        before: "Stage for safe ",
        after: " to Earth",
        answers: ["re-entry", "reentry"],
      },
      {
        id: 3,
        before: "Steering ",
        after: "",
        answers: ["thrusters"],
      },
      {
        id: 4,
        before: "On-board ",
        after: " supply",
        answers: ["fuel"],
      },
    ],
  },
  language2c: {
    badge: "c",
    instruction:
      "The language in the recording describes parts of the spaceship and how they function. Note useful noun phrases (adjective + noun).",
  },
  exam: {
    badge: "3",
    heading: "Test practice",
    strategies: "TEST STRATEGIES page 169",
    matching: {
      instruction:
        "What does each speaker say about the space hotel proposal? Match 1–5 with A–D. You may use any letter more than once.",
      options: [
        { id: "A", text: "Expresses strong enthusiasm" },
        { id: "B", text: "Raises a practical concern" },
        { id: "C", text: "Compares it with an Earth hotel" },
        { id: "D", text: "Questions whether it will happen soon" },
      ],
      items: [
        { id: 1, text: "Speaker / point 1", key: "D" },
        { id: 2, text: "Speaker / point 2", key: "C" },
        { id: 3, text: "Speaker / point 3", key: "B" },
        { id: 4, text: "Speaker / point 4", key: "A" },
        { id: 5, text: "Speaker / point 5", key: "A" },
      ],
    },
    notes: {
      instruction:
        "Complete the notes about facilities. Write NO MORE THAN TWO WORDS for each answer.",
      gaps: [
        {
          id: 6,
          before: "Underwater ",
          after: " for guests",
          answers: ["aquarium"],
        },
        {
          id: 7,
          before: "",
          after: " for VIP visitors",
          answers: ["luxury accommodation"],
        },
        {
          id: 8,
          before: "Rooftop ",
          after: "",
          answers: ["sun terrace"],
        },
        {
          id: 9,
          before: "Open-air ",
          after: " for concerts",
          answers: ["event plaza"],
        },
        {
          id: 10,
          before: "Private ",
          after: " for families",
          answers: ["cottages"],
        },
      ],
    },
  },
  analysis: {
    badge: "4",
    instruction:
      "Analyse your answers using audio script 5.4 (p. 206) when available. Which paraphrases helped you?",
  },
};
