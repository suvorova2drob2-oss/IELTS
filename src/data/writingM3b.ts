export const WRITE_M3B_STEPS = [
  "1 Lead-in",
  "2 Understand task",
  "3 Plan",
  "4 Error correction",
  "5 Modal passive",
  "6 Write essay",
] as const;

export const WRITE_M3B_NEXT = [
  "2 Understand task →",
  "3 Plan →",
  "4 Error correction →",
  "5 Modal passive →",
  "6 Write essay →",
  "← К модулю",
] as const;

export const writingM3b = {
  id: "writing-m3b-flow",
  bookPages: "pp. 52–53 in your coursebook",
  sectionTitle: "Writing · Task 2 (problems & solutions)",
  expertWriting: "EXPERT WRITING page 193",
  testStrategies: "TEST STRATEGIES page 173",
  quote:
    "The greatest medicine of all is teaching people not to need it.",
  leadIn: {
    badge: "1",
    instruction:
      "What do you think the statement above means? How can we teach people to avoid illness?",
    suggestedTitle: "Suggested answer",
    suggestedAnswer: [
      "The statement suggests that prevention is more powerful than treatment. In other words, if people learn healthy habits, they may need far less medical intervention later.",
      "We can teach people to avoid illness through school health education, clear public campaigns and affordable access to exercise and nutritious food. Regular check-ups and early advice also help people notice problems before they become serious.",
      "Ultimately, the goal is to make healthy choices the easy option, so individuals take responsibility for their wellbeing rather than relying only on doctors to ‘fix’ every problem.",
    ],
    languageFocus: [
      "In other words",
      "Ultimately",
      "prevention",
      "medical intervention",
      "public campaigns",
      "take responsibility",
    ],
  },
  understand: {
    badge: "2a",
    heading: "Understand the task",
    instruction:
      "Read the essay question and look at the sample problem and solutions. Which solutions are appropriate for the essay?",
    title:
      "Some people rely too much on doctors instead of taking care of their own health. They think all health problems can just be 'fixed' by visiting doctors. What problems could this approach to healthcare cause and how might they be solved?",
    problem:
      "Doctors may be overstretched and not be spending time with the patients who most need their help.",
    solutions: [
      {
        id: "A",
        text: "People should be expected to pay to solve problems which they have created through their own lifestyle choices.",
        key: true,
      },
      {
        id: "B",
        text: "Greater healthcare provision is needed.",
        key: false,
      },
      {
        id: "C",
        text: "People need education to help them take responsibility for their own health.",
        key: true,
      },
      {
        id: "D",
        text: "If people visited their doctor more regularly, more health problems could be detected early and treated before they became serious.",
        key: false,
      },
    ],
    note2b:
      "Note down another problem and possible solutions for the above task. Discuss your problem and solutions in groups. Are they key problems? Are the proposed solutions clear and relevant?",
  },
  plan: {
    badge: "3a",
    instruction:
      "Look at the descriptors for grammatical range and accuracy on page 190. What's the difference between range and accuracy? Read the essay question in Exercise 2a again. Make a plan of your answer. What range of grammatical forms is suitable for this essay?",
    rangeTip: "Range = the variety of grammar used. Accuracy = how correct the grammar is.",
  },
  errors: {
    badge: "4",
    instruction:
      "Read the paragraph and find six more mistakes.",
    flawed:
      "believe Oue issue lith people tko Are believing that doctors skould be respousible for their heAlth % that it creates 4 burden on the heAlthcare service this is becAuse people go to the doctor more And more instead of think; kol they can help themselves: Jhis must possibly} be solved by patients having to pAU for treatment if thej hAve coutributed to the illness, such 48 smoker-related illnesses Also, people could be given more education And Advice on hol they cAK MAke their lifestyles healthier by eat lell Aud exercise. Governments could put money into encouaging people to do this more.",
    model:
      "One issue with people who believe that doctors should be responsible for their health is that it creates a burden on the healthcare service. This is because people go to the doctor more and more instead of thinking how they can help themselves. This could possibly be solved by patients having to pay for treatment if they have contributed to the illness, such as smoker-related illnesses. Also, people could be given more education and advice on how they can make their lifestyles healthier by eating well and exercising. Governments could put money into encouraging people to do this more.",
  },
  modalPassive: {
    badge5a: "5a",
    extract: "Also, people could be given more education and advice",
    structureOptions: [
      "modal of deduction",
      "modal passive",
      "future modal",
    ],
    structureKey: 1,
    rule:
      "Complete the rule: Modal verb + be + past participle. This kind of language is often used to write about solutions.",
    items: [
      {
        id: 1,
        prompt:
          "People must understand the benefits of eating well.",
        done: "The benefits of eating well must be understood.",
      },
      {
        id: 2,
        prompt:
          "Doctors cannot persuade people to try making lifestyle changes.",
        answers: [
          "people cannot be persuaded (by doctors) to try making lifestyle changes",
          "people cannot be persuaded to try making lifestyle changes",
        ],
      },
      {
        id: 3,
        prompt:
          "People can find a lot of benefit in regular exercise and healthy eating.",
        answers: [
          "a lot of benefit can be found in regular exercise and healthy eating",
        ],
      },
      {
        id: 4,
        prompt: "We should pay doctors more for the job that they do.",
        answers: ["doctors should be paid more for the job that they do"],
      },
      {
        id: 5,
        prompt: "We could educate patients on healthy living.",
        answers: ["patients could be educated on healthy living"],
      },
    ],
  },
  write: {
    badge: "6",
    heading: "Write your problem and solution essay",
    instruction:
      "Write your answer to the essay question in Exercise 2a. Write at least 250 words.",
    assess: {
      badge: "7a",
      instruction:
        "Exchange your essay with a partner and review both essays using the following questions.",
      questions: [
        "Does the essay present problems and solutions relevant to the title?",
        "Are the problems explained?",
        "Are the solutions clear?",
        "Does the essay follow a clear structure?",
        "Can you see any grammatical mistakes (e.g. tenses, articles, prepositions)?",
        "Is the punctuation correct?",
        "Can you see any spelling mistakes?",
      ],
      improve:
        "Try to improve your answer. Focus on TWO areas you want to work on.",
    },
  },
};
