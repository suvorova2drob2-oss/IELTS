export const MS_U4_WRITE_STEPS = [
  "Lead-in · finance",
  "Essay types",
  "Introduction",
  "Sequencing",
  "Exam Task 2",
] as const;

export const MS_U4_WRITE_NEXT = [
  "Essay types →",
  "Intro →",
  "Sequencing →",
  "Exam →",
  "← Back to unit",
] as const;

export const writingU4 = {
  id: "ms-u4-writing-flow",
  bookPages: "pp. 79–83",
  sectionTitle: "Writing · Task 2 opinion / discussion",
  unitGoals: [
    "write a clear introduction and conclusion",
    "sequence ideas logically",
    "plan balanced vs one-sided essays on finance topics",
  ],
  steps: [
    {
      kind: "intro" as const,
      badge: "LEAD-IN",
      instruction:
        "What does 'financially responsible' mean? Discuss: not spending more than you earn; luxuries vs essentials; saving for old age; paying upfront rather than on credit.",
      tip: "Brainstorm arguments before you decide essay structure.",
    },
    {
      kind: "mcq" as const,
      badge: "4–5",
      instruction: "Match statements / plans to essay approaches.",
      items: [
        {
          id: "1",
          stem: "Essay Type 1 (balanced agree/disagree paragraphs) — typical of?",
          options: [
            { id: "A", text: "Strong disagreement only" },
            { id: "B", text: "Conventional balanced discussion" },
            { id: "C", text: "Listing unrelated tips" },
          ],
          key: "B",
        },
        {
          id: "2",
          stem: "Which plan agrees more than it disagrees across two paragraphs then briefly opposes?",
          options: [
            { id: "A", text: "Essay Type 1" },
            { id: "B", text: "Essay Type 2" },
            { id: "C", text: "Essay Type 3" },
          ],
          key: "B",
        },
        {
          id: "3",
          stem: "Strong disagreement with rebuttal of opposing points — which type?",
          options: [
            { id: "A", text: "Essay Type 1" },
            { id: "B", text: "Essay Type 2" },
            { id: "C", text: "Essay Type 3" },
          ],
          key: "C",
        },
      ],
    },
    {
      kind: "gaps" as const,
      badge: "sequencing",
      instruction: "Choose sequencing markers for a Task 2 body paragraph.",
      bank: ["First", "Secondly", "Finally", "In addition", "However", "In conclusion"],
      items: [
        { id: "1", stem: "______ / Primarily / To begin with", key: "First" },
        { id: "2", stem: "______ / Following / Next", key: "Secondly" },
        { id: "3", stem: "______, opponents claim that…", key: "However" },
        { id: "4", stem: "______, schools should teach personal finance.", key: "In addition" },
        { id: "5", stem: "______, I believe the advantages outweigh the drawbacks.", key: "In conclusion" },
      ],
    },
    {
      kind: "mcq" as const,
      badge: "intro",
      instruction: "What should a strong Task 2 introduction do?",
      items: [
        {
          id: "1",
          stem: "Best practice for introductions on opinion questions?",
          options: [
            { id: "A", text: "Copy the question wording exactly" },
            { id: "B", text: "Paraphrase the question and clearly indicate your position / plan" },
            { id: "C", text: "List every example you will use in detail" },
          ],
          key: "B",
        },
        {
          id: "2",
          stem: "A conclusion should…",
          options: [
            { id: "A", text: "Introduce brand-new arguments" },
            { id: "B", text: "Briefly summarise and restate your position" },
            { id: "C", text: "Apologise for lack of time" },
          ],
          key: "B",
        },
      ],
    },
    {
      kind: "exam" as const,
      instruction: "Write a Task 2 essay on finance / financial responsibility.",
      prompt:
        "Some people believe that learning how to manage personal finances should be a compulsory subject in secondary schools. To what extent do you agree or disagree? Write at least 250 words.",
      minWords: 250,
      wcLabel: "Task 2 · exam minimum",
      sample:
        "Plan arguments about consumer pressure on young adults, lack of school teaching on credit/mortgages, and bank incentives to create debt — then weigh personal responsibility. State a clear position in the introduction and restate it in the conclusion.",
    },
  ],
};
