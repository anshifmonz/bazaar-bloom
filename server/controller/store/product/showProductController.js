import { getProducts } from "../../../service/store/productService.js";
import productFiler from "../../../utils/store/productFilter.js";

const showProductController = async (req, res) => {

  const { query, values } = productFiler(req);

  const resp = await getProducts(query, values)
  if (resp === 'err') return res.status(500).json({ success: false, message: 'Server error' });

  res.status(200).json({ success: true, data: resp });
}

export default showProductController;
