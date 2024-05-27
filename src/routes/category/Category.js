import React, { useContext, useEffect, useState } from "react";
import "./Category.scss";
import { useParams } from "react-router-dom";
import { categoriesMapContext } from "../../contexts/categoriesMapContext";
import ProductCard from "../../components/productCard/ProductCard";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(categoriesMapContext);
  const [products, setProducts] = useState(categoriesMap[category]);
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);
  return (
    <>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </>
  );
};

export default Category;
