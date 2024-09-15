import { updateCartQuantity } from "../../../service/store/cartService.js";

const updateCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;
  const regex = /^\d+(\.\d+)?$/;

  if (!regex.test(productId) || !regex.test(quantity)) return res.status(400).json({ success: false, message: 'Invalid input' });
  
  const resp = await updateCartQuantity(userId, productId, quantity);
  if (resp === 'err') return res.status(500).json({ success: false, message: 'Server error' });

  res.status(200).json({ success: true });
}

export default updateCart;
