export const SPEAK_M6A_STEPS = [
  "1 Photos",
  "2a Match terms",
  "2b Discuss",
  "3a–3c Structure",
  "4–6 Part 3",
  "7 Assess",
] as const;

export const SPEAK_M6A_NEXT = [
  "2a Match →",
  "2b Discuss →",
  "3 Structure →",
  "4–6 Part 3 →",
  "7 Assess →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ");
}

export function checkSpeakM6a(input: string, answers: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return answers.some((a) => normalize(a) === n);
}

export const speakingM6a = {
  id: "speaking-m6a-flow",
  bookPages: "p. 91 in your coursebook",
  sectionTitle: "Speaking · Part 3 (surveillance)",
  testStrategies: "TEST STRATEGIES page 175",
  photos1: {
    badge: "1",
    heading: "Lead-in",
    instruction:
      "Look at the pictures. What forms of surveillance do they show? Discuss how common they are in your country.",
    tip: "The first shows closed circuit television (CCTV) and the second shows ID monitoring (chip and pin).",
  },
  match2a: {
    badge: "2a",
    heading: "Develop topic-specific vocabulary",
    instruction: "Match the terms (A–E) with the definitions (1–5).",
    bank: [
      { id: "A", text: "identity theft" },
      { id: "B", text: "invasion of privacy" },
      { id: "C", text: "safety measures" },
      { id: "D", text: "CCTV footage" },
      { id: "E", text: "online data" },
    ],
    items: [
      {
        id: 1,
        text: "Film recorded by cameras in public places that the police can use to track people and identify potential criminals.",
        key: "D",
      },
      {
        id: 2,
        text: "Information that people share on the internet, which can be misused if shared carelessly.",
        key: "E",
      },
      {
        id: 3,
        text: "When monitoring goes too far and interferes with someone’s private life.",
        key: "B",
      },
      {
        id: 4,
        text: "Stealing someone’s personal details in order to commit fraud.",
        key: "A",
      },
      {
        id: 5,
        text: "Steps a company takes to protect customers’ identity data from hackers.",
        key: "C",
      },
    ],
  },
  discuss2b: {
    badge: "b",
    instruction:
      "In small groups, discuss the topics below. Try to use the collocations from Exercise 2a.",
    topics: [
      "The benefits of CCTV",
      "The uses of online data",
      "The reasons for surveillance",
      "The balance between monitoring and privacy",
      "The safety of different websites",
    ],
    suggestedTitle: "Suggested answer",
    suggestedAnswer: [
      "CCTV has clear benefits — it helps police track people and identify potential criminals using footage from public places. In my country, cameras are common in shops, transport hubs and city centres, though some people consider constant monitoring an invasion of privacy.",
      "Online data is widely used by companies for marketing and by services we rely on daily, but careless sharing could lead to identity theft if personal details fall into the wrong hands. The balance between surveillance and privacy is delicate: safety measures protect customers, yet excessive monitoring can feel intrusive.",
      "When discussing the safety of different websites, I would use collocations like safety measures and online data — sticking to well-known sites with secure payment systems reduces risk, while unfamiliar platforms require more caution.",
    ],
  },
  structure3: {
    badge: "3a–3c",
    heading: "Ordering an argument (Part 3)",
    instruction:
      "Listen to a candidate (audio later). Note the question and the candidate’s view. Then match the stages of an argument with the order used.",
    questionTip:
      "Question: How safe do you think people feel about using websites? The candidate believes people generally know what they are doing and can tell when a website is dubious.",
    stages: [
      { id: "thesis", label: "thesis" },
      { id: "reasons", label: "reasons" },
      { id: "counter", label: "counter argument (reasons)" },
      { id: "evaluation", label: "evaluation (reasons)" },
    ],
    orderKey: ["thesis", "reasons", "counter", "evaluation"],
    match3c: {
      badge: "c",
      instruction: "Match the phrases (1–4) with the stages (A–D).",
      bank: [
        { id: "A", text: "thesis" },
        { id: "B", text: "reasons" },
        { id: "C", text: "counter argument" },
        { id: "D", text: "evaluation" },
      ],
      items: [
        {
          id: 1,
          text: "In my opinion / It’s my view / I believe",
          key: "A",
        },
        {
          id: 2,
          text: "Overall / In the end / At the end of the day",
          key: "D",
        },
        {
          id: 3,
          text: "I’ve heard people say / I know that others believe / Some people deny this",
          key: "C",
        },
        {
          id: 4,
          text: "This is because / The main reason I think this / There are many reasons why",
          key: "B",
        },
      ],
    },
  },
  part3: {
    badge: "4–6",
    heading: "Test practice · Part 3",
    instruction:
      "Make notes using thesis → reasons → counter argument → evaluation. Then discuss with a partner (3–4 minutes). Record if possible.",
    questions: [
      "How safe do people feel about using websites? Should they be concerned?",
      "How useful is CCTV in providing a secure environment?",
      "In what ways might sharing personal information online make people vulnerable to crime?",
    ],
    tips: [
      "Thesis: People shouldn’t be concerned. Reasons: most sites are fine; use common sense; stick to well-known sites. Counter: even big sites can be hacked — but money is usually returned. Overall: safer on big sites.",
      "Thesis: CCTV provides a secure environment. Reasons: recording crimes; increasing prevention. Counter: wrongly convicted people. Evaluation: useful if used carefully.",
      "Thesis: people may be vulnerable. Reasons: others know when you’re out; access to personal/financial details. Counter: unlikely for many, but be careful. Evaluation: although vulnerable, be careful.",
    ],
  },
  assess7: {
    badge: "7",
    instruction:
      "Listen to your recording (or your partner). Did you give reasons to support each stage of the argument? Note one strength and one improvement.",
  },
};
