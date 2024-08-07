import React, { useEffect, useState } from "react";
import "./Category.scss";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/productCard/ProductCard.tsx";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/categorySelector.ts";

type CategoryRouteParams = {
  category: string
}

const Category = () => {
  const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
  const categoriesMap = useSelector(selectCategoriesMap);

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
