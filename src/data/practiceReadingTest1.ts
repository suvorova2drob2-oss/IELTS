/** Practice Test 1 · Reading — Examining the African Hunting Debate (exact book wording). */

export type HeadingId =
  | "i"
  | "ii"
  | "iii"
  | "iv"
  | "v"
  | "vi"
  | "vii"
  | "viii"
  | "ix";

export type TfngValue = "TRUE" | "FALSE" | "NOT GIVEN";

export interface PassageParagraph {
  id: string;
  text: string;
}

export interface MatchingQuestion {
  id: number;
  paragraphId: string;
  key: HeadingId;
  evidence: string[];
  tip?: string;
}

export interface TfngQuestion {
  id: number;
  statement: string;
  key: TfngValue;
  evidence: string[];
  tip?: string;
}

export interface AdviceGap {
  id: number;
  before: string;
  after: string;
  key: string;
  /** Extra blanks after the first (same sentence). */
  extra?: { before: string; key: string }[];
}

export type EndingId = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";

export interface SentenceEndingQuestion {
  id: number;
  stem: string;
  key: EndingId;
  evidence: string[];
  tip?: string;
}

export interface CompletionQuestion {
  id: number;
  stem: string;
  key: string;
  accept: string[];
  evidence: string[];
  tip?: string;
}

export interface LanguageGap {
  id: number;
  before?: string;
  after?: string;
  /** Full sentence; wrap pronouns in **like this**. */
  prompt?: string;
  /** Paragraph to focus in the passage (pronoun-reference engine). */
  paragraphId?: string;
  key: string;
  accept?: string[];
}

export type ParaLetter = "A" | "B" | "C" | "D" | "E" | "F";

export interface MatchingInfoQuestion {
  id: number;
  statement: string;
  key: ParaLetter;
  evidence: string[];
  tip?: string;
}

export interface SummaryBlank {
  id: number;
  key: string;
  accept: string[];
  evidence: string[];
  tip?: string;
}

export interface SuggestedFillItem {
  id: number;
  prompt: string;
  key: string;
  accept: string[];
}

export interface VocabChoiceItem {
  id: number;
  before: string;
  after: string;
  choices: string[];
  key: string;
}

export interface VocabItem {
  id: number;
  clue: string;
  paragraphId: string;
  key: string;
}

export interface PracticeReadingTaskBase {
  id: string;
  index: number;
  title: string;
  learnTips: string[];
}

export type PracticeReadingTask =
  | (PracticeReadingTaskBase & {
      type: "matching-headings";
      instruction: string;
      taskHeader: string;
      headings: { id: HeadingId; text: string }[];
      example: { paragraphId: string; headingId: HeadingId };
      questions: MatchingQuestion[];
      advice: {
        title: string;
        instruction: string;
        wordBox: string[];
        gaps: AdviceGap[];
      };
    })
  | (PracticeReadingTaskBase & {
      type: "tfng";
      instruction: string;
      taskHeader: string;
      legend: { value: TfngValue; meaning: string }[];
      questions: TfngQuestion[];
      advice: {
        title: string;
        instruction: string;
        wordBox: string[];
        gaps: AdviceGap[];
      };
    })
  | (PracticeReadingTaskBase & {
      type: "vocab-followup";
      vocabInstruction: string;
      vocabulary: VocabItem[];
      followUpInstruction: string;
      followUpQuestions: string[];
      speakSec: number;
    })
  | (PracticeReadingTaskBase & {
      type: "sentence-endings";
      instruction: string;
      taskHeader: string;
      endings: { id: EndingId; text: string }[];
      questions: SentenceEndingQuestion[];
      advice?: {
        title: string;
        instruction: string;
        wordBox: string[];
        gaps: AdviceGap[];
      };
    })
  | (PracticeReadingTaskBase & {
      type: "sentence-completion";
      instruction: string;
      taskHeader: string;
      questions: CompletionQuestion[];
      advice?: {
        title: string;
        instruction: string;
        wordBox: string[];
        gaps: AdviceGap[];
      };
    })
  | (PracticeReadingTaskBase & {
      type: "learn-pack";
      languageInstruction: string;
      languageItems: LanguageGap[];
      vocabInstruction?: string;
      vocabItems?: VocabChoiceItem[];
      followUpInstruction: string;
      followUpQuestions: string[];
      speakSec: number;
    })
  | (PracticeReadingTaskBase & {
      type: "matching-information";
      instruction: string;
      taskHeader: string;
      /** Letters may be reused when true (IELTS NB). */
      allowReuse: boolean;
      questions: MatchingInfoQuestion[];
      training?: {
        title: string;
        instruction: string;
        items: SuggestedFillItem[];
      };
    })
  | (PracticeReadingTaskBase & {
      type: "summary-completion";
      instruction: string;
      taskHeader: string;
      /** Summary text with {{7}} blank markers. */
      summary: string;
      blanks: SummaryBlank[];
    })
  | (PracticeReadingTaskBase & {
      type: "coming";
    });

