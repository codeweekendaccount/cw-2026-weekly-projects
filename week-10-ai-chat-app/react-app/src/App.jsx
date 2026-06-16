import { useEffect, useMemo, useRef, useState } from "react";
import OpenAI from "openai";
import { Loader2, Pause, Send } from "lucide-react";

const DEFAULT_PROMPT = "You are a helpful assistant.";
const OPEN_AI_KEY = import.meta.env.VITE_OPENAI_KEY;
const AI_URL = import.meta.env.VITE_API_URL;

function App() {
  const [messages, setMessages] = useState([
    { role: "system", content: DEFAULT_PROMPT },
    { role: "assistant", content: "Hello! Ask me anything." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const msgContainerRef = useRef();

  useEffect(() => {
    if (msgContainerRef.current) {
      msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const openai = useMemo(() => {
    return new OpenAI({
      apiKey: OPEN_AI_KEY,
      baseURL: AI_URL,
      dangerouslyAllowBrowser: true,
    });
  }, []);

  const visibleMessages = messages.filter(
    (message) => message.role !== "system",
  );

  async function handleSubmit(event) {
    event.preventDefault();
    const content = input.trim();
    if (!content || !openai) return;

    const nextMessages = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const response = await openai.chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages: nextMessages,
      });

      const assistantContent =
        response.choices?.[0]?.message?.content ||
        "Sorry, no response received.";
      setMessages([
        ...nextMessages,
        { role: "assistant", content: assistantContent },
      ]);
    } catch (err) {
      console.error(err);
      setError(
        "OpenAI request failed. Confirm your key and network connectivity.",
      );
    } finally {
      setLoading(false);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="max-w-[960px] w-full md:w-[800px] mx-auto pt-8 px-5 pb-12 flex flex-col gap-5 font-sans">
      <header className="text-left flex justify-between items-end gap-5">
        <div>
          <h1 className="m-0 text-3xl md:text-4xl text-gray-900 dark:text-gray-100 font-medium tracking-tight">CodeWeekendAI Chat</h1>
          <p className="mt-2 max-w-[650px] text-gray-500 dark:text-gray-400 m-0">Ask your coding questions to the CodeWeekendAI.</p>
        </div>
      </header>

      <main className="flex flex-col gap-[18px] border border-gray-200 dark:border-gray-800 rounded-3xl bg-gray-50 dark:bg-[#1f2028] p-6 h-[80vh] min-h-[460px]">
        <div className="flex flex-col gap-[14px] flex-1 overflow-y-auto pr-1" ref={msgContainerRef}>
          {visibleMessages.map((message, index) => (
            <div key={index} className={`rounded-[20px] py-4 px-[18px] text-left border shadow-sm ${message.role === 'user' ? 'self-end bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800/50' : 'self-start bg-white dark:bg-[#16171d] border-transparent dark:border-gray-800'}`}>
              <div className="text-xs mb-2.5 uppercase tracking-widest text-gray-500 dark:text-gray-400">
                {message.role === "user" ? "You" : "Assistant"}
              </div>
              <div className="whitespace-pre-wrap leading-[1.7] text-gray-900 dark:text-gray-100">{message.content}</div>
            </div>
          ))}

          {loading && (
            <div className="rounded-[20px] py-4 px-[18px] text-left border shadow-sm self-start bg-white dark:bg-[#16171d] border-transparent dark:border-gray-800 text-gray-400">
              <div className="text-xs mb-2.5 uppercase tracking-widest text-gray-500 dark:text-gray-400">Assistant</div>
              <div className="whitespace-pre-wrap leading-[1.7] flex items-center gap-2 text-gray-400">
                <Loader2 className="animate-spin" /> AI is generating response...
              </div>
            </div>
          )}
        </div>

        <form className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-end" onSubmit={handleSubmit}>
          <textarea
            className="w-full md:w-auto min-h-[90px] resize-y py-[14px] px-4 border border-gray-200 dark:border-gray-800 rounded-[18px] bg-gray-50 dark:bg-[#1f2028] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            disabled={loading}
            rows={3}
          />
          <button 
            className="border-none rounded-[18px] bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition-colors text-white py-4 px-6 font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            type="submit" 
            disabled={loading || !input.trim()}
          >
            {loading ? <Pause /> : <Send />}
          </button>
        </form>

        {error && <div className="text-red-600 dark:text-red-400 text-sm text-left">{error}</div>}
      </main>
    </div>
  );
}

export default App;
