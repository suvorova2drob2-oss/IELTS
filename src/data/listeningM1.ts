import modernLib from "../assets/lead-in-m1-library-modern.png";
import mobileLib from "../assets/lead-in-m1-library-mobile.png";

export const LEARN_STEPS_L1 = [
  "Before you listen",
  "3a Listening focus",
  "3b Paraphrase",
  "3c Check script",
  "3d Strategy",
  "4a Question focus",
  "4b Synonyms",
  "Listen · Choose TWO",
  "Discussion",
] as const;

export const LEARN_STEP_NEXT_L1: Record<number, string> = {
  0: "Continue → 3a",
  1: "Continue → 3b",
  2: "Continue → 3c",
  3: "Continue → 3d",
  4: "Continue → 4a",
  5: "Continue → 4b",
  6: "Continue → Listen",
  7: "Continue → Discussion",
  8: "← К модулю",
};

export type L1McOption = {
  id: "A" | "B" | "C";
  text: string;
  paraphrases: string[];
};

export type L1ListOption = {
  id: "A" | "B" | "C" | "D" | "E";
  text: string;
  paraphrases: string[];
};

const AUDIO_01_04 =
  "https://storage.yandexcloud.net/cpeaudio/IELTS/unit%201/Expert%20IELTS_Cbk_7_5%20Track%2001_04.mp3";

