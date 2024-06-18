import { CategoryItem } from "../categories/categoryTypes"

export enum cartActionType {
  setIsOpen = 'cart/setIsOpen',
  setCartItems = 'cart/setCartItems'
}

export type CartItem = {
  quantity: number
} & CategoryItem