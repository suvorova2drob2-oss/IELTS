import type { GapMeta, ReadingFlowData } from "./readingFlowM1";

const g = (
  id: number,
  answers: string[],
  evidence: string[],
  extra?: Partial<GapMeta>,
): GapMeta => ({
  id,
  hint: extra?.hint ?? "",
  answers,
  maxWords: extra?.maxWords ?? 2,
  evidence,
  tip: extra?.tip,
});

/** Module 1B · Untapped resources · The learning brain (pp. 18–19). */
export const readingFlowM1b: ReadingFlowData = {
  id: "reading-m1b-flow",
  module: 1,
  bookPages: "pp. 18–19 in your coursebook",
  article: {
    title: "The learning brain",
    introduction:
      "neuron: a type of cell that makes up the nervous system and sends messages to other parts of the body or the brain.",
    predictHints: [
      "1a Сначала True/False по общим знаниям — не открывая текст.",
      "1b Потом просканируйте первый абзац и проверьте себя.",
      "Hippocrates · heart · how many neurons · how heavy the brain is.",
    ],
    predictPrompts: [
      "1 Hippocrates argued that the brain, not the heart, is the seat of thought. True or false?",
      "2 People once believed the mind was located in the heart. True or false?",
      "3 There are around a trillion neurons in the brain. True or false?",
      "4 The average brain weighs three pounds. True or false?",
    ],
    keyVocab: [
      "neuron",
      "dendrites",
      "axon",
      "synapse",
      "neurotransmitter",
      "myelin",
      "impulse",
      "receptor",
    ],
    checkQuestions: [
      "1 TRUE — first paragraph: Hippocrates argued the brain rather than the heart.",
      "2 TRUE — his contemporaries believed the heart was the seat of the mind.",
      "3 FALSE — 100 billion neurons; trillions of connections, not a trillion neurons.",
      "4 TRUE — weighing three pounds.",
    ],
  },
  passage: [
    "For centuries, scientists and philosophers have been fascinated by the brain, until recently viewed as nearly incomprehensible. Two thousand five hundred years ago Hippocrates argued that the brain rather than the heart, which is what his contemporaries believed, is the seat of thought, sensation, emotion and cognition. In the 17th and 18th centuries, anatomists began depicting the structure of the brain with increasing accuracy but it was not until the 19th century that it was confirmed that nerves and muscles generate electrical impulses. All of this paved the way for the modern era of neuroscience, beginning with the work of Spanish anatomist Ramon y Cajal at the dawn of the 20th century: he suggested that our abilities depend on the way neurons are connected, not to any special features of the cells themselves. And in recent years, due to the accelerating pace of research in neurological and behavioural science along with the development of new research techniques, scientists have begun to understand much more about the 100 billion neurons which, along with trillions of neural connections, construct the most intricate organ of the human body, weighing three pounds and using a fifth of a person’s blood supply.",
    "Reading, learning, pattern recognition and so much more, all begin with the main type of brain cell and fundamental building block of the brain – the neuron. All sensations, movements, thoughts, memories and emotions are the result of very rapid messages that one of these nerve cells sends to another. Neurons themselves consist of three parts: each one has an input area (the dendrites), an output area (the axon) and a cell body with a nucleus, where most of the molecules that the neuron needs in order to survive are manufactured. Each neuron extends into networks of many thousands of dendrites, thin short fibres resembling the branches of a tree, which receive incoming electrical signals from a neighbouring cell and pass them into the cell body. Once a signal arrives at the cell body, it may be suppressed or amplified by other signals: eventually, as a result of all the incoming signals converging, a new one is triggered.",
    "The processed information then travels down the neuron’s long nerve fibre, known as the axon, until it gets to another neuron, a muscle cell or cells in some other organ. Each neuron generally has only one axon but it may split and branch into as many as 10,000 knob-like endings that disperse signals across many cells. The axon may be very short, extending only to adjacent cells in the brain, or much longer, carrying electrical signals for up to a metre down to the spinal cord to move the arms, legs and feet. An insulating sheath formed of cells wraps around the axon: this includes a fatty molecule called myelin, which helps the signals travel faster and farther. The information is transmitted by brief impulses carrying only 0.1 volts and lasting just a few thousandths of a second but with the capacity – in just one second – to travel as far as 120 metres.",
    "Arriving at the end of the axon, the electrical signals stop when they reach a synapse, the narrow gap which separates a neuron or cell from the next one. Then follows the process of synaptic transmission, in which the signal pauses to convert itself into chemical energy before crossing the synapse and reaching the next neuron. These neurotransmitters – as they are known – then attach themselves to receptors on the neighbouring cell, which may also change the properties of the receiving cell. If the receiving cell is also a neuron, the neurotransmitter then travels the length of the new cell until it reaches the synapse of another receptor cell and repeats the process. The electrical signals and sprays of neurotransmitter that send the messages somehow build into the complex mental feats that can perform functions such as understanding language, remembering experiences from the past, and comprehending the outside world. Disorders relating to neurotransmitters have been linked to depression, Parkinson’s disease, Alzheimer’s and a host of other conditions.",
    "Both the brain and body need regular exercise if neurons are to remain sharp: to spur on the brain to make new neuronal connections and protect the ones it has, people should try activities such as learning a new language, solving mental puzzles and games, eating a healthy diet and getting regular physical exercise.",
  ],
  scan: {
    instruction:
      "1b Scan the first paragraph and check your True/False answers from 1a.",
    steps: [
      "Hippocrates / heart — first few sentences.",
      "100 billion neurons · trillions of connections — not a trillion neurons.",
      "weighing three pounds — end of paragraph 1.",
    ],
    highlightTerms: [
      "Hippocrates",
      "heart",
      "100 billion neurons",
      "trillions of neural connections",
      "three pounds",
    ],
  },
  taskOverview: {
    notesTitle: "Synaptic transmission",
    tableTitle: "The structure of a neuron",
    notesInstruction:
      "Complete the notes below.\nChoose NO MORE THAN TWO WORDS from the passage for each answer.",
    tableInstruction:
      "Complete the table below.\nChoose NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage for each answer.",
    notesQuestionLabel: "Questions 6–9",
    tableQuestionLabel: "Questions 1–5",
    tableHead: ["PART", "DESCRIPTION", "FUNCTION"],
    tasksOrder: "table-notes",
  },
  predictLanguage: {
    context:
      "Look at gap 1. Read around it: «short electrical signals, known as 1 ______».",
    questions: [
      {
        text: "What class of word are you looking for?",
        hint: "known as + noun — another name for the signals.",
        answers: ["noun"],
      },
      {
        text: "Find another name for these electrically charged signals.",
        hint: "HELP 1: electrically charged signals = ?",
        answers: ["impulses"],
      },
    ],
  },
  tablePredictPrompt:
    "Look at the table «The structure of a neuron». Which three parts do you expect? What does each one do?",
  examTips: [
    "Table / note completion: слова из пассажа, не свои синонимы. Смотрите лимит слов.",
    "HELP 1–3: другое имя для electrical signals; глагол «похож на»; сколько аксонов — обычно один.",
    "HELP 6–8: paraphrase of change; keep apart; connect.",
    "Порядок вопросов идёт сверху вниз по тексту: структура нейрона, потом synapse.",
  ],
  gaps: {
    1: g(1, ["impulses"], ["impulses", "electrical signals"], {
      hint: "Another name for electrically charged signals.",
      tip: "HELP: Find another name for these electrically charged signals → impulses.",
    }),
    2: g(
      2,
      ["tree branches", "branches", "the branches of a tree", "branches of a tree"],
      ["branches of a tree", "resembling"],
      {
        hint: "Similar in appearance to…?",
        tip: "HELP: verb meaning similar in appearance to = resembling. В таблице — tree branches (2 слова).",
      },
    ),
    3: g(3, ["axon", "the axon", "an axon", "Axon"], ["axon"], {
      hint: "The output part. How many are there?",
      tip: "HELP: Be careful — how many? Обычно один axon, много dendrites.",
      maxWords: 2,
    }),
    4: g(
      4,
      ["myelin", "myelin sheath", "a myelin sheath", "a sheath"],
      ["myelin", "sheath"],
      {
        hint: "What covers the axon?",
        tip: "sheath … includes a fatty molecule called myelin.",
      },
    ),
    5: g(
      5,
      ["120 metres", "120 meters", "120 m"],
      ["120 metres"],
      {
        hint: "How far in one second?",
        maxWords: 2,
        tip: "in just one second – to travel as far as 120 metres.",
      },
    ),
    6: g(6, ["chemical energy"], ["chemical energy", "convert"], {
      hint: "Look for a paraphrase of change.",
      tip: "HELP 6: change ≈ convert → chemical energy.",
    }),
    7: g(7, ["narrow gap", "gap"], ["narrow gap", "separates"], {
      hint: "A verb meaning keep apart. How is a synapse described?",
      tip: "HELP 7: keep apart ≈ separates → a narrow gap.",
    }),
    8: g(8, ["receptors"], ["receptors", "attach"], {
      hint: "Think of a paraphrase for connect.",
      tip: "HELP 8: connect ≈ attach → receptors.",
    }),
    9: g(9, ["disorders"], ["Disorders relating to neurotransmitters"], {
      hint: "What relating to neurotransmitters can cause diseases?",
      tip: "Disorders relating to neurotransmitters have been linked to depression, Parkinson’s, Alzheimer’s.",
    }),
  },
  notes: [
    {
      segments: [
        { type: "text", text: "signals change into " },
        { type: "gap", id: 6, maxWords: 2 },
      ],
      gap: g(6, ["chemical energy"], ["chemical energy", "convert"]),
      relatedParagraphIndex: 3,
    },
    {
      segments: [
        { type: "text", text: "synapse – a " },
        { type: "gap", id: 7, maxWords: 2 },
        { type: "text", text: " keeping neurons apart" },
      ],
      gap: g(7, ["narrow gap", "gap"], ["narrow gap", "separates"]),
      relatedParagraphIndex: 3,
    },
    {
      segments: [
        { type: "text", text: "neurotransmitters – connect to " },
        { type: "gap", id: 8, maxWords: 2 },
        { type: "text", text: " in new cells" },
      ],
      gap: g(8, ["receptors"], ["receptors", "attach"]),
      relatedParagraphIndex: 3,
    },
    {
      segments: [
        { type: "text", text: "neurotransmitter " },
        { type: "gap", id: 9, maxWords: 2 },
        { type: "text", text: " can cause diseases" },
      ],
      gap: g(9, ["disorders"], ["Disorders relating to neurotransmitters"]),
      relatedParagraphIndex: 3,
    },
  ],
  table: {
    rows: [
      {
        category: "Cell body",
        relatedParagraphIndex: 1,
        predictPrompt: "Cell body: nucleus — what passes through here?",
        advice: [
          { segments: [{ type: "text", text: "contains a nucleus" }] },
        ],
        benefits: [
          {
            segments: [
              {
                type: "text",
                text: "origin of molecules; short electrical signals, known as ",
              },
              { type: "gap", id: 1, maxWords: 2 },
              { type: "text", text: ", pass through here" },
            ],
            gap: g(1, ["impulses"], ["impulses"]),
          },
        ],
      },
      {
        category: "Dendrites",
        relatedParagraphIndex: 1,
        predictPrompt: "Dendrites look like…?",
        advice: [
          {
            segments: [
              { type: "text", text: "projections similar in appearance to " },
              { type: "gap", id: 2, maxWords: 2 },
            ],
            gap: g(2, ["tree branches", "branches", "the branches of a tree", "branches of a tree"], [
              "branches of a tree",
            ]),
          },
        ],
        benefits: [
          {
            segments: [
              {
                type: "text",
                text: "gather incoming information from other cells",
              },
            ],
          },
        ],
      },
      {
        category: "",
        categoryGap: g(3, ["axon", "the axon", "an axon", "Axon"], ["axon"]),
        relatedParagraphIndex: 2,
        predictPrompt: "The third part — output. How many?",
        advice: [
          {
            segments: [
              { type: "text", text: "size varies; covered in " },
              { type: "gap", id: 4, maxWords: 2 },
            ],
            gap: g(4, ["myelin", "myelin sheath", "a myelin sheath"], [
              "myelin",
            ]),
          },
        ],
        benefits: [
          {
            segments: [
              {
                type: "text",
                text: "depends on distance needed to travel; helps increase range and speed of signals (up to potential of ",
              },
              { type: "gap", id: 5, maxWords: 2 },
              { type: "text", text: " per second)" },
            ],
            gap: g(5, ["120 metres", "120 meters"], ["120 metres"]),
          },
        ],
      },
    ],
  },
  discussion: {
    instruction: "4 Work in pairs and discuss the questions.",
    timeSecPerQuestion: 120,
    questions: [
      "What differences are there between male and female brains, and between teenage and adult brains?",
      "What activities help keep the brain functioning well?",
      "Which brain functions are most important at different ages: memory, cognitive ability, motor skills, emotional intelligence?",
    ],
  },
};
