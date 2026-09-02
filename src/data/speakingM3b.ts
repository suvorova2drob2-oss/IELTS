import socialImg from "../assets/speak-m3b-social-health.png";

export const SPEAK_M3B_STEPS = [
  "1 Lead-in",
  "2 Gap fill",
  "3 Part 3 prep",
  "4 Part 3 practice",
  "5 Assess",
] as const;

export const SPEAK_M3B_NEXT = [
  "2 Gap fill →",
  "3 Part 3 prep →",
  "4 Part 3 practice →",
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

export function checkSpeakM3b(input: string, answers: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return answers.some((a) => normalize(a) === n);
}

export type SpeakGapBit = { text: string } | { gap: number; key: string };

export function isSpeakGap(
  part: SpeakGapBit,
): part is { gap: number; key: string } {
  return "gap" in part;
}

export const speakingM3b = {
  id: "speaking-m3b-flow",
  bookPages: "p. 49 in your coursebook",
  sectionTitle: "Speaking · Part 3",
  testStrategies: "TEST STRATEGIES page 175",
  image: socialImg,
  imageAlt:
    "Crowded public transport — people standing close together in a train carriage.",
  leadIn: {
    badge: "1",
    instruction:
      "What social problem does this photo show? To what extent do you think it can cause health problems? What other social problems have negative effects on people's health?",
    suggestedTitle: "Suggested answer",
    suggestedAnswer: [
      "The photo appears to show social isolation or loneliness, which is an increasingly common issue in modern cities. People who lack regular social contact may feel anxious or depressed, and over time this can harm both mental and physical health.",
      "To a large extent, isolation can contribute to poor sleep, weaker immune function and unhealthy habits such as overeating or inactivity. Other social problems that damage health include poverty, long-term unemployment, overcrowded housing and limited access to healthcare.",
      "Addressing these issues requires community support, affordable housing and public health policies that help people stay connected and get medical advice early.",
    ],
    languageFocus: [
      "To a large extent",
      "contribute to",
      "social isolation",
      "mental and physical health",
      "public health policies",
      "stay connected",
    ],
  },
  gapFill: {
    badge: "2",
    heading: "Global health problems and solutions",
    instruction:
      "Complete the paragraphs with the words below.",
    bank: [
      "Aid",
      "Vaccinations",
      "bought",
      "contracting",
      "controlled",
      "cope",
      "education",
      "exist",
      "reflection",
      "sanitation",
    ],
    parts: [
      {
        text: "There are many health issues which affect broader society. One of these is stress; today, people have to ",
      },
      { gap: 1, key: "cope" },
      {
        text: " with lots of pressure in life in terms of work and finance. Another problem is obesity. This is because unhealthy food can be ",
      },
      { gap: 2, key: "bought" },
      {
        text: " relatively cheaply. However, this problem is perhaps specific to certain countries. In other countries, the problem is a lack of food. Hunger and poverty still ",
      },
      { gap: 3, key: "exist" },
      {
        text: " in many places in the world. Also, there are still many parts of the world that suffer from diseases which are not adequately ",
      },
      { gap: 4, key: "controlled" },
      { text: "." },
    ] satisfies SpeakGapBit[],
    parts2: [
      {
        text: "Although there are solutions to these problems, they are not easy to implement: ",
      },
      { gap: 5, key: "Vaccinations" },
      {
        text: " can prevent people from ",
      },
      { gap: 6, key: "contracting" },
      {
        text: " diseases, but there also needs to be improvements to ",
      },
      { gap: 7, key: "sanitation" },
      {
        text: " to help with other kinds of diseases which may be passed on by things like water supply rather than from person to person. ",
      },
      { gap: 8, key: "Aid" },
      {
        text: " programmes also help people in poverty; yet these need to be more sustainable; perhaps by supporting food production in certain countries. In other countries, obesity could be managed by teaching people from a young age what is in their food and how to make better food decisions through ",
      },
      { gap: 9, key: "education" },
      {
        text: ". Lastly, stress could be dealt with by exercise and ",
      },
      { gap: 10, key: "reflection" },
      { text: " on what is important in life." },
    ] satisfies SpeakGapBit[],
    followUp:
      "Work in pairs and discuss the question. What possible solutions can you suggest to combat poor nutrition, contagious diseases and sanitation?",
  },
  part3a: {
    badge: "6a",
    instruction:
      "Read the questions below and discuss what kind of answers could be given.",
    list1: [
      "What do you think are the most important health issues in society?",
      "How can these health issues be addressed?",
      "Do richer countries have a responsibility to help poorer countries in terms of health? Why/Why not?",
      "How do you think health issues have changed over time?",
    ],
    suggestedTitle: "Suggested answer",
    suggestedAnswer: [
      "The most important health issues today include mental health, obesity and unequal access to treatment. These problems affect productivity and quality of life across society.",
      "They can be addressed through prevention campaigns, better funding for primary care and education about diet and exercise. Richer countries do have some responsibility to support poorer nations, for example by sharing vaccines and medical training, because infectious disease does not stop at borders.",
      "Over time, health issues have shifted from mainly infectious diseases towards chronic and lifestyle-related conditions, so long-term prevention is now more important than ever.",
    ],
    languageFocus: [
      "unequal access",
      "quality of life",
      "prevention campaigns",
      "primary care",
      "chronic",
      "lifestyle-related",
    ],
  },
  part3b: {
    badge: "6b",
    instruction:
      "Work in pairs. Take turns to be the examiner and candidate, and ask and answer the questions. Use one list per student.",
    list2: [
      "In terms of health, how can people help themselves more?",
      "To what extent is it the government's responsibility to look after people's health?",
      "Should doctors focus more on preventing diseases rather than curing them? Why/Why not?",
      "In your opinion, which health issues are under-addressed? What can be done about this?",
    ],
  },
  assess: {
    badge: "Assess and improve",
    instruction:
      "Think about your speaking in Exercise 6b. Complete the checklist below about your lexical range.",
    items: [
      "I managed to answer the questions at length.",
      "I did not have difficulty thinking of words.",
      "I used some idiomatic vocabulary.",
      "I used collocations; I did not repeat phrases a lot.",
    ],
  },
};
