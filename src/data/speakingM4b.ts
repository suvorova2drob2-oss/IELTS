export const SPEAK_M4B_STEPS = [
  "1 Lead-in",
  "2 Match vocab",
  "3 Discuss",
  "4 Pronunciation",
  "5 Part 3",
  "6 Assess",
] as const;

export const SPEAK_M4B_NEXT = [
  "2 Match vocab →",
  "3 Discuss →",
  "4 Pronunciation →",
  "5 Part 3 →",
  "6 Assess →",
  "← К модулю",
] as const;

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ");
}

export function checkSpeakM4b(input: string, answers: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return answers.some((a) => normalize(a) === n);
}

export const speakingM4b = {
  id: "speaking-m4b-flow",
  bookPages: "p. 65 in your coursebook",
  sectionTitle: "Speaking · Part 3",
  testStrategies: "TEST STRATEGIES page 175",
  leadIn: {
    badge: "1",
    heading: "Lead-in",
    instruction:
      "Look at the luxury items. Discuss how much you think each one is worth. Then check the answers.",
    items: [
      {
        id: "A",
        label: "Antilla (the world's most expensive house)",
        worth: "worth $1 billion",
      },
      {
        id: "B",
        label: "Gold-plated Bugatti",
        worth: "worth approx. $10 million",
      },
      {
        id: "C",
        label: "The Wittelsbach-Graff Diamond",
        worth: "worth $80 million",
      },
    ],
  },
  vocab2: {
    badge: "2",
    heading: "Develop vocabulary",
    instruction: "Complete the sentences with the words below.",
    bank: [
      "value",
      "materialistic",
      "gadgets",
      "brand",
      "status symbol",
      "successful",
      "possessions",
    ],
    items: [
      {
        id: 1,
        before:
          "Some people measure the ",
        after:
          " of a gift by how expensive it looks rather than by how thoughtful it is.",
        key: "value",
      },
      {
        id: 2,
        before:
          "Critics argue that modern societies have become increasingly ",
        after: ", focusing on shopping and ownership.",
        key: "materialistic",
      },
      {
        id: 3,
        before:
          "Young people often spend large amounts of money on the latest electronic ",
        after: ".",
        key: "gadgets",
      },
      {
        id: 4,
        before:
          "Choosing a well-known ",
        after:
          " can make consumers feel they are buying quality and prestige.",
        key: "brand",
      },
      {
        id: 5,
        before:
          "For some drivers, an expensive car is less about transport and more about having a ",
        after: ".",
        key: "status symbol",
      },
      {
        id: 6,
        before:
          "Owning luxury goods does not automatically make a person ",
        after: " in life.",
        key: "successful",
      },
      {
        id: 7,
        before:
          "People who constantly compare their ",
        after:
          " with those of their neighbours may feel permanently dissatisfied.",
        key: "possessions",
      },
    ],
  },
  discuss3: {
    badge: "3",
    instruction:
      "Work in pairs or groups and discuss the questions. Give full answers and connect your ideas.",
    questions: [
      "What problems can materialism cause for individuals and society?",
      "Do you think people are successful because of their possessions? Why/Why not?",
      "Is the world becoming more materialistic? Why?",
      "In what ways might materialism be beneficial, and in what ways is it negative?",
    ],
    suggestedTitle: "Suggested answer",
    suggestedAnswer: [
      "Materialism can cause serious problems for individuals and society. People may spend more money than they intended or could afford, driven by the desire to compete with others for status through brand names — and this can lead to debt and anxiety. I do not think people are successful because of their possessions; many wealthy individuals are deeply unhappy, whereas contentment often comes from relationships and purpose rather than ownership.",
      "I believe the world is becoming more materialistic because opportunities for consumption have risen everywhere — advertising, online shopping and social media constantly encourage us to want more. Materialism can be beneficial in that it creates employment and drives innovation, but it is negative when it becomes the most important aspect of life and brings out competitiveness and dissatisfaction in people.",
    ],
  },
  pronunciation4: {
    badge: "4a",
    heading: "Pronunciation features",
    instruction:
      "Match the pronunciation features (1–4) with the descriptions (A–D).",
    features: [
      {
        id: 1,
        text: "Sounds at the ends and beginnings of words join together so speech flows smoothly.",
        key: "B",
      },
      {
        id: 2,
        text: "Some syllables in a word or phrase are said more strongly than others.",
        key: "D",
      },
      {
        id: 3,
        text: "The pitch of the voice rises and falls to show attitude or to mark new information.",
        key: "C",
      },
      {
        id: 4,
        text: "Consonants and vowels are produced clearly so each sound can be distinguished.",
        key: "A",
      },
    ],
    labels: [
      { id: "A", text: "individual sounds" },
      { id: "B", text: "connected speech" },
      { id: "C", text: "intonation" },
      { id: "D", text: "word stress" },
    ],
    keys: { 1: "B", 2: "D", 3: "C", 4: "A" } as Record<number, string>,
    listen4b: {
      badge: "b",
      instruction:
        "Listen to two speakers. Which speaker has the better pronunciation overall?",
      tip: "Speaker 2 has the best pronunciation of the two.",
    },
    analyse4c: {
      badge: "c",
      instruction:
        "Which performance is more likely to get a higher score? Why?",
      tip: "The first one is more likely to get a higher score. The speech is connected and there is stress on important words. The second example has flat intonation, words aren't connected and individual sounds are sometimes hard to hear.",
    },
  },
  part3: {
    badge: "5",
    heading: "Test practice",
    strategies: "TEST STRATEGIES page 175",
    instruction:
      "Work in pairs. Take turns to be the examiner and candidate, and ask and answer the questions.",
    questions: [
      "How important are brands to people in your country? Why?",
      "In what ways are people influenced by advertising?",
      "Is there a lot of pressure on people to have the latest technology and gadgets?",
      "Do you think there are more important things in life than acquiring possessions? Why?",
    ],
    suggestedAnswers: [
      "Yes, I think brands are important, especially for more affluent people but also younger people as well (although they no doubt favour different brands). I think this is because a lot of people feel the need to keep up with their peers, or in the case of teenagers, to be seen to be trendy and cool.",
      "People are influenced by advertising in a multitude of ways; they may identify with the lifestyle presented in the advert or may be subliminally attracted to colours, music or messages in the adverts.",
      "In my opinion, there is a lot of pressure on people when it comes to technology and having the latest devices and gadgets. This can be seen when people discuss the functionality of their new phones and so on.",
      "Yes, I do. There are far more important things in life than acquiring possessions – we should be more concerned about spending quality time with friends and family, looking after our own health and well-being and integrating with those in our local communities.",
    ],
  },
  assess: {
    badge: "6",
    heading: "Assess and improve",
    instruction:
      "Listen to your recorded performance or review notes from Exercise 5. Complete the checklist and choose one pronunciation area to improve.",
    items: [
      "I answered the questions at length.",
      "I used topic vocabulary (brands, gadgets, possessions, status).",
      "My speech was connected (linking sounds).",
      "I put stress on important words.",
      "My intonation was not flat.",
      "Individual sounds were clear.",
    ],
  },
};
