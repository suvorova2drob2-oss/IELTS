export const LISTEN_M10B_STEPS = [
  "1 Before listen",
  "2a Hypothetical?",
  "3a–3b Speakers",
  "4 Exam table",
  "Extra discuss",
] as const;

export const LISTEN_M10B_NEXT = [
  "2a Hypothetical →",
  "3a–3b Speakers →",
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

export function checkListenM10b(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export const listeningM10b = {
  id: "listening-m10b-flow",
  bookPages: "p. 159 in your coursebook",
  sectionTitle: "Listening · Section 4 (medical innovations)",
  noAudioNote:
    "Аудио пока нет. Ключи: 3a Speakers 1D 2B 3C 4A · exam: 1 surgeons · 2 function · 3 (donor) waiting lists · 4 Face · 5 identity transfer · 6 mapping · 7 personalised/personalized · 8 discriminate · 9 (future) partner · 10 a (short) presentation.",
  before: {
    badge: "1",
    heading: "Before you listen",
    instruction:
      "What do you think is the most important medical advance in history? Why?",
  },
  adjectives2a: {
    badge: "2a",
    instruction:
      "Which statement is hypothetical language? Discuss the underlined forms (would / would not / probably).",
    positive: [
      "Let’s ask ourselves where we would be without penicillin",
      "we would not be able to fight infection",
      "We would probably have a much shorter life expectancy",
    ],
    negative: [
      "Leeches were used for thousands of years (factual history)",
      "They also had a resurgence in the 1980s (factual)",
    ],
  },
  opinion3: {
    badge: "3a",
    instruction:
      "Listen to four people hypothesising (audio later). Match each speaker to the question (keys: 1 D · 2 B · 3 C · 4 A).",
    items: [
      {
        id: 1,
        text: "Speaker 1 answers which question?",
        options: [
          { id: "A", text: "A Live to 100 in the future?" },
          { id: "B", text: "B Medical innovations in 50 years?" },
          { id: "C", text: "C World without doctors/hospitals?" },
          { id: "D", text: "D If painkillers had not been developed?" },
        ],
        key: "D",
      },
      {
        id: 2,
        text: "Speaker 2 answers which question?",
        options: [
          { id: "A", text: "A Live to 100?" },
          { id: "B", text: "B Innovations in next 50 years?" },
          { id: "C", text: "C Without doctors?" },
          { id: "D", text: "D Without painkillers?" },
        ],
        key: "B",
      },
      {
        id: 3,
        text: "Speaker 3 answers which question?",
        options: [
          { id: "A", text: "A Live to 100?" },
          { id: "B", text: "B Innovations in 50 years?" },
          { id: "C", text: "C World without doctors or hospitals?" },
          { id: "D", text: "D Without painkillers?" },
        ],
        key: "C",
      },
      {
        id: 4,
        text: "Speaker 4 answers which question?",
        options: [
          { id: "A", text: "A Live to 100 in the future?" },
          { id: "B", text: "B Innovations in 50 years?" },
          { id: "C", text: "C Without doctors?" },
          { id: "D", text: "D Without painkillers?" },
        ],
        key: "A",
      },
    ],
    adjectives3b: {
      badge: "b",
      instruction: "Underline further hypothesising language in script 10.5.",
      tip: "Examples: I can’t imagine…; I suppose people would…; we might have cures…; If we didn’t have…; I see no reason why that wouldn’t continue.",
    },
  },
  exam4: {
    badge: "4",
    strategies: "TEST STRATEGIES page 168",
    instruction:
      "Complete the table / notes. Write NO MORE THAN THREE WORDS AND/OR A NUMBER for questions 1–8; NO MORE THAN THREE WORDS for 9–10.",
    mcq: [] as {
      id: number;
      text: string;
      options: { id: string; text: string }[];
      key: string;
    }[],
    gaps: [
      {
        id: 1,
        before: "fMRI helps ",
        after: " in their work",
        answers: ["surgeons"],
      },
      {
        id: 2,
        before: "Artificial kidneys and livers — Ability to ",
        after: "",
        answers: ["function"],
      },
      {
        id: 3,
        before: "May reduce existing ",
        after: "",
        answers: ["(donor) waiting lists", "donor waiting lists", "waiting lists"],
      },
      {
        id: 4,
        before: "",
        after: " transplant — helps people who suffer trauma",
        answers: ["Face"],
      },
      {
        id: 5,
        before: "problem of ",
        after: " (loss of self)",
        answers: ["identity transfer"],
      },
      {
        id: 6,
        before: "Gene ",
        after: " tells us about ourselves",
        answers: ["mapping"],
      },
      {
        id: 7,
        before: "possibility of ",
        after: " medications",
        answers: ["personalised", "personalized", "personalised (GB)/personalized (US)"],
      },
      {
        id: 8,
        before: "could be used to ",
        after: " against individuals",
        answers: ["discriminate"],
      },
      {
        id: 9,
        before: "Other issue: Who views data? e.g. A ",
        after: " may be chosen on genetic strength.",
        answers: ["(future) partner", "future partner", "partner"],
      },
      {
        id: 10,
        before: "Homework: Prepare ",
        after: "",
        answers: ["a (short) presentation", "a short presentation", "a presentation"],
      },
    ],
  },
  extra: {
    badge: "5",
    instruction:
      "Discuss which answers used hypothetical language. Which medical innovation do you think will matter most this century?",
  },
};
