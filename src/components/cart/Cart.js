import React, { useContext } from "react";
import Button from "../button/Button";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import "./Cart.scss";
import { cartContext } from "../../contexts/cartContext";

export const CartDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-dropdown-items"></div>
      <Button>Go to Check Out</Button>
    </div>
  );
};

export const CartIcon = () => {
  const { cartDropdown, setCartDropdown } = useContext(cartContext);

  return (
    <div
      onClick={() => setCartDropdown(!cartDropdown)}
      className="cart-icon-container"
    >
      <ShoppingIcon className="cart-icon-shopping-icon" />
      <span className="cart-icon-count">10</span>
    </div>
  );
};
