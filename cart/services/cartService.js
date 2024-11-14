import { db } from '../config/dbConfig.js';
import axios from 'axios';

const createCart = async (userId) => {
  try {
    const checkIsExist = await db.query('SELECT * FROM cart WHERE user_id = $1', [userId]);
    if (checkIsExist.rows.length > 0) return 'Cart already exist';

    await db.query('INSERT INTO cart (user_id) VALUES ($1)', [userId])
  } catch (err) {
    throw new Error('Server error');
  }
}

const getCart = async (userId) => {
  const query =
  `SELECT id, product_id, quantity
  FROM cart_items
  WHERE cart_id = (SELECT id FROM cart WHERE user_id = $1)`
  
  try {
    const cartItems = await db.query(query, [userId]);
    
    const productDetails = await Promise.all(
      cartItems.rows.map(async (item) => {        
        const { data } = await axios.get(`http://product-service:3003/cart-product/${item.product_id}`);        
        return {
          id: item.id,
          ...data,
          quantity: item.quantity
        }
      })
    )

    return productDetails;
  } catch (err) {
    throw new Error('Server error');
  }
}

const cartProductExistCheck = async (userId, productId) => {
  try {
    const resp = await db.query(
      'SELECT cart_items.id\
      FROM cart_items\
      JOIN cart ON cart_items.cart_id = cart.id\
      WHERE cart.user_id = $1\
      AND cart_items.product_id = $2',
      [userId, productId]);
      
      if (resp.rows.length > 0) return true;
      return false;

  } catch (err) {
    throw new Error('Server error');
  }
}

const addCartItem = async (userId, productId) => {
  const query =
  `INSERT INTO cart_items (cart_id, product_id) VALUES ((SELECT id FROM cart WHERE user_id = $1), $2)`

  try {
    await db.query(query, [userId, productId])
  } catch (err) {
    throw new Error('Server error');
  }
}

const updateCartQuantity = async (userId, cartItemId, quantity) => {
  const query =
  `UPDATE cart_items
  SET quantity = $3
  FROM cart
  WHERE cart_items.cart_id = cart.id
    AND cart_items.id = $2
    AND cart.user_id = $1`
  
  try {
    await db.query(query, [ userId, cartItemId, quantity ]);
  } catch (err) {
    throw new Error('Server error');
  }
}

const delCartProduct = async (userId, cartItemId) => {
  const query =
  `DELETE FROM cart_items
  USING cart
  WHERE cart_items.cart_id = cart.id
  AND cart.user_id = $1
  AND cart_items.id = $2`

  try {
    await db.query(query, [userId, cartItemId]);
  } catch (err) {
    throw new Error('Server error');
  }
}

export { 
  createCart,
  getCart,
  cartProductExistCheck,
  addCartItem,
  updateCartQuantity,
  delCartProduct 
};
