import ProductData from "./ProductData.mjs";

const productList = document.querySelector("#product-list");
const params = new URLSearchParams(window.location.search);
const query = params.get("q");

const dataSource = new ProductData("tents"); // search tents category

async function loadProducts() {
  if (!query || !productList) return;

  const products = await dataSource.getData();

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
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
        <a href="/product_pages/${product.id}.html">
          <img src="${product.image}" alt="${product.name}" />
          <h3>${product.brand}</h3>
          <h2>${product.name}</h2>
          <p>$${product.price}</p>
        </a>
      </li>
    `
    )
    .join("");
}

loadProducts();
