export const READ_M6A_STEPS = [
  "1 Before you read",
  "2 Skim title",
  "3a–3b Unknown words",
  "4 Flow + sentences",
  "5a Wrong answers",
  "5b Discussion",
] as const;

export const READ_M6A_NEXT = [
  "2 Skim title →",
  "3a–3b Words →",
  "4 Exam →",
  "5a Wrong answers →",
  "5b Discussion →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ");
}

export function checkReadM6a(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export const readingM6a = {
  id: "reading-m6a-flow",
  bookPages: "pp. 88–89 in your coursebook",
  sectionTitle: "Reading · Flow-chart / Sentence completion",
  title: "Why people become criminals",
  subtitle:
    "Scientists are looking inside the brain for answers — and what they find raises hard questions about free will and the law.",
  passage: [
    {
      id: "1",
      text: `For centuries, people have wondered whether criminals are born or made. Early attempts to answer that question now look crude: some 19th-century scientists measured the shape of a skull, hoping that bumps and hollows would reveal a criminal personality. Those ideas have long been discarded, but the search for biological clues has never really stopped.`,
    },
    {
      id: "2",
      text: `Today, researchers use brain scans to study people who repeatedly commit violent crimes. In some notorious cases, post-mortem examinations and imaging have shown damage or unusual activity in regions linked to impulse control. Laboratory work with rodents and other animals has also suggested that certain brain pathways can encourage aggressive behaviour when they are disrupted.`,
    },
    {
      id: "3",
      text: `Particular attention has been paid to the limbic system, an older part of the brain where strong feelings such as rage and fear originate. When this system is overactive or poorly regulated by the frontal lobes, people may struggle to restrain themselves. Related research has looked at whether some offenders have a reduced capacity for emotion — including empathy — which may make it easier to harm others without feeling guilt.`,
    },
    {
      id: "4",
      text: `Diet and chemistry may play a role too. Trials have explored whether supplements containing omega-3 / fatty acids can calm impulsivity, because these nutrients support healthy brain function. Another line of enquiry concerns anticipatory fear: the uneasy feeling most people get before doing something risky or wrong. If that warning signal is weak, deterrence may fail.`,
    },
    {
      id: "5",
      text: `Findings like these unsettle traditional ideas about justice. Courts assume that adults generally understand the law and can choose whether to break it. If biology heavily shapes behaviour, some argue, punishment alone looks less fair. Others reply that society still needs clear rules: even if brains differ, people must be held responsible. The debate therefore returns to free will — how much real choice offenders have, and what that means for sentencing and rehabilitation.`,
    },
  ],
  beforeYouRead: {
    badge: "1",
    instruction: "Work in groups and discuss the questions.",
    questions: [
      "What kinds of crime make people feel less safe in cities? Why?",
      "Do you think nature (biology) or nurture (life experience) has a bigger effect on whether someone becomes a criminal? Why?",
    ],
    tip: "Suggested: people-orientated crime such as muggings and murder make people feel less safe.",
  },
  skim: {
    badge: "2",
    instruction:
      "Read the title and subheading. What is the passage mainly about? Skim to check.",
    tip: "Why people become criminals (brain science / biology and behaviour).",
  },
  words: {
    badge: "3a",
    instruction:
      "Match the words from the passage with the meanings (1–10). Then discuss the clues that helped you (word parts, grammar, context).",
    bank: [
      "post-mortem",
      "notorious",
      "bandit",
      "intrigued",
      "rodents",
      "throwbacks",
      "discredited",
      "tainted",
      "discarded",
      "discipline",
    ],
    items: [
      {
        id: 1,
        text: "examination of a dead body to find out why the person died",
        key: "post-mortem",
      },
      {
        id: 2,
        text: "famous for something bad; infamous",
        key: "notorious",
      },
      {
        id: 3,
        text: "robber (usually of travellers)",
        key: "bandit",
      },
      {
        id: 4,
        text: "very interested",
        key: "intrigued",
      },
      {
        id: 5,
        text: "a small animal such as a rat, mouse or guinea pig",
        key: "rodents",
      },
      {
        id: 6,
        text: "something similar to what happened/existed in the past",
        key: "throwbacks",
      },
      {
        id: 7,
        text: "no longer respected",
        key: "discredited",
      },
      {
        id: 8,
        text: "damaged (e.g. a reputation damaged by association)",
        key: "tainted",
      },
      {
        id: 9,
        text: "thrown away",
        key: "discarded",
      },
      {
        id: 10,
        text: "area of knowledge or teaching",
        key: "discipline",
      },
    ],
  },
  exam: {
    badge: "4",
    strategies: "TEST STRATEGIES page 170",
    instruction:
      "Complete the flow chart and the sentences below. Choose NO MORE THAN THREE WORDS from the passage for each answer.",
    flowTitle: "Research into criminal behaviour",
    flowGaps: [
      {
        id: 1,
        before: "Early scientists studied the shape of the ",
        after: "",
        answers: ["skull"],
      },
      {
        id: 2,
        before: "Modern studies use ",
        after: " of violent offenders",
        answers: ["brain scans"],
      },
      {
        id: 3,
        before: "Animal research links brain pathways to ",
        after: "",
        answers: ["aggressive behaviour", "(aggressive) behaviour", "behaviour"],
      },
      {
        id: 4,
        before: "Feelings of rage and fear originate in the ",
        after: "",
        answers: ["limbic system"],
      },
      {
        id: 5,
        before: "Some offenders may lack a full ",
        after: "",
        answers: ["capacity for emotion"],
      },
    ],
    sentenceGaps: [
      {
        id: 6,
        before: "Supplements with ",
        after: " have been tested to reduce impulsivity.",
        answers: [
          "omega-3",
          "fatty acids",
          "omega-3 fatty acids",
          "omega-3/fatty acids",
        ],
      },
      {
        id: 7,
        before: "A weak sense of ",
        after: " may reduce the effect of deterrence.",
        answers: ["anticipatory fear", "(anticipatory) fear", "fear"],
      },
      {
        id: 8,
        before: "Courts assume adults generally understand the ",
        after: ".",
        answers: ["law"],
      },
      {
        id: 9,
        before: "The debate returns to questions of ",
        after: ".",
        answers: ["free will"],
      },
    ],
  },
  wrongAnswers: {
    badge: "5a",
    instruction: "Why are these answers wrong? Discuss with a partner.",
    items: [
      {
        id: 2,
        wrong: "brains",
        tip: "brains not written in plural form and does not collocate with taken",
      },
      {
        id: 4,
        wrong: "feelings / emotions (as the gap answer)",
        tip: "it’s the limbic system where these feelings originate",
      },
      {
        id: 6,
        wrong: "fish oil pills",
        tip: "fish oil pills contain fatty acids; the fish oil is not the active ingredient",
      },
      {
        id: 7,
        wrong: "insufficient anticipatory fear response",
        tip: "too many words; lack of repeats meaning of insufficient in key; not in passage",
      },
    ],
  },
  discussion: {
    badge: "5b",
    instruction: "Discuss the questions, giving reasons.",
    questions: [
      "Should biological evidence ever reduce a criminal’s sentence? Why / Why not?",
      "How might society prevent crime if some risk factors are biological?",
      "Do you think free will is compatible with brain science? Why / Why not?",
    ],
    suggestedTitle: "Suggested answer",
    suggestedAnswer: [
      "Biological evidence might reduce a sentence when it shows the offender had impaired control through no fault of their own, such as a brain injury. However, it should not become an excuse for all violent crime — courts still need to protect the public.",
      "Society could focus on early intervention: better nutrition, mental-health support, and programmes for at-risk young people. Prevention through education and rehabilitation may be more effective than relying on punishment alone.",
      "Brain science suggests our choices are influenced by biology, yet we still experience ourselves as making decisions. I think free will is partly compatible — we have responsibility within limits, even if those limits are shaped by the brain.",
    ],
  },
};
