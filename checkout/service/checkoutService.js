import axios from "axios";

const checkoutOrder = async (userId) => {
  try {
    
    const { data: orderData } = await axios.post('http://order-service:3001/order-item', {
      userId
    });
    
    const checkoutItems = await Promise.all(
      orderData.map(async item => {
        const { data: productData } = await axios.get(`http://product-service:3001/cart-product/${item.product_id}`);
        const { name } = productData;        
        
        return {
          price_at_purchase: item.price_at_purchase,
          quantity: item.quantity,
          total_price: item.total_price,
          product_id: item.product_id,
          product_name: name
        }
      })
    );    

    return checkoutItems;    
  } catch (err) {    
    throw new Error('Server error');
  }
}

export default checkoutOrder;
