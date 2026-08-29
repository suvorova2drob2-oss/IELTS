export const WRITE_M4A_STEPS = [
  "1 Cartoon",
  "2 Order paras",
  "3 Analyse",
  "4 Plan + write",
] as const;

export const WRITE_M4A_NEXT = [
  "2 Order paras →",
  "3 Analyse →",
  "4 Plan + write →",
  "← К модулю",
] as const;

export const writingM4a = {
  id: "writing-m4a-flow",
  bookPages: "p. 62 in your coursebook",
  sectionTitle: "Writing · Task 2 (opinion essay)",
  expertWriting: "EXPERT WRITING page 194",
  testStrategies: "TEST STRATEGIES page 173",
  cartoon: {
    badge: "1",
    heading: "Lead-in",
    instruction:
      "Look at the cartoon. What is the joke? Then discuss the questions in small groups.",
    jokeTip:
      "The joke is that the government spends a lot of time and resources creating plans to reduce the use of resources and the man is recycling the plans for recycling projects, which is ironic.",
    questions: [
      "Are you pessimistic or optimistic about our attitudes towards recycling? Why?",
      "How well is recycling done in your country?",
      "How could it be improved?",
    ],
  },
  order2: {
    badge: "2",
    heading: "Give your opinion and develop your arguments",
    instruction:
      "Read the essay question and put the paragraphs (A–D) in the correct order.",
    title:
      "Some people believe that recycling is a waste of time and that we should focus on reducing the amount we consume instead. To what extent do you agree or disagree?",
    paragraphs: [
      {
        id: "A",
        text: `Recycling is an easy way for people to contribute to conserving the Earth's resources. For example, when households separate paper, glass and plastic, these materials can be processed again rather than being buried in landfill sites. As a result, fewer raw materials need to be extracted and the volume of waste is reduced. In my view, this everyday habit shows that recycling is far from a waste of time and that individuals can make a genuine difference.`,
      },
      {
        id: "B",
        text: `In conclusion, recycling should be encouraged because it helps conserve resources and, when institutions support larger schemes, its benefits increase. Although reducing consumption is also important, recycling remains a practical and worthwhile activity that society should continue to promote.`,
      },
      {
        id: "C",
        text: `In many countries today, people throw away more packaging and products than ever before, which puts pressure on the environment. Some argue that recycling is pointless and that the real solution is simply to buy less. In my view, recycling is not a waste of time and should be encouraged, even if reducing consumption is also necessary.`,
      },
      {
        id: "D",
        text: `Institutions need to help if recycling is to work on a large scale. An explanation of the importance of larger-scale recycling is that factories, schools and local councils can collect materials that individuals cannot process alone. For instance, councils that provide kerbside collection and clear labelling make it far easier for residents to recycle regularly, which multiplies the environmental benefits.`,
      },
    ],
    key: ["C", "A", "D", "B"],
  },
  analyse3: {
    badge: "3",
    instruction:
      "Answer the questions about the essay in Exercise 2.",
    items: [
      {
        id: 1,
        q: "What is the writer's opinion?",
        key: "In my view, recycling is not a waste of time and should be encouraged.",
      },
      {
        id: 2,
        q: "Which phrase introduces the writer's opinion?",
        key: "In my view",
      },
      {
        id: 3,
        q: "What is the main idea of the first body paragraph?",
        key: "Recycling is an easy way for people to contribute to conserving the Earth's resources.",
      },
      {
        id: 4,
        q: "How does the writer support this main idea?",
        key: "The paragraph includes an explanation of the main idea, an example and describes the results of the main idea.",
      },
      {
        id: 5,
        q: "What is the main idea of the second body paragraph?",
        key: "Institutions need to help",
      },
      {
        id: 6,
        q: "How is this main idea developed?",
        key: "An explanation of the importance of larger scale recycling and an example of how institutions can help.",
      },
      {
        id: 7,
        q: "Does the conclusion restate the writer's opinion?",
        key: "Yes",
      },
    ],
  },
  write4: {
    badge: "4",
    heading: "Write your opinion essay",
    planA: {
      badge: "4a",
      instruction:
        "Read the essay title. Make a brief plan of your answer (opinion, main ideas and support). Keep to about 2 minutes.",
    },
    title:
      "While recycling is one method of trying to limit the negative effects of waste, perhaps it would be more effective to focus on reducing the amount of resources used in the first place. To what extent do you agree or disagree?",
    writeB: {
      badge: "4b",
      instruction: "Write your essay. Write at least 250 words.",
    },
    modelLabel: "Model answer",
    modelAnswer: `In many parts of the world today there is considerably more waste being thrown away than in the past and this is causing an increasing number of problems for the environment. While recycling is one method of trying to limit the negative effects of waste, perhaps it would be more effective to focus on reducing the amount of resources used in the first place. This essay will argue that reducing initial consumption is far more important than recycling.

Firstly, although recycling is a positive action, limiting resources has a more beneficial effect on the environment in general. Products, whether recyclable or not, still have to be manufactured and transported, and this has a negative effect on the global environment. Additionally, not all products can be recycled so waste is still produced on a large scale. For example, items such as plastic bags and batteries remain in landfill sites for many years and pose a continuous threat to the environment and wildlife.

Secondly, a focus on limiting resources is advantageous for social awareness. If people know and take responsibility for caring about the resources around them, they are more likely to consume less and care more about the planet. As a result, this could change the way of thinking of future generations, making society more environmentally friendly and less materialistic.

In conclusion, although recycling is an admirable activity, it does not address large problems associated with the environment. In my opinion, people need to become more conscious of the resources they use and more caring towards the environment.`,
    peerC: {
      badge: "4c",
      instruction:
        "Exchange essays with a partner. Identify each other's opinions, main ideas and support.",
    },
  },
};
