import React from "react";
import "./Shop.scss";
import { Route, Routes } from "react-router-dom";
import CategoriesPreview from "../myCategoriesPreview/CategoriesPreview";
import Category from "../category/Category";
const Shop = () => {

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
