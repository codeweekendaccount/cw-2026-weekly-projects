# Week 07: Notes App

A React notes app for creating, searching, displaying, deleting, and persisting notes in the browser.

## Tech Used

- React 19
- Vite
- Tailwind CSS 4
- lucide-react
- `localStorage`
- ESLint

## Project Structure

```text
week-07-notes-app/
|-- public/
|   |-- favicon.svg
|   `-- icons.svg
|-- src/
|   |-- assets/
|   |   |-- empty_state.png
|   |   `-- hero.png
|   |-- components/
|   |   |-- EmptyState.jsx
|   |   |-- Header.jsx
|   |   |-- NoteCard.jsx
|   |   |-- NoteForm.jsx
|   |   |-- NotesList.jsx
|   |   `-- StatsBar.jsx
|   |-- utils/
|   |   `-- storage.js
|   |-- App.jsx
|   |-- index.css
|   `-- main.jsx
|-- index.html
|-- package.json
|-- vite.config.js
|-- eslint.config.js
`-- README.md
```

## Main Files

- `src/App.jsx`: Owns notes state, search term, filtered notes, notes-created-today count, and localStorage save effect.
- `src/utils/storage.js`: Loads notes from `localStorage` and saves updated notes.
- `src/components/Header.jsx`: Top section and search input.
- `src/components/StatsBar.jsx`: Displays total notes and notes created today.
- `src/components/NoteForm.jsx`: Controlled form for adding notes with validation.
- `src/components/NotesList.jsx`: Renders the list of note cards.
- `src/components/NoteCard.jsx`: Displays a single note and delete action.
- `src/components/EmptyState.jsx`: Empty result view.

## Features

- Add notes with title and content.
- Validate that title and content are both provided.
- Search notes by title or content.
- Delete notes.
- Save notes to `localStorage` after changes.
- Load saved notes when the app starts.
- Show total notes and notes created today.
- Responsive Tailwind-based UI.

## How to Run

```bash
npm install
npm run dev
```

Open the local URL shown in your terminal.

## Available Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```
