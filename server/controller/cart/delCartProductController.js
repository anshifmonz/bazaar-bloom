import { delCartProduct } from "../../service/cartService.js";

const delCartProductController = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;
  const regex = /^\d+(\.\d+)?$/;
  
  if (!regex.test(productId)) return res.status(400).json({ success: false, message: 'Invalid input' });

  try {
    await delCartProduct(userId, productId);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default delCartProductController;
