import type { MindsetFlowData } from "./flowTypes";

export const MS_U7_LISTEN_STEPS = [
  "Lead-in",
  "Flow practice",
  "Strategy MC",
  "Exam sentences",
  "Exam flow",
] as const;

export const MS_U7_LISTEN_NEXT = [
  "Practice →",
  "Strategy →",
  "Exam →",
  "Exam flow →",
  "← Back to unit",
] as const;

export const listeningU7: MindsetFlowData = {
  id: "ms-u7-listening-flow",
  bookPages: "pp. 150–154",
  sectionTitle: "Listening · News talks · Notes",
  unitGoals: [
    "predict paraphrases for Section 4",
    "complete notes within word limits",
    "follow a lecture on media / news",
  ],
  steps: [...MS_U7_LISTEN_STEPS],
  nextLabels: [...MS_U7_LISTEN_NEXT],
  panels: [
    {
      kind: "intro",
      badge: "LEAD-IN",
      instruction:
        "Section 4 talk: news / media. Predict vocabulary, then complete keys-only practice.",
      discuss: [
        "What local/national/international news sources do you use?",
        "How do newspapers, TV channels and online outlets differ?",
      ],
    },
    {
      kind: "gaps",
      badge: "11",
      instruction:
        "Making a TV news report — complete the flow-chart. Write NO MORE THAN TWO WORDS for each answer.",
      tip: "Tick the phrases off as you hear them; use the flow-chart stages (planning → recording → editing) to predict what fits each gap.",
      bank: [
        "planning",
        "script",
        "detail",
        "witness",
        "contrast",
        "next steps",
      ],
      items: [
        {
          id: "1",
          stem: "You must start by ______. Think about the five Ws: Who, What, When, Where, Why.",
          key: "planning",
        },
        {
          id: "2",
          stem: "Write a ______. Keep it easy to understand.",
          key: "script",
        },
        {
          id: "3",
          stem: "Filming: Give an introduction to the story, avoiding needless ______.",
          key: "detail",
        },
        {
          id: "4",
          stem: "Interviews: First interviewee should have direct involvement in the story, such as a ______.",
          key: "witness",
        },
        {
          id: "5",
          stem: "Second interview: Choose someone whose opinions ______ with those of the previous interviewee so the report gives both sides of the story.",
          key: "contrast",
        },
        {
          id: "6",
          stem: "End of report: Summarise the main points of story at this stage and mention potential ______ in the on-going story.",
          key: "next steps",
        },
      ],
    },
    {
      kind: "mc",
      badge: "Skills",
      instruction: "Exam-style multiple choice (representative keys from Unit 7 listening).",
      items: [
        {
          id: "1",
          stem: "A good prediction strategy before Section 4 is to…",
          options: [
            { id: "A", text: "ignore the question words" },
            {
              id: "B",
              text: "underline key words and think of paraphrases",
            },
            { id: "C", text: "write full essays while listening" },
          ],
          key: "B",
        },
        {
          id: "2",
          stem: "If an answer exceeds the word limit it is…",
          options: [
            { id: "A", text: "always accepted" },
            {
              id: "B",
              text: "incorrect even if the idea is right",
            },
            { id: "C", text: "marked half" },
          ],
          key: "B",
        },
      ],
    },
    {
      kind: "gaps",
      badge: "EXAM 1–5",
      instruction:
        "Complete the sentences. Write NO MORE THAN TWO WORDS for each answer.",
      tip: "Read the whole sentence before listening; expect a short paraphrase of what you hear, not the speaker's exact wording.",
      bank: [
        "anything new",
        "more selective",
        "personal relevance",
        "audience",
        "the competition",
      ],
      items: [
        {
          id: "1",
          stem: "A basic definition of the news story is ______.",
          key: "anything new",
        },
        {
          id: "2",
          stem: "A key difference between TV and print news stories is that TV editors must be ______.",
          key: "more selective",
        },
        {
          id: "3",
          stem: "Nowadays news stories engage the reader if they have ______.",
          key: "personal relevance",
        },
        {
          id: "4",
          stem: "What an editor chooses to report is highly dependent on their ______.",
          key: "audience",
        },
        {
          id: "5",
          stem: "A good news editor also needs to pay attention to the stories being published by ______.",
          key: "the competition",
        },
      ],
    },
    {
      kind: "match",
      badge: "EXAM 6–10",
      instruction:
        "Complete the flow-chart below. Choose answers from the list and write the correct letter, A–H, next to Questions 6–10. How a newspaper is put together.",
      tip: "Use the flow-chart labels (pre-press → press → impression → circulation) to anticipate each stage before you choose a letter.",
      bank: [
        { id: "A", text: "A plate" },
        { id: "B", text: "B colour" },
        { id: "C", text: "C edition" },
        { id: "D", text: "D size" },
        { id: "E", text: "E gathering" },
        { id: "F", text: "F prototype" },
        { id: "G", text: "G process" },
        { id: "H", text: "H printing press" },
      ],
      items: [
        {
          id: "6",
          stem: "News ______: Researching and writing news items, arranging advertisements.",
          key: "E",
        },
        {
          id: "7",
          stem: "Editing: Each type of editor marks their changes using a different ______.",
          key: "B",
        },
        {
          id: "8",
          stem: "Pre-press: Designing the pages. A ______ of each page is produced.",
          key: "F",
        },
        {
          id: "9",
          stem: "Press/lithographic stage: When the design process is complete, each page is transferred to a metal ______.",
          key: "A",
        },
        {
          id: "10",
          stem: "Impression stage: These are inserted on the ______ and the newspapers are printed.",
          key: "H",
        },
      ],
    },
  ],
};
