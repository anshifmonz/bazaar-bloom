import { db } from "../config/dbConfig.js";

const getProduct = async (productId) => {
  const query =
  `SELECT name, price
  FROM products
  WHERE id = $1`

  try {
    const resp = await db.query(query, [productId]);    
    return resp.rows[0];
  } catch (err) {    
    throw new Error('Server error');  
  }
}

const isProductExist = async (productId) => {
  const query =
  `SELECT * FROM products WHERE id = $1`

  try {
    const resp = await db.query(query, [productId]);       
    return resp.rows.length === 0;
  } catch (err) {
    throw new Error('Server error');
    
  }
}

export { getProduct, isProductExist };
