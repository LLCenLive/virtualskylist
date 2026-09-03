// =============================================================
// VirtualSkyList — Shared tier list catalog
// Fetches tier_lists (with real vote counts) from Supabase and
// renders them as .list-card elements. Used by index.html's
// trending carousel and tier-lists.html's browse grid, so both
// pages reflect whatever the admin panel currently has.
// =============================================================
import { supabase, isConfigured } from "./supabase-config.js";

const CATEGORY_STYLE = {
  airliners: { icon: "i-plane",   tile: "linear-gradient(135deg, #14335c, #0a1730)", badge: "#5fa8ff", iconColor: "#dfeaff" },
  airlines:  { icon: "i-plane",   tile: "linear-gradient(135deg, #0e4a3a, #081a18)", badge: "#5fe0b8", iconColor: "#c2fbe8" },
  ga:        { icon: "i-plane",   tile: "linear-gradient(135deg, #143a2e, #0a1c16)", badge: "#7fd6a8", iconColor: "#dcfbe8" },
  airports:  { icon: "i-pin",     tile: "linear-gradient(135deg, #0e3a4a, #081a24)", badge: "#5fd0e0", iconColor: "#cdf3f8" },
  liveries:  { icon: "i-palette", tile: "linear-gradient(135deg, #5c3a14, #2c1808)", badge: "#f0b96a", iconColor: "#ffe6c2" },
  addons:    { icon: "i-puzzle",  tile: "linear-gradient(135deg, #3a2160, #150c30)", badge: "#c3a2e8", iconColor: "#e8dcff" },
};
const DEFAULT_STYLE = CATEGORY_STYLE.airliners;

export async function fetchCatalog() {
  if (!isConfigured) return [];
  const { data, error } = await supabase
    .from("tier_lists_with_votes")
    .select("*")
    .order("title_fr");
  if (error) {
    console.error(error);
    return [];
  }
  return data || [];
}

function t(key) {
  return window.VSL_I18N ? window.VSL_I18N.t(key) : key;
}

function lang() {
  return window.VSL_I18N ? window.VSL_I18N.lang : "fr";
}

/**
 * Build a .list-card <a> element for a tier_lists_with_votes row.
 * @param {object} tl - a row from tier_lists_with_votes
 * @param {object} [opts]
 * @param {boolean} [opts.withCategoryBadge] - show the MSFS-style category pill
 */
export function renderCard(tl, opts = {}) {
  const style = CATEGORY_STYLE[tl.category] || DEFAULT_STYLE;
  const currentLang = lang();
  const title = (currentLang === "fr" ? tl.title_fr : tl.title_en) || tl.slug;
  const desc = (currentLang === "fr" ? tl.desc_fr : tl.desc_en) || "";
  const votesLabel = tl.votes > 0
    ? `${tl.votes} ${t("builder.votesSuffix")}`
    : t("votes.empty");

  const card = document.createElement("a");
  card.className = "list-card";
  card.href = `tier-list.html?slug=${encodeURIComponent(tl.slug)}&lang=${currentLang}`;
  card.dataset.category = tl.category || "";
  card.dataset.slug = tl.slug;

  const mediaInner = tl.image_url
    ? `<img src="${escapeAttr(tl.image_url)}" alt="" loading="lazy">`
    : `<svg class="icon" style="color:${style.iconColor}"><use href="#${style.icon}" width="40" height="40"/></svg>`;

  card.innerHTML = `
    <div class="list-card-media" style="--tile-bg:${style.tile}">
      <span class="media-icon-badge" style="color:${style.badge}"><svg class="icon"><use href="#${style.icon}"/></svg></span>
      ${mediaInner}
    </div>
    <div class="list-card-body">
      <h3>${escapeHtml(title)}</h3>
      <div class="list-card-votes">${escapeHtml(votesLabel)}</div>
      <p>${escapeHtml(desc)}</p>
      ${opts.withCategoryBadge && tl.category === "addons" ? `<span class="category-pill">${escapeHtml(t("tierlists.badge.msfs"))}</span>` : ""}
    </div>
  `;
  return card;
}

function escapeHtml(str) {
  const d = document.createElement("div");
  d.textContent = str ?? "";
  return d.innerHTML;
}
function escapeAttr(str) {
  return (str ?? "").replace(/"/g, "&quot;");
}
