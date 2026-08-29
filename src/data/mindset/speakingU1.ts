export const MS_U1_SPEAK_STEPS = [
  "Speaking quiz",
  "Part 1",
  "Part 2",
  "Part 3",
  "Future phrases",
  "Exam practice",
] as const;

export const MS_U1_SPEAK_NEXT = [
  "Part 1 →",
  "Part 2 →",
  "Part 3 →",
  "Future phrases →",
  "Exam →",
  "← Back to unit",
] as const;

export const speakingU1 = {
  id: "ms-u1-speaking-flow",
  bookPages: "pp. 25–28",
  sectionTitle: "Speaking · Parts 1–3 · Urban & rural",
  unitGoals: [
    "understand the structure and criteria of the Speaking test",
    "answer Part 1–3 questions on urban and rural life",
    "use future time phrases accurately",
  ],

  quiz: {
    badge: "1",
    instruction:
      "Complete this IELTS Speaking test quiz. Then compare your answers with a partner.",
    items: [
      {
        id: "1",
        stem: "How long does the full Speaking test last?",
        options: [
          { id: "A", text: "8–10 minutes" },
          { id: "B", text: "11–14 minutes" },
          { id: "C", text: "17–20 minutes" },
        ],
        key: "B",
      },
      {
        id: "2",
        stem: "Which part of the test is a two-way discussion with the examiner about abstract issues and ideas?",
        options: [
          { id: "A", text: "Part 1" },
          { id: "B", text: "Part 2" },
          { id: "C", text: "Part 3" },
        ],
        key: "C",
      },
      {
        id: "3",
        stem: "The assessment criteria Fluency and Coherence relates to",
        options: [
          { id: "A", text: "the range of vocabulary you use." },
          { id: "B", text: "grammatical structures and accuracy." },
          {
            id: "C",
            text: "the flow of your speech and how you connect your ideas.",
          },
        ],
        key: "C",
      },
      {
        id: "4",
        stem: "Which part of the test is known as the 'Long Turn'?",
        options: [
          { id: "A", text: "Part 1" },
          { id: "B", text: "Part 2" },
          { id: "C", text: "Part 3" },
        ],
        key: "B",
      },
      {
        id: "5",
        stem: "Which parts of the test are linked by topic/theme?",
        options: [
          { id: "A", text: "Part 1 and Part 3" },
          { id: "B", text: "Part 1 and Part 2" },
          { id: "C", text: "Part 2 and Part 3" },
        ],
        key: "C",
      },
      {
        id: "6",
        stem: "In the assessment Criteria, what is indicated by GRA?",
        options: [
          { id: "A", text: "Grammar Rules and Application" },
          { id: "B", text: "Grammatical Rules and Accuracy" },
          { id: "C", text: "Grammatical Range and Accuracy" },
        ],
        key: "C",
      },
      {
        id: "7",
        stem: "Describe the focus of the questions in Part 1.",
        options: [
          {
            id: "A",
            text: "Simple general questions, familiar topics, personal focus",
          },
          {
            id: "B",
            text: "More complex questions based on one topic only, personal focus",
          },
          {
            id: "C",
            text: "More complex questions based on one topic only, impersonal focus",
          },
        ],
        key: "A",
      },
      {
        id: "8",
        stem: "How long do you get to prepare your answer in Speaking Part 2?",
        options: [
          { id: "A", text: "1 minute" },
          { id: "B", text: "30 seconds" },
          { id: "C", text: "45 seconds" },
        ],
        key: "A",
      },
    ],
    discuss:
      "Discuss with a partner what you find easy/difficult about each part of the Speaking test and why.",
  },

  part1: {
    badge: "SPEAKING TEST – PART 1",
    instruction:
      "Read the questions. Which ones would probably NOT be asked in Part 1 of the Speaking test?",
    tip: "Part 1 questions focus on general familiar topics that reflect your everyday life, rather than complex or abstract questions.",
    tip2:
      "Never memorise complete answers to questions before the exam. It is normally obvious to examiners when a candidate does this and it may affect your score.",
    questions: [
      { id: "1", text: "Do you live in a house or an apartment?", notAsked: false },
      {
        id: "2",
        text: "If you could choose any country to visit, where would you go?",
        notAsked: true,
      },
      {
        id: "3",
        text: "What are the main issues affecting life in your town?",
        notAsked: true,
      },
      {
        id: "4",
        text: "What do you like about the area where you live?",
        notAsked: false,
      },
      {
        id: "5",
        text: "How might overpopulation affect city life in the future?",
        notAsked: true,
      },
      {
        id: "6",
        text: "How often do you use public transport in your town/city?",
        notAsked: false,
      },
      {
        id: "7",
        text: "Why is it important to look after places of natural beauty?",
        notAsked: true,
      },
      {
        id: "8",
        text: "Do you often visit parks in your town/city?",
        notAsked: false,
      },
    ],
    notAskedKeys: ["2", "3", "5", "7"],
    weakAnswers: {
      badge: "4",
      instruction:
        "Listen to three candidates answering three of the questions in exercise 3. For each question, what does the candidate do wrong? (Answer key notes below.)",
      notes: [
        {
          id: "1",
          text: "Question 1: The candidate repeats the word 'apartment' several times. She could improve this by using reference words like 'it' and 'one', and the flow of her answer would improve (along with her score for Fluency and Coherence).",
        },
        {
          id: "2",
          text: "Question 2: The language used is very good, but it doesn't answer the question. It is highly likely to be a memorised answer, which should be avoided completely – the vocabulary is not relevant to the topic at all. This limits the score for both Fluency and Coherence and Lexical Resource.",
        },
        {
          id: "3",
          text: "Question 3: There are several problems with the grammar used; these would limit the score the candidate might get for Grammatical Range and Accuracy.",
        },
      ],
      advice: [
        "Aim to show a variety of verb forms and grammar structures – but they must be correct if you want a high score.",
        "Vary your vocabulary. Use synonyms and paraphrase to express your ideas using different words.",
      ],
    },
  },

  part2: {
    badge: "SPEAKING TEST – PART 2",
    instruction:
      "Which Part 2 task card is an accurate example of what you would be given in the IELTS test?",
    tip: "When answering the Part 2 question, you do not need to try and give equal time to each of the four prompts. Some prompts will be easier to expand on than others.",
    cards: [
      {
        id: "A",
        text: `Describe a rural town that you plan to visit in the future.

You should say:
• where the town is
• when you would like to go
• who you would go with
and explain what you would like to do there.`,
      },
      {
        id: "B",
        text: `Describe this town in a rural area.
State whether you would like to go there and why.`,
      },
      {
        id: "C",
        text: `Describe a town in a rural area that you plan to visit in the future.

You should say:
• how far it is from your home
• when you plan to go
• why it is important for people to spend time in places like this
and explain what is being done to maintain it as an area of outstanding natural beauty.`,
      },
    ],
    key: "A",
    listenNote:
      "Listen to an answer to the task card in exercise 5. Does the candidate cover all the prompts in equal detail? What effect would this have on his score?",
    listenTip:
      "This candidate talked about all four points, exploring three of them in some detail. He used a good range of vocabulary and grammar; the organisation of the answer was also very good indeed, and the long turn flowed naturally from one idea to the next. It is not important that he spoke about the third prompt only very briefly, as he clearly had decided to spend more time on the points he felt he could expand on more easily, and in more detail.",
  },

  part3: {
    badge: "SPEAKING TEST – PART 3",
    matchInstruction:
      "Listen to a candidate giving good answers to Part 3 questions. For each answer (1–5), choose the corresponding question (A–E), and write the letter. (Keys only — no audio.)",
    answers: ["1", "2", "3", "4", "5"],
    questions: [
      {
        id: "A",
        text: "If private cars were completely banned from the most overcrowded cities, what might happen?",
      },
      {
        id: "B",
        text: "How was family life different before transport links connected most towns and cities?",
      },
      {
        id: "C",
        text: "Which is preferable, living on the top floor of a studio apartment block in a city, or in a beautiful house in the middle of the countryside?",
      },
      {
        id: "D",
        text: "Why do people decide to move from the city to the countryside?",
      },
      {
        id: "E",
        text: "How might overpopulation affect city life in the future?",
      },
    ],
    matchKeys: {
      "1": "D",
      "2": "E",
      "3": "A",
      "4": "C",
      "5": "B",
    } as Record<string, string>,
    functionInstruction:
      "Read questions A–E again. What was each question asking the candidate to do? Discuss with a partner and choose from the list of 'functions' below.",
    tip: "Thinking about the function of the question being asked will help you to develop your answer and decide what language and structures to use.",
    functions: [
      { id: "i", text: "Make a prediction" },
      { id: "ii", text: "Compare and contrast" },
      { id: "iii", text: "Consider a hypothetical situation" },
      { id: "iv", text: "Suggest cause and effect" },
      { id: "v", text: "Analyse past and present" },
    ],
    functionKeys: {
      A: "iii",
      B: "v",
      C: "ii",
      D: "iv",
      E: "i",
    } as Record<string, string>,
    criteriaInstruction:
      "Read these comments on the candidate's performance. Write the correct marking criteria they correspond to: Fluency and Coherence (FC); Lexical Resource (LR); Grammatical Range and Accuracy (GRA); Pronunciation (P).",
    criteriaBank: ["FC", "LR", "GRA", "P"],
    criteria: [
      {
        id: "1",
        text: "Uses stress and intonation appropriately, e.g. NOT just NAtionally, but INternationally.",
        key: "P",
      },
      {
        id: "2",
        text: "Uses a good range of more advanced structures naturally, e.g. … if you were just visiting the city, it probably wouldn't bother you … / That might sound ridiculous now, but cities are likely to keep expanding at the rate they are currently …",
        key: "GRA",
      },
      {
        id: "3",
        text: "Speaks fluently with very rare hesitation or repetition.",
        key: "FC",
      },
      {
        id: "4",
        text: "Avoids making grammatical mistakes.",
        key: "GRA",
      },
      {
        id: "5",
        text: "Uses varied vocabulary that is relevant to the topics discussed.",
        key: "LR",
      },
      {
        id: "6",
        text: "Develops the topics fully and appropriately; supplies answers of an appropriate length.",
        key: "FC",
      },
      {
        id: "7",
        text: "Every answer can be understood very easily.",
        key: "P",
      },
      {
        id: "8",
        text: "Uses less common vocabulary, including collocation and idiomatic phrases, e.g. the bright lights of the big city / traditional family unit / it's too over the top for some.",
        key: "LR",
      },
      {
        id: "9",
        text: "Uses appropriate phrases to introduce and connect ideas, e.g. Generally speaking, though … / Having said that …",
        key: "FC",
      },
    ],
  },

  future: {
    badge: "11",
    instruction:
      "In the Part 1 section earlier, the candidate gave a weak answer which would not score highly for GRA. It included the sentence below. Why is this incorrect?",
    wrong: "As soon as we will finish class, we will go.",
    wrongTip:
      "The grammar is incorrect: As soon as we will finish class, we will go. This is the grammatical structure often known as the first conditional (If + present tense, will + bare infinitive) but with As soon as instead of If.",
    badge12: "12",
    instruction12:
      "In the Part 3 section you listened to in exercise 7, the candidate gave strong answers which would score well for GRA, and included the sentences below. Complete the sentences with the correct future time phrases from the box.",
    bank: [
      "As long as",
      "As soon as",
      "By the time",
      "Providing that",
      "Unless",
    ],
    gaps: [
      {
        id: "A",
        before: "",
        after:
          " people are happy to use buses and bikes instead of their cars, life will continue as normal.",
        key: "As long as",
      },
      {
        id: "B",
        before: "",
        after: " I'm a grandparent, I think it will be even more different.",
        key: "By the time",
      },
      {
        id: "C",
        before: "",
        after:
          " I make enough money, I'll definitely be on a top floor myself one day.",
        key: "Providing that",
      },
      {
        id: "D",
        before: "",
        after:
          " you get older and have a family, you start thinking it's time to move.",
        key: "As soon as",
      },
      {
        id: "E",
        before: "",
        after:
          " this changes, we're going to need more and more homes for everyone.",
        key: "Unless",
      },
    ],
    discuss: [
      "What happens to the meaning of sentence E if you use Once?",
      "What happens to the meaning of the sentences A and C if you use When?",
      "In which sentence is the grammar different from the others? Why does the speaker decide to use this structure here?",
    ],
    discussTips: [
      "Unless suggests that the speaker sees the changes as completely necessary, but they doubt whether the changes will ever happen. On the other hand, Once suggests that the speaker sees the changes as certain to happen, with a natural result (which they give).",
      "When suggests the speaker believes that people will definitely, at some point, be happy to use buses and bikes instead of their cars (A), and that she will definitely, at some point, make enough money to buy a top-floor flat (C). As long as and Provided that both suggest that the speaker is not convinced that the result given in each case is definite.",
      "Sentence D is different. The speaker is not thinking about the future in particular, but is stating something as a constant fact (in their opinion). The structure is a zero conditional (present simple / present simple), whereas the other sentences use the first conditional (present simple / will + bare infinitive).",
    ],
  },

  exam: {
    badge: "EXAM SKILLS",
    part1: {
      instruction:
        "Think about how you would answer these Part 1 questions. Then ask and answer them with a partner.",
      questions: [
        "In your city, what do you usually do at the weekend?",
        "When you were last in the countryside, who did you go with? Why?",
        "In the town or city you live in now, what are your favourite pastimes?",
      ],
    },
    part2: {
      instruction:
        "Read the Task 2 card. Then practise making notes for one minute, and deliver your long turn to a partner.",
      card: `Describe a city where you have lived in the past.

You should say:
• where the city was
• why you were living there
• how long you lived there for
and explain what you liked and disliked about living there.`,
    },
    part3: {
      instruction: "Ask and answer the Part 3 questions with a partner.",
      questions: [
        "Do you think that within the next 100 years we will be trying to build new cities on other planets?",
        "What would happen if the government put limits on how many people were allowed to live in big cities?",
        "Today, many young people move away from smaller towns to big cities. What effect does this have on these small towns?",
      ],
    },
  },
};
