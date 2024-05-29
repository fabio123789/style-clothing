import { createAction } from "../../utils/reducer/reducer";
import { cartActionType } from "./cartTypes";

export const setIsOpen = (isOpen) => {
  return createAction(cartActionType.setIsOpen, isOpen);
};

export const setCartItems = (cartItems) => {
  return createAction(cartActionType.setCartItems, cartItems);
};

export const handleCartItemAction = (cartItems, cartItem, action) => {
  switch (action) {
    case "add":
      return setCartItems(
        cartItems.map((tempCartItem) =>
          tempCartItem.id === cartItem.id
            ? { ...tempCartItem, quantity: tempCartItem.quantity + 1 }
            : tempCartItem
        )
      );
    case "remove":
      return setCartItems(
        cartItems
          .map((tempCartItem) =>
            tempCartItem.id === cartItem.id
              ? {
                  ...tempCartItem,
                  quantity:
                    tempCartItem.quantity > 0 ? tempCartItem.quantity - 1 : 0,
                }
              : tempCartItem
          )
          .filter((tempCartItem) => tempCartItem.quantity > 0)
      );
    case "delete":
      return setCartItems(
        cartItems.filter((tempCartItem) => tempCartItem.id !== cartItem.id)
      );
    default:
      return setCartItems(cartItems);
  }
};
