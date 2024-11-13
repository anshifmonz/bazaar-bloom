import { db } from "../config/dbConfig.js";

const checkoutOrder = async (userId) => {
  try {
    const resp = await db.query(
      `SELECT order_items.price_at_purchase, order_items.quantity,
              products.name, orders.total_price
      FROM order_items
      JOIN products ON order_items.product_id = products.id
      JOIN orders ON order_items.order_id = orders.id
      WHERE orders.user_id = $1`,
      [userId]
    );

    return resp.rows;
  } catch (err) {
    console.log('checkoutOrder: ' + err);
    throw new Error('Server error');
    
  }
}

export default checkoutOrder;
