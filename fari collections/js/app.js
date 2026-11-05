/* ============================================
   Shared app logic: cart persistence, nav badge,
   mobile menu toggle, toast notifications.
   Included on every page.
   ============================================ */

const CART_KEY = "thread-row-cart";

let memoryCart = [];
let storageOK = true;
try {
  const t = "__test__";
  window.localStorage.setItem(t, "1");
  window.localStorage.removeItem(t);
} catch (e) {
  storageOK = false;
}

function getCart() {
  if (!storageOK) return memoryCart;
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return memoryCart;
  }
}

function saveCart(cart) {
  if (!storageOK) {
    memoryCart = cart;
    updateCartBadge();
    return;
  }
  try {
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {
    memoryCart = cart;
  }
  updateCartBadge();
}

function addToCart(id, qty, size) {
  qty = qty || 1;
  size = size || "M";
  const cart = getCart();
  const existing = cart.find(item => item.id === id && item.size === size);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, qty, size });
  }
  saveCart(cart);
}

function removeFromCart(id, size) {
  const cart = getCart().filter(item => !(item.id === id && item.size === size));
  saveCart(cart);
}

function updateQty(id, size, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === id && i.size === size);
  if (!item) return;
  item.qty = Math.max(1, qty);
  saveCart(cart);
}

function cartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function cartTotal() {
  return getCart().reduce((sum, item) => {
    const product = getProductById(item.id);
    return product ? sum + product.price * item.qty : sum;
  }, 0);
}

function updateCartBadge() {
  document.querySelectorAll("[data-cart-count]").forEach(el => {
    el.textContent = cartCount();
  });
}

/* --- toast --- */
function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* --- mobile nav toggle --- */
function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    links.classList.toggle("open");
  });
}

/* --- newsletter form (front-end only demo) --- */
function initNewsletterForm() {
  const form = document.querySelector(".newsletter-form");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    showToast("You're on the list — welcome to Thread Row Style.");
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  initNavToggle();
  initNewsletterForm();
});
