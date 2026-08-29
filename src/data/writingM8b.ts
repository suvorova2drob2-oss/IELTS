export const WRITE_M8B_STEPS = [
  "1 Cartoon",
  "2a For/against",
  "3a–3c Structure",
  "4a–4b Conclusions",
  "5 Plan + write",
  "6 Peer review",
] as const;

export const WRITE_M8B_NEXT = [
  "2a For/against →",
  "3 Structure →",
  "4 Conclusions →",
  "5 Write →",
  "6 Peer →",
  "← К модулю",
] as const;

export const writingM8b = {
  id: "writing-m8b-flow",
  bookPages: "pp. 132–133 in your coursebook",
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
    modelAnswer: `There are many people who criticise the amount of time spent by young people online in modern times. These criticisms are mostly based on the fact that teenagers appear to be suffering from deteriorating social skills and spending less and less time exercising or being outside in the fresh air. However, increased time spent online may actually have the opposite effect on communication skills as outlined below.

First of all, despite the growth in online communication, youngsters still communicate face-to-face in many situations, for example, when out and with family, so it is not true to say that the internet has curbed this kind of communication. In addition, although teenagers can shop and chat with friends online, they do continue to physically attend school and communicate with their classmates and teachers while there. Such situations provide ample opportunity for socialisation and can improve young people’s communicative abilities. Therefore, the claim that online communication is preventing social interaction could be considered as largely exaggerated.

Secondly, the internet could be said to actually engender more flexibility in communication among young people. It has encouraged them to communicate in different ways which include mediums such as blogging and emailing, both of which are highly interactive. It is also possible for youngsters to communicate face-to-face via Skype. Following on from this, not only do teenagers interact in physical environments, they also do so in virtual environments, which actually promotes the use of a far wider range of communication means than was the norm in the past. This, it could be argued, results in them actually being more effective communicators than previous generations.

In conclusion, technological advances in communication should not be viewed as negative; they have only served to add new ways of interaction, and as such, they have not superseded the traditional means we have of conversing with each other.`,
  },
  peer6: {
    badge: "6a–6b",
    instruction:
      "Swap essays with a partner. Comment on position, support, organisation and language. Suggest one improvement.",
  },
};
