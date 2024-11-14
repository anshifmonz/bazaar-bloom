import { getFavProducts } from "../../service/externalProductServices.js";

const getFavProductController = async (req, res) => {
  const { productId } = req.params;

  try {
    const resp = await getFavProducts(productId);
    res.status(200).json({ success: true, data: resp });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default  getFavProductController;
