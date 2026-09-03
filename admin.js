// =============================================================
// VirtualSkyList — Admin page
// Gates on: signed in AND present in the `admins` table (checked
// server-side via RLS regardless — this gate is just UX, the real
// enforcement is the `is_admin()` policies in schema.sql).
// Provides CRUD for tier_lists and their tier_list_items.
// =============================================================
import { supabase, isConfigured } from "./supabase-config.js";

const t = (key) => (window.VSL_I18N ? window.VSL_I18N.t(key) : key);

const el = {
  stateMsg: document.getElementById("admin-state-msg"),
  gate: document.getElementById("admin-gate"),
  gateIcon: document.getElementById("admin-gate-icon"),
  gateTitle: document.getElementById("admin-gate-title"),
  gateBody: document.getElementById("admin-gate-body"),
  gateCta: document.getElementById("admin-gate-cta"),
  content: document.getElementById("admin-content"),

  addTlBtn: document.getElementById("admin-add-tl-btn"),
  tlForm: document.getElementById("admin-tl-form"),
  tlFormId: document.getElementById("tl-form-id"),
  tlFormSlug: document.getElementById("tl-form-slug"),
  tlFormCategory: document.getElementById("tl-form-category"),
  tlFormTitleFr: document.getElementById("tl-form-title-fr"),
  tlFormTitleEn: document.getElementById("tl-form-title-en"),
  tlFormDescFr: document.getElementById("tl-form-desc-fr"),
  tlFormDescEn: document.getElementById("tl-form-desc-en"),
  tlFormImage: document.getElementById("tl-form-image"),
  tlFormCancel: document.getElementById("tl-form-cancel"),
  tlList: document.getElementById("admin-tl-list"),

  suggestTierlists: document.getElementById("admin-suggest-tierlists"),
  suggestAircraft: document.getElementById("admin-suggest-aircraft"),

  clashForm: document.getElementById("clash-form"),
  clashTitleFr: document.getElementById("clash-title-fr"),
  clashTitleEn: document.getElementById("clash-title-en"),
  clashItemAName: document.getElementById("clash-item-a-name"),
  clashItemBName: document.getElementById("clash-item-b-name"),
  clashItemAImage: document.getElementById("clash-item-a-image"),
  clashItemBImage: document.getElementById("clash-item-b-image"),
};

let expandedId = null;
let itemsCache = new Map(); // tierListId -> items[]

/* =============================================================
   Toast (same pattern as the other pages, kept local to this module)
   ============================================================= */
let toastTimer = null;
function showToast(msg) {
  const toastEl = document.getElementById("toast");
  const toastTextEl = document.getElementById("toast-text");
  if (!toastEl || !toastTextEl) return;
  toastTextEl.textContent = msg;
  toastEl.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("is-visible"), 3200);
}

/* =============================================================
   Gate: signed in + admin check
   ============================================================= */
function showGate({ icon = "i-shield", title, body, showCta = false }) {
  el.stateMsg.style.display = "none";
  el.content.style.display = "none";
  el.gate.style.display = "block";
  el.gateIcon.innerHTML = `<use href="#${icon}"/>`;
  el.gateTitle.textContent = title;
  el.gateBody.textContent = body;
  el.gateCta.style.display = showCta ? "inline-flex" : "none";
}

async function checkAccessAndInit() {
  if (!isConfigured) {
    showGate({
      icon: "i-shield",
      title: t("admin.gate.notAdmin.title"),
      body: t("admin.notConfigured"),
    });
    return;
  }

  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) {
    showGate({
      icon: "i-login",
      title: t("admin.gate.needLogin.title"),
      body: t("admin.gate.needLogin.body"),
      showCta: true,
    });
    return;
  }

  const { data: adminRow } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", session.user.id)
    .maybeSingle();

  if (!adminRow) {
    showGate({
      icon: "i-shield",
      title: t("admin.gate.notAdmin.title"),
      body: t("admin.gate.notAdmin.body"),
    });
    return;
  }

  el.stateMsg.style.display = "none";
  el.gate.style.display = "none";
  el.content.style.display = "block";
  loadTierLists();
  loadSuggestions();
  loadClash();
}

/* =============================================================
   Section tabs (Tier lists / Suggestions / The Clash)
   ============================================================= */
const sectionTabs = document.querySelector('.filter-tabs[data-group="admin-section"]');
sectionTabs?.addEventListener("tabchange", (e) => {
  document.querySelectorAll(".admin-section").forEach((section) => {
    section.style.display = section.dataset.section === e.detail.value ? "block" : "none";
  });
});

