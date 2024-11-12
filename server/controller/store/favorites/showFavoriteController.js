import { getFavProducts } from "../../../service/store/favoriteService.js";

const showFavoriteController = async (req, res) => {
  const userId = req.user.id;

  try {
    const resp = await getFavProducts(userId);
    res.status(200).json({ success: true, data: resp });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default showFavoriteController;
