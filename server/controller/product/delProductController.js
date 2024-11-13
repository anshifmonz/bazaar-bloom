import { delProduct } from "../../service/productService.js";

const delProductController = async (req, res) => {
  const { productId } = req.body;
  const productIds = productId.split(',').map(id => id.trim()).filter(Boolean);

  if (productIds.length === 0) {
    return res.status(400).json({ success: false, message: 'Invalid input' });
  }

  try {
    await delProduct(productIds);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default delProductController;
