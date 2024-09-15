import { delCartProduct } from "../../../service/store/cartService.js";

const delCartProductController = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;
  const regex = /^\d+(\.\d+)?$/;
  
  if (!regex.test(productId)) return res.status(400).json({ success: false, message: 'Invalid input' });

  const resp = await delCartProduct(userId, productId);
  if (resp === 'err') return res.status(500).json({ success: false, message: 'Server error' });

  res.status(200).json({ success: true });
}

export default delCartProductController;
