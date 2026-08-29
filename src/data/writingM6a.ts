export const WRITE_M6A_STEPS = [
  "1 Quote",
  "2a–2c Arguments",
  "3 Linking check",
  "4a–4c Plan + write",
] as const;

export const WRITE_M6A_NEXT = [
  "2a–2c Arguments →",
  "3 Linking →",
  "4 Plan + write →",
  "← К модулю",
] as const;

export const writingM6a = {
  id: "writing-m6a-flow",
  bookPages: "p. 94 in your coursebook",
  sectionTitle: "Writing · Task 2 (opinion essay)",
  expertWriting: "EXPERT WRITING page 196",
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
      "Some people believe that improving living conditions is more effective in preventing crime than punishment. To what extent do you agree or disagree?",
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
    modelAnswer: `Firstly, it can be argued that crime is a universal issue and not only one which affects less affluent members of society. For example, embezzlement and fraud are generally associated with white collar workers. This suggests that poverty is not always the main driver behind criminal activity. Although poorer people may commit crime in order to improve their financial situations, there may be other factors too, such as social pressure or a thrill-seeking personality. For those who commit white-collar crimes, they may see themselves as operating beyond the law, despite knowing their actions are illegal.

Taking the aforementioned points into consideration, it is clear that a punishment-free society may negatively affect the amount of crimes committed. Many people suggest that improving living conditions is the most effective way to reduce crime, but this may not be the case if the reasons for committing crime are more complex than just being related to necessity, for example. Additionally, if there were no punishments in society, it would be difficult to teach young people that their actions have consequences and this could result in an increase in criminal activity. Although some people disagree as to the effectiveness of punishment as a deterrent, the threat of punishment will most likely affect some individual’s decision to commit crimes and therefore it could be argued to be useful to some extent.

In conclusion, it is very difficult to determine whether improving living conditions would be a more effective means to preventing crime than punishment. Currently, we do not know what a punishment-free society would be like, whereas we know that punishments are effective to some extent.`,
  },
};
