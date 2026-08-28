import modernLib from "../assets/lead-in-m1-library-modern.png";
import mobileLib from "../assets/lead-in-m1-library-mobile.png";
import type { LeadInData } from "./leadInIntelligence";

/** Module 1A · Listening · Before you listen · p. 12 */
export const leadInLibrariesM1: LeadInData = {
  id: "lead-in-libraries-m1",
  module: 1,
  title: "Before you listen",
  subtitle: "Libraries",
  topic: "Module 1A · Listening · p. 12",
  layout: "stack",
  stackInstruction: "Look at the pictures of libraries.",
  photos: [
    {
      id: "modern",
      src: modernLib,
      label: "Modern library building",
      intelligenceType: "",
      hint: "",
    },
    {
      id: "mobile",
      src: mobileLib,
      label: "Mobile library",
      intelligenceType: "",
      hint: "",
    },
  ],
  questions: [
    {
      id: 1,
      text: "How do they compare to libraries you have visited?",
      hints: [],
      vocab: [],
      timeSec: 60,
    },
    {
      id: 2,
      text: "Where might you find each type of library shown?",
      hints: [],
      vocab: [],
      timeSec: 60,
    },
    {
      id: 3,
      text: "What could be the advantages and disadvantages of each one?",
      hints: [],
      vocab: [],
      timeSec: 75,
    },
    {
      id: 4,
      text: "What kinds of activities do people usually do in a library? Make a list.",
      hints: [],
      vocab: [],
      timeSec: 60,
    },
  ],
  globalVocab: [],
};
