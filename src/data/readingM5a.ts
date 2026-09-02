export const READ_M5A_STEPS = [
  "1 Before you read",
  "2 Skim title",
  "3 Reference words",
  "4 Matching features",
  "5 Note completion",
  "6 Discussion",
] as const;

export const READ_M5A_NEXT = [
  "2 Skim title →",
  "3 Reference words →",
  "4 Matching →",
  "5 Notes →",
  "6 Discussion →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ");
}

export function checkReadM5a(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export const readingM5a = {
  id: "reading-m5a-flow",
  bookPages: "pp. 72–73 in your coursebook",
  sectionTitle: "Reading · Matching features; Note completion",
  title: "How robots are poised to take over our homes",
  subtitle:
    "A robot revolution has been predicted for years — but are we really on the verge of a new era?",
  passage: [
    {
      id: "1",
      text: `Robots are starting to change the way we live but not in the way that scientists predicted 50 or even 10 years ago. At a time when some technologists are worrying about the threat of killer robots being used on the battlefield, the coming wave of domestic robots are much more tame, or even mundane. Rather than having androids marching into our kitchens and living rooms, automation is stealthily entering our homes via appliances and security systems.`,
    },
    {
      id: "2",
      text: `Defining what exactly a robot is, however, remains a controversial topic even among those who design and develop them. "A huge variety of items in our homes or cars exhibit robotic behaviour — we just do not think of them as such because we have this vision of a humanoid robot," says Jen McCabe, director of electronics at manufacturer Flex's Innovation Unit which developed the self-learning thermostat control device, Nest. "The robotic movement of Nest is behind the thermostat. Just because it is not visible does not make it any less robotic."`,
    },
    {
      id: "3",
      text: `The Nest thermostat, purchased by Google for $3bn last year, predicts when and how to set the temperature in the house, helping to save energy and ensure it is comfortable for family members. It connects with its home security cameras to determine when to switch itself on and off. In addition to this, there are certain makes of cars which inform the heating system of the driver's imminent arrival so that it can increase the temperature. Other companies are pursuing similar goals. Amazon's Echo, for instance, is an internet-connected music system that responds to the owner's voice. In this way, the Echo can be used to turn on and off wifi-enabled light bulbs and electrical switches, not with mechanical arms but by putting itself at the centre of a wireless network of connected devices. This operates as a personal assistant would, playing whatever music is requested of it, creating shopping lists and providing information about sports scores.`,
    },
    {
      id: "4",
      text: `However, while the addition of wireless connectivity has brought a semblance of intelligence to our thermostats and light bulbs, using, installing and managing all these new devices remains a challenge. Even Colin Angle, the manager of the robotics company iRobot, says he struggles to corral the automatons in his home. He is frustrated with the expensive home automation system he has installed there; the heating cannot keep up with his oft-changing schedule and maintenance visits are required all too frequently. "There is an enormous amount of experimentation underway with wireless connectivity but it is largely unsuccessful."`,
    },
    {
      id: "5",
      text: `In 2006, Bill Gates promised a future in which "robotic devices will become a nearly ubiquitous part of our day-to-day lives", thanks to advances in sensors, motors and processing power. Years later, Jeremy Conrad, an investor in early-stage hardware start-ups, observes that although automation and robotisation are major trends at present, it is not necessarily for the reasons that Gates predicted; the change is not in the core technology. Because sensors and other components are being widely used in smartphones and other mass-market devices, the costs are diminishing for other applications too. This means that a "smart" device connected to an existing home wifi network is much more accessible and more competitively priced than a professional home automation system. He believes that the degree of success for the next generation of robots will depend on how specialised they are. "They must work every time and be absolutely dependable."`,
    },
    {
      id: "6",
      text: `This was the approach adopted by iRobot when it released its first autonomous vacuum cleaner, Roomba, thirteen years ago. Advances in computer vision and machine-learning technology now mean that the machines are capable of creating a digital map of our homes with assistance from low-cost cameras. As a result, their navigational skills will enable them to track where they have and have not yet cleaned. However, for some in the robotics industry these kinds of ventures are not sufficiently ambitious. Cynthia Breazeal, pioneer of social robotics at MIT's Media Lab, promises that her latest creation, Jibo, will not only be able to see, hear and speak but also relay messages between family members and make helpful suggestions and reminders. When released, it will have its own character that, she claims, will recognise users and understand speech. Such traits will differentiate it from smartphones because the secret is not powerful processors or better sensors but emotion, which, she maintains, should be the obvious subsequent development of this humanised engagement with technology.`,
    },
  ],
  beforeYouRead: {
    badge: "1",
    instruction: "Work in groups and discuss the questions.",
    questions: [
      "Who does most of the housework in your house? Which chores do you dislike doing? Which chores would you like a robot to do? Why?",
      "In what ways are robots used in the modern world? What limitations do they have?",
    ],
  },
  skim: {
    badge: "2",
    instruction:
      "Read the title and subtitle of the reading passage. Predict what the reading passage will be about. Skim the passage to get an idea of its content and structure. Which of the scientists is working on a different kind of robot?",
    tip: "Cynthia Breazeal (social / interactive companion robots such as Jibo).",
  },
  reference: {
    badge: "3",
    instruction:
      "Look at paragraphs 4–5 (or the sections about Nest and Echo). What do the reference words and phrases refer to? Match each reference with what it means.",
    tip: "Reference chains typically point to robots, items, Nest, the house, security cameras, cars, the thermostat, the Echo system, and so on.",
    items: [
      {
        id: 1,
        text: "What kind of language helps you follow who or what is being discussed across sentences?",
        tip: "words and phrases (reference words)",
      },
    ],
  },
  matchingFeatures: {
    badge: "4",
    strategies: "TEST STRATEGIES pages 170 and 172",
    instruction:
      "Look at the following statements (Questions 1–5) and the list of people below. Match each statement with the correct person, A–D. You may use any letter more than once.",
    people: [
      { id: "A", name: "Cynthia Breazeal" },
      { id: "B", name: "Jen McCabe" },
      { id: "C", name: "Colin Angle" },
      { id: "D", name: "Jeremy Conrad" },
    ],
    items: [
      {
        id: 1,
        text: "The next stage in robotic technology is for robots to become interactive companions.",
        key: "A",
      },
      {
        id: 2,
        text: "A positive outcome for robots of the future would be expertise and reliability in specific tasks.",
        key: "D",
      },
      {
        id: 3,
        text: "Robotic technology in the home is currently complicated to operate.",
        key: "C",
      },
      {
        id: 4,
        text: "The fact that some current household products have a robotic action is not always apparent.",
        key: "B",
      },
      {
        id: 5,
        text: "An approach which applies available technology to new products is beneficial.",
        key: "D",
      },
    ],
  },
  notes: {
    badge: "5",
    strategies: "TEST STRATEGIES page 170",
    instruction:
      "Complete the notes below. Choose NO MORE THAN TWO WORDS from the passage for each answer.",
    title: "The new wave of household technology",
    gaps: [
      {
        id: 6,
        before: "Nest thermostat communicates with: ",
        after: " at house and some ",
        answers: ["security cameras"],
      },
      {
        id: 7,
        before: "",
        after: "",
        answers: ["cars"],
      },
      {
        id: 8,
        before: "Echo functions like a ",
        after: " i.e. obeys spoken instructions",
        answers: ["personal assistant"],
      },
      {
        id: 9,
        before: "Roomba's ",
        after: " facilitated by map-making ability",
        answers: ["navigational skills"],
      },
    ],
  },
  discussion: {
    badge: "6",
    instruction: "Discuss the questions, giving reasons.",
    questions: [
      "What do you think of science-fiction films? Have you seen any which feature robots? If so, which ones?",
      "It is predicted that humanoid robots 'with a heart', which have already been introduced into some households in Japan, will soon become popular, in the same way as pets are in many places. How likely is it that they would become popular in your country?",
      "If humanoid robots were introduced into care homes for older people, what tasks might they be able to undertake? What might be the benefits and drawbacks of having such robots?",
    ],
    suggestedTitle: "Suggested answer",
    suggestedAnswer: [
      "I enjoy science-fiction films when they explore ethical dilemmas rather than just action. I've seen films featuring robots such as Ex Machina and Wall-E, which raise questions about consciousness and dependence on technology.",
      "In my country, companion robots might appeal to some elderly people living alone, but I doubt they would become as popular as pets. Many families still prefer real animals or human contact, and the cost could limit adoption.",
      "Robots could remind residents to take medicine, serve meals, or provide basic conversation. Benefits include round-the-clock support and reduced loneliness; drawbacks include loss of human warmth, high maintenance costs, and concerns about privacy and reliability.",
    ],
  },
  analyse: {
    tip: "For note completion: check how many words to write and that they are spelt correctly.",
  },
};
