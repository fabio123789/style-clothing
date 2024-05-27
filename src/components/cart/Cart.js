import React, { useContext } from "react";
import Button from "../button/Button";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import "./Cart.scss";
import { cartContext } from "../../contexts/cartContext";

export const CartDropdown = () => {
  const { cartItems } = useContext(cartContext);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-dropdown-items">
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </div>
      <Button>Go to Check Out</Button>
    </div>
  );
};

export const CartIcon = () => {
  const { cartDropdown, setCartDropdown, getTotalQuantity } =
    useContext(cartContext);
  return (
    <div
      onClick={() => setCartDropdown(!cartDropdown)}
      className="cart-icon-container"
    >
      <ShoppingIcon className="cart-icon-shopping-icon" />
      <span className="cart-icon-count">{getTotalQuantity()}</span>
    </div>
  );
};

export const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={name} />
      <div className="cart-item-details">
        <span className="cart-item-name">{name}</span>
        <span>
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
};
