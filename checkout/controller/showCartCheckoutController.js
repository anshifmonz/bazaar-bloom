import { ShowCartCheckout } from "../service/checkoutService.js";

const showCartCheckoutController = async (req, res) => {
  const userId = req.user.id;
  const userAddress = req.user.address;

  try {
    const resp = await ShowCartCheckout(userId, userAddress);
    if (resp?.noStock)
      return res.status(404).json({ success: false, message: 'Some items are out of stock', data: resp });
    res.status(200).json({ success: true, data: resp });
  } catch (err) {    
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default showCartCheckoutController;
