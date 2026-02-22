// Put your Amazon Storefront link here:
const AMAZON_STOREFRONT = "https://www.amazon.com/stores/SoulePearl/page/C401D07A-2781-4EC4-9981-CBC24526275F";

// Replace these with your real Amazon product links + your own hosted images (recommended).
// Keep prices OFF the page (Amazon prices change).
const PRODUCTS = [
  {
    id: "studs-silver",
    name: "Pearl Stud Earrings (Sterling Silver)",
    subtitle: "Classic white pearls • Minimal studs",
    url: "https://www.amazon.com/", // TODO
    image: "https://via.placeholder.com/900x900.png?text=Soule+Pearl+Product",
    tags: ["studs", "silver", "gift"],
    best: true,
  },
  {
    id: "studs-gold",
    name: "Pearl Stud Earrings (Gold Tone)",
    subtitle: "Warm finish • Everyday elegance",
    url: "https://www.amazon.com/", // TODO
    image: "https://via.placeholder.com/900x900.png?text=Soule+Pearl+Product",
    tags: ["studs", "gold", "gift"],
    best: true,
  },
  {
    id: "backs",
    name: "Butterfly Back Clutches",
    subtitle: "Secure fit • Comfort wear",
    url: "https://www.amazon.com/", // TODO
    image: "https://via.placeholder.com/900x900.png?text=Soule+Pearl+Product",
    tags: ["accessory", "gift"],
    best: false,
  },
];

const $ = (sel) => document.querySelector(sel);

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function card(p) {
  return `
    <article class="card">
      <a href="${p.url}" target="_blank" rel="noopener">
        <div class="thumb">
          <img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy" />
        </div>
      </a>
      <div class="body">
        <div class="title">${escapeHtml(p.name)}</div>
        <div class="sub">${escapeHtml(p.subtitle || "")}</div>
        <div class="tags">
          ${(p.tags || []).slice(0, 3).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
        </div>
        <div class="cta">
          <a class="btn primary" href="${p.url}" target="_blank" rel="noopener">Shop on Amazon</a>
        </div>
        <div class="small">Checkout on Amazon</div>
      </div>
    </article>
  `;
}

function renderGrid(el, list) {
  el.innerHTML = list.map(card).join("") || `<div class="small">No products found.</div>`;
}

function normalize(s){ return (s || "").toLowerCase().trim(); }

function applyAll() {
  const q = normalize($("#search").value);
  const f = $("#filter").value;

  let list = PRODUCTS.filter(p => {
    const hay = normalize([p.name, p.subtitle, ...(p.tags || [])].join(" "));
    const matchesSearch = hay.includes(q);
    const matchesFilter = f === "all" ? true : (p.tags || []).includes(f);
    return matchesSearch && matchesFilter;
  });

  renderGrid($("#allGrid"), list);
}

function init() {
  $("#year").textContent = new Date().getFullYear();
  $("#storeLink").href = AMAZON_STOREFRONT;

  const best = PRODUCTS.filter(p => p.best);
  renderGrid($("#bestGrid"), best.length ? best : PRODUCTS.slice(0, 4));

  $("#search").addEventListener("input", applyAll);
  $("#filter").addEventListener("change", applyAll);

  // Collection tiles
  document.querySelectorAll("[data-filter]").forEach(el => {
    el.addEventListener("click", () => {
      $("#filter").value = el.getAttribute("data-filter");
      applyAll();
    });
  });

  applyAll();
}

init();