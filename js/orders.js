// ==============================
// MY ORDERS
// ==============================

document.addEventListener("DOMContentLoaded", async function () {

    const token = localStorage.getItem("token");

    // Check login
    if (!token) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    console.log("Token found:", token);

    try {

        const response = await fetch(
            "http://localhost:5000/api/orders/my-orders",
            {
                method: "GET",

                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("Response status:", response.status);

        const data = await response.json();

        console.log("MY ORDERS RESPONSE:", data);

        // Token / authentication error
        if (response.status === 401) {

            alert("Session expired. Please login again.");

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            window.location.href = "login.html";

            return;
        }

        // Backend error
        if (!response.ok) {

            console.error("Backend error:", data);

            alert(data.message || "Failed to load orders.");

            return;
        }

        displayOrders(data.orders || []);

    } catch (error) {

        console.error("❌ MY ORDERS ERROR:", error);

        alert("Unable to connect to backend server.");
    }
});


// ==============================
// DISPLAY ORDERS
// ==============================

function displayOrders(orders) {

    const tableBody = document.getElementById("ordersTableBody");

    const noOrders = document.getElementById("noOrders");

    if (!tableBody) {

        console.error(
            "❌ ordersTableBody not found in orders.html"
        );

        return;
    }

    // Clear previous rows
    tableBody.innerHTML = "";

    // No orders
    if (!orders || orders.length === 0) {

        if (noOrders) {
            noOrders.style.display = "block";
        }

        return;
    }

    // Hide no orders message
    if (noOrders) {
        noOrders.style.display = "none";
    }

    // Display orders
    orders.forEach(order => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                #${order.id}
            </td>

            <td>
                ₹${Number(order.total_amount).toLocaleString("en-IN")}
            </td>

            <td>
                ${order.status || "Pending"}
            </td>

            <td>
                ${formatDate(order.created_at)}
            </td>
        `;

        tableBody.appendChild(row);
    });
}


// ==============================
// FORMAT DATE
// ==============================

function formatDate(dateString) {

    if (!dateString) {
        return "-";
    }

    const date = new Date(dateString);

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}
