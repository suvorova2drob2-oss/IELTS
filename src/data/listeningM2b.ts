import campImg from "../assets/listen-m2b-camp.png";
import { EXPERT_M2_AUDIO } from "./expertAudio";

export const LEARN_STEPS_L2B = [
  "Before you listen",
  "2a Script",
  "2b Correct errors",
  "3 Test practice 1–10",
  "5 Discussion",
] as const;

export const LEARN_STEP_NEXT_L2B: Record<number, string> = {
  0: "2a Script →",
  1: "2b Correct errors →",
  2: "3 Test →",
  3: "5 Discussion →",
  4: "← К модулю",
};

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[.,;:!?]+$/g, "");
}

export function checkListenM2b(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return accepted.some((a) => normalize(a) === n);
}

export const listeningM2b = {
  id: "listening-m2b-flow",
  module: 2,
  bookPages: "p. 31 in your coursebook",
  sectionTitle: "Listening · Section 1",
  unitTitle: "The natural world",
  beforeYouListen: {
    heading: "Before you listen",
    badge: "1",
    instruction:
      "Which of these ways of protecting endangered species do you think are more effective and why?",
    options: [
      "Creating national parks",
      "Breeding programmes",
      "Reducing human contact",
      "Controlling invasive species",
    ],
    suggestedTitle: "Suggested answer",
    suggestedAnswer: [
      "From my perspective, creating national parks is the most effective option because habitat preservation tackles the underlying cause of species decline. To begin with, a protected area safeguards an entire ecosystem, so numerous species can recover rather than just one animal being protected in isolation.",
      "Moreover, controlling invasive species should form part of the same strategy. Non-native predators and plants can seriously disrupt biodiversity, even in a protected habitat; therefore, active monitoring and removal programmes are essential.",
      "By contrast, captive-breeding programmes are valuable in emergencies, but they are expensive and do not solve habitat loss. Reducing human contact may also help, although it is difficult to enforce. Overall, I would prioritise national parks together with invasive-species control as the most viable long-term approach.",
    ],
    languageFocus: [
      "From my perspective",
      "To begin with",
      "Moreover",
      "therefore",
      "By contrast",
      "Overall",
      "habitat preservation",
      "underlying cause",
      "biodiversity",
      "viable long-term approach",
    ],
  },
  script: {
    badge: "2a",
    heading: "Accurate answers",
    instruction: "Read the audio script. What is Polly going to do?",
    lines: [
      { who: "Polly", text: "Hello, I’d like to book a flight, please." },
      {
        who: "Travel agent",
        text: "Certainly, do you have an account with us already?",
      },
      { who: "Polly", text: "I do. My name’s Polly Smith." },
      {
        who: "Travel agent",
        text: "OK. Let me look you up on the system … 14 Kingsland Terrace, Queensland?",
      },
      {
        who: "Polly",
        text: "No, that’s my old address. I now live at 243 Atlantic Avenue. It’s still in Belletown, Queensland, 4399.",
      },
      {
        who: "Travel agent",
        text: "Is your phone number still the same?",
      },
      { who: "Polly", text: "Yes, it is. It’s 61 565 9457." },
      {
        who: "Travel agent",
        text: "OK, thanks. And where do you want to travel to?",
      },
      {
        who: "Polly",
        text: "I’d like to go to Borneo on Friday on the early flight if possible. I’m doing a conservation trip there.",
      },
      {
        who: "Travel agent",
        text: "Yes, we’ve got availability on the 7.20 flight. Is that OK for you?",
      },
      { who: "Polly", text: "Yes, that’s fine." },
      {
        who: "Travel agent",
        text: "Great. That’s flight number QA 785. The flight gives you 20 kilos. Do you need any more than this?",
      },
      { who: "Polly", text: "No, that’ll be fine." },
    ],
    options: [
      {
        id: "a",
        label: "Update her account address only",
      },
      {
        id: "b",
        label: "Book an early Friday flight to Borneo for a conservation trip",
      },
      {
        id: "c",
        label: "Change her baggage allowance to 200 kilos",
      },
    ],
    key: "b",
    tip: "She’s booking an early Friday flight to Borneo for a conservation trip.",
  },
  errors: {
    badge: "b",
    instruction:
      "Find and correct the errors in the answers. What kind of errors are they?",
    formInstr:
      "Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    given: {
      name: "Polly Smith",
      phone: "+61 565 9457",
      flight: "QA 785",
    },
    items: [
      {
        id: 1,
        label: "Address",
        prefix: "243 ",
        wrong: "243 Atlantic Avenue",
        answers: ["Atlantic Avenue"],
        errorType: "Extra / repeated information (the number 243 is already printed)",
      },
      {
        id: 2,
        label: "Travelling to",
        wrong: "Borno",
        answers: ["Borneo"],
        errorType: "Spelling error",
      },
      {
        id: 3,
        label: "Baggage allowance",
        wrong: "200 kilos",
        answers: ["20 kilos", "20 kg", "20 kilos."],
        errorType: "Wrong number / misheard detail",
      },
    ],
  },
  test: {
    badge: "3",
    instruction: "Listen and complete the test task.",
    audio: EXPERT_M2_AUDIO.track02_04,
    audioLabel: "Track 02_04",
    formTitle: "Turtle Bay Safari Camp · Customer registration form",
    formInstr:
      "Questions 1–5 · Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    fields: [
      {
        id: 1,
        label: "Customer name",
        prefix: "Cindy ",
        answers: ["Philips", "Phillips"],
      },
      {
        id: "phone",
        label: "Telephone number",
        given: "09669 343123",
      },
      {
        id: 2,
        label: "Nationality",
        answers: ["Canadian"],
      },
      {
        id: "stay",
        label: "Length of stay",
        given: "One week",
      },
      {
        id: 3,
        label: "Accommodation type",
        suffix: " cabin",
        answers: ["superior"],
      },
      {
        id: 4,
        label: "Credit card number",
        answers: ["4458 6974 2231", "445869742231"],
      },
      {
        id: "expiry",
        label: "Expiry date",
        given: "10/20",
      },
      {
        id: 5,
        label: "Additional comments",
        answers: ["vegetarian"],
      },
    ],
    mapTitle: "Turtle Bay Safari Camp",
    mapInstr:
      "Questions 6–10 · Label the map below. Write the correct letter, A–G, next to questions 6–10.",
    map: campImg,
    mapAlt:
      "Map of Turtle Bay Safari Camp with Main path, Reception, cabins and lettered spots A–G.",
    letters: ["A", "B", "C", "D", "E", "F", "G"] as const,
    mapItems: [
      { id: 6, text: "Main lodge", key: "B" },
      { id: 7, text: "Emergency point", key: "C" },
      { id: 8, text: "Spa", key: "F" },
      { id: 9, text: "Viewing point", key: "G" },
      { id: 10, text: "Pool", key: "D" },
    ],
  },
  discussion: {
    badge: "5",
    heading: "Discussion",
    instruction:
      "Do you think conservation efforts are making a positive change? Why/Why not?",
    suggestedTitle: "Suggested answer",
    suggestedAnswer: [
      "On balance, I’d say yes — conservation efforts are making a positive change, even if progress is slower than we’d like.",
      "National parks and breeding programmes have clearly helped some endangered species recover. For example, protected areas reduce hunting and habitat destruction, and captive breeding has brought animals like the giant panda back from the brink.",
      "That said, climate change and invasive species are still serious threats, so we can’t afford to be complacent. Overall, though, the situation would almost certainly be worse without these initiatives.",
    ],
  },
};

export type ListeningM2bData = typeof listeningM2b;
