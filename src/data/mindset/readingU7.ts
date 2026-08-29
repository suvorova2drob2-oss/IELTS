import type { MindsetFlowData } from "./flowTypes";

export const MS_U7_READ_STEPS = [
  "Vocab match",
  "Paragraphs",
  "Short answers",
  "MC check",
  "Discussion",
] as const;

export const MS_U7_READ_NEXT = [
  "Paragraphs →",
  "Short →",
  "MC →",
  "Discussion →",
  "← Back to unit",
] as const;

export const readingU7: MindsetFlowData = {
  id: "ms-u7-reading-flow",
  bookPages: "pp. 139–145",
  sectionTitle: "Reading · Media · Matching · Short answers",
  unitGoals: [
    "understand media vocabulary and paraphrases",
    "match information and complete short answers",
    "evaluate citizen journalism claims",
  ],
  steps: [...MS_U7_READ_STEPS],
  nextLabels: [...MS_U7_READ_NEXT],
  panels: [
    {
      kind: "match",
      badge: "1–2",
      instruction: "Media vocabulary — match items 1–7 with A–G.",
      bank: [
        { id: "A", text: "a camera" },
        { id: "B", text: "Ohmynews!" },
        { id: "C", text: "CNN, The Times" },
        { id: "D", text: "2021" },
        { id: "E", text: "educational, economic, social, cultural" },
        { id: "F", text: "rioters, looters" },
        { id: "G", text: "their critical faculties" },
      ],
      items: [
        { id: "1", stem: "1", key: "E" },
        { id: "2", stem: "2", key: "G" },
        { id: "3", stem: "3", key: "A" },
        { id: "4", stem: "4", key: "C" },
        { id: "5", stem: "5", key: "F" },
        { id: "6", stem: "6", key: "B" },
        { id: "7", stem: "7", key: "D" },
      ],
    },
    {
      kind: "match",
      badge: "8",
      instruction: "Paragraph matching / information — place letters for items 1–6.",
      bank: [
        { id: "F", text: "F" },
        { id: "G", text: "G" },
        { id: "A", text: "A" },
        { id: "B", text: "B" },
        { id: "E", text: "E" },
      ],
      items: [
        { id: "2", stem: "2", key: "F" },
        { id: "3", stem: "3", key: "G" },
        { id: "4", stem: "4", key: "A" },
        { id: "5", stem: "5", key: "B" },
        { id: "6", stem: "6", key: "E" },
      ],
      tip: "Key: 2 F · 3 G · 4 A · 5 B · 6 E (item 1 = own / 10 in some keys)",
    },
    {
      kind: "gaps",
      badge: "10",
      instruction: "Short-answer questions — place answers from the bank (word limit).",
      bank: [
        "eyewitness",
        "space shuttle Columbia",
        "(amateur) (news) bloggers",
        "gatekeepers",
      ],
      items: [
        { id: "1", stem: "1", key: "eyewitness" },
        { id: "2", stem: "2", key: "space shuttle Columbia" },
        { id: "3", stem: "3", key: "(amateur) (news) bloggers", altKeys: ["amateur news bloggers", "amateur bloggers", "bloggers"] },
        { id: "4", stem: "4", key: "gatekeepers" },
      ],
    },
    {
      kind: "mc",
      badge: "11",
      instruction: "Choose the correct option for each exam-style item (keys from answer key).",
      items: [
        {
          id: "7",
          stem: "Critical thinking in the text is presented as…",
          options: [
            { id: "A", text: "desirable (correct)" },
            { id: "B", text: "a 'risk' (incorrect paraphrase)" },
            { id: "C", text: "not mentioned (incorrect)" },
          ],
          key: "A",
        },
        {
          id: "8",
          stem: "Best paraphrase / option for authorities item",
          options: [
            { id: "A", text: "too many words (incorrect)" },
            { id: "B", text: "correct option" },
            { id: "C", text: "authorities = police only (incorrect)" },
          ],
          key: "B",
        },
        {
          id: "9",
          stem: "Mainstream media role / We media",
          options: [
            { id: "A", text: "old model (incorrect)" },
            { id: "B", text: "correct option" },
            { id: "C", text: "We media is a 'm…' (incorrect)" },
          ],
          key: "B",
        },
      ],
    },
    {
      kind: "speak",
      badge: "Discussion",
      instruction: "Discuss how citizen journalism changes news reliability.",
      prompts: [
        "What is the difference between a journalist and a reporter?",
        "How do broadcast and publish differ?",
        "What is the difference between an eyewitness and a source?",
        "Should mainstream media still act as 'gatekeepers'?",
      ],
      tips: [
        "Journalist = generic media worker; reporter = writes/presents news only.",
        "Broadcast = TV/radio; publish = print/online text.",
        "Eyewitness saw events; source provides information.",
      ],
    },

  ],
};
