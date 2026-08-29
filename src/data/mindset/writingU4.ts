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
      instruction:
        "You should spend about 40 minutes on this task. Write at least 250 words.",
      prompt:
        "The most important consideration when choosing any career or job is having a high income. To what extent do you agree or disagree?",
      minWords: 250,
      wcLabel: "Task 2 · exam minimum",
      sample:
        "It is widely accepted that, for most people, their daily working lives will not be spent in their dream jobs. Despite this, I do not feel that people should instead prioritise becoming a high earner above all other concerns. To begin with, I strongly believe that people need stimulation in their daily working lives in order to feel a sense of reward. Very few of us can go through an entire career staying in a position or an industry that we find boring purely for the financial incentive. Secondly, there are so many people who see their working life as a search for fulfilment and contentment in helping others, rather than a search for wealth. It seems unlikely that the priority for, say, every nurse or teacher in the world is to become well-off, and jobs such as these are rarely extremely well-paid. Despite this, some would argue that those people who have families to support should always prioritise earning a high income; after all, it means securing their children's future. Others point out that, as the job market becomes increasingly unstable across the globe, it is vital to earn more and therefore save more. However, I do not agree that a good salary should necessarily be the number one concern for everyone. Too many people become preoccupied with the next pay rise or career move, and eventually become unhappy or even depressed, neither of which helps them to save or to provide for their family. In summary, earning as much money as is humanly possible should not be anyone's main concern. Granted, it arguably brings financial stability, for individuals and for their families, but it is simply not worth tolerating a lifetime of unhappiness at work purely for the money. (291 words)",
    },
  ],
};
