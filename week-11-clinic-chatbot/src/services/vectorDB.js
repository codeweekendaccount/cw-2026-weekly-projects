export async function upsertVectors(records) {
  void records;
  throw new Error(
    "vectorDB.upsertVectors is not implemented. Connect your vector database.",
  );
}

export async function searchSimilar(queryEmbedding, topK = 5) {
  void queryEmbedding;
  void topK;
  throw new Error(
    "vectorDB.searchSimilar is not implemented. Connect your vector database.",
  );
}
