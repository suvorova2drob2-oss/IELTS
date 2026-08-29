export const MS_U3_WRITE_STEPS = [
  "Lead-in · verbs",
  "Map categories",
  "Discourse markers",
  "Past tenses",
  "Exam Task 1",
] as const;

export const MS_U3_WRITE_NEXT = [
  "Maps →",
  "Markers →",
  "Tenses →",
  "Exam →",
  "← Back to unit",
] as const;

export const writingU3 = {
  id: "ms-u3-writing-flow",
  bookPages: "pp. 59–64",
  sectionTitle: "Writing · Task 1 maps",
  unitGoals: [
    "summarise information in maps",
    "use coherence and cohesion markers",
    "use past tenses and perfect tenses for map changes",
  ],
  steps: [
    {
      kind: "intro" as const,
      badge: "LEAD-IN",
      instruction:
        "Build / Change / Remove vocabulary: put up, develop, erect, construct, enlarge, alter, modernise, replace, relocate, expand, renovate, convert, knock down, tear down, flatten, demolish…",
      tip: "Many verbs also have noun forms: construction, renovation, demolition, expansion, etc.",
    },
    {
      kind: "match" as const,
      badge: "5",
      instruction: "Match each map feature with its land-use category.",
      bank: ["recreational", "residential", "commercial", "industrial"],
      items: [
        { id: "1", stem: "children's play area", key: "recreational" },
        { id: "2", stem: "Bayley Mansions", key: "residential" },
        { id: "3", stem: "cafe", key: "commercial" },
        { id: "4", stem: "terraced houses", key: "residential" },
        { id: "5", stem: "railway line", key: "industrial" },
        { id: "6", stem: "laundry", key: "commercial" },
        { id: "7", stem: "Bayley Street Park", key: "recreational" },
        { id: "8", stem: "shops", key: "commercial" },
        { id: "9", stem: "wasteland", key: "industrial" },
      ],
    },
    {
      kind: "gaps" as const,
      badge: "7",
      instruction: "Choose the best discourse marker for each gap in the model map summary.",
      bank: [
        "Overall",
        "Whereas",
        "Furthermore",
        "Another major change to the area",
        "On the commercial side",
        "To sum up",
      ],
      items: [
        { id: "1", stem: "______, the maps show major changes between 1900 and 1935.", key: "Overall" },
        { id: "2", stem: "______ in 1900 a railway line ran through the neighbourhood…", key: "Whereas" },
        { id: "3", stem: "______, housing was replaced by flats.", key: "Furthermore" },
        { id: "4", stem: "______ was the creation of a park.", key: "Another major change to the area" },
        { id: "5", stem: "______, shops and the laundry were relocated and expanded.", key: "On the commercial side" },
        { id: "6", stem: "______, the area became more residential and recreational.", key: "To sum up" },
      ],
    },
    {
      kind: "mcq" as const,
      badge: "11 / 14",
      instruction: "Which features should NOT appear in a Task 1 map summary? Which tenses fit map comparisons?",
      items: [
        {
          id: "1",
          stem: "Which should you avoid in Task 1 maps?",
          options: [
            { id: "A", text: "Describing key factual changes" },
            { id: "B", text: "Speculation about reasons and giving personal opinions (features 4 and 6)" },
            { id: "C", text: "Grouping changes by category" },
          ],
          key: "B",
        },
        {
          id: "2",
          stem: "Main tenses for map changes?",
          options: [
            { id: "A", text: "Present continuous only" },
            { id: "B", text: "Past simple and past perfect (also used to)" },
            { id: "C", text: "Future perfect only" },
          ],
          key: "B",
        },
      ],
    },
    {
      kind: "exam" as const,
      instruction: "Write a Task 1 map summary (exam skills).",
      prompt:
        "The two maps show the outskirts of the town of Fosbury in 1980 and 2015. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
      minWords: 150,
      wcLabel: "Task 1 · exam minimum",
      sample:
        "The two maps show the outskirts of the town of Fosbury in 1980 and 2015. The 35-year period saw changes to the road layout, and to the residential, recreational and commercial facilities… In summary, the area of Fosbury shown on the maps modernised and developed between 1980 and 2015. (191 words)",
    },
  ],
};
