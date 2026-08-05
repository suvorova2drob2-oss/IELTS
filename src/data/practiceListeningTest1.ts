import leadInImg from "../assets/practice-listening-leadin-waiter.png";

/** Practice Listening Test 1 — restaurant jobs (exact book wording + teacher keys). */

export const AUDIO_1_1 =
  "https://storage.yandexcloud.net/cpeaudio/IELTS/TestPracLesson_Track%2001_01.mp3";
export const AUDIO_1_2 =
  "https://storage.yandexcloud.net/cpeaudio/IELTS/TestPracLesson_Track%2001_02.mp3";

export const practiceListeningTest1 = {
  id: "practice-listening-1",
  title: "Practice Test 1",
  subtitle: "Restaurant & café jobs · Table completion + Short answers",
  leadIn: {
    title: "Lead-in",
    image: leadInImg,
    imageAlt: "Waiter carrying plates of food",
    discussInstruction: "1 Work in pairs and discuss the questions.",
    discussQuestions: [
      "What different jobs do you know in a restaurant or café?",
      "What do people do in these jobs? Think of the responsibilities, tasks and skills for each job.",
    ],
    adsInstruction: "2 Complete the adverts (1–5) with the words in the box.",
    wordBox: [
      "barista",
      "chef",
      "kitchen assistant",
      "manager",
      "waiter/waitress",
    ],
    adverts: [
      {
        id: 1,
        before: "Wanted: ",
        after:
          " to work in the kitchen. Responsibilities include washing dishes, cleaning preparation surfaces and unloading deliveries; should be diligent and able to work as part of a team.",
        key: "kitchen assistant",
      },
      {
        id: 2,
        before: "Wanted: ",
        after:
          " to work on the restaurant floor. Responsibilities include serving customers, taking orders, explaining items on the menu and cleaning tables; should be polite, friendly and hard-working.",
        key: "waiter/waitress",
      },
      {
        id: 3,
        before: "Wanted: ",
        after:
          " to work in the kitchen. Responsibilities include preparing and cooking dishes as well as making sure all necessary stocks and supplies are available; should be able to work under stress and as part of a team.",
        key: "chef",
      },
      {
        id: 4,
        before: "Wanted: ",
        after:
          " to work behind a counter. Responsibilities include preparing high-quality coffee as well as serving customers drinks and pre-prepared light snacks; should be able to operate a complex coffee machine.",
        key: "barista",
      },
      {
        id: 5,
        before: "Wanted: ",
        after:
          " Responsibilities include organising staff as well as ensuring the smooth running of the overall operation; should be organised, able to work under stress and deal with problems effectively.",
        key: "manager",
      },
    ],
  },
  advice: {
    title: "Test training: Task advice",
    instruction:
      "3 Look at Activity 4 and the advice below (1–8). Complete the table with the correct numbers.",
    tips: [
      "Check the number of words you have used.",
      "Check the question to see the number of words required and what part of speech is necessary for each answer.",
      "Check your spelling and grammar.",
      "Don’t panic if you miss an answer. Just move to the next question.",
      "If you missed an answer, have an informed guess, e.g. what part of speech is the missing word or phrase?",
      "Note down your answer quickly and don’t worry about spelling yet.",
      "Pay attention to signposting language to help you know when the next answer is coming.",
      "Read the instructions.",
    ],
    columns: [
      { id: "before", label: "Before listening", keys: [2, 8] },
      { id: "during", label: "During listening", keys: [4, 5, 6, 7] },
      { id: "after", label: "After listening", keys: [1, 3] },
    ],
  },
  tableTask: {
    title: "Test practice: Table completion",
    instruction: "4 Listen to the recording and complete the table.",
    audioLabel: "1.1",
    audioUrl: AUDIO_1_1,
    taskHeader:
      "Questions 1–5\nComplete the table below.\nWrite NO MORE THAN TWO WORDS for each answer.",
    blanks: [
      {
        id: 1,
        key: "Carousel",
        accept: ["Carousel", "carousel"],
      },
      {
        id: 2,
        key: "clear tables",
        accept: ["clear tables", "clearing tables"],
      },
      {
        id: 3,
        key: "waiting staff",
        accept: ["waiting staff", "waiter", "waitress", "waiter/waitress"],
      },
      {
        id: 4,
        key: "Millerby's",
        accept: ["Millerby's", "Millerbys", "millerby's", "millerbys"],
      },
      {
        id: 5,
        key: "bake cakes",
        accept: ["bake cakes", "baking cakes"],
      },
    ],
    script: [
      {
        speaker: "Narrator",
        text: "You will hear a student called Wei Liu, talking to a restaurant manager about a part-time job. First you have some time to look at questions one to five.",
      },
      {
        speaker: "Manager",
        text: "Hello, Jobs 4 You, how can I help you?",
      },
      {
        speaker: "Wei Liu",
        text: "Yes, I’m looking for some part-time work. Something in a restaurant, maybe.",
      },
      {
        speaker: "Manager",
        text: "Are you a student?",
      },
      {
        speaker: "Wei Liu",
        text: "Yes, I’m in my second year at college so I’m only available in the evenings and at weekends at the moment.",
      },
      {
        speaker: "Manager",
        text: "OK, let’s have a look at what we’ve got. Right, well, there’s a position as a kitchen assistant available. It’s at the Carousel Café down on Swann Street.",
      },
      {
        speaker: "Wei Liu",
        text: "Sorry, could you spell the name?",
      },
      {
        speaker: "Manager",
        text: "Yes, it’s C-A-R-O-U-S-E-L.",
      },
      {
        speaker: "Wei Liu",
        text: "Thanks. So, when would I have to work?",
      },
      {
        speaker: "Manager",
        text: "Well, it says here that they need staff for Saturday and Sunday, so that would be OK for you, wouldn’t it?",
      },
      {
        speaker: "Wei Liu",
        text: "Yes, it would. I guess the job involves washing the dishes.",
      },
      {
        speaker: "Manager",
        text: "That’s right. It says here they have a dishwasher though, so you’d load the dishes and take them out. Oh, but before you do that, you first have to clear the tables in the café and take the dishes into the kitchen for washing.",
      },
      {
        speaker: "Wei Liu",
        text: "Fine. Is there anything else?",
      },
      {
        speaker: "Manager",
        text: "Bellamy’s Restaurant is looking for waiting staff. That’s not for the weekends though, that would be two evenings a week – Thursday and Friday. You do the things normally associated with that kind of job – taking orders and serving the food. There are also some cleaning duties too.",
      },
      {
        speaker: "Wei Liu",
        text: "That sounds reasonable.",
      },
      {
        speaker: "Manager",
        text: "The final job we’ve got that might suit you is for a barista.",
      },
      { speaker: "Wei Liu", text: "A what?" },
      {
        speaker: "Manager",
        text: "A barista, you know someone who serves coffee. This job is at a department store all day on a Saturday.",
      },
      { speaker: "Wei Liu", text: "Oh, in Tanner’s?" },
      {
        speaker: "Manager",
        text: "No, well, yes. Tanner’s has a new owner and so the name recently changed to Millerby’s. It’s spelt M-I-double L-E-R-B-Y-apostrophe-S.",
      },
      {
        speaker: "Wei Liu",
        text: "Great, thanks. What would I have to do there?",
      },
      {
        speaker: "Manager",
        text: "You’d need to make and serve hot drinks. They also sell cakes there so you’d need to bake them first thing in the morning. They’re pre-prepared so you wouldn’t need to be an expert – just put them into the oven.",
      },
    ],
  },
  predict: {
    title: "Test training: Predicting content",
    instruction:
      "5 Look at the advice for completing short answer questions. Decide if it is True (T) or False (F). Correct the false information.",
    items: [
      {
        id: 1,
        statement:
          "The words you need will be in the listening. You will not need to change them.",
        key: "T" as const,
      },
      {
        id: 2,
        statement: "You must write full sentences.",
        key: "F" as const,
        correction: "You must write short answers.",
      },
      {
        id: 3,
        statement: "Don’t worry about the number of words you use in your answer.",
        key: "F" as const,
        correction: "You must check the word limit carefully.",
      },
      {
        id: 4,
        statement: "You may be asked your opinion.",
        key: "F" as const,
        correction: "You will only be tested on facts.",
      },
      {
        id: 5,
        statement: "Spelling is important in the answers.",
        key: "T" as const,
      },
    ],
  },
  shortTask: {
    title: "Test practice: Short answer questions",
    instruction: "6 Listen to the recording again and answer Questions 6–10.",
    audioLabel: "1.2",
    audioUrl: AUDIO_1_2,
    taskHeader:
      "Questions 6–10\nAnswer the questions below.\nWrite NO MORE THAN THREE WORDS AND/OR NUMBERS for each answer.",
    questions: [
      {
        id: 6,
        prompt: "What kind of job is Wei Liu looking for?",
        key: "part-time work",
        accept: ["part-time work", "part time work", "a part-time job"],
      },
      {
        id: 7,
        prompt: "What is his profession at the moment?",
        key: "a student",
        accept: ["a student", "student", "college student"],
      },
      {
        id: 8,
        prompt: "According to the woman a barista is someone who does what?",
        key: "serves coffee",
        accept: ["serves coffee", "serve coffee", "makes coffee"],
      },
      {
        id: 9,
        prompt: "Apart from the name, what else is new at Tanner’s?",
        key: "the owner",
        accept: ["the owner", "owner", "a new owner", "new owner"],
      },
      {
        id: 10,
        prompt:
          "Why don’t you need to be an expert to bake the cakes at Tanner’s?",
        key: "they are pre-prepared",
        accept: [
          "they are pre-prepared",
          "they're pre-prepared",
          "pre-prepared",
          "preprepared",
          "they are pre prepared",
        ],
      },
    ],
    /** Same dialogue as 1.1 — Q6–10 are answered from this conversation (listen again). */
    scriptLabel: "Audio script 1.1 / 1.2",
  },
  followUp: {
    title: "Follow-up",
    instruction: "7 Work in pairs. Do the role-play.",
    studentA:
      "You are a student. You are looking for a part-time job working in a restaurant. You want to know what jobs are available and what you would have to do in each job. You only want to work two or three evenings a week or at the weekend but you could be flexible.",
    studentB:
      "You own a restaurant. You are looking for a kitchen assistant and a waiter/waitress. Use the adverts from Activity 2 to help you. You need to know when someone is able to work and would prefer someone who will work in the evenings and at the weekend.",
    speakSec: 180,
  },
};

export type PracticeListeningTest1 = typeof practiceListeningTest1;
