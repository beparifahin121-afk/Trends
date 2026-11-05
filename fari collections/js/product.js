const SIZES = ["XS", "S", "M", "L", "XL"];
let selectedSize = "M";

function currentProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || PRODUCTS[0].id;
  return getProductById(id) || PRODUCTS[0];
}

function renderProductDetail() {
  const p = currentProduct();
  const mount = document.querySelector("#product-detail");
  if (!mount) return;

  document.title = `${p.name} — Thread Row Style`;
  const showSizes = p.category !== "Accessories";

  mount.innerHTML = `
    <div class="pd-media">
      <img src="${p.image}" alt="${p.name}, ${p.category.toLowerCase()} apparel from Thread Row">
      <span class="tag">$${p.price}</span>
    </div>
    <div class="pd-info">
      <span class="eyebrow">${p.brand}</span>
      <h1>${p.name}</h1>
      <div class="pd-price">$${p.price}</div>
      <p>${p.description}</p>
      <div class="pd-meta">
        <span>Category: ${p.category}</span>
      </div>
      ${showSizes ? `
        <div>
          <label class="eyebrow" style="display:block; margin-bottom:8px;">Size</label>
          <div class="size-row" id="size-row">
            ${SIZES.map(s => `<button type="button" class="size-chip ${s === selectedSize ? "active" : ""}" data-size="${s}">${s}</button>`).join("")}
          </div>
        </div>
      ` : ""}
      <div class="qty-row">
        <div class="qty-control">
          <button type="button" id="qty-minus" aria-label="Decrease quantity">–</button>
          <input type="text" id="qty-input" value="1" inputmode="numeric" aria-label="Quantity">
          <button type="button" id="qty-plus" aria-label="Increase quantity">+</button>
        </div>
        <button class="btn" id="add-to-cart-btn">Add to cart</button>
      </div>
      <p class="pd-note">Free shipping on orders over $75. Easy 30-day returns on eligible items.</p>
    </div>
  `;

  const qtyInput = mount.querySelector("#qty-input");
  mount.querySelector("#qty-minus").addEventListener("click", () => {
    qtyInput.value = Math.max(1, parseInt(qtyInput.value || "1", 10) - 1);
  });
  mount.querySelector("#qty-plus").addEventListener("click", () => {
    qtyInput.value = parseInt(qtyInput.value || "1", 10) + 1;
  });

  const sizeRow = mount.querySelector("#size-row");
  if (sizeRow) {
    sizeRow.addEventListener("click", e => {
      const chip = e.target.closest(".size-chip");
      if (!chip) return;
      sizeRow.querySelectorAll(".size-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      selectedSize = chip.dataset.size;
    });
  }

  mount.querySelector("#add-to-cart-btn").addEventListener("click", () => {
    const qty = Math.max(1, parseInt(qtyInput.value || "1", 10));
    const size = showSizes ? selectedSize : "One Size";
    addToCart(p.id, qty, size);
    showToast(`Added ${p.name} (${size}) to your cart`);
  });
}

function renderRelated() {
  const p = currentProduct();
  const mount = document.querySelector("#related-grid");
  if (!mount) return;
  const related = PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
  const fallback = related.length ? related : PRODUCTS.filter(x => x.id !== p.id).slice(0, 4);
  mount.innerHTML = fallback.map(r => `
    <article class="card">
      <a class="card-link" href="product.html?id=${r.id}">
        <div class="card-media"><img src="${r.image}" alt="${r.name}" loading="lazy"></div>
        <div class="card-body">
          <span class="card-cat">${r.category}</span>
          <h3 class="card-title">${r.name}</h3>
          <span class="card-price">$${r.price}</span>
        </div>
      </a>
    </article>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderProductDetail();
  renderRelated();
});
