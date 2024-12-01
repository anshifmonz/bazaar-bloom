import { cartCheckout } from "../service/checkoutService.js";

const cartCheckoutController = async (req, res) => {
  const userId = req.user.id;
  const email = req.user.id;
  const currency = req.user.currency;

  try {
    const resp = await cartCheckout(userId, email, currency, req.body);
    if (resp?.noStock)
      return res.status(404).json({ success: false, data: resp.noStock, message: resp.message });
    if (!resp?.success)
      return res.status(500).json({ success: false, message: resp.message || 'Server error' });
    
    res.status(200).json({ success: true, data: resp });
  } catch (err) {    
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default cartCheckoutController;
