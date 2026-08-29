export const VOCAB_M6_STEPS = [
  "1a Match verbs",
  "1b Verb forms",
  "2a Collocations",
  "2b Speaking prompts",
  "3a Collocation MCQ",
  "3b–3c Practice",
] as const;

export const VOCAB_M6_NEXT = [
  "1b Verb forms →",
  "2a Collocations →",
  "2b Speaking →",
  "3a MCQ →",
  "3b–3c Practice →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ");
}

export function checkVocabM6(input: string, answers: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return answers.some((a) => normalize(a) === n);
}

export const vocabularyM6 = {
  id: "vocabulary-m6-flow",
  bookPages: "p. 90 in your coursebook",
  sectionTitle: "Vocabulary · Argument & opinion",
  match1a: {
    badge: "1a",
    heading: "Verbs for argument and opinion",
    instruction: "Match the verbs below with the meanings (1–6).",
    bank: [
      "contribute",
      "conclude",
      "derive",
      "involve",
      "identify",
      "facilitate",
    ],
    items: [
      {
        id: 1,
        text: "To help to make something happen; to be one of the causes of something.",
        key: "contribute",
      },
      {
        id: 2,
        text: "To decide that something is true after considering all the information you have.",
        key: "conclude",
      },
      {
        id: 3,
        text: "To get something such as an idea, feeling or substance from something else.",
        key: "derive",
      },
      {
        id: 4,
        text: "To include something as a necessary part of an activity, event or situation.",
        key: "involve",
      },
      {
        id: 5,
        text: "To recognise and name someone or something; to find or discover.",
        key: "identify",
      },
      {
        id: 6,
        text: "To make it easier for a process or activity to happen.",
        key: "facilitate",
      },
    ],
  },
  forms1b: {
    badge: "b",
    instruction:
      "Complete the sentences with the correct form of the verbs from Exercise 1a.",
    bank: [
      "Identifying",
      "contribute",
      "derived",
      "involve",
      "facilitate",
      "conclude",
    ],
    items: [
      {
        id: 1,
        before: "",
        after:
          " the main causes of crime is the first step towards effective prevention.",
        answers: ["Identifying"],
      },
      {
        id: 2,
        before: "Poverty can ",
        after: " to higher rates of theft in some communities.",
        answers: ["contribute"],
      },
      {
        id: 3,
        before: "Many of their ideas were ",
        after: " from earlier sociological research.",
        answers: ["derived"],
      },
      {
        id: 4,
        before: "Successful rehabilitation programmes ",
        after: " both counselling and job training.",
        answers: ["involve"],
      },
      {
        id: 5,
        before: "Better street lighting can ",
        after: " safer travel at night.",
        answers: ["facilitate"],
      },
      {
        id: 6,
        before: "From the evidence, we can ",
        after: " that CCTV alone does not stop all crime.",
        answers: ["conclude"],
      },
    ],
  },
  collocations2a: {
    badge: "2a",
    heading: "Collocations for argument",
    instruction:
      "Choose the correct word to complete each sentence. Discuss the difference in meaning with a partner.",
    bank: [
      "fundamentally",
      "feasible",
      "inconsistent",
      "integrally",
      "reasonably",
      "practical",
    ],
    items: [
      {
        id: 1,
        before: "The two approaches are ",
        after: " different in how they treat offenders.",
        answers: ["fundamentally"],
      },
      {
        id: 2,
        before: "Is it ",
        after: " to introduce more CCTV cameras in every street?",
        answers: ["feasible"],
      },
      {
        id: 3,
        before: "His argument is ",
        after: " with the evidence presented in court.",
        answers: ["inconsistent"],
      },
      {
        id: 4,
        before: "Education is ",
        after: " linked to long-term crime reduction.",
        answers: ["integrally"],
      },
      {
        id: 5,
        before: "We can ",
        after: " expect some reduction in burglaries after the campaign.",
        answers: ["reasonably"],
      },
      {
        id: 6,
        before: "Community policing is a ",
        after: " way to build trust between officers and residents.",
        answers: ["practical"],
      },
    ],
  },
  speaking2b: {
    badge: "b",
    instruction:
      "Transform each sentence from Exercise 2a into a Speaking Part 2-style prompt. Take turns answering.",
    tip: "Example: Talk about a time when two approaches to a problem were fundamentally different.",
  },
  mcq3a: {
    badge: "3a",
    instruction:
      "Choose the correct option (A, B or C) to complete each collocation.",
    items: [
      {
        id: 1,
        stem: "to _____ an argument",
        options: [
          { id: "A", text: "advance" },
          { id: "B", text: "raise" },
          { id: "C", text: "lift" },
        ],
        key: "A",
      },
      {
        id: 2,
        stem: "a _____ conclusion",
        options: [
          { id: "A", text: "hard" },
          { id: "B", text: "tight" },
          { id: "C", text: "firm" },
        ],
        key: "C",
      },
      {
        id: 3,
        stem: "to _____ evidence",
        options: [
          { id: "A", text: "cite" },
          { id: "B", text: "quote fully" },
          { id: "C", text: "speak" },
        ],
        key: "A",
      },
      {
        id: 4,
        stem: "a _____ point",
        options: [
          { id: "A", text: "tall" },
          { id: "B", text: "valid" },
          { id: "C", text: "legalistic" },
        ],
        key: "B",
      },
      {
        id: 5,
        stem: "to _____ a claim",
        options: [
          { id: "A", text: "refuse" },
          { id: "B", text: "refute" },
          { id: "C", text: "deny away" },
        ],
        key: "B",
      },
      {
        id: 6,
        stem: "_____ reasoning",
        options: [
          { id: "A", text: "circular soft" },
          { id: "B", text: "round" },
          { id: "C", text: "sound" },
        ],
        key: "C",
      },
      {
        id: 7,
        stem: "to _____ an issue",
        options: [
          { id: "A", text: "open widely" },
          { id: "B", text: "start loud" },
          { id: "C", text: "address" },
        ],
        key: "C",
      },
    ],
  },
  practice3b: {
    badge: "3b",
    instruction:
      "Complete the sentences with the words below. You may need to change the form.",
    bank: ["support", "convincing", "flawed"],
    items: [
      {
        id: 1,
        before: "The statistics strongly ",
        after: " the claim that street lighting reduces night-time crime.",
        answers: ["support"],
      },
      {
        id: 2,
        before: "She put forward a ",
        after: " argument for investing in youth programmes.",
        answers: ["convincing"],
      },
      {
        id: 3,
        before: "The study’s methodology was ",
        after: ", so its conclusions were unreliable.",
        answers: ["flawed"],
      },
    ],
  },
  discuss3c: {
    badge: "c",
    instruction:
      "Paraphrase or simplify the sentences from Exercise 3b. Then use one as a class debate topic (for / against).",
    tip: "Example: People should not go to prison for minor crimes because it costs too much.",
  },
};
