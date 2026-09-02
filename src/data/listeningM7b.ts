export const LISTEN_M7B_STEPS = [
  "1 Before listen",
  "2a–2c Pos/Neg",
  "3 Exam MC + form",
  "4 Analysis",
  "5 Discussion",
] as const;

export const LISTEN_M7B_NEXT = [
  "2a–2c Pos/Neg →",
  "3 Exam →",
  "4 Analysis →",
  "5 Discussion →",
  "← К модулю",
] as const;

export const listeningM7b = {
  id: "listening-m7b-flow",
  bookPages: "p. 111 in your coursebook",
  sectionTitle: "Listening · Section 1",
  noAudioNote:
    "Аудио пока нет — задания можно пройти по ключам Teacher's Book.",
  before: {
    badge: "1",
    heading: "Before you listen",
    instruction:
      "What types of problems do people experience when travelling to other countries?",
    tip: "People experience a variety of problems such as delays and cancellations, lost property, sickness and bad weather.",
  },
  posNeg: {
    badge: "2a",
    instruction: "Listen and tick the sentence you hear. (Keys from TB.)",
    items: [
      {
        id: 1,
        a: "Travelling by plane hasn't got much better since the early flights of the 1950s.",
        b: "Travelling by plane has got much better since the early flights of the 1950s.",
        key: "A",
      },
      {
        id: 2,
        a: "Cruise ships are the best way to travel if you want to mix with like-minded passengers.",
        b: "Cruise ships aren't the best way to travel if you want to mix with like-minded passengers.",
        key: "A",
      },
    ],
    partB: {
      badge: "b",
      instruction:
        "Read the questions below and change the answers (A–C) into the opposite form (negative to positive or positive to negative).",
      tip: "1 A the driver was polite · B the doors worked · C the bus did not break down. 2 A did not feel relieved · B were not tired · C did not complain.",
    },
    partC: {
      badge: "c",
      instruction: "Listen and answer the questions in Exercise 2b. (Keys: 1 A, 2 A.)",
      items: [
        {
          id: 1,
          text: "What happened on the bus journey?",
          options: [
            { id: "A", text: "the driver was not polite" },
            { id: "B", text: "the doors did not work" },
            { id: "C", text: "the bus broke down" },
          ],
          key: "A",
        },
        {
          id: 2,
          text: "At the end of the bus journey the passengers",
          options: [
            { id: "A", text: "felt relieved." },
            { id: "B", text: "were tired." },
            { id: "C", text: "complained." },
          ],
          key: "A",
        },
      ],
    },
  },
  exam: {
    badge: "3",
    strategies: "TEST STRATEGIES page 168",
    audioNote: "Track 7.7 — audio later",
    instruction: "Complete the test tasks.",
    mc: [
      {
        id: 1,
        text: "What does Silvia want the train company to do?",
        options: [
          {
            id: "A",
            text: "to tell her why the tickets have increased in price",
          },
          {
            id: "B",
            text: "to officially record her complaint about the train service",
          },
          {
            id: "C",
            text: "to grant her some form of compensation",
          },
        ],
        key: "C",
      },
      {
        id: 2,
        text: "What time was the train supposed to arrive?",
        options: [
          { id: "A", text: "8.15" },
          { id: "B", text: "8.50" },
          { id: "C", text: "9.15" },
        ],
        key: "A",
      },
      {
        id: 3,
        text: "What made Silvia's journey worse?",
        options: [
          { id: "A", text: "the ticket was so expensive" },
          { id: "B", text: "there were too many people on the train" },
          { id: "C", text: "it was over an hour late" },
        ],
        key: "B",
      },
      {
        id: 4,
        text: "How does Silvia think the train company could improve its service?",
        options: [
          { id: "A", text: "by increasing the number of employees" },
          { id: "B", text: "by reducing the number of passengers" },
          {
            id: "C",
            text: "by having larger carriages with more capacity",
          },
        ],
        key: "A",
      },
    ],
    formTitle: "Customer complaint form",
    gaps: [
      { id: 5, label: "Name: Silvia", answers: ["Cannings"] },
      {
        id: 6,
        label: "Mobile number: 07865",
        answers: ["322 475", "322475"],
      },
      {
        id: 7,
        label: "Journey details: service London to",
        answers: ["Manchester"],
      },
      {
        id: 8,
        label: "Date",
        answers: ["13th March", "13 March", "13th March"],
      },
      {
        id: 9,
        label: "Refund by",
        answers: ["bank transfer"],
      },
      {
        id: 10,
        label: "Ticket price: €",
        answers: ["87.95"],
      },
    ],
  },
  analysis: {
    badge: "4",
    instruction:
      "What do you need to focus on for Section 1 of the IELTS Listening paper? How are you going to improve your performance in this area?",
    tip: "Focus on accuracy, spelling, be prepared for distraction and speaker correction.",
  },
  discussion: {
    badge: "5",
    instruction: "Discuss the questions.",
    questions: [
      "Why do you think some people find travelling so stressful?",
      "How could transportation companies improve the experience for their passengers?",
      "Do you think travelling will be less stressful in the future when it is more automated? Why / Why not?",
    ],
    suggestedTitle: "Suggested answer",
    suggestedAnswer: [
      "Travelling can be stressful because of delays, overcrowding and uncertainty — you never know whether your train or flight will leave on time. Packing, navigating unfamiliar places and language barriers add to the pressure.",
      "Companies could improve things by giving clearer real-time information, offering more comfortable waiting areas and training staff to handle complaints calmly. Simple gestures like free Wi‑Fi or water during long delays make a difference.",
      "Automation may reduce some stress — self-check-in and smart ticketing can speed things up — but I don't think it will remove stress entirely. When technology fails, passengers still need helpful human support.",
    ],
  },
};
