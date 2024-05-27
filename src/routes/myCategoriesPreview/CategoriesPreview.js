import React, { useContext } from "react";
import { categoriesMapContext } from "../../contexts/categoriesMapContext";
import { CategoryPreview } from "../../components/category/Category";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(categoriesMapContext);
  return (
    <>
      {Object.keys(categoriesMap).map((title, key) => {
        const products = categoriesMap[title];
        return <CategoryPreview key={key} title={title} products={products} />;
      })}
    </>
  );
};

export default CategoriesPreview;
