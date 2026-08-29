export const MS_U4_SPEAK_STEPS = [
  "Lead-in · money",
  "Part 1–2",
  "Part 3 speculation",
  "Useful language",
  "Exam practice",
] as const;

export const MS_U4_SPEAK_NEXT = [
  "Part 1–2 →",
  "Part 3 →",
  "Language →",
  "Exam →",
  "← Back to unit",
] as const;

export const speakingU4 = {
  id: "ms-u4-speaking-flow",
  bookPages: "pp. 88–92",
  sectionTitle: "Speaking · Finance & business",
  unitGoals: [
    "talk about money and work in Parts 1–3",
    "speculate and evaluate in Part 3",
    "use precise finance vocabulary",
  ],
  steps: [
    {
      kind: "intro" as const,
      badge: "LEAD-IN",
      instruction:
        "Discuss: How do you usually pay for things? Do you prefer cash or cards? Is it easy for young people to save money in your country?",
      tip: "Personalise Part 1; keep answers complete but not essay-length.",
    },
    {
      kind: "mcq" as const,
      badge: "strategy",
      instruction: "Choose the better Speaking strategy.",
      items: [
        {
          id: "1",
          stem: "Part 1 question about shopping habits — best approach?",
          options: [
            { id: "A", text: "Give a short yes/no only" },
            { id: "B", text: "Answer directly, add a reason/example, stay personal" },
            { id: "C", text: "Deliver a memorised lecture on global economics" },
          ],
          key: "B",
        },
        {
          id: "2",
          stem: "Part 2: Describe a job you would like to do — notes should be…",
          options: [
            { id: "A", text: "Full sentences copied from a model" },
            { id: "B", text: "Key words covering every bullet on the card" },
            { id: "C", text: "Only the job title" },
          ],
          key: "B",
        },
      ],
    },
    {
      kind: "gaps" as const,
      badge: "Part 3",
      instruction: "Place useful speculation / evaluation phrases.",
      bank: [
        "It could be argued that",
        "One possible reason is",
        "On the other hand",
        "In the long run",
        "From an employer's perspective",
      ],
      items: [
        { id: "1", stem: "______ raising interest rates slows borrowing.", key: "It could be argued that" },
        { id: "2", stem: "______ that online shopping reduces high-street jobs.", key: "One possible reason is" },
        { id: "3", stem: "______, digital payments are more convenient.", key: "On the other hand" },
        { id: "4", stem: "______, teaching finance in schools may reduce debt.", key: "In the long run" },
        { id: "5", stem: "______, flexible contracts cut costs but may harm loyalty.", key: "From an employer's perspective" },
      ],
    },
    {
      kind: "match" as const,
      badge: "vocab",
      instruction: "Match finance terms to plain meanings.",
      bank: [
        "money owed to a bank or lender",
        "money put aside for the future",
        "pay for something before receiving it",
        "money earned before tax",
        "period when the economy shrinks",
      ],
      items: [
        { id: "1", stem: "debt", key: "money owed to a bank or lender" },
        { id: "2", stem: "savings", key: "money put aside for the future" },
        { id: "3", stem: "pay upfront", key: "pay for something before receiving it" },
        { id: "4", stem: "gross salary", key: "money earned before tax" },
        { id: "5", stem: "recession", key: "period when the economy shrinks" },
      ],
    },
    {
      kind: "discuss" as const,
      heading: "Exam practice",
      prompts: [
        "Part 1: Do you save money? Is it important to have a bank account?",
        "Part 2: Describe a small business in your area / a job you would like.",
        "Part 3: Should schools teach financial literacy? How has online shopping changed local businesses?",
      ],
    },
  ],
};