el.gateCta?.addEventListener("click", () => window.VSL_AUTH?.openModal("signin"));

// Re-check whenever auth state changes (sign in/out from the header menu)
if (isConfigured) {
  supabase.auth.onAuthStateChange(() => checkAccessAndInit());
}

/* =============================================================
   Tier list CRUD
   ============================================================= */
async function loadTierLists() {
  const { data, error } = await supabase.from("tier_lists").select("*").order("title_fr");
  if (error) {
    showToast(t("admin.loadError"));
    return;
  }
  renderTierLists(data || []);
}

function renderTierLists(lists) {
  el.tlList.innerHTML = "";
  lists.forEach((tl) => {
    const row = document.createElement("div");
    row.className = "admin-row";
    row.innerHTML = `
      <div class="admin-row-main">
        <div class="admin-row-title">${escapeHtml(tl.title_fr)}</div>
        <div class="admin-row-sub">${escapeHtml(tl.slug)}</div>
      </div>
      <div class="admin-row-actions">
        <button type="button" class="admin-icon-btn" data-action="expand" title="${t("admin.items.title")}">
          <svg class="icon"><use href="#i-chevron-down"/></svg>
        </button>
        <button type="button" class="admin-icon-btn" data-action="edit" title="${t("admin.edit")}">
          <svg class="icon"><use href="#i-edit"/></svg>
        </button>
        <button type="button" class="admin-icon-btn is-danger" data-action="delete" title="${t("admin.delete")}">
          <svg class="icon"><use href="#i-trash"/></svg>
        </button>
      </div>
    `;
    row.querySelector('[data-action="edit"]').addEventListener("click", () => openTlForm(tl));
    row.querySelector('[data-action="delete"]').addEventListener("click", () => deleteTierList(tl));
    row.querySelector('[data-action="expand"]').addEventListener("click", () => toggleItemsPanel(tl, row));
    el.tlList.appendChild(row);

    if (expandedId === tl.id) {
      const panel = buildItemsPanel(tl);
      el.tlList.insertBefore(panel, row.nextSibling);
      loadItems(tl.id, panel);
    }
  });
}

function escapeHtml(str) {
  const d = document.createElement("div");
  d.textContent = str ?? "";
  return d.innerHTML;
}

function openTlForm(tl) {
  el.tlFormId.value = tl?.id || "";
  el.tlFormSlug.value = tl?.slug || "";
  el.tlFormSlug.disabled = !!tl; // slug is the stable key items/rankings key off of — lock it once created
  el.tlFormCategory.value = tl?.category || "airliners";
  el.tlFormTitleFr.value = tl?.title_fr || "";
  el.tlFormTitleEn.value = tl?.title_en || "";
  el.tlFormDescFr.value = tl?.desc_fr || "";
  el.tlFormDescEn.value = tl?.desc_en || "";
  el.tlFormImage.value = tl?.image_url || "";
  el.tlForm.style.display = "block";
  el.tlFormSlug.scrollIntoView({ behavior: "smooth", block: "center" });
}

function closeTlForm() {
  el.tlForm.style.display = "none";
  el.tlForm.reset();
  el.tlFormSlug.disabled = false;
}

el.addTlBtn?.addEventListener("click", () => openTlForm(null));
el.tlFormCancel?.addEventListener("click", closeTlForm);

el.tlForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = el.tlFormId.value || undefined;
  const payload = {
    slug: el.tlFormSlug.value.trim(),
    category: el.tlFormCategory.value,
    title_fr: el.tlFormTitleFr.value.trim(),
    title_en: el.tlFormTitleEn.value.trim(),
    desc_fr: el.tlFormDescFr.value.trim() || null,
    desc_en: el.tlFormDescEn.value.trim() || null,
    image_url: el.tlFormImage.value.trim() || null,
  };
  if (id) payload.id = id;

  const { error } = await supabase.from("tier_lists").upsert(payload, { onConflict: "id" });
  if (error) {
    showToast(error.message || t("admin.loadError"));
    return;
  }
  showToast(t("admin.saved"));
  closeTlForm();
  loadTierLists();
});

async function deleteTierList(tl) {
  if (!window.confirm(t("admin.confirmDeleteList"))) return;
  const { error } = await supabase.from("tier_lists").delete().eq("id", tl.id);
  if (error) {
    showToast(error.message || t("admin.loadError"));
    return;
  }
  showToast(t("admin.deleted"));
  loadTierLists();
}

