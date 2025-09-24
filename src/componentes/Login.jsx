import { useState } from "react";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");

  function submit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return alert("Escribe un nombre de usuario (ej: Alice o Bob)");
    onLogin({ name: trimmed });
  }

  function quick(user) {
    onLogin({ name: user });
  }

  return (
    <div className="login-box">
      <h2>Iniciar sesión</h2>
      <p>Selecciona uno de los usuarios rápidos o escribe tu nombre.</p>

      <div className="login-buttons">
        <button onClick={() => quick("Alice")}>Alice</button>
        <button onClick={() => quick("Bob")}>Bob</button>
      </div>

      <form onSubmit={submit} className="login-form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre"
        />
        <button>Entrar</button>
      </form>

      <p className="login-note">
        Nota: este login es simple para el ejercicio — no hay autenticación real.
      </p>
    </div>
  );
}
