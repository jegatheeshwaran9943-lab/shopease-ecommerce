const db = require("../config/db");
const orderModel = require("../models/orderModel");

// =========================
// CREATE ORDER
// =========================
exports.createOrder = (req, res) => {

    try {

        console.log("========== CREATE ORDER ==========");
        console.log("USER:", req.user);
        console.log("BODY:", req.body);

        const {
            full_name,
            email,
            phone,
            address,
            city,
            state,
            pincode,
            total_amount,
            payment_method,
            items
        } = req.body;

        // Check login
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: "User not logged in"
            });
        }

        // User ID comes from JWT
        const user_id = req.user.id;

        // Check required fields
        if (
            !full_name ||
            !email ||
            !phone ||
            !address ||
            !city ||
            !state ||
            !pincode ||
            !total_amount ||
            !payment_method
        ) {
            return res.status(400).json({
                success: false,
                message: "All delivery details are required"
            });
        }

        // Check products
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No products found in order"
            });
        }

        const orderData = {
            user_id,
            full_name,
            email,
            phone,
            address,
            city,
            state,
            pincode,
            total_amount,
            payment_method
        };

        console.log("ORDER DATA:", orderData);
        console.log("ORDER ITEMS:", items);

        // Create order
        orderModel.createOrder(orderData, (err, result) => {

            if (err) {

                console.error("❌ ORDER INSERT ERROR:", err);

                return res.status(500).json({
                    success: false,
                    message: "Order creation failed",
                    error: err.message
                });
            }

            const orderId = result.insertId;

            console.log("✅ Order created:", orderId);

            // Prepare order items
            const orderItems = items.map(item => [

                orderId,
                item.product_id,
                item.quantity,
                item.price

            ]);

            console.log("ORDER ITEMS TO INSERT:", orderItems);

            // Insert order items
            orderModel.createOrderItems(orderItems, (err) => {

                if (err) {

                    console.error("❌ ORDER ITEMS ERROR:", err);

                    return res.status(500).json({
                        success: false,
                        message: "Order items creation failed",
                        error: err.message
                    });
                }

                console.log("✅ Order items inserted");

                // Clear cart
                orderModel.clearCartByUserId(user_id, (err) => {

                    if (err) {

                        console.error("❌ CART CLEAR ERROR:", err);

                        return res.status(500).json({
                            success: false,
                            message: "Order created but cart clearing failed",
                            error: err.message
                        });
                    }

                    console.log("✅ Cart cleared");

                    return res.status(201).json({

                        success: true,

                        message: "Order Created Successfully",

                        orderId: orderId

                    });

                });

            });

        });

    } catch (error) {

        console.error("❌ SERVER ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};
exports.getUserOrders = (req, res) => {

    const userId = req.user.id;

    console.log("================================");
    console.log("GET MY ORDERS");
    console.log("USER ID:", userId);
    console.log("================================");

    orderModel.getOrdersByUserId(userId, (err, results) => {

        if (err) {

            console.error("❌ GET ORDERS ERROR:", err);

            return res.status(500).json({
                success: false,
                message: "Failed to get orders",
                error: err.message
            });
        }

        console.log("ORDERS FOUND:", results);
        console.log("ORDERS COUNT:", results.length);

        res.status(200).json({
            success: true,
            orders: results
        });

    });
};
exports.getOrderById = (req, res) => {

    const orderId = req.params.id;

    orderModel.getOrderById(orderId, (err, result) => {

        if (err) {
            console.error("❌ GET ORDER ERROR:", err);

            return res.status(500).json({
                success: false,
                message: "Failed to get order",
                error: err.message
            });
        }

        res.status(200).json({
            success: true,
            order: result
        });
    });
};
exports.deleteOrder = (req, res) => {

    const orderId = req.params.id;

    orderModel.deleteOrder(orderId, (err, result) => {

        if (err) {
            console.error("❌ DELETE ORDER ERROR:", err);

            return res.status(500).json({
                success: false,
                message: "Failed to delete order",
                error: err.message
            });
        }

        res.status(200).json({
            success: true,
            message: "Order deleted successfully"
        });
    });
};