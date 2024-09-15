import { getFavProducts } from "../../../service/store/favoriteService.js";

const showFavoriteController = async (req, res) => {
  const userId = req.user.id;

  const resp = await getFavProducts(userId);
  if (resp === 'err') return res.status(500).json({ success: false, message: 'Server error' });

  res.status(200).json({ success: true, data: resp });
}

export default showFavoriteController;
