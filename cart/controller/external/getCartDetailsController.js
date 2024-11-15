import { getCartDetails } from "../../services/externalCartService.js";

const getCartDetailsController = async (req, res) => {
  const { userId } = req.params;

  try {
    const resp = await getCartDetails(userId);
    res.status(200).send(resp);
  } catch (err) {    
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default getCartDetailsController;
