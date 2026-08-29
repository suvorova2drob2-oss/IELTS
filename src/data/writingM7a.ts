export const WRITE_M7A_STEPS = [
  "1 Lead-in",
  "2–4 Chart intros",
  "5 Figures",
  "6–7 Asia table + errors",
  "8 Write 150+",
] as const;

export const WRITE_M7A_NEXT = [
  "2–4 Chart →",
  "5 Figures →",
  "6–7 Errors →",
  "8 Write →",
  "← К модулю",
] as const;

export const writingM7a = {
  id: "writing-m7a-flow",
  bookPages: "p. 110 in your coursebook",
  sectionTitle: "Writing · Task 1",
  leadIn: {
    badge: "1",
    instruction: "How do most people travel in the cities near you?",
    tip: "In my neighbourhood, most people use buses to travel around the town due to its small size.",
  },
  chart: {
    badge: "2",
    title: "Modes of transport in three major cities, 2014",
    instruction:
      "Look at the chart below. Discuss what the chart is about and what key features you can see.",
    note: "Private transport includes privately owned vehicles and taxi use.",
    cities: ["New York", "Sydney", "Hong Kong"],
    categories: ["Private", "Walk", "Rail", "Bus", "Other"],
    tip: "Bar chart comparing share of transport modes across three cities in 2014.",
  },
  intro: {
    badge: "3",
    instruction:
      "Look at the two opening paragraphs describing the chart in Exercise 2. Which is the best introduction? Why?",
    options: [
      {
        id: "1",
        text: "The bar chart outlines the share in modes of transport in 2014 of three cities: New York, Sydney and Hong Kong. The share is measured in percentage and the data is categorised into types of public transport.",
      },
      {
        id: "2",
        text: "There is a varied share of public transport in the three cities outlined in the graph: New York, Sydney and Hong Kong. While travelling by car is popular in Sydney, other forms of transport are more popular elsewhere.",
      },
    ],
    key: "1",
    tip: "1 is the best as the introduction should outline what the data is about, what is measured, how it is measured and what the main categories or groupings are.",
  },
  overview: {
    badge: "4",
    instruction:
      "Look at the two final summary overviews for the chart in Exercise 2. Which is the best summary overview? Why?",
    options: [
      {
        id: "1",
        text: "Overall, the data show that there are many forms of transport that can be used to travel. Private transport is most popular in Sydney, whereas bus is more popular in Hong Kong, and walking is the most popular in New York.",
      },
      {
        id: "2",
        text: "Overall, the data show that there is no one major form of transport for all cities, but rather popular transport modes vary depending on the city.",
      },
    ],
    key: "2",
    tip: "2 is the best as the summary overview should communicate the general picture. 1 is too detailed.",
  },
  figures: {
    badge: "5",
    instruction: "Complete the main body of the answer using the figures below.",
    bank: ["5%", "10%", "30%", "50%"],
    items: [
      {
        id: 1,
        before:
          "Public transport, such as rail and bus services, were generally less popular in New York and Sydney. Both rail and bus had a share of approximately ",
        after:
          " for the modes of transport given for New York. This figure was even lower in Sydney where these two forms of transport had about a",
        answers: ["10%"],
      },
      {
        id: 2,
        before: " ",
        after:
          " share each. This is a significant contrast to Hong Kong where public transport was the most popular mode of transport used (at",
        answers: ["5%"],
      },
      {
        id: 3,
        before: " ",
        after: " and just over",
        answers: ["30%"],
      },
      {
        id: 4,
        before: " ",
        after: " respectively).",
        answers: ["50%"],
      },
    ],
  },
  asiaTable: {
    badge: "6",
    title: "City transport mode shares in Asia, 2012",
    instruction:
      "Look at the table below. Make notes with a partner on what you could include in both the introduction and summary overview.",
    headers: ["", "Beijing", "Delhi", "Seoul"],
    rows: [
      ["Private transport", "33%", "23%", "23%"],
      ["Rail", "17%", "4%", "38%"],
      ["Bus", "27%", "27%", "27%"],
      ["Walk", "1%", "35%", "3%"],
      ["Taxi", "6%", "0%", "5%"],
      ["Cycle", "14%", "1%", "1%"],
      ["Other", "2%", "5%", "3%"],
    ],
    tip: "Introduction: share of transport forms in three cities in Asia, 2012, categories, %. Overview: Road transport (private + bus) popular in all three; otherwise varied.",
  },
  errors: {
    badge: "7",
    instruction:
      "Match the types of mistakes below with the underlined sections of the sentences.",
    types: [
      "adverb placement",
      "article use",
      "incorrect preposition",
      "passive formation",
      "spelling",
      "subject/verb agreement",
      "tense formation",
      "word formation",
    ],
    items: [
      {
        id: 1,
        text: "Private transport, rail transport and taking the bus was generally popular in all three cities, with the except of Delhi, where rail travel was not so popular.",
        tip: "subject/verb agreement (was→were); word formation (except→exception)",
      },
      {
        id: 2,
        text: "Rather, travelling on foot especially was popular in Delhi (with around a 35% share in travellers).",
        tip: "adverb placement",
      },
      {
        id: 3,
        text: "In these cities, between 23% and 30% of people are using private means of transport such as the cars.",
        tip: "tense; article use",
      },
      {
        id: 4,
        text: "Conversely, taking a taxi was relatively unpopular on all three cities.",
        tip: "incorrect preposition (on→in)",
      },
      {
        id: 5,
        text: "Taxis had a maximum of 6% total transport shaire.",
        tip: "spelling (shaire→share)",
      },
      {
        id: 6,
        text: "Cycling be found to be quite a popular mode of transport in Beijing.",
        tip: "passive formation (be found→was found / has been found)",
      },
    ],
  },
  write: {
    badge: "8a",
    expert: "EXPERT WRITING page 197",
    instruction:
      "Write your report for the table in Exercise 6. Write at least 150 words. When you have finished, check your work for meaning and grammatical accuracy.",
    model: `The table shows the percentage share of different forms of transport in three cities in Asia in 2012. The cities presented are Beijing, Delhi and Seoul. The data is grouped into seven categories representing different transport modes, such as private transport, various modes of public transport, for example bus and travelling on foot. There is significant variation among many of the figures for each country.

Private transportation and travelling by bus were popular forms for all three countries. Private transport had a 33% share in Beijing and a 23% share in both Delhi and Seoul, whereas 27% of the share for each of the three countries was given for travelling by bus.

The remaining categories showed more variation. While walking was very common in Delhi (with a 35% share), it was not so common in Seoul (3%) or Beijing (1%). Similarly, rail transport was a very popular mode of transport in Seoul (38%), but less so in Beijing (17%) and Delhi (4%). Cycling was more common in Beijing (14%) than the other two countries. Taxis and other forms of transport did not take a very significant share in any of these countries, nor did the 'Other' category.

Overall, it can be seen that private transport and rail travel were the most popular forms of transport in all the three cities, whilst apart from people walking in Delhi, the other categories were far less common.`,
  },
};
