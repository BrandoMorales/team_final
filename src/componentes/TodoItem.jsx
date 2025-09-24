export default function TodoItem({ task, onToggle, onDelete }) {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <div className="todo-content">
        <div className="todo-author">{task.author}</div>
        <div className={`todo-text ${task.completed ? "todo-completed" : ""}`}>
          {task.text}
        </div>
        <div className="todo-date">
          {new Date(task.createdAt).toLocaleString()}
        </div>
      </div>
      <button className="todo-delete" onClick={() => onDelete(task.id)}>
        🗑
      </button>
    </div>
  )
}
