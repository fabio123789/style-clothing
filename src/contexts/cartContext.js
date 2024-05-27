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

const handleCartItemAction = (cartItems, cartItem, action) => {
  switch (action) {
    case "add":
      return cartItems.map((tempCartItem) =>
        tempCartItem.id === cartItem.id
          ? { ...tempCartItem, quantity: tempCartItem.quantity + 1 }
          : tempCartItem
      );
    case "remove":
      return cartItems
        .map((tempCartItem) =>
          tempCartItem.id === cartItem.id
            ? {
                ...tempCartItem,
                quantity:
                  tempCartItem.quantity > 0 ? tempCartItem.quantity - 1 : 0,
              }
            : tempCartItem
        )
        .filter((tempCartItem) => tempCartItem.quantity > 0);
    case "delete":
      return cartItems.filter(
        (tempCartItem) => tempCartItem.id !== cartItem.id
      );
    default:
      return cartItems;
  }
};

export const cartContext = createContext({
  cartDropdown: false,
  setCartDropdown: () => null,
  cartItems: [],
  addItemToCart: () => null,
  getTotalQuantity: () => null,
  handleCartItem: () => null,
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

  const handleCartItem = (cartItem, action) => {
    setCartItems(handleCartItemAction(cartItems, cartItem, action));
  };

  const value = {
    cartDropdown,
    setCartDropdown,
    cartItems,
    addItemToCart,
    getTotalQuantity,
    handleCartItem,
  };
  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};
