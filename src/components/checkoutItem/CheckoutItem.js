import React, { useContext } from "react";
import { cartContext } from "../../contexts/cartContext";
import "./CheckoutItem.scss";

const CheckoutItem = ({ cartItem }) => {
  const { handleCartItem } = useContext(cartContext);
  const { name, quantity, imageUrl, price } = cartItem;
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div
          className="arrow"
          onClick={() => handleCartItem(cartItem, "remove")}
        >
          {"<"}
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => handleCartItem(cartItem, "add")}>
          {">"}
        </div>
      </span>
      <span className="price">${price * quantity}</span>
      <div
        className="remove-button"
        onClick={() => handleCartItem(cartItem, "delete")}
      >
        X
      </div>
    </div>
  );
};

export default CheckoutItem;
