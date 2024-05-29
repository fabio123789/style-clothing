import { cartActionType } from "./cartTypes";

const initialState = {
  isOpen: false,
  cartItems: [],
};

export const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case cartActionType.setIsOpen:
      return {
        ...state,
        isOpen: payload,
      };
    case cartActionType.setCartItems:
      return {
        ...state,
        cartItems: payload,
      };
    default:
      return state;
  }
};
