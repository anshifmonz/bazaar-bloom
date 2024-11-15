import { db } from '../config/dbConfig.js';

const getCartDetails = async (userId) => {
  const query =
  `SELECT id, product_id, quantity
  FROM cart_items
  WHERE cart_id = (SELECT id FROM cart WHERE user_id = $1)`

  try {
    const resp = await db.query(query, [userId]);
    return resp.rows;
  } catch (err) {    
    throw new Error('Server error');
  }
}

const removeCartItem = async (userId) => {
  const query = `DELETE FROM cart_items WHERE cart_id = (SELECT id FROM cart WHERE user_id = $1)`

  try {    
    await db.query(query, [userId]);    
  } catch (err) {
    throw new Error('Server error');
  }
}

export {
  getCartDetails,
  removeCartItem
}