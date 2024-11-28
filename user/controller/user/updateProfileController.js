import { updateProfile } from "../../service/userService.js";
import getQuery from "../../utils/profileDataExtractor.js";

async function updateProfileController(req, res) {
  const userId = req.user.id;
  const body = req.body;
  
  try {
    const { query, values, error } = getQuery(body, userId);    
    if (error) return res.status(400).json({ success: false, message: error });
    
    const resp = await updateProfile(query, values);
    res.status(200).json({ success: true, data: resp });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
}

export default updateProfileController;
