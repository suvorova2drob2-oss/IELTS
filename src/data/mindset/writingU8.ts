import type { MindsetFlowData } from "./flowTypes";

export const MS_U8_WRITE_STEPS = [
  "Sequencers",
  "Opinion phrases",
  "Process grammar",
  "Exam Task 2",
] as const;

export const MS_U8_WRITE_NEXT = [
  "Opinions →",
  "Grammar →",
  "Exam →",
  "← Back to unit",
] as const;

export const writingU8: MindsetFlowData = {
  id: "ms-u8-writing-flow",
  bookPages: "pp. 167–172",
  sectionTitle: "Writing · Process · Culture Task 2",
  unitGoals: [
    "describe a process with sequencing language",
    "use passives and relative clauses",
    "express opinions on culture and globalisation",
  ],
  steps: [...MS_U8_WRITE_STEPS],
  nextLabels: [...MS_U8_WRITE_NEXT],
  panels: [
    {
      kind: "gaps",
      badge: "5",
      instruction: "Process description — place sequencing markers for making a paper lantern.",
      bank: [
        "followed by",
        "To begin with",
        "then",
        "This stage",
        "Once",
        "Finally",
      ],
      items: [
        { id: "1", stem: "1", key: "followed by" },
        { id: "2", stem: "2", key: "To begin with" },
        { id: "3", stem: "3", key: "then" },
        { id: "4", stem: "4", key: "This stage" },
        { id: "5", stem: "6", key: "Once" },
        { id: "6", stem: "8", key: "Finally" },
      ],
    },
    {
      kind: "gaps",
      badge: "8",
      instruction: "Opinion phrases for Task 2 on language and culture.",
      bank: [
        "In my experience",
        "what I believe is that",
        "It is evident to me that",
        "The reality is that",
        "We cannot deny that",
        "I strongly believe that",
      ],
      items: [
        { id: "1", stem: "1", key: "In my experience" },
        { id: "2", stem: "2", key: "what I believe is that" },
        { id: "3", stem: "3", key: "It is evident to me that" },
        { id: "4", stem: "4 (opposing opinion)", key: "The reality is that" },
        { id: "5", stem: "5", key: "We cannot deny that" },
        { id: "6", stem: "6", key: "I strongly believe that" },
      ],
    },
    {
      kind: "reveal",
      badge: "Process language",
      instruction: "Review passives, relative clauses and imperatives used in the lantern process model.",
      blocks: [
        {
          title: "Sequencing sample",
          lines: [
            "Next, the square and triangular tissue paper shapes can be stuck onto the frame.",
            "The lantern is then ready to be hung on a lightbulb.",
          ],
        },
        {
          title: "Grammar focus",
          lines: [
            "Passives: are then tied / should be attached / is then ready to be hung",
            "Relative clauses: which consist of tying bamboo sticks…",
            "Imperatives: take brightly coloured tissue paper / cut out eight triangles",
          ],
        },
      ],
    },
    {
      kind: "writing",
      badge: "EXAM",
      instruction: "Task 2: Write at least 250 words on language, culture and globalisation.",
      prompt:
        "Some people say that globalisation is destroying local cultures, while others say it brings people together and creates a richer world culture.\n\nDiscuss both these views and give your own opinion.",
      minWords: 250,
      sample: `My own view is that any language is a reflection of culture and contains words and phrases that are specific to that culture. For example, in English there is an expression 'It's not my cup of tea', meaning 'It is not to my taste', which I think reflects the fact that the British are predominantly a nation of tea drinkers.

However, it seems to me that what affects our lives most are issues on a local or national level rather than global trends alone. Globalisation has certainly brought cultures closer together – restaurants, music and fashion, to name but a few examples – so that it is sometimes impossible to separate the culture of one country from another.

In conclusion, while globalisation can enrich cultural exchange, we should also protect local traditions so that cultural diversity is not lost.`,
      cue: "Task 2 · culture · globalisation",
    },

  ],
};
