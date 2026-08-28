export const LANG_M1A_STEPS = [
  "1a Match synonyms",
  "1b Complete sentences",
  "2a Prefixes",
  "2b Match meanings",
  "3a Word forms",
  "3b Word formation",
  "4a Paraphrase",
  "4b Discussion",
] as const;

export const languageM1a = {
  id: "language-m1a-flow",
  bookPages: "p. 13 in your coursebook",
  sectionTitle: "Language development",
  step1a: {
    instruction: "Match 1–4 with their synonyms A–D.",
    left: [
      { id: 1, text: "order" },
      { id: 2, text: "explain" },
      { id: 3, text: "recent" },
      { id: 4, text: "refill" },
    ],
    right: [
      { id: "A", text: "up-to-date" },
      { id: "B", text: "talk someone through something" },
      { id: "C", text: "get something in" },
      { id: "D", text: "top something up" },
    ],
    /** 1→C, 2→B, 3→A, 4→D */
    keys: { 1: "C", 2: "B", 3: "A", 4: "D" } as Record<number, string>,
  },
  step1b: {
    instruction:
      "Complete the sentences in two ways: with both the words 1–4 and the synonyms A–D in Exercise 1a. Make any necessary changes.",
    items: [
      {
        id: 1,
        before:
          "If you cannot see the book on the shelves, we would be happy to ",
        after: " the book for you.",
        wordAnswers: ["order"],
        synonymAnswers: [
          "get the book in",
          "get it in",
          "get something in",
        ],
        display: "order / get the book in",
      },
      {
        id: 2,
        before: "The magazines on this rack are the most ",
        after: " ones we have; they are all from last week.",
        wordAnswers: ["recent"],
        synonymAnswers: ["up-to-date", "up to date"],
        display: "recent / up-to-date",
      },
      {
        id: 3,
        before: "When the photocopier runs out of paper, you can ",
        after: " it with this paper here.",
        wordAnswers: ["refill"],
        synonymAnswers: ["top it up", "top something up"],
        display: "refill / top it up",
      },
      {
        id: 4,
        before:
          "There are a lot of facilities here so if you need more information, I will ",
        after: " further.",
        wordAnswers: ["explain"],
        synonymAnswers: [
          "talk you through",
          "talk you through it",
          "talk someone through",
        ],
        display: "explain / talk you through",
      },
    ],
  },
  step2a: {
    instruction: "Complete the sentences with the correct prefixes below.",
    prefixes: ["en", "in", "inter", "mis", "re", "un"],
    sentences: [
      {
        id: 1,
        parts: [
          {
            t: "If we don’t have what you want, we’re happy to get it in for you from another library, as we have an ",
          },
          { blank: "1", after: "-library" },
          { t: " loan policy." },
        ],
      },
      {
        id: 2,
        parts: [
          { t: "But, you’ll be " },
          { blank: "2", after: "able" },
          {
            t: " to use the automatic machines; you’ll need to come to the desk.",
          },
        ],
      },
      {
        id: 3,
        parts: [
          { t: "If you have " },
          { blank: "3", after: "sufficient" },
          {
            t: " money on your card, you can top this up at the reception desk.",
          },
        ],
      },
      {
        id: 4,
        parts: [
          { t: "You can " },
          { blank: "4", after: "arrange" },
          {
            t: " any appointment or room booking up to 24 hours in advance.",
          },
        ],
      },
      {
        id: 5,
        parts: [
          { t: "This may seem severe, however it " },
          { blank: "5a", after: "sures" },
          { t: " that the services and facilities aren’t " },
          { blank: "5b", after: "used" },
          { t: "." },
        ],
      },
    ],
    keys: {
      "1": "inter",
      "2": "un",
      "3": "in",
      "4": "re",
      "5a": "en",
      "5b": "mis",
    } as Record<string, string>,
  },
  step2b: {
    instruction:
      "Match the sentences in Exercise 2a with the sentences with a similar meaning A–E.",
    left: [
      {
        id: 1,
        text: "If we don’t have what you want, we’re happy to get it in for you from another library, as we have an inter-library loan policy.",
      },
      {
        id: 2,
        text: "But, you’ll be unable to use the automatic machines; you’ll need to come to the desk.",
      },
      {
        id: 3,
        text: "If you have insufficient money on your card, you can top this up at the reception desk.",
      },
      {
        id: 4,
        text: "You can rearrange any appointment or room booking up to 24 hours in advance.",
      },
      {
        id: 5,
        text: "This may seem severe, however it ensures that the services and facilities aren’t misused.",
      },
    ],
    right: [
      {
        id: "A",
        text: "As long as you give a day’s notice, you can change any of your reservations.",
      },
      {
        id: "B",
        text: "Make sure you return to the reception desk as you don’t have access to the electronic system.",
      },
      {
        id: "C",
        text: "Although it may appear strict, it’s to make sure people use the library properly.",
      },
      {
        id: "D",
        text: "We have a system of sharing books between libraries so if the book isn’t here, we can order it for you.",
      },
      {
        id: "E",
        text: "The reception desk is the place to refill your card when you run out of credit.",
      },
    ],
    /** 1D 2B 3E 4A 5C */
    keys: { 1: "D", 2: "B", 3: "E", 4: "A", 5: "C" } as Record<number, string>,
  },
  step3a: {
    instruction:
      "Read the text and decide which word form (noun, verb, adjective, adverb) should go in each space.",
    title: "Internet v libraries",
    forms: ["noun", "verb", "adjective", "adverb"] as const,
    /** Keys for 1–8 */
    keys: {
      1: "adverb",
      2: "adverb",
      3: "verb",
      4: "adjective",
      5: "adjective",
      6: "verb",
      7: "noun",
      8: "verb",
    } as Record<number, "noun" | "verb" | "adjective" | "adverb">,
  },
  step3b: {
    instruction: "Complete the text with the correct form of the words below.",
    title: "Internet v libraries",
    /** Click stem → gap places the correct word form */
    bank: [
      { stem: "accessible", form: "accessed", gap: 6 },
      { stem: "digital", form: "digitised", gap: 3 },
      { stem: "easy", form: "easily", gap: 2 },
      { stem: "informative", form: "information", gap: 7 },
      { stem: "legal", form: "illegal", gap: 4 },
      { stem: "simple", form: "simply", gap: 1 },
      { stem: "valuable", form: "valuable", gap: 5 },
      { stem: "various", form: "vary", gap: 8 },
    ],
    items: [
      {
        id: 1,
        answers: ["simply"],
        display: "simply (simple)",
      },
      {
        id: 2,
        answers: ["easily"],
        display: "easily (easy)",
      },
      {
        id: 3,
        answers: ["digitised", "digitized"],
        display: "digitised (digital)",
      },
      {
        id: 4,
        answers: ["illegal"],
        display: "illegal (legal)",
      },
      {
        id: 5,
        answers: ["valuable"],
        display: "valuable",
      },
      {
        id: 6,
        answers: ["accessed"],
        display: "accessed (accessible)",
      },
      {
        id: 7,
        answers: ["information"],
        display: "information (informative)",
      },
      {
        id: 8,
        answers: ["vary"],
        display: "vary (various)",
      },
    ],
  },
  /** Shared gap text for 3a / 3b */
  wordFormationPassage: [
    {
      t: "There is no denying that the internet has an astounding amount of information, but it ",
    },
    { gap: 1 },
    { t: " is not the case that everything can be accessed " },
    { gap: 2 },
    { t: " online. All the books in the world still have not been " },
    { gap: 3 },
    {
      t: ", despite efforts by companies such as Google. There are many reasons for this, and one such reason is copyright; it is ",
    },
    { gap: 4 },
    {
      t: " to fully reproduce many books online. Academically, libraries are ",
    },
    { gap: 5 },
    {
      t: " too as they are a way to view scholarly material for free. Research articles and journals can be ",
    },
    { gap: 6 },
    {
      t: " online with a subscription, yet go to any library and you can access these without charge. Also, you can usually guarantee that a library only stocks quality books and articles, whereas the quality of ",
    },
    { gap: 7 },
    { t: " on the web can " },
    { gap: 8 },
    { t: " enormously." },
  ],
  step4a: {
    instruction:
      "Complete the sentences below using a different form of the word in bold. Write no more than three words.",
    items: [
      {
        id: 1,
        source: "There is no one best way to revise for an exam.",
        prompt: "possible",
        before: "It is ",
        after: " define a single best study method.",
        answers: ["impossible to"],
        display: "impossible to",
      },
      {
        id: 2,
        source:
          "Getting to know yourself and how you study best is essential to your success.",
        prompt: "valuable",
        before: "If you know your study habits, it ",
        after: " your success.",
        answers: [
          "is invaluable to",
          "is invaluable for",
          "is invaluable to/for",
        ],
        display: "is invaluable to/for",
      },
      {
        id: 3,
        source:
          "Working at a steady pace, rather than cramming, is one key to success.",
        prompt: "steady",
        before: "You should ",
        after: " instead of cramming in order to be successful.",
        answers: ["work steadily"],
        display: "work steadily",
      },
      {
        id: 4,
        source:
          "Rather than just reading your notes, you are more likely to remember information if you can connect it together logically.",
        prompt: "likely",
        before: "The ",
        after:
          " remembering information will increase if you connect information together, instead of just rereading notes.",
        answers: ["likelihood of"],
        display: "likelihood of",
      },
      {
        id: 5,
        source:
          "Sleep is an essential part of studying effectively as it keeps your brain alert during the day.",
        prompt: "concentrate",
        before: "In order to study effectively, keep your ",
        after: " ensuring you get enough sleep.",
        answers: ["concentration by"],
        display: "concentration by",
      },
    ],
  },
  step4b: {
    instruction: "Discuss the question.",
    questions: [
      "Do you agree with the advice given in Exercise 4a? Why / Why not?",
    ],
  },
};

export function normLang(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/\s+/g, " ");
}

export function checkLangAnswer(input: string, answers: string[]): boolean {
  const n = normLang(input);
  if (!n) return false;
  return answers.some((a) => normLang(a) === n);
}
