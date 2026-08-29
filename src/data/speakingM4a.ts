export const SPEAK_M4A_STEPS = [
  "1 Quote",
  "2a Match terms",
  "3a–3d Connectors",
  "4 Part 3",
  "5 Assess",
] as const;

export const SPEAK_M4A_NEXT = [
  "2a Match terms →",
  "3a–3d Connectors →",
  "4 Part 3 →",
  "5 Assess →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ");
}

export function checkSpeakM4a(input: string, answers: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return answers.some((a) => normalize(a) === n);
}

export type SpeakM4aGap =
  | { text: string }
  | { gap: number; key: string };

export function isSpeakM4aGap(
  part: SpeakM4aGap,
): part is { gap: number; key: string } {
  return "gap" in part;
}

export const speakingM4a = {
  id: "speaking-m4a-flow",
  bookPages: "p. 59 in your coursebook",
  sectionTitle: "Speaking · Part 3",
  testStrategies: "TEST STRATEGIES page 175",
  quote: {
    badge: "1",
    heading: "Lead-in",
    instruction:
      "Work in pairs and discuss the quote. What do you think it means? Do you agree?",
    text: "There are limited resources on Earth — we cannot keep using more and more of them.",
    tip: "The quote suggests that people cannot keep using more and more resources because there is a limited quantity of them.",
  },
  match2a: {
    badge: "2a",
    heading: "Develop topic-specific vocabulary",
    instruction: "Match the terms below with the definitions (1–6).",
    bank: [
      "Fast fashion",
      "Landfill sites",
      "Biodegradable",
      "Ecological footprint",
      "Renewable resources",
      "Upgrades",
    ],
    items: [
      {
        id: 1,
        text: "Inexpensive clothes produced quickly in large amounts to follow the latest trends, often worn only a few times before being thrown away.",
        key: "Fast fashion",
      },
      {
        id: 2,
        text: "Places where large quantities of rubbish are buried in the ground because they are no longer wanted or useful.",
        key: "Landfill sites",
      },
      {
        id: 3,
        text: "Able to break down naturally over time through the action of bacteria or other living organisms, without harming the environment.",
        key: "Biodegradable",
      },
      {
        id: 4,
        text: "A measure of the impact that a person, community or activity has on the natural environment, especially in terms of resources used and waste created.",
        key: "Ecological footprint",
      },
      {
        id: 5,
        text: "Natural materials such as sunlight, wind and water that can be replaced or replenished and will not run out if managed carefully.",
        key: "Renewable resources",
      },
      {
        id: 6,
        text: "Newer versions of products, especially electronic devices, that replace an older model with improved features or performance.",
        key: "Upgrades",
      },
    ],
  },
  write2b: {
    badge: "b",
    instruction:
      "Write questions for your partner using the terms in Exercise 2a. Then ask and answer the questions.",
    suggested: [
      "Do you always buy the latest upgrades?",
      "What do you do with your old gadgets?",
      "To what extent do you think of the environment when considering new technology?",
      "What kinds of products do you buy the most?",
      "How does the disposal of these items affect the environment?",
      "Do you care about your ecological footprint?",
      "How large do you think it is?",
      "What could you do to reduce it?",
      "How is rubbish disposed of in your country?",
    ],
  },
  connectors: {
    heading: "Expand your ideas using conjunctions and phrases",
    write3a: {
      badge: "3a",
      instruction: 'Write down your answer to the question.',
      question: "Do you think people should recycle more?",
      suggested:
        "I think yes because we need to conserve our planet and recycling is a way of saving our scarce resources.",
    },
    bank3b: {
      badge: "b",
      instruction:
        "Look at the conjunctions below. Add another sentence to the answer you wrote in Exercise 3a and choose a conjunction to connect the ideas.",
      bank: ["because", "but", "so", "or", "and"],
      suggested:
        "because they know it'll be better for the environment and they try not to buy things which aren't biodegradable or recyclable but they aren't always easy to find or they buy things which are biodegradable so they don't generate lots of unnecessary waste.",
    },
    match3c: {
      badge: "c",
      instruction:
        "Match the alternative connectors below with the conjunctions in Exercise 3b that have a similar meaning.",
      bank: ["and", "or", "so", "because", "but"],
      items: [
        { id: 1, text: "along with", key: "and" },
        { id: 2, text: "alternatively", key: "or" },
        { id: 3, text: "another thing", key: "and" },
        { id: 4, text: "as well as", key: "and" },
        { id: 5, text: "instead", key: "or" },
        { id: 6, text: "in the end", key: "so" },
        { id: 7, text: "on the grounds that", key: "because" },
        { id: 8, text: "on the other hand", key: "but" },
        { id: 9, text: "since", key: "because" },
      ],
    },
    gap3d: {
      badge: "d",
      instruction:
        "Complete the sentences with the correct alternative connectors from Exercise 3c.",
      bank: [
        "Alternatively",
        "Another thing",
        "On the other hand",
        "instead",
        "on the grounds that",
        "since",
      ],
      items: [
        {
          id: 1,
          before: "",
          after:
            ", some people argue that recycling takes too much time and energy to be worthwhile.",
          answers: ["On the other hand"],
        },
        {
          id: 2,
          before:
            "Rather than throwing clothes into landfill sites, people could donate them or reuse them ",
          after: ".",
          answers: ["instead"],
        },
        {
          id: 3,
          before:
            "Many local councils promote recycling ",
          after:
            " it reduces the amount of waste sent to landfill sites.",
          answers: ["on the grounds that", "since"],
        },
        {
          id: 4,
          before: "",
          after:
            ", shoppers could choose products made from renewable resources rather than single-use plastics.",
          answers: ["Alternatively"],
        },
        {
          id: 5,
          before: "",
          after:
            " people can do is refuse packaging they do not need when they shop.",
          answers: ["Another thing"],
        },
      ],
    },
  },
  part3: {
    badge: "4",
    heading: "Test practice",
    strategies: "TEST STRATEGIES page 175",
    instruction:
      "Read the questions. Work in pairs. Take turns to be the examiner and the candidate, and ask and answer the questions.",
    questions: [
      "How easy is it for people in your country to recycle? What could companies and governments do to make recycling easier?",
      "In what ways can people save or reuse things instead of throwing them away?",
      "Is it more important to recycle or to buy fewer new products? Why?",
      "Do you think recycling should be mandatory? Why/Why not?",
    ],
    suggestedAnswers: [
      "I'm not too sure really. I do think that recycling is good for the environment. I mean, we can't just keep using landfill sites because surely, we'll run out of space at some point in the future … but recycling isn't always easy. Some things are made of more than one material so they're not easy to recycle for a start, and besides, there aren't always recycling bins available. I definitely think companies and governments should do a lot more to make it easier for people to recycle a wider range of goods. If they did, then I'd definitely recycle more and I'm sure other people would do too.",
      "There are so many ways people can save or reuse things. For a start, they could buy second-hand goods or buy things that are meant to last instead of getting whatever's in fashion and then throwing it away when it's no longer trendy. I know that might sound a bit depressing for fashion followers, but there's also the option for people to create their own more unique fashions as well!",
      "Both in my opinion! Recycling is a great idea because, let's face it, there are always going to be some things we need to buy, but this doesn't mean we can't also limit our buying. I mean, for example, rather than buying cans of drink all the time and throwing them away, we could be more prepared and carry a reusable cup.",
      "Personally, I think it should be mandatory as unfortunately, there are plenty of people who won't bother to recycle if they don't have to. I'm not sure if any country has laws that state their citizens must recycle, but I definitely think that would be a good thing for the society and the environment.",
    ],
  },
  assess: {
    badge: "5",
    heading: "Assess and improve",
    instruction:
      "Think about your speaking in Exercise 4. Complete the checklist below.",
    items: [
      "I managed to answer the questions at length.",
      "I connected my ideas using conjunctions and alternative connectors.",
      "I used topic-specific vocabulary from this lesson.",
      "I speculated and hypothesised where appropriate (e.g. conditionals).",
      "I focused on one area I want to improve next time.",
    ],
  },
};
