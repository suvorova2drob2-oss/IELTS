export const READ_M7B_STEPS = [
  "1 Before you read",
  "2a Strategies",
  "3 Matching + summary",
  "4 Discussion",
] as const;

export const READ_M7B_NEXT = [
  "2a Strategies →",
  "3 Exam →",
  "4 Discussion →",
  "← К модулю",
] as const;

export const readingM7b = {
  id: "reading-m7b-flow",
  bookPages: "pp. 114–115 in your coursebook",
  sectionTitle: "Reading · Matching sentence endings; Summary completion",
  title: "If autonomous vehicles rule the world",
  subtitle:
    "Self-driving cars promise to be as disruptive and transformative a technology as the mobile phone.",
  passage: [
    {
      id: "1",
      text: `The world's automobile manufacturers envisage the future of self-driving technology as features like "piloted driving". Initially such driver assistance will be installed in luxury vehicles but will gradually become a common feature of mass-market cars, just as electric windows and power steering had done beforehand. Autonomous driving will, from this viewpoint, make motoring less stressful but people will still buy and own cars much as they do today.`,
    },
    {
      id: "2",
      text: `However, a visit to a "pod parking" area at Heathrow airport gives a contrasting view of self-driving technology. Transfers between the car park and the terminal are provided by driverless electric pods moving on dedicated elevated roadways. Using a touch-screen kiosk, a pod is summoned and your destination specified; a pod pulls up, parks itself and drives you to your destination, avoiding other pods and neatly parking itself on arrival.`,
    },
    {
      id: "3",
      text: `The spread of Advanced Driver Assistance Systems will be gradual over the next few years but self-driving vehicles that can be summoned and dismissed at will, such as the ones described above, could do more than make driving easier: they promise to redefine urban life as we know it, making existing cars suddenly appear as outmoded as steam engines and landline telephones. Like the very first motor cars, which facilitated suburbanisation and became symbols of self-definition, a driverless means of transport will also have unexpected impacts. Cars need look nothing like existing ones: already, Google's futuristic pods are on the public roads of California and some concept designs, liberated from the need to have steering wheels and pedals, have seats facing each other around a table.`,
    },
    {
      id: "4",
      text: `Autonomous vehicles will also challenge the very notion of car ownership. The idea that they will be owned and used just as cars are today is a "tenuous assumption", according to Luis Martinez, of the International Transport Forum. Fleets of self-driving vehicles could, he says, replace all car, taxi and bus trips in a city, providing the same level of mobility with far fewer vehicles and reducing urban vehicle numbers by as much as 90%. With cars in constant use, much less parking space would be needed and by liberating space wasted on parking, autonomous vehicles could allow more people to live in city centres.`,
    },
    {
      id: "5",
      text: `All of this would be transformational for car makers, who would be in a situation where rather than selling autonomous vehicles to individual drivers they would be selling them to fleet operators. The value in car making would shift from the hardware to software and from products to services, says Mr Martinez. This would have the same negative impact on existing car makers that smartphones had on Nokia and Kodak. Already, hi-tech newcomers such as Google, Uber and Tesla are vying for control of the new technology. Car insurance worth $198 billion a year in America alone is also likely to experience major upheavals as cover switches from millions of consumers to a mere handful of fleet operators. Automation would be far from popular news too for firms selling spare parts and taxi drivers, among others. For example, America's 3.5 million truck-drivers sustain workers in businesses such as motels and restaurants, which will be in jeopardy now the first self-driving truck has taken to the road.`,
    },
    {
      id: "6",
      text: `But self-driving cars would also have enormous benefits. According to the World Health Organization, approximately 1.2 million people are killed on the road each year with 94% of road accidents reputedly being the result of human error, the main causes being drink-driving, speeding and distracted driving. However, as driverless cars cannot drink alcohol, break the speed limit or get distracted by a text message, accidents should be dramatically reduced, if not eradicated. In fact, once self-driving cars do become more widely available, it is highly likely that some places will consider banning ordinary cars on the grounds of safety.`,
    },
    {
      id: "7",
      text: `As well as being far less dangerous, self-driving vehicles would make traffic flow more smoothly because they would not brake erratically, could be routed to avoid congestion and could travel closer together in order to increase the volume of traffic on the road. In addition, riders in these vehicles would be able to use their journey more effectively. Financial services company Morgan Stanley calculates that the resulting productivity gains could be worth an incredible $5.6 trillion worldwide. Moreover, as illustrated in one of Google's videos showing a blind man doing errands in an autonomous car, self-sufficiency would be within the reach of children, the elderly and the disabled.`,
    },
    {
      id: "8",
      text: `Some car-lovers will doubtless mourn the passing of machines that, in the 20th century, became icons of self-determination. But this independence is purely illusory: the empty roads seen in car adverts are far from most people's experience of driving. Ironically, in a driverless future, people will doubtless be incredulous as to why such a high rate of road deaths was tolerated for so long and why so much money was spent on machines that largely sat unused.`,
    },
  ],
  beforeYouRead: {
    badge: "1",
    instruction: "Discuss the questions.",
    questions: [
      "How might technology affect transport in the future?",
      "In what ways will cars differ from the ones we have today? Do you think they will ever become truly autonomous? If they do, how could this help us?",
    ],
  },
  strategies: {
    badge: "2a",
    instruction:
      "Which of these strategies can help you with the following tasks: a) matching sentence endings b) summary completion c) both?",
    items: [
      {
        id: 1,
        text: "reading the subtitle and skimming the passage quickly looking for topic sentences",
        key: "C",
      },
      { id: 2, text: "predicting what comes next", key: "A" },
      {
        id: 3,
        text: "using clues to find the relevant place in the passage",
        key: "C",
      },
      { id: 4, text: "scanning the passage", key: "C" },
      { id: 5, text: "looking for paraphrases", key: "C" },
    ],
    options: [
      { id: "A", text: "a) matching sentence endings" },
      { id: "B", text: "b) summary completion" },
      { id: "C", text: "c) both" },
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
        text: "According to car makers, self-driving vehicles",
        key: "D",
      },
      {
        id: 2,
        text: "If Google's prototypes are typical, the design of futuristic cars",
        key: "F",
      },
      {
        id: 3,
        text: "Having fewer private cars in urban centres",
        key: "G",
      },
      {
        id: 4,
        text: "Car manufacturers of the future",
        key: "E",
      },
      {
        id: 5,
        text: "The impact of a move towards driverless cars",
        key: "B",
      },
    ],
    endings: [
      {
        id: "A",
        text: "will create opportunities for the new giants of the technology world.",
      },
      {
        id: "B",
        text: "will be disruptive for some businesses.",
      },
      {
        id: "C",
        text: "will involve a restriction on people's personal freedom.",
      },
      {
        id: "D",
        text: "will be introduced at the high-end of the market.",
      },
      {
        id: "E",
        text: "will need to prioritise computer programmes over machinery and equipment.",
      },
      {
        id: "F",
        text: "will probably bear little resemblance to the models we know today.",
      },
      {
        id: "G",
        text: "will enable a higher number of new homes to be built.",
      },
    ],
  },
  summary: {
    badge: "6–10",
    instruction:
      "Complete the summary using the list of words, A–I, below.",
    title: "The advantages of self-driving cars",
    before6:
      "One major advantage of driverless cars would be far fewer",
    after6:
      "on the road. It is probable that when autonomous cars become more common, there will be",
    after7:
      "which will discourage cars with drivers from using the roads at all. A further advantage is that road",
    after8:
      "would increase and delays decrease as it became less crucial for cars to keep so much distance between them. The",
    after9:
      "would also gain from increased output as commuters make constructive use of the time they previously spent sitting behind the wheel. Finally, autonomous cars would facilitate a greater degree of",
    after10: "for vulnerable members of society.",
    gaps: [
      { id: 6, key: "E" },
      { id: 7, key: "G" },
      { id: 8, key: "A" },
      { id: 9, key: "I" },
      { id: 10, key: "D" },
    ],
    bank: [
      { id: "A", text: "capacity" },
      { id: "B", text: "car manufacturers" },
      { id: "C", text: "vehicles" },
      { id: "D", text: "independence" },
      { id: "E", text: "casualties" },
      { id: "F", text: "speed" },
      { id: "G", text: "regulations" },
      { id: "H", text: "protection" },
      { id: "I", text: "economy" },
    ],
  },
  discussion: {
    badge: "4",
    instruction: "Work in groups and discuss the questions.",
    questions: [
      "In which ways has technology influenced transport in the last 50 years?",
      "Do you think most people would want to share the road with robots? Why / Why not?",
      "What potential problems might arise from the use of completely autonomous cars?",
    ],
  },
};
