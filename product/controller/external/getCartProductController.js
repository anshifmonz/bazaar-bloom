import { getProduct } from "../../service/externalProductServices.js";

const getCartProductController = async (req, res) => {
  const { productId } = req.params;
  
  try {
    const resp = await getProduct(productId);
    res.status(200).send(resp);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default getCartProductController;
