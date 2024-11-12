import { CreateUser, getUserByEmail } from '../../service/auth/userService.js';
import { hashPassword } from '../../utils/auth/passwordHandler.js';
import { createCart } from '../../service/store/cartService.js';

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const isExist = await getUserByEmail(email, 'exist')
    if (isExist) return res.status(302).json({ message: 'User already exist' })
    
    const hashPasswd = await hashPassword(password);
    const result = await CreateUser(name, email, hashPasswd);
    const userId = result[0].id;
    createCart(userId);
  
    res.status(201).json({ success: true, message: 'User created' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

export default registerUser;
