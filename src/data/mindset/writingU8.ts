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
      instruction:
        "Complete the sample answer describing how Wesak lanterns are made. Place the sequencing markers in the gaps.",
      bank: [
        "followed by",
        "To begin with",
        "then",
        "This stage",
        "Once",
        "Finally",
      ],
      items: [
        {
          id: "1",
          stem: "There are eight main stages, which consist of tying bamboo sticks together to form the frame of the lantern, ______ the cutting and pasting of coloured paper which is used to decorate it.",
          key: "followed by",
        },
        {
          id: "2",
          stem: "______, you need to cut 24 bamboo sticks to a length of 25cm each.",
          key: "To begin with",
        },
        {
          id: "3",
          stem: "Four of the sticks are ______ tied together to make a square.",
          key: "then",
        },
        {
          id: "4",
          stem: "______ of the process has to be repeated until you have made six squares.",
          key: "This stage",
        },
        {
          id: "5",
          stem: "______ your frame is completed, take brightly coloured tissue paper and cut out eight triangles and four squares to sizes which correspond to the squares and triangles on the frame.",
          key: "Once",
        },
        {
          id: "6",
          stem: "______, fold and cut paper for the frills, and decorate the base of the lantern with them, so that they hang low below it.",
          key: "Finally",
        },
      ],
    },
    {
      kind: "gaps",
      badge: "8",
      instruction:
        "Identify the opinion phrases. Place each opener in the incomplete Task 2 sentence from the candidates’ extracts.",
      bank: [
        "In my experience",
        "what I believe is that",
        "It is evident to me that",
        "The reality is that",
        "We cannot deny that",
        "I strongly believe that",
      ],
      items: [
        {
          id: "1",
          stem: "______, it depends on which cultural background someone is from. Some people are able to discard their national identities more readily than others.",
          key: "In my experience",
        },
        {
          id: "2",
          stem: "Although many people believe a person's country no longer has a great influence on their culture, ______, under the surface, the impact of where a person is from is enormous.",
          key: "what I believe is that",
        },
        {
          id: "3",
          stem: "______ we can never truly escape our origins. They are with us from birth and are present during our formative years.",
          key: "It is evident to me that",
        },
        {
          id: "4",
          stem: "Some people are of the opinion that, for example, because the same fast-food chains exist in every country, everyone likes the same food. However, ______ in most parts of the world people eat the same food, typical of their own country or region, almost every day.",
          key: "The reality is that",
        },
        {
          id: "5",
          stem: "While it may be true that certain aspects of culture are shared by people from all over the world, ______ our beliefs and behaviours are shaped by the national environment in which we grow up.",
          key: "We cannot deny that",
        },
        {
          id: "6",
          stem: "While I admit that the country of origin is a major factor in determining one's culture, ______ anyone who moves overseas for work or study can be equally influenced by the culture of this host country.",
          key: "I strongly believe that",
        },
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
