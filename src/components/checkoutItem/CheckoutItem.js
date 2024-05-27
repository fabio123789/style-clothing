import React, { useContext } from "react";
import { cartContext } from "../../contexts/cartContext";
import {
  CheckoutItemArrow,
  CheckoutItemContainer,
  CheckoutItemImageContainer,
  CheckoutItemQuantity,
  CheckoutItemRemoveButton,
  CheckoutItemText,
  CheckoutItemValue,
} from "./CheckoutItemStyled";

const CheckoutItem = ({ cartItem }) => {
  const { handleCartItem } = useContext(cartContext);
  const { name, quantity, imageUrl, price } = cartItem;
  return (
    <CheckoutItemContainer>
      <CheckoutItemImageContainer>
        <img src={imageUrl} alt={name} />
      </CheckoutItemImageContainer>
      <CheckoutItemText>{name}</CheckoutItemText>
      <CheckoutItemQuantity>
        <CheckoutItemArrow onClick={() => handleCartItem(cartItem, "remove")}>
          {"<"}
        </CheckoutItemArrow>
        <CheckoutItemValue>{quantity}</CheckoutItemValue>
        <CheckoutItemArrow onClick={() => handleCartItem(cartItem, "add")}>
          {">"}
        </CheckoutItemArrow>
      </CheckoutItemQuantity>
      <CheckoutItemText>${price * quantity}</CheckoutItemText>
      <CheckoutItemRemoveButton
        onClick={() => handleCartItem(cartItem, "delete")}
      >
        X
      </CheckoutItemRemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
