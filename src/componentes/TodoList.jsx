import TodoItem from "./TodoItem"

export default function TodoList({ tasks, onToggle, onDelete }) {
  return (
    <div className="todo-list">
      {tasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
