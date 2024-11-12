import { db } from "../../config/dbConfig.js";

const getFavProducts = async (userId) => {
  try {
    const resp = await db.query(
      'SELECT products.id, products.name, products.price, products.image_url\
      FROM products\
      JOIN favorites ON favorites.product_id = products.id\
      WHERE favorites.user_id = $1',
      [userId]
    )
    return resp.rows
  } catch (err) {
    console.log('getFav: ' + err);
    throw new Error('Server error');
  }
}

const addFavProduct = async (userId, productId) => {
  try {
    await db.query(
      'INSERT INTO favorites (user_id, product_id) VALUES ($1, $2)',
      [userId, productId]
    )
  } catch (err) {
    console.log('addFavProduct: ' + err);    
    throw new Error('Server error');
  }
}

const rmFavProduct = async (userId, productId) => {
  try {
    await db.query(
      'DELETE FROM favorites\
      WHERE user_id = $1\
      AND product_id = $2',
      [userId, productId]
    )
  } catch (err) {
    console.log('rmFavProduct: ' + err);
    throw new Error('Server error');
  }
}

export { getFavProducts, addFavProduct, rmFavProduct };
