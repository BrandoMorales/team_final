# 📌 Team Final – Aplicación de Gestión de Tareas

## 📖 Descripción del Proyecto

**Team Final** es una aplicación web desarrollada con **React + Vite** que permite la gestión de tareas mediante un sistema CRUD (Crear, Leer, Actualizar y Eliminar). Incluye funcionalidades de **autenticación (Login y Registro)**, búsqueda y filtrado de tareas, y consumo de una **API REST** configurada mediante variables de entorno.

El proyecto está diseñado siguiendo buenas prácticas de desarrollo frontend moderno y puede ejecutarse tanto en entorno local como en producción.

---

## 🚀 Tecnologías Utilizadas

* **React** – Librería para la construcción de interfaces de usuario
* **Vite** – Herramienta de desarrollo y bundling
* **JavaScript (ES6+)**
* **CSS** – Estilos personalizados
* **JSON Server / API REST** – Backend simulado o API externa
* **Variables de Entorno (.env)**

---

## 📂 Estructura del Proyecto

```bash
team-final/
├── public/                 # Archivos públicos
├── src/
│   ├── componentes/        # Componentes reutilizables
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── CreateTask.jsx
│   │   ├── SearchFilter.jsx
│   │   └── TodoList.jsx
│   ├── App.jsx             # Componente principal
│   ├── main.jsx            # Punto de entrada
│   └── index.css           # Estilos globales
├── .env                    # Variables de entorno
├── package.json            # Dependencias y scripts
├── vite.config.js          # Configuración de Vite
└── README.md               # Documentación del proyecto
```

---

## ⚙️ Variables de Entorno

El proyecto utiliza variables de entorno para definir la URL de la API.

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000
```

En producción, esta variable debe apuntar a la URL del backend desplegado.

---

## 🛠️ Instalación del Proyecto

1. Clona el repositorio:

```bash
git clone <url-del-repositorio>
```

2. Accede al directorio del proyecto:

```bash
cd team-final
```

3. Instala las dependencias:

```bash
npm install
```

---

## ▶️ Ejecución en Desarrollo

Para iniciar el proyecto en modo desarrollo:

```bash
npm run dev
```

Luego abre el navegador en:

```
http://localhost:5173
```

---

## 🔌 Backend / API

El frontend consume una API REST que puede ser:

* **JSON Server** usando un archivo `db.json`
* Una **API externa** desplegada (por ejemplo en Render)

Ejemplo para iniciar JSON Server:

```bash
json-server --watch db.json --port 3000
```

---

## 🌐 Despliegue en Producción

El proyecto puede desplegarse en plataformas como:

* **Vercel**
* **Netlify**
* **Render**
* **Docker**

Pasos generales:

1. Configurar la variable `VITE_API_URL` en la plataforma de despliegue
2. Ejecutar el build:

```bash
npm run build
```

3. Desplegar la carpeta `dist/`

---

## 📜 Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Genera el build de producción
npm run preview  # Previsualiza el build
```

---

## 🔐 Política de Privacidad y Uso del Proyecto

Este proyecto ha sido desarrollado **exclusivamente con fines educativos y académicos**.

### 📌 Condiciones de Uso

* El código puede ser **clonado, reutilizado y modificado** únicamente para:

  * Prácticas educativas
  * Aprendizaje personal
  * Proyectos académicos

* **No está permitido** el uso comercial del proyecto ni de partes del mismo sin autorización expresa del autor.

* Cualquier persona que clone este repositorio **es responsable de las modificaciones que realice**, así como del uso que le dé al software.

### 🛡️ Privacidad de Datos

* Este proyecto **no almacena datos personales reales**.
* La información utilizada en el sistema (usuarios, tareas, credenciales) es **simulada o de prueba**.
* No se recopila, vende ni comparte información personal con terceros.

Al clonar o utilizar este proyecto, aceptas estas condiciones.

---

## 👨‍💻 Autor

Proyecto desarrollado por **Brandon Felipe Morales Herrera** como parte de un proyecto final de desarrollo web.

---

## ✅ Estado del Proyecto

✔ Funcional
✔ Estructura modular
✔ Listo para despliegue

---

📌 *Este proyecto es de uso académico y educativo.*
