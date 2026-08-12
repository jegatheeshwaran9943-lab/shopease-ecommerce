const express = require("express");

const router = express.Router();

const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");


// CREATE ORDER
router.post(
    "/",
    authMiddleware,
    orderController.createOrder
);


// MY ORDERS
router.get(
    "/my-orders",
    authMiddleware,
    orderController.getUserOrders
);


// SINGLE ORDER
router.get(
    "/:id",
    authMiddleware,
    orderController.getOrderById
);


// DELETE ORDER
router.delete(
    "/:id",
    authMiddleware,
    orderController.deleteOrder
);


module.exports = router;