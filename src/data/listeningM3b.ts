import headacheImg from "../assets/listen-m3b-headache.png";
import { EXPERT_M3_AUDIO } from "./expertAudio";

export const LISTEN_M3B_STEPS = [
  "1 Before listen",
  "2 Wrong answers",
  "3a Preview Qs",
  "3b Exam task",
  "4 Task analysis",
  "5 Language pack",
] as const;

export const LISTEN_M3B_NEXT = [
  "2 Wrong answers →",
  "3a Preview →",
  "3b Exam →",
  "4 Analysis →",
  "5 Language pack →",
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
    scriptLabel: "Audio script 3.6 (p. 204)",
    script: [
      {
        speaker: "Narrator",
        text: "You are going to listen to a lecture about traditional medicine. For questions one to five, listen and complete the gaps.",
      },
      {
        speaker: "Lecturer",
        text: "Hello, everyone. Please take your seats. So today in this introductory lecture, I'm going to give you an overview of different kinds of medical treatments and how these are perceived here in the UK. Firstly, it's quite important for us to define some key terms at the start as some definitions have multiple meanings.",
      },
      {
        speaker: "Lecturer",
        text: "The idea of traditional medicine, for example, could refer to medicine which has a strong scientific base and has passed a series of various trials to check safety and effectiveness. Alternatively, it could refer to medicines which are created through mixing herbs or which use relaxation techniques. So the term can be quite unclear. For the purpose of this lecture, however, we'll not use the word traditional, but we'll refer to medicine that has developed as a result of scientific research in the West as scientific medicine, such as antibiotics or vaccines.",
      },
      {
        speaker: "Lecturer",
        text: "We'll use the term alternative medicine to apply to natural-based remedies such as herbs or acupuncture. So let's explore scientific medicine. There are many who argue that science has been used in the field of medicine since the middle ages, but I would consider pinpointing the start at just over 250 years ago, with scientists such as Louis Pasteur and Edward Jenner and the invention of treatments such as vaccines and antibiotics.",
      },
      {
        speaker: "Lecturer",
        text: "These treatments remain popular today, and we'll examine these scientific developments in more detail during the second half of today's lecture. It might surprise you to learn that scientific medicine isn't the most popular form of medicine. You may be under the impression that the support for alternative medicine is low. Maybe you would estimate it at perhaps less than 20 percent? Well, this would be incorrect.",
      },
      {
        speaker: "Lecturer",
        text: "Actually, it has been estimated that over 50 percent of people in the Western world still favor alternative methods of treatment, while in the east, what we might consider to be alternative medicines are in fact commonplace and widely used. Additionally, these forms of medicines are growing in popularity in the West, and in fact have a far longer history than scientific medicine.",
      },
      {
        speaker: "Lecturer",
        text: "However, there is an argument, and I think this generally comes from the scientific community in the West, that much of this kind of treatment is deemed as ineffective when dealing with many illnesses. So, let's explore the truth of this assertion.",
      },
      {
        speaker: "Narrator",
        text: "Now, read questions 6 to 10.",
      },
      {
        speaker: "Lecturer",
        text: "Firstly, acupuncture. The practice of inserting fine needles into specific locations in the body has been popular for centuries in Asia and is becoming increasingly used in Western countries. The list of ailments it's used to treat is extensive. However, support of the effectiveness of acupuncture varies. Much Western research questions the benefits of acupuncture when used to help someone, for example, give up smoking or gain allergy relief.",
      },
      {
        speaker: "Lecturer",
        text: "However, there does seem to be some evidence that it can help to relieve back pain. A 2009 study by the National Institute of Clinical Excellence in the UK showed that there were improvements here, especially regarding pain in the lower back or lumbar region. There is also evidence which demonstrates that acupuncture can reduce headaches, both in their number and severity in some cases. However, this evidence is constantly questioned in the West, and there are very much two schools of thought that acupuncture works and that acupuncture doesn't work.",
      },
      {
        speaker: "Lecturer",
        text: "Secondly, I'd like to briefly discuss herbal medicines. As you might know, a great number of scientific drugs are derived from or use natural ingredients. For example, in ancient Greece, Hippocrates developed a treatment for headaches, incorporating a particular tree bark that was eventually used in the development of aspirin, now a popular painkiller.",
      },
      {
        speaker: "Lecturer",
        text: "Medicine with natural ingredients can be ingested in many forms, such as in teas or treatments which are rubbed onto the skin. Fish oils are one such form of medication. These oils are believed to enhance concentration, so much so that many parents give them to their children in order to try and help them perform better at school. In the UK, this was even recommended by the government.",
      },
      {
        speaker: "Lecturer",
        text: "Such oils can also help to protect the heart, which I'm sure you'll agree is invaluable. However, it might be that a change in diet, to just simply eating more oily fish, could be just as effective as taking fish oil supplements. Other traditional herbal cures like ginger or rosemary have also been used for centuries.",
      },
    ],
    audio: EXPERT_M3_AUDIO.track03_06,
    audioLabel: "Track 03_06",
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
  languagePack: {
    badge: "5",
    heading: "Language from the lecture",
    instruction:
      "Open a topic. Learn the phrase and the full sentence from audio script 3.6, then use it in Speaking Part 3 or Writing Task 2.",
    themes: [
      {
        id: "terms",
        tabLabel:
          "Key terms · Speaking / Writing (scientific vs alternative medicine)",
        useHint:
          "Define concepts clearly when discussing health systems or treatment choices.",
        items: [
          {
            phrase: "quite unclear",
            sentence:
              "The idea of traditional medicine, for example, could refer to medicine which has a strong scientific base and has passed a series of various trials to check safety and effectiveness. Alternatively, it could refer to medicines which are created through mixing herbs or which use relaxation techniques. So the term can be quite unclear.",
          },
          {
            phrase: "scientific medicine",
            sentence:
              "For the purpose of this lecture, however, we'll not use the word traditional, but we'll refer to medicine that has developed as a result of scientific research in the West as scientific medicine, such as antibiotics or vaccines.",
          },
          {
            phrase: "alternative medicine",
            sentence:
              "We'll use the term alternative medicine to apply to natural-based remedies such as herbs or acupuncture.",
          },
        ],
      },
      {
        id: "popularity",
        tabLabel:
          "Popularity · Writing body / Speaking «How widely used is alternative medicine?»",
        useHint:
          "Support claims with figures and contrast West vs East where relevant.",
        items: [
          {
            phrase: "just over 250 years ago",
            sentence:
              "There are many who argue that science has been used in the field of medicine since the middle ages, but I would consider pinpointing the start at just over 250 years ago, with scientists such as Louis Pasteur and Edward Jenner and the invention of treatments such as vaccines and antibiotics.",
          },
          {
            phrase: "over 50 percent",
            sentence:
              "Actually, it has been estimated that over 50 percent of people in the Western world still favor alternative methods of treatment, while in the east, what we might consider to be alternative medicines are in fact commonplace and widely used.",
          },
          {
            phrase: "growing in popularity in the West",
            sentence:
              "Additionally, these forms of medicines are growing in popularity in the West, and in fact have a far longer history than scientific medicine.",
          },
        ],
      },
      {
        id: "debate",
        tabLabel:
          "Debate · Writing balanced view / Speaking «Is alternative medicine effective?»",
        useHint:
          "Acknowledge the scientific community’s view without dismissing all alternatives.",
        items: [
          {
            phrase: "the scientific community in the West",
            sentence:
              "However, there is an argument, and I think this generally comes from the scientific community in the West, that much of this kind of treatment is deemed as ineffective when dealing with many illnesses.",
          },
          {
            phrase: "deemed as ineffective",
            sentence:
              "However, there is an argument, and I think this generally comes from the scientific community in the West, that much of this kind of treatment is deemed as ineffective when dealing with many illnesses. So, let's explore the truth of this assertion.",
          },
          {
            phrase: "two schools of thought",
            sentence:
              "However, this evidence is constantly questioned in the West, and there are very much two schools of thought that acupuncture works and that acupuncture doesn't work.",
          },
        ],
      },
      {
        id: "acupuncture",
        tabLabel:
          "Acupuncture · Examples / Speaking «What has research shown?»",
        useHint:
          "Name specific conditions and cite study types (e.g. NICE) when arguing.",
        items: [
          {
            phrase: "relieve back pain",
            sentence:
              "However, there does seem to be some evidence that it can help to relieve back pain.",
          },
          {
            phrase: "the lower back or lumbar region",
            sentence:
              "A 2009 study by the National Institute of Clinical Excellence in the UK showed that there were improvements here, especially regarding pain in the lower back or lumbar region.",
          },
          {
            phrase: "reduce headaches",
            sentence:
              "There is also evidence which demonstrates that acupuncture can reduce headaches, both in their number and severity in some cases.",
          },
        ],
      },
      {
        id: "herbal",
        tabLabel:
          "Herbal remedies & diet · Writing examples / Speaking «Natural treatments»",
        useHint:
          "Link historical examples to modern drugs; mention supplements vs diet.",
        items: [
          {
            phrase: "derived from or use natural ingredients",
            sentence:
              "As you might know, a great number of scientific drugs are derived from or use natural ingredients.",
          },
          {
            phrase: "in ancient Greece",
            sentence:
              "For example, in ancient Greece, Hippocrates developed a treatment for headaches, incorporating a particular tree bark that was eventually used in the development of aspirin, now a popular painkiller.",
          },
          {
            phrase: "enhance concentration",
            sentence:
              "These oils are believed to enhance concentration, so much so that many parents give them to their children in order to try and help them perform better at school.",
          },
          {
            phrase: "protect the heart",
            sentence:
              "Such oils can also help to protect the heart, which I'm sure you'll agree is invaluable.",
          },
          {
            phrase: "fish oil supplements",
            sentence:
              "However, it might be that a change in diet, to just simply eating more oily fish, could be just as effective as taking fish oil supplements.",
          },
        ],
      },
    ],
  },
};
