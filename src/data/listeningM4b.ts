export const LISTEN_M4B_STEPS = [
  "1 Before listen",
  "2a–2c Links",
  "3a Predict",
  "4 Exam",
  "5 Analysis",
] as const;

export const LISTEN_M4B_NEXT = [
  "2a–2c Links →",
  "3a Predict →",
  "4 Exam →",
  "5 Analysis →",
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

export function checkListenM4b(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export const listeningM4b = {
  id: "listening-m4b-flow",
  bookPages: "p. 63 in your coursebook",
  sectionTitle: "Listening · Section 2",
  noAudioNote:
    "Аудио пока нет — можно пройти подготовку и заполнить задания. Ответы 1–10 появятся с треком, когда он будет добавлен.",
  before: {
    badge: "1",
    heading: "Before you listen",
    instruction: "Work in pairs and discuss the questions.",
    questions: [
      "When is gift-giving important in your culture? Why?",
      "What kinds of gifts are usual for different occasions?",
      "Is it better to give a personal gift or a practical one? Are there any gifts that would be inappropriate?",
    ],
    tips: [
      "In the UK giving presents is important for birthdays, religious festivals and other events such as leaving a job or getting married. This may be because it shows the importance of the relationship.",
      "In the UK, we usually give flowers on Mother's Day, otherwise gifts are generally personalised.",
      "In the UK, it is often better to give something that the recipient would like rather than a functional gift. However, when it comes to flowers, it should be remembered while giving lilies to someone is appropriate for a funeral, it would not be for other occasions unless it was known that the recipient really liked them.",
    ],
  },
  links: {
    heading: "Identify links between ideas",
    a2a: {
      badge: "2a",
      instruction:
        "Look at the table in Exercise 4. How will the information be presented? Explain your reasoning.",
      options: [
        {
          id: "A",
          text: "Down each column, topic by topic.",
        },
        {
          id: "B",
          text: "In number order, horizontally across, by gift.",
        },
        {
          id: "C",
          text: "Randomly, depending on the speaker's digressions.",
        },
        {
          id: "D",
          text: "Only the disadvantages column will be completed.",
        },
      ],
      key: "B",
      tip: "In number order. Horizontally across, by gift.",
    },
    a2b: {
      badge: "b",
      instruction:
        "Match the linking relationships (1–4) with the examples of how they might appear in a listening table (A–D).",
      items: [
        {
          id: 1,
          text: "Advantage versus disadvantage of the same gift type",
          key: "B",
        },
        {
          id: 2,
          text: "Cause and effect connected to cultural expectations",
          key: "D",
        },
        {
          id: 3,
          text: "A warning or problem that follows from a poor choice",
          key: "A",
        },
        {
          id: 4,
          text: "A positive outcome that balances an earlier drawback",
          key: "C",
        },
      ],
      options: [
        {
          id: "A",
          text: "Giving the wrong gift may cause offence.",
        },
        {
          id: "B",
          text: "Cash can keep the power balance; cash may seem impersonal.",
        },
        {
          id: "C",
          text: "A traditional gift may be expected, but it can also show respect.",
        },
        {
          id: "D",
          text: "Because gifts signal status, people choose items of a certain value.",
        },
      ],
    },
    a2c: {
      badge: "c",
      instruction:
        "Look at questions 5–10 in the notes. How are the links between ideas different from those in the table?",
      tip: "There are fewer clues which show the relationship of ideas like advantages and disadvantages in the table.",
    },
  },
  predict3a: {
    badge: "3a",
    heading: "Predict the answers",
    instruction:
      "Analyse questions 1–10 with a partner. What clues help you predict each answer?",
    tips: [
      "Question 2 is likely to be an adjective to describe amount; the adjective will begin with a consonant because the article is a not an.",
      "Question 4 is likely to be an adjective because the verb to be + adverb precedes the answer.",
      "Question 7 is likely to be a noun beginning with a vowel because the article is an not a.",
    ],
  },
  exam: {
    badge: "4",
    heading: "Test practice",
    strategies: "TEST STRATEGIES page 168",
    instruction:
      "Complete the table and the notes. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    audioNote: "Audio will be added later.",
    table: {
      title: "Gift-giving: cultural advice",
      limit:
        "Questions 1–4\nComplete the table below.\nWrite NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
      headers: ["Gift type", "Advantage / purpose", "Risk / note"],
      rows: [
        {
          gift: "Money / cash",
          cells: [
            {
              id: 1,
              before: "Helps keep the ",
              after: " between giver and receiver",
              answers: ["power balance"],
            },
            {
              id: 2,
              before: "Choose a ",
              after: " amount",
              answers: ["reasonable"],
            },
          ],
        },
        {
          gift: "Personal item",
          cells: [
            {
              id: 3,
              before: "A poor choice may cause ",
              after: "",
              answers: ["offence"],
            },
            {
              id: 4,
              before: "Some gifts are still strongly ",
              after: "",
              answers: ["traditional"],
            },
          ],
        },
      ],
    },
    notes: {
      title: "Further advice from the talk",
      limit:
        "Questions 5–10\nComplete the notes below.\nWrite NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
      items: [
        {
          id: 5,
          before: "• Gift exchange can signal social ",
          after: "",
          answers: ["acceptance"],
        },
        {
          id: 6,
          before: "• People often judge gifts by their ",
          after: "",
          answers: ["value"],
        },
        {
          id: 7,
          before: "• A gift may act as an ",
          after: " to strengthen relationships",
          answers: ["incentive"],
        },
        {
          id: 8,
          before: "• At some events guests are asked to ",
          after: " instead of buying a present",
          answers: ["contribute money"],
        },
        {
          id: 9,
          before: "• ",
          after: " parties often involve collective gifts from colleagues",
          answers: ["Retirement"],
        },
        {
          id: 10,
          before: "• A short ",
          after: " usually accompanies the presentation of the gift",
          answers: ["speech"],
        },
      ],
    },
  },
  analysis: {
    badge: "5",
    heading: "Task analysis",
    instruction:
      "Work in pairs. Analyse the questions and your answers. Did the links between ideas help you?",
    checklist: [
      "I followed the numbering across the table by gift type.",
      "I used advantage/disadvantage links to locate answers 1–4.",
      "I checked the word limit for every answer.",
      "I used grammar clues (articles, adjectives) to predict word type.",
    ],
  },
  answerKeys: {
    1: ["power balance"],
    2: ["reasonable"],
    3: ["offence", "offense"],
    4: ["traditional"],
    5: ["acceptance"],
    6: ["value"],
    7: ["incentive"],
    8: ["contribute money"],
    9: ["Retirement", "retirement"],
    10: ["speech"],
  } as Record<number, string[]>,
};
