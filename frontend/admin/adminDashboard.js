// ========================================
// ADMIN DASHBOARD SECURITY
// ========================================

// Get token
const token = localStorage.getItem("token");

// Get logged-in user
const userData = localStorage.getItem("user");


// ========================================
// CHECK LOGIN
// ========================================

if (!token || !userData) {

    alert("Please login as admin first.");

    window.location.href = "adminlogin.html";

    throw new Error("Admin not logged in");
}


// Convert user JSON to object
const user = JSON.parse(userData);


// ========================================
// CHECK ADMIN ROLE
// ========================================

if (user.role !== "admin") {

    alert("Access denied. Admin account required.");

    // Clear user login
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "adminlogin.html";

    throw new Error("User is not an admin");
}


// ========================================
// FETCH ADMIN DASHBOARD
// ========================================

fetch("http://localhost:5000/api/admin/dashboard", {

    method: "GET",

    headers: {
        "Authorization": `Bearer ${token}`
    }

})
.then(response => {

    if (response.status === 401 || response.status === 403) {

        throw new Error("Unauthorized");
    }

    return response.json();

})
.then(data => {

    console.log("Admin Dashboard Data:", data);


    // Total Users
    document.getElementById("totalUsers").textContent =
        data.totalUsers;


    // Total Products
    document.getElementById("totalProducts").textContent =
        data.totalProducts;


    // Total Orders
    document.getElementById("totalOrders").textContent =
        data.totalOrders;


    // Total Revenue
    document.getElementById("totalRevenue").textContent =
        "₹" + Number(data.totalRevenue).toLocaleString();


    // ========================================
    // RECENT ORDERS
    // ========================================

    const recentOrders =
        document.getElementById("recentOrders");


    recentOrders.innerHTML = "";


    if (!data.recentOrders || data.recentOrders.length === 0) {

        recentOrders.innerHTML = `
            <tr>
                <td colspan="4" class="text-center">
                    No orders found
                </td>
            </tr>
        `;

        return;
    }


    data.recentOrders.forEach(order => {

        recentOrders.innerHTML += `

            <tr>

                <td>
                    ${order.id}
                </td>

                <td>
                    ${order.name}
                </td>

                <td>
                    ₹${Number(order.total_amount).toLocaleString()}
                </td>

                <td>
                    ${order.order_status}
                </td>

            </tr>

        `;

    });

})
.catch(error => {

    console.error("Dashboard Error:", error);


    alert("Admin session expired or unauthorized.");


    // Remove invalid login
    localStorage.removeItem("token");
    localStorage.removeItem("user");


    // Go to admin login
    window.location.href = "adminlogin.html";

});


// ========================================
// LOGOUT
// ========================================

const logoutBtn =
    document.getElementById("logoutBtn");


if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert("Admin logged out successfully.");

        window.location.href = "adminlogin.html";

    });

}