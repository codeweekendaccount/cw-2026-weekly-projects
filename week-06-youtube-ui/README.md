# Week 06: YouTube UI

A YouTube-style video feed built with React, Vite, Tailwind CSS, and React Icons. The app uses local mock data for videos, shorts, categories, and sidebar items.

## Tech Used

- React 19
- Vite
- Tailwind CSS 4
- React Icons
- ESLint

## Project Structure

```text
week-06-youtube-ui/
|-- public/
|   |-- favicon.svg
|   `-- icons.svg
|-- src/
|   |-- assets/
|   |-- components/
|   |   |-- category-bar.jsx
|   |   |-- navbar.jsx
|   |   |-- short-card.jsx
|   |   |-- shorts-section.jsx
|   |   |-- sidebar-item.jsx
|   |   |-- sidebar.jsx
|   |   `-- video-card.jsx
|   |-- App.jsx
|   |-- data.js
|   |-- index.css
|   `-- main.jsx
|-- index.html
|-- package.json
|-- vite.config.js
|-- eslint.config.js
`-- README.md
```

## Main Files

- `src/App.jsx`: Main app layout, selected category state, search state, and filtered video rendering.
- `src/data.js`: Mock categories, videos, shorts, sidebar items, and user menu items.
- `src/components/navbar.jsx`: Top navigation bar with menu, YouTube brand, search form, mic button, action icons, and avatar.
- `src/components/sidebar.jsx`: Sidebar sections built from mock data and React Icons.
- `src/components/category-bar.jsx`: Horizontal category filter buttons.
- `src/components/video-card.jsx`: Video card UI for thumbnails, metadata, duration, and channel info.
- `src/components/shorts-section.jsx`: Shorts row shown on the All category.
- `src/index.css`: Tailwind import and global styling.

## Features

- YouTube-inspired app shell with sticky top navbar and desktop sidebar.
- Search by video title or channel name.
- Category filtering from the horizontal category bar.
- Responsive video grid.
- Shorts section rendered only on the All category.
- Empty search state with a reset filters button.
- Mock data stored locally in `src/data.js`.

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
