import { showAOrderDetails } from "../service/orderService.js";

const showAOrderDetailsController = async (req, res) => {
  const userId = req.user.id;
  const orderId = parseInt(req.params.orderId, 10);

  try {
    const resp = await showAOrderDetails(userId, orderId);
    if (resp === 'Order not found') return res.status(404).json({ success: false, data: resp });
    res.status(200).json({ success: true, data: resp });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default showAOrderDetailsController;
