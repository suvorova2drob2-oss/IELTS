import type { MindsetFlowData } from "./flowTypes";

export const MS_U5_SPEAK_STEPS = [
  "Time periods",
  "Part 2 card",
  "Grammar fixes",
  "Part 3 openers",
  "Exam practice",
] as const;

export const MS_U5_SPEAK_NEXT = [
  "Part 2 →",
  "Grammar →",
  "Part 3 →",
  "Exam →",
  "← Back to unit",
] as const;

export const speakingU5: MindsetFlowData = {
  id: "ms-u5-speaking-flow",
  bookPages: "pp. 110–113",
  sectionTitle: "Speaking · History · GRA · Part 2–3",
  unitGoals: [
    "use historical time expressions",
    "show grammatical range and accuracy in Part 2",
    "agree and disagree naturally in Part 3",
  ],
  steps: [...MS_U5_SPEAK_STEPS],
  nextLabels: [...MS_U5_SPEAK_NEXT],
  panels: [
    {
      kind: "match",
      badge: "1–2",
      instruction:
        "Match historical periods / dates (a–g) with the descriptions (1–8). Click a letter chip, then click a description.",
      bank: [
        { id: "a", text: "prehistory" },
        { id: "b", text: "1900–1920" },
        { id: "c", text: "Middle Ages" },
        { id: "d", text: "millennium" },
        { id: "e", text: "3100 BCE" },
        { id: "f", text: "Y2K / 2000" },
        { id: "g", text: "Renaissance" },
      ],
      items: [
        { id: "7", stem: "before recorded history", key: "a" },
        { id: "5", stem: "between 1900 and 1920", key: "b" },
        { id: "2", stem: "between the 5th and the 15th century", key: "c" },
        { id: "1", stem: "a period of a thousand years", key: "d" },
        { id: "8", stem: "three thousand one hundred years before the birth of Jesus Christ", key: "e" },
        { id: "4", stem: "in 1999–2000", key: "f" },
        { id: "6", stem: "in 2000", key: "f" },
        { id: "3", stem: "after the Middle Ages, from the 14th to the 17th century, rebirth of classical learning", key: "g" },
      ],
    },
    {
      kind: "speak",
      badge: "Part 2",
      instruction:
        "Describe an important historical event in your country. Cover all bullet points in order. Aim for about 2 minutes.",
      card: "Describe an important historical event in your country.\n\nYou should say:\n• when it happened\n• who was involved\n• what caused the event\nand explain what people think about the event nowadays.",
      tips: [
        "Daniel mentions all points in order — strong GRA, fluency, pronunciation.",
        "Follow-up answers should be short (~15 seconds) and not introduce new ideas. Answer 3 is best.",
      ],
      samples: [
        "Grammar structures to aim for: past perfect, participle clauses, mixed conditionals, relative clauses, passive, past continuous, modal perfect, adjective + infinitive.",
      ],
    },
    {
      kind: "gaps",
      badge: "6",
      instruction:
        "Find 10 grammatical errors in the Beijing Olympics Part 2 script. Place the corrected form for each numbered error type.",
      tip: "Match error type → corrected wording.",
      bank: [
        "I had never been to Beijing before",
        "costumes flying across the stage",
        "If one had made a mistake, the whole show would have been ruined",
        "Beijing (no 'the')",
        "the Opening Ceremony / the Olympics",
        "small children were dressed",
        "I will never forget",
        "the most exciting day",
        "explained to me",
        "A small girl sang beautifully",
      ],
      items: [
        { id: "1", stem: "past perfect needed →", key: "I had never been to Beijing before" },
        { id: "2", stem: "present participle needed →", key: "costumes flying across the stage" },
        { id: "3", stem: "third conditional error →", key: "If one had made a mistake, the whole show would have been ruined" },
        { id: "4", stem: "unnecessary article →", key: "Beijing (no 'the')" },
        { id: "5", stem: "article missing ×2 →", key: "the Opening Ceremony / the Olympics" },
        { id: "6", stem: "subject/verb agreement in passive →", key: "small children were dressed" },
        { id: "7", stem: "future simple needed →", key: "I will never forget" },
        { id: "8", stem: "superlative error →", key: "the most exciting day" },
        { id: "9", stem: "verb pattern error →", key: "explained to me" },
        { id: "10", stem: "past continuous not needed →", key: "A small girl sang beautifully" },
      ],
    },
    {
      kind: "match",
      badge: "8–10",
      instruction:
        "Match Part 3 openings (a–d) with questions. Then sort agree / neither / disagree phrases.",
      bank: [
        { id: "a", text: "I'm not so sure about that." },
        { id: "b", text: "Absolutely!" },
        { id: "c", text: "Yes, definitely." },
        { id: "d", text: "To be honest, I'd say probably not." },
        { id: "Agree", text: "Agree column" },
        { id: "Neither", text: "Neither column" },
        { id: "Disagree", text: "Disagree column" },
      ],
      items: [
        { id: "q1", stem: "Do you think it's important for children to learn history at school?", key: "c" },
        { id: "q2", stem: "What about world history?", key: "a" },
        { id: "q3", stem: "Are most children interested in learning history these days?", key: "d" },
        { id: "q4", stem: "Can technology help us learn about history?", key: "b" },
        { id: "Certainly", stem: "Certainly. / Of course. / Sure. / Without a doubt →", key: "Agree" },
        { id: "Well", stem: "Well, there are two ways… / Possibly. / To some extent / It's hard to say →", key: "Neither" },
        { id: "Not", stem: "Not really. / Definitely not! / No, not at all. / To be frank… →", key: "Disagree" },
      ],
    },
    {
      kind: "speak",
      badge: "EXAM",
      instruction: "Part 3 practice — extend answers with reasons, examples and a range of agreement language.",
      prompts: [
        "Do you think it's important for children to learn history at school?",
        "You said children should learn the history of their own country. What about world history?",
        "Do you think most children are interested in learning history these days?",
        "Can technology help us learn about history?",
        "Why has attendance at museums declined so much in recent years?",
        "What important events do you think might take place in the future?",
      ],
      samples: [
        "Primary school — own community/country — identity; world history later at secondary school.",
        "More interested in technology — use it to learn history; visiting places is best.",
      ],
    },

  ],
};
