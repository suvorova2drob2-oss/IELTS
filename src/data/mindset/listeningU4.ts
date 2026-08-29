export const MS_U4_LISTEN_STEPS = [
  "Lead-in",
  "Form / notes",
  "MCQ practice",
  "Exam review",
] as const;

export const MS_U4_LISTEN_NEXT = [
  "Forms →",
  "MCQ →",
  "Review →",
  "← Back to unit",
] as const;

export const listeningU4 = {
  id: "ms-u4-listening-flow",
  bookPages: "pp. 84–87",
  sectionTitle: "Listening · Finance forms (keys only)",
  unitGoals: [
    "complete forms and notes on business/finance topics",
    "answer multiple-choice questions",
    "predict numbers, names and financial terms",
  ],
  steps: [
    {
      kind: "intro" as const,
      badge: "LEAD-IN",
      instruction:
        "Before listening, predict what kind of information fills each gap (name, number, price, date, place). Keys only — no audio.",
      tip: "Check spelling of names and whether symbols (£, %) are required.",
    },
    {
      kind: "gaps" as const,
      badge: "practice",
      instruction: "Typical finance-listening answers (use as bank practice).",
      bank: [
        "interest rate",
        "overdraft",
        "direct debit",
        "annual fee",
        "credit limit",
        "branch",
      ],
      items: [
        { id: "1", stem: "The ______ on the savings account is 2.5%.", key: "interest rate" },
        { id: "2", stem: "Students can apply for an ______ of up to £500.", key: "overdraft" },
        { id: "3", stem: "Pay the bill by ______ each month.", key: "direct debit" },
        { id: "4", stem: "There is no ______ for the basic account.", key: "annual fee" },
        { id: "5", stem: "The card has a ______ of £1,000.", key: "credit limit" },
        { id: "6", stem: "Collect the card from your local ______.", key: "branch" },
      ],
    },
    {
      kind: "mcq" as const,
      badge: "MCQ",
      instruction: "Choose the best answer (strategy practice).",
      items: [
        {
          id: "1",
          stem: "If you hear two prices, you should…",
          options: [
            { id: "A", text: "Always write the first one" },
            { id: "B", text: "Wait for confirmation / correction before deciding" },
            { id: "C", text: "Add them together" },
          ],
          key: "B",
        },
        {
          id: "2",
          stem: "For a company name spelled out letter by letter…",
          options: [
            { id: "A", text: "Guess a common spelling" },
            { id: "B", text: "Write exactly what is spelled" },
            { id: "C", text: "Use abbreviations only" },
          ],
          key: "B",
        },
      ],
    },
    {
      kind: "discuss" as const,
      heading: "Exam review",
      prompts: [
        "Complete Unit 4 Listening exam tables/notes using the answer key in _ms_ak_u4.txt.",
        "After checking, note which gaps were numbers vs content words.",
        "List five finance words you predicted correctly before listening.",
      ],
    },
  ],
};
