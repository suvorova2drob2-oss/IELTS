export const READ_M6B_STEPS = [
  "1 Before you read",
  "2 Note / flow completion",
  "3 Task analysis",
  "4 Discussion",
] as const;

export const READ_M6B_NEXT = [
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

export function checkReadM6b(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export const readingM6b = {
  id: "reading-m6b-flow",
  bookPages: "pp. 98–99 in your coursebook",
  sectionTitle: "Reading · Note / flow-chart completion",
  title: "Working a crime scene",
  subtitle:
    "From the first walk-through to the forensic lab — how investigators turn chaos into a clear hypothesis.",
  passage: [
    {
      id: "1",
      text: `When officers arrive at a serious crime scene, their first priority is to make it safe and to protect evidence from contamination. They identify witnesses/suspects who may have seen what happened and begin a security log that records who enters and leaves the area. Without that discipline, valuable traces can be destroyed before specialists arrive.`,
    },
    {
      id: "2",
      text: `Next comes a careful walk-through / examination of the scene. Investigators move slowly, noting the position of objects, doors and windows, and any sign of a struggle. A detailed description of the scene is written so that later teams share the same baseline understanding. From these observations they form a working hypothesis about the sequence of events — always ready to revise it if new facts appear.`,
    },
    {
      id: "3",
      text: `Physical evidence is then collected for forensics / the forensic science laboratory. Fibres, fingerprints, DNA swabs and tool marks are labelled and bagged. Photographers document locations of each item so that the spatial relationships are preserved. Close-up images of bruises and scratches on a victim, for example, can later support or challenge statements about how an assault occurred.`,
    },
    {
      id: "4",
      text: `Meanwhile, officers may produce rough sketches of rooms and outdoor areas. These sketches, together with photographs, provide a point of reference when the case is reviewed weeks later, long after the scene has been cleaned. Digital models are increasingly used, but the underlying principle remains the same: record everything that might later prove significant.`,
    },
  ],
  beforeYouRead: {
    badge: "1",
    instruction: "Discuss the questions. Give full answers.",
    questions: [
      "Do you watch crime programmes? Why are they popular?",
      "What do crime-scene investigators do, in your view?",
    ],
    tip: "Crime programmes are popular because of strong plots, suspense, real-life contexts and interesting characters. Investigators record the scene, locate and analyse evidence, and help determine details of the crime.",
  },
  exam: {
    badge: "2",
    strategies: "TEST STRATEGIES page 170",
    instruction:
      "Complete the notes / flow chart. Choose NO MORE THAN THREE WORDS from the passage for each answer. Check spelling and word limits.",
    gaps: [
      {
        id: 1,
        before: "Identify ",
        after: " who may have seen the incident",
        answers: ["witnesses/suspects", "witnesses", "suspects"],
      },
      {
        id: 2,
        before: "Start a ",
        after: " of people entering/leaving",
        answers: ["security log"],
      },
      {
        id: 3,
        before: "Carry out a ",
        after: " of the scene",
        answers: [
          "walk-through/examination",
          "walk-through",
          "examination",
          "walk-through examination",
        ],
      },
      {
        id: 4,
        before: "Write a detailed ",
        after: "",
        answers: ["description"],
      },
      {
        id: 5,
        before: "Form a working ",
        after: " about events",
        answers: ["hypothesis"],
      },
      {
        id: 6,
        before: "Send samples to ",
        after: "",
        answers: [
          "forensics",
          "forensic science laboratory",
          "forensics/forensic science laboratory",
        ],
      },
      {
        id: 7,
        before: "Photograph ",
        after: " of each item",
        answers: ["locations"],
      },
      {
        id: 8,
        before: "Record ",
        after: " on a victim",
        answers: ["bruises and scratches"],
      },
      {
        id: 9,
        before: "Produce ",
        after: " of rooms/areas",
        answers: ["(rough) sketches", "rough sketches", "sketches"],
      },
      {
        id: 10,
        before: "Use as a later ",
        after: "",
        answers: ["point of reference"],
      },
    ],
  },
  analyse: {
    badge: "3",
    instruction:
      "Compare answers with a partner. Which paraphrases in the questions helped you locate the answers? Which distractors were tempting?",
  },
  discussion: {
    badge: "4",
    instruction: "Discuss in groups. Give reasons and extend your answers.",
    questions: [
      "What qualities make a good crime-scene investigator?",
      "What difficulties might the job involve?",
      "Would you find this kind of work interesting? Why / Why not?",
    ],
    tip: "Qualities: attention to detail, lateral thinking, determination, resilience, leadership, tact, sensitivity. Difficulties: unpredictable hours, unpleasant scenarios, frustration when evidence is unclear. Rewards: varied, challenging, satisfying when criminals are caught.",
  },
};
