// =============================================================
// VirtualSkyList — Tier list builder
// Handles: loading a tier list + its items from Supabase,
// drag & drop placement, submitting a ranking, and rendering
// the live community podium from the `item_scores` view.
// =============================================================
import { supabase, isConfigured } from "./supabase-config.js";

// -------------------------------------------------------------
// Session id — identifies "this browser" so a re-submitted
// ranking updates the same row instead of creating duplicates.
// In-memory only for this preview. Once you deploy this file on
// your own domain, swap the line below for:
//   let sessionId = localStorage.getItem('vsl_session_id');
//   if (!sessionId) { sessionId = crypto.randomUUID(); localStorage.setItem('vsl_session_id', sessionId); }
// so a visitor's ranking is remembered across visits.
// -------------------------------------------------------------
const sessionId = crypto.randomUUID();

const TIERS = ["S", "A", "B", "C", "D"];
const TIER_LABEL_KEYS = {
  S: "tier.s.label", A: "tier.a.label", B: "tier.b.label",
  C: "tier.c.label", D: "tier.d.label", unranked: "tier.untested.label",
};

const params = new URLSearchParams(location.search);
const slug = params.get("slug") || "avions-de-ligne";

const t = (key) => (window.VSL_I18N ? window.VSL_I18N.t(key) : key);

const el = {
  title: document.getElementById("tl-title"),
  desc: document.getElementById("tl-desc"),
  banner: document.getElementById("setup-banner"),
  stateMsg: document.getElementById("state-msg"),
  builder: document.getElementById("builder-layout"),
  board: document.getElementById("tier-board"),
  validateBtn: document.getElementById("validate-btn"),
  resetBtn: document.getElementById("reset-btn"),
  exportBtn: document.getElementById("export-btn"),
  communityBody: document.getElementById("community-body"),
  communityEmpty: document.getElementById("community-empty"),
};

let items = [];
let tierListRow = null;

/* =============================================================
   Rendering helpers
   ============================================================= */
function chipColor(seed) {
  const palette = [
    ["#1c2a44", "#8fb3ec"], ["#3a2130", "#e8a2ac"], ["#20302a", "#8fd6b0"],
    ["#33301b", "#e0d68f"], ["#2b2140", "#c3a2e8"], ["#0e3a4a", "#5fd0e0"],
  ];
  let hash = 0;
  for (const ch of seed) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return palette[hash % palette.length];
}

function buildChip(item) {
  const chip = document.createElement("div");
  chip.className = "drag-chip";
  chip.dataset.itemId = item.id;
  const [bg, fg] = chipColor(item.name);
  chip.innerHTML = `
    <span class="chip-thumb" style="--thumb-bg:${bg}">
      <svg class="icon" style="color:${fg}"><use href="#i-plane"/></svg>
    </span>
    <span>${item.name}</span>
  `;
  return chip;
}

function renderBoardShell() {
  el.board.innerHTML = "";
  TIERS.forEach((tier) => {
    const row = document.createElement("div");
    row.className = "tier-row-drop";
    row.dataset.tier = tier;
    row.innerHTML = `
      <div class="tier-badge">
        <span class="tier-badge-letter">${tier}</span>
        <span class="tier-badge-label">${t(TIER_LABEL_KEYS[tier])}</span>
      </div>
      <div class="drop-zone" data-tier="${tier}" role="list" aria-label="Tier ${tier}"></div>
    `;
    el.board.appendChild(row);
  });

  // "Non testé / Untested" — visually part of the board (dashed, muted),
  // but functionally just another drop zone (tier = 'unranked').
  const untested = document.createElement("div");
  untested.className = "tier-row-drop tier-row-untested";
  untested.dataset.tier = "unranked";
  untested.innerHTML = `
    <div class="tier-badge">
      <span class="tier-badge-label">${t(TIER_LABEL_KEYS.unranked)}</span>
    </div>
    <div class="drop-zone" data-tier="unranked" role="list" aria-label="Untested"></div>
  `;
  el.board.appendChild(untested);
}

function refreshBoardLabels() {
  el.board.querySelectorAll(".tier-row-drop").forEach((row) => {
    const label = row.querySelector(".tier-badge-label");
    if (label) label.textContent = t(TIER_LABEL_KEYS[row.dataset.tier]);
  });
}

function placeItems(placementsByItemId) {
  el.board.querySelectorAll(".drop-zone").forEach((z) => (z.innerHTML = ""));
  items.forEach((item) => {
    const chip = buildChip(item);
    const tier = placementsByItemId.get(item.id) || "unranked";
    const zone =
      el.board.querySelector(`.drop-zone[data-tier="${tier}"]`) ||
      el.board.querySelector('.drop-zone[data-tier="unranked"]');
    zone.appendChild(chip);
  });
}

