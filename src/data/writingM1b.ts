/** Module 1B · Untapped resources · Writing Task 1 line graph (pp. 20–21). */

export const ukEmploymentYears = [
  1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025,
] as const;

export const ukEmploymentSeries = [
  {
    id: "none",
    label: "No school certificate",
    color: "#7eb8d4",
    values: [0, -3, -5, -7, -9, -11, -13, -15],
  },
  {
    id: "school",
    label: "High school",
    color: "#e09a5a",
    values: [0, -1, -2, -3, -4, -5, -5, -4],
  },
  {
    id: "bachelor",
    label: "Bachelor's degree",
    color: "#5c8ad4",
    values: [0, 5, 13, 9, 14, 9, 12, 15],
  },
  {
    id: "master",
    label: "Master's degree",
    color: "#e0b070",
    values: [0, 4, 7, 11, 24, 28, 32, 35],
  },
] as const;

export type UkEmploymentId = (typeof ukEmploymentSeries)[number]["id"];

export const LEARN_STEPS_W1B = [
  "Understand the graph",
  "Main features",
  "Overview + language",
  "Write",
] as const;

export const LEARN_NEXT_W1B: Record<number, string> = {
  0: "Continue → Main features",
  1: "Continue → Overview",
  2: "Continue → Write",
  3: "← К модулю",
};

