const db = require("../config/db");

// =========================
// CREATE ORDER
// =========================

exports.createOrder = (orderData, callback) => {

    const sql = `
        INSERT INTO orders
        (
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
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            orderData.user_id,
            orderData.full_name,
            orderData.email,
            orderData.phone,
            orderData.address,
            orderData.city,
            orderData.state,
            orderData.pincode,
            orderData.total_amount,
            orderData.payment_method
        ],
        callback
    );
};


// =========================
// CREATE ORDER ITEMS
// =========================

exports.createOrderItems = (items, callback) => {

    const sql = `
        INSERT INTO order_items
        (
            order_id,
            product_id,
            quantity,
            price
        )
        VALUES ?
    `;

    db.query(sql, [items], callback);
};


// =========================
// GET USER ORDERS
// =========================

exports.getOrdersByUserId = (userId, callback) => {

    const sql = `
        SELECT
            id,
            user_id,
            full_name,
            email,
            phone,
            address,
            city,
            state,
            pincode,
            total_amount,
            payment_method,
            status,
            created_at
        FROM orders
        WHERE user_id = ?
        ORDER BY created_at DESC
    `;

    db.query(sql, [userId], callback);
};


// =========================
// GET SINGLE ORDER
// =========================

exports.getOrderById = (orderId, userId, callback) => {

    const sql = `
        SELECT *
        FROM orders
        WHERE id = ?
        AND user_id = ?
    `;

    db.query(sql, [orderId, userId], callback);
};


// =========================
// DELETE ORDER
// =========================

exports.deleteOrder = (orderId, userId, callback) => {

    const sql = `
        DELETE FROM orders
        WHERE id = ?
        AND user_id = ?
    `;

    db.query(sql, [orderId, userId], callback);
};


// =========================
// CLEAR CART
// =========================

exports.clearCartByUserId = (userId, callback) => {

    const sql = `
        DELETE FROM cart
        WHERE user_id = ?
    `;

    db.query(sql, [userId], callback);
};