function renderMeta() {
  if (!tierListRow) return;
  const lang = window.VSL_I18N ? window.VSL_I18N.lang : "fr";
  el.title.textContent = lang === "fr" ? tierListRow.title_fr : tierListRow.title_en;
  const desc = lang === "fr" ? tierListRow.desc_fr : tierListRow.desc_en;
  el.desc.textContent = desc || "";
  document.title = `VirtualSkyList — ${el.title.textContent}`;
}

function renderCommunity(scores) {
  el.communityBody.innerHTML = "";
  const ranked = scores.filter((s) => s.votes > 0).sort((a, b) => b.avg_score - a.avg_score);

  if (!ranked.length) {
    el.communityEmpty.style.display = "block";
    el.communityEmpty.textContent = t("builder.empty");
    return;
  }
  el.communityEmpty.style.display = "none";

  ranked.slice(0, 12).forEach((item, i) => {
    const [bg, fg] = chipColor(item.name);
    const row = document.createElement("div");
    row.className = "rank-row";
    row.innerHTML = `
      <span class="rank-num">${i + 1}</span>
      <span class="rank-thumb" style="--thumb-bg:${bg}"><svg class="icon" style="color:${fg}"><use href="#i-plane"/></svg></span>
      <span class="rank-name">${item.name}</span>
      <span class="rank-score">${item.avg_score.toFixed(2)}</span>
    `;
    el.communityBody.appendChild(row);
  });
}

/* =============================================================
   Drag & drop (Pointer Events — works for mouse, touch, pen)
   ============================================================= */
let dragState = null;

function initDragAndDrop() {
  el.builder.addEventListener("pointerdown", onPointerDown);
}

function onPointerDown(e) {
  const chip = e.target.closest(".drag-chip");
  if (!chip) return;
  const rect = chip.getBoundingClientRect();
  dragState = {
    chip,
    offsetX: e.clientX - rect.left,
    offsetY: e.clientY - rect.top,
    originZone: chip.parentElement,
  };
  chip.style.width = rect.width + "px";
  chip.classList.add("is-dragging");
  moveChipTo(e.clientX, e.clientY);
  chip.setPointerCapture(e.pointerId);
  chip.addEventListener("pointermove", onPointerMove);
  chip.addEventListener("pointerup", onPointerUp);
  chip.addEventListener("pointercancel", onPointerUp);
}

function moveChipTo(x, y) {
  const { chip, offsetX, offsetY } = dragState;
  chip.style.left = x - offsetX + "px";
  chip.style.top = y - offsetY + "px";
}

function zoneAtPoint(x, y) {
  const { chip } = dragState;
  chip.style.visibility = "hidden";
  const target = document.elementFromPoint(x, y);
  chip.style.visibility = "";
  return target ? target.closest(".drop-zone") : null;
}

function onPointerMove(e) {
  if (!dragState) return;
  moveChipTo(e.clientX, e.clientY);
  document.querySelectorAll(".drop-zone.is-dragover").forEach((z) => z.classList.remove("is-dragover"));
  const zone = zoneAtPoint(e.clientX, e.clientY);
  if (zone) zone.classList.add("is-dragover");
}

function onPointerUp(e) {
  if (!dragState) return;
  const { chip, originZone } = dragState;
  chip.releasePointerCapture(e.pointerId);
  chip.removeEventListener("pointermove", onPointerMove);
  chip.removeEventListener("pointerup", onPointerUp);
  chip.removeEventListener("pointercancel", onPointerUp);

  const targetZone = zoneAtPoint(e.clientX, e.clientY) || originZone;
  document.querySelectorAll(".drop-zone.is-dragover").forEach((z) => z.classList.remove("is-dragover"));

  chip.classList.remove("is-dragging");
  chip.style.width = "";
  chip.style.left = "";
  chip.style.top = "";

  targetZone.appendChild(chip);
  dragState = null;
}

/* =============================================================
   Data loading & submission
   ============================================================= */
async function loadTierList() {
  const { data: list, error: listErr } = await supabase
    .from("tier_lists")
    .select("*")
    .eq("slug", slug)
    .single();
  if (listErr || !list) throw listErr || new Error("Tier list not found");
  tierListRow = list;

  const { data: itemRows, error: itemErr } = await supabase
    .from("tier_list_items")
    .select("*")
    .eq("tier_list_id", list.id)
    .order("sort_order", { ascending: true });
  if (itemErr) throw itemErr;
  items = itemRows || [];

  // Restore this session's previous submission, if any.
  const placementsByItemId = new Map();
  const { data: ranking } = await supabase
    .from("rankings")
    .select("id")
    .eq("tier_list_id", list.id)
    .eq("session_id", sessionId)
    .maybeSingle();

  if (ranking) {
    const { data: placements } = await supabase
      .from("ranking_placements")
      .select("item_id, tier")
      .eq("ranking_id", ranking.id);
    (placements || []).forEach((p) => {
      placementsByItemId.set(p.item_id, p.tier);
    });
  }

  renderMeta();
  renderBoardShell();
  placeItems(placementsByItemId);
}

