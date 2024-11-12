import { getProducts } from "../../../service/store/productService.js";
import productFiler from "../../../utils/store/productFilter.js";

const showProductController = async (req, res) => {

  const { query, values } = productFiler(req);

  try {
    const resp = await getProducts(query, values);
    res.status(200).json({ success: true, data: resp });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default showProductController;
