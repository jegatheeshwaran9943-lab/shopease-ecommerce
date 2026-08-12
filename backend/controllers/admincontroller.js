const adminModel = require("../models/adminModel");


// ================================
// Dashboard Controller
// ================================

exports.getDashboard = (req, res) => {

    adminModel.getDashboardData((err, data) => {

        if (err) {

            return res.status(500).json({
                message: "Database Error",
                error: err
            });

        }

        res.status(200).json(data);

    });

};


// ================================
// Get All Orders
// ================================

exports.getAllOrders = (req, res) => {

    adminModel.getAllOrders((err, orders) => {

        if (err) {

            return res.status(500).json({
                message: "Database Error",
                error: err
            });

        }

        res.status(200).json(orders);

    });

};