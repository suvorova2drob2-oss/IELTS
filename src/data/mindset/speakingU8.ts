import type { MindsetFlowData } from "./flowTypes";

export const MS_U8_SPEAK_STEPS = [
  "Advice",
  "Buying time",
  "Part 2–3",
  "Exam practice",
] as const;

export const MS_U8_SPEAK_NEXT = [
  "Phrases →",
  "Part 2–3 →",
  "Exam →",
  "← Back to unit",
] as const;

export const speakingU8: MindsetFlowData = {
  id: "ms-u8-speaking-flow",
  bookPages: "pp. 178–184",
  sectionTitle: "Speaking · Culture · Buying time · Part 2–3",
  unitGoals: [
    "avoid memorised answers",
    "buy time and clarify meaning",
    "discuss language, culture and globalisation",
  ],
  steps: [...MS_U8_SPEAK_STEPS],
  nextLabels: [...MS_U8_SPEAK_NEXT],
  panels: [
    {
      kind: "mc",
      badge: "Advice",
      instruction: "Speaking advice — choose the better guidance.",
      items: [
        {
          id: "1",
          stem: "Memorising fixed answers for the exam is…",
          options: [
            { id: "A", text: "safe because examiners love scripts" },
            { id: "B", text: "risky — answers may not match the question" },
            { id: "C", text: "required for fluency" },
          ],
          key: "B",
        },
      ],
    },
    {
      kind: "gaps",
      badge: "Buying time",
      instruction: "Place buying-time / clarification phrases.",
      bank: [
        "That's not an easy question to answer. Let me think …",
        "Sorry, could you repeat the question?",
        "What I mean is…",
        "In other words…",
      ],
      items: [
        { id: "1", stem: "Need a moment →", key: "That's not an easy question to answer. Let me think …" },
        { id: "2", stem: "Didn't catch it →", key: "Sorry, could you repeat the question?" },
        { id: "3", stem: "Clarify your idea →", key: "What I mean is…", altKeys: ["In other words…"] },
      ],
    },
    {
      kind: "speak",
      badge: "Part 2–3",
      instruction: "Culture topics — Part 2 card and Part 3 follow-ups.",
      card: "Describe a cultural tradition in your country.\n\nYou should say:\n• what it is\n• when it happens\n• what people do\nand explain why it is important.",
      prompts: [
        "How is language connected to culture?",
        "Has globalisation changed your culture?",
        "Is there a culture associated with the language itself?",
        "Do young people value traditions less than older generations?",
      ],
      samples: [
        "Two sub-topics often linked: language and culture; culture and change.",
        "Understanding someone's culture can help you understand their communication style.",
      ],
    },
    {
      kind: "speak",
      badge: "EXAM",
      instruction: "Extended Part 3 practice — give reasons and examples; avoid memorised scripts.",
      prompts: [
        "Should schools teach more about world cultures?",
        "Can tourism help protect local culture, or does it damage it?",
        "Will minority languages survive the next fifty years?",
      ],
      tips: [
        "Keep answers relevant; use phrases for buying time rather than saying the first thing that comes into your head.",
        "Do not keep talking if you are not answering the question.",
      ],
    },

  ],
};
