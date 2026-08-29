export const MS_U2_WRITE_STEPS = [
  "Lead-in · vocab",
  "Supporting ideas",
  "Discourse markers",
  "Intro / conclusion",
  "Exam Task 2",
] as const;

export const MS_U2_WRITE_NEXT = [
  "Supporting →",
  "Markers →",
  "Intro →",
  "Exam →",
  "← Back to unit",
] as const;

export const writingU2 = {
  id: "ms-u2-writing-flow",
  bookPages: "pp. 38–41",
  sectionTitle: "Writing · Advantages & disadvantages",
  unitGoals: [
    "effectively answer 'advantages and disadvantages' questions",
    "write topic and supporting sentences, developing your ideas in each paragraph",
    "achieve a high score in Coherence and Cohesion",
  ],
  steps: [
    {
      kind: "intro" as const,
      badge: "LEAD-IN",
      instruction:
        "Complete the table with words and phrases: benefits, negatives, pros, cons, on the downside, on the plus side, positives, problems, drawbacks, on the upside, issues.",
      tip: "Advantages: benefits, pros, positives, on the plus side, on the upside. Disadvantages: on the downside, issues, negatives, cons, problems, drawbacks.",
    },
    {
      kind: "sort" as const,
      badge: "1",
      instruction: "Sort each phrase into Advantages or Disadvantages synonyms/paraphrases.",
      items: [
        { id: "1", text: "benefits", key: "adv" as const },
        { id: "2", text: "pros", key: "adv" as const },
        { id: "3", text: "positives", key: "adv" as const },
        { id: "4", text: "on the plus side", key: "adv" as const },
        { id: "5", text: "on the upside", key: "adv" as const },
        { id: "6", text: "on the downside", key: "dis" as const },
        { id: "7", text: "issues", key: "dis" as const },
        { id: "8", text: "negatives", key: "dis" as const },
        { id: "9", text: "cons", key: "dis" as const },
        { id: "10", text: "problems", key: "dis" as const },
        { id: "11", text: "drawbacks", key: "dis" as const },
      ],
    },
    {
      kind: "mcq" as const,
      badge: "4–5",
      instruction:
        "Read the topic sentence and the possible supporting ideas. Which two are NOT effective? Then match the effective ideas with their function.",
      topic:
        "One obvious benefit of participating in a contact sport is the improvement in one's physical health and well-being.",
      items: [
        {
          id: "1",
          stem: "Which two supporting ideas are NOT effective?",
          options: [
            { id: "A", text: "Ideas 1 and 2" },
            { id: "B", text: "Ideas 3 and 5" },
            { id: "C", text: "Ideas 4 and 6" },
            { id: "D", text: "Ideas 2 and 4" },
          ],
          key: "B",
          tip: "Idea 3 argues the opposite immediately; Idea 5 does not develop personal fitness (doctor's appointment).",
        },
        {
          id: "2",
          stem: "Idea 2 (boxing produces the fittest athletes) — function?",
          options: [
            { id: "a", text: "gives a specific supporting example" },
            { id: "b", text: "uses a cause and effect argument" },
            { id: "c", text: "shows a contrasting view" },
            { id: "d", text: "adds an additional point" },
          ],
          key: "a",
        },
        {
          id: "3",
          stem: "Idea 1 (demanding activity → conditioning) — function?",
          options: [
            { id: "a", text: "gives a specific supporting example" },
            { id: "b", text: "uses a cause and effect argument" },
            { id: "c", text: "shows a contrasting view" },
            { id: "d", text: "adds an additional point" },
          ],
          key: "b",
        },
        {
          id: "4",
          stem: "Idea 4 (majority gain fitness despite accidents) — function?",
          options: [
            { id: "a", text: "gives a specific supporting example" },
            { id: "b", text: "uses a cause and effect argument" },
            { id: "c", text: "shows a contrasting view" },
            { id: "d", text: "adds an additional point" },
          ],
          key: "c",
        },
        {
          id: "5",
          stem: "Idea 6 (concentration / mental awareness) — function?",
          options: [
            { id: "a", text: "gives a specific supporting example" },
            { id: "b", text: "uses a cause and effect argument" },
            { id: "c", text: "shows a contrasting view" },
            { id: "d", text: "adds an additional point" },
          ],
          key: "d",
        },
      ],
    },
    {
      kind: "gaps" as const,
      badge: "8",
      instruction:
        "The discourse markers in this paragraph are missing. Choose markers that fit each gap (example / addition / cause and effect).",
      bank: [
        "For example",
        "What is more",
        "Consequently",
      ],
      items: [
        {
          id: "1",
          stem: "One positive aspect of city life is fitness complexes… ______, in my city alone there are somewhere in the region of 200 individual facilities…",
          key: "For example",
        },
        {
          id: "2",
          stem: "______, these gyms are often part of larger chains…",
          key: "What is more",
        },
        {
          id: "3",
          stem: "______, although living in rural areas is traditionally assumed to be better…",
          key: "Consequently",
        },
      ],
    },
    {
      kind: "mcq" as const,
      badge: "10–11",
      instruction:
        "Look at the essay question about free health care and the three introductions / conclusions. Choose the best options.",
      items: [
        {
          id: "1",
          stem: "Which introduction is the best of the three?",
          options: [
            { id: "A", text: "Introduction A — paraphrases well but does not state position" },
            { id: "B", text: "Introduction B — paraphrases, uses 'In this essay I will discuss…', states position" },
            { id: "C", text: "Introduction C — restates the question without paraphrase" },
          ],
          key: "B",
        },
        {
          id: "2",
          stem: "Which conclusion(s) are good?",
          options: [
            { id: "A", text: "Conclusion A only" },
            { id: "B", text: "Conclusions B and C" },
            { id: "C", text: "All three equally" },
          ],
          key: "B",
          tip: "B and C state the writer's opinion; A only restates the question.",
        },
      ],
    },
    {
      kind: "exam" as const,
      instruction: "Answer the Writing Task 2 below. You should spend about 40 minutes on this task.",
      prompt:
        "In many countries around the world, life expectancy is increasing. Discuss the advantages and disadvantages of this situation and give your own opinion. Write at least 250 words.",
      minWords: 250,
      wcLabel: "Task 2 · exam minimum",
      sample:
        "Medical care over the past century has improved dramatically. As a consequence, the world's population is increasingly living long into old age… Weighing up both sides of the argument again, although there are a number of problems that old age brings — predominantly health-related — the benefits that it brings to the family unit and to society as a whole are impossible to ignore. (310 words)",
    },
  ],
};
