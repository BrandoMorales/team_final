import React, { useState, useEffect } from 'react'
import Login from './componentes/Login'
import Register from './componentes/Register'
import CreateTask from './componentes/CreateTask'
import SearchFilter from './componentes/SearchFilter'
import TodoList from './componentes/TodoList'
import "../src/index.css";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function App() { // eslint-disable-line
  const [user, setUser] = useState(null)
  const [showRegister, setShowRegister] = useState(false)
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [filterAuthor, setFilterAuthor] = useState('')

  useEffect(() => {
    // Cargar tareas iniciales desde la API
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${API_URL}/tasks?_sort=createdAt&_order=desc`)
        if (!response.ok) throw new Error('Error al cargar tareas')
        const data = await response.json()
        setTasks(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchTasks()
  }, [])

  async function handleLogin(credentials) {
    try {
      const response = await fetch(`${API_URL}/users?name=${credentials.name}&password=${credentials.password}`)
      const data = await response.json()
      if (data.length > 0) {
        setUser(data[0])
      } else {
        alert('Usuario o contraseña incorrectos.')
      }
    } catch (error) {
      console.error('Error en el login:', error)
      alert('No se pudo conectar con el servidor.')
    }
  }

  async function handleRegister(credentials) {
    try {
      // Verificar si el usuario ya existe
      const checkResponse = await fetch(`${API_URL}/users?name=${credentials.name}`)
      const existingUsers = await checkResponse.json()
      if (existingUsers.length > 0) {
        alert('El nombre de usuario ya está en uso.')
        return
      }

      // Crear nuevo usuario
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })
      const newUser = await response.json()
      setUser(newUser)
      setShowRegister(false)
    } catch (error) {
      console.error('Error en el registro:', error)
      alert('No se pudo registrar el usuario.')
    }
  }

  async function handleAdd(taskText) {
    if (!user) return
    const newTask = {
      author: user.name,
      text: taskText,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    })
    const addedTask = await response.json()
    setTasks(prev => [addedTask, ...prev])
  }

  async function handleToggle(id) {
    const taskToToggle = tasks.find(t => t.id === id)
    if (!taskToToggle) return

    const updatedTask = { ...taskToToggle, completed: !taskToToggle.completed }

    await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask)
    })
    setTasks(prev => prev.map(t => (t.id === id ? updatedTask : t)))
  }

  async function handleDelete(id) {
    await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' })
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  async function handleEdit(id, newText) {
    const taskToEdit = tasks.find(t => t.id === id)
    if (!taskToEdit) return

    const updatedTask = { ...taskToEdit, text: newText }
    await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask)
    })
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, text: newText } : t)));
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
          {showRegister ? (
            <Register 
              onRegister={handleRegister}
              onBack={() => setShowRegister(false)}
            />
          ) : (
            <Login onLogin={handleLogin} onShowRegister={() => setShowRegister(true)} />
          )}
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
                onEdit={handleEdit}
              />
            )}
          </div>
        </>
      )}

      <footer className="app-footer">
        Proyecto Team To-Do — Conectado a un Backend Simulado
      </footer>
    </div>
  )
}

export default App
