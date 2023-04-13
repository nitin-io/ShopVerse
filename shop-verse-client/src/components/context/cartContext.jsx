import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

// To get a value we need to wrap a component with Context.Provider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart"));
    if (data) {
      setCart([...data]);
    }
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
