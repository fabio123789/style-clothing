import { UnknownAction } from 'redux';
import { CartItem } from './cartTypes.ts';
import { setCartItems, setIsOpen } from './cartAction.ts';

export type CartState = {
  readonly isOpen: boolean;
  readonly cartItems: CartItem[];
};

const initialState: CartState = {
  isOpen: false,
  cartItems: []
};

export const cartReducer = (state = initialState, action: UnknownAction): CartState => {
  if (setIsOpen.match(action)) {
    return {
      ...state,
      isOpen: action.payload
    };
  }
  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload
    };
  }
  return state;
};
