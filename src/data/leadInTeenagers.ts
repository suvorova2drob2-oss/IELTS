import teenagersImg from "../assets/lead-in-m3-teenagers.png";
import type { LeadInData } from "./leadInIntelligence";

/** Module 3 · The feel-good factor · Lead-in · p. 39 */
export const leadInTeenagers: LeadInData = {
  id: "lead-in-teenagers",
  module: 3,
  title: "Lead-in",
  subtitle: "Today’s teenagers",
  topic: "Module 3 · Lead-in · p. 39",
  layout: "stack",
  stackInstruction:
    "Look at the infographic about school students in the USA. Discuss the questions.",
  photos: [
    {
      id: "infographic",
      src: teenagersImg,
      label: "Today’s teenagers",
      intelligenceType: "",
      hint: "",
      objectFit: "contain",
    },
  ],
  questions: [
    {
      id: 1,
      text: "Which statistics would you say represent positive situations and which represent negative situations?",
      hints: [
        "Positive e.g. after-school activities, life going great.",
        "Negative e.g. overweight, hungry students, lack of sleep.",
      ],
      vocab: ["statistic", "positive", "negative", "overweight", "hungry"],
      sentenceFrame:
        "I’d say … is positive because…, whereas … looks more negative…",
      timeSec: 75,
    },
    {
      id: 2,
      text: "Which factors might relate to psychological aspects and which to physical aspects?",
      hints: [
        "Psychological: mood, stress, happiness (life going great), sleep, hunger affecting focus.",
        "Physical: overweight, sleep hours, after-school sport, screens in the bedroom.",
      ],
      vocab: ["psychological", "physical", "factor", "well-being"],
      sentenceFrame: "… relates more to psychological aspects, while … is physical…",
      timeSec: 75,
    },
    {
      id: 3,
      text: "How do you think these factors might affect studying? Why?",
      hints: [
        "Sleep, hunger, and screens can hurt concentration.",
        "Organised activities may help discipline and energy — or leave less study time.",
      ],
      vocab: ["concentration", "motivation", "performance", "distraction"],
      sentenceFrame: "These factors might affect studying because…",
      timeSec: 75,
    },
    {
      id: 4,
      text: "How do you think these statistics might compare to students in your country?",
      hints: [
        "Compare screens, sport, diet, sleep, and mood with your school experience.",
      ],
      vocab: ["compare", "similar", "different", "in my country"],
      sentenceFrame: "In my country, I think… would be similar / different because…",
      timeSec: 75,
    },
  ],
  globalVocab: [
    "teenager",
    "statistic",
    "overweight",
    "after-school activities",
    "psychological",
    "physical",
  ],
};
