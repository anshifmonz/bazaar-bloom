import axios from 'axios'
import { db } from "../config/dbConfig.js";

const getFavProducts = async (userId) => {  
  try {
    const query =
      `SELECT id, product_id
      FROM favorites
      WHERE user_id = $1`;

    const FavItems = await db.query(query, [userId]);    
    const productDetails = await Promise.all(
      FavItems.rows.map(async (item) => {        
        const { data } = await axios.get(`http://product-service:3001/favorite-product/${item.product_id}`);        
        return {
          id: item.id,
          ...data,
        }
      })
    )
    return productDetails;
  } catch (err) {
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
    throw new Error('Server error');
  }
}

const rmFavProduct = async (userId, favId) => {
  try {
    await db.query(
      'DELETE FROM favorites\
      WHERE user_id = $1\
      AND id = $2',
      [userId, favId]
    )
  } catch (err) {
    throw new Error('Server error');
  }
}

export { getFavProducts, addFavProduct, rmFavProduct };
