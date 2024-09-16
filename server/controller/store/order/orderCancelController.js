import { cancelOrder } from "../../../service/store/orderService.js";

const orderCancelController = async (req, res) => {
  const userId = req.user.id;
  const { orderId } = req.body;
  const regex = /^\d+(\.\d+)?$/;
  
  if (!regex.test(orderId)) return res.status(400).json({ success: false, message: 'Invalid input' });

  const resp = await cancelOrder(userId, orderId);
  if (resp === 'err') return res.status(500).json({ success: false, message: 'Server error' });

  res.status(200).json({ success: true });
}

export default orderCancelController;
