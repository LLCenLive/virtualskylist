// =============================================================
// VirtualSkyList — Trends page
// Risers/fallers come from get_item_trend(mode), which compares
// today's score to a snapshot from ~1 week/month ago (or the very
// first one ever recorded). The activity chart is derived directly
// from ranking timestamps — no snapshot needed for that part.
// =============================================================
import { supabase, isConfigured } from "./supabase-config.js";

const t = (key) => (window.VSL_I18N ? window.VSL_I18N.t(key) : key);

const el = {
  rangeTabs: document.querySelector('.filter-tabs[data-group="range"]'),
  podiumEmpty: document.getElementById("podium-empty"),
  podiumContent: document.getElementById("podium-content"),
  risersEmpty: document.getElementById("risers-empty"),
  risersContent: document.getElementById("risers-content"),
  fallersEmpty: document.getElementById("fallers-empty"),
  fallersContent: document.getElementById("fallers-content"),
  chartEmpty: document.getElementById("chart-empty"),
  chartContent: document.getElementById("chart-content"),
};

let mode = "week";

function chipColor(seed) {
  const palette = [
    ["#1c2a44", "#8fb3ec"], ["#3a2130", "#e8a2ac"], ["#20302a", "#8fd6b0"],
    ["#33301b", "#e0d68f"], ["#2b2140", "#c3a2e8"], ["#0e3a4a", "#5fd0e0"],
  ];
  let hash = 0;
  for (const ch of seed) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return palette[hash % palette.length];
}

function escapeHtml(str) {
  const d = document.createElement("div");
  d.textContent = str ?? "";
  return d.innerHTML;
}

/* =============================================================
   Risers / fallers / podium
   ============================================================= */
async function loadTrend() {
  if (!isConfigured) return;
  const { data, error } = await supabase.rpc("get_item_trend", { mode });
  if (error) {
    console.error(error);
    return;
  }

  const withDelta = (data || []).filter((row) => row.score_delta !== null);
  const risers = withDelta.filter((r) => r.score_delta > 0).sort((a, b) => b.score_delta - a.score_delta);
  const fallers = withDelta.filter((r) => r.score_delta < 0).sort((a, b) => a.score_delta - b.score_delta);

  renderPodium(risers.slice(0, 3));
  renderTrendList(el.risersContent, el.risersEmpty, risers.slice(0, 8), true);
  renderTrendList(el.fallersContent, el.fallersEmpty, fallers.slice(0, 8), false);
}

function renderPodium(top3) {
  if (!top3.length) {
    el.podiumEmpty.style.display = "block";
    el.podiumContent.style.display = "none";
    return;
  }
  el.podiumEmpty.style.display = "none";
  el.podiumContent.style.display = "grid";
  el.podiumContent.innerHTML = "";

  // Classic podium order: 2nd, 1st, 3rd (falls back gracefully if <3 items)
  const order = [top3[1], top3[0], top3[2]];
  const places = [2, 1, 3];

  order.forEach((row, i) => {
    if (!row) return;
    const place = places[i];
    const [bg, fg] = chipColor(row.name);
    const col = document.createElement("div");
    col.className = "podium-col";
    col.dataset.place = place;
    col.innerHTML = `
      <span class="podium-thumb" style="--thumb-bg:${bg}"><svg class="icon" style="color:${fg}"><use href="#i-plane"/></svg></span>
      <div class="podium-name">${escapeHtml(row.name)}</div>
      <div class="podium-score">▲${row.score_delta.toFixed(2)}</div>
      <div class="podium-bar">${place}</div>
    `;
    el.podiumContent.appendChild(col);
  });
}

function renderTrendList(container, emptyEl, rows, isRiser) {
  if (!rows.length) {
    emptyEl.style.display = "block";
    container.style.display = "none";
    return;
  }
  emptyEl.style.display = "none";
  container.style.display = "flex";
  container.innerHTML = "";

  rows.forEach((row) => {
    const [bg, fg] = chipColor(row.name);
    const arrowClass = isRiser ? "trend-up" : "trend-up trend-down";
    const value = Math.abs(row.score_delta).toFixed(2);
    const line = document.createElement("div");
    line.className = "trend-row";
    line.innerHTML = `
      <span class="rank-thumb" style="--thumb-bg:${bg}"><svg class="icon" style="color:${fg}"><use href="#i-plane"/></svg></span>
      <span><span class="trend-name">${escapeHtml(row.name)}</span></span>
      <span class="${arrowClass}"><svg class="icon"><use href="#i-arrow-up"/></svg>${value}</span>
    `;
    container.appendChild(line);
  });
}

/* =============================================================
   7-day voting activity chart
   ============================================================= */
const DAY_KEYS = ["day.sun", "day.mon", "day.tue", "day.wed", "day.thu", "day.fri", "day.sat"];

async function loadActivity() {
  if (!isConfigured) return;
  const { data, error } = await supabase.from("daily_vote_activity").select("*");
  if (error || !data || !data.length) return;

  el.chartEmpty.style.display = "none";
  el.chartContent.style.display = "flex";
  el.chartContent.innerHTML = "";

  const byDay = new Map(data.map((r) => [r.day, r.votes]));
  const max = Math.max(...data.map((r) => r.votes), 1);

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const votes = byDay.get(key) || 0;
    const pct = Math.round((votes / max) * 100);
    const bar = document.createElement("div");
    bar.className = "chart-bar";
    bar.innerHTML = `
      <div class="chart-bar-fill" style="height:${Math.max(pct, 3)}%" title="${votes}"></div>
      <span class="chart-bar-label">${t(DAY_KEYS[d.getDay()])}</span>
    `;
    el.chartContent.appendChild(bar);
  }
}

/* =============================================================
   Range tabs
   ============================================================= */
el.rangeTabs?.addEventListener("tabchange", (e) => {
  mode = e.detail.value;
  loadTrend();
});

document.addEventListener("vsl:langchange", () => {
  loadActivity();
});

loadTrend();
loadActivity();
