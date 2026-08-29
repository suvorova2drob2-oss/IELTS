import type { MindsetFlowData } from "./flowTypes";

export const MS_U6_SPEAK_STEPS = [
  "Inventions",
  "Verb patterns",
  "Strategy MC",
  "Exam practice",
] as const;

export const MS_U6_SPEAK_NEXT = [
  "Patterns →",
  "Strategy →",
  "Exam →",
  "← Back to unit",
] as const;

export const speakingU6: MindsetFlowData = {
  id: "ms-u6-speaking-flow",
  bookPages: "pp. 133–138",
  sectionTitle: "Speaking · Inventions · Verb patterns",
  unitGoals: [
    "talk about inventions and technology",
    "use a wide range of verb patterns (to / -ing)",
    "buy time naturally in Part 3",
  ],
  steps: [...MS_U6_SPEAK_STEPS],
  nextLabels: [...MS_U6_SPEAK_NEXT],
  panels: [
    {
      kind: "match",
      badge: "1",
      instruction: "Under each picture write the year in which it was invented. Match each invention with its year.",
      bank: [
        { id: "1783", text: "1783" },
        { id: "1843", text: "1843" },
        { id: "1866", text: "1866" },
        { id: "1798", text: "1798" },
        { id: "1963", text: "1963" },
        { id: "1280", text: "1280" },
        { id: "1710", text: "1710" },
        { id: "2400 BC", text: "2400 BC" },
      ],
      items: [
        { id: "1", stem: "parachute", key: "1783" },
        { id: "2", stem: "typewriter", key: "1843" },
        { id: "3", stem: "dynamite", key: "1866" },
        { id: "4", stem: "vaccination", key: "1798" },
        { id: "5", stem: "computer mouse", key: "1963" },
        { id: "6", stem: "eyeglasses", key: "1280" },
        { id: "7", stem: "thermometer", key: "1710" },
        { id: "8", stem: "abacus", key: "2400 BC" },
      ],
    },
    {
      kind: "gaps",
      badge: "4 / 8",
      instruction: "Place correct verb patterns / corrected forms from the candidate script.",
      bank: [
        "used to",
        "'d be using",
        "'ve been thinking",
        "will be",
        "have become",
        "'m going to",
        "I'd like to tell",
        "let me begin",
        "remember being taught",
        "managed to attach",
        "can't help thinking",
        "imagine living",
        "allow us to have",
        "remember to look it up",
        "continue to be",
      ],
      items: [
        { id: "4-1", stem: "Not as much as I ______ (did in the past)", key: "used to" },
        { id: "4-2", stem: "After I first bought it, I ______ it almost constantly", key: "'d be using" },
        { id: "4-3", stem: "but I ______ that maybe I use it too often", key: "'ve been thinking" },
        { id: "4-4", stem: "I don't know if that ______ possible, though", key: "will be" },
        { id: "4-5", stem: "as they ______ such a big part of everyone's lives", key: "have become" },
        { id: "4-6", stem: "but I ______ try", key: "'m going to" },
        { id: "8-1", stem: "I'd like telling you → ______", key: "I'd like to tell" },
        { id: "8-2", stem: "let me to begin → ______", key: "let me begin" },
        { id: "8-5", stem: "remember to be taught → ______", key: "remember being taught" },
        { id: "8-7", stem: "managed attaching → ______", key: "managed to attach" },
        { id: "8-8", stem: "can't help think → ______", key: "can't help thinking" },
        { id: "8-10", stem: "imagine to live → ______", key: "imagine living" },
        { id: "8-11", stem: "allow us have → ______", key: "allow us to have" },
        { id: "8-13", stem: "remember looking it up → ______", key: "remember to look it up" },
        { id: "8-14", stem: "continue be → ______", key: "continue to be", altKeys: ["continue being"] },
      ],
    },
    {
      kind: "mc",
      badge: "12",
      instruction:
        "For this Part 3 question — How important is it for students to study science at school? — which of the strategies (A–C) does each candidate use to buy thinking time?",
      items: [
        {
          id: "1",
          stem: "Hm. Are science subjects an integral part of study at school? I'm not sure that they are. For one thing ...",
          options: [
            { id: "A", text: "Asking the examiner to clarify the question" },
            { id: "B", text: "Paraphrasing the question" },
            { id: "C", text: "Explaining that the question is not a simple one to answer" },
          ],
          key: "B",
        },
        {
          id: "2",
          stem: "Um, I'm not sure. Are you asking if science should be compulsory for all students, whatever year they are in at school? Or if science is just something we all need some degree of basic knowledge in?",
          options: [
            { id: "A", text: "Asking the examiner to clarify the question" },
            { id: "B", text: "Paraphrasing the question" },
            { id: "C", text: "Explaining that the question is not a simple one to answer" },
          ],
          key: "A",
        },
        {
          id: "3",
          stem: "Well, I don't think there's one, clear-cut answer to that. It really depends on the individual. By that I mean ...",
          options: [
            { id: "A", text: "Asking the examiner to clarify the question" },
            { id: "B", text: "Paraphrasing the question" },
            { id: "C", text: "Explaining that the question is not a simple one to answer" },
          ],
          key: "C",
        },
        {
          id: "4",
          stem: "I couldn't say for certain one way or another.",
          options: [
            { id: "A", text: "Asking the examiner to clarify the question" },
            { id: "B", text: "Paraphrasing the question" },
            { id: "C", text: "Explaining that the question is not a simple one to answer" },
          ],
          key: "C",
        },
        {
          id: "5",
          stem: "Do students need to study science at school? Perhaps, yes ...",
          options: [
            { id: "A", text: "Asking the examiner to clarify the question" },
            { id: "B", text: "Paraphrasing the question" },
            { id: "C", text: "Explaining that the question is not a simple one to answer" },
          ],
          key: "B",
        },
        {
          id: "6",
          stem: "As in, science should be studied at the expense of all other subjects?",
          options: [
            { id: "A", text: "Asking the examiner to clarify the question" },
            { id: "B", text: "Paraphrasing the question" },
            { id: "C", text: "Explaining that the question is not a simple one to answer" },
          ],
          key: "A",
        },
        {
          id: "7",
          stem: "That's a good question. Well, I suppose ...",
          options: [
            { id: "A", text: "Asking the examiner to clarify the question" },
            { id: "B", text: "Paraphrasing the question" },
            { id: "C", text: "Explaining that the question is not a simple one to answer" },
          ],
          key: "C",
        },
        {
          id: "8",
          stem: "By that do you mean, is science one of the main subjects that should be taught at school?",
          options: [
            { id: "A", text: "Asking the examiner to clarify the question" },
            { id: "B", text: "Paraphrasing the question" },
            { id: "C", text: "Explaining that the question is not a simple one to answer" },
          ],
          key: "A",
        },
      ],
    },
    {
      kind: "speak",
      badge: "EXAM",
      instruction: "Part 2–3 practice on science and technology. Use buying-time phrases when needed.",
      card: "Describe a useful invention.\n\nYou should say:\n• what it is\n• when it was invented\n• how it is used\nand explain why it is useful.",
      prompts: [
        "How has technology changed education?",
        "Do you think children spend too much time on screens?",
        "What scientific discovery has been most important for humanity?",
      ],
      tips: [
        "Buying time: That's quite a tricky question. / It's never crossed my mind before. / I'm not entirely sure what you're driving at. / Sorry, I don't quite follow. / my mind has gone blank",
      ],
      samples: [
        "Important inventions in Part 1/2 discussion: radio, electricity in homes, aeroplane, compass.",
      ],
    },

  ],
};
