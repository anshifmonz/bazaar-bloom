import checkoutOrder from "../../service/checkoutService.js";

const checkoutController = async (req, res) => {
  const userId = req.user.id;

  try {
    const resp = await checkoutOrder(userId);
    res.status(200).json({ success: true, data: resp });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default checkoutController;
