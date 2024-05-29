import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;

export const selectIsOpen = createSelector(
  [selectCartReducer],
  (cartReducer) => cartReducer.isOpen
);

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cartReducer) => cartReducer.cartItems
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectTotalValue = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.price * cartItem.quantity,
    0
  )
);
