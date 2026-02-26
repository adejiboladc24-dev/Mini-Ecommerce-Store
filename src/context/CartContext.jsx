import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1, selectedOptions = {}) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(
        item => item.id === product.id && 
        JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
      );

      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id && 
          JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevCart, { ...product, quantity, selectedOptions }];
    });
  };

  const removeFromCart = (productId, selectedOptions = {}) => {
    setCart(prevCart =>
      prevCart.filter(
        item => !(item.id === productId && 
        JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions))
      )
    );
  };

  const updateQuantity = (productId, quantity, selectedOptions = {}) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedOptions);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId && 
        JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
