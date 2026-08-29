export const WRITE_M9A_STEPS = [
  "1 Famous cities",
  "2a–2c Diagram vocab",
  "3 Process language",
  "4a–4c Plan + write",
] as const;

export const WRITE_M9A_NEXT = [
  "2a–2c Diagram →",
  "3 Process language →",
  "4 Plan + write →",
  "← К модулю",
] as const;

export const writingM9a = {
  id: "writing-m9a-flow",
  bookPages: "p. 142 in your coursebook",
  sectionTitle: "Writing · Task 1 (diagrams — aqueduct / syphon)",
  expertWriting: "EXPERT WRITING page 199",
  quote1: {
    badge: "1",
    heading: "Lead-in",
    instruction:
      "What do you consider to be the world’s greatest city, and why? How do cities become famous today?",
    tip: "Suggested: Hong Kong, Mexico City, Mumbai. Nowadays cities often become famous due to industry such as technology or financial services, or because they are desirable places to live — relatively cheap or spacious with a nice lifestyle.",
  },
  arguments2: {
    badge: "2a",
    instruction:
      "A walled city helps defend inhabitants against attack. Match / discuss fortress vocabulary, then study the aqueduct and syphon diagrams (water from reservoir to city).",
    tips: [
      "1 moat — water around the walls that forces attackers towards gates.",
      "2 drawbridge — bridge that can be raised to block entry.",
      "3 keep — strong central tower / fortified building.",
      "Process overview: reservoir → intake → conduit → aqueduct (over ground) or syphon (underground pipe) → treatment plant → city.",
      "You do not need to know technical engineering — describe what you see.",
    ],
    text2b: {
      badge: "b",
      instruction:
        "Choose precise process verbs for the water system description.",
      tip: "Keys: 1 supplies · 2 enters · 3 flows · 4 sanitises. Example: Water is supplied to the city… The water enters the syphon… it flows down the conduit… it is sanitised at the treatment plant.",
    },
    stages2c: {
      badge: "c",
      instruction:
        "Put the process sentences in a logical order (first → last). Teacher’s Book order: 5, 6, 1, 3, 4, 2.",
      stages: [
        { id: "1", label: "Water enters the treatment plant" },
        { id: "2", label: "Water is pumped into city buildings" },
        { id: "3", label: "Water flows down the conduit" },
        { id: "4", label: "Water passes through the syphon under low ground" },
        { id: "5", label: "Water is drawn from a reservoir" },
        { id: "6", label: "Water enters the syphon system at the intake" },
      ],
      key: ["5", "6", "1", "3", "4", "2"],
    },
  },
  linking3: {
    badge: "3",
    instruction:
      "Decide if each sentence uses process / descriptive language correctly. If incorrect, correct it.",
    items: [
      {
        id: 1,
        text: "Water is supplied to the city by a syphon system.",
        verdict: "Correct",
        tip: "Correct.",
      },
      {
        id: 2,
        text: "The water then sanitises through the conduit.",
        verdict: "Incorrect",
        tip: "Incorrect – water flows through the conduit; it is sanitised at the treatment plant.",
      },
      {
        id: 3,
        text: "The portcullis is the door which is the main entrance to the city.",
        verdict: "Correct",
        tip: "Correct – relative clause describing unknown vocabulary.",
      },
      {
        id: 4,
        text: "Overall, the aqueduct carried water underground while the syphon went over ground.",
        verdict: "Incorrect",
        tip: "Incorrect – opposite: aqueduct over ground; syphon via underground pipes.",
      },
    ],
  },
  write4: {
    badge: "4",
    heading: "Write your Task 1 report",
    analyse4a: {
      badge: "4a",
      instruction:
        "Note overall process, start/end points, and the difference between aqueduct and syphon. Plan to use descriptive language from Language development A.",
      tip: "Overall process: transportation of water from a reservoir to a city. Start at reservoir, end at city. Top diagram = aqueduct (over ground); bottom = syphon (underground).",
    },
    title:
      "The diagrams show how water is transported from a reservoir to a city using an aqueduct system and a modern syphon system. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    plan4b: {
      badge: "b",
      instruction: "Plan for about 5 minutes (overview + step-by-step process + comparison).",
      tip: "P1 overview. P2 syphon/aqueduct steps with process verbs. P3 overall comparison: old aqueduct over ground vs modern underground pipes.",
    },
    write4c: {
      badge: "c",
      instruction: "Write your report (about 20 minutes). Write at least 150 words.",
    },
    modelLabel: "Model answer",
    modelAnswer: `Water is supplied to the city by a syphon system. The water is drawn from a large artificial lake which is called a reservoir. The water enters the syphon system through a point called the intake and then it flows down the conduit. The water then passes through the syphon which carries it under low ground via a circular pipe. Next, the water enters the treatment plant where it is sanitised and made safe for human consumption. Finally, the water is pumped into the buildings in the city.

Overall, the diagrams show that the old system used an aqueduct which transported water over ground, while in the modern syphon the water is carried to the city via underground pipes.`,
  },
};
