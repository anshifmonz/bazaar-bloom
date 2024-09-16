import { showAOrderDetails } from "../../../service/store/orderService.js";

const showAOrderDetailsController = async (req, res) => {
  const userId = req.user.id;
  const orderId = parseInt(req.params.orderId, 10);

  const resp = await showAOrderDetails(userId, orderId);
  if (resp === 'err') return res.status(500).json({ success: false, message: 'Server error' });

  res.status(200).json({ success: true, data: resp });
}

export default showAOrderDetailsController;
