import { Task1ModelChart } from "./PracticeWritingTask1Charts";
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
    return (
      <div className="pw-shell pw-shell--wide">
        <header className="pr-exam__chrome">
          <button type="button" className="back-link" onClick={onBackToFolder}>
            ← Models
          </button>
          <div className="pr-exam__chrome-title">
            <span>
              Chart {chart.number} · Band {chart.band}
            </span>
            <strong>{chart.title}</strong>
          </div>
        </header>
        <article className="pw-model-page pw-model-page--t1">
          <p className="pw-model-page__type">{chart.type}</p>
          <p className="pw-prompt">{chart.question}</p>
          <p className="pw-teacher-tip">
            Свои цифры с этой картинки. Каркас целиком: intro → overview →
            details. Фразы не переставлять.
          </p>
          <div className="pw-t1-split">
            <div className="pw-t1-split__viz">
              <Task1ModelChart model={chart} />
              <div className="pw-model-plan">
                <p className="pw-model-row">
                  <span className="pw-model-row__k">Обычно</span>
                  <span>{chart.usually}</span>
                </p>
                <p className="pw-model-row">
                  <span className="pw-model-row__k">Вставить</span>
                  <span>{chart.insert}</span>
                </p>
              </div>
            </div>
            <div className="pw-t1-split__text">
              <div className="pw-sample">
                <p className="pw-sample__h">
                  Model · underlined = constructions to keep
                </p>
                <div className="pw-sample__body pw-model-page__essay">
                  {chart.paragraphs.map((p) => (
                    <p key={p.slice(0, 48)}>
                      <MarkedText text={p} />
                    </p>
                  ))}
                </div>
              </div>
              <PlanBlocks
                plan={chart.plan}
                hint="Фразы · нужно · нельзя · свои цифры. Четыре части = 150 слов"
              />
              <div className="pw-model-plan">
                <p className="pw-sample__h">Linking · any Task 1 graph</p>
                <p className="pw-link-mini">
                  {task1Linking
                    .flatMap((g) => g.phrases.map((p) => p.frame))
                    .join("  ·  ")}
                </p>
                <button
                  type="button"
                  className="pw-plan__toggle"
                  onClick={() => onOpen(T1_LINKING_ID)}
                >
                  Open full list with examples →
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }

  if (essay) {
    return (
      <div className="pw-shell pw-shell--wide">
        <header className="pr-exam__chrome">
          <button type="button" className="back-link" onClick={onBackToFolder}>
            ← Models
          </button>
          <div className="pr-exam__chrome-title">
            <span>
              Question {essay.number} · Band {essay.band}
            </span>
            <strong>{essay.title}</strong>
          </div>
        </header>
        <article className="pw-model-page">
          <p className="pw-model-page__type">{essay.type}</p>
          <p className="pw-prompt">{essay.question}</p>
          <p className="pw-teacher-tip">
            Свои доводы. Каркас целиком: те же части, те же фразы, в том же
            порядке. Текст модели не зубрить.
          </p>
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
          {practiceWritingTask1Models.map((item) => (
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
          {practiceWritingModels.map((item) => (
            <button
              key={item.id}
              type="button"
              className="pr-hub__task"
              onClick={() => onOpen(item.id)}
            >
              <span className="pr-hub__task-num">Question {item.number}</span>
              <strong>{item.title}</strong>
              <span className="pr-hub__task-meta">
                {item.type} · Band {item.band}
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
