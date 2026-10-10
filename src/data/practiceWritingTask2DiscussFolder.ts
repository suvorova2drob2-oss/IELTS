/** Task 2 · Discuss both views + opinion — folder, phrase menu, homework. */

export const T2_DISCUSS_FOLDER_ID = "t2-discuss-folder";
export const T2_DISCUSS_MASTER_ID = "model-t2-remote-work";

export interface Task2PhraseBlock {
  tag: string;
  job: string;
  openers: string[];
  frames: string[];
  swaps: { slot: string; options: string[] }[];
}

export const TASK2_DISCUSS_PHRASE_BLOCKS: Task2PhraseBlock[] = [
  {
    tag: "1 · Intro",
    job: "Тема своими словами + оба view + своё мнение (последнее предложение).",
    openers: [
      "The shift towards … has divided … as much as it has divided …",
      "The question of whether … is often presented as …, yet many still argue that …",
      "Few topics divide … as sharply as the debate over whether …",
    ],
    frames: [
      "I agree that …, but treating … as a universal solution ignores …",
      "While I accept that …, I believe … only works when …",
      "In my view, both sides capture part of the truth, but …",
    ],
    swaps: [
      {
        slot: "мнение",
        options: [
          "I agree that …, but …",
          "I largely agree with …, although …",
          "I would support … to an extent, but not …",
        ],
      },
      {
        slot: "конtrast intro",
        options: ["yet many still argue that", "while others insist that", "whereas opponents claim that"],
      },
    ],
  },
  {
    tag: "2 · Other view",
    job: "Сторона, с которой ты НЕ полностью согласен — почему она не глупая.",
    openers: [
      "Those who favour … are not simply being old-fashioned.",
      "The case for … is easy to understand.",
      "Supporters of … point to several practical benefits.",
    ],
    frames: [
      "Shared space / clear rules / face-to-face contact makes … possible: …",
      "… is also harder at a distance. A … who never … is slower to pick up …, not just …",
      "In industries such as …, that loss of … is not a minor inconvenience; it shows up in …",
      "In that sense, “…” is a slogan; the actual target is …",
    ],
    swaps: [
      { slot: "пример", options: ["This is visible in …", "A clear case is …", "This becomes obvious when …"] },
      { slot: "усиление", options: ["not just …", "is not a minor inconvenience; it shows up in …", "In practical terms, …"] },
    ],
  },
  {
    tag: "3 · Your view",
    job: "Твоя сторона: That said … + где идея ломается.",
    openers: [
      "That said, the case for … is stronger than … often admit.",
      "Nevertheless, … has clear advantages that should not be dismissed.",
      "However, the opposite approach also deserves serious consideration.",
    ],
    frames: [
      "A great deal of … is already …, and … does not necessarily make … better.",
      "The more honest objection is not that … “fails”, but that it fails when …",
      "… can function well when …; … cannot.",
      "Over time, this leads to …",
    ],
    swaps: [
      { slot: "поворот", options: ["That said,", "Nevertheless,", "However,", "By contrast,"] },
      {
        slot: "ограничение",
        options: [
          "The more honest objection is not that … “fails”, but that it fails when …",
          "This only holds when …",
          "The problem arises when … is applied to …",
        ],
      },
    ],
  },
  {
    tag: "4 · Conclusion",
    job: "То же мнение другими словами. Where … / Where … Без новых аргументов.",
    openers: [
      "For that reason I would not choose one … for every …",
      "On balance, …",
      "The practical conclusion is that …",
    ],
    frames: [
      "Where … is … and …, … should be … rather than …",
      "Where … is …, … or …, … still …",
      "The useful question is not whether … is good or bad, but which …",
      "I would therefore support …, but not a rule that treats every … as …",
    ],
    swaps: [
      { slot: "структура",
        options: ["Where …  Where …", "On the one hand … On the other …", "The useful question is not whether … but which …"],
      },
      {
        slot: "закрытие",
        options: ["For that reason,", "I would therefore", "The practical conclusion is that"],
      },
    ],
  },
];

export interface Task2DiscussHomework {
  id: string;
  number: number;
  title: string;
  question: string;
  usually: string;
}

export const task2DiscussHomework: Task2DiscussHomework[] = [
  {
    id: "t2-hw-university-fees",
    number: 1,
    title: "University fees",
    question:
      "Some people believe university education should be free for all students. Others think students should pay for their own higher education. Discuss both views and give your own opinion.",
    usually:
      "View A: access, equality. View B: cost, quality, who pays. Opinion: free/low fees + loans или partial — не «всё бесплатно без условий».",
  },
  {
    id: "t2-hw-arts-funding",
    number: 2,
    title: "Funding the arts",
    question:
      "Some people think governments should spend money on the arts. Others believe this money should be spent on public services such as healthcare and education. Discuss both views and give your own opinion.",
    usually:
      "Arts: culture, tourism, identity. Public services: hospitals, schools. Opinion: both, but priority / cap on arts.",
  },
  {
    id: "t2-hw-young-language",
    number: 3,
    title: "Languages at primary school",
    question:
      "Some people think children should begin learning a foreign language at primary school. Others believe it is better to wait until secondary school. Discuss both views and give your own opinion.",
    usually:
      "Primary: easier accent, confidence. Secondary: literacy in L1 first, less overload. Opinion: early start + light approach.",
  },
  {
    id: "t2-hw-free-transport",
    number: 4,
    title: "Free public transport",
    question:
      "Some people believe public transport should be free of charge. Others think users should pay for it. Discuss both views and give your own opinion.",
    usually:
      "Free: pollution, access for poor. Pay: maintenance, overcrowding, fairness. Opinion: discounted / free for some groups.",
  },
  {
    id: "t2-hw-zoos",
    number: 5,
    title: "Zoos",
    question:
      "Some people think zoos are cruel and should be closed. Others believe zoos play an important role in protecting endangered species. Discuss both views and give your own opinion.",
    usually:
      "Close: animal welfare, small cages. Keep: breeding, research, education. Opinion: strict standards, not all zoos equal.",
  },
  {
    id: "t2-hw-online-schools",
    number: 6,
    title: "Online vs classroom",
    question:
      "Some people believe online learning will eventually replace traditional schools. Others think face-to-face teaching will always be essential. Discuss both views and give your own opinion.",
    usually:
      "Online: flexibility, scale. Classroom: social skills, discipline, labs. Opinion: blend — online for some subjects, not all.",
  },
];

export function getTask2DiscussHomework(id: string): Task2DiscussHomework | undefined {
  return task2DiscussHomework.find((h) => h.id === id);
}
