import { rmFavProduct } from "../service/favoriteService.js";

const delFavProductController = async (req, res) => {
  const userId = req.user.id;
  const { favId } = req.body;
  const regex = /^\d+(\.\d+)?$/;
  
  if (!regex.test(favId)) return res.status(400).json({ success: false, message: 'Invalid input' });

  try {
    await rmFavProduct(userId, favId);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default delFavProductController;
