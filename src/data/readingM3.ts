import bannerImg from "../assets/read-m3-nature-banner.png";

export const READ_M3_STEPS = [
  "1 Before you read",
  "2a Main idea",
  "2b Heading",
  "3 Exam task",
  "4 Task analysis",
  "5 Discussion",
] as const;

export const READ_M3_NEXT = [
  "2a Main idea →",
  "2b Heading →",
  "3 Exam →",
  "4 Analysis →",
  "5 Discussion →",
  "← К модулю",
] as const;

export const readingM3 = {
  id: "reading-m3-flow",
  bookPages: "pp. 40–41 in your coursebook",
  sectionTitle: "Reading · Matching headings; Multiple choice",
  title: "Prescribing nature",
  subtitle:
    "Exciting new research shows how we can fight disease and improve mental health.",
  banner: bannerImg,
  passage: [
    {
      id: "A",
      text: `Humans are hard-wired to be hunter-gatherers, an instinct so deep-rooted that we still feel a strong bond with nature; hunter-gatherers would also have had a clear purpose in life, and been responsible for set tasks upon which the community, who would have supported them, relied. In contrast, an inevitable consequence of the advances in industrialization and technology is a more sedentary and isolated life, where the average person spends more time on their computer or in their vehicle than they do in the outdoors, leading many people – including the unemployed, stay-at-home mothers or the elderly – to feel increasingly lonely, undervalued and stressed. In addition, the number of people on Earth living in urban settings is expected to rise to about 70 percent in the next three decades, bringing with it yet more artificial noise, air pollution and traffic. All of these factors will undoubtedly be a threat to both physical and psychological well-being and although the human body will eventually adapt to its changed circumstances, many people would agree with Paracelsus, the 16th-century German-Swiss physician, who wrote, ‘The art of healing comes from nature, not from the physician,’ a claim based less on science than on intuition but which has nevertheless been a pervasive sentiment throughout the ages.`,
    },
    {
      id: "B",
      text: `Health professionals have long expressed concern about the potential effects of chronic stress, which can lead to diabetes, obesity, depression, dementia and heart disease in two distinct ways. First, under stress we change our behaviour: we start to crave sugar and fat, we are too tired to exercise and we may indulge in bad habits such as smoking or alcohol. The second way in which we are affected is more direct. The hormone cortisol is released: this causes toxic fat to be laid down in our stomachs, which in turn may result in a malfunction of the bacterium present in our cells, known as mitochondria. This means we become more prone to disease and start to age more quickly.`,
    },
    {
      id: "C",
      text: `In recent years, as a result of the sharp rise in widespread health issues such as depression, obesity and nearsightedness, scientists have begun to investigate more closely the effects of nature on our physical and psychological state. Developments in neuroscience and psychology have meant that what once appeared solely intuitive can now be quantified; several research studies confirm that being surrounded by trees and flowers positively impacts on people’s well-being. A team of Dutch researchers also found a lower incidence of 15 diseases, including stress and depression, in those who lived near a green space, and in a series of landmark studies in Chicago, it was found that residents living in large tower blocks surrounded by gardens were more likely to know and support their neighbours and experience less crime than those who overlooked concrete. In addition, being able to look out onto trees rather than concrete is believed to lead to increased concentration from office workers, a faster recovery for hospital patients, who also required less pain relief, a lower incidence of illness amongst inmates in prison cells and less bullying in playgrounds.`,
    },
    {
      id: "D",
      text: `Studies such as these make it clear that one of our main priorities in the modern world should be to make exposure to the outdoors an essential feature of healthcare, education, planning and community development. Inspiring initiatives are already underway, including tree planting, schemes which encourage people to walk or cycle and inventive ways to get children more involved in outdoor pursuits. A less widespread, but more innovative, approach empowers doctors to ‘prescribe nature’ to those requiring medical treatment, in the hope that this will help stem an increase in the prevalence of stress, chronic diseases and mental health issues; several pioneering schemes encourage patients and their families to visit nearby parks, providing them with transportation and programmes to follow, such as outdoor conservation work or ‘health walks’. In Finland, a country which has high rates of depression, nature experiences have become part of government health policy, with people being recommended to spend five hours a month engaged in walking, mindfulness and reflection. We may never know the precise relationship between nature and health and perhaps it is irrelevant but we do know how nature makes us feel and the challenge is now to incorporate this into every aspect of our daily lives.`,
    },
  ],
  beforeYouRead: {
    badge: "1",
    heading: "Before you read",
    instruction: "Work in pairs and discuss the questions.",
    questions: [
      "In what ways, if any, do you think people’s lives are more stressful now than they were in the past?",
      "In what ways can stress affect people’s lives?",
    ],
  },
  mainIdea: {
    badge: "2a",
    heading: "Identify the main idea",
    instruction: "Answer the questions.",
    q1: "Read the title and subtitle of the passage. What do you think the article will be about?",
    q2: "Skim paragraph A and underline the topic sentence. How is the rest of the paragraph structured?",
    topicSentence:
      "Humans are hard-wired to be hunter-gatherers, an instinct so deep-rooted that we still feel a strong bond with nature…",
    structureTip:
      "Topic sentence → contrast with modern industrial life → urbanisation → threat to well-being → Paracelsus quotation.",
    q3: "Choose the best summary (A, B or C) for the paragraph.",
    options: [
      { id: "A", text: "The importance of nature throughout history" },
      { id: "B", text: "The impact of change on people’s lifestyles" },
      { id: "C", text: "A comparison of town and country life" },
    ],
    key: "B",
  },
  matchHeading: {
    badge: "2b",
    instruction:
      "Look at the list of headings in the test task below and choose the one which best matches the summary you chose in Exercise 2a.",
    key: "iii",
  },
  headings: [
    { id: "i", text: "Approaches to increasing young people’s level of fitness" },
    {
      id: "ii",
      text: "Projects which form a connection with the natural world",
    },
    {
      id: "iii",
      text: "The high price being paid for progress in modern times",
    },
    {
      id: "iv",
      text: "The effect of too much pressure on people’s well-being",
    },
    {
      id: "v",
      text: "Evidence for the value of strengthening links with nature",
    },
    {
      id: "vi",
      text: "Exploiting a country’s natural resources to its advantage",
    },
    {
      id: "vii",
      text: "Positive outcomes of woodland therapy on global health and fitness",
    },
  ],
  exam: {
    badge: "3",
    heading: "Test practice",
    strategies: "TEST STRATEGIES pages 171 and 172",
    headingsInstr:
      "The reading passage has four paragraphs, A–D. Choose the correct heading for each paragraph from the list below. Write the correct number, i–vii.",
    paragraphKeys: {
      A: "iii",
      B: "iv",
      C: "vii",
      D: "ii",
    } as Record<string, string>,
    mcInstr:
      "Choose TWO letters, A–E. The list below contains some possible statements about health and environment. Which TWO of these statements are made by the writer of the passage?",
    mcOptions: [
      {
        id: "A",
        text: "Individuals are programmed to want to live and work with other people.",
      },
      {
        id: "B",
        text: "Scientists believe that city living will always have a negative influence on our physical well-being.",
      },
      {
        id: "C",
        text: "Research in the USA has prompted town planners to surround new buildings with green spaces.",
      },
      {
        id: "D",
        text: "Studies confirm that prisoners are healthier if they are permitted to go outdoors.",
      },
      {
        id: "E",
        text: "It is not yet common practice for a doctor to recommend outdoor activities to their patients.",
      },
    ],
    mcKeys: ["A", "E"] as const,
  },
  analysis: {
    badge: "4a",
    heading: "Task analysis",
    instruction:
      "Which of these strategies refer to a) matching headings b) multiple choice: selecting two answers c) both?",
    items: [
      {
        id: 1,
        text: "I summarised the paragraphs in my own words first.",
        key: "a",
      },
      {
        id: 2,
        text: "I highlighted key words in the task to help me find the correct place in the passage.",
        key: "c",
      },
      {
        id: 3,
        text: "I focused on the main idea in each paragraph.",
        key: "a",
      },
      {
        id: 4,
        text: "I scanned the passage to find where the information was located.",
        key: "b",
      },
    ],
    b: {
      badge: "4b",
      instruction:
        "Which strategies did you use? Which did you find useful?",
    },
  },
  discussion: {
    badge: "5",
    heading: "Discussion",
    instruction:
      "Work in groups and discuss the questions. Give reasons for your answers.",
    questions: [
      "In what ways can being in the countryside help people to feel better? Which outdoor activities would you recommend?",
      "What are the advantages and disadvantages of living in the city and the countryside?",
      "What aspects of modern life can cause stress? What strategies are useful for managing it?",
    ],
    suggestedTitle: "Suggested answer",
    suggestedAnswer: [
      "Being in the countryside can help people feel better because the air is cleaner, noise levels are lower, and green spaces have a calming effect. I'd recommend walking, cycling, or simply sitting outside — activities that let you slow down and notice nature rather than rushing through a schedule.",
      "Cities offer convenience: better transport, more jobs, and richer cultural life. However, they can feel crowded, expensive, and stressful. The countryside is quieter and often healthier, but access to services and employment can be limited, and some people find it isolating.",
      "Modern life creates stress through long working hours, constant digital notifications, financial pressure, and the feeling that we must always be productive. Useful strategies include regular exercise, setting boundaries on phone use, talking problems through with friends, and making time for hobbies that are genuinely relaxing.",
    ],
  },
};

export type ReadingM3Data = typeof readingM3;
