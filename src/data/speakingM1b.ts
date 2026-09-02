import speakImg from "../assets/speak-m1b-decision.png";

export const SPEAK_M1B_STEPS = [
  "1a Discuss",
  "1b Collocations",
  "1c Your decision",
  "3 Test practice",
  "4a Assess",
] as const;

export const SPEAK_M1B_NEXT = [
  "1b Collocations →",
  "1c Discuss →",
  "Test practice →",
  "Assess →",
  "← К модулю",
] as const;

export const speakingM1b = {
  id: "speaking-m1b-flow",
  bookPages: "p. 17 in your coursebook",
  sectionTitle: "Speaking (Part 1)",
  vocabTitle: "Vocabulary development",
  image: speakImg,
  imageAlt:
    "A woman holding a chocolate cupcake in one hand and a green apple in the other, deciding which to choose.",
  step1a: {
    instruction:
      "1a Look at the picture above. What decision do you think the woman has to make? What would you do in this situation? Why?",
  },
  step1b: {
    instruction: "Complete the collocations (1–8) with the verbs below.",
    bank: [
      "deal",
      "draw up",
      "change",
      "come",
      "consider",
      "reach",
      "resolve",
      "take",
    ],
    items: [
      { id: 1, gap: "a list", key: "draw up" },
      { id: 2, gap: "the alternatives", key: "consider" },
      { id: 3, gap: "to a conclusion", key: "come" },
      { id: 4, gap: "action", key: "take" },
      { id: 5, gap: "your mind", key: "change" },
      { id: 6, gap: "an issue", key: "resolve" },
      { id: 7, gap: "with a problem", key: "deal" },
      { id: 8, gap: "a decision", key: "reach" },
    ],
    tip: "1 draw up · 2 consider · 3 come · 4 take · 5 change · 6 resolve · 7 deal · 8 reach",
  },
  step1c: {
    instruction:
      "What big decisions have you had to make in your life? Choose ONE and describe the decision-making process to your partner. Use the vocabulary in Exercise 1b.",
    suggestedTitle: "Suggested answer",
    suggestedAnswer: [
      "One of the biggest decisions I've had to make was choosing which university to attend. I had to draw up a list of criteria — course quality, location and cost — and consider each option carefully.",
      "I took my time rather than rushing into a choice. I talked to teachers, came to a shortlist of three universities and finally reached a decision after visiting two campuses.",
      "Looking back, I'm glad I resolved to prioritise the course content over the city lifestyle. It was stressful at the time, but the structured process helped me feel confident about the outcome.",
    ],
  },
  stepTest: {
    heading: "Test practice",
    strategies: "TEST STRATEGIES page 174",
    instruction:
      "Ask and answer the questions, taking turns to be the examiner and candidate. Record your answers if possible.",
    questions: [
      "What was your favourite subject at school?",
      "Why did you like it?",
      "What did you enjoy about going to school?",
      "What other activities did you take part in at school?",
      "What do you want to study in the future?",
      "Why did you decide to take the IELTS test?",
    ],
  },
  stepAssess: {
    heading: "Assess and improve",
    instruction: "How did you perform in the interview? Complete the checklist.",
    items: [
      "I used a variety of tenses and vocabulary.",
      "I avoided too much repetition in my answers.",
      "I spoke fluently and with clear pronunciation.",
    ],
  },
};

export type SpeakingM1bData = typeof speakingM1b;
