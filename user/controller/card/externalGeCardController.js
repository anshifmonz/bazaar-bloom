import { getCustomerId } from "../../service/cardServices";

const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

const externalGeCardController = async (req, res) => {
  const userId = req.userId;

  try {
    const { customerId } = await getCustomerId(userId);
    if (!customerId) return res.status(404).json({ error: 'No card saved for this user.' });

    const paymentMethods = await stripeClient.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });

    if (paymentMethods.data.length === 0) 
      return res.status(404).json({ error: 'No cards saved for this user.' });

    res.status(200).json({ cards: paymentMethods.data });
  } catch (error) {
    console.error('getCardController:', error);

    if (error.type === 'StripeCardError') {
      return res.status(400).json({ error: 'Card error occurred.' });
    }

    res.status(500).json({ error: 'Server error' });
  }
}

export default externalGeCardController;
