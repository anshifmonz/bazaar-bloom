import { orderCart } from "../service/orderService.js";

const orderCartController = async (req, res) => {
  const userId = req.user.id;

  try {
    const resp = await orderCart(userId);
    if (resp === 'Cart is empty') return res.status(400).json({ success: false, message: resp });
    if (resp?.noStock) return res.status(409).json({ success: false, data: resp.noStock, message: 'Not enough stock available' });
  
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default orderCartController;
