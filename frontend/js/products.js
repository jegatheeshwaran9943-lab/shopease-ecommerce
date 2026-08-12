// =========================
// PRODUCTS
// =========================

const products = [

    {
        id: 1,
        name: "iPhone 16",
        brand: "Apple",
        category: "Smartphone",
        size: "6.1 inch",
        description: "Apple iPhone 16 with advanced camera and powerful performance.",
        price: 79999,
        stock: 20,
        rating: 5,
        image: "images/products/phone.jpg"
    },

    {
        id: 2,
        name: "Gaming Laptop",
        brand: "ASUS",
        category: "Laptop",
        size: "15.6 inch",
        description: "High-performance gaming laptop with powerful graphics and processor.",
        price: 69999,
        stock: 15,
        rating: 4,
        image: "images/products/laptop.jpg"
    },

    {
        id: 3,
        name: "Sports Shoes",
        brand: "Nike",
        category: "Shoes",
        size: "8-11",
        description: "Comfortable sports shoes suitable for running and daily activities.",
        price: 2999,
        stock: 30,
        rating: 4,
        image: "images/products/shoes.jpg"
    },

    {
        id: 4,
        name: "Smart Watch",
        brand: "Samsung",
        category: "Smart Watch",
        size: "44 mm",
        description: "Smart watch with fitness tracking, notifications and modern design.",
        price: 5999,
        stock: 25,
        rating: 5,
        image: "images/products/watch.jpg"
    }

];


// =========================
// DISPLAY PRODUCTS
// =========================

function displayProducts(productArray) {

    const productContainer =
        document.getElementById("product-list");

    if (!productContainer) {
        console.log("Product container not found");
        return;
    }

    // Clear old products
    productContainer.innerHTML = "";


    // No products found
    if (productArray.length === 0) {

        productContainer.innerHTML = `

            <div class="col-12 text-center">

                <h3 class="text-danger">
                    ❌ No Products Found
                </h3>

                <p>
                    Try searching another product.
                </p>

            </div>

        `;

        return;
    }


    // Display products
    productArray.forEach(product => {

        productContainer.innerHTML += `

            <div class="col-lg-3 col-md-6 mb-4">

                <div class="card product-card h-100">

                    <img
                        src="${product.image}"
                        class="card-img-top"
                        alt="${product.name}"
                    >


                    <div class="card-body">

                        <h4 class="product-title">
                            ${product.name}
                        </h4>


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


                        <p class="product-description">
                            ${product.description}
                        </p>


                        <p>
                            <strong>Stock:</strong>
                            ${product.stock}
                        </p>


                        <div class="product-rating mb-2">

                            ${"⭐".repeat(product.rating)}

                        </div>


                        <h5 class="product-price">

                            ₹${product.price.toLocaleString("en-IN")}

                        </h5>


                        <!-- ADD TO CART -->

                        <button
                            class="btn btn-primary w-100 mb-2"
                            onclick="addToCart(${product.id})"
                        >

                            🛒 Add to Cart

                        </button>


                        <!-- BUY NOW -->

                        <button
                            class="btn btn-success w-100"
                            onclick="buyNow(${product.id})"
                        >

                            🛍️ Buy Now

                        </button>

                    </div>

                </div>

            </div>

        `;

    });

}


// =========================
// LOAD PRODUCTS
// =========================

document.addEventListener("DOMContentLoaded", () => {

    displayProducts(products);

    updateCartCount();

});


// =========================
// SEARCH PRODUCTS
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const searchForm =
        document.getElementById("searchForm");

    const searchInput =
        document.getElementById("searchInput");


    if (!searchForm || !searchInput) {

        console.log("Search elements not found");

        return;
    }


    searchForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const searchText =
            searchInput.value.trim().toLowerCase();


        console.log(
            "Searching for:",
            searchText
        );


        // Empty search
        if (searchText === "") {

            displayProducts(products);

            return;
        }


        // Search name, brand, category, description
        const filteredProducts =
            products.filter(product => {

                return (

                    product.name
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    product.brand
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    product.category
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    product.description
                        .toLowerCase()
                        .includes(searchText)

                );

            });


        console.log(
            "Products found:",
            filteredProducts.length
        );


        displayProducts(filteredProducts);

    });

});


// =========================
// Add To Cart
// =========================

function addToCart(id) {

    // Check login
    const token = localStorage.getItem("token");

    if (!token) {

        alert("Please login first to add products to cart.");

        localStorage.setItem("cartProductId", id);

        window.location.href = "login.html";

        return;
    }


    const product = products.find(p => p.id === id);

    if (!product) {
        alert("Product not found!");
        return;
    }


    if (product.stock <= 0) {
        alert("Product is out of stock!");
        return;
    }


    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    // Check whether product already exists
    const existingProduct = cart.find(
        item => item.id === id
    );


    if (existingProduct) {

        existingProduct.quantity =
            (existingProduct.quantity || 1) + 1;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();

    alert(`${product.name} added to cart!`);
}
function buyNow(id) {

    const product = products.find(p => p.id === id);

    if (!product) {
        alert("Product not found!");
        return;
    }

    if (product.stock <= 0) {
        alert("Product is out of stock!");
        return;
    }

    // Check login
    const token = localStorage.getItem("token");

    // =========================
    // USER NOT LOGGED IN
    // =========================

    if (!token) {

        alert("Please login first to buy this product.");

        // Save product
        localStorage.setItem(
            "buyNowProduct",
            JSON.stringify({
                ...product,
                quantity: 1
            })
        );

        // Go to login
        window.location.href = "login.html";

        return;
    }

    // =========================
    // USER ALREADY LOGGED IN
    // =========================

    localStorage.setItem(
        "cart",
        JSON.stringify([
            {
                ...product,
                quantity: 1
            }
        ])
    );

    window.location.href = "checkout.html";
}
// =========================
// UPDATE CART COUNT
// =========================

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const cartCount =
        document.getElementById("cartCount");


    // Your navbar uses cartCount
    if (cartCount) {

        cartCount.textContent =
            cart.reduce(
                (total, item) =>
                    total + (item.quantity || 1),
                0
            );

    }


    // If another page uses cart-count
    const oldCartCount =
        document.getElementById("cart-count");


    if (oldCartCount) {

        oldCartCount.textContent =
            cart.reduce(
                (total, item) =>
                    total + (item.quantity || 1),
                0
            );

    }

}