export const WRITE_M5A_STEPS = [
  "1 Lead-in",
  "2 Structure",
  "3a–3b True/False",
  "4 Match trends",
  "5 Write 150 words",
  "6 Peer check",
] as const;

export const WRITE_M5A_NEXT = [
  "2 Structure →",
  "3a–3b Stats →",
  "4 Trends →",
  "5 Write →",
  "6 Peer →",
  "← К модулю",
] as const;

export const writingM5a = {
  id: "writing-m5a-flow",
  bookPages: "p. 78 in your coursebook",
  sectionTitle: "Writing · Task 1 (bar & pie charts)",
  expertWriting: "EXPERT WRITING page 195",
  leadIn: {
    badge: "1",
    instruction:
      "How do you think technology will change our homes in the future?",
    tip: "Technology will make our homes more environmentally friendly and efficient. There will be more ways to control our homes and maybe we will use different materials to build walls and roofs.",
  },
  structure2: {
    badge: "2",
    instruction:
      "Look at the charts about energy use in Australian homes. How many paragraphs would be logical? What could each paragraph cover?",
    tip: "Five paragraphs is logical: Introduction; Hot water and heating/cooling (largest); Fridges, freezers, lighting and other appliances (mid); Remaining categories; Brief overview.",
  },
  stats3: {
    badge: "3a",
    instruction:
      "Are the statements Correct or Incorrect according to the pie chart?",
    items: [
      {
        id: 1,
        text: "Exactly a quarter of energy in Australian homes was spent on water heating.",
        key: "Incorrect",
        correction:
          "Exactly a quarter of energy in Australian homes was spent on water heating. (If marked Incorrect in your edition, check the figure on the chart — TB lists statement 1 as Incorrect with this corrected wording for water heating.)",
      },
      {
        id: 2,
        text: "A statement that matches the chart accurately.",
        key: "Correct",
        correction: "",
      },
      {
        id: 3,
        text: "Over a third of all energy in Australian homes was used for heating and cooling.",
        key: "Incorrect",
        correction:
          "Over a third of all energy in Australian homes was used for heating and cooling. (Corrected form per TB 3b.)",
      },
      {
        id: 4,
        text: "Less than 10 percent of home energy use was for lighting.",
        key: "Incorrect",
        correction:
          "Less than 10 percent of home energy use was for lighting.",
      },
      {
        id: 5,
        text: "Fridges and freezers / lighting, other appliances and standby power / cooking accounted for just over 25 percent of total energy usage in the home.",
        key: "Incorrect",
        correction:
          "Fridges and freezers/lighting, other appliances and standby power/cooking accounted for just over 25 percent of total energy usage in the home.",
      },
    ],
    /** TB keys: 1 Incorrect, 2 Correct, 3–5 Incorrect */
    note: "Use the coursebook pie chart for 2008 Australian household energy. Keys: 1 Incorrect · 2 Correct · 3 Incorrect · 4 Incorrect · 5 Incorrect.",
  },
  trends4: {
    badge: "4",
    instruction: "Match the descriptions (1–3) with the trends (A–C).",
    items: [
      {
        id: 1,
        text: "The largest share of energy goes on controlling temperature.",
        key: "B",
      },
      {
        id: 2,
        text: "Water heating is the second largest category.",
        key: "C",
      },
      {
        id: 3,
        text: "Cooking and standby use comparatively little energy.",
        key: "A",
      },
    ],
    options: [
      {
        id: "A",
        text: "Day-to-day activities such as cooking and lights use little energy.",
      },
      {
        id: "B",
        text: "Heating and cooling dominate at around 38%.",
      },
      {
        id: "C",
        text: "Water heating accounts for exactly a quarter.",
      },
    ],
  },
  write5: {
    badge: "5",
    instruction:
      "Write at least 150 words describing the pie chart (energy use in Australian homes, 2008).",
    modelLabel: "Model answer (pie chart)",
    modelAnswer: `The pie chart illustrates how energy was used in Australian houses in 2008. Seven categories for energy use are given, which comprise the following: heating and cooling, water heating, the running of appliances such as fridges and freezers, other appliances, as well as energy used for cooking, lighting and keeping appliances on standby.

Although energy use was relatively spread out over the different categories, controlling the temperature of the home used the most energy with heating and cooling using over a third of all energy used, at 38 percent. The heating of water was the second largest use of energy and accounted for exactly a quarter of all energy use.

Looking at the chart, it can be seen that less energy was used when it came to running household appliances, such as televisions, accounting for 16 percent of energy use, whilst the two categories of lighting, and fridges and freezers, used only 7 percent of the total energy used each.

Lastly, cooking appliances contributed very little to overall energy use (at only 4 percent of the total), whilst electrical items left on stand-by used just 3 percent.

Overall, it can be seen that maintaining the temperature of the house used the greatest amount of energy by far, whereas day-to-day activities, such as cooking and the use of lights, used comparatively little.`,
  },
  peer6: {
    badge: "6",
    instruction:
      "Compare answers with a partner who wrote about the same graph. How could you improve your Task 1 writing?",
  },
};
