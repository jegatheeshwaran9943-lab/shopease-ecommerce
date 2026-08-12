// ==============================
// PRODUCT DETAILS
// ==============================

document.addEventListener("DOMContentLoaded", function () {

    const container = document.getElementById("product-details");

    // Get product ID from URL
    const params = new URLSearchParams(window.location.search);
    const productId = Number(params.get("id"));

    // Find product
    const product = products.find(p => p.id === productId);

    if (!product) {
        container.innerHTML = `
            <div class="alert alert-danger">
                Product not found!
            </div>
        `;
        return;
    }

    container.innerHTML = `

        <div class="row">

            <!-- Product Image -->
            <div class="col-md-6">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="img-fluid product-image"
                >

            </div>

            <!-- Product Details -->
            <div class="col-md-6">

                <h1>${product.name}</h1>

                <hr>

                <p>
                    <strong>Brand:</strong>
                    ${product.brand}
                </p>

                <p>
                    <strong>Category:</strong>
                    ${product.category}
                </p>

                <p>
                    <strong>Size:</strong>
                    ${product.size}
                </p>

                <p>
                    <strong>Description:</strong>
                    ${product.description}
                </p>

                <p>
                    <strong>Stock:</strong>
                    ${product.stock}
                </p>

                <p class="rating">
                    ${"⭐".repeat(product.rating)}
                </p>

                <h2 class="price">
                    ₹${product.price.toLocaleString("en-IN")}
                </h2>

                <button
                    class="btn btn-primary btn-lg w-100 mb-3"
                    onclick="addToCart(${product.id})"
                >
                    🛒 Add to Cart
                </button>

                <button
                    class="btn btn-success btn-lg w-100"
                    onclick="buyNow(${product.id})"
                >
                    🛍️ Buy Now
                </button>

            </div>

        </div>
    `;
});