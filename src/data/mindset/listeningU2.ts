export const MS_U2_LISTEN_STEPS = [
  "Sections overview",
  "Table titles",
  "Quantifiers",
  "Predict / eliminate",
  "Exam · Healthy Eating",
  "Notes",
] as const;

export const MS_U2_LISTEN_NEXT = [
  "Tables →",
  "Quantifiers →",
  "Predict →",
  "Exam →",
  "Notes →",
  "← Back to unit",
] as const;

export const listeningU2 = {
  id: "ms-u2-listening-flow",
  bookPages: "pp. 42–46",
  sectionTitle: "Listening · Tables · Quantifiers (keys only)",
  unitGoals: [
    "recognise Listening section types and speaker numbers",
    "complete tables and notes accurately",
    "use and recognise quantifiers",
  ],
  steps: [
    {
      kind: "intro" as const,
      badge: "LEAD-IN",
      instruction:
        "Complete the table by choosing the correct options for each part of the IELTS Listening test. Keys only — no audio in this trainer.",
      bullets: [
        "Section 1: everyday, social — 2 speakers",
        "Section 2: everyday, social — 1 speaker",
        "Section 3: educational or training — 2 or more speakers",
        "Section 4: educational or training — 1 speaker",
        "Situations you might hear: 2, 3, 5, 6 (university lecture; town guide; customer services; research discussion)",
      ],
      tip: "Of those: 2 → Section 4; 3 → Section 2; 5 → Section 1; 6 → Section 3.",
    },
    {
      kind: "match" as const,
      badge: "4",
      instruction: "Use the words in the box to complete the titles for tables A, B and C.",
      bank: [
        "Olympic Records Exhibition",
        "Medical Discoveries in History",
        "Sports Centre Classes",
      ],
      items: [
        { id: "A", stem: "Table A (World records / sprint / javelin)", key: "Olympic Records Exhibition" },
        { id: "B", stem: "Table B (Discovery / scientist / nationality)", key: "Medical Discoveries in History" },
        { id: "C", stem: "Table C (Class / days and times / instructor)", key: "Sports Centre Classes" },
      ],
      tip: "Table A: Section 2 · Table B: Section 4 · Table C: Section 1.",
    },
    {
      kind: "gaps" as const,
      badge: "9–10",
      instruction: "Choose the correct quantifier for each gap.",
      bank: [
        "a number of",
        "Both of them",
        "either of those",
        "All of the",
        "None of those",
        "The whole",
        "Some people",
        "all",
        "any",
        "no",
      ],
      items: [
        { id: "1", stem: "______ students joined the society last year.", key: "a number of" },
        { id: "2", stem: "______ are excellent runners.", key: "Both of them", alts: ["Both"] },
        { id: "3", stem: "I wouldn't choose ______ options.", key: "either of those" },
        { id: "4", stem: "______ equipment is free to use.", key: "All of the", alts: ["All"] },
        { id: "5", stem: "______ are really my kind of thing.", key: "None of those" },
        { id: "6", stem: "______ university turns out to support them.", key: "The whole", alts: ["The whole of the"] },
        { id: "7", stem: "______ prefer outdoor classes.", key: "Some people" },
        { id: "8", stem: "Almost ______ members pay online.", key: "all" },
        { id: "9", stem: "Is there ______ chance of a refund?", key: "any" },
        { id: "10", stem: "There is ______ extra charge for guests.", key: "no" },
      ],
    },
    {
      kind: "mcq" as const,
      badge: "12",
      instruction: "Which predicted answers are unlikely / incorrect for the Road Running Society form?",
      items: [
        {
          id: "1",
          stem: "President named only as 'Claire' (forename only)",
          options: [
            { id: "A", text: "Likely — informal is fine" },
            { id: "B", text: "Unlikely — full name expected" },
          ],
          key: "B",
        },
        {
          id: "2",
          stem: "Annual distance of only 20 km for keen runners",
          options: [
            { id: "A", text: "Likely" },
            { id: "B", text: "Unlikely" },
          ],
          key: "B",
        },
        {
          id: "3",
          stem: "Colour written as 'blue dark'",
          options: [
            { id: "A", text: "Correct word order" },
            { id: "B", text: "Incorrect — shade before colour (e.g. pale blue)" },
          ],
          key: "B",
        },
        {
          id: "4",
          stem: "Membership fee of £5000 per year for students",
          options: [
            { id: "A", text: "Likely" },
            { id: "B", text: "Unlikely — excessive" },
          ],
          key: "B",
        },
      ],
    },
    {
      kind: "gaps" as const,
      badge: "EXAM 1–10",
      instruction:
        "Healthy Eating Society — complete the table and notes. Write NO MORE THAN TWO WORDS AND/OR A NUMBER. Keys only.",
      bank: [
        "vegetarian",
        "Wednesford",
        "7 pm",
        "covered market",
        "Coffee Club",
        "free",
        "2 hours",
        "10%",
        "an email",
        "celebrity chefs",
      ],
      items: [
        { id: "1", stem: "Wednesday restaurant: ______ food", key: "vegetarian" },
        { id: "2", stem: "Thursday location: ______", key: "Wednesford" },
        { id: "3", stem: "Friday European food at ______", key: "7 pm", alts: ["7", "seven o'clock", "7.00", "7 o'clock"] },
        { id: "4", stem: "Saturday location: ______ in town", key: "covered market" },
        { id: "5", stem: "Saturday activity: ______", key: "Coffee Club" },
        { id: "6", stem: "Cost of membership: ______", key: "free", alts: ["nothing", "£0"] },
        { id: "7", stem: "Average length of restaurant dinner: ______", key: "2 hours", alts: ["two hours"] },
        { id: "8", stem: "Leave the waiters an extra: ______", key: "10%" },
        { id: "9", stem: "To book a place, best to send Catherine: ______", key: "an email", alts: ["email"] },
        { id: "10", stem: "Rule — never talk about: ______", key: "celebrity chefs" },
      ],
    },
    {
      kind: "discuss" as const,
      heading: "Practice note",
      prompts: [
        "Before listening, predict part of speech and type of information for each gap.",
        "Check spelling, word limit, and do not repeat words already printed in the table.",
        "Review Road Running Society answers: Claire Enwark; fortnight; 10K/10km; Manchester; pale blue; 50.",
      ],
    },
  ],
};
