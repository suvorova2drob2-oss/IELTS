import type { MindsetFlowData } from "./flowTypes";
import { PASSAGE_U6_HOLOGRAM, PASSAGE_U6_VR } from "./readingPassages";

export const MS_U6_READ_STEPS = [
  "Word formation",
  "Summary + options",
  "Summary no options",
  "Short answers",
  "Exam · matching",
  "Exam · notes",
] as const;

export const MS_U6_READ_NEXT = [
  "Summary →",
  "No options →",
  "Short →",
  "Exam match →",
  "Exam notes →",
  "← Back to unit",
] as const;

export const readingU6: MindsetFlowData = {
  id: "ms-u6-reading-flow",
  bookPages: "pp. 114–121",
  sectionTitle: "Reading · Word form · Summary completion",
  unitGoals: [
    "complete summaries with and without word banks",
    "scan for acronyms and locating words",
    "understand prediction language in academic texts",
  ],
  steps: [...MS_U6_READ_STEPS],
  nextLabels: [...MS_U6_READ_NEXT],
  panels: [
    {
      kind: "gaps",
      badge: "1–2",
      instruction:
        "Correct the word-formation errors in the paragraph. Place the correct form for each numbered error.",
      passage: PASSAGE_U6_VR,
      tip: "All answers are from the answer key (incorrect → correct).",
      bank: [
        "research",
        "particular",
        "unimaginable",
        "development",
        "popular",
        "innocent",
        "noticeable",
        "substitute",
        "employed",
      ],
      items: [
        { id: "2", stem: "researches →", key: "research" },
        { id: "3", stem: "(in) particularly →", key: "particular" },
        { id: "4", stem: "imaginable (wrong polarity) →", key: "unimaginable" },
        { id: "5", stem: "developed →", key: "development" },
        { id: "6", stem: "popularly →", key: "popular" },
        { id: "7", stem: "innocence →", key: "innocent" },
        { id: "8", stem: "noticeably →", key: "noticeable" },
        { id: "9", stem: "substituted →", key: "substitute" },
        { id: "10", stem: "employment (is …) →", key: "employed" },
      ],
    },
    {
      kind: "match",
      badge: "4",
      instruction:
        "Complete the summary using the list of words, A–J, below. Write the correct letter, A–J.",
      passage: PASSAGE_U6_VR,
      tip: "1 A · 2 I · 3 E · 4 G · 5 D",
      bank: [
        { id: "A", text: "mainstream" },
        { id: "B", text: "interactive" },
        { id: "C", text: "unable" },
        { id: "D", text: "reluctant" },
        { id: "E", text: "outmoded" },
        { id: "F", text: "operational" },
        { id: "G", text: "incapable" },
        { id: "H", text: "essential" },
        { id: "I", text: "conceivable" },
        { id: "J", text: "functioning" },
      ],
      items: [
        {
          id: "1",
          stem: "There is some debate as to whether VR will ever become something used in a __________ way, rather than predominantly in niche areas of technology.",
          key: "A",
        },
        {
          id: "2",
          stem: "On the one hand, experts say it is __________ that by 2030, HMDs will have become part of our everyday lives.",
          key: "I",
        },
        {
          id: "3",
          stem: "On the other, it is also possible that they will go the same way as other __________ technologies, such as CDs or PDAs.",
          key: "E",
        },
        {
          id: "4",
          stem: "This is because most home consoles and computers are __________ of coping with the VR software.",
          key: "G",
        },
        {
          id: "5",
          stem: "Thus, even enthusiastic users are likely to be __________ to endure the resultant physical side-effects.",
          key: "D",
        },
      ],
    },
    {
      kind: "gaps",
      badge: "9",
      instruction:
        "Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer.",
      passage: PASSAGE_U6_VR,
      bank: [
        "far-reaching",
        "field / industry",
        "creativity",
        "secondary",
        "immersive world",
        "composition",
        "interconnected",
        "(avid) travellers",
      ],
      items: [
        {
          id: "1",
          stem: "The influence and effects of VR technology will be __________.",
          key: "far-reaching",
        },
        {
          id: "2",
          stem: "This will be most noticeable in one particular __________ – Video Games.",
          key: "field / industry",
          altKeys: ["field", "industry"],
        },
        {
          id: "3",
          stem: "Since games designers and developers are increasingly able to use their __________ in new ways, the conventional mechanics and concerns of game playing may become",
          key: "creativity",
        },
        {
          id: "4",
          stem: "… the conventional mechanics and concerns of game playing may become __________.",
          key: "secondary",
        },
        {
          id: "5",
          stem: "Further changes are likely to happen away from this field as well: teachers will be able to enter an __________ that enables learning to take place away from the typical classroom setting;",
          key: "immersive world",
        },
        {
          id: "6",
          stem: "Music students could theoretically listen to their latest __________ being played in the Sydney Opera House,",
          key: "composition",
        },
        {
          id: "7",
          stem: "while students of Medicine will be able to understand how so many parts of the human body are __________.",
          key: "interconnected",
        },
        {
          id: "8",
          stem: "Furthermore, differing approaches to travel may mean that fewer flights are taken, as people 'virtually' visit the destinations of their choice. This development is likely to please environmentalists as well as __________.",
          key: "(avid) travellers",
          altKeys: ["avid travellers", "travellers"],
        },
      ],
    },
    {
      kind: "gaps",
      badge: "11",
      instruction:
        "Label the diagram below. Choose NO MORE THAN TWO WORDS from the passage for each answer. (How a VR headset works)",
      passage: PASSAGE_U6_VR,
      bank: ["computer", "natural differences", "tailored picture", "aircraft flight"],
      items: [
        {
          id: "1",
          stem: "Transmission of data from __________",
          key: "computer",
        },
        {
          id: "2",
          stem: "Lenses accommodate the __________ in human vision",
          key: "natural differences",
        },
        {
          id: "3",
          stem: "Each eye views a __________",
          key: "tailored picture",
        },
        {
          id: "4",
          stem: "Creates the feeling of movement, based on motions of __________",
          key: "aircraft flight",
        },
      ],
    },
    {
      kind: "match",
      badge: "EXAM A",
      instruction:
        "Questions 1–5 — Complete the summary using the list of words, A–J, below. Write the correct letter, A–J.",
      passage: PASSAGE_U6_HOLOGRAM,
      tip: "1 G · 2 D · 3 F · 4 J · 5 A",
      bank: [
        { id: "A", text: "appeal" },
        { id: "B", text: "event" },
        { id: "C", text: "rehearsal" },
        { id: "D", text: "animation" },
        { id: "E", text: "screens" },
        { id: "F", text: "footage" },
        { id: "G", text: "concert" },
        { id: "H", text: "artists" },
        { id: "I", text: "innovation" },
        { id: "J", text: "studio" },
      ],
      items: [
        {
          id: "1",
          stem: "While the music industry has begun to explore potential uses for holographic technology in the context of live performance, critics argue that the staging of a __________ to include a fake performance from a deceased artist is both exploitative and morally questionable.",
          key: "G",
        },
        {
          id: "2",
          stem: "Despite a belief elsewhere that 3D __________ in live shows will inevitably become commonplace,",
          key: "D",
        },
        {
          id: "3",
          stem: "it is more likely that the lack of original __________ will limit how much can be achieved.",
          key: "F",
        },
        {
          id: "4",
          stem: "Additionally, real-time holographic concerts and tours could potentially be staged that allow the artists to remain in a practice __________ while performing,",
          key: "J",
        },
        {
          id: "5",
          stem: "but it is thought that this is unlikely to hold much __________ for audiences.",
          key: "A",
        },
      ],
    },
    {
      kind: "gaps",
      badge: "EXAM B",
      instruction:
        "Questions 6–9 — Label the diagram below. Choose NO MORE THAN TWO WORDS from the passage for each answer. (The projection of on-stage 3D animation)",
      passage: PASSAGE_U6_HOLOGRAM,
      bank: [
        "lighting rig",
        "beam",
        "mirrored surface",
        "transparent (foil)",
      ],
      items: [
        {
          id: "6",
          stem: "Laser projector attached to a __________",
          key: "lighting rig",
        },
        {
          id: "7",
          stem: "A laser projector shoots down an image __________",
          key: "beam",
        },
        {
          id: "8",
          stem: "Animation of artist hits a __________",
          key: "mirrored surface",
        },
        {
          id: "9",
          stem: "The screen is made of invisible __________ stretched at 45 degrees",
          key: "transparent (foil)",
          altKeys: ["transparent foil", "transparent"],
        },
      ],
    },
  ],
};
