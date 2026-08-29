import type { MindsetFlowData } from "./flowTypes";

export const MS_U8_LISTEN_STEPS = [
  "Lead-in",
  "Outline keys",
  "Classroom tip",
  "Exam keys",
] as const;

export const MS_U8_LISTEN_NEXT = [
  "Outline →",
  "Tip →",
  "Exam →",
  "← Back to unit",
] as const;

export const listeningU8: MindsetFlowData = {
  id: "ms-u8-listening-flow",
  bookPages: "pp. 173–177",
  sectionTitle: "Listening · Culture · Outline · Keys",
  unitGoals: [
    "follow talks about culture and change",
    "complete outlines and matching tasks",
    "practise with keys only when audio is unavailable",
  ],
  steps: [...MS_U8_LISTEN_STEPS],
  nextLabels: [...MS_U8_LISTEN_NEXT],
  panels: [
    {
      kind: "intro",
      badge: "LEAD-IN",
      instruction:
        "Culture / travel / festivals listening — predict topic vocabulary, then keys-only practice.",
      discuss: [
        "What festivals are important in your culture?",
        "How has the internet changed how we experience other cultures?",
      ],
    },
    {
      kind: "keysOnly",
      badge: "3",
      instruction:
        "Globalisation of culture — match each talk section to the correct outline heading.",
      note: "outline headings",
      tip: "The headings in bold tell you the structure: Definitions of culture → Negative view → Positive view → Effect of the internet → Conclusion.",
      bank: [
        "Negative view",
        "Positive view",
        "Effect of the internet",
      ],
      items: [
        {
          id: "1",
          label:
            "Increasing globalisation of culture due to global capitalism; global business does not take into account individual cultural requirements; 1999 survey in France: 60% felt globalisation a danger to the French way of life →",
          key: "Negative view",
        },
        {
          id: "2",
          label:
            "People seen as global citizens, able to choose the food, music and clothes they like; profound characteristics of culture, such as views on society, are not as likely to alter →",
          key: "Positive view",
        },
        {
          id: "3",
          label:
            "Has helped save local traditions and languages →",
          key: "Effect of the internet",
        },
      ],
    },
    {
      kind: "mc",
      badge: "Skills",
      instruction:
        "Do not reveal answers until students finish (exam tip). Practice items:",
      items: [
        {
          id: "1",
          stem: "When practising listening in class, answer keys should be…",
          options: [
            { id: "A", text: "shown before the first play" },
            {
              id: "B",
              text: "withheld until students have completed the task",
            },
            { id: "C", text: "ignored" },
          ],
          key: "B",
        },
      ],
    },
    {
      kind: "gaps",
      badge: "EXAM",
      instruction:
        "Listen and answer questions 1–10 (keys only). Questions 1–4: complete the sentences. Questions 5–10: complete the notes. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
      tip: "For notes completion, the headings show the structure — listen for each tribe/section in order and write only what you hear (often two words). Check spelling of names carefully.",
      bank: [
        "independent country",
        "urban areas",
        "social groups",
        "contact",
        "yellow paint",
        "river spirits",
        "terrifying masks",
        "tourists",
        "government",
        "natural",
      ],
      items: [
        {
          id: "1",
          stem: "The Eastern side of the island of New Guinea, Papua New Guinea, became an ______ in 1975.",
          key: "independent country",
        },
        {
          id: "2",
          stem: "Only 18% of the inhabitants of Papua New Guinea reside in ______.",
          key: "urban areas",
          altKeys: ["cities", "urban areas/cities"],
        },
        {
          id: "3",
          stem: "Papua New Guinea tribes should be seen as separate ______.",
          key: "social groups",
        },
        {
          id: "4",
          stem: "There are a small number of tribes who have had no ______ with neighbouring groups and the world beyond.",
          key: "contact",
        },
        {
          id: "5",
          stem: "Huli-Wigmen · 40,000 members · decorate their faces with ______ · have belts of pigtails, apron of leaves, wigs made of own hair · do dances which imitate local birds",
          key: "yellow paint",
        },
        {
          id: "6",
          stem: "Asaro mud men · cover their bodies in mud to resemble ______ in order to frighten off other tribes · have very long fingernails",
          key: "river spirits",
          altKeys: ["spirits", "(river) spirits"],
        },
        {
          id: "7",
          stem: "Asaro mud men · put on ______ to make themselves look fiercer",
          key: "terrifying masks",
          altKeys: ["masks", "(terrifying) masks"],
        },
        {
          id: "8",
          stem: "Chimbu skeleton dancers · Men and women used to live in separate houses. · Now families live together. · Now perform dances for the benefit of ______",
          key: "tourists",
        },
        {
          id: "9",
          stem: "Mount Hagan Sing-Sing · Over 50 tribes take part. · Begun by ______ in 1961 to bring together tribes in peace.",
          key: "government",
        },
        {
          id: "10",
          stem: "Mount Hagan Sing-Sing · Tribespeople wear headdresses made of flowers, shells and feathers. · Some loss of authenticity, such as the replacement of ______ dyes on their wonderful costumes with artificial ones.",
          key: "natural",
        },
      ],
    },
  ],
};
