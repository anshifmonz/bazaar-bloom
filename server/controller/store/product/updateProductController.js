import { updateProduct } from "../../../service/store/productService.js";
import updateDataExtractor from "../../../utils/store/productUpdateDataExtractor.js";

const updateProductController = async (req, res) => {
  const { productId, name, description, price, stock, category, img_url } = req.body
  if (!productId) return res.status(400).json({ success: false, message: 'Product id required' });

  const { query, values } = updateDataExtractor(productId, name, description, price, stock, category, img_url)
  
  try {
    await updateProduct(query, values);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default updateProductController;
