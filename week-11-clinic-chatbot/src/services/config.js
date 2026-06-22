import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

if (!supabaseUrl) {
  console.error("VITE_SUPABASE_URL is not defined");
  throw new Error("VITE_SUPABASE_URL is not defined");
}

const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseKey) {
  console.error("VITE_SUPABASE_PUBLISHABLE_KEY is not defined");
  throw new Error("VITE_SUPABASE_PUBLISHABLE_KEY is not defined");
}

export const supabase = createClient(supabaseUrl, supabaseKey);


const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const model = import.meta.env.VITE_AI_CHAT_MODEL;

if (!apiKey || !apiUrl || !model) {
  throw new Error("Missing required OpenRouter environment variables");
}

export const openai = new OpenAI({
  apiKey: apiKey,
  baseURL: apiUrl,
  dangerouslyAllowBrowser: true,
});
