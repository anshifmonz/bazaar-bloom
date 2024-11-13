import { db } from '../config/dbConfig.js';

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
  `SELECT products.name, products.price, cart_items.quantity, cart_items.product_id
  FROM cart_items
  JOIN products ON cart_items.product_id = products.id
  JOIN cart ON cart_items.cart_id = cart.id
  WHERE cart.user_id = $1`
  
  try {
    const resp = await db.query(query, [userId]);
    return resp.rows;
  } catch (err) {
    console.log('getCart: ' + err);
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
    console.log('cartProductExistCheck: ' + err);
    throw new Error('Server error');
  }
}

const addCartItem = async (userId, productId) => {
  const query =
  `INSERT INTO cart_items (cart_id, product_id) VALUES ((SELECT id FROM cart WHERE user_id = $1), $2)`

  try {
    await db.query(query, [userId, productId])
  } catch (err) {
    if (err.message.includes('violates foreign key constraint')) return 'not exist';
    throw new Error('Server error');
  }
}

const updateCartQuantity = async (userId, productId, quantity) => {
  const query =
  `UPDATE cart_items
  SET quantity = $3
  FROM cart
  WHERE cart_items.cart_id = cart.id
    AND cart_items.product_id = $2
    AND cart.user_id = $1`
  
  try {
    await db.query(query, [ userId, productId, quantity ]);
  } catch (err) {
    console.log('updateCartQuantity: ' + err);
    throw new Error('Server error');
  }
}

const delCartProduct = async (userId, productId) => {
  const query =
  `DELETE FROM cart_items
  USING cart
  WHERE cart_items.cart_id = cart.id
  AND cart.user_id = $1
  AND cart_items.product_id = $2`

  try {
    await db.query(query, [userId, productId]);
  } catch (err) {
    console.log('delCartProduct: ' + err);
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
