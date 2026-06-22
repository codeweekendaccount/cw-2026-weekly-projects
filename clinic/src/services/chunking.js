import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function chunkFile(file) {
  try {
    const res = await fetch(file);
    const text = await res.text();

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 250,
      chunkOverlap: 15,
    });
    const chunks = splitter.splitText(text);
    return chunks;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

export async function chunkText(text) {
  try {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 250,
      chunkOverlap: 151,
    });
    const chunks = splitter.splitText(text);
    return chunks;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
