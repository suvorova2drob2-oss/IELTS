import type { CourseData } from "../../types/module";

export const defaultMindsetCourse: CourseData = {
  courseTitle: "Mindset for IELTS · Level 3",
  modules: [
    {
      id: "unit-1",
      number: 1,
      title: "Urban and Rural Life",
      startPage: "p. 8",
      sections: [
        {
          id: "u1",
          label: "Unit 1",
          subtitle: "Urban and Rural Life",
          blocks: [
            {
              id: "u1-reading",
              skill: "Reading",
              topics: [
                "Lead-in: articles with geographical features",
                "Matching headings · topic sentences",
                "Prefixes",
                "Exam: Cahokia · headings 1–6",
              ],
              pages: "pp. 8–14",
              trainerId: "ms-u1-reading-flow",
              trainerLabel:
                "Lead-in → topic sentences → prefixes → Cahokia matching headings → discussion.",
            },
            {
              id: "u1-writing",
              skill: "Writing",
              topics: [
                "Task 1 line graphs",
                "Tenses for describing trends",
                "Overview and conclusion",
              ],
              pages: "pp. 14–18",
              trainerId: "ms-u1-writing-flow",
              trainerLabel:
                "Lead-in tenses → Task Achievement → critique → conclusions → adj/adv → Exam Task 1.",
            },
            {
              id: "u1-listening",
              skill: "Listening",
              topics: [
                "Synonyms in questions",
                "Predicting answers",
                "Section practice",
              ],
              pages: "pp. 19–24",
              trainerId: "ms-u1-listening-flow",
              trainerLabel:
                "Synonyms → predict gaps → form completion → NOT hear / MC → conditionals → exam (keys only).",
            },
            {
              id: "u1-speaking",
              skill: "Speaking",
              topics: [
                "Urban and rural life",
                "Part 1–3 practice",
              ],
              pages: "pp. 25–28",
              trainerId: "ms-u1-speaking-flow",
              trainerLabel:
                "Speaking quiz → Part 1 / 2 / 3 → future time phrases → exam practice.",
            },
          ],
        },
      ],
      review: { label: "Unit 1 review", pages: "—" },
    },
    {
      id: "unit-2",
      number: 2,
      title: "Health",
      startPage: "p. 30",
      sections: [
        {
          id: "u2",
          label: "Unit 2",
          subtitle: "Health",
          blocks: [
            {
              id: "u2-reading",
              skill: "Reading",
              topics: [
                "Skimming & scanning",
                "Flow-chart & table completion",
                "Quantifiers · antibiotics exam",
              ],
              pages: "pp. 30–37",
              trainerId: "ms-u2-reading-flow",
              trainerLabel:
                "Suffixes → skim match → flow-chart → table/sentences → quantifiers → antibiotics exam.",
            },
            {
              id: "u2-writing",
              skill: "Writing",
              topics: [
                "Advantages & disadvantages vocab",
                "Topic / supporting ideas",
                "Coherence · Task 2 exam",
              ],
              pages: "pp. 38–41",
              trainerId: "ms-u2-writing-flow",
              trainerLabel:
                "Adv/dis vocab → supporting ideas → discourse markers → intro/conclusion → Task 2.",
            },
            {
              id: "u2-listening",
              skill: "Listening",
              topics: [
                "Section types",
                "Table completion",
                "Quantifiers · Healthy Eating (keys)",
              ],
              pages: "pp. 42–46",
              trainerId: "ms-u2-listening-flow",
              trainerLabel:
                "Sections → table titles → quantifiers → predict → Healthy Eating exam (keys only).",
            },
            {
              id: "u2-speaking",
              skill: "Speaking",
              topics: [
                "Fluency idioms",
                "Part 1 answers",
                "Discourse markers",
              ],
              pages: "pp. 47–51",
              trainerId: "ms-u2-speaking-flow",
              trainerLabel:
                "Fluency idioms → gaps → Part 1 → discourse markers → exam practice.",
            },
          ],
        },
      ],
      review: { label: "Unit 2 review", pages: "—" },
    },
    {
      id: "unit-3",
      number: 3,
      title: "Art and Architecture",
      startPage: "p. 52",
      sections: [
        {
          id: "u3",
          label: "Unit 3",
          subtitle: "Art and Architecture",
          blocks: [
            {
              id: "u3-reading",
              skill: "Reading",
              topics: [
                "Art synonyms · TFNG",
                "Matching paragraphs · MCQ",
                "Past tenses · exam",
              ],
              pages: "pp. 52–58",
              trainerId: "ms-u3-reading-flow",
              trainerLabel:
                "Synonyms → TFNG → paragraph match → past tenses → sculpture exam.",
            },
            {
              id: "u3-writing",
              skill: "Writing",
              topics: [
                "Map change verbs",
                "Land-use categories",
                "Task 1 maps exam",
              ],
              pages: "pp. 59–64",
              trainerId: "ms-u3-writing-flow",
              trainerLabel:
                "Build/change/remove vocab → map categories → markers → tenses → Fosbury Task 1.",
            },
            {
              id: "u3-listening",
              skill: "Listening",
              topics: [
                "Map prepositions",
                "Room vocabulary",
                "Castle / plan labels (keys)",
              ],
              pages: "pp. 65–68",
              trainerId: "ms-u3-listening-flow",
              trainerLabel:
                "Prepositions → rooms → map labels → castle → exam keys.",
            },
            {
              id: "u3-speaking",
              skill: "Speaking",
              topics: [
                "Part 2 notes",
                "Signposting",
                "Creative person",
              ],
              pages: "pp. 69–72",
              trainerId: "ms-u3-speaking-flow",
              trainerLabel:
                "Y/N/NS quiz → Part 2 signposting → creative person exam.",
            },
          ],
        },
      ],
      review: { label: "Unit 3 review", pages: "—" },
    },
    {
      id: "unit-4",
      number: 4,
      title: "Finance and Business",
      startPage: "p. 73",
      sections: [
        {
          id: "u4",
          label: "Unit 4",
          subtitle: "Finance and Business",
          blocks: [
            {
              id: "u4-reading",
              skill: "Reading",
              topics: [
                "Finance vocab",
                "Matching features",
                "Global MCQ · modals · work exam",
              ],
              pages: "pp. 73–78",
              trainerId: "ms-u4-reading-flow",
              trainerLabel:
                "Finance vocab → matching features → global MCQ → modals → working life exam.",
            },
            {
              id: "u4-writing",
              skill: "Writing",
              topics: [
                "Financial responsibility",
                "Essay types · sequencing",
                "Task 2 exam",
              ],
              pages: "pp. 79–83",
              trainerId: "ms-u4-writing-flow",
              trainerLabel:
                "Lead-in → essay types → sequencing → intro/conclusion → Task 2 finance.",
            },
            {
              id: "u4-listening",
              skill: "Listening",
              topics: [
                "Finance forms",
                "MCQ strategy",
                "Exam review (keys)",
              ],
              pages: "pp. 84–87",
              trainerId: "ms-u4-listening-flow",
              trainerLabel:
                "Predict gaps → form/notes bank → MCQ strategy → exam review (keys only).",
            },
            {
              id: "u4-speaking",
              skill: "Speaking",
              topics: [
                "Money & work",
                "Part 3 speculation",
                "Finance vocabulary",
              ],
              pages: "pp. 88–92",
              trainerId: "ms-u4-speaking-flow",
              trainerLabel:
                "Lead-in → Part 1–2 strategy → Part 3 phrases → vocab → exam practice.",
            },
          ],
        },
      ],
      review: { label: "Unit 4 review", pages: "—" },
    },
    {
      id: "unit-5",
      number: 5,
      title: "History",
      startPage: "p. 93",
      sections: [
        {
          id: "u5",
          label: "Unit 5",
          subtitle: "History",
          blocks: [
            {
              id: "u5-reading",
              skill: "Reading",
              topics: [
                "Claims and views",
                "Select from a list · Yes/No/Not Given",
                "Second / third / mixed conditionals",
              ],
              pages: "pp. 93–99",
              trainerId: "ms-u5-reading-flow",
              trainerLabel:
                "Lead-in royalty → odd one out → skim → claims & list → Y/N/NG → conditionals → Pharaohs exam.",
            },
            {
              id: "u5-writing",
              skill: "Writing",
              topics: [
                "Tables and bar charts",
                "Linkers for Coherence and Cohesion",
                "Avoiding repetition",
              ],
              pages: "pp. 100–104",
              trainerId: "ms-u5-writing-flow",
              trainerLabel:
                "Industry terms → coal mines → linkers → Exam Task 1 UK workforce.",
            },
            {
              id: "u5-listening",
              skill: "Listening",
              topics: [
                "Time phrases",
                "Select from a list",
                "Attitude and multiple matching",
              ],
              pages: "pp. 105–109",
              trainerId: "ms-u5-listening-flow",
              trainerLabel:
                "Time phrases → Tower select → attitude → opinion → exam matching (keys only).",
            },
            {
              id: "u5-speaking",
              skill: "Speaking",
              topics: [
                "Historical time expressions",
                "Part 2 GRA",
                "Agree / disagree in Part 3",
              ],
              pages: "pp. 110–113",
              trainerId: "ms-u5-speaking-flow",
              trainerLabel:
                "Time periods → Part 2 → grammar fixes → Part 3 openers → exam practice.",
            },
          ],
        },
      ],
      review: { label: "Unit 5 review", pages: "—" },
    },
    {
      id: "unit-6",
      number: 6,
      title: "Science and Technology",
      startPage: "p. 114",
      sections: [
        {
          id: "u6",
          label: "Unit 6",
          subtitle: "Science and Technology",
          blocks: [
            {
              id: "u6-reading",
              skill: "Reading",
              topics: [
                "Word formation",
                "Summary completion",
                "Prediction language",
              ],
              pages: "pp. 114–121",
              trainerId: "ms-u6-reading-flow",
              trainerLabel:
                "Word form → summary ± options → short answers → exam skills.",
            },
            {
              id: "u6-writing",
              skill: "Writing",
              topics: [
                "Advise / suggest / recommend",
                "Despite / although",
                "Task 2 discussion",
              ],
              pages: "pp. 122–126",
              trainerId: "ms-u6-writing-flow",
              trainerLabel:
                "Reporting verbs → Task Response → cohesion → Exam Task 2.",
            },
            {
              id: "u6-listening",
              skill: "Listening",
              topics: [
                "Agreement phrases",
                "Note completion",
                "Purpose linkers",
              ],
              pages: "pp. 127–132",
              trainerId: "ms-u6-listening-flow",
              trainerLabel:
                "Map questions → attitude → notes → purpose linkers → exam (keys only).",
            },
            {
              id: "u6-speaking",
              skill: "Speaking",
              topics: [
                "Inventions",
                "Verb patterns (to / -ing)",
                "Buying time in Part 3",
              ],
              pages: "pp. 133–138",
              trainerId: "ms-u6-speaking-flow",
              trainerLabel:
                "Inventions → verb patterns → strategy → exam practice.",
            },
          ],
        },
      ],
      review: { label: "Unit 6 review", pages: "—" },
    },
    {
      id: "unit-7",
      number: 7,
      title: "Television, News and Current Affairs",
      startPage: "p. 139",
      sections: [
        {
          id: "u7",
          label: "Unit 7",
          subtitle: "Television, News and Current Affairs",
          blocks: [
            {
              id: "u7-reading",
              skill: "Reading",
              topics: [
                "Media vocabulary",
                "Matching / short answers",
                "Citizen journalism",
              ],
              pages: "pp. 139–145",
              trainerId: "ms-u7-reading-flow",
              trainerLabel:
                "Vocab match → paragraphs → short answers → MC → discussion.",
            },
            {
              id: "u7-writing",
              skill: "Writing",
              topics: [
                "Pie charts",
                "Proportion language",
                "UK vs Brazil news sources",
              ],
              pages: "pp. 146–149",
              trainerId: "ms-u7-writing-flow",
              trainerLabel:
                "Platforms → figures → structure → Exam Task 1 pie charts.",
            },
            {
              id: "u7-listening",
              skill: "Listening",
              topics: [
                "Section 4 news talks",
                "Notes within word limits",
                "Paraphrase prediction",
              ],
              pages: "pp. 150–154",
              trainerId: "ms-u7-listening-flow",
              trainerLabel:
                "Lead-in → note keys → strategy → exam (keys only).",
            },
            {
              id: "u7-speaking",
              skill: "Speaking",
              topics: [
                "TV and news habits",
                "Self-correction",
                "Part 3 media opinions",
              ],
              pages: "pp. 155–159",
              trainerId: "ms-u7-speaking-flow",
              trainerLabel:
                "Part 1–2 → phrases → Part 3 → exam advice.",
            },
          ],
        },
      ],
      review: { label: "Unit 7 review", pages: "—" },
    },
    {
      id: "unit-8",
      number: 8,
      title: "Culture",
      startPage: "p. 160",
      sections: [
        {
          id: "u8",
          label: "Unit 8",
          subtitle: "Culture",
          blocks: [
            {
              id: "u8-reading",
              skill: "Reading",
              topics: [
                "Youth cultures",
                "Matching headings",
                "Yes / No / Not Given",
              ],
              pages: "pp. 160–166",
              trainerId: "ms-u8-reading-flow",
              trainerLabel:
                "Paper quiz → info match → headings → Y/N/NG → exam MC.",
            },
            {
              id: "u8-writing",
              skill: "Writing",
              topics: [
                "Process sequencers",
                "Passives / relative clauses",
                "Culture Task 2",
              ],
              pages: "pp. 167–172",
              trainerId: "ms-u8-writing-flow",
              trainerLabel:
                "Sequencers → opinion phrases → process grammar → Exam Task 2.",
            },
            {
              id: "u8-listening",
              skill: "Listening",
              topics: [
                "Culture talks",
                "Outline completion",
                "Matching",
              ],
              pages: "pp. 173–177",
              trainerId: "ms-u8-listening-flow",
              trainerLabel:
                "Lead-in → outline keys → tip → exam (keys only).",
            },
            {
              id: "u8-speaking",
              skill: "Speaking",
              topics: [
                "Avoid memorised answers",
                "Buying time",
                "Language and culture",
              ],
              pages: "pp. 178–184",
              trainerId: "ms-u8-speaking-flow",
              trainerLabel:
                "Advice → buying time → Part 2–3 → exam practice.",
            },
          ],
        },
      ],
      review: { label: "Unit 8 review", pages: "—" },
    },
  ],
};
