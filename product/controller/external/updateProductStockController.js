import { updateProductStock } from "../../service/externalProductServices.js";

const updateProductStockController = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    await updateProductStock(productId, quantity);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default updateProductStockController;
