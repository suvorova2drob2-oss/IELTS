import { Task1BarChartVisual, Task1ModelChart } from "./PracticeWritingTask1Charts";
import {
  GROUPED_BAR_PHRASE_BLOCKS,
  T1_BAR_FOLDER_ID,
  T1_BAR_MASTER_ID,
  getBarHomework,
  groupedBarHomework,
  type GroupedBarPhraseBlock,
} from "../data/practiceWritingTask1BarFolder";
import {
  TASK2_DISCUSS_PHRASE_BLOCKS,
  T2_DISCUSS_FOLDER_ID,
  T2_DISCUSS_MASTER_ID,
  getTask2DiscussHomework,
  task2DiscussHomework,
  type Task2PhraseBlock,
} from "../data/practiceWritingTask2DiscussFolder";
import { T1_GROUPED_BAR_INSERT } from "../data/practiceWritingTask1Models";
import {
  LINKING_ID,
  getWritingModel,
  linkingSkip,
  practiceWritingModels,
  task2Linking,
} from "../data/practiceWritingModels";
import {
  T1_LINKING_ID,
  getTask1Model,
  practiceWritingTask1Models,
  task1Linking,
  task1LinkingSkip,
  type Task1ModelPlan,
} from "../data/practiceWritingTask1Models";

const BAR_PARAGRAPH_LABELS = [
  "1 · Intro",
  "2 · Overview",
  "3 · Details",
  "4 · Details",
] as const;

const T1_PARAGRAPH_LABELS = [
  "1 · Intro",
  "2 · Overview",
  "3 · Details",
  "4 · Details",
] as const;

const T2_PARAGRAPH_LABELS = [
  "1 · Intro",
  "2 · Other view",
  "3 · Your view",
  "4 · Conclusion",
] as const;

