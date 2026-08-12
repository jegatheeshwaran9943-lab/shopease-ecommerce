// Get JWT token from localStorage
const token = localStorage.getItem("token");

// Redirect to login if token is missing
if (!token) {
    alert("Please login first.");
    window.location.href = "../login.html";
}

// Fetch dashboard statistics
fetch("http://localhost:5000/api/admin/dashboard", {
    method: "GET",
    headers: {
        Authorization: `Bearer ${token}`
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
    }
    return response.json();
})
.then(data => {

    // Update Dashboard Cards
    document.getElementById("totalUsers").textContent = data.totalUsers;

    document.getElementById("totalProducts").textContent = data.totalProducts;

    document.getElementById("totalOrders").textContent = data.totalOrders;

    document.getElementById("totalRevenue").textContent =
        "$" + data.totalRevenue;

    // Display Recent Orders
    const table = document.getElementById("recentOrders");

    table.innerHTML = "";

    if (data.recentOrders.length === 0) {

        table.innerHTML =
            `<tr>
                <td colspan="4">No Orders Found</td>
            </tr>`;

        return;
    }

    data.recentOrders.forEach(order => {

        table.innerHTML += `
            <tr>
                <td>${order.id}</td>
                <td>${order.name}</td>
                <td>$${order.total_amount}</td>
                <td>${order.order_status}</td>
            </tr>
        `;

    });

})
.catch(error => {
    console.error(error);
    alert("Unable to load dashboard.");
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {

    localStorage.removeItem("token");

    window.location.href = "../login.html";

});