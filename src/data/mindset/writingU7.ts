import type { MindsetFlowData } from "./flowTypes";

export const MS_U7_WRITE_STEPS = [
  "Platforms",
  "Figures",
  "Structure",
  "Exam Task 1",
] as const;

export const MS_U7_WRITE_NEXT = [
  "Figures →",
  "Structure →",
  "Exam →",
  "← Back to unit",
] as const;

export const writingU7: MindsetFlowData = {
  id: "ms-u7-writing-flow",
  bookPages: "pp. 146–149",
  sectionTitle: "Writing · Pie charts · News sources",
  unitGoals: [
    "describe pie charts comparing countries",
    "use proportion language accurately",
    "paraphrase introductory and overview sentences",
  ],
  steps: [...MS_U7_WRITE_STEPS],
  nextLabels: [...MS_U7_WRITE_NEXT],
  panels: [
    {
      kind: "match",
      badge: "2",
      instruction: "Match news platforms with descriptions / chart labels.",
      bank: [
        { id: "a", text: "online" },
        { id: "b", text: "TV" },
        { id: "c", text: "not specified" },
        { id: "d", text: "radio" },
        { id: "e", text: "print" },
      ],
      items: [
        { id: "3", stem: "online", key: "a" },
        { id: "1", stem: "TV", key: "b" },
        { id: "2", stem: "not specified", key: "c" },
        { id: "5", stem: "radio", key: "d" },
        { id: "4", stem: "print", key: "e" },
      ],
    },
    {
      kind: "gaps",
      badge: "5",
      instruction: "Place approximate figures from the charts (US social media news / UK–Brazil).",
      bank: ["80%", "66%", "10%", "40%", "25%", "67%"],
      items: [
        { id: "1", stem: "1", key: "80%" },
        { id: "2", stem: "2", key: "66%", altKeys: ["67%"] },
        { id: "3", stem: "3", key: "10%" },
        { id: "4", stem: "4", key: "40%" },
        { id: "5", stem: "5", key: "25%" },
      ],
    },
    {
      kind: "match",
      badge: "4",
      instruction: "Match discourse / structure items 1–6 with functions a–f.",
      bank: [
        { id: "a", text: "a" },
        { id: "b", text: "b" },
        { id: "c", text: "c" },
        { id: "d", text: "d" },
        { id: "e", text: "e" },
        { id: "f", text: "f" },
      ],
      items: [
        { id: "1", stem: "1", key: "b" },
        { id: "2", stem: "2", key: "d" },
        { id: "3", stem: "3", key: "e" },
        { id: "4", stem: "4", key: "c" },
        { id: "5", stem: "5", key: "f" },
        { id: "6", stem: "6", key: "a" },
      ],
    },
    {
      kind: "writing",
      badge: "EXAM",
      instruction:
        "Task 1: Summarise the pie charts comparing how people in the UK and Brazil find out the news. Write at least 150 words.",
      prompt:
        "The pie charts show the principal ways of finding out the news in the UK and Brazil.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      minWords: 150,
      sample: `The pie charts show the principal ways of finding out the news in two different countries, the UK and Brazil.

The two nations show broadly similar patterns, though there are some differences, both significant and minor. In Brazil, more than half of people access news online (53%), compared with over a third in the UK. Television is popular in both countries. By contrast, print and radio are used much more in the UK: over twice as many people use print, and radio reaches about three times more of the UK population than in Brazil, where only 3% listen to the news on the radio.

Overall, it can be said that the high levels of internet use in Brazil mean that other methods such as radio and print are used less in comparison with the UK.`,
      cue: "Task 1 · pie charts · comparisons",
    },

  ],
};
