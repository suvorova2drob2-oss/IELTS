export const REVIEW_M9_STEPS = [
  "1a Vocabulary",
  "1b Describe objects",
  "1c Replace thing",
  "2a Estimation",
  "2b Relative riddles",
  "2c Object models",
] as const;

export const REVIEW_M9_NEXT = [
  "1b Describe →",
  "1c Replace thing →",
  "2a Estimation →",
  "2b Riddles →",
  "2c Models →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ");
}

export function checkReviewM9(input: string, answers: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return answers.some((a) => normalize(a) === n);
}

export const reviewM9 = {
  id: "review-m9-flow",
  bookPages: "p. 150 in your coursebook",
  sectionTitle: "Review",
  vocab1a: {
    badge: "1a",
    instruction:
      "Complete the sentences with the correct collocation words below.",
    bank: [
      "driving",
      "transferable",
      "broad",
      "desired",
      "pivotal",
      "concerted",
    ],
    items: [
      {
        id: 1,
        before: "Ambition was the ",
        after: " force behind his decision to launch a start-up.",
        answers: ["driving"],
      },
      {
        id: 2,
        before: "Teamwork is a ",
        after: " skill that employers look for in many roles.",
        answers: ["transferable"],
      },
      {
        id: 3,
        before: "The course attracts a ",
        after: " spectrum of students from different countries.",
        answers: ["broad"],
      },
      {
        id: 4,
        before: "Clear targets help teams achieve the ",
        after: " outcome more efficiently.",
        answers: ["desired"],
      },
      {
        id: 5,
        before: "Her mentor played a ",
        after: " role in the early stages of her career.",
        answers: ["pivotal"],
      },
      {
        id: 6,
        before: "Meeting the deadline will require a ",
        after: " effort from everyone in the department.",
        answers: ["concerted"],
      },
    ],
  },
  thereIt1b: {
    badge: "b",
    instruction:
      "Complete the descriptions by placing the correct word or phrase (replace vague ‘thing’ language with specific nouns).",
    bank: [
      "employees",
      "factors",
      "an issue",
      "managers",
      "countries",
    ],
    items: [
      {
        id: 1,
        before: "Successful companies invest in training for their ",
        after: ".",
        answers: ["employees"],
      },
      {
        id: 2,
        before: "Several ",
        after: " influence whether a product succeeds in the market.",
        answers: ["factors"],
      },
      {
        id: 3,
        before: "High staff turnover can become ",
        after: " for growing businesses.",
        answers: ["an issue"],
      },
      {
        id: 4,
        before: "Effective ",
        after: " communicate goals clearly and support their teams.",
        answers: ["managers"],
      },
      {
        id: 5,
        before: "Some ",
        after: " have invested heavily in green technology industries.",
        answers: ["countries"],
      },
    ],
  },
  match1c: {
    badge: "c",
    instruction:
      "Match the definitions (1–4) with the terms (A–D). Then note the collocation pairs.",
    bank: [
      { id: "A", text: "functional" },
      { id: "B", text: "open-plan" },
      { id: "C", text: "partitioned" },
      { id: "D", text: "contemporary" },
    ],
    items: [
      {
        id: 1,
        text: "Designed to be useful rather than simply visually appealing.",
        key: "A",
      },
      {
        id: 2,
        text: "Having a large space not separated by many walls.",
        key: "B",
      },
      {
        id: 3,
        text: "A structure divided into separate spaces, usually with walls.",
        key: "C",
      },
      {
        id: 4,
        text: "Belonging to the present time / modern.",
        key: "D",
      },
    ],
    tip: "2c pairs: 1 functional appearance · 2 open-plan layout · 3 partitioned areas · 4 contemporary design.",
  },
  linking2a: {
    badge: "2a",
    instruction: "Complete with the estimation / indication phrases below.",
    bank: [
      "kinds of",
      "approximately",
      "more or less",
      "so on",
    ],
    items: [
      {
        id: 1,
        before: "There are many ",
        after: " incentives that can motivate staff.",
        answers: ["kinds of"],
      },
      {
        id: 2,
        before: "The meeting lasted ",
        after: " forty-five minutes.",
        answers: ["approximately"],
      },
      {
        id: 3,
        before: "The two plans are ",
        after: " identical in overall size.",
        answers: ["more or less"],
      },
      {
        id: 4,
        before: "They discussed salaries, contracts, training and ",
        after: ".",
        answers: ["so on"],
      },
    ],
  },
  cleft2b: {
    badge: "b",
    instruction:
      "These relative-clause riddles describe everyday objects. Check the models (answers in brackets).",
    items: [
      {
        id: 1,
        stem: "This is the thing people need when travelling overseas.",
        model: "passport",
      },
      {
        id: 2,
        stem: "It is the thing that can be used to control the temperature.",
        model: "thermostat",
      },
      {
        id: 3,
        stem: "This is the liquid which stops the car overheating.",
        model: "coolant",
      },
      {
        id: 4,
        stem: "It is what people use to help them keep cool.",
        model: "fan / air-conditioning",
      },
      {
        id: 5,
        stem: "They are what you eat to help you see in the dark.",
        model: "carrots!",
      },
      {
        id: 6,
        stem: "These are what you use to help you balance when skiing.",
        model: "poles",
      },
      {
        id: 7,
        stem: "This is the thing that boils water to make hot drinks.",
        model: "kettle",
      },
      {
        id: 8,
        stem: "It is what people use to change channel when watching TV.",
        model: "remote",
      },
    ],
  },
  cleft2c: {
    badge: "c",
    instruction:
      "Study these model object descriptions (structure / size / material / form). Write similar sentences of your own.",
    items: [
      {
        id: 1,
        stem: "Most new trainers — materials",
        model:
          "Most new trainers are made from rubber or synthetic material.",
      },
      {
        id: 2,
        stem: "Most memory sticks — shape",
        model:
          "Most memory sticks are shaped like a small highlighter pen.",
      },
      {
        id: 3,
        stem: "The earliest computers — size",
        model: "The earliest computers were the size of a small car.",
      },
      {
        id: 4,
        stem: "Top-of-the-range laptops — what they consist of",
        model:
          "Top-of-the-range laptops consist of glare-free screens and very long battery life.",
      },
    ],
  },
};
