import React, { useContext } from "react";
import { cartContext } from "../../contexts/cartContext";
import CheckoutItem from "../../components/checkoutItem/CheckoutItem";
import "./Checkout.scss";

const Checkout = () => {
  const { cartItems, getTotalValue } = useContext(cartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block ">
          <span>Product</span>
        </div>
        <div className="header-block ">
          <span>Description</span>
        </div>
        <div className="header-block ">
          <span>Quantity</span>
        </div>
        <div className="header-block ">
          <span>Price</span>
        </div>
        <div className="header-block ">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem, key) => (
        <CheckoutItem key={key} cartItem={cartItem} />
      ))}
      <div className="total">TOTAL: ${getTotalValue()}</div>
    </div>
  );
};

export default Checkout;
