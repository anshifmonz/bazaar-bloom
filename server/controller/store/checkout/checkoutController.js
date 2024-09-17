import checkoutOrder from "../../../service/store/checkoutService.js";

const checkoutController = async (req, res) => {
  const userId = req.user.id;

  const resp = await checkoutOrder(userId);
  if (resp === 'err') return res.status(500).json({ success: false, message: 'Server error' });

  res.status(200).json({ success: true, data: resp });
}

export default checkoutController;
