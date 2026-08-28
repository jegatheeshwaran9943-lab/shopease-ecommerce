const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;


    fetch("http://localhost:5000/api/auth/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email: email,
            password: password
        })

    })

    .then(res => res.json())

    .then(data => {

        console.log("LOGIN RESPONSE:", data);

        // Login failed
        if (!data.token) {

            alert(
                data.message ||
                "Invalid email or password"
            );

            return;
        }


        // =========================
        // SAVE LOGIN
        // =========================

        localStorage.setItem(
            "token",
            data.token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );


        // =========================
        // ADMIN
        // =========================

        if (data.user.role === "admin") {

            window.location.href =
                "admin/dashboard.html";

            return;
        }


        // =========================
        // CHECK BUY NOW PRODUCT
        // =========================

        const buyNowProduct =
            localStorage.getItem("buyNowProduct");


        if (buyNowProduct) {

            console.log(
                "BUY NOW PRODUCT:",
                buyNowProduct
            );


            // Put product into cart
            localStorage.setItem(
                "cart",
                buyNowProduct
            );


            // Remove temporary data
            localStorage.removeItem(
                "buyNowProduct"
            );


            // Go checkout
            window.location.href =
                "checkout.html";

            return;
        }


        // =========================
        // NORMAL LOGIN
        // =========================

        window.location.href =
            "index.html";

    })

    .catch(error => {

        console.error(
            "LOGIN ERROR:",
            error
        );

        alert("Login failed. Check backend.");

    });

});
