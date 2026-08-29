export const MS_U4_LISTEN_STEPS = [
  "Coins Q1–8",
  "Banknote",
  "Exam locks",
  "Exam diagram",
  "Strategy",
] as const;

export const MS_U4_LISTEN_NEXT = [
  "Banknote →",
  "Exam locks →",
  "Diagram →",
  "Strategy →",
  "← Back to unit",
] as const;

export const listeningU4 = {
  id: "ms-u4-listening-flow",
  bookPages: "pp. 84–87",
  sectionTitle: "Listening · Short answers · Diagrams (keys only)",
  unitGoals: [
    "answer short-answer questions using a word limit",
    "label diagrams with words and/or a number",
    "use questions to follow the structure of a talk",
  ],
  steps: [
    {
      kind: "gaps" as const,
      badge: "SHORT ANSWERS",
      instruction:
        "Keys only — no audio in this trainer. Answer the questions. Write NO MORE THAN THREE WORDS for questions 1–4 and NO MORE THAN TWO WORDS for questions 5–8.",
      tip: "The questions follow the order of the talk. Underlined words in the book paraphrase what you will hear — predict the kind of answer, then match the exact words from the recording.",
      bank: [
        "sea shells",
        "gold and silver",
        "bronze",
        "knife blades",
        "square hole",
        "royal gifts",
        "gifts",
        "elaborate design",
        "mass production",
      ],
      items: [
        {
          id: "1",
          stem: "What were used as an ancient type of currency for trade?",
          key: "sea shells",
        },
        {
          id: "2",
          stem: "What were the first coins made in Greece a natural mixture of?",
          key: "gold and silver",
        },
        {
          id: "3",
          stem: "Which material did the Chinese use in the seventh century BC to make coins?",
          key: "bronze",
        },
        {
          id: "4",
          stem: "What did most early Chinese coins resemble?",
          key: "knife blades",
        },
        {
          id: "5",
          stem: "What distinguished the coins of the first emperor of China, Shi Huangdi, apart from being circular?",
          key: "square hole",
        },
        {
          id: "6",
          stem: "According to historians, what was the purpose of the round jade discs that Shi Huangdi's coins were based on?",
          key: "royal gifts",
          alts: ["gifts"],
        },
        {
          id: "7",
          stem: "Which aspect of previous Chinese coins was not kept for Shi Huangdi's coins?",
          key: "elaborate design",
        },
        {
          id: "8",
          stem: "Which industrial process can Shi Huangdi's coin-making be seen as a primitive example of?",
          key: "mass production",
        },
      ],
    },
    {
      kind: "gaps" as const,
      badge: "DIAGRAM",
      instruction:
        "Label the diagram below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
      tip: "Predict what kind of word fills each gap (number, noun phrase, type of light). Hyphenated words count as one word; spell carefully.",
      bank: [
        "15 percent",
        "see-through window",
        "window",
        "silver patch",
        "rainbow effect",
        "UV",
        "ultra-violet",
      ],
      items: [
        {
          id: "1",
          stem: "Polymer note is ______ smaller than previous one.",
          key: "15 percent",
        },
        {
          id: "2",
          stem: "______ with three images",
          key: "see-through window",
          alts: ["window"],
        },
        {
          id: "3",
          stem: "______ containing a hologram",
          key: "silver patch",
        },
        {
          id: "4",
          stem: "Number 5 revealed by ______",
          key: "rainbow effect",
        },
        {
          id: "5",
          stem: "______ light",
          key: "UV",
          alts: ["ultra-violet", "ultraviolet"],
        },
      ],
    },
    {
      kind: "gaps" as const,
      badge: "EXAM 1–5",
      instruction:
        "Answer the questions below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
      tip: "Read all five questions first so you know the order of the talk before you listen.",
      bank: [
        "thieves",
        "locking device",
        "4,000 BC",
        "steel springs",
        "precise construction",
      ],
      items: [
        {
          id: "1",
          stem: "Which type of people are particularly attracted to wealth that can be easily transported?",
          key: "thieves",
        },
        {
          id: "2",
          stem: "What did the ancient Egyptians invent in order to protect their wealth?",
          key: "locking device",
        },
        {
          id: "3",
          stem: "After which year was the dead bolt lock created?",
          key: "4,000 BC",
        },
        {
          id: "4",
          stem: "What did the Romans add to Egyptian lock designs?",
          key: "steel springs",
        },
        {
          id: "5",
          stem: "What made Roman locks more difficult to break open than Egyptian locks?",
          key: "precise construction",
        },
      ],
    },
    {
      kind: "gaps" as const,
      badge: "EXAM 6–10",
      instruction:
        "Label the diagram below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
      tip: "Use the labelled parts of the lock diagram to predict each gap (metal, bar, spring action, inner parts, numbered control).",
      bank: [
        "brass",
        "strong bar",
        "steel bar",
        "curved bar",
        "pushed down",
        "pins",
        "combination dials",
        "combination dial",
        "dials",
      ],
      items: [
        {
          id: "6",
          stem: "Outer casing made of ______ or other strong metal",
          key: "brass",
        },
        {
          id: "7",
          stem: "______",
          key: "strong bar",
          alts: ["steel bar", "curved bar"],
        },
        {
          id: "8",
          stem: "Spring is ______ when closed",
          key: "pushed down",
        },
        {
          id: "9",
          stem: "______ inside lock",
          key: "pins",
        },
        {
          id: "10",
          stem: "______ with numbers",
          key: "combination dials",
          alts: ["combination dial", "dials", "dial"],
        },
      ],
    },
    {
      kind: "mcq" as const,
      badge: "STRATEGY",
      instruction:
        "Choose the best strategy for short-answer and diagram tasks.",
      tip: "After Check, compare your placed answers with the marked keys — do not invent synonyms.",
      items: [
        {
          id: "1",
          stem: "For short-answer questions, you should…",
          options: [
            {
              id: "A",
              text: "Answer in any order, using your own paraphrases",
            },
            {
              id: "B",
              text: "Follow the order of the recording and use the exact words you hear, within the word limit",
            },
            {
              id: "C",
              text: "Always write three words even if the answer is one word",
            },
          ],
          key: "B",
        },
      ],
    },
  ],
};
