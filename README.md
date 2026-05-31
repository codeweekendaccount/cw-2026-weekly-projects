# CodeWeekend 2026 Weekly Projects

This repository contains the weekly frontend projects built during the CodeWeekend bootcamp. Each project has its own folder and README with the technologies used, file structure, and run instructions.

## Projects

| Week | Project | Tech |
| --- | --- | --- |
| 01 | [Google Landing Page](week-01-google-landing-page/) | HTML, CSS, Font Awesome CDN |
| 02 | [Ecommerce Product Page](week-02-ecommerce-product-page/) | HTML, CSS, local image assets |
| 03 | [Number Guessing Game](week-03-number-gussing-game/) | HTML, JavaScript |
| 04 | [Interactive Ecommerce Product Page](week-04-interactive-ecommerce-product-page/) | HTML, CSS, JavaScript |
| 05 | [AI Prompts Library](week-05-ai-prompts-library/) | HTML, CSS, JavaScript modules, localStorage |
| 06 | [YouTube UI](week-06-youtube-ui/) | React, Vite, Tailwind CSS, React Icons |
| 07 | [Notes App](week-07-notes-app/) | React, Vite, Tailwind CSS, lucide-react, localStorage |
| 08 | [Recipe Explorer](week-08-recipe-explorer/) | React, Vite, Tailwind CSS, lucide-react, TheMealDB API |

There are also session practice folders, such as `week-04-session-dom-and-events/` and `week-05-session-async-and-web-apis/`, used for smaller class exercises.

## How to Run Projects

### Static HTML projects

Weeks 1-5 can be opened directly in the browser:

1. Open the project folder.
2. Open `index.html` in your browser.
3. For a smoother workflow, use the VS Code Live Server extension.

Week 5 uses JavaScript modules and fetches local data, so Live Server or another local server is recommended.

### Vite React projects

Weeks 6-8 use Vite:

```bash
cd week-06-youtube-ui
npm install
npm run dev
```

Use the same commands inside `week-07-notes-app` or `week-08-recipe-explorer` when working on those projects.

## Common Commands

For Vite projects:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Notes

- Keep each week's work inside its own folder.
- Read the project README before editing a project.
- Do not delete asset folders; many pages depend on local images and icons.
- If a Vite project does not start, run `npm install` inside that specific project folder.
