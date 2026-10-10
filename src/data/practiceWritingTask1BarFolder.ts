import type { Task1BarData } from "./practiceWritingTask1Models";

export const T1_BAR_FOLDER_ID = "t1-bar-folder";
export const T1_BAR_MASTER_ID = "t1-bar";

export interface GroupedBarPhraseBlock {
  tag: string;
  job: string;
  /** Выбери одно начало абзаца. */
  openers: string[];
  /** Склей 1–2 предложения; … = твои слова/цифры с графика. */
  frames: string[];
  /** На одно место в тексте — любой вариант из списка. */
  swaps: { slot: string; options: string[] }[];
}

/** Меню подстановок — одно на все grouped bar charts (4 абзаца). */
export const GROUPED_BAR_PHRASE_BLOCKS: GroupedBarPhraseBlock[] = [
  {
    tag: "1 · Intro",
    job: "Перефраз вопроса. Цифр нет.",
    openers: [
      "The bar chart compares the proportion of …",
      "The bar chart compares the percentage of …",
      "The chart illustrates how …",
      "The bar graph shows the proportion of …",
    ],
    frames: [
      "… in [country/city A], [B] and [C] in [year].",
      "… in [three places] in [year], broken down by [four categories].",
    ],
    swaps: [
      {
        slot: "что сравниваем",
        options: [
          "electricity generated from …",
          "household waste disposed of / recycled, sent to landfill, …",
          "journeys to work made by car, public transport, …",
          "daily water use accounted for by …",
        ],
      },
    ],
  },
  {
    tag: "2 · Overview",
    job: "2–3 главных контраста. Без точных %.",
    openers: ["Overall, …", "Overall, it is clear that …"],
    frames: [
      "[X] was by far the largest source in [place A], whereas [Y] dominated in [B] and [Z] in [C].",
      "[Place A] relied most heavily on [category], whereas [B] and [C] depended more on [other].",
      "[Category] was the dominant mode in [place], while [other category] played a much larger role in [other places].",
      "[Small category] remained a relatively minor share everywhere / in all three countries.",
    ],
    swaps: [
      { slot: "конtrast 1", options: ["whereas", "while", "on the other hand"] },
      {
        slot: "сильная доля",
        options: [
          "was by far the largest",
          "was the dominant",
          "played a much larger role",
          "relied most heavily on",
        ],
      },
      {
        slot: "мелкая доля",
        options: [
          "remained a relatively minor share",
          "made up a relatively small proportion",
          "was comparatively low everywhere",
        ],
      },
    ],
  },
  {
    tag: "3 · Details",
    job: "Одна категория (самая яркая) + цифры + сравнение стран.",
    openers: [
      "In [place], [category] accounted for …",
      "[Category] accounted for around [X]% in [place A], …",
    ],
    frames: [
      "… around [X]%, followed by [category B] at about [Y]%.",
      "… roughly [X]%, which was more than [one and a half / two / three] times the figure for [place B] ([Y]%).",
      "… about [X]%, compared with [Y]% in [place B] and [Z]% in [place C].",
      "… at [X]% and [Y]% in [B] and [C] respectively.",
      "… at about [X]%, which was considerably higher than in [B] and [C], where it stood at roughly [Y]% and [Z]% respectively.",
    ],
    swaps: [
      { slot: "доля", options: ["accounted for", "represented", "stood at", "made up"] },
      { slot: "второе место", options: ["followed by … at …", "with … at …", "and … at … respectively"] },
      {
        slot: "сравнение",
        options: [
          "compared with",
          "which was considerably higher than",
          "which was more than … times",
          "relative to",
        ],
      },
    ],
  },
  {
    tag: "4 · Details",
    job: "Вторая категория + остальное. Мелочь — одним ranging from.",
    openers: [
      "By contrast, [category] …",
      "[Category] was by far the largest … in [place], at approximately [X]%.",
    ],
    frames: [
      "… provided / made up approximately [X]% in [A], compared with [Y]% in [B] and less than [Z]% in [C].",
      "… only about [X]% and [Y]% in [A] and [B] respectively.",
      "… roughly [X]% of … in [place], nearly double the share in [other place] ([Y]%).",
      "[Category] ranged from about [X]% in [A] to [Y]% in [B], with [C] in the middle at [Z]%.",
      "[Category] made up the smallest share in [place] ([X]%) but reached about [Y]% in [other].",
    ],
    swaps: [
      { slot: "переход", options: ["By contrast,", "In contrast,", "Turning to …,"] },
      { slot: "диапазон", options: ["ranged from … to …", "varied from … to …", "from … to …"] },
      {
        slot: "кратно",
        options: ["nearly double", "almost twice as high as", "more than twice", "half the figure for"],
      },
    ],
  },
];

export interface Task1BarHomework {
  id: string;
  number: number;
  title: string;
  question: string;
  usually: string;
  barData: Task1BarData;
}

