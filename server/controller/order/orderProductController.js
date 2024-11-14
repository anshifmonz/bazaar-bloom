// import { orderProduct } from "../../service/orderService.js";

const orderProductController = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;
  const regex = /^\d+(\.\d+)?$/;
  
  if (!regex.test(productId) || !regex.test(quantity)) return res.status(400).json({ success: false, message: 'Invalid input' });

  try {
    const resp = await orderProduct(userId, productId, quantity);
    if (resp === 'Not enough stock available') return res.status(409).json({ success: false, message: resp })
  
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default orderProductController;
