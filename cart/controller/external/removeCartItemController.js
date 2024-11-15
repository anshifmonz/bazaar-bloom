import { removeCartItem } from "../../services/externalCartService.js";

const removeCartItemController = async (req, res) => {
  const { userId } = req.body; 

  try {
    await removeCartItem(userId);
    res.status(200).send('ok');
  } catch (err) {    
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default  removeCartItemController;
