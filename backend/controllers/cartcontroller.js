const db = require("../config/db");

// Add Product to Cart
exports.addToCart = (req, res) => {

    const { user_id, product_id, quantity } = req.body;

    const sql = `
        INSERT INTO cart (user_id, product_id, quantity)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [user_id, product_id, quantity], (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.status(201).json({
            message: "Product added to cart successfully",
            cartId: result.insertId
        });

    });

};
// View Cart
exports.getCart = (req, res) => {

    const user_id = req.params.user_id;

    const sql = `
        SELECT
            cart.id,
            products.name,
            products.price,
            products.image,
            cart.quantity,
            (products.price * cart.quantity) AS subtotal
        FROM cart
        INNER JOIN products
            ON cart.product_id = products.id
        WHERE cart.user_id = ?
    `;

    db.query(sql, [user_id], (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.status(200).json(result);

    });

};
// Update Cart Quantity
exports.updateQuantity = (req, res) => {

    const cartId = req.params.id;
    const { quantity } = req.body;

    const sql = `
        UPDATE cart
        SET quantity = ?
        WHERE id = ?
    `;

    db.query(sql, [quantity, cartId], (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        // Check if the cart item exists
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Cart item not found"
            });
        }

        res.status(200).json({
            message: "Cart quantity updated successfully"
        });

    });

};
// Remove Product From Cart
exports.removeFromCart = (req, res) => {

    const cartId = req.params.id;

    const sql = `
        DELETE FROM cart
        WHERE id = ?
    `;

    db.query(sql, [cartId], (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        // Check if the cart item exists
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Cart item not found"
            });
        }

        res.status(200).json({
            message: "Product removed from cart successfully"
        });

    });

};
// Clear Cart
exports.clearCart = (req, res) => {

    const userId = req.params.userId;

    const sql = "DELETE FROM cart WHERE user_id = ?";

    db.query(sql, [userId], (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.status(200).json({
            message: "Cart cleared successfully"
        });

    });

};