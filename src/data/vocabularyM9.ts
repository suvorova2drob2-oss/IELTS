export const VOCAB_M9_STEPS = [
  "1a Match meanings",
  "1b Word forms",
  "2a Collocations",
  "2b Match pairs",
  "3a Adjectives",
  "3b–3c Practice",
] as const;

export const VOCAB_M9_NEXT = [
  "1b Word forms →",
  "2a Collocations →",
  "2b Match pairs →",
  "3a Adjectives →",
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

export function checkVocabM9(input: string, answers: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return answers.some((a) => normalize(a) === n);
}

export const vocabularyM9 = {
  id: "vocabulary-m9-flow",
  bookPages: "p. 138 in your coursebook",
  sectionTitle: "Vocabulary · Talent & success",
  match1a: {
    badge: "1a",
    heading: "Nouns for talent and success",
    instruction: "Match the nouns below with the meanings (1–6).",
    bank: [
      "achievement",
      "commitment",
      "motivation",
      "potential",
      "talent",
      "synergy",
    ],
    items: [
      {
        id: 1,
        text: "A goal that you succeed in achieving.",
        key: "achievement",
      },
      {
        id: 2,
        text: "The time and energy spent on doing something.",
        key: "commitment",
      },
      {
        id: 3,
        text: "The eagerness to do something.",
        key: "motivation",
      },
      {
        id: 4,
        text: "Promise; the possibility that something will develop in a successful way.",
        key: "potential",
      },
      {
        id: 5,
        text: "The natural ability to do something.",
        key: "talent",
      },
      {
        id: 6,
        text: "When people or things work well together.",
        key: "synergy",
      },
    ],
  },
  forms1b: {
    badge: "b",
    instruction:
      "Complete the sentences with the correct form of the words from Exercise 1a.",
    bank: [
      "commitment",
      "capability",
      "motivation",
      "achievements",
    ],
    items: [
      {
        id: 1,
        before: "Her long-term ",
        after:
          " to daily practice is what turned raw talent into elite performance.",
        answers: ["commitment"],
      },
      {
        id: 2,
        before: "Few people realise the full ",
        after:
          " of young athletes until they are given the right coaching.",
        answers: ["capability"],
      },
      {
        id: 3,
        before: "Without strong inner ",
        after:
          ", even gifted students rarely finish demanding courses.",
        answers: ["motivation"],
      },
      {
        id: 4,
        before: "The awards ceremony celebrated the ",
        after:
          " of scientists whose research changed everyday life.",
        answers: ["achievements"],
      },
    ],
  },
  collocations2a: {
    badge: "2a",
    heading: "Collocations for success",
    instruction:
      "Choose the correct word to complete each collocation. Discuss the meaning with a partner.",
    bank: [
      "transferable",
      "desired",
      "broad",
      "driving",
      "pivotal",
      "concerted",
    ],
    items: [
      {
        id: 1,
        before: "Communication is a highly ",
        after: " skill that employers value across many industries.",
        answers: ["transferable"],
      },
      {
        id: 2,
        before: "Clear planning helps teams reach the ",
        after: " outcome of a project on time.",
        answers: ["desired"],
      },
      {
        id: 3,
        before: "Successful leaders often work with a ",
        after: " spectrum of people from different backgrounds.",
        answers: ["broad"],
      },
      {
        id: 4,
        before: "Curiosity was the ",
        after: " force behind her decision to start a tech company.",
        answers: ["driving"],
      },
      {
        id: 5,
        before: "Mentors can play a ",
        after: " role in a young professional’s early career.",
        answers: ["pivotal"],
      },
      {
        id: 6,
        before: "Only a ",
        after: " effort by the whole team will meet this deadline.",
        answers: ["concerted"],
      },
    ],
  },
  speaking2b: {
    badge: "b",
    instruction:
      "Match the collocations (pivotal role, transferable skill, broad spectrum, driving force, desired outcome, concerted effort). Then write questions using them and take turns asking and answering.",
    tip: "Suggested pairs: 1 pivotal role · 2 transferable skill · 3 broad spectrum · 4 driving force · 5 desired outcome · 6 concerted effort. Example questions: When did you last make a concerted effort in your studies? What is the desired outcome of this course? What are the most important transferable skills in the workplace?",
  },
  mcq3a: {
    badge: "3a",
    instruction:
      "Choose the correct adjective (A, B or C) for each definition of a personal quality.",
    items: [
      {
        id: 1,
        stem: "Having one aim and working very hard to achieve it.",
        options: [
          { id: "A", text: "single-minded" },
          { id: "B", text: "expressive" },
          { id: "C", text: "lucrative" },
        ],
        key: "A",
      },
      {
        id: 2,
        stem: "Giving people the enthusiasm to do or create something.",
        options: [
          { id: "A", text: "tenacious" },
          { id: "B", text: "inspirational" },
          { id: "C", text: "hierarchical" },
        ],
        key: "B",
      },
      {
        id: 3,
        stem: "Determined and not giving up easily.",
        options: [
          { id: "A", text: "porous" },
          { id: "B", text: "redundant" },
          { id: "C", text: "tenacious" },
        ],
        key: "C",
      },
      {
        id: 4,
        stem: "Showing thoughts or feelings clearly.",
        options: [
          { id: "A", text: "expressive" },
          { id: "B", text: "concerted" },
          { id: "C", text: "functional" },
        ],
        key: "A",
      },
      {
        id: 5,
        stem: "Using new ideas or methods; original.",
        options: [
          { id: "A", text: "accomplished" },
          { id: "B", text: "innovative" },
          { id: "C", text: "pivotal" },
        ],
        key: "B",
      },
      {
        id: 6,
        stem: "Highly skilled and successful in a particular field.",
        options: [
          { id: "A", text: "open-plan" },
          { id: "B", text: "transferable" },
          { id: "C", text: "accomplished" },
        ],
        key: "C",
      },
    ],
  },
  practice3b: {
    badge: "3b",
    instruction:
      "Complete the sentences with the adjectives below. You may need to change the form.",
    bank: [
      "accomplished",
      "inspirational",
      "tenacious",
      "innovative",
      "single-minded",
      "expressive",
    ],
    items: [
      {
        id: 1,
        before: "She is an ",
        after: " pianist who has performed in major concert halls worldwide.",
        answers: ["accomplished"],
      },
      {
        id: 2,
        before: "His ",
        after: " speeches encouraged thousands of young people to volunteer.",
        answers: ["inspirational"],
      },
      {
        id: 3,
        before: "Despite repeated rejections, the ",
        after: " inventor kept improving her prototype.",
        answers: ["tenacious"],
      },
      {
        id: 4,
        before: "The company is known for its ",
        after: " approach to product design.",
        answers: ["innovative"],
      },
    ],
  },
  discuss3c: {
    badge: "c",
    instruction:
      "Discuss which personal qualities matter most for success in sport, business and the arts. Use adjectives from Exercises 3a–3b.",
    tip: "Example: I think successful athletes need to be tenacious and single-minded, while artists may need to be more expressive and innovative.",
  },
};