function PhraseMenuPanel({
  blocks,
}: {
  blocks: GroupedBarPhraseBlock[] | Task2PhraseBlock[];
}) {
  return (
    <div className="pw-phrase-menu">
      <p className="pw-sample__h">Подставь · выбери вариант в каждой строке</p>
      {blocks.map((block) => (
        <section key={block.tag} className="pw-phrase-block">
          <div className="pw-phrase-block__head">
            <span className="pw-t1-para__tag">{block.tag}</span>
            <span className="pw-phrase-block__job">{block.job}</span>
          </div>
          <p className="pw-phrase-block__k">Начало — одно на выбор</p>
          <ul className="pw-phrase-block__list">
            {block.openers.map((line) => (
              <li key={line}>
                <code>{line}</code>
              </li>
            ))}
          </ul>
          <p className="pw-phrase-block__k">Предложение — склей 1–2 строки</p>
          <ul className="pw-phrase-block__list">
            {block.frames.map((line) => (
              <li key={line}>
                <code>{line}</code>
              </li>
            ))}
          </ul>
          {block.swaps.length > 0 && (
            <>
              <p className="pw-phrase-block__k">На одно место — любой синоним</p>
              <div className="pw-phrase-swaps">
                {block.swaps.map((swap) => (
                  <div key={swap.slot} className="pw-phrase-swap">
                    <span className="pw-phrase-swap__slot">{swap.slot}</span>
                    <p className="pw-t1-hint-chips">
                      {swap.options.map((opt) => (
                        <span key={opt} className="pw-hint-chip">
                          {opt}
                        </span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      ))}
    </div>
  );
}

function GroupedBarPhrasePanel() {
  return <PhraseMenuPanel blocks={GROUPED_BAR_PHRASE_BLOCKS} />;
}

function MarkedText({ text }: { text: string }) {
  const parts = text.split(/(==[^=]+==)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("==") && part.endsWith("==")) {
          return (
            <span key={i} className="pw-keep">
              {part.slice(2, -2)}
            </span>
          );
        }
        return part;
      })}
    </>
  );
}

function LinkingBank({
  groups,
}: {
  groups: { job: string; use: string; phrases: { frame: string; example: string }[] }[];
}) {
  return (
    <div className="pw-link-bank">
      {groups.map((group) => (
        <section key={group.job} className="pw-link-card">
          <strong>{group.job}</strong>
          <span>{group.use}</span>
          <ul>
            {group.phrases.map((p) => (
              <li key={p.frame}>
                <em>{p.frame}</em>
                <small>{p.example}</small>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function CompactPlanBlocks({
  plan,
}: {
  plan: Task1ModelPlan[] | {
    label: string;
    phrases: string[];
    must: string;
    avoid: string;
    example: string;
  }[];
}) {
  return (
    <div className="pw-model-plan pw-model-plan--grid">
      <p className="pw-sample__h">4 parts · keep these phrases</p>
      <div className="pw-plan-grid">
        {plan.map((block) => (
          <div key={block.label} className="pw-plan-grid__cell">
            <strong>{block.label}</strong>
            <span>{block.phrases.join(" · ")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlanBlocks({
  plan,
  hint,
}: {
  plan: Task1ModelPlan[] | {
    label: string;
    phrases: string[];
    must: string;
    avoid: string;
    example: string;
  }[];
  hint?: string;
}) {
  return (
    <div className="pw-model-plan">
      <p className="pw-sample__h">
        {hint ?? "Часть · фразы · нужно · нельзя · пример"}
      </p>
      <ol className="pw-model-plan__list">
        {plan.map((block) => (
          <li key={block.label} className="pw-model-block">
            <strong>{block.label}</strong>
            <p className="pw-model-row">
              <span className="pw-model-row__k">Фразы</span>
              <span>{block.phrases.join("  ·  ")}</span>
            </p>
            <p className="pw-model-row">
              <span className="pw-model-row__k">Нужно</span>
              <span>{block.must}</span>
            </p>
            <p className="pw-model-row pw-model-row--no">
              <span className="pw-model-row__k">Нельзя</span>
              <span>{block.avoid}</span>
            </p>
            <p className="pw-model-row pw-model-row--ex">
              <span className="pw-model-row__k">Пример</span>
              <span>{block.example}</span>
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function PracticeWritingModels({
  selectedId,
  onOpen,
  onBackToFolder,
}: {
  selectedId: string | null;
  onOpen: (id: string) => void;
  onBackToFolder: () => void;
}) {
  const essay = selectedId ? getWritingModel(selectedId) : null;
  const chart = selectedId ? getTask1Model(selectedId) : null;
  const barHomework = selectedId ? getBarHomework(selectedId) : undefined;
  const t2Homework = selectedId ? getTask2DiscussHomework(selectedId) : undefined;
  const t1GraphModels = practiceWritingTask1Models.filter((m) => m.kind !== "bar");

  if (selectedId === T2_DISCUSS_FOLDER_ID) {
    return (
      <div className="pr-hub pr-hub--fill pr-hub--models">
        <header className="pr-hub__chrome">
          <button type="button" className="back-link" onClick={onBackToFolder}>
            ← Models
          </button>
          <div>
            <h1>Discuss both views</h1>
            <p>Меню фраз · модель + домашка</p>
          </div>
        </header>
        <section className="pr-hub__tasks">
          <h2>Start here</h2>
          <div className="pr-hub__task-grid">
            <button
              type="button"
              className="pr-hub__task pr-hub__task--models"
              onClick={() => onOpen(T2_DISCUSS_MASTER_ID)}
            >
              <span className="pr-hub__task-num">Model</span>
              <strong>Work from home</strong>
              <span className="pr-hub__task-meta">Band 7.5 · full sample + phrase menu</span>
              <span className="pr-hub__task-go">Open</span>
            </button>
          </div>
          <h2>Homework · ~40 min each</h2>
          <div className="pr-hub__task-grid">
            {task2DiscussHomework.map((hw) => (
              <button
                key={hw.id}
                type="button"
                className="pr-hub__task"
                onClick={() => onOpen(hw.id)}
              >
                <span className="pr-hub__task-num">HW {hw.number}</span>
                <strong>{hw.title}</strong>
                <span className="pr-hub__task-meta">Question + phrase menu · your ideas</span>
                <span className="pr-hub__task-go">Open</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (t2Homework) {
    return (
      <div className="pw-shell pw-shell--wide">
        <header className="pr-exam__chrome">
          <button
            type="button"
            className="back-link"
            onClick={() => onOpen(T2_DISCUSS_FOLDER_ID)}
          >
            ← Discuss both views
          </button>
          <div className="pr-exam__chrome-title">
            <span>Homework {t2Homework.number}</span>
            <strong>{t2Homework.title}</strong>
          </div>
        </header>
        <article className="pw-model-page pw-model-page--t2-hw">
          <p className="pw-model-page__type">Task 2 · Discuss both views</p>
          <p className="pw-prompt">{t2Homework.question}</p>
          <div className="pw-model-plan pw-model-plan--compact pw-t2-hw-notes">
            <p className="pw-model-row">
              <span className="pw-model-row__k">Обычно</span>
              <span>{t2Homework.usually}</span>
            </p>
            <p className="pw-model-row">
              <span className="pw-model-row__k">Структура</span>
              <span>
                Intro (оба view + opinion) → other view → your view → conclusion · свои
                примеры · меню ниже
              </span>
            </p>
          </div>
          <div className="pw-t2-hw-menu">
            <PhraseMenuPanel blocks={TASK2_DISCUSS_PHRASE_BLOCKS} />
          </div>
        </article>
      </div>
    );
  }

  if (selectedId === T1_BAR_FOLDER_ID) {
    return (
      <div className="pr-hub pr-hub--fill pr-hub--models">
        <header className="pr-hub__chrome">
          <button type="button" className="back-link" onClick={onBackToFolder}>
            ← Models
          </button>
          <div>
            <h1>Grouped bar charts</h1>
            <p>Один каркас · модель + домашка</p>
          </div>
        </header>
        <section className="pr-hub__tasks">
          <h2>Start here</h2>
          <div className="pr-hub__task-grid">
            <button
              type="button"
              className="pr-hub__task pr-hub__task--models"
              onClick={() => onOpen(T1_BAR_MASTER_ID)}
            >
              <span className="pr-hub__task-num">Model</span>
              <strong>Electricity by source</strong>
              <span className="pr-hub__task-meta">Band 7.5 · full sample + underlined frames</span>
              <span className="pr-hub__task-go">Open</span>
            </button>
          </div>
          <h2>Homework · write 150 words</h2>
          <div className="pr-hub__task-grid">
            {groupedBarHomework.map((hw) => (
              <button
                key={hw.id}
                type="button"
                className="pr-hub__task"
                onClick={() => onOpen(hw.id)}
              >
                <span className="pr-hub__task-num">HW {hw.number}</span>
                <strong>{hw.title}</strong>
                <span className="pr-hub__task-meta">Graph + phrase menu (pick &amp; fill)</span>
                <span className="pr-hub__task-go">Open</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (barHomework) {
    return (
      <div className="pw-shell pw-shell--wide">
        <header className="pr-exam__chrome">
          <button
            type="button"
            className="back-link"
            onClick={() => onOpen(T1_BAR_FOLDER_ID)}
          >
            ← Grouped bar charts
          </button>
          <div className="pr-exam__chrome-title">
            <span>Homework {barHomework.number}</span>
            <strong>{barHomework.title}</strong>
          </div>
        </header>
        <article className="pw-model-page pw-model-page--t1 pw-model-page--t1-bar">
          <p className="pw-prompt">{barHomework.question}</p>
          <p className="pw-teacher-tip">
            Слева график · справа меню фраз: выбери начало + 1–2 каркаса + подставь цифры с картинки.
          </p>
          <div className="pw-t1-split">
            <div className="pw-t1-split__viz">
              <div className="pw-graph pw-t1-visual">
                <Task1BarChartVisual data={barHomework.barData} />
              </div>
              <div className="pw-model-plan pw-model-plan--compact">
                <p className="pw-model-row">
                  <span className="pw-model-row__k">Обычно</span>
                  <span>{barHomework.usually}</span>
                </p>
                <p className="pw-model-row">
                  <span className="pw-model-row__k">Каркас</span>
                  <span>{T1_GROUPED_BAR_INSERT}</span>
                </p>
              </div>
            </div>
            <div className="pw-t1-split__text pw-t1-split__text--hints">
              <GroupedBarPhrasePanel />
            </div>
          </div>
        </article>
      </div>
    );
  }

  if (selectedId === LINKING_ID) {
    return (
      <div className="pw-shell pw-shell--wide">
        <header className="pr-exam__chrome">
          <button type="button" className="back-link" onClick={onBackToFolder}>
            ← Models
          </button>
          <div className="pr-exam__chrome-title">
            <span>Any Task 2</span>
            <strong>Linking phrases</strong>
          </div>
        </header>
        <article className="pw-model-page">
          <p className="pw-teacher-tip">
            Эти связки ставятся в discuss, agree, problems и why/effects. Одна
            на абзац достаточно. Не начинайте каждое предложение с Firstly.
          </p>
          <p className="pw-link-skip">
            Не брать: {linkingSkip.join(" · ")}
          </p>
          <LinkingBank groups={task2Linking} />
        </article>
      </div>
    );
  }

  if (selectedId === T1_LINKING_ID) {
    return (
      <div className="pw-shell pw-shell--wide">
        <header className="pr-exam__chrome">
          <button type="button" className="back-link" onClick={onBackToFolder}>
            ← Models
          </button>
          <div className="pr-exam__chrome-title">
            <span>Any Task 1</span>
            <strong>Graph linking</strong>
          </div>
        </header>
        <article className="pw-model-page">
          <p className="pw-teacher-tip">
            Берёшь фразу и вставляешь цифру или категорию. Одна связка на
            предложение. Причин и мнений в Task 1 нет.
          </p>
          <p className="pw-link-skip">
            Не брать: {task1LinkingSkip.join(" · ")}
          </p>
          <LinkingBank groups={task1Linking} />
        </article>
      </div>
    );
  }

  if (chart) {
    const barMaster = chart.kind === "bar";
    return (
      <div className="pw-shell pw-shell--wide">
        <header className="pr-exam__chrome">
          <button
            type="button"
            className="back-link"
            onClick={() =>
              barMaster ? onOpen(T1_BAR_FOLDER_ID) : onBackToFolder()
            }
          >
            {barMaster ? "← Grouped bar charts" : "← Models"}
          </button>
          <div className="pr-exam__chrome-title">
            <span>
              Chart {chart.number} · Band {chart.band}
            </span>
            <strong>{chart.title}</strong>
          </div>
        </header>
        <article
          className={`pw-model-page pw-model-page--t1${chart.kind === "bar" ? " pw-model-page--t1-bar" : " pw-model-page--t1-fit"}`}
        >
          <p className="pw-model-page__type">{chart.type}</p>
          <p className="pw-prompt pw-prompt--t1-fit">{chart.question}</p>
          {chart.kind === "bar" && (
            <p className="pw-teacher-tip">
              Grouped bar: 4 абзаца · свои цифры · подчёркнутое = фразы-каркас.
            </p>
          )}
          <div className="pw-t1-split">
            <div className="pw-t1-split__viz">
              <Task1ModelChart model={chart} />
              <div className="pw-model-plan pw-model-plan--compact">
                {chart.kind === "bar" && (
                  <p className="pw-model-row">
                    <span className="pw-model-row__k">Каркас</span>
                    <span>{chart.insert}</span>
                  </p>
                )}
                <p className="pw-model-row">
                  <span className="pw-model-row__k">Обычно</span>
                  <span>{chart.usually}</span>
                </p>
                {chart.kind !== "bar" && (
                  <p className="pw-model-row">
                    <span className="pw-model-row__k">Вставить</span>
                    <span>{chart.insert}</span>
                  </p>
                )}
              </div>
            </div>
            <div className="pw-t1-split__text">
              <div className="pw-sample pw-sample--t1-model">
                <p className="pw-sample__h">
                  Model · underlined = keep these phrases
                </p>
                <div className="pw-sample__body pw-model-page__essay">
                  {chart.paragraphs.map((p, i) => (
                    <div key={p.slice(0, 48)} className="pw-t1-para">
                      <span className="pw-t1-para__tag">
                        {(chart.kind === "bar"
                          ? BAR_PARAGRAPH_LABELS
                          : T1_PARAGRAPH_LABELS)[i] ?? `${i + 1}`}
                      </span>
                      <p>
                        <MarkedText text={p} />
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              {chart.kind === "bar" && <GroupedBarPhrasePanel />}
            </div>
          </div>
          {chart.kind !== "bar" && (
            <footer className="pw-t1-fit-footer">
              <CompactPlanBlocks plan={chart.plan} />
              <button
                type="button"
                className="pw-plan__toggle pw-plan__toggle--inline"
                onClick={() => onOpen(T1_LINKING_ID)}
              >
                Full linking list →
              </button>
            </footer>
          )}
        </article>
      </div>
    );
  }

  if (essay) {
    const discussMaster = essay.id === T2_DISCUSS_MASTER_ID;
    return (
      <div className="pw-shell pw-shell--wide">
        <header className="pr-exam__chrome">
          <button
            type="button"
            className="back-link"
            onClick={() =>
              discussMaster ? onOpen(T2_DISCUSS_FOLDER_ID) : onBackToFolder()
            }
          >
            {discussMaster ? "← Discuss both views" : "← Models"}
          </button>
          <div className="pr-exam__chrome-title">
            <span>
              Question {essay.number} · Band {essay.band}
            </span>
            <strong>{essay.title}</strong>
          </div>
        </header>
        <article
          className={`pw-model-page${discussMaster ? " pw-model-page--t1 pw-model-page--t1-bar" : ""}`}
        >
          <p className="pw-model-page__type">{essay.type}</p>
          <p className="pw-prompt">{essay.question}</p>
          <p className="pw-teacher-tip">
            {discussMaster
              ? "Пример сборки меню справа · подчёркнутое = фразы · свои примеры вместо remote work."
              : "Свои доводы. Каркас целиком: те же части, те же фразы, в том же порядке."}
          </p>
          {discussMaster ? (
            <div className="pw-t1-split">
              <div className="pw-t1-split__text pw-t1-split__text--hints">
                <div className="pw-sample pw-sample--t1-model">
                  <p className="pw-sample__h">Model · underlined = keep these phrases</p>
                  <div className="pw-sample__body pw-model-page__essay">
                    {essay.paragraphs.map((p, i) => (
                      <div key={p.slice(0, 48)} className="pw-t1-para">
                        <span className="pw-t1-para__tag">
                          {T2_PARAGRAPH_LABELS[i] ?? `${i + 1}`}
                        </span>
                        <p>
                          <MarkedText text={p} />
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pw-t1-split__text pw-t1-split__text--hints">
                <PhraseMenuPanel blocks={TASK2_DISCUSS_PHRASE_BLOCKS} />
              </div>
            </div>
          ) : (
            <>
              <div className="pw-sample">
                <p className="pw-sample__h">
                  Model · underlined = constructions to keep
                </p>
                <div className="pw-sample__body pw-model-page__essay">
                  {essay.paragraphs.map((p) => (
                    <p key={p.slice(0, 48)}>
                      <MarkedText text={p} />
                    </p>
                  ))}
                </div>
              </div>
              <PlanBlocks
                plan={essay.plan}
                hint="Фразы · нужно · нельзя · свои доводы. Четыре части — в этом порядке"
              />
              <div className="pw-model-plan">
                <p className="pw-sample__h">Linking · use in any essay</p>
                <p className="pw-link-mini">
                  {task2Linking
                    .flatMap((g) => g.phrases.map((p) => p.frame))
                    .join("  ·  ")}
                </p>
                <button
                  type="button"
                  className="pw-plan__toggle"
                  onClick={() => onOpen(LINKING_ID)}
                >
                  Open full list with examples →
                </button>
              </div>
            </>
          )}
        </article>
      </div>
    );
  }

  return (
    <div className="pr-hub pr-hub--fill pr-hub--models">
      <header className="pr-hub__chrome">
        <button type="button" className="back-link" onClick={onBackToFolder}>
          ← Practice Writing
        </button>
        <div>
          <h1>Models</h1>
          <p>Свои доводы · каркас целиком</p>
        </div>
      </header>
      <section className="pr-hub__tasks">
        <h2>Task 1 graphs</h2>
        <div className="pr-hub__task-grid">
          <button
            type="button"
            className="pr-hub__task pr-hub__task--models"
            onClick={() => onOpen(T1_BAR_FOLDER_ID)}
          >
            <span className="pr-hub__task-num">Bar charts</span>
            <strong>Grouped bar charts</strong>
            <span className="pr-hub__task-meta">
              1 model · {groupedBarHomework.length} homework graphs
            </span>
            <span className="pr-hub__task-go">Open</span>
          </button>
          {t1GraphModels.map((item) => (
            <button
              key={item.id}
              type="button"
              className="pr-hub__task"
              onClick={() => onOpen(item.id)}
            >
              <span className="pr-hub__task-num">{item.type.replace("Task 1 · ", "")}</span>
              <strong>{item.title}</strong>
              <span className="pr-hub__task-meta">Band {item.band} · take the frame</span>
              <span className="pr-hub__task-go">Open</span>
            </button>
          ))}
          <button
            type="button"
            className="pr-hub__task pr-hub__task--models"
            onClick={() => onOpen(T1_LINKING_ID)}
          >
            <span className="pr-hub__task-num">Any Task 1</span>
            <strong>Graph linking</strong>
            <span className="pr-hub__task-meta">
              Overall · whereas · accounted for · maps
            </span>
            <span className="pr-hub__task-go">Open</span>
          </button>
        </div>
        <h2>Task 2 essays</h2>
        <div className="pr-hub__task-grid">
          <button
            type="button"
            className="pr-hub__task pr-hub__task--models"
            onClick={() => onOpen(T2_DISCUSS_FOLDER_ID)}
          >
            <span className="pr-hub__task-num">Discuss</span>
            <strong>Discuss both views</strong>
            <span className="pr-hub__task-meta">
              1 model · {task2DiscussHomework.length} homework · phrase menu
            </span>
            <span className="pr-hub__task-go">Open</span>
          </button>
          {practiceWritingModels
            .filter((item) => item.id !== T2_DISCUSS_MASTER_ID)
            .map((item) => (
              <button
                key={item.id}
                type="button"
                className="pr-hub__task"
                onClick={() => onOpen(item.id)}
              >
                <span className="pr-hub__task-num">
                  {item.type.replace("Task 2 · ", "")}
                </span>
                <strong>{item.title}</strong>
                <span className="pr-hub__task-meta">
                  Band {item.band} · full model
                </span>
                <span className="pr-hub__task-go">Open</span>
              </button>
            ))}
          <button
            type="button"
            className="pr-hub__task pr-hub__task--models"
            onClick={() => onOpen(LINKING_ID)}
          >
            <span className="pr-hub__task-num">Any Task 2</span>
            <strong>Linking phrases</strong>
            <span className="pr-hub__task-meta">
              Drop-in frames · Band 7 · works in every essay
            </span>
            <span className="pr-hub__task-go">Open</span>
          </button>
        </div>
      </section>
    </div>
  );
}