export const listeningM1 = {
  id: "listening-m1-flow",
  module: 1,
  bookPages: "p. 12 in your coursebook",
  sectionTitle: "Listening · Section 2",
  beforeYouListen: {
    instruction: "Look at the pictures of libraries.",
    photos: [
      {
        id: "modern",
        src: modernLib,
        label: "Modern library building",
      },
      {
        id: "mobile",
        src: mobileLib,
        label: "Mobile library",
      },
    ],
    questions: [
      "How do they compare to libraries you have visited?",
      "Where might you find each type of library shown?",
      "What could be the advantages and disadvantages of each one?",
      "What kinds of activities do people usually do in a library? Make a list.",
    ],
  },
  step3a: {
    instruction: "Read the question and underline what you are listening for.",
    question: "What was added to the library during the holidays?",
    /** Clickable tokens; true = useful focus words */
    tokens: [
      { t: "What", key: false },
      { t: "was", key: false },
      { t: "added", key: true },
      { t: "to", key: false },
      { t: "the", key: false },
      { t: "library", key: false },
      { t: "during", key: true },
      { t: "the", key: false },
      { t: "holidays?", key: true },
    ],
    tip: "Слушайте про то, что добавили (added) и когда — during the holidays. Не отвлекайтесь на то, что просто перенесли (IT на другой этаж).",
  },
  step3b: {
    instruction:
      "Read the options. Write some alternative ways of saying options A–C.",
    options: [
      {
        id: "A",
        text: "relaxation areas",
        paraphrases: ["places to unwind", "casual seating areas"],
      },
      {
        id: "B",
        text: "study spaces",
        paraphrases: ["areas for working", "student desks"],
      },
      {
        id: "C",
        text: "new IT equipment",
        paraphrases: ["recent computer resources", "latest laptops"],
      },
    ] satisfies L1McOption[],
    tip: "В Listening правильный ответ часто говорят другими словами. Подберите paraphrases заранее — так легче услышать совпадение.",
  },
  step3c: {
    instruction:
      "Read the excerpt from the audio script. What is the answer to Exercise 3a?",
    script:
      "During the summer, some changes have been made to make the library even better for you all. We’ve always had some of the best IT services around, and now you’ll find these on the 2nd instead of the 3rd floor. We’ve also added a more informal area in front of the study spaces on the ground floor. Here you’ll be able to chat with your friends, have a coffee and take a break from your hard work.",
    options: [
      { id: "A" as const, text: "relaxation areas" },
      { id: "B" as const, text: "study spaces" },
      { id: "C" as const, text: "new IT equipment" },
    ],
    key: "A" as const,
    tip: "A · relaxation areas. Текст: We’ve also added a more informal area … chat … coffee … take a break = paraphrases of relaxation areas. IT только перенесли на другой этаж (не added). Study spaces уже были (in front of the study spaces).",
  },
  step3d: {
    instruction:
      "Look again at the audio script in Exercise 3c and answer the questions.",
    questions: [
      {
        id: 1,
        text: "Did the audio script use any of the same words as the answer options (A, B, C)?",
        answer: "Yes, B had the same words, and C reused 'IT'.",
      },
      {
        id: 2,
        text: "Were any of the options (A, B, C) expressed differently in the audio script?",
        answer:
          "A was expressed differently: 'informal area' and 'take a break'.",
      },
      {
        id: 3,
        text: "What can this tell us about answering these types of questions?",
        answer:
          "This can tell us that simple word matching for the correct answer is not likely to work. It is important to listen for synonyms and the language around them.",
      },
    ],
  },
  step4a: {
    instruction:
      "Read the question below. What other ways can you say the underlined part? Which word(s) cannot be changed?",
    questionLead: "Choose TWO services the students ",
    underlined: "need their library card for",
    questionTail: ".",
    paraphrases: [
      "require their library card to",
      "must use their card for",
      "need a membership card for",
    ],
    fixedWords: "TWO",
    tip: "Подчёркнутое можно сказать иначе (require / must use / membership card). Число TWO менять нельзя — нужно ровно два ответа.",
  },
  step4b: {
    instruction:
      "Read the options for the question. Think of some synonyms for them.",
    options: [
      {
        id: "A",
        text: "borrow books",
        paraphrases: ["take out books", "loan books"],
      },
      {
        id: "B",
        text: "use private study areas",
        paraphrases: [
          "individual study spaces",
          "quiet rooms for studying alone",
        ],
      },
      {
        id: "C",
        text: "print an essay",
        paraphrases: ["print coursework", "print an assignment"],
      },
      {
        id: "D",
        text: "access the journal archives",
        paraphrases: ["use online journals", "look at academic journals"],
      },
      {
        id: "E",
        text: "pay fines",
        paraphrases: ["settle overdue charges", "pay late fees"],
      },
    ] satisfies L1ListOption[],
    tip: "Перед прослушиванием продумайте synonyms — в аудио редко повторяют формулировку из списка.",
  },
  stepListen: {
    header: "Questions 11–12",
    instruction: "Choose TWO letters, A–E.",
    prompt: "Choose TWO services the students need their library card for.",
    options: [
      { id: "A" as const, text: "borrow books" },
      { id: "B" as const, text: "use private study areas" },
      { id: "C" as const, text: "print an essay" },
      { id: "D" as const, text: "access the journal archives" },
      { id: "E" as const, text: "pay fines" },
    ],
    keys: ["B", "D"] as const,
    audioLabel: "Track 01_04",
    audioUrl: AUDIO_01_04,
    tip: "B и D. Слушайте paraphrases: private / individual study spaces и journal archives / online journals. A, C, E — типичные distractors.",
  },
  discussion: {
    instruction: "Discuss the questions.",
    questions: [
      "How useful do you think libraries are these days?",
      "Do you think people generally prefer looking information up in books or online? Why?",
      "In what ways might the internet become a threat to libraries?",
    ],
    suggestedTitle: "Suggested answer",
    suggestedAnswer: [
      "I still think libraries are quite useful, especially for students who need a quiet place to study or can't afford to buy every textbook. Many libraries also offer free internet and community events, so they remain relevant.",
      "Most people probably prefer looking things up online because it's faster and more convenient. However, books can be more reliable for in-depth research, and some learners find it easier to concentrate when reading from paper.",
      "The internet could become a threat if libraries fail to adapt — for example, if everything moves online and funding is cut. That said, libraries that combine digital access with expert staff and study spaces can coexist with the internet rather than disappear.",
    ],
  },
};
