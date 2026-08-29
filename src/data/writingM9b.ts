export const WRITE_M9B_STEPS = [
  "1 Workplaces",
  "2a Plans / features",
  "3a–3c Structure",
  "4a–4b Vocabulary",
  "5 Plan + write",
  "6 Peer review",
] as const;

export const WRITE_M9B_NEXT = [
  "2a Plans →",
  "3 Structure →",
  "4 Vocabulary →",
  "5 Write →",
  "6 Peer →",
  "← К модулю",
] as const;

export const writingM9b = {
  id: "writing-m9b-flow",
  bookPages: "pp. 148–149 in your coursebook",
  sectionTitle: "Writing · Task 1 (office plans 1975 / 2015)",
  expertWriting: "EXPERT WRITING page 199",
  cartoon1: {
    badge: "1",
    heading: "Lead-in",
    instruction:
      "Discuss: Have workplaces become more colourful and relaxed? Do plants, sofas and open spaces help innovation — or encourage too much chatting?",
    tip: "Suggested: Modern workplaces often look more engaging; plants and relaxation areas may support collaboration, but if too relaxed, efficiency can fall. Strike the right balance.",
  },
  forAgainst2a: {
    badge: "2a",
    instruction:
      "Read statements about the 1975 and 2015 office plans. Mark each as more true of 1975 (for = older hierarchical layout) or 2015 (against = older / for open modern — use for = 1975 feature, against = 2015 feature).",
    title:
      "The diagrams show the office plans for a UK company in 1975 and 2015. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    items: [
      {
        id: 1,
        text: "Sales, accounts and the director were in separate offices; kitchen and copy room were partitioned.",
        key: "for",
      },
      {
        id: 2,
        text: "There was a conference room and managers had individual offices.",
        key: "for",
      },
      {
        id: 3,
        text: "The office became more open-plan; most employees shared one large room (except the CEO).",
        key: "against",
      },
      {
        id: 4,
        text: "Sales and accounts merged into the same area.",
        key: "against",
      },
      {
        id: 5,
        text: "The HR office was converted into an outdoor terrace; kitchen/copy facilities moved into the main space.",
        key: "against",
      },
      {
        id: 6,
        text: "Seating rules were stricter and teams were kept in separate rooms.",
        key: "for",
      },
      {
        id: 7,
        text: "A large table and chairs were added near the kitchen facilities.",
        key: "against",
      },
    ],
  },
  structure3: {
    badge: "3a–3c",
    instruction:
      "Discuss band descriptors and how to organise a Task 1 comparison of two plans. Which approach is better?",
    descriptors: [
      {
        id: 1,
        q: "Summarise the information",
        key: "A",
        tip: "Overview / introduction",
      },
      {
        id: 2,
        q: "Select and report main features",
        key: "B",
        tip: "Main body",
      },
      {
        id: 3,
        q: "Make comparisons where relevant",
        key: "B",
        tip: "Main body",
      },
      {
        id: 4,
        q: "Write at least 150 words",
        key: "A",
        tip: "Throughout",
      },
      {
        id: 5,
        q: "Group by employee areas vs facilities?",
        key: "A",
        tip: "Yes — compare sections of the two plans; highlight major differences with examples.",
      },
    ],
    betterStructure: "2",
    structureTip:
      "Structure 2 is better: overview of change over 40 years, then 1975 features, then 2015 features, then a short summary of how space was opened up. Avoid listing every tiny object without comparison.",
  },
  conclusions4: {
    badge: "4a–4b",
    instruction:
      "Match / check office vocabulary, then decide which summary points belong in a strong overview.",
    important: "Use: integration, contemporary, hierarchical, partition, functional, open-plan.",
    options: [
      {
        id: "A",
        text: "Weak overview — only lists furniture without comparing 1975 and 2015.",
      },
      {
        id: "B",
        text: "Strong overview — notes major shift from partitioned hierarchical rooms to open-plan integrated space.",
      },
    ],
    best: "B",
    tip: "4a keys: 1 integration · 2 contemporary · 3 hierarchical · 4 partition · 5 functional · 6 open-plan. Best overview = B.",
  },
  write5: {
    badge: "5",
    plan: {
      badge: "5a",
      instruction: "Make a plan (about 5 minutes). Do not start writing yet.",
      tip: "Intro = what plans show + 40-year change. P1 = 1975 separate roles / partitioned rooms. P2 = 2015 open-plan, merged teams, terrace, shared facilities. Summary = space opened up.",
    },
    write: {
      badge: "b",
      instruction: "Write your report (about 15 minutes). Write at least 150 words.",
    },
    modelLabel: "Model answer",
    modelAnswer: `The diagrams show the office plans for a UK company for the years 1975 and 2015. The plans show how the office layout changed over the period of 40 years.

In the 1975 office plans, it can be seen that some areas were separated according to different roles. For example, the sales teams, accounts and director were all in separate offices. Also, the kitchen and copy room were partitioned into individual rooms and there was a conference room.

Looking at the office plan for 2015, we can see that the office was more open-plan. All employees were essentially located within one large room, with the exception of the CEO. Some teams, such as sales and accounts, had also merged and were working in the same area. Furthermore, the HR team’s old office had been converted into an outdoor terrace, and facilities such as the kitchen and copy room have been incorporated into the main work space. Added to this, a large table and chairs had been added near to the kitchen facilities.

In summary, looking at the changes which had occurred to the office plans over the period, it can be noted that the company made major changes to how space was organised and that in the modern office plan, the framework of the floor plan had been opened up.`,
  },
  peer6: {
    badge: "6a–6b",
    instruction:
      "Swap reports with a partner. Check organisation, comparisons, vocabulary (open-plan, partitioned, etc.), word count (≥150) and accuracy of data. Suggest one improvement.",
  },
};