export const writingM1b = {
  id: "writing-m1b-flow",
  module: 1,
  bookPages: "pp. 20–21 in your coursebook",
  prompt:
    "The graph shows the actual and predicted percentage change in employment in the UK, by education level.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
  graphTitle: "Percentage change in employment in the UK, by education level",
  predictFromYear: 2010,
  minWords: 150,
  timeSec: 1200,
  understand: [
    {
      q: "What does the vertical axis show?",
      options: [
        "The number of jobs in the UK",
        "Percentage change from the 1990 level",
        "The unemployment rate",
      ],
      key: 1,
      tip: "0% = the 1990 level. −15% means 15 points below 1990, not 15% of workers.",
    },
    {
      q: "What is the time period?",
      options: ["1990–2010 only", "1990–2025", "2000–2025"],
      key: 1,
      tip: "35 years. After 2010 the figures are predictions.",
    },
    {
      q: "Which part of the graph is predicted?",
      options: ["The whole graph", "Before 2010", "From 2010 to 2025"],
      key: 2,
      tip: "The dashed line marks where forecasts begin.",
    },
    {
      q: "How many education groups are shown?",
      options: ["Three", "Four", "Six"],
      key: 1,
      tip: "Group them: two that rise, two that fall.",
    },
  ],
  features: [
    {
      statement: "All four lines start at 0% in 1990.",
      key: "T" as const,
    },
    {
      statement: "Master’s employment is predicted to be the highest by 2025.",
      key: "T" as const,
    },
    {
      statement: "Bachelor’s employment rises in a straight line with no dips.",
      key: "F" as const,
      correction:
        "It fluctuates: peaks around 2000 and 2010, dips around 2005 and 2015, finishes at about 15%.",
    },
    {
      statement:
        "Employment with no school certificate falls steadily to about −15% by 2025.",
      key: "T" as const,
    },
    {
      statement: "High-school employment climbs above 10% by 2025.",
      key: "F" as const,
      correction:
        "It stays slightly below zero and finishes at around −4%.",
    },
    {
      statement: "You must describe every small movement on every line.",
      key: "F" as const,
      correction:
        "Select the main features: grouping, overall direction, one or two key figures.",
    },
  ],
  trends: [
    {
      phrase: "rose sharply after 2005 / a dramatic increase",
      id: "master" as UkEmploymentId,
    },
    {
      phrase: "fluctuated but stayed positive",
      id: "bachelor" as UkEmploymentId,
    },
    {
      phrase: "declined steadily",
      id: "none" as UkEmploymentId,
    },
    {
      phrase: "fell only slightly / remained close to zero",
      id: "school" as UkEmploymentId,
    },
  ],
  plan: [
    {
      label: "1 · Introduction",
      phrases: ["The line graph illustrates the actual and predicted …"],
      must: "Тип графика. Что за %. Где. Когда. Four education levels.",
      avoid: "Цифры. Копировать заголовок слово в слово. We can see that.",
      example:
        "The line graph illustrates the actual and predicted percentage change in UK employment between 1990 and 2025, according to four levels of education.",
    },
    {
      label: "2 · Overview",
      phrases: [
        "Overall, …",
        "whereas …",
        "The most striking feature is …",
        "predicted to …",
      ],
      must: "Две группы: degree ↑ / lower education ↓. Master’s — самый резкий рост. Без мелких цифр.",
      avoid: "13% и −15% в overview. Firstly. Мнение, почему так.",
      example:
        "Overall, employment among people with a master’s or bachelor’s degree increased, whereas the two lower education groups declined. The most striking feature is the sharp rise in master’s-level employment after 2005, which is predicted to continue.",
    },
    {
      label: "3 · Degrees",
      phrases: ["rose gradually … then jumped to …", "fluctuated … peaked at …"],
      must: "Master’s: 0 → ~11% (2005) → ~24% (2010) → ~35% (2025). Bachelor’s: колебания, конец ~15%. Сравнение.",
      avoid: "Каждый год 1990, 1995, 2000… по одной линии. Причины.",
      example:
        "Master’s employment rose gradually to around 11% by 2005, then jumped to about 24% in 2010 and is forecast to reach approximately 35% by 2025. Bachelor’s figures fluctuated, peaking at roughly 13% in 2000 and finishing at around 15%.",
    },
    {
      label: "4 · Lower education",
      phrases: ["By contrast, …", "fell steadily", "declined only slightly"],
      must: "No certificate → около −15%. High school почти у нуля, конец ~−4%.",
      avoid: "Повторить overview. So, what does it all mean?",
      example:
        "By contrast, employment among people with no school certificate fell steadily and is expected to stand about 15 percentage points below the 1990 level by 2025. High-school employment declined only slightly, finishing at around −4%.",
    },
  ],
  checklist: [
    "Overview: degrees up, lower education down",
    "Master’s: sharp rise after 2005 → ~35% in 2025",
    "Bachelor’s: fluctuates, ends ~15%",
    "No school certificate: steady fall to ~−15%",
    "High school: slight decline, stays near zero",
    "Actual vs predicted (from 2010)",
    "Comparisons, not four separate stories",
    "No opinions / no reasons",
  ],
  sampleParagraphs: [
    "The line graph illustrates the actual and predicted percentage change in employment in the UK between 1990 and 2025, broken down by four levels of education.",
    "==Overall,== people with a master’s or bachelor’s degree ==saw an increase== in employment, ==whereas== the two lower education groups declined. ==The most striking feature is== the sharp rise in master’s-level employment after 2005, which is ==predicted to== continue.",
    "Master’s employment rose gradually from 0% in 1990 to around 11% by 2005, then ==jumped to== about 24% in 2010 and is forecast to reach approximately 35% by 2025. Bachelor’s figures ==fluctuated==: they peaked at roughly 13% in 2000, dipped, recovered to about 14% in 2010, and are predicted to finish at around 15%.",
    "==By contrast,== employment among people with no school certificate ==fell steadily== and is expected to stand about 15 percentage points below the 1990 level by 2025. High-school employment declined only slightly, remaining close to zero and finishing at around −4%.",
  ],
  starters: [
    "The line graph illustrates the actual and predicted percentage change in UK employment between 1990 and 2025, according to four levels of education.",
    "Overall, employment among people with a master’s or bachelor’s degree increased, whereas the two lower education groups declined. The most striking feature is the sharp rise in master’s-level employment after 2005, which is predicted to continue.",
    "Master’s employment rose gradually to around 11% by 2005, then jumped to about 24% in 2010 and is forecast to reach approximately 35% by 2025. Bachelor’s figures fluctuated, peaking at roughly 13% in 2000 and finishing at around 15%.",
    "By contrast, employment among people with no school certificate fell steadily and is expected to stand about 15 percentage points below the 1990 level by 2025. High-school employment declined only slightly, finishing at around −4%.",
  ],
};

export type WritingM1bData = typeof writingM1b;
