import type { MindsetFlowData } from "./flowTypes";
import { PASSAGE_U8_NOMADS, PASSAGE_U8_YOUTH } from "./readingPassages";

export const MS_U8_READ_STEPS = [
  "Paper quiz",
  "Info match",
  "Headings",
  "Y/N/NG",
  "Exam · nomads",
] as const;

export const MS_U8_READ_NEXT = [
  "Info →",
  "Headings →",
  "Y/N/NG →",
  "Exam →",
  "← Back to unit",
] as const;

export const readingU8: MindsetFlowData = {
  id: "ms-u8-reading-flow",
  bookPages: "pp. 160–166",
  sectionTitle: "Reading · Youth culture · Headings · Y/N/NG",
  unitGoals: [
    "review IELTS Reading task types",
    "match headings and information about youth cultures",
    "handle Yes/No/Not Given and multiple choice",
  ],
  steps: [...MS_U8_READ_STEPS],
  nextLabels: [...MS_U8_READ_NEXT],
  panels: [
    {
      kind: "mc",
      badge: "1",
      instruction: "Quiz about the IELTS Reading paper. Choose True or False.",
      items: [
        {
          id: "1",
          stem: "There is extra transfer time in the Academic Reading paper.",
          options: [
            { id: "T", text: "True" },
            { id: "F", text: "False — 60 minutes only, no transfer time" },
          ],
          key: "F",
        },
        {
          id: "2",
          stem: "Texts are written for a non-specialist audience.",
          options: [{ id: "T", text: "True" }, { id: "F", text: "False" }],
          key: "T",
        },
        {
          id: "3",
          stem: "All Reading texts are from the same type of source.",
          options: [
            { id: "T", text: "True" },
            { id: "F", text: "False — variety of sources, non-specialist" },
          ],
          key: "F",
        },
        {
          id: "4",
          stem: "Some questions are worth more than one mark.",
          options: [{ id: "T", text: "True" }, { id: "F", text: "False — each question one mark" }],
          key: "F",
        },
        {
          id: "5",
          stem: "You must write answers on the answer sheet within the 60 minutes.",
          options: [{ id: "T", text: "True" }, { id: "F", text: "False" }],
          key: "T",
        },
      ],
    },
    {
      kind: "match",
      badge: "4",
      instruction:
        "Which paragraph contains the following information? Match each statement with the correct paragraph letter A–G. You may use any letter more than once.",
      passage: PASSAGE_U8_YOUTH,
      tip: "1 F · 2 C · 3 E · 4 A · 5 C · 6 D · 7 B · 8 E (multi-paragraph items use the primary paragraph from the key).",
      bankReuse: true,
      bank: [
        { id: "A", text: "A" },
        { id: "B", text: "B" },
        { id: "C", text: "C" },
        { id: "D", text: "D" },
        { id: "E", text: "E" },
        { id: "F", text: "F" },
        { id: "G", text: "G" },
      ],
      items: [
        { id: "1", stem: "a subculture that has passed the test of time", key: "F" },
        { id: "2", stem: "an explanation for the rise of youth subcultures", key: "C" },
        {
          id: "3",
          stem: "an example of the internet being used to raise money and inform people",
          key: "E",
        },
        {
          id: "4",
          stem: "descriptions of various youth groups' fashion and music preferences",
          key: "A",
        },
        { id: "5", stem: "the influence of the US on youth culture in Britain", key: "C" },
        { id: "6", stem: "a discussion of the identity of today's young people", key: "D" },
        {
          id: "7",
          stem: "the decade in which the older generation began to think youth subcultures were declining",
          key: "B",
        },
        { id: "8", stem: "the causes of a broader outlook in today's young people", key: "E" },
      ],
    },
    {
      kind: "match",
      badge: "5",
      instruction:
        "The reading passage has seven paragraphs, A–G. Choose the correct heading for each paragraph from the list of headings. Write the correct number, i–x. There are three headings you won't need.",
      passage: PASSAGE_U8_YOUTH,
      tip: "1 iv · 2 ii · 3 vi · 4 viii · 5 x · 6 ix · 7 i",
      bank: [
        { id: "i", text: "Out with the old and in with the new and improved" },
        { id: "ii", text: "The decline of youth subcultures" },
        { id: "iii", text: "Regret for a lost era" },
        { id: "iv", text: "Youth subcultures in the second half of the 20th century" },
        { id: "v", text: "The ice bucket challenge raises millions" },
        { id: "vi", text: "Why young people formed their own social groups" },
        { id: "vii", text: "Identity-less youth of today" },
        { id: "viii", text: "A different type of identity" },
        { id: "ix", text: "Survivors of a lost age" },
        { id: "x", text: "Fighting for change in new ways" },
      ],
      items: [
        { id: "1", stem: "Paragraph A", key: "iv" },
        { id: "2", stem: "Paragraph B", key: "ii" },
        { id: "3", stem: "Paragraph C", key: "vi" },
        { id: "4", stem: "Paragraph D", key: "viii" },
        { id: "5", stem: "Paragraph E", key: "x" },
        { id: "6", stem: "Paragraph F", key: "ix" },
        { id: "7", stem: "Paragraph G", key: "i" },
      ],
    },
    {
      kind: "ynng",
      badge: "6",
      instruction:
        "Do the following statements agree with the claims of the writer in the text? Write YES if the statement agrees with the claims of the writer, NO if the statement contradicts the claims of the writer, NOT GIVEN if it is impossible to say what the writer thinks about this.",
      passage: PASSAGE_U8_YOUTH,
      items: [
        {
          id: "1",
          stem: "20th-century youth movements had their own distinct way of dressing.",
          key: "Yes",
        },
        {
          id: "2",
          stem: "Today's youth are less effective at changing society than their predecessors.",
          key: "No",
        },
        {
          id: "3",
          stem: "Young people waste too much time on social media.",
          key: "Not Given",
        },
        {
          id: "4",
          stem: "It is unfortunate that many of the sub-cultures are disappearing.",
          key: "Yes",
        },
      ],
    },
    {
      kind: "passageExam",
      badge: "EXAM",
      instruction: "Read the passage and answer questions 1–6.",
      passage: PASSAGE_U8_NOMADS,
      match: {
        instruction:
          "Questions 1–5 — Look at the following statements and the list of traveller communities below. Match each statement with the correct community, A–E. You may use any letter more than once.",
        bank: [
          { id: "A", text: "The Bedouin" },
          { id: "B", text: "The Moken" },
          { id: "C", text: "The Sami" },
          { id: "D", text: "The Roma" },
          { id: "E", text: "Irish travellers" },
        ],
        items: [
          {
            id: "1",
            stem: "They tend to protect a version of traditions inherited from wider society.",
            key: "D",
          },
          {
            id: "2",
            stem: "Where they live is very dependent on weather conditions and the time of the year.",
            key: "B",
          },
          {
            id: "3",
            stem: "They do not focus heavily on kinship ties.",
            key: "C",
          },
          {
            id: "4",
            stem: "They fully exploit the natural resources available to them.",
            key: "B",
          },
          {
            id: "5",
            stem: "Their success in combat was partly due to the demands of their lifestyle.",
            key: "A",
          },
        ],
      },
      mc: {
        instruction: "Question 6 — Choose the correct letter, A, B, C or D.",
        items: [
          {
            id: "6",
            stem: "What is the writer's purpose in the Reading Passage?",
            options: [
              {
                id: "A",
                text: "to compare how successful different nomadic groups are in the modern world",
              },
              { id: "B", text: "to explain the origins of backpacking culture" },
              {
                id: "C",
                text: "to criticise the lack of tolerance for travelling communities",
              },
              {
                id: "D",
                text: "to highlight the current state of traditional travelling cultures in the modern world",
              },
            ],
            key: "D",
          },
        ],
      },
    },
  ],
};
