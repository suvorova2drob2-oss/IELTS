export const SPEAK_M7A_STEPS = [
  "1 Lead-in",
  "2 Idioms",
  "3 Discuss idioms",
  "4 Accuracy",
  "5–6 Part 1",
  "7 Assess",
] as const;

export const SPEAK_M7A_NEXT = [
  "2 Idioms →",
  "3 Discuss →",
  "4 Accuracy →",
  "5–6 Part 1 →",
  "7 Assess →",
  "← К модулю",
] as const;

export const speakingM7a = {
  id: "speaking-m7a-flow",
  bookPages: "p. 107 in your coursebook",
  sectionTitle: "Speaking · Part 1",
  leadIn: {
    badge: "1",
    instruction:
      "Look at the photos. Which is most similar to the place where you were born? What are the pros and cons of living in each place?",
    tip: "Living in built-up areas is great for convenient living, but they may be overcrowded and therefore stressful. Living somewhere less densely populated could be inspiring and relaxing, but it may also be a little boring at times.",
  },
  idioms: {
    badge: "2",
    heading: "Develop topic-specific vocabulary",
    instruction: "Complete the conversation with the idioms below.",
    bank: [
      "a stone's throw away",
      "hustle and bustle",
      "pace of life",
      "live on top of each other",
      "run-down",
      "home from home",
    ],
    items: [
      {
        id: 1,
        before:
          "Examiner: Where do you live?\nCandidate: I live right in the centre of Shanghai, only ",
        after:
          " from the Bund, actually, which can be incredibly hectic because there are always mountains of tourists. I love being amongst the",
        answers: ["a stone's throw away"],
      },
      {
        id: 2,
        before: " ",
        after:
          " of the city centre though; everyone going to work, people everywhere — it's great! I really thrive on the fast",
        answers: ["hustle and bustle"],
      },
      {
        id: 3,
        before: " ",
        after:
          " that city centres have, even if we all do have to",
        answers: ["pace of life"],
      },
      {
        id: 4,
        before: " ",
        after:
          ". There's not that much space!\nExaminer: Have you always lived there?\nCandidate: No, I used to live in Hangzhou, which is roughly 200 kilometres south of Shanghai. In Hangzhou I lived in a pretty",
        answers: ["live on top of each other"],
      },
      {
        id: 5,
        before: " ",
        after:
          " neighbourhood, but in Shanghai I live in a nicer area. Still, it's very much a",
        answers: ["run-down"],
      },
      {
        id: 6,
        before: " ",
        after:
          " for me because they are both coastal cities.",
        answers: ["home from home"],
      },
    ],
  },
  discuss: {
    badge: "3",
    instruction: "Work in pairs and discuss the topics.",
    topics: [
      "A place that is a home from home for you.",
      "The places that are a stone's throw away from where you live at the moment.",
      "What the pace of life is like where you live.",
    ],
  },
  accuracy: {
    badge: "4a",
    instruction:
      "Match the speakers (1–5) with the type of mistake they make (A–E). (Audio 7.1 later.)",
    speakers: [
      { id: 1, key: "B" },
      { id: 2, key: "D" },
      { id: 3, key: "C" },
      { id: 4, key: "E" },
      { id: 5, key: "A" },
    ],
    mistakes: [
      {
        id: "A",
        text: "Word formation problems (e.g. invest instead of investment)",
      },
      {
        id: "B",
        text: "Lack of articles (e.g. in south of city instead of in the south of the city)",
      },
      {
        id: "C",
        text: "Problems with tense formation (e.g. Last year live in Saudi Arabia instead of Last year lived)",
      },
      {
        id: "D",
        text: "No subject (e.g. is hot here instead of it is hot here)",
      },
      {
        id: "E",
        text: "Wrong choice of word (e.g. work far from house instead of work far from home)",
      },
    ],
    tip: "Speaker 1: B · Speaker 2: D · Speaker 3: C · Speaker 4: E · Speaker 5: A",
  },
  part1: {
    badge: "6a",
    strategies: "TEST STRATEGIES page 174 · EXPERT SPEAKING page 187",
    instruction:
      "Read the questions and think about how best to answer them. Work in pairs and take turns to ask and answer. Note down any inaccuracies your partner makes.",
    questions: [
      "Where do you live?",
      "What do you like about where you live?",
      "What would you change about it?",
      "How has it changed since you have lived there?",
      "What activities would you recommend to a visitor to your town?",
    ],
  },
  assess: {
    badge: "7",
    instruction:
      "Think about the answers your partner gave and answer the questions.",
    questions: [
      "What mistakes did you note down?",
      "Did your partner self-correct when speaking?",
      "Were there any words which were mispronounced?",
    ],
  },
};
