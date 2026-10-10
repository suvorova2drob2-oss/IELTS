import { EXPERT_M3_AUDIO } from "./expertAudio";

export const LISTEN_M3A_STEPS = [
  "1 Quotes",
  "2a–b Read & analyse",
  "2c Match",
  "2d Preview listen",
  "3 Exam task",
  "4 Task analysis",
  "5 Discussion",
  "6 Language pack",
] as const;

export const LISTEN_M3A_NEXT = [
  "2a–b →",
  "2c Match →",
  "2d Listen →",
  "3 Exam →",
  "4 Analysis →",
  "5 Discussion →",
  "Language pack →",
  "← К модулю",
] as const;

function normalizeListen(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[.,;:!?]+$/g, "")
    .replace(/^\(|\)$/g, "");
}

export function checkListenM3a(input: string, accepted: string[]): boolean {
  const n = normalizeListen(input);
  if (!n) return false;
  return accepted.some((a) => normalizeListen(a) === n);
}

function normalizePair(s: string): string {
  return normalizeListen(s);
}

export function examAnswerOkM3a(
  id: number,
  value: string,
  answers: Record<number, string>,
): boolean {
  if ([5, 6].includes(id)) {
    const pair = listeningM3a.pairKeys.find((p) => p.ids.includes(id));
    if (!pair) return false;
    const vals = pair.ids.map((i) => normalizePair(answers[i] ?? ""));
    return (
      vals.every(Boolean) &&
      pair.answers.every((a) => vals.includes(normalizePair(a))) &&
      new Set(vals).size === pair.answers.length
    );
  }
  return checkListenM3a(value, listeningM3a.examKeys[id]);
}

