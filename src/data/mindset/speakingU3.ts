export const MS_U3_SPEAK_STEPS = [
  "Y / N / NS quiz",
  "Signposting",
  "Exam practice",
] as const;

export const MS_U3_SPEAK_NEXT = [
  "Signposting →",
  "Exam →",
  "← Back to unit",
] as const;

export const speakingU3 = {
  id: "ms-u3-speaking-flow",
  bookPages: "pp. 69–72",
  sectionTitle: "Speaking · Part 2 creative person",
  unitGoals: [
    "prepare Part 2 notes efficiently",
    "use signposting language",
    "talk about art and creative people",
  ],
  steps: [
    {
      kind: "mcq" as const,
      badge: "1",
      instruction:
        "Read these reactions to works of art. Do you think the person liked the art he/she was reacting to? Write Yes, No or Not Sure next to each one.",
      items: [
        {
          id: "1",
          stem: "I'm not sure what to make of this one.",
          options: [
            { id: "Y", text: "Yes" },
            { id: "N", text: "No" },
            { id: "NS", text: "Not Sure" },
          ],
          key: "NS",
        },
        {
          id: "2",
          stem: "I can really relate to this.",
          options: [
            { id: "Y", text: "Yes" },
            { id: "N", text: "No" },
            { id: "NS", text: "Not Sure" },
          ],
          key: "Y",
        },
        {
          id: "3",
          stem: "This is very powerful.",
          options: [
            { id: "Y", text: "Yes" },
            { id: "N", text: "No" },
            { id: "NS", text: "Not Sure" },
          ],
          key: "Y",
        },
        {
          id: "4",
          stem: "I'm not sure what the artist is trying to convey.",
          options: [
            { id: "Y", text: "Yes" },
            { id: "N", text: "No" },
            { id: "NS", text: "Not Sure" },
          ],
          key: "NS",
        },
        {
          id: "5",
          stem: "I like the simplicity of this.",
          options: [
            { id: "Y", text: "Yes" },
            { id: "N", text: "No" },
            { id: "NS", text: "Not Sure" },
          ],
          key: "Y",
        },
        {
          id: "6",
          stem: "There's a bit too much going on.",
          options: [
            { id: "Y", text: "Yes" },
            { id: "N", text: "No" },
            { id: "NS", text: "Not Sure" },
          ],
          key: "N",
        },
        {
          id: "7",
          stem: "I don't quite get the point of it.",
          options: [
            { id: "Y", text: "Yes" },
            { id: "N", text: "No" },
            { id: "NS", text: "Not Sure" },
          ],
          key: "NS",
        },
        {
          id: "8",
          stem: "It evokes strong feelings of nostalgia/empathy/sadness.",
          options: [
            { id: "Y", text: "Yes" },
            { id: "N", text: "No" },
            { id: "NS", text: "Not Sure" },
          ],
          key: "Y",
        },
        {
          id: "9",
          stem: "I wouldn't hang it on my wall. To be honest, it leaves me cold.",
          options: [
            { id: "Y", text: "Yes" },
            { id: "N", text: "No" },
            { id: "NS", text: "Not Sure" },
          ],
          key: "N",
        },
        {
          id: "10",
          stem: "It's too abstract for my taste.",
          options: [
            { id: "Y", text: "Yes" },
            { id: "N", text: "No" },
            { id: "NS", text: "Not Sure" },
          ],
          key: "N",
        },
      ],
    },
    {
      kind: "gaps" as const,
      badge: "14",
      instruction: "Complete with Part 2 signposting phrases from the model answer.",
      bank: [
        "I'll start by",
        "so, moving on",
        "As well as",
        "Primarily",
        "yet",
        "Finally",
        "that's about it",
      ],
      items: [
        { id: "1", stem: "______ telling you who I've chosen…", key: "I'll start by" },
        { id: "2", stem: "OK, ______ to the kind of work he did…", key: "so, moving on" },
        { id: "3", stem: "______ painting, he later did sculpture…", key: "As well as" },
        { id: "4", stem: "______ because he was fascinated by Maths and Science…", key: "Primarily" },
        { id: "5", stem: "… unconventional ______ interesting…", key: "yet" },
        { id: "6", stem: "______, the colours are amazing…", key: "Finally" },
        { id: "7", stem: "So, ______.", key: "that's about it" },
      ],
    },
    {
      kind: "discuss" as const,
      heading: "Exam practice",
      prompts: [
        "Describe a creative person you admire. You should say: what you know about their life; what kind of creative work they do/did; why you like their work; and explain how their work makes you feel.",
        "Follow the four card points in order and use signposting. Mind maps help, but still cover every bullet.",
      ],
    },
  ],
};
