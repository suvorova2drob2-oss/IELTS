export type WordClass = "noun" | "verb" | "both";
export type CollocationType = "verb-adv" | "adj-noun";
export type TrendCategory = "up" | "down" | "fluctuate";

export interface TextSegment {
  text: string;
  phraseId?: string;
  phraseType?: CollocationType;
}

export interface VocabularyM1Data {
  module: number;
  bookPages: string;
  sectionTitle: string;
  words: string[];
  wordClasses: Record<string, WordClass>;
  definitions: { id: number; text: string; word: string }[];
  chooseSentences: {
    id: number;
    before: string;
    after: string;
    optionA: string;
    optionB: string;
    correct: "a" | "b";
    hint?: string;
  }[];
  collocations: {
    instruction: string;
    wordBank: string[];
    unusedWord: string;
    gaps: {
      id: number;
      before: string;
      after: string;
      answer: string;
      hint?: string;
    }[];
  };
  appsText: {
    title: string;
    instruction3a: string;
    instruction3b: string;
    paragraphs: TextSegment[][];
    phrases: { id: string; text: string; type: CollocationType }[];
    trendItems: { id: string; phrase: string; category: TrendCategory }[];
  };
  dictionarySkills: {
    instruction: string;
    words: string[];
    tasks: string[];
  };
}