export interface PracticeReadingTest {
  id: string;
  title: string;
  subtitle: string;
  readingLabel: string;
  passageTitle: string;
  paragraphs: PassageParagraph[];
  tasks: PracticeReadingTask[];
  /** When false, paragraph letters (A/B/…) are hidden — e.g. continuous passages. */
  showParagraphIds?: boolean;
}

export const practiceReadingTest1: PracticeReadingTest = {
  id: "practice-reading-1",
  title: "Practice Test 1 · Reading",
  subtitle: "Reading 1 · Examining the African Hunting Debate",
  readingLabel: "Reading 1",
  passageTitle: "Examining the African Hunting Debate",
  paragraphs: [
    {
      id: "A",
      text: "When a famous Zimbabwean lion was hunted and killed by a foreign tourist, people on social media were furious. This resulted in an airline ban on the transportation of trophies killed by tourists and people repeatedly asking travellers to avoid countries that allow this kind of trophy hunting. Trophy hunting describes legal hunting where people pay to do it. It is permitted in countries including Namibia, South Africa, Tanzania and Zambia. While many people are disgusted by this, what they don't often realise is that stopping this kind of hunting might actually do more harm than good.",
    },
    {
      id: "B",
      text: "Let's look at Namibia for example. The local Minister of Environment and Tourism, Pohamba Shifeta, said that if airlines stopped transporting wildlife trophies, this would prevent the Namibians from protecting wildlife in their country. This is because the money that people pay to trophy hunt is used to stop illegal hunting, which is a much bigger problem than legal hunting. This suggests that trophy hunting can have a positive impact on the protection of wildlife, in theory at least.",
    },
    {
      id: "C",
      text: "Namibia is often described as trophy hunting's biggest success story. It is indeed true that hunting played an important role in increasing the number of wild animals after wars in the 1970s and 1980s negatively affected herd sizes. Today there are still 80 animal protection organisations in Namibia that rely completely on money from legal hunting. As Namibian journalist John Grobler says, farmers look after their animals better if they sell them to hunters. Namibia is currently experiencing a lack of rain which means some farmers may not have enough food for their animals. If they can't earn money from their animals because hunting is stopped, farmers may decide to let them die. If hunting is stopped altogether, farmers will let the whole herd die.",
    },
    {
      id: "D",
      text: "In Botswana, hunting large animals is now illegal for everyone and they have not suffered from the problems that John Grobler suggests above. However, there is a big difference between Botswana and Namibia – in Botswana there are no fences between people's land, which means animals are able to move around freely. If farmers stop feeding them, they just go somewhere else to find food. In Namibia there are fences so the same thing will not happen there. Botswana's ban on hunting is not without its problems, however. Large, wild animals are regularly killed when human life, food crops or farm animals are put in danger. In fact, this kind of animal death is considered to be a bigger killer than controlled hunting.",
    },
    {
      id: "E",
      text: "Interestingly, in a recent article, Botswanan villagers said they would protect local wildlife better if they could earn money from it through hunting. However, this opinion goes against the results of a large study carried out by Economists at Large. They concluded that in nine African countries that allow trophy hunting, the 'sport' accounted for just 1.8 percent of total tourism revenue, while, more importantly, only 3 percent of the money actually reached the communities where hunting occurs.",
    },
    {
      id: "F",
      text: "So what does all of this tell us? It tells us that whatever we might think about the hunters, hunting can have a positive effect – both for wildlife and for African people – when and where it is properly and ethically managed. However, too often the opposite occurs and the industry suffers from bad management and bad ethics. It also tells us that trophy hunting is far more complex than both those who love it and those who hate it often realise. So while the hunting industry might need some serious changes, it's perhaps not time to stop it completely when African wildlife organisations have no other way of making money. It is interesting to look at Zambia in this regard. Before hunting was stopped in 2013, 60 percent of the Zambian Wildlife Authority's (ZAWA) revenue came from legal hunting. Today, ZAWA has very little money and has had to receive some from the Zambian government more than once.",
    },
    {
      id: "G",
      text: "So what can we do? Apart from supporting Africa's national parks and wildlife areas as photographic tourists, there are no easy answers or quick solutions. But if we first try to understand the issue, it is a step in the right direction. And while this situation might make us angry, remember that shouting at our computer doesn't really help anyone.",
    },
  ],
  tasks: [
    {
      id: "prt1-task1",
      index: 1,
      title: "Test practice 1: Matching headings",
      type: "matching-headings",
      learnTips: [],
      instruction:
        "3 Complete Questions 1–6. Remember, an example is given.",
      taskHeader:
        "Questions 1–6\nThe reading passage has seven paragraphs, A–G.\nChoose the correct heading for paragraphs A–F from the list of headings below.",
      headings: [
        { id: "i", text: "Using hunting to stop a worse crime" },
        { id: "ii", text: "Legal hunting has little financial benefit" },
        { id: "iii", text: "Trying to make a living" },
        { id: "iv", text: "Start by learning about the problem" },
        { id: "v", text: "Different agricultural styles lead to different outcomes" },
        { id: "vi", text: "Emotional reactions may have negative consequences" },
        { id: "vii", text: "The system is not perfect but can be beneficial" },
        { id: "viii", text: "Motivation to take care of animals" },
        { id: "ix", text: "Travelling to Africa by plane" },
      ],
      example: { paragraphId: "G", headingId: "iv" },
      questions: [
        {
          id: 1,
          paragraphId: "A",
          key: "vi",
          evidence: ["furious", "do more harm than good"],
          tip: "Social media anger and unintended harm.",
        },
        {
          id: 2,
          paragraphId: "B",
          key: "i",
          evidence: ["stop illegal hunting", "much bigger problem"],
          tip: "Legal hunting funds action against illegal hunting.",
        },
        {
          id: 3,
          paragraphId: "C",
          key: "viii",
          evidence: [
            "farmers look after their animals better if they sell them to hunters",
          ],
          tip: "Hunting gives farmers a reason to look after animals.",
        },
        {
          id: 4,
          paragraphId: "D",
          key: "v",
          evidence: ["no fences", "In Namibia there are fences"],
          tip: "Fences vs free movement change the outcome.",
        },
        {
          id: 5,
          paragraphId: "E",
          key: "ii",
          evidence: ["1.8 percent", "only 3 percent"],
          tip: "Study: little tourism revenue reaches communities.",
        },
        {
          id: 6,
          paragraphId: "F",
          key: "vii",
          evidence: [
            "properly and ethically managed",
            "not time to stop it completely",
          ],
          tip: "Imperfect, but can help when managed well.",
        },
      ],
      advice: {
        title: "Test training: Task advice",
        instruction:
          "2 Look at the Reading test task in Activity 3, then complete the advice with the words in the box.",
        wordBox: [
          "check",
          "go back",
          "headings",
          "key words",
          "look",
          "match",
          "summarise",
        ],
        gaps: [
          {
            id: 1,
            before: "First read the ",
            after: " quickly.",
            key: "headings",
          },
          {
            id: 2,
            before: "Underline any ",
            after: " in each heading.",
            key: "key words",
          },
          {
            id: 3,
            before: "Read the first paragraph and ",
            after: " the key information in your own words.",
            key: "summarise",
          },
          {
            id: 4,
            before: "Then ",
            after: " at the headings again. Does one clearly match?",
            key: "look",
          },
          {
            id: 5,
            before: "Next ",
            after:
              " the headings to the paragraphs that you are sure about, then go back and look at the other ones again.",
            key: "match",
          },
          {
            id: 6,
            before: "Finally, ",
            after: " your answers.",
            key: "check",
          },
        ],
      },
    },
    {
      id: "prt1-task2",
      index: 2,
      title: "Test practice 2: Identifying information (True/False/Not given)",
      type: "tfng",
      learnTips: [],
      instruction: "5 Read the passage again and answer Questions 7–12.",
      taskHeader:
        "Questions 7–12\nDo the following statements agree with the information given in the reading passage? Write",
      legend: [
        {
          value: "TRUE",
          meaning: "if the statement agrees with the information",
        },
        {
          value: "FALSE",
          meaning: "if the statement contradicts the information",
        },
        {
          value: "NOT GIVEN",
          meaning: "if there is no information on this",
        },
      ],
      questions: [
        {
          id: 7,
          statement:
            "Trophy hunting is actively encouraged in some African countries.",
          key: "TRUE",
          evidence: ["legal hunting", "permitted in countries"],
          tip: "Legal hunting is permitted in several African countries.",
        },
        {
          id: 8,
          statement:
            "Money from trophy hunting is sometimes used for good causes.",
          key: "TRUE",
          evidence: [
            "money that people pay to trophy hunt is used to stop illegal hunting",
          ],
          tip: "Hunting fees are used to stop illegal hunting.",
        },
        {
          id: 9,
          statement:
            "During the 1970s and 1980s animals weren't protected in Namibia.",
          key: "NOT GIVEN",
          evidence: ["1970s and 1980s negatively affected herd sizes"],
          tip: "Wars affected herds; protection status is not stated.",
        },
        {
          id: 10,
          statement:
            "In Namibia animals are able to move around in the same way as they are in Botswana.",
          key: "FALSE",
          evidence: [
            "in Botswana there are no fences",
            "In Namibia there are fences",
          ],
          tip: "Fences mean movement is not the same.",
        },
        {
          id: 11,
          statement:
            "Local communities only receive a small amount of the money from trophy hunting.",
          key: "TRUE",
          evidence: ["only 3 percent of the money actually reached the communities"],
          tip: "Study figure: 3 percent to communities.",
        },
        {
          id: 12,
          statement:
            "The Zambian Wildlife Authority (ZAWA) still receives some money from legal hunting.",
          key: "FALSE",
          evidence: [
            "Before hunting was stopped in 2013",
            "Today, ZAWA has very little money",
          ],
          tip: "Hunting stopped; revenue was in the past.",
        },
      ],
      advice: {
        title: "Test training: True/False/Not given",
        instruction:
          "4 Look at the questions in Activity 5 which ask you to decide if statements are true, false or not given. Complete the advice below with the words in the box.",
        wordBox: ["false", "not given", "true"],
        gaps: [
          {
            id: 1,
            before:
              "If there is no information in the reading text which is the same or opposite to the information in the statement, then the answer is ",
            after: ".",
            key: "not given",
          },
          {
            id: 2,
            before:
              "If there is information in the reading text which is the same as the statement, then the answer is ",
            after: ".",
            key: "true",
          },
          {
            id: 3,
            before:
              "If there is information in the reading text which is the opposite of the statement, then the answer is ",
            after: ".",
            key: "false",
          },
        ],
      },
    },
    {
      id: "prt1-task3",
      index: 3,
      title: "Vocabulary & Follow-up",
      type: "vocab-followup",
      learnTips: [],
      vocabInstruction:
        "6 Find words or phrases in the text that mean the same as 1–8 below.",
      vocabulary: [
        { id: 1, clue: "very angry", paragraphId: "A", key: "furious" },
        { id: 2, clue: "allowed", paragraphId: "A", key: "permitted" },
        {
          id: 3,
          clue: "good influence or effect",
          paragraphId: "B",
          key: "positive impact",
        },
        {
          id: 4,
          clue:
            "need something in order to continue to exist or operate",
          paragraphId: "C",
          key: "rely on",
        },
        {
          id: 5,
          clue:
            "an official order telling people not to do or use something",
          paragraphId: "D",
          key: "ban",
        },
        {
          id: 6,
          clue: "involving principles of what is right or wrong",
          paragraphId: "F",
          key: "ethics",
        },
        {
          id: 7,
          clue: "income from business activities or taxes",
          paragraphId: "F",
          key: "revenue",
        },
        {
          id: 8,
          clue: "the answer to a problem or difficult situation",
          paragraphId: "G",
          key: "solutions",
        },
      ],
      followUpInstruction: "7 Work in pairs and discuss the questions.",
      followUpQuestions: [
        "What do you think are the best ways to protect wild animals?",
        "How can local people be encouraged to protect nature and the environment where they live?",
        "Are you worried that some animals may become extinct, for example elephants or rhinoceroses?",
        "Who should be responsible for protecting nature and wildlife?",
      ],
      speakSec: 120,
    },
  ],
};

export function normalizeVocabAnswer(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

export function checkVocabAnswer(answer: string, key: string): boolean {
  return normalizeVocabAnswer(answer) === normalizeVocabAnswer(key);
}
