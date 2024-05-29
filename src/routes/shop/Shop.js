import React, { useEffect } from "react";
import "./Shop.scss";
import { Route, Routes } from "react-router-dom";
import CategoriesPreview from "../myCategoriesPreview/CategoriesPreview";
import Category from "../category/Category";
import { getCategoriesAndDocuments } from "../../utils/firebase/Firebase";
import { setCategories } from "../../store/categories/categoryAction";
import { useDispatch } from "react-redux";

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments("categories");
      dispatch(setCategories(categoriesArray));
    };
    getCategoriesMap();
  }, []);
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
