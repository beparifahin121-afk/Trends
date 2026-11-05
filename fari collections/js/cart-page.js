function renderCartPage() {
  const cart = getCart();
  const listMount = document.querySelector("#cart-list");
  const layout = document.querySelector("#cart-layout");
  const emptyState = document.querySelector("#cart-empty");
  if (!listMount) return;

  if (cart.length === 0) {
    layout.style.display = "none";
    emptyState.style.display = "block";
    return;
  }
  layout.style.display = "grid";
  emptyState.style.display = "none";

  listMount.innerHTML = cart.map(item => {
    const p = getProductById(item.id);
    if (!p) return "";
    return `
      <div class="cart-row" data-id="${p.id}" data-size="${item.size}">
        <img src="${p.image}" alt="${p.name}">
        <div>
          <span class="row-cat">${p.category} · Size ${item.size}</span>
          <h4>${p.name}</h4>
        </div>
        <div class="qty-control row-qty">
          <button type="button" class="row-minus" aria-label="Decrease quantity">–</button>
          <input type="text" class="row-qty-input" value="${item.qty}" inputmode="numeric" aria-label="Quantity">
          <button type="button" class="row-plus" aria-label="Increase quantity">+</button>
        </div>
        <div class="row-price">$${(p.price * item.qty).toFixed(2)}</div>
        <button class="remove-btn row-remove" type="button">Remove</button>
      </div>
    `;
  }).join("");

  renderSummary();
}

function renderSummary() {
  const subtotal = cartTotal();
  const shipping = subtotal === 0 ? 0 : (subtotal >= 75 ? 0 : 8);
  const total = subtotal + shipping;
  const summary = document.querySelector("#cart-summary");
  if (!summary) return;
  summary.innerHTML = `
    <h3>Order summary</h3>
    <div class="summary-row"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
    <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? "Free" : "$" + shipping.toFixed(2)}</span></div>
    <div class="summary-row total"><span>Total</span><span>$${total.toFixed(2)}</span></div>
    <button class="btn btn-block" id="checkout-btn" style="margin-top:18px;">Checkout</button>
    <p class="form-note">Checkout is a demo — no payment is processed.</p>
  `;
  const checkoutBtn = summary.querySelector("#checkout-btn");
  checkoutBtn.addEventListener("click", () => {
    showToast("This is a student project demo — no real order was placed.");
  });
}

function initCartListEvents() {
  const listMount = document.querySelector("#cart-list");
  if (!listMount) return;
  listMount.addEventListener("click", e => {
    const row = e.target.closest(".cart-row");
    if (!row) return;
    const id = row.dataset.id;
    const size = row.dataset.size;

    if (e.target.classList.contains("row-remove")) {
      removeFromCart(id, size);
      renderCartPage();
    }
    if (e.target.classList.contains("row-minus") || e.target.classList.contains("row-plus")) {
      const input = row.querySelector(".row-qty-input");
      let val = parseInt(input.value || "1", 10);
      val = e.target.classList.contains("row-minus") ? Math.max(1, val - 1) : val + 1;
      updateQty(id, size, val);
      renderCartPage();
    }
  });
  listMount.addEventListener("change", e => {
    if (!e.target.classList.contains("row-qty-input")) return;
    const row = e.target.closest(".cart-row");
    const id = row.dataset.id;
    const size = row.dataset.size;
    const val = Math.max(1, parseInt(e.target.value || "1", 10));
    updateQty(id, size, val);
    renderCartPage();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCartPage();
  initCartListEvents();
});
