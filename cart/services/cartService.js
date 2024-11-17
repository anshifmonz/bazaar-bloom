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
    const cartData = await db.query(query, [userId]);
    if (!cartData || cartData.length === 0) return 'Cart is empty';
    
    const productIds = cartData.rows.map(item => item.product_id);
    const { data: products } = await axios.post(`http://product-service:3001/cart-products/`, {
      productIds
    });

    const cartItems = cartData.rows.map(item => {
      const product = products.find(p => p.id === item.product_id);
      return {
        cart_id: item.id,
        product_id: item.product_id,
        quantity: item.quantity,
        name: product.name,
        price: product.price,
        image: product.image_url,
        stock_quantity: product.stock_quantity
      };
    });

    return cartItems;
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
