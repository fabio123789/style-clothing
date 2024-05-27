import React, { useContext } from "react";
import Button from "../button/Button";
import { cartContext } from "../../contexts/cartContext";
import {
  ProductCardContainer,
  ProductCardFooter,
  ProductCardName,
  ProductCardPrice,
} from "./ProductCardStyled";

const ProductCard = ({ product = {} }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(cartContext);
  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={name} />
      <ProductCardFooter>
        <ProductCardName>{name}</ProductCardName>
        <ProductCardPrice>{price}</ProductCardPrice>
        <Button onClick={() => addItemToCart(product)} buttonType="inverted">
          Add to card
        </Button>
      </ProductCardFooter>
    </ProductCardContainer>
  );
};

export default ProductCard;
