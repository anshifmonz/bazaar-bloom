import { showOrders } from "../service/orderService.js";

const showOrdersController = async (req, res) => {
  const userId = req.user.id;
  
  try {
    const resp = await showOrders(userId);
    res.status(200).json({ success: true, data: resp });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default showOrdersController;
