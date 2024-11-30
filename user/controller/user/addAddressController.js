import { addAddress } from "../../service/userService.js";
import addressValidator from "../../utils/addressValidator.js";

const addAddressController = async (req, res) => {
  const userId = req.user.id;
  const { address } = req.body;
  
  try {
    const { valid, message } = addressValidator(address);
    if (!valid) return res.status(400).json({ success: false, message: message });
  
    await addAddress(userId, address);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: true, message: 'Server error' });
  }
}

export default addAddressController;
