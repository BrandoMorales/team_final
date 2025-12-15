import { useState } from "react";

export default function TodoItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  function handleEditSave() {
    if (editText.trim() === "") return;
    onEdit(task.id, editText.trim());
    setEditing(false);
  }

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <div className="todo-content">
        <div className="todo-author">{task.author}</div>
        {editing ? (
          <input
            className="todo-edit-input"
            value={editText}
            onChange={e => setEditText(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleEditSave(); }}
            autoFocus
          />
        ) : (
          <div className={`todo-text ${task.completed ? "todo-completed" : ""}`}>
            {task.text}
          </div>
        )}
        <div className="todo-date">
          {new Date(task.createdAt).toLocaleString()}
        </div>
      </div>
      {editing ? (
        <>
          <button className="todo-save" onClick={handleEditSave}>Guardar</button>
          <button className="todo-cancel" onClick={() => { setEditing(false); setEditText(task.text); }}>Cancelar</button>
        </>
      ) : (
        <>
          <button className="todo-edit" onClick={() => setEditing(true)}>✏️</button>
          <button className="todo-delete" onClick={() => onDelete(task.id)}>🗑</button>
        </>
      )}
    </div>
  );
}
