const db = require("../config/db");
exports.createPaymentOrder = async (req, res) => {

    try {

        const { amount } = req.body;

        console.log("Received Amount:", amount);


        const fakeOrder = {
            id: "mock_order_" + Date.now(),
            amount: amount * 100,
            currency: "INR",
            status: "created"
        };


        res.status(200).json({
            message: "Mock payment order created successfully",
            order: fakeOrder
        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Payment order creation failed"
        });

    }

};
// Verify Payment
exports.verifyPayment = async (req, res) => {

    try {

        const {
            order_id,
            payment_id
        } = req.body;


        console.log("Order ID:", order_id);
        console.log("Payment ID:", payment_id);


        res.status(200).json({

            message: "Payment verified successfully",

            payment: {
                order_id: order_id,
                payment_id: payment_id,
                status: "Paid"
            }

        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Payment verification failed"
        });

    }

};