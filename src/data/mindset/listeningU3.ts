export const MS_U3_LISTEN_STEPS = [
  "Prepositions",
  "Room vocab",
  "Map labels",
  "Castle features",
  "Exam keys",
  "Review",
] as const;

export const MS_U3_LISTEN_NEXT = [
  "Rooms →",
  "Labels →",
  "Castle →",
  "Exam →",
  "Review →",
  "← Back to unit",
] as const;

export const listeningU3 = {
  id: "ms-u3-listening-flow",
  bookPages: "pp. 65–68",
  sectionTitle: "Listening · Maps & plans (keys only)",
  unitGoals: [
    "follow directions and label maps/plans",
    "use place prepositions accurately",
    "predict castle / building vocabulary",
  ],
  steps: [
    {
      kind: "intro" as const,
      badge: "1",
      instruction:
        "Place prepositions: into/through/across; on; in; of; between; from/via; to; opposite/across from/close to; at; behind; up. You cannot use above and below in the same way for these map tasks.",
      tip: "Keys only — no audio in this trainer.",
    },
    {
      kind: "match" as const,
      badge: "2",
      instruction: "Match each room/area with its definition.",
      bank: [
        "entrance room similar to reception",
        "room where guests are entertained",
        "room for coats/hats; sometimes a toilet",
        "storeroom for food and crockery",
        "underground storage area",
        "room under the roof for storage",
        "room for dances and special events",
        "small rooms where servants lived",
        "sunny indoor greenhouse-like room",
      ],
      items: [
        { id: "2", stem: "the lobby", key: "entrance room similar to reception" },
        { id: "3", stem: "the drawing room", key: "room where guests are entertained" },
        { id: "4", stem: "the cloakroom", key: "room for coats/hats; sometimes a toilet" },
        { id: "5", stem: "the pantry", key: "storeroom for food and crockery" },
        { id: "6", stem: "the cellar", key: "underground storage area" },
        { id: "7", stem: "the attic", key: "room under the roof for storage" },
        { id: "8", stem: "the ballroom", key: "room for dances and special events" },
        { id: "9", stem: "the servants' quarters", key: "small rooms where servants lived" },
        { id: "10", stem: "the conservatory", key: "sunny indoor greenhouse-like room" },
      ],
    },
    {
      kind: "mcq" as const,
      badge: "3–8",
      instruction: "Map / plan practice keys.",
      items: [
        { id: "1", stem: "Q1 correct option", options: [{ id: "A", text: "A" }, { id: "B", text: "B" }, { id: "C", text: "C" }], key: "C" },
        { id: "2", stem: "Q2", options: [{ id: "A", text: "A" }, { id: "B", text: "B" }, { id: "C", text: "C" }], key: "B" },
        { id: "3", stem: "Q3", options: [{ id: "A", text: "A" }, { id: "B", text: "B" }, { id: "C", text: "C" }], key: "A" },
        {
          id: "5",
          stem: "Label B on the plan",
          options: [
            { id: "A", text: "Anteroom" },
            { id: "B", text: "Portrait gallery" },
            { id: "C", text: "Spiral staircase" },
          ],
          key: "B",
          tip: "Anteroom is wrong — you cross it to enter the next turret; room B is in the turret.",
        },
        {
          id: "8c",
          stem: "Label C",
          options: [{ id: "C", text: "sewing room" }, { id: "D", text: "dining room" }],
          key: "C",
        },
        {
          id: "8d",
          stem: "Label D",
          options: [{ id: "C", text: "sewing room" }, { id: "D", text: "dining room" }],
          key: "D",
        },
      ],
    },
    {
      kind: "gaps" as const,
      badge: "11–13",
      instruction: "Castle features and related answers.",
      bank: ["drawbridge", "turrets", "moat", "storerooms", "tunnels", "dungeons"],
      items: [
        { id: "1", stem: "Secure entry gate would have had a ______", key: "drawbridge" },
        { id: "2", stem: "Round towers at the corners: ______", key: "turrets" },
        { id: "3", stem: "Vital defence around the building (now a dry ditch): ______", key: "moat" },
        { id: "4", stem: "Underground features mentioned: ______, tunnels, dungeons", key: "storerooms" },
      ],
      tip: "Q10 B — living quarters not until 12th century. Q12 C — drawbridge gone; moat now dry. Q14 A.",
    },
    {
      kind: "mcq" as const,
      badge: "EXAM 15",
      instruction: "Exam matching keys 1–10 (AK).",
      items: [
        { id: "1", stem: "Q1 →", options: [{ id: "E", text: "E" }, { id: "G", text: "G" }, { id: "A", text: "A" }, { id: "C", text: "C" }, { id: "B", text: "B" }, { id: "I", text: "I" }], key: "E" },
        { id: "2", stem: "Q2 →", options: [{ id: "E", text: "E" }, { id: "G", text: "G" }, { id: "A", text: "A" }, { id: "C", text: "C" }, { id: "B", text: "B" }, { id: "I", text: "I" }], key: "G" },
        { id: "3", stem: "Q3 →", options: [{ id: "E", text: "E" }, { id: "G", text: "G" }, { id: "A", text: "A" }, { id: "C", text: "C" }, { id: "B", text: "B" }, { id: "I", text: "I" }], key: "A" },
        { id: "4", stem: "Q4 →", options: [{ id: "E", text: "E" }, { id: "G", text: "G" }, { id: "A", text: "A" }, { id: "C", text: "C" }, { id: "B", text: "B" }, { id: "I", text: "I" }], key: "C" },
        { id: "5", stem: "Q5 →", options: [{ id: "E", text: "E" }, { id: "G", text: "G" }, { id: "A", text: "A" }, { id: "C", text: "C" }, { id: "B", text: "B" }, { id: "I", text: "I" }], key: "B" },
        { id: "6", stem: "Q6 →", options: [{ id: "E", text: "E" }, { id: "G", text: "G" }, { id: "A", text: "A" }, { id: "C", text: "C" }, { id: "B", text: "B" }, { id: "I", text: "I" }], key: "I" },
        { id: "7", stem: "Q7 →", options: [{ id: "E", text: "E" }, { id: "G", text: "G" }, { id: "A", text: "A" }, { id: "C", text: "C" }, { id: "B", text: "B" }, { id: "I", text: "I" }], key: "A" },
        { id: "8", stem: "Q8 →", options: [{ id: "E", text: "E" }, { id: "G", text: "G" }, { id: "A", text: "A" }, { id: "C", text: "C" }, { id: "B", text: "B" }, { id: "I", text: "I" }], key: "B" },
        { id: "9", stem: "Q9 →", options: [{ id: "E", text: "E" }, { id: "G", text: "G" }, { id: "A", text: "A" }, { id: "C", text: "C" }, { id: "B", text: "B" }, { id: "I", text: "I" }], key: "B" },
        { id: "10", stem: "Q10 →", options: [{ id: "E", text: "E" }, { id: "G", text: "G" }, { id: "A", text: "A" }, { id: "C", text: "C" }, { id: "B", text: "B" }, { id: "I", text: "I" }], key: "A" },
      ],
    },
    {
      kind: "discuss" as const,
      heading: "Review",
      prompts: [
        "Practise giving directions: Go in the main entrance and turn right. It is right in front of you, next to the library.",
        "Before listening, study the map legend and predict what you will hear.",
      ],
    },
  ],
};
