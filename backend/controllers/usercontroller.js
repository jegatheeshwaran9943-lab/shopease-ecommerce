const userModel = require("../models/userModel");

// =============================
// Get All Users
// =============================
exports.getAllUsers = (req, res) => {

    userModel.getAllUsers((err, users) => {

        if (err) {
            return res.status(500).json({
                message: "Failed to fetch users",
                error: err
            });
        }

        res.status(200).json(users);

    });

};

// =============================
// Delete User
// =============================
exports.deleteUser = (req, res) => {

    const id = req.params.id;

    userModel.deleteUser(id, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Failed to delete user",
                error: err
            });
        }

        res.status(200).json({
            message: "User deleted successfully"
        });

    });

};

// =============================
// Update User Role
// =============================
exports.updateRole = (req, res) => {

    const id = req.params.id;

    const { role } = req.body;

    userModel.updateRole(id, role, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Failed to update role",
                error: err
            });
        }

        res.status(200).json({
            message: "Role updated successfully"
        });

    });

};