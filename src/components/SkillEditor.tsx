import { useState } from "react";
import type { SkillBlock } from "../types/module";

export function SkillEditor({
  block,
  onSave,
  onClose,
}: {
  block: SkillBlock;
  onSave: (patch: Partial<SkillBlock>) => void;
  onClose: () => void;
}) {
  const [skill, setSkill] = useState(block.skill);
  const [topicsText, setTopicsText] = useState(block.topics.join("\n"));
  const [pages, setPages] = useState(block.pages);
  const [trainerId, setTrainerId] = useState(block.trainerId ?? "");
  const [trainerLabel, setTrainerLabel] = useState(block.trainerLabel ?? "");
  const [note, setNote] = useState(block.note ?? "");

  const handleSave = () => {
    onSave({
      skill,
      topics: topicsText
        .split("\n")
        .map((t) => t.trim())
        .filter(Boolean),
      pages,
      trainerId: trainerId.trim() || undefined,
      trainerLabel: trainerLabel.trim() || undefined,
      note: note.trim() || undefined,
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Редактировать блок</h2>

        <label className="field">
          <span>Навык</span>
          <input value={skill} onChange={(e) => setSkill(e.target.value)} />
        </label>

        <label className="field">
          <span>Темы (каждая с новой строки)</span>
          <textarea
            rows={6}
            value={topicsText}
            onChange={(e) => setTopicsText(e.target.value)}
          />
        </label>

        <label className="field">
          <span>Страницы в учебнике</span>
          <input value={pages} onChange={(e) => setPages(e.target.value)} />
        </label>

        <label className="field">
          <span>ID тренажёра</span>
          <input
            value={trainerId}
            onChange={(e) => setTrainerId(e.target.value)}
            placeholder="lead-in-intelligence"
          />
        </label>

        <label className="field">
          <span>Подпись для ученика</span>
          <input
            value={trainerLabel}
            onChange={(e) => setTrainerLabel(e.target.value)}
            placeholder="Lead-in перед текстом"
          />
        </label>

        <label className="field">
          <span>Заметка для себя</span>
          <input value={note} onChange={(e) => setNote(e.target.value)} />
        </label>

        <div className="modal-actions">
          <button type="button" className="nav-btn" onClick={onClose}>
            Отмена
          </button>
          <button type="button" className="action-btn primary" onClick={handleSave}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
