import { MessageSquare, X } from "lucide-react";

export default function ChatButton({ onClick, isOpen, unreadCount = 0 }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
      aria-expanded={isOpen}
      className={`relative flex h-[60px] w-[60px] items-center justify-center rounded-full text-white shadow-lg shadow-teal-600/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-teal-600/40 ${
        isOpen
          ? "bg-slate-900"
          : "bg-linear-to-br from-teal-600 to-teal-400"
      }`}
    >
      {isOpen ? (
        <X className="h-6 w-6" />
      ) : (
        <>
          <MessageSquare className="h-6 w-6" />
          {unreadCount > 0 && (
            <span
              className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-[11px] font-bold"
              aria-label={`${unreadCount} unread messages`}
            >
              {unreadCount}
            </span>
          )}
        </>
      )}
    </button>
  );
}
