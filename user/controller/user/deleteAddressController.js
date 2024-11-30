import { deleteAddress } from "../../service/userService.js";

const deleteAddressController = async (req, res) => {
  const userId = req.user.id;
  const { addressId } = req.body;
  
  try {  
    await deleteAddress(userId, addressId);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: true, message: 'Server error' });
  }
}

export default deleteAddressController;
