import type { MindsetFlowData } from "./flowTypes";

export const MS_U6_LISTEN_STEPS = [
  "Map questions",
  "Attitude phrases",
  "Note keys",
  "Purpose linkers",
  "Exam keys",
] as const;

export const MS_U6_LISTEN_NEXT = [
  "Attitude →",
  "Notes →",
  "Linkers →",
  "Exam →",
  "← Back to unit",
] as const;

export const listeningU6: MindsetFlowData = {
  id: "ms-u6-listening-flow",
  bookPages: "pp. 127–132",
  sectionTitle: "Listening · Agreement · Notes · Purpose",
  unitGoals: [
    "recognise agreement and concern phrases",
    "complete notes and flow charts",
    "use cause–effect and purpose linkers",
  ],
  steps: [...MS_U6_LISTEN_STEPS],
  nextLabels: [...MS_U6_LISTEN_NEXT],
  panels: [
    {
      kind: "match",
      badge: "3",
      instruction: "Match speakers/sections A–E with question numbers (keys only).",
      bank: [
        { id: "A", text: "3, 6" },
        { id: "B", text: "4, 8" },
        { id: "C", text: "1, 7" },
        { id: "D", text: "5, 10" },
        { id: "E", text: "2, 9" },
      ],
      items: [
        { id: "A", stem: "Group A maps to questions", key: "A" },
        { id: "B", stem: "Group B maps to questions", key: "B" },
        { id: "C", stem: "Group C maps to questions", key: "C" },
        { id: "D", stem: "Group D maps to questions", key: "D" },
        { id: "E", stem: "Group E maps to questions", key: "E" },
      ],
      tip: "Answer key: A 3,6 · B 4,8 · C 1,7 · D 5,10 · E 2,9",
    },
    {
      kind: "gaps",
      badge: "5",
      instruction: "Place the attitude / agreement phrases.",
      bank: [
        "My biggest worry is",
        "You've got a point",
        "The real issue we've got",
        "I quite agree",
        "I'm not exactly confident",
        "That's absolutely true",
      ],
      items: [
        { id: "1", stem: "1", key: "My biggest worry is" },
        { id: "2", stem: "2", key: "You've got a point" },
        { id: "3", stem: "3", key: "The real issue we've got" },
        { id: "4", stem: "4", key: "I quite agree" },
        { id: "5", stem: "5", key: "I'm not exactly confident" },
        { id: "6", stem: "6", key: "That's absolutely true" },
      ],
    },
    {
      kind: "keysOnly",
      badge: "12",
      instruction: "Note completion — place the keys (no audio).",
      note: "keys",
      bank: [
        "bullet points",
        "initial impressions",
        "leave out",
        "edited version",
        "feedback",
      ],
      items: [
        { id: "1", label: "1", key: "bullet points" },
        { id: "2", label: "2", key: "initial impressions" },
        { id: "3", label: "3", key: "leave out" },
        { id: "4", label: "4", key: "edited version" },
        { id: "5", label: "5", key: "feedback" },
      ],
    },
    {
      kind: "gaps",
      badge: "13–14",
      instruction: "Cause–effect linkers and corrected purpose phrases.",
      bank: [
        "That way",
        "By doing so",
        "In order for us to",
        "In order that she could",
        "so as to",
        "This way",
        "After doing so",
      ],
      items: [
        { id: "1", stem: "use bullet points → easier to compare notes →", key: "That way" },
        { id: "2", stem: "agree themes → edited version →", key: "By doing so" },
        { id: "3", stem: "contact tutor → get feedback →", key: "In order for us to" },
        { id: "4a", stem: "Incorrect 'In order so to' → correct purpose phrase →", key: "In order that she could", altKeys: ["so as to"] },
        { id: "4b", stem: "Incorrect 'The way' →", key: "That way", altKeys: ["This way"] },
        { id: "4c", stem: "Incorrect 'For doing so' →", key: "By doing so", altKeys: ["After doing so"] },
      ],
    },
    {
      kind: "keysOnly",
      badge: "EXAM",
      instruction: "Exam section keys (15): place letters / answers.",
      note: "keys",
      bank: ["B", "D", "A", "C", "F", "G"],
      items: [
        { id: "1", label: "1/2 (two answers)", key: "B", altKeys: ["D"] },
        { id: "3", label: "3", key: "A" },
        { id: "4", label: "4", key: "B" },
        { id: "5", label: "5", key: "C" },
        { id: "6", label: "6", key: "C" },
        { id: "7", label: "7", key: "F" },
        { id: "8", label: "8", key: "G" },
        { id: "9", label: "9", key: "D" },
        { id: "10", label: "10", key: "A" },
      ],
      tip: "Full key: 1/2 B,D · 3 A · 4 B · 5 C · 6 C · 7 F · 8 G · 9 D · 10 A",
    },

  ],
};
