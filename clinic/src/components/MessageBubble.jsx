import { Cross } from "lucide-react";

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex max-w-[88%] gap-2 ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
    >
      {!isUser && (
        <div
          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-teal-100 text-teal-600"
          aria-hidden="true"
        >
          <Cross className="h-3.5 w-3.5" strokeWidth={2.5} />
        </div>
      )}
      <div
        className={`rounded-xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "rounded-br-sm bg-teal-600 text-white"
            : "rounded-bl-sm border border-slate-200 bg-white text-slate-800"
        }`}
      >
        <p>{message.content}</p>
        {message.timestamp && (
          <time
            className="mt-1 block text-[11px] opacity-65"
            dateTime={message.timestamp}
          >
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </time>
        )}
      </div>
    </div>
  );
}
