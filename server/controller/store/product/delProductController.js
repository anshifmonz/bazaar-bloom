import { delProduct } from "../../../service/store/productService.js";

const delProductController = async (req, res) => {
  const { productId } = req.body;

  const productIds = productId.split(',').map(id => id.trim());

  try {
    const resp = delProduct(productIds);

    if (resp === 'err') return res.status(500).json({ success: false, message: 'Server error' });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default delProductController;
