import type { MindsetFlowData } from "./flowTypes";

export const MS_U7_LISTEN_STEPS = [
  "Lead-in",
  "Note keys",
  "Strategy MC",
  "Exam keys",
] as const;

export const MS_U7_LISTEN_NEXT = [
  "Notes →",
  "Strategy →",
  "Exam →",
  "← Back to unit",
] as const;

export const listeningU7: MindsetFlowData = {
  id: "ms-u7-listening-flow",
  bookPages: "pp. 150–154",
  sectionTitle: "Listening · News talks · Notes",
  unitGoals: [
    "predict paraphrases for Section 4",
    "complete notes within word limits",
    "follow a lecture on media / news",
  ],
  steps: [...MS_U7_LISTEN_STEPS],
  nextLabels: [...MS_U7_LISTEN_NEXT],
  panels: [
    {
      kind: "intro",
      badge: "LEAD-IN",
      instruction:
        "Section 4 talk: news / media. Predict vocabulary, then complete keys-only practice.",
      discuss: [
        "What local/national/international news sources do you use?",
        "How do newspapers, TV channels and online outlets differ?",
      ],
    },
    {
      kind: "keysOnly",
      badge: "Practice",
      instruction: "Listening keys only — place answers from the bank (Unit 7 answer key).",
      note: "keys",
      tip: "Use full wording; click chip then gap.",
      bank: [
        "national newspapers",
        "television channels",
        "online",
        "advertisements",
        "editors",
        "audience",
        "live",
        "archive",
      ],
      items: [
        { id: "1", label: "Sources may include ___ and magazines", key: "national newspapers" },
        { id: "2", label: "Broadcast media such as ___", key: "television channels" },
        { id: "3", label: "Growing share of news consumed ___", key: "online" },
        { id: "4", label: "Revenue often from ___", key: "advertisements" },
      ],
    },
    {
      kind: "mc",
      badge: "Skills",
      instruction: "Exam-style multiple choice (representative keys from Unit 7 listening).",
      items: [
        {
          id: "1",
          stem: "A good prediction strategy before Section 4 is to…",
          options: [
            { id: "A", text: "ignore the question words" },
            { id: "B", text: "underline key words and think of paraphrases" },
            { id: "C", text: "write full essays while listening" },
          ],
          key: "B",
        },
        {
          id: "2",
          stem: "If an answer exceeds the word limit it is…",
          options: [
            { id: "A", text: "always accepted" },
            { id: "B", text: "incorrect even if the idea is right" },
            { id: "C", text: "marked half" },
          ],
          key: "B",
        },
      ],
    },
    {
      kind: "keysOnly",
      badge: "EXAM",
      instruction: "Further form / note completion keys (practice set).",
      note: "keys",
      bank: ["C", "A", "B", "D", "E", "F", "G"],
      items: [
        { id: "1", label: "1", key: "C" },
        { id: "2", label: "2", key: "A" },
        { id: "3", label: "3", key: "G" },
        { id: "4", label: "4", key: "E" },
        { id: "5", label: "5", key: "D" },
      ],
    },

  ],
};
