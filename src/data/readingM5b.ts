export const READ_M5B_STEPS = [
  "1 Before you read",
  "2a Strategies",
  "2b Exam task",
  "3 Task analysis",
  "4 Discussion",
] as const;

export const READ_M5B_NEXT = [
  "2a Strategies →",
  "2b Exam →",
  "3 Analysis →",
  "4 Discussion →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ");
}

export function checkReadM5b(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export const readingM5b = {
  id: "reading-m5b-flow",
  bookPages: "pp. 82–83 in your coursebook",
  sectionTitle: "Reading · Labelling a diagram; True/False/Not given",
  title: "How underwater living could soon be a reality",
  subtitle:
    "Fifty years after Jacques Cousteau, designers are marketing undersea homes such as the H2Ome — but pressure, cost and construction remain huge challenges.",
  passage: [
    {
      id: "A",
      text: `As the world's population grows and coastal cities become more crowded, architects and engineers have begun to take seriously the idea of permanent underwater habitats. Submarines and deep-sea research vessels have operated for decades, and recreational diving already draws millions of people towards marine life each year. If land for individual houses becomes scarce, communities might one day expand downwards into the ocean rather than only outwards across the surface.`,
    },
    {
      id: "B",
      text: `Any underwater dwelling would need a reliable source of power. Designers often propose a circular disk-shaped platform that floats or is anchored above the living modules, collecting solar energy and transferring it below. Living spaces themselves might sit around fifteen metres beneath the surface — deep enough for calm conditions and views of marine life, yet shallow enough for relatively straightforward construction and emergency ascent.`,
    },
    {
      id: "C",
      text: `Windows are a critical feature. Thick Plexiglass panels can withstand pressure while giving residents panoramic views of fish and coral. The structure must resist rust, leaks and tidal forces; materials and seals therefore dominate engineering budgets. Creating an atmosphere that mirrors conditions on land — temperature, humidity and air quality — is equally demanding if people are to live below the waves for weeks or months.`,
    },
    {
      id: "D",
      text: `Supporters argue that underwater neighbourhoods could reduce pressure on overcrowded cities and offer unique tourism and research opportunities. Critics counter that costs will remain enormous, that maintenance will be constant, and that many people would find submarine-like interiors dark and oppressive. Whether humans will ever choose the seabed as a mainstream address is still an open question.`,
    },
  ],
  beforeYouRead: {
    badge: "1",
    instruction: "Work in pairs and discuss the questions.",
    questions: [
      "How likely is it that people will live underwater in the future? Why?",
      "What challenges would there be in constructing homes under the sea?",
      "What challenges would there be in recreating a liveable environment below the surface?",
    ],
  },
  strategies2a: {
    badge: "2a",
    strategies: "TEST STRATEGIES page 170",
    instruction: "Before you start the test task, remind yourself:",
    items: [
      "to check the maximum number of words permitted",
      "so that you can locate where in the passage the information begins",
      "to get a general idea of what the passage is about",
      "to predict the type of words you are looking for",
    ],
  },
  exam: {
    badge: "2b",
    heading: "Test practice",
    diagram: {
      instruction:
        "Label the diagram below. Choose NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage for each answer.",
      gaps: [
        {
          id: 1,
          before: "Source of ",
          after: " for the habitat",
          answers: ["power"],
        },
        {
          id: 2,
          before: "Circular ",
          after: "-shaped platform",
          answers: ["disk", "disc"],
        },
        {
          id: 3,
          before: "Living modules about ",
          after: " below the surface",
          answers: ["15/fifteen metres", "15 metres", "fifteen metres", "15"],
        },
        {
          id: 4,
          before: "Views of ",
          after: "",
          answers: ["marine life"],
        },
        {
          id: 5,
          before: "Windows made of ",
          after: "",
          answers: ["Plexiglass", "plexiglass"],
        },
      ],
    },
    tfng: {
      instruction:
        "Do the following statements agree with the information in the reading passage? Write True, False or Not given.",
      items: [
        {
          id: 6,
          text: "Bruce Jones' house will be less dangerous to live in than previous undersea residences.",
          key: "True",
        },
        {
          id: 7,
          text: "The HZOme is less expensive to buy than any other undersea living quarters.",
          key: "Not given",
        },
        {
          id: 8,
          text: "The underwater home is estimated to be habitable for up to 25 years.",
          key: "True",
        },
        {
          id: 9,
          text: "There is still good visibility at a depth of 200 metres.",
          key: "False",
        },
        {
          id: 10,
          text: "A lack of available resources will make entire underwater villages impossible.",
          key: "False",
        },
      ],
    },
  },
  analysis: {
    badge: "3",
    instruction:
      "In pairs, discuss the strategies which you used for both task types and ways in which you could improve next time.",
  },
  discussion: {
    badge: "4",
    instruction: "Discuss the questions.",
    questions: [
      "How would you feel about the idea of living under the sea?",
      "In what other kinds of places might people make their homes in the future?",
      "Do you think there might be a move towards living in communities rather than in separate houses? What could be the benefits of this way of living?",
    ],
  },
};
