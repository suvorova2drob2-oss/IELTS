import successImg from "../assets/lead-in-m9-success.png";
import type { LeadInData } from "./leadInIntelligence";

/** Module 9 · Being successful · Lead-in · p. 135 */
export const leadInSuccess: LeadInData = {
  id: "lead-in-success",
  module: 9,
  title: "Lead-in",
  subtitle: "Being successful",
  topic: "Module 9 · Lead-in · p. 135",
  layout: "stack",
  stackInstruction:
    "Look at the photo. In groups, discuss what the word SUCCESS means to you. Try to agree on a definition.",
  photos: [
    {
      id: "success",
      src: successImg,
      label: "Being successful",
      intelligenceType: "",
      hint: "",
      objectFit: "contain",
    },
  ],
  questions: [
    {
      id: 1,
      text: "What does success mean to you?",
      hints: [
        "Suggested: In my view, success is personal. However, some of these ideas contribute to the concept of success for many people, especially those which are connected with achieving goals or maintaining happiness.",
      ],
      vocab: [
        "success",
        "personal",
        "achievement",
        "goals",
        "happiness",
      ],
      sentenceFrame: "To me, success means…",
      timeSec: 90,
    },
    {
      id: 2,
      text: "Which ideas (goals, happiness, money, status, hard work, talent, etc.) contribute most to success? Why?",
      hints: [
        "Suggested: Goals and happiness contribute for many people; money and status matter more in some cultures.",
      ],
      vocab: [
        "contribute",
        "goals",
        "happiness",
        "money",
        "status",
      ],
      sentenceFrame: "I think … contribute most because…",
      timeSec: 90,
    },
    {
      id: 3,
      text: "Why is success hard to define?",
      hints: [
        "It is difficult to define because it is very culturally and personally conceived (e.g. some think it’s happiness while others relate it to money).",
      ],
      vocab: [
        "define",
        "culturally",
        "personally",
        "conceived",
        "relative",
      ],
      sentenceFrame: "Success is hard to define because…",
      timeSec: 90,
    },
  ],
  globalVocab: [
    "success",
    "achievement",
    "goals",
    "happiness",
    "motivation",
    "talent",
  ],
};
