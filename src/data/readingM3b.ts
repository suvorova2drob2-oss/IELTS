export const READ_M3B_STEPS = [
  "1 Before you read",
  "2 Exam task",
  "3 Task analysis",
  "4 Discussion",
] as const;

export const READ_M3B_NEXT = [
  "2 Exam task →",
  "3 Task analysis →",
  "4 Discussion →",
  "← К модулю",
] as const;

export const readingM3b = {
  id: "reading-m3b-flow",
  bookPages: "pp. 50–51 in your coursebook",
  sectionTitle: "Reading · Matching headings; Multiple choice",
  title: "A growing preoccupation",
  subtitle:
    "Eat your five-a-day, take exercise, avoid alcohol, sugar, stress. Worrying about our well-being is dominating our lives, and it's bad for us.",
  beforeYouRead: {
    badge: "1",
    heading: "Before you read",
    instruction: "Work in pairs and discuss the questions.",
    questions: [
      "Does your country have guidelines about what food you should and should not eat?",
      "To what extent do you follow these guidelines, and why?",
      "What other advice and support is available to help you look after your health? Think about regular medical checks, access to advice on improving your diet, availability of preventive medicine, exercise classes and sports clubs, etc.",
    ],
  },
  passage: [
    {
      id: "A",
      text: `Nearly every day brings with it a new health scare headline. Whether it is about the dangers of using mobile phones, sleeping too much or too little or the risks involved in consuming wheat, it seems that there is always a newspaper story to evoke feelings of fear and guilt and encourage the hypochondriac in many of us. In their guide to healthy living, Live a Little! Breaking the Rules Won't Break Your Health author and clinical professor of surgery at UCLA, Dr Susan M. Love and co-author Alice Domar, explore whether these warnings can be substantiated, concluding that all too often, headlines misread research findings and incorrectly understood and percentages of risk are reported. Despite the fact that many people are driven by fear to take every medical test and new pill available, the authors make the case that many of us are leading healthier lives than we realise.`,
    },
    {
      id: "B",
      text: `Surveys suggest that the majority of people are getting too little sleep at night, to the point at which their normal activities are disrupted. The experts, however, think such polls give the wrong impression. "It would seem from these polls that you need at least six hours' sleep, with seven being ideal," says Love. "If you examine the data, you'll notice that those who sleep for seven hours a night throughout their entire lives tend to live the longest. But if you have a lot less sleep for a couple of days, you can catch up. It's all about the overall pattern over your lifetime." And although a recent survey in the UK suggests that 94% of men and 96% of women fail to achieve this, research has also found that sleep deprivation is associated with an almost two-fold risk of obesity for both children and adults. Domar believes that a lot of work still needs to be done in the field. "No direct causal relationship has been found just yet. Unhealthy people tend to sleep a lot but we don't know if it's the disease making them sleep or vice versa."`,
    },
    {
      id: "C",
      text: `When it comes to a healthy diet, the rules are widely known: keep your saturated fats low; avoid too much salt and sugar; include a little of everything. But be wary of following overly prescriptive rules as there is no benefit from agonising about whether you have the recommended five portions of fruit or vegetables a day. "The data really isn't there to support such stringency," says Love. Scientific consensus also asserts that most vitamin supplements have little or no effect on those who eat a healthy range of food, apart from vitamin D, which does help those living in sunshine-poor environments. "It mirrors the proven effects of herbal remedies, which are mostly disputed," says Domar. "Even the benefits of remedies such as echinacea, for which there exists evidence in its favour, are just as likely to be due to the placebo effect as anything else."`,
    },
    {
      id: "D",
      text: `It is generally recommended that adults should do 30 minutes of moderate exercise, five days a week. However, research conducted by the University of Warwick and a recent survey in the UK suggests that 94% of men and 96% of women fail to achieve this. "Some people can be naturally fit and not need to exercise so much," says Love. "If you are a young mother with a toddler, you probably don't need to spend so much time at the gym. It can depend a lot on your age." But exercise is still the single best thing you can do for your health, says Domar. "It's good to be on the go the whole time. People in their late teens and twenties tend to be fitter than they think they are. Essentially, what we're trying to do is to remove the guilt if you can't achieve the lofty target of 30 minutes a day, five days a week."`,
    },
    {
      id: "E",
      text: `It is well reported that stress triggers heart attacks. According to an ongoing study of 735 American middle-aged or elderly men who had good cardiovascular health, those who scored the highest on four different scales of tension were far more likely to suffer heart attacks in later life. Yet there is a negative aspect to a low heart rate too: while anxiety may make you improve one area of your life, ignoring things might cause the situation to deteriorate. Even so, there is no doubt that avoiding the upper end of the stress spectrum is a good idea. "Stress improves your performance to a point, above which the way you handle things rapidly declines," says Domar.`,
    },
  ],
  headings: [
    { id: "i", text: "The importance of maintaining sensible balance" },
    { id: "ii", text: "The case in favour of adopting natural remedies" },
    {
      id: "iii",
      text: "The role played by the media in generating panic about our well-being",
    },
    {
      id: "iv",
      text: "The importance of consumer questionnaires in better health provision",
    },
    {
      id: "v",
      text: "The advantages of incorporating physical activity into daily routines",
    },
    {
      id: "vi",
      text: "The potential for reaching the wrong conclusions about daily habits",
    },
    {
      id: "vii",
      text: "Realistic goals based on individual circumstances",
    },
    {
      id: "viii",
      text: "Inflexible health principles which can be deceptive",
    },
    {
      id: "ix",
      text: "The influence of modern lifestyles on our health prospects",
    },
  ],
  exam: {
    badge: "2",
    heading: "Test practice",
    strategies: "TEST STRATEGIES pages 171 and 172",
    headingsInstr:
      "The Reading Passage has FIVE sections, A–E. Choose the correct heading for each section from the list of headings below.",
    paragraphKeys: {
      A: "iii",
      B: "v",
      C: "i",
      D: "viii",
      E: "vii",
    } as Record<string, string>,
    mcInstr:
      "Choose TWO letters, A–E. Which TWO of the following claims are made in the passage?",
    mcOptions: [
      {
        id: "A",
        text: "The media frequently misinterprets academic findings.",
      },
      {
        id: "B",
        text: "Being severely overweight causes people to have disturbed nights.",
      },
      {
        id: "C",
        text: "Highly stressed people accomplish more than others.",
      },
      {
        id: "D",
        text: "Plant-based medicines have only a psychological effect.",
      },
      {
        id: "E",
        text: "Young people often underestimate their physical health and strength.",
      },
    ],
    mcKeys: ["A", "E"] as const,
  },
  analysis: {
    badge: "3",
    heading: "Task analysis",
    instruction: "Work in pairs and compare your answers to the questions.",
    questions: [
      "For questions 1–5, did you read the list of headings before reading the passage? If so, did this help you to identify the main topic of each paragraph?",
      "For questions 6–7, how was the information in the passage ordered? Were there any parts of the passage which were not tested?",
      "Did you choose the correct number of statements?",
    ],
  },
  discussion: {
    badge: "4",
    instruction:
      "Discuss these questions. Try to use some of the modal forms, degrees of certainty and adverbs from Language development and vocabulary on page 48.",
    questions: [
      "What advice would you give to someone who wanted to become healthier?",
      "Do you think it is an individual's responsibility to look after their own health or should the government have a role in this? Give reasons to support your opinion.",
    ],
  },
};
