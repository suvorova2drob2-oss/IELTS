export const LANG_M4A_STEPS = [
  "1a Fragments",
  "1b–1c Fix",
  "2–3 Subordinate",
  "4 Punctuate",
  "5–6 that-clauses",
] as const;

export const LANG_M4A_NEXT = [
  "1b–1c Fix →",
  "2–3 Subordinate →",
  "4 Punctuate →",
  "5–6 that-clauses →",
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

export function checkLangM4a(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export type LangM4aGap =
  | { text: string }
  | { gap: number; key: string };

export function isLangM4aGap(
  part: LangM4aGap,
): part is { gap: number; key: string } {
  return "gap" in part;
}

export const languageM4a = {
  id: "language-m4a-flow",
  bookPages: "p. 61 in your coursebook",
  sectionTitle: "Language development · Clauses",
  grammarRef: "EXPERT GRAMMAR page 178",
  fragments1a: {
    badge: "1a",
    heading: "Forming clauses",
    instruction:
      "Read the text. Underline the sentence fragments (incomplete sentences).",
    text: `Cleaning up your home can actually save you money. If you have a lot of clutter, try to get rid of this. You can look around the house for items that you do not use and sell them off or give them away. One key way to reduce your spending and make money. This could also make your home a nicer place to be in. With the effect of being a more pleasant environment. This might also make your home a more enjoyable place to be in, which also saves you money. Because you will not go out as much.`,
    fragments: [
      "One key way to reduce your spending and make money.",
      "With the effect of being a more pleasant environment.",
      "Because you will not go out as much.",
    ],
  },
  errorTypes1b: {
    badge: "b",
    instruction:
      "Match the underlined fragments in Exercise 1a with the error types (A–E). Not all error types are used.",
    types: [
      { id: "A", label: "No verb" },
      { id: "B", label: "No object" },
      { id: "C", label: "No subject" },
      { id: "D", label: "Wrong word order" },
      { id: "E", label: "A missing clause" },
    ],
    items: [
      {
        id: 1,
        text: "One key way to reduce your spending and make money.",
        key: "A",
        tip: "A No verb: One key way (is) to reduce your spending and make money.",
      },
      {
        id: 2,
        text: "With the effect of being a more pleasant environment.",
        key: "C",
        tip: "C No subject: With the effect of (it) being a more pleasant environment.",
      },
      {
        id: 3,
        text: "Because you will not go out as much.",
        key: "E",
        tip: "E A missing clause: (You'll spend less) Because you will not go out as much.",
      },
    ],
  },
  rewrite1c: {
    badge: "c",
    instruction:
      "Rewrite the sentence fragments below so that they are complete sentences.",
    items: [
      {
        id: 1,
        stem: "Many electronic devices use a great deal of energy. So unplug them when you can.",
        answers: [
          "Many electronic devices use a great deal of energy so unplug them when you can.",
          "Many electronic devices use a great deal of energy, so unplug them when you can.",
        ],
      },
      {
        id: 2,
        stem: "You should unplug these devices. When not in use.",
        answers: [
          "You should unplug these devices when not in use.",
          "You should unplug these devices when they are not in use.",
        ],
      },
      {
        id: 3,
        stem: "It might seem hard. But you will save money.",
        answers: [
          "It might seem hard, but you will save money.",
          "It might seem hard but you will save money.",
        ],
      },
      {
        id: 4,
        stem: "Many people neglect to do this. Because they simply do not have the time.",
        answers: [
          "Many people neglect to do this because they simply do not have the time.",
          "Because many people simply do not have the time, they neglect to do this.",
        ],
      },
    ],
  },
  mcq2: {
    badge: "2",
    heading: "Subordinate clauses",
    instruction: "Choose the correct option (A or B) for each question.",
    items: [
      {
        id: 1,
        prompt:
          "A main clause can stand alone as a complete sentence. A subordinate clause …",
        options: [
          { id: "A", text: "can also stand alone as a complete sentence." },
          {
            id: "B",
            text: "cannot stand alone and needs a main clause to complete its meaning.",
          },
        ],
        key: "B",
      },
      {
        id: 2,
        prompt:
          "In the sentence 'If you recycle carefully, you will reduce waste', the clause beginning with If is …",
        options: [
          { id: "A", text: "a main clause." },
          { id: "B", text: "a subordinate clause." },
        ],
        key: "B",
      },
      {
        id: 3,
        prompt:
          "Which sentence contains a subordinate clause of reason?",
        options: [
          {
            id: "A",
            text: "People recycle more because facilities are improving.",
          },
          {
            id: "B",
            text: "People recycle more and facilities are improving.",
          },
        ],
        key: "A",
      },
      {
        id: 4,
        prompt:
          "Which sentence uses a subordinate clause to show contrast?",
        options: [
          {
            id: "A",
            text: "Although recycling takes time, it is worth the effort.",
          },
          {
            id: "B",
            text: "Recycling takes time and it is worth the effort.",
          },
        ],
        key: "A",
      },
    ],
  },
  match3: {
    badge: "3",
    instruction:
      "Match the beginnings of the sentences (1–5) with the endings (A–E).",
    beginnings: [
      {
        id: "1",
        text: "People should switch off lights whenever they leave a room",
      },
      {
        id: "2",
        text: "While many shoppers enjoy buying new gadgets,",
      },
      {
        id: "3",
        text: "Although fast fashion is cheap,",
      },
      {
        id: "4",
        text: "Because landfill sites are filling up quickly,",
      },
      {
        id: "5",
        text: "If households composted their food waste,",
      },
    ],
    endings: [
      {
        id: "A",
        text: "we need better recycling systems at a national level.",
      },
      {
        id: "B",
        text: "less organic material would end up in landfill.",
      },
      {
        id: "C",
        text: "so that they do not waste electricity unnecessarily.",
      },
      {
        id: "D",
        text: "its environmental cost is often extremely high.",
      },
      {
        id: "E",
        text: "others prefer to repair and reuse what they already own.",
      },
    ],
    keys: {
      "1": "C",
      "2": "E",
      "3": "D",
      "4": "A",
      "5": "B",
    } as Record<string, string>,
  },
  punctuate4: {
    badge: "4",
    instruction:
      "Punctuate the paragraph correctly. Add full stops and commas where needed.",
    flawed: `Life is not all about spending money Thinking about saving money and resources can be really beneficial If you are careful with money and resources you may be able to afford some of the items you really want in the future You will be aiding the environment too as wasting resources is one of the largest environmental problems in the world Whenever you think about disposing of something consider whether you can do anything else with it Think of activities you can do which do not involve resources Whereas watching television for an hour uses power going for a walk does not consume any resources Small steps like this can make a considerable difference`,
    corrected: `Life is not all about spending money. Thinking about saving money and resources can be really beneficial. If you are careful with money and resources, you may be able to afford some of the items you really want in the future. You will be aiding the environment too as wasting resources is one of the largest environmental problems in the world.

Whenever you think about disposing of something, consider whether you can do anything else with it. Think of activities you can do which do not involve resources. Whereas watching television for an hour uses power, going for a walk does not consume any resources. Small steps like this can make a considerable difference.`,
  },
  ownIdeas5: {
    badge: "5",
    instruction:
      "Complete the sentences with your own ideas. Then discuss your reasons with a partner.",
    stems: [
      "If I had enough money, …",
      "While I don't always enjoy shopping, …",
      "Although most people say studying is important, …",
    ],
    suggested: [
      "If I had enough money, I'd take a year off work and travel around the world.",
      "While I don't always enjoy shopping, I do like buying new clothes.",
      "Although most people say studying is important, so is having time to relax and spend time with family and friends.",
    ],
  },
  thatClauses: {
    heading: "Expressing opinions with that",
    q6a: {
      badge: "6a",
      instruction:
        "Look at the underlined section. Is it a phrase or a clause?",
      sentence:
        "Reusing materials is one of the most effective ways to cut waste.",
      options: [
        { id: "A", text: "a clause" },
        { id: "B", text: "a phrase" },
      ],
      key: "A",
      tip: "A a clause (reusing here is a verb used in noun form, but it forms part of the subject of the clause).",
    },
    gap6b: {
      badge: "b",
      instruction:
        "Complete the sentences with the correct that-clauses below.",
      bank: [
        "that our planet is being harmed by our wastefulness",
        "that we will soon double the amount of waste we discard",
        "that whilst it might be easier to just use resources freely, it will not help the environment",
      ],
      items: [
        {
          id: 1,
          before: "Many people disagree ",
          after: ".",
          key: "that our planet is being harmed by our wastefulness",
        },
        {
          id: 2,
          before: "Experts speculate ",
          after: ".",
          key: "that we will soon double the amount of waste we discard",
        },
        {
          id: 3,
          before: "We must take into consideration ",
          after: ".",
          key: "that whilst it might be easier to just use resources freely, it will not help the environment",
        },
      ],
    },
  },
};
