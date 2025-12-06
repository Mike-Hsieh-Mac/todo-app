
import { useState } from "react";

function TodoItem({ todo, onDelete, onToggle, onToggleUrgent, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  const startEdit = () => {
    setDraft(todo.text);
    setEditing(true);
  };

  const commitEdit = () => {
    const t = draft.trim();
    if (t && t !== todo.text) {
      onEdit(todo.id, t);
    }
    setEditing(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") commitEdit();
    if (e.key === "Escape") {
      setEditing(false);
      setDraft(todo.text);
    }
  };

  return (
    <li className={`item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label="完成狀態"
      />

      {editing ? (
        <input
          className="inline-edit"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={onKeyDown}
          autoFocus
        />
      ) : (
        <span className="text">{todo.text}</span>
      )}

      <button className="icon-btn" title="編輯" onClick={startEdit} aria-label="編輯">
        ✏️
      </button>
      <button
        className="icon-btn delete"
        title="刪除"
        onClick={() => onDelete(todo.id)}
        aria-label="刪除"
      >
        🗑️
      </button>
    </li>
  );
}

export default TodoItem;
