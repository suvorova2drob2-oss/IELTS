export const WRITE_M8A_STEPS = [
  "1 Quote",
  "2a–2c Arguments",
  "3 Linking check",
  "4a–4c Plan + write",
] as const;

export const WRITE_M8A_NEXT = [
  "2a–2c Arguments →",
  "3 Linking →",
  "4 Plan + write →",
  "← К модулю",
] as const;

export const writingM8a = {
  id: "writing-m8a-flow",
  bookPages: "p. 126 in your coursebook",
  sectionTitle: "Writing · Task 2 (situation, cause and effect)",
  expertWriting: "EXPERT WRITING page 198",
  quote1: {
    badge: "1",
    heading: "Lead-in",
    instruction:
      "Discuss the quote: crime is ‘everybody’s business’. How far do you agree?",
    tip: "The quote suggests that we are all responsible for preventing crime — from improving societal conditions so that people don’t commit crime, to the fact that wider society suffers the effects.",
  },
  arguments2: {
    badge: "2a",
    instruction:
      "Discuss for and against arguments for each idea: personality; environment; society is responsible; governments are responsible.",
    tips: [
      "Personality FOR: criminals may be more selfish, risk-taking. AGAINST: desperation, self-defence also matter.",
      "Environmental FOR: poverty/desperation. AGAINST: white-collar criminals with positive environments.",
      "Society FOR: inclusion and enough money/food/shelter. AGAINST: individual responsibility.",
      "Governments FOR: rules and deterrents; provide for citizens. AGAINST: cannot control all individual choices.",
    ],
    text2b: {
      badge: "b",
      instruction:
        "Read the model paragraph. What does it contrast?",
      tip: "Contrasts the ‘fors’ and ‘againsts’ of society being responsible for crime prevention.",
    },
    stages2c: {
      badge: "c",
      instruction:
        "Put the stages of the paragraph in order (one stage is used twice).",
      stages: [
        { id: "A", label: "reason / support" },
        { id: "B", label: "topic / main idea" },
        { id: "C", label: "example" },
        { id: "D", label: "evaluation / contrast" },
      ],
      key: ["B", "A", "C", "A", "D"],
    },
  },
  linking3: {
    badge: "3",
    instruction:
      "Decide if each sentence uses the linker correctly. If incorrect, correct it.",
    items: [
      {
        id: 1,
        text: "Although living conditions matter, punishment still deters some offenders.",
        verdict: "Correct",
        tip: "Correct.",
      },
      {
        id: 2,
        text: "Rehabilitation programmes help many people. Conversely, living conditions also matter.",
        verdict: "Incorrect",
        tip: "Incorrect – conversely should only be used for a direct contrast. E.g. Conversely, some people who undertake these programmes still commit more crimes.",
      },
      {
        id: 3,
        text: "Whereas only a minority of them commit crimes, many people live in poverty.",
        verdict: "Incorrect",
        tip: "Incorrect – whereas must be placed between the two ideas. Many people live in poverty, whereas only a minority of them commit crimes.",
      },
      {
        id: 4,
        text: "Despite knowing their actions are illegal, some white-collar criminals still offend.",
        verdict: "Correct",
        tip: "Correct.",
      },
    ],
  },
  write4: {
    badge: "4",
    heading: "Write your opinion essay",
    analyse4a: {
      badge: "4a",
      instruction:
        "Look at the introduction. Note topic sentences, thesis and outline of reasons. How many further paragraphs follow?",
      tip: "Introduction: topic + thesis + outline. Then three further paragraphs: individuals of varying circumstances; a world without punishment; conclusion restating the thesis.",
    },
    title:
      "All citizens should do some voluntary work in their communities. Discuss the social benefits this would provide.",
    plan4b: {
      badge: "b",
      instruction: "Plan for about 5 minutes (main body + conclusion).",
      tip: "P1: people from different social groups commit crimes. P2: problems of no punishments; need to teach consequences. Conclusion: easy to criticise punishment, harder to create a viable alternative.",
    },
    write4c: {
      badge: "c",
      instruction: "Write your essay (about 35 minutes). Write at least 250 words.",
    },
    modelLabel: "Model answer",
    modelAnswer: `Voluntary work is an activity which many people undertake all around the world. It constitutes the selfless act of giving up one’s time to help people in less fortunate situations. It has been suggested that all citizens should take some time to do some voluntary work in their communities and that this would provide considerable social benefits which will be outlined in this essay.

First of all, today’s world has become increasingly selfish and therefore volunteering to help others could serve as a way of redressing this imbalance in many modern societies. It would also give people the opportunity to get to foster better relations with those within their communities. Volunteering would, in effect, encourage individuals to view the world differently and develop a deeper understanding of the issues people face, for example homelessness, or the lack of means to pay for expensive healthcare treatments. If citizens were able to develop more compassion for others through voluntary work, society would be more likely to become more equitable in the future.

In addition, there would be an obvious economic benefit for governments. Providing welfare and care for the less advantaged in society is costly and can also be a source of disagreement among policy makers. What some people may see as a worthwhile use of public money, others consider a waste of precious resources. Encouraging citizens to take on voluntary work could reduce the drain on public finances and perhaps also encourage more people to take up a caring profession as a career.

In conclusion, engaging more citizens in voluntary work would be an excellent way of developing social understanding and reducing the cost of welfare for governments. It would also encourage greater cohesion within communities.`,
  },
};
