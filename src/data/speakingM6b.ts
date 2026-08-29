export const SPEAK_M6B_STEPS = [
  "1 Vocab gaps",
  "2 Fluency T/F",
  "3a–3b Improve",
  "4 Part 3",
  "5 Assess",
] as const;

export const SPEAK_M6B_NEXT = [
  "2 Fluency T/F →",
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

export function checkSpeakM6b(input: string, answers: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return answers.some((a) => normalize(a) === n);
}

export const speakingM6b = {
  id: "speaking-m6b-flow",
  bookPages: "p. 97 in your coursebook",
  sectionTitle: "Speaking · Part 3 (law enforcement)",
  testStrategies: "TEST STRATEGIES page 175",
  vocab1: {
    badge: "1",
    heading: "Law enforcement vocabulary",
    instruction:
      "Complete the sentences with the words below. Work out meanings from context if needed.",
    bank: [
      "suspects",
      "Social media",
      "hotspots",
      "drones",
      "facial-recognition",
      "prediction",
      "data sources",
    ],
    items: [
      {
        id: 1,
        before: "Police interview ",
        after: " who may have information about a crime.",
        answers: ["suspects"],
      },
      {
        id: 2,
        before: "",
        after: " posts can reveal where people were at a particular time.",
        answers: ["Social media"],
      },
      {
        id: 3,
        before: "Officers focus resources on crime ",
        after: " in the city.",
        answers: ["hotspots"],
      },
      {
        id: 4,
        before: "Aerial ",
        after: " can monitor large outdoor events.",
        answers: ["drones"],
      },
      {
        id: 5,
        before: "Software uses ",
        after: " technology to match faces from CCTV.",
        answers: ["facial-recognition"],
      },
      {
        id: 6,
        before: "Crime ",
        after: " tools try to forecast where offences may occur.",
        answers: ["prediction"],
      },
      {
        id: 7,
        before: "Analysts combine multiple ",
        after: " to build a fuller picture.",
        answers: ["data sources"],
      },
    ],
  },
  fluency2: {
    badge: "2",
    instruction:
      "Look at the fluency and coherence descriptors. Are these statements True or False?",
    items: [
      {
        id: 1,
        text: "Short answers are enough for a high band in Part 3.",
        key: "False",
        tip: "False – you need to give long answers.",
      },
      {
        id: 2,
        text: "You should connect ideas clearly with discourse markers.",
        key: "True",
        tip: "True",
      },
      {
        id: 3,
        text: "Grammar and vocabulary can be mostly inaccurate if you keep talking.",
        key: "False",
        tip: "False – they should predominantly be correct.",
      },
      {
        id: 4,
        text: "Hesitation that does not stop communication can still score well.",
        key: "True",
        tip: "True",
      },
      {
        id: 5,
        text: "Band 8 candidates never search for a word.",
        key: "False",
        tip: "False – it is just rare that a band 8 candidate might need to search for a word.",
      },
      {
        id: 6,
        text: "Topic development and coherence are important at higher bands.",
        key: "True",
        tip: "True",
      },
    ],
  },
  improve3: {
    badge: "3a–3b",
    instruction:
      "Listen to a weaker then stronger answer (audio later). Note how hesitancy falls, discourse markers improve order (pros/cons/evaluation), and vocabulary variety increases (e.g. not overusing officers).",
    tip: "The candidate improved by reducing hesitancy, using discourse markers, showing pros/cons and evaluation, and using more varied vocabulary.",
  },
  part3: {
    badge: "4",
    heading: "Test practice · Part 3",
    instruction:
      "Discuss for 3–4 minutes. Record if possible. Extend answers; reduce hesitancy; use connectors.",
    questions: [
      "Are the police more effective at catching criminals today than in the past? Why?",
      "Do you think crime rates will fall as technology improves? Why / Why not?",
      "What are the advantages and disadvantages of predictive policing tools?",
      "How might drones and data monitoring affect individual privacy?",
    ],
    tips: [
      "Technology and forensics (DNA, prints) help eliminate innocent parties and identify offenders; police are generally more effective, not necessarily more ‘astute’.",
      "Physical crime may fall, but cyber-crime may rise; police often lag behind hackers.",
      "Advantage: prevent crime before it happens; people feel safer. Disadvantage: privacy, false accusations, abuse of systems.",
      "Constant monitoring threatens personal space and data rights already debated on social media.",
    ],
  },
  assess5: {
    badge: "5a–5b",
    instruction:
      "Analyse your performance with a partner. Give advice on fluency, coherence and vocabulary range.",
  },
};
