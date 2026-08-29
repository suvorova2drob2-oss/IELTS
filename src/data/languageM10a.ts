export const LANG_M10A_STEPS = [
  "1a Happened?",
  "1b Wish / if only",
  "2 Correct sentences",
  "3 Open practice",
  "4a–4b Hypothetical forms",
  "4d Gap-fill",
] as const;

export const LANG_M10A_NEXT = [
  "1b Wish →",
  "2 Correct →",
  "3 Open practice →",
  "4a–4b Forms →",
  "4d Gap-fill →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[.,;:!?]+$/g, "");
}

export function checkLangM10a(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export const languageM10a = {
  id: "language-m10a-flow",
  bookPages: "p. 157 in your coursebook",
  sectionTitle: "Language · Unreal conditionals; wish / if only",
  grammarRef: "EXPERT GRAMMAR page 181",
  contrast1a: {
    badge: "1a",
    instruction:
      "For each pair, select the letter of the sentence that describes an event that DID NOT happen (Teacher’s Book: 1 A · 2 A · 3 B).",
    items: [
      {
        id: 1,
        text: "A I wish I had studied a more arts-based subject at university. / B I am glad I studied a more arts-based subject at university.",
        key: "A",
      },
      {
        id: 2,
        text: "A If only I had more time, I would do something creative. / B I would often do creative things if I had the time.",
        key: "A",
      },
      {
        id: 3,
        text: "A Studying an arts-based subject has led me to an inspiring job. / B If I had studied a more arts-based subject at university, I might have found a more inspiring job.",
        key: "B",
      },
    ],
    options: ["A", "B"],
  },
  link1b: {
    badge: "b",
    instruction:
      "Place the letter for the best rewritten past hypothetical (Teacher’s Book 1b models). A = wish · B = if only · C = if + past perfect.",
    bank: ["A", "B", "C"],
    items: [
      {
        id: 1,
        before:
          "1 I wish I had studied a more arts-based subject at university. → model ",
        after: "",
        answers: ["A"],
      },
      {
        id: 2,
        before: "2 If only I had more time, I would do something creative. → model ",
        after: "",
        answers: ["B"],
      },
      {
        id: 3,
        before:
          "3 If I had studied a more arts-based subject at university, I might have found a more inspiring job. → model ",
        after: "",
        answers: ["C"],
      },
    ],
  },
  complete2: {
    badge: "2",
    instruction:
      "Decide if each sentence is Correct or Incorrect. Place the corrected form where needed (keys from Teacher’s Book).",
    bank: [
      "would",
      "Correct",
      "was",
      "Correct",
      "involved",
      "might not have started",
    ],
    items: [
      {
        id: 1,
        before:
          "1 If only more people will take up some kind of craft hobby… → change will to ",
        after: "",
        answers: ["would"],
      },
      {
        id: 2,
        before:
          "2 If I had grown up in a city, I would have been exposed to a wider variety… → ",
        after: "",
        answers: ["Correct"],
      },
      {
        id: 3,
        before:
          "3 Teachers often wish the school curriculum is more creative… → change is to ",
        after: "",
        answers: ["was"],
      },
      {
        id: 4,
        before:
          "4 If she had followed her heart and gone to design school, she would be a graphic designer now. → ",
        after: "",
        answers: ["Correct"],
      },
      {
        id: 5,
        before:
          "5 Many adults wish their jobs are involving more opportunities… → change are involving to ",
        after: "",
        answers: ["involved"],
      },
      {
        id: 6,
        before:
          "6 I might not started building websites if I had not taken that class… → ",
        after: "",
        answers: ["might not have started"],
      },
    ],
  },
  open3: {
    badge: "3",
    instruction:
      "Discuss using hypothetical structures: Explain a situation in your past which you would like to be different. Imagine how an aspect of your life could be different now. Describe a regret you have.",
  },
  both4a: {
    badge: "4a–b",
    instruction:
      "Read the sentences. Are they Past or Present? Place P or N. 1 Suppose we hadn’t met James… 2 Let’s transport… in case… 3 It’s time the company started… 4 What if you’d been born in California?",
    bank: ["P", "N"],
    items: [
      {
        id: 1,
        before: "1 Suppose we hadn’t met James. → ",
        after: "",
        answers: ["P"],
      },
      {
        id: 2,
        before: "2 Let’s transport the musical equipment by car in case something gets damaged. → ",
        after: "",
        answers: ["N"],
      },
      {
        id: 3,
        before:
          "3 It’s time the company started adding some more innovative ideas… → ",
        after: "",
        answers: ["N"],
      },
      {
        id: 4,
        before: "4 What if you’d been born in California? → ",
        after: "",
        answers: ["P"],
      },
    ],
  },
  both4b: {
    badge: "c",
    instruction:
      "Match verb forms after the hypothetical forms: 1 Past perfect (alt. past) · 2 Present simple (now/near future) · 3 Past simple (wanted present) · 4 Past perfect (alt. past). Place 1–4.",
    bank: ["1", "2", "3", "4"],
    items: [
      {
        id: 1,
        before: "Suppose we hadn’t met… uses form ",
        after: "",
        answers: ["1"],
      },
      {
        id: 2,
        before: "…in case something gets damaged uses form ",
        after: "",
        answers: ["2"],
      },
      {
        id: 3,
        before: "It’s time the company started… uses form ",
        after: "",
        answers: ["3"],
      },
      {
        id: 4,
        before: "What if you’d been born… uses form ",
        after: "",
        answers: ["4"],
      },
    ],
  },
  rewrite4c: {
    badge: "d",
    instruction:
      "Complete the text using the correct form of the verbs (Teacher’s Book: thought of · disagreed · created · began).",
    items: [
      {
        id: 1,
        stem: "Supposing someone ______ (think of) a great but unconventional idea at work.",
        model: "thought of",
      },
      {
        id: 2,
        stem: "It is likely that that person would not discuss their idea in case their colleagues ______ (disagree).",
        model: "disagreed",
      },
      {
        id: 3,
        stem: "But what if people ______ (create) new patterns of thinking?",
        model: "created",
      },
      {
        id: 4,
        stem: "Perhaps it is time people ______ (begin) to take control of cognitive bias and reduce its effects.",
        model: "began",
      },
    ],
  },
};
