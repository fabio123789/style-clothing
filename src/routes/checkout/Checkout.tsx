import React from "react";
import CheckoutItem from "../../components/checkoutItem/CheckoutItem.tsx";
import "./Checkout.scss";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectTotalValue,
} from "../../store/cart/cartSelector.ts";
import PaymentForm from "../../components/paymentForm/PaymentForm.tsx";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const totalvalue = useSelector(selectTotalValue);
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
      <div className="total">TOTAL: ${totalvalue}</div>
      <PaymentForm />
    </div>
  );
};

export default Checkout;
