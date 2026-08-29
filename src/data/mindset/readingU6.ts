import type { MindsetFlowData } from "./flowTypes";

export const MS_U6_READ_STEPS = [
  "Word formation",
  "Summary + options",
  "Summary no options",
  "Short answers",
  "Exam skills",
] as const;

export const MS_U6_READ_NEXT = [
  "Summary →",
  "No options →",
  "Short →",
  "Exam →",
  "← Back to unit",
] as const;

export const readingU6: MindsetFlowData = {
  id: "ms-u6-reading-flow",
  bookPages: "pp. 114–121",
  sectionTitle: "Reading · Word form · Summary completion",
  unitGoals: [
    "complete summaries with and without word banks",
    "scan for acronyms and locating words",
    "understand prediction language in academic texts",
  ],
  steps: [...MS_U6_READ_STEPS],
  nextLabels: [...MS_U6_READ_NEXT],
  panels: [
    {
      kind: "gaps",
      badge: "1–2",
      instruction:
        "Correct the word-formation errors in the paragraph. Place the correct form for each numbered error.",
      tip: "All answers are from the answer key (incorrect → correct).",
      bank: [
        "research",
        "particular",
        "unimaginable",
        "development",
        "popular",
        "innocent",
        "noticeable",
        "substitute",
        "employed",
      ],
      items: [
        { id: "2", stem: "researches →", key: "research" },
        { id: "3", stem: "(in) particularly →", key: "particular" },
        { id: "4", stem: "imaginable (wrong polarity) →", key: "unimaginable" },
        { id: "5", stem: "developed →", key: "development" },
        { id: "6", stem: "popularly →", key: "popular" },
        { id: "7", stem: "innocence →", key: "innocent" },
        { id: "8", stem: "noticeably →", key: "noticeable" },
        { id: "9", stem: "substituted →", key: "substitute" },
        { id: "10", stem: "employment (is …) →", key: "employed" },
      ],
    },
    {
      kind: "match",
      badge: "4",
      instruction:
        "Summary completion with options — VR passage. Match gaps 1–5 with options A–G (distractors included).",
      tip: "4 1 A · 2 I · 3 E · 4 G · 5 D (answer key).",
      bank: [
        { id: "A", text: "A" },
        { id: "D", text: "D" },
        { id: "E", text: "E" },
        { id: "G", text: "G" },
        { id: "I", text: "I" },
        { id: "B", text: "B (distractor)" },
        { id: "C", text: "C (distractor)" },
      ],
      items: [
        { id: "1", stem: "Summary gap 1", key: "A" },
        { id: "2", stem: "Summary gap 2", key: "I" },
        { id: "3", stem: "Summary gap 3", key: "E" },
        { id: "4", stem: "Summary gap 4", key: "G" },
        { id: "5", stem: "Summary gap 5", key: "D" },
      ],
    },
    {
      kind: "gaps",
      badge: "9",
      instruction:
        "Summary completion WITHOUT options — no more than two words from the text for each gap.",
      bank: [
        "far-reaching",
        "field / industry",
        "creativity",
        "secondary",
        "immersive world",
        "composition",
        "interconnected",
        "(avid) travellers",
      ],
      items: [
        { id: "1", stem: "Gap 1 (adjective phrase)", key: "far-reaching" },
        { id: "2", stem: "Gap 2 (noun)", key: "field / industry", altKeys: ["field", "industry"] },
        { id: "3", stem: "Gap 3", key: "creativity" },
        { id: "4", stem: "Gap 4", key: "secondary" },
        { id: "5", stem: "Gap 5", key: "immersive world" },
        { id: "6", stem: "Gap 6", key: "composition" },
        { id: "7", stem: "Gap 7", key: "interconnected" },
        { id: "8", stem: "Gap 8", key: "(avid) travellers", altKeys: ["avid travellers", "travellers"] },
      ],
    },
    {
      kind: "gaps",
      badge: "11",
      instruction: "Diagram / short-answer style completions (paragraphs B–C).",
      bank: ["computer", "natural differences", "tailored picture", "aircraft flight"],
      items: [
        { id: "1", stem: "1", key: "computer" },
        { id: "2", stem: "2", key: "natural differences" },
        { id: "3", stem: "3", key: "tailored picture" },
        { id: "4", stem: "4", key: "aircraft flight" },
      ],
    },
    {
      kind: "match",
      badge: "EXAM",
      instruction:
        "Exam skills — predictions / futures language matching (answer key 1 G 2 D 3 F 4 J 5 A) and note completion.",
      bank: [
        { id: "G", text: "G" },
        { id: "D", text: "D" },
        { id: "F", text: "F" },
        { id: "J", text: "J" },
        { id: "A", text: "A" },
        { id: "lighting rig", text: "lighting rig" },
        { id: "beam", text: "beam" },
        { id: "mirrored surface", text: "mirrored surface" },
        { id: "transparent (foil)", text: "transparent (foil)" },
      ],
      items: [
        { id: "1", stem: "Question 1", key: "G" },
        { id: "2", stem: "Question 2", key: "D" },
        { id: "3", stem: "Question 3", key: "F" },
        { id: "4", stem: "Question 4", key: "J" },
        { id: "5", stem: "Question 5", key: "A" },
        { id: "6", stem: "Note gap 6", key: "lighting rig" },
        { id: "7", stem: "Note gap 7", key: "beam" },
        { id: "8", stem: "Note gap 8", key: "mirrored surface" },
        { id: "9", stem: "Note gap 9", key: "transparent (foil)" },
      ],
    },

  ],
};
