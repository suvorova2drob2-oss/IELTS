export const SPEAK_M10B_STEPS = [
  "1 Vocab gaps",
  "2 Band descriptors",
  "3a–3b Lexis model",
  "4 Part 3",
  "5 Assess",
] as const;

export const SPEAK_M10B_NEXT = [
  "2 Bands →",
  "3 Lexis →",
  "4 Part 3 →",
  "5 Assess →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ");
}

export function checkSpeakM10b(input: string, answers: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return answers.some((a) => normalize(a) === n);
}

export const speakingM10b = {
  id: "speaking-m10b-flow",
  bookPages: "p. 161 in your coursebook",
  sectionTitle: "Speaking · Part 3 (inventions)",
  testStrategies: "TEST STRATEGIES page 175",
  vocab1: {
    badge: "2–3",
    heading: "Innovation vocabulary",
    instruction:
      "Complete with best-selling / pioneering / cutting-edge / state-of-the-art / world-leading / life-changing; then Alibaba text: launched · spearheaded · took the lead · instigated · laid the groundwork.",
    bank: [
      "best-selling",
      "pioneering",
      "cutting-edge",
      "state-of-the-art",
      "world-leading",
      "life-changing",
      "launched",
      "spearheaded",
      "took the lead",
      "instigated",
      "laid the groundwork",
    ],
    items: [
      {
        id: 1,
        before: "Last year’s ",
        after:
          " gadget was the tablet, which outperformed mobile phone and laptop sales by 20 percent.",
        answers: ["best-selling"],
      },
      {
        id: 2,
        before: "Honda is considered to be the automobile company which does the most ",
        after: " research into robotics and design.",
        answers: ["pioneering"],
      },
      {
        id: 3,
        before: "An example of ",
        after: " technology in medical science is nanotechnology.",
        answers: ["cutting-edge"],
      },
      {
        id: 4,
        before: "The company only uses ",
        after:
          " chairs to ensure their employees suffer less from back problems.",
        answers: ["state-of-the-art"],
      },
      {
        id: 5,
        before: "Philips is a ",
        after: " company in the consumer electronics industry.",
        answers: ["world-leading"],
      },
      {
        id: 6,
        before:
          "Nowadays surgeons can change people’s lives with operations to give patients new, ",
        after: " replacement limbs.",
        answers: ["life-changing"],
      },
      {
        id: 7,
        before: "The company was ",
        after: " in China in 1999…",
        answers: ["launched"],
      },
      {
        id: 8,
        before: "…and was ",
        after: " by Jack Ma, businessman and philanthropist.",
        answers: ["spearheaded"],
      },
      {
        id: 9,
        before: "…and as such it ",
        after:
          " on the idea of one company diversifying into a range of industries…",
        answers: ["took the lead"],
      },
      {
        id: 10,
        before: "…in 2009 it ",
        after: " a new sales holiday called ‘Singles Day’…",
        answers: ["instigated"],
      },
      {
        id: 11,
        before: "Perhaps Alibaba has ",
        after:
          " for other organisations to adopt, or even adapt, their model.",
        answers: ["laid the groundwork"],
      },
    ],
  },
  fluency2: {
    badge: "4a",
    instruction:
      "Read lexical resource band descriptors. Are these statements True or False?",
    items: [
      {
        id: 1,
        text: "Band 8 can communicate meaning precisely and use idiom and collocation well; inaccuracies are unusual.",
        key: "True",
        tip: "True",
      },
      {
        id: 2,
        text: "Band 8 paraphrase is used effectively when needed.",
        key: "True",
        tip: "True",
      },
      {
        id: 3,
        text: "Band 7 cannot paraphrase at all.",
        key: "False",
        tip: "False — Band 7 can also paraphrase; there is flexibility with some understanding of style/collocation.",
      },
      {
        id: 4,
        text: "The difference between 7 and 8 includes precision, idiom/collocation control and rarity of inaccuracies.",
        key: "True",
        tip: "True",
      },
    ],
  },
  improve3: {
    badge: "b",
    instruction:
      "Listen to Jina (audio later). Note high-level vocabulary: overlooked, beneficial aspects, assert, instigate, launched, revolutionise, repercussions, adverse effects, cyber bullying, outcomes.",
    tip: "Jina: For me, the drawbacks of inventions can be overlooked in favour of the beneficial aspects… inventions instigate positive changes… When it was launched… revolutionise our lives… negative repercussions… adverse effects… So there’s usually both good and bad outcomes.",
  },
  part3: {
    badge: "5",
    heading: "Test practice · Part 3",
    instruction:
      "Plan vocabulary from the unit, then take turns asking and answering. Record if possible.",
    questions: [
      "Why is invention vital for the development of society?",
      "What do you think it is that might drive people to invent?",
      "How have recent technological inventions or discoveries changed the world?",
      "What would you say have been the most useful inventions?",
    ],
    tips: [
      "It pushes forward development and harnesses people’s desire to improve their lives; brings people together on projects.",
      "When someone sees something which doesn’t work well and feels able to produce a better version.",
      "The internet has changed communication and business; medical science has been transformational.",
      "Most useful: environmental protection / alternative energy — many other inventions are resource-intensive.",
    ],
  },
  assess5: {
    badge: "6a–6b",
    instruction:
      "Analyse your vocabulary with a partner. Discuss how you could both improve. If possible, listen to your recorded answers first.",
  },
};
