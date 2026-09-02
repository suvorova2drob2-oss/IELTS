export const READ_M10A_STEPS = [
  "Before you read",
  "Skim",
  "Paraphrase words",
  "Endings + MCQ",
  "Task analysis",
  "Discussion",
] as const;

export const READ_M10A_NEXT = [
  "Skim →",
  "Paraphrase →",
  "Exam →",
  "Analysis →",
  "Discussion →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ");
}

export function checkReadM10a(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export const readingM10a = {
  id: "reading-m10a-flow",
  bookPages: "pp. 152–153 in your coursebook",
  sectionTitle: "Reading · Matching sentence endings; Multiple choice",
  title: "The science of imagination",
  subtitle:
    "Are creative people’s brains different from other people’s? Professor John Stein explains what creativity looks like from a neuroscientific perspective.",
  passage: [
    {
      id: "1",
      text: `How do you quantify creativity? Is it different from intelligence? Among academics there is no agreement about what intelligence is, yet IQ measures of aptitude in memory, logic and comprehension seem to capture something useful about the brain’s processing ability that is a good predictor of both academic and other types of achievement. The speed of this explains why different intelligence subtests, such as verbal and non-verbal reasoning, correlate with each other fairly well. Thus the general intelligence factor believed by Charles Spearman in the 1920s to underlie all other intellectual attributes is most likely explained by the speed and effective exchange of data between the front and back and left and right hemispheres of an individual’s brain. The efficiency of this interchange, which is mediated by synchronisation of the rhythms of the brain, is a product of both genetic and environmental aspects. Temporal processing seems to be even more heritable than intelligence itself, but environmental factors play just as important a role in intelligence. For example, the specialised neurons which mediate the synchronising rhythms are especially vulnerable to dietary deficiencies, particularly during childhood. General improvement in diet is one explanation for the “Flynn effect”: the increase in the average IQ in all developed countries by 30 points over the past century.`,
    },
    {
      id: "2",
      text: `It is widely agreed that intelligence tests only capture verbal and spatial reasoning and other “left-hemisphere” traits, such as linear and “convergent” thinking. In order to include other attributes, such as emotional, holistic, lateral and imaginative thinking, generally deemed to be characteristic of right-hemisphere processing, Spearman used a factor “s”. This assumed difference is, however, misleading as in reality both hemispheres work collectively in dealing with any one task. Whilst differing kinds of thinking do involve activity in diverging parts of the brain, they do not do so in the clearly compartmentalised way envisaged by early phrenologists. Even simple thought processes tend to involve several parts of the brain and the intricate nature of the systems involved in creative thought range widely over both hemispheres.`,
    },
    {
      id: "3",
      text: `Creative people are those who have the ability to think unexpected new thoughts and produce innovative concepts. They are highly likely to be the fortunate ones and to have both inherited and developed methods which enable their brains’ two hemispheres to work optimally together. Where highly creative people are concerned, four different stages in their pattern of work can be discerned. For which preparation, namely immersion in the problem, can take many years. Often, preparation involves deliberately instigating crazy ideas so as to provide the raw material for the mind to then work on. This is why creative people tend to be highly impulsive and possess a more easily activated right prefrontal cortex: the part of the brain involved in divergent open-ended thinking. Incubation, when a problem is deliberately set aside to allow for imaginings and ideas to interweave subconsciously, with luck will naturally lead to the third stage, whereby insight and illumination will burst forth in your mind with wonderful clarity. In the case of Mendeleev, sleep gave rise to his imagination, logically ordering all the chemical elements into what we now refer to as the periodic table. The fourth and final stage, that of recording ideas on paper, requires the left hemisphere’s strengths. Mozart said “It rarely differs on paper from what it was in my imagination.” Others are not so lucky; Einstein spent huge amounts of time attempting to capture in symbolic form the visuo-spatial intuitions that had come to him in a flash.`,
    },
    {
      id: "4",
      text: `We can all profit from our perception of the creative process by consciously facilitating each of these stages: deliberately giving our imagination free rein, brain-storming, allowing lateral thinking by free association and then sleeping on the new ideas or changing task completely. It is surprising how often ideas will arrange themselves into coherent plans and how a flash of insight will make clear how to convey the information so others can understand it. A widely believed urban myth claims only 10% of our brain is generally in use and suggests that if we used more, we could all aspire to be a Leonardo da Vinci. However, Nature would not allow us to expend 20% of all the energy generated by the body on the brain (which is 2% of our body weight) if 90% of it is likely to be wasted. But this conjecture has a grain of truth: if we could learn as we can through practice to optimise the connections between the different parts of our brains to increase its efficiency, we can only speculate how much more creativity would be released.`,
    },
    {
      id: "5",
      text: `Meanwhile, ensuring that our educational systems foster rather than stifle creativity is vital. Modern education quite properly stresses the importance of developing reasoning, verbal and literacy skills, which are of supreme importance in this technological age. However, the non-verbal, holistic, emotional right hemisphere is necessary if we are to generate any new concepts or innovative ideas, as will be required if we are to cope with the rapid pace of change in the 21st century. It has been found that creative people are quite often deficient in logical, literate left-brain skills, but superior in holistic, visuo-spatial right-brain ones. A disproportionate number of creative artists, engineers and architects fall into this category. The implication of this is that we must create space for arts, fantasy and imagination — our future may well depend on it.`,
    },
  ],
  beforeYouRead: {
    badge: "1",
    instruction: "Work in groups and discuss the questions.",
    questions: [
      "What do you think makes someone creative?",
      "How would you define creativity?",
    ],
    tip: "Suggested: Someone who is prepared to think for themselves and not be tied to convention. Someone who produces new, innovative ideas. Creativity could be defined as the ability to use your imagination to produce new and innovative ideas.",
  },
  skim: {
    badge: "2a",
    instruction:
      "Read the title and subtitle; then skim the reading passage to find out how the argument develops.",
    tip: "The argument starts with the scientific descriptions of creativity, then discusses different creative people and talks about being more creative. It ends with education.",
  },
  words: {
    badge: "2b",
    instruction:
      "Work in pairs and look at the highlighted words / ideas in question 1 of the test task. Match paraphrases / related ideas (Teacher’s Book support).",
    bank: [
      "assessment / evaluation",
      "measure / assess / quantify",
      "skill / talent / aptitude",
      "logical",
      "IQ aptitude measures",
      "brain’s processing ability",
    ],
    items: [
      {
        id: 1,
        text: "test (in ‘A test which evaluates…’)",
        key: "assessment / evaluation",
      },
      {
        id: 2,
        text: "evaluate / quantify",
        key: "measure / assess / quantify",
      },
      {
        id: 3,
        text: "ability",
        key: "skill / talent / aptitude",
      },
      {
        id: 4,
        text: "rational",
        key: "logical",
      },
      {
        id: 5,
        text: "What IQ tests measure (memory, logic, comprehension)",
        key: "IQ aptitude measures",
      },
      {
        id: 6,
        text: "What IQ seems to capture that predicts academic and other achievement",
        key: "brain’s processing ability",
      },
    ],
  },
  exam: {
    badge: "3–4",
    strategies: "TEST STRATEGIES page 172",
    instruction:
      "Questions 1–5 Complete each sentence with the correct ending, A–G. Questions 6–9 Choose the correct letter, A, B, C or D. Write the letter only.",
    flowTitle: "Questions 1–5 Matching sentence endings",
    flowGaps: [
      {
        id: 1,
        before:
          "1 A test which evaluates the ability to be rational → ",
        after:
          " (A can be obtained… B is now recognised as over-simplistic… C is the speed… D gives a good indication of future success… E involves different parts… F is the correlation… G demonstrates genetic factors…)",
        answers: ["D"],
      },
      {
        id: 2,
        before: "2 A typical indication of a high IQ → ",
        after: "",
        answers: ["C"],
      },
      {
        id: 3,
        before:
          "3 The proven link between better food intake and higher intelligence → ",
        after: "",
        answers: ["G"],
      },
      {
        id: 4,
        before:
          "4 Visualising the brain as a division into ‘rational’ and ‘emotional’ halves → ",
        after: "",
        answers: ["B"],
      },
      {
        id: 5,
        before: "5 The complexity involved in the creative process → ",
        after: "",
        answers: ["E"],
      },
    ],
    sentenceGaps: [
      {
        id: 6,
        before:
          "6 What does the writer say about the process experienced by creative people? A It often leads to mental illness. B The initial phase can be extremely time-consuming. C The most common way to find a solution is when asleep. D It is always a struggle to transfer ideas to the written word. → ",
        after: "",
        answers: ["B"],
      },
      {
        id: 7,
        before:
          "7 By studying how to become more creative we learn that it is important to A take risks with the way that you approach ideas. B take every opportunity to rest your mind. C be organised and methodical. D clarify your ideas by speaking to other people. → ",
        after: "",
        answers: ["A"],
      },
      {
        id: 8,
        before:
          "8 The writer says that the urban myth he refers to A is scientifically improbable. B is completely and utterly false. C provides him with daily encouragement. D explains why creativity is innate rather than acquired. → ",
        after: "",
        answers: ["A"],
      },
      {
        id: 9,
        before:
          "9 What point does the writer make in the last paragraph? A Schools fail to encourage creativity. B Students with imbalanced hemispheres fail academically. C Schools are exclusively focused on technology skills. D It is essential for the modern age that creativity is nurtured at school. → ",
        after: "",
        answers: ["D"],
      },
    ],
  },
  wrongAnswers: {
    badge: "5",
    instruction:
      "Task analysis: What helped you identify the parts of the passage and choose the correct options? Check endings A–G wording against the text.",
    items: [
      {
        id: 1,
        wrong: "A / C / E for Q1",
        tip: "Q1 key D — IQ seems to capture brain processing ability that is a good predictor of academic and other achievement.",
      },
      {
        id: 2,
        wrong: "A for Q6 (mental illness)",
        tip: "Q6 key B — preparation / immersion can take many years (extremely time-consuming).",
      },
      {
        id: 8,
        wrong: "B for Q8 (utterly false)",
        tip: "Q8 key A — the urban myth is scientifically improbable, but the conjecture has a grain of truth about efficiency.",
      },
      {
        id: 9,
        wrong: "A for Q9",
        tip: "Q9 key D — education must foster creativity for the 21st century; not that schools simply fail.",
      },
    ],
  },
  discussion: {
    badge: "6",
    instruction: "Discuss the questions.",
    questions: [
      "Would you describe yourself more as a rational or a creative person? Why?",
      "Should schools create more space for arts, fantasy and imagination? How?",
    ],
    suggestedTitle: "Suggested answer",
    suggestedAnswer: [
      "I'd describe myself as more rational because I tend to analyse problems logically before acting. That said, I rely on creativity when I need original ideas, so the two sides complement each other rather than excluding one another.",
      "Schools should certainly make more room for arts and imagination, perhaps by integrating creative projects into science and language lessons rather than treating them as optional extras. Dedicated studio time, drama workshops, and open-ended assignments could nurture fantasy alongside academic skills.",
    ],
  },
};
