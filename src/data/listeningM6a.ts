export const LISTEN_M6A_STEPS = [
  "1 Before listen",
  "2a Attitude MCQ",
  "2b Tone",
  "3a–3b Prep",
  "4 Exam summary",
  "5–6 Discussion",
] as const;

export const LISTEN_M6A_NEXT = [
  "2a Attitude →",
  "2b Tone →",
  "3a–3b Prep →",
  "4 Exam →",
  "5–6 Discussion →",
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

export function checkListenM6a(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export const listeningM6a = {
  id: "listening-m6a-flow",
  bookPages: "p. 92 in your coursebook",
  sectionTitle: "Listening · Section 4 (attitude & summary)",
  noAudioNote:
    "Аудио пока нет — можно пройти подготовку и задания. Ответы по Teacher’s Book / script 6.x, когда появятся треки.",
  before: {
    badge: "1",
    heading: "Before you listen",
    instruction:
      "Look at the objects (e.g. traffic-light cameras, parental controls on gadgets). Discuss what they are for and whether people should pay more attention to their safety.",
    tip: "Cameras on traffic lights discourage speeding and track red-light violations. Parental controls may stop children using credit cards or visiting inappropriate websites.",
  },
  attitude2a: {
    badge: "2a",
    instruction:
      "Choose the correct letter, A, B or C. (Audio later — check against keys.)",
    items: [
      {
        id: 1,
        text: "What is the speaker’s attitude to the first idea discussed?",
        options: [
          { id: "A", text: "Positive / in favour" },
          { id: "B", text: "Negative / against" },
          { id: "C", text: "Uncertain" },
        ],
        key: "A",
      },
      {
        id: 2,
        text: "What is the speaker’s attitude to the second idea?",
        options: [
          { id: "A", text: "Enthusiastic" },
          { id: "B", text: "Angry" },
          { id: "C", text: "Sceptical" },
        ],
        key: "C",
      },
      {
        id: 3,
        text: "What is the speaker’s attitude to the third idea?",
        options: [
          { id: "A", text: "Excited" },
          { id: "B", text: "Neutral" },
          { id: "C", text: "Disappointed" },
        ],
        key: "B",
      },
    ],
  },
  tone2b: {
    badge: "b",
    instruction:
      "Match each extract (1–3) with the speaker’s tone. Features of pronunciation (speed, rising intonation) often signal attitude.",
    bank: ["enthusiastic", "sceptical", "neutral"],
    items: [
      { id: 1, text: "Extract 1", key: "enthusiastic" },
      { id: 2, text: "Extract 2", key: "sceptical" },
      { id: 3, text: "Extract 3", key: "neutral" },
    ],
  },
  prep3: {
    badge: "3a",
    instruction:
      "Read the questions. Highlight key words and think of synonyms. Choose the correct letter, A, B or C.",
    items: [
      {
        id: 1,
        text: "What does the speaker say about traditional approaches?",
        options: [
          { id: "A", text: "They are still the most effective." },
          { id: "B", text: "They are more useful than newer methods." },
          { id: "C", text: "A modern approach is preferable." },
        ],
        key: "C",
      },
      {
        id: 2,
        text: "How does the speaker feel about the new proposals overall?",
        options: [
          { id: "A", text: "Positive / enthusiastic" },
          { id: "B", text: "Negative" },
          { id: "C", text: "Indifferent" },
        ],
        key: "A",
      },
    ],
    gaps3b: {
      badge: "b",
      instruction:
        "Predict parts of speech, then complete the notes. NO MORE THAN TWO WORDS.",
      gaps: [
        {
          id: 1,
          before: "Need for a ",
          after: " to crime prevention",
          answers: ["modern approach"],
        },
        {
          id: 2,
          before: "Challenge of ",
          after: "",
          answers: ["changing environments"],
        },
        {
          id: 3,
          before: "Aim: make crime ",
          after: "",
          answers: ["less appealing"],
        },
      ],
    },
  },
  exam4: {
    badge: "4",
    strategies: "TEST STRATEGIES page 168",
    instruction:
      "Complete the summary. Write NO MORE THAN TWO WORDS for each answer.",
    gaps: [
      {
        id: 1,
        before: "Offenders often fail to think ",
        after: " about consequences.",
        answers: ["logically"],
      },
      {
        id: 2,
        before: "Cameras may reduce the ",
        after: " of escaping unnoticed.",
        answers: ["likelihood"],
      },
      {
        id: 3,
        before: "In some areas the risk of being caught is ",
        after: ".",
        answers: ["extremely high"],
      },
    ],
  },
  discussion: {
    badge: "5–6",
    instruction:
      "Discuss which crime-prevention measures would work best (cameras, lighting, harsher punishments). Structure your argument as in Speaking.",
    tip: "Suggested: cameras would be successful as people would know they would get caught; lighting is less useful if nobody is around; harsher punishments may deter some offenders.",
  },
};
