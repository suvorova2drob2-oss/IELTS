export const MS_U1_READ_STEPS = [
  "Lead-in",
  "Auroville",
  "Longyearbyen",
  "Marloth & Hallstatt",
  "Prefixes",
  "Exam · Cahokia",
  "Discussion",
] as const;

export const MS_U1_READ_NEXT = [
  "Auroville →",
  "Longyearbyen →",
  "Marloth →",
  "Prefixes →",
  "Exam →",
  "Discussion →",
  "← Back to unit",
] as const;

export const readingU1 = {
  id: "ms-u1-reading-flow",
  bookPages: "pp. 8–14",
  sectionTitle: "Reading · Matching headings · Prefixes",
  unitGoals: [
    "deal with matching headings tasks",
    "identify the main idea of a paragraph",
    "understand the meaning of prefixes",
  ],

  leadIn: {
    badge: "LEAD-IN",
    instruction:
      "Read the paragraph below about the island of Mallorca. With a partner, discuss why some of the underlined nouns are preceded by the, and others have no article. Do you know any other article rules for geographical features?",
    passage: `Mallorca, the biggest of the Balearic Islands, is situated in the Mediterranean Sea, some 300km from the Valencian coast of Spain, and is an exciting mix of urban energy, rural adventure and coastal calm. Although it isn't popular with the Spanish as a tourist destination, it annually welcomes people from all over Europe (particularly from the United Kingdom, France and Germany), who may head for Alcudia Beach, or go hiking in the Tramuntanas, a mountain range that runs from the northeast to the southwest of the island. The busy capital city, Palma de Mallorca, contrasts entirely with the traditional rural towns and villages in the heart of the island, such as Algaida or Binissalem.`,
    followUp:
      "Think of a geographical area in your country and write a short paragraph like the one above, paying special attention to the correct use of articles. Swap your paragraph with a partner and correct each other's work where necessary.",
    noArticle: [
      "individual islands: e.g. Mallorca",
      "names of most countries: e.g. Spain, France, Germany, China",
      "names of beaches: Alcudia Beach",
      "names of cities/towns/regions: Palma de Mallorca, Algaida, Binissalem",
      "names of mountains: Mount Everest, Mont Blanc",
      "lakes: usually begins with Lake (Lake Windermere)",
    ],
    useThe: [
      "groups of islands: the Balearic Islands",
      "coastal areas: the Valencian Coast",
      "oceans and seas: the Mediterranean Sea, the Persian Gulf",
      "nationalities: the Spanish, the Omanis, the Chinese",
      "countries which are Republics, Kingdoms or Unions: the Republic of China, the United Kingdom (the UK), the United States of America (the USA)",
      "mountain ranges: the Tramuntanas, the Himalayas",
      "geographical areas: the northeast, the southwest",
      "rivers: the Thames, the River Thames",
    ],
  },

  matchingIntro: {
    title: "Most unusual",
    discuss:
      "Look at this title and discuss with a partner what you might expect to read in the passage.",
    tip: `This type of task requires you to choose a heading which correctly summarises the whole paragraph. Often, it is possible to find one sentence in a paragraph which conveys the main idea – this is known as the topic sentence. The topic sentence can frequently be found at the start of the paragraph, but can appear in the middle, or even at the end. Sometimes a paragraph may not have one single, clear topic sentence at all, and the main idea can only be understood by reading the paragraph in full.`,
  },

  auroville: {
    badge: "5",
    instruction:
      "Read the first sentence of a paragraph about the city of Auroville, India. It is the topic sentence. Which of the three options seems to be the most likely heading? Why?",
    topicSentence: `In today's world of conflict, greed and constant struggles for power, Auroville – aka 'the City of Dawn' – claims on its website that it was planned and built to create the ultimate model of unity, peace and harmony that can be projected across all humanity.`,
    options: [
      {
        id: "A",
        text: "The reason why attempts to create the perfect city always fail",
      },
      {
        id: "B",
        text: "An urban ideal designed for an imperfect world",
      },
      {
        id: "C",
        text: "A conflict between reality and imitation",
      },
    ],
    topicKey: "B",
    topicTip:
      "Heading B fits best: designed = planned and built; an imperfect world = today's world of conflict, greed and constant struggles for power; an urban ideal = the ultimate model of unity, peace and harmony. Heading A: nothing matches 'always fail'. Heading C: 'peace and harmony' contradicts 'conflict'.",
    fullBadge: "6",
    fullInstruction: "Read the full paragraph and check your answer.",
    fullParagraph: `In today's world of conflict, greed and constant struggles for power, Auroville – aka 'the City of Dawn' – claims on its website that it was planned and built to create the ultimate model of unity, peace and harmony that can be projected across all humanity. It has no government, no one owns any property, and money rarely, if ever, changes hands. There is no leader and rules do not exist. While most experiments at creating the perfect city do not meet with success, the majority of Auroville's residents believe their city to be an exception. Although its critics point to the fact that levels of crime have been creeping up for some years now, its citizens choose to remain there, still believing in its utopian dream, still following its path towards a better world.`,
    fullKey: "B",
  },

  longyearbyen: {
    badge: "7",
    instruction:
      "Read this opening sentence about Longyearbyen. Which heading seems to fit this sentence best?",
    tip: "The heading you want will probably not use the same words as those which appear in the paragraph, but will paraphrase the ideas.",
    tip2: "Be careful: sometimes the first sentence of a paragraph seems to fit entirely with one particular heading. However, don't be caught out – you still need to check by reading the whole paragraph.",
    openingSentence: `Longyearbyen, Norway, holds the record for being the furthest north city in the world, boasting the world's most northerly school, airport and university.`,
    options: [
      { id: "A", text: "An unwelcoming place to die" },
      { id: "B", text: "A city at the top of the world" },
      { id: "C", text: "An unusual approach to regulation" },
    ],
    openingKey: "B",
    fullBadge: "10",
    fullInstruction:
      "Now read the full paragraph and think about the overall message of the paragraph. Which heading now best fits the paragraph?",
    fullParagraph: `Longyearbyen, Spitsbergen, in the Svalbard Archipelago of Norway, holds the record for being the furthest north city in the world, boasting the world's most northerly school, airport and university. But what really sets it apart is that it can also lay claim to some of the world's strangest rules. In Longyearbyen, for example, it has been forbidden to die since 1950, the year in which scientists discovered that bodies simply cannot decompose there – the cold is too extreme. To this day, anyone found ill or dying is not given the chance to pass away, and is instead immediately taken by airplane or ship to another part of Norway so that they can die and be buried safely. But it doesn't end there. Aside from prohibiting death, there are more peculiar rules and freedoms in Longyearbyen. Residents are permitted to openly walk the streets with high-powered guns (there are 3,000 polar bears living locally). At the same time, no one is allowed to own any cats, which are forbidden because they are a danger to the bird population.`,
    fullKey: "C",
    fullTip:
      "The best heading is C: An unusual approach to regulation, because the paragraph talks about other examples of rules and laws that could be seen as unusual. It is not A – An unwelcoming place to die – because the text tells us that it is forbidden to die there.",
    topicSentence:
      "But what really sets it apart is that it can also lay claim to some of the world's strangest rules.",
    topicInstruction: "Underline the main topic sentence in the paragraph.",
  },

  marloth: {
    badge: "11",
    instruction:
      "Read the first sentence of the next paragraph about Marloth Park in South Africa. Find words or phrases that correspond to the underlined words in the headings A–C below.",
    tip: "Pay particular attention to adjectives and adverbs in headings and texts, as they may help you to eliminate an incorrect heading immediately.",
    openingSentence: `Despite the fact the town of Marloth Park is close to the Kruger National Park, one of the largest game reserves in Africa, and despite the constant threat of visits from wild animals such as lions and hippopotamuses, its anxious residents are not allowed to build fences around their houses to keep out their neighbours.`,
    options: [
      { id: "A", text: "An unusual approach to regulation" },
      { id: "B", text: "Dealing with the occasional dangers of the wild" },
      {
        id: "C",
        text: "Where humans and animals cautiously co-exist",
      },
    ],
    paraphraseMatches: [
      {
        id: "A",
        label: "regulation",
        match: "not allowed to build fences around their houses",
      },
      {
        id: "B",
        label: "dangers of the wild",
        match: "the constant threat of visits from wild animals",
      },
      {
        id: "C",
        label: "humans and animals / co-exist",
        match:
          "lions and hippopotamuses [and] anxious residents; residents are not allowed to … keep out their neighbours",
      },
    ],
    eliminateBadge: "12",
    eliminateInstruction:
      "Now focus on the adverbs and adjectives in the headings. Which heading is no longer a possible answer?",
    eliminateKey: "B",
    eliminateTip:
      "B Dealing with the occasional dangers of the wild – no longer possible as it contradicts 'the constant threat'.",
    fullBadge: "13a",
    fullInstruction: "Read the rest of the paragraph and decide on your answer.",
    fullParagraph: `In fact the only fence permitted in the town was built by the local authority, interestingly, with the aim of keeping humans out of the park, rather than containing the animals inside. Consequently, it is not unusual to see giraffes or elephants causing traffic jams, for example, and even predator attacks on humans are unnervingly common – a lion was recently said to have mauled and eaten an escaping burglar. Yet even after this, while some residents then called for all lions to be rounded up and shot, others suggested that they be allowed to walk the thoroughfares as a type of crime control, after an increase in the number of burglaries. Everywhere in Marloth Park, a wary understanding exists between man and beast.`,
    fullKey: "C",
    fullTip:
      "Heading C is correct. A An unusual approach to regulation – still possible as a correct answer until you read more. B is eliminated by 'constant' vs 'occasional'. C Where humans and animals cautiously co-exist – most likely as it paraphrases the sentence.",
    topicSentence:
      "Everywhere in Marloth Park, a wary understanding exists between man and beast.",
    topicInstruction: "Identify the main topic sentence in the paragraph.",
  },

  hallstatt: {
    badge: "13b",
    instruction:
      "Some paragraphs have no clear topic sentence. Read this paragraph and make notes about its main idea.",
    paragraph: `The real Hallstatt is in Austria and is proud to be a traditional UNESCO* World Heritage Site. The Chinese Hallstatt is a carbon copy, built in Guangdong province, China, by a millionaire who sponsored the construction of the imitation town. It cost approximately $940 million to build, and looks exactly like the real Hallstatt, all the way down to its wooden houses, its narrow streets, and its funicular railway. When the residents of Austria's Hallstatt (including the mayor) were invited to visit it, they expressed pride that their town was considered so improbably beautiful that it had been reproduced in its entirety, but they still had cause for complaint. Originally, the Chinese company had promised to meet with the Austrian residents to confirm that they were happy for their homes to be copied; instead, they simply sent their employees to Austria to take photos, and they returned home to China without speaking to a single resident of the original Hallstatt.`,
    footnote:
      "* United Nations Educational, Scientific and Cultural Organization",
    chooseInstruction:
      "Use your notes to help you choose the correct heading.",
    options: [
      { id: "A", text: "A conflict between reality and imitation" },
      { id: "B", text: "The importance of official recognition" },
      { id: "C", text: "The result of encouraging wider investment" },
    ],
    key: "A",
  },

  prefixes: {
    identify: {
      badge: "15",
      instruction:
        "Identify the prefixes in the underlined words. Then work out a general meaning for each.",
      items: [
        {
          id: "un",
          word: "unusual",
          prefix: "un-",
          meaning: "not / opposite",
        },
        {
          id: "im",
          word: "imperfect",
          prefix: "im-",
          meaning: "not",
        },
        {
          id: "co",
          word: "co-exist",
          prefix: "co-",
          meaning: "together",
        },
      ],
      stems: [
        { id: "A", text: "An unusual approach to regulation" },
        { id: "B", text: "An urban ideal designed for an imperfect world" },
        {
          id: "C",
          text: "Where humans and animals cautiously co-exist",
        },
      ],
    },
    bank: {
      badge: "16",
      instruction:
        "With a partner, think of some words that begin with the prefixes in the box. Then discuss what the general meaning of each prefix is.",
      prefixes: [
        {
          id: "post-",
          meaning: "after, behind",
          examples: "postgraduate, post-mortem, postpone",
        },
        {
          id: "for-/fore-",
          meaning: "before",
          examples: "forecast, forward, forehead",
        },
        {
          id: "sub-",
          meaning: "under, below",
          examples: "submarine, subway, subtitle",
        },
        {
          id: "multi-",
          meaning: "many, much",
          examples: "multinational, multiply, multicultural",
        },
        {
          id: "anti-",
          meaning: "against, opposite",
          examples: "antivirus, antiseptic, antiperspirant",
        },
        {
          id: "mis-",
          meaning: "wrong, bad, badly",
          examples: "misunderstand, misjudge, misspell",
        },
        {
          id: "non-",
          meaning: "not",
          examples: "non-profit, non-fiction, nonsense",
        },
        {
          id: "pre-",
          meaning: "before",
          examples: "preview, prepay, prejudge",
        },
        {
          id: "over-",
          meaning: "above, too much",
          examples: "overload, overtake, oversleep",
        },
        {
          id: "under-",
          meaning: "below, not enough",
          examples: "underwater, underwear, underage",
        },
      ],
    },
    form: {
      badge: "17",
      instruction:
        "Using the correct prefixes from the box above, change the words in CAPITALS into the correct forms.",
      items: [
        {
          id: "A",
          stem: "WARN",
          before:
            "The tourist brochure for Marloth Park ensures that visitors are ",
          after:
            " about the wild animals they may encounter walking the streets.",
          key: "forewarned",
          altKeys: ["pre-warned", "prewarned", "fore-warned"],
          chip: "fore-/pre- + WARN",
        },
        {
          id: "B",
          stem: "POPULATE",
          before:
            "One thing you can always be sure of in Longyearbyen – the cemeteries will never be ",
          after: ".",
          key: "overpopulated",
          altKeys: [],
          chip: "over- + POPULATE",
        },
        {
          id: "C",
          stem: "INFORM",
          before:
            "The residents of Hallstatt believed that they would be consulted by the company building a copy of their town – but it turns out they were ",
          after: ".",
          key: "misinformed",
          altKeys: [],
          chip: "mis- + INFORM",
        },
        {
          id: "D",
          stem: "GOVERN",
          before:
            "Auroville was founded according to a(n) ",
          after: " system of rules and beliefs.",
          key: "anti-government",
          altKeys: ["anti-governmental", "antigovernment", "antigovernmental"],
          chip: "anti- + GOVERN",
        },
      ],
    },
  },

  exam: {
    badge: "EXAM SKILLS",
    instruction:
      "Read the passage and answer questions 1–6. The Reading passage has six paragraphs, A–F. Choose the correct heading for each paragraph from the list of headings below. Write the correct number, i–viii.",
    questions: [
      { id: "1", para: "A" },
      { id: "2", para: "B" },
      { id: "3", para: "C" },
      { id: "4", para: "D" },
      { id: "5", para: "E" },
      { id: "6", para: "F" },
    ],
    headings: [
      { id: "i", text: "The benefits of collaboration" },
      { id: "ii", text: "A forerunner of the modern metropolis" },
      {
        id: "iii",
        text: "A period of intense activity and plans completed",
      },
      { id: "iv", text: "A clear contrast between then and now" },
      {
        id: "v",
        text: "The rise and mysterious decline of Cahokia",
      },
      {
        id: "vi",
        text: "An archaeological theory to explain Cahokia's development",
      },
      {
        id: "vii",
        text: "The light and dark of archaeological finds",
      },
      {
        id: "viii",
        text: "A city completely unlike any of its contemporaries",
      },
    ],
    paragraphKeys: {
      A: "ii",
      B: "vi",
      C: "iii",
      D: "v",
      E: "viii",
      F: "vii",
    } as Record<string, string>,
    title: "CAHOKIA – ANCESTOR OF TODAY'S CAPITAL CITIES",
    passage: [
      {
        id: "A",
        text: `A thousand years ago the Mississippians, a diverse group of Native Americans who lived in the area which is today known as the south-eastern United States, took a small village on the Mississippi River and turned it into one of the world's first great urban centres. Cahokia, as it has been called by archaeologists, became as large as London was in the 11th century, and some would argue that it was just as forward-looking and prosperous as its European equivalents. Sophisticated, cosmopolitan and ahead of its time, Cahokia was at the heart of ancient society in North America; an ancestor of today's capital cities.`,
      },
      {
        id: "B",
        text: `In one respect in particular, Cahokia was quite unusual compared to other cities around at the same time. Archaeologists working on the site have found enough evidence over the past fifty years to conclude that, at a certain time, around 35% of the population were not from Cahokia at all; it seems that many of the tribes that lived all along the Mississippi River at some point began to relocate to Cahokia. These researchers have been unable to find more than a handful of other examples of such relocation of tribes, but they do know that something about Cahokia attracted thousands of people to this regional centre. And that, they postulated, appears to have been thanks to a small group of planners who one day decided to redesign the entire village.`,
      },
      {
        id: "C",
        text: `After the redesigns of the village were put in place, the Native Americans at Cahokia worked with tireless determination to carry them out. Over the course of a few decades, they transported huge volumes of soil from the nearby countryside to create 120 huge mounds of earth, the biggest of which rose to one hundred feet. On top of these, they built a vast urban environment, complete with a vibrant town centre, municipal buildings, and a fifty-acre plaza at the foot of the biggest mound. What makes it even more impressive to our modern imaginations is that, with no machinery then, they used their bare hands and woven baskets to dig up and carry the soil from the surrounding regions back to their city-in-waiting. Eventually, after these efforts, the vision of the city planners was fulfilled, but even they could not have predicted how popular Cahokia would become.`,
      },
      {
        id: "D",
        text: `From this period on, Cahokia was alive with intense activity, and grew in size every year, partly because of the co-operation between the residents. While the men busied themselves with manual work, like constructing new buildings, or hunting and fishing in the forests and rivers within a day's walk of the city, the women made sure that the fields stayed healthy and grew crops, and the homes were kept clean. In many ways, it seems to have been the ideal place to live, and one with an exciting and prosperous future ahead of it. And yet, having become a major population centre around AD 1050, by 1350 it had been almost completely abandoned. Somewhere in the course of 300 years, something happened to Cahokia to cause this, but it is an enigma that even archaeologists or historians themselves struggle to resolve.`,
      },
      {
        id: "E",
        text: `This rather curious state of affairs exists today because researchers have never found a single piece of evidence that can conclusively explain why the residents left. Academics who have studied other Native American sites have always found weapons of war buried deep underground. And yet, the bows, arrows and swords that littered the ground at these other sites were nowhere to be seen at Cahokia. Other factors, such as disease or colonisation from European invasion, do not seem to be possible in this case, as common as they were elsewhere at that time. The absence of definitive theories as to Cahokia's decline is highly unusual, but then again, Cahokia was no ordinary city and perhaps comparisons with other urban centres of the time cannot be made.`,
      },
      {
        id: "F",
        text: `While academics remain bemused as to why the residents fled the city, we can still marvel at the individual artefacts that archaeologists have discovered: the jewellery worn, the pots used to cook in, the small workshop at the base of one of the mounds. That said, there is also a more unpleasant side to their investigations. Human sacrifice, it seems, was a common fact of life in Cahokia; even if we cannot be sure whether this was for religious or for other reasons, we can have no doubt that it happened frequently. The bodies of hundreds of people, mostly young women, have been found buried in mass graves, and the way in which they died was often horrific. A sombre reminder that even 'advanced' city states had their shadowy sides.`,
      },
    ],
  },

  discussion: {
    heading: "Discussion",
    prompts: [
      "Which of the places in this unit (Auroville, Longyearbyen, Marloth Park, Hallstatt, Cahokia) would you most like to visit, and why?",
      "Do you think unusual rules (like those in Longyearbyen or Marloth Park) help a community, or do they make life harder?",
      "What makes a city 'ideal' for you – peace and harmony, strict regulation, or something else?",
    ],
  },
} as const;
