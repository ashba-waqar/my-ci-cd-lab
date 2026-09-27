// ============================================
// Clothing Brand Website - index.js
// Handles: mobile menu, products, cart, slider
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  renderProducts();
  initCart();
  initSlider();
});

// ---------- 1. Mobile Menu Toggle ----------
function initMobileMenu() {
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuBtn.classList.toggle("open");
  });
}

// ---------- 2. Product Data ----------
const products = [
  {
    id: 1,
    name: "Classic White Shirt",
    price: 2500,
    image: "images/shirt-white.jpg",
    category: "Men",
  },
  {
    id: 2,
    name: "Denim Jacket",
    price: 4800,
    image: "images/jacket-denim.jpg",
    category: "Men",
  },
  {
    id: 3,
    name: "Floral Summer Dress",
    price: 3200,
    image: "images/dress-floral.jpg",
    category: "Women",
  },
  {
    id: 4,
    name: "Kids Hoodie",
    price: 1800,
    image: "images/hoodie-kids.jpg",
    category: "Kids",
  },
];

// ---------- 3. Render Products ----------
function renderProducts(filter = "All") {
  const grid = document.querySelector(".product-grid");
  if (!grid) return;

  grid.innerHTML = "";

  const filtered =
    filter === "All" ? products : products.filter((p) => p.category === filter);

  filtered.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p class="price">Rs. ${product.price.toLocaleString()}</p>
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    grid.appendChild(card);
  });

  // attach add-to-cart listeners after render
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      addToCart(id);
    });
  });
}

// Optional category filter buttons: <button data-category="Men">Men</button>
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    renderProducts(btn.dataset.category);
  });
});

// ---------- 4. Cart Logic ----------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function initCart() {
  updateCartUI();

  const cartIcon = document.querySelector(".cart-icon");
  if (cartIcon) {
    cartIcon.addEventListener("click", toggleCartPanel);
  }
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart();
  updateCartUI();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartUI() {
  const cartCount = document.querySelector(".cart-count");
  const cartItemsBox = document.querySelector(".cart-items");
  const cartTotalBox = document.querySelector(".cart-total");

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  if (cartCount) cartCount.textContent = totalQty;
  if (cartTotalBox) cartTotalBox.textContent = `Rs. ${totalPrice.toLocaleString()}`;

  if (cartItemsBox) {
    cartItemsBox.innerHTML = cart
      .map(
        (item) => `
        <div class="cart-item">
          <span>${item.name} x${item.qty}</span>
          <span>Rs. ${(item.price * item.qty).toLocaleString()}</span>
          <button class="remove-btn" data-id="${item.id}">✕</button>
        </div>
      `
      )
      .join("");

    document.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        removeFromCart(parseInt(e.target.dataset.id));
      });
    });
  }
}

function toggleCartPanel() {
  const cartPanel = document.querySelector(".cart-panel");
  if (cartPanel) cartPanel.classList.toggle("open");
}

// ---------- 5. Hero / Banner Slider ----------
function initSlider() {
  const slides = document.querySelectorAll(".slide");
  if (slides.length === 0) return;

  let current = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  showSlide(current);

  setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 4000);
}