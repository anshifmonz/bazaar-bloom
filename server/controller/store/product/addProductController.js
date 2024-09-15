import { addProduct } from "../../../service/store/productService.js";

const addProductController = async (req, res) => {
  const resp = await addProduct(req);
  if (resp === 'err') return res.status(500).json({ success: false, message: 'Server error' });
  if (resp === 'err1') return res.status(400).json({ success: false, message: 'Invalid input' });

  res.status(200).json({ success: true });
}

export default addProductController;
