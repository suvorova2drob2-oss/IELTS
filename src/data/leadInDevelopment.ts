import collage from "../assets/lead-in-m2-development.png";
import type { LeadInData } from "./leadInIntelligence";

/** Module 2 · A world of change · Lead-in p. 23 */
export const leadInDevelopment: LeadInData = {
  id: "lead-in-development",
  module: 2,
  title: "Lead-in",
  subtitle: "Development",
  topic: "Module 2 · Lead-in · p. 23",
  photos: [
    {
      id: "gym",
      src: collage,
      objectPosition: "18% 10%",
      label: "Keeping fit in later life",
      intelligenceType: "Personal development",
      hint: "Health, ageing well, lifestyle — development of the individual.",
    },
    {
      id: "energy",
      src: collage,
      objectPosition: "82% 14%",
      label: "Energy and the environment",
      intelligenceType: "Social / environmental development",
      hint: "Wind power next to a power station — how society produces energy, and the impact on the planet.",
    },
    {
      id: "clinic",
      src: collage,
      objectPosition: "50% 48%",
      label: "Healthcare",
      intelligenceType: "Social development",
      hint: "Access to doctors and clinics — a common measure of living standards in a country.",
    },
  ],
  questions: [
    {
      id: 1,
      text: "Would you agree that living standards are improving all around the world? Why / Why not?",
      hints: [
        "Living standards = quality of life: health, income, education, housing, safety.",
        "You can agree in some countries / for some groups, and disagree in others.",
      ],
      vocab: [
        "living standards",
        "quality of life",
        "uneven",
        "poverty",
        "access to",
      ],
      sentenceFrame:
        "I’d say living standards are improving in…, but not everywhere, because…",
      timeSec: 60,
    },
    {
      id: 2,
      text: "Explain what ‘development’ means to you.",
      hints: [
        "It can be personal (skills, health, career) or social (economy, healthcare, environment).",
        "Click the photos: gym → personal; energy and clinic → social.",
      ],
      vocab: [
        "development",
        "progress",
        "well-being",
        "infrastructure",
        "opportunity",
      ],
      sentenceFrame: "To me, development means…",
      timeSec: 45,
    },
    {
      id: 3,
      text: "Are the following examples of personal or social development?",
      hints: [
        "Personal = the individual. Social = society / the country / the planet.",
        "University and communication skills → personal. Healthcare and carbon emissions → social.",
      ],
      vocab: [
        "personal development",
        "social development",
        "healthcare",
        "carbon emissions",
        "communication skills",
      ],
      sentenceFrame: "I’d class … as personal / social development because…",
      timeSec: 90,
      classify: {
        labels: ["personal", "social"],
        items: [
          { id: "uni", text: "studying at university", key: 0 },
          { id: "carbon", text: "reducing carbon emissions", key: 1 },
          { id: "health", text: "improving healthcare", key: 1 },
          { id: "comms", text: "improving communication skills", key: 0 },
        ],
      },
    },
    {
      id: 4,
      text: "How are personal and social development different?",
      hints: [
        "Personal: one person’s skills, health, education. Social: systems that help many people.",
        "They often connect: better education (personal) can raise living standards (social).",
      ],
      vocab: ["individual", "society", "connected", "priority", "benefit"],
      sentenceFrame:
        "Personal development is about…, whereas social development is about…",
      timeSec: 60,
    },
    {
      id: 5,
      text: "Which do you think is more important — personal or social development? Why?",
      hints: [
        "Pick one and justify. A Band 7 answer often admits the other still matters.",
        "Use: I would argue that… / Having said that…",
      ],
      vocab: [
        "more important",
        "I would argue that",
        "foundation",
        "in the long run",
        "having said that",
      ],
      sentenceFrame:
        "I would argue that … development is more important because… Having said that,…",
      timeSec: 75,
    },
  ],
  globalVocab: [
    "living standards",
    "development",
    "personal",
    "social",
    "healthcare",
    "carbon emissions",
    "well-being",
    "progress",
    "infrastructure",
    "quality of life",
  ],
};
