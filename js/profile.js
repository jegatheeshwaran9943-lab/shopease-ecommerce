const token = localStorage.getItem("token");


// Check login
if (!token) {

    alert("Please login first.");

    window.location.href = "login.html";

}


// Load profile
async function loadProfile() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/profile",
            {
                method: "GET",

                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );


        const data = await response.json();

        console.log("Profile:", data);


        if (!response.ok) {

            throw new Error(
                data.message || "Failed to load profile"
            );

        }


        document.getElementById("name").value =
            data.name || "";

        document.getElementById("email").value =
            data.email || "";

        document.getElementById("phone").value =
            data.phone || "";


    } catch (error) {

        console.error(error);

        document.getElementById("message").innerHTML = `
            <div class="alert alert-danger">
                ${error.message}
            </div>
        `;

    }

}


// Update profile
document
    .getElementById("profileForm")
    .addEventListener("submit", async function (event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();


        try {

            const response = await fetch(
                "http://localhost:5000/api/profile/update",
                {
                    method: "PUT",

                    headers: {

                        "Content-Type": "application/json",

                        "Authorization": `Bearer ${token}`

                    },

                    body: JSON.stringify({
                        name,
                        email,
                        phone
                    })

                }
            );


            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message || "Profile update failed"
                );

            }


            document.getElementById("message").innerHTML = `
                <div class="alert alert-success">
                    ✅ Profile updated successfully!
                </div>
            `;


        } catch (error) {

            console.error(error);

            document.getElementById("message").innerHTML = `
                <div class="alert alert-danger">
                    ❌ ${error.message}
                </div>
            `;

        }

    });


// Cancel button
document
    .getElementById("cancelBtn")
    .addEventListener("click", function () {

        loadProfile();

        document.getElementById("message").innerHTML = "";

    });


// Logout
document
    .getElementById("logoutBtn")
    .addEventListener("click", function () {

        localStorage.removeItem("token");

        localStorage.removeItem("cart");

        window.location.href = "login.html";

    });


// Start
loadProfile();
