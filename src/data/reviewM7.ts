export const REVIEW_M7_STEPS = [
  "1a Word forms",
  "1b Prepositions",
  "1c Plan phrases",
  "2a Punctuate",
  "2b–2c Errors",
  "2d Fix text",
] as const;

export const REVIEW_M7_NEXT = [
  "1b Prepositions →",
  "1c Plan phrases →",
  "2a Punctuate →",
  "2b–2c Errors →",
  "2d Fix text →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ");
}

export function checkReviewM7(input: string, answers: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return answers.some((a) => normalize(a) === n);
}

export const reviewM7 = {
  id: "review-m7-flow",
  bookPages: "p. 118 in your coursebook",
  sectionTitle: "Review",
  forms1a: {
    badge: "1a",
    instruction:
      "Complete the sentences with the correct form of the words below.",
    bank: [
      "maintained",
      "compensation",
      "distributing",
      "expansion",
      "implement",
      "invested",
    ],
    items: [
      {
        id: 1,
        before:
          "It is very advantageous to have areas of natural beauty for people to visit, but these must be ",
        after:
          " by ensuring there are rules to protect these areas.",
        answers: ["maintained"],
      },
      {
        id: 2,
        before:
          "Although sometimes it is necessary to use parks and woodland to make way for new housing, there is little ",
        after:
          " for the loss of green spaces for existing residents in the area.",
        answers: ["compensation"],
      },
      {
        id: 3,
        before:
          "Although promotional material about local services may be of use to residents, it is more important that these services are run well, rather than simply ",
        after: " leaflets.",
        answers: ["distributing"],
      },
      {
        id: 4,
        before:
          "The infrastructure at present cannot cope with the numbers of commuters, and therefore the ",
        after:
          " of rail and bus networks is an essential concern.",
        answers: ["expansion"],
      },
      {
        id: 5,
        before:
          "Some tourist attractions will ",
        after:
          " e-ticketing in order to facilitate a smoother booking and payment process and reduce queues.",
        answers: ["implement"],
      },
      {
        id: 6,
        before: "The more money is ",
        after:
          " into keeping the area nice, the happier the residents will be.",
        answers: ["invested"],
      },
    ],
  },
  prep1b: {
    badge: "b",
    instruction: "Choose the correct preposition, A, B or C.",
    items: [
      {
        id: 1,
        before: "",
        after: " 20 percent of those surveyed had complained about the train service.",
        options: [
          { id: "A", text: "on" },
          { id: "B", text: "at" },
          { id: "C", text: "over" },
        ],
        key: "C",
      },
      {
        id: 2,
        before: "The number of passengers that travelled to work by bus has increased ",
        after: " 10 percent this year.",
        options: [
          { id: "A", text: "by" },
          { id: "B", text: "on" },
          { id: "C", text: "through" },
        ],
        key: "A",
      },
      {
        id: 3,
        before: "Most of those surveyed agreed ",
        after: " the need for a tram system.",
        options: [
          { id: "A", text: "over" },
          { id: "B", text: "by" },
          { id: "C", text: "on" },
        ],
        key: "C",
      },
      {
        id: 4,
        before: "",
        after: " the end of the year, the number of people walking to work had reduced significantly.",
        options: [
          { id: "A", text: "through" },
          { id: "B", text: "at" },
          { id: "C", text: "to" },
        ],
        key: "B",
      },
      {
        id: 5,
        before: "The number of people commuting long distances had risen ",
        after: " the highest number seen for a decade.",
        options: [
          { id: "A", text: "by" },
          { id: "B", text: "to" },
          { id: "C", text: "on" },
        ],
        key: "B",
      },
    ],
  },
  plan1c: {
    badge: "c",
    instruction: "Complete the sentences with the phrases below.",
    bank: [
      "unveiled their plan",
      "go ahead with the plan",
      "shelve their plan",
      "oppose the plan",
    ],
    items: [
      {
        id: 1,
        before: "The city bus company ",
        after:
          " for a new terminal in the city centre in a press conference yesterday.",
        answers: ["unveiled their plan"],
      },
      {
        id: 2,
        before: "After a lot of discussion, the school decided to ",
        after:
          " of redesigning the access from the car park to the main school building.",
        answers: ["go ahead with the plan"],
      },
      {
        id: 3,
        before: "The government is going to ",
        after:
          " to invest in transport infrastructure until after the election.",
        answers: ["shelve their plan"],
      },
      {
        id: 4,
        before: "Local residents ",
        after:
          " to build a motorway around the edge of the town due to the potential noise pollution.",
        answers: ["oppose the plan"],
      },
    ],
  },
  punctuate2a: {
    badge: "2a",
    instruction: "Add the necessary punctuation to the text below.",
    title: "The Rise of the Segway",
    raw: "segways also known as hover boards might be considered as a futuristic form of transport yet they are readily available to buy in most countries today in fact you can see pictures online of many celebrities riding them and they might not even be an unusual sight in city parks however in some countries riding a segway on the streets is illegal this is largely because they are not deemed safe to be amongst traffic so before you consider buying a segway just remember they may be fun but you can't use them as an everyday form of transport",
    model:
      "Segways, also known as hover boards, might be considered as a futuristic form of transport, yet they are readily available to buy in most countries today. In fact, you can see pictures online of many celebrities riding them, and they might not even be an unusual sight in city parks. However, in some countries riding a Segway on the streets is illegal. This is largely because they are not deemed safe to be amongst traffic. So, before you consider buying a Segway just remember, they may be fun, but you can't use them as an everyday form of transport.",
  },
  errors2b: {
    badge: "2b",
    instruction: "Correct the errors in the sentences.",
    items: [
      {
        id: 1,
        text: "Neither passenger leave the train until this dispute is over.",
        answers: [
          "Neither passenger leaves the train until this dispute is over.",
        ],
      },
      {
        id: 2,
        text: "A number of trains along this route is increasing.",
        answers: ["The number of trains along this route is increasing."],
      },
      {
        id: 3,
        text: "The latest data recommends that people always book their tickets in advance.",
        answers: [
          "The latest data recommend that people always book their tickets in advance.",
        ],
      },
      {
        id: 4,
        text: "The final destination of both flights TE223 and BA115 are Istanbul.",
        answers: [
          "The final destination of both flights TE223 and BA115 is Istanbul.",
        ],
      },
      {
        id: 5,
        text: "This steam train holds the particular place in history as one of the earliest of its kind.",
        answers: [
          "This steam train holds a particular place in history as one of the earliest of its kind.",
        ],
      },
    ],
  },
  fragments2c: {
    badge: "c",
    instruction:
      "The following sentences are sentence fragments. Rewrite them so they are correct.",
    items: [
      {
        id: 1,
        text: "The new flats built on the university campus excellent in terms of value for money and quality.",
        tip: "add are after campus",
      },
      {
        id: 2,
        text: "Is a tranquil park near my house which I often go to when I need to destress and relax after work.",
        tip: "add There before is a",
      },
      {
        id: 3,
        text: "Although the city is generally considered to be a safe place to live.",
        tip: "requires a second contrasting clause, e.g. there has been an increase in petty crime recently.",
      },
      {
        id: 4,
        text: "Has become more attractive for couples with young children to move to since the new shopping centre and restaurant complex was constructed.",
        tip: "It / The city centre, etc.",
      },
    ],
  },
  fix2d: {
    badge: "d",
    instruction:
      "The text below contains two kinds of mistakes: word formation and preposition use. Find and correct the mistakes.",
    bad: "Both the bus and car were popular forms of transport Beijing, Delhi and Seoul at 2008. Other forms of transport showed larger differents between the three countries. Rail was a high used form of transport in Seoul, whereas travelling by foot was extreme popularity in Delhi. Other forms of transport, such as cycling or taking taxis, were not used as much.",
    model:
      "Both the bus and car were popular forms of transport in Beijing, Delhi and Seoul in 2008. Other forms of transport showed larger differences between the three countries. Rail was a highly used form of transport in Seoul, whereas travelling on foot was extremely popular in Delhi. Other forms of transport, such as cycling or taking taxis, were not used as much.",
  },
};
