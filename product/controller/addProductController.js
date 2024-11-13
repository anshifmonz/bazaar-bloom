import { addProduct } from "../service/productService.js";

const addProductController = async (req, res) => {
  const { name, description, price, stock, category, img_url } = req.body

  const regex = /^\d+(\.\d+)?$/;
  if (!regex.test(price) || !regex.test(stock)) {
    return res.status(400).json({ success: false, message: 'Invalid input' });
  }

  try {
    await addProduct(name, description, price, stock, category, img_url);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default addProductController;
