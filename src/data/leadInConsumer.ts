import consumerImg from "../assets/lead-in-m4-consumer.png";
import type { LeadInData } from "./leadInIntelligence";

/** Module 4 · A consumer society · Lead-in · p. 55 */
export const leadInConsumer: LeadInData = {
  id: "lead-in-consumer",
  module: 4,
  title: "Lead-in",
  subtitle: "A consumer society",
  topic: "Module 4 · Lead-in · p. 55",
  layout: "stack",
  stackInstruction:
    "Complete the quiz. How many blue boxes did you tick? How many green boxes did you tick?",
  photos: [
    {
      id: "quiz",
      src: consumerImg,
      label: "Responsible spender quiz",
      intelligenceType: "",
      hint: "",
      objectFit: "contain",
    },
  ],
  questions: [
    {
      id: 1,
      text: "What do you think it means to be a 'responsible spender'?",
      hints: [
        "Plans spending, avoids debt, reuses things, thinks about environmental impact.",
      ],
      vocab: ["responsible", "spender", "consume", "waste"],
      sentenceFrame:
        "A responsible spender is someone who…",
      timeSec: 90,
      classify: {
        labels: ["Blue — careful spender", "Green — not a careful shopper"],
        items: [
          {
            id: "q1",
            text: "I never buy lunch: I always take a packed lunch.",
            key: 0,
          },
          {
            id: "q2",
            text: "I pay for lots of satellite TV channels but I don't want them all.",
            key: 1,
          },
          {
            id: "q3",
            text: "I'm not a fan of brand names: I don't buy designer labels.",
            key: 0,
          },
          {
            id: "q4",
            text: "I have a credit card and I don't always pay it off every month.",
            key: 1,
          },
          {
            id: "q5",
            text: "I wait until there is a sale before I buy electronic goods.",
            key: 0,
          },
          {
            id: "q6",
            text: "When I get home late from work, I usually have a take-away for dinner.",
            key: 1,
          },
          {
            id: "q7",
            text: "I don't upgrade my mobile phone every year.",
            key: 0,
          },
          {
            id: "q8",
            text: "If I see a jacket I like, I buy it before someone else does.",
            key: 1,
          },
        ],
      },
    },
    {
      id: 2,
      text: "To what extent do people nowadays think about how much they spend and consume?",
      hints: [
        "Mostly green = spend freely, convenience, throw things away.",
        "Mostly blue = plan, save, dislike waste.",
      ],
      vocab: ["consume", "convenience", "waste", "environment"],
      sentenceFrame: "Nowadays, I think people… because…",
      timeSec: 90,
    },
  ],
  globalVocab: [
    "consumer",
    "responsible spender",
    "convenience",
    "waste",
    "recycle",
  ],
};
