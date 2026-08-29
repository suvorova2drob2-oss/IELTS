import type { MindsetFlowData } from "./flowTypes";

export const MS_U5_LISTEN_STEPS = [
  "Time phrases",
  "Match events",
  "Select from list",
  "Attitude words",
  "Opinion MC",
  "Tourist match",
  "Petra topics",
  "Petra water",
] as const;

export const MS_U5_LISTEN_NEXT = [
  "Events →",
  "Select →",
  "Attitude →",
  "Opinion →",
  "Tourist →",
  "Petra →",
  "Water →",
  "← Back to unit",
] as const;

export const listeningU5: MindsetFlowData = {
  id: "ms-u5-listening-flow",
  bookPages: "pp. 105–109",
  sectionTitle: "Listening · Time phrases · Select · Opinion",
  unitGoals: [
    "use time phrases accurately",
    "deal with 'Select from a list' tasks",
    "identify attitude and opinion; multiple matching",
  ],
  steps: [...MS_U5_LISTEN_STEPS],
  nextLabels: [...MS_U5_LISTEN_NEXT],
  panels: [
    {
      kind: "intro",
      badge: "LEAD-IN",
      instruction:
        "Look at the following time phrases. For each, decide which option(s) are NOT correct. Then match events with time periods (keys only).",
      tips: [
        "1a NOT: on the 1070s",
        "1b NOT: end twentieth century",
        "1c NOT: season",
        "1d NOT: from 1642 and 1649",
        "1e all OK in context / check carefully",
        "1f NOT: between … to / in … to — use from 1914 to 1918 OR between 1914 and 1918",
        "1g NOT: on the 9th century AD",
        "1h NOT: era",
        "1i NOT: recent 200 years (use past / last)",
      ],
    },
    {
      kind: "keysOnly",
      badge: "2",
      instruction:
        "Match the events (1–9) with the time periods. Keys-only practice (no audio).",
      note: "keys",
      bank: [
        "since the ninth century AD",
        "in the mid-twentieth century",
        "between 1642 and 1649",
        "in the last 200 years",
        "during the 1070s",
        "from 1914 to 1918",
        "after the restoration of the monarchy",
        "during the Victorian era",
        "in the first decade of the twenty-first century",
      ],
      items: [
        { id: "1", label: "The monarchy has existed in England …", key: "since the ninth century AD" },
        { id: "2", label: "Elizabeth II became Queen of England …", key: "in the mid-twentieth century" },
        { id: "3", label: "There was a Civil War in England …", key: "between 1642 and 1649" },
        { id: "4", label: "The Tower of London has had many functions …", key: "in the last 200 years" },
        { id: "5", label: "The Tower of London was built by William the Conqueror …", key: "during the 1070s" },
        { id: "6", label: "The First World War lasted …", key: "from 1914 to 1918" },
        { id: "7", label: "King Charles II gained control of the Tower of London …", key: "after the restoration of the monarchy" },
        { id: "8", label: "The Tower of London became a tourist destination …", key: "during the Victorian era" },
        { id: "9", label: "Visitors to the Tower rose to 2 million per year …", key: "in the first decade of the twenty-first century" },
      ],
    },
    {
      kind: "mc",
      badge: "3–7",
      instruction:
        "Select from a list (Tower of London). Keys only — choose the correct option(s).",
      multi: true,
      multiKeys: {
        "6": ["C", "D"],
        "7": ["A", "E"],
      },
      items: [
        {
          id: "4",
          stem: "Which ONE of these is NOT mentioned as a previous use of the Tower of London?",
          options: [
            { id: "A", text: "a home for a king or queen" },
            { id: "B", text: "a place where arms are kept" },
            { id: "C", text: "a place of worship" },
            { id: "D", text: "a destination for sightseers" },
            { id: "E", text: "a place where currency is manufactured" },
          ],
          key: "C",
        },
        {
          id: "6",
          stem: "Which TWO statements about the history of the Tower are true according to the speaker?",
          options: [
            { id: "A", text: "Henry the Eighth ordered the construction of the Tower of London." },
            { id: "B", text: "King Charles the First controlled the Tower throughout the English Civil War." },
            { id: "C", text: "Enemies of Henry the Eighth lost their lives in the Tower." },
            { id: "D", text: "There was a zoo in the Tower for six centuries." },
            { id: "E", text: "Charles the Second got back the Crown Jewels from his enemies." },
          ],
          key: "C",
        },
        {
          id: "7",
          stem: "Which TWO statements are NOT true about the Tower of London today?",
          options: [
            { id: "A", text: "The birds called ravens have left the Tower." },
            { id: "B", text: "There is a special person to look after the ravens." },
            { id: "C", text: "The ravens can be dangerous." },
            { id: "D", text: "The guards called Beefeaters also act as tourist guides." },
            { id: "E", text: "Anyone can become a Beefeater." },
          ],
          key: "A",
        },
      ],
    },
    {
      kind: "gaps",
      badge: "8–9",
      instruction:
        "Attitude and opinion: match each group with a word/expression from the box. Then choose the speaker's attitude (MC).",
      bank: [
        "sub-standard",
        "dazzling",
        "phenomenal",
        "My favourite part was",
        "frightening",
        "apprehensive",
        "famous",
        "challenging",
      ],
      items: [
        { id: "1", stem: "It didn't live up to my expectations / disappointing / inadequate →", key: "sub-standard" },
        { id: "2", stem: "gorgeous / stunning / exquisite →", key: "dazzling" },
        { id: "3", stem: "out of this world / impressive / It took my breath away →", key: "phenomenal" },
        { id: "4", stem: "I really like how / I love the way that / What pleased me the most was →", key: "My favourite part was" },
        { id: "5", stem: "horrifying / terrifying / gruesome →", key: "frightening" },
        { id: "6", stem: "anxious / on edge / butterflies →", key: "apprehensive" },
        { id: "7", stem: "iconic / legendary / renowned →", key: "famous" },
        { id: "8", stem: "heavy going / struggled / tough →", key: "challenging" },
      ],
    },
    {
      kind: "mc",
      badge: "9–10",
      instruction: "What is the speaker's opinion or attitude? Then: which TWO opinions are NOT agreed on by both speakers?",
      multi: true,
      multiKeys: { "10": ["C", "D"] },
      items: [
        {
          id: "1",
          stem: "To be honest, I was glad when the tour ended. I was beginning to think it never would.",
          options: [
            { id: "A", text: "interested" },
            { id: "B", text: "bored" },
            { id: "C", text: "angry" },
          ],
          key: "B",
        },
        {
          id: "2",
          stem: "I usually hate museums, but in this one the hours just flew by …",
          options: [
            { id: "A", text: "frustrated" },
            { id: "B", text: "angry" },
            { id: "C", text: "fascinated" },
          ],
          key: "C",
        },
        {
          id: "3",
          stem: "Pete said that the Science Museum was out of this world. Well, there's no accounting for taste…",
          options: [
            { id: "A", text: "disappointed" },
            { id: "B", text: "delighted" },
            { id: "C", text: "impressed" },
          ],
          key: "A",
        },
        {
          id: "4",
          stem: "To be frank, that exhibit had an incredible effect on me. I cried my eyes out afterwards.",
          options: [
            { id: "A", text: "surprised" },
            { id: "B", text: "moved" },
            { id: "C", text: "frightened" },
          ],
          key: "B",
        },
        {
          id: "5",
          stem: "When I heard that there was an exhibition on space travel, I was over the moon…",
          options: [
            { id: "A", text: "pleased" },
            { id: "B", text: "indifferent" },
            { id: "C", text: "surprised" },
          ],
          key: "A",
        },
        {
          id: "10",
          stem: "Which TWO opinions are NOT agreed on by both of the speakers?",
          options: [
            { id: "A", text: "It is not realistic to talk about the entire history of the Tower." },
            { id: "B", text: "There is not enough to say about the Beefeaters and ravens." },
            { id: "C", text: "The Fusilier Museum topic would appeal to most students." },
            { id: "D", text: "Including a competition would be a good idea." },
            { id: "E", text: "The Crown Jewels would be the best topic to present." },
          ],
          key: "C",
        },
      ],
    },
    {
      kind: "match",
      badge: "12",
      instruction:
        "What comments do the speakers make about the tourist attractions? Choose FIVE answers from the box and write the correct letter, A–G, next to questions 1–5. (Keys only — no audio.)",
      tip: "Before you listen, think of different ways of paraphrasing each comment so you recognise it when speakers use other wording.",
      bank: [
        {
          id: "A",
          text: "It had previously had a display of real royal clothes.",
        },
        {
          id: "B",
          text: "Many famous artists are buried there.",
        },
        {
          id: "C",
          text: "It updates its exhibits from time to time.",
        },
        {
          id: "D",
          text: "It lived up to its reputation.",
        },
        {
          id: "E",
          text: "The queues were too long to get in.",
        },
        {
          id: "F",
          text: "It always has beautiful flower displays.",
        },
        {
          id: "G",
          text: "It has hosted many royal weddings.",
        },
      ],
      items: [
        { id: "1", stem: "Madame Tussauds", key: "C" },
        { id: "2", stem: "Buckingham Palace", key: "A" },
        { id: "3", stem: "Westminster Abbey", key: "G" },
        { id: "4", stem: "The Tower of London", key: "E" },
        { id: "5", stem: "The London Bridge Experience", key: "D" },
      ],
    },
    {
      kind: "match",
      badge: "EXAM 1–5",
      instruction:
        "What problem is associated with each of the topics Adrian is considering? Choose FIVE answers from the box and write the correct letter, A–G, next to questions 1–5.",
      tip: "Underline key words in each problem option, then listen for paraphrases linked to History, Trade routes, Conflicts, Architecture and Modern life.",
      bank: [
        {
          id: "A",
          text: "Most people are not aware of this aspect.",
        },
        {
          id: "B",
          text: "It would involve too much investigative work.",
        },
        {
          id: "C",
          text: "It is too large a topic.",
        },
        {
          id: "D",
          text: "It could be too technical.",
        },
        {
          id: "E",
          text: "It might take the focus off Petra.",
        },
        {
          id: "F",
          text: "Most people would not be interested in this aspect.",
        },
        {
          id: "G",
          text: "Academically, it is an inappropriate topic.",
        },
      ],
      items: [
        { id: "1", stem: "History", key: "C" },
        { id: "2", stem: "Trade routes", key: "E" },
        { id: "3", stem: "Conflicts", key: "B" },
        { id: "4", stem: "Architecture", key: "D" },
        { id: "5", stem: "Modern life", key: "G" },
      ],
    },
    {
      kind: "mc",
      badge: "EXAM 6–7",
      instruction:
        "Questions 6 and 7: Which TWO points about water management are NOT made by the speakers?",
      tip: "Select the two points the speakers do not make — ignore options that are mentioned, even if paraphrased.",
      multi: true,
      multiKeys: {
        "6": ["B", "D"],
      },
      items: [
        {
          id: "6",
          stem: "Which TWO points about water management are NOT made by the speakers?",
          options: [
            {
              id: "A",
              text: "Petra's water management was more advanced than that in other comparable areas.",
            },
            {
              id: "B",
              text: "The topic of water management systems is very complex to understand.",
            },
            {
              id: "C",
              text: "In Petra the people knew how to get the most out of all the sources of water available to them.",
            },
            {
              id: "D",
              text: "The advantages of water management were enjoyed by all levels of society equally.",
            },
            {
              id: "E",
              text: "Watering crops was a top priority.",
            },
          ],
          key: "B",
        },
      ],
    },
  ],
};
