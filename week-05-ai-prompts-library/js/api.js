
export async function fetchPrompts() {
  try {
    const res = await fetch("data/prompts.json");
    if (!res.ok) throw new Error(`Failed to load prompts (${res.status})`);
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("Invalid prompts.json format");
    return data;
  } catch (error) {
    
  }
}

