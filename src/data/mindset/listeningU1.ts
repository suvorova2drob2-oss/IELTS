export const MS_U1_LISTEN_STEPS = [
  "Lead-in · synonyms",
  "Predict gaps",
  "Form completion",
  "NOT hear / MC",
  "Conditionals",
  "Exam skills",
] as const;

export const MS_U1_LISTEN_NEXT = [
  "Predict →",
  "Form →",
  "MC →",
  "Conditionals →",
  "Exam →",
  "← Back to unit",
] as const;

export const listeningU1 = {
  id: "ms-u1-listening-flow",
  bookPages: "pp. 19–24",
  sectionTitle: "Listening · Synonyms · Form · MC",
  unitGoals: [
    "recognise paraphrases and synonyms in questions",
    "predict answers before listening",
    "complete forms and multiple-choice tasks accurately",
  ],

  leadIn: {
    badge: "LEAD-IN",
    discuss:
      "Think of a city you would like to spend some time in. Discuss with a partner which options you would prefer and why.",
    options: [
      "A visit to a museum OR a stroll through the park?",
      "A city tour OR a sports event?",
      "An evening at a restaurant OR at the theatre?",
      "A day wandering around the shops OR exploring the backstreets?",
      "Seeing the city by day OR at night?",
    ],
    badge2: "2",
    instruction:
      "Read these sentences that you might hear when deciding to go on a city tour. Look at each group of words in bold type. Decide which is NOT a synonym of the others and explain how it differs. In one sentence there are no synonyms.",
    items: [
      {
        id: "1",
        context: "As long as you ___ your tickets online at least 24 hours in advance…",
        words: ["book", "select", "reserve"],
        notSynonym: "select",
        tip: "book and reserve are synonyms; select means to choose or decide.",
      },
      {
        id: "2",
        context: "…you can get a special ___ of 10%.",
        words: ["discount", "reduction", "bargain"],
        notSynonym: "bargain",
        tip: "discount and reduction are synonyms; bargain means that you get something for a very favourable price.",
      },
      {
        id: "3",
        context:
          "Hi, my name is Lucy and I'm going to be your ___ for today's visit of the Trumpington Tower Museum.",
        words: ["curator", "presenter", "guide"],
        notSynonym: "ALL",
        tip: "There are no synonyms here; a curator is someone who organises the exhibits in a gallery or museum; a presenter is someone who introduces a television or radio show; a guide is someone whose job is to show a place to visitors or tourists.",
      },
      {
        id: "4",
        context: "Can I remind you that all ___ will need to show their tickets…",
        words: ["visitors", "explorers", "guests"],
        notSynonym: "explorers",
        tip: "visitors and guests are synonyms; explorers travel to new and unknown places. You can explore a museum, but you cannot be a museum explorer.",
      },
      {
        id: "5",
        context: "…at the ___ as soon as they come in.",
        words: ["guard room", "front desk", "main entrance"],
        notSynonym: "guard room",
        tip: "the front desk and main entrance are synonyms here; the guard room is more likely to be in a prison and not a place where you show your tickets.",
      },
      {
        id: "6",
        context:
          "When the tour finishes, you will have some free time to ___ the town centre for 30 minutes.",
        words: ["explore", "navigate", "wander around"],
        notSynonym: "navigate",
        tip: "explore and wander around are synonyms here; navigate means to direct the course of a vehicle, such as a ship.",
      },
      {
        id: "7",
        context:
          "The tour bus will ___ at 15:45 in the town square, next to the monument…",
        words: ["pick us up", "collect us", "let us on"],
        notSynonym: "let us on",
        tip: "pick us up and collect us are synonyms; let us on means allow us to board the bus.",
      },
    ],
  },

  predict: {
    tip: `Many tasks in the IELTS Listening test test your ability to recognise paraphrases or synonyms. You need to be able to understand the key ideas in a question and listen for these ideas expressed in different words in the recording. However, the answers you write will always need to be exactly as you hear them – and must also be spelt correctly.`,
    badge3: "3",
    instruction:
      "Here is a section from the Museum of London Life website. What words might you expect to read in the gaps? Think of as many possibilities as you can. Are any of them paraphrases/synonyms of each other?",
    passageParts: [
      {
        before:
          "The Museum of London Life takes you on a thrilling journey from ",
        gap: "1",
        after: " times in the city to modern-day life and beyond.",
      },
      {
        before:
          "Your trip through history begins with a look at how ",
        gap: "2",
        after:
          " humans used to live when London was just open countryside.",
      },
      {
        before:
          "This is followed by a 'walk through the ages'. In every room you are surrounded by fascinating exhibits – images, photos, maps and all kinds of ",
        gap: "3",
        after: " from years gone by.",
      },
      {
        before:
          "After you leave the here-and-now, when you have finished the ",
        gap: "4",
        after: " 'London' section,",
      },
      {
        before:
          "you will be transported into the final era – the ",
        gap: "5",
        after:
          " century, to be precise – as you look at how the city might continue to evolve in the future.",
      },
    ],
    predictHints: [
      {
        id: "1",
        hint: "adjective (the earliest, ancient, prehistoric)",
      },
      {
        id: "2",
        hint: "adjective (ancient, prehistoric, early)",
      },
      {
        id: "3",
        hint: "plural or collective noun (treasure, objects, items, scenes, displays)",
      },
      {
        id: "4",
        hint: "adjective or noun (present day, contemporary, current day)",
      },
      {
        id: "5",
        hint: "ordinal number or adjective (22nd, twenty-second, next, forthcoming)",
      },
    ],
    badge4: "4",
    instruction4:
      "Listen to a guide talking to a group of visitors to the Museum of London Life and fill the gaps in exercise 3. Write ONE WORD AND/OR A NUMBER in each gap. (Keys only — no audio in this build.)",
    bank: [
      "ancient",
      "prehistoric",
      "objects",
      "Contemporary",
      "22nd / twenty-second",
    ],
    keys: {
      "1": "ancient",
      "2": "prehistoric",
      "3": "objects",
      "4": "Contemporary",
      "5": "22nd / twenty-second",
    } as Record<string, string>,
    altKeys: {
      "5": ["22nd", "twenty-second", "22nd / twenty-second"],
    } as Record<string, string[]>,
    paraphrases: [
      "'thrilling journey from ancient times in the city to modern-day life and beyond'",
      "'how prehistoric humans used to live'",
      "'when London was just open countryside'",
      "'surrounded by fascinating exhibits – images, photos, maps and all kinds of objects from years gone by'",
      "'you will be transported into the final era – the 22nd century, to be precise'",
    ],
  },

  form: {
    tip: `Section 1 is the least difficult of the four parts of the Listening test and is often a form completion task. If you are aiming for a high score, it is important that you listen carefully from the first moment you hear somebody speak and try to get all ten marks for Section 1. After all, each question carries one mark, which is exactly the same as the later, more difficult sections.`,
    badge: "D–E",
    instruction:
      "You will hear an employee at the Museum of London Life taking a booking. Complete the form. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer. (Keys only — no audio.)",
    title: "MUSEUM OF LONDON LIFE · Booking Form",
    subtitle:
      "See how Londoners lived from Prehistoric times through to the 22nd century.",
    fields: [
      { id: "1", label: "Name:", key: "James Graeme", alts: ["James Graeme"] },
      {
        id: "2",
        label: "Address:",
        suffix: " Road, London,",
        key: "16 Mount Hill",
        alts: ["16 Mount Hill", "Mount Hill"],
      },
      {
        id: "3",
        label: "Postcode:",
        key: "E15 2TP",
        alts: ["E15 2TP", "El5 2TP", "E15 2TP"],
      },
      {
        id: "4",
        label: "Telephone:",
        key: "770 464",
        alts: ["770 464", "770464"],
      },
      {
        id: "5",
        label: "10+ people discount:",
        suffix: "%",
        key: "15",
        alts: ["15", "fifteen"],
      },
      {
        id: "6",
        label: "Students discount:",
        suffix: "%",
        key: "15",
        alts: ["15", "fifteen"],
      },
      {
        id: "7",
        label: "Students: 20% for groups of at least",
        suffix: " people",
        key: "4",
        alts: ["4", "four"],
      },
      {
        id: "8",
        label: "Price for entry:",
        key: "£4.25",
        alts: ["£4.25", "4.25", "(£)4.25"],
      },
      {
        id: "9",
        label: "Special exhibition:",
        suffix: " London",
        key: "Underground",
        alts: ["Underground"],
      },
      {
        id: "10",
        label: "Date of visit:",
        suffix: " July",
        key: "12",
        alts: ["12", "12th", "twelfth"],
      },
    ],
    bank: [
      "James Graeme",
      "16 Mount Hill",
      "E15 2TP",
      "770 464",
      "15",
      "4",
      "£4.25",
      "Underground",
      "12",
    ],
  },

  notHear: {
    badge: "8",
    instruction:
      "For each piece of information in the questions, which of the options would you NOT hear?",
    tip: "If you know the conventions for expressing information in English, you will avoid making a mistake with your answer.",
    items: [
      {
        id: "1",
        stem: "410266 (part of a telephone number)",
        options: [
          { id: "A", text: "four, one, oh [pause] two, double six" },
          { id: "B", text: "four, one, zero, two [pause] two sixes" },
          { id: "C", text: "four, one, zero, [pause] two, six, six" },
        ],
        keys: ["B"],
      },
      {
        id: "2",
        stem: "18th century (period)",
        options: [
          { id: "A", text: "eighteen century" },
          { id: "B", text: "the eighteenth century" },
          { id: "C", text: "century eighteen" },
        ],
        keys: ["A", "C"],
      },
      {
        id: "3",
        stem: "2012 (year)",
        options: [
          { id: "A", text: "two zero twelve" },
          { id: "B", text: "two thousand and twelve" },
          { id: "C", text: "twenty twelve" },
        ],
        keys: ["A"],
      },
      {
        id: "4",
        stem: "20/7/76 (date)",
        options: [
          { id: "A", text: "July the twentieth, nineteen seventy-six" },
          { id: "B", text: "twenty, seven, seventy-six" },
          { id: "C", text: "twentieth of seven of seventy-six" },
        ],
        keys: ["C"],
      },
      {
        id: "5",
        stem: "Baker-Jones (name)",
        options: [
          { id: "A", text: "B-A-K-E-R, hyphen, J-O-N-E-S" },
          { id: "B", text: "B-A-K-E-R, line, J-O-N-E-S" },
          { id: "C", text: "B-A-K-E-R, dash, J-O-N-E-S" },
        ],
        keys: ["B"],
      },
      {
        id: "6",
        stem: "£5.40 (price)",
        options: [
          { id: "A", text: "five pounds forty pence" },
          { id: "B", text: "five forty" },
          { id: "C", text: "five forty pence" },
        ],
        keys: ["C"],
      },
      {
        id: "7",
        stem: "museuminfo@history.org",
        options: [
          { id: "A", text: "museuminfo (one word) at history point org" },
          { id: "B", text: "museum info (one word) at history full stop org" },
          { id: "C", text: "museuminfo (one word) at history dot org" },
        ],
        keys: ["A", "B"],
      },
      {
        id: "8",
        stem: "09.00",
        options: [
          { id: "A", text: "nine A-M" },
          { id: "B", text: "oh-nine A-M" },
          { id: "C", text: "nine in the morning" },
        ],
        keys: ["B"],
      },
    ],
  },

  mc: {
    tip: `For multiple-choice tasks, you will normally hear all three options mentioned in the recording in some way, but only one will answer the question. The correct answer is often a paraphrase, so when you read the question stem and the possible answers, think about what can and can't be paraphrased.`,
    badge9: "9–10",
    instruction:
      "Look at the questions and the options. Choose the correct letter, A, B or C. (Keys only — no audio.)",
    items: [
      {
        id: "1",
        stem: "If James can't produce a document showing his booking, what does he have to show to collect his ticket?",
        options: [
          { id: "A", text: "his passport" },
          { id: "B", text: "his debit card" },
          { id: "C", text: "his smartphone" },
        ],
        key: "B",
      },
      {
        id: "2",
        stem: "The museum employee most appreciates the way the museum",
        options: [
          { id: "A", text: "is designed." },
          { id: "B", text: "talks about the city's inhabitants." },
          {
            id: "C",
            text: "is involved in fundraising for the local community.",
          },
        ],
        key: "B",
      },
    ],
  },

  conditionals: {
    badge: "12",
    instruction:
      "Look at the sentences. With a partner, divide each sentence into two clauses and decide which part needs to happen first for the second to be the result (i.e. which part is the condition, which is the result).",
    sentences: [
      {
        id: "1",
        text: "I'll book tickets for that as well today, provided there is something special that I'm particularly interested in.",
        conditionWord: "provided",
      },
      {
        id: "2",
        text: "You'll get your tickets fine, as long as you can produce the payment card you bought the tickets with.",
        conditionWord: "as long as",
      },
      {
        id: "3",
        text: "Once we leave the part of the exhibition called 'Contemporary London', we will move into the 22nd century.",
        conditionWord: "Once",
      },
      {
        id: "4",
        text: "Unless something dramatic happens, I should be working here for a long time.",
        conditionWord: "Unless",
      },
    ],
    badge13: "13",
    instruction13:
      "Underline each future time word or phrase in exercise 12 that indicates the condition. Which of those words or phrases could be replaced by 'if' with no change to the meaning of the sentence?",
    bank: ["provided", "as long as", "Once", "Unless"],
    keys: {
      "1": "provided",
      "2": "as long as",
      "3": "Once",
      "4": "Unless",
    } as Record<string, string>,
    replaceTip:
      "We can replace provided and as long as with if. Once could be replaced with when. Unless means 'if not', so we can change it if we change the whole cause clause: If something dramatic doesn't happen, …",
    rule: `Future time conditionals follow the same structure as the first conditional: If + present simple … / … will + bare infinitive. Note that all present tenses are possible in the If clause, although the present simple is the most commonly used. In the result clause, instead of will we can use be going to and other modal verbs such as can, should and must. We can also use an imperative in the result clause.`,
    badge15: "15",
    instruction15:
      "Imagine you are a tour guide taking tourists to a museum. Complete the statements to make sentences you might say to your tourists.",
    samples: [
      "You can get a discounted ticket as long as you show your student card.",
      "Once everybody has bought their ticket, we will go to the first exhibit room.",
      "You won't get lost provided you use the map you were given.",
      "Now everybody is free to explore the museum. You can go wherever you like as long as you return to the main entrance for 4pm.",
      "Your bus back to the hotel will depart as soon as everybody is on board.",
      "Do not touch or take photos of the exhibits unless there is a sign saying that it is allowed.",
    ],
  },

  exam: {
    badge: "EXAM SKILLS",
    instruction:
      "Listen and answer questions 1–9. (Keys only — no audio in this build.)",
    notesIntro:
      "Questions 1–6 · Complete the notes below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    fields: [
      { id: "1", label: "Name: Mr", key: "David Cottenham", alts: ["David Cottenham", "David Cotten ham"] },
      {
        id: "2",
        label: "Current address: 4 West Cottages, Humblington, Devon,",
        key: "DV12 8HA",
        alts: ["DV12 8HA"],
      },
      {
        id: "3",
        label: "Time booked:",
        note: "Date of move: 30 August · Destination: 8b Greenend Road, El9 4RR",
        key: "7.30 pm",
        alts: ["7.30 pm", "19.30", "half past seven", "7.30pm"],
      },
      {
        id: "4",
        label: "Value of insurance cover:",
        key: "£60,000",
        alts: ["£60,000", "60,000"],
      },
      {
        id: "5",
        label: "Telephone number: (07238)",
        key: "244 510",
        alts: ["244 510", "244510"],
      },
      {
        id: "6",
        label: "Website: www.",
        suffix: ".co.uk",
        key: "we-move-u",
        alts: ["we-move-u"],
      },
    ],
    bank: [
      "David Cottenham",
      "DV12 8HA",
      "7.30 pm",
      "£60,000",
      "244 510",
      "we-move-u",
    ],
    mcIntro: "Questions 7–9 · Choose the correct letter, A, B or C.",
    mc: [
      {
        id: "7",
        stem: "The removals package that the man chooses is",
        options: [
          { id: "A", text: "Premium." },
          { id: "B", text: "Silver." },
          { id: "C", text: "Economy." },
        ],
        key: "B",
      },
      {
        id: "8",
        stem: "The woman believes that the best thing about We-Move-U is that they",
        options: [
          { id: "A", text: "cost less than people expect." },
          { id: "B", text: "are very efficient." },
          { id: "C", text: "provide excellent service to their clients." },
        ],
        key: "C",
      },
      {
        id: "9",
        stem: "After the man makes a booking, there will be",
        options: [
          { id: "A", text: "no more charges." },
          { id: "B", text: "a 10% charge when the move is completed." },
          {
            id: "C",
            text: "a charge if the man changes the day of his move.",
          },
        ],
        key: "C",
      },
    ],
  },
};
