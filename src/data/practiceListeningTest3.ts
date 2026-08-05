import leadInImg from "../assets/practice-listening-test3-friends.png";

/** Practice Listening Test 3 — friendships (exact book wording + teacher keys). */

export const AUDIO_3_1 =
  "https://storage.yandexcloud.net/cpeaudio/IELTS/TestPracLesson_Track%2003_01.mp3";
export const AUDIO_3_2 =
  "https://storage.yandexcloud.net/cpeaudio/IELTS/TestPracLesson_Track%2003_02.mp3";

export const practiceListeningTest3 = {
  id: "practice-listening-3",
  title: "Practice Test 3",
  subtitle: "Friendships · Multiple matching + Multiple choice",
  leadIn: {
    title: "Lead-in",
    image: leadInImg,
    imageAlt: "Four young friends sitting around a table talking",
    discussInstruction: "1 Work in pairs and discuss the questions.",
    discussQuestions: [
      "What does the photo show?",
      "Describe your first friend at school. Are you still friends today?",
      "What qualities are important for you in a friend?",
    ],
    meetInstruction:
      "2 Work in pairs. Take turns to describe how you and a friend met. Use the questions to help you.",
    meetQuestions: [
      "Where were you?",
      "What did you think of that person when you met them?",
      "What’s your friend like?",
      "How have you changed since meeting them?",
    ],
  },
  part1: {
    title: "Test practice: Multiple matching and short answers",
    instruction: "3 Listen to the first part of the recording and answer Questions 1–4.",
    audioLabel: "3.1",
    audioUrl: AUDIO_3_1,
    multi: {
      header: "Questions 1–2",
      instruction: "Choose TWO letters, A–E.",
      prompt:
        "What TWO things does David say are necessary for early friendships to form?",
      options: [
        { letter: "A", label: "being a similar age" },
        { letter: "B", label: "sharing a physical environment" },
        { letter: "C", label: "having common hobbies" },
        { letter: "D", label: "accessing means of communication" },
        { letter: "E", label: "spending sufficient time together" },
      ],
      keys: ["B", "E"] as const,
    },
    short: {
      header: "Questions 3–4",
      instruction:
        "Answer the questions below. Write NO MORE THAN THREE WORDS AND/OR NUMBERS for each answer.",
      questions: [
        {
          id: 3,
          prompt:
            "What do people who easily become friends usually associate with their first meeting?",
          key: "a good mood",
          accept: [
            "a good mood",
            "good mood",
            "that feeling",
            "a feeling",
            "good feeling",
          ],
        },
        {
          id: 4,
          prompt: "What negative emotion can bring people together?",
          key: "shared hate",
          accept: ["shared hate", "a shared hate", "hate", "(shared) hate"],
        },
      ],
    },
    script: [
      {
        speaker: "Narrator",
        text: "You will hear a man named David and a woman named Maria discussing how friendships are formed in children. Read questions one to four.",
      },
      {
        speaker: "David",
        text: "I’ve just been reading an article on why we become friends with certain people and not others.",
      },
      {
        speaker: "Maria",
        text: "Was it any good for that project we have?",
      },
      {
        speaker: "David",
        text: "I think so. It’s mostly about very young children at school, and says that there are common patterns observed in the way that friendships are formed. The main factor is close surroundings, in other words people who happen to be around. We’re most likely to become friends with our neighbours, either in the sense that we live near them, or we sit near them in class or share an office. It’s got little to do with pastimes or stuff like that which might come later in life.",
      },
      {
        speaker: "Maria",
        text: "I don’t know that’s true anymore. I mean, even young kids are on the Internet these days and make friends that way.",
      },
      {
        speaker: "David",
        text: "Apparently that makes little difference, at least while friendships are developing. If people hang out enough, they’re able to decide if it’s worth investing more there and having a ‘getting to know you’ phase is still crucial.",
      },
      {
        speaker: "Maria",
        text: "But if that’s true, if it’s just about proximity, that’s a bit weird. In most cases that kind of thing is decided by people in authority over you, like teachers. That’s not really a basis for becoming best friends forever.",
      },
      {
        speaker: "David",
        text: "Well, no! But it’s a bit more complicated than that.",
      },
      {
        speaker: "Maria",
        text: "I think there are other factors that predict how likely it is that a friendship will form. I met my best friend in my art class, and we both loved the teacher there. I read an article that suggested that we tend to relate how we feel with the people around us. So, if you’re in a good mood when you’re first introduced to a new person, you tend to connect that feeling with the other person you’re with, and you have a much better chance of getting on together.",
      },
      {
        speaker: "David",
        text: "Hmm, that makes sense.",
      },
      {
        speaker: "Maria",
        text: "But that’s not all, whether it’s positive or negative, if you have something that unites you, you’ll probably get on. The theory of ‘homophily’ suggests that a shared hate gives you both something to complain about and that can bring people together too.",
      },
      {
        speaker: "David",
        text: "Great. Have you got some notes on that?",
      },
    ],
  },
  tips: {
    title: "Test training: Task advice",
    instruction: "4 Complete the tips with the words in the box.",
    wordBox: [
      "choose",
      "correct",
      "distractors",
      "guess",
      "indicate",
      "order",
      "synonyms",
      "underline",
      "wrong",
    ],
    tips: [
      {
        id: 1,
        before: "",
        after:
          " key phrases or words in the question to help you know what to listen for.",
        keys: ["underline"],
      },
      {
        id: 2,
        before: "Remember the questions are in the same ",
        after: " as the answers in the recording.",
        keys: ["order"],
      },
      {
        id: 3,
        before: "Listen carefully for ",
        after: " of the words in the question and options.",
        keys: ["synonyms"],
      },
      {
        id: 4,
        before: "If you hear a(n) ",
        after: " option while you are listening, cross it out.",
        keys: ["wrong"],
      },
      {
        id: 5,
        before: "Be careful of ",
        after: " – words that sound like the answer but aren’t.",
        keys: ["distractors"],
      },
      {
        id: 6,
        before: "Don’t ",
        after:
          " the first thing you hear, keep listening as the first answer isn’t necessarily the correct answer.",
        keys: ["choose"],
      },
      {
        id: 7,
        before:
          "Listen out for words like ‘but’ and ‘however’ as these often ",
        mid: " that the speaker is going to tell you that what they have just said isn’t ",
        after: ".",
        keys: ["indicate", "correct"] as string[],
      },
      {
        id: 8,
        before: "If you don’t know the answer, ",
        after: ".",
        keys: ["guess"],
      },
    ],
  },
  part2: {
    title: "Test practice: Multiple choice",
    instruction:
      "5 Now listen to the second part of the recording and answer Questions 5–10.",
    audioLabel: "3.2",
    audioUrl: AUDIO_3_2,
    taskHeader: "Questions 5–10\nChoose the correct letter, A, B or C.",
    questions: [
      {
        id: 5,
        prompt: "There are three stages of making friends. These stages depend on",
        options: [
          { letter: "A", label: "doing things together." },
          { letter: "B", label: "the age of the children." },
          { letter: "C", label: "wanting someone to play with." },
        ],
        key: "B",
      },
      {
        id: 6,
        prompt: "Around the age of eight to ten kids begin to",
        options: [
          { letter: "A", label: "trust each other." },
          { letter: "B", label: "stay at their friend’s house." },
          { letter: "C", label: "have a best friend." },
        ],
        key: "A",
      },
      {
        id: 7,
        prompt: "The most important factor at stage 3 is",
        options: [
          { letter: "A", label: "loyalty." },
          { letter: "B", label: "getting into trouble at school." },
          { letter: "C", label: "testing out different people." },
        ],
        key: "A",
      },
      {
        id: 8,
        prompt: "David thinks that both he and Maria are",
        options: [
          { letter: "A", label: "super trendy." },
          { letter: "B", label: "a bit geeky." },
          { letter: "C", label: "similar in age." },
        ],
        key: "B",
      },
      {
        id: 9,
        prompt: "What does David think people change when they are friends?",
        options: [
          { letter: "A", label: "the way they look" },
          { letter: "B", label: "the things they do" },
          { letter: "C", label: "the way they behave" },
        ],
        key: "C",
      },
      {
        id: 10,
        prompt: "According to Maria, what do people look for in a friend?",
        options: [
          { letter: "A", label: "having similar values" },
          { letter: "B", label: "what they look like" },
          { letter: "C", label: "someone with a sense of humour" },
        ],
        key: "A",
      },
    ],
    script: [
      {
        speaker: "Narrator",
        text: "Now read questions five to ten.",
      },
      {
        speaker: "David",
        text: "OK, so the task also requires us to compare children and teenagers’ friendships.",
      },
      {
        speaker: "Maria",
        text: "I found something on children’s friendships. They go through three key phases depending on their age.",
      },
      {
        speaker: "David",
        text: "That’s interesting. I don’t really remember that much about my friends from the very early days.",
      },
      {
        speaker: "Maria",
        text: "Level one is the first stage. That’s when kids are four to seven years old, and is just about doing things together. They want a handy playmate at that age – someone who’ll do things with them.",
      },
      {
        speaker: "David",
        text: "It must get a bit deeper after that.",
      },
      {
        speaker: "Maria",
        text: "It does. Around the age of eight to ten, kids start identifying a best friend. That’s the second level, and at that age, it’s all about trust and helping each other. Kids know they’ll be the first to be invited to a sleepover, or they know their friend will come round to their house, and that’s an important phase.",
      },
      {
        speaker: "David",
        text: "I guess after that it’s all about loyalty.",
      },
      {
        speaker: "Maria",
        text: "Absolutely. That’s the level three stage, from about eleven years to fifteen. They want to know that if there’s any trouble at school they’ve got someone they can count on to support them.",
      },
      {
        speaker: "David",
        text: "That also explains why people often change friends in the teenage years, I guess, they’re testing out different people.",
      },
      {
        speaker: "Maria",
        text: "So we’ve been friends since we were teenagers. I’m not sure I see any of the patterns we’ve talked about in our friendship.",
      },
      {
        speaker: "David",
        text: "Well, we kind of look similar!",
      },
      {
        speaker: "Maria",
        text: "What?",
      },
      {
        speaker: "David",
        text: "I mean, neither of us is super trendy. When people meet, the way we look does come into it. For example, if I consider myself a bit geeky, and I see another person who seems similar, well, certain judgements are made on their appearance, and even if we don’t realise it, the early phases of friendships are more likely to be initiated.",
      },
      {
        speaker: "Maria",
        text: "That makes it sound really shallow!",
      },
      {
        speaker: "David",
        text: "Yes and no. I mean that’s how it is at the beginning, but then after that automatic rating phase, we start thinking, and we make decisions. We also adapt our behaviour a little bit to match what we think the other person expects of us.",
      },
      {
        speaker: "Maria",
        text: "So it’s not all about looks? I’ve always thought we look for the qualities that matter to us in other people. If you value education, then you’ll hang around with smart people. If it’s about a sense of humour, you’ll look for someone who’s funny.",
      },
      {
        speaker: "David",
        text: "That’s also true. OK, let’s start getting some of this typed up.",
      },
    ],
  },
  language: {
    title: "Language development",
    instruction: "6 Complete the sentences with the words in the box.",
    wordBox: [
      "hobbies",
      "humour",
      "loyalty",
      "sharing",
      "spending",
      "values",
    ],
    sentences: [
      {
        id: 1,
        before:
          "I don’t think it is important that friends share the same ",
        after:
          ". In fact, my best friend doesn’t like basketball but she still comes to support me when my team plays.",
        key: "hobbies",
      },
      {
        id: 2,
        before: "My best friend and I have the same sense of ",
        after: ". We laugh at all the same jokes.",
        key: "humour",
      },
      {
        id: 3,
        before: "",
        after:
          " is an important quality in friends. You want to know that they will be there for you when you need them.",
        key: "Loyalty",
        accept: ["Loyalty", "loyalty"],
      },
      {
        id: 4,
        before: "We enjoy going shopping and ",
        after: " time together at the weekend.",
        key: "spending",
      },
      {
        id: 5,
        before: "Jane and I have similar ",
        after:
          ". For example, we believe that money doesn’t bring happiness.",
        key: "values",
      },
    ],
  },
  followUp: {
    title: "Follow-up",
    instruction:
      "7 Discuss these statements in pairs. Do you agree with each statement? Give reasons for your answers.",
    statements: [
      "People with the same interests or hobbies are more likely to become friends.",
      "It’s easier to make friends with people you meet regularly.",
      "People enjoy complaining about things with their friends.",
      "Trust and loyalty are very important between friends.",
      "How someone looks is important at the start of a friendship.",
      "The way we behave often depends on what we think our friends expect us to do.",
    ],
  },
};

export type PracticeListeningTest3 = typeof practiceListeningTest3;
