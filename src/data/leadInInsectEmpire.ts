import tigerImg from "../assets/lead-in-m2b-a-tiger.png";
import beeImg from "../assets/lead-in-m2b-b-bee.png";
import bushImg from "../assets/lead-in-m2b-c-bush.png";
import type { LeadInData } from "./leadInIntelligence";

/** Module 2B · The Insect Empire · Before you read · p. 34 */
export const leadInInsectEmpire: LeadInData = {
  id: "lead-in-insect-empire",
  module: 2,
  title: "Before you read",
  subtitle: "The Insect Empire",
  topic: "Module 2B · Reading · p. 34",
  layout: "stack",
  stackInstruction: "Look at the photos and answer the questions.",
  photos: [
    {
      id: "a",
      src: tigerImg,
      label: "A · tiger",
      intelligenceType: "",
      hint: "",
    },
    {
      id: "b",
      src: beeImg,
      label: "B · bee",
      intelligenceType: "",
      hint: "",
    },
    {
      id: "c",
      src: bushImg,
      label: "C · bush baby",
      intelligenceType: "",
      hint: "",
    },
  ],
  questions: [
    {
      id: 1,
      text: "What might these creatures have in common?",
      hints: [],
      vocab: [],
      timeSec: 60,
    },
    {
      id: 2,
      text: "Which living creatures in your country do people most value and worry about losing? Why?",
      hints: [],
      vocab: [],
      timeSec: 75,
    },
    {
      id: 3,
      text: "What are the most common insects in your country?",
      hints: [],
      vocab: [],
      timeSec: 60,
    },
    {
      id: 4,
      text: "What purpose do insects serve?",
      hints: [],
      vocab: [],
      timeSec: 75,
    },
  ],
  globalVocab: [],
};
