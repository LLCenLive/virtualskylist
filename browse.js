// =============================================================
// VirtualSkyList — Tier Lists browse page
// Fetches the live catalog from Supabase and renders it, with
// working search + category filter over the real data.
// =============================================================
import { fetchCatalog, renderCard } from "./catalog.js";

const grid = document.getElementById("browse-grid");
const stateMsg = document.getElementById("browse-state-msg");
const emptyState = document.getElementById("browse-empty");
const searchInput = document.querySelector(".search-field input");
const categoryTabs = document.querySelector('.filter-tabs[data-group="category"]');

let items = [];
let activeCategory = "all";

function refreshGrid() {
  const query = (searchInput?.value || "").trim().toLowerCase();
  const lang = window.VSL_I18N ? window.VSL_I18N.lang : "fr";

  const filtered = items.filter((tl) => {
    const matchesCategory = activeCategory === "all" || tl.category === activeCategory;
    const title = ((lang === "fr" ? tl.title_fr : tl.title_en) || "").toLowerCase();
    const matchesQuery = !query || title.includes(query);
    return matchesCategory && matchesQuery;
  });

  grid.innerHTML = "";
  filtered.forEach((tl) => grid.appendChild(renderCard(tl, { withCategoryBadge: true })));
  if (emptyState) emptyState.style.display = filtered.length ? "none" : "flex";
}

categoryTabs?.addEventListener("tabchange", (e) => {
  activeCategory = e.detail.value;
  refreshGrid();
});
searchInput?.addEventListener("input", refreshGrid);
document.addEventListener("vsl:langchange", refreshGrid);

async function init() {
  items = await fetchCatalog();
  stateMsg.style.display = "none";

  // Allow other pages to deep-link into a pre-filtered category,
  // e.g. tier-lists.html?filter=addons
  const initialFilter = new URLSearchParams(location.search).get("filter");
  const initialTab = initialFilter && categoryTabs?.querySelector(`.filter-tab[data-filter="${initialFilter}"]`);
  if (initialTab) {
    categoryTabs.querySelectorAll(".filter-tab").forEach((tb) => tb.classList.remove("is-active"));
    initialTab.classList.add("is-active");
    activeCategory = initialFilter;
  }

  refreshGrid();
}

init();
