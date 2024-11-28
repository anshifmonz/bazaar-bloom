import stripe from "stripe";
import { getCustomerId, saveCard } from "../../service/cardServices.js";

const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

const saveCardController = async (req, res) => {
  const userId = req.user.id;
  const email = req.user.email;
  const { token } = req.body;
  
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

    const userCardToken = paymentMethod.id;
    await saveCard(userId, customerId, userCardToken);

    res.status(200).json({
      success: true,
      message: 'Card added successfully',
      customer: customerId,
      card: {
        brand: paymentMethod.card.brand,
        last4: paymentMethod.card.last4,
        exp_month: paymentMethod.card.exp_month,
        exp_year: paymentMethod.card.exp_year,
      }
    });
  } catch (err) {
    console.error('saveCard: ', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export default saveCardController;
