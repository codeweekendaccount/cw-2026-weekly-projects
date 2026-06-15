# CodeWeekendAI Chat

A React + Vite AI chat app built with Tailwind CSS and the OpenAI client.

## What this project contains

- A chat UI built in `src/App.jsx`
- A Tailwind CSS-powered layout and styling in `src/index.css`
- Vite configuration with React and Tailwind plugins in `vite.config.js`
- OpenAI chat completion requests using `openai` in the browser
- A minimal stateful chat flow with user messages, assistant replies, loading state, and error handling

## Features

- Responsive chat interface
- Message history display with user and assistant styling
- Submit messages with the Send button or Enter key
- Scrolls automatically as new messages arrive
- Handles loading state and request errors

## Requirements

- Node.js 18+ recommended
- `npm` or `pnpm` available on your machine
- OpenAI API key and API base URL configured in environment variables

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env` file in the project root and add your own:

```env
VITE_OPENAI_KEY=your_openai_api_key
VITE_API_URL=https://api.openai.com/v1
```

3. Start the development server:

```bash
npm run dev
```

4. Open the local URL shown in the terminal (usually `http://localhost:5173`).

## Other useful commands

- `npm run build` — build the production bundle
- `npm run preview` — serve the production build locally
- `npm run lint` — run ESLint checks across the project

## Notes

- The app uses `dangerouslyAllowBrowser: true` with the OpenAI client, so keep your API key secure and avoid shipping it in a public repository.
- If you want to customize the AI assistant prompt, update `DEFAULT_PROMPT` in `src/App.jsx`.
