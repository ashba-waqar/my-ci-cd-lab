// ============================================
// ÉCRU — index.js
// Mobile menu, search, wishlist, products,
// filters, cart, and newsletter form
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initSearch();
  initWishlist();
  renderProducts();
  initFilters();
  initCart();
  initNewsletter();
});

// ---------- Mobile Menu ----------
function initMobileMenu() {
  const menuBtn = document.querySelector(".menu-btn");
  const mobileNav = document.querySelector(".mobile-nav");
  const closeBtn = mobileNav?.querySelector(".close-btn");

  if (!menuBtn || !mobileNav) return;

  menuBtn.addEventListener("click", () => mobileNav.classList.add("open"));
  closeBtn?.addEventListener("click", () => mobileNav.classList.remove("open"));
  mobileNav.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => mobileNav.classList.remove("open"))
  );
}

// ---------- Search Overlay ----------
function initSearch() {
  const searchBtn = document.querySelector(".search-btn");
  const overlay = document.querySelector(".search-overlay");
  const closeBtn = overlay?.querySelector(".close-btn");
  const input = overlay?.querySelector("input");

  if (!searchBtn || !overlay) return;

  searchBtn.addEventListener("click", () => {
    overlay.classList.add("open");
    input?.focus();
  });
  closeBtn?.addEventListener("click", () => overlay.classList.remove("open"));
}

// ---------- Wishlist Toggle ----------
function initWishlist() {
  const btn = document.querySelector(".wishlist-btn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    const svg = btn.querySelector("svg");
    if (svg) svg.style.fill = btn.classList.contains("active") ? "currentColor" : "none";
  });
}

// ---------- Product Data ----------
const products = [
  { id: 1, name: "Tailored Wool Coat", price: 15900, category: "New Arrivals", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=700&auto=format&fit=crop" },
  { id: 2, name: "Silk Slip Dress", price: 8900, category: "Luxury Pret", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=700&auto=format&fit=crop" },
  { id: 3, name: "Relaxed Linen Shirt", price: 4200, category: "Casual Wear", image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=700&auto=format&fit=crop" },
  { id: 4, name: "Structured Blazer", price: 11500, category: "New Arrivals", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=700&auto=format&fit=crop" },
  { id: 5, name: "Cashmere Knit Sweater", price: 9800, category: "Luxury Pret", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=700&auto=format&fit=crop" },
  { id: 6, name: "Straight Leg Trousers", price: 5600, category: "Casual Wear", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=700&auto=format&fit=crop" },
  { id: 7, name: "Embellished Evening Gown", price: 21500, category: "Luxury Pret", image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=700&auto=format&fit=crop" },
  { id: 8, name: "Cotton Oversized Tee", price: 2400, category: "Casual Wear", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=700&auto=format&fit=crop" },
];

// ---------- Render Products ----------
function renderProducts(filter = "All") {
  const grid = document.querySelector(".product-grid");
  if (!grid) return;

  const filtered = filter === "All" ? products : products.filter((p) => p.category === filter);

  grid.innerHTML = filtered
    .map(
      (p) => `
      <div class="product-card">
        <div class="img-box"><img src="${p.image}" alt="${p.name}" loading="lazy" /></div>
        <h3>${p.name}</h3>
        <p class="price">Rs. ${p.price.toLocaleString()}</p>
        <button class="add-to-cart-btn" data-id="${p.id}">+ Add to Cart</button>
      </div>
    `
    )
    .join("");

  grid.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => addToCart(parseInt(btn.dataset.id)));
  });
}

// ---------- Filters ----------
function initFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderProducts(btn.dataset.category);
    });
  });
}

// ---------- Cart ----------
let cart = JSON.parse(localStorage.getItem("ecru-cart")) || [];

function initCart() {
  const cartIcon = document.querySelector(".cart-icon");
  const cartPanel = document.querySelector(".cart-panel");
  const backdrop = document.querySelector(".cart-backdrop");
  const closeBtn = cartPanel?.querySelector(".close-btn");

  updateCartUI();

  cartIcon?.addEventListener("click", () => toggleCart(true));
  closeBtn?.addEventListener("click", () => toggleCart(false));
  backdrop?.addEventListener("click", () => toggleCart(false));

  function toggleCart(open) {
    cartPanel?.classList.toggle("open", open);
    backdrop?.classList.toggle("open", open);
  }
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  const existing = cart.find((item) => item.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ ...product, qty: 1 });

  saveCart();
  updateCartUI();
  document.querySelector(".cart-panel")?.classList.add("open");
  document.querySelector(".cart-backdrop")?.classList.add("open");
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem("ecru-cart", JSON.stringify(cart));
}

function updateCartUI() {
  const countEl = document.querySelector(".cart-count");
  const itemsEl = document.querySelector(".cart-items");
  const totalEl = document.querySelector(".cart-total");

  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.qty * i.price, 0);

  if (countEl) countEl.textContent = totalQty;
  if (totalEl) totalEl.textContent = `Rs. ${totalPrice.toLocaleString()}`;

  if (itemsEl) {
    itemsEl.innerHTML = cart.length
      ? cart
          .map(
            (item) => `
        <div class="cart-item">
          <span>${item.name} × ${item.qty}</span>
          <span>Rs. ${(item.price * item.qty).toLocaleString()}</span>
          <button class="remove-btn" data-id="${item.id}">&times;</button>
        </div>
      `
          )
          .join("")
      : `<p style="color:var(--gray); font-size:0.9rem;">Your bag is empty.</p>`;

    itemsEl.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", () => removeFromCart(parseInt(btn.dataset.id)));
    });
  }
}

// ---------- Newsletter ----------
function initNewsletter() {
  const form = document.querySelector(".newsletter-form");
  const msg = document.querySelector(".newsletter-msg");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector("input");
    if (input && input.value.trim()) {
      msg.textContent = "Thanks — you're on the list.";
      input.value = "";
    } else {
      msg.textContent = "Please enter a valid email.";
    }
  });
}