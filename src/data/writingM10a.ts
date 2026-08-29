export const WRITE_M10A_STEPS = [
  "1 Lead-in",
  "2a–2c Hypotheticals",
  "3a Coherent argument",
  "4a–4c Plan + write",
] as const;

export const WRITE_M10A_NEXT = [
  "2a–2c Hypotheticals →",
  "3a Coherent →",
  "4 Plan + write →",
  "← К модулю",
] as const;

export const writingM10a = {
  id: "writing-m10a-flow",
  bookPages: "p. 158 in your coursebook",
  sectionTitle: "Writing · Task 2 (hypotheticals & coherent argument)",
  expertWriting: "EXPERT WRITING page 200",
  quote1: {
    badge: "1",
    heading: "Lead-in",
    instruction:
      "Look at the visual representation of a phrase in English (wave goodbye). Work out what it means. What kinds of skill do you need to solve these kinds of problems? How can these skills be used in other areas of life?",
    tip: "wave goodbye. Lateral thinking skills — solve a problem by taking an indirect or creative approach. This can help with general problem-solving in life.",
  },
  arguments2: {
    badge: "2a",
    instruction:
      "Giving hypothetical alternatives can be done with past, present and future situations. Match sentence beginnings (1–5) with endings (A–E). Keys: 1 D future · 2 E present · 3 B future · 4 A present · 5 C past.",
    tips: [
      "1 If children were taught more creative skills at school, → D they may gain more skills needed to solve the problems our planet may face in the future.",
      "2 Without creative thinkers like Leonardo Da Vinci, → E there would be far less progress in science and the arts.",
      "3 It may well be possible to envisage a world without creativity, → B but it would be an uninspiring place with little to engage the mind.",
      "4 If we did not invest in creativity, → A buildings were solely in the hands of builders… (present alternative development).",
      "5 If humans had not used simple creative problem-solving skills, → C they would never have invented things like the wheel, boats or aeroplanes.",
    ],
    text2b: {
      badge: "b",
      instruction:
        "Read the paragraph and underline hypothetical situations mentioned.",
      tip: "Creativity is an ability that should be encouraged in schools… However, if this continues, it might not develop a child fully enough. Without having their creativity fostered, children may only grow up to deal with logical tasks… This could mean that the world would be a less innovative place.",
    },
    stages2c: {
      badge: "3a",
      instruction:
        "Complete the text with sentences A–D in order to make a logical, coherent argument. Keys: 1 B · 2 A · 3 D · 4 C.",
      stages: [
        {
          id: "A",
          label:
            "A As a result, working in a team can offer many advantages as team members can possess a range of different skills and talents.",
        },
        {
          id: "B",
          label:
            "B These skills include those such as creativity, perseverance and logic.",
        },
        {
          id: "C",
          label:
            "C If buildings were solely in the hands of builders, they might be structurally sound but they might lack the design and functionality that more creative people can bring to them.",
        },
        {
          id: "D",
          label:
            "D An example of this is the construction of a building.",
        },
      ],
      key: ["B", "A", "D", "C"],
    },
  },
  linking3: {
    badge: "3b–c",
    instruction:
      "Plan points for: Everybody is capable of some kind of creativity. Order them coherently. Review against: Why is this sentence / paragraph here?",
    items: [
      {
        id: 1,
        text: "Creativity is varied and can apply to many areas of life — everyone has capacity (personal skills, artistic flair).",
        verdict: "Correct",
        tip: "Good opening point.",
      },
      {
        id: 2,
        text: "Traditional view applies to some people; many are creative in non-traditional areas (work, sports, studying).",
        verdict: "Correct",
        tip: "Develops contrast.",
      },
      {
        id: 3,
        text: "We should widen our understanding so everyone feels included — help education discover talents.",
        verdict: "Correct",
        tip: "Conclusion / implication.",
      },
      {
        id: 4,
        text: "Only artists can ever be creative.",
        verdict: "Incorrect",
        tip: "Contradicts the statement — do not use as support.",
      },
    ],
  },
  write4: {
    badge: "4",
    heading: "Write your Task 2 essay",
    analyse4a: {
      badge: "4a",
      instruction:
        "Read the essay question and make a plan. Focus on answering the question, main points, support, hypothetical alternatives, paragraph order, and intro/conclusion.",
      tip: "Plan: Intro – agree for two reasons. Main idea 1 – creativity enables more solutions (feed off ideas; If our focus were never widened…). Main idea 2 – creativity allows lateral thinking (If we only thought logically…). Conclusion – creativity changes our approach to problem-solving.",
    },
    title:
      "Creativity is the key to problem-solving. To what extent do you agree with this statement? Give reasons to support your answer. Write at least 250 words.",
    plan4b: {
      badge: "b",
      instruction: "Write the main body paragraphs. Focus on making the argument coherent.",
      tip: "Use hypotheticals: If we are more receptive…; if they were included…",
    },
    write4c: {
      badge: "c",
      instruction:
        "Write your essay (20–30 minutes). Write at least 250 words. Then share paragraphs with a partner.",
    },
    modelLabel: "Model answer",
    modelAnswer: `Creativity is a concept which many people understand very differently. For some, it is connected to being artistic and as such, has few applications outside of the Arts, whereas for others, it has far wider implications for society and can be used in many areas, one of which is problem-solving. In my opinion, creativity plays a pivotal role when it comes to problem-solving and should be viewed as a key factor for several reasons.

Firstly, the likelihood of being able to solve problems is generally greater when people think more laterally. It can be argued that many traditional approaches to problem-solving only work for a specific time period and that these approaches need to be revised as society develops. Although a solution may have been successful in the past, there is no reason for us to assume that it will continue to be effective in the long-term. If we are more receptive to the idea of creativity playing a fundamental role in problem-solving, more viable solutions may appear.

Secondly, embracing the idea of creativity in problem-solving is an effective way of including more people in the process. Often, for example, it has been assumed that certain personality types, such as those who are considered to be more logical, are more suited to problem-solving. However, this attitude could preclude other creative people from the problem-solving process and it is these people who could potentially provide innovative solutions if they were included.

In conclusion, I would argue that creativity should play a central role in problem-solving if we are to fully explore a fuller range of potential solutions and include a mix of people who will tackle a problem using a variety of approaches.`,
  },
};
