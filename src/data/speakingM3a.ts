import glassesImg from "../assets/speak-m3a-glasses.png";

export const SPEAK_M3A_STEPS = [
  "1a Quiz",
  "1b Discuss",
  "2a Word forms",
  "2b Relevant words",
  "3 Techniques",
  "4 Notes",
  "5a More notes",
] as const;

export const SPEAK_M3A_NEXT = [
  "1b Discuss →",
  "2a Word forms →",
  "2b Words →",
  "3 Techniques →",
  "4 Notes →",
  "5a Notes →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/\s+/g, " ");
}

export function checkSpeakM3a(input: string, answers: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return answers.some((a) => normalize(a) === n);
}

export const speakingM3a = {
  id: "speaking-m3a-flow",
  bookPages: "p. 43 in your coursebook",
  sectionTitle: "Speaking · Part 3",
  image: glassesImg,
  imageAlt:
    "Two glasses of water labelled half empty and half full — Positivity Quiz.",
  quiz: {
    badge: "1a",
    heading: "Lead-in",
    instruction: "Work in pairs and do the quiz.",
    title: "Positivity Quiz",
    items: [
      "I enjoy dealing with problems.",
      "When I have a good idea, I’m not surprised.",
      "After achieving a long-term goal, I congratulate myself.",
      "I don’t complain much.",
      "Things don’t worry me much.",
    ],
  },
  discuss: {
    badge: "1b",
    instruction:
      "What do you think ‘half full’ and ‘half empty’ in the photo means? Why do you think some people are more positive than others? Can people change how positive they are? How?",
  },
  wordForms: {
    badge: "2a",
    heading: "Topic-specific vocabulary",
    instruction: "Complete the table with the correct word forms.",
    rows: [
      {
        id: 1,
        nounBlank: true,
        nounAnswers: ["anxiety"],
        adjective: "anxious",
      },
      {
        id: 2,
        noun: "gratitude",
        adjectiveBlank: true,
        adjectiveAnswers: ["grateful"],
      },
      {
        id: 3,
        nounBlank: true,
        nounAnswers: ["inspiration"],
        adjective: "inspiring",
      },
      {
        id: 4,
        noun: "therapy",
        adjectiveBlank: true,
        adjectiveAnswers: ["therapeutic"],
      },
      {
        id: 5,
        nounBlank: true,
        nounAnswers: ["optimism"],
        adjective: "optimistic",
      },
      {
        id: 6,
        nounBlank: true,
        nounAnswers: ["contentment"],
        adjective: "contented",
      },
    ],
  },
  relevant: {
    badge: "b",
    instruction:
      "Read the examiner’s question and think about how you could answer it. Choose some words below which are relevant to the question.",
    examiner:
      "Examiner: What influences people’s ability to think positively about life?",
    bank: [
      "anxiety",
      "anxious",
      "gratitude",
      "grateful",
      "inspiration",
      "inspiring",
      "therapy",
      "therapeutic",
      "optimism",
      "optimistic",
      "contentment",
      "contented",
    ],
    modelLabel: "Suggested answer",
    modelAnswer:
      "Some people are naturally more optimistic and this may be because they find contentment in the smaller things in life, for example, eating something nice or being in nature. I think people are born with this kind of optimism whereas others can be more pessimistic. These people may feel anxious and be unable to see how happiness is in the little things in life.",
  },
  techniques: {
    badge: "3",
    instruction:
      "Write down examples of language for each technique (A–E).",
    items: [
      { id: "A", label: "giving an example" },
      { id: "B", label: "making a comparison" },
      { id: "C", label: "giving a reason" },
      { id: "D", label: "giving alternatives" },
      { id: "E", label: "explaining cause and effect" },
    ],
    tips: [
      "for example / such as / for instance",
      "whereas / compared with / similarly",
      "because / since / the reason is",
      "or / alternatively / another option is",
      "so / as a result / this leads to",
    ],
  },
  notes4: {
    badge: "4",
    instruction:
      "Read the questions and make a brief note of your answer. Then write notes on how to develop your answer using the techniques in Exercise 3b.",
    questions: [
      "Are people in your country generally optimistic or pessimistic?",
      "Should we teach positive thinking in schools?",
    ],
    modelLabel: "Suggested answers",
    models: [
      "I think people in my country are generally pessimistic. The reason I believe this is that everybody seems to be chasing money or success. A lot of people here don’t focus on the now, for example, when people are out in the park or suchlike you can see them checking their phones for work emails. This may appear to be conscientious, but in my view, all it does is add to their stress levels.",
      "In my opinion, it’s essential to teach positive thinking to children in their school environment. They are taught to count or write, but not to deal with life. Imagine a world where children were brought up to believe happiness was as important as achievement.",
    ],
  },
  notes5: {
    badge: "5a",
    instruction:
      "Read the questions and make notes on how you will develop your answers.",
    questions: [
      "Do you think it’s more difficult for adults to be positive than children?",
      "Would you say that positivity is the key to happiness?",
      "Do you believe that some cultures are more optimistic than others?",
    ],
  },
};

export type SpeakingM3aData = typeof speakingM3a;
