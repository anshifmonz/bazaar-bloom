import { CreateUser, getUserByEmail } from '../../service/auth/userService.js';
import { hashPassword } from '../../utils/auth/passwordHandler.js';

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const isExist = await getUserByEmail(email, 'exist')
  if (isExist === 'err') return res.status(500).json({ message: 'Server error' })
  if (isExist) return res.status(302).json({ message: 'User already exist' })
  
  const hashPasswd = await hashPassword(password);
  if (hashPasswd === 'err') return res.status(500).json({ message: 'Server error' })
  
  const result = await CreateUser(name, email, hashPasswd);
  if (result === 'err') res.status(500).json({ message: 'Server error' });
  res.status(201).json({ success: true, message: 'User created' })
}

export default registerUser;
