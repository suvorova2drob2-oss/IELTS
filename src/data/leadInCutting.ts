import cuttingImg from "../assets/lead-in-m10-cutting.png";
import type { LeadInData } from "./leadInIntelligence";

/** Module 10 · Cutting edge · Lead-in · p. 151 */
export const leadInCutting: LeadInData = {
  id: "lead-in-cutting",
  module: 10,
  title: "Lead-in",
  subtitle: "Cutting edge",
  topic: "Module 10 · Lead-in · p. 151",
  layout: "stack",
  stackInstruction:
    "Look at the photos. Can you match the people with their inventions? Discuss what makes a great inventor — is creativity or knowledge more important? The module title Cutting edge means new and exciting.",
  photos: [
    {
      id: "cutting",
      src: cuttingImg,
      label: "Cutting edge",
      intelligenceType: "",
      hint: "",
      objectFit: "contain",
    },
  ],
  questions: [
    {
      id: 1,
      text: "Can you match the people in the photos with their inventions?",
      hints: [
        "Tim Berners-Lee — world wide web; Momofuku Ando — instant noodles; Hedy Lamarr — radio guidance technology.",
      ],
      vocab: [
        "inventor",
        "invention",
        "world wide web",
        "instant noodles",
        "radio guidance",
      ],
      sentenceFrame: "I think … invented …",
      timeSec: 90,
    },
    {
      id: 2,
      text: "What do you think makes a great inventor?",
      hints: [
        "Suggested: curiosity, persistence, willingness to take risks, combining creativity with knowledge.",
      ],
      vocab: ["inventor", "curiosity", "persistence", "risk", "innovation"],
      sentenceFrame: "A great inventor needs…",
      timeSec: 90,
    },
    {
      id: 3,
      text: "Is it more important to be creative or knowledgeable to be an inventor? Why?",
      hints: [
        "Both matter: knowledge gives tools; creativity produces new combinations. Many breakthroughs need both.",
      ],
      vocab: ["creative", "knowledgeable", "breakthrough", "combination"],
      sentenceFrame: "I think … is more important because…",
      timeSec: 90,
    },
  ],
  globalVocab: [
    "cutting edge",
    "invention",
    "creativity",
    "innovation",
    "inventor",
    "technology",
  ],
};
