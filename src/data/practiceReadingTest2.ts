import type { PracticeReadingTest } from "./practiceReadingTest1";

/** Practice Test 2 · Reading — exact book wording. */

const PASSAGE = [
  "Negative reports in newspapers and the media may leave us feeling in despair, and certainly there are troubling situations in the world. However, they are clearly not giving us the full picture. A new study suggests that, historically, we are living in a time that is not only the healthiest, wealthiest and best-educated in history, but also by far the least violent.",
  "To demonstrate, take the extraordinary rate of economic growth in China and India. As a result of development in these two countries, there has been a huge decline in recent years in the share of the world population living on less than $1.25 a day, from 53 percent in 1981 to 17 percent in 2011. In fact, many people argue that we should be using a global poverty line of $10–$15 a day, but that very debate is a sign that we have made incredible progress at relieving the worst forms of poverty in recent decades.",
  "This has had an obvious effect on world hunger, with fewer people suffering starvation in the last 24 years. Both men and women saw their life expectancy increase by six years globally from 1990 to 2012, but the gains were far greater in the countries with the lowest income, up to nine years in some cases. This increase is not necessarily due to people living longer, but to a drop in the child mortality rate, which has fallen by up to two-thirds in some areas.",
  "Overall, we're showing signs of being healthier. For nearly 2,000 years, male heights were stable, but since Europe industrialised, they have shot up. Nutrition and overall living standards are the main factors behind height, and we are living in the first couple of centuries of huge advances.",
  "This is all inspiring stuff, but nowhere near as incredible as the differences in the attitude we take to our fellow human beings. Our violent inner selves are giving way to the better angels of cooperation and kindness in dramatic ways. Stephen Pinker, the cognitive scientist, decided to take a historical approach to the subject of violence in our society. According to his study, the extent to which violence has declined in every shape and form is astonishing.",
  "In his statistical argument Pinker rightly focuses on the rate of violence in relation to the size of the population, rather than just the figures for violent acts. What matters to an individual living in a particular place and time is their personal risk of becoming the victim of violence. The Second World War was the worst episode in human history in terms of the total numbers killed on the battlefield. The death toll of 55 million is shocking. However, when compared to the population size at the time, it was only the ninth most deadly event over the past 1,200 years. The worst of all, according to Pinker's understanding of the figures, was the eighth-century An Lushan revolt which killed 36 million in and around China. In modern-day terms, it would have been equivalent to 429 million deaths in the mid-twentieth century. Although statistics for ancient wars were not always recorded accurately, there is enough evidence in reports to show just how violent warlords could be in ancient times.",
  "A more reliable source of data comes from an analysis of court records in later periods which shows an incredible decline in murder across Western Europe between the thirteenth and twentieth centuries. Murder rates fell between tenfold and a hundredfold. For example, the murder rate in fourteenth-century Oxford was 110 per 100,000 people. By the time we reach twentieth-century London, it was less than one. Interestingly, a survey of public opinion on the Internet suggested that the average person felt that twentieth-century England was about 14 percent more violent than fourteenth-century England. In fact, it was 95 percent less violent.",
  "Pinker suggests several historical forces that have promoted more peaceful behaviour. Besides the more obvious development of rule of government and commercial interests, he suggests feminisation and cosmopolitanism are largely responsible. Since violence is largely a male pastime, the increasing respect for the interests and values of female members of society has led society away from viewing violence as an acceptable solution to disagreements. A more cosmopolitan culture – resulting from growing literacy, mobility and the mass media – can encourage people to become more patient and have more respect for those who are unlike themselves. Of course, the increased tendency to use knowledge and reason to make decisions has also played a major part. Many people these days recognise that violence is a pointless option and have reframed it as a problem to be solved, rather than a contest to be won. Less than a century ago, many Europeans were looking forward to what became the First World War – it is unthinkable that anyone would look forward to war today.",
];

