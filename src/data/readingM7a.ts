export const READ_M7A_STEPS = [
  "1 Before you read",
  "2a–2b Paraphrase",
  "3 Matching endings",
  "4 Summary",
  "5 Discussion",
] as const;

export const READ_M7A_NEXT = [
  "2a–2b Paraphrase →",
  "3 Matching →",
  "4 Summary →",
  "5 Discussion →",
  "← К модулю",
] as const;

export const readingM7a = {
  id: "reading-m7a-flow",
  bookPages: "pp. 104–105 in your coursebook",
  sectionTitle: "Reading · Matching sentence endings; Summary completion",
  title: "Streetwise",
  subtitle:
    "Closing city streets to cars — from Bogotá's Ciclovía to India's Raahgiri Day — is reshaping urban life.",
  passage: [
    {
      id: "1",
      text: `Gurgaon, a city in northern India, has become ubiquitously associated with Raahgiri ("reclaim your streets") ever since its inception. In 2013, it first closed 4.5 km of city streets to vehicles every Sunday in order to make them available to approximately 60,000 weekly revellers who now pack Gurgaon's streets: playing, walking and riding bicycles. Raahgiri has become a ground-breaking event in India, raising awareness about the benefits of non-motorised transport, and is also a model community occurrence to which other Indian cities can aspire.`,
    },
    {
      id: "2",
      text: `During the preliminary stages of discussions on ways to resolve Gurgaon's traffic chaos and congestion, Amit Bhatt of EMBARQ, a green think-tank, advocated a focus on how to move people around rather than on the expansion of a vehicle-friendly system. However, from the outset, convincing officials of the effectiveness of this approach proved to be somewhat challenging: "This won't work here," one told Mr Bhatt when he proposed the Raahgiri and other alternatives to make Gurgaon's streets more pedestrian-friendly. Bhatt persisted in trying to convince them and finally succeeded after 200 schoolchildren cycled up to the city administration's headquarters to demonstrate public support.`,
    },
    {
      id: "3",
      text: `The inspiration for Bhatt's idea stemmed from hearing about Bogotá's "Ciclovía," during which Colombia's capital closes 120 km of streets on Sundays and holidays. It was spearheaded by Gil Penalosa, the former parks commissioner in Bogotá, who describes the implementation of the Ciclovía Project as "a major initiative to encourage large numbers of the population to become more active and physically fit." Indeed, in a 2009 survey it was revealed that 42% of adults did as much exercise during Bogotá Ciclovía as the World Health Organization recommends in a week. A further goal was to create an urban centre where "thousands of people of all ages, levels of ability and ethnic, economic or social backgrounds enjoy the presence of each other and feel a sense of belonging." In the same way, Gurgaon, dominated by condominiums and extensive segregated private properties, uses Raahgiri Day to promote integration and provide residents with an opportunity to connect with other people in the area.`,
    },
    {
      id: "4",
      text: `The International Transport Forum predicts that by 2050 the world's roads will be required to cope with 2.5 billion cars, three times as many as today, in urban areas which are already chronically overcrowded. In the face of growing concern, proposals have been submitted by transport planners to help resolve the issue: plans include converting city centres into pedestrian precincts, closing roads to cars at weekends and charging motorists a fee to take a car into town centres. Improvements to the public transport system including rapid bus lanes and subways have also played their part. However, it is the implementation of new regulations and measures to encourage safer and slower driving which has led to a significant proportion of people opting to walk or cycle in preference to using public transport or their own cars. Since some cities have started to prioritise pedestrians and cyclists over motorists, it has made them healthier and more enjoyable places to live in. Cost-benefit analyses for planned investment in new walking and cycling pathways have included a value for lives saved by the reduction in accidents and all lives prolonged through increased physical activity.`,
    },
    {
      id: "5",
      text: `Cyclists and motorists have always resented sharing the road. Casey Neistat, a New York cyclist who was made to pay a $50 penalty for not riding in a cycle lane, produced a film of himself crashing into some of the thoughtlessly parked cars that so often make using the cycle lanes an impossibility. For cycling, Amsterdam sets the pace, with over half its residents using their bikes daily. Now other cities including London, New York and Paris are following in its footsteps, expanding their bike-share schemes and building new cycle lanes, some on quiet roads with more stringent speed limits implemented for cars, others running through central areas which separate cyclists from motorised traffic. Such schemes are particularly popular with women, who, transport planners say, are more apprehensive than men when it comes to sharing roads with roaring traffic and typically make up less than a quarter of urban cyclists. With the construction of an 80 km network of separated two-way cycle lanes, their share of bicycle trips in the Spanish city of Seville rose from nearly zero to 7%. In Taipei, very few women cycled before the introduction of its YouBike share scheme which started six years ago: now around half of the city's cyclists are women.`,
    },
    {
      id: "6",
      text: `It is all part of a movement which is accelerating around the world, providing opportunities for people to walk, cycle and play on their city streets. Activists are working hard to ensure past city planning mistakes are not repeated by lobbying for safe walking and cycling routes.`,
    },
  ],
  beforeYouRead: {
    badge: "1",
    instruction: "What are the advantages and disadvantages of living in an urban environment?",
    questions: [
      "What are the advantages and disadvantages of living in an urban environment?",
    ],
    tip: "Advantages: convenience, entertainment (shops, restaurants, cinemas, etc.), contact with people. Disadvantages: noise, pollution, traffic, lack of/expensive housing.",
  },
  linkIdeas: {
    badge: "2a",
    instruction:
      "Look at the highlighted words in Question 1 of the test task and use them to locate the section of the passage which will give you the answer. Which of these options is the best summary of the section? Then: which ending (A–G) is most similar? (Key: summary 2 → ending C.)",
    options: [
      {
        id: "1",
        text: "Bhatt was keen to continue with his project so that young people could benefit from travelling by bike.",
      },
      {
        id: "2",
        text: "Bhatt found it difficult to get his ideas accepted at first but he succeeded in the end.",
      },
      {
        id: "3",
        text: "Bhatt wanted to solve Gurgaon's traffic problem by banning cars permanently from the city centre.",
      },
    ],
    tip: "Option 2 is the best summary. Ending C matches: had to deal with initial [outset] resistance [challenging] from the local authorities [officials].",
  },
  paraphrase: {
    badge: "2a",
    instruction:
      "Look at the highlighted words in Question 1 of the test task and use them to locate the section of the passage which will give you the answer. Which of these options is the best summary of the section?",
    options: [
      {
        id: "1",
        text: "Bhatt was keen to continue with his project so that young people could benefit from travelling by bike.",
      },
      {
        id: "2",
        text: "Bhatt found it difficult to get his ideas accepted at first but he succeeded in the end.",
      },
      {
        id: "3",
        text: "Bhatt wanted to solve Gurgaon's traffic problem by banning cars permanently from the city centre.",
      },
    ],
    key: "2",
    tip: "Option 2 is the best summary.",
    partB: {
      badge: "b",
      instruction:
        "Which of the endings in the test task (A–G) is most similar to your summary? Identify the paraphrases in the options which helped you.",
      key: "C",
      tip: "Option C; suggested: had to deal with initial [outset] resistance [challenging] from the local authorities [officials].",
    },
  },
  endings: {
    badge: "3",
    strategies: "TEST STRATEGIES pages 170 and 172",
    instruction:
      "Complete each sentence with the correct ending, A–G, below.",
    stems: [
      {
        id: 1,
        text: "Amit Bhatt eventually obtained support for Raahgiri Day even though he",
        key: "C",
      },
      {
        id: 2,
        text: "The concept for what became Raahgiri Day",
        key: "E",
      },
      {
        id: 3,
        text: "As well as the desire to improve people's health, Gil Penalosa",
        key: "D",
      },
      {
        id: 4,
        text: "Rather than having the stress of driving in the city, many people",
        key: "F",
      },
      {
        id: 5,
        text: "Casey Neistat was fined because he",
        key: "B",
      },
    ],
    options: [
      { id: "A", text: "drew attention to the dangers posed by motorists." },
      {
        id: "B",
        text: "ignored the rules of the road for pragmatic reasons.",
      },
      {
        id: "C",
        text: "had to deal with initial resistance from the local authorities.",
      },
      {
        id: "D",
        text: "hoped a traffic-free environment would develop a sense of community.",
      },
      {
        id: "E",
        text: "had roots in a similar project in a different part of the world.",
      },
      {
        id: "F",
        text: "would prefer to use an alternative method of transport.",
      },
      {
        id: "G",
        text: "chose not to leave home unnecessarily at busy times.",
      },
    ],
  },
  matching: {
    badge: "3",
    strategies: "TEST STRATEGIES pages 170 and 172",
    instruction:
      "Complete each sentence with the correct ending, A–G, below.",
    stems: [
      {
        id: 1,
        text: "Amit Bhatt eventually obtained support for Raahgiri Day even though he",
        key: "C",
      },
      {
        id: 2,
        text: "The concept for what became Raahgiri Day",
        key: "E",
      },
      {
        id: 3,
        text: "As well as the desire to improve people's health, Gil Penalosa",
        key: "D",
      },
      {
        id: 4,
        text: "Rather than having the stress of driving in the city, many people",
        key: "F",
      },
      {
        id: 5,
        text: "Casey Neistat was fined because he",
        key: "B",
      },
    ],
    endings: [
      { id: "A", text: "drew attention to the dangers posed by motorists." },
      {
        id: "B",
        text: "ignored the rules of the road for pragmatic reasons.",
      },
      {
        id: "C",
        text: "had to deal with initial resistance from the local authorities.",
      },
      {
        id: "D",
        text: "hoped a traffic-free environment would develop a sense of community.",
      },
      {
        id: "E",
        text: "had roots in a similar project in a different part of the world.",
      },
      {
        id: "F",
        text: "would prefer to use an alternative method of transport.",
      },
      {
        id: "G",
        text: "chose not to leave home unnecessarily at busy times.",
      },
    ],
  },
  summary: {
    badge: "4",
    strategies: "TEST STRATEGIES page 172",
    instruction:
      "Complete the summary using the list of words, A–I, below.",
    title: "Cars in the city",
    textBefore6:
      "The International Transport Forum is tackling the matter of traffic ",
    textBetween67:
      ", now an issue in many of the world's cities even before the expected three-fold rise in the number of vehicles. Disincentives, such as obligatory ",
    textBetween78:
      " for driving in the city and restrictions on the number of available parking spaces, are already encouraging people to leave their cars at home. However, the motivation for many people to change their commuting habits in and around the city is largely due to improvements aimed at ",
    textBetween89:
      " traffic. It is hoped that by providing funding for more bike share and bike lane schemes, the ",
    textAfter9: " of the average person will be extended.",
    after6:
      ", now an issue in many of the world's cities even before the expected three-fold rise in the number of vehicles. Disincentives, such as obligatory",
    after7:
      "for driving in the city and restrictions on the number of available parking spaces, are already encouraging people to leave their cars at home. However, the motivation for many people to change their commuting habits in and around the city is largely due to improvements aimed at",
    after8:
      "traffic. It is hoped that by providing funding for more bike share and bike lane schemes, the",
    after9: "of the average person will be extended.",
    gaps: [
      { id: 6, key: "D" },
      { id: 7, key: "H" },
      { id: 8, key: "G" },
      { id: 9, key: "I" },
    ],
    bank: [
      { id: "A", text: "permits" },
      { id: "B", text: "lifestyle" },
      { id: "C", text: "safety" },
      { id: "D", text: "congestion" },
      { id: "E", text: "collisions" },
      { id: "F", text: "assessing" },
      { id: "G", text: "calming" },
      { id: "H", text: "payment" },
      { id: "I", text: "lifespan" },
    ],
  },
  discussion: {
    badge: "5",
    instruction: "Discuss the questions.",
    questions: [
      "In what ways might it be a good idea to close a part of a city to traffic? Give examples of any places you know that do this and assess how successful it has been as an initiative.",
      "To what extent is cycling in cities potentially dangerous? What could be done to encourage more people to cycle and how could accidents be prevented?",
    ],
    suggestedTitle: "Suggested answer",
    suggestedAnswer: [
      "Closing streets to traffic can cut pollution and make walking safer and more pleasant. Cities such as Mexico City have introduced car-free days, and the initiative has generally been successful in raising awareness, though enforcement and public transport alternatives remain important.",
      "Cycling can be dangerous where roads are narrow and drivers are not used to sharing space with bikes. Protected cycle lanes, awareness campaigns, and lower speed limits could encourage more cyclists while reducing accidents.",
    ],
  },
};
