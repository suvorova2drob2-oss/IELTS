import type { MindsetFlowData } from "./flowTypes";

export const MS_U6_WRITE_STEPS = [
  "Reporting verbs",
  "Task Response",
  "Despite / Although",
  "Conclusions",
  "Exam Task 2",
] as const;

export const MS_U6_WRITE_NEXT = [
  "Critique →",
  "Cohesion →",
  "Conclusions →",
  "Exam →",
  "← Back to unit",
] as const;

export const writingU6: MindsetFlowData = {
  id: "ms-u6-writing-flow",
  bookPages: "pp. 122–126",
  sectionTitle: "Writing · Task 2 · Advise/suggest · Cohesion",
  unitGoals: [
    "use advise / suggest / recommend accurately",
    "improve Task Response and cohesion (despite / although)",
    "write a balanced Task 2 discussion essay",
  ],
  steps: [...MS_U6_WRITE_STEPS],
  nextLabels: [...MS_U6_WRITE_NEXT],
  panels: [
    {
      kind: "gaps",
      badge: "2",
      instruction:
        "Choose the correct reporting verb form (advise / suggest / recommend patterns).",
      bank: ["advise", "suggested", "recommended"],
      items: [
        { id: "3", stem: "My teacher _____ against learning answers off by heart. →", key: "advise" },
        { id: "4", stem: "She _____ spending more time on pronunciation. →", key: "suggested" },
        { id: "5", stem: "He _____ that I record a Part 2 answer. →", key: "recommended" },
      ],
    },
    {
      kind: "reveal",
      badge: "3–4",
      instruction:
        "Review advise/suggest patterns and Task Response critique of the social-media sample essay.",
      blocks: [
        {
          title: "advise / suggest patterns",
          lines: [
            "advise + (that) + clause · advise + someone + to-infinitive · advise + -ing · advise against + -ing",
            "suggest + (that) + clause · suggest + -ing · suggest to someone that + clause",
          ],
        },
        {
          title: "Candidate essay critique (ex. 4)",
          lines: [
            "1 In part — position stated but not on the set question",
            "2 No — second reason drifts to performers/fans, not family/friends",
            "3 No — example about owning a mobile phone, not strengthening relationships",
            "4 No — negatives mentioned but not developed; extra recommendation not asked for",
          ],
        },
      ],
    },
    {
      kind: "gaps",
      badge: "6–8",
      instruction:
        "Cohesion: place correct linker / structure words. despite / although patterns.",
      bank: [
        "Despite the fact that",
        "Although",
        "Despite",
      ],
      items: [
        {
          id: "1",
          stem: "_____ wi-fi is cheaper than ever, some regions still have no internet. →",
          key: "Although",
          altKeys: ["Despite the fact that", "Despite"],
        },
        {
          id: "2",
          stem: "_____ VR headsets are available, most home PCs lack power. →",
          key: "Despite the fact that",
          altKeys: ["Although", "Despite"],
        },
      ],
    },
    {
      kind: "mc",
      badge: "13",
      instruction: "Which conclusion is best for the Task 2 essay?",
      items: [
        {
          id: "1",
          stem: "Best conclusion?",
          options: [
            { id: "A", text: "Restates answers to both questions in the essay" },
            { id: "B", text: "Only answers the second question" },
            { id: "C", text: "Contradicts points made about social media being positive" },
          ],
          key: "A",
          tip: "Conclusion A is the best — clearly restates answers to both questions.",
        },
      ],
    },
    {
      kind: "writing",
      badge: "EXAM",
      instruction:
        "Answer the Writing Task 2 below. Write at least 250 words.",
      prompt:
        "Computers are becoming more and more important in our lives. Some people say this is a positive development, while others are concerned about the effects on society.\n\nDiscuss both these views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      sample: `It would be difficult to imagine life without computers. Over recent years in particular, their use and potential have grown at an incredible rate and I strongly believe that this growth will continue as more innovative ways to use them are developed. Although there are definitely some downsides to their use, I do believe the positives outweigh the negatives.

Computers enable us to do a wealth of tasks that would have been unthinkable for previous generations. We can bank online, book holidays, do our weekly shopping – the list of labour-saving activities is almost endless. Given the speed at which they have evolved and the convenience they offer, it is hardly surprising that so many people rely on them for both work and leisure.

However, critics argue that overuse of technology can weaken face-to-face relationships and that some people spend too much time staring at screens. These concerns are valid, yet on balance I would argue that computers have revolutionised communication and access to knowledge in overwhelmingly positive ways.

In conclusion, while computers are not without drawbacks, their benefits for education, work and everyday life are so significant that their continued development should be welcomed.`,
      cue: "Task 2 · discuss both views · opinion",
    },

  ],
};
