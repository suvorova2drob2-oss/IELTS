export const LANG_M5A_STEPS = [
  "1a Reported text",
  "1b Rules",
  "2 Verb patterns",
  "5a Structures",
  "5b Complete",
  "Practice rewrite",
] as const;

export const LANG_M5A_NEXT = [
  "1b Rules →",
  "2 Verb patterns →",
  "5a Structures →",
  "5b Complete →",
  "Practice →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[.,;:!?]+$/g, "");
}

export function checkLangM5a(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export type LangM5aGap =
  | { text: string }
  | { gap: number; key: string };

export function isLangM5aGap(
  part: LangM5aGap,
): part is { gap: number; key: string } {
  return "gap" in part;
}

export const languageM5a = {
  id: "language-m5a-flow",
  bookPages: "p. 77 in your coursebook",
  sectionTitle: "Language development · Reported speech",
  grammarRef: "EXPERT GRAMMAR page 178",
  texts1a: {
    badge: "1a",
    heading: "Reported speech patterns",
    instruction:
      "Read the texts. Notice how direct ideas become reported speech.",
    texts: [
      `My lecturer told me that I'd get a better grade in my presentation on innovation in the workplace if I had more technology examples. I explained to her that I hadn't been able to find any good examples yet. She suggested that I looked in the Journal of Technology and Industry, which really helped me. I found this article about flexible computer screens. In it the author argued that one of the biggest benefits of this kind of technology was the possibility of saving office space.`,
      `Yesterday, my friend mentioned that she'd found a great app to help manage reading. Apparently, the app information said that it was for people who come across interesting articles, but then forget about them! She said she thought it'd be useful for researching general information for our course and I promised that I'd look it up as soon as I got home.`,
    ],
  },
  rules1b: {
    badge: "b",
    instruction: "Answer the questions about reported speech.",
    items: [
      {
        id: 1,
        q: "What usually happens to verb tenses in reported speech?",
        tip: "They shift back a tense except if already in the past perfect.",
      },
      {
        id: 2,
        q: "What happens to will / can?",
        tip: "They often become past modals (would and could).",
      },
      {
        id: 3,
        q: "What happens to pronouns and time/place words?",
        tip: "They shift to the impersonal / appropriate perspective.",
      },
    ],
  },
  verbs2: {
    badge: "2",
    instruction:
      "Which reporting verbs from the texts can be followed by each pattern? (Some fit more than one.)",
    patterns: [
      {
        id: 1,
        label: "verb + that-clause",
        answers: ["argue", "explain", "mention", "promise", "say", "suggest"],
      },
      {
        id: 2,
        label: "verb + object + that-clause / to-infinitive patterns in the texts",
        answers: ["explain", "mention", "say"],
      },
      {
        id: 3,
        label: "verb + object + to-infinitive (tell / promise)",
        answers: ["promise", "tell"],
      },
    ],
    tip: "argue 1 · explain 1, 2 · mention 1, 2 · promise 1, 3 · say 1, 2 · suggest 1 · tell 3",
  },
  structures5a: {
    badge: "5a",
    heading: "Other reporting structures",
    instruction:
      "Match the reporting structures (1–5) with the examples (A–E).",
    structures: [
      { id: 1, text: "ask + if/whether + clause" },
      { id: 2, text: "instruct + object + to-infinitive" },
      { id: 3, text: "ask + when + clause" },
      { id: 4, text: "ask + object + to-infinitive" },
      { id: 5, text: "wonder / want to know + wh- clause" },
    ],
    examples: [
      {
        id: "A",
        text: "The teacher asked the class to switch off their phones.",
        key: "4",
      },
      {
        id: "B",
        text: "She asked if/whether the invention had been tested.",
        key: "1",
      },
      {
        id: "C",
        text: "He wondered when the new robots would go on sale.",
        key: "5",
      },
      {
        id: "D",
        text: "The manager instructed staff to update the software.",
        key: "2",
      },
      {
        id: "E",
        text: "They asked when the presentation would start.",
        key: "3",
      },
    ],
    /** Keys from TB: 1B 2D 3E 4A 5C */
    keys: { "1": "B", "2": "D", "3": "E", "4": "A", "5": "C" } as Record<
      string,
      string
    >,
  },
  complete5b: {
    badge: "b",
    instruction: "Complete the sentences with the correct reporting phrases.",
    bank: [
      "asked if",
      "asked whether",
      "instructed",
      "to",
      "ask when",
      "asked",
    ],
    items: [
      {
        id: 1,
        before: "My tutor ",
        after: " I had finished the assignment.",
        answers: ["asked if", "asked whether"],
      },
      {
        id: 2,
        before: "The supervisor ",
        mid: " us ",
        after: " leave the lab tidy.",
        answers: ["instructed", "to"],
        dual: true,
      },
      {
        id: 3,
        before: "Could you ",
        after: " the results will be published?",
        answers: ["ask when"],
      },
      {
        id: 4,
        before: "She ",
        mid: " me ",
        after: " help with the prototype.",
        answers: ["asked", "to"],
        dual: true,
      },
    ],
  },
  rewrite: {
    badge: "Practice",
    instruction:
      "Rewrite the ideas in reported speech (use the model style from the texts).",
    items: [
      {
        id: 1,
        stem: "Direct: 'You'll get a better grade if you add technology examples.'",
        model:
          "My lecturer told me that I'd get a better grade if I had more technology examples.",
      },
      {
        id: 2,
        stem: "Direct: 'I haven't been able to find any good examples yet.'",
        model:
          "I explained that I hadn't been able to find any good examples yet.",
      },
      {
        id: 3,
        stem: "Direct: 'Look in the Journal of Technology and Industry.'",
        model:
          "She suggested that I looked in the Journal of Technology and Industry.",
      },
    ],
  },
};
