export const PRACTICE_SPEAK_T1_STEPS = [
  "P1 · Test facts",
  "P1 · Grammar focus",
  "P2 · Stages order",
  "P2 · Good / bad advice",
  "P3 · What Part 3 needs",
  "P3 · Extend answers",
  "Timed practice",
] as const;

export const PRACTICE_SPEAK_T1_NEXT = [
  "P1 Grammar →",
  "P2 Stages →",
  "P2 Advice →",
  "P3 Needs →",
  "P3 Extend →",
  "Practice →",
  "Finish →",
] as const;

export const practiceSpeakingTest1 = {
  id: "practice-speaking-1",
  title: "Expert speaking · Test 1",
  bookPages: "Test strategies · Expert speaking",
  part1: {
    facts: {
      badge: "Part 1 · 1a",
      instruction:
        "Are these statements about the IELTS Speaking test True or False?",
      items: [
        {
          id: 1,
          text: "The Speaking test lasts about 20–25 minutes in total.",
          key: "False",
          tip: "False. The Speaking test lasts 11–14 minutes in total.",
        },
        {
          id: 2,
          text: "Part 1 asks familiar, personal questions (e.g. home, work, studies, interests).",
          key: "True",
          tip: "True.",
        },
        {
          id: 3,
          text: "You should try to give full answers, not just ‘yes’ or ‘no’.",
          key: "True",
          tip: "True.",
        },
        {
          id: 4,
          text: "Part 1 is a long monologue on a topic card that you speak about for two minutes.",
          key: "False",
          tip: "False. The two-minute monologue on a topic card is Part 2, not Part 1.",
        },
        {
          id: 5,
          text: "You are marked on fluency, vocabulary, grammar and pronunciation.",
          key: "True",
          tip: "True.",
        },
      ],
    },
    sampleAnswers: {
      badge: "Part 1 · 3b",
      heading: "Sample short answers (candidate)",
      instruction:
        "Look at typical short answers a candidate gave. Discuss how you could extend each one.",
      answers: [
        "Learn more about academic English.",
        "Because they can help us/students to understand things which are too difficult to understand alone.",
        "It helps him improve the way he thinks.",
        "He likes his lyrics.",
        "It frees us from ourselves and we can think of other things.",
      ],
      examinerTip:
        "Positive: full answers, some good use of grammar and vocabulary, quite fluent. Negative: not very accurate grammar/vocab, some responses are not entirely clear.",
    },
    grammar: {
      badge: "Part 1 · 4c",
      instruction:
        "Match each Part 1 topic area (1–7) with useful grammar / language (A–G).",
      bank: [
        { id: "A", text: "Past simple / Present perfect / Time expressions" },
        { id: "B", text: "Linking expressions / Expressions of preference" },
        { id: "C", text: "Comparatives / Superlatives / Adjectives" },
        {
          id: "D",
          text: "Linking expressions / Giving reasons / Modals (need to / could) / Future forms",
        },
        { id: "E", text: "Expressions of preference / Comparatives" },
        { id: "F", text: "Giving reasons / Linking expressions" },
        { id: "G", text: "Present perfect / Past simple" },
      ],
      items: [
        { id: 1, text: "Talking about past experiences and recent changes", key: "A" },
        { id: 2, text: "Saying what you like or prefer", key: "B" },
        { id: 3, text: "Comparing places, people or activities", key: "C" },
        { id: 4, text: "Talking about future plans and what you need to do", key: "D" },
        { id: 5, text: "Choosing between options and ranking preferences", key: "E" },
        { id: 6, text: "Explaining why something matters to you", key: "F" },
        { id: 7, text: "Describing life so far and past habits", key: "G" },
      ],
    },
  },
  part2: {
    stages: {
      badge: "Part 2 · 1a",
      instruction:
        "Put the Part 2 stages in the correct order. Click chips in order (first → last).",
      bank: [
        { id: "A", text: "A · Speak for up to two minutes using your notes" },
        { id: "B", text: "B · The examiner gives you a topic card" },
        { id: "C", text: "C · The examiner may ask one or two follow-up questions" },
        { id: "D", text: "D · You have one minute to prepare and make notes" },
        { id: "E", text: "E · You read the topic and the bullet points carefully" },
      ],
      order: ["B", "E", "D", "A", "C"],
    },
    advice: {
      badge: "Part 2 · 1b",
      instruction:
        "Decide if each piece of advice is Good (G) or Bad (B). Bad advice has a correction tip.",
      items: [
        {
          id: 1,
          text: "Use the one-minute preparation time to note key words for each bullet point.",
          key: "G",
        },
        {
          id: 2,
          text: "Start speaking immediately without reading the card.",
          key: "B",
          tip: "Bad — read the card carefully first so you know what the topic is and what aspects the points cover.",
        },
        {
          id: 3,
          text: "Write full sentences all over the topic card.",
          key: "B",
          tip: "Bad — the examiner will instruct you not to write on the card.",
        },
        {
          id: 4,
          text: "There are usually three points on the card that you must cover.",
          key: "B",
          tip: "Bad — there are four points, not three.",
        },
        {
          id: 5,
          text: "You should write everything you plan to say in full during preparation.",
          key: "B",
          tip: "Bad — you will not have time to write everything, so only make notes to guide you.",
        },
        {
          id: 6,
          text: "Try to keep speaking until the examiner stops you.",
          key: "G",
        },
        {
          id: 7,
          text: "Organise your talk so each bullet is covered with a little detail.",
          key: "G",
        },
        {
          id: 8,
          text: "Treat Part 2 like a conversation and keep asking the examiner questions.",
          key: "B",
          tip: "Bad — Part 2 is a monologue, not a conversation.",
        },
        {
          id: 9,
          text: "Use linking words to move from one bullet point to the next.",
          key: "G",
        },
      ],
    },
    notesTip: {
      badge: "Part 2 · 2b",
      heading: "Example notes (memory of a trip)",
      instruction:
        "Strong notes are short phrases under each prompt heading — not full essays.",
      grid: [
        { label: "A · what the memory is", example: "Going to Sicily to see his relatives" },
        { label: "B · when it happened", example: "6 years old" },
        { label: "C · who was involved", example: "Father and family" },
        { label: "D · why it was significant", example: "remembered his roots" },
      ],
      examinerTips: [
        "It needed more structure and discourse markers.",
        "He needed more information to help him give a fuller and more extended answer.",
        "His answer was relevant to the prompt.",
      ],
    },
  },
  part3: {
    needs: {
      badge: "Part 3 · 1a",
      instruction:
        "Part 3 develops the Part 2 theme into more abstract discussion. Which two skills do you especially need in Part 3?",
      options: [
        { id: "1", text: "Only yes/no answers about your daily routine" },
        { id: "2", text: "Reading a long passage aloud" },
        { id: "3", text: "Discussing issues and giving opinions with reasons" },
        { id: "4", text: "Comparing ideas, evaluating and justifying views" },
      ],
      keys: ["3", "4"],
      tip: "In Part 3, you need to do 3 and 4.",
    },
    views: {
      badge: "Part 3 · 2b",
      instruction:
        "Match the paraphrased views (1–4) used in a sample Part 3 discussion.",
      bank: [
        {
          id: "A",
          text: "People tend to remember happy events and forget unhappy ones.",
        },
        {
          id: "B",
          text: "History has a tendency to occur again in the same kind of way.",
        },
        {
          id: "C",
          text: "Social media has made the concept of memory less important.",
        },
        { id: "D", text: "The renaissance was unique." },
      ],
      items: [
        { id: 1, text: "We mainly keep positive memories.", key: "A" },
        { id: 2, text: "The past repeats itself in similar patterns.", key: "B" },
        { id: 3, text: "Online recording changes how memory works.", key: "C" },
        { id: 4, text: "One historical period was one of a kind.", key: "D" },
      ],
      assessTip:
        "Strong Part 3 performance often includes: answering directly; using a range of expressions; fluent responses with little hesitation; intelligibility.",
    },
    extend: {
      badge: "Part 3 · 3a",
      instruction:
        "Match each technique for extending a Part 3 answer (1–3) with the description (A–C).",
      bank: [
        { id: "A", text: "Give a reason or explanation after your main point" },
        { id: "B", text: "Add an example or personal/general illustration" },
        { id: "C", text: "Compare alternatives or acknowledge another view" },
      ],
      items: [
        { id: 1, text: "Technique that softens or balances an opinion", key: "C" },
        { id: 2, text: "Technique that answers ‘why?’", key: "A" },
        { id: 3, text: "Technique that makes an abstract idea concrete", key: "B" },
      ],
    },
  },
  practice: {
    badge: "Timed practice",
    instruction:
      "Practise aloud (record yourself if you can). Use the prompts below — aim for full Part 1 answers, a 2-minute Part 2 talk, then Part 3 discussion.",
    part1Prompts: [
      "Do you prefer studying alone or with other people? Why?",
      "What kinds of music do you enjoy, and how do they make you feel?",
      "Have your free-time activities changed since you were a child?",
    ],
    part2Card: {
      title: "Describe a memorable journey you have taken.",
      bullets: [
        "where you went",
        "when you went there",
        "who you were with",
        "and explain why this journey was memorable for you",
      ],
    },
    part3Prompts: [
      "In your opinion, is it important to remember past world events?",
      "Why do you think people like to talk about their memories?",
      "Do you think it’s a good thing that many memories today are permanently recorded on social media?",
      "Are there any important historical events that are remembered in your country?",
    ],
  },
};

export type PracticeSpeakingTest1 = typeof practiceSpeakingTest1;
