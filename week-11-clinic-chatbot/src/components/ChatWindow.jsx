import { useEffect, useRef } from "react";
import { Cross, X } from "lucide-react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import LoadingIndicator from "./LoadingIndicator";

export default function ChatWindow({
  messages,
  inputValue,
  onInputChange,
  onSend,
  onClose,
  isLoading = false,
  loadingMessage = "Searching clinic knowledge…",
  error = null,
  onClearError,
}) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, error]);

  return (
    <div
      role="dialog"
      aria-label="SmartClinic AI Assistant"
      className="flex h-[520px] max-h-[calc(100vh-120px)] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-teal-600/20"
    >
      <header className="flex items-center justify-between bg-linear-to-br from-teal-600 to-teal-400 px-5 py-4 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
            <Cross className="h-4 w-4" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-base font-semibold">Clinic Assistant</h2>
            <p className="flex items-center gap-1.5 text-xs opacity-90">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
              Online — ask about our services
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 transition-colors hover:bg-white/25"
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto bg-slate-50 p-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {isLoading && <LoadingIndicator message={loadingMessage} />}

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            <p>{error}</p>
            {onClearError && (
              <button
                type="button"
                onClick={onClearError}
                className="mt-2 text-xs font-semibold underline"
              >
                Dismiss
              </button>
            )}
          </div>
        )}
        <div ref={messagesEndRef} aria-hidden="true" />
      </div>

      <footer className="border-t border-slate-200 bg-white px-4 pb-3 pt-3">
        <ChatInput
          value={inputValue}
          onChange={onInputChange}
          onSend={onSend}
          disabled={isLoading}
        />
        <p className="mt-2 text-center text-[11px] text-slate-400">
          General information only. Not a substitute for professional medical
          advice.
        </p>
      </footer>
    </div>
  );
}
