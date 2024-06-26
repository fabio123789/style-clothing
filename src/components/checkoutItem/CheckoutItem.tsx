import React, { FC } from 'react'
import {
  CheckoutItemArrow,
  CheckoutItemContainer,
  CheckoutItemImageContainer,
  CheckoutItemQuantity,
  CheckoutItemRemoveButton,
  CheckoutItemText,
  CheckoutItemValue
} from './CheckoutItemStyled'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems } from '../../store/cart/cartSelector'
import {
  handleCartItemAction
} from '../../store/cart/cartAction'
import { CartItem } from '../../store/cart/cartTypes'

type CheckoutItemProps = {
  cartItem: CartItem
}

const CheckoutItem: FC<CheckoutItemProps> = ({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem
  const cartItems = useSelector(selectCartItems)
  const dispatch = useDispatch()
  const handleAction = (cartItem: CartItem, action: string) =>
    dispatch(handleCartItemAction(cartItems, cartItem, action))
  return (
    <CheckoutItemContainer>
      <CheckoutItemImageContainer>
        <img src={imageUrl} alt={name} />
      </CheckoutItemImageContainer>
      <CheckoutItemText>{name}</CheckoutItemText>
      <CheckoutItemQuantity>
        <CheckoutItemArrow onClick={() => handleAction(cartItem, 'remove')}>
          {'<'}
        </CheckoutItemArrow>
        <CheckoutItemValue>{quantity}</CheckoutItemValue>
        <CheckoutItemArrow onClick={() => handleAction(cartItem, 'add')}>
          {'>'}
        </CheckoutItemArrow>
      </CheckoutItemQuantity>
      <CheckoutItemText>${price * quantity}</CheckoutItemText>
      <CheckoutItemRemoveButton
        onClick={() => handleAction(cartItem, 'delete')}
      >
        X
      </CheckoutItemRemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem
