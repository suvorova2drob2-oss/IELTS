/** Hard models for Practice Writing — separate from the four tests. */

export interface PracticeWritingModelPlan {
  label: string;
  phrases: string[];
  must: string;
  avoid: string;
  example: string;
}

export interface PracticeWritingModel {
  id: string;
  number: number;
  band: string;
  type: string;
  title: string;
  question: string;
  /** Use ==construction== to underline a full frame in the essay. */
  paragraphs: string[];
  plan: PracticeWritingModelPlan[];
}

export const practiceWritingModels: PracticeWritingModel[] = [
  {
    id: "model-t2-remote-work",
    number: 1,
    band: "7.5",
    type: "Task 2 · Discuss both views",
    title: "Work from home",
    question:
      "Some people think employees should be allowed to work from home. Others believe companies work better if staff are in the office. Discuss both views and give your own opinion.",
    paragraphs: [
      "The shift towards remote work ==has divided employers as much as it has divided staff==. Flexibility ==is often presented as a right, yet many still argue that== an office is what keeps a business coherent. ==I agree that== working from home ==can be highly effective for some roles, but treating it as a universal solution ignores== the kind of work that depends on people being in the same room.",
      "==Those who favour the office are not simply being old-fashioned.== Shared space makes informal coordination possible: a quick conversation at a desk can prevent a mistake that would otherwise sit unnoticed in an email thread. Training is also harder at a distance. A junior employee who never sees how experienced colleagues handle a difficult client is slower to pick up judgement, ==not just procedure==. In industries such as healthcare administration, design studios or newsrooms, that loss of contact ==is not a minor inconvenience; it shows up in weaker decisions==.",
      "==That said, the case for remote work is stronger than office-centred managers often admit.== A great deal of modern work is already done on a screen, and commuting two hours a day does not make that work better. Staff who can control their hours tend to waste less time, and companies can hire beyond the city they happen to be based in. ==The more honest objection is not that home working “fails”, but that it fails when it is applied to jobs that were never designed for it.== A software team with clear deadlines can function well online; a hotel cannot.",
      "==For that reason I would not choose one model for every workplace.== ==Where the task is independent== and the outcomes are easy to measure, working from home should be normal rather than a privilege. ==Where the work is collaborative, physical or high-risk,== the office still earns its keep. ==The useful question is not whether remote work is good or bad, but which jobs actually need people in the same place.==",
    ],
    plan: [
      {
        label: "1 · Introduction",
        phrases: [
          "has divided X as much as it has divided Y",
          "is often presented as …, yet many still argue that …",
          "I agree that …, but treating it as a universal solution ignores …",
        ],
        must: "Тема своими словами. Два взгляда. Своё мнение в последнем предложении — с оговоркой.",
        avoid: "Nowadays / In recent years. I will discuss both views. Прятать мнение до вывода.",
        example:
          "I agree that working from home can be highly effective for some roles, but treating it as a universal solution ignores the kind of work that depends on people being in the same room.",
      },
      {
        label: "2 · Other view",
        phrases: [
          "Those who favour … are not simply being old-fashioned.",
          "not just …",
          "is not a minor inconvenience; it shows up in …",
        ],
        must: "Почему эта сторона не глупая. Как это работает. Один свой пример, где это видно.",
        avoid: "Карикатура («они просто ленивые»). On the one hand. Весь абзац без факта.",
        example:
          "Those who favour the office are not simply being old-fashioned. Shared space makes informal coordination possible: a quick conversation at a desk can prevent a mistake that would otherwise sit unnoticed in an email thread.",
      },
      {
        label: "3 · Your view",
        phrases: [
          "That said, the case for … is stronger than … often admit.",
          "The more honest objection is not that … “fails”, but that it fails when …",
        ],
        must: "Поворот к своей стороне. Почему она сильнее. Где она ломается.",
        avoid: "Повторить intro. Игнорировать чужой абзац. «Всегда и везде A».",
        example:
          "That said, the case for remote work is stronger than office-centred managers often admit. The more honest objection is not that home working “fails”, but that it fails when it is applied to jobs that were never designed for it.",
      },
      {
        label: "4 · Conclusion",
        phrases: [
          "For that reason I would not choose one model for every …",
          "Where …  Where …",
          "The useful question is not whether … is good or bad, but which …",
        ],
        must: "То же мнение другими словами. Где A, где B. Вопрос закрыть заново.",
        avoid: "Новый аргумент. In conclusion, I am convinced. Прогноз In the future.",
        example:
          "The useful question is not whether remote work is good or bad, but which jobs actually need people in the same place.",
      },
    ],
  },
  {
    id: "model-t2-child-ads",
    number: 2,
    band: "7.5",
    type: "Task 2 · Agree / disagree",
    title: "Advertising to children",
    question:
      "Advertising aimed at children should be banned. To what extent do you agree or disagree?",
    paragraphs: [
      "Advertising to children is now almost impossible to avoid: it appears in apps, on packaging and between cartoons. Some campaigners want a complete ban. ==I agree that the most aggressive forms should be tightly restricted, but a total ban is neither practical nor, in every case, necessary.==",
      "==The case for a ban is easy to understand.== Young children cannot tell a sales pitch from information, and they do not have the money or the judgement to refuse what they are shown. When a character from a film is printed on sugary cereal, the pressure lands on parents, not on the child who cannot yet argue back. ==In that sense, “choice” is a slogan; the actual target is== a family that is tired and short of time.",
      "==A blanket ban, however, would be a blunt instrument.== Not all advertising to children is selling junk: public-health campaigns, book publishers and sports clubs also use the same channels. A rule that forbids every message would hit those as well. ==The more honest target is the content and the method== — junk food, gambling-style rewards in games, data tracking — ==rather than the mere fact that== a child saw an advert. Countries that limit advertising around children’s programmes, instead of trying to delete it from the whole economy, have a more workable model.",
      "==I would therefore support a strong ban on== harmful products and on techniques designed to bypass a child’s judgement, ==but not a law that treats every== commercial message as an attack. ==The useful distinction is not “advertising or no advertising”, but which messages a child is too young to resist.==",
    ],
    plan: [
      {
        label: "1 · Introduction",
        phrases: [
          "I agree that … should be tightly restricted, but a total ban is neither practical nor, in every case, necessary.",
        ],
        must: "Тема. Что требуют. Степень согласия сразу (agree, but not a total ban).",
        avoid: "«Есть два мнения». I partly agree без чем. Пересказ вопроса слово в слово.",
        example:
          "I agree that the most aggressive forms should be tightly restricted, but a total ban is neither practical nor, in every case, necessary.",
      },
      {
        label: "2 · Other side has a point",
        phrases: [
          "The case for … is easy to understand.",
          "In that sense, “…” is a slogan; the actual target is …",
        ],
        must: "Почему бан хотят. Кого это бьёт на деле. Один свой пример.",
        avoid: "Straw man. Этот абзац длиннее вашего. Firstly.",
        example:
          "The case for a ban is easy to understand. In that sense, “choice” is a slogan; the actual target is a family that is tired and short of time.",
      },
      {
        label: "3 · Why you do not go all the way",
        phrases: [
          "A blanket …, however, would be a blunt instrument.",
          "The more honest target is … rather than the mere fact that …",
        ],
        must: "Почему крайняя позиция ломается. Более честная цель вместо тотального бана.",
        avoid: "Список из пяти причин. Сменить позицию на противоположную.",
        example:
          "A blanket ban, however, would be a blunt instrument. The more honest target is the content and the method, rather than the mere fact that a child saw an advert.",
      },
      {
        label: "4 · Conclusion",
        phrases: [
          "I would therefore support …, but not a law that treats every … as …",
          "The useful distinction is not “A or no A”, but which …",
        ],
        must: "Та же степень согласия. Одна разделительная линия (какие сообщения нельзя).",
        avoid: "Новый аргумент. In conclusion, I am convinced.",
        example:
          "The useful distinction is not “advertising or no advertising”, but which messages a child is too young to resist.",
      },
    ],
  },
  {
    id: "model-t2-housing",
    number: 3,
    band: "7.5",
    type: "Task 2 · Problem–solution",
    title: "Young people and housing",
    question:
      "In many cities, young people can no longer afford to buy a home. What problems does this cause, and what solutions can you suggest?",
    paragraphs: [
      "When the price of a flat rises faster than wages, buying a first home stops being a late goal and becomes an unlikely one. This is now common in large cities, and it creates problems that go well beyond disappointment. ==The damage is social as well as financial, and any serious response has to deal with supply, not only with sympathy.==",
      "==The most immediate problem is delay.== People spend a larger share of their income on rent, so they save more slowly, start families later and stay longer in housing that does not fit them. ==A second effect is inequality between generations:== those who already own property watch it rise in value, while those who do not fall further behind. In cities where key workers — nurses, teachers, bus drivers — are priced out, services also suffer, because the people who run the city cannot live in it.",
      "==Building more homes is the only measure that attacks the cause.== Governments can free up land, speed up planning and require a share of new buildings to be sold or rented at a lower price. That will not help everyone at once, but it changes the direction of prices. ==A second, faster step is to protect renters:== longer contracts and limits on sudden increases give people time to save. Cheap loans help only if there are actually homes to buy; otherwise they push prices up again.",
      "Housing will not become cheap overnight, and promising that it will is dishonest. ==What can be done is to stop the gap widening:== more homes where people work, and rules that stop rent from eating the chance to save. ==The test of a policy is not whether it sounds kind, but whether== a nurse in that city can still live near the hospital.",
    ],
    plan: [
      {
        label: "1 · Introduction",
        phrases: [
          "The damage is … as well as …, and any serious response has to deal with …, not only with sympathy.",
        ],
        must: "Проблема своими словами. Что она ломает. Тезис: меры по причине, не по жалости.",
        avoid: "Только «это серьёзная проблема». Весь список solutions уже в intro.",
        example:
          "The damage is social as well as financial, and any serious response has to deal with supply, not only with sympathy.",
      },
      {
        label: "2 · Problems",
        phrases: [
          "The most immediate problem is …",
          "A second effect is …",
        ],
        must: "Две конкретные поломки. Кто страдает (свой пример человека).",
        avoid: "Пять пунктиков. Solutions в этом абзаце. Firstly / Secondly.",
        example:
          "The most immediate problem is delay. A second effect is inequality between generations: those who already own property watch it rise in value, while those who do not fall further behind.",
      },
      {
        label: "3 · Solutions",
        phrases: [
          "… is the only measure that attacks the cause.",
          "A second, faster step is to …",
          "… help only if …; otherwise they …",
        ],
        must: "Сначала мера по причине. Потом быстрая. Одна фраза, что не сработает.",
        avoid: "Только «the government should». Меры мимо поломок из абзаца 2.",
        example:
          "Building more homes is the only measure that attacks the cause. A second, faster step is to protect renters. Cheap loans help only if there are actually homes to buy; otherwise they push prices up again.",
      },
      {
        label: "4 · Conclusion",
        phrases: [
          "What can be done is to stop the gap widening: …",
          "The test of a policy is not whether it sounds kind, but whether …",
        ],
        must: "Сжать проблему + меры. Проверка: реальный человек всё ещё может …",
        avoid: "Обещать чудо overnight. Новый problem. In the future everything will be fine.",
        example:
          "The test of a policy is not whether it sounds kind, but whether a nurse in that city can still live near the hospital.",
      },
    ],
  },
  {
    id: "model-t2-phones",
    number: 4,
    band: "7.5",
    type: "Task 2 · Two questions (why + effects)",
    title: "Time on phones",
    question:
      "Many people now spend most of their free time looking at a phone. Why has this happened, and what effects can it have on individuals and on society?",
    paragraphs: [
      "A phone is no longer a tool people pick up for a call; for many it is the default way to wait, rest and keep in touch. ==This did not happen because people suddenly became lazy.== The device was designed to hold attention, and daily life now runs through it. The effects are mixed, but they are no longer small.",
      "==The main reason is convenience piled on top of design.== Maps, banking, work messages and friendships all sit behind one screen, so putting the phone down means putting half of ordinary life down with it. Apps are also built to reward another minute: a short video is followed by another, and silence starts to feel like a problem that needs filling. ==When public space is full of people doing the same thing, the habit looks normal rather than extreme.==",
      "==For the individual, the cost is often sleep, focus and a thinner kind of rest.== A person can spend an evening “relaxing” and still feel wired. ==For society the risk is cruder: shared attention disappears.== Conversations get interrupted, and people in the same room are not in the same place. ==That said, the phone is also how== families abroad stay close and how news travels. ==The damage comes less from owning the device than from using it as the only way to fill spare time.==",
      "==These two forces — usefulness and design — explain the habit better than any story about weak willpower.== The effects are already visible in sleep, concentration and the way people share a room. A phone can still be a good tool; ==the problem starts when it becomes the place where spare time automatically goes.==",
    ],
    plan: [
      {
        label: "1 · Introduction",
        phrases: [
          "This did not happen because …",
          "The effects are mixed, but they are no longer small.",
        ],
        must: "Явление. Намёк на why. Эффекты уже не мелочь. Оба вопроса в intro.",
        avoid: "Solutions, если их не просили. Because people are lazy. I will discuss.",
        example:
          "This did not happen because people suddenly became lazy. The device was designed to hold attention, and daily life now runs through it.",
      },
      {
        label: "2 · Why",
        phrases: [
          "The main reason is …",
          "When …, the habit looks normal rather than extreme.",
        ],
        must: "Одна главная причина. Как привычка стала нормой.",
        avoid: "Пять why. Effects в этом абзаце. Firstly.",
        example:
          "The main reason is convenience piled on top of design. When public space is full of people doing the same thing, the habit looks normal rather than extreme.",
      },
      {
        label: "3 · Effects",
        phrases: [
          "For the individual, the cost is …",
          "For society the risk is …",
          "That said, … is also how …",
          "The damage comes less from … than from …",
        ],
        must: "Эффект на человека. Эффект на общество. Одна оговорка (не только плохо).",
        avoid: "Только «плохо для здоровья». Новый why. Проповедь без факта.",
        example:
          "For the individual, the cost is often sleep, focus and a thinner kind of rest. For society the risk is cruder: shared attention disappears. The damage comes less from owning the device than from using it as the only way to fill spare time.",
      },
      {
        label: "4 · Conclusion",
        phrases: [
          "These two forces — … and … — explain … better than …",
          "The problem starts when …",
        ],
        must: "Сжать why + effects теми же словами другими.",
        avoid: "План спасения мира. In the future people will. Новый эффект.",
        example:
          "These two forces — usefulness and design — explain the habit better than any story about weak willpower. The problem starts when it becomes the place where spare time automatically goes.",
      },
    ],
  },
  {
    id: "model-t2-online-shopping",
    number: 5,
    band: "7.5",
    type: "Task 2 · Advantages / disadvantages",
    title: "Online shopping",
    question:
      "These days more people shop online than in physical stores. Do the advantages of this outweigh the disadvantages?",
    paragraphs: [
      "The move from the high street to a screen has been rapid, and it is often treated as an obvious improvement. ==I believe the advantages outweigh the disadvantages== for most households, ==but only if== towns still have a way for people who cannot, or will not, buy everything online.",
      "The main gain is time and range. ==This is largely because== a person can compare prices and find a product that a local shop would never stock, without spending an afternoon travelling. ==This is visible in== rural areas, where the nearest specialist store may be hours away. ==A clear case is== medicine or spare parts: waiting for a van is irritating, but it is still better than not getting the item at all. ==Over time, this leads to== less wasted travel for routine purchases.",
      "==That said,== the cost to streets and to some shoppers is real. ==While it is true that== online buying is convenient, ==it does not follow that== a town can lose its shops and remain a place where people meet. ==The damage comes less from== the website ==than from== empty units and from older people who cannot manage a delivery app. ==This is not to say that== the high street should be frozen in 1995; it does mean that “cheaper and faster” is not the whole story.",
      "==On balance,== the advantages are stronger: more choice, less travel, and prices that a small shop cannot match. ==The practical conclusion is that== online shopping should stay the default for goods, while towns protect a smaller set of places that still serve people in person. ==For that reason== I would not try to reverse the shift; I would try to stop it from becoming the only option.",
    ],
    plan: [
      {
        label: "1 · Introduction",
        phrases: [
          "I believe the advantages outweigh the disadvantages …, but only if …",
        ],
        must: "Тема. Outweigh да или нет сразу + оговорка (для кого / при каком условии).",
        avoid: "«Есть плюсы и минусы» без решения. I will discuss advantages and disadvantages.",
        example:
          "I believe the advantages outweigh the disadvantages for most households, but only if towns still have a way for people who cannot, or will not, buy everything online.",
      },
      {
        label: "2 · Advantages",
        phrases: [
          "This is largely because …",
          "This is visible in …",
          "A clear case is …",
          "Over time, this leads to …",
        ],
        must: "Почему плюсы сильнее. Одна линия + где это видно (свой пример).",
        avoid: "Список Firstly / Secondly / Thirdly. Минусы в этом абзаце.",
        example:
          "The main gain is time and range. This is largely because a person can compare prices and find a product that a local shop would never stock, without spending an afternoon travelling. This is visible in rural areas, where the nearest specialist store may be hours away. A clear case is medicine or spare parts: waiting for a van is irritating, but it is still better than not getting the item at all. Over time, this leads to less wasted travel for routine purchases.",
      },
      {
        label: "3 · Disadvantages",
        phrases: [
          "That said, …",
          "While it is true that …, it does not follow that …",
          "The damage comes less from X than from Y.",
          "This is not to say that …",
        ],
        must: "Минусы всерьёз. Потом одна фраза: это не отменяет outweigh.",
        avoid: "Сдать позицию («значит disadvantages сильнее»). Игнорировать абзац 2.",
        example:
          "That said, the cost to streets and to some shoppers is real. While it is true that online buying is convenient, it does not follow that a town can lose its shops and remain a place where people meet. The damage comes less from the website than from empty units and from older people who cannot manage a delivery app. This is not to say that the high street should be frozen in 1995; it does mean that “cheaper and faster” is not the whole story.",
      },
      {
        label: "4 · Conclusion",
        phrases: [
          "On balance, …",
          "The practical conclusion is that …",
          "For that reason …",
        ],
        must: "Повторить outweigh. Условие из intro теми же словами другими.",
        avoid: "Новый плюс. On the one hand в конце. In conclusion I am convinced.",
        example:
          "On balance, the advantages are stronger: more choice, less travel, and prices that a small shop cannot match. The practical conclusion is that online shopping should stay the default for goods, while towns protect a smaller set of places that still serve people in person. For that reason I would not try to reverse the shift; I would try to stop it from becoming the only option.",
      },
    ],
  },
  {
    id: "model-t2-cashless",
    number: 6,
    band: "7.5",
    type: "Task 2 · Positive or negative development",
    title: "Cashless payments",
    question:
      "An increasing number of people pay with a phone or card rather than with cash. Is this a positive or negative development?",
    paragraphs: [
      "Paying with a phone or a card is now ordinary in many cities, and cash is starting to look like a backup rather than the main method. ==I see this as a largely positive development, but not a harmless one.==",
      "The gain is speed and a clearer record of spending. ==This is largely because== a tap takes seconds and leaves a trail that a wallet of notes does not. ==The result is that== small businesses waste less time counting coins, and a person who loses a card can freeze it; lost cash is simply gone. ==This is visible in== public transport, where a phone tap has replaced the hunt for the right coin. ==In practical terms,== daily life gets lighter.",
      "==That said,== a cashless city can lock people out. ==Even so,== the problem is not the card itself. ==The damage comes less from== digital payment ==than from== shops that refuse notes altogether. Older people, tourists and anyone without a bank account then cannot buy a loaf of bread. ==This is not to say that== we should go back to carrying large amounts of cash; it does mean that “modern” is not the same as “open to everyone”.",
      "==On balance== this is a positive development for most transactions. ==The point is not== whether phones should replace cash, ==but== whether cash remains possible when a phone fails or a person has no account. ==The practical conclusion is that== digital payment should be normal, and cash should stay legal tender in ordinary shops.",
    ],
    plan: [
      {
        label: "1 · Introduction",
        phrases: [
          "I see this as a largely positive / negative development, but not a harmless one.",
        ],
        must: "Явление своими словами. Positive или negative сразу — одна сторона.",
        avoid: "«Зависит от человека». Both positive and negative equally. I will discuss.",
        example:
          "I see this as a largely positive development, but not a harmless one.",
      },
      {
        label: "2 · Why it is positive",
        phrases: [
          "This is largely because …",
          "The result is that …",
          "This is visible in …",
          "In practical terms, …",
        ],
        must: "Почему это в целом хорошо (или плохо). Где это видно — свой пример.",
        avoid: "Список из пяти благ. Менять сторону. Firstly.",
        example:
          "The gain is speed and a clearer record of spending. This is largely because a tap takes seconds and leaves a trail that a wallet of notes does not. The result is that small businesses waste less time counting coins, and a person who loses a card can freeze it; lost cash is simply gone. This is visible in public transport, where a phone tap has replaced the hunt for the right coin. In practical terms, daily life gets lighter.",
      },
      {
        label: "3 · The harm",
        phrases: [
          "That said, …",
          "Even so, …",
          "The damage comes less from X than from Y.",
          "This is not to say that …",
        ],
        must: "Кого это запирает / какой вред. Почему оценка из intro всё ещё та же.",
        avoid: "Перевернуть intro («so it is negative after all»). Игнорировать абзац 2.",
        example:
          "That said, a cashless city can lock people out. Even so, the problem is not the card itself. The damage comes less from digital payment than from shops that refuse notes altogether. This is not to say that we should go back to carrying large amounts of cash; it does mean that “modern” is not the same as “open to everyone”.",
      },
      {
        label: "4 · Conclusion",
        phrases: [
          "On balance …",
          "The point is not X, but Y.",
          "The practical conclusion is that …",
        ],
        must: "Та же оценка. Различие: не X, а Y.",
        avoid: "Новый аргумент. It depends. In conclusion I am convinced.",
        example:
          "On balance this is a positive development for most transactions. The point is not whether phones should replace cash, but whether cash remains possible when a phone fails or a person has no account. The practical conclusion is that digital payment should be normal, and cash should stay legal tender in ordinary shops.",
      },
    ],
  },
  {
    id: "model-t2-rural-cities",
    number: 7,
    band: "7.5",
    type: "Task 2 · Two questions (why + what governments can do)",
    title: "Leaving the countryside",
    question:
      "In many countries, people are moving from the countryside to cities. Why is this happening, and what can governments do about it?",
    paragraphs: [
      "People leave villages for cities because work, education and healthcare have already left. This is not a sudden fashion. ==Part of the reason is that== a young person who wants a skilled job or a decent hospital often has no local choice. Governments cannot stop the move entirely, but they can stop the countryside from emptying by putting some of those services back.",
      "The main reason is work piled on top of services. ==This is largely because== factories, universities and specialist clinics cluster in cities, so wages and training follow them. When a bus to the nearest town runs twice a day, staying looks like giving up. ==This becomes obvious when== a village school closes: families leave, shops lose customers, and the next closure is easier to justify. ==The result is that== the countryside becomes a place for the old, not a place to build a life.",
      "What governments can do is attack that cause, not run a campaign telling people to love rural life. ==In practical terms,== that means jobs and clinics that do not require a two-hour commute: tax breaks for firms that open outside the capital, reliable buses, and a school that stays open. ==A clear case is== a regional hospital that can handle births and emergencies; without it, families move “just in case”. Cheap housing in the city, by contrast, pulls even more people in.",
      "==For that reason== the useful policy is not to block migration. ==The practical conclusion is that== people will keep moving while the city is the only place where ordinary life works. Put work and care within reach of a village, and some of them will stay.",
    ],
    plan: [
      {
        label: "1 · Introduction",
        phrases: [
          "Part of the reason is that …",
          "Governments cannot stop … entirely, but they can …",
        ],
        must: "Оба вопроса сразу: why + что может государство. Одна строка на каждый.",
        avoid: "Только why. Effects, если их не просили. I will discuss the reasons and solutions.",
        example:
          "Part of the reason is that a young person who wants a skilled job or a decent hospital often has no local choice. Governments cannot stop the move entirely, but they can stop the countryside from emptying by putting some of those services back.",
      },
      {
        label: "2 · Why",
        phrases: [
          "This is largely because …",
          "This becomes obvious when …",
          "The result is that …",
        ],
        must: "Одна главная причина. Как механизм работает (свой пример закрытой школы / завода).",
        avoid: "Список мер. Firstly the government should. Effects вместо why.",
        example:
          "The main reason is work piled on top of services. This is largely because factories, universities and specialist clinics cluster in cities, so wages and training follow them. This becomes obvious when a village school closes: families leave, shops lose customers, and the next closure is easier to justify. The result is that the countryside becomes a place for the old, not a place to build a life.",
      },
      {
        label: "3 · What governments can do",
        phrases: [
          "In practical terms, …",
          "A clear case is …",
        ],
        must: "Меры по причине из абзаца 2. Одна фраза, что не сработает.",
        avoid: "Агитация «любите село». Меры мимо причины. Только raise awareness.",
        example:
          "What governments can do is attack that cause, not run a campaign telling people to love rural life. In practical terms, that means jobs and clinics that do not require a two-hour commute. A clear case is a regional hospital that can handle births and emergencies; without it, families move “just in case”. Cheap housing in the city, by contrast, pulls even more people in.",
      },
      {
        label: "4 · Conclusion",
        phrases: ["For that reason …", "The practical conclusion is that …"],
        must: "Сжать why + меру. Люди останутся, если ordinary life работает на месте.",
        avoid: "Обещать, что все останутся. Новый why. Block migration.",
        example:
          "For that reason the useful policy is not to block migration. The practical conclusion is that people will keep moving while the city is the only place where ordinary life works. Put work and care within reach of a village, and some of them will stay.",
      },
    ],
  },
];

