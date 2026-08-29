export const LANG_M9A_STEPS = [
  "1a Relative match",
  "1b Link / choose",
  "2 Complete text",
  "3 Open practice",
  "4a–4b Structure match",
  "4c Rewrite",
] as const;

export const LANG_M9A_NEXT = [
  "1b Choose →",
  "2 Complete →",
  "3 Open practice →",
  "4a–4b Match →",
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

export function checkLangM9a(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export const languageM9a = {
  id: "language-m9a-flow",
  bookPages: "p. 141 in your coursebook",
  sectionTitle: "Language development · Describing how things work / look",
  grammarRef: "EXPERT GRAMMAR page 181",
  contrast1a: {
    badge: "1a",
    instruction:
      "Match each sentence half / relative-clause example (1–4) with the correct option (A–D).",
    items: [
      {
        id: 1,
        text: "1 … which joins the artificial element to its host’s body (socket).",
        key: "C",
      },
      {
        id: 2,
        text: "2 … which is used to provide support (pylon / metal pole).",
        key: "A",
      },
      {
        id: 3,
        text: "3 … that surgeons use to attach the limb (suspension / belt or straps).",
        key: "D",
      },
      {
        id: 4,
        text: "4 … what people use to control the prosthetic so it moves naturally (motors).",
        key: "B",
      },
    ],
    options: ["A", "B", "C", "D"],
  },
  link1b: {
    badge: "b",
    instruction: "Choose the correct option (A–D) for each relative-clause gap.",
    bank: ["A", "B", "C", "D"],
    items: [
      {
        id: 1,
        before: "1 Modern limb technology is complex in its design, with each element ",
        after: " a specific function.",
        answers: ["B"],
      },
      {
        id: 2,
        before: "2 The pylon is the section ",
        after: " is used to provide support.",
        answers: ["C"],
      },
      {
        id: 3,
        before: "3 Motors are ",
        after: " people use to control the prosthetic device.",
        answers: ["D"],
      },
      {
        id: 4,
        before: "4 The socket is the part ",
        after: " joins the artificial element to the body.",
        answers: ["A"],
      },
    ],
  },
  complete2: {
    badge: "2",
    instruction:
      "Complete the descriptions with the phrases below (structure / material / size / form).",
    bank: [
      "consists of",
      "been constructed from",
      "centimetres in length",
      "shaped like a",
      "is built from",
      "consisted of",
    ],
    items: [
      {
        id: 1,
        before: "This fitness device ",
        after: " a small computer and a battery.",
        answers: ["consists of", "consisted of"],
      },
      {
        id: 2,
        before: "The majority of these traditional buildings have ",
        after: " brick and stone.",
        answers: ["been constructed from"],
      },
      {
        id: 3,
        before: "Many internal medical devices are only a few ",
        after: ".",
        answers: ["centimetres in length"],
      },
      {
        id: 4,
        before: "The new stadium is ",
        after: " long oval.",
        answers: ["shaped like a"],
      },
      {
        id: 5,
        before: "The outer frame ",
        after: " lightweight aluminium.",
        answers: ["is built from"],
      },
      {
        id: 6,
        before: "The earliest design ",
        after: " wood and leather straps.",
        answers: ["consisted of", "consists of"],
      },
    ],
  },
  open3: {
    badge: "3",
    instruction:
      "Write short descriptions of LED slippers and picnic pants using relative clauses and descriptive language (what people use them for / which parts light up or hold food). Compare with a partner.",
  },
  both4a: {
    badge: "4a",
    instruction:
      "Match each sentence (1–4) with what it mainly describes: structure, size, material or form. Keys: 1C 2A 3D 4B.",
    bank: ["A", "B", "C", "D"],
    items: [
      {
        id: 1,
        before: "1 The majority of these types of traditional buildings are constructed from brick and stone. → ",
        after: " (material)",
        answers: ["C"],
      },
      {
        id: 2,
        before: "2 This fitness device consists of a small computer and a battery. → ",
        after: " (structure)",
        answers: ["A"],
      },
      {
        id: 3,
        before: "3 The new stadium is shaped like a long oval. → ",
        after: " (form)",
        answers: ["D"],
      },
      {
        id: 4,
        before: "4 Many internal medical devices are millimetres in diameter. → ",
        after: " (size)",
        answers: ["B"],
      },
    ],
  },
  both4b: {
    badge: "b",
    instruction:
      "Label bank reminder: A structure · B size · C material · D form. Place the correct letter again if needed.",
    bank: ["A", "B", "C", "D"],
    items: [
      {
        id: 1,
        before: "Structure = ",
        after: "",
        answers: ["A"],
      },
      {
        id: 2,
        before: "Size = ",
        after: "",
        answers: ["B"],
      },
      {
        id: 3,
        before: "Material = ",
        after: "",
        answers: ["C"],
      },
      {
        id: 4,
        before: "Form = ",
        after: "",
        answers: ["D"],
      },
    ],
  },
  rewrite4c: {
    badge: "c",
    instruction: "Rewrite using descriptive language. Check the models.",
    items: [
      {
        id: 1,
        stem: "Most of these traditional buildings — brick and stone.",
        model:
          "The majority of these types of traditional buildings are constructed from brick and stone.",
      },
      {
        id: 2,
        stem: "This fitness device — small computer + battery.",
        model:
          "This fitness device consists of a small computer and a battery.",
      },
      {
        id: 3,
        stem: "The new stadium — long oval shape.",
        model: "The new stadium is shaped like a long oval.",
      },
      {
        id: 4,
        stem: "Many internal medical devices — very small diameter.",
        model:
          "Many internal medical devices are millimetres in diameter.",
      },
    ],
  },
};
