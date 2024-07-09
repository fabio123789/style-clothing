import { CategoryItem } from "../categories/categoryTypes.ts"

export enum cartActionType {
  setIsOpen = 'cart/setIsOpen',
  setCartItems = 'cart/setCartItems'
}

export type CartItem = {
  quantity: number
} & CategoryItem