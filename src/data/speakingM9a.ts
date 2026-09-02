export const SPEAK_M9A_STEPS = [
  "1 Lead-in",
  "2a Match idioms",
  "2b Discuss",
  "3a–3c Thinking time",
  "4–5 Part 3",
  "6 Assess",
] as const;

export const SPEAK_M9A_NEXT = [
  "2a Match →",
  "2b Discuss →",
  "3 Thinking time →",
  "4–5 Part 3 →",
  "6 Assess →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ");
}

export function checkSpeakM9a(input: string, answers: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return answers.some((a) => normalize(a) === n);
}

export const speakingM9a = {
  id: "speaking-m9a-flow",
  bookPages: "p. 139 in your coursebook",
  sectionTitle: "Speaking · Part 3 (success)",
  testStrategies: "TEST STRATEGIES page 175",
  photos1: {
    badge: "1",
    heading: "Lead-in",
    instruction:
      "Discuss the metaphor that success comes from hard work — that you can’t expect success if you aren’t prepared to work hard. What personal qualities make someone admirable?",
    tip: "Suggested: Great achievements are based on belief and tenacity. Qualities might include patience, generosity, commitment and resilience.",
  },
  match2a: {
    badge: "2a",
    heading: "Idioms for success",
    instruction: "Match the idioms (A–E) with the meanings (1–5).",
    bank: [
      { id: "A", text: "standing out from the crowd" },
      { id: "B", text: "be a cut above" },
      { id: "C", text: "gone to great lengths" },
      { id: "D", text: "set their sights on" },
      { id: "E", text: "putting your mind to" },
    ],
    items: [
      {
        id: 1,
        text: "Being noticeably different or better than others around you.",
        key: "A",
      },
      {
        id: 2,
        text: "To be better than others of the same type.",
        key: "B",
      },
      {
        id: 3,
        text: "Made a lot of effort to achieve something.",
        key: "C",
      },
      {
        id: 4,
        text: "Decided they want to achieve a particular goal.",
        key: "D",
      },
      {
        id: 5,
        text: "Concentrating hard on something in order to succeed.",
        key: "E",
      },
    ],
  },
  discuss2b: {
    badge: "b",
    instruction:
      "Write questions using the idioms from Exercise 2a. Mingle / work in pairs to ask and answer.",
    topics: [
      "What hidden talents have you got?",
      "Was there a time in your life when you stood out from the crowd?",
      "What have you set your sights on?",
      "What have you gone to great lengths to achieve?",
      "What can you achieve by putting your mind to it?",
    ],
    suggestedTitle: "Suggested answer",
    suggestedAnswer: [
      "I was often creative as a child because I loved to collect objects from the natural world and turn them into pictures. I would use my vivid imagination to arrange leaves, stones and feathers, then add paint or writing to give the result a bit more artistic flair.",
      "One hidden talent I had was making up stories — I could think laterally and solve problems in unusual ways, such as building a fort from furniture when we had no proper toys. As an adult, I try not to stifle creativity by sticking rigidly to routines.",
      "When discussing these topics, use rising intonation and a slower pace when you need thinking time — phrases like ‘Mmm, that's quite a difficult question…' give you a moment to gather your ideas before answering fully.",
    ],
  },
  structure3: {
    badge: "3a–3c",
    heading: "Creating thinking time (Part 3)",
    instruction:
      "Listen to a candidate (audio later). Note thinking-time phrases and how slower speech / rising intonation show uncertainty. Then match phrases with techniques A–D.",
    questionTip:
      "Sample: That depends… Mmm, that’s quite a difficult question… I think this is different for everyone, but it is also often culturally determined… As far as I’m concerned, success can be achieved… I’m not sure if this is the correct way to say it, but success happens when you know what your goals are.",
    stages: [
      { id: "hesitate", label: "hesitation fillers" },
      { id: "rephrase", label: "rephrasing / checking wording" },
      { id: "generalise", label: "generalising before personal view" },
      { id: "opinion", label: "clear opinion markers" },
    ],
    orderKey: ["hesitate", "generalise", "opinion", "rephrase"],
    match3c: {
      badge: "c",
      instruction:
        "Match the phrase numbers with techniques A–D (Teacher’s Book: A 3,8 · B 4,6 · C 1 · D 2,5,7).",
      bank: [
        { id: "A", text: "A — hesitation / thinking aloud" },
        { id: "B", text: "B — softening / checking language" },
        { id: "C", text: "C — delaying with ‘That depends…’" },
        { id: "D", text: "D — general / cultural framing" },
      ],
      items: [
        {
          id: 1,
          text: "1 That depends…",
          key: "C",
        },
        {
          id: 2,
          text: "2 I think this is different for everyone…",
          key: "D",
        },
        {
          id: 3,
          text: "3 Mmm, that’s quite a difficult question…",
          key: "A",
        },
        {
          id: 4,
          text: "4 I’m not sure if this is the correct way to say it…",
          key: "B",
        },
        {
          id: 5,
          text: "5 …it is also often culturally determined…",
          key: "D",
        },
        {
          id: 6,
          text: "6 …maybe… aware of what your goals are.",
          key: "B",
        },
        {
          id: 7,
          text: "7 …or perhaps even as a result of our upbringing…",
          key: "D",
        },
        {
          id: 8,
          text: "8 As far as I’m concerned… (while still gathering thoughts)",
          key: "A",
        },
      ],
    },
  },
  part3: {
    badge: "4–5",
    heading: "Test practice · Part 3",
    instruction:
      "Choose two or three thinking-time phrases. Discuss the topics (5–10 minutes). Use idioms where natural. Record if possible.",
    questions: [
      "What does success mean in different cultures?",
      "Is hard work more important than talent? Why?",
      "Why do some people stand out from the crowd in their careers?",
      "What goals have young people typically set their sights on today?",
    ],
    tips: [
      "Use: That depends… / That’s quite a difficult question… / As far as I’m concerned…",
      "Structure: generalise → give personal view → example → brief evaluation.",
      "Refer to Expert speaking (Test 2, Part 3) on page 189.",
    ],
  },
  assess7: {
    badge: "6",
    instruction:
      "Analyse your answers with a partner. Did you use thinking-time phrases and develop ideas fully? Note one strength and one improvement.",
  },
};