export const listeningM3a = {
  id: "listening-m3a-flow",
  bookPages: "p. 44 in your coursebook",
  sectionTitle: "Listening · Section 4",
  quotes: {
    badge: "1",
    heading: "Before you listen",
    instruction:
      "Read the quotes. Which ideas do you agree with? Which quote best matches how you relax?",
    items: [
      {
        id: "q1",
        color: "cream",
        text: "‘Tension is who you think you should be. Relaxation is who you are.’",
        attribution: "Chinese proverb",
      },
      {
        id: "q2",
        color: "green",
        text: "‘What you’re supposed to do when you don’t like a thing is change it. If you can’t change it, change the way you think about it. Don’t complain.’",
        attribution: "Maya Angelou",
      },
      {
        id: "q3",
        color: "blue",
        text: "‘There is more to life than increasing its speed.’",
        attribution: "Mahatma Gandhi",
      },
      {
        id: "q4",
        color: "grey",
        text: "‘He is richest who is content with the least, for content is the wealth of nature.’",
        attribution: "Socrates",
      },
    ],
  },
  preview: {
    badge: "2a",
    heading: "Identify specific information required",
    instruction:
      "Read the questions. What do you think the main subject of the lecture will be?",
    predictCue: "Main subject: meditation (and its benefits)",
    readHint:
      "Read the questions on the left, then answer the analysis prompts on the right (with a partner if you can).",
  },
  previewListen: {
    badge: "2d",
    heading: "Preview listen",
    instruction: "2d Listen and complete questions 1–4 only (Track 03_04).",
    hint:
      "Play the audio, type each answer in the numbered gap, then press Check →. Green = correct; red shows the key answer.",
    scriptLabel: "Audio script 3.4 (p. 203)",
    script: [
      {
        speaker: "Narrator",
        text: "You are going to listen to part of a lecture on the health benefits of meditation. Listen and answer the questions.",
      },
      {
        speaker: "Lecturer",
        text: "Now, when we think of meditation, some of us may just consider that it’s a new age or alternative concept, one which is focused on relaxing and centering yourself. But in today’s lecture, we’re going to explore meditation in a completely new light and focus on the wide range of health benefits meditation can provide.",
      },
      {
        speaker: "Lecturer",
        text: "Although there haven’t been many large-scale trials focused on the effects of meditation in the scientific community, there have been many smaller studies which have shown some very positive results. The effects noted include not only psychological benefits, but physical ones too. There is even evidence to indicate that meditation can boost our gene activity.",
      },
      {
        speaker: "Lecturer",
        text: "So, let’s review some of these studies and their findings. Firstly, research which was undertaken at the University of Sheffield strongly suggests that meditation in combination with other techniques, such as relaxation sessions, clearly has an effect and that it helps improve problems such as skin disorders. By skin disorders, I refer to eczema or acne. The researchers combined data from over 900 participants in 22 studies and found that psychological treatment, which included meditation, helped reduce the physical symptoms of these skin disorders.",
      },
      {
        speaker: "Lecturer",
        text: "Also, it seems quite plausible that meditation can slow down the rate of ageing. The University of California recently undertook a study which revealed that meditation has the capacity to lengthen telomeres. These are basically a key part of our DNA which naturally shorten and, in effect, drive the ageing process of our bodies. The study itself examined two groups, a control group and another one whose members attended a three-month meditation course. Their findings clearly demonstrated that the group who had been doing meditation had strengthened telomeres.",
      },
    ],
    audio: EXPERT_M3_AUDIO.track03_04,
    audioLabel: "Track 03_04",
  },
  questions: [
    {
      id: 1,
      group: "1–2",
      limit: "NO MORE THAN TWO WORDS AND/OR A NUMBER",
      kind: "completion" as const,
      before: "There are ",
      underlineBefore: "few",
      gap: true,
      after: " on the ",
      underlineAfter: "benefits",
      end: " of meditation.",
    },
    {
      id: 2,
      group: "1–2",
      limit: "NO MORE THAN TWO WORDS AND/OR A NUMBER",
      kind: "completion" as const,
      before: "There is ",
      underlineBefore: "some indication",
      mid: " that meditation ",
      underlineMid: "may be able to",
      mid2: " ",
      underlineMid2: "increase our",
      gap: true,
      after: ".",
    },
    {
      id: 3,
      group: "3–4",
      limit: "NO MORE THAN THREE WORDS AND/OR A NUMBER",
      kind: "short" as const,
      promptBefore: "",
      underlinePrompt: "In what ways",
      promptMid: " can meditation help us ",
      underlinePrompt2: "physically",
      promptAfter: "?",
      sharedPrompt: true,
    },
    {
      id: 4,
      group: "3–4",
      limit: "NO MORE THAN THREE WORDS AND/OR A NUMBER",
      kind: "short" as const,
      sharedWith: 3,
    },
    {
      id: 5,
      group: "5–6",
      limit: "NO MORE THAN THREE WORDS AND/OR A NUMBER",
      kind: "short" as const,
      prompt: "What are two indirect benefits of meditation?",
      sharedPrompt: true,
    },
    {
      id: 6,
      group: "5–6",
      limit: "NO MORE THAN THREE WORDS AND/OR A NUMBER",
      kind: "short" as const,
      sharedWith: 5,
    },
    {
      id: 7,
      group: "7–9",
      limit: "NO MORE THAN TWO WORDS AND/OR A NUMBER",
      kind: "completion" as const,
      before: "A lot of research has been done in the area of meditation and ",
      gap: true,
      after: ".",
    },
    {
      id: 8,
      group: "7–9",
      limit: "NO MORE THAN TWO WORDS AND/OR A NUMBER",
      kind: "completion" as const,
      gap: true,
      after: " of daily meditation can improve a person’s mental well-being.",
    },
    {
      id: 9,
      group: "7–9",
      limit: "NO MORE THAN TWO WORDS AND/OR A NUMBER",
      kind: "completion" as const,
      before: "In most cases, meditation should not be a replacement for ",
      gap: true,
      after: ".",
    },
  ],
  analyse: {
    badge: "2b",
    instruction:
      "Answer the following questions about the questions in Exercise 2a.",
    items: [
      "What kind of word or words should go in each space? A noun, adjective or verb?",
      "Can more than one word go in any spaces? How many?",
      "Which answers require a singular or plural noun?",
      "What spaces definitely require more than one word? How do you know?",
      "Which questions are asking for examples?",
    ],
    tips: [
      "Mostly nouns (studies/research; abilities; examples of benefits; topic areas).",
      "Yes — up to two words (1–2, 7–9) or three words (3–6).",
      "Likely plural for Q1 (few ___); Q3–6 examples may be singular or plural depending on the recording.",
      "Look at the word limit and grammar around the gap (e.g. ‘few ___’ → plural noun phrase).",
      "Questions 3–4 and 5–6 ask for examples / two benefits.",
    ],
  },
  match: {
    badge: "c",
    instruction:
      "Match the phrases below with the underlined words/phrases in Exercise 2a. Can you think of any others?",
    bank: [
      "a few signs",
      "advantages",
      "boost",
      "could possibly",
      "enhance",
      "in a more physical sense",
      "in some manners",
      "might even",
      "not many",
      "positive points",
      "preliminary evidence",
    ],
    targets: [
      { id: "few", label: "few", key: "not many", also: [] as string[] },
      {
        id: "benefits",
        label: "benefits",
        key: "advantages",
        also: ["positive points"],
      },
      {
        id: "indication",
        label: "some indication",
        key: "preliminary evidence",
        also: ["a few signs"],
      },
      {
        id: "may",
        label: "may be able to",
        key: "could possibly",
        also: ["might even"],
      },
      {
        id: "increase",
        label: "increase our",
        key: "enhance",
        also: ["boost"],
      },
      {
        id: "ways",
        label: "In what ways",
        key: "in some manners",
        also: [] as string[],
      },
      {
        id: "physically",
        label: "physically",
        key: "in a more physical sense",
        also: [] as string[],
      },
    ],
  },
  exam: {
    badge: "3",
    heading: "Test practice",
    strategies: "TEST STRATEGIES page 168",
    instruction:
      "3.5 Listen and complete the full test task (questions 1–9). Use the ideas in Exercises 2a–2c to prepare before you listen.",
    hint:
      "Play Track 03_05, fill all gaps, then press Check →. Q5 and Q6 are two indirect benefits — either order.",
    scriptLabel: "Audio script 3.5 (pp. 203–204)",
    script: [
      {
        speaker: "Narrator",
        text: "You are going to listen to the second part of a lecture on the health benefits of meditation. Listen and answer the questions.",
      },
      {
        speaker: "Lecturer",
        text: "So the benefits of simply meditating could be much more extensive than initially considered by much of the medical community. These health benefits need to be studied in larger numbers before anything conclusive can be claimed, such as that meditation can maintain our youth and heal our skin. However, there are also what I would call the knock-on effects of meditation. This is where meditation has more incidental effects on our health.",
      },
      {
        speaker: "Lecturer",
        text: "Studies show that people who start meditating are often more predisposed to giving up smoking, if of course they smoke in the first place. This knock-on effect is of great interest in terms of improving overall public health in populations. In addition to this and possibly inspired by the practice, many frequent meditators also start to change their relationship with food and begin eating more healthily. Now both of these activities have definite health benefits.",
      },
      {
        speaker: "Lecturer",
        text: "These kinds of changes in lifestyle undoubtedly come from the fact that meditation improves our psychological health and this is the area where there is the most research.",
      },
      {
        speaker: "Lecturer",
        text: "Psychologically, meditation can cause a person to become more energetic, more alert, happier and less stressed. Now stress and meditation is one area where many studies have been undertaken. There is actually quite clear evidence that an individual can see quite a marked change in their ability to deal with stressful situations with just ten minutes a day of meditation.",
      },
      {
        speaker: "Lecturer",
        text: "However, although it is undeniable that meditation is good for us, we shouldn’t believe that it is a comprehensive cure. While meditation can be beneficial, it cannot and shouldn’t be used in the place of medical intervention when mental or physical problems are marked within an individual. In fact, this might be considered the point where meditation might actually be harmful if it prevents an individual from seeking more traditional help. Perhaps meditation should be thought of as a complement rather than an answer.",
      },
    ],
    audio: EXPERT_M3_AUDIO.track03_05,
    audioLabel: "Track 03_05",
  },
  /** Teacher's Book · Listening p. 44 · Exercises 2d & 3 */
  examKeys: {
    1: ["trials", "large-scale trials", "large scale trials"],
    2: ["gene activity"],
    3: ["improve skin disorders"],
    4: ["slow down ageing", "slow down aging"],
    5: ["giving up smoking", "eating more healthily"],
    6: ["giving up smoking", "eating more healthily"],
    7: ["stress"],
    8: ["10 minutes", "ten minutes", "10"],
    9: ["medical intervention"],
  } as Record<number, string[]>,
  /** Q5–6 accept either order; each pair must contain both answers. */
  pairKeys: [
    { ids: [5, 6], answers: ["giving up smoking", "eating more healthily"] },
  ],
  /** @deprecated use examKeys — kept for preview step scoring */
  previewKeys: {
    1: ["trials", "large-scale trials", "large scale trials"],
    2: ["gene activity"],
    3: ["improve skin disorders"],
    4: ["slow down ageing", "slow down aging"],
  } as Record<number, string[]>,
  analysis: {
    badge: "4a",
    heading: "Task analysis",
    a: "Compare your Exercise 3 answers with the key. Re-play Track 03_05 and listen for each gap in order (Q1 → Q9).",
    audio: EXPERT_M3_AUDIO.track03_05,
    audioLabel: "Track 03_05",
    answerKeyTitle: "Answer key (Teacher's Book · Exercise 3)",
    answerKeyLines: [
      "1 (large-scale) trials",
      "2 gene activity",
      "3 improve skin disorders",
      "4 slow down ageing / aging",
      "5–6 giving up smoking · eating more healthily (either order)",
      "7 stress",
      "8 10 / ten minutes",
      "9 medical intervention",
    ],
    perQuestionNotes: {
      1: "Plural noun, max 2 words — research evidence (trials).",
      2: "Noun phrase — meditation may change gene activity.",
      3: "Verb + noun, max 3 words — a physical benefit (skin disorders).",
      4: "Verb + noun, max 3 words — another physical benefit (ageing).",
      5: "Indirect benefit — either giving up smoking or eating more healthily.",
      6: "Pair with Q5 — both answers must appear, in either order.",
      7: "Noun after ‘meditation and …’ — a research topic (stress).",
      8: "Number + unit counts as one answer (10 / ten minutes).",
      9: "Noun — meditation complements but does not replace medical intervention.",
    } as Record<number, string>,
    b: {
      badge: "4b",
      instruction:
        "For each question you got wrong, tick what you need to improve:",
      checklist: [
        "I used the correct part of speech (noun / verb phrase / number).",
        "I stayed within the word limit (2 words for Q1–2, 7–9; 3 words for Q3–6).",
        "I wrote singular and plural forms correctly (e.g. Q1 needs a plural noun).",
      ],
      tips: [
        "Most gaps need nouns or noun phrases. Q3–4 ask for examples — often verb + noun.",
        "Count every word and number. Hyphenated words count as one word (large-scale).",
        "Q1 needs a plural noun (few ___). Q5–6 are a pair — either order, both required.",
      ],
    },
  },
  discussion: {
    badge: "5",
    heading: "Discussion",
    instruction:
      "Have you ever tried meditating? Why/Why not? To what extent do you believe that doing things like meditating can make mental or physical changes within a person?",
    suggestedTitle: "Suggested answer",
    suggestedAnswer: [
      "I've tried meditating a few times, though not as regularly as I'd like. I was curious because several friends said it helped them manage stress during exam periods.",
      "I do believe activities like meditation can make real changes, at least in terms of mental wellbeing. When you focus on your breathing, your heart rate often slows and you feel less anxious — that's a measurable physical effect.",
      "That said, I'm not convinced meditation alone can cure serious health problems. I see it more as a useful complement to exercise, sleep and medical advice when needed.",
    ],
  },
  languagePack: {
    badge: "6",
    heading: "Language from the lecture",
    instruction:
      "Open a topic. Learn the phrase and the full sentence from the audio script, then use it in Speaking Part 3 or Writing Task 2.",
    themes: [
      {
        id: "intro",
        tabLabel:
          "Introduction · Speaking Part 3 / Writing intro (health trends)",
        useHint:
          "Introduce meditation or alternative health — neutral tone, not only “relaxation”.",
        items: [
          {
            phrase: "a new age or alternative concept",
            sentence:
              "Now, when we think of meditation, some of us may just consider that it’s a new age or alternative concept, one which is focused on relaxing and centering yourself.",
          },
          {
            phrase: "in a completely new light",
            sentence:
              "But in today’s lecture, we’re going to explore meditation in a completely new light and focus on the wide range of health benefits meditation can provide.",
          },
        ],
      },
      {
        id: "evidence",
        tabLabel:
          "Evidence · Writing body / Speaking «Does meditation really work?»",
        useHint:
          "Balanced argument: limited large-scale proof, but positive signals from smaller studies.",
        items: [
          {
            phrase: "large-scale trials",
            sentence:
              "Although there haven’t been many large-scale trials focused on the effects of meditation in the scientific community, there have been many smaller studies which have shown some very positive results.",
          },
          {
            phrase: "not only psychological benefits, but physical ones too",
            sentence:
              "The effects noted include not only psychological benefits, but physical ones too.",
          },
          {
            phrase: "boost our gene activity",
            sentence:
              "There is even evidence to indicate that meditation can boost our gene activity.",
          },
        ],
      },
      {
        id: "physical",
        tabLabel:
          "Physical effects · Writing examples / Speaking «How can it help physically?»",
        useHint:
          "Give concrete examples (skin, ageing) and mention research design if useful.",
        items: [
          {
            phrase: "in combination with other techniques",
            sentence:
              "Firstly, research which was undertaken at the University of Sheffield strongly suggests that meditation in combination with other techniques, such as relaxation sessions, clearly has an effect and that it helps improve problems such as skin disorders.",
          },
          {
            phrase: "reduce the physical symptoms",
            sentence:
              "The researchers combined data from over 900 participants in 22 studies and found that psychological treatment, which included meditation, helped reduce the physical symptoms of these skin disorders.",
          },
          {
            phrase: "slow down the rate of ageing",
            sentence:
              "Also, it seems quite plausible that meditation can slow down the rate of ageing.",
          },
          {
            phrase: "a control group",
            sentence:
              "The study itself examined two groups, a control group and another one whose members attended a three-month meditation course.",
          },
        ],
      },
      {
        id: "caution",
        tabLabel:
          "Caution · Writing conclusion / Speaking «Can it replace doctors?»",
        useHint:
          "Do not overclaim — wait for more research before definitive statements.",
        items: [
          {
            phrase: "before anything conclusive can be claimed",
            sentence:
              "These health benefits need to be studied in larger numbers before anything conclusive can be claimed, such as that meditation can maintain our youth and heal our skin.",
          },
          {
            phrase: "knock-on effects",
            sentence:
              "However, there are also what I would call the knock-on effects of meditation. This is where meditation has more incidental effects on our health.",
          },
          {
            phrase: "giving up smoking",
            sentence:
              "Studies show that people who start meditating are often more predisposed to giving up smoking, if of course they smoke in the first place.",
          },
          {
            phrase: "eating more healthily",
            sentence:
              "In addition to this and possibly inspired by the practice, many frequent meditators also start to change their relationship with food and begin eating more healthily.",
          },
          {
            phrase: "improves our psychological health",
            sentence:
              "These kinds of changes in lifestyle undoubtedly come from the fact that meditation improves our psychological health and this is the area where there is the most research.",
          },
        ],
      },
      {
        id: "stress",
        tabLabel:
          "Stress & routine · Speaking «How much?» / Writing recommendation",
        useHint:
          "Practical recommendation with a time frame (e.g. ten minutes a day).",
        items: [
          {
            phrase: "deal with stressful situations",
            sentence:
              "There is actually quite clear evidence that an individual can see quite a marked change in their ability to deal with stressful situations with just ten minutes a day of meditation.",
          },
          {
            phrase: "less stressed",
            sentence:
              "Psychologically, meditation can cause a person to become more energetic, more alert, happier and less stressed.",
          },
        ],
      },
      {
        id: "balance",
        tabLabel:
          "Balanced finish · Writing conclusion / Speaking «Should we rely on it?»",
        useHint:
          "Strong Band 7+ conclusion: good, but not a complete cure.",
        items: [
          {
            phrase: "it is undeniable that meditation is good for us",
            sentence:
              "However, although it is undeniable that meditation is good for us, we shouldn’t believe that it is a comprehensive cure.",
          },
          {
            phrase: "in the place of medical intervention",
            sentence:
              "While meditation can be beneficial, it cannot and shouldn’t be used in the place of medical intervention when mental or physical problems are marked within an individual.",
          },
          {
            phrase: "a complement rather than an answer",
            sentence:
              "Perhaps meditation should be thought of as a complement rather than an answer.",
          },
        ],
      },
    ],
  },
};

export type ListeningM3aData = typeof listeningM3a;
