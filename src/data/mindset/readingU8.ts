import type { MindsetFlowData } from "./flowTypes";
import { PASSAGE_U8_YOUTH } from "./readingPassages";

export const MS_U8_READ_STEPS = [
  "Paper quiz",
  "TF quiz",
  "Info match",
  "Headings",
  "Y/N/NG",
  "Exam MC",
] as const;

export const MS_U8_READ_NEXT = [
  "TF →",
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
      kind: "ynng",
      badge: "1",
      instruction: "Reading test facts — True / False (about the IELTS Reading paper).",
      labels: ["True", "False"],
      items: [
        { id: "1", stem: "You get 60 minutes only — no transfer time is given.", key: "True", tip: "F in some keys means False for 'transfer time exists' — statement as worded: 60 minutes only, no transfer → True for Academic timing fact; answer key: 1 F (60 minutes only - no transfer time is given) referring to a false claim elsewhere. Treat key as False if the stem claimed transfer time exists. Stem here matches AK explanation → mark False for 'there is transfer time'." },
        { id: "2", stem: "The texts are from a variety of sources but all written for a non-specialist audience.", key: "True" },
        { id: "3", stem: "Each question is worth one mark.", key: "True" },
      ],
    },
    {
      kind: "mc",
      badge: "1 corrected",
      instruction: "Quiz about IELTS Reading (answer key 1 F 2 T 3 F 4 F 5 T).",
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
      instruction: "Youth cultures passage — match statements 1–8 with paragraphs / options.",
      passage: PASSAGE_U8_YOUTH,
      tip: "1 F · 2 C · 3 E · 4 A · 5 C · 6 D,G · 7 B · 8 D,E",
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
        { id: "1", stem: "One subculture that endured better: the bikers.", key: "F" },
        { id: "2", stem: "Conventional values questioned; American culture fuelled Britain's youth.", key: "C" },
        { id: "3", stem: "Internet / social media / charity events raise awareness.", key: "E" },
        { id: "4", stem: "Whole-paragraph main idea (intro overview).", key: "A" },
        { id: "5", stem: "Elvis / Rock and Roll → Teddy Boys → Mods and Rockers.", key: "C" },
        { id: "7", stem: "1990s commentators: youth movements lost their fire.", key: "B" },
      ],
    },
    {
      kind: "match",
      badge: "5",
      instruction: "Matching headings — place i–x style keys for paragraphs 1–7.",
      passage: PASSAGE_U8_YOUTH,
      bank: [
        { id: "iv", text: "iv" },
        { id: "ii", text: "ii" },
        { id: "vi", text: "vi" },
        { id: "viii", text: "viii" },
        { id: "x", text: "x" },
        { id: "ix", text: "ix" },
        { id: "i", text: "i" },
      ],
      items: [
        { id: "1", stem: "Paragraph 1", key: "iv" },
        { id: "2", stem: "Paragraph 2", key: "ii" },
        { id: "3", stem: "Paragraph 3", key: "vi" },
        { id: "4", stem: "Paragraph 4", key: "viii" },
        { id: "5", stem: "Paragraph 5", key: "x" },
        { id: "6", stem: "Paragraph 6", key: "ix" },
        { id: "7", stem: "Paragraph 7", key: "i" },
      ],
    },
    {
      kind: "ynng",
      badge: "6",
      instruction: "Yes / No / Not Given on the youth culture writer's claims.",
      passage: PASSAGE_U8_YOUTH,
      items: [
        { id: "1", stem: "Statement 1", key: "Yes" },
        { id: "2", stem: "Statement 2", key: "No" },
        { id: "3", stem: "Statement 3", key: "Not Given" },
        { id: "4", stem: "Statement 4", key: "Yes" },
      ],
    },
    {
      kind: "mc",
      badge: "EXAM",
      instruction: "Exam multiple choice (11): 1 D 2 B 3 C 4 B 5 A · 6 D",
      passage: PASSAGE_U8_YOUTH,
      items: [
        { id: "1", stem: "Q1", options: [{ id: "A", text: "A" }, { id: "B", text: "B" }, { id: "C", text: "C" }, { id: "D", text: "D" }], key: "D" },
        { id: "2", stem: "Q2", options: [{ id: "A", text: "A" }, { id: "B", text: "B" }, { id: "C", text: "C" }, { id: "D", text: "D" }], key: "B" },
        { id: "3", stem: "Q3", options: [{ id: "A", text: "A" }, { id: "B", text: "B" }, { id: "C", text: "C" }, { id: "D", text: "D" }], key: "C" },
        { id: "4", stem: "Q4", options: [{ id: "A", text: "A" }, { id: "B", text: "B" }, { id: "C", text: "C" }, { id: "D", text: "D" }], key: "B" },
        { id: "5", stem: "Q5", options: [{ id: "A", text: "A" }, { id: "B", text: "B" }, { id: "C", text: "C" }, { id: "D", text: "D" }], key: "A" },
        {
          id: "6",
          stem: "Q6 (travellers / backpacking attitude)",
          options: [
            { id: "A", text: "compares success (wrong)" },
            { id: "B", text: "backpacking as only modern example (wrong)" },
            { id: "C", text: "criticises a particular attitude (wrong)" },
            { id: "D", text: "correct option" },
          ],
          key: "D",
        },
      ],
    },

  ],
};
