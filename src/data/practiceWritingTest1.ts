import leadInImg from "../assets/practice-writing-test1-rafting.png";

/** Practice Writing Test 1 — outdoor activities line graph (book + teacher keys). */

export const outdoorSeries = [
  {
    id: "picnicking",
    label: "Picnicking",
    color: "#f0c75e",
    dash: "",
    marker: "circle" as const,
    values: [65, 68, 58],
  },
  {
    id: "walking",
    label: "Walking",
    color: "#ffffff",
    dash: "9 5",
    marker: "square" as const,
    values: [60, 50, 36],
  },
  {
    id: "water",
    label: "Water activities",
    color: "#4fc3f7",
    dash: "2 5",
    marker: "diamond" as const,
    values: [38, 58, 55],
  },
  {
    id: "camping",
    label: "Camping",
    color: "#7dce82",
    dash: "",
    marker: "triangle" as const,
    values: [24, 33, 29],
  },
  {
    id: "cycling",
    label: "Cycling",
    color: "#ff8a65",
    dash: "7 4",
    marker: "circle" as const,
    values: [23, 25, 29],
  },
  {
    id: "horse",
    label: "Horse riding",
    color: "#ce93d8",
    dash: "1 4",
    marker: "square" as const,
    values: [8, 8, 8],
  },
] as const;

export const outdoorYears = [1997, 2001, 2007] as const;

