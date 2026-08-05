export type Segment =
  | { type: "text"; text: string }
  | { type: "gap"; id: number; maxWords: number };

export interface GapMeta {
  id: number;
  hint: string;
  answers: string[];
  maxWords: number;
  /** Exact phrases in the passage to highlight after Check */
  evidence: string[];
  /** Short teaching note shown in review */
  tip?: string;
}

export interface ReadingFlowData {
  id: string;
  module: number;
  bookPages: string;
  article: {
    title: string;
    introduction: string;
    predictHints: string[];
    predictPrompts: string[];
    keyVocab: string[];
    checkQuestions: string[];
  };
  passage: string[];
  scan: {
    instruction: string;
    steps: string[];
    highlightTerms: string[];
  };
  taskOverview: {
    notesTitle: string;
    tableTitle: string;
    notesInstruction: string;
    tableInstruction: string;
  };
  predictLanguage: {
    context: string;
    questions: { text: string; hint: string; answers: string[] }[];
  };
  tablePredictPrompt: string;
  /** Strategy tips shown after Check / in Learn */
  examTips: string[];
  notes: { segments: Segment[]; gap: GapMeta; relatedParagraphIndex: number }[];
  table: {
    rows: {
      category: string;
      relatedParagraphIndex: number;
      predictPrompt: string;
      advice: { segments: Segment[]; gap?: GapMeta }[];
      benefits: { segments: Segment[]; gap?: GapMeta }[];
    }[];
  };
  gaps: Record<number, GapMeta>;
  discussion: {
    instruction: string;
    timeSecPerQuestion: number;
    questions: string[];
  };
}

/** Paragraph index in `passage` for each gap id (notes + table). */
export function getGapParagraphIndex(
  data: ReadingFlowData,
  gapId: number,
): number | undefined {
  const note = data.notes.find((n) => n.gap.id === gapId);
  if (note) return note.relatedParagraphIndex;
  for (const row of data.table.rows) {
    const hit = [...row.advice, ...row.benefits].some((l) => l.gap?.id === gapId);
    if (hit) return row.relatedParagraphIndex;
  }
  return undefined;
}

export function collectEvidence(
  data: ReadingFlowData,
  gapIds?: number[],
): string[] {
  const ids = gapIds ?? Object.keys(data.gaps).map(Number);
  const terms: string[] = [];
  for (const id of ids) {
    const g = data.gaps[id];
    if (!g) continue;
    for (const e of g.evidence) {
      if (!terms.some((t) => t.toLowerCase() === e.toLowerCase())) terms.push(e);
    }
  }
  return terms;
}

