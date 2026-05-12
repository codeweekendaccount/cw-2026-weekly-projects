import { fetchPrompts } from "./api.js";
import { getFilteredPrompts, setLoading } from "./filters.js";
import { loadFavorites, saveFavorites } from "./storage.js";
import {
  closeModal,
  copyToClipboard,
  flashCopyButton,
  openModal,
  renderGrid,
  syncCardFavoriteButton,
  syncModalFavoriteButton,
  updateHeaderCounts,
} from "./ui.js";

const els = {
  headerTotal: document.getElementById("headerTotal"),
  headerFavorites: document.getElementById("headerFavorites"),
  showingCount: document.getElementById("showingCount"),
  loading: document.getElementById("loading"),
  emptyState: document.getElementById("emptyState"),
  promptsGrid: document.getElementById("promptsGrid"),
  searchInput: document.getElementById("searchInput"),
  contentTitle: document.getElementById("contentTitle"),
  contentSubtitle: document.getElementById("contentSubtitle"),

  modal: document.getElementById("promptModal"),
  modalOverlay: document.getElementById("modalOverlay"),
  modalClose: document.getElementById("modalClose"),
  modalCategory: document.getElementById("modalCategory"),
  modalTitle: document.getElementById("modalTitle"),
  modalPrompt: document.getElementById("modalPrompt"),
  modalCopyBtn: document.getElementById("modalCopyBtn"),
  modalFavoriteBtn: document.getElementById("modalFavoriteBtn"),
};

let allPrompts = [];

let activeView = "all";

let activeCategory = "all";

let searchQuery = "";

// We can also use array for favorite but,
//  since we want to prevent duplicate values it's better to use a Set()
let favorites = new Set();

let activeModalPromptId = null;

function setFavorite(promptId, next) {
  const id = String(promptId);
  if (next) favorites.add(id);
  else favorites.delete(id);
  saveFavorites(favorites);
  updateHeaderCounts(
    { headerTotalEl: els.headerTotal, headerFavoritesEl: els.headerFavorites },
    { total: allPrompts.length, favoritesCount: favorites.size },
  );
}

function listenForCategoryButtons() {
  const btns = document.querySelectorAll(".category-btn");

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.getAttribute("data-category") || "all";
      // We can also get the value like this 👇
      // activeCategory = btn.dataset.category || "all";
      render();
    });
  });
}

function listenForViewButtons() {
  const btns = document.querySelectorAll(".view-btn");

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeView = btn.getAttribute("data-view") || "all";

      if (els.contentTitle) {
        els.contentTitle.textContent =
          activeView === "favorites" ? "Favorites" : "All Prompts";
      }
      if (els.contentSubtitle) {
        els.contentSubtitle.textContent =
          activeView === "favorites"
            ? "Your saved prompts (stored locally in this browser)"
            : "Browse and save your favorite AI prompts";
      }

      render();
    });
  });
}

function listenForSearch() {
  if (!els.searchInput) return;
  els.searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value || "";
    render();
  });
}

