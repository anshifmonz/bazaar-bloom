import stripeClient from '../../config/stripeConfig.js';
import { getCustomerId, saveCard } from "../../service/cardServices.js";

const externalAddCardController = async (req, res) => {
  const { userId, email, token, save } = req.body;
  
  if (!token) return res.status(400).json({ success: false, message: 'Card token is required' });

  try {
    let customerId = await getCustomerId(userId);
    if (!customerId) {
      const customer = await stripeClient.customers.create({
        email: email
      });
  
      customerId = customer.id;
    }

    const paymentMethod = await stripeClient.paymentMethods.create({
      type: 'card',
      card: { token }
    });

    await stripeClient.paymentMethods.attach(paymentMethod.id, {
      customer: customerId
    });

    const userCardId = paymentMethod.id;
    if (save) await saveCard(userId, customerId, userCardId);

    res.status(200).json({
      success: true,
      message: 'Card added successfully',
      customerId: customerId,
      cardId: userCardId
    });
  } catch (err) {
    console.error('saveCard: ', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export default externalAddCardController;
