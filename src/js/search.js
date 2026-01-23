// Product Search Feature
// Retrieves products from the API and displays filtered results

const form = document.querySelector("#search-form");
const input = document.querySelector("#search-input");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = input.value.trim();

    if (query) {
      window.location.href = `/product_pages/search.html?q=${query}`;
    }
  });
}

const productList = document.querySelector("#product-list");
const params = new URLSearchParams(window.location.search);
const query = params.get("q");

async function loadProducts() {
  if (!query || !productList) return;

  const response = await fetch("/json/products.json");
  const products = await response.json();

  const filtered = products.filter((product) =>
    product.Name.toLowerCase().includes(query.toLowerCase())
  );

  displayProducts(filtered);
}

function displayProducts(products) {
  if (products.length === 0) {
    productList.innerHTML = "<p>No products found.</p>";
    return;
  }

  productList.innerHTML = products
    .map(
      (product) => `
      <li class="product-card">
        <img src="/images/${product.Image}" alt="${product.Name}" />
        <h3>${product.Brand}</h3>
        <h2>${product.Name}</h2>
        <p>$${product.Price}</p>
      </li>
    `
    )
    .join("");
}

loadProducts();
