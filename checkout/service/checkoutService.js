import axios from "axios";

const ShowCartCheckout = async (userId, userAddress) => {
  try {
    // Fetch cart data
    const { data: cartData } = await axios.get(`http://cart-service:3001/get-cart/${userId}`);
    if (!cartData || cartData.length === 0) return 'Cart is empty';
    
    // Fetch product data
    const productIds = cartData.map(item => item.product_id);
    const { data: products } = await axios.post(`http://product-service:3001/cart-products`, { productIds });
    
    const checkoutItems = cartData.map(item => {
      const product = products.find(p => p.id === item.product_id);
      return {
        cart_id: item.id,
        product_id: item.product_id,
        quantity: item.quantity,
        name: product.name,
        image_url: product.image_url,
        price: product.price,
        stock_quantity: product.stock_quantity
      };
    });
    
    const unavailableItems = checkoutItems.filter(item => item.stock_quantity < item.quantity);
    if (unavailableItems.length > 0) return { noStock: unavailableItems };
    
    const totalPrice = checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0);  
    
    const { data: cardResponse } = await axios.get(`http://user-service:3001/card/get-card`);
    const cards = cardResponse.cards || [];

    return { checkoutItems, totalPrice, userAddress, cards };
  } catch (err) {
    throw new Error('Server error');
  }
}

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

export { ShowCartCheckout, checkoutOrder };