export const practiceReadingTest2: PracticeReadingTest = {
  id: "practice-reading-2",
  title: "Practice Test 2 · Reading",
  subtitle: "Despite appearances, the human race is losing its appetite for violence and suffering",
  readingLabel: "Reading",
  passageTitle:
    "Despite appearances, the human race is losing its appetite for violence and suffering",
  showParagraphIds: false,
  paragraphs: PASSAGE.map((text, i) => ({
    id: String.fromCharCode(65 + i),
    text,
  })),
  tasks: [
    {
      id: "prt2-task1",
      index: 1,
      title:
        "Test practice: Matching sentence endings and sentence completion",
      type: "sentence-endings",
      learnTips: [],
      instruction: "3 Complete Questions 1–6 below.",
      taskHeader:
        "Questions 1–6\nComplete each sentence with the correct ending, A–H, below.",
      endings: [
        { id: "A", text: "so the length of the average lifetime has grown." },
        { id: "B", text: "so society is more critical of war." },
        { id: "C", text: "because they may fail to reach targets." },
        {
          id: "D",
          text: "so people have an unrealistic view of modern life.",
        },
        { id: "E", text: "so there is better understanding of others." },
        {
          id: "F",
          text: "so the balance of people in power is better.",
        },
        { id: "G", text: "because the way we eat has changed." },
        {
          id: "H",
          text: "because the situation among the poor has improved.",
        },
      ],
      questions: [
        {
          id: 1,
          stem: "Journalists are in the habit of writing about bad news",
          key: "D",
          evidence: [
            "leave us feeling",
            "not giving us the full picture",
          ],
          tip: "Bad-news media reports leave us feeling despair — but they are not the full picture, so people get an unrealistic view of modern life.",
        },
        {
          id: 2,
          stem: "It has been suggested that the poverty line should be raised",
          key: "H",
          evidence: [
            "global poverty line of $10–$15 a day",
            "that very debate is a sign that",
          ],
          tip: "Raising the poverty line is debated because the worst poverty has already improved — that debate itself is a sign of progress.",
        },
        {
          id: 3,
          stem: "Infant mortality rates have gone down",
          key: "A",
          evidence: [
            "This increase is not necessarily due to people living longer, but to a drop in",
            "child mortality rate",
          ],
          tip: "Life expectancy rose largely because child mortality fell — so the average lifetime has grown.",
        },
        {
          id: 4,
          stem: "Men are growing taller",
          key: "G",
          evidence: [
            "the main factors behind height",
            "Nutrition and overall living standards",
          ],
          tip: "Heights rose because nutrition and living standards changed — i.e. the way we eat has changed.",
        },
        {
          id: 5,
          stem: "Women have a stronger position in society",
          key: "B",
          evidence: [
            "feminisation and cosmopolitanism are largely responsible",
            "has led society away from",
          ],
          tip: "More respect for women’s interests (feminisation) has led society away from accepting violence — so society is more critical of war.",
        },
        {
          id: 6,
          stem: "The number of people who can read and write has increased",
          key: "E",
          evidence: [
            "resulting from growing literacy, mobility and the mass media",
            "can encourage",
          ],
          tip: "Growing literacy (with mobility and media) encourages patience and respect for people unlike ourselves.",
        },
      ],
      advice: {
        title: "Test training: Unknown words",
        instruction:
          "2 The reading passages in the Reading test might contain unknown words. Complete the advice with the words in the box.",
        wordBox: [
          "context",
          "family",
          "formed",
          "ignore",
          "meaning",
          "part of speech",
          "similar",
          "understand",
        ],
        gaps: [
          {
            id: 1,
            before: "Don't panic! It isn't necessary to ",
            after: " every word.",
            key: "understand",
          },
          {
            id: 2,
            before: "Try to work out the ",
            after: ".",
            key: "meaning",
            extra: [
              { before: " of the word from the ", key: "context" },
            ],
          },
          {
            id: 3,
            before: "Read the words around the unknown word. What ",
            after: " is the new word?",
            key: "part of speech",
          },
          {
            id: 4,
            before: "Look at how the word is ",
            after: ".",
            key: "formed",
            extra: [
              { before: ". Do you know any ", key: "similar" },
              { before: " words? Often words are part of a word ", key: "family" },
            ],
          },
          {
            id: 5,
            before: "",
            after: " unknown words which aren't important in answering the questions.",
            key: "ignore",
          },
        ],
      },
    },
    {
      id: "prt2-task2",
      index: 2,
      title: "Questions 7–12 · Sentence completion",
      type: "sentence-completion",
      learnTips: [],
      instruction: "4 Read the text again and answer Questions 7–12.",
      taskHeader:
        "Questions 7–12\nComplete the sentences below.\nChoose NO MORE THAN THREE WORDS from the passage for each answer.",
      questions: [
        {
          id: 7,
          stem: "Today we are living in the __________ period in history.",
          key: "least violent",
          accept: ["least violent"],
          evidence: ["by far the least violent"],
          tip: "Copy the phrase from the first paragraph: historically we live in by far the least violent time.",
        },
        {
          id: 8,
          stem: "The number of people living below the __________ has fallen from 53 percent in 1981 to 17 percent in 2011.",
          key: "poverty line",
          accept: ["poverty line"],
          evidence: [
            "living on less than $1.25 a day, from 53 percent in 1981 to 17 percent in 2011",
            "poverty line",
          ],
          tip: "Use the exact words from the passage: poverty line (with the 1981–2011 figures).",
        },
        {
          id: 9,
          stem: "While __________ has increased globally, the biggest increases have been in countries with the lowest incomes.",
          key: "life expectancy",
          accept: ["life expectancy"],
          evidence: [
            "life expectancy increase by six years globally",
            "lowest income",
          ],
          tip: "Both men and women saw their life expectancy increase — gains were greater in the lowest-income countries.",
        },
        {
          id: 10,
          stem: "When comparing data for violent acts it is important to take into account __________ the population, not just the number of deaths.",
          key: "the size of",
          accept: ["the size of"],
          evidence: [
            "the rate of violence in relation to the size of the population",
          ],
          tip: "Pinker focuses on violence in relation to the size of the population, not raw death totals.",
        },
        {
          id: 11,
          stem: "According to __________ people feel that the twentieth century is more violent than the fourteenth century, when in actual fact this isn't the case.",
          key: "public opinion",
          accept: ["public opinion"],
          evidence: [
            "a survey of public opinion on the Internet",
            "14 percent more violent",
          ],
          tip: "A survey of public opinion suggested people feel the 20th century was more violent — but it was actually far less.",
        },
        {
          id: 12,
          stem: "Growing levels of __________ have led to people having more respect for people who are not the same as them.",
          key: "literacy and mobility",
          accept: ["literacy and mobility"],
          evidence: [
            "growing literacy, mobility and the mass media",
            "more respect for those who are unlike themselves",
          ],
          tip: "Cosmopolitan culture comes from growing literacy, mobility and the mass media — use literacy and mobility (≤3 words).",
        },
      ],
    },
    {
      id: "prt2-task3",
      index: 3,
      title: "Language · Vocabulary · Follow-up",
      type: "learn-pack",
      learnTips: [],
      languageInstruction:
        "5 Complete the cause and effect sentences with although, because or so.",
      languageItems: [
        {
          id: 1,
          before: "Journalists usually write about bad news ",
          after: " it's more dramatic than good news.",
          key: "because",
        },
        {
          id: 2,
          before:
            "Today most people are aware of the importance of eating a balanced diet, ",
          after: " sales of healthy food have increased.",
          key: "so",
        },
        {
          id: 3,
          before: "",
          after:
            " people often talk about helping the poor, donations to charities are down in recent years.",
          key: "Although",
        },
        {
          id: 4,
          before:
            "Levels of literacy have remained fairly static in recent years, ",
          after: " there has been increased investment in education.",
          key: "although",
        },
        {
          id: 5,
          before: "New laws promoting equality are now in place, ",
          after: " women now face less discrimination than in the past.",
          key: "so",
        },
        {
          id: 6,
          before: "",
          after:
            " people can access news 24-hours a day, people are better informed than ever before.",
          key: "Because",
        },
      ],
      vocabInstruction:
        "6 Choose the correct words to complete the sentences. (Tip: think about the root word of each option.)",
      vocabItems: [
        {
          id: 1,
          before: "Both diet and exercise are ",
          after: " important when it comes to staying healthy.",
          choices: ["equal", "equally"],
          key: "equally",
        },
        {
          id: 2,
          before:
            "In the last twenty-five years significant ",
          after: " has been made in dealing with poverty.",
          choices: ["progress", "progression"],
          key: "progress",
        },
        {
          id: 3,
          before: "It was worrying how ",
          after: " the mood changed.",
          choices: ["dramatic", "dramatically"],
          key: "dramatically",
        },
        {
          id: 4,
          before: "I'm sure if you try again you will be ",
          after: ".",
          choices: ["success", "successful"],
          key: "successful",
        },
        {
          id: 5,
          before: "There is still quite a lot we can ",
          after: ".",
          choices: ["improve", "improvement"],
          key: "improve",
        },
        {
          id: 6,
          before: "Everyone knows that the ",
          after: " value of junk food is low.",
          choices: ["nutrition", "nutritional"],
          key: "nutritional",
        },
        {
          id: 7,
          before: "You wouldn't believe just how many people live in ",
          after: ".",
          choices: ["poor", "poverty"],
          key: "poverty",
        },
        {
          id: 8,
          before: "The ",
          after: " makes a lot of sense.",
          choices: ["suggestive", "suggestion"],
          key: "suggestion",
        },
        {
          id: 9,
          before: "How we behave is often conditioned by ",
          after: ".",
          choices: ["social", "society"],
          key: "society",
        },
      ],
      followUpInstruction:
        "7 What do you think are the most urgent issues that need to be addressed in the world today? Discuss in pairs.",
      followUpQuestions: [
        "What do you think are the most urgent issues that need to be addressed in the world today?",
      ],
      speakSec: 120,
    },
  ],
};
