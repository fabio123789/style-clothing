import { createSelector } from 'reselect'
import { CartItem } from './cartTypes'
import { CartState } from './cartReducer'
import { RootState } from '../Store'

const selectCartReducer = (state: RootState): CartState => state.cart

export const selectIsOpen = createSelector(
  [selectCartReducer],
  (cartReducer) => cartReducer.isOpen
)

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cartReducer) => cartReducer.cartItems
)

export const selectCartCount = createSelector([selectCartItems], (cartItems): number =>
  cartItems.reduce((total: number, cartItem: CartItem) => total + cartItem.quantity, 0)
)

export const selectTotalValue = createSelector([selectCartItems], (cartItems): number =>
  cartItems.reduce(
    (total: number, cartItem: CartItem) => total + cartItem.price * cartItem.quantity,
    0
  )
)
