/** Task 1 graph templates — bar, pie, table, map, mixed. Separate from Tests 1–4. */

export interface Task1ModelPlan {
  label: string;
  phrases: string[];
  must: string;
  avoid: string;
  example: string;
}

export interface Task1Model {
  id: string;
  number: number;
  band: string;
  kind: "bar" | "pie" | "table" | "map" | "mixed";
  type: string;
  title: string;
  question: string;
  usually: string;
  insert: string;
  paragraphs: string[];
  plan: Task1ModelPlan[];
}

export const T1_LINKING_ID = "t1-linking";

export const practiceWritingTask1Models: Task1Model[] = [
  {
    id: "t1-bar",
    number: 1,
    band: "7.5",
    kind: "bar",
    type: "Task 1 · Bar chart",
    title: "Electricity by source",
    question:
      "The chart shows how electricity was generated in the UK, France and Australia in 2010.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    usually:
      "Самый высокий и самый низкий столбец. Одна категория сразу по трём странам. Не читать график слева направо по каждому столбику.",
    insert:
      "Overall + The most striking feature + by far → accounted for + followed by + compared with + respectively → The reverse was true of + ranging from … to …",
    paragraphs: [
      "The bar chart compares the proportion of electricity generated from coal, gas, nuclear power and renewables in the UK, France and Australia in 2010.",
      "==Overall,== the three countries relied on very different mixes. ==The most striking feature is== the size of nuclear power in France. Coal ==was by far the largest== source in Australia, ==whereas== the UK depended most heavily on gas.",
      "In France, nuclear energy ==accounted for== around 70% of electricity, ==followed by== renewables ==at== about 12%. This was more than four times the UK nuclear figure of roughly 15%, ==compared with== no nuclear generation at all in Australia. Gas stood at about 40% in the UK and at 10% and just over 20% in France and Australia ==respectively==.",
      "==The reverse was true of== coal, which provided approximately 60% of Australia’s electricity, 35% in the UK and less than 10% in France. Renewables made up a relatively small share in all three countries, ==ranging from== around 10% in the UK ==to== just under 20% in Australia.",
    ],
    plan: [
      {
        label: "1 · Introduction",
        phrases: ["The bar chart compares …"],
        must: "Тип графика. Что за столбики. Где. Когда.",
        avoid: "Цифры в intro. Копировать заголовок слово в слово. We can see that.",
        example:
          "The bar chart compares the proportion of electricity generated from coal, gas, nuclear power and renewables in the UK, France and Australia in 2010.",
      },
      {
        label: "2 · Overview",
        phrases: [
          "Overall, …",
          "The most striking feature is …",
          "X was by far the largest …",
          "whereas …",
        ],
        must: "Две-три главные черты: кто лидер в каждой стране / самый большой столбец.",
        avoid: "70% и 15%. Firstly. Перечислить каждый столбик.",
        example:
          "Overall, the three countries relied on very different mixes. The most striking feature is the size of nuclear power in France. Coal was by far the largest source in Australia, whereas the UK depended most heavily on gas.",
      },
      {
        label: "3 · Big group",
        phrases: [
          "X accounted for …",
          "followed by … at …",
          "compared with …",
          "… and … respectively",
        ],
        must: "Лидеры с цифрами. Сравнение стран в одном предложении (compared with / respectively).",
        avoid: "Слева направо все 12 столбиков. Только UK, потом отдельно France — без сравнения.",
        example:
          "In France, nuclear energy accounted for around 70% of electricity, followed by renewables at about 12%. This was more than four times the UK nuclear figure of roughly 15%, compared with no nuclear generation at all in Australia. Gas stood at about 40% in the UK and at 10% and just over 20% in France and Australia respectively.",
      },
      {
        label: "4 · The rest",
        phrases: ["The reverse was true of …", "ranging from … to …"],
        must: "Обратная картина (coal). Мелкие категории одним ranging from … to …",
        avoid: "Повторить overview. Забыть renewables. Новые страны, которых нет на графике.",
        example:
          "The reverse was true of coal, which provided approximately 60% of Australia’s electricity, 35% in the UK and less than 10% in France. Renewables made up a relatively small share in all three countries, ranging from around 10% in the UK to just under 20% in Australia.",
      },
    ],
  },
  {
    id: "t1-pie",
    number: 2,
    band: "7.5",
    kind: "pie",
    type: "Task 1 · Pie charts",
    title: "Household spending",
    question:
      "The charts show how a typical household in one country spent its money in 2000 and in 2020.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    usually:
      "Самый большой кусок в каждом круге. Что выросло и что упало. Не описывать круги по отдельности без сравнения.",
    insert:
      "Overall + whereas + while → accounted for + followed by + respectively + ranging from → had risen to + compared with + In contrast + remained unchanged + The reverse was true of",
    paragraphs: [
      "The pie charts illustrate how a typical household in one country spent its money in 2000 and in 2020.",
      "==Overall,== food was the largest category in 2000, ==whereas== housing had become the biggest cost by 2020. Leisure also took a larger share, ==while== spending on food and “other” items fell. Housing ==was by far the largest== cost in 2020.",
      "In 2000, food ==accounted for== 30% of household spending, ==followed by== housing ==at== 25%. Transport and other costs represented 15% and 20% ==respectively==, and leisure was the smallest slice, at 10%. These shares ==ranged from== 10% ==to== 30%.",
      "By 2020, housing ==had risen to== 35%, becoming the dominant category, ==compared with== 25% two decades earlier. ==In contrast,== food fell to 18% and other spending to 12%. Leisure ==almost doubled== to 20%. Transport ==remained unchanged== at 15%. ==The reverse was true of== housing and food: housing overtook food as the main cost.",
    ],
    plan: [
      {
        label: "1 · Introduction",
        phrases: ["The pie charts illustrate how …"],
        must: "Два круга. Что за доли. Два года.",
        avoid: "Проценты в intro. The first pie chart shows / The second pie chart shows как два intro.",
        example:
          "The pie charts illustrate how a typical household in one country spent its money in 2000 and in 2020.",
      },
      {
        label: "2 · Overview",
        phrases: [
          "Overall, …",
          "whereas …",
          "while …",
          "X was by far the largest …",
        ],
        must: "Кто лидер в каждом году. Что выросло и что упало.",
        avoid: "18% и 12%. Описать круги по очереди без whereas. Firstly.",
        example:
          "Overall, food was the largest category in 2000, whereas housing had become the biggest cost by 2020. Leisure also took a larger share, while spending on food and “other” items fell. Housing was by far the largest cost in 2020.",
      },
      {
        label: "3 · First year",
        phrases: [
          "X accounted for …",
          "followed by … at …",
          "… and … respectively",
          "ranging from … to …",
        ],
        must: "Все доли первого года по убыванию. Respectively — когда две цифры подряд.",
        avoid: "Прыгать по кругу случайно. Забыть маленький кусок. Без цифр.",
        example:
          "In 2000, food accounted for 30% of household spending, followed by housing at 25%. Transport and other costs represented 15% and 20% respectively, and leisure was the smallest slice, at 10%. These shares ranged from 10% to 30%.",
      },
      {
        label: "4 · Second year",
        phrases: [
          "had risen to …",
          "compared with …",
          "In contrast, …",
          "almost doubled",
          "remained unchanged",
          "The reverse was true of …",
        ],
        must: "Второй год. Сравнить с первым. Что не двинулось — одна фраза.",
        avoid: "Повторить абзац 3 другими словами. Новый год, которого нет. Причины («because people got richer»).",
        example:
          "By 2020, housing had risen to 35%, becoming the dominant category, compared with 25% two decades earlier. In contrast, food fell to 18% and other spending to 12%. Leisure almost doubled to 20%. Transport remained unchanged at 15%. The reverse was true of housing and food: housing overtook food as the main cost.",
      },
    ],
  },
  {
    id: "t1-table",
    number: 3,
    band: "7.5",
    kind: "table",
    type: "Task 1 · Table",
    title: "Airport passengers",
    question:
      "The table shows the number of passengers at five international airports in 2018 and 2023.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    usually:
      "Самая большая и самая маленькая ячейка. Кто вырос, кто упал. Не читать таблицу по строкам слева направо.",
    insert:
      "Overall + while + whereas → followed by + respectively + ranging from → edged down + fell to + In contrast + rose + compared with",
    paragraphs: [
      "The table gives the number of passengers, in millions, at five international airports in 2018 and 2023.",
      "==Overall,== Dubai handled the most passengers in both years, ==while== Doha had the fewest. Istanbul and Doha grew over the period, ==whereas== the other three airports saw a slight decline.",
      "In 2018, Dubai was the busiest airport, with 88 million passengers, ==followed by== Heathrow ==at== 80 million. Istanbul and Singapore were fairly close, at 68 and 65 million ==respectively==, and Doha was far behind, at 35 million. These figures ==ranged from== 35 million ==to== 88 million.",
      "By 2023, Dubai remained first, though its figure had ==edged down== to 87 million. Heathrow ==fell to== 78 million and Singapore to 59 million. ==In contrast,== Istanbul ==rose== sharply to 80 million, overtaking Heathrow, and Doha increased to 46 million. Singapore saw the largest fall, ==compared with== Doha, which recorded the largest relative gain.",
    ],
    plan: [
      {
        label: "1 · Introduction",
        phrases: ["The table gives the number of …, in [units], …"],
        must: "Таблица. Единицы (millions). Что. Когда.",
        avoid: "Копировать заголовок. Цифры в intro. According to the table.",
        example:
          "The table gives the number of passengers, in millions, at five international airports in 2018 and 2023.",
      },
      {
        label: "2 · Overview",
        phrases: ["Overall, …", "while …", "whereas …"],
        must: "Кто max и min. Кто вырос, кто упал.",
        avoid: "88 и 35. Читать таблицу по строкам. Firstly.",
        example:
          "Overall, Dubai handled the most passengers in both years, while Doha had the fewest. Istanbul and Doha grew over the period, whereas the other three airports saw a slight decline.",
      },
      {
        label: "3 · First column",
        phrases: [
          "followed by … at …",
          "… and … respectively",
          "ranging from … to …",
        ],
        must: "Первый год целиком по убыванию. Far behind — если есть дырка.",
        avoid: "Каждую ячейку слева направо. Без сравнения. Забыть самый маленький.",
        example:
          "In 2018, Dubai was the busiest airport, with 88 million passengers, followed by Heathrow at 80 million. Istanbul and Singapore were fairly close, at 68 and 65 million respectively, and Doha was far behind, at 35 million. These figures ranged from 35 million to 88 million.",
      },
      {
        label: "4 · Change",
        phrases: [
          "edged down",
          "fell to …",
          "In contrast, …",
          "rose …",
          "compared with …",
        ],
        must: "Второй год. Кто обогнал. Кто почти не двинулся (edged down).",
        avoid: "Повторить абзац 3. Причины («because tourism grew»). Новый аэропорт.",
        example:
          "By 2023, Dubai remained first, though its figure had edged down to 87 million. Heathrow fell to 78 million and Singapore to 59 million. In contrast, Istanbul rose sharply to 80 million, overtaking Heathrow, and Doha increased to 46 million. Singapore saw the largest fall, compared with Doha, which recorded the largest relative gain.",
      },
    ],
  },
  {
    id: "t1-map",
    number: 4,
    band: "7.5",
    kind: "map",
    type: "Task 1 · Maps",
    title: "Island tourism",
    question:
      "The maps show an island in 1990 and after it was developed for tourism in 2020.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    usually:
      "Что появилось, что исчезло, что осталось. Север / юг / восток / запад. Не описывать карты по очереди как два отдельных острова.",
    insert:
      "Overall + The most striking feature + while + in the west → in the east of → had been built + with a road linking + was added + was still + had been reduced",
    paragraphs: [
      "The two maps show an island before and after it was developed for tourism.",
      "==Overall,== the island changed from a largely empty landscape into a tourist destination. ==The most striking feature is== the new hotel, restaurant and pier, ==while== the beach ==in the west== remained.",
      "In 1990, the island had a beach along the west coast, a lighthouse ==in the east of== the island and trees covering much of the centre. There were no buildings or roads.",
      "By 2020, a hotel and a restaurant ==had been built== in the centre, ==with a road linking== them to a pier on the south coast. Tourist accommodation ==was also added== near the western beach. The lighthouse ==was still in== the east, but the central woodland ==had been reduced== to make space for the new facilities. ==In the west of== the island, huts were added next to the beach that had remained from 1990.",
    ],
    plan: [
      {
        label: "1 · Introduction",
        phrases: ["The two maps show [place] before and after …"],
        must: "Две карты. Место. Годы / before and after.",
        avoid: "Список всех объектов в intro. The first map shows / The second map shows как два intro.",
        example:
          "The two maps show an island before and after it was developed for tourism.",
      },
      {
        label: "2 · Overview",
        phrases: [
          "Overall, …",
          "The most striking feature is …",
          "while …",
          "in the west …",
        ],
        must: "Из чего стало чем. Два-три главных объекта. Что не тронули.",
        avoid: "Перечислить каждое здание. Цифры. On the one hand the old map.",
        example:
          "Overall, the island changed from a largely empty landscape into a tourist destination. The most striking feature is the new hotel, restaurant and pier, while the beach in the west remained.",
      },
      {
        label: "3 · Before",
        phrases: ["in the east of …"],
        must: "Старая карта по сторонам света. Пустое тоже сказать (no buildings / roads).",
        avoid: "Описывать 2020 здесь. There is a beautiful beach. Без north/south/east/west.",
        example:
          "In 1990, the island had a beach along the west coast, a lighthouse in the east of the island and trees covering much of the centre. There were no buildings or roads.",
      },
      {
        label: "4 · After",
        phrases: [
          "X had been built",
          "with a road linking A to B",
          "was added",
          "was still in …",
          "had been reduced",
          "in the west of …",
        ],
        must: "Новые объекты + где. Что соединили дорогой. Что осталось / что срезали.",
        avoid: "Повторить overview. Забыть стороны света. I think tourism is good.",
        example:
          "By 2020, a hotel and a restaurant had been built in the centre, with a road linking them to a pier on the south coast. Tourist accommodation was also added near the western beach. The lighthouse was still in the east, but the central woodland had been reduced to make space for the new facilities. In the west of the island, huts were added next to the beach that had remained from 1990.",
      },
    ],
  },
  {
    id: "t1-mixed",
    number: 5,
    band: "7.5",
    kind: "mixed",
    type: "Task 1 · Table + pie",
    title: "Museum visitors",
    question:
      "The table shows how many people visited a museum between 2018 and 2022. The pie chart shows how visitors in 2022 first heard about the museum.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    usually:
      "Один overview на ОБА рисунка. Потом абзац на таблицу, абзац на pie.",
    insert:
      "Overall + by far → Looking at the first chart + dipped slightly + climbed steeply + almost doubled → Turning to the pie chart + accounted for + respectively + therefore",
    paragraphs: [
      "The table shows how many people visited a museum between 2018 and 2022, and the pie chart shows how visitors in 2022 first heard about it.",
      "==Overall,== visitor numbers rose over the five years, with the sharpest increase after 2020. In 2022, the museum’s own website ==was by far the most== common way people found out about it.",
      "==Looking at the first chart,== attendance grew from 12,000 in 2018 to 14,000 in 2019, then ==dipped slightly== to 13,000 in 2020. After that it ==climbed steeply==, reaching 18,000 in 2021 and 21,000 in 2022 — ==almost double== the 2018 figure.",
      "==Turning to the pie chart,== 40% of visitors in 2022 heard about the museum through its website. Friends and family ==accounted for== 30%, advertisements for 20%, and other sources for the remaining 10%. Website and friends represented 40% and 30% ==respectively==. The website ==therefore== brought in twice as many visitors as advertising.",
    ],
    plan: [
      {
        label: "1 · Introduction",
        phrases: ["The table shows …, and the pie chart shows …"],
        must: "Оба визуала в одном предложении: что таблица и что pie, когда.",
        avoid: "Только про таблицу. Два отдельных intro. Цифры.",
        example:
          "The table shows how many people visited a museum between 2018 and 2022, and the pie chart shows how visitors in 2022 first heard about it.",
      },
      {
        label: "2 · Overview",
        phrases: ["Overall, …", "X was by far the most …"],
        must: "Одна черта из таблицы + одна из pie. Без мелких цифр.",
        avoid: "Два overview подряд без связи. 12,000 в overview. Забыть второй рисунок.",
        example:
          "Overall, visitor numbers rose over the five years, with the sharpest increase after 2020. In 2022, the museum’s own website was by far the most common way people found out about it.",
      },
      {
        label: "3 · First visual",
        phrases: [
          "Looking at the first chart, …",
          "dipped slightly",
          "climbed steeply",
          "almost doubled",
        ],
        must: "Только таблица. Старт → провал → финиш. Одна сильная черта (almost double).",
        avoid: "Писать про pie здесь. Каждое число без сравнения. There was an increase.",
        example:
          "Looking at the first chart, attendance grew from 12,000 in 2018 to 14,000 in 2019, then dipped slightly to 13,000 in 2020. After that it climbed steeply, reaching 18,000 in 2021 and 21,000 in 2022 — almost double the 2018 figure.",
      },
      {
        label: "4 · Second visual",
        phrases: [
          "Turning to the pie chart, …",
          "X accounted for …",
          "… and … respectively",
          "X therefore …",
        ],
        must: "Только pie. Потом одна связка с таблицей (therefore / compared with).",
        avoid: "Повторить таблицу. Причины («because the website is popular»). Новый визуал.",
        example:
          "Turning to the pie chart, 40% of visitors in 2022 heard about the museum through its website. Friends and family accounted for 30%, advertisements for 20%, and other sources for the remaining 10%. Website and friends represented 40% and 30% respectively. The website therefore brought in twice as many visitors as advertising.",
      },
    ],
  },
];

