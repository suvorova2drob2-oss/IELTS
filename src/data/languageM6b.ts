export const LANG_M6B_STEPS = [
  "1a–1b Cleft rewrite",
  "1c Speak",
  "2a There/It gaps",
  "2b Incorrect/Correct",
  "2c–2d Practice",
] as const;

export const LANG_M6B_NEXT = [
  "1c Speak →",
  "2a There/It →",
  "2b Incorrect/Correct →",
  "2c–2d Practice →",
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

export function checkLangM6b(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export const languageM6b = {
  id: "language-m6b-flow",
  bookPages: "p. 96 in your coursebook",
  sectionTitle: "Language · Cleft sentences; there / it",
  grammarRef: "EXPERT GRAMMAR page 179",
  cleft1a: {
    badge: "1a",
    instruction:
      "Which sentence puts new information in focus with It… / What…?",
    items: [
      {
        id: "A",
        text: "It was the laptop that was stolen from my bag.",
        key: "1",
        tip: "Focus on the laptop (new information).",
      },
      {
        id: "B",
        text: "What was stolen from my bag was the laptop.",
        key: "2",
        tip: "What-cleft also highlights the laptop.",
      },
    ],
  },
  rewrite1b: {
    badge: "b",
    instruction: "Rewrite using It… or What… clefts. Check the models.",
    items: [
      {
        id: 1,
        stem: "I enjoyed the plot of the Agatha Christie novel the most.",
        model:
          "What I enjoyed (the) most was the plot of the Agatha Christie novel.",
      },
      {
        id: 2,
        stem: "The bank robbers were caught because of the security footage.",
        model:
          "It was because of the security footage that the bank robbers were caught.",
      },
      {
        id: 3,
        stem: "Transporting food across borders is illegal due to possible contamination.",
        model:
          "It is due to possible contamination that transporting food across borders is illegal.",
      },
      {
        id: 4,
        stem: "We need a fairer way to conduct trials in this country.",
        model:
          "What we need is a fairer way to conduct trials in this country.",
      },
      {
        id: 5,
        stem: "The police interviewed all the witnesses first.",
        model:
          "What the police did first was (to) interview all the witnesses.",
      },
      {
        id: 6,
        stem: "My brother had his wallet stolen while he was on holiday.",
        model:
          "It was while he was on holiday that my brother had his wallet stolen. / It was his wallet that my brother had stolen while he was on holiday.",
      },
      {
        id: 7,
        stem: "I liked the special effects in the movie more than the acting or the music.",
        model:
          "What I liked in the movie more than the acting or the music was the special effects.",
      },
      {
        id: 8,
        stem: "The scenery impressed me more than anything else when I went on holiday to Scotland.",
        model:
          "It was the scenery that impressed me more than anything else when I went on holiday to Scotland.",
      },
    ],
  },
  speak1c: {
    badge: "c",
    instruction:
      "Prepare short answers with a What… / It… cleft about a surprising meeting, a sport you’d love to try, an important day, and a place you’d love to visit.",
  },
  thereIt2a: {
    badge: "2a",
    instruction: "Complete with there or it.",
    bank: ["there", "it"],
    items: [
      {
        id: 1,
        before: "Is ",
        after: " any evidence left at the scene?",
        answers: ["there"],
      },
      {
        id: 2,
        before: "",
        after: " is important to interview witnesses quickly.",
        answers: ["it"],
      },
      {
        id: 3,
        before: "",
        after: " seems that the suspect has left the country.",
        answers: ["it"],
      },
      {
        id: 4,
        before: "",
        after: " used to be more police on the streets.",
        answers: ["there"],
      },
      {
        id: 5,
        before: "",
        after: " takes time to analyse forensic samples.",
        answers: ["it"],
      },
      {
        id: 6,
        before: "",
        after: " remains little doubt about his guilt.",
        answers: ["there"],
      },
      {
        id: 7,
        before: "",
        after: " is no use denying the facts.",
        answers: ["it"],
      },
    ],
  },
  incorrect2b: {
    badge: "b",
    instruction: "Mark each sentence Correct or Incorrect. Fix Incorrect ones.",
    items: [
      {
        id: 1,
        text: "It was a long queue outside the police station.",
        verdict: "Incorrect",
        tip: "Incorrect – there (There was a long queue…)",
      },
      {
        id: 2,
        text: "It is essential to keep the crime scene secure.",
        verdict: "Correct",
        tip: "Correct",
      },
      {
        id: 3,
        text: "There appears that the window was forced open.",
        verdict: "Incorrect",
        tip: "Incorrect – it (It appears that…)",
      },
      {
        id: 4,
        text: "There is no excuse for contaminating evidence.",
        verdict: "Correct",
        tip: "Correct",
      },
      {
        id: 5,
        text: "It takes skill to notice tiny fibres.",
        verdict: "Correct",
        tip: "Correct",
      },
      {
        id: 6,
        text: "There is unlikely that cameras caught everything.",
        verdict: "Incorrect",
        tip: "Incorrect – it (It is unlikely that…)",
      },
    ],
  },
  practice2c: {
    badge: "c",
    instruction: "Complete with There or It (capitalise as needed).",
    bank: ["There", "It", "there", "it"],
    items: [
      {
        id: 1,
        before: "",
        after: " was a breakthrough when DNA matching became routine.",
        answers: ["There"],
      },
      {
        id: 2,
        before: "",
        after: " is clear that training matters for recognisers.",
        answers: ["It"],
      },
      {
        id: 3,
        before: "",
        after: " may be delays before lab results arrive.",
        answers: ["There"],
      },
      {
        id: 4,
        before: "",
        after: " surprised everyone that the suspect confessed.",
        answers: ["It"],
      },
      {
        id: 5,
        before: "",
        after: " are several cameras covering the entrance.",
        answers: ["There"],
      },
      {
        id: 6,
        before: "In the end, ",
        after: " was teamwork that solved the case.",
        answers: ["it"],
      },
    ],
  },
  practice2d: {
    badge: "d",
    instruction:
      "Write four sentences of your own using there / it correctly about crime or policing.",
  },
};
