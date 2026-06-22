import { generateEmbedding } from "./embeddings";
import { searchSimilar } from "./vectorDB";

const SYSTEM_PROMPT = `You are SmartClinic's virtual front desk assistant.
Answer only using the provided clinic context.
If the context does not contain the answer, say you don't have that information and suggest calling the clinic.
Never provide medical diagnoses or emergency advice.`;

export async function sendRagMessage(userMessage, history = []) {
  void history;

  const queryEmbedding = await generateEmbedding(userMessage);
  const contextChunks = await searchSimilar(queryEmbedding, 5);

  const context = contextChunks.map((c) => c.text).join("\n\n");

  void SYSTEM_PROMPT;
  void context;

  throw new Error(
    "ragService.sendRagMessage is not implemented. Connect your LLM API.",
  );
}
