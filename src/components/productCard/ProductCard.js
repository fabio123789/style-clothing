import React, { useContext } from "react";
import "./Product.scss";
import Button from "../button/Button";
import { cartContext } from "../../contexts/cartContext";

const ProductCard = ({ product = {} }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(cartContext);
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="product-card-footer">
        <span className="product-card-name">{name}</span>
        <span className="product-card-price">{price}</span>
        <Button onClick={() => addItemToCart(product)} buttonType="inverted">Add to card</Button>
      </div>
    </div>
  );
};

export default ProductCard;
