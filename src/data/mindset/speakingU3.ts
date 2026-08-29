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
        "Yes / No / Not Sure quiz on Speaking strategies (AK). Tip: Part 2 notes should be key words only (e.g. Salvador Dalí — Catalunya, Surrealist, Persistence of Memory, proud).",
      items: [
        { id: "1", stem: "Item 1", options: [{ id: "Y", text: "Y" }, { id: "N", text: "N" }, { id: "NS", text: "NS" }], key: "NS" },
        { id: "2", stem: "Item 2", options: [{ id: "Y", text: "Y" }, { id: "N", text: "N" }, { id: "NS", text: "NS" }], key: "Y" },
        { id: "3", stem: "Item 3", options: [{ id: "Y", text: "Y" }, { id: "N", text: "N" }, { id: "NS", text: "NS" }], key: "Y" },
        { id: "4", stem: "Item 4", options: [{ id: "Y", text: "Y" }, { id: "N", text: "N" }, { id: "NS", text: "NS" }], key: "NS" },
        { id: "5", stem: "Item 5", options: [{ id: "Y", text: "Y" }, { id: "N", text: "N" }, { id: "NS", text: "NS" }], key: "Y" },
        { id: "6", stem: "Item 6", options: [{ id: "Y", text: "Y" }, { id: "N", text: "N" }, { id: "NS", text: "NS" }], key: "N" },
        { id: "7", stem: "Item 7", options: [{ id: "Y", text: "Y" }, { id: "N", text: "N" }, { id: "NS", text: "NS" }], key: "NS" },
        { id: "8", stem: "Item 8", options: [{ id: "Y", text: "Y" }, { id: "N", text: "N" }, { id: "NS", text: "NS" }], key: "Y" },
        { id: "9", stem: "Item 9", options: [{ id: "Y", text: "Y" }, { id: "N", text: "N" }, { id: "NS", text: "NS" }], key: "N" },
        { id: "10", stem: "Item 10", options: [{ id: "Y", text: "Y" }, { id: "N", text: "N" }, { id: "NS", text: "NS" }], key: "N" },
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
