import { cancelOrder } from "../service/orderService.js";

const orderCancelController = async (req, res) => {
  const userId = req.user.id;
  const { orderId } = req.body;
  const regex = /^\d+(\.\d+)?$/;
  
  if (!regex.test(orderId)) return res.status(400).json({ success: false, message: 'Invalid input' });

  try {
    await cancelOrder(userId, orderId);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default orderCancelController;
