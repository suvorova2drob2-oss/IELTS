export const READ_M4B_STEPS = [
  "1 Before you read",
  "2 Matching + summary",
  "3 Task analysis",
  "4 Discussion",
] as const;

export const READ_M4B_NEXT = [
  "2 Matching + summary →",
  "3 Task analysis →",
  "4 Discussion →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ");
}

export function checkReadM4b(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export const readingM4b = {
  id: "reading-m4b-flow",
  bookPages: "pp. 66–67 in your coursebook",
  sectionTitle: "Reading · Matching information; Summary completion",
  title: "My precious",
  subtitle:
    "Our belongings can have deep meaning, but do they make us happy? asks Michael Bond",
  beforeYouRead: {
    badge: "1",
    instruction: "Work in groups and discuss the questions.",
    questions: [
      "What are your three most precious possessions? Why do they mean so much to you?",
      "What would you say makes one person more interested in money and possessions than another?",
      "How materialistic do you think you are compared to other people?",
      "Do you prefer to spend money on possessions or on experiences such as holidays or tickets to events? Give reasons.",
    ],
  },
  passage: [
    {
      id: "A",
      text: `As we all know, our relationship with the items we own goes far beyond utility and aesthetics. As well as being useful, our possessions represent our extended selves. They are "repositories of ourselves," says Catherine Roster at the University of New Mexico in Albuquerque. "It might be a sweater, a lamp, an umbrella — an object doesn't have to have material value to have emotional value." Our ability to imbue things with rich meaning is a universal human trait that emerges early in life and develops as we age. The inclination to value material possessions beyond what others consider they are worth is known in psychology as the "endowment effect" — it explains why we are more likely to buy a coat once we have tried it on, as the mere act of imagining that something is ours in effect adds value to an object.`,
    },
    {
      id: "B",
      text: `Our ability to imagine the way new possessions will change our lives is what drives us to acquire them in the first place, states Marsha Richins at the University of Missouri in Columbia. Her research demonstrated that we have "transformation expectations" about new belongings: we expect them not only to improve the quality of our lives but also to enhance the way we are viewed by others. It is a tendency expertly exploited by advertisers, she claims.`,
    },
    {
      id: "C",
      text: `Our belongings also have an important role in bolstering our sense of identity, one made most apparent when we are forced to discard them. This can be difficult, even traumatic, since it is akin to relinquishing part of ourselves. Institutions such as prisons and military camps strive for just this result by removing clothes and other personal effects from inmates and recruits and issuing them with standardised kit, which serves to diminish their individuality; they in effect become like clay, primed for reshaping.`,
    },
    {
      id: "D",
      text: `Our materialistic aspirations are usually dictated not by what we need, but by what those around us possess. Envy is a mover of markets. At a deep level it is all about equity and dignity, says Edward Fischer, an anthropologist at Vanderbilt University in Nashville, Tennessee. "Is it fair that I have less than others? And what does this mean to my sense of self-worth?" This isn't just a feature of affluent societies, he adds. "It's also true among rural Maya farmers, Cairo's workers and various other groups of people around the world. The norms of those peer groups differ greatly but the influence of an individual's relative standing among them is equally important no matter where you are in the world."`,
    },
    {
      id: "E",
      text: `Our culture of hyper-consumerism can make it difficult to determine where normal behaviour ends and compulsion begins. Of course we are all materialistic to some extent and we do obtain a boost of happiness from a new possession. But it does not last and because it is so fleeting, there is a danger that many people immediately feel the need to make yet another purchase. Studies have clearly demonstrated that those who need material possessions to make themselves feel happier may in fact be struggling to find fulfilment in other key areas of their lives such as relationships. But interestingly, the drive to attain greater material wealth may not itself be the cause of this discontentment: a study by Rik Pieters at Tilburg University in the Netherlands revealed that while loneliness tends to make people more materialistic, the inverse is not necessarily true.`,
    },
    {
      id: "F",
      text: `We may not be able to influence our drive for acquisition but we do have the power to alter the degree of happiness we derive from the purchases we make. It is widely understood that once you earn enough to maintain a comfortable lifestyle, additional money does not continue to improve your quality of life. But that could well be because people are spending it wrongly. Research by psychologist Elizabeth Dunn revealed that spending money on experiences and other people offers more enduring boost than spending lavishly on other items. The price of the football boots that you purchase for your nephew, for example, matters far less than whether you accompany him to the park when he first wears them, she says. Though we expect new belongings to bring change, this vague notion usually evaporates once we have acquired that new item. So before making a purchase, Dunn suggests you pause to consider what you will be able to do differently once you have it and whether it will truly affect the way you spend your time, which in essence is your most precious commodity.`,
    },
  ],
  exam: {
    badge: "2",
    heading: "Test practice",
    strategies: "TEST STRATEGIES pages 170 and 171",
    matchingInstr:
      "The reading passage has SIX paragraphs, A–F. Which section contains the following information? Write the correct letter, A–F. You may use any letter more than once.",
    matching: [
      {
        id: 1,
        text: "A comparison of what drives the desire for possessions across a range of communities",
        key: "D",
      },
      {
        id: 2,
        text: "Surprising research findings which link personal well-being and the desire for possessions",
        key: "E",
      },
      {
        id: 3,
        text: "A reason why people might treasure something that cost very little",
        key: "A",
      },
      {
        id: 4,
        text: "An example of an inclination used to manipulate people into spending money",
        key: "B",
      },
      {
        id: 5,
        text: "The potential impact of depriving people of their possessions",
        key: "C",
      },
      {
        id: 6,
        text: "A warning of the possible consequences of 'retail therapy'",
        key: "F",
      },
    ],
    summaryInstr:
      "Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer.",
    summaryTitle: "How to spend money",
    summaryIntro:
      "People often find it difficult to stop buying things but they may be able to become happier with what they have bought. Clearly, people need money to live but having achieved a",
    summaryGaps: [
      {
        id: 7,
        after:
          ", more money will not mean it will get better. Psychologist Elizabeth Dunn recommends the more lasting benefits of spending money on",
        answers: ["comfortable lifestyle"],
      },
      {
        id: 8,
        after:
          " and on doing something new rather than buying things. Although our motive for buying something is often because we want our lives to",
        answers: ["other people"],
      },
      {
        id: 9,
        after:
          ", this idea will disappear as soon as we obtain the thing we wanted. Dunn's advice is to spend money on something which will improve the quality of the",
        answers: ["change"],
      },
      {
        id: 10,
        after: " available to you.",
        answers: ["time"],
      },
    ],
  },
  analysis: {
    badge: "3",
    heading: "Task analysis",
    instruction: "Work in pairs and discuss the questions.",
    questions: [
      "Which of the strategies did you find helpful?",
      "Which strategies would you like to try next time?",
    ],
  },
  discussion: {
    badge: "4",
    instruction:
      "To what extent do you agree with the statements below? Give reasons and examples from your own experience.",
    statements: [
      "We expect new belongings not only to improve the quality of our lives, but also to enhance the way we are viewed by others.",
      "Though we expect new belongings to bring change, this vague notion usually evaporates once we have acquired the new item.",
      "Our belongings play an important role in bolstering our sense of identity.",
      "Our materialistic desires are usually dictated not by what we need, but by what those around us possess.",
    ],
    suggestedTitle: "Suggested answer",
    suggestedAnswer: [
      "I largely agree with the first statement. When someone buys a new phone or designer bag, they often hope it will signal success or taste, not just function. In my experience, social media has intensified this — people post purchases partly to impress others.",
      "The second statement also rings true. The excitement of a new gadget fades quickly, and daily life feels much the same afterwards. We adapt to what we own, so the promised transformation rarely lasts.",
      "I would agree that belongings can reinforce identity — clothes, books, and hobbies all say something about who we are. However, I think character and relationships matter more in the long run than possessions alone.",
    ],
  },
};
