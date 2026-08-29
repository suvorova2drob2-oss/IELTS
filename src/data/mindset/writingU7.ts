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
      instruction: "Match the descriptions (a–e) with the sections of the pie chart (1–5).",
      bank: [
        {
          id: "a",
          text: "Just over a third of people access the news online.",
        },
        {
          id: "b",
          text: "The largest proportion of people, about 40%, watch the news on TV.",
        },
        {
          id: "c",
          text: "Only a tiny minority did not specify how they find out about the news.",
        },
        {
          id: "d",
          text: "Radio is the least popular way to get news, at just 7%.",
        },
        {
          id: "e",
          text: "Approximately 15% of people read the news in print.",
        },
      ],
      items: [
        { id: "3", stem: "3 · online", key: "a" },
        { id: "1", stem: "1 · TV", key: "b" },
        { id: "2", stem: "2 · not specified", key: "c" },
        { id: "5", stem: "5 · radio", key: "d" },
        { id: "4", stem: "4 · print", key: "e" },
      ],
    },
    {
      kind: "gaps",
      badge: "5",
      instruction: "Write these fractions as a percentage.",
      bank: ["80%", "66%", "10%", "40%", "25%", "67%"],
      items: [
        {
          id: "1",
          stem: "Four fifths as a percentage is ______.",
          key: "80%",
        },
        {
          id: "2",
          stem: "Two thirds as a percentage is approximately ______.",
          key: "66%",
          altKeys: ["67%"],
        },
        {
          id: "3",
          stem: "A tenth as a percentage is ______.",
          key: "10%",
        },
        {
          id: "4",
          stem: "Two fifths as a percentage is ______.",
          key: "40%",
        },
        {
          id: "5",
          stem: "A quarter as a percentage is ______.",
          key: "25%",
        },
      ],
    },
    {
      kind: "match",
      badge: "4",
      instruction: "Match the percentages (1–6) with the descriptions (a–f).",
      bank: [
        { id: "a", text: "a little under half" },
        { id: "b", text: "a fifth" },
        { id: "c", text: "just less than a third" },
        { id: "d", text: "about three quarters" },
        { id: "e", text: "approximately 9 out of 10" },
        { id: "f", text: "almost a quarter" },
      ],
      items: [
        { id: "1", stem: "20%", key: "b" },
        { id: "2", stem: "77%", key: "d" },
        { id: "3", stem: "92%", key: "e" },
        { id: "4", stem: "31%", key: "c" },
        { id: "5", stem: "24%", key: "f" },
        { id: "6", stem: "48%", key: "a" },
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
      chart: "u7-news-pies",
      sample: `The pie charts show the principal ways of finding out the news in two different countries, the UK and Brazil.

The two nations show broadly similar patterns, though there are some differences, both significant and minor. In Brazil, more than half of people access news online (53%), compared with over a third in the UK. Television is popular in both countries. By contrast, print and radio are used much more in the UK: over twice as many people use print, and radio reaches about three times more of the UK population than in Brazil, where only 3% listen to the news on the radio.

Overall, it can be said that the high levels of internet use in Brazil mean that other methods such as radio and print are used less in comparison with the UK.`,
      cue: "Task 1 · pie charts · comparisons",
    },

  ],
};
