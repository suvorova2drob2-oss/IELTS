import crimeImg from "../assets/lead-in-m6-crime.png";
import type { LeadInData } from "./leadInIntelligence";

/** Module 6 · Law and order · Lead-in · p. 87 */
export const leadInCrime: LeadInData = {
  id: "lead-in-crime",
  module: 6,
  title: "Lead-in",
  subtitle: "Law and order",
  topic: "Module 6 · Lead-in · p. 87",
  layout: "stack",
  stackInstruction:
    "Look at the photos from film and TV. What do they all have in common? How accurately do you think these pictures portray scenes from real life? Why?",
  photos: [
    {
      id: "crime-tv",
      src: crimeImg,
      label: "Film and TV crime scenes",
      intelligenceType: "",
      hint: "",
      objectFit: "contain",
    },
  ],
  questions: [
    {
      id: 1,
      text: "Look at the photos from film and TV. What do they all have in common?",
      hints: [
        "They all show detectives.",
      ],
      vocab: [
        "detective",
        "crime",
        "investigation",
        "forensic",
        "suspect",
      ],
      sentenceFrame: "They all have … in common because…",
      timeSec: 90,
    },
    {
      id: 2,
      text: "How accurately do you think these pictures portray scenes from real life? Why?",
      hints: [
        "Suggested: Probably do not portray real life accurately, although they are mostly using the same observation techniques that the police use.",
      ],
      vocab: [
        "portray",
        "accurately",
        "real life",
        "observation techniques",
        "police",
      ],
      sentenceFrame:
        "I think they … portray real life accurately because…",
      timeSec: 90,
    },
  ],
  globalVocab: [
    "crime",
    "detective",
    "surveillance",
    "law enforcement",
    "investigation",
  ],
};
