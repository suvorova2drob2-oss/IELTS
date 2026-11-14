export const READ_M10B_STEPS = [
  "Before you read",
  "Endings",
  "Yes / No / Not given",
  "Task analysis",
  "Discussion",
  "Cool phrases",
] as const;

export const READ_M10B_NEXT = [
  "Endings →",
  "YNNG →",
  "Analysis →",
  "Discussion →",
  "Cool phrases →",
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
    strategies: "TEST STRATEGIES pages 171 and 172",
    endingsBadge: "2",
    endingsInstruction:
      "Complete each sentence with the correct ending, A–F, below. Write the correct letter A–F.",
    ynngBadge: "3",
    ynngInstruction:
      "Do the following statements agree with the views of the writer in the text? Write Yes, No or Not given.",
    endingsTitle: "Questions 1–4",
    endings: [
      { id: "A", text: "equal respect for all ideas" },
      {
        id: "B",
        text: "dangers of attacking a proposal on principle",
      },
      { id: "C", text: "multiple interpretations" },
      {
        id: "D",
        text: "acceptance of established faulty theories",
      },
      {
        id: "E",
        text: "problems proving a thesis incorrect",
      },
      {
        id: "F",
        text: "the period / society in which people live",
      },
    ],
    endingStems: [
      {
        id: 1,
        text: "The delay in scientific advances has been blamed by some scientists on",
        key: "D",
      },
      {
        id: 2,
        text: "Science historians view new hypotheses in relation to",
        key: "F",
      },
      {
        id: 3,
        text: "It is believed by some science historians that all new ideas should be given",
        key: "A",
      },
      {
        id: 4,
        text: "The Quine-Duhem thesis states that any scientific investigation is open to",
        key: "C",
      },
    ],
    ynngTitle: "Questions 5–9",
    ynng: [
      {
        id: 5,
        text: "People will consciously reject a new theory if it is contrary to their own prejudices and beliefs.",
        key: "No",
      },
      {
        id: 6,
        text: "Ptolemy’s Earth-centric view of cosmology was an acceptable theory for hundreds of years.",
        key: "Yes",
      },
      {
        id: 7,
        text: "The people responsible for testing Galileo’s theory were at fault for refusing to examine his evidence.",
        key: "No",
      },
      {
        id: 8,
        text: "Experiments are becoming a less common way of verifying a scientific theory.",
        key: "Not given",
      },
      {
        id: 9,
        text: "An awareness of good science will reveal itself over time.",
        key: "Yes",
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
  phraseFlips: {
    badge: "CP",
    instruction:
      "Cool phrases from the reading on scientific progress. Click a card for the Russian gloss, examples and passage links.",
    sections: [
      {
        id: "bias",
        title: "Judgment, bias & limits",
        cards: [
          {
            en: "take something at face value",
            ru: "принимать за чистую монету (верить буквально, не проверяя суть)",
            example:
              "You can't take everything you read on the internet at face value.",
            exampleRu:
              "Нельзя принимать за чистую монету всё, что читаешь в интернете.",
          },
          {
            en: "put the cart before the horse",
            ru: "ставить телегу впереди лошади (делать в неправильном порядке, путать причину и следствие)",
            example:
              "Buying expensive equipment before learning the basics is putting the cart before the horse.",
            exampleRu:
              "Покупать дорогое оборудование до изучения основ — это ставить телегу впереди лошади.",
          },
          {
            en: "have good grounds for doing something",
            ru: "иметь веские основания / причины для чего-либо",
            example: "They had good grounds for rejecting his proposal.",
            exampleRu: "У них были веские основания отклонить его предложение.",
          },
          {
            en: "in the face of…",
            ru: "перед лицом чего-либо, вопреки чему-либо",
            example:
              "He refused to admit his mistake even in the face of clear evidence.",
            exampleRu:
              "Он отказался признать ошибку даже перед лицом неопровержимых доказательств.",
          },
          {
            en: "be prone to confirmation bias",
            ru: "быть склонным к предвзятости подтверждения (замечать только удобные факты)",
            example:
              "When people argue about politics, they are often prone to confirmation bias.",
            exampleRu:
              "Когда люди спорят о политике, они часто склонны замечать только удобные им факты.",
          },
          {
            en: "fall short",
            ru: "не дотягивать, не оправдывать ожиданий, оказаться недостаточным",
            example:
              "The new movie was good, but it fell short of my expectations.",
            exampleRu:
              "Новый фильм был неплох, но он не дотянул до моих ожиданий.",
          },
          {
            en: "look increasingly threadbare",
            ru: "выглядеть всё более избитым, неубедительным («шитым белыми нитками»)",
            example:
              "His excuses for being late are looking increasingly threadbare.",
            exampleRu:
              "Его оправдания за опоздания выглядят всё более неубедительно.",
          },
          {
            en: "crowd out",
            ru: "вытеснять (занимать всё место, не оставляя шансов другому)",
            example:
              "Big chain stores often crowd out small local businesses.",
            exampleRu:
              "Крупные сетевые магазины часто вытесняют мелкий местный бизнес.",
          },
          {
            en: "allow one's judgment (or acuity) to be clouded by…",
            ru: "позволить чему-либо затуманить рассудок / проницательность",
            example: "Don't allow your judgment to be clouded by emotions.",
            exampleRu: "Не позволяй эмоциям затуманить твой рассудок.",
          },
          {
            en: "be far from simple",
            ru: "быть далеко не простым (это совсем не так просто, как кажется)",
            example: "Organizing a wedding is far from simple.",
            exampleRu:
              "Организовать свадьбу — задача далеко не из простых.",
          },
          {
            en: "nigh on impossible",
            ru: "почти невозможно (выразительный, чуть книжный синоним almost impossible)",
            example: "Without a map, finding that place is nigh on impossible.",
            exampleRu: "Без карты найти это место почти невозможно.",
          },
          {
            en: "see only what suits one's preconceptions",
            ru: "видеть только то, что укладывается в рамки собственных предубеждений",
            example:
              "It's hard to argue with him because he sees only what suits his preconceptions.",
            exampleRu:
              "С ним трудно спорить, потому что он видит только то, что подтверждает его предубеждения.",
          },
        ],
      },
      {
        id: "science",
        title: "Theory, authority & change",
        cards: [
          {
            en: "hold back",
            ru: "сдерживать, тормозить развитие",
            inPassage:
              "Copernicus's Sun-centred universe was held back…",
            example:
              "Fear of failure can really hold you back in your career.",
            exampleRu:
              "Страх неудачи может сильно тормозить тебя в карьере.",
          },
          {
            en: "adhere to something",
            ru: "придерживаться чего-либо, строго следовать (правилам, идеям)",
            inPassage: "…no-one adheres to a wrong theory…",
            example:
              "It's tough to adhere to a strict schedule when you travel a lot.",
            exampleRu:
              "Трудно придерживаться строгого графика, когда много путешествуешь.",
          },
          {
            en: "at its worst",
            ru: "в худшем проявлении",
            tip: "Pairs with at least initially — for graded or time-limited judgments.",
            example:
              "At its worst, social media can fuel anxiety and misinformation.",
            exampleRu:
              "В худшем проявлении соцсети могут усиливать тревогу и дезинформацию.",
          },
          {
            en: "at least initially",
            ru: "по крайней мере поначалу",
            example:
              "At least initially, the new policy seemed to improve results.",
            exampleRu:
              "По крайней мере поначалу новая политика казалась улучшающей результаты.",
          },
          {
            en: "any compelling reason",
            ru: "хоть какая-то веская / убедительная причина",
            inPassage: "…without any compelling reason to do so.",
            example:
              "Give me one compelling reason why I should change my mind.",
            exampleRu:
              "Назови мне хоть одну вескую причину, почему я должен передумать.",
          },
          {
            en: "a similar defence can be made for…",
            ru: "схожим образом можно оправдать / защитить…",
            example:
              "A similar defence can be made for people who prefer working alone.",
            exampleRu:
              "Схожим образом можно оправдать людей, которые предпочитают работать в одиночку.",
          },
          {
            en: "gain acceptance",
            ru: "получить признание, прижиться (об идее или тренде)",
            inPassage: "…today's theories have gained acceptance…",
            example:
              "Remote work has finally gained acceptance in traditional companies.",
            exampleRu:
              "Удалённая работа наконец-то получила признание в традиционных компаниях.",
          },
          {
            en: "the ultimate authority",
            ru: "истина в последней инстанции, высший авторитет",
            inPassage:
              "…refused to accept experimentation as the ultimate authority.",
            example:
              "Just because he's the boss doesn't mean he's the ultimate authority on everything.",
            exampleRu:
              "То, что он босс, ещё не значит, что он истина в последней инстанции во всех вопросах.",
          },
        ],
      },
    ],
  },
};
