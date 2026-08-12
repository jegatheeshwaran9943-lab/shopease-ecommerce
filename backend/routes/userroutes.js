const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

// =============================
// Get All Users
// =============================
router.get(
    "/",
    authMiddleware,
    userController.getAllUsers
);

// =============================
// Delete User
// =============================
router.delete(
    "/:id",
    authMiddleware,
    userController.deleteUser
);

// =============================
// Update User Role
// =============================
router.put(
    "/:id/role",
    authMiddleware,
    userController.updateRole
);

module.exports = router;