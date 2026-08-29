export const WRITE_M5B_STEPS = [
  "1 Quote",
  "2a–2c Charts",
  "3a–3c Vocabulary",
  "4 Plan",
  "5 Write",
  "6 Peer review",
] as const;

export const WRITE_M5B_NEXT = [
  "2a–2c Charts →",
  "3 Vocab →",
  "4 Plan →",
  "5 Write →",
  "6 Peer →",
  "← К модулю",
] as const;

export const writingM5b = {
  id: "writing-m5b-flow",
  bookPages: "pp. 84–85 in your coursebook",
  sectionTitle: "Writing · Task 1 (describe a chart)",
  expertWriting: "EXPERT WRITING page 195",
  quote1: {
    badge: "1",
    instruction:
      "Discuss the quote about living in a different country. What positive and negative aspects are there? If you could live anywhere, where would you choose?",
    tip: "Positive: learning about yourself and another culture. Negative: loneliness and homesickness.",
  },
  charts2: {
    badge: "2a",
    instruction:
      "Look at the tables / charts. Which should be shown as a bar graph and which as a pie chart?",
    tip: "First table — bar graph (amounts not proportional). Second — pie chart (figures add up to a total of migrants exiting the UK).",
    choose2b: {
      badge: "b",
      instruction: "Choose the correct option for each statement about the data.",
      items: [
        {
          id: 1,
          text: "Statement about how the first set of figures should be visualised",
          key: "A",
        },
        {
          id: 2,
          text: "Statement about the second set of figures",
          key: "A",
        },
        {
          id: 3,
          text: "Statement about comparing the two visuals",
          key: "A",
        },
      ],
    },
    ideas2c: {
      badge: "c",
      instruction: "Note key comparisons you could make.",
      tips: [
        "Highest cost-of-living countries (Switzerland, Norway, New Zealand, Kuwait) were not popular UK migrant destinations.",
        "Australia (CPI ~99.32) was the most popular named destination (38,000), though Spain, China and Poland were also popular with lower costs.",
        "The 'other' category was largest (174,000); no simple link that cheaper countries always attract more migrants.",
      ],
    },
  },
  vocab3: {
    badge: "3",
    instruction:
      "Band 7 lexical resource: errors infrequent; formal, flexible, precise vocabulary. Note useful paraphrases:",
    pairs: [
      "reasons / motivations",
      "life quality / standard of living",
      "top 10 countries / ten most desirable nations",
      "migration / moving countries",
      "survey / questionnaire",
      "better lifestyle / improved living conditions",
      "study / education",
      "adventure / new experiences",
      "work opportunities / employment prospects",
      "family / relatives",
    ],
  },
  plan4: {
    badge: "4",
    instruction:
      "Plan your Task 1 answer in about 5 minutes (overview + key features from both charts).",
  },
  write5: {
    badge: "5",
    instruction: "Write your answer (about 20 minutes). Write at least 150 words.",
    task:
      "The charts show reasons for migration and the most desirable countries to migrate to in 2014. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    modelLabel: "Model answer",
    modelAnswer: `The two charts present data on the reasons for migration and the most desirable countries to migrate to for 2014. The pie chart outlines six different motivators for migration whilst the bar chart presents the ten most popular countries based on overall quality of life.

From the pie chart, it can be seen that the two main reasons people chose to move to another country were either improved job opportunities (27 percent) or as the result of a secure job offer (24 percent). Family reasons were cited by 22 percent followed by education, which was a motivating factor for 15 percent of the respondents. An improved lifestyle was cited by 9 percent of respondents and only 3 percent migrated for a new adventure.

The bar graph shows that the Scandinavian and English-speaking countries were generally the highest rating countries on the quality of life index. This was based on the OECD index which includes a number of different factors, such as income, education and life satisfaction. Sweden and Australia were the joint highest ranking countries with an index halfway between 7.9 and 8 followed by Canada, Norway and USA who all had an index of around 7.8–7.9. The other five countries presented, which include Switzerland, the UK, the Netherlands, Denmark and Iceland, all scored an index between 7.5 and 7.7.

Overall, the two diagrams show that in 2014, financial benefit or stability were key motivators for people moving to other countries and that more developed countries tended to be the most popular destinations.`,
  },
  peer6: {
    badge: "6",
    instruction:
      "Exchange reports with a partner. Comment on overview, key features and vocabulary. You could rewrite at home.",
  },
};
