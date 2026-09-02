export const LISTEN_M7A_STEPS = [
  "1 Before listen",
  "2a–2c Distractors",
  "2d–2e Practice",
  "3 Exam form",
  "4 Discussion",
] as const;

export const LISTEN_M7A_NEXT = [
  "2a–2c Distractors →",
  "2d–2e Practice →",
  "3 Exam →",
  "4 Discussion →",
  "← К модулю",
] as const;

export const listeningM7a = {
  id: "listening-m7a-flow",
  bookPages: "p. 108 in your coursebook",
  sectionTitle: "Listening · Section 1",
  noAudioNote:
    "Аудио пока нет — можно пройти подготовку и задания по ключам TB.",
  before: {
    badge: "1",
    heading: "Before you listen",
    instruction:
      "The people in the photos belong to different clubs. What are they? Why do people join clubs? What clubs have you been part of?",
    tip: "The groups are a chess group and a cookery group. People join groups or clubs to learn new skills, improve their abilities, and meet new people and socialise.",
  },
  distractors: {
    badge: "2a",
    instruction:
      "Read the question and options. Match the options (A, B and C) with the synonymous phrases (1, 2 and 3).",
    question: "What does Karen want to know about the climbing club?",
    options: [
      { id: "A", text: "if she needs protective clothing" },
      { id: "B", text: "when and where they meet" },
      { id: "C", text: "if she needs experience / whether beginners can join or not" },
    ],
    phrases: [
      { id: "1", text: "whether beginners can join or not", key: "C" },
      { id: "2", text: "what she should wear to be safe", key: "A" },
      { id: "3", text: "the location and time of the club", key: "B" },
    ],
    tip: "A→2, B→3, C→1",
    partB: {
      badge: "b–c",
      instruction:
        "Read audio script 7.3. The main reason Karen contacts the club is that she'd like to know if she can join even though she's never climbed before. Match distractor types:",
      types: [
        {
          id: "1",
          text: "Word matching: The speaker uses the same words as in the answer option.",
        },
        {
          id: "2",
          text: "Similar choices: The distractor is similar to the correct answer, but the correct answer contains an extra detail.",
        },
      ],
      tip: "B is word matching (1). A is similar choice (2).",
    },
  },
  practice: {
    badge: "2d",
    audioNote: "Track 7.3 — audio later",
    instruction: "Complete the test tasks. (Keys from TB.)",
    mc: [
      {
        id: 1,
        text: "What time do members arrive at the meeting place on Saturdays?",
        options: [
          { id: "A", text: "8.15" },
          { id: "B", text: "8.50" },
          { id: "C", text: "7.50" },
        ],
        key: "B",
      },
      {
        id: 2,
        text: "What benefits does the club offer members?",
        options: [
          { id: "A", text: "individual training with the founder" },
          { id: "B", text: "discounts on a climbing course" },
          { id: "C", text: "coaching from other members" },
        ],
        key: "B",
      },
    ],
    form: {
      id: 3,
      label: "Membership cost",
      before: "€",
      answers: ["45", "forty-five", "forty five"],
    },
    distractorTypes: {
      badge: "2e",
      instruction:
        "Match the distractors in the recording with A–C.",
      items: [
        {
          id: 1,
          text: "The speaker mentions all the options",
          key: "B",
        },
        {
          id: 2,
          text: "The dialogue includes words which sound similar such as 'fifteen' and 'fifty'",
          key: "A",
        },
        {
          id: 3,
          text: "Correcting information: The speaker revises the information they give",
          key: "C",
        },
      ],
    },
  },
  exam: {
    badge: "3",
    strategies: "TEST STRATEGIES page 168",
    audioNote: "Track 7.4 — audio later",
    instruction: "Complete the test tasks.",
    formTitle: "Customer enquiry form: City Cycling Group",
    gaps: [
      {
        id: 1,
        label: "Reason for calling",
        answers: ["become a member", "become member"],
      },
      {
        id: 2,
        label: "Address",
        after: ", London, SW23 4GJ",
        answers: ["47, Lexington Road", "47 Lexington Road"],
      },
      {
        id: 3,
        label: "Mobile",
        before: "07865 ",
        answers: ["943262"],
      },
      {
        id: 4,
        label: "Ability level",
        answers: ["experienced"],
      },
    ],
    mc: {
      id: 5,
      text: "Why does Anna think the Sunday club is not suitable for Edward?",
      options: [
        { id: "A", text: "the members are old" },
        { id: "B", text: "the routes are on flat roads" },
        { id: "C", text: "the fees are expensive" },
      ],
      key: "A",
    },
  },
  discussion: {
    badge: "4",
    instruction: "Discuss: Why do people join clubs? What clubs have you been part of?",
    questions: [
      "Why do people join clubs?",
      "What clubs have you been part of?",
    ],
    suggestedTitle: "Suggested answer",
    suggestedAnswer: [
      "People join clubs mainly to meet others who share the same interests and to feel part of a community. Clubs also give structure — regular meetings or training sessions — which can be motivating.",
      "I've been part of a photography club at university and a local running group. The photography club taught me technical skills, while running helped me stay fit and make friends outside my course.",
    ],
  },
};
