import type { MindsetFlowData } from "./flowTypes";

export const MS_U6_SPEAK_STEPS = [
  "Inventions",
  "Verb patterns",
  "Strategy MC",
  "Exam practice",
] as const;

export const MS_U6_SPEAK_NEXT = [
  "Patterns →",
  "Strategy →",
  "Exam →",
  "← Back to unit",
] as const;

export const speakingU6: MindsetFlowData = {
  id: "ms-u6-speaking-flow",
  bookPages: "pp. 133–138",
  sectionTitle: "Speaking · Inventions · Verb patterns",
  unitGoals: [
    "talk about inventions and technology",
    "use a wide range of verb patterns (to / -ing)",
    "buy time naturally in Part 3",
  ],
  steps: [...MS_U6_SPEAK_STEPS],
  nextLabels: [...MS_U6_SPEAK_NEXT],
  panels: [
    {
      kind: "match",
      badge: "1",
      instruction: "Match inventions with years.",
      bank: [
        { id: "1783", text: "parachute" },
        { id: "1843", text: "typewriter" },
        { id: "1866", text: "dynamite" },
        { id: "1798", text: "vaccination" },
        { id: "1963", text: "computer mouse" },
        { id: "1280", text: "eyeglasses" },
        { id: "1710", text: "thermometer" },
        { id: "2400 BC", text: "abacus" },
      ],
      items: [
        { id: "1", stem: "1783", key: "1783" },
        { id: "2", stem: "1843", key: "1843" },
        { id: "3", stem: "1866", key: "1866" },
        { id: "4", stem: "1798", key: "1798" },
        { id: "5", stem: "1963", key: "1963" },
        { id: "6", stem: "1280", key: "1280" },
        { id: "7", stem: "1710", key: "1710" },
        { id: "8", stem: "2400 BC", key: "2400 BC" },
      ],
    },
    {
      kind: "gaps",
      badge: "4 / 8",
      instruction: "Place correct verb patterns / corrected forms from the candidate script.",
      bank: [
        "used to",
        "'d be using",
        "'ve been thinking",
        "will be",
        "have become",
        "'m going to",
        "I'd like to tell",
        "let me begin",
        "remember being taught",
        "managed to attach",
        "can't help thinking",
        "imagine living",
        "allow us to have",
        "remember to look it up",
        "continue to be",
      ],
      items: [
        { id: "4-1", stem: "1 used to", key: "used to" },
        { id: "4-2", stem: "2", key: "'d be using" },
        { id: "4-3", stem: "3", key: "'ve been thinking" },
        { id: "4-4", stem: "4", key: "will be" },
        { id: "4-5", stem: "5", key: "have become" },
        { id: "4-6", stem: "6", key: "'m going to" },
        { id: "8-1", stem: "I'd like to tell", key: "I'd like to tell" },
        { id: "8-2", stem: "let me begin", key: "let me begin" },
        { id: "8-5", stem: "remember being taught", key: "remember being taught" },
        { id: "8-7", stem: "managed to attach", key: "managed to attach" },
        { id: "8-8", stem: "can't help thinking", key: "can't help thinking" },
        { id: "8-10", stem: "imagine living", key: "imagine living" },
        { id: "8-11", stem: "allow us to have", key: "allow us to have" },
        { id: "8-13", stem: "remember to look it up", key: "remember to look it up" },
        { id: "8-14", stem: "continue to be / continue being", key: "continue to be", altKeys: ["continue being"] },
      ],
    },
    {
      kind: "mc",
      badge: "12",
      instruction: "Part 3 strategy / buying-time — choose the best option for each item (keys).",
      items: [
        { id: "1", stem: "Q12.1", options: [{ id: "A", text: "A" }, { id: "B", text: "B" }, { id: "C", text: "C" }], key: "B" },
        { id: "2", stem: "Q12.2", options: [{ id: "A", text: "A" }, { id: "B", text: "B" }, { id: "C", text: "C" }], key: "A" },
        { id: "3", stem: "Q12.3", options: [{ id: "A", text: "A" }, { id: "B", text: "B" }, { id: "C", text: "C" }], key: "C" },
        { id: "4", stem: "Q12.4", options: [{ id: "A", text: "A" }, { id: "B", text: "B" }, { id: "C", text: "C" }], key: "C" },
        { id: "5", stem: "Q12.5", options: [{ id: "A", text: "A" }, { id: "B", text: "B" }, { id: "C", text: "C" }], key: "B" },
        { id: "6", stem: "Q12.6", options: [{ id: "A", text: "A" }, { id: "B", text: "B" }, { id: "C", text: "C" }], key: "A" },
        { id: "7", stem: "Q12.7", options: [{ id: "A", text: "A" }, { id: "B", text: "B" }, { id: "C", text: "C" }], key: "C" },
        { id: "8", stem: "Q12.8", options: [{ id: "A", text: "A" }, { id: "B", text: "B" }, { id: "C", text: "C" }], key: "A" },
      ],
    },
    {
      kind: "speak",
      badge: "EXAM",
      instruction: "Part 2–3 practice on science and technology. Use buying-time phrases when needed.",
      card: "Describe a useful invention.\n\nYou should say:\n• what it is\n• when it was invented\n• how it is used\nand explain why it is useful.",
      prompts: [
        "How has technology changed education?",
        "Do you think children spend too much time on screens?",
        "What scientific discovery has been most important for humanity?",
      ],
      tips: [
        "Buying time: That's quite a tricky question. / It's never crossed my mind before. / I'm not entirely sure what you're driving at. / Sorry, I don't quite follow. / my mind has gone blank",
      ],
      samples: [
        "Important inventions in Part 1/2 discussion: radio, electricity in homes, aeroplane, compass.",
      ],
    },

  ],
};
