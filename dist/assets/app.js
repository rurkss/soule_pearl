// 1) Fill this in with YOUR Amazon URLs (affiliate links, your storefront, or direct product links).
// 2) Use YOUR images (recommended) or compliant image URLs you are allowed to use.
// 3) Avoid showing price on the page (Amazon prices change frequently).

const AMAZON_STORE_URL = "https://www.amazon.com/"; // TODO: put your storefront link here

const products = [
  {
    id: "studs-silver-7mm",
    name: "Pearl Stud Earrings (Sterling Silver)",
    subtitle: "Classic white pearls • Gift-ready",
    amazonUrl: "https://www.amazon.com/", // TODO: paste your product link
    imageUrl: "https://via.placeholder.com/900x900.png?text=Your+Product+Image", // TODO: replace
    tags: ["Best seller", "Sterling silver"],
    featured: true,
    createdAt: "2026-02-01",
  },
  {
    id: "studs-gold-7mm",
    name: "Pearl Stud Earrings (Gold Tone)",
    subtitle: "Elegant everyday studs",
    amazonUrl: "https://www.amazon.com/",
    imageUrl: "https://via.placeholder.com/900x900.png?text=Your+Product+Image",
    tags: ["Gift", "Everyday"],
    featured: false,
    createdAt: "2026-01-20",
  },
  {
    id: "backs-spares",
    name: "Spare Butterfly Backs",
    subtitle: "Comfortable secure fit",
    amazonUrl: "https://www.amazon.com/",
    imageUrl: "https://via.placeholder.com/900x900.png?text=Your+Product+Image",
    tags: ["Accessories"],
    featured: false,
    createdAt: "2025-12-10",
  },
];

const $ = (sel) => document.querySelector(sel);

function normalize(s) {
  return (s || "").toLowerCase().trim();
}

function render(list) {
  const grid = $("#grid");
  grid.innerHTML = "";

  if (!list.length) {
    grid.innerHTML = `<div class="small">No products match your search.</div>`;
    return;
  }

  for (const p of list) {
    const el = document.createElement("article");
    el.className = "card";
    el.innerHTML = `
      <div class="thumb">
        <img src="${p.imageUrl}" alt="${escapeHtml(p.name)}" loading="lazy" />
      </div>
      <div class="card-body">
        <div class="kicker">${escapeHtml(p.subtitle || "")}</div>
        <div class="title">${escapeHtml(p.name)}</div>
        <div class="tags">
          ${(p.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
        </div>
        <div class="card-actions">
          <a class="btn primary" href="${p.amazonUrl}" target="_blank" rel="noopener">Shop on Amazon</a>
          <a class="btn" href="${p.amazonUrl}" target="_blank" rel="noopener">View details</a>
        </div>
        <div class="small">Purchases are completed on Amazon.</div>
      </div>
    `;
    grid.appendChild(el);
  }
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function applyFilters() {
  const q = normalize($("#search").value);
  const sort = $("#sort").value;

  let list = products.filter(p => {
    const hay = normalize([p.name, p.subtitle, ...(p.tags || [])].join(" "));
    return hay.includes(q);
  });

  if (sort === "featured") {
    list = list.sort((a, b) => (b.featured === true) - (a.featured === true));
  } else if (sort === "newest") {
    list = list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sort === "name") {
    list = list.sort((a, b) => a.name.localeCompare(b.name));
  }

  render(list);
}

function init() {
  $("#year").textContent = new Date().getFullYear();
  $("#amazonStoreBtn").href = AMAZON_STORE_URL;

  // Best seller jump (first featured product)
  const best = products.find(p => p.featured) || products[0];
  $("#bestSellerBtn").addEventListener("click", () => {
    // no-op: anchor already takes user to products
  });

  $("#search").addEventListener("input", applyFilters);
  $("#sort").addEventListener("change", applyFilters);

  applyFilters();
}

init();