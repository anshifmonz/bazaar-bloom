import { updateCartQuantity } from "../../service/cartService.js";

const updateCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;
  const regex = /^\d+(\.\d+)?$/;

  if (!regex.test(productId) || !regex.test(quantity)) return res.status(400).json({ success: false, message: 'Invalid input' });
  
  try {
    await updateCartQuantity(userId, productId, quantity);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default updateCart;
