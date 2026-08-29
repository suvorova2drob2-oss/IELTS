import type { MindsetFlowData } from "./flowTypes";

export const MS_U8_LISTEN_STEPS = [
  "Lead-in",
  "Outline keys",
  "Classroom tip",
  "Exam keys",
] as const;

export const MS_U8_LISTEN_NEXT = [
  "Outline →",
  "Tip →",
  "Exam →",
  "← Back to unit",
] as const;

export const listeningU8: MindsetFlowData = {
  id: "ms-u8-listening-flow",
  bookPages: "pp. 173–177",
  sectionTitle: "Listening · Culture · Outline · Keys",
  unitGoals: [
    "follow talks about culture and change",
    "complete outlines and matching tasks",
    "practise with keys only when audio is unavailable",
  ],
  steps: [...MS_U8_LISTEN_STEPS],
  nextLabels: [...MS_U8_LISTEN_NEXT],
  panels: [
    {
      kind: "intro",
      badge: "LEAD-IN",
      instruction: "Culture / travel / festivals listening — predict topic vocabulary, then keys-only practice.",
      discuss: [
        "What festivals are important in your culture?",
        "How has the internet changed how we experience other cultures?",
      ],
    },
    {
      kind: "keysOnly",
      badge: "Keys",
      instruction: "Place listening answers from the bank (Unit 8 keys practice).",
      note: "keys",
      bank: [
        "Positive view",
        "Negative view",
        "Effect of the internet",
        "local traditions",
        "globalisation",
        "identity",
      ],
      items: [
        { id: "1", label: "Outline point — culture", key: "Negative view" },
        { id: "2", label: "Outline point — culture", key: "Positive view" },
        { id: "3", label: "Outline point", key: "Effect of the internet" },
      ],
    },
    {
      kind: "mc",
      badge: "Skills",
      instruction: "Do not reveal answers until students finish (exam tip). Practice items:",
      items: [
        {
          id: "1",
          stem: "When practising listening in class, answer keys should be…",
          options: [
            { id: "A", text: "shown before the first play" },
            { id: "B", text: "withheld until students have completed the task" },
            { id: "C", text: "ignored" },
          ],
          key: "B",
        },
      ],
    },
    {
      kind: "keysOnly",
      badge: "EXAM",
      instruction: "Further matching / MC letter keys.",
      note: "keys",
      bank: ["A", "B", "C", "D", "E"],
      items: [
        { id: "1", label: "1", key: "B" },
        { id: "2", label: "2", key: "A" },
        { id: "3", label: "3", key: "C" },
        { id: "4", label: "4", key: "D" },
        { id: "5", label: "5", key: "E" },
      ],
    },

  ],
};
