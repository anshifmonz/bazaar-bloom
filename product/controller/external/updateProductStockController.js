import { updateProductStock } from "../../service/externalProductServices.js";

const updateProductStockController = async (req, res) => {
  const { stockUpdateData } = req.body;

  try {
    await updateProductStock(stockUpdateData);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default updateProductStockController;
