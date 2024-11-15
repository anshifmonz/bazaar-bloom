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

const getFavProducts = async (productId) => {
  const query =
  `SELECT name, price, image_url
  FROM products
  WHERE id = $1`

  try {
    const resp = await db.query(query, [productId]);
    return resp.rows[0];
  } catch (err) {    
    throw new Error('Server error');
  }
}

const getOrderProduct = async (productId) => {
  const query =
  `SELECT name, image_url, price, stock_quantity
  FROM products
  WHERE id =$1`

  try {
    const resp = await db.query(query, [productId]);
    return resp.rows[0];
  } catch (err) {    
    throw new Error('Server error');
  }
}

const updateProductStock = async (productId, quantity) => {
  const query = `UPDATE products SET stock_quantity = stock_quantity - $1 WHERE id = $2`

  try {
    await db.query(query, [quantity, productId]);
  } catch (err) {
    throw new Error('Server error');
  }
}

export { 
  getProduct,
  isProductExist,
  getFavProducts,
  getOrderProduct,
  updateProductStock
};
