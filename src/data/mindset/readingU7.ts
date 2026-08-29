import type { MindsetFlowData } from "./flowTypes";
import { PASSAGE_U7_MEDIA } from "./readingPassages";

export const MS_U7_READ_STEPS = [
  "Vocab match",
  "Paragraphs",
  "Short answers",
  "MC check",
  "Discussion",
] as const;

export const MS_U7_READ_NEXT = [
  "Paragraphs →",
  "Short →",
  "MC →",
  "Discussion →",
  "← Back to unit",
] as const;

export const readingU7: MindsetFlowData = {
  id: "ms-u7-reading-flow",
  bookPages: "pp. 139–145",
  sectionTitle: "Reading · Media · Matching · Short answers",
  unitGoals: [
    "understand media vocabulary and paraphrases",
    "match information and complete short answers",
    "evaluate citizen journalism claims",
  ],
  steps: [...MS_U7_READ_STEPS],
  nextLabels: [...MS_U7_READ_NEXT],
  panels: [
    {
      kind: "match",
      badge: "1–2",
      instruction:
        "Scan each paragraph and find the following information. Match each locating prompt with the correct answer from the bank.",
      passage: PASSAGE_U7_MEDIA,
      tip: "Match each feature to the list person — one person may not be used.",
      bank: [
        { id: "A", text: "a camera" },
        { id: "B", text: "Ohmynews!" },
        { id: "C", text: "CNN, The Times" },
        { id: "D", text: "2021" },
        { id: "E", text: "educational, economic, social, cultural" },
        { id: "F", text: "rioters, looters" },
        { id: "G", text: "their critical faculties" },
      ],
      items: [
        {
          id: "1",
          stem: "Paragraph E: four types of obstacles to participation in society",
          key: "E",
        },
        {
          id: "2",
          stem: "Paragraph G: something audiences need to sharpen or improve",
          key: "G",
        },
        {
          id: "3",
          stem: "Paragraph A: something a journalist traditionally possessed",
          key: "A",
        },
        {
          id: "4",
          stem: "Paragraph C: two well-known media outlets",
          key: "C",
        },
        {
          id: "5",
          stem: "Paragraph F: two types of criminals",
          key: "F",
        },
        {
          id: "6",
          stem: "Paragraph B: the name of a Korean news site",
          key: "B",
        },
        {
          id: "7",
          stem: "Paragraph D: the year in which half of the news may be produced by amateurs",
          key: "D",
        },
      ],
    },
    {
      kind: "match",
      badge: "8",
      instruction:
        "The text has seven paragraphs, A–G. Which paragraph contains the following information? Write the correct letter, A–G. NB You may use any letter more than once.",
      passage: PASSAGE_U7_MEDIA,
      tip: "Which paragraph contains each piece of information? Letters may be used more than once.",
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
        {
          id: "1",
          stem: "Why some journalists fear the new trends",
          key: "D",
        },
        {
          id: "2",
          stem: "Details of civil unrest in a major city",
          key: "F",
        },
        {
          id: "3",
          stem: "Why education is needed in the context of this change in the media",
          key: "G",
        },
        {
          id: "4",
          stem: "Subjects journalists traditionally study at university",
          key: "A",
        },
        {
          id: "5",
          stem: "How the story of a spaceship disaster broke",
          key: "B",
        },
        {
          id: "6",
          stem: "Why participatory journalism is good for disadvantaged groups",
          key: "E",
        },
      ],
    },
    {
      kind: "gaps",
      badge: "10",
      instruction:
        "Answer the questions below. Choose NO MORE THAN THREE WORDS from the text for each answer.",
      passage: PASSAGE_U7_MEDIA,
      bank: [
        "eyewitness",
        "space shuttle Columbia",
        "(amateur) (news) bloggers",
        "gatekeepers",
      ],
      items: [
        {
          id: "1",
          stem: "In the past, what role would a member of the public who saw a newsworthy event be expected to play?",
          key: "eyewitness",
        },
        {
          id: "2",
          stem: "What was the subject of the story given as an example of an amateur journalist scoop before it was reported by a major news agency?",
          key: "space shuttle Columbia",
        },
        {
          id: "3",
          stem: "From which group of people have the media establishment begun to hire staff?",
          key: "(amateur) (news) bloggers",
          altKeys: ["amateur news bloggers", "amateur bloggers", "news bloggers", "bloggers"],
        },
        {
          id: "4",
          stem: "What had mainstream media traditionally seen their role in news reporting as being?",
          key: "gatekeepers",
        },
      ],
    },
    {
      kind: "mc",
      badge: "11",
      instruction: "Choose the correct letter, A, B or C.",
      passage: PASSAGE_U7_MEDIA,
      items: [
        {
          id: "7",
          stem: "What has amateur journalism been accused of increasing the risk of?",
          options: [
            { id: "A", text: "fake news" },
            { id: "B", text: "critical thinking" },
            { id: "C", text: "untrue stories" },
          ],
          key: "A",
        },
        {
          id: "8",
          stem: "What did citizen journalists help police to do during the London riots?",
          options: [
            { id: "A", text: "play a positive role" },
            { id: "B", text: "identify offenders" },
            { id: "C", text: "alert the authorities" },
          ],
          key: "B",
        },
        {
          id: "9",
          stem: "According to the text what is the 'new model' of broadcasting?",
          options: [
            { id: "A", text: "filter then publish" },
            { id: "B", text: "publish then filter" },
            { id: "C", text: "We media" },
          ],
          key: "B",
        },
      ],
    },
    {
      kind: "speak",
      badge: "Discussion",
      instruction: "Discuss how citizen journalism changes news reliability.",
      prompts: [
        "What is the difference between a journalist and a reporter?",
        "How do broadcast and publish differ?",
        "What is the difference between an eyewitness and a source?",
        "Should mainstream media still act as 'gatekeepers'?",
      ],
      tips: [
        "Journalist = generic media worker; reporter = writes/presents news only.",
        "Broadcast = TV/radio; publish = print/online text.",
        "Eyewitness saw events; source provides information.",
      ],
    },
  ],
};
