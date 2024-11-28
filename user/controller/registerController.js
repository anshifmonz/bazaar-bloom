import axios from 'axios';

import { CreateUser, getUserByEmail } from '../service/userService.js';
import { hashPassword } from '../utils/passwordHandler.js';

const createCart = async (userId) => {
  const retries = 3;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const cartResponse = await axios.post('http://cart-service:3001/create-cart', { userId });
      if (cartResponse.status === 201) break
    } catch (error) {
      if (attempt === retries) break
    }
  }
}

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const isExist = await getUserByEmail(email, 'exist')
    if (isExist) return res.status(302).json({ message: 'User already exist' })
    
    const hashPasswd = await hashPassword(password);
    const result = await CreateUser(firstName, lastName, email, hashPasswd);
    const userId = result[0].id;

    res.status(201).json({ success: true, message: 'User created' });
    await createCart(userId);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

export default registerUser;
