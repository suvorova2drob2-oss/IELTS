export const WRITE_M6B_STEPS = [
  "1 Cartoon",
  "2a For/against",
  "3a–3c Structure",
  "4a–4b Conclusions",
  "5 Plan + write",
  "6 Peer review",
] as const;

export const WRITE_M6B_NEXT = [
  "2a For/against →",
  "3 Structure →",
  "4 Conclusions →",
  "5 Write →",
  "6 Peer →",
  "← К модулю",
] as const;

export const writingM6b = {
  id: "writing-m6b-flow",
  bookPages: "pp. 100–101 in your coursebook",
  sectionTitle: "Writing · Task 2 (science vs human judgement)",
  expertWriting: "EXPERT WRITING page 196",
  cartoon1: {
    badge: "1",
    heading: "Lead-in",
    instruction:
      "Look at the cartoon of police missing obvious clues. What is the joke? What kinds of clues help police?",
    tip: "The joke is that the room is covered in clues but none of the police have noticed any of them (e.g. footprints and fingerprints). Police are helped by physical evidence and witness testimonies.",
  },
  forAgainst2a: {
    badge: "2a",
    instruction:
      "Read the essay title. Decide if each idea is for or against the view that science is more useful than human judgement in fighting crime.",
    title:
      "Some people believe that scientific techniques are more effective than human judgement in preventing and solving crime. To what extent do you agree or disagree?",
    items: [
      {
        id: 1,
        text: "DNA identification and trace analysis are now standard worldwide.",
        key: "for",
      },
      {
        id: 2,
        text: "Scientific tools still need people to decide how to apply them in complex social situations.",
        key: "against",
      },
      {
        id: 3,
        text: "Super recognisers can outperform computers at identifying faces.",
        key: "against",
      },
      {
        id: 4,
        text: "Science has made it harder for criminals to operate undetected.",
        key: "for",
      },
      {
        id: 5,
        text: "Advances give police a wider variety of reliable investigative tools.",
        key: "for",
      },
      {
        id: 6,
        text: "Human judgement is required to implement techniques successfully.",
        key: "against",
      },
      {
        id: 7,
        text: "Over-reliance on machines could ignore valuable human insight.",
        key: "against",
      },
    ],
  },
  structure3: {
    badge: "3a–3c",
    instruction:
      "Discuss band descriptors and the two essay plans. Which structure is better?",
    descriptors: [
      {
        id: 1,
        q: "Give a clear position",
        key: "A",
        tip: "Introduction and conclusion",
      },
      {
        id: 2,
        q: "Develop main points with support",
        key: "B",
        tip: "Main body",
      },
      {
        id: 3,
        q: "Answer the question throughout",
        key: "B",
        tip: "All paragraphs",
      },
      {
        id: 4,
        q: "Organise ideas logically",
        key: "A",
        tip: "Throughout",
      },
      {
        id: 5,
        q: "Where do position / support / answer the question appear?",
        key: "A",
        tip: "Give a position = introduction and conclusion; develop points = main body; answer the question = all paragraphs",
      },
    ],
    betterStructure: "2",
    structureTip:
      "Structure 2 is better. It addresses whether science or human judgement is better. Structure 1 only lists what police do / what humans use, without comparing science vs judgement clearly.",
  },
  conclusions4: {
    badge: "4a–4b",
    instruction:
      "Which points are important in a conclusion? Which conclusion is best?",
    important: "1 and 3 are important to the conclusion.",
    options: [
      {
        id: "A",
        text: "Conclusion A — unclear argument; asks the examiner a question.",
      },
      {
        id: "B",
        text: "Conclusion B — clear position that science is more effective; summarises key points.",
      },
    ],
    best: "B",
    tip: "Conclusion B is the best one. The writer believes science is more effective and summarises key points. Conclusion A is unclear and asks a question of the examiner.",
  },
  write5: {
    badge: "5",
    plan: {
      badge: "5a",
      instruction: "Make a plan (about 5 minutes).",
      tip: "Intro = agree (reliability), but humans useful too. P1 = science improved (DNA, materials). P2 = humans needed to implement science; super recognisers. Conclusion = restate.",
    },
    write: {
      badge: "b",
      instruction: "Write your essay (about 40 minutes). Write at least 250 words.",
    },
    modelLabel: "Model answer",
    modelAnswer: `There are a variety of points of view on the most effective ways to stop, or at least reduce, crime. Although police forces have improved their investigative techniques over the last few decades, it has been suggested that improvements in science have become more useful measures for preventing crime. This essay will argue that despite human judgement being superior is some areas, science is proving to be far more reliable in this area overall.

Firstly, the reliability of science and the extent to which it can be used to stop crime is far-reaching and fairly conclusive. Techniques such as the identification of criminals from their DNA and the ability to detect even the smallest traces of materials in order to further police investigations are used as standard all over the world nowadays. These scientific advances have made it more difficult for criminals to operate and given police forces a wider variety of tools with which to tackle an ever-increasing range of crimes.

However, it must also be recognised that these scientific techniques need to be implemented by people, because human judgement is necessary in deciding how a particular technique may best serve law enforcement services and the wider society. In addition, in some areas, human abilities exceed those available through scientific means. For example, the skill of super recognisers, who are people with the ability to identify faces easily, has yet to be matched or beaten by any computer to date.

In conclusion, science has shown itself to be extremely useful in stopping crime. Although human judgement is undoubtedly crucial when it comes to the successful implementation of any scientific techniques, it is unarguably the scientific techniques themselves which are the most instrumental in the reduction of crime overall.`,
  },
  peer6: {
    badge: "6a–6b",
    instruction:
      "Swap essays with a partner. Comment on position, support, organisation and language. Suggest one improvement.",
  },
};
