export const LANG_M7A_STEPS = [
  "1a–1b Fragments",
  "1c Rewrite",
  "2a–2b T'ai Chi",
  "3 Punctuation match",
  "4 Punctuate text",
] as const;

export const LANG_M7A_NEXT = [
  "1c Rewrite →",
  "2a–2b T'ai Chi →",
  "3 Match →",
  "4 Punctuate →",
  "← К модулю",
] as const;

export const languageM7a = {
  id: "language-m7a-flow",
  bookPages: "p. 109 in your coursebook",
  sectionTitle: "Language development · Fragments & punctuation",
  fragments1: {
    badge: "1a",
    expert: "EXPERT GRAMMAR page 179",
    instruction: "Read the sentences below. Why are they incorrect?",
    sentences: [
      "Park full of exercise equipment and sports fields.",
      "If this area received more investment,",
      "Built some new apartments which have access to the river boat transport network.",
      "This part of town is attractive it is a desirable place to live.",
    ],
    match: {
      badge: "b",
      instruction:
        "Match the sentence fragments in Exercise 1a with the problems (A–D).",
      problems: [
        {
          id: "A",
          text: "add punctuation or a connecting word",
        },
        { id: "B", text: "it is missing a verb" },
        { id: "C", text: "it needs a subject" },
        { id: "D", text: "there should be a second clause" },
      ],
      keys: [
        { id: 1, key: "B" },
        { id: 2, key: "D" },
        { id: 3, key: "C" },
        { id: 4, key: "A" },
      ],
    },
    rewrite: {
      badge: "c",
      instruction: "Rewrite the sentences in Exercise 1a so they are correct.",
      tips: [
        "There is a park …",
        ", more people would move here.",
        "The local government …",
        "… attractive. It is …",
      ],
    },
  },
  taiChi: {
    badge: "2a",
    instruction: "Read the sentences and decide if they are correct or not.",
    items: [
      {
        id: 1,
        text: "T'ai Chi is a popular community activity all across China many older people gather in their local parks to do the ancient exercises together.",
        ok: false,
        fix: "T'ai Chi is a popular community activity all across China. Many older people gather in their local parks to do the ancient exercises together.",
      },
      {
        id: 2,
        text: "The martial art is a combination of deep breathing and relaxation with a series of gentle movements.",
        ok: true,
        fix: "",
      },
      {
        id: 3,
        text: "Because it maintains physical health.",
        ok: false,
        fix: "T'ai Chi is popular with older people because it maintains physical health.",
      },
      {
        id: 4,
        text: "Recently 50,000 students to their local parks all over China to try to set a world record for the most people simultaneously practising T'ai Chi at once.",
        ok: false,
        fix: "Recently 50,000 students went to their local parks all over China to try to set a world record for the most people simultaneously practising T'ai Chi.",
      },
      {
        id: 5,
        text: "Residents took part in 15 different places across Henan Province.",
        ok: true,
        fix: "",
      },
      {
        id: 6,
        text: "In each location wore matching outfits in different colours and the displays could be seen from high vantage points around the areas.",
        ok: false,
        fix: "In each location people wore matching outfits in different colours and the displays could be seen from high vantage points around the areas.",
      },
      {
        id: 7,
        text: "Residents of the province are hopeful that the Guinness Book of Records will confirm the record.",
        ok: true,
        fix: "",
      },
    ],
  },
  punctMatch: {
    badge: "3",
    instruction: "Match the punctuation marks (1–7) with their uses (A–G).",
    marks: [
      { id: 1, text: "full stop", key: "D" },
      { id: 2, text: "comma", key: "F" },
      { id: 3, text: "capital letter", key: "E" },
      { id: 4, text: "colon", key: "A" },
      { id: 5, text: "semi-colon", key: "G" },
      { id: 6, text: "apostrophe", key: "C" },
      { id: 7, text: "quotation marks", key: "B" },
    ],
    uses: [
      {
        id: "A",
        text: "It is used to expand on the sentence by introducing a list or a second part of the same idea.",
      },
      {
        id: "B",
        text: "Used to show the exact words spoken by a person.",
      },
      {
        id: "C",
        text: "This shows that a letter is missing in a contracted form, or shows possession.",
      },
      { id: "D", text: "This marks the end of a sentence." },
      { id: "E", text: "This shows the beginning of a sentence." },
      {
        id: "F",
        text: "It separates clauses, phrases or words in a list.",
      },
      {
        id: "G",
        text: "This is between a full stop and a comma. It joins phrases and sentences which are linked, without having to use a conjunction.",
      },
    ],
  },
  punctuate: {
    badge: "4",
    instruction: "Punctuate the text below.",
    raw: "car clubs are an excellent way for people to save space and energy in urban environments the premise is simple people register with a company which rents cars located in multiple locations all around the city after becoming a member customers are able to access an online members area to reserve a vehicle for a particular amount of time there are several reasons why people join car clubs cost convenience and attitude towards the environment joining international car companies also enables people to use these services while abroad",
    model:
      "Car clubs are an excellent way for people to save space and energy in urban environments. The premise is simple; people register with a company which rents cars located in multiple locations all around the city. After becoming a member, customers are able to access an online members' area to reserve a vehicle for a particular amount of time. There are several reasons why people join car clubs: cost, convenience and attitude towards the environment. Joining international car companies also enables people to use these services while abroad.",
  },
};
