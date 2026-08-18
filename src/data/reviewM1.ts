/** Module 1 Review · p. 22 */

export const REVIEW_M1_STEPS = [
  "1a Vocabulary",
  "1b Graph verbs",
  "1c Describe",
  "2a Word form",
] as const;

export const reviewM1 = {
  id: "review-m1-flow",
  bookPages: "p. 22 in your coursebook",
  closest: {
    instruction:
      "1a Choose the word with the closest meaning (A, B or C) to the underlined word.",
    items: [
      {
        id: 1,
        before: "An individual must have a high intellectual ",
        word: "capacity",
        after: " if he/she wants to study at doctorate level.",
        options: ["efficiency", "aptitude", "readiness"] as const,
        key: 1,
      },
      {
        id: 2,
        before: "Using different note-taking styles can help you ",
        word: "retain",
        after: " information from your lectures.",
        options: ["reserve", "remember", "review"] as const,
        key: 1,
      },
      {
        id: 3,
        before: "There was a positive ",
        word: "reaction",
        after: " to the new examination system introduced into the school curriculum.",
        options: ["backlash", "reply", "response"] as const,
        key: 2,
      },
      {
        id: 4,
        before: "The ability to ",
        word: "focus",
        after: " on work for long time periods is rare. Many people need to take breaks.",
        options: ["concentrate", "fixate", "adapt"] as const,
        key: 0,
      },
      {
        id: 5,
        before: "Finding a study ",
        word: "method",
        after: " that works for you will help with time management at university.",
        options: ["design", "custom", "system"] as const,
        key: 2,
      },
    ],
  },
  graph: {
    instruction:
      "1b Match the verbs below with the correct parts of the graph (A–D). Some parts match more than one verb.",
    verbs: [
      { id: "decline", key: "D" },
      { id: "drop", key: "B" },
      { id: "grow", key: "A" },
      { id: "plummet", key: "B" },
      { id: "remain stable", key: "C" },
      { id: "soar", key: "A" },
    ],
    parts: [
      { id: "A", label: "steady rise" },
      { id: "B", label: "sharp fall" },
      { id: "C", label: "flat" },
      { id: "D", label: "gradual fall" },
    ],
  },
  describe: {
    instruction: "1c Write sentences to describe the graph below.",
    samples: [
      {
        part: "A",
        text: "The figure fell / declined steadily from a high point.",
      },
      {
        part: "B",
        text: "It remained stable at a low level and then began to grow.",
      },
      {
        part: "C",
        text: "The figure then remained stable.",
      },
      {
        part: "D",
        text: "Finally it soared / rose steeply.",
      },
    ],
  },
  wordForm: {
    instruction: "2a Complete the text with the correct form of the words below.",
    bank: ["limit", "view", "assess", "improve", "inform", "ease", "vary"],
    title: "Methods of learning",
    text: "Learning creative skills such as drawing, carpentry or playing an instrument is very different from learning topics or subjects based on acquiring {{1}}. It can be argued that this type of learning involves distinct areas of our brain and also a {{2}} of approaches to retaining information. When studying facts and figures the brain doesn’t have an {{3}} capacity for storing and therefore learning data. However, when people start to learn more creative skills, there are many opportunities for {{4}}. One of these is based on practice. Through a process of {{5}} and then doing these actions again we can become better at creative skills. One reason is due to the fact that we receive immediate feedback. We can compare two drawings and {{6}} notice if one is better than the other. Then we are able to {{7}} our competence and focus on particular aspects of what we are learning in order to plan how to carry on with our learning. This feedback loop ensures we continue to improve these creative skills.",
    gaps: {
      1: ["information"],
      2: ["variety"],
      3: ["unlimited"],
      4: ["improvement"],
      5: ["reviewing", "review", "viewing"],
      6: ["easily"],
      7: ["assess"],
    } as Record<number, string[]>,
  },
};

function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/’/g, "'").replace(/\s+/g, " ");
}

export function checkReviewGap(input: string, answers: string[]): boolean {
  const n = normalize(input);
  return answers.some((a) => normalize(a) === n);
}
