import { PASSAGE_U3_WARHOL, PASSAGE_U3_SCULPTURE_EXAM } from "./readingPassages";
export const MS_U3_READ_STEPS = [
  "Lead-in · synonyms",
  "TFNG practice",
  "Matching / MCQ",
  "Past tenses",
  "Exam · sculpture",
  "Discussion",
] as const;

export const MS_U3_READ_NEXT = [
  "TFNG →",
  "Matching →",
  "Tenses →",
  "Exam →",
  "Discussion →",
  "← Back to unit",
] as const;

export const readingU3 = {
  id: "ms-u3-reading-flow",
  bookPages: "pp. 52–58",
  sectionTitle: "Reading · TFNG · Main ideas · Past tenses",
  unitGoals: [
    "answer True / False / Not Given and multiple-choice questions",
    "identify main and supporting ideas",
    "use past tenses correctly",
  ],
  steps: [
    {
      kind: "match" as const,
      badge: "LEAD-IN",
      instruction: "Match a word from box A with a synonym or near-synonym from box B.",
      bank: [
        "exhibitions",
        "media",
        "ideas",
        "innovative",
        "conceptual",
        "figure",
        "innovate",
        "methods",
        "mould",
      ],
      items: [
        { id: "1", stem: "installations", key: "exhibitions" },
        { id: "2", stem: "materials", key: "media" },
        { id: "3", stem: "concepts", key: "ideas" },
        { id: "4", stem: "groundbreaking", key: "innovative" },
        { id: "5", stem: "abstract", key: "conceptual" },
        { id: "6", stem: "sculpture", key: "figure" },
        { id: "7", stem: "experiment", key: "innovate" },
        { id: "8", stem: "techniques", key: "methods" },
        { id: "9", stem: "cast", key: "mould" },
      ],
    },
    {
      kind: "mcq" as const,
      badge: "3–5",
      instruction:
        "Which statement matches the structure of the Rauschenberg / Warhol text? Then answer TFNG on Paragraph B.",
      passage: PASSAGE_U3_WARHOL,
      items: [
        {
          id: "3",
          stem: "Overall structure of the text?",
          options: [
            { id: "A", text: "A history of Modern Art" },
            { id: "B", text: "A look at the similarities and differences between two Modern artists" },
            { id: "C", text: "A look at the strengths and weaknesses of two Modern artists" },
          ],
          key: "B",
        },
        {
          id: "1",
          stem: "Rauschenberg was often unwell as a child.",
          options: [
            { id: "T", text: "True" },
            { id: "F", text: "False" },
            { id: "NG", text: "Not Given" },
          ],
          key: "NG",
          tip: "'Sickly child' refers to Warhol, not Rauschenberg.",
        },
        {
          id: "2",
          stem: "Both artists had a positive relationship with their mothers.",
          options: [
            { id: "T", text: "True" },
            { id: "F", text: "False" },
            { id: "NG", text: "Not Given" },
          ],
          key: "T",
        },
        {
          id: "3b",
          stem: "Warhol began to develop his ability as an artist when he went to New York.",
          options: [
            { id: "T", text: "True" },
            { id: "F", text: "False" },
            { id: "NG", text: "Not Given" },
          ],
          key: "F",
          tip: "He was developing skills while missing school; later enrolled in Carnegie Institute in Pittsburgh.",
        },
      ],
    },
    {
      kind: "match" as const,
      badge: "4",
      instruction: "Which paragraph contains the following information?",
      passage: PASSAGE_U3_WARHOL,
      bank: ["A", "B", "C", "D", "E", "F"],
      items: [
        { id: "1", stem: "The materials Rauschenberg worked with", key: "C" },
        { id: "2", stem: "Why Warhol is more famous than Rauschenberg", key: "F" },
        { id: "3", stem: "A definition of Modern Art", key: "A" },
        { id: "4", stem: "The artists' early lives", key: "B" },
        { id: "5", stem: "Warhol's main work", key: "D" },
        { id: "6", stem: "Both artists' performance art", key: "E" },
      ],
    },
    {
      kind: "match" as const,
      badge: "13–14",
      instruction: "Match each sentence / label with the correct tense name.",
      bank: [
        "past simple",
        "past perfect continuous",
        "past continuous",
        "past perfect simple",
        "present perfect simple",
        "present perfect continuous",
      ],
      items: [
        { id: "1", stem: "Form used for completed past events in sequence", key: "past simple" },
        { id: "2", stem: "had been + -ing", key: "past perfect continuous" },
        { id: "3", stem: "was / were + -ing", key: "past continuous" },
        { id: "4", stem: "had + past participle", key: "past perfect simple" },
        { id: "5", stem: "has / have been + past participle (passive possible)", key: "present perfect simple" },
        { id: "6", stem: "has / have been + -ing", key: "present perfect continuous" },
      ],
    },
    {
      kind: "mcq" as const,
      badge: "EXAM 16",
      instruction: "Read the passage and answer questions 1–9.",
      passage: PASSAGE_U3_SCULPTURE_EXAM,
      items: [
        {
          id: "1",
          stem: "Before Rodin, sculpture was very realistic.",
          options: [
            { id: "T", text: "True" },
            { id: "F", text: "False" },
            { id: "NG", text: "Not Given" },
          ],
          key: "F",
        },
        {
          id: "2",
          stem: "Rodin expected people to interpret his sculptures in their own way.",
          options: [
            { id: "T", text: "True" },
            { id: "F", text: "False" },
            { id: "NG", text: "Not Given" },
          ],
          key: "T",
        },
        {
          id: "3",
          stem: "Rodin studied the sculpture techniques of the Greeks and Romans.",
          options: [
            { id: "T", text: "True" },
            { id: "F", text: "False" },
            { id: "NG", text: "Not Given" },
          ],
          key: "NG",
        },
        {
          id: "4",
          stem: "Rodin felt that incomplete figures were still artistic works.",
          options: [
            { id: "T", text: "True" },
            { id: "F", text: "False" },
            { id: "NG", text: "Not Given" },
          ],
          key: "T",
        },
        {
          id: "5",
          stem: "His Large Hand of a Pianist tries to convey music being played.",
          options: [
            { id: "T", text: "True" },
            { id: "F", text: "False" },
            { id: "NG", text: "Not Given" },
          ],
          key: "T",
        },
        {
          id: "6",
          stem: "Rodin believed the surfaces of sculptures should be smooth.",
          options: [
            { id: "T", text: "True" },
            { id: "F", text: "False" },
            { id: "NG", text: "Not Given" },
          ],
          key: "F",
        },
        {
          id: "7",
          stem: "Assemblage",
          options: [
            { id: "A", text: "was first used by Pablo Picasso." },
            { id: "B", text: "uses only three basic forms." },
            { id: "C", text: "involves several artists working on the same theme." },
            {
              id: "D",
              text: "creates a single composition from a number of versions of an individual.",
            },
          ],
          key: "D",
        },
        {
          id: "8",
          stem: "What is the purpose of paragraph E?",
          options: [
            { id: "A", text: "to explain the meaning of Earth Art" },
            { id: "B", text: "to explain how kinetic sculpture has evolved" },
            { id: "C", text: "to introduce the idea of outdoor sculpture" },
            { id: "D", text: "to show examples of innovative forms of Modern sculpture" },
          ],
          key: "D",
        },
        {
          id: "9",
          stem: "Art installations",
          options: [
            { id: "A", text: "always use mixed media." },
            { id: "B", text: "are always outdoors." },
            { id: "C", text: "usually allow viewers to interact with them." },
            { id: "D", text: "typically last a long time." },
          ],
          key: "C",
        },
      ],
    },
    {
      kind: "discuss" as const,
      heading: "Discussion",
      prompts: [
        "Sample answer: They were both innovators. In what ways were Rauschenberg and Warhol innovative?",
        "Which TFNG traps have you fallen into (wrong person, partial match, paraphrase)?",
      ],
    },
  ],
};
