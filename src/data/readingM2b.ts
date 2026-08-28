import type { ReadingM2Data } from "./readingM2";

/** Module 2B · Testing skills · The Insect Empire (pp. 34–35). */
export const readingM2b: ReadingM2Data = {
  id: "reading-m2b-flow",
  module: 2,
  bookPages: "pp. 34–35 in your coursebook",
  title: "The Insect Empire",
  introduction:
    "The insects were the last of the major anthropod* groups to arrive, about 400 million years ago, but they have become the masters of terrestrial life.",
  examOnly: true,
  passage: [
    "Today, of the roughly 1.5 million known species of plant and animal on Earth, 1.2 million are anthropods, of whom about one million are insects, and, of these, about 800,000 are beetles, flies, moths or wasps. And were you to go into any tropical forest with a butterfly net, you would almost certainly catch a handful of species that are new to science. For all of the last 500 million years almost every habitat on Earth has been dominated by insects, swarming in extraordinary diversity in the lakes, rivers, forests, grasslands and deserts, from the seashore to the top of the highest mountains.",
    "Insects fill almost every conceivable ecological niche: they can be predators, parasites, herbivores or detrivores*. There is almost nothing of organic origin, alive or dead, that is not avidly consumed by insects of one sort or another, variously specializing in eating such things as blood, wood, seeds, the tongues of frogs, bacteria, leaves, spiders, fungi and, of course, other insects. They vary in size from Bornean stick insects, which can grow to over thirty centimetres, to speck-like parasitoid wasps that weigh in at just twenty-five millionths of a gram.",
    "Some, such as ants and termites, live in vast social colonies, with workers specializing as soldiers, gardeners or nurse-maids, while others, such as the death-watch beetle, may spend ten years alone and in darkness, slowly munching through the timber of a dead tree. Nymphs of the periodic cicada in North America spend seventeen years living underground, sucking on tree roots, before all emerging together to mate and die, while a fruit fly dashes through its entire life cycle in a fortnight.",
    "Just as their life cycles are infinitely diverse, so their mating habitats are extraordinarily varied and often bizarre. While butterfly males use their beautiful wings to attract a mate, male scorpion flies offer piles of dried saliva as an enticement to females. Crickets, cicadas and grasshoppers sing to impress, while other insects such as moths release pheromones that drift for kilometres on the wind.",
    "In terms of numbers of individuals, insects rule supreme. In fact, at any one point in time there are currently thought to be very roughly ten million trillion individual insects alive on Earth. Whatever way you look at it we are seriously outnumbered. Some pest insects, such as house flies, are perhaps more common than ever because of the food we unwittingly supply for them. But most insects are declining, and many thousands of species have already become extinct.",
    "In the minds of many, conservation is all about giant pandas, tigers, rhinos and blue whales: large charismatic, furry or feathery creatures, often living on the other side of the world, glimpsed only in television documentaries. What few people appreciate is that the vast majority of life on earth, in terms of both number of species and numbers of individuals, is comprised of insects and other anthropods, and that many of them are just as important, fascinating and worthy of our interest and of conservation as the larger creatures. Indeed, while the extinction of the giant panda would be a terrible loss, it would not have any major consequences. In contrast, the little creatures that inhabit the world around us are absolutely vital to human survival, yet we generally pay them little attention unless they annoy us.",
    "The various flowers in the meadow need bees, hoverflies, butterflies and beetles to pollinate them, and many of those very same insects pollinate the peaches, apples and tomatoes in our gardens. Wild flowers and vegetables also need a healthy soil in which to grow, and so depend upon the worms and millipedes that live in it to break down dead plant and animal parts and return it to the earth in the form of nutrients to improve and aerate the soil. Without predators such as ladybirds and wasps, herbivorous insects would be uncontrollable, eradicating their host plants and therefore destroying the ecological balance of the meadow. Without grasshoppers, flies, crickets and moths, the birds and bats would have no food. Ugly or beautiful, it is the little creatures that make the world go round. We should celebrate and appreciate them in all their wonderful diversity.",
  ],
  tfngInstruction:
    "Do the following statements agree with the information in the reading passage?",
  tfngLegend: [
    { value: "TRUE", meaning: "if the statement agrees with the information" },
    { value: "FALSE", meaning: "if the statement contradicts the information" },
    { value: "NOT GIVEN", meaning: "if there is no information on this" },
  ],
  tfng: [
    {
      id: 1,
      statement:
        "The majority of insects come from of a group of limited species.",
      key: "TRUE",
      evidence: [
        "about one million are insects, and, of these, about 800,000 are beetles, flies, moths or wasps",
      ],
      tip: "TRUE. В тексте: ~1 млн насекомых, и из них ~800 000 — только beetles, flies, moths or wasps (4 группы). 800 000 из 1 000 000 = большинство. «a group of limited species» = эти несколько ограниченных групп. Совпадает по смыслу.",
      paragraphIndex: 0,
    },
    {
      id: 2,
      statement:
        "Every type of insect will feed off whatever is available, alive or dead.",
      key: "FALSE",
      evidence: [
        "variously specializing in eating such things as blood, wood, seeds",
        "There is almost nothing of organic origin, alive or dead, that is not avidly consumed by insects of one sort or another",
      ],
      tip: "FALSE. Текст говорит: почти всё органическое едят насекомые в целом (insects of one sort or another), но каждое специализируется (specializing) — кровь, дерево, семена и т.д. Statement говорит Every type eats whatever — это противоположность specialization. Ловушка: «alive or dead» есть в тексте, но не «каждый вид ест всё».",
      paragraphIndex: 1,
    },
    {
      id: 3,
      statement:
        "There is a significant variation in the life expectancy of different insects.",
      key: "TRUE",
      evidence: [
        "ten years alone and in darkness",
        "seventeen years living underground",
        "entire life cycle in a fortnight",
      ],
      tip: "TRUE. Сравни сроки жизни в одном абзаце: death-watch beetle — 10 лет; periodic cicada — 17 лет; fruit fly — a fortnight (2 недели). Это и есть significant variation = большая разница в продолжительности жизни.",
      paragraphIndex: 2,
    },
    {
      id: 4,
      statement:
        "The number of insects is falling despite the effort of humans.",
      key: "FALSE",
      evidence: [
        "Some pest insects, such as house flies, are perhaps more common than ever because of the food we unwittingly supply for them",
        "But most insects are declining",
      ],
      tip: "FALSE. «Most insects are declining» — часть правды, но «despite the effort of humans» в тексте нет. Наоборот: house flies становятся более common из‑за еды, которую мы им невольно даём (we supply). Люди не «стараются спасти» — мы скорее кормим вредителей. Statement противоречит тексту.",
      paragraphIndex: 4,
    },
    {
      id: 5,
      statement:
        "People become interested in conservation when they see the animals on television.",
      key: "NOT GIVEN",
      evidence: [
        "glimpsed only in television documentaries",
      ],
      tip: "NOT GIVEN. TV documentaries упомянуты (large animals glimpsed only in documentaries), но текст не говорит, что люди становятся interested in conservation, когда смотрят ТВ. Причина интереса к conservation не дана — нельзя ни подтвердить, ни опровергнуть.",
      paragraphIndex: 5,
    },
  ],
  shortInstruction:
    "Answer the questions below. Choose NO MORE THAN THREE WORDS from the passage for each answer.",
  short: [
    {
      id: 6,
      question:
        "With which animal are insects contrasted, in terms of their significance to mankind?",
      answers: ["giant panda", "the giant panda", "panda"],
      evidence: [
        "the extinction of the giant panda would be a terrible loss, it would not have any major consequences. In contrast, the little creatures",
      ],
      tip: "Ответ: (the) giant panda. Ключ — In contrast: вымирание giant panda — ужасная потеря, но без major consequences; little creatures (насекомые) vital to human survival. Контраст по значимости для человечества = panda.",
      paragraphIndex: 5,
    },
    {
      id: 7,
      question:
        "By moving dead organic material around the ground, what are anthropods providing for the soil?",
      answers: ["nutrients"],
      evidence: [
        "return it to the earth in the form of nutrients to improve and aerate the soil",
      ],
      tip: "Ответ: nutrients. Worms and millipedes разлагают мёртвое → return … in the form of nutrients. Не «soil» и не «earth» — вопрос: what are they providing for the soil? = nutrients.",
      paragraphIndex: 6,
    },
    {
      id: 8,
      question:
        "What important aspect of a field do predator insects help to preserve?",
      answers: ["ecological balance", "the ecological balance"],
      evidence: [
        "destroying the ecological balance of the meadow",
      ],
      tip: "Ответ: (the) ecological balance. Без ladybirds and wasps травоядные уничтожили бы растения → destroying the ecological balance of the meadow. То, что хищники сохраняют = ecological balance.",
      paragraphIndex: 6,
    },
    {
      id: 9,
      question:
        "What are two examples of insects that keep the population of other insects in check?",
      answers: [
        "ladybirds and wasps",
        "ladybirds, wasps",
        "ladybirds, and wasps",
        "wasps and ladybirds",
      ],
      evidence: ["Without predators such as ladybirds and wasps"],
      tip: "Ответ: ladybirds and wasps. Текст: predators such as ladybirds and wasps — без них herbivorous insects стали бы uncontrollable. Keep … in check = контролировать численность.",
      paragraphIndex: 6,
    },
  ],
  examTips: [
    "TRUE = тот же смысл другими словами. FALSE = текст говорит обратное. NOT GIVEN = нужного факта в тексте нет (или есть только часть).",
    "Смотрите на слова-ловушки: every / all / despite / when — часто меняют смысл.",
    "Q6–9: не больше трёх слов, копируйте формулировку из текста.",
  ],
};
