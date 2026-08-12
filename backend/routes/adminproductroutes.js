const express = require("express");

const router = express.Router();

const adminProductController = require("../controllers/adminProductController");

const authMiddleware = require("../middleware/authMiddleware");

const upload = require("../middleware/upload");

// ===============================
// Get All Products
// ===============================
router.get(
    "/",
    authMiddleware,
    adminProductController.getAllProducts
);

// ===============================
// Add Product
// ===============================
router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    adminProductController.addProduct
);

// ===============================
// Update Product
// ===============================
router.put(
    "/:id",
    authMiddleware,
    upload.single("image"),
    adminProductController.updateProduct
);

// ===============================
// Delete Product
// ===============================
router.delete(
    "/:id",
    authMiddleware,
    adminProductController.deleteProduct
);

module.exports = router;