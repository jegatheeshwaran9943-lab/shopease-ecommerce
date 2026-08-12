const adminLoginForm =
    document.getElementById("adminLoginForm");


adminLoginForm.addEventListener("submit", function (e) {

    e.preventDefault();


    const email =
        document.getElementById("adminEmail").value;

    const password =
        document.getElementById("adminPassword").value;


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

        console.log("Admin Login Response:", data);


        // No token
        if (!data.token) {

            alert(
                data.message ||
                "Invalid email or password"
            );

            return;
        }


        // =====================================
        // CHECK ADMIN ROLE
        // =====================================

        if (!data.user ||
            data.user.role !== "admin") {

            alert(
                "Access denied. Admin account required."
            );

            return;
        }


        // =====================================
        // SAVE ADMIN LOGIN
        // =====================================

        localStorage.setItem(
            "token",
            data.token
        );


        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );


        alert("Admin Login Successful");


        // Go dashboard
        window.location.href =
            "dashboard.html";

    })

    .catch(error => {

        console.error(
            "Admin Login Error:",
            error
        );

        alert("Login failed");

    });

});