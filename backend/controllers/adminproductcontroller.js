const adminProductModel = require("../models/adminProductModel");

// =============================
// Get All Products
// =============================
exports.getAllProducts = (req, res) => {

    adminProductModel.getAllProducts((err, products) => {

        if (err) {
            return res.status(500).json({
                message: "Failed to fetch products",
                error: err
            });
        }

        res.status(200).json(products);

    });

};

// =============================
// Add Product
// =============================
exports.addProduct = (req, res) => {

    console.log("========== ADD PRODUCT ==========");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const product = {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        stock: req.body.stock,
        description: req.body.description,
        image: req.file ? req.file.filename : null
    };

    adminProductModel.addProduct(product, (err, result) => {

        if (err) {
            console.log("MYSQL ERROR:");
            console.log(err);

            return res.status(500).json({
                message: "Failed to add product",
                error: err.message
            });
        }

        res.status(201).json({
            message: "Product added successfully"
        });

    });

};

// =============================
// Update Product
// =============================
exports.updateProduct = (req, res) => {

    const id = req.params.id;

    const product = {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        stock: req.body.stock,
        description: req.body.description,
        image: req.file ? req.file.filename : req.body.image
    };

    adminProductModel.updateProduct(id, product, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Failed to update product",
                error: err
            });
        }

        res.status(200).json({
            message: "Product updated successfully"
        });

    });

};

// =============================
// Delete Product
// =============================
exports.deleteProduct = (req, res) => {

    const id = req.params.id;

    adminProductModel.deleteProduct(id, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Failed to delete product",
                error: err
            });
        }

        res.status(200).json({
            message: "Product deleted successfully"
        });

    });

};