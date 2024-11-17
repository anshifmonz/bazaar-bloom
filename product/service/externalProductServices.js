import { db } from "../config/dbConfig.js";

const getCartProducts = async (productIds) => {
  const query = 
    `SELECT id, name, price, image_url, stock_quantity
    FROM products
    WHERE id = ANY($1::int[])`;

  try {
    const resp = await db.query(query, [productIds]);    
    return resp.rows;
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
  `SELECT name, image_url
  FROM products
  WHERE id =$1`

  try {
    const resp = await db.query(query, [productId]);
    return resp.rows[0];
  } catch (err) {    
    throw new Error('Server error');
  }
}

const updateProductStock = async (stockUpdateData) => {
  const client = await db.connect();

  let failedUpdates = [];
  let retries = 3;

  const performUpdate = async (data) => {
    const query = `UPDATE products SET stock_quantity = stock_quantity - $1 WHERE id = $2`;
    return client.query(query, [data.quantity, data.product_id]);
  };

  const queries = stockUpdateData.map(async (data) => {
    try {
      await performUpdate(data);
    } catch (err) {
      failedUpdates.push(data);
    }
  });

  try {
    await client.query('BEGIN');
    await Promise.all(queries);

    while (failedUpdates.length > 0 && retries > 0) {
      const retryQueries = failedUpdates.map(async (data) => {
        try {
          await performUpdate(data);
        } catch (err) {
          failedUpdates.push(data);
        }
      });
      await Promise.all(retryQueries);
      retries--;
    }

    if (failedUpdates.length > 0) {
      throw new Error('Some stock updates failed after retries');
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw new Error('Server error during product stock update');
  } finally {
    client.release();
  }
};

export { 
  getCartProducts,
  isProductExist,
  getFavProducts,
  getOrderProduct,
  updateProductStock
};
