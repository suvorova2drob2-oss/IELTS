import leadInImg from "../assets/practice-listening-test4-model.png";

/** Practice Listening Test 4 — urban planning (exact book wording + teacher keys). */

export const AUDIO_4_1 =
  "https://storage.yandexcloud.net/cpeaudio/IELTS/TestPracLesson_Track%2004_01.mp3";

export const practiceListeningTest4 = {
  id: "practice-listening-4",
  title: "Practice Test 4",
  subtitle: "Urban planning · Matching + Flow chart + Summary",
  leadIn: {
    title: "Lead-in",
    image: leadInImg,
    imageAlt: "Architectural model of a modern city building",
    photoInstruction: "1 Work in pairs. Look at the photo. What do you think is happening?",
    discussInstruction: "2 Work in pairs and discuss the questions.",
    discussQuestions: [
      "If you could make changes to the area where you live, what would they be? Why?",
      "Who do you think would benefit most from the changes you are suggesting? How?",
      "Do you think anybody would be disadvantaged by the changes? Why/Why not?",
      "What is the difference between an architect and an urban planner?",
    ],
  },
  synonyms: {
    title: "Test training: Synonyms",
    matchInstruction: "3 Match the words (1–8) with the synonyms (A–H).",
    words: [
      { id: 1, word: "effect", key: "E" },
      { id: 2, word: "gather", key: "D" },
      { id: 3, word: "include", key: "F" },
      { id: 4, word: "looks nice", key: "B" },
      { id: 5, word: "process", key: "C" },
      { id: 6, word: "put into action", key: "G" },
      { id: 7, word: "residents", key: "A" },
      { id: 8, word: "trend", key: "H" },
    ],
    options: [
      { letter: "A", label: "inhabitants" },
      { letter: "B", label: "visually appealing" },
      { letter: "C", label: "procedure" },
      { letter: "D", label: "collect" },
      { letter: "E", label: "impact" },
      { letter: "F", label: "incorporate" },
      { letter: "G", label: "implement" },
      { letter: "H", label: "phenomenon" },
    ],
    fillInstruction: "4 Complete the sentences with the words in the box.",
    wordBox: [
      "collect",
      "impact",
      "incorporate",
      "inhabitants",
      "procedure",
      "visually appealing",
    ],
    sentences: [
      {
        id: 1,
        before: "You must follow company ",
        after:
          ". There are certain steps in the process which you must do.",
        key: "procedure",
      },
      {
        id: 2,
        before:
          "He is a famous architect and he believes it’s important to ",
        after: " artworks by local artists.",
        key: "collect",
      },
      {
        id: 3,
        before:
          "It’s important that people find the buildings I design beautiful. That’s why I like to design ",
        after: " buildings.",
        key: "visually appealing",
      },
      {
        id: 4,
        before:
          "The proposed new road development will have a significant ",
        after: " on the local community.",
        key: "impact",
      },
      {
        id: 5,
        before:
          "The people who live in a specific area are called the local ",
        after: ".",
        key: "inhabitants",
      },
      {
        id: 6,
        before:
          "I have tried to include all your suggestions in the proposed design but it’s difficult to ",
        after: " everyone’s ideas.",
        key: "incorporate",
      },
    ],
  },
  examTask: {
    title: "Test practice: Multiple matching, flow chart, summary completion",
    instruction: "5 Listen to the recording and complete Questions 1–10.",
    audioLabel: "4.1",
    audioUrl: AUDIO_4_1,
    multi: {
      header: "Questions 1–2",
      instruction: "Choose TWO letters, A–E.",
      prompt: "What are the TWO main concerns of an urban planner?",
      options: [
        { letter: "A", label: "appearance" },
        { letter: "B", label: "city residents" },
        { letter: "C", label: "function" },
        { letter: "D", label: "budget" },
        { letter: "E", label: "available time" },
      ],
      keys: ["A", "C"] as const,
    },
    flow: {
      header: "Questions 3–6",
      instruction:
        "Complete the flow chart below.\nWrite NO MORE THAN THREE WORDS for each answer.",
      title: "URBAN PLANNING PROCESS",
      steps: [
        {
          id: 3,
          before: "The vision is identified and ",
          after: " are selected.",
          key: "goals",
          accept: ["goals", "the goals"],
        },
        {
          id: 4,
          before:
            "Data is gathered and interpreted. The first draft of the plan is written and then ",
          after: ".",
          key: "revised",
          accept: ["revised", "is revised", "the content is revised"],
        },
        {
          id: 5,
          before: "Draft 2 is presented to ",
          after: " and draft 3 is written.",
          key: "a planning team",
          accept: ["a planning team", "planning team", "the planning team"],
        },
        {
          id: "consult",
          text: "Residents voice their opinions at a consultation meeting.",
        },
        {
          id: 6,
          before: "The final draft is written and presented to ",
          after: " at the city council.",
          key: "key decision-makers",
          accept: [
            "key decision-makers",
            "decision-makers",
            "decision makers",
            "key decision makers",
          ],
        },
      ],
    },
    summary: {
      header: "Questions 7–10",
      instruction:
        "Complete the summary below.\nWrite NO MORE THAN ONE WORD for each answer.",
      parts: [
        "Urban planning can be difficult for three key reasons. The first is that much of a town or city belongs to ",
        { gap: 7 },
        " and not local government, taking control out of their hands. The second issue is the impact of ",
        { gap: 8 },
        " planning decisions, such as roads which are too narrow for today’s cars. Finally, a planner has to ",
        { gap: 9 },
        " the needs of a future population. So, although being a planner can be ",
        { gap: 10 },
        ", it is also very challenging.",
      ],
      keys: {
        7: { key: "individuals", accept: ["individuals"] },
        8: { key: "past", accept: ["past"] },
        9: { key: "predict", accept: ["predict"] },
        10: { key: "exciting", accept: ["exciting"] },
      },
    },
    script: [
      {
        speaker: "Narrator",
        text: "You will hear a professor giving a lecture on urban planning. First, you have some time to look at questions one to ten.",
      },
      {
        speaker: "Lecturer",
        text: "If you were able to make changes to your city, what would they be? Who would benefit from them? Who would suffer? Being an urban planner isn’t an easy job. For example, you have to deal with inhabitants who disagree with your plans and fight for financial support, all of which takes time and patience. But essentially there are two key things that an urban planner does: firstly, make sure that new structures do what they’re designed to do. A new block of flats should have the facilities to provide good, comfortable and safe living accommodation for instance. The second thing is to be sure that the structures are visually appealing and fit into the local surroundings.",
      },
      {
        speaker: "Lecturer",
        text: "Well, in order to make sure this happens effectively, there’s a procedure that planners across the country generally follow and I’d like to talk you through that process. At first, they think about their vision – what exactly they want from this plan. And from this vision, they choose the goals that they want to achieve. These could be, for example, to reduce traffic on the inner city road network during rush hour or to build a new apartment block to provide more housing for an overcrowded area.",
      },
      {
        speaker: "Lecturer",
        text: "The next step is to collect data and then put together draft one of the plan. They don’t actually show the first draft to anyone at this stage. Instead, the planner reads it and the content is revised. Remember that this stage of the process can take a lot of time and requires a lot of very detailed work, but it’s better to get things right at the beginning.",
      },
      {
        speaker: "Lecturer",
        text: "So now the planner has the second draft. Unlike draft one, this draft is given to a planning team who read it and pose a lot of questions. They also make recommendations and help the planner to get the plan just right. The plan is rewritten and the third draft is produced.",
      },
      {
        speaker: "Lecturer",
        text: "The next step of the process is to get the views of local people. They’re invited to attend a consultation event where the plans are laid out. People can ask questions and give suggestions too. Or challenge the proposal if they want to. The planner then incorporates their points of view into the plan.",
      },
      {
        speaker: "Lecturer",
        text: "The last stage is for the planner to write the fourth and final draft and hand this over to the local city council where key decision-makers read it, debate it and decide whether or not it should be implemented or rejected.",
      },
      {
        speaker: "Lecturer",
        text: "Now, this all sounds fairly straightforward but, believe me, the process is not at all simple. There are many elements to planning that make it extremely challenging. One of these is the fact that a large amount of the town is not owned by local government. They own the streets and public buildings but the rest is owned by individuals. So what would you do if you needed to build a new road through the city to reduce traffic problems? How would you feel if you had to destroy fifty homes in order to do this? Planners do their best to keep everyone happy but few plans achieve this and difficult decisions have to be made.",
      },
      {
        speaker: "Lecturer",
        text: "Another issue is past planning. Urban planning isn’t a new phenomenon. Most towns have grown from small villages over the last few hundred years, with thousands of people making decisions about how they should change. All of those decisions were made at a time when needs, architecture and technology were all very different. The current planner has to live with the effects of those decisions. For example, they might have to work with streets that are too narrow for large vehicles.",
      },
      {
        speaker: "Lecturer",
        text: "A final challenge is the fact that the planner has to see into the future and predict what people will want and need twenty or more years from now. For instance, what a smart home might look like. How would you do this, if you were a planner? After all, no one can really see into the future. I’m sure planners of the 1960s had no idea just what city life would be like for people today but they had to guess.",
      },
      {
        speaker: "Lecturer",
        text: "So, to sum up, urban planning is potentially very exciting – you get to change the way people live – but you also have to make, and live with, some difficult decisions.",
      },
    ],
  },
  followUp: {
    title: "Follow-up",
    reflectionInstruction:
      "6 Work in pairs and discuss the questions.",
    reflectionQuestions: [
      "What did you find most challenging about these tasks? Reading ahead, unknown vocabulary, following the lecture, spelling or something else?",
      "What strategies or activities could you use to help you improve in the area(s) you discussed in Activity 1?",
    ],
    citiesInstruction:
      "7 How have cities changed in the last fifty years? Think of transport, buildings, parks and shopping facilities. Do you think these changes have made the city better or worse? Discuss in pairs and give reasons for your answers.",
  },
};

export type PracticeListeningTest4 = typeof practiceListeningTest4;