/* =============================================================
   Items CRUD (nested under an expanded tier list)
   ============================================================= */
function toggleItemsPanel(tl, row) {
  const existing = row.nextSibling;
  if (expandedId === tl.id) {
    expandedId = null;
    existing?.remove();
    return;
  }
  document.querySelectorAll(".admin-items-panel").forEach((p) => p.remove());
  expandedId = tl.id;
  const panel = buildItemsPanel(tl);
  row.after(panel);
  loadItems(tl.id, panel);
}

function buildItemsPanel(tl) {
  const panel = document.createElement("div");
  panel.className = "admin-items-panel";
  panel.dataset.tierListId = tl.id;
  panel.innerHTML = `
    <div class="admin-empty-row" data-role="items-list">${t("builder.loading")}</div>
    <div class="form-row" style="margin-top:10px">
      <input class="field" type="text" data-role="new-item-name" placeholder="${t("admin.field.name")}">
      <input class="field" type="text" data-role="new-item-subtitle" placeholder="${t("admin.field.subtitle")}" style="max-width:200px">
      <button type="button" class="btn btn-outline btn-sm" data-role="add-item">
        <svg class="icon"><use href="#i-plus-circle"/></svg>
      </button>
    </div>
  `;
  panel.querySelector('[data-role="add-item"]').addEventListener("click", () => addItem(tl.id, panel));
  return panel;
}

async function loadItems(tierListId, panel) {
  const { data, error } = await supabase
    .from("tier_list_items")
    .select("*")
    .eq("tier_list_id", tierListId)
    .order("sort_order");

  const listEl = panel.querySelector('[data-role="items-list"]');
  if (error) {
    listEl.textContent = t("admin.loadError");
    return;
  }
  itemsCache.set(tierListId, data || []);
  renderItems(tierListId, panel);
}

function renderItems(tierListId, panel) {
  const items = itemsCache.get(tierListId) || [];
  const listEl = panel.querySelector('[data-role="items-list"]');
  listEl.innerHTML = "";

  if (!items.length) {
    listEl.className = "admin-empty-row";
    listEl.textContent = t("admin.noItems");
    return;
  }
  listEl.className = "admin-list";

  items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "admin-row";
    row.innerHTML = `
      <div class="admin-row-main">
        <div class="admin-row-title">${escapeHtml(item.name)}</div>
        ${item.subtitle ? `<div class="admin-row-sub">${escapeHtml(item.subtitle)}</div>` : ""}
      </div>
      <div class="admin-row-actions">
        <button type="button" class="admin-icon-btn" data-action="edit-item" title="${t("admin.edit")}">
          <svg class="icon"><use href="#i-edit"/></svg>
        </button>
        <button type="button" class="admin-icon-btn is-danger" data-action="delete-item" title="${t("admin.delete")}">
          <svg class="icon"><use href="#i-trash"/></svg>
        </button>
      </div>
    `;
    row.querySelector('[data-action="delete-item"]').addEventListener("click", () => deleteItem(item, tierListId, panel));
    row.querySelector('[data-action="edit-item"]').addEventListener("click", () => editItemInline(item, row, tierListId, panel));
    listEl.appendChild(row);
  });
}

function editItemInline(item, row, tierListId, panel) {
  row.innerHTML = `
    <div class="admin-row-main">
      <div class="form-row" style="margin:0">
        <input class="field" type="text" value="${escapeHtml(item.name)}" data-role="edit-name">
        <input class="field" type="text" value="${escapeHtml(item.subtitle || "")}" data-role="edit-subtitle" style="max-width:180px">
      </div>
    </div>
    <div class="admin-row-actions">
      <button type="button" class="admin-icon-btn" data-action="save-item"><svg class="icon"><use href="#i-check-circle"/></svg></button>
      <button type="button" class="admin-icon-btn" data-action="cancel-item"><svg class="icon"><use href="#i-x"/></svg></button>
    </div>
  `;
  row.querySelector('[data-action="cancel-item"]').addEventListener("click", () => renderItems(tierListId, panel));
  row.querySelector('[data-action="save-item"]').addEventListener("click", async () => {
    const name = row.querySelector('[data-role="edit-name"]').value.trim();
    const subtitle = row.querySelector('[data-role="edit-subtitle"]').value.trim();
    if (!name) return;
    const { error } = await supabase
      .from("tier_list_items")
      .update({ name, subtitle: subtitle || null })
      .eq("id", item.id);
    if (error) {
      showToast(error.message || t("admin.loadError"));
      return;
    }
    showToast(t("admin.saved"));
    loadItems(tierListId, panel);
  });
}

