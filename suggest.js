// =============================================================
// VirtualSkyList — Suggest content forms
// Both "Proposer une tier list" and "Proposer un avion" forms
// require a signed-in user (no anonymous suggestions — only
// anonymous *voting* is allowed). Submissions go into the
// `suggestions` table for an admin to review.
// =============================================================
import { supabase, isConfigured } from "./supabase-config.js";

const t = (key) => (window.VSL_I18N ? window.VSL_I18N.t(key) : key);

function showToast(msg) {
  const toastEl = document.getElementById("toast");
  const toastTextEl = document.getElementById("toast-text");
  if (!toastEl || !toastTextEl) return;
  toastTextEl.textContent = msg;
  toastEl.classList.add("is-visible");
  setTimeout(() => toastEl.classList.remove("is-visible"), 3200);
}

function wireForm({ formId, nameId, categoryId, errorId, kind, toastKey }) {
  const form = document.getElementById(formId);
  if (!form) return;
  const nameInput = document.getElementById(nameId);
  const categorySelect = document.getElementById(categoryId);
  const errorEl = document.getElementById(errorId);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorEl.style.display = "none";

    if (!isConfigured) {
      errorEl.textContent = t("admin.notConfigured");
      errorEl.style.display = "block";
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      errorEl.textContent = t("suggest.needLogin");
      errorEl.style.display = "block";
      window.VSL_AUTH?.openModal("signin");
      return;
    }

    const name = nameInput.value.trim();
    if (!name) return;
    const category = categorySelect.value || null;

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;

    const { error } = await supabase.from("suggestions").insert({
      kind,
      name,
      category,
      user_id: session.user.id,
    });

    submitBtn.disabled = false;

    if (error) {
      errorEl.textContent = error.message || t("admin.loadError");
      errorEl.style.display = "block";
      return;
    }

    showToast(t(toastKey));
    form.reset();
  });
}

wireForm({
  formId: "suggest-tierlist-form",
  nameId: "suggest-tierlist-name",
  categoryId: "suggest-tierlist-category",
  errorId: "suggest-tierlist-error",
  kind: "tierlist",
  toastKey: "toast.tierlist",
});

wireForm({
  formId: "suggest-aircraft-form",
  nameId: "suggest-aircraft-name",
  categoryId: "suggest-aircraft-type",
  errorId: "suggest-aircraft-error",
  kind: "aircraft",
  toastKey: "toast.aircraft",
});