export const readingFlowM1: ReadingFlowData = {
  id: "reading-m1-flow",
  module: 1,
  bookPages: "pp. 8–9 in your coursebook",
  article: {
    title: "Using neuroscience to manage your time",
    introduction:
      "When we feel under pressure, our instinct is to study or work for as long as we can. So why do we still feel we have not accomplished enough at the end of the day?",
    predictHints: [
      "Look at the title: neuroscience + time — what might the writer explain?",
      "Think about: brain, habits, rest, productivity, guilt, deadlines.",
      "The intro mentions pressure and not feeling you have done enough — predict why.",
    ],
    predictPrompts: [
      "What will the writer say about how the brain works when we study?",
      "Will the text suggest we should work longer or differently?",
      "What problems with time management might be mentioned?",
    ],
    keyVocab: [
      "neuroscience",
      "instinct",
      "accomplish",
      "pressure",
      "productivity",
      "deadline",
      "manage",
      "efficient",
    ],
    checkQuestions: [
      "Were your predictions about the brain and studying mentioned?",
      "Did the text explain why working longer does not always help?",
    ],
  },
  passage: [
    "In the face of pressure, our instinct is to study or work as much as we can for as long as we can. So why do we still feel as if we have not accomplished enough at the end of the day?",
    "Neuroscientist and professor at the Manhattan NeuroLeadership Institute, Josh Davis, suggests that, rather than focusing on what is urgent, people should decide what matters most and pinpoint the best time to do it. \"It's really about being highly effective as far as it's reasonable for a human being,\" Davis says. He believes that, rather than making a to-do list and working through each item, people should decide on the main aim for the day and work out when they are most likely to achieve peak productivity. Then this time can be devoted to the task with the highest priority, such as writing an essay or revising.",
    "It is obviously impossible to work intensively all the time, so simple tasks not requiring much attention – emails or paperwork – can be done in any 'downtime'. However, there are times when the extent to which small tasks can tax our brains is underestimated. Sending an email, for example, may appear simple on the surface but can involve a decision which, although trivial, can cause mental exhaustion. In this case, it is better to reorder the day and deal with less pressing concerns only after the work target has been achieved.",
    "The time of day when people are most alert varies from person to person but as a general rule the first two hours after waking up are not conducive to serious study. Research measuring attention, verbal reasoning and reaction times has also shown that when our body temperature falls below 37 degrees C, the brain is not at its full potential so the worst time to do anything involving thinking is between midnight and 6am. This is almost as bad as the afternoon slump between 2pm and 4pm, which is more to do with feeling cold than a heavy lunch.",
    "Rather than being afraid of getting distracted, just be careful how you do it. \"These days, when people decide to take a break, they tend to go on social media\", says Davis, \"and then they spend too much time there.\" Instead, they should go back to day-dreaming, where it is possible to stop thinking about work without really focusing on anything else. This allows for creative thinking and the integration between different parts of the brain, which cannot occur when the mind is required to focus on something specific.",
    "Neuroscience has revealed much about the mind-body connection and how exercise can be used as a tool. \"It's a different way of seeing exercise,\" says Davis. \"Usually we think about how in the long term it will make us healthy and look better but this is focused on the short term.\" A short session – 20 minutes or so – of moderate exercise will be sufficient. It does not need to be a lengthy gym visit; just running up and down stairs or jogging on the spot can be an effective method of lessening tension and boosting positive emotions.",
    "Food that keeps blood-sugar levels stable will also help people to work most effectively, says Davis. If people snack during the day, they should choose foods that contain fats such as nuts and cheese rather than carbohydrates, to avoid blood-sugar spikes. Starting the day with high-protein food such as eggs and toast will have a high impact on the neurotransmitters in the brain. The amino acid tyrosine, which is found in proteins, will stimulate the transmitters responsible for alertness and the calming protein tryptophan will relax the brain. On meal breaks, people should eat only to 80 percent capacity; people's best work will be done when they are slightly hungry but not starving.",
    "Keep hydrated and improve your mood by sipping water. Just remember not to overdo caffeine; it may improve your alertness but also minimizes concentration.",
    "Ensure you have a well-lit study space and that your desk space is clear; clutter is a distraction and not a good one, as it reminds you of uncompleted work. A clear desk also gives you room for increased movement, whether sitting with your arms behind your head or your feet up. You could alternate between standing and sitting.",
    "Finally, try to get eight hours sleep a night. While we sleep, our brains process and retain information, consolidating facts and reinforcing how to perform tasks. It also rejuvenates us both physically and mentally.",
  ],
  scan: {
    instruction:
      "Scan the passage to find the part which will give you the answer. Do not read every word.",
    steps: [
      "Use the title and the highlighted key words to find the correct place in the passage.",
      "Look for a word in the passage that will fit grammatically and has the correct meaning.",
    ],
    highlightTerms: [
      "peak productivity",
      "highest priority",
      "alert",
      "email",
      "reply",
      "blood-sugar",
      "blood sugar",
      "day-dreaming",
      "gym visit",
      "tension",
      "stress",
      "protein",
      "80 percent",
      "clutter",
      "desk",
      "freedom",
      "movement",
    ],
  },
  taskOverview: {
    notesTitle: "Using your time effectively",
    tableTitle: "Brain boosting",
    notesInstruction:
      "Questions 1–4. Complete the notes. NO MORE THAN TWO WORDS from the passage.",
    tableInstruction:
      "Questions 5–9. Complete the table. NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage.",
  },
  predictLanguage: {
    context:
      "Look at question 1 in the task below. Read around the gap and answer.",
    questions: [
      {
        text: "What class of word are you looking for? (verb, noun, adjective, adverb?)",
        hint: "After «highest» we need a noun — a quality or state.",
        answers: ["noun"],
      },
      {
        text: "What word collocates with «highest»?",
        hint: "When is your brain at its best? «highest ___»",
        answers: ["alertness", "concentration"],
      },
    ],
  },
  tablePredictPrompt:
    "Look at the table title «Brain boosting». What advice about exercise, food and your workspace do you expect?",
  examTips: [
    "Note / table completion: ответы — слова из пассажа, не свои синонимы. Смотрите лимит слов.",
    "Сначала найдите в notes/table ключевые слова, потом сканируйте пассаж — не читайте каждое слово.",
    "Порядок вопросов обычно следует порядку текста сверху вниз.",
    "Проверьте грамматику: слово должно «сесть» в blank (noun / verb / adjective).",
  ],
  gaps: {
    1: {
      id: 1,
      hint: "Scan for «highest» / peak productivity.",
      answers: ["alertness"],
      maxWords: 2,
      evidence: ["peak productivity", "highest priority", "alertness"],
      tip: "Ищите paraphrase: highest ___ ≈ peak productivity / most alert times.",
    },
    2: {
      id: 2,
      hint: "What might a non-urgent email require?",
      answers: ["reply", "response"],
      maxWords: 2,
      evidence: ["email", "less pressing concerns"],
      tip: "Email paragraph: small tasks after the main work target.",
    },
    3: {
      id: 3,
      hint: "What can drop after meals?",
      answers: ["blood sugar", "glucose"],
      maxWords: 2,
      evidence: ["blood-sugar", "afternoon slump"],
      tip: "В тексте часто blood-sugar (с дефисом) — в ответе допустим blood sugar.",
    },
    4: {
      id: 4,
      hint: "A good way of «switching off»?",
      answers: ["meditation", "mindfulness", "day-dreaming", "day dreaming"],
      maxWords: 2,
      evidence: ["day-dreaming"],
      tip: "Прямое совпадение: day-dreaming вместо social media.",
    },
    5: {
      id: 5,
      hint: "What is NOT necessary for exercise?",
      answers: ["gym membership", "a gym membership"],
      maxWords: 3,
      evidence: ["gym visit", "running up and down stairs"],
      tip: "Passage: lengthy gym visit не обязателен — stairs / on the spot.",
    },
    6: {
      id: 6,
      hint: "Exercise reduces what?",
      answers: ["stress"],
      maxWords: 2,
      evidence: ["lessening tension", "boosting positive emotions"],
      tip: "Paraphrase: lessening tension ≈ reduces stress.",
    },
    7: {
      id: 7,
      hint: "Breakfast should be rich in…",
      answers: ["protein"],
      maxWords: 2,
      evidence: ["high-protein", "proteins"],
      tip: "high-protein food → breakfast rich in protein.",
    },
    8: {
      id: 8,
      hint: "Stop eating when how full?",
      answers: ["completely", "80%", "80 percent"],
      maxWords: 2,
      evidence: ["80 percent"],
      tip: "Число/процент из текста: eat only to 80 percent capacity.",
    },
    9: {
      id: 9,
      hint: "Freedom of what?",
      answers: ["thought"],
      maxWords: 2,
      evidence: ["clear", "clutter", "increased movement"],
      tip: "Clear desk → less distraction, more freedom of thought / movement.",
    },
  },
  notes: [
    {
      segments: [
        { type: "text", text: "keep times of highest " },
        { type: "gap", id: 1, maxWords: 2 },
        { type: "text", text: " for most important work" },
      ],
      gap: {
        id: 1,
        hint: "Scan for «highest».",
        answers: ["alertness"],
        maxWords: 2,
        evidence: ["peak productivity", "highest priority", "alertness"],
      },
      relatedParagraphIndex: 1,
    },
    {
      segments: [
        { type: "text", text: "do not send an email that requires a non-urgent " },
        { type: "gap", id: 2, maxWords: 2 },
        { type: "text", text: " until main work done" },
      ],
      gap: {
        id: 2,
        hint: "What might an email require?",
        answers: ["reply", "response"],
        maxWords: 2,
        evidence: ["email", "less pressing concerns"],
      },
      relatedParagraphIndex: 2,
    },
    {
      segments: [
        { type: "text", text: "a drop in " },
        { type: "gap", id: 3, maxWords: 2 },
        { type: "text", text: " affects mental power – avoid early/post-lunch hours" },
      ],
      gap: {
        id: 3,
        hint: "What can drop?",
        answers: ["blood sugar", "glucose"],
        maxWords: 2,
        evidence: ["blood-sugar", "afternoon slump"],
      },
      relatedParagraphIndex: 3,
    },
    {
      segments: [
        { type: "gap", id: 4, maxWords: 2 },
        { type: "text", text: " is a good way of 'switching off'" },
      ],
      gap: {
        id: 4,
        hint: "Way to switch off?",
        answers: ["day-dreaming", "day dreaming", "meditation"],
        maxWords: 2,
        evidence: ["day-dreaming"],
      },
      relatedParagraphIndex: 4,
    },
  ],
  table: {
    rows: [
      {
        category: "Exercise",
        relatedParagraphIndex: 5,
        predictPrompt:
          "What exercise advice and benefits do you expect? (gym, time, mood…)",
        advice: [
          {
            segments: [
              { type: "gap", id: 5, maxWords: 3 },
              { type: "text", text: " not necessary" },
            ],
            gap: {
              id: 5,
              hint: "Not necessary for exercise?",
              answers: ["gym membership", "a gym membership"],
              maxWords: 3,
              evidence: ["gym visit", "running up and down stairs"],
            },
          },
          { segments: [{ type: "text", text: "run up steps or on spot" }] },
        ],
        benefits: [
          {
            segments: [
              { type: "text", text: "reduces " },
              { type: "gap", id: 6, maxWords: 2 },
              { type: "text", text: " ; improves mood" },
            ],
            gap: {
              id: 6,
              hint: "Reduces what?",
              answers: ["stress"],
              maxWords: 2,
              evidence: ["lessening tension", "boosting positive emotions"],
            },
          },
        ],
      },
      {
        category: "Food",
        relatedParagraphIndex: 6,
        predictPrompt:
          "What food advice might appear? (breakfast, snacks, how much to eat…)",
        advice: [
          {
            segments: [
              { type: "text", text: "have breakfast rich in " },
              { type: "gap", id: 7, maxWords: 2 },
              { type: "text", text: " ;" },
            ],
            gap: {
              id: 7,
              hint: "Rich in what?",
              answers: ["protein"],
              maxWords: 2,
              evidence: ["high-protein", "proteins"],
            },
          },
          {
            segments: [
              { type: "text", text: "stop eating when " },
              { type: "gap", id: 8, maxWords: 2 },
              { type: "text", text: " full" },
            ],
            gap: {
              id: 8,
              hint: "How full?",
              answers: ["completely", "80%", "80 percent"],
              maxWords: 2,
              evidence: ["80 percent"],
            },
          },
        ],
        benefits: [
          { segments: [{ type: "text", text: "makes you calmer and more alert" }] },
          { segments: [{ type: "text", text: "you achieve more when a bit hungry" }] },
        ],
      },
      {
        category: "Study/Work area",
        relatedParagraphIndex: 8,
        predictPrompt:
          "What workspace advice? (desk, light, clutter, movement…)",
        advice: [
          {
            segments: [
              { type: "text", text: "remove unnecessary mess from your workspace" },
            ],
          },
        ],
        benefits: [
          { segments: [{ type: "text", text: "prevents attention wandering;" }] },
          {
            segments: [
              { type: "text", text: "allows more freedom of " },
              { type: "gap", id: 9, maxWords: 2 },
            ],
            gap: {
              id: 9,
              hint: "Freedom of what?",
              answers: ["thought"],
              maxWords: 2,
              evidence: ["clear", "clutter", "increased movement"],
            },
          },
        ],
      },
    ],
  },
  discussion: {
    instruction: "Discuss these questions in groups.",
    timeSecPerQuestion: 120,
    questions: [
      "How effectively do you study? Give examples of the ways in which you could improve.",
      "At what time of day do you study best/worst? Give reasons.",
      "To what extent do you agree with the writer's comments on food, exercise and workspace? Why?",
      "What do you do when you take breaks? In what way does this help you?",
    ],
  },
};

