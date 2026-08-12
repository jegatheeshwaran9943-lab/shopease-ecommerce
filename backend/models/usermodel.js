const db = require("../config/db");

// Get All Users
exports.getAllUsers = (callback) => {

    const query = `
        SELECT
            id,
            name,
            email,
            phone,
            role,
            created_at
        FROM users
        ORDER BY id DESC
    `;

    db.query(query, (err, results) => {

        if (err) {
            return callback(err, null);
        }

        callback(null, results);

    });

};

// Delete User
exports.deleteUser = (id, callback) => {

    const query = "DELETE FROM users WHERE id = ?";

    db.query(query, [id], (err, result) => {

        if (err) {
            return callback(err, null);
        }

        callback(null, result);

    });

};

// Update User Role
exports.updateRole = (id, role, callback) => {

    const query = "UPDATE users SET role = ? WHERE id = ?";

    db.query(query, [role, id], (err, result) => {

        if (err) {
            return callback(err, null);
        }

        callback(null, result);

    });

};