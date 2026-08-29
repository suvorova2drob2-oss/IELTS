export const LANG_M10B_STEPS = [
  "1a Past modals",
  "1b–2 Cousteau text",
  "3 Speak",
  "4a Infinitive / gerund",
  "4b Verb patterns",
  "4c Practice",
] as const;

export const LANG_M10B_NEXT = [
  "1b–2 Cousteau →",
  "3 Speak →",
  "4a Patterns →",
  "4b Gaps →",
  "4c Practice →",
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

export function checkLangM10b(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export const languageM10b = {
  id: "language-m10b-flow",
  bookPages: "p. 160 in your coursebook",
  sectionTitle: "Language · Past modals; verb patterns",
  grammarRef: "EXPERT GRAMMAR page 182",
  cleft1a: {
    badge: "1",
    instruction:
      "Match the phrases (1–3) with their functions (A–C). Keys: 1 B · 2 A · 3 C.",
    items: [
      {
        id: "A",
        text: "1 Medical science could have found a cure for the common cold if there was more interest in the topic.",
        key: "1",
        tip: "B — other possibilities if something in the past had been different.",
      },
      {
        id: "B",
        text: "2 The government should have invested more in engineering companies to encourage innovation.",
        key: "2",
        tip: "A — a different action in the past was recommended.",
      },
      {
        id: "C",
        text: "3 The attempt to fly a hot air balloon across the Atlantic would have been successful if the burner had not failed.",
        key: "3",
        tip: "C — imagine an alternative result if something in the past had been different.",
      },
    ],
  },
  rewrite1b: {
    badge: "Background",
    instruction:
      "Jacques Cousteau (1910–1997) was a French scientist and filmmaker who co-invented the Aqua-lung. Study how past modals express alternative pasts.",
    items: [
      {
        id: 1,
        stem: "could have",
        model: "other possibilities if the past had been different",
      },
      {
        id: 2,
        stem: "should have",
        model: "a different past action was recommended",
      },
      {
        id: 3,
        stem: "would have",
        model: "alternative result if something in the past had been different",
      },
      {
        id: 4,
        stem: "may / might have",
        model: "possible past (less certain)",
      },
    ],
  },
  speak1c: {
    badge: "3",
    instruction:
      "Discuss: Choose an event in your past and imagine an alternative outcome. Think of a decision you made recently and imagine making a different decision. Imagine a different outcome to a recent world event. Use could/would/should have.",
  },
  thereIt2a: {
    badge: "2",
    instruction:
      "Complete the Cousteau text with could / may / could / should / would not.",
    bank: ["could", "may", "could", "should", "would not"],
    items: [
      {
        id: 1,
        before: "However, his life ",
        after: " have been very different.",
        answers: ["could"],
      },
      {
        id: 2,
        before:
          "If he had not had the accident, he ",
        after: " not have become so interested in the sea.",
        answers: ["may"],
      },
      {
        id: 3,
        before: "His life ",
        after:
          " have been cut short by this dangerous work, but he survived…",
        answers: ["could"],
      },
      {
        id: 4,
        before: "He realised that he ",
        after: " have used the media to generate attention…",
        answers: ["should"],
      },
      {
        id: 5,
        before:
          "If Cousteau had not dedicated himself so thoroughly to his work, we ",
        after: " have furthered our knowledge of the sea nearly so quickly.",
        answers: ["would not"],
      },
    ],
  },
  incorrect2b: {
    badge: "4a",
    instruction:
      "Are these verbs followed by the infinitive or the gerund? Mark Correct if the pattern shown is right; Incorrect if wrong.",
    items: [
      {
        id: 1,
        text: "afford + infinitive (afford to pay)",
        verdict: "Correct",
        tip: "Correct — afford, manage, promise + infinitive.",
      },
      {
        id: 2,
        text: "avoid + infinitive (avoid to spend)",
        verdict: "Incorrect",
        tip: "Incorrect — avoid, deny, involve, risk, suggest + gerund.",
      },
      {
        id: 3,
        text: "deny + gerund (denied subsidising)",
        verdict: "Correct",
        tip: "Correct",
      },
      {
        id: 4,
        text: "involve + infinitive (involves to ensure)",
        verdict: "Incorrect",
        tip: "Incorrect — involve + gerund (involves ensuring).",
      },
      {
        id: 5,
        text: "promise + infinitive (promised to invest)",
        verdict: "Correct",
        tip: "Correct",
      },
      {
        id: 6,
        text: "suggest + gerund (suggested participating)",
        verdict: "Correct",
        tip: "Correct",
      },
    ],
  },
  practice2c: {
    badge: "b",
    instruction:
      "Complete with the correct form of the verbs in brackets (Teacher’s Book keys).",
    bank: [
      "afford to pay",
      "involves ensuring",
      "avoid spending",
      "denied subsidising",
      "suggested participating",
      "promised to invest",
    ],
    items: [
      {
        id: 1,
        before: "Many parents cannot ",
        after: " for their children to go to medical school.",
        answers: ["afford to pay"],
      },
      {
        id: 2,
        before: "Driving innovation forward ",
        after:
          " that there are plenty of opportunities for people to express their ideas.",
        answers: ["involves ensuring"],
      },
      {
        id: 3,
        before: "Potential inventors should ",
        after:
          " too much time on social media or the internet if they want to develop their ideas fully.",
        answers: ["avoid spending"],
      },
      {
        id: 4,
        before: "The government ",
        after:
          " the technology industries more than they subsidised the engineering industries.",
        answers: ["denied subsidising"],
      },
      {
        id: 5,
        before: "Last year my teacher ",
        after: " in a design competition.",
        answers: ["suggested participating"],
      },
      {
        id: 6,
        before: "Several well-known actors have ",
        after:
          " in a new organisation for young people to get involved in design and technology.",
        answers: ["promised to invest"],
      },
    ],
  },
  practice2d: {
    badge: "c",
    instruction:
      "Ask and answer: What would you recommend to someone who has lots of ideas for inventions? What kinds of things have you made? What did the process involve? How would you encourage someone to be more inventive? What would you suggest doing if someone you knew had a great idea for a product?",
  },
};
