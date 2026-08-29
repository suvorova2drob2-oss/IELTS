import urbanImg from "../assets/lead-in-m7-urban.png";
import type { LeadInData } from "./leadInIntelligence";

/** Module 7 · On the move · Lead-in · p. 103 */
export const leadInUrban: LeadInData = {
  id: "lead-in-urban",
  module: 7,
  title: "Lead-in",
  subtitle: "On the move",
  topic: "Module 7 · Lead-in · p. 103",
  layout: "stack",
  stackInstruction:
    "Read about the unique forms of transport above. Have you ever been on any of these forms of transport? Which one would you most like to go on? Why? How practical do you think these forms of transport are?",
  photos: [
    {
      id: "unique-transport",
      src: urbanImg,
      label: "Unique forms of transport",
      intelligenceType: "",
      hint: "",
      objectFit: "contain",
    },
  ],
  questions: [
    {
      id: 1,
      text: "Have you ever been on any of these forms of transport? Which one would you most like to go on? Why?",
      hints: [
        "Suggested: I've been in a taxi before and one of these tram-like things – the trolleybus. I think I'd most like to have a go on a Tangah as I like horses.",
      ],
      vocab: [
        "Coco Taxi",
        "Tangah",
        "Dubai Trolley",
        "Matatu",
        "negotiate",
      ],
      sentenceFrame: "I'd most like to go on a … because…",
      timeSec: 90,
    },
    {
      id: 2,
      text: "How practical do you think these forms of transport are?",
      hints: [
        "Suggested: In my view, the practicality of these forms of transport depends very much on their environment.",
      ],
      vocab: [
        "practical",
        "environment",
        "fare",
        "hydrogen",
        "minibus",
      ],
      sentenceFrame:
        "I think … is / isn't practical because…",
      timeSec: 90,
    },
  ],
  globalVocab: [
    "transport",
    "urban",
    "fare",
    "tram",
    "minibus",
  ],
};
