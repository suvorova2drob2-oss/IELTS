export type Mode = "practice" | "exam";

import musicImg from "../assets/music-intelligence.jpg";
import chessImg from "../assets/chess-intelligence.jpg";
import bikeImg from "../assets/bike-intelligence.jpg";
import robotImg from "../assets/robot-intelligence.jpg";

export interface Photo {
  id: string;
  src: string;
  label: string;
  intelligenceType: string;
  hint: string;
}

export interface Question {
  id: number;
  text: string;
  hints: string[];
  vocab: string[];
  sentenceFrame?: string;
  timeSec: number;
}

export interface LeadInData {
  id: string;
  module: number;
  title: string;
  subtitle: string;
  topic: string;
  photos: Photo[];
  questions: Question[];
  globalVocab: string[];
}

export const leadInIntelligence: LeadInData = {
  id: "lead-in-intelligence",
  module: 1,
  title: "Lead-in",
  subtitle: "Types of intelligence",
  topic: "Module 1 · Lead-in · pp. 7",
  photos: [
    {
      id: "music",
      src: musicImg,
      label: "Music & composition",
      intelligenceType: "Creative / musical",
      hint: "This person uses creative intelligence — reading music, composing, and expressing ideas through sound.",
    },
    {
      id: "chess",
      src: chessImg,
      label: "Chess",
      intelligenceType: "Logical / strategic",
      hint: "Chess requires logical thinking, planning several moves ahead, and analysing patterns.",
    },
    {
      id: "bike",
      src: bikeImg,
      label: "Bike repair",
      intelligenceType: "Practical / hands-on",
      hint: "Repairing a bicycle shows practical intelligence — understanding how things work and fixing them physically.",
    },
    {
      id: "robot",
      src: robotImg,
      label: "Robotics",
      intelligenceType: "Technical / analytical",
      hint: "Building a robot combines technical knowledge, problem-solving, and analytical thinking.",
    },
  ],
  questions: [
    {
      id: 1,
      text: "What does being intelligent mean to you?",
      hints: [
        "Think beyond school grades and exam results.",
        "Consider: ability to learn, solve problems, adapt to new situations.",
      ],
      vocab: ["intelligence", "ability", "aptitude", "learn quickly"],
      sentenceFrame: "To me, intelligence means the ability to…",
      timeSec: 45,
    },
    {
      id: 2,
      text: "Look at the four pictures. What kind of intelligence or skill is each person using?",
      hints: [
        "Photo 1 → creative/musical. Photo 2 → logical/strategic.",
        "Photo 3 → practical/hands-on. Photo 4 → technical/analytical.",
        "Click each photo above for more ideas before you answer.",
      ],
      vocab: ["creative", "logical", "practical", "analytical", "strategic"],
      sentenceFrame: "In the first picture, the person is using… intelligence because…",
      timeSec: 90,
    },
    {
      id: 3,
      text: "Do you think intelligence can be measured? How?",
      hints: [
        "Mention IQ tests, school exams, or standardised tests — but are they enough?",
        "Use: controversial, oversimplify, academic vs practical skills.",
      ],
      vocab: ["measure", "IQ test", "standardised", "controversial", "oversimplify"],
      sentenceFrame: "I think intelligence can / cannot be measured because…",
      timeSec: 60,
    },
    {
      id: 4,
      text: "What different kinds of intelligence can people have?",
      hints: [
        "Think about Gardner's types: linguistic, logical, spatial, musical, bodily, interpersonal…",
        "Give an example from your own life or someone you know.",
      ],
      vocab: [
        "linguistic",
        "interpersonal",
        "spatial",
        "emotional intelligence",
        "multiple intelligences",
      ],
      sentenceFrame: "People can have different types of intelligence, such as…",
      timeSec: 60,
    },
    {
      id: 5,
      text: "In which areas (academic, social, practical, etc.) are you most and least confident?",
      hints: [
        "Structure: 'I'm strongest in… because…' / 'I'm weaker in… although…'",
        "Be specific — give a real example, not just a label.",
      ],
      vocab: ["academic", "social", "practical", "strength", "weakness", "confident"],
      sentenceFrame:
        "I'd say I'm most confident in… because… On the other hand, I'm less confident in…",
      timeSec: 90,
    },
  ],
  globalVocab: [
    "intelligence",
    "measure",
    "academic",
    "practical",
    "social",
    "logical",
    "creative",
    "analytical",
    "aptitude",
    "skill",
    "strategic thinking",
    "problem-solving",
    "controversial",
    "multiple intelligences",
  ],
};
