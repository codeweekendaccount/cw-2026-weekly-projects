# Week 05: AI Prompts Library

A searchable AI prompt library built with vanilla JavaScript modules. Users can browse prompts, filter by category, open prompt details in a modal, copy prompt text, and save favorites in the browser.

## Tech Used

- HTML5
- CSS3
- Vanilla JavaScript ES modules
- Fetch API
- Clipboard API
- `localStorage`

## Project Structure

```text
week-05-ai-prompts-library/
|-- css/
|   `-- style.css
|-- js/
|   |-- api.js
|   |-- filters.js
|   |-- main.js
|   |-- storage.js
|   `-- ui.js
|-- index.html
`-- README.md
```

## Main Files

- `index.html`: App shell, category/view buttons, search input, prompt grid, loading/empty states, and modal markup.
- `css/style.css`: Visual styling for the prompt library, cards, buttons, modal, search, and responsive layout.
- `js/main.js`: Application state, event listeners, search/category/view coordination, modal actions, and render flow.
- `js/api.js`: Loads prompt data with `fetch()`.
- `js/filters.js`: Normalizes categories and filters prompts by search query, active category, and favorites view.
- `js/storage.js`: Loads and saves favorite prompt IDs using `localStorage`.
- `js/ui.js`: Renders prompt cards, updates counts, controls modal state, syncs favorite buttons, and handles copy feedback.

## Features

- Search prompts by title, category, or prompt content.
- Filter prompts by category.
- Switch between all prompts and saved favorites.
- Save and remove favorites locally in the browser.
- Open prompt details in a modal.
- Copy prompt text from a card or modal.
- Keyboard support for opening cards with Enter or Space.
- Escape key and overlay click to close the modal.

## How to Run

Because this project uses JavaScript modules and fetches data, run it with Live Server or another local web server.

With VS Code Live Server:

1. Open the project folder.
2. Right-click `index.html`.
3. Select "Open with Live Server".

The current JavaScript expects prompt data to be available from `data/prompts.json`.
