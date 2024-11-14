import { isProductExist } from "../../service/externalProductServices.js";

const productExistCheckController = async (req, res) => {
  const { productId } = req.params;

  try {
    const resp = await isProductExist(productId);
    console.log(resp);
    
    if (resp) return res.status(404).json({ success: true, message: 'Product doesn\'t exist' });

    res.status(200).send('ok')
  } catch (err) {
    res.status(500).json({ success: false });
  }
}

export default productExistCheckController;
