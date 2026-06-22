import { useCallback, useEffect, useState } from "react";
import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";

const STORAGE_KEY = "smartclinic_chat_session";

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "assistant",
  content:
    "Hello! I'm SmartClinic's virtual assistant. Ask me about our services, doctors, hours, or policies — I'm here to help.",
  timestamp: new Date().toISOString(),
};

function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { isOpen: false, messages: [WELCOME_MESSAGE] };
    const parsed = JSON.parse(raw);
    return {
      isOpen: Boolean(parsed.isOpen),
      messages:
        Array.isArray(parsed.messages) && parsed.messages.length > 0
          ? parsed.messages
          : [WELCOME_MESSAGE],
    };
  } catch {
    return { isOpen: false, messages: [WELCOME_MESSAGE] };
  }
}

export default function ChatWidget({ onSendMessage }) {
  const initial = loadSession();
  const [isOpen, setIsOpen] = useState(initial.isOpen);
  const [messages, setMessages] = useState(initial.messages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ isOpen, messages })
    );
  }, [isOpen, messages]);

  const handleSend = useCallback(
    async (text) => {
      const userMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: text,
        timestamp: new Date().toISOString(),
      };

      const updatedHistory = [...messages, userMessage];
      setMessages(updatedHistory);
      setInputValue("");
      setError(null);

      if (!onSendMessage) return;

      setIsLoading(true);
      try {
        const reply = await onSendMessage(text, updatedHistory);
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
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
    },
    [messages, onSendMessage]
  );

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

      <ChatButton
        isOpen={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      />
    </div>
  );
}
