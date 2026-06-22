import { openai } from "./config";
import { generateEmbedding } from "./embeddings";
import { searchSimilar } from "./vectorDB";

const SYSTEM_PROMPT = `
    You are SmartClinic's virtual front desk assistant.
    Answer only using the provided clinic context.
    If the context does not contain the answer, say you don't have that information and suggest calling the clinic.
    Never provide medical diagnoses or emergency advice.
    Always provide response in plain text (no markdown).
`;

export async function sendRagMessage(userMessage, history = []) {
  const queryEmbedding = await generateEmbedding(userMessage);
  const contextChunks = await searchSimilar(queryEmbedding, 5);

  const context = contextChunks.map((ch) => ch.content).join("\n\n");

  const res = await openai.chat.completions.create({
    model: import.meta.env.VITE_AI_CHAT_MODEL,
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      ...history,
      {
        role: "user",
        content: `Context: ${context} Question: ${userMessage}`,
      },
    ],
  });

  return res.choices[0].message.content;
}
