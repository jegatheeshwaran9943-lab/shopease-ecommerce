// ==============================
// CART PAGE
// ==============================

document.addEventListener("DOMContentLoaded", function () {

    loadCart();

});


// ==============================
// LOAD CART
// ==============================

function loadCart() {

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const cartContainer =
        document.getElementById("cart-items");

    const totalItems =
        document.getElementById("total-items");

    const subtotal =
        document.getElementById("subtotal");

    const grandTotal =
        document.getElementById("grand-total");

    const cartCount =
        document.getElementById("cart-count");


    // Clear existing items

    cartContainer.innerHTML = "";


    // Empty cart

    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div class="text-center p-5">

                <i
                    class="fa-solid fa-cart-shopping fa-4x text-secondary mb-3">
                </i>

                <h4>
                    Your cart is empty
                </h4>

                <p>
                    Add some products to your cart.
                </p>

                <a
                    href="index.html"
                    class="btn btn-primary">

                    Continue Shopping

                </a>

            </div>

        `;

        totalItems.textContent = 0;
        subtotal.textContent = "₹0";
        grandTotal.textContent = "₹0";

        if (cartCount) {
            cartCount.textContent = 0;
        }

        return;
    }


    // Calculate total

    let total = 0;


    cart.forEach((product, index) => {

        total += product.price;


        cartContainer.innerHTML += `

            <div class="cart-item">

                <div class="row align-items-center">

                    <div class="col-md-2">

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                            class="img-fluid">

                    </div>


                    <div class="col-md-4">

                        <h5 class="cart-title">

                            ${product.name}

                        </h5>

                        <p class="text-muted mb-0">

                            Product ID:
                            ${product.id}

                        </p>

                    </div>


                    <div class="col-md-3">

                        <span class="cart-price">

                            ₹${product.price.toLocaleString()}

                        </span>

                    </div>


                    <div class="col-md-3 text-end">

                        <button
                            class="btn btn-danger remove-btn"
                            onclick="removeFromCart(${index})">

                            <i class="fa-solid fa-trash"></i>

                            Remove

                        </button>

                    </div>

                </div>

            </div>

        `;

    });


    // Update summary

    totalItems.textContent = cart.length;

    subtotal.textContent =
        "₹" + total.toLocaleString();

    grandTotal.textContent =
        "₹" + total.toLocaleString();


    // Update navbar cart count

    if (cartCount) {

        cartCount.textContent =
            cart.length;

    }

}



// ==============================
// REMOVE FROM CART
// ==============================

function removeFromCart(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    cart.splice(index, 1);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    loadCart();

}



// ==============================
// CHECKOUT
// ==============================

document
    .getElementById("checkoutBtn")
    .addEventListener("click", function () {

        const token =
            localStorage.getItem("token");


        if (!token) {

            alert(
                "Please login before checkout."
            );

            window.location.href =
                "login.html";

            return;

        }


        const cart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];


        if (cart.length === 0) {

            alert(
                "Your cart is empty."
            );

            return;

        }


        // Your checkout page
        // can be connected here later

        window.location.href =
            "checkout.html";

    });
