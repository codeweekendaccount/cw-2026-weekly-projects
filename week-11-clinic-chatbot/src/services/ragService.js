import { openai } from "./config";
import { generateEmbedding } from "./embeddings";
import { searchSimilar } from "./vectorDB";

export async function sendRagMessage(userMessage, history = []) {
  const queryEmbedding = await generateEmbedding(userMessage);
  const contextChunks = await searchSimilar(queryEmbedding, 5);

  const context = contextChunks.map((ch) => ch.content).join("\n\n");

  const res = await openai.chat.completions.create({
    model: import.meta.env.VITE_AI_CHAT_MODEL,
    messages: [
      ...history,
      {
        role: "user",
        content: `Context: ${context} Question: ${userMessage}`,
      },
    ],
  });

  return res.choices[0].message.content;
}
