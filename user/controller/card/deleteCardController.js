import stripe from 'stripe';
import { deleteCard, getCustomerId } from "../../service/cardServices.js";

const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

const deleteCardController = async (req, res) => {
  const userId = req.user.id;
  const { cardId } = req.body;

  try {
    const { customerId } = await getCustomerId(userId);
    if (!customerId) return res.status(404).json({ error: 'Customer not found.' });

    await stripeClient.paymentMethods.detach(cardId);
    await deleteCard(userId, cardId);

    res.status(200).json({ success: true, message: 'Card successfully deleted.' });
  } catch (err) {
    console.error('deleteCardController: ', err);
    if (err.type === 'StripeCardError') 
      return res.status(400).json({ error: 'Card error occurred.' });
    res.status(500).json({ error: 'Server error' });
  }
};

export default deleteCardController;
