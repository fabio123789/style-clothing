import React from "react";
import Button from "../button/Button";
import "./CartStyled.js";
import { useNavigate } from "react-router-dom";
import {
  CartDropdownContainer,
  CartDropdownItemsContainer,
  CartIconContainer,
  CartIconCount,
  CartIconShoppingIcon,
  CartItemContainer,
  CartItemDetailsContainer,
  CartItemName,
  EmptyMessage,
} from "./CartStyled.js";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartCount,
  selectCartItems,
  selectIsOpen,
} from "../../store/cart/cartSelector.js";
import { setIsOpen } from "../../store/cart/cartAction.js";

export const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();
  return (
    <CartDropdownContainer>
      <CartDropdownItemsContainer>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <EmptyMessage>Your cart is Empty!</EmptyMessage>
        )}
      </CartDropdownItemsContainer>
      <Button onClick={() => navigate("/checkout")}>Check Out</Button>
    </CartDropdownContainer>
  );
};

export const CartIcon = () => {
  const isOpen = useSelector(selectIsOpen);
  const cartCount = useSelector(selectCartCount)
  const dispatch = useDispatch();

  return (
    <CartIconContainer onClick={() => dispatch(setIsOpen(!isOpen))}>
      <CartIconShoppingIcon />
      <CartIconCount>{cartCount}</CartIconCount>
    </CartIconContainer>
  );
};

export const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={name} />
      <CartItemDetailsContainer>
        <CartItemName>{name}</CartItemName>
        <span>
          {quantity} x ${price}
        </span>
      </CartItemDetailsContainer>
    </CartItemContainer>
  );
};
