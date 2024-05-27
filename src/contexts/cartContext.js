import { createContext, useState } from "react";

const addCartItem = (cartItems = [], product = {}) => {
  const foundIndex = cartItems.findIndex(
    (cartItem) => cartItem.id === product.id
  );

  if (foundIndex >= 0) {
    return cartItems.map((cartItem, index) =>
      index === foundIndex
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  } else {
    return [...cartItems, { ...product, quantity: 1 }];
  }
};

export const cartContext = createContext({
  cartDropdown: false,
  setCartDropdown: () => null,
  cartItems: [],
  addItemToCart: () => null,
  getTotalQuantity: () => null,
});

export const CartProvider = ({ children }) => {
  const [cartDropdown, setCartDropdown] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product));
  };

  const getTotalQuantity = () => {
    return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
  };

  const value = {
    cartDropdown,
    setCartDropdown,
    cartItems,
    addItemToCart,
    getTotalQuantity,
  };
  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};
