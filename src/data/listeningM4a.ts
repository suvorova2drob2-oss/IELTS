export const LISTEN_M4A_STEPS = [
  "1 Before listen",
  "2a–2b Predict table",
  "3a–3b Notes predict",
  "4 Exam",
  "5 Discussion",
] as const;

export const LISTEN_M4A_NEXT = [
  "2a–2b Predict table →",
  "3a–3b Notes predict →",
  "4 Exam →",
  "5 Discussion →",
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

export function checkListenM4a(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export const listeningM4a = {
  id: "listening-m4a-flow",
  bookPages: "p. 60 in your coursebook",
  sectionTitle: "Listening · Section 2",
  noAudioNote:
    "Аудио пока нет — можно пройти подготовку и заполнить задания. Ответы 1–7 проверьте по script 4.1 (pp. 204–205), когда появятся треки.",
  before: {
    badge: "1",
    heading: "Before you listen",
    instruction:
      "Work in pairs or small groups and discuss the questions.",
    questions: [
      "What do you think 'upcycling' means? What do the pictures of old and new items suggest?",
      "Why do people upcycle things?",
      "Do you think upcycling is a good idea? Why/Why not?",
    ],
    tip: "Upcycling means turning something old and dishevelled into something shiny and new-looking. People probably do this because it's a hobby and it could save them money and reduce waste.",
  },
  predictTable: {
    badge: "2a",
    heading: "Predict answers using questions",
    instruction:
      "Look at the table in Exercise 4. Answer the questions.",
    items: [
      {
        id: 1,
        q: "Will you complete the table across in rows or down in columns? Why?",
        tip: "Across in rows — because of the order of the numbers.",
      },
      {
        id: 2,
        q: "What is the maximum number of words for each answer?",
        tip: "Three words.",
      },
      {
        id: 3,
        q: "Which questions are likely to need a noun or noun phrase?",
        tip: "Questions 1, 3 and 4.",
      },
      {
        id: 4,
        q: "Which questions need you to supply a verb (or verb phrase)?",
        tip: "Questions 1 and 4 (in question 3 the verb is already written).",
      },
      {
        id: 5,
        q: "Which question is likely to need something other than a skill or technique?",
        tip: "Question 2.",
      },
    ],
    predict2b: {
      badge: "b",
      instruction:
        "What other features of the table can help you predict the answers?",
      tip: "The layout of the table including the headings, the numbers, listening for key words near the answers.",
    },
  },
  predictNotes: {
    badge: "3a",
    instruction:
      "Look at questions 5–7 in the notes. What kind of words are the answers likely to be?",
    tip: "All nouns.",
    predict3b: {
      badge: "b",
      instruction: "Answer the questions about the notes.",
      items: [
        {
          id: 1,
          q: "Can you write more than two words for any answer?",
          tip: "No.",
        },
        {
          id: 2,
          q: "Can you write three words for question 5? Why/Why not?",
          tip: "No. Because the instructions say no more than two words and/or a number.",
        },
      ],
    },
  },
  exam: {
    badge: "4",
    heading: "Test practice",
    strategies: "TEST STRATEGIES page 168",
    instruction:
      "Complete the table and the notes below. Write NO MORE THAN THREE WORDS AND/OR A NUMBER for questions 1–4 and NO MORE THAN TWO WORDS AND/OR A NUMBER for questions 5–7.",
    audioNote: "Track 4.1 — audio will be added later.",
    table: {
      title: "Community upcycling workshops",
      limit:
        "Questions 1–4\nComplete the table below.\nWrite NO MORE THAN THREE WORDS AND/OR A NUMBER for each answer.",
      headers: ["Workshop", "What you learn / do", "Experience / booking"],
      rows: [
        {
          workshop: "Clothing and soft furnishings",
          cells: [
            {
              id: 1,
              before: "Focus on ",
              after: " of worn items",
              answers: ["fabric repair"],
            },
            {
              id: 2,
              before: "Book using your ",
              after: " name",
              answers: ["first and last"],
            },
          ],
        },
        {
          workshop: "Sewing circle",
          cells: [
            {
              id: 3,
              before: "Ideal if you have ",
              after: "",
              answers: ["previous sewing experience"],
            },
            {
              given:
                "Helpers demonstrate stitching techniques step by step.",
            },
          ],
        },
        {
          workshop: "Wood and furniture",
          cells: [
            {
              id: 4,
              before: "Introduction to ",
              after: "",
              answers: ["carving techniques"],
            },
            {
              given: "Tools are provided; beginners welcome.",
            },
          ],
        },
      ],
    },
    notes: {
      title: "Important information for all workshops",
      limit:
        "Questions 5–7\nComplete the notes below.\nWrite NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
      items: [
        {
          id: 5,
          before: "• Tutors have ",
          after: " of materials and methods",
          answers: ["Specialist knowledge", "specialist knowledge"],
        },
        {
          id: 6,
          before: "• Tell staff about any ",
          after: " before you start",
          answers: ["allergies"],
        },
        {
          id: 7,
          before: "• Wear suitable ",
          after: " in the workshop",
          answers: ["Protective clothing", "protective clothing"],
        },
      ],
    },
  },
  discussion: {
    badge: "5",
    heading: "Discussion",
    instruction:
      "Discuss the questions. Try to use impersonal language and connecting ideas.",
    questions: [
      "Why is it important to look after the world's resources?",
      "To what extent do you think upcycling can make a real difference? Why?",
    ],
    suggestedTitle: "Suggested answer",
    suggestedAnswer: [
      "It is important to look after the world's resources because many materials, such as metals and clean water, are finite. If they are wasted or polluted, future generations will face shortages and higher costs.",
      "Upcycling can make a difference at a local level by reducing landfill and encouraging creative reuse. However, from a global perspective, its impact is limited unless governments and large companies also change production on a mass scale.",
    ],
  },
  answerKeys: {
    1: ["fabric repair"],
    2: ["first and last"],
    3: ["previous sewing experience"],
    4: ["carving techniques"],
    5: ["Specialist knowledge", "specialist knowledge"],
    6: ["allergies"],
    7: ["Protective clothing", "protective clothing"],
  } as Record<number, string[]>,
};
