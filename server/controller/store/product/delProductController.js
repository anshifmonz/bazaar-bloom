import { delProduct } from "../../../service/store/productService.js";

const delProductController = async (req, res) => {
  const { productId } = req.body;
  const productIds = productId.split(',').map(id => id.trim());
  let resp;

  if (productIds.length > 1) {
    resp = await delProduct(productIds);
  } else {
    resp = await delProduct(productId);
  }
  
  if (resp === 'err') return res.status(500).json({ success: false, message: 'Server error' });
  res.status(200).json({ success: true });
}

export default delProductController;