async function addItem(tierListId, panel) {
  const nameInput = panel.querySelector('[data-role="new-item-name"]');
  const subInput = panel.querySelector('[data-role="new-item-subtitle"]');
  const name = nameInput.value.trim();
  if (!name) return;
  const subtitle = subInput.value.trim();
  const existing = itemsCache.get(tierListId) || [];
  const nextOrder = existing.length ? Math.max(...existing.map((i) => i.sort_order || 0)) + 1 : 1;

  const { error } = await supabase
    .from("tier_list_items")
    .insert({ tier_list_id: tierListId, name, subtitle: subtitle || null, sort_order: nextOrder });
  if (error) {
    showToast(error.message || t("admin.loadError"));
    return;
  }
  nameInput.value = "";
  subInput.value = "";
  showToast(t("admin.saved"));
  loadItems(tierListId, panel);
}

async function deleteItem(item, tierListId, panel) {
  if (!window.confirm(t("admin.confirmDeleteItem"))) return;
  const { error } = await supabase.from("tier_list_items").delete().eq("id", item.id);
  if (error) {
    showToast(error.message || t("admin.loadError"));
    return;
  }
  showToast(t("admin.deleted"));
  loadItems(tierListId, panel);
}

/* =============================================================
   Suggestions review
   ============================================================= */
async function loadSuggestions() {
  const { data, error } = await supabase
    .from("suggestions")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    showToast(t("admin.loadError"));
    return;
  }
  const all = data || [];
  renderSuggestionList(el.suggestTierlists, all.filter((s) => s.kind === "tierlist"));
  renderSuggestionList(el.suggestAircraft, all.filter((s) => s.kind === "aircraft"));
}

function renderSuggestionList(container, rows) {
  container.innerHTML = "";
  if (!rows.length) {
    const empty = document.createElement("div");
    empty.className = "admin-empty-row";
    empty.textContent = t("admin.suggestions.empty");
    container.appendChild(empty);
    return;
  }
  rows.forEach((s) => {
    const row = document.createElement("div");
    row.className = "admin-row";
    row.innerHTML = `
      <div class="admin-row-main">
        <div class="admin-row-title">${escapeHtml(s.name)}</div>
        <div class="admin-row-sub">${escapeHtml(s.category || "")}</div>
      </div>
      <div class="admin-row-actions">
        <button type="button" class="admin-icon-btn is-danger" data-action="dismiss" title="${t("admin.delete")}">
          <svg class="icon"><use href="#i-trash"/></svg>
        </button>
      </div>
    `;
    row.querySelector('[data-action="dismiss"]').addEventListener("click", async () => {
      const { error } = await supabase.from("suggestions").delete().eq("id", s.id);
      if (error) {
        showToast(error.message || t("admin.loadError"));
        return;
      }
      loadSuggestions();
    });
    container.appendChild(row);
  });
}

/* =============================================================
   The Clash — admin sets the current round
   ============================================================= */
async function loadClash() {
  const { data } = await supabase
    .from("clash_rounds")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (data) {
    el.clashTitleFr.value = data.title_fr || "";
    el.clashTitleEn.value = data.title_en || "";
    el.clashItemAName.value = data.item_a_name || "";
    el.clashItemBName.value = data.item_b_name || "";
    el.clashItemAImage.value = data.item_a_image_url || "";
    el.clashItemBImage.value = data.item_b_image_url || "";
  }
}

el.clashForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Only one active round at a time: deactivate any existing ones,
  // then insert the new round as the active one.
  await supabase.from("clash_rounds").update({ is_active: false }).eq("is_active", true);

  const { error } = await supabase.from("clash_rounds").insert({
    title_fr: el.clashTitleFr.value.trim(),
    title_en: el.clashTitleEn.value.trim(),
    item_a_name: el.clashItemAName.value.trim(),
    item_a_image_url: el.clashItemAImage.value.trim() || null,
    item_b_name: el.clashItemBName.value.trim(),
    item_b_image_url: el.clashItemBImage.value.trim() || null,
    is_active: true,
  });

  if (error) {
    showToast(error.message || t("admin.loadError"));
    return;
  }
  showToast(t("admin.saved"));
});

checkAccessAndInit();
