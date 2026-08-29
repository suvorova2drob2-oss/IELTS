import type { MindsetFlowData } from "./flowTypes";
import { PASSAGE_U5_ECCENTRIC_RULERS } from "./readingPassages";

export const MS_U5_READ_STEPS = [
  "Lead-in",
  "Odd one out",
  "Skim views",
  "Claims & list",
  "Yes / No / NG",
  "Conditionals",
  "Exam · Pharaohs",
] as const;

export const MS_U5_READ_NEXT = [
  "Odd one out →",
  "Skim →",
  "Claims →",
  "Y/N/NG →",
  "Conditionals →",
  "Exam →",
  "← Back to unit",
] as const;

export const readingU5: MindsetFlowData = {
  id: "ms-u5-reading-flow",
  bookPages: "pp. 93–99",
  sectionTitle: "Reading · Claims / views · Y/N/NG",
  unitGoals: [
    "identify a writer's claims or views",
    "deal with the 'Select from a list' and 'Yes / No / Not Given' task types",
    "use second, third and mixed conditionals",
  ],
  steps: [...MS_U5_READ_STEPS],
  nextLabels: [...MS_U5_READ_NEXT],
  panels: [
    {
      kind: "intro",
      badge: "LEAD-IN",
      instruction:
        "Which countries still have a monarchy today? Can you name any current or past kings or queens? Which five of the following words are not specifically associated with royalty?",
      discuss: [
        "monarchy · dynasty · sovereign · emperor · rule · reign · abdicate · leader · era · heir · regent · coronation",
      ],
      tips: [
        "Not specifically associated with royalty: rule, era, heir, dynasty, leader (answer key).",
        "Sample monarchs: Bahrain – King Hamad; Belgium – King Philippe; UK – Queen Elizabeth II (at time of publication), etc.",
      ],
    },
    {
      kind: "oddOut",
      badge: "3",
      instruction:
        "Look at the groups of words. For each group, choose one odd-word-out. Why is it different? There may be more than one correct answer.",
      tip: "Example: queen / empress / monarch / princess — Monarch can be male or female; princess is not a ruler.",
      groups: [
        {
          id: "1",
          words: ["kingdom", "empire", "realm", "dynasty"],
          key: "dynasty",
          reason:
            "dynasty: a period of time, or a series of rulers from the same family; the others are synonyms for the lands ruled by a king or emperor.",
        },
        {
          id: "2",
          words: ["sovereign", "regent", "emperor", "king"],
          key: "regent",
          reason:
            "regent: a person acting for a monarch — the others are actual monarchs or rulers.",
        },
        {
          id: "3",
          words: ["abdicate", "reign", "rule", "govern"],
          key: "abdicate",
          reason:
            "abdicate: to give up the role of monarch; the others mean to lead as the monarch.",
        },
        {
          id: "4",
          words: ["coronation", "crown", "investiture", "ceremony"],
          key: "crown",
          reason: "crown: it is an object; the others are events.",
        },
      ],
    },
    {
      kind: "mc",
      badge: "4",
      instruction:
        "Skim the text on eccentric rulers quickly and answer the questions. Give reasons for your answers.",
      passage: PASSAGE_U5_ECCENTRIC_RULERS,
      items: [
        {
          id: "1",
          stem: "What is the purpose of the text?",
          options: [
            { id: "A", text: "to inform and entertain" },
            { id: "B", text: "to argue and persuade" },
            { id: "C", text: "to criticise monarchies and rulers" },
          ],
          key: "A",
        },
        {
          id: "2",
          stem: "Which of the following do you think summarises the author's view on royalty?",
          options: [
            { id: "A", text: "pro-royalty" },
            { id: "B", text: "anti-royalty" },
            { id: "C", text: "neither pro- nor anti-royalty" },
          ],
          key: "C",
          tip: "Someone who is pro-royalty would be unlikely to write a text that focuses on eccentricity; someone anti-royalty is unlikely to defend rulers, which this text does at times.",
        },
      ],
    },
    {
      kind: "match",
      badge: "5–9",
      instruction:
        "Find these sentences in the text. For each, decide if the author is making a claim or expressing a view. Then match statements 1–4 with people A–D.",
      passage: PASSAGE_U5_ECCENTRIC_RULERS,
      tip: "Claims = author's interpretation of facts; views = subjective personal opinions.",
      bank: [
        { id: "claim", text: "claim" },
        { id: "view", text: "view" },
        { id: "A", text: "Caligula" },
        { id: "B", text: "George III" },
        { id: "C", text: "Charles VI" },
        { id: "D", text: "Fyodor I" },
      ],
      items: [
        {
          id: "c1",
          stem: "Although many monarchs have done justice to this vision … there have also been a number of bizarre, frankly eccentric rulers.",
          key: "claim",
        },
        {
          id: "c2",
          stem: "Happily for him, […] his subjects saw his childlike simplicity as being divinely inspired.",
          key: "claim",
        },
        {
          id: "c3",
          stem: "He was the first English king to study the sciences …",
          key: "claim",
        },
        {
          id: "c4",
          stem: "I for one think we should celebrate royal eccentricity.",
          key: "view",
        },
        {
          id: "1",
          stem: "He believed himself to be very fragile.",
          key: "C",
          tip: "Charles VI — made of glass / rods in clothing.",
        },
        {
          id: "2",
          stem: "He didn't really want to be the ruler.",
          key: "D",
          tip: "Fyodor I — no interest in ruling.",
        },
        {
          id: "3",
          stem: "It is claimed he talked to celestial bodies.",
          key: "A",
          tip: "Caligula — conversations with the Moon and Jupiter.",
        },
        {
          id: "4",
          stem: "He supported the advancement of scientific research.",
          key: "B",
          tip: "George III — patron of the sciences.",
        },
      ],
    },
    {
      kind: "ynng",
      badge: "13",
      instruction:
        "Are the following claims made by the writer? Write Yes, No or Not Given.",
      passage: PASSAGE_U5_ECCENTRIC_RULERS,
      items: [
        {
          id: "1",
          stem: "Countries should be ashamed of their eccentric monarchs.",
          key: "No",
          tip: "… we should celebrate royal eccentricity. It certainly makes reading history much more interesting.",
        },
        {
          id: "2",
          stem: "All of the rulers were replaced by close relatives.",
          key: "Not Given",
          tip: "The text only mentions this in the case of Charles VI, Fyodor and Joanna.",
        },
        {
          id: "3",
          stem: "Russian history might have been different if Fyodor had had children.",
          key: "Yes",
          tip: "Had he left an heir, Russian history might well have gone in a different direction.",
        },
      ],
    },
    {
      kind: "match",
      badge: "14–15",
      instruction:
        "Complete the conditionals table: match structures A–D to slots 1–4. Then identify the conditional type of each sentence from the text.",
      bank: [
        { id: "A", text: "would + verb" },
        { id: "B", text: "would have + past participle" },
        { id: "C", text: "If + past simple / past continuous" },
        { id: "D", text: "If + past perfect / past perfect continuous" },
        { id: "second", text: "second" },
        { id: "third", text: "third" },
        { id: "mixed 1", text: "mixed 1" },
      ],
      items: [
        { id: "t1", stem: "Second — If clause structure →", key: "C" },
        { id: "t2", stem: "Second — Result clause →", key: "A" },
        { id: "t3", stem: "Third — If clause structure →", key: "D" },
        { id: "t4", stem: "Third — Result clause →", key: "B" },
        {
          id: "s1",
          stem: "… if we compared his supposed behaviour … would almost certainly be regarded as even more eccentric.",
          key: "second",
        },
        {
          id: "s2",
          stem: "… had it not been for these treatments, he would not have been quite so unstable.",
          key: "third",
        },
        {
          id: "s3",
          stem: "Had he left an heir, Russian history might well have gone in a different direction.",
          key: "third",
        },
        {
          id: "s4",
          stem: "Without them, history would be a lot less interesting.",
          key: "mixed 1",
        },
      ],
    },
    {
      kind: "passageExam",
      badge: "EXAM",
      instruction: "Read the passage and answer questions 1–10.",
      passage: `A pharaoh was a political and religious leader of Ancient Egypt. He – or, less often, she – enjoyed two titles: 'Lord of the Two Lands' and 'High Priest of Every Temple'. 'Two Lands' referred to the unification of Upper and Lower Egypt, which occurred during the First Dynasty in about 3150 BCE. King Menes (now believed to be King Narmer) was the first to be depicted wearing the two crowns of Egypt. The word pharaoh is the Greek form of 'pero' or 'per-a-a', which literally means 'great house', a reference to the royal residence. The honorific title first appeared in what is now known as the New Kingdom period of 1570–1069 BCE. Prior to that, the pharaohs were known as kings and addressed as 'Your Majesty' by both members of the court and foreign dignitaries. A tradition which started during this period and was maintained into the Pharaonic period was that foreign rulers addressed the king or pharaoh as 'Brother'.

As time passed, the pharaoh came to be considered a god on earth, a kind of intermediary between gods and humans. It was believed that after death, a pharaoh became Osiris, god of the dead. As such, probably their key role in Ancient Egyptian society was a religious one. In particular, each pharaoh oversaw the building of great monuments and temples to pay homage to the gods, as well as statues commemorating their own achievements. It was the pharaoh who chose the site of temples and officiated at religious ceremonies.

In addition to the religious duties, the pharaoh had civil duties such as making laws, collecting taxes and deciding on the work to be done, and he owned all the land in the country. According to Joshua J. Mark (www.ancient.eu), the pharaoh's chief responsibility was to maintain Ma'at or Universal Harmony, and warfare was an essential part of this. As well as defending the borders, it may have been considered necessary for the sake of harmony to attack neighbouring lands to gain natural resources.

Most of the pharaohs were male. In Exploring Ancient Egypt, Ian Shaw notes that there were only two or three women who were pharaohs, though many women held considerable power as the 'great wife', the first wife of the reigning pharaoh. Hatshepsut, the first female pharaoh, who ruled from 1473 to 1458 BCE made her mark on history. Owen Jarus points out that statues depicted Hatshepsut, whose name means 'foremost of noblewomen', as a male king complete with beard. She is remembered for her building projects, which were more ambitious than those of her ancestors. These included several obelisks and a Palace of Ma'at. She is buried in the Valley of the Kings in a huge funerary complex. However, her memory was not honoured. Egyptologist Joyce Tyldesley claims her tomb was defaced by her nephew and successor, Thutmose III, who wanted to take credit for her achievements. Hatshepsut's mummy was discovered in 2007. She had died aged 50, balding and suffering from diabetes. In spite of the desecration of her tomb, history remembers her as a great leader.

In Ancient Egypt kingship usually passed from father to son. However, changes of leadership were not always peaceful, nor did they always happen according to tradition. Some, like Hatshepsut, seized power illegally, and when they did so they typically claimed divine right. Sometimes crown princes were prepared for their future role in advance by being appointed co-regent, which would help them become accustomed to the importance of their role. Enthronements were major events, which celebrated a new beginning. The new reign, it was hoped, would signify an end to evil and injustice. The pharaoh had great, but not absolute, power. To achieve his aims, it was usual for the pharaoh to lavish gifts of power and possessions on those who could help him, such as military leaders, members of the priesthood and the scribal elite.

New information about the pharaohs is still coming to light. A new burial site, potentially as important as the Valley of the Kings, was discovered in 2014 by archaeologists from the University of Pennsylvania in the United States. Danish archaeologist Kim Ryholt first speculated about the existence of a lost dynasty of Ancient Egypt, while legendary Egyptologist Flinders Petrie discovered the site in 1902 but never excavated it, believing the tomb to be of too modest a size to be of significance. The discovery of the mummy of King Senebkay at this site in Abydos, about 100 km north-west of the Valley of the Kings, is the first definitive proof of another pharaonic dynasty.

According to the archaeologist on the project, Forster Mueller, there were more kings and therefore certainly more tombs nearby. Although the tomb had been vandalised by ancient looters, the team from Pennsylvania managed to piece together most of King Senebkay's skeleton. Another project member, Josef Wegner, admits that what they are hoping for is an intact tomb that somehow escaped the looters, though realistically it is fragments they are looking for. They deciphered Senebkay's name from hieroglyphics found inside the tomb. The 3,600-year-old King had been tall for his time at 1.75m and had died in his late 40s. This evidence of a third dynasty of pharaohs is an exciting discovery for all those interested in the history of Ancient Egypt. Even in the twenty-first century, the great pharaohs may still have more secrets to reveal.`,
      ynng: {
        instruction:
          "Questions 1–6: Do the following statements agree with the claims of the writer? Write YES / NO / NOT GIVEN.",
        items: [
          {
            id: "1",
            stem: "Conflict with other countries was seen as compatible with maintaining peace in Egypt.",
            key: "Yes",
          },
          {
            id: "2",
            stem: "Pharaohs' wives often exerted great influence.",
            key: "Yes",
          },
          {
            id: "3",
            stem: "The first female pharaoh was particularly influential.",
            key: "Yes",
          },
          {
            id: "4",
            stem: "Hatshepsut came to power in the traditional way.",
            key: "No",
          },
          {
            id: "5",
            stem: "Military leaders, priests and scribes would attend enthronement ceremonies.",
            key: "Not Given",
          },
          {
            id: "6",
            stem: "King Senebkay's skeleton was stolen by grave robbers.",
            key: "No",
          },
        ],
      },
      match: {
        instruction:
          "Questions 7–10: Match each statement with the correct person, A–E.",
        bank: [
          { id: "A", text: "Kim Ryholt" },
          { id: "B", text: "Flinders Petrie" },
          { id: "C", text: "Forster Mueller" },
          { id: "D", text: "Josef Wegner" },
          { id: "E", text: "Ian Shaw" },
        ],
        items: [
          {
            id: "7",
            stem: "He believed a specific burial site was unimportant.",
            key: "B",
          },
          {
            id: "8",
            stem: "He acknowledges the prospect of finding an undamaged grave is unlikely.",
            key: "D",
          },
          {
            id: "9",
            stem: "He believed that there were probably more pharaohs buried close to Abydos.",
            key: "C",
          },
          {
            id: "10",
            stem: "He claimed there had been a pharaonic dynasty that no one knew about.",
            key: "A",
          },
        ],
      },
    },

  ],
};
