import { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    return storedCart ? storedCart : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + product.quantity, item.stock) }
            : item
        );
      } else {
        return [...prevCart, product];
      }
    });
  };
  

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  const updateCartItem = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: parseInt(quantity, 10) } : item
      )
    );
  };
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartItem, getTotalItems, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
