export default function LoadingIndicator({ message = "Thinking…" }) {
  return (
    <div className="flex items-center gap-3 self-start py-2" role="status" aria-live="polite">
      <div className="flex gap-1" aria-hidden="true">
        <span className="h-1.5 w-1.5 rounded-full bg-teal-600 animate-chat-bounce [animation-delay:-0.32s]" />
        <span className="h-1.5 w-1.5 rounded-full bg-teal-600 animate-chat-bounce [animation-delay:-0.16s]" />
        <span className="h-1.5 w-1.5 rounded-full bg-teal-600 animate-chat-bounce" />
      </div>
      <span className="text-sm text-slate-500">{message}</span>
    </div>
  );
}
