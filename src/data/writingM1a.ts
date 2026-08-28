/** Module 1A · Writing Task 1 · Women in employment by education (p. 14). */

export const womenYears = [
  1950, 1955, 1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010,
] as const;

/** Approximate values digitized from Expert IELTS 7.5 coursebook graph (p. 14). */
export const womenSeries = [
  {
    id: "high-school",
    label: "High school",
    color: "#2f5f9a",
    /** ~80% → dip → brief rise ~1970 → decline to ~62% */
    values: [80, 76, 75, 76, 78, 76, 73, 70, 68, 66, 64, 63, 62],
  },
  {
    id: "graduate",
    label: "Graduate",
    color: "#3d8f4a",
    /** Steadiest: ~71% flat then gentle fall to ~58% */
    values: [71, 70, 70, 70, 70, 68, 66, 64, 63, 61, 60, 59, 58],
  },
  {
    id: "post-graduate",
    label: "Post graduate",
    color: "#c45f28",
    /** ~55% → dip → steep rise to ~77% ~1970 → tracks HS; bump ~2000 → ~61% */
    values: [55, 52, 55, 65, 76, 72, 68, 65, 66, 68, 71, 66, 61],
  },
] as const;

export type WomenSeriesId = (typeof womenSeries)[number]["id"];

export const LEARN_STEPS_W1A = [
  "1a Look at the graph",
  "1b Match structures",
  "2a Overview",
  "2b Trend or detail",
  "2c Other trends",
  "3a Plan",
  "Write",
] as const;

export const LEARN_NEXT_W1A: Record<number, string> = {
  0: "Continue → 1b",
  1: "Continue → 2a",
  2: "Continue → 2b",
  3: "Continue → 2c",
  4: "Continue → 3a",
  5: "Continue → Write",
  6: "← К модулю",
};

