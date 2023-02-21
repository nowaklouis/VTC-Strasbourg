const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

const getPaymentIntent = async (req, res) => {
    const { amount, infoUser } = req.body;

    const customer = await stripe.customers.create({
        name: infoUser.name,
        email: infoUser.email,
        address: {
            line1: infoUser.address.line1,
            city: infoUser.address.city,
            postal_code: infoUser.address.postal_code,
            country: infoUser.address.country,
        },
    });

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "eur",
        payment_method_types: ["card"],
        customer: customer.id,

        payment_method_options: {
            card: {
                capture_method: "manual",
            },
        },
    });

    res.send({
        clientSecret: paymentIntent,
    });
};

const capturePayment = async (req, res) => {
    const { idForCapture } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.capture(idForCapture);

        res.send({ paymentIntent });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const cancelPayment = async (req, res) => {
    const { idForCapture } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.cancel(idForCapture);

        res.send({ paymentIntent });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = { getPaymentIntent, capturePayment, cancelPayment };
