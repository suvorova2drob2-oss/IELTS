export const REVIEW_M6_STEPS = [
  "1a Vocabulary",
  "1b There/It",
  "1c Match",
  "2a Linking",
  "2b Cleft rewrite",
  "2c More clefts",
] as const;

export const REVIEW_M6_NEXT = [
  "1b There/It →",
  "1c Match →",
  "2a Linking →",
  "2b Cleft →",
  "2c More clefts →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ");
}

export function checkReviewM6(input: string, answers: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return answers.some((a) => normalize(a) === n);
}

export const reviewM6 = {
  id: "review-m6-flow",
  bookPages: "p. 102 in your coursebook",
  sectionTitle: "Review",
  vocab1a: {
    badge: "1a",
    instruction:
      "Complete the sentences with the correct form of the words below.",
    bank: [
      "derive",
      "identify",
      "conclude",
      "involves",
      "facilitate",
      "contribute",
    ],
    items: [
      {
        id: 1,
        before: "Many theories of crime ",
        after: " from early sociological research.",
        answers: ["derive"],
      },
      {
        id: 2,
        before: "Detectives must ",
        after: " the most useful leads quickly.",
        answers: ["identify"],
      },
      {
        id: 3,
        before: "From the evidence, jurors may ",
        after: " that the defendant is guilty.",
        answers: ["conclude"],
      },
      {
        id: 4,
        before: "Effective policing ",
        after: " cooperation with the community.",
        answers: ["involves"],
      },
      {
        id: 5,
        before: "New databases ",
        after: " information sharing between forces.",
        answers: ["facilitate"],
      },
      {
        id: 6,
        before: "Public education campaigns can ",
        after: " to lower rates of street crime.",
        answers: ["contribute"],
      },
    ],
  },
  thereIt1b: {
    badge: "b",
    instruction: "Complete with It or There (capitalise as needed).",
    bank: ["It", "There", "there", "It", "There", "It"],
    items: [
      {
        id: 1,
        before: "",
        after: " was the fingerprints that finally identified the thief.",
        answers: ["It"],
      },
      {
        id: 2,
        before: "",
        after: " are several reasons why CCTV alone is not enough.",
        answers: ["There"],
      },
      {
        id: 3,
        before: "If ",
        after: " is any doubt, collect more evidence.",
        answers: ["there"],
      },
      {
        id: 4,
        before: "",
        after: " seems unlikely that the suspect acted alone.",
        answers: ["It"],
      },
      {
        id: 5,
        before: "",
        after: " remains a shortage of trained analysts.",
        answers: ["There"],
      },
      {
        id: 6,
        before: "",
        after: " takes skill to interpret complex forensic results.",
        answers: ["It"],
      },
    ],
  },
  match1c: {
    badge: "c",
    instruction:
      "Match the collocations (1–5) with the definitions (A–E).",
    bank: [
      { id: "A", text: "an argument with a major weakness" },
      { id: "B", text: "an argument which is very good or strong" },
      { id: "C", text: "the reasoning of an argument" },
      { id: "D", text: "to put forward an argument" },
      { id: "E", text: "to dismiss an argument" },
    ],
    items: [
      { id: 1, text: "a line of argument", key: "C" },
      { id: 2, text: "flawed argument", key: "A" },
      { id: 3, text: "to reject an argument", key: "E" },
      { id: 4, text: "convincing argument", key: "B" },
      { id: 5, text: "to propose an argument", key: "D" },
    ],
    tip: "Match each collocation to its meaning — look for near-synonyms (e.g. reject ≈ dismiss, propose ≈ put forward).",
  },
  linking2a: {
    badge: "2a",
    instruction: "Complete with the linking words below.",
    bank: [
      "Despite",
      "Neither",
      "Similarly",
      "Although",
      "Both",
      "conversely",
    ],
    items: [
      {
        id: 1,
        before: "",
        after: " the risks, many people still share personal data online.",
        answers: ["Despite"],
      },
      {
        id: 2,
        before: "",
        after: " cameras nor longer sentences will solve every case.",
        answers: ["Neither"],
      },
      {
        id: 3,
        before: "Neighbourhood schemes cut vandalism. ",
        after: ", youth clubs reduced street fights.",
        answers: ["Similarly"],
      },
      {
        id: 4,
        before: "",
        after: " crime has fallen, fear of crime remains high.",
        answers: ["Although"],
      },
      {
        id: 5,
        before: "",
        after: " DNA and fingerprints can place a suspect at a scene.",
        answers: ["Both"],
      },
      {
        id: 6,
        before: "Some offenders reform quickly; ",
        after: ", others reoffend within months.",
        answers: ["conversely"],
      },
    ],
  },
  cleft2b: {
    badge: "b",
    instruction: "Rewrite using cleft sentences. Check the models.",
    items: [
      {
        id: 1,
        stem: "The man over there in the motorbike helmet committed the crime.",
        model:
          "It was the man over there in the motorbike helmet that committed the crime.",
      },
      {
        id: 2,
        stem: "I find how people who commit crimes live with the guilt the most difficult to understand.",
        model:
          "What I find the most difficult to understand about people who commit crimes is how they live with the guilt.",
      },
      {
        id: 3,
        stem: "The fingerprints on the glass finally led them to the culprit.",
        model:
          "It was the fingerprints on the glass that finally led them to the culprit.",
      },
      {
        id: 4,
        stem: "Most people don’t understand the judicial processes involved in crime.",
        model:
          "What most people don’t understand is the judicial processes involved in crime.",
      },
    ],
  },
  cleft2c: {
    badge: "c",
    instruction: "Complete / rewrite using What… / It… clefts.",
    items: [
      {
        id: 1,
        stem: "Of all the things stolen from my bag, I miss my perfume most because it was a present.",
        model:
          "Of all the things that were stolen from my bag, what I miss most is my perfume because it was a present.",
      },
      {
        id: 2,
        stem: "The murder was committed on a dark and stormy night.",
        model:
          "It was a dark and stormy night when the murder was committed.",
      },
      {
        id: 3,
        stem: "The politician predicted a reduction in traffic accidents after the new roundabout was built.",
        model:
          "What the politician predicted was a reduction in the number of traffic accidents after the new roundabout was built.",
      },
      {
        id: 4,
        stem: "An animal stole my plants, not a person as I originally thought.",
        model:
          "It wasn’t a person that stole my plants as I originally thought, it was an animal.",
      },
    ],
  },
};
