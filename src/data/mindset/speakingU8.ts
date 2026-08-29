import type { MindsetFlowData } from "./flowTypes";

export const MS_U8_SPEAK_STEPS = [
  "Advice G/B",
  "Skill phrases",
  "Culture talk",
  "Luis Part 2–3",
  "Exam practice",
] as const;

export const MS_U8_SPEAK_NEXT = [
  "Phrases →",
  "Culture →",
  "Luis →",
  "Exam →",
  "← Back to unit",
] as const;

export const speakingU8: MindsetFlowData = {
  id: "ms-u8-speaking-flow",
  bookPages: "pp. 178–184",
  sectionTitle: "Speaking · Culture · Skills review · Part 1–3",
  unitGoals: [
    "judge good vs bad Speaking-test advice",
    "reuse discourse markers, opinions, buying time and clarification",
    "discuss culture, language and change in Parts 2–3",
  ],
  steps: [...MS_U8_SPEAK_STEPS],
  nextLabels: [...MS_U8_SPEAK_NEXT],
  panels: [
    {
      kind: "mc",
      badge: "1",
      instruction:
        "This advice was given to candidates before their Speaking test. Decide if you think it is good advice (G) or bad advice (B).",
      tip: "Give reasons — e.g. memorised talks rarely match the card; fluency is clarity, not speed.",
      items: [
        {
          id: "1",
          stem: "Stay up late watching English movies the night before the test so that your mind is full of English.",
          options: [
            { id: "G", text: "G — good advice" },
            { id: "B", text: "B — bad advice" },
          ],
          key: "B",
        },
        {
          id: "2",
          stem: "Try to memorise some Part 2 talks and just change the details when you get your topic.",
          options: [
            { id: "G", text: "G — good advice" },
            { id: "B", text: "B — bad advice" },
          ],
          key: "B",
        },
        {
          id: "3",
          stem: "Record yourself answering practice questions to help you identify your strengths and weaknesses when you speak.",
          options: [
            { id: "G", text: "G — good advice" },
            { id: "B", text: "B — bad advice" },
          ],
          key: "G",
        },
        {
          id: "4",
          stem: "Try to smile and maintain eye contact with the examiner during the exam.",
          options: [
            { id: "G", text: "G — good advice" },
            { id: "B", text: "B — bad advice" },
          ],
          key: "G",
        },
        {
          id: "5",
          stem: "Arrive in good time for the test so you are not risking being late.",
          options: [
            { id: "G", text: "G — good advice" },
            { id: "B", text: "B — bad advice" },
          ],
          key: "G",
        },
        {
          id: "6",
          stem: "Speak as quickly as you can so that the examiner thinks you are fluent.",
          options: [
            { id: "G", text: "G — good advice" },
            { id: "B", text: "B — bad advice" },
          ],
          key: "B",
        },
      ],
    },
    {
      kind: "match",
      badge: "3–4",
      instruction:
        "These speaking skills have been introduced in this book. Match each full phrase set with the skill it belongs to. (You can add more phrases to each category when you practise.)",
      tip: "Sample extras: Furthermore / In my view / That's right. / That's not an easy question to answer. Let me think … / Could you explain what you mean? / Sorry, I'll start again. I mean …",
      bank: [
        { id: "1", text: "1 Using discourse markers to extend answers" },
        { id: "2", text: "2 Expressing and justifying opinions" },
        { id: "3", text: "3 Agreeing and disagreeing" },
        { id: "4", text: "4 Buying time to answer questions" },
        { id: "5", text: "5 Asking for clarification" },
        { id: "6", text: "6 Correcting and clarifying yourself" },
      ],
      items: [
        {
          id: "a",
          stem: "That's a good question. / Let me see … →",
          key: "4",
        },
        {
          id: "b",
          stem: "In addition / For example / However, … →",
          key: "1",
        },
        {
          id: "c",
          stem: "To put it another way / What I mean by that is / In other words … →",
          key: "6",
        },
        {
          id: "d",
          stem: "If you ask me / Obviously / It is absolutely vital that … →",
          key: "2",
        },
        {
          id: "e",
          stem: "Definitely not! / Absolutely! / It's hard to say. →",
          key: "3",
        },
        {
          id: "f",
          stem: "What do you mean by …? / Are you asking me if …? →",
          key: "5",
        },
      ],
    },
    {
      kind: "speak",
      badge: "5",
      instruction:
        "Take turns to ask and answer with a partner. Try to use discourse markers, opinion language, buying-time phrases, clarification and self-correction. Record if possible, then give feedback on language, development and any other advice.",
      prompts: [
        "How do you think people from your country would describe themselves?",
        "Which aspects of your country's culture are most important to you?",
        "Are there any aspects of your country's culture you don't like or don't identify with?",
        "Are there any other countries' cultures or traditions that interest you?",
      ],
      tips: [
        "Feedback: Did your partner use the language from the skills match? Were answers well developed and explained?",
        "Indefinite pronouns help Part 3 generalisations: Everyone who visits my country … / I am someone who … / Cultural difference is something that …",
      ],
      samples: [
        "Everyone who visits my country loves the food. They usually say that the seafood is really fresh and delicious.",
        "Cultural difference is something that we all need to respect — understanding someone's culture can help you understand their opinions and beliefs.",
      ],
    },
    {
      kind: "speak",
      badge: "Part 2–3",
      instruction:
        "Luis's Part 2 card and Part 3 follow-ups (language and culture; culture and change). Cover every bullet; aim for a variety of structures (GRA) and less common collocations (LR).",
      card:
        "Describe a country that interests you.\n\nYou should say:\n• why it interests you\n• how you learnt about it\n• what you know about it\nand say whether you have any plans to visit this country.",
      prompts: [
        "How is language connected to culture?",
        "So, do you think when we learn a language we need to learn the culture as well?",
        "But isn't there a culture associated with the language itself?",
        "Can you give me an example of that?",
        "Do you think globalisation has changed your culture at all?",
      ],
      tips: [
        "Buying time / opinion / examples from Luis's Part 3: That's a good question. / Let me think. / in my view / Personally speaking / Obviously / Take Spanish, for example. / such as / I wouldn't say so. / to some extent / it depends / I mean / The thing is / Given this fact",
        "The examiner may add follow-up questions that respond to what you said — listen and answer those, not a memorised script.",
      ],
      samples: [
        "Luis covers neighbouring country / school visits / food (couscous, tagine) / plans for Casablanca — strong Part 2 model.",
      ],
    },
    {
      kind: "speak",
      badge: "EXAM",
      instruction:
        "Do this sample test with a partner. Take turns to ask and answer. Avoid memorised scripts; buy time and clarify when needed.",
      prompts: [
        "Part 1 — Do you live in a house or a flat?",
        "Part 1 — Is it big or small?",
        "Part 1 — What do you like most about your house/flat?",
        "Part 1 — Is there anything you would like to change about the place you live?",
        "Part 1 — What kind of clothes do you like wearing?",
        "Part 1 — What colours do you prefer to wear?",
        "Part 1 — How much time do you spend shopping for clothes?",
        "Part 1 — How important is fashion to people in your country?",
        "Part 1 — Do you enjoy dancing?",
        "Part 1 — On which occasions do people dance in your culture?",
        "Part 1 — How do you feel about watching professional dancers performing?",
        "Part 1 — Do traditional dances have an important place in your culture?",
        "Part 3 — Is getting married important in your culture?",
        "Part 3 — Have wedding ceremonies changed much in recent years?",
        "Part 3 — What do you think is the ideal age to get married? Why?",
        "Part 3 — Is it common for married couples to live with their parents or other family members?",
        "Part 3 — What are the advantages and disadvantages of living in an extended family?",
        "Part 3 — Do you think extended families will become more or less common in the future?",
      ],
      card:
        "Describe a wedding you have been to or heard about.\n\nYou should say:\n• whose wedding it was\n• what the ceremony was like\n• what clothes people wore\nand say how you felt about the wedding.\n\nFollow-up question: Do you often go to weddings?",
      tips: [
        "Fluency is clarity, not rushing — use buying-time phrases rather than saying the first thing that comes into your head.",
        "Do not keep talking if you are not answering the question.",
      ],
    },
  ],
};
