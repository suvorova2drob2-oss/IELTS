export const SPEAK_M7B_STEPS = [
  "1 Lead-in",
  "2a Vocab",
  "2b–3 Questions",
  "4 Accuracy checklist",
  "5 Part 1",
  "6 Assess",
] as const;

export const SPEAK_M7B_NEXT = [
  "2a Vocab →",
  "2b–3 Questions →",
  "4 Checklist →",
  "5 Part 1 →",
  "6 Assess →",
  "← К модулю",
] as const;

export const speakingM7b = {
  id: "speaking-m7b-flow",
  bookPages: "p. 113 in your coursebook",
  sectionTitle: "Speaking · Part 1",
  leadIn: {
    badge: "1",
    instruction:
      "Look at the photo above. Would you like to travel in this way? Why / Why not? What are the most popular ways to travel in your country?",
  },
  vocab: {
    badge: "2a",
    instruction: "Complete the sentences with the words below.",
    bank: [
      "connection",
      "expedition",
      "getaway",
      "idyll",
      "road trip",
      "stopover",
      "trek",
      "voyage",
    ],
    items: [
      {
        id: 1,
        before:
          "Some people just want a complete ",
        after:
          " when they go on holiday. Away from all the hustle and bustle of life — some kind of rural ",
        answers: ["getaway"],
        gap2: { after: " — but that's not for me; I prefer going to places with plenty of life.", answers: ["idyll"] },
      },
      {
        id: 2,
        before:
          "I love flying, but I cannot bear it when I have to change planes — I always fear that I'll miss my ",
        after:
          ". This is why I prefer to have a ",
        answers: ["connection"],
        gap2: {
          after: " for a night or two near the airport.",
          answers: ["stopover"],
        },
      },
      {
        id: 3,
        before:
          "I'm quite a fan of cruise liners. I've always dreamt of going on a long ",
        after:
          " somewhere remote. Or maybe even going on an ",
        answers: ["voyage"],
        gap2: {
          after: " somewhere exotic and discover new experiences.",
          answers: ["expedition"],
        },
      },
      {
        id: 4,
        before:
          "It's such a ",
        after:
          " to work — drive, then take a train, then walk. It usually takes over two and a half hours each way! I don't appreciate that kind of travelling at all. I'm a fan of driving though: I'd love to go on a ",
        answers: ["trek"],
        gap2: {
          after: ", preferably somewhere with very little traffic!",
          answers: ["road trip"],
        },
      },
    ],
  },
  practiceQ: {
    badge: "2b–3",
    instruction:
      "Read the sentences in Exercise 2a again. Write a Part 1 question for each sentence. Then take turns to ask and answer.",
    questions: [
      "What kinds of journeys do you find stressful?",
      "What type of trip would you like to take next?",
      "Have you had any particularly exciting trips? Where?",
      "Which form of transport do you prefer using in your daily life? Why?",
    ],
    suggestedFromBank: [
      "What types of holiday do you like?",
      "What do you think about travelling by plane?",
      "What's your favourite form of transport?",
      "What's your commute like?",
    ],
  },
  checklist: {
    badge: "4b",
    instruction:
      "Think about your own speech and tick the aspects below which apply to you.",
    items: [
      "I answer questions fully and develop my answer.",
      "I can easily continue speaking for more than 10 seconds.",
      "I do not generally hesitate or pause for long amounts of time when talking about myself.",
      "If I notice I make a mistake in language or pronunciation, I correct it.",
      "I know my errors in pronunciation and try to improve them.",
      "I generally speak clearly.",
      "If I use unusual vocabulary, I make sure I know how it can be used.",
      "I do not make many grammatical mistakes.",
      "I know my errors in grammar and try to improve them.",
    ],
  },
  part1: {
    badge: "5",
    strategies: "TEST STRATEGIES page 174",
    instruction:
      "Work in pairs and take turns to ask and answer the questions. Record your answers if possible.",
    questions: [
      "How did you get here today?",
      "How do you prefer to travel?",
      "What is your favourite form of transport? Why?",
      "Would you say you are a well-travelled person? Why / Why not?",
      "Do you enjoy long-distance travel? Why / Why not?",
      "Are you planning any journeys at the moment? How will you get there?",
    ],
  },
  assess: {
    badge: "6",
    instruction:
      "Look again at the list in Exercise 4b and discuss your partner's performance. Which areas did he/she do well at and which ones need improving?",
  },
};
