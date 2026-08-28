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
                "Before you listen: libraries",
                "3a Underline listening focus",
                "3b Paraphrase options A–C",
                "3c Check with the script",
                "3d Strategy questions",
                "4a Question focus",
                "4b Synonyms for options",
                "Listen: Choose TWO (B, D)",
                "Discussion",
              ],
              pages: "p. 12",
              trainerId: "listening-m1-flow",
              trainerLabel:
                "Learn: Before you listen → 3a–3d → 4a–4b → Choose TWO → Discussion.",
            },
            {
              id: "1a-language",
              skill: "Language development",
              topics: [
                "1a Match synonyms",
                "1b Complete the sentences",
                "2a Prefixes",
                "2b Match meanings",
                "3a Word forms",
                "3b Word formation",
                "4a Paraphrase sentences",
                "4b Discussion",
              ],
              pages: "p. 13",
              trainerId: "language-m1a-flow",
              trainerLabel:
                "Language development · synonyms, prefixes, word formation, paraphrase.",
            },
            {
              id: "1a-writing",
              skill: "Writing",
              topics: [
                "1a Look at the graph",
                "1b Match structures",
                "2a Overview",
                "2b Trend or detail",
                "2c Other trends",
                "3a Plan",
                "Write",
              ],
              pages: "p. 14",
              trainerId: "writing-m1a-flow",
              trainerLabel:
                "Task 1 · women employment + education years · 1a–3a + Write.",
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
                "Before you listen",
                "2a Alternative language",
                "2c Listen",
                "2d Script",
                "3 Alt language",
                "Test practice",
                "Discussion",
              ],
              pages: "p. 15",
              trainerId: "listening-m1b-flow",
              trainerLabel:
                "Section 2 · paraphrase → 01_05 → Test 01_06 (1A 2C · C+D).",
            },
            {
              id: "1b-language",
              skill: "Language development and vocabulary",
              topics: [
                "2a Describe trends",
                "2b Correct graph errors",
                "b Verb forms (1–6)",
                "c Choose the correct option",
              ],
              pages: "p. 16",
              trainerId: "language-m1b-flow",
              trainerLabel:
                "p. 16 · 2a table · 2b peak study times · b verb forms · c italics.",
            },
            {
              id: "1b-speaking",
              skill: "Speaking",
              topics: [
                "1a Picture discussion",
                "1b Decision collocations",
                "1c Your big decision",
                "3 Test practice",
                "4a Assess and improve",
              ],
              pages: "p. 17",
              trainerId: "speaking-m1b-flow",
              trainerLabel:
                "Speaking Part 1 · Vocabulary + Test practice (school / IELTS) + self-check.",
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
              topics: [
                "Lead-in: architecture photo",
                "2a Cue card points",
                "3a Plan notes (mind map)",
                "3b Your notes + speak",
              ],
              pages: "p. 27",
              trainerId: "speaking-m2a-flow",
              trainerLabel:
                "Speaking · Lead-in + cue card + Paris mind map + your notes.",
            },
            {
              id: "2a-listening",
              skill: "Listening",
              topics: [
                "Before you listen: bungee jump",
                "2 Map prepositions",
                "2.2 Listen: Robert & Filipo walks",
                "4 Directions (italics)",
                "5 Match direction phrases",
                "6a Camp Horizon map",
                "6b Label the map (02_03)",
              ],
              pages: "p. 28",
              trainerId: "listening-m2a-flow",
              trainerLabel:
                "Listening Section 1 · map skills + walks + Camp Horizon label.",
            },
            {
              id: "2a-language",
              skill: "Language development",
              topics: [
                "b Passive italics (photos)",
                "c Passive forms (article)",
                "c Rewrite active → passive",
                "3 Discuss (festival / home)",
              ],
              pages: "p. 29",
              trainerId: "language-m2a-flow",
              trainerLabel: "Language · The passive (italics + forms + rewrite + discuss).",
            },
            {
              id: "2a-writing",
              skill: "Writing",
              topics: [
                "1 Lead-in",
                "2a–2d Wind turbine process",
                "3a–3c Active / passive",
                "4 Edible oils process",
              ],
              pages: "p. 30",
              trainerId: "writing-m2a-flow",
              trainerLabel:
                "Writing Task 1 · process diagrams (wind turbine + edible oils).",
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
              topics: [
                "Before you listen",
                "2a–2b Accurate answers",
                "3 Form + map (02_04)",
                "5 Discussion",
              ],
              pages: "p. 31",
              trainerId: "listening-m2b-flow",
              trainerLabel:
                "Listening Section 1 · Turtle Bay Safari Camp (Track 02_04).",
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
              topics: [
                "1 Photos: Catskill / Reef",
                "2a Vocabulary (italics)",
                "2b Speak 2 minutes",
                "Part 2 Cue cards",
                "Model answers",
              ],
              pages: "p. 33",
              trainerId: "speaking-m2b-flow",
              trainerLabel:
                "Speaking Part 2 · photos + vocab + 2-minute talk + cue cards.",
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
              topics: [
                "1 Lead-in: volcano photo",
                "2 Understand the diagram",
                "3 Plan (coherence)",
                "4 Cohesion: Danger in the skies",
                "5 Language 5a–5b",
                "6 Write summary",
              ],
              pages: "pp. 36–37",
              trainerId: "writing-m2b-flow",
              trainerLabel:
                "Writing Task 1 · supervolcano process (diagram + cohesion + write).",
            },
          ],
        },
      ],
      review: {
        label: "Module 2 review",
        pages: "p. 38",
        trainerId: "review-m2-flow",
      },
    },
    {
      id: "module-3",
      number: 3,
      title: "The feel-good factor",
      startPage: "p. 39",
      sections: [
        {
          id: "3a",
          label: "A",
          subtitle: "The mind…",
          blocks: [
            {
              id: "3a-lead-in",
              skill: "Lead-in",
              topics: [
                "Today’s teenagers infographic",
                "Positive vs negative statistics",
                "Psychological vs physical factors",
                "Effect on studying",
                "Compare with your country",
              ],
              pages: "p. 39",
              trainerId: "lead-in-teenagers",
              trainerLabel:
                "Lead-in · Today’s teenagers (USA school students infographic).",
              nextTrainerId: "reading-m3-flow",
            },
            {
              id: "3a-reading",
              skill: "Reading",
              topics: [
                "Before you read: stress",
                "2a–2b Identify the main idea",
                "Matching headings 1–4",
                "Multiple choice (two answers) 5–6",
                "Task analysis + Discussion",
              ],
              pages: "pp. 40–41",
              trainerId: "reading-m3-flow",
              trainerLabel:
                "Prescribing nature · Matching headings + select two answers.",
            },
            {
              id: "3a-vocabulary",
              skill: "Vocabulary",
              topics: [
                "1 Problems and solutions (match)",
                "2 Yoga italics",
                "3a Academic collocations",
                "3b Discuss",
                "4a Idioms match",
                "4b Idiom sentences",
              ],
              pages: "p. 42",
              trainerId: "vocabulary-m3-flow",
              trainerLabel:
                "Vocabulary · Problems and solutions + idioms (p. 42).",
            },
            {
              id: "3a-speaking",
              skill: "Speaking",
              topics: [
                "1a Positivity quiz",
                "1b Half full / half empty",
                "2a Word forms",
                "2b Examiner question",
                "3 Develop techniques",
                "4 Notes + models",
                "5a More Part 3 questions",
              ],
              pages: "p. 43",
              trainerId: "speaking-m3a-flow",
              trainerLabel:
                "Speaking Part 3 · positivity quiz + vocabulary + develop answers.",
            },
            {
              id: "3a-listening",
              skill: "Listening",
              topics: ["Add topics here"],
              pages: "—",
            },
            {
              id: "3a-language",
              skill: "Language development",
              topics: ["Add topics here"],
              pages: "—",
            },
            {
              id: "3a-writing",
              skill: "Writing",
              topics: ["Add topics here"],
              pages: "—",
            },
          ],
        },
        {
          id: "3b",
          label: "B",
          subtitle: "… and body",
          blocks: [
            {
              id: "3b-listening",
              skill: "Listening",
              topics: ["Add topics here"],
              pages: "—",
            },
            {
              id: "3b-language",
              skill: "Language development and vocabulary",
              topics: ["Add topics here"],
              pages: "—",
            },
            {
              id: "3b-speaking",
              skill: "Speaking",
              topics: ["Add topics here"],
              pages: "—",
            },
            {
              id: "3b-reading",
              skill: "Reading",
              topics: ["Add topics here"],
              pages: "—",
            },
            {
              id: "3b-writing",
              skill: "Writing",
              topics: ["Add topics here"],
              pages: "—",
            },
          ],
        },
      ],
      review: {
        label: "Module 3 review",
        pages: "—",
      },
    },
    ...Array.from({ length: 7 }, (_, i) => {
      const n = i + 4;
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
