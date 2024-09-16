import { orderProduct } from "../../../service/store/orderService.js";

const orderProductController = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;
  const regex = /^\d+(\.\d+)?$/;
  
  if (!regex.test(productId) || !regex.test(quantity)) return res.status(400).json({ success: false, message: 'Invalid input' });

  const resp = await orderProduct(userId, productId, quantity);
  if (resp === 'err') return res.status(500).json({ success: false, message: 'Server error' });
  if (resp === 'Not enough stock available') return res.status(409).json({ success: false, message: resp })

  res.status(201).json({ success: true });
}

export default orderProductController;
