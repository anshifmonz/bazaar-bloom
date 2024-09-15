import { updateProduct } from "../../../service/store/productService.js";
import updateDataExtractor from "../../../utils/store/productUpdateDataExtractor.js";

const updateProductController = async (req, res) => {

  const data = updateDataExtractor(req)
  if (data === 'Product id required') return res.status(400).json({ success: false, message: data });
  
  const resp = await updateProduct(data.query, data.values);
  if (resp === 'err') return res.status(500).json({ success: false, message: 'Server error' });

  res.status(200).json({ success: true });
}

export default updateProductController;
