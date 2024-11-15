import { db } from '../config/dbConfig.js';

const getOrderItemDetails = async (userId) => {
  const query =
  `SELECT order_items.price_at_purchase, order_items.quantity,
          order_items.product_id, orders.total_price
    FROM order_items
    JOIN orders ON order_items.order_id = orders.id
    WHERE orders.user_id = $1`

  try {
    const resp = await db.query(query, [userId]);
    return resp.rows;
  } catch (err) {    
    throw new Error('Server error');
  }
}

export default getOrderItemDetails;
