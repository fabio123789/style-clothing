import React, { useContext } from "react";
import Button from "../button/Button";
import "./CartStyled.js";
import { cartContext } from "../../contexts/cartContext";
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

export const CartDropdown = () => {
  const { cartItems } = useContext(cartContext);
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
  const { cartDropdown, setCartDropdown, getTotalQuantity } =
    useContext(cartContext);
  return (
    <CartIconContainer onClick={() => setCartDropdown(!cartDropdown)}>
      <CartIconShoppingIcon />
      <CartIconCount>{getTotalQuantity()}</CartIconCount>
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
