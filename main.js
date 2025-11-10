// Sample product data
const products = [
  { id: 1, name: "Smartphone", price: 699, image: "https://via.placeholder.com/200x150" },
  { id: 2, name: "Laptop", price: 999, image: "https://via.placeholder.com/200x150" },
  { id: 3, name: "Headphones", price: 199, image: "https://via.placeholder.com/200x150" },
  { id: 4, name: "Smartwatch", price: 249, image: "https://via.placeholder.com/200x150" }
];

let cart = [];

function renderProducts() {
  const productList = document.getElementById("product-list");
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
  const product = products.find(p => p.id === productId);
  cart.push(product);
  updateCart();
}

function updateCart() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById("cart-count").textContent = cart.length;
  document.getElementById("cart-total").textContent = total.toFixed(2);
}

// Initialize
renderProducts();
