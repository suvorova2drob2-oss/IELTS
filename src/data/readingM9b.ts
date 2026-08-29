export const READ_M9B_STEPS = [
  "1 Before you read",
  "2 MCQ + YNNG",
  "3 Task analysis",
  "4 Discussion",
] as const;

export const READ_M9B_NEXT = [
  "2 Exam →",
  "3 Analysis →",
  "4 Discussion →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ");
}

export function checkReadM9b(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export const readingM9b = {
  id: "reading-m9b-flow",
  bookPages: "pp. 146–147 in your coursebook",
  sectionTitle: "Reading · Multiple choice; Yes/No/Not given",
  title: "Jobs of the future",
  subtitle:
    "How technology, transferable skills and new working patterns are reshaping careers — and what ‘working better’ might mean.",
  passage: [
    {
      id: "1",
      text: `Predictions about jobs of the future often sound dramatic: robots will replace office workers, drivers will disappear, and entirely new professions will emerge around space travel or green energy. While some forecasts exaggerate the speed of change, few experts deny that automation and artificial intelligence are already altering which skills employers prize. Roles that once seemed secure can become vulnerable when software learns to perform routine decisions.`,
    },
    {
      id: "2",
      text: `At the same time, many organisations argue that people will not vanish from the workplace; they will work differently. Flexible hours, remote collaboration and project-based teams are becoming normal in knowledge industries. Supporters claim these patterns raise productivity and allow staff to balance life and work. Critics reply that constant availability can blur boundaries and increase stress, especially when managers still expect traditional office presence.`,
    },
    {
      id: "3",
      text: `Education systems are under pressure to respond. Degrees remain valuable in some fields, yet employers increasingly emphasise transferable skills — communication, problem-solving, digital literacy — because workers may change careers several times. Training programmes inside companies try to keep staff up to date, but the writer notes that access to high-quality reskilling is uneven: employees in large multi-national firms often receive more support than those in smaller businesses.`,
    },
    {
      id: "4",
      text: `Looking ahead, the most resilient workers may be those who combine specialist knowledge with the ability to learn quickly. The article does not claim that technology alone guarantees success, nor does it suggest that every traditional job will disappear next year. Instead it argues that societies which invest in lifelong learning and fair working conditions are more likely to turn technological change into opportunity rather than insecurity.`,
    },
  ],
  beforeYouRead: {
    badge: "1",
    instruction: "Discuss the questions. Give full answers.",
    questions: [
      "What jobs do you think will exist in the future that do not exist now?",
      "Which skills will be most important for people entering the workforce in the next twenty years?",
    ],
    tip: "Think about technology, space, green energy, care work and creative industries. Transferable skills and digital knowledge are often mentioned as vital.",
  },
  exam: {
    badge: "2",
    strategies: "TEST STRATEGIES pages 171–172",
    instruction:
      "Questions 1–5 Choose the correct letter, A, B, C or D. Questions 6–9 Do the following statements agree with the claims of the writer? Write Yes, No or Not given. Check spelling and word limits where relevant.",
    gaps: [
      {
        id: 1,
        before:
          "1 What point does the writer make about forecasts of future jobs?",
        after: "",
        answers: ["B"],
      },
      {
        id: 2,
        before:
          "2 According to the passage, flexible and remote working patterns are",
        after: "",
        answers: ["D"],
      },
      {
        id: 3,
        before:
          "3 What does the writer say about education and transferable skills?",
        after: "",
        answers: ["A"],
      },
      {
        id: 4,
        before:
          "4 Access to high-quality reskilling is described as",
        after: "",
        answers: ["C"],
      },
      {
        id: 5,
        before:
          "5 The writer’s overall attitude to technological change is that",
        after: "",
        answers: ["B"],
      },
      {
        id: 6,
        before:
          "6 The writer believes automation is already changing the skills employers value.",
        after: "",
        answers: ["Yes"],
      },
      {
        id: 7,
        before:
          "7 Some people argue flexible working can increase stress by blurring work–life boundaries.",
        after: "",
        answers: ["Yes"],
      },
      {
        id: 8,
        before:
          "8 The writer gives exact figures for how many jobs robots will replace by 2030.",
        after: "",
        answers: ["Not given", "NG", "Not Given"],
      },
      {
        id: 9,
        before:
          "9 The writer claims that technology alone guarantees individual career success.",
        after: "",
        answers: ["No"],
      },
    ],
  },
  analyse: {
    badge: "3",
    instruction:
      "Compare answers with a partner. For Yes/No/Not given: remember Yes = all parts agree; No = the text says the opposite; Not given = not mentioned. Which paraphrases helped you?",
  },
  discussion: {
    badge: "4",
    instruction: "Discuss in groups. Give reasons and extend your answers.",
    questions: [
      "Would you prefer a traditional office job or flexible remote work? Why?",
      "How should schools prepare students for jobs that do not yet exist?",
      "Is lifelong learning realistic for everyone? What barriers exist?",
    ],
    tip: "Consider independence vs security, cost of training, and whether governments or employers should fund reskilling.",
  },
};