export interface Task1LinkPhrase {
  frame: string;
  example: string;
}

export interface Task1LinkGroup {
  job: string;
  use: string;
  phrases: Task1LinkPhrase[];
}

export const task1Linking: Task1LinkGroup[] = [
  {
    job: "Overview",
    use: "Второй абзац. Без мелких цифр.",
    phrases: [
      {
        frame: "Overall, …",
        example: "Overall, the three countries relied on very different mixes.",
      },
      {
        frame: "The most striking feature is …",
        example:
          "The most striking feature is the size of nuclear power in France.",
      },
      {
        frame: "X was by far the largest / smallest …",
        example: "Coal was by far the largest source in Australia.",
      },
    ],
  },
  {
    job: "Сравнить",
    use: "Две категории в одном предложении. Не два простых подряд.",
    phrases: [
      {
        frame: "whereas / while …",
        example:
          "Food was the largest category in 2000, whereas housing had become the biggest cost by 2020.",
      },
      {
        frame: "compared with …",
        example:
          "This was more than four times the UK figure, compared with no nuclear generation in Australia.",
      },
      {
        frame: "The reverse was true of …",
        example: "The reverse was true of coal.",
      },
      {
        frame: "In contrast, …",
        example: "In contrast, Istanbul rose sharply to 80 million.",
      },
    ],
  },
  {
    job: "Цифра",
    use: "В details. Одна сильная цифра важнее трёх слабых.",
    phrases: [
      {
        frame: "X accounted for …",
        example: "Nuclear energy accounted for around 70% of electricity.",
      },
      {
        frame: "followed by … at …",
        example: "Dubai was the busiest, followed by Heathrow at 80 million.",
      },
      {
        frame: "… and … respectively",
        example:
          "Istanbul and Singapore were at 68 and 65 million respectively.",
      },
      {
        frame: "ranging from … to …",
        example:
          "Renewables ranged from around 10% in the UK to just under 20% in Australia.",
      },
    ],
  },
  {
    job: "Изменение",
    use: "Pie за два года, таблица, mixed. Не There was an increase.",
    phrases: [
      {
        frame: "rose / fell to …",
        example: "Housing had risen to 35%.",
      },
      {
        frame: "edged down / dipped slightly",
        example: "Dubai had edged down to 87 million.",
      },
      {
        frame: "climbed steeply / almost doubled",
        example:
          "Attendance climbed steeply to 21,000 — almost double the 2018 figure.",
      },
      {
        frame: "remained unchanged",
        example: "Transport remained unchanged at 15%.",
      },
    ],
  },
  {
    job: "Карта",
    use: "Только maps. Сторона света важнее названия здания.",
    phrases: [
      {
        frame: "in the north / south / east / west of …",
        example: "In the west of the island, huts were added next to the beach.",
      },
      {
        frame: "X had been built / was added / had been reduced",
        example: "A hotel had been built in the centre.",
      },
      {
        frame: "with a road linking A to B",
        example: "with a road linking them to a pier on the south coast.",
      },
      {
        frame: "X remained / was still in …",
        example: "The lighthouse was still in the east.",
      },
    ],
  },
  {
    job: "Два рисунка",
    use: "Mixed. Один абзац — один визуал.",
    phrases: [
      {
        frame: "Turning to the [pie chart / table], …",
        example:
          "Turning to the pie chart, 40% heard about it through the website.",
      },
      {
        frame: "Looking at the first chart, …",
        example:
          "Looking at the first chart, attendance grew from 12,000 to 14,000.",
      },
      {
        frame: "X therefore …",
        example:
          "The website therefore brought in twice as many visitors as advertising.",
      },
    ],
  },
];

export const task1LinkingSkip = [
  "We can see that / It is clear that",
  "According to the graph",
  "Firstly / Secondly",
  "There was an increase in … (пиши: X increased)",
  "I think / This is because …",
];

export function getTask1Model(id: string): Task1Model | undefined {
  return practiceWritingTask1Models.find((m) => m.id === id);
}
