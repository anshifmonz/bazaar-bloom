import stripeClient from '../../config/stripeConfig.js';
import { getCustomerId } from "../../service/cardServices.js";

const externalGetCardController = async (req, res) => {
  const userId = req.params;

  try {
    const { customerId } = await getCustomerId(userId);
    if (!customerId) return res.status(404).json({ success: false, message: 'No card saved for this user.' });

    const paymentMethods = await stripeClient.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });

    if (paymentMethods.data.length === 0) 
      return res.status(404).json({ success: false, message: 'No cards saved for this user.' });

    res.status(200).json({ success: true, cards: paymentMethods.data });
  } catch (err) {
    if (err.type === 'StripeCardError') {
      return res.status(400).json({ success: false, message: 'Card error occurred.' });
    }

    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default externalGetCardController;
