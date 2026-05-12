export function normalizeCategory(category) {
  return String(category || "").trim().toLowerCase();
}

export function setLoading(loadingEl, isLoading) {
  if (!loadingEl) return;
  loadingEl.style.display = isLoading ? "flex" : "none";
}

export function setEmpty({ emptyStateEl, gridEl }, isEmpty) {
  if (!emptyStateEl || !gridEl) return;
  emptyStateEl.style.display = isEmpty ? "block" : "none";
  gridEl.style.display = isEmpty ? "none" : "grid";
}

export function getFilteredPrompts({ prompts, favorites, activeView, activeCategory, searchQuery }) {
  const q = (searchQuery || "").trim().toLowerCase();

  return prompts.filter((p) => {
    const id = String(p.id);
    if (activeView === "favorites" && !favorites.has(id)) return false;

    const cat = normalizeCategory(p.category);
    if (activeCategory !== "all" && cat !== activeCategory) return false;

    if (!q) return true;
    const hay = `${p.title} ${p.category} ${p.prompt}`.toLowerCase();
    return hay.includes(q);
  });
}

