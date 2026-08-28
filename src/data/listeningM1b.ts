/** Module 1B · Untapped resources · Listening Section 2 (p. 15). */

const AUDIO_01_05 =
  "https://storage.yandexcloud.net/cpeaudio/IELTS/unit%201/Expert%20IELTS_Cbk_7_5%20Track%2001_05.mp3";

const AUDIO_01_06 =
  "https://storage.yandexcloud.net/cpeaudio/IELTS/unit%201/Expert%20IELTS_Cbk_7_5%20Track%2001_06.mp3";

export const LEARN_STEPS_L1B = [
  "Before you listen",
  "2a Alternative language",
  "2c Listen",
  "2d Script",
  "3 Alt language",
  "Test practice",
  "Discussion",
] as const;

export const LEARN_STEP_NEXT_L1B: Record<number, string> = {
  0: "Continue → 2a",
  1: "Continue → 2c",
  2: "Continue → 2d",
  3: "Continue → 3",
  4: "Continue → Test",
  5: "Continue → Discussion",
  6: "← К модулю",
};

export const listeningM1b = {
  id: "listening-m1b-flow",
  module: 1,
  bookPages: "p. 15 in your coursebook",
  sectionTitle: "Listening · Section 2",
  beforeYouListen: {
    instruction: "Read the descriptions of the apps.",
    apps: [
      {
        id: "stargazer",
        price: "£2.99",
        name: "Stargazing app",
        text: "Great for stargazers. You point your device at the sky and this educational app tells you what you are looking at. It labels the constellations, stars and satellites.",
      },
      {
        id: "wordflex",
        price: "£11.99",
        name: "Wordflex",
        text: "Wordflex is for everyone who loves words. Explore up to 2 million language nodes in this dictionary/thesaurus combination.",
      },
    ],
    /** Full coursebook item 1 (one stem — do not shorten). */
    question:
      "Which ones would you like to use? Why? How might these apps help people learn? Do you think people should pay for good learning apps? Why/Why not?",
  },
  step2a: {
    heading: "Predict alternative language",
    instruction:
      "Think of some alternative language for the question and options.",
    compareNote:
      "2b · Compare your alternative language with a partner.",
    question: "What is the speaker’s job?",
    focus: {
      id: "job",
      label: "job",
      paraphrases: ["role", "position", "employment", "works in …"],
    },
    options: [
      {
        id: "A" as const,
        text: "An educational consultant",
        paraphrases: [
          "advisor for schools",
          "helps solve problems in schools",
        ],
      },
      {
        id: "B" as const,
        text: "A teacher",
        paraphrases: [
          "provides professional guidance / educationalist",
          "works in a school / college",
        ],
      },
      {
        id: "C" as const,
        text: "A technology expert",
        paraphrases: [
          "someone with specialist IT knowledge",
          "experienced in computers",
        ],
      },
    ],
    tip: "В Listening правильный ответ часто говорят другими словами. Подберите paraphrases заранее — так легче услышать совпадение.",
  },
  step2c: {
    instruction: "Listen and answer the question.",
    audioSrc: AUDIO_01_05,
    audioLabel: "Track 01_05",
    question: "What is the speaker’s job?",
    options: [
      { id: "A" as const, text: "An educational consultant" },
      { id: "B" as const, text: "A teacher" },
      { id: "C" as const, text: "A technology expert" },
    ],
    key: "A" as const,
    tip: "A · An educational consultant. Speaker left teaching and set up a consultancy in educational app development.",
  },
  step2d: {
    instruction:
      "Read the audio script and find the section with the answer. How is the language in the question and options different?",
    before:
      "… when I was teaching and got so interested in their use that I left my job and ",
    highlight: "set up my own consultancy in educational app development",
    after:
      ". I now advise on learning objectives and work with schools and tech companies to help develop apps with real learning benefits.",
    questions: [
      {
        id: 1,
        text: "Did the audio script use any of the same words as the answer options (A, B, C)?",
        answer:
          "Not exactly. Option A uses educational consultant; the script says consultancy in educational app development and advise … schools.",
      },
      {
        id: 2,
        text: "Were any of the options (A, B, C) expressed differently in the audio script?",
        answer:
          "Yes. A is paraphrased as set up my own consultancy … / advise on learning objectives. B is a distractor: was teaching (past), then left that job. C is too narrow — tech companies appear, but the focus is education / learning benefits.",
      },
      {
        id: 3,
        text: "What can this tell us about answering these types of questions?",
        answer:
          "Do not wait for the exact option wording. Listen for synonyms and meaning — and watch for past jobs that are no longer true.",
      },
    ],
    tip: "Answer A. Highlight: set up my own consultancy in educational app development ≈ educational consultant.",
  },
  step3Alt: {
    instruction:
      "Complete the test task. Try to think of some alternative language for the questions and options.",
    groups: [
      {
        id: "1",
        stem: "The speaker thinks that free apps are",
        stemAlt: "apps which people do not pay for",
        options: [
          {
            id: "A",
            text: "worse than paid apps.",
            alt: "not as good as paid apps",
          },
          {
            id: "B",
            text: "full of advertising.",
            alt: "have lots of marketing",
          },
          {
            id: "C",
            text: "badly designed.",
            alt: "are not well conceived",
          },
        ],
      },
      {
        id: "2",
        stem: "What does the speaker think of Mathword?",
        stemAlt: "What is the speaker’s view of …",
        options: [
          {
            id: "A",
            text: "It is too expensive.",
            alt: "it is not affordable",
          },
          {
            id: "B",
            text: "It is good for children.",
            alt: "it suits young people",
          },
          {
            id: "C",
            text: "It is easy to use.",
            alt: "it is convenient",
          },
        ],
      },
      {
        id: "3-4",
        stem: "Which TWO subject areas does the speaker think are underrepresented?",
        stemAlt: "not covered enough",
        options: [
          {
            id: "A",
            text: "Foreign languages",
            alt: "Languages other than …",
          },
          { id: "B", text: "Maths", alt: "mathematics" },
          {
            id: "C",
            text: "Art and design",
            alt: "creative subjects",
          },
          {
            id: "D",
            text: "Music",
            alt: "learning to play instruments and sing",
          },
          {
            id: "E",
            text: "Literature",
            alt: "reading fictional books",
          },
        ],
      },
    ],
  },
  stepTest: {
    instruction:
      "Complete the test task. Try to think of some alternative language for the questions and options.",
    audioSrc: AUDIO_01_06,
    audioLabel: "Track 01_06",
    mc: [
      {
        id: 1,
        text: "The speaker thinks that free apps are",
        options: [
          { id: "A" as const, text: "worse than paid apps." },
          { id: "B" as const, text: "full of advertising." },
          { id: "C" as const, text: "badly designed." },
        ],
        key: "A" as const,
      },
      {
        id: 2,
        text: "What does the speaker think of Mathword?",
        options: [
          { id: "A" as const, text: "It is too expensive." },
          { id: "B" as const, text: "It is good for children." },
          { id: "C" as const, text: "It is easy to use." },
        ],
        key: "C" as const,
      },
    ],
    two: {
      prompt:
        "Which TWO subject areas does the speaker think are underrepresented?",
      options: [
        { id: "A" as const, text: "Foreign languages" },
        { id: "B" as const, text: "Maths" },
        { id: "C" as const, text: "Art and design" },
        { id: "D" as const, text: "Music" },
        { id: "E" as const, text: "Literature" },
      ],
      keys: ["C", "D"] as const,
    },
    tip: "1 A · 2 C · 3–4 C Art and design · D Music",
  },
  discussion: {
    /** Full coursebook item 5 — do not split/shorten. */
    question:
      "Do you think technology benefits education? Why/Why not? In what ways can it be positive and negative?",
  },
};

export type ListeningM1bData = typeof listeningM1b;