export const groupedBarHomework: Task1BarHomework[] = [
  {
    id: "t1-hw-waste",
    number: 1,
    title: "Household waste",
    question:
      "The chart shows how household waste was disposed of in the UK, Germany and Sweden in 2015.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    usually:
      "Recycling: Germany highest. Landfill: UK. Incineration: Sweden. Одна категория — три страны.",
    barData: {
      chartTitle: "Household waste by disposal method, 2015 (%)",
      yAxis: "% of waste",
      max: 70,
      categories: [
        { label: "Recycling", color: "#7dce82" },
        { label: "Landfill", color: "#8a9aaa" },
        { label: "Incineration", color: "#e0c08a" },
        { label: "Compost", color: "#6eb5c0" },
      ],
      groups: [
        { label: "UK", values: [45, 25, 20, 10] },
        { label: "Germany", values: [65, 5, 25, 5] },
        { label: "Sweden", values: [50, 3, 35, 12] },
      ],
    },
  },
  {
    id: "t1-hw-commute",
    number: 2,
    title: "Commuting to work",
    question:
      "The chart shows the percentage of journeys to work made by car, public transport, on foot and by bicycle in London, Amsterdam and Copenhagen in 2019.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    usually:
      "London → public transport. Amsterdam/Copenhagen → bicycle. Car похож; walking мелко.",
    barData: {
      chartTitle: "Journeys to work by mode, 2019 (%)",
      yAxis: "% of journeys",
      max: 50,
      categories: [
        { label: "Car", color: "#8a9aaa" },
        { label: "Public transport", color: "#6eb5c0" },
        { label: "Walking", color: "#e0c08a" },
        { label: "Bicycle", color: "#7dce82" },
      ],
      groups: [
        { label: "London", values: [35, 45, 12, 8] },
        { label: "Amsterdam", values: [25, 20, 15, 40] },
        { label: "Copenhagen", values: [30, 25, 10, 35] },
      ],
    },
  },
  {
    id: "t1-hw-water",
    number: 3,
    title: "Daily water use",
    question:
      "The chart shows the percentage of daily water use accounted for by bathing, toilet flushing, washing clothes and other uses in the USA, the UK and Denmark in 2020.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    usually:
      "Toilet и bathing — крупные доли. Denmark часто ниже USA по bathing. Other — мелко везде.",
    barData: {
      chartTitle: "Daily household water use by purpose, 2020 (%)",
      yAxis: "% of water use",
      max: 40,
      categories: [
        { label: "Bathing", color: "#6eb5c0" },
        { label: "Toilet", color: "#8a9aaa" },
        { label: "Washing", color: "#e0c08a" },
        { label: "Other", color: "#7dce82" },
      ],
      groups: [
        { label: "USA", values: [32, 28, 18, 22] },
        { label: "UK", values: [28, 30, 20, 22] },
        { label: "Denmark", values: [22, 26, 22, 30] },
      ],
    },
  },
  {
    id: "t1-hw-farm",
    number: 4,
    title: "Farm income sources",
    question:
      "The chart shows the percentage of farm income from crops, livestock, government subsidies and other sources in France, Italy and Spain in 2018.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    usually:
      "Crops vs livestock — разный баланс по странам. Subsidies заметны во France. Other — мелко.",
    barData: {
      chartTitle: "Farm income by source, 2018 (%)",
      yAxis: "% of income",
      max: 50,
      categories: [
        { label: "Crops", color: "#7dce82" },
        { label: "Livestock", color: "#c4a574" },
        { label: "Subsidies", color: "#e0c08a" },
        { label: "Other", color: "#8a9aaa" },
      ],
      groups: [
        { label: "France", values: [38, 22, 28, 12] },
        { label: "Italy", values: [32, 35, 18, 15] },
        { label: "Spain", values: [45, 28, 12, 15] },
      ],
    },
  },
  {
    id: "t1-hw-school-energy",
    number: 5,
    title: "Energy in schools",
    question:
      "The chart shows the percentage of energy used for heating, lighting, computers and other equipment in primary schools in Canada, Finland and Singapore in 2022.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    usually:
      "Heating доминирует в Finland/Canada. Singapore — меньше heating, больше computers. Lighting сравнить.",
    barData: {
      chartTitle: "School energy use by purpose, 2022 (%)",
      yAxis: "% of energy",
      max: 50,
      categories: [
        { label: "Heating", color: "#e0c08a" },
        { label: "Lighting", color: "#6eb5c0" },
        { label: "Computers", color: "#7dce82" },
        { label: "Other", color: "#8a9aaa" },
      ],
      groups: [
        { label: "Canada", values: [42, 22, 18, 18] },
        { label: "Finland", values: [48, 18, 14, 20] },
        { label: "Singapore", values: [18, 24, 32, 26] },
      ],
    },
  },
  {
    id: "t1-hw-tourism",
    number: 6,
    title: "Tourism spending",
    question:
      "The chart shows the percentage of tourism spending on accommodation, food, transport and leisure activities in Greece, Turkey and Portugal in 2019.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    usually:
      "Accommodation — часто №1. Food vs leisure — контраст. Transport — средняя доля.",
    barData: {
      chartTitle: "Tourism spending by category, 2019 (%)",
      yAxis: "% of spending",
      max: 45,
      categories: [
        { label: "Accommodation", color: "#6eb5c0" },
        { label: "Food", color: "#c4a574" },
        { label: "Transport", color: "#8a9aaa" },
        { label: "Leisure", color: "#7dce82" },
      ],
      groups: [
        { label: "Greece", values: [38, 28, 14, 20] },
        { label: "Turkey", values: [32, 30, 18, 20] },
        { label: "Portugal", values: [35, 26, 16, 23] },
      ],
    },
  },
];

export function getBarHomework(id: string): Task1BarHomework | undefined {
  return groupedBarHomework.find((h) => h.id === id);
}
