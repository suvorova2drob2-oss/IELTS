import type { MindsetFlowData } from "./flowTypes";

export const MS_U5_WRITE_STEPS = [
  "Lead-in",
  "Industry terms",
  "Coal mines",
  "Linkers",
  "Exam Task 1",
] as const;

export const MS_U5_WRITE_NEXT = [
  "Terms →",
  "Mines →",
  "Linkers →",
  "Exam →",
  "← Back to unit",
] as const;

export const writingU5: MindsetFlowData = {
  id: "ms-u5-writing-flow",
  bookPages: "pp. 100–104",
  sectionTitle: "Writing · Tables & bar charts · CC",
  unitGoals: [
    "describe information in a table or bar chart",
    "use linkers and cohesive language to improve Coherence and Cohesion",
    "avoid repetition of language in Task 1",
  ],
  steps: [...MS_U5_WRITE_STEPS],
  nextLabels: [...MS_U5_WRITE_NEXT],
  panels: [
    {
      kind: "intro",
      badge: "LEAD-IN",
      instruction:
        "Discuss these questions in groups. Then match the industry terms (1–4) with their definitions.",
      discuss: [
        "What goods are manufactured in your country?",
        "Do you think manufacturing is increasing or decreasing?",
        "What goods are imported and exported?",
        "How does this compare with imports and exports in the past?",
      ],
    },
    {
      kind: "match",
      badge: "2",
      instruction: "Match the terms (1–4) with their definitions (a–d).",
      bank: [
        { id: "a", text: "small business carried out at home" },
        { id: "b", text: "extracting raw materials, such as forestry, fishing or mining" },
        { id: "c", text: "manufacturing large articles or materials, such as ships or steel" },
        { id: "d", text: "tourism, catering, plumbing, etc; also known as the tertiary sector" },
      ],
      items: [
        { id: "1", stem: "heavy industry", key: "c" },
        { id: "2", stem: "cottage industry", key: "a" },
        { id: "3", stem: "service industry", key: "d" },
        { id: "4", stem: "primary industry", key: "b" },
      ],
    },
    {
      kind: "reveal",
      badge: "3–4",
      instruction:
        "The table gives information about the number of deep mines producing coal in the UK between 1913 and 2015. Discuss the general trend and salient periods, then review strengths/weaknesses of the sample answer.",
      blocks: [
        {
          title: "Key trends (answer key)",
          lines: [
            "The general trend is a decline in the number of mines.",
            "1913–1943 — the number of mines almost halved",
            "1963–1983 — about 80% of mines closed",
            "2003–2015 — very few mines left",
          ],
        },
        {
          title: "Candidate answer — strengths",
          lines: [
            "TA: description accurate with supporting data",
            "CC: overall structure / logical paragraphing",
            "LR: decline, disappeared, decrease, fell sharply, dropped",
            "GRA: past tenses generally correct",
          ],
        },
        {
          title: "Candidate answer — weaknesses",
          lines: [
            "CC: obviously / nevertheless / surprisingly / at last used incorrectly",
            "CC: needs a wider range of time linkers (not always In + year)",
          ],
        },
      ],
    },
    {
      kind: "gaps",
      badge: "5 / 8",
      instruction:
        "Choose linkers to replace inappropriate highlighted linkers (Obviously / Nevertheless / Surprisingly / At last). Then complete the passenger-car bar-chart summary gaps.",
      tip: "Bank includes replacements for exercise 5 and discourse markers for exercise 8.",
      bank: [
        "The clear trend in the figures is that",
        "For example",
        "It is striking that",
        "By the end of the period shown, in 2015,",
        "For the purposes of this data set",
        "What stands out is",
        "in terms of",
        "respectively",
        "By contrast",
        "Turning next to",
        "Whereas",
        "moving on to",
        "although",
      ],
      items: [
        { id: "5a", stem: "Replace 'Obviously' →", key: "The clear trend in the figures is that" },
        { id: "5b", stem: "Replace 'Nevertheless' →", key: "For example" },
        { id: "5c", stem: "Replace 'Surprisingly' →", key: "It is striking that" },
        { id: "5d", stem: "Replace 'At last' →", key: "By the end of the period shown, in 2015," },
        { id: "8-1", stem: "Gap 1 (clarifies the data set) →", key: "For the purposes of this data set" },
        { id: "8-2", stem: "Gap 2 (emphasise) →", key: "What stands out is" },
        { id: "8-3", stem: "Gap 3 →", key: "in terms of" },
        { id: "8-4", stem: "Gap 4 →", key: "respectively" },
        { id: "8-5", stem: "Gap 5 →", key: "By contrast" },
        { id: "8-6", stem: "Gap 6 →", key: "Turning next to" },
        { id: "8-7", stem: "Gap 7 →", key: "Whereas" },
        { id: "8-8", stem: "Gap 8 →", key: "moving on to" },
        { id: "8-9", stem: "Gap 9 →", key: "although" },
      ],
    },
    {
      kind: "writing",
      badge: "EXAM",
      instruction:
        "Answer the Writing Task 1 below. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
      prompt:
        "The charts below give information about the proportion of the UK workforce employed in five industries in 1841 and 2011.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      tableNote:
        "Categories: agriculture & fishing · energy & water · manufacturing · construction · services · years 1841 and 2011",
      minWords: 150,
      chart: "u5-workforce-bars",
      sample: `The bar charts divide the UK workforce into five categories based on the type of industry they work in for the years 1841 and 2011.

The overall trend shown in the data is a steep rise in the proportion of employees engaged in the service industry, coupled with a decline in manufacturing. The most salient feature is that in 2011 81% of the workforce were involved in providing services, which contrasts sharply with the figure of 33% in 1841. In contrast, we observe a huge drop in the manufacturing industry from over a third in the mid nineteenth century to just 9% by the early twenty-first century.

Furthermore, the 170-year period saw a marked fall in the agriculture and fishing sectors, leaving food production with a tiny 1% of UK workers. Similarly, workers in energy and water companies decreased by two thirds. On the other hand, the construction industry experienced significant growth from 5% to 8% over the period.

In conclusion, the job profile of the UK workforce changed radically between 1841 and 2011, with the increases coming in the construction and service industry but all other areas seeing a decline.`,
      cue: "Task 1 · tables / bar charts · Coherence and Cohesion",
    },

  ],
};
