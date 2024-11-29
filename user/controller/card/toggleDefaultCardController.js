import { toggleDefaultCard } from "../../service/cardServices";

const toggleDefaultCardController= async (req, res) => {
  const userId = req.user.id;
  const { cardId } = req.body;

  try {
    await toggleDefaultCard(userId, cardId);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
}

export default toggleDefaultCardController;
