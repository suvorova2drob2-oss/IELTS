export const WRITE_M4B_STEPS = [
  "1 Lead-in",
  "2a Suitable opinions",
  "3 Plan table",
  "4 Intro analysis",
  "5 Write + assess",
] as const;

export const WRITE_M4B_NEXT = [
  "2a Suitable opinions →",
  "3 Plan table →",
  "4 Intro analysis →",
  "5 Write + assess →",
  "← К модулю",
] as const;

export const writingM4b = {
  id: "writing-m4b-flow",
  bookPages: "pp. 68–69 in your coursebook",
  sectionTitle: "Writing · Task 2 (opinion essay)",
  expertWriting: "EXPERT WRITING page 194",
  testStrategies: "TEST STRATEGIES page 173",
  leadIn: {
    badge: "1",
    heading: "Lead-in",
    instruction: "Work in pairs and discuss the questions.",
    questions: [
      "What brand slogans do you know? What products or companies do they advertise?",
      "Why do companies spend so much money on advertising to young people?",
      "Do you think young people spend too much on fashion and gadgets? Why/Why not?",
    ],
  },
  opinions2a: {
    badge: "2a",
    heading: "Understand the task",
    instruction:
      "Read the essay question. Which of the opinions (1–7) are suitable for this essay? Tick the suitable ones.",
    title:
      "Young people today spend too much money on fashion and gadgets. This shows that they place too much value on material possessions. To what extent do you agree or disagree?",
    items: [
      {
        id: 1,
        text: "Young people often buy fashion items and gadgets to keep up with their peers, which suggests that possessions are used as a measure of personal importance.",
        suitable: true,
      },
      {
        id: 2,
        text: "Consumer spending drives the national economy and creates jobs in manufacturing and retail.",
        suitable: false,
        why: "Does not deal with people's values; it focuses on society and economics.",
      },
      {
        id: 3,
        text: "Social media platforms encourage young users to share photos of their lifestyle online every day.",
        suitable: false,
        why: "Concentrates on social media which is outside the scope of the question.",
      },
      {
        id: 4,
        text: "Spending large amounts on brands shows that many young people judge themselves and others by what they own.",
        suitable: true,
      },
      {
        id: 5,
        text: "Some gadgets are expensive because of production costs and import taxes rather than because of fashion.",
        suitable: false,
        why: "Deals with the price of possessions, but the question asks about value in terms of personal importance.",
      },
      {
        id: 6,
        text: "Not all spending on fashion and technology is about status; some purchases are practical tools for study and work.",
        suitable: true,
      },
      {
        id: 7,
        text: "If young people prioritise the latest phone over experiences with friends, it may indicate that material possessions matter too much to them.",
        suitable: true,
      },
    ],
    suitableKeys: [1, 4, 6, 7],
    tip2b:
      "1, 4, 6 and 7 all directly relate to the specific question being asked. 2 does not deal with people's values, it focuses on society and economics. 3 concentrates on social media which is outside the scope of the question and 5 deals with the price of possessions, but the question asks about value in terms of personal importance.",
  },
  plan3: {
    badge: "3",
    instruction:
      "Complete the planning table with ideas and supporting arguments for the essay. You have about 2 minutes.",
    columns: ["Ideas", "Supporting arguments"],
    suggestedRows: [
      {
        idea: "Consumerism puts unnecessary demands on some people.",
        support:
          "Children want to have similar products as their peers in order to fit in to the group; poorer people may feel inadequate if they cannot afford to buy new products.",
      },
      {
        idea: "Consumerism instils aspiration in many people.",
        support:
          "It is good for society to have people who desire more as this drives them to be creative and hard-working. It also drives the economy.",
      },
      {
        idea: "Consumerism leads to people accumulating too many possessions.",
        support:
          "Often people buy things without thinking whether they genuinely need or want them. Many of these items may be quickly forgotten about and take up valuable storage space in people's houses.",
      },
    ],
  },
  intro4: {
    heading: "Introductory sentences",
    descriptors4a: {
      badge: "4a",
      instruction:
        "Look at the descriptors for Task 2 on page 190. Discuss what examiners look for in an introduction.",
    },
    tick4b: {
      badge: "4b",
      instruction:
        "Which of the following are typically useful in a Task 2 introduction? Tick all that apply.",
      items: [
        {
          id: 1,
          text: "A clear response to the question / opinion",
          key: true,
        },
        {
          id: 2,
          text: "A brief outline of what the essay will discuss",
          key: true,
        },
        {
          id: 3,
          text: "Detailed examples with statistics",
          key: false,
        },
        {
          id: 4,
          text: "Paraphrase of the topic in the question",
          key: true,
        },
        {
          id: 5,
          text: "A statement of your position",
          key: true,
        },
      ],
      keys: [1, 2, 4, 5],
    },
    analyse5a: {
      badge: "5a",
      instruction:
        "Read the introductory sentences. Does each one answer the question or describe the essay structure?",
      items: [
        {
          id: 1,
          text: "From my point of view, I firmly believe that young people do not spend unnecessarily on fashion and gadgets.",
          key: "Answers the question",
        },
        {
          id: 2,
          text: "This essay will discuss the reasons why spending on fashion and technology can be beneficial for society.",
          key: "Describes the essay structure",
        },
        {
          id: 3,
          text: "Employment created by fashion brands and the practical value of gadgets will be outlined below.",
          key: "Describes the essay structure",
        },
      ],
    },
    phrases5b: {
      badge: "5b",
      instruction: "Note useful phrases for each function.",
      opinion: "From my point of view, I firmly believe …",
      structure: "I will discuss …, X will be outlined.",
    },
  },
  write6: {
    badge: "6",
    heading: "Write your opinion essay",
    planA: {
      badge: "6a",
      instruction: "Make a brief plan (about 2 minutes).",
      suggested: {
        answer:
          "It is not bad that young people spend money on fashion and gadgets.",
        reasons: [
          {
            reason: "Provides employment.",
            support:
              "Not only for bosses, but also for workers; wages are necessary to live.",
          },
          {
            reason: "Some possessions are necessary.",
            support:
              "Can make people feel good and help people in their daily lives, for example, mobile phones.",
          },
        ],
      },
    },
    writeB: {
      badge: "6b",
      instruction: "Write your essay. Write at least 250 words (about 40 minutes).",
      title:
        "Young people today spend too much money on fashion and gadgets. This shows that they place too much value on material possessions. To what extent do you agree or disagree?",
    },
    modelLabel: "Model answer",
    modelAnswer: `Consumerism is a growing part of life in many modern countries. It cannot be denied that people, especially younger people, spend a considerable amount of money on fashion brands and electronic gadgets as a part of this consumerism. However, this is not necessarily a negative action. This essay will explore how this kind of consumerism is necessary and beneficial for society by evaluating how such purchasing creates employment and enriches lives.

Firstly, expensive fashion brands and electronic gadgetry provide employment for many people. For example, fashion brands not only make the designer rich, they also provide an income for people who make the garments, people who ship the garments and those who work in the shops that sell the garments, which might even include young people if they have a part-time job. This kind of job creation is an essential part of life and provides an income to enable people to feed their families or pay for their studies, for example.

Secondly, while many people might consider expensive fashion and gadgets a luxury, they can sometimes be considered a necessity. Having glamorous clothes can give a sense of happiness and can even bring popularity to an individual. These are essential factors for some people. In terms of technology, some expensive gadgets are vital for individuals to perform daily tasks. One such example is the mobile phone which provides the internet and all of its associated benefits such as connecting young people and enabling them to keep in touch with friends, family and co-workers. In addition, games and internet access can educate young minds. The more recent the games and faster the devices, the easier people can use them.

For the above reasons, spending on fashion and gadgets cannot be considered unnecessary for young people. It brings us beauty, convenience, communication and education, while providing much needed jobs throughout the world.`,
  },
  assess: {
    badge: "7",
    heading: "Assess and improve",
    instruction:
      "Exchange essays with a partner and review both essays using the questions below. Then improve two areas.",
    items: [
      "Does the essay answer the question about values / material possessions?",
      "Is the writer's opinion clear in the introduction?",
      "Are the main ideas supported with explanations and examples?",
      "Does the essay follow a clear structure?",
      "Are signposting words used appropriately?",
      "Can you see grammatical, punctuation or spelling mistakes?",
    ],
  },
};
