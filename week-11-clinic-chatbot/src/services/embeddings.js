import { openai } from "./config";

export async function generateEmbedding(text = "") {
  try {
    if (!text.trim()) {
      throw new Error("Empty text provided to generateEmbedding");
    }

    const { error, data } = await openai.embeddings.create({
      input: text,
      model: import.meta.env.VITE_EMBEDDING_MODEL,
      encoding_format: "float",
    });

    if (error) {
      throw error;
    }

    return data[0];
  } catch (error) {
    console.error("Error in generateEmbedding:", error.message);
    throw error;
  }
}

export async function generateEmbeddings(chunks = []) {
  try {
    const embeddings = await Promise.all(
      chunks.map((ch) => generateEmbedding(ch)),
    );

    return embeddings;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}
