import { useState } from "react";
import "../styles/Register.css";

export default function Register({ onRegister, onBack }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName || !password) {
      return alert("Debes ingresar usuario y contraseña");
    }
    // Guardar usuario en localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find(u => u.name === trimmedName)) {
      return alert("El usuario ya existe");
    }
    users.push({ name: trimmedName, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Usuario registrado correctamente");
    onRegister({ name: trimmedName });
  }

  return (
    <div className="register-box">
  <h2>Registro de usuario</h2>
  <p>Por favor ingresa tu nombre y contraseña para crear tu cuenta.</p>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Nombre de usuario"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <button>Registrar</button>
      </form>
      <button className="register-link" onClick={onBack}>
        Volver
      </button>
    </div>
  );
}
