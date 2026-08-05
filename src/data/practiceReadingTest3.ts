import type { PracticeReadingTest } from "./practiceReadingTest1";

/** Practice Test 3 · Reading — The ketchup conundrum (exact book wording). */

export const practiceReadingTest3: PracticeReadingTest = {
  id: "practice-reading-3",
  title: "Practice Test 3 · Reading",
  subtitle: "The ketchup conundrum",
  readingLabel: "Reading",
  passageTitle: "The ketchup conundrum",
  showParagraphIds: true,
  paragraphs: [
    {
      id: "A",
      text: "Many years ago, just one mustard dominated the U.S. supermarket shelves: the American brand French's. It was a yellow mustard that came in a plastic bottle. If you looked hard in the grocery store, you might find something in the specialty foods section called Grey Poupon, which was a French-style mustard, light brown in colour. In the early 1970s, Grey Poupon was no more than a hundred-thousand-dollar-a-year business. Few people knew what it was or how it tasted, or had any particular interest in a different mustard to French's. Then one day the Heublein Company, which owned Grey Poupon, discovered something: if you gave people a mustard taste test, a significant number of people who tried Grey Poupon switched from French's yellow mustard. In the food world that almost never happens, which made Grey Poupon special.",
    },
    {
      id: "B",
      text: "Heublein put Grey Poupon in a bigger jar, with a new label that made it seem French, even though it was made in Connecticut with Canadian ingredients. The company ran tasteful adverts in upscale food magazines. They put the mustard in little foil packets and distributed them with meals on airlines — which was a brand-new idea at the time. Then they hired the Manhattan advertising agency Lowe Marschalk to do something, on a modest budget, for television. The agency came back with an idea: A Rolls-Royce is driving down a country road. There's a man in the back seat in a suit with a plate of beef on a silver tray. He nods to the chauffeur, who hands back a jar of Grey Poupon. Another Rolls-Royce pulls up alongside. A man leans his head out the window. 'Pardon me. Would you have any Grey Poupon?'",
    },
    {
      id: "C",
      text: "In the cities where the adverts were shown, sales of Grey Poupon rose 40 to 50 percent. Grocery stores put Grey Poupon next to French's and by the end of the 1980s it was the most powerful brand in mustard. ‘The tagline in the commercial was that this was one of life's finer pleasures,’ Larry Elegant, who wrote the original Grey Poupon advert, says, ‘and that, along with the Rolls-Royce, seemed to impart to people's minds that this was something truly different and superior.’",
    },
    {
      id: "D",
      text: "The rise of Grey Poupon proved that the American supermarket shopper was happy to pay more for a better quality product. Furthermore, its success showed that a consumer's taste and habits were not fixed: that just because mustard had always been yellow did not mean that consumers would use only yellow mustard. It is because of Grey Poupon that the standard American supermarket today has an entire mustard section. It is also because of Grey Poupon that a man named Jim Wigon decided, several years ago, to enter the ketchup business. Jim Wigon had a simple vision: build a better ketchup — the way Grey Poupon built a better mustard — and the world will beat a path to your door. If only it were that easy.",
    },
    {
      id: "E",
      text: "Wigon runs his ketchup business under the brand World's Best Ketchup. He starts with red peppers and then adds Spanish onions, garlic and a high-end tomato paste. Basil is chopped by hand rather than by machine. He uses maple syrup, not corn syrup, which gives him a quarter of the sugar of the most popular tomato ketchup brand. He then pours his ketchup into a clear glass ten-ounce jar, and sells it for three times the price of other brands.",
    },
    {
      id: "F",
      text: "Wigon then travels around the country selling the product to supermarkets. At the end of one long day, Wigon had sold 90 jars but he had also got two parking tickets and had to pay for a hotel room, so he was not going home with money in his pocket. And it isn't just World's Best that is finding it difficult. In the speciality ketchup world, there is River Run and Uncle Dave's, from Vermont, and Muir Glen Organic and Mrs Tomato Head Catsup, in California, and dozens of others — and every year Heinz's huge share of the ketchup market just grows. It is possible, of course, that ketchup is waiting for its own version of that Rolls-Royce commercial — the magic formula that will satisfy an unmet need. It is also possible, however, that the rules which apply to Grey Poupon and to olive oil and salad dressing and almost everything else in the supermarket, simply do not apply to ketchup.",
    },
  ],
  tasks: [
    {
      id: "prt3-task1",
      index: 1,
      title: "Test practice: Matching information",
      type: "matching-information",
      learnTips: [],
      instruction: "4 Read the text and complete Questions 1–6.",
      taskHeader:
        "Questions 1–6\nThe passage has six paragraphs labelled A–F.\nWhich paragraph contains the following information?\nWrite the correct letter, A–F.\nNB You may use any letter more than once.",
      allowReuse: true,
      training: {
        title: "Test training: Synonyms and paraphrasing",
        instruction:
          "3 In the Reading test, you will need to find in the text synonyms or paraphrasing of words in the question. In pairs, think of synonyms for these words.",
        items: [
          {
            id: 1,
            prompt: "a dream or an idea",
            key: "vision",
            accept: ["vision", "a vision", "an idea", "idea", "dream"],
          },
          {
            id: 2,
            prompt: "to change",
            key: "to switch",
            accept: ["to switch", "switch", "switched", "change", "to change"],
          },
          {
            id: 3,
            prompt: "a profit",
            key: "money in your pocket",
            accept: [
              "money in your pocket",
              "money in his pocket",
              "profit",
              "a profit",
            ],
          },
          {
            id: 4,
            prompt: "to compete",
            key: "to challenge",
            accept: ["to challenge", "challenge", "compete", "to compete"],
          },
          {
            id: 5,
            prompt: "explanation",
            key: "reason/justification",
            accept: [
              "reason",
              "justification",
              "reason/justification",
              "explanation",
            ],
          },
          {
            id: 6,
            prompt: "a description",
            key: "account/story",
            accept: ["account", "story", "account/story", "description", "a description"],
          },
        ],
      },
      questions: [
        {
          id: 1,
          statement: "the first mention of a man with a dream",
          key: "D",
          evidence: ["Jim Wigon had a simple vision", "enter the ketchup business"],
          tip: "Jim Wigon’s ‘simple vision’ / dream first appears in paragraph D.",
        },
        {
          id: 2,
          statement:
            "research that showed customers were happy to change brands",
          key: "A",
          evidence: [
            "mustard taste test",
            "switched from French's yellow mustard",
          ],
          tip: "The Grey Poupon taste test showed many people switched brands.",
        },
        {
          id: 3,
          statement:
            "a description of a time when a salesman failed to make a profit",
          key: "F",
          evidence: [
            "sold 90 jars",
            "not going home with money in his pocket",
          ],
          tip: "Wigon sold jars but parking tickets and a hotel left him without profit.",
        },
        {
          id: 4,
          statement:
            "an example of an industry where small businesses are unable to compete with the leading brand",
          key: "F",
          evidence: [
            "speciality ketchup world",
            "Heinz's huge share of the ketchup market just grows",
          ],
          tip: "Specialty ketchups struggle while Heinz’s share keeps growing.",
        },
        {
          id: 5,
          statement: "an explanation for the success of an advertising campaign",
          key: "C",
          evidence: [
            "one of life's finer pleasures",
            "truly different and superior",
          ],
          tip: "Larry Elegant explains the tagline + Rolls-Royce made Grey Poupon seem superior.",
        },
        {
          id: 6,
          statement: "a description of how a product is made",
          key: "E",
          evidence: [
            "starts with red peppers",
            "Basil is chopped by hand",
            "maple syrup, not corn syrup",
          ],
          tip: "Paragraph E details how World's Best Ketchup is made.",
        },
      ],
    },
    {
      id: "prt3-task2",
      index: 2,
      title: "Questions 7–12 · Summary completion",
      type: "summary-completion",
      learnTips: [],
      instruction:
        "5 Now complete the summary (Questions 7–12) using words from paragraphs D–F.",
      taskHeader:
        "Questions 7–12\nComplete the summary below.\nWrite ONE WORD ONLY for each answer.",
      summary:
        "Jim Wigon was inspired by the success of Grey Poupon mustard to launch his own {{7}}, producing and selling high-quality tomato ketchup. The ingredients include red peppers, high-end tomato paste, hand-chopped basil and maple syrup, with only a {{8}} of the sugar content of the most popular {{9}}. He then sells his ketchup for three times the price. Unfortunately, he has not been very successful, despite personally travelling around the country trying to sell his {{10}} directly to supermarkets. Not only does he face stiff competition in the world of {{11}} ketchup but it seems as though while consumers are happy to pay over the odds for a premium mustard, the same {{12}} simply don’t apply when it comes to ketchup.",
      blanks: [
        {
          id: 7,
          key: "business",
          accept: ["business"],
          evidence: ["ketchup business", "World's Best Ketchup"],
        },
        {
          id: 8,
          key: "quarter",
          accept: ["quarter"],
          evidence: ["a quarter of the sugar"],
        },
        {
          id: 9,
          key: "brand",
          accept: ["brand"],
          evidence: ["most popular tomato ketchup brand"],
        },
        {
          id: 10,
          key: "product",
          accept: ["product"],
          evidence: ["selling the product to supermarkets"],
        },
        {
          id: 11,
          key: "speciality",
          accept: ["speciality", "specialty"],
          evidence: ["speciality ketchup world"],
        },
        {
          id: 12,
          key: "rules",
          accept: ["rules"],
          evidence: ["the rules which apply to Grey Poupon"],
        },
      ],
    },
    {
      id: "prt3-task3",
      index: 3,
      title: "Language · Follow-up",
      type: "learn-pack",
      learnTips: [],
      languageInstruction:
        "6 Read these sentences from the text. Write the nouns that the pronouns in bold refer to.",
      languageItems: [
        {
          id: 1,
          prompt:
            "Few people knew what **it** was or how **it** tasted, … (Paragraph A)",
          paragraphId: "A",
          key: "Grey Poupon mustard",
          accept: [
            "Grey Poupon mustard",
            "Grey Poupon",
            "mustard",
            "the mustard",
          ],
        },
        {
          id: 2,
          prompt:
            "In the food world **that** almost never happens, … (Paragraph A)",
          paragraphId: "A",
          key: "people switching to a different brand/product",
          accept: [
            "people switching to a different brand/product",
            "people switching to a different brand",
            "people switching to a different product",
            "switching brands",
            "people switching brands",
          ],
        },
        {
          id: 3,
          prompt:
            "**They** put the mustard in little foil packets and distributed **them** with meals on airlines … (Paragraph B)",
          paragraphId: "B",
          key: "the company/Heublein",
          accept: [
            "the company/Heublein",
            "the company",
            "Heublein",
            "Heublein Company",
            "the Heublein Company",
            "They = the company; them = foil packets",
            "foil packets",
            "little foil packets",
            "the foil packets",
          ],
        },
        {
          id: 4,
          prompt: "If only **it** were that easy. (Paragraph D)",
          paragraphId: "D",
          key: "building a successful business",
          accept: [
            "building a successful business",
            "building a better ketchup",
            "entering the ketchup business",
            "Jim Wigon's vision",
          ],
        },
        {
          id: 5,
          prompt:
            "In the speciality ketchup world, there is River Run and Uncle Dave’s, from Vermont, and Muir Glen Organic and Mrs Tomato Head Catsup, in California, and dozens of **others** … (Paragraph F)",
          paragraphId: "F",
          key: "other brands of ketchup/ketchups",
          accept: [
            "other brands of ketchup/ketchups",
            "other brands of ketchup",
            "other brands of ketchups",
            "other ketchups",
            "other brands",
            "ketchups",
          ],
        },
      ],
      followUpInstruction:
        "7 Work in pairs and discuss the situation below.",
      followUpQuestions: [
        "Imagine you were asked to make a magazine advert to help sell a high-quality sauce that is considerably more expensive than other sauces. What would you focus on? How would you explain the price? What would your advert look like?",
      ],
      speakSec: 120,
    },
  ],
};
