// ==============================
// CHECKOUT PAGE
// ==============================

document.addEventListener("DOMContentLoaded", function () {

    console.log("✅ checkout.js loaded");

    // ==============================
    // CHECK LOGIN
    // ==============================

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    // ==============================
    // GET CART
    // ==============================

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    console.log("🛒 CART:", cart);

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    // ==============================
    // CALCULATE TOTAL
    // ==============================

    let totalAmount = 0;

    cart.forEach(item => {

        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 1;

        totalAmount += price * quantity;

    });

    console.log("💰 TOTAL:", totalAmount);

    // ==============================
    // DISPLAY TOTAL
    // ==============================

    const totalElement =
        document.getElementById("totalAmount");

    if (totalElement) {

        totalElement.textContent =
            "₹" + totalAmount.toLocaleString("en-IN");

    } else {

        console.error("❌ totalAmount element not found");

    }


    // ==============================
    // PLACE ORDER BUTTON
    // ==============================

    const placeOrderButton =
        document.getElementById("placeOrder");

    if (!placeOrderButton) {

        console.error("❌ Place Order button not found");
        return;

    }


    placeOrderButton.addEventListener("click", function () {

        // ==============================
        // GET DELIVERY DETAILS
        // ==============================

        const full_name =
            document.getElementById("fullName").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const address =
            document.getElementById("address").value.trim();

        const city =
            document.getElementById("city").value.trim();

        const state =
            document.getElementById("state").value.trim();

        const pincode =
            document.getElementById("pincode").value.trim();


        // ==============================
        // VALIDATION
        // ==============================

        if (
            !full_name ||
            !email ||
            !phone ||
            !address ||
            !city ||
            !state ||
            !pincode
        ) {

            alert("Please fill all delivery details.");
            return;

        }


        // ==============================
        // CREATE ORDER DATA
        // ==============================

        const orderData = {

            full_name: full_name,
            email: email,
            phone: phone,
            address: address,
            city: city,
            state: state,
            pincode: pincode,

            total_amount: totalAmount,

            payment_method: "COD",

            items: cart.map(item => ({

                product_id: item.id,

                quantity:
                    Number(item.quantity) || 1,

                price:
                    Number(item.price) || 0

            }))

        };


        console.log("================================");
        console.log("📦 ORDER DATA:");
        console.log(orderData);
        console.log("================================");


        // ==============================
        // SEND ORDER TO BACKEND
        // ==============================

        fetch("http://localhost:5000/api/orders", {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                "Authorization":
                    `Bearer ${token}`

            },

            body: JSON.stringify(orderData)

        })

        .then(async response => {

            const data = await response.json();

            console.log("ORDER RESPONSE:", data);

            if (!response.ok) {

                throw new Error(
                    data.message || "Order creation failed"
                );

            }

            return data;

        })

        .then(data => {

            if (data.success) {

                alert(
                    "Order placed successfully!"
                );

                // Clear cart
                localStorage.removeItem("cart");

                // Go to orders
                window.location.href =
                    "orders.html";

            } else {

                alert(
                    data.message ||
                    "Order creation failed!"
                );

            }

        })

        .catch(error => {

            console.error(
                "❌ ORDER ERROR:",
                error
            );

            alert(
                "Order creation failed: " +
                error.message
            );

        });

    });

});