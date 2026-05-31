# Week 08: Recipe Explorer

A React recipe search app that uses TheMealDB API. Users can search recipes, view recipe cards, and save favorite meals locally in the browser.

## Tech Used

- React 19
- Vite
- Tailwind CSS 4
- lucide-react
- Fetch API
- TheMealDB API
- `localStorage`
- ESLint

## Project Structure

```text
week-08-recipe-explorer/
|-- public/
|   |-- favicon.svg
|   `-- icons.svg
|-- src/
|   |-- assets/
|   |   `-- hero.png
|   |-- components/
|   |   |-- Navbar.jsx
|   |   |-- RecipeCard.jsx
|   |   `-- SearchBar.jsx
|   |-- pages/
|   |   |-- Favorites.jsx
|   |   `-- Home.jsx
|   |-- services/
|   |   `-- mealApi.js
|   |-- App.css
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

- `src/App.jsx`: App-level page state, favorites state, localStorage persistence, and navigation between Home and Favorites.
- `src/pages/Home.jsx`: Search page, default chicken search, loading state, recipe fetching, and recipe grid rendering.
- `src/pages/Favorites.jsx`: Saved recipes page.
- `src/services/mealApi.js`: API helpers for searching recipes and looking up a recipe by ID from TheMealDB.
- `src/components/Navbar.jsx`: Top navigation with Home and Favorites buttons.
- `src/components/SearchBar.jsx`: Recipe search input.
- `src/components/RecipeCard.jsx`: Recipe image, category, area, favorite button, and card actions.
- `src/App.css` and `src/index.css`: App and Tailwind styling.

## Features

- Search recipes using TheMealDB search endpoint.
- Loads an initial search for `chicken`.
- Shows loading and empty states.
- Displays recipe cards with image, name, category, and area.
- Add and remove favorites.
- Persist favorites in `localStorage`.
- Navigate between Home and Favorites using local React state.

## How to Run

```bash
npm install
npm run dev
```

Open the local URL shown in your terminal.

This project uses the public TheMealDB API, so recipe search requires an internet connection.

## Available Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```
