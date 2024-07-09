import React, { FC } from 'react'
import Button, { buttonTypeClass } from '../button/Button.tsx'
import {
  ProductCardContainer,
  ProductCardFooter,
  ProductCardName,
  ProductCardPrice
} from './ProductCardStyled'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems } from '../../store/cart/cartSelector.ts'
import { setCartItems } from '../../store/cart/cartAction.ts'
import { CategoryItem } from '../../store/categories/categoryTypes.ts'

type ProductCardProps = {
  product: CategoryItem
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { name, price, imageUrl } = product
  const cartItems = useSelector(selectCartItems)
  const dispatch = useDispatch()

  const addCartItem = (product: CategoryItem) => {
    const foundIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === product.id
    )

    if (foundIndex >= 0) {
      return cartItems.map((cartItem, index) =>
        index === foundIndex
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    } else {
      console.log([...cartItems, { ...product, quantity: 1 }])
      return [...cartItems, { ...product, quantity: 1 }]
    }
  }

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={name} />
      <ProductCardFooter>
        <ProductCardName>{name}</ProductCardName>
        <ProductCardPrice>{price}</ProductCardPrice>
        <Button
          onClick={() => dispatch(setCartItems(addCartItem(product)))}
          buttonType={buttonTypeClass.inverted}
        >
          Add to card
        </Button>
      </ProductCardFooter>
    </ProductCardContainer>
  )
}

export default ProductCard
