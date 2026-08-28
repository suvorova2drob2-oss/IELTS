import type { CourseData } from "../types/module";

export const defaultCourse: CourseData = {
  courseTitle: "Expert IELTS 7.5",
  modules: [
    {
      id: "module-1",
      number: 1,
      title: "Lifelong learning",
      startPage: "p. 7",
      sections: [
        {
          id: "1a",
          label: "A",
          subtitle: "Successful learning",
          blocks: [
            {
              id: "1a-lead-in",
              skill: "Lead-in",
              topics: [
                "Define intelligence",
                "Types of intelligence in photos",
                "Can intelligence be measured?",
              ],
              pages: "p. 7",
              trainerId: "lead-in-intelligence",
              trainerLabel: "Обсуждение перед модулем — 4 фото",
              nextTrainerId: "reading-m1-flow",
            },
            {
              id: "1a-reading",
              skill: "Reading",
              topics: [
                "Before you read: predict",
                "Read the passage (book)",
                "Scan for information",
                "Note and table completion",
              ],
              pages: "pp. 8–9",
              trainerId: "reading-m1-flow",
              trainerLabel:
                "Exam: текст + вопросы 1–9 рядом. Learn: warm-up → scan → задание → discussion.",
            },
            {
              id: "1a-vocabulary",
              skill: "Vocabulary",
              topics: [
                "The language of learning",
                "Collocations",
                "Dictionary skills",
              ],
              pages: "p. 10",
              trainerId: "vocabulary-m1-flow",
              trainerLabel: "Vocabulary p. 10 — 1a–1c, Collocations, 3a–3b, Dictionary",
            },
            {
              id: "1a-speaking",
              skill: "Speaking",
              topics: [
                "Use a range of tenses",
                "Use a range of vocabulary",
                "Word stress (Part 1)",
              ],
              pages: "p. 11",
            },
            {
              id: "1a-listening",
              skill: "Listening",
              topics: [
                "Recognise paraphrasing",
                "Section 2 tasks: Multiple choice",
                "Select from a list",
              ],
              pages: "p. 12",
            },
            {
              id: "1a-language",
              skill: "Language development",
              topics: [
                "Synonyms",
                "Prefixes",
                "Word formation",
                "Paraphrase sentences",
              ],
              pages: "p. 13",
            },
            {
              id: "1a-writing",
              skill: "Writing",
              topics: [
                "Structure your answer",
                "Summarise features (Task 1)",
              ],
              pages: "p. 14",
            },
          ],
        },
        {
          id: "1b",
          label: "B",
          subtitle: "Untapped resources",
          blocks: [
            {
              id: "1b-listening",
              skill: "Listening",
              topics: [
                "Section 2: Multiple choice",
                "Select from a list",
              ],
              pages: "p. 15",
            },
            {
              id: "1b-language",
              skill: "Language development and vocabulary",
              topics: [
                "2a Go up / Go down / No movement",
                "b Verb forms",
              ],
              pages: "p. 16",
              trainerId: "language-m1b-flow",
              trainerLabel:
                "p. 16 Describe trends · 2a table, then b verb forms.",
            },
            {
              id: "1b-speaking",
              skill: "Speaking",
              topics: ["Part 1: Talk about studying"],
              pages: "p. 17",
            },
            {
              id: "1b-reading",
              skill: "Reading",
              topics: [
                "Before you read: True/False",
                "Scan the first paragraph",
                "Table and note completion",
                "Discussion",
              ],
              pages: "pp. 18–19",
              trainerId: "reading-m1b-flow",
              trainerLabel:
                "Untapped resources · The learning brain. Exam: текст + вопросы 1–9 рядом. Learn: warm-up → scan → задание → discussion.",
            },
            {
              id: "1b-writing",
              skill: "Writing",
              topics: [
                "Understand the graph",
                "Main features",
                "Overview + language",
                "Write 150 words",
              ],
              pages: "pp. 20–21",
              trainerId: "writing-m1b-flow",
              trainerLabel:
                "Task 1 line graph · UK employment by education. Exam: график + письмо. Learn: оси → features → overview → 150 слов.",
            },
          ],
        },
      ],
      review: {
        label: "Module 1 review",
        pages: "p. 22",
        trainerId: "review-m1-flow",
      },
    },
    {
      id: "module-2",
      number: 2,
      title: "A world of change",
      startPage: "p. 23",
      sections: [
        {
          id: "2a",
          label: "A",
          subtitle: "Development",
          blocks: [
            {
              id: "2a-lead-in",
              skill: "Lead-in",
              topics: [
                "Living standards around the world",
                "What development means",
                "Personal vs social development",
              ],
              pages: "p. 23",
              trainerId: "lead-in-development",
              trainerLabel: "Обсуждение перед модулем — 3 фото: здоровье, энергия, медицина",
              nextTrainerId: "reading-m2-flow",
            },
            {
              id: "2a-reading",
              skill: "Reading",
              topics: [
                "Before you read: discuss",
                "Topic sentences and supporting details",
                "True / False / Not Given 1–5",
                "Short-answer questions 6–10",
              ],
              pages: "pp. 24–25",
              trainerId: "reading-m2-flow",
              trainerLabel:
                "A better life? · Agricultural Revolution. Exam: текст + TFNG 1–5 и short answers 6–10. Learn: discuss → topic sentences → задание → discussion.",
            },
            {
              id: "2a-vocabulary",
              skill: "Vocabulary",
              topics: [
                "Academic verbs 1a–1b",
                "Written and spoken 2a–2c",
                "Process verbs 3a–3b",
              ],
              pages: "p. 26",
              trainerId: "vocabulary-m2-flow",
              trainerLabel:
                "p. 26 Academic verbs, spoken forms, process word forms.",
            },
            {
              id: "2a-speaking",
              skill: "Speaking",
              topics: ["Extend your answers", "Part 1 practice"],
              pages: "p. 27",
            },
            {
              id: "2a-listening",
              skill: "Listening",
              topics: ["Section 3: Multiple choice", "Note completion"],
              pages: "p. 28",
            },
            {
              id: "2a-language",
              skill: "Language development",
              topics: ["Noun phrases", "Cause and effect"],
              pages: "p. 29",
            },
            {
              id: "2a-writing",
              skill: "Writing",
              topics: ["Task 2: Opinion essay structure"],
              pages: "p. 30",
            },
          ],
        },
        {
          id: "2b",
          label: "B",
          subtitle: "Testing skills",
          blocks: [
            {
              id: "2b-listening",
              skill: "Listening",
              topics: ["Section 3 practice"],
              pages: "p. 31",
            },
            {
              id: "2b-language",
              skill: "Language development and vocabulary",
              topics: ["Review collocations"],
              pages: "p. 32",
            },
            {
              id: "2b-speaking",
              skill: "Speaking",
              topics: ["Part 2: Cue card"],
              pages: "p. 33",
            },
            {
              id: "2b-reading",
              skill: "Reading",
              topics: [
                "Before you read: tiger, bee, bush baby",
                "True / False / Not Given 1–5",
                "Short answers 6–9",
              ],
              pages: "pp. 34–35",
              trainers: [
                {
                  id: "lead-in-insect-empire",
                  label: "Before you read (p. 34)",
                },
                {
                  id: "reading-m2b-flow",
                  label: "The Insect Empire · Exam 1–9",
                },
              ],
              trainerLabel:
                "The Insect Empire · Before you read → текст + TFNG 1–5 + short 6–9",
              nextTrainerId: "reading-m2b-flow",
            },
            {
              id: "2b-writing",
              skill: "Writing",
              topics: ["Task 2: Full essay"],
              pages: "pp. 36–37",
            },
          ],
        },
      ],
      review: {
        label: "Module 2 review",
        pages: "p. 38",
      },
    },
    ...Array.from({ length: 8 }, (_, i) => {
      const n = i + 3;
      return {
        id: `module-${n}`,
        number: n,
        title: `Module ${n} topic`,
        startPage: `p. ${20 + n * 16}`,
        sections: [
          {
            id: `${n}a`,
            label: "A",
            subtitle: "Training — fill in your content",
            blocks: [
              {
                id: `${n}a-reading`,
                skill: "Reading",
                topics: ["Add topics here"],
                pages: "—",
              },
              {
                id: `${n}a-vocabulary`,
                skill: "Vocabulary",
                topics: ["Add topics here"],
                pages: "—",
              },
              {
                id: `${n}a-speaking`,
                skill: "Speaking",
                topics: ["Add topics here"],
                pages: "—",
              },
              {
                id: `${n}a-listening`,
                skill: "Listening",
                topics: ["Add topics here"],
                pages: "—",
              },
              {
                id: `${n}a-language`,
                skill: "Language development",
                topics: ["Add topics here"],
                pages: "—",
              },
              {
                id: `${n}a-writing`,
                skill: "Writing",
                topics: ["Add topics here"],
                pages: "—",
              },
            ],
          },
          {
            id: `${n}b`,
            label: "B",
            subtitle: "Testing — fill in your content",
            blocks: [
              {
                id: `${n}b-listening`,
                skill: "Listening",
                topics: ["Add topics here"],
                pages: "—",
              },
              {
                id: `${n}b-language`,
                skill: "Language development and vocabulary",
                topics: ["Add topics here"],
                pages: "—",
              },
              {
                id: `${n}b-speaking`,
                skill: "Speaking",
                topics: ["Add topics here"],
                pages: "—",
              },
              {
                id: `${n}b-reading`,
                skill: "Reading",
                topics: ["Add topics here"],
                pages: "—",
              },
              {
                id: `${n}b-writing`,
                skill: "Writing",
                topics: ["Add topics here"],
                pages: "—",
              },
            ],
          },
        ],
        review: {
          label: `Module ${n} review`,
          pages: "—",
        },
      };
    }),
  ],
};
