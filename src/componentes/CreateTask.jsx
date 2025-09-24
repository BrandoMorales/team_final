import { useState } from 'react'

export default function CreateTask({ onAdd }) {
  const [text, setText] = useState('')

  function submit(e) {
    e.preventDefault()
    const t = text.trim()
    if (!t) return
    onAdd(t)
    setText('')
  }

  return (
    <form onSubmit={submit} className="create-task">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="✍️ Describe la tarea..."
      />
      <button type="submit">➕ Agregar</button>
    </form>
  )
}
