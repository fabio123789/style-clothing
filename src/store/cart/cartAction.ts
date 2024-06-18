import { ActionWithPayload, createAction, withMatcher } from '../../utils/reducer/reducer'
import { CartItem, cartActionType } from './cartTypes'

export type SetIsOpen = ActionWithPayload<cartActionType.setIsOpen, boolean>

export type SetCartItems = ActionWithPayload<cartActionType.setCartItems, CartItem[]>

export const setIsOpen = withMatcher((isOpen: boolean): SetIsOpen => {
  return createAction(cartActionType.setIsOpen, isOpen)
})

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => {
  return createAction(cartActionType.setCartItems, cartItems)
})

export const handleCartItemAction = (cartItems: CartItem[], cartItem: CartItem, action: string) => {
  switch (action) {
    case 'add':
      return setCartItems(
        cartItems.map((tempCartItem) =>
          tempCartItem.id === cartItem.id
            ? { ...tempCartItem, quantity: tempCartItem.quantity + 1 }
            : tempCartItem
        )
      )
    case 'remove':
      return setCartItems(
        cartItems
          .map((tempCartItem) =>
            tempCartItem.id === cartItem.id
              ? {
                  ...tempCartItem,
                  quantity:
                    tempCartItem.quantity > 0 ? tempCartItem.quantity - 1 : 0
                }
              : tempCartItem
          )
          .filter((tempCartItem) => tempCartItem.quantity > 0)
      )
    case 'delete':
      return setCartItems(
        cartItems.filter((tempCartItem) => tempCartItem.id !== cartItem.id)
      )
    default:
      return setCartItems(cartItems)
  }
}
