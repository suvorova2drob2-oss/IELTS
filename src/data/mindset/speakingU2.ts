export const MS_U2_SPEAK_STEPS = [
  "Fluency idioms",
  "Idiom gaps",
  "Part 1 answers",
  "Discourse markers",
  "Exam practice",
] as const;

export const MS_U2_SPEAK_NEXT = [
  "Gaps →",
  "Part 1 →",
  "Markers →",
  "Exam →",
  "← Back to unit",
] as const;

export const speakingU2 = {
  id: "ms-u2-speaking-flow",
  bookPages: "pp. 47–51",
  sectionTitle: "Speaking · Fluency · Part 1–3 · Health",
  unitGoals: [
    "avoid fluency problems described by common idioms",
    "answer Part 1 questions appropriately",
    "use discourse markers to extend answers",
  ],
  steps: [
    {
      kind: "match" as const,
      badge: "1",
      instruction:
        "The following idioms describe problems you should try to avoid if you want to express yourself fluently. Match each idiom with its meaning.",
      bank: [
        "continuing to talk about the same idea without moving on",
        "forgetting what you were talking about / bringing in irrelevant ideas",
        "making mistakes while speaking; hesitation / mispronunciation",
        "explaining something at excessive length",
        "avoiding the central issue",
        "speaking so quickly that you cannot be understood",
      ],
      items: [
        { id: "1", stem: "going round in circles", key: "continuing to talk about the same idea without moving on" },
        { id: "2", stem: "losing your thread", key: "forgetting what you were talking about / bringing in irrelevant ideas" },
        { id: "3", stem: "stumbling over your words", key: "making mistakes while speaking; hesitation / mispronunciation" },
        { id: "4", stem: "labouring the point", key: "explaining something at excessive length" },
        { id: "5", stem: "beating about the bush", key: "avoiding the central issue" },
        { id: "6", stem: "talking at a mile a minute", key: "speaking so quickly that you cannot be understood" },
      ],
    },
    {
      kind: "gaps" as const,
      badge: "2",
      instruction: "Complete the sentences using the idioms from exercise 1 in the correct form.",
      bank: [
        "stumbling over my words",
        "talking at a mile a minute",
        "beat around the bush",
        "going round in circles",
        "labouring the point",
        "lost her thread",
      ],
      items: [
        { id: "1", stem: "I got too nervous and kept ______.", key: "stumbling over my words", alts: ["losing my thread", "talking at a mile a minute"] },
        { id: "2", stem: "I realised I was ______, so I took a deep breath and slowed down.", key: "talking at a mile a minute" },
        { id: "3", stem: "I'm not going to ______ — unless you work harder…", key: "beat around the bush" },
        { id: "4", stem: "This Reading question is impossible… I'm just ______.", key: "going round in circles" },
        { id: "5", stem: "My second paragraph was far too long and I ended up ______.", key: "labouring the point" },
        { id: "6", stem: "In Part 2 she ______ and started talking about unrelated things.", key: "lost her thread" },
      ],
    },
    {
      kind: "mcq" as const,
      badge: "4",
      instruction:
        "Examiner: How often do you eat healthy meals? Decide which candidate gives an appropriate Part 1 answer.",
      items: [
        {
          id: "1",
          stem: "Best Part 1 answer?",
          options: [
            { id: "A", text: "Candidate 1 — sociable eater; doesn't address 'healthy meals' frequency" },
            { id: "B", text: "Candidate 2 — abstract society/government advice (more Part 3)" },
            { id: "C", text: "Candidate 3 — personalises, answers the question, appropriate length" },
          ],
          key: "C",
          tip: "Candidate 3 sticks to the question and extends appropriately for Part 1.",
        },
      ],
    },
    {
      kind: "match" as const,
      badge: "6",
      instruction:
        "Match each discourse marker with its function when extending a Part 1 answer about relaxing with a movie.",
      bank: [
        "A Giving a reason for the previous point",
        "B Giving an example related to the previous point",
        "C Adding detail to the previous point",
        "D Introducing an idea that contrasts with the previous point",
      ],
      items: [
        { id: "1", stem: "The thing is", key: "A Giving a reason for the previous point" },
        { id: "2", stem: "On top of that", key: "C Adding detail to the previous point" },
        { id: "3", stem: "In particular", key: "B Giving an example related to the previous point" },
        { id: "4", stem: "That said", key: "D Introducing an idea that contrasts with the previous point" },
      ],
    },
    {
      kind: "discuss" as const,
      heading: "Exam practice",
      prompts: [
        "Part 1: How often do you eat healthy meals? How do you like to relax?",
        "Part 2: Describe a healthy habit you have (or would like to have).",
        "Part 3: Why do some people become vegetarian? Is government advice on diet helpful?",
        "Widen Part 3 answers with speculation about other people/society; round off with a short summary.",
      ],
    },
  ],
};
