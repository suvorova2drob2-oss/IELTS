import headacheImg from "../assets/listen-m3b-headache.png";

export const LISTEN_M3B_STEPS = [
  "1 Before listen",
  "2 Wrong answers",
  "3a Preview Qs",
  "3b Exam task",
  "4 Task analysis",
] as const;

export const LISTEN_M3B_NEXT = [
  "2 Wrong answers →",
  "3a Preview →",
  "3b Exam →",
  "4 Analysis →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[.,;:!?]+$/g, "");
}

export function checkListenM3b(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export const listeningM3b = {
  id: "listening-m3b-flow",
  bookPages: "p. 48 in your coursebook",
  sectionTitle: "Listening · Section 4",
  noAudioNote:
    "Аудио пока нет — можно пройти подготовку и заполнить задания. Ответы 1–10 проверьте по script 3.6 (p. 204), когда появятся треки.",
  before: {
    badge: "1",
    heading: "Before you listen",
    instruction:
      "Read the ways of treating illness below. Which do you think are more effective? What are the advantages and disadvantages of these treatments?",
    treatments: [
      "medicine",
      "herbs",
      "acupuncture",
      "homeopathy",
      "change in diet",
    ],
    image: headacheImg,
    imageAlt:
      "Woman holding her temples with her eyes closed, as if she has a headache.",
    suggestedTitle: "Suggested answer",
    suggestedAnswer: [
      "I would argue that conventional medicine is often the most effective option for serious illness because treatments are tested through clinical research. A clear advantage is reliability; the main drawback is that some medicines have side effects.",
      "Herbs, acupuncture and dietary changes can be useful for milder conditions or as complementary approaches. They may feel more natural and have fewer side effects, but the evidence is sometimes weaker and results can vary from person to person.",
      "Homeopathy is more controversial: some people report benefits, yet many scientists question whether it works beyond a placebo effect. Overall, I would combine evidence-based medicine with lifestyle improvements such as diet and stress management.",
    ],
    languageFocus: [
      "I would argue that",
      "A clear advantage",
      "complementary approaches",
      "more controversial",
      "Overall",
      "evidence-based medicine",
      "side effects",
      "placebo effect",
    ],
  },
  wrongAnswers: {
    badge: "2",
    heading: "Identify correct answers",
    instruction:
      "Read the excerpt from an audio script and the student's answers to a question. What is wrong with the answers? Why has the student made this mistake?",
    excerpt:
      "... So, there are plenty of health benefits to eating more healthily, but there's a lot of advice at the moment in the media to cut out all things like sugar or carbohydrates entirely. Now, this might not be a great idea. If a person just cuts out everything, instead of cutting down, this can have other consequences. For example, people who remove all sugars in their diets often complain of tiredness, especially in the first few weeks. There is also a chance of insomnia. Cutting out dairy products such as milk and cheese can make people feel sick.",
    question:
      "What are TWO of the negative side effects of cutting out sugar?",
    studentAnswers: ["tiredness", "feeling sick"],
    mistakeOptions: [
      {
        id: "dairy",
        text: "The second answer (feeling sick) relates to cutting out dairy, not sugar.",
      },
      {
        id: "spelling",
        text: "The student spelled tiredness incorrectly.",
      },
      {
        id: "both",
        text: "Both answers are correct side effects of cutting out sugar.",
      },
    ],
    mistakeKey: "dairy",
    correctEffects: ["tiredness", "insomnia"],
    explanation:
      "Tiredness is correct. Feeling sick comes from removing dairy products. The second sugar side effect is insomnia.",
  },
  preview: {
    badge: "3a",
    heading: "Test practice",
    strategies: "TEST STRATEGIES page 168",
    instruction: "Read the questions and decide:",
    prompts: [
      "exactly what is required in the questions.",
      "what kinds of words might form the answers (nouns, verbs, etc.).",
      "the maximum number of words for each answer.",
    ],
    tips: [
      "Q1–5: complete sentences; Q6–7 and Q9–10 ask for TWO answers each; Q8 asks for a place.",
      "Mostly nouns / noun phrases; Q5 may need an adjective.",
      "No more than three words and/or a number for every answer.",
    ],
  },
  q1to5: {
    limit:
      "Complete the sentences below. Write NO MORE THAN THREE WORDS AND/OR A NUMBER for each answer.",
    items: [
      {
        id: 1,
        before: "The term 'traditional' in regard to medicine seems ",
        after: ".",
      },
      {
        id: 2,
        before: "Modern scientific medicine began around ",
        after: " ago.",
      },
      {
        id: 3,
        before: "Over ",
        after: " of the world still rely on alternative medicine.",
      },
      {
        id: 4,
        before:
          "There is a growing trend for more natural treatment in ",
        after: ".",
      },
      {
        id: 5,
        before:
          "Scientists in the Western world claim that alternative medicine is ",
        after: ".",
      },
    ],
  },
  q6to10: {
    limit:
      "Answer the questions below. Write NO MORE THAN THREE WORDS AND/OR A NUMBER for each answer.",
    groups: [
      {
        prompt: "What TWO things has acupuncture been shown to assist?",
        ids: [6, 7],
      },
      {
        prompt: "Where were parts of trees used as remedies?",
        ids: [8],
      },
      {
        prompt: "What are TWO possible benefits of fish oils?",
        ids: [9, 10],
      },
    ],
  },
  exam: {
    badge: "3b",
    instruction: "3.6 Listen and complete the test tasks.",
    audioNote: "Track 3.6 — audio will be added later.",
  },
  analysis: {
    badge: "4a",
    heading: "Task analysis",
    a: "Read audio script 3.6 on page 204 and check your answers.",
    b: {
      badge: "4b",
      instruction:
        "Think about your incorrect answers. Tick the reasons why your answers were incorrect.",
      reasons: [
        "Incorrect spelling",
        "Too many words",
        "Wrong detail written down (wrong answer)",
        "No answer written down",
      ],
    },
  },
  answerKeys: {
    1: ["unclear"],
    2: ["250 years"],
    3: ["50%", "fifty percent", "50 percent"],
    4: ["the west"],
    5: ["ineffective"],
    6: ["back pain", "headaches"],
    7: ["back pain", "headaches"],
    8: ["ancient greece", "greece"],
    9: ["enhance concentration", "protect the heart"],
    10: ["enhance concentration", "protect the heart"],
  } as Record<number, string[]>,
  /** Q6–7 and Q9–10 accept either order; each pair must contain both answers. */
  pairKeys: [
    { ids: [6, 7], answers: ["back pain", "headaches"] },
    { ids: [9, 10], answers: ["enhance concentration", "protect the heart"] },
  ],
};
