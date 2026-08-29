import type { MindsetFlowData } from "./flowTypes";

export const MS_U7_SPEAK_STEPS = [
  "Part 1–2",
  "Phrases",
  "Part 3",
  "Advice",
] as const;

export const MS_U7_SPEAK_NEXT = [
  "Phrases →",
  "Part 3 →",
  "Advice →",
  "← Back to unit",
] as const;

export const speakingU7: MindsetFlowData = {
  id: "ms-u7-speaking-flow",
  bookPages: "pp. 155–159",
  sectionTitle: "Speaking · News & media · Part 1–3",
  unitGoals: [
    "discuss television and news habits",
    "self-correct naturally",
    "develop Part 3 opinions on media",
  ],
  steps: [...MS_U7_SPEAK_STEPS],
  nextLabels: [...MS_U7_SPEAK_NEXT],
  panels: [
    {
      kind: "speak",
      badge: "Part 1–2",
      instruction: "Talk about television, news and current affairs.",
      prompts: [
        "How do you usually get the news?",
        "Do you prefer reading or watching the news? Why?",
        "Describe a news story that interested you recently.",
      ],
      card: "Describe a TV programme you enjoy.\n\nYou should say:\n• what it is about\n• how often you watch it\n• who you watch it with\nand explain why you like it.",
      tips: [
        "It is OK to correct yourself in the Speaking test if you notice a mistake.",
      ],
    },
    {
      kind: "gaps",
      badge: "Phrases",
      instruction: "Place useful Speaking phrases for news / opinion.",
      bank: [
        "That's not an easy question to answer. Let me think …",
        "Well, possibly, but many people still prefer reading the old-fashioned way.",
        "To be honest",
        "As far as I'm concerned",
      ],
      items: [
        { id: "1", stem: "Buying time →", key: "That's not an easy question to answer. Let me think …" },
        { id: "2", stem: "Balanced view on print vs digital →", key: "Well, possibly, but many people still prefer reading the old-fashioned way." },
        { id: "3", stem: "Personal stance opener →", key: "To be honest", altKeys: ["As far as I'm concerned"] },
      ],
    },
    {
      kind: "speak",
      badge: "Part 3",
      instruction: "Extend answers on media and society.",
      prompts: [
        "Is fake news a serious problem in your country?",
        "Should governments regulate social media news?",
        "Will newspapers disappear in the future?",
        "How can young people develop critical thinking about the news?",
      ],
      samples: [
        "Discuss reliability of citizen journalism vs professional gatekeepers.",
        "Mention educational, economic, social and cultural roles of media.",
      ],
    },
    {
      kind: "mc",
      badge: "Advice",
      instruction: "Which advice about Speaking is best?",
      items: [
        {
          id: "1",
          stem: "Memorising long answers for the exam is…",
          options: [
            { id: "A", text: "always recommended" },
            { id: "B", text: "risky — answers may not fit the question" },
            { id: "C", text: "required for Band 7+" },
          ],
          key: "B",
        },
      ],
    },

  ],
};