export const vocabularyM1: VocabularyM1Data = {
  module: 1,
  bookPages: "p. 10",
  sectionTitle: "The language of learning",
  words: [
    "acquire",
    "capacity",
    "focus",
    "method",
    "process",
    "reaction",
    "research",
    "retain",
  ],
  wordClasses: {
    acquire: "verb",
    capacity: "noun",
    focus: "both",
    method: "noun",
    process: "both",
    reaction: "noun",
    research: "both",
    retain: "verb",
  },
  definitions: [
    { id: 1, text: "to remember information", word: "retain" },
    { id: 2, text: "a response to something", word: "reaction" },
    { id: 3, text: "the thing that people pay attention to", word: "focus" },
    { id: 4, text: "to gain knowledge or a skill", word: "acquire" },
    { id: 5, text: "someone's ability to do something", word: "capacity" },
    {
      id: 6,
      text: "the activity of finding out information about something",
      word: "research",
    },
    { id: 7, text: "to give special attention to one thing", word: "focus" },
    {
      id: 8,
      text: "a series of actions that are done in order to achieve a result",
      word: "process",
    },
    { id: 9, text: "a planned way of doing something", word: "method" },
    { id: 10, text: "to take in and think about information", word: "process" },
    {
      id: 11,
      text: "to study something in detail, especially to discover new facts or test new ideas",
      word: "research",
    },
  ],
  chooseSentences: [
    {
      id: 1,
      before: "It is impossible to",
      after: "everything you hear in a lecture, but taking notes can help.",
      optionA: "acquire",
      optionB: "retain",
      correct: "b",
      hint: "You hear a lot in a lecture — what is hard to do with all of it?",
    },
    {
      id: 2,
      before: "Some students prefer to use visuals as a",
      after: "for learning.",
      optionA: "capacity",
      optionB: "method",
      correct: "b",
      hint: "A planned way of learning — not an ability.",
    },
    {
      id: 3,
      before: "If you want to",
      after: "effectively, you should remove all distractions.",
      optionA: "focus",
      optionB: "acquire",
      correct: "a",
      hint: "Remove distractions — give attention to one thing.",
    },
    {
      id: 4,
      before: "Controversial ideas can cause people to have widely differing",
      after: ".",
      optionA: "reactions",
      optionB: "processes",
      correct: "a",
      hint: "People respond differently to ideas.",
    },
    {
      id: 5,
      before: "Some areas of the mind are unexplained and will need further",
      after: ".",
      optionA: "research",
      optionB: "methods",
      correct: "a",
      hint: "Scientists still need to investigate and discover facts.",
    },
  ],
  collocations: {
    instruction:
      "Complete the text with the verbs below to make verb + noun collocations. There is one verb you do not need to use.",
    wordBank: [
      "achieve",
      "conducting",
      "demonstrate",
      "focused",
      "process",
      "study",
    ],
    unusedWord: "study",
    gaps: [
      {
        id: 1,
        before: "Child prodigies are young people who",
        after: "intelligence at a very early age.",
        answer: "demonstrate",
        hint: "Show or display ability — verb + intelligence",
      },
      {
        id: 2,
        before:
          "Such children probably do not have secret study methods in order to",
        after: "intellectual skill,",
        answer: "achieve",
        hint: "Gain or reach a skill — common collocation with skill",
      },
      {
        id: 3,
        before: "rather they probably have an innate ability to",
        after: "information.",
        answer: "process",
        hint: "Take in and think about data",
      },
      {
        id: 4,
        before:
          "Kim Ung-yong, considered by many to be the smartest man alive today, could read in four languages by the age of four. So, he then",
        after: "his attention on mathematics.",
        answer: "focused",
        hint: "Gave special attention — past form in the text",
      },
      {
        id: 5,
        before:
          "He gained his PhD in physics by the age of 15, and during this time also started",
        after: "research at NASA.",
        answer: "conducting",
        hint: "Carrying out research — verb + research",
      },
    ],
  },
  appsText: {
    title: "The growing popularity of apps",
    instruction3a:
      "Read the text and click the verb + adverb and adjective + noun collocations.",
    instruction3b:
      "Put the trend phrases into the correct categories: go up, go down, or move up and down.",
    paragraphs: [
      [
        {
          text: "People love to learn using their smartphones and this can often be achieved by using the many apps on the market. These apps provide a ",
        },
        { text: "wide range", phraseId: "wide-range", phraseType: "adj-noun" },
        {
          text: " of learning tools which cater for all interests and age groups.",
        },
      ],
      [
        {
          text: "Apple was the first company to release apps for download. It started with just 500 but within three months this ",
        },
        { text: "rose rapidly", phraseId: "rose-rapidly", phraseType: "verb-adv" },
        { text: " to 3,000 apps. In contrast, when Google began launching apps there was a " },
        { text: "slower increase", phraseId: "slower-increase", phraseType: "adj-noun" },
        {
          text: " in downloads. It began with a few and this ",
        },
        {
          text: "gradually increased",
          phraseId: "gradually-increased",
          phraseType: "verb-adv",
        },
        { text: " over the next few years." },
      ],
      [
        {
          text: "Now, there are thousands of apps on both operating systems. In the last few years, the number of apps has ",
        },
        {
          text: "fluctuated slightly",
          phraseId: "fluctuated-slightly",
          phraseType: "verb-adv",
        },
        {
          text: " for Google, between 500,000 and 600,000, and there has been a ",
        },
        { text: "steady increase", phraseId: "steady-increase", phraseType: "adj-noun" },
        {
          text: " to a million for Apple. Free apps tend to be downloaded the most, whereas the demand for ones which are paid for has ",
        },
        { text: "fallen sharply", phraseId: "fallen-sharply", phraseType: "verb-adv" },
        { text: " in comparison." },
      ],
      [
        {
          text: "It is likely that apps will remain a popular way for people to learn and Google and Apple will probably remain the ",
        },
        { text: "market leaders", phraseId: "market-leaders", phraseType: "adj-noun" },
        { text: ". However, " },
        { text: "newer platforms", phraseId: "newer-platforms", phraseType: "adj-noun" },
        { text: " may threaten the market in years to come." },
      ],
    ],
    phrases: [
      { id: "growing-popularity", text: "growing popularity", type: "adj-noun" },
      { id: "wide-range", text: "wide range", type: "adj-noun" },
      { id: "rose-rapidly", text: "rose rapidly", type: "verb-adv" },
      { id: "slower-increase", text: "slower increase", type: "adj-noun" },
      { id: "gradually-increased", text: "gradually increased", type: "verb-adv" },
      { id: "fluctuated-slightly", text: "fluctuated slightly", type: "verb-adv" },
      { id: "steady-increase", text: "steady increase", type: "adj-noun" },
      { id: "fallen-sharply", text: "fallen sharply", type: "verb-adv" },
      { id: "market-leaders", text: "market leaders", type: "adj-noun" },
      { id: "newer-platforms", text: "newer platforms", type: "adj-noun" },
    ],
    trendItems: [
      { id: "t1", phrase: "rose rapidly", category: "up" },
      { id: "t2", phrase: "gradually increased", category: "up" },
      { id: "t3", phrase: "steady increase", category: "up" },
      { id: "t4", phrase: "fallen sharply", category: "down" },
      { id: "t5", phrase: "fluctuated slightly", category: "fluctuate" },
    ],
  },
  dictionarySkills: {
    instruction:
      "Use your dictionary with one word from this module. Work with a partner.",
    words: [
      "acquire",
      "demonstrate",
      "process",
      "research",
      "retain",
      "collocation",
    ],
    tasks: [
      "Check the word class (noun, verb, adjective, etc.).",
      "Find at least one collocation in the dictionary entry.",
      "Read an example sentence — does it match the meaning in this module?",
      "Tell your partner one new thing you learned from the entry.",
    ],
  },
};

export const VOCAB_FLOW_STEPS = [
  "Intro",
  "1a Word types",
  "1b Match definitions",
  "1c Choose option",
  "2 Collocations",
  "3a Find collocations",
  "3b Trend categories",
  "Dictionary skills",
  "Result",
] as const;

export const VOCAB_RESULT_STEP = VOCAB_FLOW_STEPS.length - 1;

export const VOCAB_FLOW_NEXT: Record<number, string> = {
  0: "1a →",
  1: "1b →",
  2: "1c →",
  3: "Collocations →",
  4: "3a →",
  5: "3b →",
  6: "Dictionary →",
  7: "Result →",
  8: "К модулю ←",
};

export function checkWordClass(
  word: string,
  answer: WordClass | "",
  expected: Record<string, WordClass>,
): boolean {
  if (!answer) return false;
  return expected[word] === answer;
}

export function checkDefinitionMatch(word: string, expected: string): boolean {
  return word.trim().toLowerCase() === expected.toLowerCase();
}

export function checkGapWord(answer: string, expected: string): boolean {
  return answer.trim().toLowerCase() === expected.toLowerCase();
}

export const TREND_LABELS: Record<TrendCategory, string> = {
  up: "go up",
  down: "go down",
  fluctuate: "move up and down",
};
