import type { MindsetFlowData } from "./flowTypes";

export const MS_U6_LISTEN_STEPS = [
  "Concern phrases",
  "Attitude phrases",
  "Note keys",
  "Purpose linkers",
  "Exam MC",
  "Exam flow",
] as const;

export const MS_U6_LISTEN_NEXT = [
  "Attitude →",
  "Notes →",
  "Linkers →",
  "Exam MC →",
  "Exam flow →",
  "← Back to unit",
] as const;

export const listeningU6: MindsetFlowData = {
  id: "ms-u6-listening-flow",
  bookPages: "pp. 127–132",
  sectionTitle: "Listening · Agreement · Notes · Purpose",
  unitGoals: [
    "recognise agreement and concern phrases",
    "complete notes and flow charts",
    "use cause–effect and purpose linkers",
  ],
  steps: [...MS_U6_LISTEN_STEPS],
  nextLabels: [...MS_U6_LISTEN_NEXT],
  panels: [
    {
      kind: "match",
      badge: "3",
      instruction:
        "Which TWO concerns do Dylan and Tanya agree are the most important about the Science and Technology Festival? First match each option A–E with the related phrases (1–10).",
      tip: "Match each paraphrase to its option first, then decide which TWO concerns both speakers treat as most important.",
      bank: [
        { id: "A", text: "A cost of entry" },
        { id: "B", text: "B distance between venues" },
        { id: "C", text: "C choosing between talks" },
        { id: "D", text: "D scheduled times of the talks" },
        { id: "E", text: "E relevance to their course" },
      ],
      bankReuse: true,
      items: [
        { id: "1", stem: "1 pick which ones to go to →", key: "C" },
        { id: "2", stem: "2 a waste of time for our courses →", key: "E" },
        { id: "3", stem: "3 ticket prices →", key: "A" },
        { id: "4", stem: "4 run from one talk to another →", key: "B" },
        {
          id: "5",
          stem: "5 the schedule must be really tricky to plan →",
          key: "D",
        },
        { id: "6", stem: "6 pay a lot on the door →", key: "A" },
        {
          id: "7",
          stem: "7 it's almost impossible to decide who to see →",
          key: "C",
        },
        {
          id: "8",
          stem: "8 the lecture rooms around campus are pretty spread out →",
          key: "B",
        },
        {
          id: "9",
          stem: "9 not going to be related to my studies →",
          key: "E",
        },
        { id: "10", stem: "10 timings in the programme →", key: "D" },
      ],
    },
    {
      kind: "gaps",
      badge: "5",
      instruction: "Place the attitude / agreement phrases.",
      bank: [
        "My biggest worry is",
        "You've got a point",
        "The real issue we've got",
        "I quite agree",
        "I'm not exactly confident",
        "That's absolutely true",
      ],
      items: [
        {
          id: "1",
          stem: "Tanya: My biggest worry is ______ that there won't be anything related to my studies.",
          key: "My biggest worry is",
        },
        {
          id: "2",
          stem: "Dylan: ______, but it's not so much that I'm worried about it being a waste of time…",
          key: "You've got a point",
        },
        {
          id: "3",
          stem: "Dylan: ______ is how to pick which ones to go to.",
          key: "The real issue we've got",
        },
        {
          id: "4",
          stem: "Tanya: ______ — there are so many interesting speakers…",
          key: "I quite agree",
        },
        {
          id: "5",
          stem: "Tanya: … so ______ we'll be able to make it to each venue in time.",
          key: "I'm not exactly confident",
        },
        {
          id: "6",
          stem: "Dylan: ______, neither am I.",
          key: "That's absolutely true",
        },
      ],
    },
    {
      kind: "keysOnly",
      badge: "12",
      instruction:
        "Lecture summary plan — complete the flow-chart. Write NO MORE THAN TWO WORDS for each answer.",
      note: "Lecture summary plan",
      bank: [
        "bullet points",
        "initial impressions",
        "leave out",
        "edited version",
        "feedback",
      ],
      items: [
        {
          id: "1",
          label: "Take lecture notes using ______",
          key: "bullet points",
        },
        {
          id: "2",
          label: "Come together to discuss ______",
          key: "initial impressions",
        },
        {
          id: "3",
          label: "Agree what information to ______ of summary.",
          key: "leave out",
        },
        {
          id: "4",
          label: "Produce ______ of main themes, ideas, points.",
          key: "edited version",
        },
        {
          id: "5",
          label: "Email summary to tutor for further ______",
          key: "feedback",
        },
      ],
    },
    {
      kind: "gaps",
      badge: "13–14",
      instruction: "Cause–effect linkers and corrected purpose phrases.",
      bank: [
        "That way",
        "By doing so",
        "In order for us to",
        "In order that she could",
        "so as to",
        "This way",
        "After doing so",
      ],
      items: [
        { id: "1", stem: "use bullet points → easier to compare notes →", key: "That way" },
        { id: "2", stem: "agree themes → edited version →", key: "By doing so" },
        { id: "3", stem: "contact tutor → get feedback →", key: "In order for us to" },
        {
          id: "4a",
          stem: "Incorrect 'In order so to' → correct purpose phrase →",
          key: "In order that she could",
          altKeys: ["so as to"],
        },
        {
          id: "4b",
          stem: "Incorrect 'The way' →",
          key: "That way",
          altKeys: ["This way"],
        },
        {
          id: "4c",
          stem: "Incorrect 'For doing so' →",
          key: "By doing so",
          altKeys: ["After doing so"],
        },
      ],
    },
    {
      kind: "mc",
      badge: "EXAM 1–6",
      instruction:
        "Exam skills: listen and answer questions 1–6 (keys only — no audio).",
      multi: true,
      multiKeys: {
        "1-2": ["B", "D"],
      },
      items: [
        {
          id: "1-2",
          stem: "Which TWO elements of the Science and Technology Festival do Dylan and Tanya agree were most beneficial?",
          options: [
            { id: "A", text: "They were able to meet new people." },
            { id: "B", text: "They improved their study skills." },
            {
              id: "C",
              text: "It helped to prepare them for their course.",
            },
            {
              id: "D",
              text: "It allowed them to become familiar with the university campus.",
            },
            {
              id: "E",
              text: "It introduced them to new areas of study.",
            },
          ],
          key: "B",
        },
        {
          id: "3",
          stem: "The professor believes that the main role of the festival is to",
          options: [
            {
              id: "A",
              text: "make the general public more aware of science and technology.",
            },
            { id: "B", text: "have a different focus each year." },
            {
              id: "C",
              text: "show how both fields of study are equally important.",
            },
          ],
          key: "A",
        },
        {
          id: "4",
          stem: "The university information stands were there to",
          options: [
            { id: "A", text: "help people who were lost." },
            {
              id: "B",
              text: "generate more interest in current research.",
            },
            {
              id: "C",
              text: "allow the people who attended the festival to meet the lecturers.",
            },
          ],
          key: "B",
        },
        {
          id: "5",
          stem: "What does Tanya say about the festival guidebook?",
          options: [
            { id: "A", text: "The map was confusing." },
            { id: "B", text: "There were too many advertisements." },
            {
              id: "C",
              text: "The schedules for some lectures were wrong.",
            },
          ],
          key: "C",
        },
        {
          id: "6",
          stem: "Dylan says that nowadays festivals",
          options: [
            {
              id: "A",
              text: "have to increase the entry charge every year.",
            },
            {
              id: "B",
              text: "make a lot of money from the admission fee.",
            },
            {
              id: "C",
              text: "are mostly paid for through advertising.",
            },
          ],
          key: "C",
        },
      ],
    },
    {
      kind: "match",
      badge: "EXAM 7–10",
      instruction:
        "Complete the flow-chart. Choose FOUR answers from the list below and write the correct letter, A–H, next to questions 7–10. Advice for posting summary on department website.",
      tip: "Follow the flow-chart order; each letter A–H is used at most once. Listen for what the advice step is about before choosing.",
      bank: [
        { id: "A", text: "A deadline" },
        { id: "B", text: "B timetable" },
        { id: "C", text: "C styles" },
        { id: "D", text: "D workload" },
        { id: "E", text: "E information" },
        { id: "F", text: "F theories" },
        { id: "G", text: "G posts" },
        { id: "H", text: "H ideas" },
      ],
      items: [
        { id: "7", stem: "Choose four main ______ to summarise.", key: "F" },
        {
          id: "8",
          stem: "Refer to previous ______ for guidance on how to write them.",
          key: "G",
        },
        {
          id: "9",
          stem: "Agree on how ______ is to be shared.",
          key: "D",
        },
        {
          id: "10",
          stem: "Set a ______ and keep to it.",
          key: "A",
        },
      ],
    },
  ],
};
