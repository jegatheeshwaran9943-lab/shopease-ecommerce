// Get JWT Token
const token = localStorage.getItem("token");

if (!token) {
    alert("Please login first.");
    window.location.href = "../login.html";
}

// Store all users
let allUsers = [];

// =========================
// Load Users
// =========================
function loadUsers() {

    fetch("http://localhost:5000/api/users", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => {

        if (!res.ok) {
            throw new Error("Failed to load users");
        }

        return res.json();

    })
    .then(users => {

        allUsers = users;

        displayUsers(users);

    })
    .catch(err => {

        console.error(err);

        alert("Unable to load users.");

    });

}

// =========================
// Display Users
// =========================
function displayUsers(users) {

    const table = document.getElementById("userTable");

    table.innerHTML = "";

    if (users.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="6">No Users Found</td>
            </tr>
        `;
        return;
    }

    users.forEach(user => {

        table.innerHTML += `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>

                <td>
                    <select onchange="updateRole(${user.id}, this.value)">
                        <option value="user"
                            ${user.role === "user" ? "selected" : ""}>
                            User
                        </option>

                        <option value="admin"
                            ${user.role === "admin" ? "selected" : ""}>
                            Admin
                        </option>
                    </select>
                </td>

                <td>
                    <button
                        class="delete-btn"
                        onclick="deleteUser(${user.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;

    });

}
function updateRole(id, role) {

    fetch(`http://localhost:5000/api/users/${id}/role`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({
            role: role
        })

    })

    .then(res => res.json())

    .then(data => {

        alert(data.message);

        loadUsers();

    })

    .catch(err => {

        console.error(err);

        alert("Role update failed.");

    });

}