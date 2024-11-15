import axios from 'axios';

import { db } from "../config/dbConfig.js"

const showOrders = async (userId) => {

  const query =
  `SELECT order_items.id, order_items.product_id, order_items.quantity, 
          order_items.price_at_purchase, order_items.order_id, orders.status
    FROM order_items
    JOIN orders ON order_items.id = orders.id
    WHERE user_id = $1`;

  try {
    const orderItems = await db.query(query, [userId]);
    
    const orderDetails = await Promise.all(
      orderItems.rows.map(async (item) => {        
        const { data } = await axios.get(`http://product-service:3003/order-product/${item.product_id}`);
        return {
          id: item.order_id,
          product_id: item.product_id,
          ...data,
          status: item.status
        }
      })
    )

    return orderDetails;
  } catch (err) {
    throw new Error('Server error');
  }
}

const showAOrderDetails = async (userId, orderId) => {

  const query =
  `SELECT product_id, quantity, price_at_purchase, orders.id AS order_id, orders.status
  FROM order_items
  JOIN orders ON order_items.order_id = orders.id
  WHERE orders.user_id = $1 AND orders.id = $2`

  try {
    const resp = await db.query(query, [userId, orderId]);
    const orderDetail = resp.rows[0];

    const { data } = await axios.get(`http://product-service:3003/order-product/${orderDetail.product_id}`);
    const { name, image_url } = data;

    const combinedResult = {
      ...orderDetail,
      product_name: name,
      product_image_url: image_url,
    };

    return combinedResult;
  } catch (err) {
    throw new Error('Server error');
  }
}

// order from the product page (single product)
const orderProduct = async (userId, productId, quantity) => {
  const client = await db.connect();

  try {
    await client.query('BEGIN');

    const { data } = await axios.get(`http://product-service:3003/order-product/${productId}`);
    const { price, stock_quantity } = data;        
    
    if (stock_quantity < quantity) {
      await client.query('ROLLBACK');
      return 'Not enough stock available'
    };

    const orderResp = await client.query(
      `INSERT INTO orders (user_id, total_price) 
      VALUES ($1, $2) RETURNING id`,
      [userId, price * quantity]
    );
    const orderId = orderResp.rows[0].id;
    
    await client.query(
      `INSERT INTO order_items
      (order_id, product_id, quantity, price_at_purchase)
      VALUES ($1, $2, $3, $4)`,
      [ orderId, productId, quantity, price]
    );

    const retries = 3;
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const { status } = await axios.post(`http://product-service:3003/update-stock/`, {
          productId,
          quantity
        });        
        if (status === 200) {
          await client.query('COMMIT');
          return
        }
      } catch (err) {
        if (attempt === retries) {          
          throw err
        }
      }
    }
  } catch (err) {
    await client.query('ROLLBACK');
    throw new Error('Server error');
  } finally {
    client.release();
  }
};

// order from the cart page (multiple product (if any))
const orderCart = async (userId) => {
  const client = await db.connect();

  try {

    // collecting items from user's cart
    const { data: cartData } = await axios.get(`http://cart-service:3002/get-cart/${userId}`);
    if (!cartData || cartData.length === 0) return 'Cart is empty';
    
    // fetch product details and assemble cart items with price and stock details
    const cartItems = await Promise.all(
      cartData.map(async item => {
        const { data: productData  } = await axios.get(`http://product-service:3003/order-product/${item.product_id}`);
        const { price, stock_quantity } = productData;

        return {
          cart_id: item.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price,
          stock_quantity
        }
      })
    );
    
    // calculate total price and check stock availability 
    let totalPrice = 0;
    let unavailableItems = [];

    cartItems.forEach(item => {
      if (item.stock_quantity < item.quantity) {
        unavailableItems.push({ cart_id: item.cart_id, productId: item.product_id, available: item.stock_quantity });
      } else {
        totalPrice += item.price * item.quantity
      }
    })
    if (unavailableItems.length > 0) return { noStock: unavailableItems };

    await client.query('BEGIN');

    // placing order
    const orderResp = await client.query(
      'INSERT INTO orders (user_id, total_price) VALUES ($1, $2) RETURNING id',
      [userId, totalPrice]
    );
    const orderId = orderResp.rows[0].id;

    for (const item of cartItems) {
      await client.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase)\
        VALUES ($1, $2, $3, $4)',
        [orderId, item.product_id, item.quantity, item.price]
      );
      
      // decrease the stock_quantity of purchased products
      const { status } = await axios.post(`http://product-service:3003/update-stock/`, {
        productId: item.product_id,
        quantity: item.quantity
      });
      if (status !== 200) throw new Error('Server error');
    }

    // removing items from cart after successful order
    const { status } = await axios.post(`http://cart-service:3002/remove-cart-item/`, {
      userId
    });
    if (status !== 200) throw new Error('Server error');

    await client.query('COMMIT');
  } catch (err) {    
    await client.query('ROLLBACK');
    throw new Error('Server error');
  } finally {
    client.release();
  }
}

const cancelOrder = async (userId, orderId) => {
  try {
    await db.query(
      'UPDATE orders SET status = \'cancelled\' WHERE user_id = $1 AND id = $2',
      [userId, orderId]
    );
  } catch (err) {
    throw new Error('Server error');
  }
}

export { showOrders, showAOrderDetails, orderProduct, orderCart, cancelOrder };
