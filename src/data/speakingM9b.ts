export const SPEAK_M9B_STEPS = [
  "1 Vocab gaps",
  "2 Pronunciation",
  "3a–3b Improve",
  "4 Part 3",
  "5 Assess",
] as const;

export const SPEAK_M9B_NEXT = [
  "2 Pronunciation →",
  "3a–3b Improve →",
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

export function checkSpeakM9b(input: string, answers: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return answers.some((a) => normalize(a) === n);
}

export const speakingM9b = {
  id: "speaking-m9b-flow",
  bookPages: "p. 145 in your coursebook",
  sectionTitle: "Speaking · Part 3 (work & qualifications)",
  testStrategies: "TEST STRATEGIES page 175",
  vocab1: {
    badge: "1",
    heading: "Business & work vocabulary",
    instruction:
      "Complete the sentences with the words below. Work out meanings from context if needed.",
    bank: [
      "entrepreneur",
      "incentive",
      "monopoly",
      "overheads",
      "redundant",
      "worth",
      "corporation",
      "lucrative",
    ],
    items: [
      {
        id: 1,
        before: "She left her job to become an ",
        after: " and build her own company.",
        answers: ["entrepreneur"],
      },
      {
        id: 2,
        before: "A bonus can be a strong ",
        after: " for employees to meet targets.",
        answers: ["incentive"],
      },
      {
        id: 3,
        before: "Without competition, a ",
        after: " can keep prices high.",
        answers: ["monopoly"],
      },
      {
        id: 4,
        before: "Rent and utilities are major ",
        after: " for small shops.",
        answers: ["overheads"],
      },
      {
        id: 5,
        before: "After automation, some factory roles became ",
        after: ".",
        answers: ["redundant"],
      },
      {
        id: 6,
        before: "The shares are now ",
        after: " far more than they were five years ago.",
        answers: ["worth"],
      },
      {
        id: 7,
        before: "He works for a large multinational ",
        after: " with offices on three continents.",
        answers: ["corporation"],
      },
      {
        id: 8,
        before: "Space technology may become a highly ",
        after: " industry in the next fifty years.",
        answers: ["lucrative"],
      },
    ],
  },
  fluency2: {
    badge: "2",
    instruction:
      "Look at pronunciation descriptors. Are these statements True or False? (Kenji ≈ band 8 pronunciation; Steffi ≈ band 6 due to mixed control / clarity.)",
    items: [
      {
        id: 1,
        text: "Word and sentence stress help make meaning clear in Part 3.",
        key: "True",
        tip: "True",
      },
      {
        id: 2,
        text: "Intonation is irrelevant when giving opinions.",
        key: "False",
        tip: "False – intonation shows opinion and attitude.",
      },
      {
        id: 3,
        text: "Connected speech and weak forms (including schwa) matter at higher bands.",
        key: "True",
        tip: "True",
      },
      {
        id: 4,
        text: "Mispronouncing key words never affects the score if you keep talking.",
        key: "False",
        tip: "False – unclear words can obscure meaning.",
      },
      {
        id: 5,
        text: "A band 8 speaker typically shows strong control of pronunciation features.",
        key: "True",
        tip: "True – e.g. Kenji would likely receive a band 8 for pronunciation.",
      },
      {
        id: 6,
        text: "Mixed control and lack of clarity can limit a candidate to around band 6.",
        key: "True",
        tip: "True – e.g. Steffi.",
      },
    ],
  },
  improve3: {
    badge: "3a–3b",
    instruction:
      "Listen to candidates (audio later). Note word/sentence stress, intonation, connected speech and clarity. Then practise giving full answers using vocabulary from Exercise 1b.",
    tip: "Focus on: word/sentence stress, intonation to show opinion, connected speech, the schwa sound, weak forms.",
  },
  part3: {
    badge: "4",
    heading: "Test practice · Part 3",
    instruction:
      "Discuss for 3–4 minutes. Record if possible. Give full answers; watch pronunciation; use a range of vocabulary.",
    questions: [
      "Do employers value qualifications or experience more? What will matter most in the future?",
      "Would you rather be an entrepreneur or work in a corporation? Why?",
      "Which incentives motivate employees most — monetary or non-monetary?",
      "How has technology changed the way we work? Will offices become a thing of the past?",
    ],
    tips: [
      "Suggested: organisations often have training programmes so qualifications may matter more; transferable skills and technology knowledge will be vital.",
      "Entrepreneur: independence vs unreliable income. Corporation: stability vs adapting to markets / replacing staff.",
      "Monetary incentives let people choose how to spend extra money; permanent contracts also motivate via security.",
      "Email makes people always contactable; automation speeds processes. Future: more home working, multiple careers.",
    ],
  },
  assess5: {
    badge: "5a–5b",
    instruction:
      "Analyse your performance with a partner. Comment on pronunciation, vocabulary range and how fully you developed answers. Suggest one improvement.",
  },
};
