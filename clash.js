// =============================================================
// VirtualSkyList — The Clash
// Loads the single active head-to-head round, lets anyone vote
// once (anonymous session id, same approach as tier list voting),
// and shows live results after voting.
// =============================================================
import { supabase, isConfigured } from "./supabase-config.js";

// In-memory only for this preview — see tier-list.js for the same
// note on swapping this for localStorage once self-hosted.
const sessionId = crypto.randomUUID();

const t = (key) => (window.VSL_I18N ? window.VSL_I18N.t(key) : key);
const lang = () => (window.VSL_I18N ? window.VSL_I18N.lang : "fr");

const el = {
  stateMsg: document.getElementById("clash-state-msg"),
  empty: document.getElementById("clash-empty"),
  content: document.getElementById("clash-content"),
  title: document.getElementById("clash-round-title"),
  a: document.getElementById("clash-a"),
  b: document.getElementById("clash-b"),
  aName: document.getElementById("clash-a-name"),
  bName: document.getElementById("clash-b-name"),
  aFill: document.getElementById("clash-a-fill"),
  bFill: document.getElementById("clash-b-fill"),
  aPct: document.getElementById("clash-a-pct"),
  bPct: document.getElementById("clash-b-pct"),
  votedNote: document.getElementById("clash-voted-note"),
};

let currentRound = null;
let hasVoted = false;

function setMedia(button, url) {
  const media = button.querySelector(".clash-contender-media");
  media.innerHTML = url
    ? `<img src="${url.replace(/"/g, "&quot;")}" alt="">`
    : `<svg class="icon"><use href="#i-plane"/></svg>`;
}

function renderRound() {
  el.title.textContent = lang() === "fr" ? currentRound.title_fr : currentRound.title_en;
  el.aName.textContent = currentRound.item_a_name;
  el.bName.textContent = currentRound.item_b_name;
  setMedia(el.a, currentRound.item_a_image_url);
  setMedia(el.b, currentRound.item_b_image_url);
}

async function loadTally() {
  const { data } = await supabase
    .from("clash_tally")
    .select("*")
    .eq("clash_round_id", currentRound.id)
    .maybeSingle();

  const votesA = data?.votes_a || 0;
  const votesB = data?.votes_b || 0;
  const total = votesA + votesB;
  const pctA = total ? Math.round((votesA / total) * 100) : 0;
  const pctB = total ? 100 - pctA : 0;

  el.aFill.style.width = pctA + "%";
  el.bFill.style.width = pctB + "%";
  el.aPct.textContent = pctA + "%";
  el.bPct.textContent = pctB + "%";
}

async function vote(choice) {
  if (hasVoted || !currentRound) return;
  hasVoted = true;
  el.a.classList.add("is-revealed");
  el.b.classList.add("is-revealed");
  (choice === "a" ? el.a : el.b).classList.add("is-voted");
  el.votedNote.classList.add("is-visible");

  const { error } = await supabase
    .from("clash_votes")
    .upsert(
      { clash_round_id: currentRound.id, choice, session_id: sessionId },
      { onConflict: "clash_round_id,session_id" }
    );
  if (!error) await loadTally();
}

el.a?.addEventListener("click", () => vote("a"));
el.b?.addEventListener("click", () => vote("b"));
document.addEventListener("vsl:langchange", () => {
  if (currentRound) renderRound();
});

async function init() {
  if (!isConfigured) {
    el.stateMsg.textContent = t("clash.loadError");
    return;
  }

  const { data: round, error } = await supabase
    .from("clash_rounds")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  el.stateMsg.style.display = "none";

  if (error || !round) {
    el.empty.style.display = "flex";
    return;
  }

  currentRound = round;
  renderRound();
  el.content.style.display = "block";
  await loadTally();
}

init();
