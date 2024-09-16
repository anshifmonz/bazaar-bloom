import { db } from "../../config/dbConfig.js"
import { getProducts } from "./productService.js";

const showOrder = async (userId) => {
  try {
    const resp = await db.query(
      'SELECT order_items.product_id, order_items.quantity, order_items.price_at_purchase, order_items.order_id,\
              products.id AS product_id, products.name, products.image_url\
      FROM order_items\
      JOIN products ON order_items.product_id = products.id\
      JOIN orders ON order_items.order_id = orders.id\
      WHERE orders.user_id = $1',
      [userId]
    );

    return resp.rows;
  } catch (err) {
    console.log('showOrder: ' + err);
    return 'err';
  }
}

const showAOrderDetails = async (userId, orderId) => {
  try {
    const resp = await db.query(
      'SELECT order_items.quantity, order_items.price_at_purchase,\
              products.id AS product_id, products.name, products.image_url,\
              orders.id AS order_id, orders.status\
      FROM order_items\
      JOIN products ON order_items.product_id = products.id\
      JOIN orders ON order_items.order_id = orders.id\
      WHERE orders.user_id = $1 AND orders.id = $2',
      [userId, orderId]
    );

    return resp.rows;
  } catch (err) {
    console.log('showAOrderDetails: ' + err);
    return 'err';
  }
}

// order from the product page
const orderProduct = async (userId, productId, quantity) => {
  try {
    const product = await getProducts('SELECT price, stock_quantity FROM products WHERE id = $1', [productId]);
    
    if (product[0].stock_quantity < quantity) return 'Not enough stock available';

    const orderResp = await db.query(
      'INSERT INTO orders (user_id, total_price) VALUES ($1, $2) RETURNING id', [userId, product[0].price * quantity]
    );
    
    await db.query(
      'INSERT INTO order_items \
      (order_id, product_id, quantity, price_at_purchase)\
      VALUES ($1, $2, $3, $4)',
      [ orderResp.rows[0].id, productId, quantity, product[0].price]
    );

    await db.query(
      'UPDATE products SET stock_quantity = stock_quantity - $1 WHERE id = $2',
      [quantity, productId]
    );

  } catch (err) {
    console.log('orderProduct: ' + err);
    return 'err';
  }
}

// order from the cart page
const orderCart = async (userId) => {
  try {

    // collecting items from user's cart
    const cartItems = await db.query(
      'SELECT cart_items.product_id, cart_items.quantity, products.price, products.stock_quantity\
      FROM cart_items\
      JOIN products ON cart_items.product_id = products.id\
      WHERE cart_items.cart_id = (SELECT id FROM cart WHERE user_id = $1)',
      [userId]
    )

    if (cartItems.rows.length === 0) return 'Cart is empty';
    
    // calculating total price and checking availability of stock 
    let totalPrice = 0;
    let returnMesssage = { noStock: []};
    cartItems.rows.forEach(item => {
      if (item.stock_quantity < item.quantity) {
        returnMesssage.noStock.push(item.product_id);
      } else {
        totalPrice += item.price * item.quantity
      }
    })
    if (returnMesssage.noStock[0]) return returnMesssage;

    // placing order
    const orderResp = await db.query(
      'INSERT INTO orders (user_id, total_price) VALUES ($1, $2) RETURNING id',
      [userId, totalPrice]
    );

    for (const item of cartItems.rows) {
      await db.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase)\
        VALUES ($1, $2, $3, $4)',
        [orderResp.rows[0].id, item.product_id, item.quantity, item.price]
      );
      
      // decreasing the stock_quantity of purchased products
      await db.query(
        'UPDATE products SET stock_quantity = stock_quantity - $1 WHERE id = $2',
        [item.quantity, item.product_id]
      )
    }

    // removing items from cart after successful order
    await db.query(
      'DELETE FROM cart_items WHERE cart_id = (SELECT id FROM cart WHERE user_id = $1)',
      [userId]
    );

  } catch (err) {
    console.log('orderCart: ' + err);
    return 'err';
  }
}

const cancelOrder = async (userId, orderId) => {
  try {
    await db.query(
      'UPDATE orders SET status = \'cancelled\' WHERE user_id = $1 AND id = $2',
      [userId, orderId]
    );
  } catch (err) {
    console.log('cancelOrder: ' + err);
    return 'err';
  }
}

export { showOrder, showAOrderDetails, orderProduct, orderCart, cancelOrder };
