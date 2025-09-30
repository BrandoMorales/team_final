
import React, { useState } from "react";

export default function Login({ onLogin, onShowRegister }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");


  function submit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || !password) return alert("Escribe usuario y contraseña");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.name === trimmed && u.password === password);
    if (!user) return alert("Usuario o contraseña incorrectos");
    onLogin({ name: trimmed });
  }


  return (
    <div className="login-box">
      <h2>Iniciar sesión</h2>
      <form onSubmit={submit} className="login-form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre de usuario"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <button>Entrar</button>
      </form>
      <button className="register-link" onClick={onShowRegister}>
        ¿No tienes cuenta? Regístrate aquí
      </button>
    </div>
  );
}