export const writingM1a = {
  id: "writing-m1a-flow",
  module: 1,
  bookPages: "p. 14 in your coursebook",
  graphTitle:
    "Percentage of women in employment from 1950–2010 by level of education",
  step1a: {
    instruction: "Look at the graph and answer the questions.",
    questions: [
      {
        id: 1,
        text: "What do the blue, green and orange lines represent?",
        options: [
          "blue = high school, green = graduate, orange = post graduate",
          "blue = graduate, green = high school, orange = post graduate",
          "blue = post graduate, green = graduate, orange = high school",
        ],
        key: 0,
        display:
          "blue = high school, green = graduate, orange / red = post graduate",
      },
      {
        id: 2,
        text: "What is the date range shown on the graph?",
        options: ["1950–2010", "1960–2000", "1950–2000"],
        key: 0,
        display: "1950–2010",
      },
      {
        id: 3,
        text: "Which group starts with the highest percentage?",
        options: ["high school", "graduate", "post graduate"],
        key: 0,
        display: "high school",
      },
      {
        id: 4,
        text: "Which group starts with the lowest percentage?",
        options: ["post graduate", "high school", "graduate"],
        key: 0,
        display: "post graduate",
      },
      {
        id: 5,
        text: "Which group remains the steadiest?",
        options: ["graduate", "high school", "post graduate"],
        key: 0,
        display: "graduate",
      },
      {
        id: 6,
        text: "Are the groups more similar or different when comparing 2010 to 1950?",
        options: ["more similar", "more different", "about the same as in 1950"],
        key: 0,
        display: "more similar",
      },
    ],
  },
  step1b: {
    instruction:
      "Match the sections (1–4) with the structures (A–D) below.",
    sections: [
      {
        id: 1,
        text: "In 1950 a high proportion of high school-educated women worked in comparison to women with a post-graduate qualification. Just over 80 percent of high school women were employed compared to around 55 percent of post-graduates. However, in the 1970s the percentage of women working in these two groups converged, at approximately 75 percent.",
      },
      {
        id: 2,
        text: "Overall, the graph shows that the level of education attained had a greater impact on women’s employment in the past than more recently.",
      },
      {
        id: 3,
        text: "This graph shows the changes in employment of women with different levels of education from 1950 to 2010. The levels of education are separated into three categories: high school, graduate and post-graduate, and the data showing how many of each group were in employment is given in percentages.",
      },
      {
        id: 4,
        text: "During the given period, the percentage of women in employment from all three groups somewhat converged and then declined uniformly over the latter half of the period.",
      },
    ],
    structures: [
      {
        id: "A",
        text: "Introductory sentences (what the graph shows, how it is measured).",
      },
      {
        id: "B",
        text: "Description of the overall trends.",
      },
      {
        id: "C",
        text: "Explanation of most important feature (with data).",
      },
      {
        id: "D",
        text: "Overview (summarising the overall message of the graph).",
      },
    ],
    /** 1C 2D 3A 4B */
    keys: { 1: "C", 2: "D", 3: "A", 4: "B" } as Record<number, string>,
  },
  step2a: {
    instruction:
      "Look at the graph below. Which of the sentences 1–3 gives the overview?",
    graphTitle: "Average number of years of education, by country",
    sentences: [
      "Women do not go to school for as many years as men.",
      "The average time spent in education generally increased.",
      "Korea is overtaking New Zealand in years spent in education.",
    ],
    key: 1,
    tip: "2 is the correct overview. 1 is not correct because Korean men spend less time in education than New Zealand women. Also, New Zealand women were the highest group in 1990. 3 is not correct because we know Korean students are equalling New Zealand students now, but we do not know if Korean students will overtake New Zealand students in future.",
  },
  step2b: {
    instruction:
      "Which of the following sentences is a trend and which is a detail?",
    items: [
      {
        id: 1,
        text: "The number of years in education for Korean men and women increased.",
        key: "trend" as const,
      },
      {
        id: 2,
        text: "In the 1950s Korean men and women spent around three to five years in education. However, in 2010 both groups spent around 11 to 12 years in education.",
        key: "detail" as const,
      },
    ],
  },
  step2c: {
    instruction:
      "Discuss what other trends you could write about in the graph above.",
    tips: [
      "All four groups spent more years in education in 2010 than in 1950.",
      "Korea rose much more steeply than New Zealand, especially between 1950 and 1990.",
      "The gap between New Zealand and Korea narrowed over the period.",
      "In both countries, males spent slightly more years in education than females for most of the period.",
      "By 2010, Korean figures were almost level with New Zealand (around 11–12 years).",
    ],
  },
  step3a: {
    instruction:
      "Look at the graph in Exercise 2a and make a plan for your writing. Follow the structure A–D in Exercise 1b.",
    comparePrompt:
      "Compare your plan with a partner. Are the trends and overview accurate? Does your structure match the one in Exercise 1b? Why/Why not?",
    slots: [
      {
        id: "A",
        label:
          "A · Introductory sentences (what the graph shows, how it is measured).",
        sample:
          "The graph shows the amount of time (in years) that men and women spent in education in two countries: Korea and New Zealand.",
      },
      {
        id: "B",
        label: "B · Description of the overall trends.",
        sample:
          "Males generally spent slightly longer in education; at the end of the 60-year period (2010) all the groups converge.",
      },
      {
        id: "C",
        label: "C · Explanation of most important feature (with data).",
        sample:
          "The difference between men and women: in New Zealand there was only a small difference (under a year); around the 1990s females overtook males for a short time, but in Korea the difference was larger (two years in 1950 but then decreased).",
      },
      {
        id: "D",
        label: "D · Overview (summarising the overall message of the graph).",
        sample:
          "The average time spent in education generally increased for both males and females.",
      },
    ],
    /** Teacher’s Book suggested answer (full wording). */
    suggestedAnswer: {
      title: "Suggested answer",
      blocks: [
        {
          label: "Introductory sentence",
          text: "The graph shows the amount of time (in years) that men and women spent in education in two countries: Korea and New Zealand.",
        },
        {
          label: "Description of overall trends",
          text: "Males generally spent slightly longer in education, at the end of the 60-year period (2010) all the groups converge.",
        },
        {
          label: "Explanation of most important feature with data",
          text: "the difference between men and women: in New Zealand there was only a small difference (under a year), around the 1990s females overtook males for a short time, but in Korea the difference was larger (two years in 1950 but then decreased).",
        },
        {
          label: "Explanation of other important features with data",
          text: "in 1950 Koreans spent around three to five years in education compared with seven to eight years in New Zealand and in 2010 both countries were similar at ten to twelve years.",
        },
        {
          label: "Overview",
          text: "The average time spent in education generally increased for both males and females.",
        },
      ],
    },
  },
  stepWrite: {
    prompt:
      "The graph shows the average number of years of education, by country.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
    minWords: 150,
    timeSec: 1200,
    checklist: [
      "Introductory sentence: years in education · Korea & New Zealand · men and women",
      "Overall trends: males slightly longer; groups converge by 2010",
      "Gender gap: NZ small (under a year); Korea larger then decreased",
      "1950: Korea 3–5 years vs NZ 7–8; 2010: both ~10–12 years",
      "Overview: average time in education generally increased",
      "No opinions or reasons why",
      "At least 150 words",
    ],
    sampleParagraphs: [
      "The graph shows the amount of time (in years) that men and women spent in education in two countries: Korea and New Zealand.",
      "Males generally spent slightly longer in education; at the end of the 60-year period (2010) all the groups converge.",
      "Looking at the difference between men and women, in New Zealand there was only a small difference (under a year); around the 1990s females overtook males for a short time, but in Korea the difference was larger (two years in 1950 but then decreased). In 1950 Koreans spent around three to five years in education compared with seven to eight years in New Zealand, and in 2010 both countries were similar at ten to twelve years.",
      "Overall, the average time spent in education generally increased for both males and females.",
    ],
    starters: [
      "The graph shows the amount of time (in years) that men and women spent in education in two countries: Korea and New Zealand.",
      "Males generally spent slightly longer in education; at the end of the 60-year period (2010) all the groups converge.",
      "In New Zealand there was only a small gender difference (under a year); around the 1990s females overtook males for a short time, but in Korea the difference was larger (two years in 1950 but then decreased). In 1950 Koreans spent around three to five years in education compared with seven to eight years in New Zealand, and in 2010 both countries were similar at ten to twelve years.",
      "Overall, the average time spent in education generally increased for both males and females.",
    ],
  },
};

/** Second Task 1 graph on p. 14 — years of education by country. */
export const educationYears = [
  1950, 1960, 1970, 1980, 1990, 2000, 2010,
] as const;

export const educationSeries = [
  {
    id: "nz-m",
    label: "New Zealand, males",
    color: "#2f5f9a",
    values: [8.0, 8.6, 9.3, 10.1, 11.0, 11.5, 12.0],
  },
  {
    id: "nz-f",
    label: "New Zealand, females",
    color: "#7eb3d9",
    values: [7.5, 8.1, 8.8, 9.6, 10.8, 11.0, 11.2],
  },
  {
    id: "kr-m",
    label: "Korea, males",
    color: "#a85a2a",
    values: [4.5, 5.6, 7.0, 8.6, 10.0, 11.0, 11.7],
  },
  {
    id: "kr-f",
    label: "Korea, females",
    color: "#d4a06a",
    values: [3.0, 4.0, 5.5, 7.3, 9.0, 10.3, 11.0],
  },
] as const;
