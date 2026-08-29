export const VOCAB_M4_STEPS = [
  "1a Match verbs",
  "1b Verb forms",
  "2a–2b Impersonal",
  "3 Word forms",
  "4 Improve text",
  "5a–5b Collocations",
] as const;

export const VOCAB_M4_NEXT = [
  "1b Verb forms →",
  "2a–2b Impersonal →",
  "3 Word forms →",
  "4 Improve text →",
  "5a–5b Collocations →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ");
}

export function checkVocabM4(input: string, answers: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return answers.some((a) => normalize(a) === n);
}

export type VocabM4Gap = { text: string } | { gap: number; key: string };

export function isVocabM4Gap(
  part: VocabM4Gap,
): part is { gap: number; key: string } {
  return "gap" in part;
}

export const vocabularyM4 = {
  id: "vocabulary-m4-flow",
  bookPages: "p. 58 in your coursebook",
  sectionTitle: "Vocabulary · Thoughts and beliefs",
  match1a: {
    badge: "1a",
    heading: "Academic verbs for thoughts and beliefs",
    instruction: "Match the verbs below with their meanings (1–8).",
    bank: [
      "acknowledge",
      "assume",
      "conceive",
      "consider",
      "contradict",
      "convince",
      "define",
      "speculate",
    ],
    items: [
      {
        id: 1,
        text: "To believe that something is true although you do not have definite proof.",
        key: "assume",
      },
      {
        id: 2,
        text: "To disagree with something, especially by saying that the opposite is true.",
        key: "contradict",
      },
      {
        id: 3,
        text: "To describe something correctly and thoroughly.",
        key: "define",
      },
      {
        id: 4,
        text: "To guess about the possible causes or effects of something.",
        key: "speculate",
      },
      {
        id: 5,
        text: "To think about something carefully.",
        key: "consider",
      },
      {
        id: 6,
        text: "To admit or accept something is true or that a situation exists.",
        key: "acknowledge",
      },
      {
        id: 7,
        text: "To make someone feel certain that something is true.",
        key: "convince",
      },
      {
        id: 8,
        text: "To imagine a particular situation.",
        key: "conceive",
      },
    ],
  },
  gap1b: {
    badge: "b",
    instruction:
      "Complete the text with the correct form of the verbs in Exercise 1a.",
    bank: [
      "acknowledge",
      "assume",
      "conceive",
      "consider",
      "contradicts",
      "convince",
      "defined",
      "speculate",
    ],
    parts: [
      { text: "Could you " },
      { gap: 1, key: "conceive" },
      {
        text: " of a life without a mobile phone? Although it seems unlikely, there is a chance that mobile phone production could stop. This is due to the scarcity of the rare earth metals used to construct and power all smart phones. Rare earth metals are ",
      },
      { gap: 2, key: "defined" },
      {
        text: " as 'lanthanides', which are 17 chemical elements in the periodic table. Most people ",
      },
      { gap: 3, key: "assume" },
      {
        text: " that the resources needed to make smart phones will go on forever; however the evidence ",
      },
      { gap: 4, key: "contradicts" },
      {
        text: " this. While companies try to ",
      },
      { gap: 5, key: "convince" },
      {
        text: " us that everything is fine, scientists ",
      },
      { gap: 6, key: "speculate" },
      {
        text: " that this could change. Although rare earth metals are not that rare, they are difficult to extract so scientists predict that they could become too expensive to use in small gadgets in the future. This is a fact which companies and consumers have to ",
      },
      { gap: 7, key: "acknowledge" },
      {
        text: " as being a real problem. In the future we will probably need to ",
      },
      { gap: 8, key: "consider" },
      {
        text: " alternatives to rare earth metals so our love of mobile phones can continue.",
      },
    ] satisfies VocabM4Gap[],
  },
  impersonal2a: {
    badge: "2a",
    heading: "Use an impersonal style in writing and speaking",
    instruction:
      "Read sentences 1 and 2. Which sentence uses an impersonal style and which uses a personal style?",
    items: [
      {
        id: 1,
        text: "It is thought that people buy many products that they do not use.",
        key: "impersonal",
      },
      {
        id: 2,
        text: "I think that people buy many products that they do not use.",
        key: "personal",
      },
    ],
  },
  rules2b: {
    badge: "b",
    instruction:
      "Read the example sentences and complete the grammatical rules with the correct words below.",
    bank: [
      "adjective",
      "adverb",
      "noun",
      "past participle",
      "present simple verb",
    ],
    examples: [
      "There is considerable evidence that fast fashion is contributing to rising consumption.",
      "It is widely acknowledged that our generation is more wasteful than previous ones.",
      "Some people strongly believe that governments need to make recycling compulsory.",
    ],
    items: [
      {
        id: 1,
        label: "There is ______ + ______ that + clause",
        answers: ["adjective", "noun"],
        display: "adjective + noun",
      },
      {
        id: 2,
        label: "It is ______ + ______ that + clause",
        answers: ["adverb", "past participle"],
        display: "adverb + past participle",
      },
      {
        id: 3,
        label: "Some people ______ + ______ that + clause",
        answers: ["adverb", "present simple verb"],
        display: "adverb + present simple verb",
      },
    ],
  },
  wordForms3: {
    badge: "3",
    instruction:
      "Complete the sentences with the correct form of the words in brackets.",
    items: [
      {
        id: 1,
        before: "There is a ",
        after: " that the economy is more important than the environment.",
        prompt: "(widespread / believe)",
        answers: ["widespread belief"],
      },
      {
        id: 2,
        before: "There is an ",
        after: " that being eco-friendly is the best type of lifestyle.",
        prompt: "(underlie / assume)",
        answers: ["underlying assumption"],
      },
      {
        id: 3,
        before: "Some experts have ",
        after: " that recycling isn't as effective as reducing waste.",
        prompt: "(formal / acknowledge)",
        answers: ["formally acknowledged"],
      },
      {
        id: 4,
        before: "There is a ",
        after:
          " that individuals cannot make a difference if they recycle.",
        prompt: "(common / misconceive)",
        answers: ["common misconception"],
      },
    ],
  },
  improve4: {
    badge: "4",
    instruction:
      "Improve the sections of the text in italics using the structures in Exercise 2b and the prompts 1–3.",
    text: "Lots of people think bottled water is the best kind of water to drink. Although definitely bottled water is a necessity in some countries, in other places safe tap water is by far the best option. It is not true that all kinds of tap water are of low quality; in some countries the tap water is safer than bottled water.",
    items: [
      {
        id: 1,
        prompt: "Lots of people think… → Many people / believe / general",
        answers: ["Many people generally believe that"],
      },
      {
        id: 2,
        prompt: "Although definitely… → It / true / undeniable",
        answers: ["it is undeniably true that", "It is undeniably true that"],
      },
      {
        id: 3,
        prompt: "It is not true that… → There / misconception / common",
        answers: ["There is a common misconception that"],
      },
    ],
  },
  collocations5a: {
    badge: "5a",
    heading: "Collocations for thoughts and beliefs",
    instruction: "Match 1–5 with A–E to form collocations.",
    left: [
      { id: 1, text: "to have" },
      { id: 2, text: "to be" },
      { id: 3, text: "to take" },
      { id: 4, text: "to pass" },
      { id: 5, text: "to resign" },
    ],
    right: [
      { id: "A", text: "something into consideration" },
      { id: "B", text: "oneself to something" },
      { id: "C", text: "a lot of faith in something" },
      { id: "D", text: "judgement on something" },
      { id: "E", text: "open to ideas" },
    ],
    keys: { 1: "C", 2: "E", 3: "A", 4: "D", 5: "B" } as Record<
      number,
      string
    >,
  },
  collocations5b: {
    badge: "b",
    instruction:
      "Complete the sentences with the correct form of the collocations in Exercise 5a.",
    bank: [
      "be open to",
      "have faith in",
      "pass judgement on",
      "resign themselves to",
      "take into consideration",
    ],
    items: [
      {
        id: 1,
        before: "People often ",
        after:
          " large fashion companies that pay their workers low salaries.",
        key: "pass judgement on",
      },
      {
        id: 2,
        before: "It can be difficult to ",
        after:
          " the government's commitment to improving recycling facilities.",
        key: "have faith in",
      },
      {
        id: 3,
        before: "Students have to ",
        after:
          " not being able to afford luxury products during their studies.",
        key: "resign themselves to",
      },
      {
        id: 4,
        before:
          "So as to make society less focused on shopping, we have to ",
        after: " ideas about new ways of living.",
        key: "be open to",
      },
      {
        id: 5,
        before: "When buying products, we should ",
        after: " the environmental cost of making them.",
        key: "take into consideration",
      },
    ],
  },
};
