export const MS_U3_LISTEN_STEPS = [
  "Prepositions",
  "Room vocab",
  "Map labels",
  "Castle features",
  "Exam map",
  "Exam MCQ",
  "Review",
] as const;

export const MS_U3_LISTEN_NEXT = [
  "Rooms →",
  "Labels →",
  "Castle →",
  "Exam map →",
  "Exam MCQ →",
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
      instruction:
        "Map / plan practice. Match directions to places A–C, then label rooms A–D.",
      items: [
        {
          id: "1",
          stem: "From the main entrance, go past the library on your right, enter the Exhibition Room and turn right.",
          options: [
            { id: "A", text: "Place A" },
            { id: "B", text: "Place B" },
            { id: "C", text: "Place C" },
          ],
          key: "C",
        },
        {
          id: "2",
          stem: "Pass the Grand Hall on your left and go straight ahead. Go into the Exhibition Room and turn left. You have to walk through another small room to get to this place.",
          options: [
            { id: "A", text: "Place A" },
            { id: "B", text: "Place B" },
            { id: "C", text: "Place C" },
          ],
          key: "B",
        },
        {
          id: "3",
          stem: "As you enter the building, you will find the Grand Hall on your left. You will find this place in the corner of the Hall.",
          options: [
            { id: "A", text: "Place A" },
            { id: "B", text: "Place B" },
            { id: "C", text: "Place C" },
          ],
          key: "A",
        },
        {
          id: "5",
          stem: "Room A is",
          options: [
            { id: "A", text: "Lord Westchester's bedroom." },
            { id: "B", text: "the gift shop." },
            { id: "C", text: "the aviary." },
          ],
          key: "C",
        },
        {
          id: "6",
          stem: "Room B is",
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
          stem: "Room C is",
          options: [
            { id: "C", text: "sewing room" },
            { id: "D", text: "dining room" },
          ],
          key: "C",
        },
        {
          id: "8d",
          stem: "Room D is",
          options: [
            { id: "C", text: "sewing room" },
            { id: "D", text: "dining room" },
          ],
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
      kind: "match" as const,
      badge: "EXAM 15 · 1–6",
      instruction:
        "Questions 1–6. Label the map. Write the correct letter, A–I, next to questions 1–6.",
      bank: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
      items: [
        { id: "1", stem: "gift shop", key: "E" },
        { id: "2", stem: "beehives", key: "G" },
        { id: "3", stem: "holiday cottages", key: "A" },
        { id: "4", stem: "dairy", key: "C" },
        { id: "5", stem: "museum", key: "B" },
        { id: "6", stem: "estate office", key: "I" },
      ],
    },
    {
      kind: "mcq" as const,
      badge: "EXAM 15 · 7–10",
      instruction: "Questions 7–10. Choose the correct letter, A, B or C.",
      items: [
        {
          id: "7",
          stem: "How many unpaid helpers does the National Trust have?",
          options: [
            { id: "A", text: "about 62,000" },
            { id: "B", text: "about 5,899" },
            { id: "C", text: "about 4.24 million" },
          ],
          key: "A",
        },
        {
          id: "8",
          stem: "The main aim of the National Trust is",
          options: [
            { id: "A", text: "to make money from its properties." },
            { id: "B", text: "to preserve historical properties." },
            { id: "C", text: "to donate money to property owners in financial difficulties." },
          ],
          key: "B",
        },
        {
          id: "9",
          stem: "A couple can join the National Trust for a year for",
          options: [
            { id: "A", text: "£64." },
            { id: "B", text: "£108." },
            { id: "C", text: "£114." },
          ],
          key: "B",
        },
        {
          id: "10",
          stem: "Paying membership fees by direct debit also gets you",
          options: [
            { id: "A", text: "a pair of binoculars." },
            { id: "B", text: "a National Trust handbook." },
            { id: "C", text: "three copies of the National Trust magazine per year." },
          ],
          key: "A",
        },
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
