const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");

router.post("/add", cartController.addToCart);
router.get("/:user_id", cartController.getCart);
router.put("/update/:id", cartController.updateQuantity);
router.delete("/delete/:id", cartController.removeFromCart);
// Clear Cart
router.delete("/clear/:userId", cartController.clearCart);
module.exports = router;