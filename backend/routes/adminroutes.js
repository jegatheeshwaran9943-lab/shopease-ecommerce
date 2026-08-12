const express = require("express");

const router = express.Router();

const adminController = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");


// ================================
// Admin Dashboard
// ================================

router.get(
    "/dashboard",
    authMiddleware,
    adminController.getDashboard
);


// ================================
// Admin Orders
// ================================

router.get(
    "/orders",
    authMiddleware,
    adminController.getAllOrders
);


module.exports = router;