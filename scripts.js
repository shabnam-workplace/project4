const products = [
  { id: 1, name: "Wireless Earbuds", category: "electronics", price: 79, rating: 4.6, image: "assets/image1.jpeg" },
  { id: 2, name: "Lipstick", category: "makeup", price: 25, rating: 4.2, image: "assets/image2.jpeg" },
  { id: 3, name: "Smartphone", category: "electronics", price: 299, rating: 4.8, image: "assets/image3.jpeg" },
  { id: 4, name: "Foundation", category: "makeup", price: 35, rating: 4.5, image: "assets/image4.jpeg" },
  { id: 5, name: "Bluetooth Speaker", category: "electronics", price: 99, rating: 4.7, image: "assets/image5.jpeg" },
  { id: 6, name: "Top", category: "clothes", price: 150, rating: 4.7, image: "assets/image6.jpeg" },
];

const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const priceValue = document.getElementById("priceValue");
const sortRating = document.getElementById("sortRating");
const productContainer = document.getElementById("productContainer");

function displayProducts(filtered) {
  productContainer.innerHTML = "";

  if (filtered.length === 0) {
    productContainer.innerHTML = "<p>No products found.</p>";
    return;
  }

  filtered.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" width="100">
      <h3>${product.name}</h3>
      <p>Category: ${product.category}</p>
      <p>Price: $${product.price}</p>
      <p>Rating: ${product.rating}</p>
    `;
    productContainer.appendChild(card);
  });
}

function filterAndSortProducts() {
  let filtered = [...products];

  const category = categoryFilter.value;
  const maxPrice = parseInt(priceFilter.value);
  const sort = sortRating.value;

  if (category !== "all") {
    filtered = filtered.filter(p => p.category === category);
  }

  filtered = filtered.filter(p => p.price <= maxPrice);

  if (sort === "high") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sort === "low") {
    filtered.sort((a, b) => a.rating - b.rating);
  }

  displayProducts(filtered);
}

// Event listeners
categoryFilter.addEventListener("change", filterAndSortProducts);
priceFilter.addEventListener("input", () => {
  priceValue.textContent = priceFilter.value;
  filterAndSortProducts();
});
sortRating.addEventListener("change", filterAndSortProducts);

// Initial load
displayProducts(products);
