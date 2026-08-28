import catskillImg from "../assets/speak-m2b-catskill.png";
import reefImg from "../assets/speak-m2b-reef.png";

export const SPEAK_M2B_STEPS = [
  "1 Photos",
  "2a Vocabulary",
  "2b Speak 2 min",
  "Part 2 Cue cards",
  "Model answers",
] as const;

export const SPEAK_M2B_NEXT = [
  "2a Vocabulary →",
  "2b Speak →",
  "Part 2 cards →",
  "Models →",
  "← К модулю",
] as const;

export type ItalBit =
  | { text: string }
  | { gap: number; options: string[]; key: string };

export function isSpeakItalGap(
  part: ItalBit,
): part is { gap: number; options: string[]; key: string } {
  return "gap" in part;
}

export const speakingM2b = {
  id: "speaking-m2b-flow",
  bookPages: "p. 33 in your coursebook",
  sectionTitle: "Speaking · Part 2",
  photos: {
    badge: "1",
    heading: "Vocabulary development",
    instruction:
      "How would you describe the places in the photos? Which of these do you think most deserves to be saved? Why?",
    images: [
      {
        src: catskillImg,
        alt: "Person sitting on a rocky cliff overlooking Catskill Mountains forest valley.",
        caption: "Catskill Mountains",
      },
      {
        src: reefImg,
        alt: "Aerial view of a tropical island and coral reefs in the Great Barrier Reef.",
        caption: "Great Barrier Reef",
      },
    ],
  },
  vocab: {
    badge: "2a",
    instruction:
      "Choose the correct option in italics to complete the text.",
    parts: [
      { text: "Waikiki beach in Hawaii is one of the most " },
      {
        gap: 1,
        options: ["devastating", "stunning"],
        key: "stunning",
      },
      { text: " places on earth. Its " },
      {
        gap: 2,
        options: ["magnificent", "contemporary"],
        key: "magnificent",
      },
      {
        text: " beaches attract visitors from all over the world. The Pacific island beaches feel so ",
      },
      {
        gap: 3,
        options: ["remote", "obscure"],
        key: "remote",
      },
      {
        text: " that you can expect complete tranquillity, but just a few kilometres away is the ",
      },
      {
        gap: 4,
        options: ["fussy", "bustling"],
        key: "bustling",
      },
      {
        text: " town with its many restaurants and nightlife. It seems like the perfect place, ",
      },
      {
        gap: 5,
        options: ["unspoilt", "distinguished"],
        key: "unspoilt",
      },
      {
        text: " by the perils of modern tourism. However, this ",
      },
      {
        gap: 6,
        options: ["unique", "privileged"],
        key: "unique",
      },
      {
        text: " environment is now being threatened by the construction of new homes and sea wall protection. Make sure you visit it while you still can!",
      },
    ] satisfies ItalBit[],
  },
  speak2b: {
    badge: "2b",
    instruction:
      "Choose ONE of the following and describe the place to your partner for 2 minutes. Use vocabulary from Exercise 2a and use relative clauses to provide extra details.",
    topics: [
      "A place you find very tranquil.",
      "The most remote place you’ve ever been to.",
      "The most stunning view you have ever seen.",
    ],
    speakCue: "Speak for about 2 minutes · use relative clauses",
    modelLabel: "Suggested answer for 1 (tranquil place)",
    modelAnswer: `A place that I find very tranquil is a stretch of coastline in the North East of England, which is near where my parents now live. Um … the coast in this part of the country is considered quite wild and unspoilt, especially compared to some other parts of the country. As the UK is a small island, finding countryside or landscapes that are tranquil and unspoilt can be rather difficult. Often when I try to go walking to find some solitude, I find myself surrounded by tourists or other walkers. Many parts of this stretch of coastline feel fairly remote – the population density in this part of England is quite low, so despite the fact that it is a popular coastline for walkers, it never feels that crowded, even in the height of summer. For me, this remote feeling is wonderful as I live in a bustling city, which tends to increase my stress levels over time. This is mainly due to there being so many people. I absolutely love walking along this northern coastline because, as a result of the pollution from the industrial factories in the nearby cities, the light has a unique tone which makes the views over the sea stunning. It’s as if you were in some kind of fantasy or fictional world and I have taken some amazing photographs of the stunning views. There are also a lot of plants and birds to spot there. I’ve seen quite a few different types of seabirds during my coastal walks. I particularly like to watch them fly along the cliffs and sometimes I’ve observed them nesting in the spring time. All in all, whether I’m standing staring out to sea or walking along the cliffs with the wind in my hair, this place has a unique air of tranquillity for me.`,
  },
  cueCards: [
    {
      id: "younger",
      intro: "Describe a beautiful place you visited when you were younger.",
      shouldSay: "You should say:",
      bullets: [
        "where it is",
        "when you visited it",
        "what you did there",
      ],
      andWhy: "and explain why you thought it was beautiful.",
    },
    {
      id: "country",
      intro: "Describe an important place in your country.",
      shouldSay: "You should say:",
      bullets: ["what it is", "where it is", "why it is important"],
      andWhy: "and explain how you feel about this place.",
    },
  ],
  cueModel: {
    label: "Suggested answer (beautiful place when younger)",
    text: `Well, I travelled quite a lot with my parents when I was younger so I’ve been lucky and visited many amazing places. However, if I had to choose one place, I’d say that the most stun … stunning place I went to as a teenager was the Rocky Mountains in Canada. I loved walking and rock climbing during my childhood so as a birthday present when I was 14 my parents took me and my sister on a trekking holiday to the Canadian mountains. Um, so for the first week we stayed in a series of cabins which were very traditionally Canadian … um they were made from redwood, which are those gigantic trees in north America … and the cabins usually had a porch at the front where we sat and ate our meals. We walked about 20 kilometres every day. It was amazing … the scenery was spectacular and I tried to soak up the atmosphere rather than taking too many photos. I really didn’t want to miss the full experience. The second week was spent on the mountain train, which was great as well, although in a different way. We covered much more land travelling by train and I thoroughly enjoyed seeing the landscape change as we went along – from forests to rocks with no plants at all. Err … I think the main reason why I thought it was so beautiful was … um … well, I think because it was so vast and so … um remote. I’d never seen such a large area of countryside before and it was so tranquil too … we hardly saw any people which is very different to my daily life living in a large city. It gave me a different perspective on how beautiful nature can be when it is completely unspoilt … when there are no cafés or gift shops around.`,
  },
};

export type SpeakingM2bData = typeof speakingM2b;
