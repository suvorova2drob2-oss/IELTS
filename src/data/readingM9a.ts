export const READ_M9A_STEPS = [
  "Before you read",
  "Skim",
  "Infer words",
  "MCQ + YNNG",
  "Check answers",
  "Discussion",
] as const;

export const READ_M9A_NEXT = [
  "Skim →",
  "Infer words →",
  "MCQ + YNNG →",
  "Check answers →",
  "Discussion →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ");
}

export function checkReadM9a(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export const readingM9a = {
  id: "reading-m9a-flow",
  bookPages: "pp. 136–137 in your coursebook",
  sectionTitle: "Reading · Multiple choice; Yes/No/Not given",
  title: "The multitasking myth",
  subtitle:
    "From click-holes to porous attention — why doing everything at once may reshape how we think, create and work.",
  passage: [
    {
      id: "1",
      text: `Many people now admit that their working day is punctuated by an unending click-hole of messages, tabs and feeds. What begins as a guilty pleasure — checking one notification — can become a habit of continual distraction. The modern workplace rarely rewards uninterrupted focus; instead it demands that we switch between tasks at speed, often while answering emails that arrive every few minutes.`,
    },
    {
      id: "2",
      text: `Yet some researchers argue that porous boundaries between tasks are not purely negative. When attention is allowed to leak from one activity into another, unexpected connections can form. In this view, a slightly porous mind may facilitate creativity: ideas migrate across projects rather than remaining sealed inside a single, rigid channel of concentration.`,
    },
    {
      id: "3",
      text: `Idealists still praise deep work — long stretches of undivided attention on one problem. In today’s economy, however, that ideal is often unrealistic. Combining professional deadlines with domestic responsibilities, and navigating tools that constantly interrupt us, makes classic single-tasking difficult to sustain. Multitasking, for better or worse, has become a practical necessity rather than a lifestyle choice.`,
    },
    {
      id: "4",
      text: `Laboratory studies of heavy multitaskers have produced a striking discovery: these people sometimes perform unusually well on tests of divergent thinking, the kind of open-ended problem-solving that generates many possible answers. The finding does not prove that distraction is harmless, but it does suggest that the ability to hold several threads at once can support inventive thought.`,
    },
    {
      id: "5",
      text: `The wider implication is that focus is not always essential. Certain jobs still require careful, sequential attention — surgery, for example — yet many creative and knowledge roles may benefit from a more flexible style of attention. Understanding when to protect deep focus and when to tolerate porous, multitasking habits may be the real skill of modern success.`,
    },
  ],
  beforeYouRead: {
    badge: "1",
    instruction: "Work in groups and discuss the questions.",
    questions: [
      "Do you have a busy personal/professional life? What do you have to do every day?",
      "How do you manage these tasks? What does multitasking mean?",
    ],
    tip: "Suggested: Doing more than one thing at the same time. Due to a faster pace of life, need to combine work and home life, advances in technology, added workload as a result of economic situation.",
  },
  skim: {
    badge: "2",
    instruction:
      "Read the title and subheading. What is the passage mainly about? Skim to check.",
    tip: "Multitasking, distraction (click-holes), porous attention and creativity, and whether focus is always essential.",
  },
  words: {
    badge: "3a",
    instruction:
      "Match the words / ideas with the meanings (1–6). Then discuss the clues that helped you (word parts, grammar, context).",
    bank: [
      "click-hole",
      "porous",
      "divergent thinking",
      "deep work",
      "distraction",
      "multitasking",
    ],
    items: [
      {
        id: 1,
        text: "An unending online habit linked to a computer mouse; implies addiction and time-wasting (guilty pleasure of becoming distracted).",
        key: "click-hole",
      },
      {
        id: 2,
        text: "Allowing something to get through; positive here because it can facilitate creativity.",
        key: "porous",
      },
      {
        id: 3,
        text: "Open-ended problem-solving that generates many possible answers.",
        key: "divergent thinking",
      },
      {
        id: 4,
        text: "Long stretches of undivided attention on one problem.",
        key: "deep work",
      },
      {
        id: 5,
        text: "Something that pulls your attention away from the main task.",
        key: "distraction",
      },
      {
        id: 6,
        text: "Doing more than one thing at the same time.",
        key: "multitasking",
      },
    ],
  },
  exam: {
    badge: "4",
    strategies: "TEST STRATEGIES pages 171–172",
    instruction:
      "Questions 1–5 Choose the correct letter, A, B, C or D. Questions 6–9 Do the following statements agree with the claims of the writer? Write Yes, No or Not given.",
    flowTitle: "Questions 1–5 Choose the correct letter",
    flowGaps: [
      {
        id: 1,
        before:
          "1 According to the writer, a ‘click-hole’ mainly suggests that online distractions are",
        after: "",
        answers: ["B"],
      },
      {
        id: 2,
        before:
          "2 In this passage, ‘porous’ boundaries between tasks are presented as",
        after: "",
        answers: ["C"],
      },
      {
        id: 3,
        before:
          "3 The writer’s view of uninterrupted deep work in the modern world is that it is",
        after: "",
        answers: ["A"],
      },
      {
        id: 4,
        before:
          "4 The discovery about multitaskers and divergent thinking is used to show that",
        after: "",
        answers: ["D"],
      },
      {
        id: 5,
        before:
          "5 The writer concludes that sustained focus",
        after: "",
        answers: ["D"],
      },
    ],
    sentenceGaps: [
      {
        id: 6,
        before:
          "6 The writer believes that multitasking has become necessary because of modern working conditions.",
        after: "",
        answers: ["Yes"],
      },
      {
        id: 7,
        before:
          "7 Some research suggests multitaskers can do well on tests of divergent thinking.",
        after: "",
        answers: ["Yes"],
      },
      {
        id: 8,
        before:
          "8 The writer claims that surgeons should multitask during operations.",
        after: "",
        answers: ["No"],
      },
      {
        id: 9,
        before:
          "9 Companies that ban email for part of the day report higher profits.",
        after: "",
        answers: ["Not given", "NG", "Not Given"],
      },
    ],
  },
  wrongAnswers: {
    badge: "5a",
    instruction: "Why are these answers wrong? Discuss with a partner.",
    items: [
      {
        id: 1,
        wrong: "A (click-hole = useful tool)",
        tip: "The writer links click-hole with unending distraction and guilty pleasure, not usefulness.",
      },
      {
        id: 2,
        wrong: "A / B (porous = purely negative leak)",
        tip: "Porous is positive in this context because it facilitates creativity.",
      },
      {
        id: 3,
        wrong: "C (deep work is easy today)",
        tip: "The text says deep work is ideal but not possible / realistic in a modern world.",
      },
      {
        id: 8,
        wrong: "Yes",
        tip: "The text contrasts surgery (needs sequential attention) with roles that may tolerate multitasking — so the claim is No.",
      },
    ],
  },
  discussion: {
    badge: "5b",
    instruction: "Discuss the questions, giving reasons.",
    questions: [
      "Is multitasking a useful skill or a harmful habit? Why?",
      "When is deep focus essential, and when might porous attention help creativity?",
      "How could workplaces reduce unnecessary distractions without stopping collaboration?",
    ],
    suggestedTitle: "Suggested answer",
    suggestedAnswer: [
      "Multitasking is often a harmful habit disguised as productivity. Switching between tasks reduces accuracy and increases stress, even though it can feel efficient in the moment.",
      "Deep focus is essential for surgery, proofreading, and any work where a single error has serious consequences. Porous attention may help creativity when brainstorming or making unexpected connections between ideas.",
      "Workplaces could introduce quiet zones, limit unnecessary meetings, and encourage employees to turn off non-urgent notifications. Collaboration could be scheduled at set times rather than interrupting focused work throughout the day.",
    ],
  },
};
