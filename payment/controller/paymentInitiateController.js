import stripeClient from '../config/stripeConfig.js';
import validateFields from '../utils/validateFields.js';

const paymentInitiateController = async (req, res) => {
  try {
    const { amount, currency, description } = req.body;

    const errorMessage = validateFields({ amount, currency, description });
    if (errorMessage) {
      return res.status(400).json({ success: false, message: errorMessage });
    }

    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      description,
      payment_method_types: ['card'],
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      message: 'Payment intent created successfully',
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export default paymentInitiateController;
