function renderProducts(filter) {
  const grid = document.querySelector("#product-grid");
  if (!grid) return;
  const list = filter && filter !== "All"
    ? PRODUCTS.filter(p => p.category === filter)
    : PRODUCTS;

  grid.innerHTML = list.map(p => `
    <article class="card">
      <a class="card-link" href="product.html?id=${p.id}">
        <div class="card-media">
          <img src="${p.image}" alt="${p.name}, ${p.category.toLowerCase()} apparel from Thread Row" loading="lazy">
        </div>
        <div class="card-body">
          <span class="card-cat">${p.category}</span>
          <h3 class="card-title">${p.name}</h3>
          <span class="card-price">$${p.price}</span>
        </div>
      </a>
    </article>
  `).join("");
}

function initFilterBar() {
  const bar = document.querySelector("#filter-bar");
  if (!bar) return;
  bar.addEventListener("click", e => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    bar.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    renderProducts(chip.dataset.category);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts("All");
  initFilterBar();
});
