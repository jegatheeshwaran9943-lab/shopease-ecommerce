const db = require("../config/db");

// =============================
// Get All Products
// =============================
exports.getAllProducts = (callback) => {

    const query = `
        SELECT
            id,
            name,
            category,
            price,
            stock,
            description,
            image
        FROM products
        ORDER BY id DESC
    `;

    db.query(query, (err, results) => {

        if (err) {
            return callback(err, null);
        }

        callback(null, results);

    });

};

// =============================
// Add Product
// =============================
exports.addProduct = (product, callback) => {

    const query = `
        INSERT INTO products
        (name, category, price, stock, description, image)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        query,
        [
            product.name,
            product.category,
            product.price,
            product.stock,
            product.description,
            product.image
        ],
        (err, result) => {

            if (err) {
                return callback(err, null);
            }

            callback(null, result);

        }
    );

};

// =============================
// Update Product
// =============================
exports.updateProduct = (id, product, callback) => {

    const query = `
        UPDATE products
        SET
            name = ?,
            category = ?,
            price = ?,
            stock = ?,
            description = ?,
            image = ?
        WHERE id = ?
    `;

    db.query(
        query,
        [
            product.name,
            product.category,
            product.price,
            product.stock,
            product.description,
            product.image,
            id
        ],
        (err, result) => {

            if (err) {
                return callback(err, null);
            }

            callback(null, result);

        }
    );

};

// =============================
// Delete Product
// =============================
exports.deleteProduct = (id, callback) => {

    const query = "DELETE FROM products WHERE id = ?";

    db.query(query, [id], (err, result) => {

        if (err) {
            return callback(err, null);
        }

        callback(null, result);

    });

};