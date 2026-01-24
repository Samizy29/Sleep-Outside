const productList = document.querySelector("#product-list");
const params = new URLSearchParams(window.location.search);
const query = params.get("q")?.toLowerCase();

const files = [
  "/src/json/tents.json",
  "/src/json/backpacks.json",
  "/src/json/sleeping-bags.json"
];

async function loadProducts() {
  if (!query) {
    productList.innerHTML = "<p>Please enter a search term.</p>";
    return;
  }

  try {
    const responses = await Promise.all(
      files.map((file) => fetch(file).then((res) => res.json()))
    );

    const allProducts = responses.flatMap((data) => data.Result || []);

    const matches = allProducts.filter((product) =>
      product.Name.toLowerCase().includes(query)
    );

    renderProducts(matches);
  } catch (error) {
    productList.innerHTML = "<p>Error loading products.</p>";
    console.error(error);
  }
}

function renderProducts(products) {
  if (products.length === 0) {
    productList.innerHTML = "<p>No products found.</p>";
    return;
  }

  productList.innerHTML = products
    .map(
      (product) => `
      <li class="product-card">
        <img
          src="${product.Images.PrimaryMedium}"
          alt="${product.Name}"
          loading="lazy"
        />
        <h3>${product.Brand.Name}</h3>
        <h2>${product.Name}</h2>
        <p>$${product.FinalPrice}</p>
      </li>
    `
    )
    .join("");
}

loadProducts();
