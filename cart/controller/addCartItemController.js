import axios from 'axios';

import { addCartItem, cartProductExistCheck } from "../services/cartService.js";

const productExistCheck = async (productId) => {
  try {
    
    const resp = await axios.get(`http://product-service:3003/product-exist-check/${productId}`);
    
    if (resp.status === 404) return false
    return true
  } catch (axiosError) {
    if (axiosError.response && axiosError.response.status === 404) {
      return false
    }
    throw axiosError;
  }
}

const addCartItemController = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  const regex = /^\d+(\.\d+)?$/;
  if (!regex.test(productId)) return res.status(400).json({ success: false, message: 'Invalid input' });

  try {
    const isProductExist = await productExistCheck(productId);
    if (!isProductExist) return res.status(409).json({ success: false, message: 'Product doesn\'t exist' });

    const isExist = await cartProductExistCheck(userId, productId);
    if (isExist) return res.status(409).json({ success: false, message: 'Cart item already exist' });

    await addCartItem(userId, productId);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default addCartItemController;
