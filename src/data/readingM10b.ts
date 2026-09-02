export const READ_M10B_STEPS = [
  "1 Before you read",
  "2 Endings + YNNG",
  "3 Task analysis",
  "4 Discussion",
] as const;

export const READ_M10B_NEXT = [
  "2 Exam →",
  "3 Analysis →",
  "4 Discussion →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ");
}

export function checkReadM10b(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export const readingM10b = {
  id: "reading-m10b-flow",
  bookPages: "pp. 162–163 in your coursebook",
  sectionTitle: "Reading · Matching sentence endings; Yes/No/Not given",
  title: "The nature of scientific progress",
  subtitle:
    'If “wrong” scientific ideas had not been so widely accepted, might “right” ideas have arrived sooner? Philip Ball argues it is just not that simple.',
  passage: [
    {
      id: "1",
      text: `If you believe in scientific progress, you will agree that the fate of all theories is to be replaced with updated and improved ones. Newton’s theory of gravitation was good; Einstein’s improved on it; some day we will find another one that is better still, and so on. But does this mean that the best theories are actually impeded by inferior ones? Some eminent scientists think so. The cosmologist Joe Silk argued that Copernicus’s Sun-centred universe was “held back” by Ptolemy’s Earth-centric version. According to the physicist Steven Weinberg, meanwhile, Ptolemy himself suffered from similar issues: the ancient astronomer allowed his scientific acuity to be clouded by the “bad theory” of astrology. Weinberg also argues that the 14th-century French polymath Nicole Oresme was on the threshold of discovering heliocentrism before he “finally surrendered” to the misconceived Ptolemaic orthodoxy — the good idea crowded out by a bad one.`,
    },
    {
      id: "2",
      text: `Historians of science tend to be much more relaxed about “wrong” ideas. Their task, after all, is not to adjudicate on science but to explain how ideas evolved. This requires them to understand theories in the context of their times: to examine how people thought as they did rather than to decide on the best one. At its worst, however, this position has at times led to the suggestion that there is no right and wrong in the history of science. In this extreme “relativist” view, modern science is no more valid than medieval philosophies, and today’s theories have gained acceptance solely because of social and political factors, not because they are objectively any better. Plenty of scientists and historians have rejected extreme relativism and accepted that science develops ever-more-reliable theories about the world, but believe the idea that better theories are inhibited by worse ones should be resisted; not so much because it makes for bad history but rather because it denies the realities of how science is done. After all, no-one adheres to a wrong theory in the face of a better one, knowing that it is unsound. We do so because we are human and stubborn, attached to our own ideas and also because we are prone to confirmation bias, seeing only what suits our preconceptions. Moreover, we also believe the old theory provides a better account of the situation as it is.`,
    },
    {
      id: "3",
      text: `What is more, theories are not only (or even) classed as good because they are eventually proved “right” but when they offer an adequate account of the reasons for the current situation, without too many arbitrary assumptions. They should be both consistent with and motivated by observations, and ideally they should also have a degree of predictive power. Ptolemy’s cosmology largely met those conditions for centuries, as did Newton’s theory of gravity. In contrast, Max Planck’s proposed quantum fell short, at least initially. Taken at face value, quanta undermined the Newtonian physics that was otherwise so successful, without (at that point) any compelling reason to do so. Whilst we love to deride people who dismissed an idea that proved to be right, sometimes they had good grounds for doing so. There was no widely accepted empirical evidence for quantization as a fundamental property until Einstein’s work on the specific heat of solids in 1907. A similar defence can even be made for those who allegedly refused to look through Galileo’s telescope to confirm his claims with their own eyes. After all, the telescope was a new invention of unproven reliability and without some practice it was far from simple to use or to interpret what one saw.`,
    },
    {
      id: "4",
      text: `So, how can we distinguish “good” theories from “bad” ones? When we are taught the scientific method at school, the answer is usually to do an experiment. Unfortunately, the notion that experiments can be trusted to deliver a clear verdict on the rights and wrongs of theories is simplistic. Defending conclusions against rival interpretations in peer review means that a clean, decisive experimental result quickly becomes a battle against potential confounding factors and alternative explanations. If you have ever experienced that yourself, you will have encountered something called the Quine-Duhem thesis, which says, in essence, that there is always more than one way to read the data. (More strictly, the thesis is that no scientific hypothesis can make predictions independently from other hypotheses.) The Quine-Duhem thesis deserves to be much more widely recognised among working scientists; the fantasy that experiments resolve everything looks increasingly threadbare. Indeed, some famous scientists have explicitly refused to accept experimentation as the ultimate authority. If observations of the 1919 solar eclipse had failed to support general relativity, Einstein averred that he would still have insisted his theory was correct. If a theory were discarded the instant an experimental result seemed to contradict it, progress would be nigh on impossible. Ultimately, science does appear to be capable of developing ever more dependable, more accurate, more predictive theories. But this in itself does not mean that we should imagine that bad theories or ideas prevent the progress of good ones. To do so is to put the cart before the horse, or to suppose that history has a goal. Instead, further detailed exploration into how science evolves is needed: as David Wootton argues in his book The Invention of Science, to understand how reliable knowledge and scientific progress can and do result from a “flawed, profoundly contingent, culturally relative and all-too-human process”.`,
    },
  ],
  beforeYouRead: {
    badge: "1",
    instruction: "Discuss the questions. Give full answers.",
    questions: [
      "Which scientific ideas or innovations do you think are the most extraordinary? Why?",
      "Which of the following advice is appropriate for matching sentence endings (A), Yes/No/Not given (B), or both (C)? 1 Highlight key words in the stem and find the place in the passage. 2 Underline paraphrases matching the options. 3 You are identifying the writer’s opinions/claims. 4 Questions follow passage order. 5 Predict how the stem might end.",
    ],
    tip: "Strategy keys: 1 C · 2 C · 3 B · 4 C · 5 A.",
  },
  exam: {
    badge: "2",
    strategies: "TEST STRATEGIES pages 171 and 172",
    instruction:
      "Questions 1–4 Complete each sentence with the correct ending, A–F. Questions 5–9 Yes / No / Not given.",
    gaps: [
      {
        id: 1,
        before:
          "1 The delay in scientific advances has been blamed by some scientists on → A equal respect for all ideas · B dangers of attacking a proposal on principle · C multiple interpretations · D acceptance of established faulty theories · E problems proving a thesis incorrect · F the period / society in which people live",
        after: "",
        answers: ["D"],
      },
      {
        id: 2,
        before:
          "2 Science historians view new hypotheses in relation to",
        after: "",
        answers: ["F"],
      },
      {
        id: 3,
        before:
          "3 It is believed by some science historians that all new ideas should be given",
        after: "",
        answers: ["A"],
      },
      {
        id: 4,
        before:
          "4 The Quine-Duhem thesis states that any scientific investigation is open to",
        after: "",
        answers: ["C"],
      },
      {
        id: 5,
        before:
          "5 People will consciously reject a new theory if it is contrary to their own prejudices and beliefs.",
        after: "",
        answers: ["No"],
      },
      {
        id: 6,
        before:
          "6 Ptolemy’s Earth-centric view of cosmology was an acceptable theory for hundreds of years.",
        after: "",
        answers: ["Yes"],
      },
      {
        id: 7,
        before:
          "7 The people responsible for testing Galileo’s theory were at fault for refusing to examine his evidence.",
        after: "",
        answers: ["No"],
      },
      {
        id: 8,
        before:
          "8 Experiments are becoming a less common way of verifying a scientific theory.",
        after: "",
        answers: ["Not given", "NG", "Not Given"],
      },
      {
        id: 9,
        before:
          "9 An awareness of good science will reveal itself over time.",
        after: "",
        answers: ["Yes"],
      },
    ],
  },
  analyse: {
    badge: "3",
    instruction:
      "Compare answers. How easy was skimming? Which strategies helped with unfamiliar words? How confident were you? Keys: 1 D · 2 F · 3 A · 4 C · 5 No · 6 Yes · 7 No · 8 Not given · 9 Yes.",
  },
  discussion: {
    badge: "4",
    instruction: "Discuss in groups.",
    questions: [
      "In which areas do you think we are most likely to see scientific progress over the next 50 years?",
    ],
    suggestedTitle: "Suggested answer",
    suggestedAnswer: [
      "I think we are most likely to see major progress in medicine and space exploration. Advances in genetics and personalised treatment could extend healthy lifespans, while improved telescopes and missions may reveal more about other planets.",
      "Astronomy and medical research both benefit from international cooperation and heavy investment, which makes breakthroughs more probable. Artificial intelligence may also accelerate discoveries by analysing vast datasets that humans alone could not process.",
    ],
  },
};
