import { orderCart } from "../../../service/store/orderService.js";

const orderCartController = async (req, res) => {
  const userId = req.user.id;

  const resp = await orderCart(userId);
  if (resp === 'err') return res.status(500).json({ success: false, message: 'Server error' });
  if (resp === 'Cart is empty') return res.status(400).json({ success: false, message: resp });
  if (resp?.noStock) return res.status(409).json({ success: false, message: resp });

  res.status(201).json({ success: true });
}

export default orderCartController;