export const LINKING_ID = "linking";

export interface Task2LinkPhrase {
  frame: string;
  example: string;
}

export interface Task2LinkGroup {
  job: string;
  use: string;
  phrases: Task2LinkPhrase[];
}

/** Drop-in linkers for any Task 2 type. Not Firstly / On the one hand. */
export const task2Linking: Task2LinkGroup[] = [
  {
    job: "Уступка и поворот",
    use: "Чужая сторона не глупая — потом ваш удар. Везде.",
    phrases: [
      {
        frame: "That said, …",
        example: "That said, the cost is often ignored.",
      },
      {
        frame: "Even so, …",
        example: "Even so, this does not justify a total ban.",
      },
      {
        frame: "This is not to say that …",
        example: "This is not to say that the office has no value.",
      },
      {
        frame: "While it is true that …, it does not follow that …",
        example:
          "While it is true that rents are high, it does not follow that nothing can be done.",
      },
    ],
  },
  {
    job: "Не A, а B",
    use: "Уточнить мысль. Звучит на 7, не на список.",
    phrases: [
      {
        frame: "The point is not X, but Y.",
        example:
          "The point is not whether phones are useful, but how much time they take.",
      },
      {
        frame: "The damage comes less from X than from Y.",
        example:
          "The damage comes less from owning a car than from using it for every short trip.",
      },
      {
        frame: "A weaker argument is that …  A stronger one is that …",
        example:
          "A weaker argument is that people are lazy. A stronger one is that the system rewards the habit.",
      },
    ],
  },
  {
    job: "Причина",
    use: "Why / problem / agree — вместо because в начале каждого предложения.",
    phrases: [
      {
        frame: "This is largely because …",
        example: "This is largely because housing supply has not kept up.",
      },
      {
        frame: "Part of the reason is that …",
        example: "Part of the reason is that the job now lives on a screen.",
      },
      {
        frame: "This tends to happen when …",
        example: "This tends to happen when rules are copied from one industry to another.",
      },
    ],
  },
  {
    job: "Следствие",
    use: "Что из этого вытекает. Не Therefore it is evident.",
    phrases: [
      {
        frame: "The result is that …",
        example: "The result is that young people delay having children.",
      },
      {
        frame: "Over time, this leads to …",
        example: "Over time, this leads to a wider gap between owners and renters.",
      },
      {
        frame: "In practical terms, …",
        example: "In practical terms, a nurse cannot live near the hospital.",
      },
    ],
  },
  {
    job: "Пример",
    use: "Вместо For example, в каждом абзаце.",
    phrases: [
      {
        frame: "This is visible in …",
        example: "This is visible in the way people behave on a bus.",
      },
      {
        frame: "A clear case is …",
        example: "A clear case is junk-food advertising around cartoons.",
      },
      {
        frame: "This becomes obvious when …",
        example:
          "This becomes obvious when a junior worker never sees how a difficult client is handled.",
      },
    ],
  },
  {
    job: "Вывод абзаца или эссе",
    use: "Закрыть мысль. Не In conclusion, I am convinced.",
    phrases: [
      {
        frame: "For that reason, …",
        example: "For that reason, a total ban is the wrong tool.",
      },
      {
        frame: "On balance, …",
        example: "On balance, the office still matters for training.",
      },
      {
        frame: "The practical conclusion is that …",
        example:
          "The practical conclusion is that one rule cannot cover every job.",
      },
    ],
  },
];

export const linkingSkip = [
  "Firstly / Secondly / Finally",
  "On the one hand / On the other hand",
  "Moreover / Furthermore / In addition",
  "In conclusion, I am convinced that …",
  "For example, в каждом абзаце",
];

export function getWritingModel(
  id: string,
): PracticeWritingModel | undefined {
  return practiceWritingModels.find((m) => m.id === id);
}
