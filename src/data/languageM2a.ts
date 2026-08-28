import festivalImg from "../assets/lang-m2a-festival.png";

export const LANG_M2A_STEPS = [
  "b Italics",
  "c Passive forms",
  "c Rewrite",
  "3 Discuss",
] as const;

export const LANG_M2A_NEXT = [
  "c Passive forms →",
  "c Rewrite →",
  "3 Discuss →",
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

export function checkLangM2a(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export type ItalBit =
  | { text: string }
  | { gap: number; options: string[]; key: string };

export function isItalGap(
  part: ItalBit,
): part is { gap: number; options: string[]; key: string } {
  return "gap" in part;
}

export type FormGap = {
  id: number;
  /** Shown in brackets, e.g. modal/take */
  hint: string;
  answers: string[];
  /** Optional words fixed between split blanks */
  mid?: string;
  splitAnswers?: string[];
};

export const languageM2a = {
  id: "language-m2a-flow",
  bookPages: "p. 29 in your coursebook",
  sectionTitle: "Language development · The passive",
  italics: {
    badge: "b",
    instruction:
      "Choose the correct option in italics to complete the text.",
    parts: [
      { text: "Until cameras became more widespread, photos " },
      {
        gap: 1,
        options: ["are being taken", "had been taken"],
        key: "had been taken",
      },
      {
        text: " mostly by explorers rather than tourists. The way we take photos now is almost unrecognisable from how it ",
      },
      {
        gap: 2,
        options: ["was done", "has been done"],
        key: "was done",
      },
      { text: " when cameras " },
      {
        gap: 3,
        options: ["were being invented", "were invented"],
        key: "were invented",
      },
      {
        text: " in the early 1800s. The very first photographs took a long time to develop, but nowadays, thousands of photos ",
      },
      {
        gap: 4,
        options: ["are taken", "will be taken"],
        key: "are taken",
      },
      {
        text: " by tourists all over the world. This can be seen by the huge number of photos which ",
      },
      {
        gap: 5,
        options: ["were uploaded", "are being uploaded"],
        key: "are being uploaded",
      },
      { text: " daily." },
    ] satisfies ItalBit[],
  },
  forms: {
    badge: "c",
    instruction:
      "Complete the rest of the article with the correct passive form. The verb and form are given in brackets.",
    gaps: [
      {
        id: 1,
        hint: "modal/take",
        answers: ["can be taken", "could be taken", "may be taken"],
      },
      {
        id: 2,
        hint: "present simple/store",
        mid: " now ",
        answers: ["are now stored", "are stored"],
        splitAnswers: ["are", "stored"],
      },
      {
        id: 3,
        hint: "past simple/keep",
        answers: ["were kept"],
      },
      {
        id: 4,
        hint: "present continuous/share",
        answers: ["are being shared"],
      },
      {
        id: 5,
        hint: "future simple/distribute",
        answers: ["will be distributed"],
      },
      {
        id: 6,
        hint: "present perfect/upload",
        answers: ["have been uploaded"],
      },
    ] satisfies FormGap[],
    /** Full article with gap markers */
    template: [
      { text: "Nowadays photos " },
      { gap: 1 },
      {
        text: " with not just cameras, but mobile phones and tablets too. There is no need to get any film developed as photos ",
      },
      { gap: 2 },
      {
        text: " digitally. In the past, photos ",
      },
      { gap: 3 },
      {
        text: " in albums, but now photos ",
      },
      { gap: 4 },
      {
        text: " so quickly and easily online that there is an issue of privacy and ownership. When posting a photo, people have no idea where or to whom it ",
      },
      { gap: 5 },
      {
        text: ". A recent estimate has suggested that over 250 billion photos ",
      },
      { gap: 6 },
      {
        text: " onto social media sites. Many of these are likely to be snaps shared in the blink of an eye.",
      },
    ] as ({ text: string } | { gap: number })[],
  },
  rewrite: {
    badge: "c",
    instruction: "Rewrite these active sentences in the passive.",
    items: [
      {
        id: 1,
        active:
          "People chose Hawaii as the most desirable holiday destination in 2013.",
        answers: [
          "Hawaii was chosen as the most desirable holiday destination in 2013",
          "Hawaii was chosen as the most desirable holiday destination in 2013 by people",
        ],
      },
      {
        id: 2,
        active:
          "Tourism has damaged the local wildlife in the nature reserve.",
        answers: [
          "The local wildlife in the nature reserve has been damaged by tourism",
          "The local wildlife in the nature reserve has been damaged",
        ],
      },
      {
        id: 3,
        active:
          "People consider Thai beaches to be the best in the world.",
        answers: [
          "Thai beaches are considered to be the best in the world",
          "Thai beaches are considered the best in the world",
          "Thai beaches are considered to be the best in the world by people",
        ],
      },
      {
        id: 4,
        active: "Walt Disney created the famous theme park Disneyland.",
        answers: [
          "The famous theme park Disneyland was created by Walt Disney",
          "Disneyland was created by Walt Disney",
          "The famous theme park Disneyland was created by Walt Disney.",
        ],
      },
      {
        id: 5,
        active: "Over 17,000 islands form Indonesia.",
        answers: [
          "Indonesia is formed of over 17,000 islands",
          "Indonesia is formed by over 17,000 islands",
          "Indonesia is made up of over 17,000 islands",
        ],
      },
      {
        id: 6,
        active:
          "The UAE has developed an indoor ski resort in the desert.",
        answers: [
          "An indoor ski resort has been developed in the desert by the UAE",
          "An indoor ski resort in the desert has been developed by the UAE",
          "An indoor ski resort has been developed by the UAE in the desert",
        ],
      },
    ],
  },
  discuss: {
    badge: "3",
    instruction:
      "Talk to your partner about these topics. Try to use the passive form where appropriate.",
    topics: [
      "A festival or celebration.",
      "The place where you now live.",
    ],
    image: festivalImg,
    imageAlt:
      "Crowd at an outdoor festival with hands raised against a blue sky.",
  },
};

export type LanguageM2aData = typeof languageM2a;
