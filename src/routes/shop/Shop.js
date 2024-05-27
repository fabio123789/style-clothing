import React, { useContext } from "react";
import { productContext } from "../../contexts/productContext";
import ProductCard from "../../components/productCard/ProductCard";
import './Shop.scss'
const Shop = () => {
  const { products } = useContext(productContext);
  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Shop;
