import React from "react";
import "./Product.scss";
import Button from "../button/Button";

const ProductCard = ({ product = {} }) => {
  const { name, price, imageUrl } = product;
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="product-card-footer">
        <span className="product-card-name">{name}</span>
        <span className="product-card-price">{price}</span>
        <Button buttonType="inverted">Add to card</Button>
      </div>
    </div>
  );
};

export default ProductCard;
