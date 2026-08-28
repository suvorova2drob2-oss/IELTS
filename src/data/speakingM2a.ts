import speakImg from "../assets/speak-m2a-marina.png";

export const SPEAK_M2A_STEPS = [
  "Lead-in",
  "2a Cue card",
  "3a Plan notes",
  "3b Your notes",
] as const;

export const SPEAK_M2A_NEXT = [
  "2a Cue card →",
  "3a Plan notes →",
  "3b Your notes →",
  "← К модулю",
] as const;

export const speakingM2a = {
  id: "speaking-m2a-flow",
  bookPages: "p. 27 in your coursebook",
  sectionTitle: "Speaking",
  vocabTitle: "Develop topic-specific vocabulary",
  image: speakImg,
  imageAlt:
    "Dubai Marina: modern skyscrapers and twisted towers along a turquoise waterway with yachts.",
  leadIn: {
    badge: "1",
    instruction:
      "Look at the photo. Do you like this style of architecture? How would you describe these buildings? Are they similar to the buildings in your neighbourhood?",
  },
  step2a: {
    badge: "2a",
    heading: "Develop topic-specific vocabulary",
    instruction:
      "Read the test task. How many of the points on the card must you talk about?",
    cue: {
      intro: "Describe an old building that you particularly like.",
      shouldSay: "You should say:",
      bullets: [
        "what the building looks like",
        "where the building is located",
        "what the building is used for",
      ],
      andWhy: "and why you like it.",
    },
    options: [
      { id: "a", label: "Only one point" },
      { id: "b", label: "Two points" },
      { id: "c", label: "Three points" },
      { id: "d", label: "All of them (four points)" },
    ],
    key: "d",
    tip: "All of them — the three bullet points and why you like it.",
  },
  step3a: {
    badge: "3a",
    heading: "Make notes and plan your answer",
    instruction:
      "Read the test task and the notes below. How has the student organised his/her notes?",
    cue: {
      intro: "Describe a town or city that you would like to go to.",
      shouldSay: "You should say:",
      bullets: [
        "where it is",
        "what you know about it",
        "what you would like to do there",
      ],
      andWhy: "and why you would like to go there.",
    },
    mindMap: {
      centre: "Paris",
      bubbles: [
        {
          id: "where",
          place: "tl",
          heading: "Where?",
          notes: "France, N. Europe",
        },
        {
          id: "do",
          place: "tr",
          heading: "What do?",
          notes: "Go to museums. Visit Eiffel Tower",
        },
        {
          id: "know",
          place: "bl",
          heading: "What you know?",
          notes: "V. cultural, sophisticated, great food",
        },
        {
          id: "why",
          place: "br",
          heading: "Why like?",
          notes: "Paris ‘city of love’, think romantic, and lots history",
        },
      ],
    },
    options: [
      { id: "a", label: "In alphabetical order" },
      { id: "b", label: "As a numbered list of full sentences" },
      {
        id: "c",
        label:
          "As a mind map — short notes under headings that match the points on the card",
      },
      { id: "d", label: "Only about food and museums" },
    ],
    key: "c",
    tip: "As a mind map: one central idea (Paris) with short notes under headings that match each point on the card.",
  },
  step3b: {
    badge: "3b",
    heading: "Make notes and plan your answer",
    instruction:
      "Make notes for the task below. Use a mind map like the one in Exercise 3a. Then talk for one to two minutes.",
    cue: {
      intro: "Describe a place that makes you feel happy.",
      shouldSay: "You should say:",
      bullets: [
        "where it is",
        "what it is like",
        "when you first went there",
      ],
      andWhy: "and why it makes you happy.",
    },
    mindMap: {
      centrePlaceholder: "place",
      bubbles: [
        { id: "where", place: "tl", heading: "Where?", placeholder: "short notes…" },
        {
          id: "like",
          place: "tr",
          heading: "What like?",
          placeholder: "short notes…",
        },
        {
          id: "when",
          place: "bl",
          heading: "When first?",
          placeholder: "short notes…",
        },
        {
          id: "why",
          place: "br",
          heading: "Why happy?",
          placeholder: "short notes…",
        },
      ],
    },
    speakCue: "Speak for 1–2 minutes. Use your notes — do not write full sentences.",
  },
};

export type SpeakingM2aData = typeof speakingM2a;