function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

export function checkAnswer(input: string, accepted: string[]): boolean {
  return accepted.some((a) => normalize(a) === normalize(input));
}

/** Learn-track steps (warm-up → scan → exam task → discussion). */
export const LEARN_STEPS = [
  "Warm-up",
  "Scan focus",
  "Exam task",
  "Discussion",
] as const;

export const LEARN_STEP_NEXT: Record<number, string> = {
  0: "Continue → Scan focus",
  1: "Continue → Exam task",
  2: "Continue → Discussion",
  3: "← К модулю",
};

/** @deprecated use LEARN_STEPS */
export const FLOW_STEPS = LEARN_STEPS;
/** @deprecated use LEARN_STEP_NEXT */
export const FLOW_STEP_NEXT = LEARN_STEP_NEXT;

/** Topic index → Learn step. */
export const READING_M1_TOPIC_STEPS = [0, 1, 2, 2] as const;

export function getReadingM1StepForTopic(
  topicIndex: number,
  part?: "notes" | "table" | "2a" | "2b" | "discussion" | "exam",
): number {
  if (part === "discussion") return 3;
  if (part === "exam" || part === "notes" || part === "table") return 2;
  if (part === "2a" || part === "2b") return 1;
  return READING_M1_TOPIC_STEPS[topicIndex] ?? 0;
}

/** Map legacy 9-step indices to Learn steps. */
export function migrateLegacyReadingStep(n: number): number {
  if (n <= 0) return 0;
  if (n === 1 || n === 3 || n === 4) return 1;
  if (n === 2 || n === 5 || n === 6 || n === 8) return 2;
  if (n === 7) return 3;
  return Math.min(n, LEARN_STEPS.length - 1);
}
