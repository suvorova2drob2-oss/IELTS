export const SPEAK_M10A_STEPS = [
  "1 Lead-in",
  "2a Match phrases",
  "2b–2c Discuss",
  "3a–3c Part 2",
  "4–5 Part 2+3",
  "6 Assess",
] as const;

export const SPEAK_M10A_NEXT = [
  "2a Match →",
  "2b Discuss →",
  "3 Part 2 →",
  "4–5 Practice →",
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

export function checkSpeakM10a(input: string, answers: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return answers.some((a) => normalize(a) === n);
}

export const speakingM10a = {
  id: "speaking-m10a-flow",
  bookPages: "p. 155 in your coursebook",
  sectionTitle: "Speaking · Part 2 & 3 (creativity)",
  testStrategies: "TEST STRATEGIES pages 174 and 175",
  photos1: {
    badge: "1",
    heading: "Lead-in",
    instruction:
      "Read the definitions of creativity in the poster. Which one(s) do you agree and disagree with? Discuss your ideas in groups. Justify your favourite definition.",
    tip: "Creativity definitions on the poster include: something some are blessed with; allowing the mind to roam freely; trusting your instincts; coming together of ideas; daring to be different; adapting the rules; expressing yourself freely without having your wings clipped.",
  },
  match2a: {
    badge: "2a",
    heading: "Topic-specific vocabulary",
    instruction: "Match the phrases (1–5) with their definitions (A–E).",
    bank: [
      { id: "A", text: "A to have a way of doing things that is interesting and shows imagination" },
      { id: "B", text: "B to stop creativity from happening or developing" },
      { id: "C", text: "C to use your imagination to see relationships between things not normally thought of together" },
      { id: "D", text: "D to have the ability to imagine unlikely situations very clearly" },
      { id: "E", text: "E to have ability which you do not put to good use" },
    ],
    items: [
      { id: 1, text: "1 to waste your talent", key: "E" },
      { id: 2, text: "2 to have a vivid imagination", key: "D" },
      { id: 3, text: "3 to stifle creativity", key: "B" },
      { id: 4, text: "4 to have artistic flair", key: "A" },
      { id: 5, text: "5 to think laterally", key: "C" },
    ],
  },
  discuss2b: {
    badge: "b–c",
    instruction:
      "Listen (audio later) and complete phrases: vivid imagination · stifle (our) creativity · think laterally · wasting my talent · artistic flair. Then discuss: A time when you were creative · A talent you had as a child · A problem you solved in an unusual way.",
    topics: [
      "A time when you were creative",
      "A talent you had as a child",
      "A problem you solved in an unusual way",
    ],
    tip: "Suggested: I was often creative as a child because I loved to collect objects from the natural world and turn them into pictures… use my vivid imagination… add paint or writing to give it a bit more artistic flair.",
  },
  structure3: {
    badge: "3a–3c",
    heading: "Part 2 · something you made that did not go as planned",
    instruction:
      "Describe something you made that did not go as planned. You should say: what you made; what problems you had; how you tried to solve the problems; and explain how you would do things differently if you tried again. Where could you use your imagination / speculation?",
    questionTip:
      "Jing’s notes (10.2): 1 a princess costume · 2 She ruined the material because she didn’t know how to work the sewing machine · 3 called her friend to help · 4 learn to operate the machine, draw the design better. Speculation structures: would + verb; would + have + past participle; should + have + past participle.",
    stages: [
      { id: "what", label: "what you made" },
      { id: "problems", label: "problems" },
      { id: "solve", label: "how you solved them" },
      { id: "differently", label: "do differently (speculate)" },
    ],
    orderKey: ["what", "problems", "solve", "differently"],
    match3c: {
      badge: "c",
      instruction:
        "Match speculation structures used in Jing’s answer (would / would have / should have).",
      bank: [
        { id: "A", text: "would + verb (future/present alternative)" },
        { id: "B", text: "would + have + past participle" },
        { id: "C", text: "should + have + past participle" },
        { id: "D", text: "wish + past perfect" },
      ],
      items: [
        {
          id: 1,
          text: "I wish I’d read the machine instructions beforehand.",
          key: "D",
        },
        {
          id: 2,
          text: "I would make sure I knew how to operate any machinery properly…",
          key: "A",
        },
        {
          id: 3,
          text: "I think I should have drawn out the design more thoroughly.",
          key: "C",
        },
        {
          id: 4,
          text: "…the costume would have been easier to make with a clearer design.",
          key: "B",
        },
      ],
    },
  },
  part3: {
    badge: "4–5",
    heading: "Test practice · Part 2 + Part 3",
    instruction:
      "Part 2: Describe a creative project you were involved in (role, aim, what you learnt, how you felt). Part 3: discuss the questions (2 minutes Part 2 / 3–4 minutes Part 3).",
    questions: [
      "In what ways is creativity valued and rewarded in society?",
      "What opportunities for creativity does modern life provide?",
      "In what ways would you expect to find creativity in the workplace nowadays?",
      "How can more creativity be brought into our everyday lives?",
    ],
    tips: [
      "Creativity tends to be valued and rewarded in business; ideas can be extremely lucrative.",
      "Due to globalisation, opportunities have widened in education and the workplace.",
      "Creativity can be found in colleagues’ ideas and new ways of working — how we conceptualise creativity.",
      "Painting, literature, thinking laterally and using a vivid imagination can increase creativity.",
    ],
  },
  assess7: {
    badge: "6",
    instruction:
      "Analyse your answers. Did you speculate with would / would have / should have? Did you use vivid imagination, artistic flair, think laterally? Note one strength and one improvement.",
  },
};
