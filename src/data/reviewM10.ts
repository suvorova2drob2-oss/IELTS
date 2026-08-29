export const REVIEW_M10_STEPS = [
  "1a Vocabulary",
  "1b Verb patterns",
  "1c Speculation",
  "2a Conditionals",
  "2b Past modals",
  "2c Meaning pairs",
] as const;

export const REVIEW_M10_NEXT = [
  "1b Verb patterns →",
  "1c Speculation →",
  "2a Conditionals →",
  "2b Past modals →",
  "2c Meaning →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ");
}

export function checkReviewM10(input: string, answers: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return answers.some((a) => normalize(a) === n);
}

export const reviewM10 = {
  id: "review-m10-flow",
  bookPages: "p. 166 in your coursebook",
  sectionTitle: "Review",
  vocab1a: {
    badge: "1a",
    instruction: "Complete the text with the words below.",
    bank: [
      "concept",
      "assume",
      "public perception",
      "wider implications",
      "speculate",
      "In all likelihood",
    ],
    items: [
      {
        id: 1,
        before: "The ",
        after:
          " of the self-help industry is for people to improve their lives by implementing ideas and techniques which will change their lives for the better.",
        answers: ["concept"],
      },
      {
        id: 2,
        before: "Many people ",
        after:
          " that the industry has been built on solid scientific principles;",
        answers: ["assume"],
      },
      {
        id: 3,
        before: "the ",
        after:
          " of the self-help industry is that it is organised and run by expert academics and doctors.",
        answers: ["public perception"],
      },
      {
        id: 4,
        before: "This has ",
        after:
          " for society because if people believe they can solve their own problems, they may not seek professional help.",
        answers: ["wider implications"],
      },
      {
        id: 5,
        before: "Psychologists ",
        after:
          " that people could be doing more damage than good by using self-help programmes, books and online resources.",
        answers: ["speculate"],
      },
      {
        id: 6,
        before: "",
        after:
          " there are probably both benefits and drawbacks depending on the individual.",
        answers: ["In all likelihood"],
      },
    ],
  },
  thereIt1b: {
    badge: "b",
    instruction: "Choose / place the correct option to complete the sentences.",
    bank: ["invest", "to expand", "practising", "becoming", "losing"],
    items: [
      {
        id: 1,
        before: "The government promised to ",
        after: " more in the development of space probes.",
        answers: ["invest"],
      },
      {
        id: 2,
        before: "The company managed ",
        after: " its range of innovative products.",
        answers: ["to expand"],
      },
      {
        id: 3,
        before: "Becoming a concert musician involves ",
        after: " for many hours per day.",
        answers: ["practising"],
      },
      {
        id: 4,
        before:
          "People who want to push their boundaries should avoid ",
        after: " negative after setbacks.",
        answers: ["becoming"],
      },
      {
        id: 5,
        before: "Athletes who take chances risk ",
        after: " matches, but it is often worth trying.",
        answers: ["losing"],
      },
    ],
  },
  match1c: {
    badge: "c",
    instruction:
      "Match / place the correct speculation phrase (Teacher’s Book 1c).",
    bank: [
      { id: "A", text: "insight" },
      { id: "B", text: "I would not be surprised" },
      { id: "C", text: "the chances are" },
      { id: "D", text: "I get the impression" },
      { id: "E", text: "inference" },
      { id: "F", text: "My guess" },
    ],
    items: [
      {
        id: 1,
        text: "It is only when we think about a situation deeply… that we can begin to develop a useful ______.",
        key: "A",
      },
      {
        id: 2,
        text: "______ if my son studies biology later in life; he’s always examining insects…",
        key: "B",
      },
      {
        id: 3,
        text: "Due to the way the workplace is changing nowadays, ______ we would recognise very few jobs of the future.",
        key: "C",
      },
      {
        id: 4,
        text: "From observing modern graduates ______ that job satisfaction could be as important as salary…",
        key: "D",
      },
      {
        id: 5,
        text: "When the interviewer thanked me… there was an ______ in his tone…",
        key: "E",
      },
      {
        id: 6,
        text: "______ is that our approach to success will have to change significantly in the future.",
        key: "F",
      },
    ],
    tip: "Keys: 1 insight · 2 I would not be surprised · 3 the chances are · 4 I get the impression · 5 inference · 6 My guess.",
  },
  linking2a: {
    badge: "2a",
    instruction:
      "Complete with the correct form of the verbs in brackets (Teacher’s Book keys).",
    bank: [
      "had invested",
      "included",
      "would have gone",
      "would not be",
      "focused",
      "would have changed",
    ],
    items: [
      {
        id: 1,
        before:
          "The directors of the organisation wished that they ",
        after: " more in staff training.",
        answers: ["had invested"],
      },
      {
        id: 2,
        before: "If only the education system ",
        after: " more creative activities for teenagers.",
        answers: ["included"],
      },
      {
        id: 3,
        before: "If I had studied harder at high school, I ",
        after: " to medical school.",
        answers: ["would have gone", "could have gone"],
      },
      {
        id: 4,
        before:
          "Suppose the internet hadn’t been invented. We ",
        after: " able to communicate in such a global way.",
        answers: ["would not be"],
      },
      {
        id: 5,
        before: "It’s time scientists ",
        after: " more on finding life on other planets.",
        answers: ["focused"],
      },
      {
        id: 6,
        before:
          "What if people hadn’t invented mobile phones? How ",
        after: " your life?",
        answers: ["would have changed", "would change", "change"],
      },
    ],
  },
  cleft2b: {
    badge: "b",
    instruction:
      "Complete with could have / should have / would have to match the meanings in bold.",
    items: [
      {
        id: 1,
        stem: "The number of people suffering from malaria ______ been significantly reduced… (possible alternative if past different)",
        model: "could have",
      },
      {
        id: 2,
        stem: "The government ______ consulted some technology experts… (different past action recommended)",
        model: "should have",
      },
      {
        id: 3,
        stem: "The Philae probe ______ provided more data if it had not broken down… (alternative result)",
        model: "would have",
      },
    ],
  },
  cleft2c: {
    badge: "c",
    instruction: "What is the difference in meaning between the pairs?",
    items: [
      {
        id: 1,
        stem: "A Air conditioning systems should have been designed to be more environmentally friendly. / B … could have been designed…",
        model:
          "In A the speaker believes a past action to be wrong and recommends a different past action, whereas in B the speaker thinks that a different action in the past was possible, but not recommended.",
      },
      {
        id: 2,
        stem: "A If inventors… would have chosen… / B Inventors… should have been better at showing off…",
        model:
          "In A the speaker is imagining a different outcome to a situation in the past, and in B the speaker is making a recommendation for the past.",
      },
      {
        id: 3,
        stem: "A The internet would have been less innovative… / B The internet could have been less innovative…",
        model:
          "In A the speaker is imagining a different outcome with some surety, whereas in B the speaker is imagining a possible outcome and is therefore less sure.",
      },
    ],
  },
};
