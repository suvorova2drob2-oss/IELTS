export const SPEAK_M5B_STEPS = [
  "1 Utopian / dystopian",
  "2a Vocab",
  "2b Discuss",
  "3 Grammar range",
  "4 Part 2",
  "5 Assess",
] as const;

export const SPEAK_M5B_NEXT = [
  "2a Vocab →",
  "2b Discuss →",
  "3 Grammar →",
  "4 Part 2 →",
  "5 Assess →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ");
}

export function checkSpeakM5b(input: string, answers: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return answers.some((a) => normalize(a) === n);
}

export const speakingM5b = {
  id: "speaking-m5b-flow",
  bookPages: "p. 81 in your coursebook",
  sectionTitle: "Speaking · Part 2",
  testStrategies: "TEST STRATEGIES page 174",
  utopian1: {
    badge: "1",
    heading: "Lead-in",
    instruction:
      "Look at the pictures. Which is more utopian and which is more dystopian? Do you think either will become a reality? Why / Why not?",
    tip: "Utopian = aiming for a perfect society. Dystopian = a society where people are not happy and do not work well together. Suggested: first picture more utopian (e.g. Tomorrowland); second more dystopian (e.g. Orwell's 1984). Both are extreme / fictional.",
  },
  vocab2a: {
    badge: "2a",
    heading: "Topic vocabulary",
    instruction: "Complete the sentences with the words below.",
    bank: [
      "dense",
      "overcrowded",
      "arid",
      "waterlogged",
      "thriving",
      "abundant",
    ],
    items: [
      {
        id: 1,
        before: "A ",
        after: " forest has trees growing very close together.",
        answers: ["dense"],
      },
      {
        id: 2,
        before: "Many capital cities feel ",
        after: " at rush hour.",
        answers: ["overcrowded"],
      },
      {
        id: 3,
        before: "Some regions are ",
        after: " in summer and ",
        after2: " after heavy rain.",
        answers: ["arid", "waterlogged"],
        dual: true,
      },
      {
        id: 4,
        before: "Despite its size, the town has a ",
        after: " community.",
        answers: ["thriving"],
      },
      {
        id: 5,
        before: "Fresh water is not ",
        after: " in every part of the world.",
        answers: ["abundant"],
      },
    ],
  },
  discuss2b: {
    badge: "b",
    instruction:
      "Talk about your local area using some of the words from Exercise 2a.",
  },
  grammar3: {
    badge: "3",
    heading: "Grammatical range and accuracy",
    bands: {
      instruction: "Match the descriptors with the band levels.",
      items: [
        {
          id: 1,
          text: "Uses a wide range of structures flexibly; errors are rare.",
          key: "Band 7 and above",
        },
        {
          id: 2,
          text: "Limited range; frequent errors that can cause misunderstanding.",
          key: "Band 5",
        },
        {
          id: 3,
          text: "Mix of simple and complex forms; some errors but meaning is clear.",
          key: "Band 6 and above",
        },
      ],
    },
    forms: [
      "Present perfect — I've always wanted to live…",
      "Modal of deduction — You might think that…",
      "Passive — it's only been visited by a very small number of people",
      "Comparative — much more exciting than…",
      "Second conditional — if I lived on the moon, I'd…",
      "Modal for necessity — we may need to look elsewhere",
      "Future — it'll be possible…",
      "Imperative — imagine being…",
    ],
  },
  part2: {
    badge: "4",
    heading: "Test practice · Part 2",
    instruction:
      "You have 1 minute to make notes, then speak for up to 2 minutes. Try to show grammatical range.",
    cue: {
      intro: "Describe a place you would like to experience in the future.",
      shouldSay: "You should say:",
      bullets: [
        "where this place is (or might be)",
        "what you would do there",
        "how it would be different from places today",
      ],
      andWhy: "and explain why you would like to experience it.",
    },
    modelLabel: "Suggested answer (abridged)",
    modelAnswer:
      "Something that I'd very much like to experience in the future would be motor racing in an electric racing car… It would be totally exhilarating… I'd need to pay careful attention to safety… With technology developing, electric cars are just around the corner so motor sport will become more accessible.",
  },
  assess5: {
    badge: "5",
    instruction:
      "Analyse your performance with a partner and give each other advice on grammatical range and fluency.",
    questions: [
      "Did you use a mix of tenses and complex structures?",
      "Did you speak for close to two minutes?",
      "Which vocabulary from Exercise 2 did you use?",
    ],
  },
};
