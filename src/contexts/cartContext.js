import { createContext, useState } from "react";

export const cartContext = createContext({
  cartDropdown: false,
  setCartDropdown: () => null,
  cart: [],
  setCart: () => null,
});

export const CartProvider = ({ children }) => {
  const [cartDropdown, setCartDropdown] = useState(false);
  const [cart, setCart] = useState([]);
  const value = { cartDropdown, setCartDropdown, cart, setCart };
  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};
