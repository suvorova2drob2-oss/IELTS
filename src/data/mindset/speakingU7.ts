import type { MindsetFlowData } from "./flowTypes";

export const MS_U7_SPEAK_STEPS = [
  "TV opinions",
  "Self-correct",
  "Part 2",
  "Clarify / it",
  "Exam practice",
] as const;

export const MS_U7_SPEAK_NEXT = [
  "Self-correct →",
  "Part 2 →",
  "Clarify →",
  "Exam →",
  "← Back to unit",
] as const;

export const speakingU7: MindsetFlowData = {
  id: "ms-u7-speaking-flow",
  bookPages: "pp. 155–159",
  sectionTitle: "Speaking · News & media · Correcting yourself · Part 1–3",
  unitGoals: [
    "talk about TV programmes with precise opinion language",
    "self-correct and clarify naturally in the Speaking test",
    "use impersonal it passives for Part 3 media topics",
  ],
  steps: [...MS_U7_SPEAK_STEPS],
  nextLabels: [...MS_U7_SPEAK_NEXT],
  panels: [
    {
      kind: "match",
      badge: "1–2",
      instruction:
        "Check the meaning of these words and expressions for talking about TV programmes. Match each expression with Positive, Negative or Neutral.",
      tip: "Use these when you tell a partner your opinion about programmes you watch.",
      bank: [
        { id: "Positive", text: "Positive" },
        { id: "Negative", text: "Negative" },
        { id: "Neutral", text: "Neutral" },
      ],
      bankReuse: true,
      items: [
        { id: "1", stem: "gripping →", key: "Positive" },
        { id: "2", stem: "inspirational →", key: "Positive" },
        { id: "3", stem: "intriguing →", key: "Positive" },
        { id: "4", stem: "absolutely hilarious →", key: "Positive" },
        { id: "5", stem: "a definite 5-star rating →", key: "Positive" },
        { id: "6", stem: "compulsive viewing →", key: "Positive" },
        { id: "7", stem: "I watched it in one sitting. →", key: "Positive" },
        { id: "8", stem: "It has/had me on the edge of my seat. →", key: "Positive" },
        { id: "9", stem: "I was glued to the screen. →", key: "Positive" },
        { id: "10", stem: "pointless →", key: "Negative" },
        { id: "11", stem: "utter garbage →", key: "Negative" },
        { id: "12", stem: "a complete waste of time →", key: "Negative" },
        { id: "13", stem: "It's not my cup of tea. →", key: "Negative" },
        { id: "14", stem: "I can take it or leave it. →", key: "Neutral" },
        { id: "15", stem: "It gave me food for thought. →", key: "Neutral" },
        { id: "16", stem: "It was nothing to write home about. →", key: "Neutral" },
      ],
    },
    {
      kind: "gaps",
      badge: "5",
      instruction:
        "Identify the grammar or vocabulary mistakes and correct them using an appropriate expression from the bank. Try to use a different expression each time.",
      tip: "Some expressions suit grammar/word errors; others suit clarifying or going into more detail. Stress the corrected word when you speak.",
      bank: [
        "I mean …",
        "What I meant to say was …",
        "Let me start again.",
        "I'll rephrase that.",
        "Sorry, what I intended to say was …",
        "Let me put that another way.",
      ],
      items: [
        {
          id: "1",
          stem: "Wildlife programmes are not very interested. → ______ they're not very interesting. (Example pattern: My best TV show → I mean my favourite …)",
          key: "I mean …",
        },
        {
          id: "2",
          stem: "The presentator of the programme is very good. → ______ the presenter is very good.",
          key: "What I meant to say was …",
        },
        {
          id: "3",
          stem: "It is a show they make people beauty. → ______ It's a show which gives people makeovers.",
          key: "Let me start again.",
        },
        {
          id: "4",
          stem: "This programme shows you the inside house of a celebrity. → ______ It's a programme where you get to see inside celebrities' homes.",
          key: "I'll rephrase that.",
        },
        {
          id: "5",
          stem: "Most of people in my country watching this show. → ______ most people in my country watch this show.",
          key: "Sorry, what I intended to say was …",
        },
        {
          id: "6",
          stem: "I like shows with games and prizes. → ______ I like game shows, especially when there are big prizes.",
          key: "Let me put that another way.",
        },
      ],
    },
    {
      kind: "speak",
      badge: "Part 2",
      instruction:
        "In the Speaking test it is OK to correct yourself if you make a mistake. It is better to do so if you realise that your grammar, word choice or pronunciation was wrong. If you have not explained clearly — or if the examiner looks confused — give more information or explain in different words. Do the Part 2 task; if you make a mistake or are unclear, use correcting / clarifying expressions.",
      card:
        "Describe a TV programme you often watch.\n\nYou should say:\n• what type of programme it is\n• why you enjoy it\n• who you watch it with\nand explain how you feel about this programme.",
      tips: [
        "Useful: I mean … / or rather … / What I meant to say was … / Sorry, what I intended to say was … / I'll rephrase that. / Let me start again. / Did I say …? I meant to say … / Let me put that another way. / What I mean by that is … / Actually, …",
        "When correcting a mistake, give extra stress to the word, phrase or idea that you have corrected.",
      ],
      samples: [
        "Rashid (sample): Fear Factor — 'love to hate'; reality + competition; corrects awesome→awful, compulsory→compulsive, they has→they have, and clarifies competitors / unlock a box / both brothers.",
      ],
    },
    {
      kind: "gaps",
      badge: "7–9",
      instruction:
        "Candidates' statements are very general. Place a clarifying expression that fits, then be ready to elaborate. Also place impersonal it openings useful for Part 3 (TV, news and current affairs).",
      tip: "In Part 3, talk about what people in general feel or what is known — impersonal it passives help you sound more objective.",
      bank: [
        "Let me elaborate on that.",
        "Let me explain.",
        "To put that another way, …",
        "What I mean by this is …",
        "Let me clarify that.",
        "It has been said/reported that …",
        "It is believed/thought/widely accepted that …",
        "It has been proved that …",
        "It has been estimated that …",
        "Well, possibly, but many people still prefer reading the old-fashioned way.",
      ],
      items: [
        {
          id: "c0",
          stem: "I would say that TV is in part to blame for violence in society. → ______ There is a tendency for TV to glamorise violence …",
          key: "Let me elaborate on that.",
        },
        {
          id: "c1",
          stem: "I think TV is a very positive thing. → ______ Children can improve their imaginations and learn a lot from watching TV.",
          key: "Let me explain.",
        },
        {
          id: "c2",
          stem: "Children should be allowed to watch TV online unsupervised. → ______ I don't think it's very practical to expect parents to supervise their children all the time they are online.",
          key: "To put that another way, …",
        },
        {
          id: "c3",
          stem: "Watching TV online is far superior to watching conventional TV. → ______ you can choose when you're going to watch and watch anywhere you like.",
          key: "What I mean by this is …",
        },
        {
          id: "c4",
          stem: "The standard of TV programmes is so much better these days. → ______ In the past, there wasn't much to see at the weekends but nowadays we have so many channels …",
          key: "Let me clarify that.",
        },
        {
          id: "p1",
          stem: "______ children who watch a lot of TV are less sociable.",
          key: "It has been said/reported that …",
        },
        {
          id: "p2",
          stem: "______ most newspapers are biased.",
          key: "It is believed/thought/widely accepted that …",
        },
        {
          id: "p3",
          stem: "______ TV can damage your eyesight.",
          key: "It has been proved that …",
        },
        {
          id: "p4",
          stem: "______ by 2025, 80% of TV viewing will be done online.",
          key: "It has been estimated that …",
        },
        {
          id: "p5",
          stem: "A: It could be argued that continuing to print newspapers is a waste of money. B: ______",
          key: "Well, possibly, but many people still prefer reading the old-fashioned way.",
        },
      ],
    },
    {
      kind: "speak",
      badge: "EXAM",
      instruction:
        "Do this sample test with a partner. Take turns to ask and answer. Use opinion language, self-correction and impersonal it where useful.",
      prompts: [
        "Part 1 — How much time do you spend watching TV?",
        "Part 1 — What kind of programmes do you enjoy? Why?",
        "Part 1 — Are there any kinds of programmes you don't like? Why?",
        "Part 1 — Do you prefer watching TV alone or with others? Why?",
        "Part 3 — How do you think the range and type of programmes on TV has changed in recent years?",
        "Part 3 — What factors need to be considered by those who plan TV programming?",
        "Part 3 — How has new technology changed the way people watch TV?",
        "Part 3 — What potential problems are raised by online and 'on demand' TV?",
        "Part 3 — How do you think TV viewing might change in the future?",
      ],
      card:
        "Describe a TV programme you have watched which you did not enjoy.\n\nYou should say:\n• what the programme was\n• when and where you watched it\n• what others thought of it\nand explain why you didn't enjoy it.",
      tips: [
        "Correct yourself if you notice a mistake; clarify if the examiner looks confused.",
        "In Part 3, prefer general / impersonal views (It is widely accepted that …) over only personal anecdotes.",
      ],
    },
  ],
};
