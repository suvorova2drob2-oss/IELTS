import { PASSAGE_U4_CRASH, PASSAGE_U4_WORKING_LIFE } from "./readingPassages";
export const MS_U4_READ_STEPS = [
  "Lead-in · finance vocab",
  "Matching features",
  "Global MCQ",
  "Modals",
  "Exam · match",
  "Exam · title",
  "Discussion",
] as const;

export const MS_U4_READ_NEXT = [
  "Matching →",
  "Global →",
  "Modals →",
  "Exam match →",
  "Exam title →",
  "Discussion →",
  "← Back to unit",
] as const;

export const readingU4 = {
  id: "ms-u4-reading-flow",
  bookPages: "pp. 73–78",
  sectionTitle: "Reading · Matching features · Global MCQ",
  unitGoals: [
    "successfully answer matching features questions",
    "develop whole-text understanding for global multiple-choice",
    "consider modals of obligation — present and past",
  ],
  steps: [
    {
      kind: "intro" as const,
      badge: "LEAD-IN",
      instruction:
        "Discuss similarities and differences: financial crash / recession; loan / mortgage; regulations / laws; go bankrupt / go bust; borrower / lender; savings / investments.",
      bullets: [
        "A loan is borrowed for any purpose; a mortgage is specifically to buy property.",
        "Laws are government instructions for everyone; regulations can be part of them.",
        "Go bust is more informal than go bankrupt.",
        "A lender gives a loan; a borrower receives one.",
        "Savings are safer; investments aim for profit with more risk.",
      ],
    },
    {
      kind: "match" as const,
      badge: "5–6",
      instruction:
        "Match each statement with the correct person: A Alicia Pillory · B Dr Alfred Moran · C Charles Vane.",
      passage: PASSAGE_U4_CRASH,
      bank: ["A", "B", "C"],
      items: [
        { id: "1", stem: "The plan to make more people wealthy from mortgage repayments was foolish.", key: "A" },
        { id: "2", stem: "The credit ratings agencies did not fulfil their essential reason for existing.", key: "C" },
        { id: "3", stem: "The investment banks are not solely responsible for the problems that caused the crash.", key: "C" },
        { id: "4", stem: "The bankers' careless way of working was essentially exploitation from which they got more wealthy.", key: "A" },
        { id: "5", stem: "Accepting the false assurance of AAA ratings without question badly damaged the global economy.", key: "B" },
        { id: "6", stem: "Government failure to end the problem led to another profit-driven industry becoming involved.", key: "A" },
      ],
      tip: "Q7 opinion about borrowers is Charles Vane's view (reported), not necessarily the writer's.",
    },
    {
      kind: "mcq" as const,
      badge: "8–10",
      instruction: "Global multiple-choice — main idea, paragraph purpose, best title.",
      passage: PASSAGE_U4_CRASH,
      items: [
        {
          id: "8",
          stem: "Best summary of the passage?",
          options: [
            { id: "A", text: "Focus on debtors' prisons then and now" },
            { id: "B", text: "Chinese vs Western saving habits" },
            { id: "C", text: "The global financial crisis was created by a number of groups and has had only negative effects" },
            { id: "D", text: "Worldwide wrong attitudes to financial responsibility" },
          ],
          key: "C",
        },
        {
          id: "9",
          stem: "Function of bringing three writers together?",
          options: [
            { id: "A", text: "Compare 19th-century and modern saving" },
            { id: "B", text: "Three differing views summarised on the topic" },
            { id: "C", text: "Criticise only investment banks" },
            { id: "D", text: "Commit to one single cause" },
          ],
          key: "B",
        },
        {
          id: "10",
          stem: "Best title?",
          options: [
            { id: "A", text: "Debt through the modern era" },
            { id: "B", text: "Banks alone caused the recession" },
            { id: "C", text: "Disasters in finance and investment" },
            { id: "D", text: "Where does the responsibility for the crash lie?" },
          ],
          key: "D",
        },
      ],
    },
    {
      kind: "gaps" as const,
      badge: "12",
      instruction: "Complete with the correct modal forms.",
      bank: [
        "have to",
        "shouldn't have",
        "must be",
        "ought to have got",
        "are supposed to sign in",
      ],
      items: [
        { id: "1", stem: "Employees ______ wear an ID badge.", key: "have to" },
        { id: "2", stem: "They ______ lent so much without checks.", key: "shouldn't have", alts: ["should not have"] },
        { id: "3", stem: "There ______ a better way to regulate banks.", key: "must be" },
        { id: "4", stem: "She ______ a receipt before leaving.", key: "ought to have got" },
        { id: "5", stem: "Visitors ______ at reception.", key: "are supposed to sign in" },
      ],
    },
    {
      kind: "match" as const,
      badge: "EXAM 13",
      instruction:
        "Look at the following statements and the list of studies below. Match each statement with the correct study, A–C. A Employment as a Myth · B Unfair Returns · C How the Market Adjusts to Opportunity",
      passage: PASSAGE_U4_WORKING_LIFE,
      bank: [
        "A Employment as a Myth",
        "B Unfair Returns",
        "C How the Market Adjusts to Opportunity",
      ],
      items: [
        {
          id: "1",
          stem: "Unlike in previous years, a willingness to experiment with a wide range of possible roles is visible in all groups of job-seekers.",
          key: "C How the Market Adjusts to Opportunity",
        },
        {
          id: "2",
          stem: "Younger people are being denied the chance to develop the social skills necessary for the modern office environment.",
          key: "B Unfair Returns",
        },
        {
          id: "3",
          stem: "Many modern positions can be more easily terminated than ever before.",
          key: "B Unfair Returns",
        },
        {
          id: "4",
          stem: "Claims of economic expansion are demonstrably incorrect.",
          key: "A Employment as a Myth",
        },
        {
          id: "5",
          stem: "An unforeseen problem has led to an increase in the number of people available to work.",
          key: "A Employment as a Myth",
        },
        {
          id: "6",
          stem: "Much of today's workforce do not feel constrained by a lack of familiarity with a new position.",
          key: "A Employment as a Myth",
        },
        {
          id: "7",
          stem: "Refusal to conform to traditional behaviour models at work is a positive step.",
          key: "C How the Market Adjusts to Opportunity",
        },
      ],
    },
    {
      kind: "mcq" as const,
      badge: "EXAM 13 · Q8",
      instruction: "What is the best title for this passage?",
      passage: PASSAGE_U4_WORKING_LIFE,
      items: [
        {
          id: "8",
          stem: "What is the best title for this passage?",
          options: [
            { id: "A", text: "The Conflict between Young and Old in the Workplace" },
            { id: "B", text: "Modern Employment: the Need for Adaptability" },
            { id: "C", text: "The Changing Face of Working Life" },
            { id: "D", text: "What Today's Workforce Really Wants" },
          ],
          key: "C",
        },
      ],
    },
    {
      kind: "discuss" as const,
      heading: "Discussion",
      prompts: [
        "Who do you think was most responsible for the 2008 crash — banks, agencies, insurers, or borrowers?",
        "How has working life changed for older and younger workers in your country?",
      ],
    },
  ],
};
