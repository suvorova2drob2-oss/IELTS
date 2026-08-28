import bungeeImg from "../assets/listen-m2a-bungee.png";
import mapImg from "../assets/listen-m2a-map.png";
import campImg from "../assets/listen-m2a-camp.png";

export const LEARN_STEPS_L2A = [
  "Before you listen",
  "2 Map talk",
  "2.2 Walks",
  "4 Directions",
  "5 Match",
  "6a Camp map",
  "6b Label map",
] as const;

export const LEARN_STEP_NEXT_L2A: Record<number, string> = {
  0: "2 Map talk →",
  1: "2.2 Walks →",
  2: "4 Directions →",
  3: "5 Match →",
  4: "6a Camp map →",
  5: "6b Label map →",
  6: "← К модулю",
};

const AUDIO_02_02 =
  "https://storage.yandexcloud.net/cpeaudio/IELTS/unit%201/SRB_7_5_Tr02_02.mp3";

const AUDIO_02_03 =
  "https://storage.yandexcloud.net/cpeaudio/IELTS/unit%201/SRB_7_5_Tr02_03.mp3";

function normalizePlace(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/\s+/g, " ")
    .replace(/^the\s+/, "");
}

export function checkListenM2aPlace(
  input: string,
  accepted: string[],
): boolean {
  const n = normalizePlace(input);
  if (!n) return false;
  return accepted.some((a) => normalizePlace(a) === n);
}

export type WalkGap = {
  id: number;
  /** Pre-filled example — not editable */
  given?: string;
  answers: string[];
};

export type DirBit =
  | { text: string }
  | { gap: number; options: string[]; key: string };

export function isDirGap(
  part: DirBit,
): part is { gap: number; options: string[]; key: string } {
  return "gap" in part;
}

export const listeningM2a = {
  id: "listening-m2a-flow",
  module: 2,
  bookPages: "p. 28 in your coursebook",
  sectionTitle: "Listening · Section 1",
  beforeYouListen: {
    heading: "Before you listen",
    badge: "1",
    instruction: "Look at the photo and discuss the questions in groups.",
    image: bungeeImg,
    imageAlt:
      "A person in a red jacket and blue helmet bungee jumping from a cliff platform over a green valley.",
    questions: [
      "Would you like to try this activity? Why/Why not?",
      "What similar activities have you done?",
      "Why do you think people choose to do this activity?",
    ],
  },
  mapTalk: {
    badge: "2",
    instruction:
      "Look at the map. What places are shown on the map? With a partner, use the words below to talk about the locations.",
    bank: [
      "along",
      "across",
      "adjacent to",
      "at the end",
      "beside",
      "by",
      "in the middle of",
      "opposite",
      "past",
      "to the left of",
      "on the edge of",
    ],
    example: "A: The tables are to the left of the bridge.",
    map: mapImg,
    mapAlt:
      "Countryside map: lake with boat, tents, cows, bridge, picnic tables, mountains, forest and house beside a river.",
    places:
      "lake · boat · tents · cows · bridge · picnic tables · mountains · tree · forest · house · river",
    suggestedAnswer:
      "The boat is in the centre of the lake. The small forest is on the left of the house. The picnic tables are adjacent to the bridge. The tents are along the side of the river.",
  },
  walks: {
    badge: "2.2",
    instruction:
      "Listen to two people describing their walks. Where do they go? Write the names of places they walk to.",
    audio: AUDIO_02_02,
    audioLabel: "SRB Track 02_02",
    columns: [
      {
        name: "Robert",
        gaps: [
          { id: 1, given: "forest", answers: ["forest"] },
          { id: 2, answers: ["cabin"] },
          { id: 3, answers: ["river"] },
          { id: 4, answers: ["campsite", "camp site"] },
          { id: 5, answers: ["picnic area", "picnic tables"] },
          { id: 6, answers: ["bridge"] },
          { id: 7, answers: ["lake"] },
          { id: 8, answers: ["field"] },
        ] satisfies WalkGap[],
      },
      {
        name: "Filipo",
        gaps: [
          { id: 1, given: "campsite", answers: ["campsite", "camp site"] },
          { id: 2, answers: ["picnic benches", "picnic tables", "benches"] },
          { id: 3, answers: ["bridge"] },
          { id: 4, answers: ["river"] },
          { id: 5, answers: ["mountain", "mountains"] },
          { id: 6, answers: ["lake"] },
        ] satisfies WalkGap[],
      },
    ],
  },
  directions: {
    badge: "4",
    instruction:
      "Choose the correct option in italics to complete the text. Use the map in Exercise 2 to help you.",
    parts: [
      {
        text: "So, you want to go to the cabin, do you? It’s quite far from the lake here. Cross ",
      },
      { gap: 1, options: ["over", "around"], key: "over" },
      { text: " the field with the cows in it. You’ll see a bridge " },
      { gap: 2, options: ["opposite", "adjacent"], key: "opposite" },
      { text: " you. Go " },
      { gap: 3, options: ["past", "along"], key: "past" },
      { text: " the picnic area and " },
      { gap: 4, options: ["through", "over"], key: "over" },
      { text: " the bridge. The cabin is to your right. It’s " },
      {
        gap: 5,
        options: ["on the edge", "just north"],
        key: "on the edge",
      },
      { text: " of the forest." },
    ] satisfies DirBit[],
  },
  match: {
    badge: "5",
    instruction: "Match the phrases 1–6 with their meanings A–F.",
    phrases: [
      { id: 1, text: "back on yourself", key: "E" },
      { id: 2, text: "not too far", key: "C" },
      { id: 3, text: "directly ahead", key: "A" },
      { id: 4, text: "a bit further on", key: "F" },
      { id: 5, text: "don’t go all the way", key: "D" },
      { id: 6, text: "follow it around", key: "B" },
    ],
    meanings: [
      { id: "A", text: "straight in front" },
      { id: "B", text: "keep going along" },
      { id: "C", text: "quite near" },
      { id: "D", text: "halfway down" },
      { id: "E", text: "back the way you came" },
      { id: "F", text: "just beyond" },
    ],
  },
  campPreview: {
    badge: "6a",
    instruction: "Look at the map. Describe the locations (A–E).",
    map: campImg,
    mapAlt:
      "Camp Horizon Map with Archery range, Horizon Beach, swimming pool, campsite, reception block and lettered spots A–E.",
    title: "Camp Horizon Map",
  },
  campLabel: {
    badge: "6b",
    instruction: "Listen and complete the test task.",
    audio: AUDIO_02_03,
    audioLabel: "SRB Track 02_03",
    taskHeader: "Questions 1–4",
    taskInstr:
      "Label the map below. Write the correct letter, A–E, next to questions 1–4.",
    letters: ["A", "B", "C", "D", "E"] as const,
    items: [
      { id: 1, text: "Play area", key: "C" },
      { id: 2, text: "Barbecue area", key: "E" },
      { id: 3, text: "Craft cabin", key: "D" },
      { id: 4, text: "Bike park", key: "B" },
    ],
  },
};

export function listenM2aWalkBlanks(): {
  who: string;
  id: number;
  answers: string[];
  key: string;
}[] {
  const out: {
    who: string;
    id: number;
    answers: string[];
    key: string;
  }[] = [];
  for (const col of listeningM2a.walks.columns) {
    for (const g of col.gaps) {
      if (g.given) continue;
      out.push({
        who: col.name,
        id: g.id,
        answers: g.answers,
        key: g.answers[0],
      });
    }
  }
  return out;
}

export type ListeningM2aData = typeof listeningM2a;
