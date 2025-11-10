// Sample product data
const products = [
  { id: 1, name: "Smartphone", price: 699, image: "https://via.placeholder.com/200x150" },
  { id: 2, name: "Laptop", price: 999, image: "https://via.placeholder.com/200x150" },
  { id: 3, name: "Headphones", price: 199, image: "https://via.placeholder.com/200x150" },
  { id: 4, name: "Smartwatch", price: 249, image: "https://via.placeholder.com/200x150" }
];

// ---- Utility Functions ----

// Get cart from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update cart count on all pages
function updateCartCount() {
  const cart = getCart();
  const countElement = document.getElementById("cart-count");
  if (countElement) countElement.textContent = cart.length;
}

// ---- Product Page ----
function renderProducts() {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  productList.innerHTML = "";
  products.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart(productId) {
  const cart = getCart();
  const product = products.find(p => p.id === productId);
  cart.push(product);
  saveCart(cart);
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

// ---- Cart Page ----
function renderCart() {
  const cartItems = document.getElementById("cart-items");
  if (!cartItems) return;

  const cart = getCart();
  let total = 0;
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById("cart-total").textContent = "0.00";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <div>${item.name} - $${item.price}</div>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItems.appendChild(div);
  });

  document.getElementById("cart-total").textContent = total.toFixed(2);
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
  updateCartCount();
}

// ---- Initialization ----
renderProducts();
renderCart();
updateCartCount();
