# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# 📝 App de Tareas tipo Trello

Aplicación web fullstack para gestionar tareas con autenticación JWT, múltiples estados de tarea, edición, eliminación y filtrado por usuario.

## 🚀 Tecnologías utilizadas

### Frontend
- React + Vite
- Tailwind CSS
- Axios
- Lucide React Icons
- Framer Motion

### Backend
- Node.js + Express
- MySQL
- JWT
- bcrypt
- dotenv
- cors

## 📁 Estructura del proyecto

```
tareas-trello/
├── tareas-frontend/     → React + Tailwind (cliente)
├── tareas-backend/      → Node.js + Express (API REST)
└── database.sql         → Script para crear tablas
```

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/alan090986/app-task.git
cd app-task
```

### 2. Backend

```bash
cd tareas-backend
npm install
cp .env.example .env
# Configura tus variables (DB, JWT_SECRET)
npm run dev
```

### 3. Frontend

```bash
cd ../tareas-frontend
npm install
npm run dev
```

## 📋 Variables de entorno (.env)

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=tareas
JWT_SECRET=supersecreto
```

## 🧩 Base de datos

```sql
CREATE DATABASE tareas;

USE tareas;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE task_status (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  name VARCHAR(100),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(255),
  description TEXT,
  status_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (status_id) REFERENCES task_status(id)
);
```

## ✅ Funcionalidades

- Registro e inicio de sesión con JWT
- Crear, editar y eliminar tareas
- Asignar estado a cada tarea (Ej: *Pendiente*, *En proceso*, *Completado*)
- Todas las acciones están protegidas por token
- UI moderna, limpia y responsive

## 📄 Licencia

MIT

---

> Desarrollado por Alan Villegas – [github.com/alan090986](https://github.com/alan090986)
