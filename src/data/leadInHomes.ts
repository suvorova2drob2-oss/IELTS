import homesImg from "../assets/lead-in-m5-homes.png";
import type { LeadInData } from "./leadInIntelligence";

/** Module 5 · Homes of the future · Lead-in · p. 71 */
export const leadInHomes: LeadInData = {
  id: "lead-in-homes",
  module: 5,
  title: "Lead-in",
  subtitle: "Homes of the future",
  topic: "Module 5 · Lead-in · p. 71",
  layout: "stack",
  stackInstruction:
    "Look at the pictures. They predict the future in relation to humans' physical interaction with technology, the design of innovative new living environments, and the way in which we will travel. Discuss the questions.",
  photos: [
    {
      id: "futures",
      src: homesImg,
      label: "Homes of the future",
      intelligenceType: "",
      hint: "",
      objectFit: "contain",
    },
  ],
  questions: [
    {
      id: 1,
      text: "What do the pictures predict about the future? Think about technology, living environments and travel.",
      hints: [
        "Physical interaction with technology, innovative living spaces, and new ways of travelling.",
      ],
      vocab: [
        "predict",
        "innovative",
        "living environment",
        "technology",
        "travel",
      ],
      sentenceFrame:
        "The pictures suggest that in the future people will…",
      timeSec: 90,
    },
    {
      id: 2,
      text: "Which of these future developments do you think is most likely to become a reality? Why?",
      hints: [
        "Suggested: space-saving multi-purpose living designs as the world's population continues to increase.",
      ],
      vocab: [
        "space-saving",
        "multi-purpose",
        "population",
        "likely",
        "reality",
      ],
      sentenceFrame:
        "I think … is most likely because…",
      timeSec: 90,
    },
  ],
  globalVocab: [
    "innovation",
    "automation",
    "living environment",
    "technology",
    "future",
  ],
};
