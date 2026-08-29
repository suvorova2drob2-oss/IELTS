export const LANG_M7B_STEPS = [
  "1a Articles/agreement",
  "2 Correct errors",
  "3a–3b by/to",
  "4 Prepositions",
  "5 Meaning shifts",
] as const;

export const LANG_M7B_NEXT = [
  "2 Correct errors →",
  "3a–3b by/to →",
  "4 Prepositions →",
  "5 Meaning →",
  "← К модулю",
] as const;

export const languageM7b = {
  id: "language-m7b-flow",
  bookPages: "p. 112 in your coursebook",
  sectionTitle: "Language development and vocabulary",
  choose1a: {
    badge: "1a",
    expert: "EXPERT GRAMMAR page 180",
    instruction: "Choose the correct option in italics to complete the text.",
    title: "Greyhound travel",
    items: [
      {
        id: 1,
        before: "One of ",
        options: ["the", "a"],
        after: " most ubiquitous travel logos in the USA",
        key: "the",
      },
      {
        id: 2,
        before: " ",
        options: ["is", "are"],
        after: " that of the coach company Greyhound Lines. Greyhound Lines",
        key: "is",
      },
      {
        id: 3,
        before: " ",
        options: ["was", "were"],
        after: " established in 1914 and",
        key: "was",
      },
      {
        id: 4,
        before: " ",
        options: ["are", "is"],
        after:
          " still in operation today serving over 2,700 destinations across",
        key: "is",
      },
      {
        id: 5,
        before: " ",
        options: ["the", "a"],
        after:
          " country. There are only a handful of people who",
        key: "the",
      },
      {
        id: 6,
        before: " ",
        options: ["do not", "does not"],
        after: " know of the company and most Americans",
        key: "do not",
      },
      {
        id: 7,
        before: " ",
        options: ["use", "uses"],
        after: " it at some point in their lives. Greyhound buses",
        key: "use",
      },
      {
        id: 8,
        before: " ",
        options: ["has", "have"],
        after:
          " featured in several famous films including Breakfast at Tiffany's. In addition, many singers included",
        key: "have",
      },
      {
        id: 9,
        before: " ",
        options: ["the", "a"],
        after:
          " word Greyhound in their songs specifically to refer to the name of the celebrated bus company. For these reasons, it is likely to have",
        key: "the",
      },
      {
        id: 10,
        before: " ",
        options: ["the", "a"],
        after:
          " prominent place in history, of cultural as well as commercial significance.",
        key: "a",
      },
    ],
  },
  correct2: {
    badge: "2",
    instruction: "Correct the errors in the sentences.",
    items: [
      {
        id: 1,
        text: "A number of passengers choosing to travel internationally by train are increasing.",
        answers: ["The number of passengers choosing to travel internationally by train is increasing.", "The number/is increasing"],
      },
      {
        id: 2,
        text: "Neither the train service nor the bus service are operating today.",
        answers: ["Neither the train service nor the bus service is operating today.", "is operating"],
      },
      {
        id: 3,
        text: "The main shipping route across both the Atlantic and the Pacific have become rather crowded.",
        answers: ["The main shipping route across both the Atlantic and the Pacific has become rather crowded.", "has become"],
      },
      {
        id: 4,
        text: "Recent data from airlines suggests that passengers are becoming more dissatisfied with waiting times.",
        answers: ["Recent data from airlines suggest that passengers are becoming more dissatisfied with waiting times.", "data suggest"],
      },
      {
        id: 5,
        text: "Both children travels free with a package holiday deal.",
        answers: ["Both children travel free with the package holiday deal.", "travel, the package holiday"],
      },
      {
        id: 6,
        text: "The convenient way to travel across a continent of South America are by overnight coach.",
        answers: ["A convenient way to travel across the continent of South America is by overnight coach.", "A convenient way, the continent, is"],
      },
    ],
  },
  byTo: {
    badge: "3a",
    instruction: "What is the difference in meaning between the sentences below?",
    pairs: [
      "The number of people who flew to their holiday destination rose by 10 percent in 2015.",
      "The number of people who flew to their holiday destination rose to 10 percent in 2015.",
    ],
    match: {
      badge: "b",
      instruction: "Match the sentences in Exercise 3a with the meanings below.",
      items: [
        {
          id: 1,
          text: "The final figure was 10 percent.",
          key: "B",
        },
        {
          id: 2,
          text: "The increase was 10 percent more than before.",
          key: "A",
        },
      ],
      options: [
        { id: "A", text: "rose by 10 percent" },
        { id: "B", text: "rose to 10 percent" },
      ],
    },
  },
  prepositions4: {
    badge: "4",
    instruction: "Complete the text with the prepositions below.",
    bank: ["at", "by", "by", "by", "on", "over", "through", "to"],
    title: "The train travel of the future could be here soon!",
    items: [
      {
        id: 1,
        before:
          "The Hyperloop is a high-speed train system proposed ",
        after:
          " the entrepreneur Elon Musk. It consists of tubes with capsules carrying passengers that travel",
        answers: ["by"],
      },
      {
        id: 2,
        before: " ",
        after:
          " them. The Hyperloop will operate",
        answers: ["through"],
      },
      {
        id: 3,
        before: " ",
        after:
          " sending capsules through a tube made from steel. In the plans, the capsules float",
        answers: ["by"],
      },
      {
        id: 4,
        before: " ",
        after: " a cushion of air and might be able to travel",
        answers: ["on"],
      },
      {
        id: 5,
        before: " ",
        after:
          " speeds of over 700 mph. This means that travelling times could be reduced",
        answers: ["at"],
      },
      {
        id: 6,
        before: " ",
        after:
          " a much lower level. In addition, because the capsules are powered",
        answers: ["to"],
      },
      {
        id: 7,
        before: " ",
        after:
          " electricity, the Hyperloop is likely to bring many environmental advantages",
        answers: ["by"],
      },
      {
        id: 8,
        before: " ",
        after: " air travel because it will use less fuel.",
        answers: ["over"],
      },
    ],
  },
  meaning5: {
    badge: "5",
    instruction:
      "Work in pairs and discuss how the prepositions in the sentences change the meaning of what is being said.",
    items: [
      {
        id: 1,
        text: "There are three categories of transport among / besides those most commonly used by commuters.",
        tip: "among suggests that the categories are included in those used by commuters, whereas besides suggests that they are separate.",
      },
      {
        id: 2,
        text: "The findings were corroborated by / with the research council.",
        tip: "by indicates that the research council did this alone, whereas with indicates that the research council helped but were not alone in this action.",
      },
      {
        id: 3,
        text: "The cost of transport increased from / by $2.50 in 2010.",
        tip: "from means that the starting amount was $2.50 and the increase is unknown, whereas by means that the increase was $2.50 but the starting price is unknown.",
      },
    ],
  },
};
