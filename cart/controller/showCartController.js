import { getCart } from '../services/cartService.js'

const showCartController = async (req, res) => {
  const userId = req.user.id;

  try {
    const resp = await getCart(userId);
    res.status(200).json({ success: true, data: resp });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default showCartController;
