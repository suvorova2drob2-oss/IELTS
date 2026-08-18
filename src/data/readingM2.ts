import type { TfngValue } from "./practiceReadingTest1";

export type M2TfngQ = {
  id: number;
  statement: string;
  key: TfngValue;
  evidence: string[];
  tip: string;
  paragraphIndex: number;
};

export type M2ShortQ = {
  id: number;
  question: string;
  answers: string[];
  evidence: string[];
  tip: string;
  paragraphIndex: number;
};

export type M2DetailTick = {
  id: string;
  label: string;
  mentioned: boolean;
  note: string;
};

export const LEARN_STEPS_M2 = [
  "Before you read",
  "Topic sentences",
  "Exam task",
  "Discussion",
] as const;

export const LEARN_STEP_NEXT_M2: Record<number, string> = {
  0: "Continue → Topic sentences",
  1: "Continue → Exam task",
  2: "Continue → Discussion",
  3: "← К модулю",
};

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/%/g, " percent")
    .replace(/per\s*cent/g, "percent")
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ");
}

export function checkM2Short(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export const readingM2 = {
  id: "reading-m2-flow",
  module: 2,
  bookPages: "pp. 24–25 in your coursebook",
  title: "A better life?",
  introduction:
    "For over two million years, humans foraged for wild plants and hunted wild animals: since no food was grown and little stored, these hunter-gatherers had to endure a daily struggle if they were to avoid starvation. Then 'progress' came, in the form of the Agricultural Revolution.",
  passage: [
    "At the end of the Ice Age, 10,000-12,000 years ago, the Agricultural Revolution took place, something which was to transform people's lives forever. Whether this was a consequence or the cause of the dramatic population growth which we know occurred around this time is still unclear. What is beyond doubt, however, is that during this period, evidence of the domestication of select plants and animals began to emerge in the archaeological record. This happened more or less simultaneously in a number of regions throughout the world, the practice spreading until by the first century AD the vast majority of the global population were agriculturalists.",
    "Perhaps the most significant consequence of this change was the ability to produce a surplus of food beyond the immediate needs of daily subsistence. The care and controlled breeding of selected species led to genetic changes that allowed greater production and increased the geographical ranges across which the domesticated species could be grown, thus greatly expanding the potential food resources available to humans.",
    "These developments produced a revolution in human lives. Most notably, small communities that had previously been forced to make seasonal moves across the landscape to follow the shifting availability of naturally occurring resources could now settle in one place for long periods and expand in size. The negative aspect to this was that because agriculture encouraged people to settle together in crowded societies, it accelerated the spread of parasites and infectious diseases, whereas when populations were scattered in small bands that continually moved camp, epidemics could not take hold.",
    "The health of agriculturalists of this time can in part be assessed by the newly emerging techniques of paleopathology, which study the remains of ancient peoples. One example of this work concerns historical changes in size: skeletons from Greece and Turkey show that around 10,000 years ago male hunter-gatherers were 5'9\" tall, while women were 5'5\". Following the adoption of agriculture, this dropped and by 3000 BC had reached an average height of only 5'3\" tall for men and 5' for women before very slowly beginning to rise again.",
    "Studies also show that hunter-gatherers living about 7,000 years ago had bone density proportionally similar to that seen in modern primates. By contrast, agriculturalists living 6,000 years later had significantly lighter and weaker bones. However, these findings do not imply that the latter worked fewer hours: data suggests that the differences can principally be attributed to changes in the pattern of physical activity, from being highly mobile foragers to relatively sedentary agriculturalists.",
    "Another example of paleopathology at work is the study of Native American skeletons from burial mounds in the Illinois and Ohio River valley, when they assessed health changes that occurred when a hunter-gatherer culture changed to intensive maize farming around AD 1150. Studies by George Armelagos and his colleagues then at the University of Massachusetts show these early farmers paid a price for their new-found livelihood.",
    "When compared with their hunter-gatherer ancestors, the farmers were found to have significant health deficiencies which indicated malnutrition. For example, enamel defects increased by 50 percent, a bone condition called porotic hyperostosis increased by four times indicating iron-deficiency anaemia, bone lesions were three times more evident which points to an increase in infectious diseases and a rise in degenerative spinal conditions was the result of the gruelling physical work. One expert observed that life expectancy dropped by about seven years from the pre-agricultural average of twenty-six years to just nineteen years in post-agricultural society indicating the negative impact of nutritional deficiencies and infectious disease on the population.",
    "The evidence suggests that while hunter-gatherers enjoyed a varied diet including wild plants and protein, early farmers obtained most of their food from a limited amount of starchy crops such as wheat, gaining cheap calories at the cost of poor nutrition. Using new food sources such as dairy products proved difficult as humans had not adapted to digest it. In addition, dependence on a restricted number of crops meant the risk of starvation were one crop to fail.",
    "The lasting impact of the Agricultural Revolution was to enable Homo sapiens to succeed as a species in direct proportion to the increase in the amount of food they produced. However, the short-term effect was that small groups of relatively healthy people disappeared, to be replaced by large villages of people suffering from disease and malnourishment.",
  ],
  beforeYouRead: {
    instruction: "Discuss the questions in groups.",
    timeSec: 90,
    questions: [
      "Which of these developments have had the most impact on people's lives in your country? industry · agriculture · technology · science",
      "In what ways have these changes generally been positive/negative for a) your country b) the world?",
    ],
  },
  topicSentences: {
    instruction:
      "Look at the highlighted topic sentence in the first paragraph. Predict which details the rest of the paragraph will give about the Agricultural Revolution. Then skim and tick which supporting details are mentioned.",
    topicSentence:
      "At the end of the Ice Age, 10,000-12,000 years ago, the Agricultural Revolution took place, something which was to transform people's lives forever.",
    details: [
      {
        id: "when",
        label: "when it took place",
        mentioned: true,
        note: "Yes — 10,000–12,000 years ago (in the topic sentence itself).",
      },
      {
        id: "where",
        label: "where it began",
        mentioned: true,
        note: "Yes — more or less simultaneously in a number of regions throughout the world (not one starting place).",
      },
      {
        id: "before",
        label: "how people lived before that time",
        mentioned: false,
        note: "No — hunter-gatherers are in the intro box, not in the rest of paragraph 1.",
      },
    ] satisfies M2DetailTick[],
    laterTopics: [
      "Perhaps the most significant consequence of this change was the ability to produce a surplus of food…",
      "These developments produced a revolution in human lives.",
      "The health of agriculturalists of this time can in part be assessed by the newly emerging techniques of paleopathology…",
      "Studies also show that hunter-gatherers living about 7,000 years ago had bone density…",
      "Another example of paleopathology at work is the study of Native American skeletons…",
      "When compared with their hunter-gatherer ancestors, the farmers were found to have significant health deficiencies…",
      "The evidence suggests that while hunter-gatherers enjoyed a varied diet…",
      "The lasting impact of the Agricultural Revolution was to enable Homo sapiens to succeed as a species…",
    ],
  },
  tfngInstruction:
    "Do the following statements agree with the information given in the reading passage?",
  tfngLegend: [
    { value: "TRUE" as const, meaning: "if the statement agrees with the information" },
    { value: "FALSE" as const, meaning: "if the statement contradicts the information" },
    { value: "NOT GIVEN" as const, meaning: "if there is no information on this" },
  ],
  tfng: [
    {
      id: 1,
      statement:
        "Studies prove that the Agricultural Revolution was prompted by a rise in the birth rate at the time.",
      key: "NOT GIVEN",
      evidence: [
        "Whether this was a consequence or the cause of the dramatic population growth which we know occurred around this time is still unclear",
      ],
      tip: "Population growth is debated as cause or consequence — not 'studies prove', and birth rate is not mentioned.",
      paragraphIndex: 0,
    },
    {
      id: 2,
      statement:
        "The Agricultural Revolution enabled people to eat more than the daily minimum requirement.",
      key: "TRUE",
      evidence: [
        "surplus of food beyond the immediate needs of daily subsistence",
      ],
      tip: "Surplus beyond daily subsistence = more than the daily minimum.",
      paragraphIndex: 1,
    },
    {
      id: 3,
      statement:
        "An increase in illness amongst the population at that time is likely to have been caused by factors connected to the Agricultural Revolution.",
      key: "TRUE",
      evidence: [
        "accelerated the spread of parasites and infectious diseases",
      ],
      tip: "Crowded farming societies sped up parasites and infectious disease.",
      paragraphIndex: 2,
    },
    {
      id: 4,
      statement:
        "Not until modern times have people in Greece and Turkey reached the same average height as their hunter-gatherer ancestors.",
      key: "NOT GIVEN",
      evidence: ["before very slowly beginning to rise again"],
      tip: "Height fell, then rose slowly — the text does not say they only caught up in modern times.",
      paragraphIndex: 3,
    },
    {
      id: 5,
      statement:
        "The superior strength of hunter-gatherers' bones is explained by the fact that they did a greater amount of work than agriculturalists.",
      key: "FALSE",
      evidence: [
        "these findings do not imply that the latter worked fewer hours",
        "pattern of physical activity",
      ],
      tip: "Not more hours of work — mobile foraging vs sedentary farming.",
      paragraphIndex: 4,
    },
  ] satisfies M2TfngQ[],
  shortInstruction:
    "Answer the questions below. Choose NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage for each answer.",
  short: [
    {
      id: 6,
      question:
        "To what extent did people's teeth worsen as a result of an agricultural diet?",
      answers: ["50 percent", "50%", "50 per cent"],
      evidence: ["enamel defects increased by 50 percent"],
      tip: "Extent = a number. Enamel defects increased by 50 percent.",
      paragraphIndex: 6,
    },
    {
      id: 7,
      question: "What chemical element was lacking in the diet of agriculturalists?",
      answers: ["iron"],
      evidence: ["iron-deficiency anaemia"],
      tip: "Porotic hyperostosis → iron-deficiency anaemia → the element is iron.",
      paragraphIndex: 6,
    },
    {
      id: 8,
      question:
        "What physical evidence is there that catching illnesses from others at that time was common?",
      answers: ["bone lesions"],
      evidence: [
        "bone lesions were three times more evident which points to an increase in infectious diseases",
      ],
      tip: "Bone lesions = physical evidence of infectious disease.",
      paragraphIndex: 6,
    },
    {
      id: 9,
      question:
        "What was greatly reduced as a result of diet and illness in post-agricultural times?",
      answers: ["life expectancy"],
      evidence: ["life expectancy dropped by about seven years"],
      tip: "Life expectancy fell from 26 years to 19.",
      paragraphIndex: 6,
    },
    {
      id: 10,
      question: "What kind of food did the early farmers have problems processing?",
      answers: ["dairy products", "dairy"],
      evidence: [
        "Using new food sources such as dairy products proved difficult as humans had not adapted to digest it",
      ],
      tip: "Dairy products — humans had not adapted to digest it.",
      paragraphIndex: 7,
    },
  ] satisfies M2ShortQ[],
  examTips: [
    "TRUE = same meaning, other words. FALSE = the text says the opposite. NOT GIVEN = the point is missing or only partly there.",
    "Short answers must be words from the passage — do not paraphrase.",
    "Q6–10: no more than two words and/or a number.",
  ],
  taskAnalysis: [
    "Identifying topic sentences helped me to skim each paragraph quickly.",
    "Reading the passage quickly before doing the task meant that I could scan the passage more quickly to find the information I needed.",
    "It is hard to decide what the key words are in the statements/questions.",
    "Looking for paraphrases of the key words helped me to scan the passage rather than read every word.",
  ],
  discussion: {
    instruction: "Work in pairs and discuss the questions.",
    timeSecPerQuestion: 90,
    questions: [
      "Which important social changes have you witnessed in your lifetime?",
      "Why might some groups of people (e.g. the young, the old) welcome or fear change? What kind of changes might they welcome and which might they fear, and why?",
    ],
  },
};

export function collectM2Evidence(
  ids: number[],
): { terms: string[]; paragraphIndex: number | undefined } {
  const terms: string[] = [];
  let paragraphIndex: number | undefined;
  for (const id of ids) {
    const q =
      readingM2.tfng.find((t) => t.id === id) ??
      readingM2.short.find((s) => s.id === id);
    if (!q) continue;
    if (paragraphIndex == null) paragraphIndex = q.paragraphIndex;
    for (const e of q.evidence) {
      if (!terms.some((t) => t.toLowerCase() === e.toLowerCase())) terms.push(e);
    }
  }
  return { terms, paragraphIndex };
}
