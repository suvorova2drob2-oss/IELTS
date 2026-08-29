import communityImg from "../assets/lead-in-m8-community.png";
import type { LeadInData } from "./leadInIntelligence";

/** Module 8 · Social networks · Lead-in · p. 119 */
export const leadInCommunity: LeadInData = {
  id: "lead-in-community",
  module: 8,
  title: "Lead-in",
  subtitle: "Social networks",
  topic: "Module 8 · Lead-in · p. 119",
  layout: "stack",
  stackInstruction:
    "Discuss the quote about community. What does it mean? Why is community important?",
  photos: [
    {
      id: "community-crew",
      src: communityImg,
      label: "Community",
      intelligenceType: "",
      hint: "",
      objectFit: "contain",
    },
  ],
  questions: [
    {
      id: 1,
      text: "What does the quote mean? (People who live in a community should think of themselves as belonging to a ship’s crew and that each person should be prepared to lead the community.)",
      hints: [
        "Suggested answer: The quote means that people who live in a community should think of themselves as belonging to a ship’s crew and that each person should be prepared to lead the community.",
      ],
      vocab: [
        "community",
        "crew",
        "belong",
        "lead",
        "collaboration",
      ],
      sentenceFrame:
        "The quote means that people in a community should… because…",
      timeSec: 90,
    },
    {
      id: 2,
      text: "Why is community important?",
      hints: [
        "Suggested answer: Community is important because it helps foster understanding and collaboration between people, and ensures that people who live in the same place are willing to care for each other.",
      ],
      vocab: [
        "foster",
        "understanding",
        "collaboration",
        "care for",
        "neighbours",
      ],
      sentenceFrame:
        "Community is important because it helps foster… and ensures…",
      timeSec: 90,
    },
  ],
  globalVocab: [
    "community",
    "collaboration",
    "neighbourhood",
    "altruism",
    "social networks",
  ],
};
