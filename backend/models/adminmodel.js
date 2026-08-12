const db = require("../config/db");


// ========================================
// Get Dashboard Statistics
// ========================================

exports.getDashboardData = (callback) => {

    // Total Users
    const usersQuery =
        "SELECT COUNT(*) AS totalUsers FROM users";


    // Total Products
    const productsQuery =
        "SELECT COUNT(*) AS totalProducts FROM products";


    // Total Orders
    const ordersQuery =
        "SELECT COUNT(*) AS totalOrders FROM orders";


    // Total Revenue
    const revenueQuery = `
        SELECT IFNULL(SUM(total_amount), 0) AS totalRevenue
        FROM orders
    `;


    // Recent Orders
    const recentOrdersQuery = `
        SELECT
            orders.id,
            users.name,
            orders.total_amount,
            orders.order_status
        FROM orders
        JOIN users
        ON orders.user_id = users.id
        ORDER BY orders.id DESC
        LIMIT 10
    `;


    db.query(usersQuery, (err, usersResult) => {

        if (err) {
            return callback(err);
        }


        db.query(productsQuery, (err, productsResult) => {

            if (err) {
                return callback(err);
            }


            db.query(ordersQuery, (err, ordersResult) => {

                if (err) {
                    return callback(err);
                }


                db.query(revenueQuery, (err, revenueResult) => {

                    if (err) {
                        return callback(err);
                    }


                    db.query(
                        recentOrdersQuery,
                        (err, recentOrdersResult) => {

                            if (err) {
                                return callback(err);
                            }


                            callback(null, {

                                totalUsers:
                                    usersResult[0].totalUsers,

                                totalProducts:
                                    productsResult[0].totalProducts,

                                totalOrders:
                                    ordersResult[0].totalOrders,

                                totalRevenue:
                                    revenueResult[0].totalRevenue,

                                recentOrders:
                                    recentOrdersResult

                            });

                        }
                    );

                });

            });

        });

    });

};


// ========================================
// Get All Orders
// ========================================

exports.getAllOrders = (callback) => {

    const query = `
        SELECT
            orders.id,
            users.name AS customer_name,
            orders.total_amount,
            orders.order_status,
            orders.created_at
        FROM orders
        JOIN users
        ON orders.user_id = users.id
        ORDER BY orders.id DESC
    `;


    db.query(query, (err, result) => {

        if (err) {

            return callback(err);

        }


        callback(null, result);

    });

};