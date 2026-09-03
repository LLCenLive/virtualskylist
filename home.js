// =============================================================
// VirtualSkyList — Homepage trending carousel
// Real pagination over the live tier list catalog (4 per page),
// replacing the old decorative-only dots.
// =============================================================
import { fetchCatalog, renderCard } from "./catalog.js";

const PAGE_SIZE = 4;

const grid = document.querySelector(".trending-grid");
const dotsBar = document.querySelector(".carousel-dots");
const prevBtn = document.querySelector('.carousel-nav[aria-label="Previous"]');
const nextBtn = document.querySelector('.carousel-nav[aria-label="Next"]');

let items = [];
let page = 0;

function pageCount() {
  return Math.max(1, Math.ceil(items.length / PAGE_SIZE));
}

function renderPage() {
  if (!grid) return;
  grid.innerHTML = "";
  const start = page * PAGE_SIZE;
  items.slice(start, start + PAGE_SIZE).forEach((tl) => grid.appendChild(renderCard(tl)));
  renderDots();
}

function renderDots() {
  if (!dotsBar) return;
  dotsBar.querySelectorAll(".dot").forEach((d) => d.remove());
  const count = pageCount();
  for (let i = 0; i < count; i++) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "dot" + (i === page ? " is-active" : "");
    dot.setAttribute("aria-label", `Page ${i + 1}`);
    dot.addEventListener("click", () => {
      page = i;
      renderPage();
    });
    nextBtn ? nextBtn.before(dot) : dotsBar.appendChild(dot);
  }
  const disablePaging = count <= 1;
  if (prevBtn) prevBtn.style.visibility = disablePaging ? "hidden" : "visible";
  if (nextBtn) nextBtn.style.visibility = disablePaging ? "hidden" : "visible";
}

prevBtn?.addEventListener("click", () => {
  page = (page - 1 + pageCount()) % pageCount();
  renderPage();
});
nextBtn?.addEventListener("click", () => {
  page = (page + 1) % pageCount();
  renderPage();
});

document.addEventListener("vsl:langchange", renderPage);

async function init() {
  items = await fetchCatalog();
  page = 0;
  renderPage();
}

init();
