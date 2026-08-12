// ================================
// Admin Orders
// ================================

const token = localStorage.getItem("token");

// Check login
if (!token) {
    alert("Please login as admin.");
    window.location.href = "../login.html";
}


// Load all orders
async function loadOrders() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/admin/orders",
            {
                method: "GET",

                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );


        // Check API response
        if (!response.ok) {

            const errorData = await response.json().catch(() => ({}));

            throw new Error(
                errorData.message || `HTTP Error: ${response.status}`
            );
        }


        const orders = await response.json();

        console.log("Orders received:", orders);


        displayOrders(orders);


    } catch (error) {

        console.error("Error loading orders:", error);

        const tableBody =
            document.getElementById("ordersTableBody");

        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-danger">
                    Failed to load orders
                </td>
            </tr>
        `;
    }
}


// Display orders
function displayOrders(orders) {

    const tableBody =
        document.getElementById("ordersTableBody");


    tableBody.innerHTML = "";


    // No orders
    if (!orders || orders.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">
                    No orders found
                </td>
            </tr>
        `;

        return;
    }


    // Display each order
    orders.forEach(order => {

        const row = document.createElement("tr");


        row.innerHTML = `

            <td>
                ${order.id}
            </td>

            <td>
                ${order.customer_name || order.name || "Unknown"}
            </td>

            <td>
                ₹${Number(order.total_amount || 0).toLocaleString("en-IN", {
                    minimumFractionDigits: 2
                })}
            </td>

            <td>
                <span class="badge bg-warning text-dark">
                    ${order.status || "Pending"}
                </span>
            </td>

            <td>
                ${order.created_at
                    ? new Date(order.created_at).toLocaleDateString("en-IN")
                    : "-"
                }
            </td>

            <td>

                <button
                    class="btn btn-primary btn-sm"
                    onclick="viewOrder(${order.id})"
                >
                    <i class="bi bi-eye"></i>
                    View
                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });
}


// View order
function viewOrder(orderId) {

    alert("Order ID: " + orderId);

}


// Logout
const logoutBtn =
    document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("token");

        window.location.href = "../login.html";

    });

}


// Load orders when page opens
document.addEventListener("DOMContentLoaded", () => {

    loadOrders();

});