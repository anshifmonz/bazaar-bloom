import { delCartProduct } from "../services/cartService.js";

const delCartProductController = async (req, res) => {
  const userId = req.user.id;
  const { cartItemId } = req.body;
  const regex = /^\d+(\.\d+)?$/;
  
  if (!regex.test(cartItemId)) return res.status(400).json({ success: false, message: 'Invalid input' });

  try {
    await delCartProduct(userId, cartItemId);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default delCartProductController;
