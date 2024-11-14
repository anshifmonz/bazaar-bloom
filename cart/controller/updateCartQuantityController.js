import { updateCartQuantity } from "../services/cartService.js";

const updateCart = async (req, res) => {
  const userId = req.user.id;
  const { cartItemId, quantity } = req.body;
  const regex = /^\d+(\.\d+)?$/;

  if (!regex.test(cartItemId) || !regex.test(quantity)) return res.status(400).json({ success: false, message: 'Invalid input' });
  
  try {
    await updateCartQuantity(userId, cartItemId, quantity);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default updateCart;
