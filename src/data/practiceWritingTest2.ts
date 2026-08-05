import leadInImg from "../assets/practice-writing-test2-shopping.png";
import processImg from "../assets/practice-writing-test2-process.png";

/** Practice Writing Test 2 — online food shopping process (book + teacher keys). */

export const practiceWritingTest2 = {
  id: "practice-writing-2",
  title: "Practice Test 2",
  subtitle: "Online food shopping · Process diagram (Task 1)",
  leadIn: {
    title: "Lead-in",
    image: leadInImg,
    imageAlt: "Person shopping online with a laptop and credit card",
    discussInstruction: "1 Work in pairs and discuss these questions.",
    discussQuestions: [
      "Have you ever shopped online?",
      "What are the advantages and disadvantages of shopping online?",
      "What types of items do you buy online? Why?",
      "Are there any things you wouldn’t buy online? What are these things? Why wouldn’t you buy them online?",
    ],
  },
  vocab: {
    title: "Vocabulary",
    instruction: "2 Match the words (1–6) with the meanings (A–F).",
    words: [
      { id: 1, word: "browse", key: "B" },
      { id: 2, word: "deliver", key: "E" },
      { id: 3, word: "load", key: "D" },
      { id: 4, word: "pack", key: "F" },
      { id: 5, word: "purchase", key: "C" },
      { id: 6, word: "select", key: "A" },
    ],
    options: [
      {
        letter: "A",
        label: "choose something by thinking about which one is the best",
      },
      {
        letter: "B",
        label:
          "look at information, pictures and other things on the Internet",
      },
      { letter: "C", label: "buy something" },
      { letter: "D", label: "put something into a vehicle" },
      { letter: "E", label: "take goods to a place or person" },
      {
        letter: "F",
        label: "put something into a container (e.g. a bag or box)",
      },
    ],
  },
  passive: {
    title: "Test training: Using the passive",
    noticeInstruction:
      "3 Look at these two sentences. What is the difference? Think about what is important in each sentence.",
    active: "Robots pick the items from the shelves.",
    passive: "Items are picked from the shelves by robots.",
    teacherNote:
      "The first sentence is active and the second is passive. The robot is the agent (the person or thing doing the action).",
    transformInstruction:
      "4 Complete the second sentence so that it means the same as the first sentence. Use no more than three words.",
    items: [
      {
        id: 1,
        active: "You can use a credit card to pay for items.",
        before: "Credit cards ",
        after: " to pay for items.",
        key: "can be used",
        accept: ["can be used"],
      },
      {
        id: 2,
        active:
          "At the warehouse workers carefully pack the items into boxes.",
        before: "Items ",
        after: " into boxes by workers at the warehouse.",
        key: "are carefully packed",
        accept: ["are carefully packed", "are packed carefully"],
      },
      {
        id: 3,
        active: "Customers take the first step.",
        before: "The first step ",
        after: " by customers.",
        key: "is taken",
        accept: ["is taken"],
      },
      {
        id: 4,
        active: "Customers choose items from a list on the website.",
        before: "Items ",
        after: " from a list on the website by the customer.",
        key: "are chosen",
        accept: ["are chosen", "are selected"],
      },
    ],
  },
  structure: {
    title: "Structure the answer",
    instruction:
      "5 Read the Writing test task. Put the stages (A–C) into the correct order (1–3).",
    stages: [
      {
        id: "A",
        text: "Give an overview of the main point(s).",
        keyOrder: 2,
      },
      {
        id: "B",
        text: "Describe the process in detail.",
        keyOrder: 3,
      },
      {
        id: "C",
        text: "Say what the diagram shows, paraphrasing the wording in the test task.",
        keyOrder: 1,
      },
    ],
  },
  plan: {
    title: "Planning",
    instruction: "6 Work in pairs. Discuss the questions and make a brief plan.",
    questions: [
      {
        q: "What does the diagram show?",
        sample:
          "The diagram shows / illustrates the process of shopping online for food.",
      },
      {
        q: "What is the main thing we learn from this diagram?",
        sample:
          "The process involves both humans and technology (robots + people).",
      },
      {
        q: "What happens in each stage?",
        sample:
          "1 food selection → 2 shopping basket / pay → 3 warehouse order received → 4 human/robot picking → 5 packing → 6 receipt → 7 loading → 8 delivery to the customer.",
      },
    ],
  },
  writeTask: {
    title: "Writing Task 1 · Process",
    timeLabel: "You should spend about 20 minutes on this task.",
    structure: [
      {
        label: "1 · Introduction + overview",
        tip: "Say what the diagram shows + the main idea (humans + technology).",
        starter:
          "The diagram shows the process of shopping online for food. From the diagram we can see that the process involves both humans and technology.",
      },
      {
        label: "2 · Customer steps",
        tip: "Browse → select → basket → pay → order to warehouse.",
        starter:
          "First of all, the customer browses the website and selects the food to purchase. Then the items are put in the virtual shopping basket and paid for, and the order is sent to the warehouse.",
      },
      {
        label: "3 · Warehouse to delivery",
        tip: "Pick (robots/humans) → pack → receipt → load → deliver.",
        starter:
          "Next, products are picked by robots and humans. After that, the food is packed into bags and a receipt is printed. Finally, the bags and receipt are loaded into a van and delivered to the customer at home.",
      },
    ],
    prompt:
      "The diagram illustrates the process of online food shopping.\n\nSummarise the information by selecting and reporting the main features and make comparisons where relevant.\n\nWrite at least 150 words.",
    processImage: processImg,
    processAlt: "Diagram of the online food shopping process",
    processSteps: [
      "food selection",
      "shopping basket",
      "warehouse (order received)",
      "human / robot product selection",
      "food packing",
      "receipt printing",
      "loading",
      "delivery",
    ],
    sequencersTip:
      "Use sequencers such as first of all, next, and then, finally, etc. Prefer the passive when the agent is unimportant.",
    teacherTip:
      "After planning, you may write in about 15 minutes. Focus on overview + clear stage order — not every tiny detail.",
    timeSec: 900,
    minWords: 150,
    checklist: [
      "Paraphrase of the diagram topic",
      "Overview (humans + technology / main stages)",
      "Customer stages: browse → select → basket → pay",
      "Warehouse: order received; human vs robot picking",
      "Packing → receipt → loading → delivery",
      "Sequencers / passive where natural",
    ],
    sampleAnswer:
      "The diagram shows the process of shopping online for food. From the diagram we can see that the process involves both humans and technology. The first step is taken by the customer. The customer browses the website and selects the food that he/she would like to purchase. Then, the customer puts the food in the virtual shopping basket before paying for it. The order is sent to the warehouse where products are picked by both machines and humans. Items that are stored on high shelves are picked by robots, whereas humans collect the items from shelves closer to the ground. Once the food has been picked, it is packed into a number of plastic shopping bags. The bags are then collected and a receipt is printed. Next, the bags and the receipt are loaded into a van. Finally, the driver of the van delivers the shopping to the customer at their home and gives him or her the receipt.",
  },
  descriptors: {
    title: "Follow-up · Band descriptors",
    instruction:
      "8 Match the statements (1–4) to the four Task 1 descriptors (A–D).",
    statements: [
      {
        id: 1,
        text: "Uses a wide range of vocabulary (e.g. verbs) correctly with correct spelling.",
        key: "C",
      },
      {
        id: 2,
        text: "Organises and links ideas logically.",
        key: "B",
      },
      {
        id: 3,
        text: "Uses a mix of simple and complex sentences accurately.",
        key: "D",
      },
      {
        id: 4,
        text: "Gives an overview and writes about the key points.",
        key: "A",
      },
    ],
    options: [
      { letter: "A", label: "Task achievement" },
      { letter: "B", label: "Coherence and cohesion" },
      { letter: "C", label: "Lexical resources" },
      { letter: "D", label: "Grammatical range and accuracy" },
    ],
  },
  peer: {
    title: "Follow-up · Feedback",
    instruction:
      "9 Work in pairs. Swap your answer and assess your partner’s writing using the descriptors. Give each other positive feedback and suggest one thing to improve.",
    rewriteNote:
      "10 Rewrite your answer incorporating the feedback where appropriate.",
  },
};

export type PracticeWritingTest2 = typeof practiceWritingTest2;