async function loadCommunityScores() {
  const { data, error } = await supabase
    .from("item_scores")
    .select("*")
    .eq("tier_list_id", tierListRow.id);
  if (error) throw error;
  renderCommunity(data || []);
}

function collectPlacements() {
  const rows = [];
  el.board.querySelectorAll(".drop-zone").forEach((zone) => {
    const tier = zone.dataset.tier;
    zone.querySelectorAll(".drag-chip").forEach((chip) => {
      rows.push({ item_id: chip.dataset.itemId, tier });
    });
  });
  return rows;
}

async function submitRanking() {
  const placements = collectPlacements();
  el.validateBtn.disabled = true;

  try {
    const { data: ranking, error: upsertErr } = await supabase
      .from("rankings")
      .upsert({ tier_list_id: tierListRow.id, session_id: sessionId }, { onConflict: "tier_list_id,session_id" })
      .select()
      .single();
    if (upsertErr) throw upsertErr;

    if (placements.length) {
      const rows = placements.map((p) => ({ ranking_id: ranking.id, item_id: p.item_id, tier: p.tier }));
      const { error: placeErr } = await supabase
        .from("ranking_placements")
        .upsert(rows, { onConflict: "ranking_id,item_id" });
      if (placeErr) throw placeErr;
    }

    showToast(t("builder.saved"));
    await loadCommunityScores();
  } catch (err) {
    console.error(err);
    showToast(t("builder.saveError"));
  } finally {
    el.validateBtn.disabled = false;
  }
}

function resetBoard() {
  placeItems(new Map());
}

/* =============================================================
   Export the board as a PNG image
   ============================================================= */
function escapeHtml(str) {
  const d = document.createElement("div");
  d.textContent = str ?? "";
  return d.innerHTML;
}

async function exportBoardAsPng() {
  const label = el.exportBtn.querySelector("span");
  const originalText = label.textContent;
  el.exportBtn.disabled = true;
  label.textContent = t("builder.exporting");

  const wrapper = document.createElement("div");
  wrapper.style.cssText =
    "position:fixed; left:-9999px; top:0; width:820px; background:#0e1526; padding:32px; font-family:'Inter',sans-serif; box-sizing:border-box;";
  wrapper.innerHTML = `
    <div style="text-align:center; margin-bottom:22px;">
      <div style="font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:24px; color:#eef2f9;">${escapeHtml(el.title.textContent)}</div>
      <div style="font-size:13px; font-weight:700; letter-spacing:0.04em; color:#5fa8ff; margin-top:6px;">VIRTUALSKYLIST</div>
    </div>
  `;

  const boardClone = el.board.cloneNode(true);
  boardClone.style.width = "100%";
  wrapper.appendChild(boardClone);

  const footer = document.createElement("div");
  footer.style.cssText = "text-align:center; margin-top:22px; padding-top:16px; border-top:1px solid rgba(148,178,224,0.15); font-size:12px; color:#5c6a89;";
  footer.textContent = "Réalisé par LLCenLive";
  wrapper.appendChild(footer);

  document.body.appendChild(wrapper);

  try {
    const mod = await import("https://esm.sh/html2canvas@1.4.1");
    const html2canvas = mod.default;
    const canvas = await html2canvas(wrapper, {
      backgroundColor: "#0e1526",
      scale: 2,
      useCORS: true,
    });
    const link = document.createElement("a");
    link.download = `${tierListRow?.slug || "tier-list"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  } catch (err) {
    console.error(err);
    showToast(t("builder.error"));
  } finally {
    document.body.removeChild(wrapper);
    el.exportBtn.disabled = false;
    label.textContent = originalText;
  }
}

/* =============================================================
   Minimal local toast (mirrors script.js's, kept independent
   since this is a separate module script)
   ============================================================= */
let toastTimer = null;
function showToast(message) {
  const toastEl = document.getElementById("toast");
  const toastTextEl = document.getElementById("toast-text");
  if (!toastEl || !toastTextEl) return;
  toastTextEl.textContent = message;
  toastEl.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("is-visible"), 3200);
}

/* =============================================================
   Boot
   ============================================================= */
async function init() {
  if (!isConfigured) {
    el.banner.style.display = "flex";
    el.stateMsg.style.display = "none";
    el.builder.style.display = "none";
    return;
  }

  try {
    await loadTierList();
    await loadCommunityScores();
    el.stateMsg.style.display = "none";
    el.builder.style.display = "grid";
    initDragAndDrop();
  } catch (err) {
    console.error(err);
    el.stateMsg.textContent = t("builder.error");
  }
}

el.validateBtn?.addEventListener("click", submitRanking);
el.resetBtn?.addEventListener("click", resetBoard);
el.exportBtn?.addEventListener("click", exportBoardAsPng);
document.addEventListener("vsl:langchange", () => {
  renderMeta();
  refreshBoardLabels();
});

init();
