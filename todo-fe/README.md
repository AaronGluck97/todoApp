# Todo App Frontend

A modern React + TypeScript + Vite frontend for a Todo application.

## Features

- Add, complete, and delete todos (via backend API)
- Mark todos as completed with a checkbox (syncs with backend)
- Responsive, modern UI styled with modular Sass (SCSS)
- All API logic is separated into a `services` directory for maintainability
- TypeScript throughout for type safety
- Clean, modular React component structure
- Fast development with Vite

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the frontend dev server:
   ```bash
   npm run dev
   ```

> **Note:** This frontend expects the backend API to be running at `http://localhost:3001`.

## Project Structure

- `src/components/` — All React components, each in its own folder with co-located styles
- `src/services/` — API logic for backend communication
- `src/styles.scss` — Global Sass variables and base styles

---

Enjoy your productive todo app frontend!
