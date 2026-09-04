import windImg from "../assets/write-m2a-wind.png";
import windFullImg from "../assets/write-m2a-wind-full.png";
import oilsFullImg from "../assets/write-m2a-oils-full.png";

export const WRITE_M2A_STEPS = [
  "1 Lead-in",
  "2a Diagram",
  "2b Order words",
  "2c Order sentences",
  "2d Introduction",
  "3a Active / passive",
  "3b Change voice",
  "3c Discuss",
  "4 Write process",
] as const;

export const WRITE_M2A_NEXT = [
  "2a Diagram →",
  "2b Order words →",
  "2c Order sentences →",
  "2d Introduction →",
  "3a Active / passive →",
  "3b Change voice →",
  "3c Discuss →",
  "4 Write →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[.,;:!?]+$/g, "");
}

export function checkWriteM2a(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export const writingM2a = {
  id: "writing-m2a-flow",
  bookPages: "p. 30 in your coursebook",
  sectionTitle: "Writing · Task 1 (process)",
  leadIn: {
    badge: "1",
    instruction:
      "What do you think is the greatest invention in your lifetime? Why?",
    suggestedTitle: "Suggested answer",
    suggestedAnswer: [
      "I'd say the smartphone is probably the greatest invention in my lifetime, mainly because it has transformed the way we communicate, work and access information.",
      "Before smartphones, you couldn't video-call family abroad, manage your bank account or find directions instantly from one device. That level of convenience has changed everyday life for millions of people.",
      "Of course, there are downsides like distraction and privacy concerns, but overall I think the benefits — especially for education and staying connected — outweigh the negatives.",
    ],
  },
  diagram: {
    badge: "2a",
    heading: "Write introductions and processes",
    expert: "EXPERT WRITING page 192",
    instruction:
      "Look at the following process. With a partner, describe what is happening. Where does the process start? What is the final stage?",
    title: "How wind turbines produce electricity",
    image: windFullImg,
    imageCompact: windImg,
    imageAlt:
      "Diagram: air turns rotor blades, generator, cable, substation, then low-voltage electricity to houses.",
  },
  orderWords: {
    badge: "b",
    instruction:
      "Put the words below in the order of the process shown in the diagram.",
    bank: [
      "air",
      "cable",
      "generator",
      "houses",
      "rotor blades",
      "substation",
    ],
    key: [
      "air",
      "rotor blades",
      "generator",
      "cable",
      "substation",
      "houses",
    ],
  },
  orderSentences: {
    badge: "c",
    instruction:
      "Number the sentences in the correct order to describe the process in Exercise 2a.",
    items: [
      {
        id: "A",
        text: "The electricity passes through a cable in the wind turbine.",
      },
      {
        id: "B",
        text: "The rotor blades are turned when air blows through them.",
      },
      {
        id: "C",
        text: "The voltage of the electricity is changed in the substation.",
      },
      {
        id: "D",
        text: "Electricity is produced by the generator.",
      },
      {
        id: "E",
        text: "The generator is turned by the rotor blades.",
      },
      {
        id: "F",
        text: "The low-voltage electricity is supplied to the houses.",
      },
    ],
    key: ["B", "E", "D", "A", "C", "F"],
  },
  intro: {
    badge: "d",
    instruction: "Which introduction best describes the process in Exercise 2a?",
    options: [
      {
        id: 1,
        text: "The diagram shows how electricity is produced by wind turbines. There are several stages in the process which explain how the turbine generates electricity and how it is transmitted to houses.",
      },
      {
        id: 2,
        text: "This diagram demonstrates how wind turbines are constructed. It shows the parts of the wind turbine and the function of each part.",
      },
      {
        id: 3,
        text: "The process diagram explains the main use of wind turbines. This main use is to supply many houses with as much electricity as they require.",
      },
    ],
    key: 1,
  },
  activePassive: {
    badge: "3a",
    heading: "Use the active and passive",
    instruction: "Which sentence is active and which is passive?",
    items: [
      {
        id: 1,
        text: "Electricity is produced by the generator.",
        key: "passive",
      },
      {
        id: 2,
        text: "The electricity passes through a cable in the wind turbine.",
        key: "active",
      },
    ],
  },
  changeVoice: {
    badge: "b",
    instruction:
      "Look at the following sentences which describe the diagram in Exercise 2a. Change the passive forms to active and the active forms to passive.",
    items: [
      {
        id: 1,
        text: "The diagram shows how the wind turbine generates electricity.",
        answers: [
          "How the wind turbine generates electricity is shown in the diagram",
          "How electricity is generated by the wind turbine is shown in the diagram",
          "The way the wind turbine generates electricity is shown in the diagram",
        ],
      },
      {
        id: 2,
        text: "The rotor blades are turned by the movement of the air.",
        answers: [
          "The movement of the air turns the rotor blades",
          "Air movement turns the rotor blades",
          "The movement of the air turns the rotor blades.",
        ],
      },
      {
        id: 3,
        text: "The substation transforms the electricity from high voltage to low voltage.",
        answers: [
          "The electricity is transformed from high voltage to low voltage by the substation",
          "The electricity is transformed from high voltage to low voltage in the substation",
          "Electricity is transformed from high to low voltage by the substation",
        ],
      },
      {
        id: 4,
        text: "The electricity is transmitted to houses along underground cables.",
        answers: [
          "Underground cables transmit the electricity to houses",
          "Cables transmit the electricity to houses",
          "Underground cables transmit electricity to houses",
        ],
      },
    ],
  },
  discussProcess: {
    badge: "c",
    instruction:
      "Work in pairs. Think of a process that you are familiar with and describe it using the active and/or passive.",
    cue: "Use active and/or passive",
    suggestedTitle: "Suggested answer",
    suggestedAnswer: [
      "One process I'm very familiar with is making a cup of tea. First, the kettle is filled with water and switched on.",
      "While the water is being heated, a teabag is placed in a mug. When the water has boiled, it is poured over the teabag and the tea is left to brew for two or three minutes.",
      "Finally, the teabag is removed and milk or sugar can be added if desired. The whole process takes about five minutes from start to finish.",
    ],
  },
  write: {
    badge: "4a–4b",
    planInstruction:
      "Look at the process diagram below. Think of an introduction and the stages of the process. Make a plan of what to include.",
    writeInstruction:
      "Read the strategies and write your answer. Remember to:",
    strategies: [
      "describe the overall process in the introduction.",
      "stage your answer logically.",
      "use the passive when appropriate.",
    ],
    title: "The process of producing edible oils and fats, and margarine.",
    image: oilsFullImg,
    imageAlt:
      "Process diagram from raw materials through ship, silo, crushing, pressing, filtering, steaming to edible oils and supermarket.",
    suggestedAnswer: `The diagram shows how edible fats and oils are made and shows all the stages involved, from collecting the raw materials to producing the oils and fats. There are nine stages in this process, which will be outlined below.

Firstly, the raw materials, such as sunflowers, palm oil and nuts, are collected and transported by ship to a silo. At this point the raw materials are crushed and milled in order to extract the oil, then the materials are pressed. The next stage is refining. At this stage the oils are then filtered and steamed. It is at this point that the oils become edible. Different oils are made from this process, examples of which are coconut oil, sunflower oil and refined oils. These are used to make edible oils and fats which are then transported to supermarkets and shops to be sold.

Overall, the process of making edible oils and fats largely entails cleaning and purifying in order for the oils to be fit for human consumption or further manufacturing processes.`,
  },
};

export type WritingM2aData = typeof writingM2a;