function listenGridInteractions() {
  if (!els.promptsGrid) return;

  els.promptsGrid.addEventListener("click", async (e) => {
    const target = e.target;

    // The closest method search for provided query selector
    // in the parents of an element. For now we want to
    // find the parent of the button user clicked on
    const card = target.closest(".prompt-card");
    if (!card) return;

    // from the card element we get the added data attribute (promptId)
    const promptId = card.getAttribute("data-prompt-id");
    if (!promptId) return;
    const prompt = allPrompts.find((p) => String(p.id) === promptId);
    if (!prompt) return;

    const actionBtn = target.closest("button[data-action]");
    if (actionBtn) {
      // prevent propagating event to card and opening modal
      e.stopPropagation();
      const action = actionBtn.getAttribute("data-action");

      if (action === "copy") {
        const ok = await copyToClipboard(prompt.prompt);
        if (ok) flashCopyButton(actionBtn);
      }

      if (action === "favorite") {
        const next = !favorites.has(String(prompt.id));
        setFavorite(prompt.id, next);
        syncCardFavoriteButton({
          gridEl: els.promptsGrid,
          promptId: prompt.id,
          isFav: next,
        });
        if (activeModalPromptId === String(prompt.id))
          syncModalFavoriteButton(els.modalFavoriteBtn, next);
        if (activeView === "favorites" && !next) render();
      }

      return;
    }

    activeModalPromptId = String(prompt.id);
    openModal(
      {
        modalEl: els.modal,
        overlayEl: els.modalOverlay,
        modalCategoryEl: els.modalCategory,
        modalTitleEl: els.modalTitle,
        modalPromptEl: els.modalPrompt,
      },
      prompt,
    );

    syncModalFavoriteButton(
      els.modalFavoriteBtn,
      favorites.has(activeModalPromptId),
    );
  });

  els.promptsGrid.addEventListener("keydown", (e) => {
    const target = e.target;
    const card = target.closest(".prompt-card");
    if (!card) return;
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();

    const promptId = card.getAttribute("data-prompt-id");
    const prompt = allPrompts.find(
      (p) => String(p.id) === String(promptId),
    );
    if (!prompt) return;

    activeModalPromptId = String(prompt.id);
    openModal(
      {
        modalEl: els.modal,
        overlayEl: els.modalOverlay,
        modalCategoryEl: els.modalCategory,
        modalTitleEl: els.modalTitle,
        modalPromptEl: els.modalPrompt,
      },
      prompt,
    );
    syncModalFavoriteButton(
      els.modalFavoriteBtn,
      favorites.has(activeModalPromptId),
    );
  });
}

function listenModal() {
  els.modalClose?.addEventListener("click", () => {
    activeModalPromptId = null;
    closeModal({ modalEl: els.modal, overlayEl: els.modalOverlay });
  });
  els.modalOverlay?.addEventListener("click", () => {
    activeModalPromptId = null;
    closeModal({ modalEl: els.modal, overlayEl: els.modalOverlay });
  });

  // We can also listen for keyboard keys,
  // Here we will close the modal after pressing ESC button in keyboard
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      activeModalPromptId = null;
      closeModal({ modalEl: els.modal, overlayEl: els.modalOverlay });
    }
  });

  els.modalCopyBtn?.addEventListener("click", async () => {
    if (!activeModalPromptId) return;
    const prompt = allPrompts.find(
      (p) => String(p.id) === activeModalPromptId,
    );
    if (!prompt) return;
    const ok = await copyToClipboard(prompt.prompt);
    if (ok) flashCopyButton(els.modalCopyBtn);
  });

  els.modalFavoriteBtn?.addEventListener("click", () => {
    if (!activeModalPromptId) return;

    // in this variable we store the next value for the favorite,
    // if it was already in favorites the favNextValue will be false either way true
    const favNextValue = !favorites.has(activeModalPromptId);
    setFavorite(activeModalPromptId, favNextValue);
    syncModalFavoriteButton(els.modalFavoriteBtn, favNextValue);
    syncCardFavoriteButton({
      gridEl: els.promptsGrid,
      promptId: activeModalPromptId,
      isFav: favNextValue,
    });
    if (activeView === "favorites" && !favNextValue) render();
  });
}

function render() {
  const filtered = getFilteredPrompts({
    prompts: allPrompts,
    favorites,
    activeView,
    activeCategory,
    searchQuery,
  });

  renderGrid({
    gridEl: els.promptsGrid,
    emptyStateEl: els.emptyState,
    showingCountEl: els.showingCount,
    prompts: filtered,
    favorites,
  });
}

async function startApp() {
  setLoading(els.loading, true);
  favorites = loadFavorites();
  updateHeaderCounts(
    { headerTotalEl: els.headerTotal, headerFavoritesEl: els.headerFavorites },
    { total: allPrompts.length, favoritesCount: favorites.size },
  );

  try {
    allPrompts = await fetchPrompts();
  } catch (err) {
    allPrompts = [];
    console.error(err);
  } finally {
    setLoading(els.loading, false);
  }

  updateHeaderCounts(
    { headerTotalEl: els.headerTotal, headerFavoritesEl: els.headerFavorites },
    { total: allPrompts.length, favoritesCount: favorites.size },
  );

  listenForCategoryButtons();
  listenForViewButtons();
  listenForSearch();
  listenGridInteractions();
  listenModal();
  render();
}

startApp();
