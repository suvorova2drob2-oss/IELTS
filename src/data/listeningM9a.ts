export const LISTEN_M9A_STEPS = [
  "1 Before listen",
  "2a Specific / general",
  "2b Tone / phrases",
  "3a–3b Prep",
  "4 Exam summary",
  "5–6 Discussion",
] as const;

export const LISTEN_M9A_NEXT = [
  "2a Specific/general →",
  "2b Phrases →",
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

export function checkListenM9a(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export const listeningM9a = {
  id: "listening-m9a-flow",
  bookPages: "p. 140 in your coursebook",
  sectionTitle: "Listening · Section 3 (record breakers)",
  noAudioNote:
    "Аудио пока нет — можно пройти подготовку и задания. Ключи по Teacher’s Book / script 9.x, когда появятся треки.",
  before: {
    badge: "1",
    heading: "Before you listen",
    instruction:
      "Guess what these world records might be, then check: 387.32 km/h · 63.7 kg. Discuss what qualities record breakers need.",
    tip: "The fastest streamlined 3-wheeled electric motorcycle, built by Eva Håkansson of Sweden, which reached 387.32 km/h (240.72 mph) in 2014. The heaviest covering of bees, weighing 63.7 kg (140 lb 6.95 oz). Suggested: people need to be incredibly passionate and motivated, prepared for failure, and able to bounce back and hone their skills.",
  },
  attitude2a: {
    badge: "2a",
    instruction:
      "Decide whether each statement is specific or general. (Audio later — check against keys.)",
    items: [
      {
        id: 1,
        text: "Statement 1 gives information on which record and which traits.",
        options: [
          { id: "A", text: "Specific" },
          { id: "B", text: "General" },
          { id: "C", text: "Neither" },
        ],
        key: "A",
      },
      {
        id: 2,
        text: "Statement 2 talks at a higher level about an overall theme or concept.",
        options: [
          { id: "A", text: "Specific" },
          { id: "B", text: "General" },
          { id: "C", text: "Neither" },
        ],
        key: "B",
      },
    ],
  },
  tone2b: {
    badge: "b",
    instruction:
      "Match each phrase with the idea it makes more specific. Adding detail changes meaning (e.g. pivotal role = one of the most important roles).",
    bank: [
      "pivotal role",
      "quality of life",
      "successful tech start-ups",
      "personality traits",
      "long-term financial goal",
    ],
    items: [
      { id: 1, text: "Makes ‘role’ mean one of the most important roles", key: "pivotal role" },
      { id: 2, text: "Defines which aspect of life is meant", key: "quality of life" },
      { id: 3, text: "Specifies which start-ups (IT / tech growth)", key: "successful tech start-ups" },
      { id: 4, text: "Clarifies that traits are not physical", key: "personality traits" },
      { id: 5, text: "Shows which kind of goal is intended", key: "long-term financial goal" },
    ],
  },
  prep3: {
    badge: "3a",
    instruction:
      "Read the questions. Which are likely to be more abstract, and which more factual/concrete? Choose the correct letter.",
    items: [
      {
        id: 1,
        text: "Questions about shared traits of record breakers are likely to be",
        options: [
          { id: "A", text: "More abstract" },
          { id: "B", text: "More factual / concrete" },
          { id: "C", text: "Unrelated to the talk" },
        ],
        key: "A",
      },
      {
        id: 2,
        text: "Questions naming a particular record (e.g. longest finger nails) are likely to be",
        options: [
          { id: "A", text: "More abstract" },
          { id: "B", text: "More factual / concrete" },
          { id: "C", text: "Opinion only" },
        ],
        key: "B",
      },
    ],
    gaps3b: {
      badge: "b",
      instruction:
        "Complete the notes with the specific phrases below. NO MORE THAN THREE WORDS.",
      gaps: [
        {
          id: 1,
          before: "Parents / mentors can play a ",
          after: " in success",
          answers: ["pivotal role"],
        },
        {
          id: 2,
          before: "Research may link success to ",
          after: "",
          answers: ["quality of life"],
        },
        {
          id: 3,
          before: "Growth of ",
          after: " in recent decades",
          answers: ["successful tech start-ups"],
        },
        {
          id: 4,
          before: "Interest in ",
          after: " of high achievers",
          answers: ["personality traits"],
        },
        {
          id: 5,
          before: "Saving for a ",
          after: "",
          answers: ["long-term financial goal"],
        },
      ],
    },
  },
  exam4: {
    badge: "4",
    strategies: "TEST STRATEGIES page 168",
    instruction:
      "Complete the sentences. Write NO MORE THAN THREE WORDS for each answer.",
    gaps: [
      {
        id: 1,
        before: "The seminar focuses on ",
        after: ".",
        answers: [
          "(World) record breakers",
          "World record breakers",
          "record breakers",
        ],
      },
      {
        id: 2,
        before: "Researchers look for ",
        after: " among successful people.",
        answers: ["shared traits"],
      },
      {
        id: 3,
        before: "The speakers favour an ",
        after: " to the topic.",
        answers: ["inductive approach"],
      },
      {
        id: 4,
        before: "One example discussed is the person with the ",
        after: ".",
        answers: ["longest finger nails", "longest fingernails"],
      },
      {
        id: 5,
        before: "Students should notice the speakers’ ",
        after: ".",
        answers: ["presentation style"],
      },
    ],
  },
  discussion: {
    badge: "5–6",
    instruction:
      "Discuss why people try to break records and whether success depends more on talent, luck or hard work.",
    tip: "Suggested: people are driven by the desire to achieve something no one else has; they practise hard and believe in their ability. For most, success is a combination of talent, luck and hard work, though the most successful often possess a special kind of talent.",
  },
};
