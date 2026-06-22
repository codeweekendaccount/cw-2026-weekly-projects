import { supabase } from "./config";

export async function upsertVectors(records) {
  const { error } = await supabase.from("clinic_info").insert(records);
  if (error) {
    throw error;
  }
}

export async function searchSimilar(queryEmbedding, matchCount = 5) {
  const { error, data } = await supabase.rpc("match_clinic_info", {
    query_embedding: queryEmbedding,
    match_threshold: 0.4,
    match_count: matchCount,
  });

  if (error) {
    throw error;
  }

  return data;
}
