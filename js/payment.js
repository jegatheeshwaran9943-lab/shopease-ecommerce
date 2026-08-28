const payButton = document.getElementById("payBtn");


payButton.addEventListener("click", async () => {

    const amount = 1400;


    try {

        // Create Payment Order

        const response = await fetch(
            "http://localhost:5000/api/payment/create-order",
            {

                method: "POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body: JSON.stringify({
                    amount: amount
                })

            }
        );


        const data = await response.json();


        console.log("Payment Order:", data);



        // Mock payment success

        const paymentResponse = await fetch(
            "http://localhost:5000/api/payment/verify",
            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },


                body: JSON.stringify({

                    order_id: data.order.id,

                    payment_id:
                    "mock_payment_" + Date.now(),

                    database_order_id: 1

                })

            }
        );


        const paymentData = await paymentResponse.json();


        console.log(
            "Payment Verification:",
            paymentData
        );


        document.getElementById("message").innerHTML =
        "Payment Successful. Order Confirmed";


    }
    catch(error){

        console.log(error);

        document.getElementById("message").innerHTML =
        "Payment Failed";

    }


});
