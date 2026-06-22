import { useState } from "react";
import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";
import { sendRagMessage } from "../services/ragService";

const SYSTEM_PROMPT = `
    You are SmartClinic's virtual front desk assistant.
    Answer only using the provided clinic context.
    If the context does not contain the answer, say you don't have that information and suggest calling the clinic.
    Never provide medical diagnoses or emergency advice.
    Always provide response in plain text (no markdown).
`;

const WELCOME_MESSAGE = {
  role: "assistant",
  content:
    "Hello! I'm SmartClinic's virtual assistant. Ask me about our services, doctors, hours, or policies — I'm here to help.",
  timestamp: new Date().toISOString(),
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: SYSTEM_PROMPT,
    },
    WELCOME_MESSAGE,
  ]);

  async function handleSend(text) {
    const userMessage = {
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue("");
    setError(null);

    setIsLoading(true);
    try {
      const reply = await sendRagMessage(text, updatedMessages);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: reply,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to fetch clinic information. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-1000 flex flex-col items-end gap-4 max-sm:bottom-4 max-sm:left-4 max-sm:right-4 max-sm:items-stretch">
      <div
        className={`transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] max-sm:w-full ${
          isOpen
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0"
        }`}
      >
        {isOpen && (
          <ChatWindow
            messages={messages}
            inputValue={inputValue}
            onInputChange={setInputValue}
            onSend={handleSend}
            onClose={() => setIsOpen(false)}
            isLoading={isLoading}
            error={error}
            onClearError={() => setError(null)}
          />
        )}
      </div>

      <ChatButton isOpen={isOpen} onClick={() => setIsOpen((open) => !open)} />
    </div>
  );
}
