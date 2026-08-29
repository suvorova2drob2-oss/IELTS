export const WRITE_M3A_STEPS = [
  "1 Lead-in",
  "2 Structures",
  "3a Problems / solutions",
  "3b Functions",
  "3c Your paragraph",
  "4a Order sentences",
  "4b Solution sentences",
  "5 Write essay",
] as const;

export const WRITE_M3A_NEXT = [
  "2 Structures →",
  "3a Problems / solutions →",
  "3b Functions →",
  "3c Your paragraph →",
  "4a Order sentences →",
  "4b Solution sentences →",
  "5 Write essay →",
  "← К модулю",
] as const;

export const writingM3a = {
  id: "writing-m3a-flow",
  bookPages: "p. 46–47 in your coursebook",
  sectionTitle: "Writing · Task 2 (problems & solutions)",
  expertWriting: "EXPERT WRITING page 193",
  testStrategies: "TEST STRATEGIES page 173",
  leadIn: {
    badge: "1",
    heading: "Lead-in",
    instruction: "Work in pairs and discuss the questions.",
    questions: [
      "What activities do you do that make you happy?",
      "Why might being part of a community make people feel happier? Why might it not?",
    ],
  },
  structures: {
    badge: "2",
    heading: "Write about problems and solutions",
    instruction:
      "Read the essay title. Which of the structures below would be suitable for this essay title?",
    title:
      "Nowadays many elderly people live alone and this can cause a variety of problems for society. What are some of these problems and what solutions can you suggest?",
    options: [
      {
        id: 1,
        label: "Structure 1",
        tone: "amber",
        lines: [
          "Introduction",
          "Paragraph 1: Issue 1: Problems and solutions",
          "Paragraph 2: Issue 2: Problems and solutions",
          "Conclusion",
        ],
      },
      {
        id: 2,
        label: "Structure 2",
        tone: "green",
        lines: [
          "Introduction",
          "Paragraph 1: Suggested solutions",
          "Paragraph 2: Discussion of problems",
          "Conclusion",
        ],
      },
      {
        id: 3,
        label: "Structure 3",
        tone: "blue",
        lines: [
          "Introduction",
          "Paragraph 1: Discussion of problems",
          "Paragraph 2: Suggested solutions",
          "Conclusion",
        ],
      },
    ],
    /** Structures 1 and 3 are suitable; solutions-before-problems is not. */
    keys: [1, 3],
    tip: "Structures 1 and 3 are suitable. Structure 2 discusses solutions before problems, which is less logical.",
  },
  para3a: {
    badge: "3a",
    instruction:
      "Read the paragraph and mark each sentence as a problem or a suggested solution.",
    sentences: [
      {
        id: "A",
        text: "One of the problems for older people living alone is often the isolation it brings.",
        key: "problem",
      },
      {
        id: "B",
        text: "Firstly, for these people, living alone can affect their health because there is no one around on a daily basis to notice any signs of bad health.",
        key: "problem",
      },
      {
        id: "C",
        text: "In addition, if older people live alone, they may feel less positive about life and therefore they might be less active.",
        key: "problem",
      },
      {
        id: "D",
        text: "One way of dealing with this would be for family and neighbours to make an effort to have regular contact with elderly people living alone.",
        key: "solution",
      },
      {
        id: "E",
        text: "Also, the elderly can be encouraged to join social groups for people of their age group.",
        key: "solution",
      },
      {
        id: "F",
        text: "Even though they live alone, they should focus on interacting with others as much as possible.",
        key: "solution",
      },
    ],
  },
  functions: {
    badge: "3b",
    instruction:
      "Match the sentences (A–F) in Exercise 3a with their functions (1–6).",
    slots: [
      { id: 1, label: "First suggested solution", key: "D" },
      { id: 2, label: "Further explanation of a solution", key: "F" },
      { id: 3, label: "Description of the problem in more detail", key: "B" },
      { id: 4, label: "Topic sentence to introduce the problem", key: "A" },
      { id: 5, label: "Second suggested solution", key: "E" },
      { id: 6, label: "Second problem and its effect", key: "C" },
    ],
    followUp: {
      instruction:
        "Which sentence introduces the solution and which sentence supports the solution?",
      introducesKey: "D",
      supportsKey: "F",
    },
  },
  para3c: {
    badge: "3c",
    instruction:
      "Can you think of any more solutions for the essay task in Exercise 2? How could you support these solutions? Think of another issue for the essay task and write a paragraph using the structure in Exercise 3b.",
  },
  order4a: {
    badge: "4a",
    heading: "Develop a paragraph",
    instruction:
      "Put the sentences in order to make the second paragraph of the essay in Exercise 3a.",
    items: [
      {
        id: "A",
        text: "In addition, governments could give food subsidies to older people who live alone to encourage them to improve their diets.",
      },
      {
        id: "B",
        text: "Secondly, there is the problem of nutrition for elderly people living alone.",
      },
      {
        id: "C",
        text: "To reduce this problem, old people who live alone should make an effort to cook for themselves more often.",
      },
      {
        id: "D",
        text: "These people often eat more convenience food such as ready meals because cooking for one person is not that easy.",
      },
      {
        id: "E",
        text: "This is because supermarkets usually sell food in large packages and these are more suited to families than individuals.",
      },
      {
        id: "F",
        text: "For example, if they were to make large quantities of a meal, the remainder could be frozen and eaten at a later date.",
      },
    ],
    key: ["B", "D", "E", "C", "F", "A"],
  },
  sol4b: {
    badge: "4b",
    instruction:
      "Which sentence introduces the solution and which sentence supports the solution?",
    introducesKey: "C",
    supportsKey: "F",
  },
  write: {
    badge: "5",
    heading: "Write your essay",
    planA: {
      badge: "5a",
      instruction:
        "Read the essay title. Make a plan of your answer listing the main problems and solutions.",
    },
    title:
      "In some parts of the world, people have become more focused on themselves than their communities. What problems can this situation cause and how can they be solved?",
    planB: {
      badge: "5b",
      instruction: "Write some ideas to support your solutions.",
    },
    planC: {
      badge: "5c",
      instruction:
        "Decide which structure you want to use from Exercise 2 and organise your ideas into paragraphs.",
    },
    writeD: {
      badge: "5d",
      instruction:
        "Read the strategies and write your essay. Remember to write at least 250 words.",
    },
    minWords: 250,
  },
};
