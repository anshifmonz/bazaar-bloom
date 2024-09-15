import { addCartItem, cartProductExistCheck } from "../../../service/store/cartService.js";

const addCartItemController = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  const regex = /^\d+(\.\d+)?$/;
  if (!regex.test(productId)) return res.status(400).json({ success: false, message: 'Invalid input' });

  const isExist = await cartProductExistCheck(userId, productId);
  if (isExist) return res.status(409).json({ success: false, message: 'Already exist' });

  const resp = await addCartItem(userId, productId);
  if (resp === 'err1') return res.status(404).json({ success: false, message: 'Product doesn\'t exist' });
  if (resp === 'err') return res.status(500).json({ success: false, message: 'Server error' });

  res.status(200).json({ success: true });
}

export default addCartItemController;
