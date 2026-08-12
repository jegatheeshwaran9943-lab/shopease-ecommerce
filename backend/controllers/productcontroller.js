const db = require("../config/db");
// Add Product

exports.addProduct = (req, res) => {

    const { name, description, price, category, image } = req.body;

    const sql =
        "INSERT INTO products(name, description, price, category, image) VALUES(?,?,?,?,?)";

    db.query(
        sql,
        [name, description, price, category, image],
        (err, result) => {

            if (err) {
                return res.status(500).json({ error: err });
            }

            res.json({
                message: "Product Added Successfully",
                id: result.insertId
            });

        }
    );

};
// Get All Products

exports.getProducts = (req, res) => {

    db.query(
        "SELECT * FROM products",
        (err, result) => {

            if (err) {
                return res.status(500).json({ error: err });
            }

            res.json(result);

        }
    );

};
// Get Single Product

exports.getProductById = (req, res) => {

    const id = req.params.id;

    db.query(
        "SELECT * FROM products WHERE id = ?",
        [id],
        (err, result) => {

            if (err) {
                return res.status(500).json({ error: err });
            }

            res.json(result);

        }
    );

};
// Update Product

exports.updateProduct = (req, res) => {

    const id = req.params.id;

    const { name, price, category } = req.body;

    const sql =
        "UPDATE products SET name = ?, price = ?, category = ? WHERE id = ?";

    db.query(
        sql,
        [name, price, category, id],
        (err) => {

            if (err) {
                return res.status(500).json({ error: err });
            }

            res.json({
                message: "Product Updated"
            });

        }
    );

};
// Delete Product

exports.deleteProduct = (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM products WHERE id = ?",
        [id],
        (err) => {

            if (err) {
                return res.status(500).json({ error: err });
            }

            res.json({
                message: "Product Deleted"
            });

        }
    );

};