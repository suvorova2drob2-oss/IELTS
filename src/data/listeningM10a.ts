export const LISTEN_M10A_STEPS = [
  "1 Before listen",
  "2a Metaphor / simile",
  "2b Speakers",
  "3a–3b Topic order",
  "4 Exam notes",
  "5 Discussion",
] as const;

export const LISTEN_M10A_NEXT = [
  "2a Metaphor →",
  "2b Speakers →",
  "3a–3b Order →",
  "4 Exam →",
  "5 Discussion →",
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

export function checkListenM10a(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export const listeningM10a = {
  id: "listening-m10a-flow",
  bookPages: "p. 156 in your coursebook",
  sectionTitle: "Listening · Section 4 (robotic music)",
  noAudioNote:
    "Аудио пока нет — можно пройти подготовку и exam. Ключи: 2a Metaphor 1+B / Simile 2+A · 3a order 1B 2D 3A 4E 5C · exam: 1 right audience · 2 catching a wave · 3 car · 4 (a) part · 5 robbery · 6 human · 7 reflection · 8 recipe.",
  before: {
    badge: "1",
    heading: "Before you listen",
    instruction:
      "Look at the infographic for songs. Do you think there is any element of truth in this? Do songs require a lot of creativity or do they follow a formula? Why / Why not?",
    tip: "Suggested: Yes, I do think there’s some truth in the image because people have certain expectations from different types of music which songwriters tend to fulfil in order to sell their records. Modern pop songs are fairly formulaic in their content and their structure, although some artists break out of this mould.",
  },
  attitude2a: {
    badge: "2a",
    instruction:
      "Decide which definition/example is a metaphor and which is a simile. Keys: Metaphor = 1 and B; Simile = 2 and A.",
    items: [
      {
        id: 1,
        text: "Definition 1: A figure of speech that identifies something as being the same as another unrelated thing (highlighting similarities).",
        options: [
          { id: "A", text: "Simile" },
          { id: "B", text: "Metaphor" },
          { id: "C", text: "Neither" },
        ],
        key: "B",
      },
      {
        id: 2,
        text: "Definition 2: A figure of speech which is a direct comparison using like or as (e.g. My love is like a bridge to your soul).",
        options: [
          { id: "A", text: "Simile" },
          { id: "B", text: "Metaphor" },
          { id: "C", text: "Neither" },
        ],
        key: "A",
      },
    ],
  },
  tone2b: {
    badge: "b",
    instruction:
      "Match what each speaker discusses / the figure of speech used (audio later — keys from Teacher’s Book).",
    bank: [
      "Mozart’s childhood ability (simile: bird flying)",
      "music listeners diversified (metaphor: sponges)",
      "simile: like / as",
      "metaphor: listeners are sponges",
      "internalise music involuntarily",
    ],
    items: [
      {
        id: 1,
        text: "Speaker 1’s subject + figure",
        key: "Mozart’s childhood ability (simile: bird flying)",
      },
      {
        id: 2,
        text: "Speaker 2’s subject + figure",
        key: "music listeners diversified (metaphor: sponges)",
      },
      {
        id: 3,
        text: "Example of a simile",
        key: "simile: like / as",
      },
      {
        id: 4,
        text: "Example of a metaphor from Speaker 2",
        key: "metaphor: listeners are sponges",
      },
      {
        id: 5,
        text: "Why ‘sponges’ is appropriate",
        key: "internalise music involuntarily",
      },
    ],
  },
  prep3: {
    badge: "3a",
    instruction:
      "You are going to hear a lecture on robotic music making. Put the topics in the order you hear them (keys: 1 B · 2 D · 3 A · 4 E · 5 C).",
    items: [
      {
        id: 1,
        text: "First topic heard",
        options: [
          { id: "A", text: "A Sampling music" },
          { id: "B", text: "B Cultural importance of songs" },
          { id: "C", text: "C Music created by the masses" },
        ],
        key: "B",
      },
      {
        id: 2,
        text: "Second topic heard",
        options: [
          { id: "A", text: "A Sampling music" },
          { id: "B", text: "D Reverse-engineering songs" },
          { id: "C", text: "E Robotic pop stars" },
        ],
        key: "B",
      },
    ],
    gaps3b: {
      badge: "b",
      instruction:
        "Order reminder chips (place letters in order 1–5): B D A E C.",
      gaps: [
        { id: 1, before: "1st: ", after: "", answers: ["B"] },
        { id: 2, before: "2nd: ", after: "", answers: ["D"] },
        { id: 3, before: "3rd: ", after: "", answers: ["A"] },
        { id: 4, before: "4th: ", after: "", answers: ["E"] },
        { id: 5, before: "5th: ", after: "", answers: ["C"] },
      ],
    },
  },
  exam4: {
    badge: "4",
    strategies: "TEST STRATEGIES page 168",
    instruction:
      "Complete the notes. Write NO MORE THAN THREE WORDS for each answer.",
    gaps: [
      {
        id: 1,
        before:
          "Against — John Covach: Songs need cultural relevance to appeal to the ",
        after: "",
        answers: ["right audience"],
      },
      {
        id: 2,
        before: "Compares writing a good song to ",
        after: "",
        answers: ["catching a wave"],
      },
      {
        id: 3,
        before:
          "For — Susan Schmidt-Horning: Many songs reassembled in the way a ",
        after: " might be",
        answers: ["car"],
      },
      {
        id: 4,
        before: "Sampling: This is using ",
        after: " of an older song",
        answers: ["(a) part", "a part", "part"],
      },
      {
        id: 5,
        before: "For some, this is seen as ",
        after: " but it is often allowed",
        answers: ["robbery"],
      },
      {
        id: 6,
        before: "Hatsune Miku: Not ",
        after: " but very popular music star",
        answers: ["human"],
      },
      {
        id: 7,
        before: "But is a ",
        after: " of her followers (plays their music)",
        answers: ["reflection"],
      },
      {
        id: 8,
        before: "Summary: The ",
        after: " for a great song is both social and musical",
        answers: ["recipe"],
      },
    ],
  },
  discussion: {
    badge: "5",
    instruction:
      "Discuss metaphors/similes you heard and whether computers can create culturally relevant music.",
    tip: "Listeners are sponges — we take music in almost involuntarily. Great songs need a social and musical ‘recipe’.",
  },
};
