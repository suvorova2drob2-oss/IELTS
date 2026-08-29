export const READ_M4A_STEPS = [
  "1 Before you read",
  "2 Passage type",
  "3a Functions",
  "4a Matching",
  "5 Summary",
  "6 Discussion",
] as const;

export const READ_M4A_NEXT = [
  "2 Passage type →",
  "3a Functions →",
  "4a Matching →",
  "5 Summary →",
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

export function checkReadM4a(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export const readingM4a = {
  id: "reading-m4a-flow",
  bookPages: "pp. 56–57 in your coursebook",
  sectionTitle: "Reading · Matching information; Summary completion",
  title: "Re-thinking an extravagant world",
  passage: [
    {
      id: "A",
      text: `These days many people around the world enjoy an unprecedented level of prosperity. Yet this has come at a steep price: the creation of the so-called 'linear economy'. In other words, it is a "make-take and dispose" economy in which we extract natural resources, exploit them and then dispose of them as soon as a more up-to-date alternative becomes available. At the moment, the world's growth model squanders the majority of the resources which we procure. Research in the US and Europe on consumption habits has shown the frequency in which scarcely used resources are found discarded in landfills. In Germany for instance almost one third of household appliances disposed of in 2012 were still functioning, 89% of mobile devices in the US went straight to a landfill and in the UK, it is estimated that as many as 125 million phones languish in landfills, unused. Shamefully cars in Europe remain parked 92% of the time; planned obsolescence is how we live.`,
    },
    {
      id: "B",
      text: `Mass and conspicuous consumption, the burning of fossil fuels, the creation of dense urban habitats and increased ownership of cars can largely be attributed to the Industrial Revolution of the 18th and early 19th centuries and has created huge environmental and social problems. It not only endangers the natural world but will eventually have an adverse effect on our living standards; our economic productivity on a global level is being curbed by the rapid depletion of existing and readily accessible natural capital such as clean sources of potable water and forests. In a recent study it was found that perhaps 85% of Europe's soil has been degraded; mining for natural resources such as zinc has also become more expensive and the quality of the metal has diminished, making this practice even more energy inefficient. At the same time, it is expected that the global middle class will double by 2030, which means even higher consumption; we consume more as we earn more. This path is simply not sustainable; we cannot continue to grow as a species and live well without changing the way we operate.`,
    },
    {
      id: "C",
      text: `Many people are now considering how the global economy might function differently in order that more value can be extracted from existing resources; the thinkers behind these ideas have pioneered a new standard for how the world could be run: the 'circular economy'. The central aim of moving towards a circular economy is to improve resource productivity by keeping goods and resources in use for as long as possible, through recovery, reuse, repair, remanufacturing and recycling. It is therefore not so much about "doing more with less" but rather doing more with what we already have by solving the problem of low resource utilisation. The goal would be to allow wealth to increase while using less oil, minerals and other spoils of the Earth.`,
    },
    {
      id: "D",
      text: `On a smaller scale, schemes are being conceived by many companies to use resources more efficiently. The so-called "sharing economy" represents a real move forward with enterprises such as car-sharing, which may reduce the number of vehicles on the road or at least limit their growth, and renting out spare rooms. This concept of leasing resources is not new but it is one of the business models which could help decrease the use of materials in the longer term. If washing machines for example were rented, the makers of the products rather than consumers would be responsible for repair and replacement. This would significantly decrease the use of materials and might, one assumes, also trigger a change in the design which would enhance the focus on longevity. It is true that consumers already have well-established buying habits and that firms would encounter high costs when first establishing the new business models. But the benefits could outweigh the immediate barriers, if people could be convinced to change their mindsets.`,
    },
    {
      id: "E",
      text: `However, solutions within a single industry or company are not going to be sufficient, because the practice of leasing effectively ignores the needs of the overall system. Moreover, if we resolve the problem in such a piecemeal way, we risk causing a "rebound effect". That is, economic benefits gained in one area such as driving less being offset by all those savings being spent on another product or service. For all these reasons we need the collaborative approach embodied in the circular economy so that we can maximise the benefits of these new technologies.`,
    },
  ],
  beforeYouRead: {
    badge: "1",
    instruction: "Work in pairs and discuss the questions. Give reasons for your answers.",
    questions: [
      "What could be done to reduce waste in a) your country? b) the world?",
      "Who do you think should be responsible for helping to limit waste: the government, local councils, businesses, individuals? Why?",
    ],
  },
  passageType: {
    badge: "2",
    instruction:
      "Read the title and skim the first and last paragraphs of the reading passage. What kind of passage is it? How do you know?",
    options: [
      { id: "descriptive", label: "descriptive" },
      { id: "argumentative", label: "argumentative" },
      { id: "factual", label: "factual" },
    ],
    keys: ["argumentative", "factual"],
    tip: "A mixture of argumentative (e.g. Yet this has come at a steep price…) and factual statements.",
  },
  matchingInfo: {
    badge: "4a",
    strategies: "TEST STRATEGIES page 171",
    instruction:
      "The reading passage has FIVE paragraphs, A–E. Which section contains the following information? Write the correct letter, A–E. You may use any letter more than once.",
    items: [
      {
        id: 1,
        text: "A system in which resources would be exploited to their full potential through regeneration.",
        key: "C",
      },
      {
        id: 2,
        text: "A proposal to make manufacturers more accountable for the goods they produce.",
        key: "D",
      },
      {
        id: 3,
        text: "The cause of a wasteful approach to living.",
        key: "A",
      },
      {
        id: 4,
        text: "A realistic prediction for the future of our planet.",
        key: "B",
      },
      {
        id: 5,
        text: "The potential risks of a step-by-step approach towards economic change.",
        key: "E",
      },
    ],
  },
  summary: {
    badge: "5",
    strategies: "TEST STRATEGIES page 170",
    partA: {
      badge: "5a",
      title: "The consequences of progress",
      text: "Many of the problems of our age can be blamed on the … which took place over two centuries ago.",
      key: "paragraph B",
    },
    partB: {
      badge: "5b",
      instruction:
        "Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer.",
      intro:
        "Many of the problems of our age can be blamed on the",
      gaps: [
        {
          id: 6,
          after:
            "which took place over two centuries ago. People are soon expected to see a deterioration in their",
          answers: ["industrial revolution"],
        },
        {
          id: 7,
          after:
            "in addition to the current threat to the environment. Already, declining resources means that the world is having to limit its",
          answers: ["living standards"],
        },
        {
          id: 8,
          after:
            ". The",
          answers: ["economic productivity", "productivity"],
        },
        {
          id: 9,
          after:
            "is expected to expand two-fold worldwide by 2030, bringing with it a rise in spending power and an even greater use of resources.",
          answers: ["middle class"],
        },
      ],
    },
  },
  discussion: {
    badge: "6",
    instruction: "Discuss these questions.",
    questions: [
      "How do you think people might be persuaded to change their mindsets and be convinced to be part of a 'sharing' system?",
      "What problems or drawbacks might occur with a 'sharing' economy and how might they be resolved?",
    ],
  },
};
