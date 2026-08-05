import leadInImg from "../assets/practice-writing-test4-elderly.png";

/** Practice Writing Test 4 — Task 2 problem–solution (technology & the elderly). */

export const practiceWritingTest4 = {
  id: "practice-writing-4",
  title: "Practice Test 4",
  subtitle: "Technology & the elderly · Problem–solution Task 2",

  leadIn: {
    title: "Lead-in",
    image: leadInImg,
    imageAlt: "Elderly woman smiling and waving at a laptop outdoors",
    discussInstruction: "1 Work in pairs and discuss the questions.",
    discussQuestions: [
      "Do you know any elderly people who use social media to keep in touch with friends? If so, what do they use? Otherwise, how do they stay in touch with friends and relatives?",
      "What kind of problems do older people encounter using social media?",
      "Have you ever helped an elderly person with technology? What happened and why did they need help?",
    ],
  },

  taskPreview: {
    title: "Writing Task 2",
    timeLabel: "You should spend about 40 minutes on this task.",
    prompt:
      "In many countries, there is a growing gap between the technical skills of younger people and those over the age of 50. What problems does this cause, and what solutions could minimise the problems?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
    keywords: [
      "technical skills",
      "younger people",
      "over the age of 50",
      "problems",
      "solutions",
      "minimise",
    ],
  },

  recommend: {
    title: "Language of recommendation",
    instruction:
      "2 Look at these useful stems for recommending solutions. You will use them later.",
    stems: [
      {
        stem: "One possible solution would be to…",
        tip: "followed by a base verb phrase",
      },
      {
        stem: "Some people believe that the most effective answer is to…",
        tip: "followed by a base verb phrase",
      },
      {
        stem: "Politicians have put forward several possible solutions. Chief among these is…",
        tip: "followed by a noun phrase or gerund",
      },
      {
        stem: "… is a more long-term solution.",
        tip: "sentence subject + long-term evaluation",
      },
      {
        stem: "… may only be a quick fix to the problems.",
        tip: "sentence subject + short-term evaluation",
      },
    ],
  },

  softening: {
    title: "Softening phrases",
    instruction:
      "4 Complete the text with the correct ‘softening’ phrase in the box.",
    bank: [
      "despite the problems with this solution",
      "this is a complex issue",
      "while it is true that",
    ],
    parts: [
      "Some people have suggested that we should concentrate our efforts on training young people. ",
      { gap: 1 },
      " few retired people need technical skills for work, they may suffer as services, such as banking, move online. Nationwide training schemes for older people are one possible solution. Of course, ",
      { gap: 2 },
      " and many older people may not be willing to attend or they may not be healthy enough to get to the classes. However, ",
      { gap: 3 },
      ", it offers willing people a chance to develop their skills.",
    ] as const,
    keys: {
      1: "while it is true that",
      2: "this is a complex issue",
      3: "despite the problems with this solution",
    } as Record<number, string>,
  },

  ideaTable: {
    title: "Problems and solutions",
    instruction: "5 Complete the table with the information in the box.",
    items: [
      {
        id: 1,
        text: "a good opportunity for family members to spend quality time together",
        key: "advantage",
      },
      {
        id: 2,
        text: "offer training sessions in places such as libraries",
        key: "solution",
      },
      {
        id: 3,
        text: "how are the training costs covered",
        key: "disadvantage",
      },
      {
        id: 4,
        text: "older people find it difficult to communicate with younger generations",
        key: "problem",
      },
      {
        id: 5,
        text: "not all elderly people have children or grandchildren",
        key: "disadvantage",
      },
      {
        id: 6,
        text: "older people find it difficult to get online and access relevant websites",
        key: "problem",
      },
      {
        id: 7,
        text: "encourage young family members to teach older family members",
        key: "solution",
      },
      {
        id: 8,
        text: "training can be targeted at elderly",
        key: "advantage",
      },
    ],
    categories: [
      { id: "problem", label: "Problem" },
      { id: "solution", label: "Solution" },
      { id: "advantage", label: "Advantage" },
      { id: "disadvantage", label: "Disadvantage" },
    ],
    /** Teacher book chains (for tip after check) */
    chains: [
      {
        problem: 4,
        solution: 2,
        advantage: 8,
        disadvantage: 3,
      },
      {
        problem: 6,
        solution: 7,
        advantage: 1,
        disadvantage: 5,
      },
    ],
  },

  miniParagraph: {
    title: "Build a paragraph",
    instruction:
      "7 Choose one of the problems in Activity 5 and write a paragraph connecting the problem, solution, advantage and disadvantage. Write between 50–70 words.",
    sampleLabel: "Sample paragraph",
    sampleAnswer:
      "Older people often find it difficult to get online and access relevant websites. One possible solution to this problem would be to offer training sessions in places that older people already use, such as libraries. An important factor would be to make sure that the training provided was targeted with a key aim of boosting their confidence. A potential problem might be covering the cost of providing such training.",
    minWords: 50,
    maxWordsHint: 70,
  },

  plan: {
    title: "Plan the full essay",
    instruction:
      "8 Look back at the task and make notes in the table to help you plan your essay.",
    columns: ["Problem", "Solution", "Advantage", "Disadvantage"] as const,
    sampleRows: [
      {
        problem:
          "Older people find it difficult to communicate with younger generations",
        solution: "Offer training sessions in places such as libraries",
        advantage: "Training can be targeted at the elderly",
        disadvantage: "How are the training costs covered?",
      },
      {
        problem:
          "Older people find it difficult to get online and access relevant websites",
        solution:
          "Encourage young family members to teach older family members",
        advantage:
          "A good opportunity for family members to spend quality time together",
        disadvantage:
          "Not all elderly people have children or grandchildren",
      },
    ],
  },

  writeTask: {
    title: "Writing Task 2 · Problem–solution",
    timeLabel: "You should spend about 40 minutes on this task.",
    prompt:
      "In many countries, there is a growing gap between the technical skills of younger people and those over the age of 50. What problems does this cause, and what solutions could minimise the problems?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
    timeSec: 2400,
    minWords: 250,
    structure: [
      {
        label: "1 · Introduction",
        tip: "Background + problems exist + solutions exist (thesis).",
        starter:
          "In recent years advances in technology have been increasingly rapid, and while young people enjoy using technology and social media, for older generations these can be overwhelming. Although problems have arisen as a result, there may be solutions.",
      },
      {
        label: "2 · Problems",
        tip: "Workplace disadvantage + everyday digital tasks.",
        starter:
          "The use of technology in the workplace can lead to serious issues. When jobs require technical skills, older people can find themselves at a disadvantage and may be overlooked for promotion. Secondly, everyday tasks such as paying bills are becoming increasingly automated, so elderly people may struggle with day-to-day chores.",
      },
      {
        label: "3 · Solutions",
        tip: "Government training + employer training (use recommendation language).",
        starter:
          "It is important that action is taken in order to minimise the generation gap in technology. One way of doing this is through government-funded technology training for people over a certain age. Similarly, companies could be required to offer training in the technology employees need for their jobs.",
      },
      {
        label: "4 · Conclusion",
        tip: "Softened evaluation — training helps but is often short-term.",
        starter:
          "Unfortunately, while it is true that additional training can help bridge this gap, it is probably only a short-term solution to what is a complex issue. Finding solutions that produce a long-term answer is a challenge we are likely to face for a considerable time.",
      },
    ],
    checklist: [
      "Introduction paraphrases the gap + outlines problems/solutions",
      "Clear problems with explanation",
      "Clear solutions with recommendation language",
      "Softening / evaluation (complex issue, short-term vs long-term)",
      "Conclusion summarises without new ideas",
      "Around 250+ words",
    ],
    sampleAnswer:
      "In recent years advances in technology have been increasingly rapid, and while young people enjoy using technology and social media, for older generations these can be overwhelming. Although problems have arisen as a result, there may be solutions.\n\nThe use of technology in the workplace can lead to serious issues. When jobs require technical skills and know-how, older people can find themselves at a disadvantage. Employers now expect workers to have these skills. This can mean that they are overlooked for promotion or struggle to cope with the demands of their job. Secondly, everyday tasks such as paying bills are becoming increasingly automated, often at the cost of more traditional practices. The result is that elderly people are becoming increasingly unable to cope with day-to-day chores.\n\nIt’s important that action is taken in order to minimise the ever widening generation gap in technology. One way of doing this is through government funded technology training for people over a certain age or in areas of technology that have now become entrenched in our everyday lives. Similarly, a way to combat the workplace skills deficit in older people would be to lobby the government to make it compulsory for companies to offer training in all aspects of the technology which its employees require to carry out their jobs.\n\nUnfortunately, while it is true that additional training can help bridge this gap, it is probably only a short-term solution to what, after all, is a complex issue. In all likelihood soon after people have been trained in using one form of technology, it will have been replaced with something more technologically advanced. Finding solutions that are going to produce a long-term answer is a challenge that we are likely to face for a considerable time.",
  },
};

export type PracticeWritingTest4 = typeof practiceWritingTest4;
