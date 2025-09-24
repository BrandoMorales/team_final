import React, { useState, useEffect } from 'react'
import Login from './componentes/Login'
import CreateTask from './componentes/CreateTask'
import SearchFilter from './componentes/SearchFilter'
import TodoList from './componentes/TodoList'
import "../src/index.css";

const STORAGE_KEY = 'team-todo-tasks-v1'

function App() {
  const [user, setUser] = useState(null)
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [filterAuthor, setFilterAuthor] = useState('')

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        setTasks(JSON.parse(raw))
      } catch (e) {
        console.error('JSON parse error', e)
      }
    }
    const t = setTimeout(() => setLoading(false), 350)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  function handleAdd(taskText) {
    if (!user) return
    const newTask = {
      id: Date.now().toString(),
      author: user.name,
      text: taskText,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTasks(prev => [newTask, ...prev])
  }

  function handleToggle(id) {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  function handleDelete(id) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  function handleLogout() {
    setUser(null)
  }

  const authors = Array.from(new Set(tasks.map(t => t.author)))

  const filtered = tasks.filter(t => {
    const q = query.trim().toLowerCase()
    const matchesQuery =
      q === '' ||
      t.text.toLowerCase().includes(q) ||
      t.author.toLowerCase().includes(q)
    const matchesAuthor = filterAuthor === '' || t.author === filterAuthor
    return matchesQuery && matchesAuthor
  })

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">🌟 Team To-Do</h1>
        {user && (
          <div className="app-user">
            <span>Usuario: <strong>{user.name}</strong></span>
            <button className="logout-button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        )}
      </header>

      {!user ? (
        <div className="app-card">
          <Login onLogin={setUser} />
        </div>
      ) : (
        <>
          <div className="app-card">
            <CreateTask onAdd={handleAdd} />
          </div>

          <div className="app-card">
            <SearchFilter
              query={query}
              onQueryChange={setQuery}
              authors={authors}
              filterAuthor={filterAuthor}
              onFilterAuthor={setFilterAuthor}
            />
          </div>

          <div className="app-card">
            {loading ? (
              <div className="status-message">Cargando tareas...</div>
            ) : filtered.length === 0 ? (
              <div className="status-message">No hay tareas que coincidan.</div>
            ) : (
              <TodoList
                tasks={filtered}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            )}
          </div>
        </>
      )}

      <footer className="app-footer">
        Proyecto Team To-Do — Guardado en localStorage
      </footer>
    </div>
  )
}

export default App
