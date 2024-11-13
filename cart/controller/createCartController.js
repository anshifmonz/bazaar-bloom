import { createCart } from "../services/cartService.js"

const createCartController = async (req, res) => {
  const { userId } = req.body;
  
  try {
    await createCart(userId);
    res.status(201).json({ success: true })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

export default createCartController;
