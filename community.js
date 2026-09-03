// =============================================================
// VirtualSkyList — Community page
// Stats, top contributors (by suggestions sent — votes are
// anonymous by design so they can't feed a leaderboard), and a
// recent activity feed (new tier lists, new members, new
// suggestions — individual votes excluded: anonymous + too
// high-volume to be a meaningful feed).
// =============================================================
import { supabase, isConfigured } from "./supabase-config.js";

const t = (key) => (window.VSL_I18N ? window.VSL_I18N.t(key) : key);
const lang = () => (window.VSL_I18N ? window.VSL_I18N.lang : "fr");

const el = {
  statMembers: document.getElementById("stat-members"),
  statLists: document.getElementById("stat-lists"),
  statVotes: document.getElementById("stat-votes"),
  statAircraft: document.getElementById("stat-aircraft"),

  leaderboardEmpty: document.getElementById("leaderboard-empty"),
  leaderboardContent: document.getElementById("leaderboard-content"),

  activityEmpty: document.getElementById("activity-empty"),
  activityContent: document.getElementById("activity-content"),
};

function escapeHtml(str) {
  const d = document.createElement("div");
  d.textContent = str ?? "";
  return d.innerHTML;
}

function fillTemplate(key, vars) {
  let str = t(key);
  for (const [k, v] of Object.entries(vars)) str = str.replace(`{${k}}`, v);
  return str;
}

function relativeTime(isoString) {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return t("time.justNow");
  if (minutes < 60) return fillTemplate("time.minutesAgo", { n: minutes });
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return fillTemplate("time.hoursAgo", { n: hours });
  const days = Math.floor(hours / 24);
  return fillTemplate("time.daysAgo", { n: days });
}

/* =============================================================
   Stats
   ============================================================= */
async function loadStats() {
  const { data, error } = await supabase.from("community_stats").select("*").single();
  if (error || !data) return;
  el.statMembers.textContent = data.members ?? "—";
  el.statLists.textContent = data.tierlists ?? "—";
  el.statVotes.textContent = data.total_votes ?? "—";
  el.statAircraft.textContent = data.aircraft ?? "—";
}

/* =============================================================
   Leaderboard
   ============================================================= */
async function loadLeaderboard() {
  const { data, error } = await supabase
    .from("contributor_leaderboard")
    .select("*")
    .order("suggestion_count", { ascending: false })
    .limit(8);

  if (error || !data || !data.length) {
    el.leaderboardEmpty.style.display = "block";
    el.leaderboardContent.style.display = "none";
    return;
  }
  el.leaderboardEmpty.style.display = "none";
  el.leaderboardContent.style.display = "flex";
  el.leaderboardContent.innerHTML = "";

  const medalColors = { 1: "#3d8bff", 2: "#35d0e0", 3: "#c2793f" };

  data.forEach((row, i) => {
    const rank = i + 1;
    const name = row.display_name || "—";
    const initials = name.slice(0, 2).toUpperCase();
    const line = document.createElement("div");
    line.className = "leaderboard-row";
    line.dataset.rank = rank;
    line.innerHTML = `
      <span class="leaderboard-rank">${rank}</span>
      <span class="leaderboard-avatar" style="background:${medalColors[rank] || "#3d8bff"}">${escapeHtml(initials)}</span>
      <span>
        <div class="leaderboard-name">${escapeHtml(name)}</div>
      </span>
      <span class="leaderboard-stat">${fillTemplate("leaderboard.suggestions", { n: row.suggestion_count })}</span>
    `;
    el.leaderboardContent.appendChild(line);
  });
}

/* =============================================================
   Activity feed
   ============================================================= */
async function loadActivity() {
  const { data, error } = await supabase
    .from("activity_feed")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  if (error || !data || !data.length) {
    el.activityEmpty.style.display = "block";
    el.activityContent.style.display = "none";
    return;
  }
  el.activityEmpty.style.display = "none";
  el.activityContent.style.display = "flex";
  el.activityContent.innerHTML = "";

  data.forEach((row) => {
    let text = "";
    if (row.kind === "tierlist") text = fillTemplate("activity.newTierlist", { label: row.label || "" });
    else if (row.kind === "member") text = fillTemplate("activity.newMember", { actor: row.actor || "" });
    else if (row.kind === "suggestion") text = fillTemplate("activity.newSuggestion", { actor: row.actor || "?", label: row.label || "" });
    else return;

    const line = document.createElement("div");
    line.className = "activity-row";
    line.innerHTML = `
      <span class="activity-dot"></span>
      <span>
        <div class="activity-text">${escapeHtml(text)}</div>
        <div class="activity-time">${escapeHtml(relativeTime(row.created_at))}</div>
      </span>
    `;
    el.activityContent.appendChild(line);
  });
}

async function loadAll() {
  if (!isConfigured) return;
  await Promise.all([loadStats(), loadLeaderboard(), loadActivity()]);
}

document.addEventListener("vsl:langchange", loadAll);

loadAll();
