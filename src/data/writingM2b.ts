import volcanoImg from "../assets/write-m2b-volcano.png";
import diagramImg from "../assets/write-m2b-diagram.png";
import diagramFullImg from "../assets/write-m2b-diagram-full.png";

export const WRITE_M2B_STEPS = [
  "1 Lead-in",
  "2 Understand",
  "3 Plan",
  "4 Cohesion",
  "5 Language",
  "6 Write",
] as const;

export const WRITE_M2B_NEXT = [
  "2 Understand →",
  "3 Plan →",
  "4 Cohesion →",
  "5 Language →",
  "6 Write →",
  "← К модулю",
] as const;

export type CohesionBit =
  | { text: string }
  | { gap: number };

export function isCohesionGap(part: CohesionBit): part is { gap: number } {
  return "gap" in part;
}

export type ItalBit =
  | { text: string }
  | { gap: number; options: string[]; key: string };

export function isWriteItalGap(
  part: ItalBit,
): part is { gap: number; options: string[]; key: string } {
  return "gap" in part;
}

export const writingM2b = {
  id: "writing-m2b-flow",
  bookPages: "pp. 36–37 in your coursebook",
  sectionTitle: "Writing · Task 1 (process)",
  leadIn: {
    badge: "1",
    heading: "Lead-in",
    instruction:
      "What do you think is happening in the photo? What is the person doing? Why do you think he’s doing it? Would you do this?",
    image: volcanoImg,
    imageAlt:
      "Person in a silver heat suit standing on volcanic rock beside glowing lava.",
  },
  understand: {
    badge: "2",
    heading: "Understand the task",
    expert: "EXPERT WRITING page 192",
    instruction:
      "Look at the diagram of the formation of a supervolcano and answer the questions.",
    taskBox: [
      "The diagram below shows the formation of a supervolcano and the stages involved.",
      "Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      "Write at least 150 words.",
    ],
    diagramTitle: "The formation of supervolcanoes",
    image: diagramFullImg,
    imageCompact: diagramImg,
    imageAlt:
      "Four-stage cycle diagram: magma chamber, pressure and fissures, eruption with smoke and lava, then land depression.",
    questions: [
      {
        q: "What is the process shown in the diagram?",
        tip: "The formation of a supervolcano (and the stages involved).",
      },
      {
        q: "Where does the process start and finish?",
        tip: "It starts with a magma chamber forming in the mantle/crust and finishes with a land depression and a reduced magma chamber (then the cycle can begin again).",
      },
      {
        q: "What information should you include in the introductory sentence(s) about the process?",
        tip: "What the diagram shows (formation of a supervolcano) and that it has stages / is divided into stages.",
      },
      {
        q: "How many stages are there in the process?",
        tip: "Four stages.",
      },
      {
        q: "What is the order of these stages?",
        tip: "1 Magma chamber forms → 2 Pressure builds / fissures appear → 3 Magma rises / eruption (smoke and lava) → 4 Land depression / chamber reduced in size.",
      },
    ],
  },
  plan: {
    heading: "Plan the task",
    a: {
      badge: "3a",
      instruction:
        "Read the coherence and cohesion descriptors on page 190. With a partner, discuss the differences between bands 6 and 7.",
      descriptorsPage: "Expert Writing · page 190 · Writing Task 1",
      descriptorsTitle: "Coherence and Cohesion",
      openLabel: "Open page 190 · Coherence & Cohesion",
      hideLabel: "Hide page 190",
      discussCue: "Discuss bands 6 vs 7 with a partner",
      descriptors: {
        band6: [
          "arranges information and ideas coherently and there is a clear overall progression",
          "uses cohesive devices effectively, but cohesion within and/or between sentences may be faulty or mechanical",
          "may not always use referencing clearly or appropriately",
        ],
        band7: [
          "logically organises information and ideas; there is clear progression throughout",
          "uses a range of cohesive devices appropriately although there may be some under-/over-use",
        ],
      },
    },
    b: {
      badge: "3b",
      instruction:
        "Read the sentences below and tick those which are true about your own writing.",
      items: [
        "I organise my ideas/points logically.",
        "I organise my ideas/points step-by-step and ensure I write about how these are connected.",
        "I organise my ideas/points in a logical step-by-step way, referring back and forwards to show how they develop the overall idea/point.",
        "I make an effort to move from one point to another using cohesive devices (before, when, etc.).",
        "I know a few cohesive devices that I can use well.",
        "I know a lot of cohesive devices and some I can use well.",
        "I know a lot of cohesive devices and I can use them well.",
      ],
    },
  },
  cohesion: {
    badge: "4",
    instruction:
      "Complete the text with the phrases in the box to improve the cohesion.",
    bank: [
      "As they begin to melt",
      "as well as",
      "that have jet engines",
      "When these particles stick",
    ],
    key: {
      1: "that have jet engines",
      2: "As they begin to melt",
      3: "as well as",
      4: "When these particles stick",
    } as Record<number, string>,
    title: "Danger in the skies",
    parts: [
      {
        text: "Volcanoes do not just affect those on land, they can also cause problems for those in the air. Volcanic ash can be particularly dangerous for airplanes ",
      },
      { gap: 1 },
      {
        text: ". The ash particles from the eruption can be melted by the high temperatures of the jet. ",
      },
      { gap: 2 },
      {
        text: ", they stick to the blades of the turbine, ",
      },
      { gap: 3 },
      {
        text: " other parts of the plane. ",
      },
      { gap: 4 },
      {
        text: ", they can change the shapes of parts, and block the engines.",
      },
    ] satisfies CohesionBit[],
  },
  language: {
    heading: "Language and content",
    a: {
      badge: "5a",
      instruction:
        "Look at the verbs below. What nouns do you think they go with in the diagram in Exercise 2? Discuss your answers with a partner.",
      verbs: [
        "break",
        "cause",
        "collapse",
        "drop",
        "expand",
        "fall",
        "fill",
        "flow",
        "force",
        "push",
        "reduce",
        "rise",
        "separate",
        "tear",
      ],
      tip: "Examples from the diagram: fill a chamber · expand (the chamber) · push / cause pressure · separate / tear (the surface) · rise (magma) · flow (lava) · cause an eruption · reduce (size) · collapse (land / surface).",
    },
    b: {
      badge: "5b",
      instruction:
        "Choose the correct option in italics to complete the sentences, according to the diagram in Exercise 2.",
      items: [
        {
          id: 1,
          before: "The chamber is ",
          options: ["filled", "collapsed"],
          key: "filled",
          after: " with magma.",
        },
        {
          id: 2,
          before: "The magma ",
          options: ["rises", "breaks"],
          key: "rises",
          after: " to the surface.",
        },
        {
          id: 3,
          before: "The eruption is ",
          options: ["pushed", "caused"],
          key: "caused",
          after: " by pressure.",
        },
        {
          id: 4,
          before: "The fissures ",
          options: ["reduce", "separate"],
          key: "separate",
          after: ".",
        },
        {
          id: 5,
          before: "The surface is ",
          options: ["torn", "expanded"],
          key: "torn",
          after: ".",
        },
      ],
    },
  },
  write: {
    heading: "Write your summary",
    badge: "6a",
    planInstruction:
      "Write your plan and check it. Have you included the following?",
    checklist: [
      "An introductory sentence or sentences about the process",
      "A step-by-step description",
      "Passive and active tenses",
      "Verbs to accurately represent the picture",
      "Use of relative clauses to add information",
      "Sequential linking",
    ],
    writeInstruction: "Write at least 150 words.",
    modelLabel: "Model answer",
    modelAnswer: `The diagram, which is divided into four stages, shows the process of how a supervolcano is formed. This is largely caused by the development of a magma chamber, which puts pressure on the Earth from below.

First of all, a magma chamber is formed in the Earth’s crust. This is then filled with magma which rises from inside the Earth’s mantle. In the next stage, this magma chamber expands in the crust, which is just under the surface of the Earth, and this in turn puts pressure on the Earth’s surface, causing fissures to appear. These fissures then erupt on the surface. The eruptions produce smoke and lava. In the final stage, the eruptions cause the land on the surface to depress. When the land sinks, the magma chamber, which now has no magma inside, reduces in size.

Overall, supervolcanoes are a natural process caused by changes in the Earth’s mantle. These changes put pressure on the land and eventually turn into large volcanoes.`,
  },
};

export type WritingM2bData = typeof writingM2b;
