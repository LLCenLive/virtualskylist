// =============================================================
// VirtualSkyList — Authentication (Supabase Auth)
// Shared across every page: keeps the header's sign-in button /
// user menu in sync with the session, and drives the sign-in /
// sign-up modal. Admin-only page gating lives in admin.js.
// =============================================================
import { supabase, isConfigured } from "./supabase-config.js";

const t = (key) => (window.VSL_I18N ? window.VSL_I18N.t(key) : key);

const el = {
  signinBtn: document.getElementById("signin-btn"),
  userMenu: document.getElementById("user-menu"),
  userChip: document.getElementById("user-chip"),
  userAvatar: document.getElementById("user-avatar"),
  userEmail: document.getElementById("user-email"),
  userDropdown: document.getElementById("user-dropdown"),
  userAdminLink: document.getElementById("user-admin-link"),
  signoutBtn: document.getElementById("signout-btn"),

  modal: document.getElementById("auth-modal"),
  closeBtn: document.getElementById("auth-close-btn"),
  form: document.getElementById("auth-form"),
  title: document.getElementById("auth-modal-title"),
  emailInput: document.getElementById("auth-email"),
  passwordInput: document.getElementById("auth-password"),
  errorEl: document.getElementById("auth-error"),
  noteEl: document.getElementById("auth-note"),
  submitBtn: document.getElementById("auth-submit-btn"),
  toggleModeBtn: document.getElementById("auth-toggle-mode"),
};

let mode = "signin";

function updateModalMode() {
  if (!el.title) return;
  if (mode === "signin") {
    el.title.textContent = t("auth.title.signin");
    el.submitBtn.textContent = t("auth.submit.signin");
    el.toggleModeBtn.textContent = t("auth.switch.toSignup");
  } else {
    el.title.textContent = t("auth.title.signup");
    el.submitBtn.textContent = t("auth.submit.signup");
    el.toggleModeBtn.textContent = t("auth.switch.toSignin");
  }
}

function openModal(initialMode) {
  mode = initialMode || "signin";
  updateModalMode();
  el.errorEl.style.display = "none";
  el.noteEl.style.display = "none";
  el.form.reset();
  el.modal.classList.add("is-open");
  setTimeout(() => el.emailInput?.focus(), 30);
}

function closeModal() {
  el.modal.classList.remove("is-open");
}

function showError(msg) {
  el.errorEl.textContent = msg;
  el.errorEl.style.display = "block";
  el.noteEl.style.display = "none";
}

function showNote(msg) {
  el.noteEl.textContent = msg;
  el.noteEl.style.display = "block";
  el.errorEl.style.display = "none";
}

el.signinBtn?.addEventListener("click", () => openModal("signin"));
el.closeBtn?.addEventListener("click", closeModal);
el.modal?.addEventListener("click", (e) => {
  if (e.target === el.modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

el.toggleModeBtn?.addEventListener("click", () => {
  mode = mode === "signin" ? "signup" : "signin";
  updateModalMode();
  el.errorEl.style.display = "none";
  el.noteEl.style.display = "none";
});

el.form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!isConfigured) {
    showError(t("auth.error.generic"));
    return;
  }
  const email = el.emailInput.value.trim();
  const password = el.passwordInput.value;
  el.submitBtn.disabled = true;

  try {
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      closeModal();
    } else {
      // Explicit redirect target — Supabase's auth server can otherwise
      // mis-derive it from the browser's Referer header, which drops the
      // path on cross-origin requests (breaks GitHub Pages project sites
      // like user.github.io/repo/). Must also be added to Supabase →
      // Authentication → URL Configuration → Redirect URLs.
      const siteDir = window.location.origin + window.location.pathname.split("/").slice(0, -1).join("/") + "/";
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: siteDir },
      });
      if (error) throw error;
      showNote(t("auth.success.signup"));
    }
  } catch (err) {
    showError(err?.message || t("auth.error.generic"));
  } finally {
    el.submitBtn.disabled = false;
  }
});

el.userChip?.addEventListener("click", () => {
  el.userDropdown?.classList.toggle("is-open");
});
document.addEventListener("click", (e) => {
  if (!el.userMenu || el.userMenu.contains(e.target)) return;
  el.userDropdown?.classList.remove("is-open");
});

el.signoutBtn?.addEventListener("click", async () => {
  el.userDropdown?.classList.remove("is-open");
  await supabase?.auth.signOut();
});

/* =============================================================
   Keep the header in sync with the current session
   ============================================================= */
async function refreshAuthUI(session) {
  const loggedIn = !!session?.user;

  if (el.signinBtn) el.signinBtn.style.display = loggedIn ? "none" : "";
  if (el.userMenu) el.userMenu.style.display = loggedIn ? "flex" : "none";
  if (!loggedIn) return;

  const email = session.user.email || "";
  if (el.userEmail) el.userEmail.textContent = email;
  if (el.userAvatar) el.userAvatar.textContent = email.slice(0, 1) || "?";

  if (el.userAdminLink) {
    const { data } = await supabase
      .from("admins")
      .select("user_id")
      .eq("user_id", session.user.id)
      .maybeSingle();
    el.userAdminLink.style.display = data ? "flex" : "none";
  }
}

if (isConfigured) {
  supabase.auth.getSession().then(({ data }) => refreshAuthUI(data.session));
  supabase.auth.onAuthStateChange((_event, session) => refreshAuthUI(session));
}

// Small public API so other page scripts (e.g. admin.js) can open
// the sign-in modal without duplicating this logic.
window.VSL_AUTH = { openModal, closeModal };
