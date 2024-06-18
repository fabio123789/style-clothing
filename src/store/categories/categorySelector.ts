import { createSelector } from "reselect";
import { CategoriesState } from "./categoryReducer";
import { CategoryMap } from './categoryTypes';
import { RootState } from "../Store";

const selectCategoryReducer = (state: RootState): CategoriesState => state.categories;

const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesReducer) => categoriesReducer.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)
);
