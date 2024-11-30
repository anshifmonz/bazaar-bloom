import { updateAddress } from "../../service/userService.js";
import addressValidator from "../../utils/addressValidator.js";

const updateAddressController = async (req, res) => {
  const userId = req.user.id;
  const { address } = req.body;

  try {
    const { valid, message } = addressValidator(address);
    if (!valid) return res.status(400).json({ success: false, message: message });

    await updateAddress(userId, address);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false })
  }
}

export default updateAddressController;
