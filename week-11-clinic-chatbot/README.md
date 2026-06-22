# SmartClinic AI Chatbot

A React frontend for a RAG-powered clinic assistant. Includes a full clinic landing page, knowledge upload UI, 404 page, and a floating chat widget — **UI only**; AI/RAG logic is left for you to wire up.

## Tech Stack

- **React 19** + Vite
- **Tailwind CSS v4** — utility-first styling
- **Lucide React** — icons throughout the UI
- **React Router** — page routing

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Clinic landing page (hero, services, doctors, contact) + floating chat widget |
| `/upload` | Upload clinic knowledge for RAG ingestion |
| `*` | 404 not found page |

## Project Structure

```
src/
├── pages/
│   ├── LandingPage.jsx
│   ├── UploadPage.jsx
│   └── NotFoundPage.jsx
├── components/
│   ├── ChatWidget.jsx      # Main widget — wire AI here
│   ├── ChatButton.jsx
│   ├── ChatWindow.jsx
│   ├── MessageBubble.jsx
│   ├── ChatInput.jsx
│   ├── LoadingIndicator.jsx
│   └── layout/
│       ├── Navbar.jsx
│       └── Footer.jsx
├── services/
│   ├── embeddings.js       # Stub — connect embedding API
│   ├── vectorDB.js           # Stub — connect vector database
│   └── ragService.js         # Stub — connect LLM + RAG pipeline
├── data/
│   └── clinicKnowledgeBase.js
├── App.jsx
└── main.jsx
```

## Wiring Up AI

### 1. Chat responses

Pass `onSendMessage` to `ChatWidget` in `App.jsx`:

```jsx
import { sendRagMessage } from "./services/ragService";

<ChatWidget
  onSendMessage={async (message, history) => {
    return await sendRagMessage(message, history);
  }}
/>
```

Without `onSendMessage`, the chat UI still works — user messages appear, but no AI replies are generated.

### 2. RAG pipeline

Implement the stubs in:

- `src/services/embeddings.js` — generate vectors
- `src/services/vectorDB.js` — store & search vectors
- `src/services/ragService.js` — retrieve context + call LLM

### 3. Knowledge upload

The upload page logs a payload to the console on submit. Connect it to your embedding/ingestion backend.

## Chat Features (UI)

- Floating bottom-right widget on all pages
- Open/close animations
- Message bubbles (user + assistant)
- Loading indicator state
- Error display with dismiss
- Session persistence via `localStorage` (`smartclinic_chat_session`)

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # ESLint
```
