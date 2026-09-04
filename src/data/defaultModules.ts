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
              topics: [
                "1 Before you listen: quotes",
                "2a–2b Preview + analyse questions",
                "2c Match paraphrases",
                "3 Exam task 1–9 (no audio yet)",
                "4 Task analysis",
                "5 Discussion",
              ],
              pages: "p. 44",
              trainerId: "listening-m3a-flow",
              trainerLabel:
                "Listening Section 4 · meditation (prep + exam).",
            },
            {
              id: "3a-language",
              skill: "Language development",
              topics: [
                "1a Real / unreal conditionals",
                "1b Types + 1c MCQ",
                "2 Supersize Me gap fill",
                "3a Match + 3b real / unreal",
                "4 otherwise / unless / …",
                "5 Rewrite sentences",
              ],
              pages: "p. 44–45",
              trainerId: "language-m3a-flow",
              trainerLabel:
                "Conditionals · real / unreal review + other ways to express conditionality.",
            },
            {
              id: "3a-writing",
              skill: "Writing",
              topics: [
                "1 Lead-in",
                "2 Structures",
                "3a Problems / solutions",
                "3b Functions",
                "3c Your paragraph",
                "4a Order sentences",
                "4b Solution sentences",
                "5 Write essay",
              ],
              pages: "p. 46–47",
              trainerId: "writing-m3a-flow",
              trainerLabel:
                "Task 2 · problems & solutions (elderly / communities).",
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
              topics: [
                "1 Before you listen",
                "2 Wrong answers",
                "3a Preview questions",
                "3b Exam task (no audio yet)",
                "4 Task analysis",
              ],
              pages: "p. 48",
              trainerId: "listening-m3b-flow",
              trainerLabel:
                "Section 4 · alternative medicine (prep + exam).",
            },
            {
              id: "3b-language",
              skill: "Language development and vocabulary",
              topics: [
                "1a Certainty scale",
                "1b Modal meanings",
                "2 Italics text",
                "3 Modal gaps",
                "4a–4b Adverbs",
                "4c–4d Perspective",
              ],
              pages: "p. 49–50",
              trainerId: "language-m3b-flow",
              trainerLabel:
                "Modals · degrees of certainty + adverbs of attitude.",
            },
            {
              id: "3b-speaking",
              skill: "Speaking",
              topics: [
                "1 Lead-in photo",
                "2 Global health gap fill",
                "3 Part 3 prep",
                "4 Part 3 practice",
                "5 Assess lexical range",
              ],
              pages: "p. 49",
              trainerId: "speaking-m3b-flow",
              trainerLabel:
                "Speaking Part 3 · social health + gap fill + Part 3 lists.",
            },
            {
              id: "3b-reading",
              skill: "Reading",
              topics: [
                "Before you read",
                "Matching headings 1–5",
                "Multiple choice (two answers) 6–7",
                "Task analysis",
                "Discussion",
              ],
              pages: "pp. 50–51",
              trainerId: "reading-m3b-flow",
              trainerLabel:
                "A growing preoccupation · headings + select two answers.",
            },
            {
              id: "3b-writing",
              skill: "Writing",
              topics: [
                "1 Lead-in quote",
                "2 Understand task",
                "3 Plan",
                "4 Error correction",
                "5 Modal passive",
                "6 Write essay",
              ],
              pages: "pp. 52–53",
              trainerId: "writing-m3b-flow",
              trainerLabel:
                "Task 2 · overreliance on doctors · modal passive + essay.",
            },
          ],
        },
      ],
      review: {
        label: "Module 3 review",
        pages: "p. 54",
        trainerId: "review-m3-flow",
      },
    },
    {
      id: "module-4",
      number: 4,
      title: "A consumer society",
      startPage: "p. 55",
      sections: [
        {
          id: "4a",
          label: "A",
          subtitle: "The cost of buying",
          blocks: [
            {
              id: "4a-lead-in",
              skill: "Lead-in",
              topics: [
                "Responsible spender quiz",
                "Blue vs green boxes",
                "What is a responsible spender?",
                "How much do people consume?",
              ],
              pages: "p. 55",
              trainerId: "lead-in-consumer",
              trainerLabel:
                "Lead-in · responsible spender quiz (p. 55).",
              nextTrainerId: "reading-m4a-flow",
            },
            {
              id: "4a-reading",
              skill: "Reading",
              topics: [
                "Before you read",
                "Passage type",
                "Matching information 1–5",
                "Summary completion 6–9",
                "Discussion",
              ],
              pages: "pp. 56–57",
              trainerId: "reading-m4a-flow",
              trainerLabel:
                "Re-thinking an extravagant world · matching + summary.",
            },
            {
              id: "4a-vocabulary",
              skill: "Vocabulary",
              topics: [
                "1a Academic verbs",
                "1b Verb forms",
                "2a–2b Impersonal style",
                "3 Word forms",
                "4 Improve text",
                "5a–5b Collocations",
              ],
              pages: "p. 58",
              trainerId: "vocabulary-m4-flow",
              trainerLabel:
                "Vocabulary · thoughts & beliefs + impersonal style (p. 58).",
            },
            {
              id: "4a-speaking",
              skill: "Speaking",
              topics: [
                "1 Quote",
                "2a Match terms",
                "3a–3d Connectors",
                "4 Part 3",
                "5 Assess",
              ],
              pages: "p. 59",
              trainerId: "speaking-m4a-flow",
              trainerLabel:
                "Speaking Part 3 · recycling vocab + expanding with conjunctions.",
            },
            {
              id: "4a-listening",
              skill: "Listening",
              topics: [
                "1 Before you listen",
                "2a–2b Predict table",
                "3a–3b Notes",
                "4 Exam (no audio yet)",
                "5 Discussion",
              ],
              pages: "p. 60",
              trainerId: "listening-m4a-flow",
              trainerLabel:
                "Section 2 · upcycling workshop (prep + exam; audio later).",
            },
            {
              id: "4a-language",
              skill: "Language development",
              topics: [
                "1a–1c Sentence fragments",
                "2–3 Subordinate clauses",
                "4 Punctuation",
                "5–6 that-clauses",
              ],
              pages: "p. 61",
              trainerId: "language-m4a-flow",
              trainerLabel:
                "Clauses · fragments, subordinators, opinions with that.",
            },
            {
              id: "4a-writing",
              skill: "Writing",
              topics: [
                "1 Cartoon lead-in",
                "2 Order paragraphs",
                "3 Analyse opinion",
                "4 Plan + write",
              ],
              pages: "p. 62",
              trainerId: "writing-m4a-flow",
              trainerLabel:
                "Task 2 · opinion essay (recycling vs reducing).",
            },
          ],
        },
        {
          id: "4b",
          label: "B",
          subtitle: "Objects of desire",
          blocks: [
            {
              id: "4b-listening",
              skill: "Listening",
              topics: [
                "1 Before you listen",
                "2a–2c Link ideas",
                "3 Exam (no audio yet)",
                "4 Task analysis",
              ],
              pages: "p. 63",
              trainerId: "listening-m4b-flow",
              trainerLabel:
                "Section 2 · gift-giving (prep + exam; audio later).",
            },
            {
              id: "4b-language",
              skill: "Language development and vocabulary",
              topics: [
                "1a–1b Pronoun referencing",
                "2 Pronoun gaps",
                "3a–3b Signposting",
              ],
              pages: "p. 64",
              trainerId: "language-m4b-flow",
              trainerLabel:
                "Pronouns + signposting words (p. 64).",
            },
            {
              id: "4b-speaking",
              skill: "Speaking",
              topics: [
                "1 Expensive items",
                "2 Vocabulary",
                "3 Discuss",
                "4 Pronunciation",
                "5 Part 3",
                "6 Assess",
              ],
              pages: "p. 65",
              trainerId: "speaking-m4b-flow",
              trainerLabel:
                "Speaking Part 3 · consumerism + pronunciation focus.",
            },
            {
              id: "4b-reading",
              skill: "Reading",
              topics: [
                "Before you read",
                "Matching information 1–6",
                "Summary completion 7–10",
                "Discussion",
              ],
              pages: "pp. 66–67",
              trainerId: "reading-m4b-flow",
              trainerLabel:
                "Matching information + summary (objects & happiness).",
            },
            {
              id: "4b-writing",
              skill: "Writing",
              topics: [
                "1 Lead-in",
                "2 Suitable opinions",
                "3 Plan ideas",
                "4–5 Intro / structure",
                "6 Write essay",
              ],
              pages: "pp. 68–69",
              trainerId: "writing-m4b-flow",
              trainerLabel:
                "Task 2 · young people, fashion & gadgets.",
            },
          ],
        },
      ],
      review: {
        label: "Module 4 review",
        pages: "p. 70",
        trainerId: "review-m4-flow",
      },
    },
    {
      id: "module-5",
      number: 5,
      title: "Homes of the future",
      startPage: "p. 71",
      sections: [
        {
          id: "5a",
          label: "A",
          subtitle: "Making life easier",
          blocks: [
            {
              id: "5a-lead-in",
              skill: "Lead-in",
              topics: [
                "Photos predicting the future",
                "Technology, living spaces, travel",
                "Which developments are most likely?",
              ],
              pages: "p. 71",
              trainerId: "lead-in-homes",
              trainerLabel:
                "Lead-in · homes of the future photos (p. 71).",
              nextTrainerId: "reading-m5a-flow",
            },
            {
              id: "5a-reading",
              skill: "Reading",
              topics: [
                "Before you read",
                "Skim title",
                "Reference words",
                "Matching features 1–5",
                "Note completion 6–9",
                "Discussion",
              ],
              pages: "pp. 72–73",
              trainerId: "reading-m5a-flow",
              trainerLabel:
                "How robots are poised to take over our homes · matching + notes.",
            },
            {
              id: "5a-vocabulary",
              skill: "Vocabulary",
              topics: [
                "1a–1c Invention language",
                "2a Quantity",
                "3a–3b Agreement adverbs",
              ],
              pages: "p. 74",
              trainerId: "vocabulary-m5-flow",
              trainerLabel:
                "Vocabulary · invention, quantity, agreement (p. 74).",
            },
            {
              id: "5a-speaking",
              skill: "Speaking",
              topics: [
                "1 Discuss gadgets",
                "2a–2b Vocab",
                "3 Techniques",
                "4 Part 2",
                "5 Assess",
              ],
              pages: "p. 75",
              trainerId: "speaking-m5a-flow",
              trainerLabel:
                "Speaking Part 2 · gadgets + techniques for detail.",
            },
            {
              id: "5a-listening",
              skill: "Listening",
              topics: [
                "1 Before you listen",
                "2 Agreement",
                "3a–3b Prep",
                "4 Exam (no audio yet)",
                "5 Discussion",
              ],
              pages: "p. 76",
              trainerId: "listening-m5a-flow",
              trainerLabel:
                "Section 3 · weird inventions (prep + exam; audio later).",
            },
            {
              id: "5a-language",
              skill: "Language development",
              topics: [
                "1a–1b Reported speech",
                "2 Verb patterns",
                "5a–5b Structures",
                "Practice rewrite",
              ],
              pages: "p. 77",
              trainerId: "language-m5a-flow",
              trainerLabel:
                "Reported speech patterns + other reporting structures.",
            },
            {
              id: "5a-writing",
              skill: "Writing",
              topics: [
                "1 Lead-in",
                "2 Structure",
                "3a–3b Stats",
                "4 Trends",
                "5 Write 150 words",
                "6 Peer check",
              ],
              pages: "p. 78",
              trainerId: "writing-m5a-flow",
              trainerLabel:
                "Task 1 · energy use in Australian homes (bar/pie).",
            },
          ],
        },
        {
          id: "5b",
          label: "B",
          subtitle: "Expanding our horizons",
          blocks: [
            {
              id: "5b-listening",
              skill: "Listening",
              topics: [
                "1 Before you listen",
                "2a–2b Diagram",
                "2c Language",
                "3 Matching + notes (no audio yet)",
                "4 Analysis",
              ],
              pages: "p. 79",
              trainerId: "listening-m5b-flow",
              trainerLabel:
                "Section 3 · space hotel diagram + matching (audio later).",
            },
            {
              id: "5b-language",
              skill: "Language development and vocabulary",
              topics: [
                "1a–1b Noun phrases",
                "2–4 Practice",
                "5a–5b Reporting verbs",
              ],
              pages: "p. 80",
              trainerId: "language-m5b-flow",
              trainerLabel:
                "Noun phrases + reporting verbs (p. 80).",
            },
            {
              id: "5b-speaking",
              skill: "Speaking",
              topics: [
                "1 Utopian / dystopian",
                "2a–2b Vocab",
                "3 Grammar range",
                "4 Part 2",
                "5 Assess",
              ],
              pages: "p. 81",
              trainerId: "speaking-m5b-flow",
              trainerLabel:
                "Speaking Part 2 · future place + grammatical range.",
            },
            {
              id: "5b-reading",
              skill: "Reading",
              topics: [
                "Before you read",
                "Strategies",
                "Diagram + True/False/Not given",
                "Task analysis",
                "Discussion",
              ],
              pages: "pp. 82–83",
              trainerId: "reading-m5b-flow",
              trainerLabel:
                "Underwater living · diagram labelling + TFNG.",
            },
            {
              id: "5b-writing",
              skill: "Writing",
              topics: [
                "1 Quote",
                "2a–2c Charts",
                "3 Vocabulary",
                "4 Plan",
                "5 Write",
                "6 Peer review",
              ],
              pages: "pp. 84–85",
              trainerId: "writing-m5b-flow",
              trainerLabel:
                "Task 1 · migration reasons + desirable countries.",
            },
          ],
        },
      ],
      review: {
        label: "Module 5 review",
        pages: "p. 86",
        trainerId: "review-m5-flow",
      },
    },
    {
      id: "module-6",
      number: 6,
      title: "Law and order",
      startPage: "p. 87",
      sections: [
        {
          id: "6a",
          label: "A",
          subtitle: "Preventing crime",
          blocks: [
            {
              id: "6a-lead-in",
              skill: "Lead-in",
              topics: [
                "Crime TV detectives",
                "Portraying real life",
              ],
              pages: "p. 87",
              trainerId: "lead-in-crime",
              trainerLabel:
                "Lead-in · crime TV detectives (p. 87).",
              nextTrainerId: "reading-m6a-flow",
            },
            {
              id: "6a-reading",
              skill: "Reading",
              topics: [
                "Before you read",
                "Skim title",
                "Unknown words",
                "Flow chart + sentences",
                "Wrong answers",
                "Discussion",
              ],
              pages: "pp. 88–89",
              trainerId: "reading-m6a-flow",
              trainerLabel:
                "Why people become criminals · flow chart + sentence completion.",
            },
            {
              id: "6a-vocabulary",
              skill: "Vocabulary",
              topics: [
                "1a Argument verbs",
                "1b Verb forms",
                "2a–2b Collocations",
                "3a Collocation MCQ",
                "3b–3c Practice",
              ],
              pages: "p. 90",
              trainerId: "vocabulary-m6-flow",
              trainerLabel:
                "Vocabulary · argument verbs & collocations (p. 90).",
            },
            {
              id: "6a-speaking",
              skill: "Speaking",
              topics: [
                "1 Photos",
                "2a Match terms",
                "2b Discuss",
                "3 Structure",
                "4–6 Part 3",
                "7 Assess",
              ],
              pages: "p. 91",
              trainerId: "speaking-m6a-flow",
              trainerLabel:
                "Speaking Part 3 · surveillance + argument structure.",
            },
            {
              id: "6a-listening",
              skill: "Listening",
              topics: [
                "1 Before you listen",
                "2a–2b Attitude / tone",
                "3a–3b Prep",
                "4 Exam summary (no audio yet)",
                "5–6 Discussion",
              ],
              pages: "p. 92",
              trainerId: "listening-m6a-flow",
              trainerLabel:
                "Section 4 · attitude & summary (prep + exam; audio later).",
            },
            {
              id: "6a-language",
              skill: "Language development",
              topics: [
                "1a–1b Linking",
                "2 Complete",
                "3 Open practice",
                "4a–4c Both / neither / either",
              ],
              pages: "p. 93",
              trainerId: "language-m6a-flow",
              trainerLabel:
                "Linking ideas + both / neither / either (p. 93).",
            },
            {
              id: "6a-writing",
              skill: "Writing",
              topics: [
                "1 Quote",
                "2a–2c Arguments",
                "3 Linking check",
                "4 Plan + write",
              ],
              pages: "p. 94",
              trainerId: "writing-m6a-flow",
              trainerLabel:
                "Task 2 · opinion essay (crime / society / punishment).",
            },
          ],
        },
        {
          id: "6b",
          label: "B",
          subtitle: "Solving crime",
          blocks: [
            {
              id: "6b-listening",
              skill: "Listening",
              topics: [
                "1 Before you listen",
                "2a Adjectives",
                "3a–3b Opinion",
                "4 Exam (no audio yet)",
              ],
              pages: "p. 95",
              trainerId: "listening-m6b-flow",
              trainerLabel:
                "Section 4 · super recognisers (prep + exam; audio later).",
            },
            {
              id: "6b-language",
              skill: "Language development and vocabulary",
              topics: [
                "1a–1c Cleft sentences",
                "2a–2d There / it",
              ],
              pages: "p. 96",
              trainerId: "language-m6b-flow",
              trainerLabel:
                "Cleft sentences + there / it (p. 96).",
            },
            {
              id: "6b-speaking",
              skill: "Speaking",
              topics: [
                "1 Vocab",
                "2 Fluency T/F",
                "3 Improve",
                "4 Part 3",
                "5 Assess",
              ],
              pages: "p. 97",
              trainerId: "speaking-m6b-flow",
              trainerLabel:
                "Speaking Part 3 · law enforcement + fluency.",
            },
            {
              id: "6b-reading",
              skill: "Reading",
              topics: [
                "Before you read",
                "Note / flow completion",
                "Task analysis",
                "Discussion",
              ],
              pages: "pp. 98–99",
              trainerId: "reading-m6b-flow",
              trainerLabel:
                "Working a crime scene · note / flow-chart completion.",
            },
            {
              id: "6b-writing",
              skill: "Writing",
              topics: [
                "1 Cartoon",
                "2a For/against",
                "3 Structure",
                "4 Conclusions",
                "5 Plan + write",
                "6 Peer review",
              ],
              pages: "pp. 100–101",
              trainerId: "writing-m6b-flow",
              trainerLabel:
                "Task 2 · science vs human judgement in crime.",
            },
          ],
        },
      ],
      review: {
        label: "Module 6 review",
        pages: "p. 102",
        trainerId: "review-m6-flow",
      },
    },
    {
      id: "module-7",
      number: 7,
      title: "On the move",
      startPage: "p. 103",
      sections: [
        {
          id: "7a",
          label: "A",
          subtitle: "Urban living",
          blocks: [
            {
              id: "7a-lead-in",
              skill: "Lead-in",
              topics: [
                "Unique transport",
                "Coco Taxi / Tangah / Matatu / Dubai Trolley",
              ],
              pages: "p. 103",
              trainerId: "lead-in-urban",
              trainerLabel: "Lead-in · unique forms of transport (p. 103).",
              nextTrainerId: "reading-m7a-flow",
            },
            {
              id: "7a-reading",
              skill: "Reading",
              topics: [
                "Before you read",
                "Link ideas",
                "Matching endings",
                "Summary 6–9",
                "Discussion",
              ],
              pages: "pp. 104–105",
              trainerId: "reading-m7a-flow",
              trainerLabel:
                "Raahgiri / Ciclovía · matching endings + summary.",
            },
            {
              id: "7a-vocabulary",
              skill: "Vocabulary",
              topics: [
                "1a Academic nouns",
                "1b Word forms",
                "2 Word families",
                "3 Plan collocations",
                "4 Match meanings",
              ],
              pages: "p. 106",
              trainerId: "vocabulary-m7-flow",
              trainerLabel:
                "Vocabulary · academic nouns & plan collocations (p. 106).",
            },
            {
              id: "7a-speaking",
              skill: "Speaking",
              topics: [
                "1 Photos",
                "2 Idioms",
                "3 Discuss",
                "4a–4b Accuracy",
                "5a–5b Less accurate",
                "6a–7 Part 1",
              ],
              pages: "p. 107",
              trainerId: "speaking-m7a-flow",
              trainerLabel:
                "Speaking Part 1 · where you live + idioms.",
            },
            {
              id: "7a-listening",
              skill: "Listening",
              topics: [
                "1 Before you listen",
                "2a Synonyms",
                "2b–2e Distractors",
                "3 Exam form (no audio yet)",
              ],
              pages: "p. 108",
              trainerId: "listening-m7a-flow",
              trainerLabel:
                "Section 1 · City Cycling Group (prep + exam; audio later).",
            },
            {
              id: "7a-language",
              skill: "Language development",
              topics: [
                "1a–1c Fragments",
                "2a–2b Correct/incorrect",
                "3 Punctuation match",
                "4 Punctuate text",
              ],
              pages: "p. 109",
              trainerId: "language-m7a-flow",
              trainerLabel:
                "Sentence fragments, run-ons & punctuation (p. 109).",
            },
            {
              id: "7a-writing",
              skill: "Writing",
              topics: [
                "1 Lead-in",
                "2 Chart features",
                "3–4 Intro / overview",
                "5 Figures",
                "6–7 Accuracy + write",
              ],
              pages: "p. 110",
              trainerId: "writing-m7a-flow",
              trainerLabel:
                "Task 1 · tables/charts (Asia transport shares).",
            },
          ],
        },
        {
          id: "7b",
          label: "B",
          subtitle: "Infrastructures",
          blocks: [
            {
              id: "7b-listening",
              skill: "Listening",
              topics: [
                "1 Before you listen",
                "2a–2c Positive/negative",
                "3 Exam MCQ 1–4",
                "4 Exam form 5–10",
                "5 Discussion",
              ],
              pages: "p. 111",
              trainerId: "listening-m7b-flow",
              trainerLabel:
                "Section 1 · complaint form (prep + exam; audio later).",
            },
            {
              id: "7b-language",
              skill: "Language development and vocabulary",
              topics: [
                "1a Greyhound accuracy",
                "2 Correct errors",
                "3a–3b by/to",
                "4 Prepositions",
                "5 Meaning pairs",
              ],
              pages: "p. 112",
              trainerId: "language-m7b-flow",
              trainerLabel:
                "Grammatical accuracy + prepositions (p. 112).",
            },
            {
              id: "7b-speaking",
              skill: "Speaking",
              topics: [
                "1 Photo",
                "2a Travel vocab",
                "2b–3 Prompts",
                "4 Accuracy self-check",
                "5 Part 1",
                "6–7 Assess",
              ],
              pages: "p. 113",
              trainerId: "speaking-m7b-flow",
              trainerLabel:
                "Speaking Part 1 · travel and transport vocab.",
            },
            {
              id: "7b-reading",
              skill: "Reading",
              topics: [
                "Before you read",
                "Strategies",
                "Matching endings",
                "Summary 6–10",
                "Discussion",
              ],
              pages: "pp. 114–115",
              trainerId: "reading-m7b-flow",
              trainerLabel:
                "Autonomous vehicles · matching endings + summary.",
            },
            {
              id: "7b-writing",
              skill: "Writing",
              topics: [
                "1 Lead-in",
                "2a–2c Understand chart",
                "3 Descriptors",
                "4 Plan",
                "5a–5b Future language",
                "6 Write 150 words",
              ],
              pages: "pp. 116–117",
              trainerId: "writing-m7b-flow",
              trainerLabel:
                "Task 1 · airline passengers future trends.",
            },
          ],
        },
      ],
      review: {
        label: "Module 7 review",
        pages: "p. 118",
        trainerId: "review-m7-flow",
      },
    },
    {
      id: "module-8",
      number: 8,
      title: "Social networks",
      startPage: "p. 119",
      sections: [
        {
          id: "8a",
          label: "A",
          subtitle: "Community",
          blocks: [
            {
              id: "8a-lead-in",
              skill: "Lead-in",
              topics: ["Community as ship's crew", "Why community matters"],
              pages: "p. 119",
              trainerId: "lead-in-community",
              trainerLabel: "Lead-in · community quote (p. 119).",
              nextTrainerId: "reading-m8a-flow",
            },
            {
              id: "8a-reading",
              skill: "Reading",
              topics: [
                "Before you read",
                "Skim",
                "Fact / opinion",
                "Y/N/NG + select two",
                "Task analysis",
                "Discussion",
              ],
              pages: "pp. 120–121",
              trainerId: "reading-m8a-flow",
              trainerLabel: "Altruism · Yes/No/Not given + select two.",
            },
            {
              id: "8a-vocabulary",
              skill: "Vocabulary",
              topics: [
                "1a Community words",
                "1b Gap fill",
                "2a–2b Collocations",
                "3 Emotion MCQ",
              ],
              pages: "p. 122",
              trainerId: "vocabulary-m8-flow",
              trainerLabel: "Vocabulary · community & communication (p. 122).",
            },
            {
              id: "8a-speaking",
              skill: "Speaking",
              topics: [
                "1 Discuss",
                "2a–2c Adjectives",
                "3 Real / hypothetical",
                "4 Connected speech",
                "5 Part 2",
              ],
              pages: "p. 123",
              trainerId: "speaking-m8a-flow",
              trainerLabel: "Speaking Part 2 · personal qualities + reactions.",
            },
            {
              id: "8a-listening",
              skill: "Listening",
              topics: [
                "1 Before you listen",
                "2a–2c Predict",
                "3a Exam (no audio yet)",
                "3b–4 Analysis",
              ],
              pages: "p. 124",
              trainerId: "listening-m8a-flow",
              trainerLabel: "Section 2 · SoPals / social media (prep + exam; audio later).",
            },
            {
              id: "8a-language",
              skill: "Language development",
              topics: [
                "1a–1c Future forms",
                "1d Speak",
                "2a–2c Speculate",
              ],
              pages: "p. 125",
              trainerId: "language-m8a-flow",
              trainerLabel: "Future forms + speculation (p. 125).",
            },
            {
              id: "8a-writing",
              skill: "Writing",
              topics: [
                "1 Discuss",
                "2a–2c Situation / cause / effect",
                "3 Paragraph functions",
                "4 Plan + write",
              ],
              pages: "p. 126",
              trainerId: "writing-m8a-flow",
              trainerLabel: "Task 2 · voluntary work / community benefits.",
            },
          ],
        },
        {
          id: "8b",
          label: "B",
          subtitle: "Communication",
          blocks: [
            {
              id: "8b-listening",
              skill: "Listening",
              topics: [
                "1 Before you listen",
                "2a–2c Cause / effect",
                "3 Exam (no audio yet)",
                "4 Discussion",
              ],
              pages: "p. 127",
              trainerId: "listening-m8b-flow",
              trainerLabel: "Section 2 · books / film cause–effect (audio later).",
            },
            {
              id: "8b-language",
              skill: "Language development and vocabulary",
              topics: [
                "1a–1d Cause / effect linkers",
                "2a–2c Noun phrases",
              ],
              pages: "p. 128",
              trainerId: "language-m8b-flow",
              trainerLabel: "Cause/effect linking + noun phrases (p. 128).",
            },
            {
              id: "8b-speaking",
              skill: "Speaking",
              topics: [
                "1a–1d Idioms",
                "2 Grammar range",
                "3 Part 2",
                "4 Assess",
              ],
              pages: "p. 129",
              trainerId: "speaking-m8b-flow",
              trainerLabel: "Speaking Part 2 · meeting a famous person.",
            },
            {
              id: "8b-reading",
              skill: "Reading",
              topics: [
                "Before you read",
                "Skim argument",
                "Y/N/NG + select two",
                "Task analysis",
                "Discussion",
              ],
              pages: "pp. 130–131",
              trainerId: "reading-m8b-flow",
              trainerLabel: "Human–animal ties · Yes/No/Not given + select two.",
            },
            {
              id: "8b-writing",
              skill: "Writing",
              topics: [
                "1 Discuss",
                "2a–2d Plan cause/effect",
                "3 Vocabulary",
                "4 Collocations",
                "5 Write",
                "6 Peer review",
              ],
              pages: "pp. 132–133",
              trainerId: "writing-m8b-flow",
              trainerLabel: "Task 2 · internet & young people's communication.",
            },
          ],
        },
      ],
      review: {
        label: "Module 8 review",
        pages: "p. 134",
        trainerId: "review-m8-flow",
      },
    },
    {
      id: "module-9",
      number: 9,
      title: "Being successful",
      startPage: "p. 135",
      sections: [
        {
          id: "9a",
          label: "A",
          subtitle: "A recipe for success",
          blocks: [
            {
              id: "9a-lead-in",
              skill: "Lead-in",
              topics: [
                "Define SUCCESS",
                "What success means to you",
              ],
              pages: "p. 135",
              trainerId: "lead-in-success",
              trainerLabel:
                "Lead-in · discuss SUCCESS (p. 135).",
              nextTrainerId: "reading-m9a-flow",
            },
            {
              id: "9a-reading",
              skill: "Reading",
              topics: [
                "Before you read",
                "Infer meaning / attitude",
                "Multiple choice",
                "Yes/No/Not given",
                "Discussion",
              ],
              pages: "pp. 136–137",
              trainerId: "reading-m9a-flow",
              trainerLabel:
                "Multitasking · MCQ + Yes/No/Not given.",
            },
            {
              id: "9a-vocabulary",
              skill: "Vocabulary",
              topics: [
                "1a Talent meanings",
                "1b Word forms",
                "2a–2b Collocations",
                "3a–3b Personal qualities",
              ],
              pages: "p. 138",
              trainerId: "vocabulary-m9-flow",
              trainerLabel:
                "Vocabulary · talent, success & qualities (p. 138).",
            },
            {
              id: "9a-speaking",
              skill: "Speaking",
              topics: [
                "1 Metaphor",
                "2a–2b Idioms",
                "3 Thinking time",
                "4–5 Part 3",
              ],
              pages: "p. 139",
              trainerId: "speaking-m9a-flow",
              trainerLabel:
                "Speaking Part 3 · success idioms + thinking time.",
            },
            {
              id: "9a-listening",
              skill: "Listening",
              topics: [
                "1 Before you listen",
                "2a–2c General / specific",
                "3a–3b Prep",
                "4 Exam (no audio yet)",
                "5–6 Discussion",
              ],
              pages: "p. 140",
              trainerId: "listening-m9a-flow",
              trainerLabel:
                "Section 3 · record breakers (prep + exam; audio later).",
            },
            {
              id: "9a-language",
              skill: "Language development",
              topics: [
                "1a–1b Relative clauses",
                "2 Prosthetic text",
                "3a–3e Describe objects",
              ],
              pages: "p. 141",
              trainerId: "language-m9a-flow",
              trainerLabel:
                "Describing how things work / look (p. 141).",
            },
            {
              id: "9a-writing",
              skill: "Writing",
              topics: [
                "1 Famous cities",
                "2a–2c Walled city vocab",
                "3a–3c Water process",
                "4 Plan + write",
              ],
              pages: "p. 142",
              trainerId: "writing-m9a-flow",
              trainerLabel:
                "Task 1 · aqueduct / syphon diagrams.",
            },
          ],
        },
        {
          id: "9b",
          label: "B",
          subtitle: "Working better",
          blocks: [
            {
              id: "9b-listening",
              skill: "Listening",
              topics: [
                "1 Before you listen",
                "2a–2c Abstract ideas",
                "3 Exam (no audio yet)",
                "4 Discussion",
              ],
              pages: "p. 143",
              trainerId: "listening-m9b-flow",
              trainerLabel:
                "Section 3 · workplaces (prep + exam; audio later).",
            },
            {
              id: "9b-language",
              skill: "Language development and vocabulary",
              topics: [
                "1a–1d Estimation language",
                "2a–2c Replace thing",
              ],
              pages: "p. 144",
              trainerId: "language-m9b-flow",
              trainerLabel:
                "Estimation + replacing vague nouns (p. 144).",
            },
            {
              id: "9b-speaking",
              skill: "Speaking",
              topics: [
                "1a–1c Work vocab",
                "2 Pronunciation",
                "3–4 Part 3",
              ],
              pages: "p. 145",
              trainerId: "speaking-m9b-flow",
              trainerLabel:
                "Speaking Part 3 · work, qualifications & pronunciation.",
            },
            {
              id: "9b-reading",
              skill: "Reading",
              topics: [
                "Before you read",
                "Multiple choice",
                "Yes/No/Not given",
                "Discussion",
              ],
              pages: "pp. 146–147",
              trainerId: "reading-m9b-flow",
              trainerLabel:
                "Jobs of the future · MCQ + Yes/No/Not given.",
            },
            {
              id: "9b-writing",
              skill: "Writing",
              topics: [
                "1 Workspaces",
                "2a–2c Office plans",
                "3–4 Vocab + plan",
                "5 Write",
                "6 Peer review",
              ],
              pages: "pp. 148–149",
              trainerId: "writing-m9b-flow",
              trainerLabel:
                "Task 1 · office plans 1975 / 2015.",
            },
          ],
        },
      ],
      review: {
        label: "Module 9 review",
        pages: "p. 150",
        trainerId: "review-m9-flow",
      },
    },
    {
      id: "module-10",
      number: 10,
      title: "Cutting edge",
      startPage: "p. 151",
      sections: [
        {
          id: "10a",
          label: "A",
          subtitle: "Thinking creatively",
          blocks: [
            {
              id: "10a-lead-in",
              skill: "Lead-in",
              topics: [
                "Match inventors & inventions",
                "What makes a great inventor",
              ],
              pages: "p. 151",
              trainerId: "lead-in-cutting",
              trainerLabel:
                "Lead-in · Cutting edge inventions (p. 151).",
              nextTrainerId: "reading-m10a-flow",
            },
            {
              id: "10a-reading",
              skill: "Reading",
              topics: [
                "Before you read",
                "Paraphrase / skim",
                "Matching sentence endings",
                "Multiple choice",
                "Discussion",
              ],
              pages: "pp. 152–153",
              trainerId: "reading-m10a-flow",
              trainerLabel:
                "Science of imagination · endings + MCQ.",
            },
            {
              id: "10a-vocabulary",
              skill: "Vocabulary",
              topics: [
                "1a Nouns for hypothesising",
                "1b Verb forms",
                "2 Gap-fill",
                "4a–5 Collocations & speculation",
              ],
              pages: "p. 154",
              trainerId: "vocabulary-m10-flow",
              trainerLabel:
                "Vocabulary · hypothesising & speculation (p. 154).",
            },
            {
              id: "10a-speaking",
              skill: "Speaking",
              topics: [
                "1 Creativity definitions",
                "2a–2c Topic phrases",
                "3 Part 2 speculation",
                "4–5 Part 2 + 3",
              ],
              pages: "p. 155",
              trainerId: "speaking-m10a-flow",
              trainerLabel:
                "Speaking Part 2/3 · creativity + speculation.",
            },
            {
              id: "10a-listening",
              skill: "Listening",
              topics: [
                "1 Before you listen",
                "2a–2c Metaphor / simile",
                "3a–3b Topic order",
                "4 Exam (no audio yet)",
                "5 Discussion",
              ],
              pages: "p. 156",
              trainerId: "listening-m10a-flow",
              trainerLabel:
                "Section 4 · robotic music (prep + exam; audio later).",
            },
            {
              id: "10a-language",
              skill: "Language development",
              topics: [
                "1a–1c Wish / if only",
                "2 Correct sentences",
                "4a–4d Hypothetical forms",
              ],
              pages: "p. 157",
              trainerId: "language-m10a-flow",
              trainerLabel:
                "Unreal conditionals & hypothetical forms (p. 157).",
            },
            {
              id: "10a-writing",
              skill: "Writing",
              topics: [
                "1 Lateral thinking",
                "2a–2c Hypotheticals",
                "3 Coherent argument",
                "4 Plan + write",
              ],
              pages: "p. 158",
              trainerId: "writing-m10a-flow",
              trainerLabel:
                "Task 2 · creativity & problem-solving.",
            },
          ],
        },
        {
          id: "10b",
          label: "B",
          subtitle: "Innovation",
          blocks: [
            {
              id: "10b-listening",
              skill: "Listening",
              topics: [
                "1 Before you listen",
                "2a–3b Hypothesising",
                "4 Exam (no audio yet)",
                "5 Discussion",
              ],
              pages: "p. 159",
              trainerId: "listening-m10b-flow",
              trainerLabel:
                "Section 4 · medical innovations (prep + exam; audio later).",
            },
            {
              id: "10b-language",
              skill: "Language development and vocabulary",
              topics: [
                "1 Past modals",
                "2 Cousteau text",
                "4a–4c Verb patterns",
              ],
              pages: "p. 160",
              trainerId: "language-m10b-flow",
              trainerLabel:
                "Past modals + verb patterns (p. 160).",
            },
            {
              id: "10b-speaking",
              skill: "Speaking",
              topics: [
                "1–3 Invention vocab",
                "4 Lexical resource",
                "5 Part 3",
              ],
              pages: "p. 161",
              trainerId: "speaking-m10b-flow",
              trainerLabel:
                "Speaking Part 3 · inventions & lexical resource.",
            },
            {
              id: "10b-reading",
              skill: "Reading",
              topics: [
                "Before you read",
                "Matching sentence endings",
                "Yes/No/Not given",
                "Discussion",
              ],
              pages: "pp. 162–163",
              trainerId: "reading-m10b-flow",
              trainerLabel:
                "Nature of scientific progress · endings + YNNG.",
            },
            {
              id: "10b-writing",
              skill: "Writing",
              topics: [
                "1 Inventions",
                "2a–2c For / against",
                "3–5 Plan + language",
                "6 Write",
                "7 Peer review",
              ],
              pages: "pp. 164–165",
              trainerId: "writing-m10b-flow",
              trainerLabel:
                "Task 2 · scientific innovation opinion essay.",
            },
          ],
        },
      ],
      review: {
        label: "Module 10 review",
        pages: "p. 166",
        trainerId: "review-m10-flow",
      },
    },
  ],
};
