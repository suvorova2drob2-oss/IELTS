export const WRITE_M7B_STEPS = [
  "1 Lead-in",
  "2 Understand chart",
  "4 Plan",
  "5a–5b Future language",
  "6 Write 150+",
] as const;

export const WRITE_M7B_NEXT = [
  "2 Chart →",
  "4 Plan →",
  "5a–5b Language →",
  "6 Write →",
  "← К модулю",
] as const;

export const writingM7b = {
  id: "writing-m7b-flow",
  bookPages: "pp. 116–117 in your coursebook",
  sectionTitle: "Writing · Task 1",
  leadIn: {
    badge: "1a",
    instruction:
      "Look at the photo. If you were getting on the plane, where would you like to fly to and why? What are the most popular destinations to fly to from your country? Why are they so popular and what type of people tend to go to these places the most?",
  },
  chart: {
    badge: "2a",
    title: "World air passengers, by country, 2014–2034",
    instruction: "Look at the chart below. What does it show?",
    tip: "It shows the changes in the numbers of airline passengers over three different points in time.",
    questions: [
      {
        id: 1,
        text: "How is the data measured?",
        tip: "hundred thousands",
      },
      { id: 2, text: "How is the chart categorised?", tip: "countries" },
      {
        id: 3,
        text: "What is the timeframe for the chart?",
        tip: "one past date and two future dates",
      },
      {
        id: 4,
        text: "Is the information definite or not? How could this change the language you use to describe it?",
        tip: "only 2014; the future information is predicted, not definite",
      },
      {
        id: 5,
        text: "What tense or forms will you use to write your answer?",
        tip: "past and future",
      },
    ],
    overviewTip:
      "The number of people using air travel is set to increase in all countries shown.",
    countries: [
      "Canada",
      "USA",
      "Brazil",
      "Mexico",
      "UK",
      "France",
      "China",
      "Saudi Arabia",
    ],
    years: ["2014", "2024", "2034"],
  },
  plan: {
    badge: "4c",
    instruction:
      "Considering your answers, look at the chart and decide how you can accurately represent the data and which tenses and vocabulary are appropriate. Plan your answer.",
    prompts: [
      "What the chart means",
      "How you can best group the main trends or features",
      "How you can support these with data",
      "How you can give an effective summary overview",
      "What language you need to use",
    ],
  },
  futureLang: {
    badge: "5a",
    instruction:
      "Underline the expressions in the sentences which indicate future possibility.",
    items: [
      {
        id: 1,
        text: "It is predicted that Canada will remain the country with the highest number of air passengers.",
        phrase: "It is predicted",
        accurate: false,
        fix: "Canada will not remain (the USA is likely to surpass Canada).",
      },
      {
        id: 2,
        text: "Numbers of airline passengers in the South American countries shown may only increase by a small amount.",
        phrase: "may",
        accurate: false,
        fix: "South American needs to be changed to European (UK and France show more stagnant growth).",
      },
      {
        id: 3,
        text: "The number of people travelling by plane is expected to rise in all countries.",
        phrase: "is expected to",
        accurate: true,
        fix: "",
      },
      {
        id: 4,
        text: "It is estimated that China and Saudi Arabia will see considerable growth in numbers of airline passengers.",
        phrase: "is estimated",
        accurate: true,
        fix: "",
      },
      {
        id: 5,
        text: "It is likely that the USA will have the most airline passengers in 2034.",
        phrase: "is likely",
        accurate: true,
        fix: "",
      },
      {
        id: 6,
        text: "Air passenger numbers could possibly double in all the countries over the next 20 years.",
        phrase: "could possibly",
        accurate: false,
        fix: "in many countries, not all",
      },
    ],
    tip: "5b: 2 and 6 are incorrect. (Also sentence 1 is inaccurate about Canada remaining highest.)",
  },
  write: {
    badge: "6a",
    expert: "EXPERT WRITING page 197",
    instruction:
      "Write your answer to the chart in Exercise 2a. Write at least 150 words.",
    model: `The chart shows the actual and predicted numbers of air passengers for eight different countries around the world. Actual numbers come from 2014 and predictions for the years 2024 and 2034 are shown.

It can be seen that there are regional patterns in the actual and predicted air passenger numbers. Firstly, in 2014 both Canada and the USA had approximately 1,250,000 air passengers and this figure could well rise to over 2.5 million passengers by 2034. The USA is also likely to surpass Canada in the number of people travelling by air. Looking at Brazil and Mexico, it can be observed that passenger numbers will increase and that although Brazil had a large number of passengers compared to Mexico in 2014 (approximately 1.25 million to 600,000 respectively), both countries are set to double their number of passengers over the 20-year period shown.

In the UK and France, the rate of growth is far more stagnant. In 2014, these two countries had around 700,000–900,000 air travellers and this figure is likely to rise only by a small amount (1 million and 1.4 million respectively by 2034).

Lastly, China and Saudi Arabia are predicted to see a large growth. In 2014, these countries accounted for over 1 billion passengers each but both countries are expected to reach over 2.5 million and around 2 million passengers by 2034 respectively.

In summary, although there may be some regional differences, airline passenger numbers are predicted to increase in all the countries shown.`,
  },
};
