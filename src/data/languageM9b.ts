export const LANG_M9B_STEPS = [
  "1a–1b Estimation",
  "1c Speak",
  "2a Replace thing",
  "2b Better writing",
  "2c–2d Practice",
] as const;

export const LANG_M9B_NEXT = [
  "1c Speak →",
  "2a Replace thing →",
  "2b Better writing →",
  "2c–2d Practice →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[.,;:!?]+$/g, "");
}

export function checkLangM9b(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export const languageM9b = {
  id: "language-m9b-flow",
  bookPages: "p. 144 in your coursebook",
  sectionTitle: "Language · Estimation; replacing thing",
  grammarRef: "EXPERT GRAMMAR page 181",
  cleft1a: {
    badge: "1a",
    instruction:
      "Which extract is a Speaking Part 3 answer and which is a Writing Task 1 answer? Note the estimation language.",
    items: [
      {
        id: "A",
        text: "Extract A uses phrases such as kinds of, more or less, and so on while discussing ideas about work and success.",
        key: "1",
        tip: "A is a Speaking Part 3 answer.",
      },
      {
        id: "B",
        text: "Extract B uses approximately / about / around when reporting figures from a diagram.",
        key: "2",
        tip: "B is a Writing Task 1 answer.",
      },
    ],
  },
  rewrite1b: {
    badge: "b",
    instruction:
      "Study how estimation words improve the texts. Check the models (keys from Teacher’s Book 1b).",
    items: [
      {
        id: 1,
        stem: "Numbers / quantities → use softer estimates.",
        model: "approximately, about, around",
      },
      {
        id: 2,
        stem: "Open lists of examples → avoid stopping abruptly.",
        model: "and so on",
      },
      {
        id: 3,
        stem: "Near equivalence / rough sameness.",
        model: "more or less",
      },
      {
        id: 4,
        stem: "Categories of people, products or industries.",
        model: "types of, kinds of",
      },
    ],
  },
  speak1c: {
    badge: "c",
    instruction:
      "Discuss: heavy industry in your country; kinds of people who succeed; where you see yourself in ten years. Tick each time someone uses approximately, kinds of, more or less, about, and so on, around.",
  },
  thereIt2a: {
    badge: "2a",
    instruction:
      "Complete with estimation phrases (Teacher’s Book 1c keys).",
    bank: [
      "kinds of",
      "about",
      "and so on",
      "more or less",
    ],
    items: [
      {
        id: 1,
        before: "There are various ",
        after: " training that companies offer new staff.",
        answers: ["kinds of"],
      },
      {
        id: 2,
        before: "The course lasts ",
        after: " six months.",
        answers: ["about"],
      },
      {
        id: 3,
        before: "They talked about salaries, bonuses, holiday pay and ",
        after: ".",
        answers: ["and so on"],
      },
      {
        id: 4,
        before: "The two office plans are ",
        after: " the same size overall.",
        answers: ["more or less"],
      },
    ],
  },
  incorrect2b: {
    badge: "b",
    instruction:
      "Mark each sentence Correct or Incorrect for academic style (avoid vague thing / people when a specific noun is better).",
    items: [
      {
        id: 1,
        text: "A: Companies should improve things for people in the workplace.",
        verdict: "Incorrect",
        tip: "Incorrect – too vague (thing / people). Prefer specific nouns.",
      },
      {
        id: 2,
        text: "B: Companies should improve working conditions for employees.",
        verdict: "Correct",
        tip: "Correct – specific nouns; better academic writing.",
      },
      {
        id: 3,
        text: "Managers should deal with the things that stop staff working well.",
        verdict: "Incorrect",
        tip: "Incorrect – replace things with issues / problems / responsibilities.",
      },
      {
        id: 4,
        text: "Apprentices and trainees need clear feedback from supervisors.",
        verdict: "Correct",
        tip: "Correct",
      },
      {
        id: 5,
        text: "People at the top should listen to people lower down.",
        verdict: "Incorrect",
        tip: "Incorrect – prefer Managers / Employers and employees.",
      },
      {
        id: 6,
        text: "Building sites require strict safety procedures.",
        verdict: "Correct",
        tip: "Correct – specific place noun.",
      },
    ],
  },
  practice2c: {
    badge: "c",
    instruction:
      "Replace vague wording. Place the best specific noun / phrase (suggested keys from Teacher’s Book 2c).",
    bank: [
      "responsibilities",
      "apprentices",
      "Managers",
      "building sites",
      "impact",
      "issues",
      "trainees",
      "Employers",
    ],
    items: [
      {
        id: 1,
        before: "New staff must understand their ",
        after: " clearly.",
        answers: ["responsibilities", "issues", "problems"],
      },
      {
        id: 2,
        before: "The scheme supports ",
        after: " during their first year.",
        answers: ["apprentices", "trainees"],
      },
      {
        id: 3,
        before: "",
        after: " should communicate goals to their teams.",
        answers: ["Managers", "Employers", "Bosses"],
      },
      {
        id: 4,
        before: "Safety rules are essential on ",
        after: ".",
        answers: ["building sites", "sites they work on"],
      },
      {
        id: 5,
        before: "Technology can have a major ",
        after: " on productivity.",
        answers: ["impact", "development"],
      },
    ],
  },
  practice2d: {
    badge: "d",
    instruction:
      "Write four sentences about work or success using estimation language and specific nouns (no vague thing).",
  },
};
