import { normalizeCategory, setEmpty } from "./filters.js";

function truncate(text, maxChars) {
  const s = String(text || "").trim();
  if (s.length <= maxChars) return s;
  return `${s.slice(0, Math.max(0, maxChars - 1)).trimEnd()}…`;
}

export async function copyToClipboard(text) {
  const value = String(text ?? "");
  if (!value) return false;

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // fall back below
    alert("Copy failed!");
  }
}

export function updateHeaderCounts(
  { headerTotalEl, headerFavoritesEl },
  { total, favoritesCount },
) {
  if (headerTotalEl) headerTotalEl.textContent = String(total);
  if (headerFavoritesEl) headerFavoritesEl.textContent = String(favoritesCount);
}

export function renderGrid({
  gridEl,
  emptyStateEl,
  showingCountEl,
  prompts,
  favorites,
}) {
  if (!gridEl) return;

  if (showingCountEl) showingCountEl.textContent = String(prompts.length);
  setEmpty({ emptyStateEl, gridEl }, prompts.length === 0);

  gridEl.innerHTML = prompts
    .map((p) => {
      const id = String(p.id);
      const fav = favorites.has(id);
      const cat = normalizeCategory(p.category) || "other";
      const preview = truncate(p.prompt, 140);

      return `
        <article class="prompt-card" data-prompt-id="${id}" role="button" tabindex="0" aria-label="Open prompt preview">
          <div class="prompt-card-header">
            <h3 class="prompt-card-title">${p.title}</h3>
            <span class="prompt-card-category">${cat}</span>
          </div>
          <div class="prompt-card-body">
            <p class="prompt-preview">${preview}</p>
          </div>
          <div class="prompt-card-footer">
            <button class="btn btn-secondary" data-action="copy" type="button" aria-label="Copy prompt to clipboard">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M16 4H2v14h14M8 9h12v10H8z"></path>
              </svg>
              Copy
            </button>
            <button class="btn btn-primary ${fav ? "is-favorite" : ""}" data-action="favorite" type="button" aria-label="${fav ? "Remove from favorites" : "Add to favorites"}">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              ${fav ? "Saved" : "Favorite"}
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

export function syncModalFavoriteButton(modalFavoriteBtnEl, isFav) {
  if (!modalFavoriteBtnEl) return;
  modalFavoriteBtnEl.classList.toggle("is-favorite", isFav);
  modalFavoriteBtnEl.innerHTML = `
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
    </svg>
    ${isFav ? "Saved" : "Save to Favorites"}
  `.trim();
  modalFavoriteBtnEl.setAttribute(
    "aria-label",
    isFav ? "Remove from favorites" : "Add to favorites",
  );
}

export function syncCardFavoriteButton({ gridEl, promptId, isFav }) {
  if (!gridEl) return;
  const id = String(promptId);
  const card = gridEl.querySelector(
    `.prompt-card[data-prompt-id="${CSS.escape(id)}"]`,
  );
  if (!card) return;
  const btn = card.querySelector('button[data-action="favorite"]');
  if (!btn) return;

  btn.classList.toggle("is-favorite", isFav);
  btn.setAttribute(
    "aria-label",
    isFav ? "Remove from favorites" : "Add to favorites",
  );
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
    </svg>
    ${isFav ? "Saved" : "Favorite"}
  `.trim();
}

export function openModal(
  { modalEl, overlayEl, modalCategoryEl, modalTitleEl, modalPromptEl },
  prompt,
) {
  if (modalCategoryEl)
    modalCategoryEl.textContent = normalizeCategory(prompt.category) || "other";
  if (modalTitleEl) modalTitleEl.textContent = prompt.title || "";
  if (modalPromptEl) modalPromptEl.textContent = prompt.prompt || "";

  modalEl?.classList.add("active");
  overlayEl?.classList.add("active");
  document.body.style.overflow = "hidden";
}

export function closeModal({ modalEl, overlayEl }) {
  modalEl?.classList.remove("active");
  overlayEl?.classList.remove("active");
  document.body.style.overflow = "";
}

export function flashCopyButton(buttonEl) {
  if (!buttonEl) return;
  const prev = buttonEl.innerHTML;
  buttonEl.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M20 6L9 17l-5-5"></path>
    </svg>
    Copied
  `.trim();
  setTimeout(() => {
    buttonEl.innerHTML = prev;
  }, 900);
}
