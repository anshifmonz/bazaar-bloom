import { db } from "../../config/dbConfig.js";

const getProducts = async (query, values) => {
  try {
    const resp = await db.query(query, values);
    return resp.rows;
  } catch (err) {
    console.log('getProducts: ' + err);
    return 'err'
  }
}

const addProduct = async (req) => {
  const { name, description, price, stock, category, img_url } = req.body

  const regex = /^\d+(\.\d+)?$/;
  if (!regex.test(price) || !regex.test(stock)) return 'err1'
  
  try {
    await db.query(
      'INSERT INTO products (name, description, price, stock_quantity, category, image_url) VALUES ($1, $2, $3, $4, $5, $6)',
      [name, description, price, stock, category, img_url]
    )
  } catch (err) {
    console.log('addProduct: ' + err)
    return 'err'
  }
}

const updateProduct = async (query, values) => {
  try {
    await db.query(query, values);
  } catch (err) {
    console.log('updateProduct');
    return 'err'
  }
}

const delProduct = async (id) => {

  if (Array.isArray(id) && id.length === 0) {
    return
  }

  let query = 'DELETE FROM products WHERE id IN (';
  let paramIndex = 1;
  let values = [];

  if (typeof(id) === 'object') {
    // for deleting multiple products at a time
    id.forEach((ele, i) => {
      query += `$${paramIndex}`;
      if (i != id.length - 1)  query += ', '
      values.push(ele);
      paramIndex++;
    });
    
  } else {
    query += '$1';
    values.push(id);
  }
  query += ')'
  
  try {
    await db.query(query, values)
    return
  } catch (err) {
    return 'err'
  }
}

export { getProducts, addProduct, delProduct, updateProduct };
