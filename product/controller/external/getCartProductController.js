import { getCartProducts } from "../../service/externalProductServices.js";

const getCartProductController = async (req, res) => {
  const { productIds } = req.body;
  
  try {
    const resp = await getCartProducts(productIds);
    res.status(200).send(resp);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default getCartProductController;
