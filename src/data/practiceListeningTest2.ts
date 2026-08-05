import mapImg from "../assets/practice-listening-test2-map.png";

/** Practice Listening Test 2 — Te Papa museum (exact book wording + teacher keys). */

export const AUDIO_2_1 =
  "https://storage.yandexcloud.net/cpeaudio/IELTS/TestPracLesson_Track%2002_01.mp3";
export const AUDIO_2_2 =
  "https://storage.yandexcloud.net/cpeaudio/IELTS/TestPracLesson_Track%2002_02.mp3";
export const AUDIO_2_3 =
  "https://storage.yandexcloud.net/cpeaudio/IELTS/TestPracLesson_Track%2002_03.mp3";

export const practiceListeningTest2 = {
  id: "practice-listening-2",
  title: "Practice Test 2",
  subtitle: "Te Papa Museum · Map labelling + Matching",
  leadIn: {
    title: "Lead-in",
    discussInstruction: "1 Work in pairs and discuss these questions.",
    discussQuestions: [
      "Are there any famous/well-known museums where you live?",
      "When was the last time you visited a museum? Where was the museum and what kind of things were on display?",
      "Do you think it is important for cities to have museums? Why or why not?",
      "What do you think museums should offer in the twenty-first century?",
    ],
    vocabInstruction: "2 Complete the sentences with the words in the box.",
    wordBox: [
      "café",
      "cloakroom",
      "exhibition rooms",
      "gift shop",
      "information desk",
    ],
    sentences: [
      {
        id: 1,
        before:
          "If you would like to buy a souvenir to remember your visit, you will find the ",
        after: " next to the exit.",
        key: "gift shop",
      },
      {
        id: 2,
        before:
          "The museum has hundreds of displays. These can be found in the ",
        after: " located throughout the building.",
        key: "exhibition rooms",
      },
      {
        id: 3,
        before: "There is a ",
        after:
          " where you can leave you coats, bags and other items before you walk around the museum.",
        key: "cloakroom",
      },
      {
        id: 4,
        before: "Just in front of the entrance you can find the ",
        after:
          " where you can buy a guide to the museum, rent audio guides with headphones or ask our helpful staff any questions you might have.",
        key: "information desk",
      },
      {
        id: 5,
        before: "When you feel tired, hungry or thirsty, visit the ",
        after:
          " on the ground floor. We sell a wide range of refreshments as well as providing a place to rest and relax.",
        key: "café",
      },
    ],
  },
  predict: {
    title: "Test training: Predicting answers",
    instruction:
      "3 Work in pairs. Look at the task (Questions 1–6) in Activity 4 and discuss these questions.",
    questions: [
      "What words do you think you will hear to help you match the places to the numbers?",
      "For which two questions do you think you might hear the word ‘gardens’?",
    ],
    suggested: [
      "prepositions of place (next to, in front of, on the right) as well as the locations on the map/diagram",
      "5 and 6",
    ],
  },
  mapTask: {
    title: "Test practice: Labelling diagrams and maps",
    instruction: "4 Listen to the first part of the recording and complete Questions 1–6.",
    audioLabel: "2.1",
    audioUrl: AUDIO_2_1,
    taskHeader:
      "Questions 1–6\nLabel the map below.\nWrite the correct letter, A–I, next to Questions 1–6.",
    mapImage: mapImg,
    mapAlt: "Map of Te Papa Museum, New Zealand",
    options: [
      { letter: "A", label: "café" },
      { letter: "B", label: "gift shop" },
      { letter: "C", label: "visitor centre" },
      { letter: "D", label: "cloakroom" },
      { letter: "E", label: "temporary exhibition room" },
      { letter: "F", label: "information desk" },
      { letter: "G", label: "cave" },
      { letter: "H", label: "decorated walls" },
      { letter: "I", label: "volcanic rocks" },
    ],
    questions: [
      { id: 1, key: "I" },
      { id: 2, key: "D" },
      { id: 3, key: "C" },
      { id: 4, key: "H" },
      { id: 5, key: "G" },
      { id: 6, key: "A" },
    ],
    script: [
      {
        speaker: "Guide",
        text: "The Te Papa Museum is New Zealand’s celebration of old and new culture. The building itself took four years to complete. One of the first exhibits you probably saw were the three spheres which you passed to the right of the entrance of the museum before you came in. They’re made out of rock from a volcanic eruption around seventy-five thousand years ago, and they represent New Zealand’s commitment to respect our land.",
      },
      {
        speaker: "Guide",
        text: "You’ll find lots of things here that show the values of New Zealand, but before we make our way around the museum, can I ask you to leave any big coats or any large bags here in the cloakroom on the left of the main entrance hall, opposite the information desk, before you go on to the rest of the museum.",
      },
      {
        speaker: "Guide",
        text: "Now, to get from the south side to the north face of the building you need to walk through our temporary exhibition room. This is to the left of three equal-sized rooms. I can see a lot of you brought kids with you today, and you might want to turn right as you leave that room, because the visitor centre is just next door. If you’re here with kids, you might want to go and have a look at the activities we have on for the little ones today. There’s also a gift shop just the other side as you walk towards the east of the building.",
      },
      {
        speaker: "Guide",
        text: "It’s a beautiful day and I recommend our outdoor facilities to you, too. If you go out the north-east exit, there’s a beautiful wall that side of the building which is decorated with images of the sea. They’re really quite spectacular and shouldn’t be missed.",
      },
      {
        speaker: "Guide",
        text: "To the south-west, as we look towards the city, we have our beautiful gardens. Here you’ll find a traditional Maori cave, which is located just north of the centre of the gardens and it’s well worth a visit before you leave. There’s also some action going on in our fossil dig towards the south west end of the gardens. If you find it hard to get around the gardens, though, you can always enjoy the incredible views of the gardens from our café located at the far western end of the northern building. They do a great lunch with locally cooked food. And if you have any more questions, you can find me here at the information desk all day.",
      },
    ],
  },
  matchTask: {
    title: "Test practice: Matching",
    instruction:
      "5 Listen to the second part of the recording and complete Questions 7–10.",
    audioLabel: "2.2",
    audioUrl: AUDIO_2_2,
    taskHeader:
      "Questions 7–10\nHow does the speaker describe the purpose of each of the following areas?\nChoose FOUR answers from the box and write the correct letter, A–F.",
    options: [
      { letter: "A", label: "to represent the native culture" },
      { letter: "B", label: "to celebrate independence" },
      { letter: "C", label: "to provide views of the city" },
      { letter: "D", label: "to bring people together" },
      { letter: "E", label: "to reflect nature" },
      { letter: "F", label: "to symbolise what more recent arrivals offer" },
    ],
    questions: [
      { id: 7, prompt: "the north face", key: "E" },
      { id: 8, prompt: "the south side", key: "F" },
      { id: 9, prompt: "the central area", key: "B" },
      { id: 10, prompt: "the top floor", key: "D" },
    ],
    script: [
      {
        speaker: "Guide",
        text: "So, we have a fantastic range of exhibitions here at Te Papa, but the building itself was carefully planned to reflect the history of our nation. There’s a good reason why the building is divided into the two halves, both with a very different feel to them. The north face of the building is covered in light brown walls. It embraces the environment around us: the sea, hills and the sky. That’s because it represents the beauty of the island, and celebrates the rich geography and traditions.",
      },
      {
        speaker: "Guide",
        text: "The south side of the building faces the modern city and is covered with walls painted in strong, lively colours. It celebrates what we call Pakeha, or a European focus, and the square spaces are similar to the order European settlers followed and the laws they introduced. In the centre, between the two buildings on the next floor up, is the Treaty of Waitangi. It’s the nation’s founding document after we became independent. A special exhibition there explores what this process has meant to the people both old and new who live here.",
      },
      {
        speaker: "Guide",
        text: "The Marae is located on the top floor. This is the name of the special gateway, where visitors wait to be welcomed by the home people. The Marae is unique because it is controlled by different local groups at different times. Every few years, we invite a different group to take charge of our Marae here in Te Papa. The Marae is a gateway between the different cultures of New Zealand, and it’s also a place where we New Zealanders can welcome visitors from overseas, too.",
      },
    ],
  },
  language: {
    title: "Language development",
    instruction: "6 Look at the map. Complete the sentences with the words in the box.",
    wordBox: [
      "left",
      "close to",
      "north",
      "opposite",
      "south-west",
      "to the right",
    ],
    sentences: [
      {
        id: 1,
        before: "If you stand at the main entrance, the information desk is ",
        after: ".",
        key: "to the right",
      },
      {
        id: 2,
        before: "From the main entrance head ",
        after: " to get to the gardens.",
        key: "north",
      },
      {
        id: 3,
        before: "The toilets are ",
        after: " the information desk.",
        key: "opposite",
      },
      {
        id: 4,
        before: "The museum is ",
        after: " the sea front.",
        key: "close to",
      },
      {
        id: 5,
        before: "The city is to the ",
        after: " of the museum.",
        key: "south-west",
      },
    ],
  },
  gapFollowUp: {
    title: "Follow-up",
    instruction:
      "7 Listen to the first section again and complete each of the gaps in the sentences with NO MORE THAN THREE WORDS.",
    audioLabel: "2.3",
    audioUrl: AUDIO_2_3,
    items: [
      {
        id: 1,
        parts: [
          "One of the first exhibits you saw were the three spheres which you passed ",
          { gap: 0 },
          " of the entrance of the museum before you came in.",
        ],
        keys: ["to the right"],
        accept: [["to the right"]],
      },
      {
        id: 2,
        parts: [
          "Can I ask you to leave any big coats or any large bags here in the cloakroom ",
          { gap: 0 },
          " of the main entrance hall opposite the information desk.",
        ],
        keys: ["on the left"],
        accept: [["on the left"]],
      },
      {
        id: 3,
        parts: [
          "I can see a lot of you brought kids with you today, and you might want to ",
          { gap: 0 },
          " as you leave that room, because the visitor centre is just ",
          { gap: 1 },
          ".",
        ],
        keys: ["turn right", "next door"],
        accept: [["turn right"], ["next door"]],
      },
      {
        id: 4,
        parts: [
          "Here you’ll find a traditional Maori cave, which is located ",
          { gap: 0 },
          " of the centre of the gardens and it’s well worth a visit before you leave.",
        ],
        keys: ["north"],
        accept: [["north"], ["just north"]],
      },
      {
        id: 5,
        parts: [
          "If you find it hard to get around the gardens, though, you can always enjoy the incredible views of the gardens from our café ",
          { gap: 0 },
          " the far western end of the northern building.",
        ],
        keys: ["located at"],
        accept: [["located at"]],
      },
    ],
    scriptLabel: "Tapescript 2.3",
  },
  notes: {
    title: "Follow-up",
    instruction:
      "8 What kinds of things would you be interested in seeing in a museum? Make notes. Discuss in pairs.",
  },
};

export type PracticeListeningTest2 = typeof practiceListeningTest2;
