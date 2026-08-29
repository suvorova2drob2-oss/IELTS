export const LISTEN_M9B_STEPS = [
  "1 Before listen",
  "2a Attitudes / adjectives",
  "3a–3b Opinion MCQ",
  "4 Exam",
  "Extra discuss",
] as const;

export const LISTEN_M9B_NEXT = [
  "2a Attitudes →",
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

export function checkListenM9b(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export const listeningM9b = {
  id: "listening-m9b-flow",
  bookPages: "p. 143 in your coursebook",
  sectionTitle: "Listening · Section 3 (working better)",
  noAudioNote:
    "Аудио пока нет — можно пройти подготовку и exam. Ключи 2a: 1B 2C 3A 4D · 2c: 1B 2C 3B 4A · exam: 1 multi-national companies · 2 review the methodology · 3 2/two sections · 4 flexible working · 5 cost-effective · 6 meet the deadline · 7C 8B 9C 10A.",
  before: {
    badge: "1",
    heading: "Before you listen",
    instruction:
      "Describe a job without naming it (focus on the processes involved). Your partner guesses. Then discuss abstract ideas about modern working life (e.g. open-plan offices, working alone, hectic schedules).",
  },
  adjectives2a: {
    badge: "2a",
    instruction:
      "Are these adjectives / ideas positive or negative when speakers discuss workplace trends? Discuss meanings (forward-thinking, hectic, lone, etc.).",
    positive: [
      "energise",
      "boost productivity",
      "good for creativity",
      "forward-thinking",
      "cost-effective",
    ],
    negative: [
      "burnout",
      "distractions",
      "lack of focus",
      "hectic",
      "won’t last",
    ],
  },
  opinion3: {
    badge: "3a",
    instruction:
      "Listen for abstract ideas (audio later). Choose the correct letter, A, B, C or D. Keys for 2a.",
    items: [
      {
        id: 1,
        text: "What is Speaker 1’s overall attitude to the idea discussed?",
        options: [
          { id: "A", text: "Strongly in favour" },
          { id: "B", text: "Against (energise short-term but burnout)" },
          { id: "C", text: "Fully undecided" },
          { id: "D", text: "Only interested in pay" },
        ],
        key: "B",
      },
      {
        id: 2,
        text: "What is Speaker 2’s overall view?",
        options: [
          { id: "A", text: "In favour because productivity is everything" },
          { id: "B", text: "Neutral" },
          { id: "C", text: "Against (distractions / lack of focus)" },
          { id: "D", text: "Excited about burnout" },
        ],
        key: "C",
      },
      {
        id: 3,
        text: "What is Speaker 3’s overall view?",
        options: [
          { id: "A", text: "For (chance to think / creativity)" },
          { id: "B", text: "Against" },
          { id: "C", text: "Indifferent" },
          { id: "D", text: "Angry" },
        ],
        key: "A",
      },
      {
        id: 4,
        text: "What is Speaker 4’s overall view?",
        options: [
          { id: "A", text: "For everyone" },
          { id: "B", text: "Only for managers" },
          { id: "C", text: "Unsure" },
          { id: "D", text: "Against for themselves (need to be with people)" },
        ],
        key: "D",
      },
    ],
    adjectives3b: {
      badge: "b",
      instruction: "2c follow-up MCQ keys (audio later).",
      tip: "2c keys: 1 B · 2 C · 3 B · 4 A. Note each speaker’s positive and negative points before deciding overall attitude.",
    },
  },
  exam4: {
    badge: "4",
    strategies: "TEST STRATEGIES page 168",
    instruction:
      "Complete questions 1–6 with words from the recording (NO MORE THAN THREE WORDS). Choose the correct letter for questions 7–10.",
    mcq: [
      {
        id: 7,
        text: "What do the students decide about the project’s main focus?",
        options: [
          { id: "A", text: "Only historical office design" },
          { id: "B", text: "Pay differences between countries" },
          { id: "C", text: "How modern workplaces can work better" },
          { id: "D", text: "Sports facilities for staff" },
        ],
        key: "C",
      },
      {
        id: 8,
        text: "What concern is raised about collecting data?",
        options: [
          { id: "A", text: "There will be too few participants" },
          { id: "B", text: "They may need to review the methodology carefully" },
          { id: "C", text: "No companies will allow interviews" },
          { id: "D", text: "The topic is too concrete" },
        ],
        key: "B",
      },
      {
        id: 9,
        text: "How do they plan to structure the presentation?",
        options: [
          { id: "A", text: "One continuous talk with no sections" },
          { id: "B", text: "Five equal parts" },
          { id: "C", text: "Two sections" },
          { id: "D", text: "Only a video" },
        ],
        key: "C",
      },
      {
        id: 10,
        text: "What is their final priority before submitting?",
        options: [
          { id: "A", text: "Meet the deadline" },
          { id: "B", text: "Change the topic completely" },
          { id: "C", text: "Ignore flexible working" },
          { id: "D", text: "Remove all examples" },
        ],
        key: "A",
      },
    ],
    gaps: [
      {
        id: 1,
        before: "Case studies often focus on ",
        after: "",
        answers: ["multi-national companies", "multinational companies"],
      },
      {
        id: 2,
        before: "They agree to ",
        after: "",
        answers: ["review the methodology"],
      },
      {
        id: 3,
        before: "The talk will have ",
        after: "",
        answers: ["2 sections", "two sections", "2/two sections"],
      },
      {
        id: 4,
        before: "One theme is ",
        after: "",
        answers: ["flexible working"],
      },
      {
        id: 5,
        before: "Some changes are described as ",
        after: "",
        answers: ["cost-effective"],
      },
      {
        id: 6,
        before: "They must ",
        after: "",
        answers: ["meet the deadline"],
      },
    ],
  },
  extra: {
    badge: "Extra",
    instruction:
      "Discuss: Are open-plan offices and flexible working good for productivity and well-being? Give full answers using abstract vocabulary (productivity, creativity, burnout, collaboration).",
  },
};
