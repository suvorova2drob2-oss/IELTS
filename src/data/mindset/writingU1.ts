export const MS_U1_WRITE_STEPS = [
  "Lead-in · tenses",
  "Task Achievement",
  "Answer critique",
  "Conclusions",
  "Adj / Adv",
  "Exam Task 1",
] as const;

export const MS_U1_WRITE_NEXT = [
  "Task Achievement →",
  "Critique →",
  "Conclusions →",
  "Adj / Adv →",
  "Exam →",
  "← Back to unit",
] as const;

export const writingU1 = {
  id: "ms-u1-writing-flow",
  bookPages: "pp. 14–18",
  sectionTitle: "Writing · Task 1 line graphs",
  unitGoals: [
    "identify the main features of a line graph",
    "achieve a high score for Task Achievement",
    "describe and compare using adjectives and adverbs",
  ],

  leadIn: {
    badge: "LEAD-IN",
    instruction:
      "Using the verb to grow and the adverb rapidly, complete the sentences to describe the information in the graphs. Focus on the correct verb tense in each case, bearing in mind the time phrases you are given and the dates in the graph.",
    items: [
      {
        id: "1",
        stem: "Since five years ago, __________ to 90,000.",
        key: "sales have grown rapidly",
        given: true,
        tip: "Present perfect — from a point in the past continuing to now.",
      },
      {
        id: "2",
        stem: "Between 1980 and 1990 __________ to 90,000.",
        key: "sales grew rapidly",
        bankLabel: "sales grew rapidly",
      },
      {
        id: "3",
        stem: "From 2020 to 2030 __________ to 90,000.",
        key: "sales will / are predicted to / are expected to grow rapidly",
        bankLabel: "sales will / are predicted to grow rapidly",
        altKeys: [
          "sales will grow rapidly",
          "sales are predicted to grow rapidly",
          "sales are expected to grow rapidly",
        ],
      },
      {
        id: "4",
        stem: "By the year 2000, __________ to 90,000.",
        key: "sales had grown rapidly",
        bankLabel: "sales had grown rapidly",
      },
      {
        id: "5",
        stem: "By the year 2020, __________ to 90,000.",
        key: "sales will have grown rapidly",
        bankLabel: "sales will have grown rapidly",
      },
    ],
    partnerCue:
      "With a partner, make correct sentences using a verb from column 1, an adverb from column 2 and a time phrase.",
    verbs: ["increase", "decrease", "fall", "rise", "climb", "drop"],
    adverbs: [
      "dramatically",
      "slowly",
      "sharply",
      "consistently",
      "gradually",
      "steadily",
    ],
    timePhrases: [
      "by the year 2000",
      "from 1995 to 2000",
      "for the next ten years",
      "between 2010 and now",
      "by the year 2030",
      "since 2016",
      "5 years ago",
      "today",
    ],
    example:
      "Student A: increase, slowly, by the year 2000 → Student B: By the year 2000, it had increased slowly to 90%.",
  },

  taskAchievement: {
    badge: "TASK 1 – TASK ACHIEVEMENT",
    intro: `Task Achievement (TA) is the mark you get for how well you answer the question. There are a number of common mistakes that prevent candidates from getting a high score in TA. These are:`,
    mistakes: [
      "not including an overview statement",
      "misreporting data",
      "not highlighting key information or trends",
      "not including enough or any data",
      "speculating or giving an opinion about why changes have occurred",
      "using an inappropriate tone",
      "writing fewer than 150 words",
      "not including a final summary or concluding paragraph, or producing one which doesn't summarise the main features",
    ],
    badge3: "3",
    instruction3:
      "With a partner, make notes on the main features in this Task 1 line graph.",
    prompt: `The line graph below shows the main reasons people gave for moving away from a particular capital city to the countryside.

Summarise the information by selecting and reporting the main features, and make comparisons where relevant.`,
    categories: ["rising cost of living", "traffic", "lifestyle"],
    years: ["1990", "2000", "2010"],
    firstLook: [
      "Are there any common trends in the graphical information?",
      "Does any of the information differ from the rest in an obvious and significant way? If so, how?",
      "Is there anything that two or more categories have in common?",
      "Is there anything that only happens once?",
    ],
    overviewKeyPoints: [
      "All three reasons have risen over the period. Overall, the number of people moving away from the capital city is on the up.",
      "Traffic saw the steepest rise, particularly from 2000 to 2010.",
      "Rising cost of living rose the least over the whole period and this reason was the only one to show any fall (2000–2010). However, in terms of numbers it was the main reason for moving to the countryside across the whole period by a significant margin.",
      "The increase in people leaving for lifestyle reasons was steady across the whole period but relatively low.",
    ],
    badge4: "4",
    instruction4:
      "Look at this description of the line graph above. It would not get a good score for Task Achievement. Why not?",
    weakAnswer: `The line graph illustrates the main reasons people gave for moving away from a capital city to the countryside.

The main reason was traffic. In 1990, 66,000 people left the city because of this, followed by 85,000 in 2000. 70,000 left in 2010, so it actually went down in those last ten years.

It was different for the other two reasons, which both started a lot lower than rising cost of living and both kept going up between 1990 and 2010. Subsequently, both categories saw large increases, with traffic first going up a lot between 1990 and 2000 and then even more clearly after that. Lifestyle went up to 30,000 initially, then up again until 2010.`,
    weakProblems: [
      "Some of the data and categories are incorrectly reported. (Incorrect: The main reason was traffic; 70,000 left in 2010)",
      "The third paragraph does not include any data to support its arguments.",
      "There is no concluding paragraph.",
      "The answer is considerably less than 150 words.",
      "The level of language is OK, but unlikely to impress the examiner.",
      "Note: it is also recommended that when you write your introduction, you put it in your own words as this demonstrates the ability to paraphrase (Lexical Resource). This introduction borrows heavily from the question.",
    ],
  },

  critique: {
    badge: "5",
    instruction:
      "The description from exercise 4 has been rewritten, but there is still room for improvement. Read it and think about how it could be improved. Then match the teacher's comments (A–D) to the numbered sections (1–4).",
    answer2: `The line graph sets out the main motivations people expressed for relocating to the countryside from the city in the years 1990, 2000 and 2010. The overall trend for the period is of an increase in the numbers moving away from the city.

According to the graph, the main reason for relocation was the rising cost of living. In 1990, 65,000 people left the city because of this, then 85,000 left in 2000, then 80,000 people moved away in 2010, so it actually increased by 20,000 initially (between 1990 and 2000), before going down by 5,000 in those last ten years between 2000 and 2010 (1).

This drop of 5,000 could have been because people generally had less money in 2010 than they did in 2000, so they couldn't afford to move. (2)

It was a different story for traffic and lifestyle. Both had the same number of city leavers at the start of the period. Subsequently, both categories saw increases, with traffic first going up by a large number between 1990 and 2000 and then even more steeply after that. Lifestyle leavers rose consistently over the whole period, going up to 30,000 initially, then up again to 2010. (3)

So, what does it all mean? For me, the answer is crystal clear. Overall, the graph shows that a huge number of people moved away from the city to the countryside in a twenty-year period. (4)`,
    comments: [
      {
        id: "A",
        text: "Don't speculate – you shouldn't suggest reasons for any change. All you need to do is report what you can see on the graph.",
      },
      {
        id: "B",
        text: "This section is too mechanical – avoid simply listing the changes to a single category like this. Focus more on highlighting the key figures and trends.",
      },
      {
        id: "C",
        text: "Better – you have included a conclusion this time, but it doesn't really summarise the key features. Your tone here is inappropriate – it sounds like you're writing a magazine article. Remember to keep the tone more formal and scientific.",
      },
      {
        id: "D",
        text: "This section makes its points more clearly but fails to include key data to demonstrate the points.",
      },
    ],
    keys: { "1": "B", "2": "A", "3": "D", "4": "C" } as Record<
      string,
      string
    >,
  },

  conclusions: {
    badge: "6",
    instruction:
      "With a partner, discuss which option works best as a summary/conclusion for this task. Give reasons.",
    tip: "Don't include data in your conclusion – it is a summary of the trends shown in the whole graph, and you do not need to repeat specific information.",
    options: [
      {
        id: "A",
        text: "To sum up, people left the city for three main reasons, all of which rose significantly between 1990 and 2000. Traffic changed the most rapidly, lifestyle changed the least, and rising cost of living was the only reason that went down.",
      },
      {
        id: "B",
        text: "Overall, the graph suggests the number of people relocating to the countryside rose across the period. Cost of living was the main reason for relocation by some distance, despite a fall in numbers in the second half of the period. Traffic saw the greatest overall increase, with lifestyle seeing a relatively slow but steady rise.",
      },
      {
        id: "C",
        text: "All in all, the rising cost of living rose from 65,000 to 85,000 and then 80,000, and was the highest of all three reasons. Traffic had the biggest increase from 20,000 up to 60,000, while lifestyle changed the least (20,000 / 30,000 / 40,000).",
      },
    ],
    key: "B",
    tips: {
      A: "This is not a good conclusion: (a) to say 'people left the city for three main reasons' is not necessarily true: the graph did supply three reasons – however, there may have been others that were not included in the graph; (b) there is incorrect reporting of data, which should be 'between 1990 and 2010', not '1990 and 2000'. Also, lifestyle did not change the least, since, given the fall between 2000 and 2010, rising cost of living changed the least for the whole period.",
      B: "This is the best conclusion. It is less mechanical than A, mentions the main features and expresses what had started to happen by the end of the period.",
      C: "The worst conclusion of all three. Not only has the candidate included data in their concluding paragraph, but it also repeats what has already been stated in the main body. The candidate does not 'step back' and present a summary of the main trends or features.",
    } as Record<string, string>,
  },

  adjAdv: {
    badge: "7",
    title: "DESCRIBING CHANGES WITH ADJECTIVES AND ADVERBS",
    instruction:
      "Look at these notes that another candidate made for this line graph, which helped them to write a more effective description. Complete the sentences with the adjectives in the box.",
    bank: [
      "consistent",
      "highest",
      "joint-lowest",
      "lowest",
      "notable",
      "overall",
      "stable",
    ],
    gaps: [
      {
        id: "1",
        before: "Rising cost of living: the (",
        after:
          ") point of / main reason, in any year (85,000 in 2000); the only one to decrease (to 80,000 in 2010)",
        key: "highest",
      },
      {
        id: "2",
        before: "Traffic: greatest (",
        after: ") rise (40,000); most (",
        after2: ") rise between 2000 and 2010 (25,000)",
        key: "overall",
        key2: "notable",
        twinId: "3",
      },
      {
        id: "3",
        before: "",
        after: "",
        key: "notable",
        hidden: true,
      },
      {
        id: "4",
        before: "Lifestyle: Most (",
        after: ") trend / (",
        after2:
          ") increase (only 20,000); remained the (",
        after3: ") of all three reasons",
        key: "consistent",
        key2: "stable",
        key3: "lowest",
        twinId: "5",
        twinId3: "6",
      },
      {
        id: "5",
        before: "",
        after: "",
        key: "stable",
        hidden: true,
      },
      {
        id: "6",
        before: "",
        after: "",
        key: "lowest",
        hidden: true,
      },
      {
        id: "7",
        before: "Traffic and Lifestyle: (",
        after: ") in the first year presented (20,000 in 1990)",
        key: "joint-lowest",
      },
    ],
    displayGaps: [
      {
        id: "1",
        before: "Rising cost of living: the (",
        after:
          ") point of / main reason, in any year (85,000 in 2000); the only one to decrease (to 80,000 in 2010)",
        key: "highest",
      },
      {
        id: "2",
        before: "Traffic: greatest (",
        mid: ") rise (40,000); most (",
        after: ") rise between 2000 and 2010 (25,000)",
        key: "overall",
        key2: "notable",
        gap2: "3",
      },
      {
        id: "4",
        before: "Lifestyle: Most (",
        mid: ") trend / (",
        mid2: ") increase (only 20,000); remained the (",
        after: ") of all three reasons",
        key: "consistent",
        key2: "stable",
        key3: "lowest",
        gap2: "5",
        gap3: "6",
      },
      {
        id: "7",
        before: "Traffic and Lifestyle: (",
        after: ") in the first year presented (20,000 in 1990)",
        key: "joint-lowest",
      },
    ],
    badge8: "8",
    instruction8:
      "Look at the following adverbs which describe the manner of change. With a partner, decide which ones would be inappropriate for a Task 1 answer.",
    allAdverbs: [
      "abruptly",
      "markedly",
      "sharply",
      "steadily",
      "amazingly",
      "noticeably",
      "shockingly",
      "gradually",
      "predictably",
      "significantly",
      "inconsistently",
      "progressively",
      "surprisingly",
    ],
    inappropriate: [
      "amazingly",
      "shockingly",
      "predictably",
      "surprisingly",
    ],
    inappropriateTip:
      "Inappropriate adverbs for a Task 1 essay: amazingly, shockingly, predictably, surprisingly. The adverbs significantly and noticeably are arguably subjective, but used in the correct way are not necessarily so.",
    tip: "This kind of task requires you to report the data objectively. Avoid using adverbs which give your subjective interpretation or opinion of the data, e.g. worryingly.",
    badge10: "10",
    instruction10:
      "Change the underlined words in the sentences into the form given in brackets and then rewrite the sentences. The first one has been done for you.",
    rewrite: [
      {
        id: "1",
        original:
          "The category of 'Lifestyle' increased the most consistently and stably. (adjective + noun)",
        sample:
          "The most consistent and stable increase was seen in the category of 'Lifestyle'.",
        given: true,
      },
      {
        id: "2",
        original:
          "Traffic rose steadily as a reason for moving to the countryside between 1990 and 2000 … (adjective + noun)",
        sample:
          "Traffic experienced a steady rise as a reason for moving to the countryside between 1990 and 2000 …",
      },
      {
        id: "3",
        original:
          "… but then there was a marked increase between 2000 and 2010. (verb + adverb)",
        sample: "… but then increased markedly between 2000 and 2010.",
      },
      {
        id: "4",
        original:
          "The number of people moving to the countryside for lifestyle reasons grew consistently across the whole period shown in the graph. (adjective + noun)",
        sample:
          "The number of people moving to the countryside for lifestyle reasons saw a consistent growth across the whole period shown in the graph.",
      },
    ],
  },

  exam: {
    badge: "EXAM SKILLS",
    instruction:
      "Use the information and language from this lesson to answer this Writing Task 1.",
    timeNote: "You should spend about 20 minutes on this task.",
    prompt: `The line chart below shows the results of a survey giving the reasons why people moved to the capital city of a particular country.

Summarise the information by selecting and reporting the main features, and make comparisons where relevant.

Write at least 150 words.`,
    categories: ["employment", "study", "family/friends", "adventure"],
    years: ["2000", "2005", "2010", "2015"],
    minWords: 150,
    sample: `The line graph sets out the key motivations for people relocating to the capital of a specific country between 2000 and 2015.

Moving for the purpose of study saw the greatest rise overall, with a jump of approximately 62,000. It rose considerably in two periods – from 2000 to 2005 (by 22,000), and then again from 2010 to 2015 (by 33,000), with a more gentle growth of around 7,000 in between.

Elsewhere, the figure of people relocating for work began at 61,000 in 2000, then peaked at 92,000 in 2010 – the highest of any reason, in any year – before finishing as the joint-highest in 2015 (87,000 – on a level with those relocating in order to study). Notably, this category was the only one of the four that underwent a downturn.

Turning to 'adventure', this category rose the most stably and steadily of all four categories, from 11,000 to 15,000 over the fifteen-year period. Meanwhile, the number of people relocating for 'family and friends' reasons climbed gently in the first five years (12,000 to 14,000), followed by an upswing to 22,000, before eventually levelling off at around 23,000 in 2015.

All in all, the graph tells us that, 'employment' aside, there was an increase in each of the four reasons for moving over the period in question, with the greatest rise occurring in those citing study as the main motivating factor. (212 words)`,
  },
};
