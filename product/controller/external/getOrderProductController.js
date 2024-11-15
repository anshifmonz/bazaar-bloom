import { getOrderProduct } from "../../service/externalProductServices.js";

const getOrderProductController = async (req, res) => {
  const { productId } = req.params;

  try {
    const resp = await getOrderProduct(productId);
    res.status(200).send(resp);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default getOrderProductController;
