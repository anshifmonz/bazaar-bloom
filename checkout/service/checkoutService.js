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
    
    const { data: cardResponse } = await axios.get(`http://user-service:3001/card/get-card/${userId}`);
    const cards = cardResponse?.cards || [];

    return { checkoutItems, totalPrice, userAddress, cards };
  } catch (err) {
    throw new Error('Server error');
  }
}

const cartCheckout = async (userId, email, currency, body) => {
  const { 
    address,
    isNewAddress,
    isNeedUpdate,
    isNeedAddAddress,
    token,
    isNewCard,
    isNeedAddCard  
  } = body;

  try {
    // Fetch cart data
    const { data: cartData } = await axios.get(`http://cart-service:3001/get-cart/${userId}`);
    if (!cartData || cartData.length === 0) return { success: false, message: 'Cart is empty' };

    // Fetch product data
    const productIds = cartData.map(item => item.product_id);
    const { data: products } = await axios.post(`http://product-service:3001/cart-products`, { productIds });

    // Prepare checkout items
    const checkoutItems = cartData.map(item => {
      const product = products.find(p => p.id === item.product_id);
      return {
          product_id: item.product_id,
          quantity: item.quantity,
          price: product.price,
          stock_quantity: product.stock_quantity
      };
    });

    // Validate stock availability
    const unavailableItems = checkoutItems.filter(item => item.quantity > item.stock_quantity);
    if (unavailableItems.length > 0) return { success: false, noStock: unavailableItems, message: 'Some items are out of stock' };
    
    const totalPrice = checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Handle address logic
    if (isNewAddress && isNeedAddAddress) {
      const { status } = await axios.post(`http://user-service:3001/details/external-add-address`, { userId, address });
      if (status === 500) return { success: false }
    } else if (isNeedUpdate) {
      const { status } = await axios.put(`http://user-service:3001/details/external-update-address`, { userId, address });
      if (status === 500) return { success: false }
    }

    // Handle card logic
    if (isNewCard) {
      const { status } = await axios.post(`http://user-service:3001/card/external-add-card`, {
        userId,
        email,
        token,
        save: isNeedAddCard,
      });
      if (status !== 200) return { success: false };
    }

    // Initiate payment
    const { data: payment } = await axios.post(`http://payment-service:3001/initiate-payment`, {
      amout: totalPrice,
      currency,
      description: 'Testing'
    });

    return { success: true, payment };
  } catch (err) {
    throw new Error('cartCheckout failed: ' + err);
  }
}

export { ShowCartCheckout, cartCheckout };