export const practiceWritingTest1 = {
  id: "practice-writing-1",
  title: "Practice Test 1",
  subtitle: "Outdoor activities · Line graph (Task 1)",
  leadIn: {
    title: "Lead-in",
    image: leadInImg,
    imageAlt: "People white-water rafting in a grey inflatable raft",
    discussInstruction: "1 Work in pairs. Discuss the following questions.",
    discussQuestions: [
      "Do you do any outdoor activities? If so, what do you like doing? If not, why not?",
      "What outdoor activities are popular in your country?",
    ],
    rankInstruction:
      "2 Put these outdoor activities in order of popularity in your country. Do you think these outdoor activities have become more or less popular in recent years?",
    activities: [
      "horse riding",
      "picnicking",
      "walking",
      "water activities",
      "camping",
      "cycling",
    ],
  },
  graphTraining: {
    title: "Test training: Understanding statistical data",
    instruction: "3 Work in pairs and discuss the questions.",
    questions: [
      "Look at the graph title and labels. What do they show?",
      "What do you think are the key features of this graph?",
    ],
    suggested: [
      "The graph shows the percentage of people participating in six different outdoor activities in Australia between 1997 and 2007.",
      "The graph illustrates the changes in popularity over that ten-year period.",
    ],
    graphTitle: "Percentage of Australians participating in outdoor activities",
    teacherTip:
      "In the IELTS test you do not need to write about everything in the graph — pick out the main features and trends.",
  },
  trueFalse: {
    title: "Understanding the graph",
    instruction:
      "4 Are these sentences True (T) or False (F)? Correct the false sentences.",
    items: [
      {
        id: 1,
        statement:
          "The popularity of cycling decreased slightly between 1997 and 2007.",
        key: "F" as const,
        correction:
          "The popularity of cycling increased slightly between 1997 and 2007.",
      },
      {
        id: 2,
        statement: "The popularity of one of the activities remained stable.",
        key: "T" as const,
      },
      {
        id: 3,
        statement:
          "For the first few years the popularity of water activities increased reaching a peak in 2007.",
        key: "F" as const,
        correction:
          "For the first few years the popularity of water activities increased, reaching a peak in 2001.",
      },
      {
        id: 4,
        statement: "In 1997, the most popular activity was walking.",
        key: "F" as const,
        correction: "In 1997, the most popular activity was picnicking.",
      },
      {
        id: 5,
        statement:
          "The popularity of camping fell significantly between 2001 and 2007.",
        key: "F" as const,
        correction:
          "The popularity of camping fell slightly between 2001 and 2007.",
      },
      {
        id: 6,
        statement:
          "Between 1997 and 2001 the popularity of picnicking increased sharply.",
        key: "F" as const,
        correction:
          "Between 1997 and 2001 the popularity of picnicking increased slightly.",
      },
      {
        id: 7,
        statement:
          "Between 1997 and 2007 the popularity of walking decreased significantly.",
        key: "T" as const,
      },
      {
        id: 8,
        statement:
          "The popularity of water activities remained the same between 2001 and 2007.",
        key: "F" as const,
        correction:
          "The popularity of water activities fell slightly between 2001 and 2007.",
      },
    ],
  },
  modelFill: {
    title: "Test practice: Describing facts in a graph",
    instruction: "5 Complete the text with the correct word or phrase in the box.",
    wordBox: [
      "can see",
      "decreased more sharply",
      "dropped to",
      "fall",
      "fell in",
      "increased",
      "increasing then falling",
      "line graph shows",
      "significantly",
      "slightly",
    ],
    keys: [
      "line graph shows",
      "can see",
      "fell in",
      "slightly",
      "fall",
      "dropped to",
      "increasing then falling",
      "increased",
      "significantly",
      "decreased more sharply",
    ],
    parts: [
      "This ",
      { gap: 1 },
      " the proportion of people in Australia who did six different outdoor activities over a ten-year period.\n\nWe ",
      { gap: 2 },
      " from the data that five of the six activities ",
      { gap: 3 },
      " popularity between 2001 and 2007, with only one increasing ",
      { gap: 4 },
      ". The most significant ",
      { gap: 5 },
      " was walking.\n\nIn 1997, around sixty percent of people enjoyed walking as an outdoor activity. This ",
      { gap: 6 },
      " 50 percent in 2001 and then 36 percent in 2007. Picnicking and water activities followed similar patterns, ",
      { gap: 7 },
      " over the ten-year period.\n\nThe percentage of people who enjoyed picnicking ",
      { gap: 8 },
      " slightly between 1997 and 2001 while the proportion of those taking part in water activities increased more ",
      { gap: 9 },
      " from just under 40 percent to over 55 percent. Picnicking then ",
      { gap: 10 },
      " to less than 60 percent in 2007 whereas water activities fell by just two or three percent.",
    ],
  },
  writeTask: {
    title: "Writing Task 1",
    instruction: "6 Read and answer the question.",
    prompt:
      "The graph shows the percentage of people participating in outdoor activities in Australia between 1997 and 2007.\n\nCompare the data for camping, cycling and horse riding, selecting and reporting the main features, and make comparisons where relevant.",
    focusNote:
      "Focus on camping, cycling and horse riding — you do not need to describe every line.",
    timeSec: 600,
    minWords: 120,
    structure: [
      {
        label: "1 · Introduction",
        tip: "Paraphrase the task (what / where / when).",
        starter:
          "This line graph illustrates the proportion of people in Australia taking part in outdoor activities between 1997 and 2007.",
      },
      {
        label: "2 · Overview",
        tip: "Main message only — no small numbers yet.",
        starter:
          "Overall, horse riding was by far the least popular activity and stayed almost unchanged, while camping and cycling were also relatively low but rose over the period.",
      },
      {
        label: "3 · Details",
        tip: "Compare camping, cycling and horse riding with figures.",
        starter:
          "Horse riding remained under 10% throughout. Camping and cycling both started at around 23% in 1997. Camping rose to just over 30% in 2001 before falling slightly, whereas cycling increased gradually to about 29% by 2007.",
      },
    ],
    checklist: [
      "Overview of the main trend / least popular activity",
      "Horse riding: low and stable",
      "Camping vs cycling starting point (~23%)",
      "Camping: rise then slight fall after 2001",
      "Cycling: gradual increase 1997–2007",
      "Clear comparisons where relevant",
    ],
    sampleAnswer:
      "This line graph illustrates the proportion of people in Australia taking part in outdoor activities over a ten-year period, between 1997 and 2007. Of the six activities included in the graph the least popular was horse riding with participation rates of under ten percent. This figure remained the same over the ten-year period. The second and third least popular outdoor activities were camping and cycling. Only around 23 percent of people enjoyed each activity in 1997 with this figure increasing to around 30 percent ten years later. However, the percentage of campers increased to over 30 percent in 2001 before falling slightly. On the other hand, the number of people participating in cycling increased gradually from 1997 to 2007.",
  },
  followUp: {
    title: "Follow-up",
    instruction: "7 Work in pairs and discuss the questions.",
    questions: [
      "Which of the outdoor activities in the graph have you tried?",
      "Which would you like to try? Why?",
      "Why do you think some outdoor activities are becoming less popular?",
    ],
  },
};

export type PracticeWritingTest1 = typeof practiceWritingTest1;
