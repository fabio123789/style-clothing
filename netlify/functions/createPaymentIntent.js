require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  console.log("Event Body:", event.body); // Log the event body

  try {
    const { amount } = JSON.parse(event.body);
    console.log("Parsed Amount:", amount); // Log the parsed amount

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    console.log("Payment Intent:", paymentIntent); // Log the payment intent

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log({ error });

    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }), // Send a clear error message
    };
  }
};
