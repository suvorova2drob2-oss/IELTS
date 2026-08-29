export const WRITE_M10B_STEPS = [
  "1 Lead-in",
  "2a–2c For / against",
  "3a–3b Plan",
  "4–5 Language",
  "6 Plan + write",
  "7 Peer review",
] as const;

export const WRITE_M10B_NEXT = [
  "2a–2c Opinions →",
  "3 Plan →",
  "4–5 Language →",
  "6 Write →",
  "7 Peer →",
  "← К модулю",
] as const;

export const writingM10b = {
  id: "writing-m10b-flow",
  bookPages: "pp. 164–165 in your coursebook",
  sectionTitle: "Writing · Task 2 (opinion — innovation)",
  expertWriting: "EXPERT WRITING page 200",
  cartoon1: {
    badge: "1",
    heading: "Lead-in",
    instruction:
      "Look at the inventions in the photos (airplane, washing machine, tank). What are the positive or negative effects of these inventions?",
    tip: "Airplane: travel vs pollution. Washing machine: less arduous laundry / cleaning different fabrics. Tank: fight more effectively / protect those who man the weapons.",
  },
  forAgainst2a: {
    badge: "2a–2c",
    instruction:
      "Read opinions about: Scientific innovation is always a positive thing and should be encouraged. Mark for / against / both. Keys: 1 for · 2 for · 3 both · 4 against · 5 both. Hypotheticals match: A5 · B1 · C3 · D2 · E4.",
    title:
      "Scientific innovation is always a positive thing and should be encouraged. To what extent do you agree with this statement? Give reasons for your answer and include any relevant examples from your knowledge or experience. Write at least 250 words.",
    items: [
      {
        id: 1,
        text: "Despite the negative effects of some innovation, we should encourage it in all its forms as the benefits outweigh the drawbacks.",
        key: "for",
      },
      {
        id: 2,
        text: "Innovation is absolutely essential to the development of humanity.",
        key: "for",
      },
      {
        id: 3,
        text: "Innovation is a part of development but we must remember the importance of restricting and regulating how innovation is undertaken.",
        key: "both",
      },
      {
        id: 4,
        text: "Some innovations have had detrimental effects on the natural world.",
        key: "against",
      },
      {
        id: 5,
        text: "Innovation is unstoppable and we must live with the consequences.",
        key: "both",
      },
      {
        id: 6,
        text: "Hypothetical E: If factory farming had not been developed, many animals would have had much happier lives. → supports against point 4.",
        key: "against",
      },
      {
        id: 7,
        text: "Hypothetical B: Imagining a world without electricity or medicine is arguably worse than imagining a world without more negative innovations. → supports for point 1.",
        key: "for",
      },
    ],
  },
  structure3: {
    badge: "3a–3b",
    instruction:
      "Discuss coherence/cohesion: Why plan? How organise paragraphs? Where state your answer? What goes in body paragraphs? How sequence and link ideas?",
    descriptors: [
      {
        id: 1,
        q: "Why plan before writing?",
        key: "A",
        tip: "So you know how to order ideas logically and coherently before you start.",
      },
      {
        id: 2,
        q: "How organise a paragraph?",
        key: "B",
        tip: "Topic sentence → details → support (examples, counter-arguments, reasons, results).",
      },
      {
        id: 3,
        q: "Where state your answer?",
        key: "A",
        tip: "Introduction and repeated in the conclusion.",
      },
      {
        id: 4,
        q: "What in main body?",
        key: "B",
        tip: "Main ideas and support for them.",
      },
      {
        id: 5,
        q: "How link ideas?",
        key: "A",
        tip: "Linking words and pronoun referencing (this, it, they).",
      },
    ],
    betterStructure: "2",
    structureTip:
      "Suggested plan: Intro – agree somewhat but not completely. Idea 1 – innovation can be negative (war) — regulate weapons. Idea 2 – medicine side effects — thorough trialling. Conclusion – encourage innovation but be careful where results can be misused.",
  },
  conclusions4: {
    badge: "5a–5b",
    instruction:
      "Complete sentences with culture / lack of activity / process / products / material / form of transport. Extend with however / in addition / although / in turn / as a result / consequently.",
    important:
      "Keys: 1 culture · 2 lack of activity · 3 process · 4 products · 5 material · 6 form of transport.",
    options: [
      {
        id: "A",
        text: "Weak extension — no discourse marker linking positive/negative effects.",
      },
      {
        id: "B",
        text: "Strong extension — e.g. However, money is a far more efficient system… / As a result, plastic often gets left in landfills.",
      },
    ],
    best: "B",
    tip: "Suggested extensions: 1 However… 2 In addition… 3 …although many people still think it is unsafe. 4 This, in turn… 5 As a result… 6 Consequently…",
  },
  write5: {
    badge: "6",
    plan: {
      badge: "6a",
      instruction: "Make a clear plan using your notes from Exercise 2a / 3b.",
      tip: "Encourage innovation overall, but regulate weapons and medical trials carefully.",
    },
    write: {
      badge: "b",
      instruction:
        "Write your answer under test conditions (~40 minutes). Write at least 250 words. Check spelling and grammar.",
    },
    modelLabel: "Model answer",
    modelAnswer: `In the modern world innovation is clearly active in many areas of life. It plays a central role in business development, technology and scientific advancement and can be considered to be responsible for a whole host of improvements in societies all around the globe. As such, I believe that innovation is essential to our lives and that people should be actively encouraged to engage with it wherever possible.

First of all, humanity owes so much to the innovative ideas of previous generations, many of which perhaps are completely taken for granted. Scientists, explorers and business leaders have often placed themselves at the forefront of innovation and taken risks to make progress in areas such as medicine and space exploration. Without their dedication, a significant number of people would not enjoy many of the comforts of modern life. Innovation has been especially important in recent times, providing solutions to problems in the developing world.

On the other hand, it could be argued that some innovation is less practical and therefore not the wisest way to spend scarce financial resources. Vast sums of money are sometimes provided in the form of investment in research projects that do not always fulfil the more pressing and worthy requirements of society. It could be argued that at times the term innovation is used for ideas which are only likely to benefit a small minority of people. In these instances, a possible way forward might well be to fund such projects with private, rather than public, money so as to ensure that the public money is allocated to the most useful projects for society as a whole.

In conclusion, innovation has had a positive effect on the development of the world across a broad spectrum of fields. Although some innovation may appear less relevant to society’s needs, overall, it should be encouraged in all its forms.`,
  },
  peer6: {
    badge: "7a–7b",
    instruction:
      "Review each other’s essays: argument quality, logical ordering, clarity of points, paragraphing. Then improve using the feedback.",
  },
};
