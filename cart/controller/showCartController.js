import { getCart } from '../services/cartService.js'

const showCartController = async (req, res) => {
  const userId = req.user.id;

  try {
    const resp = await getCart(userId);
    if (resp === 'Cart is empty') return res.status(400).json({ success: false, message: resp });
    
    res.status(200).json({ success: true, data: resp });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default showCartController;
