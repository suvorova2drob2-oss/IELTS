export const LANG_M8A_STEPS = [
  "1a Contrast/agree",
  "1b Link words",
  "2 Complete",
  "3 Open practice",
  "4a–4b Both/Neither/Either",
  "4c Rewrite",
] as const;

export const LANG_M8A_NEXT = [
  "1b Link words →",
  "2 Complete →",
  "3 Open practice →",
  "4a–4b Both/Neither →",
  "4c Rewrite →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[.,;:!?]+$/g, "");
}

export function checkLangM8a(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export const languageM8a = {
  id: "language-m8a-flow",
  bookPages: "p. 125 in your coursebook",
  sectionTitle: "Language development · Future forms",
  grammarRef: "EXPERT GRAMMAR page 180",
  contrast1a: {
    badge: "1a",
    instruction:
      "Do the sentence parts contrast or agree? Choose for each pair.",
    items: [
      { id: 1, text: "Pair 1", key: "contrast" },
      { id: 2, text: "Pair 2", key: "agreement" },
      { id: 3, text: "Pair 3", key: "contrast" },
    ],
    options: ["contrast", "agreement"],
  },
  link1b: {
    badge: "b",
    instruction: "Choose the correct linking word for each gap.",
    bank: ["similarly", "whereas", "Despite"],
    items: [
      {
        id: 1,
        before: "CCTV can deter street crime; ",
        after: ", better lighting also reduces opportunities for offenders.",
        answers: ["similarly"],
      },
      {
        id: 2,
        before: "Many people support more cameras, ",
        after: " others worry about privacy.",
        answers: ["whereas"],
      },
      {
        id: 3,
        before: "",
        after: " the cost, many cities have expanded surveillance networks.",
        answers: ["Despite"],
      },
    ],
  },
  complete2: {
    badge: "2",
    instruction:
      "Complete the spaces with Although, Similarly, despite or Conversely.",
    bank: ["Although", "Similarly", "despite", "Conversely"],
    items: [
      {
        id: 1,
        before: "",
        after: " crime rates have fallen, many people still feel unsafe at night.",
        answers: ["Although"],
      },
      {
        id: 2,
        before: "Community schemes cut vandalism. ",
        after: ", neighbourhood watch groups reported fewer burglaries.",
        answers: ["Similarly"],
      },
      {
        id: 3,
        before: "The policy went ahead ",
        after: " strong public opposition.",
        answers: ["despite"],
      },
      {
        id: 4,
        before: "Some offenders respond well to rehabilitation. ",
        after: ", others reoffend soon after release.",
        answers: ["Conversely"],
      },
    ],
  },
  open3: {
    badge: "3",
    instruction:
      "Complete the sentences in your own words using suitable linking devices. Compare ideas with a partner.",
  },
  both4a: {
    badge: "4a",
    instruction: "Choose both, neither or either to complete the sentences.",
    bank: ["both", "Neither", "either", "Both", "neither"],
    items: [
      {
        id: 1,
        before: "The scheme helps ",
        after: " victims and witnesses feel safer.",
        answers: ["both"],
      },
      {
        id: 2,
        before: "",
        after: " proposal was cheap, and both needed more staff.",
        answers: ["Neither"],
      },
      {
        id: 3,
        before: "You can report the incident ",
        after: " online or by phone.",
        answers: ["either"],
      },
      {
        id: 4,
        before: "The judge said ",
        after: " explanation was acceptable.",
        answers: ["either"],
      },
      {
        id: 5,
        before: "Unfortunately, ",
        after: " suspect had a reliable alibi.",
        answers: ["neither"],
      },
      {
        id: 6,
        before: "",
        after: " patience and authority matter when training police dogs.",
        answers: ["Both"],
      },
    ],
  },
  both4b: {
    badge: "b",
    instruction: "Complete with Both, Neither or Either.",
    bank: ["Both", "Neither", "Either"],
    items: [
      {
        id: 1,
        before: "",
        after: " cameras and patrols reduced late-night incidents.",
        answers: ["Both"],
      },
      {
        id: 2,
        before: "",
        after: " solution alone will eliminate cybercrime.",
        answers: ["Neither"],
      },
      {
        id: 3,
        before: "",
        after: " fines or community service could be appropriate here.",
        answers: ["Either"],
      },
    ],
  },
  rewrite4c: {
    badge: "c",
    instruction: "Rewrite the ideas using both / neither / either. Check models.",
    items: [
      {
        id: 1,
        stem: "Businesses are adversely affected by cybercrime. Individuals are too.",
        model:
          "Both businesses and individuals are adversely affected by cybercrime.",
      },
      {
        id: 2,
        stem: "Increased lighting could increase safety. Installing CCTV could also.",
        model:
          "Either increased lighting or installing CCTV could increase safety on the streets.",
      },
      {
        id: 3,
        stem: "The current justice system does not benefit the criminal. It does not benefit the victim.",
        model:
          "The current justice system benefits neither the criminal nor the victim.",
      },
      {
        id: 4,
        stem: "The burglars might have entered through an open top-floor window. Or through the garage.",
        model:
          "The burglars could have entered my house either through an open top floor window or the garage.",
      },
      {
        id: 5,
        stem: "Patience is important when training police dogs. Having a sense of authority is also important.",
        model:
          "Both patience and having a sense of authority are important skills when training police dogs.",
      },
      {
        id: 6,
        stem: "Blue-collar workers are not sent to prison as often as white-collar workers. Company CEOs aren’t either.",
        model:
          "Neither blue-collar workers nor company CEOs are sent to prison as often as white-collar workers.",
      },
    ],
  },
};
