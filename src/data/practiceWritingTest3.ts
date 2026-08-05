import leadInImg from "../assets/practice-writing-test3-airport.png";

/** Practice Writing Test 3 — Task 2 cause & effect (travel / tourism). */

export const practiceWritingTest3 = {
  id: "practice-writing-3",
  title: "Practice Test 3",
  subtitle: "Travel & tourism · Cause & effect Task 2",

  leadIn: {
    title: "Lead-in",
    image: leadInImg,
    imageAlt: "Airport scene with passenger jet and large airliner landing",
    discussInstruction: "1 Work in pairs and discuss the questions.",
    discussQuestions: [
      "What are some of the advantages and disadvantages of tourism?",
      "What are some of the advantages and disadvantages of air travel?",
      "How do you think the ways we travel will change in the future? Why?",
    ],
  },

  vocab: {
    title: "Vocabulary · Prepositions",
    instruction:
      "2 Choose the correct preposition in italics to complete the paragraph.",
    parts: [
      "I think that tourists have been responsible ",
      { gap: 1, options: ["for", "to"] },
      " a lot of damage to the environment in the past. Anyone who is serious ",
      { gap: 2, options: ["with", "about"] },
      " reducing climate change should think again about relying ",
      { gap: 3, options: ["on", "in"] },
      " air transport as it produces a huge amount of carbon dioxide. Many experts ",
      { gap: 4, options: ["for", "on"] },
      " the environment have called ",
      { gap: 5, options: ["by", "for"] },
      " a ban on unnecessary air transport if we are to succeed ",
      { gap: 6, options: ["in", "by"] },
      " bringing down global temperatures. There have been attempts to balance ",
      { gap: 7, options: ["on", "out"] },
      " the carbon produced during necessary travel by introducing tree-planting schemes, but few people actually participate ",
      { gap: 8, options: ["on", "in"] },
      " these projects. Any change is likely ",
      { gap: 9, options: ["with", "to"] },
      " be negated ",
      { gap: 10, options: ["for", "by"] },
      " the general increase ",
      { gap: 11, options: ["in", "of"] },
      " air travel.",
    ] as const,
    keys: {
      1: "for",
      2: "about",
      3: "on",
      4: "on",
      5: "for",
      6: "in",
      7: "out",
      8: "in",
      9: "to",
      10: "by",
      11: "in",
    } as Record<number, string>,
  },

  causeWords: {
    title: "Test training · Cause and effect words",
    instruction:
      "3 Underline the cause and effect words in each Task 2 question.",
    items: [
      {
        id: 1,
        text: "Air travel is likely to be the greatest cause of pollution in the future. To what extent do you agree with this statement?",
        tokens: [
          "Air",
          "travel",
          "is",
          "likely",
          "to",
          "be",
          "the",
          "greatest",
          "cause",
          "of",
          "pollution",
          "in",
          "the",
          "future.",
        ],
        keys: ["cause"],
      },
      {
        id: 2,
        text: "The way cities address transport problems now will affect their future in the next 50 years. Discuss how current developments in transport might affect the future.",
        tokens: [
          "will affect",
          "might affect",
          "address",
          "problems",
          "developments",
          "future",
        ],
        keys: ["will affect", "might affect"],
      },
      {
        id: 3,
        text: "Encouraging people to visit other countries is the best way to improve our understanding of other cultures. Do you think that travelling creates better understanding of world cultures?",
        tokens: [
          "Encouraging",
          "improve",
          "understanding",
          "travelling",
          "creates",
          "cultures",
        ],
        keys: ["improve", "creates"],
      },
      {
        id: 4,
        text: "As populations become more mobile, the idea of national borders between countries will disappear in future. To what extent do you agree with this statement?",
        tokens: [
          "As",
          "populations",
          "mobile",
          "borders",
          "will disappear",
          "future",
        ],
        keys: ["As", "will disappear"],
      },
    ],
  },

  brainstorm: {
    title: "Brainstorm",
    instruction:
      "4 Choose one question from Activity 3 and brainstorm possible positive and negative causes and effects.",
    questions: [
      "Air travel is likely to be the greatest cause of pollution in the future. To what extent do you agree with this statement?",
      "The way cities address transport problems now will affect their future in the next 50 years. Discuss how current developments in transport might affect the future.",
      "Encouraging people to visit other countries is the best way to improve our understanding of other cultures. Do you think that travelling creates better understanding of world cultures?",
      "As populations become more mobile, the idea of national borders between countries will disappear in future. To what extent do you agree with this statement?",
    ],
  },

  introMatch: {
    title: "Introduction · Which question?",
    instruction:
      "5 Look at the introduction. Which question does it answer? Tick the correct answer.",
    introSentences: [
      "Travel for business or personal reasons has become increasingly common.",
      "These days major airports deal with millions of passengers per day, rather than per year.",
      "Some argue that with more and more of us travelling, we will become more open-minded.",
      "This essay aims to assess whether travelling widely can improve understanding between people of different cultures.",
    ],
    options: [
      {
        id: 1,
        text: "Air travel is likely to be the greatest cause of pollution in the future. To what extent do you agree with this statement?",
      },
      {
        id: 2,
        text: "The way cities address transport problems now will affect their future in the next 50 years. Discuss how current developments in transport might affect the future.",
      },
      {
        id: 3,
        text: "Encouraging people to visit other countries is the best way to improve our understanding of other cultures. Do you think that travelling creates better understanding of world cultures?",
      },
      {
        id: 4,
        text: "As populations become more mobile, the idea of national borders between countries will disappear in future. To what extent do you agree with this statement?",
      },
    ],
    key: 3,
  },

  introParts: {
    title: "Introduction · Sentence roles",
    instruction:
      "6 Match the four sentences to the descriptions.",
    sentences: [
      {
        id: "A",
        text: "Thesis statement (one sentence that states the purpose of the essay clearly)",
      },
      { id: "B", text: "General background to the topic" },
      { id: "C", text: "Related fact" },
      { id: "D", text: "Re-stating the question in different words" },
    ],
    roles: [
      { id: "1", label: "Sentence 1" },
      { id: "2", label: "Sentence 2" },
      { id: "3", label: "Sentence 3" },
      { id: "4", label: "Sentence 4" },
    ],
    /** A→4, B→1, C→2, D→3 */
    keys: { A: "4", B: "1", C: "2", D: "3" } as Record<string, string>,
    introSentences: [
      "1 Travel for business or personal reasons has become increasingly common.",
      "2 These days major airports deal with millions of passengers per day, rather than per year.",
      "3 Some argue that with more and more of us travelling, we will become more open-minded.",
      "4 This essay aims to assess whether travelling widely can improve understanding between people of different cultures.",
    ],
  },

  thesisMatch: {
    title: "Match thesis openings",
    instruction:
      "7 Match the statements (A–C) with the remaining essay questions in Activity 3.",
    statements: [
      {
        id: "A",
        text: "Although people are introducing measures to limit the effect of pollution in the airline industry, these are unlikely to have a positive effect.",
      },
      {
        id: "B",
        text: "There is already integration of race and culture throughout the world.",
      },
      {
        id: "C",
        text: "A city's economy depends on a mobile workforce, so the way it manages transport is crucial over the coming decade.",
      },
    ],
    questions: [
      { id: "1", short: "Q1 · Air travel / pollution" },
      { id: "2", short: "Q2 · Cities / transport future" },
      { id: "4", short: "Q4 · Borders disappear" },
    ],
    /** A→1, B→4, C→2 */
    keys: { A: "1", B: "4", C: "2" } as Record<string, string>,
  },

  essayPlan: {
    title: "Plan a cause & effect essay",
    instruction:
      "8 Work in pairs. Discuss the questions, then make a brief plan.",
    questions: [
      "How many paragraphs would you expect the writer to use in a cause and effect essay?",
      "What should be the focus of each of those paragraphs?",
      "What evidence might the writer use? (e.g. personal experience, examples)",
      "What conclusion is the writer likely to reach? (e.g. persuading the reader to take certain action, suggesting there are no clear answers to the question)",
    ],
    sampleAnswers: [
      "Typically 4 paragraphs: introduction → positive effect(s) → negative effect(s) → conclusion.",
      "Intro: background + thesis. Body paragraphs: clear cause → effect with examples. Conclusion: balanced summary.",
      "Evidence: jobs, tourist spending, rising prices, holiday homes, personal experience if relevant.",
      "A balanced “mixed bag” conclusion — tourism can be both positive and negative for communities.",
    ],
  },

  writeTask: {
    title: "Writing Task 2 · Cause and effect",
    timeLabel: "You should spend about 40 minutes on this task.",
    prompt:
      "Tourism is an important industry which has developed the economies of countries in many parts of the world. What effect has tourism had on local communities?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
    timeSec: 2400,
    minWords: 250,
    structure: [
      {
        label: "1 · Introduction",
        tip: "Background → both sides briefly → thesis (effects on communities).",
        starter:
          "Around the world tourism is big business, employing millions of people in hotels, resorts, restaurants and airports. For these people tourism is beneficial but for many people tourism is not always positive. In this essay we will look at some of the effects that tourism has had on local communities.",
      },
      {
        label: "2 · Positive effects",
        tip: "Jobs / money staying in the local economy.",
        starter:
          "Over the past 30 years or so there has been a big upsurge in people travelling to exotic destinations. For local people this has meant the opportunity to earn a living in their community, and money spent by tourists benefits the local economy.",
      },
      {
        label: "3 · Negative effects",
        tip: "Higher prices, housing / holiday homes, community change.",
        starter:
          "However, while earnings have increased so have the prices of goods and services. Because tourists can often afford to pay more, young people may struggle to rent or buy homes, and seasonal holiday homes can leave places empty for long periods.",
      },
      {
        label: "4 · Conclusion",
        tip: "Balanced summary — mixed positive and negative effects.",
        starter:
          "Finally, the impact of tourism on local communities is a mixed bag. Looking at the financial impact alone, the issues are complex and even for one individual the consequences can be both positive and negative.",
      },
    ],
    checklist: [
      "Clear introduction with thesis",
      "At least one positive effect with explanation",
      "At least one negative effect with explanation",
      "Cause → effect language (because, means that, as a result…)",
      "Conclusion that summarises both sides",
      "Around 250+ words",
    ],
    sampleAnswer:
      "Around the world tourism is big business, employing millions of people in hotels, resorts, restaurants and airports. For these people tourism is beneficial but for many people tourism is not always positive. In this essay we will look at some of the effects that tourism has had on local communities.\n\nOver the past 30 years or so there has been a big upsurge in people travelling to exotic destinations, from sun-drenched beaches to remote rainforest retreats. For the people living in these areas this has meant the opportunity to earn a living in their local community, rather than moving to large cities looking for work. The money spent by tourists on everything from food and accommodation to tourist guides is money that would otherwise not have benefitted the local economy or the people who live there.\n\nHowever, while earnings have increased so have the prices of goods and services in these communities. Because tourists often have a lot of money, and can afford to pay more, prices have inevitably increased. In some communities young people are finding it more difficult to buy or rent a place to live and are often forced to live with their parents. In some communities where tourism exists, many properties have become holiday homes. Where tourism is seasonal this means that many places are left empty for large periods of the year, changing the dynamic of the community.\n\nFinally, as with many things in modern life, the impact of tourism on local communities is a mixed bag. Looking at just one aspect of tourism, the financial impact, it is clear that the issues are quite complex and even for one individual the consequences can be both positive and negative.",
  },
};

export type PracticeWritingTest3 = typeof practiceWritingTest3;
