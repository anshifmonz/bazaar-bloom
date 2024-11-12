import { showAOrderDetails } from "../../../service/store/orderService.js";

const showAOrderDetailsController = async (req, res) => {
  const userId = req.user.id;
  const orderId = parseInt(req.params.orderId, 10);

  try {
    const resp = await showAOrderDetails(userId, orderId);
    res.status(200).json({ success: true, data: resp });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default showAOrderDetailsController;
