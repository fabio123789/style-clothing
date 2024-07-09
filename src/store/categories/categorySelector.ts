import { createSelector } from "reselect";
import { CategoriesState } from "./categoryReducer.ts";
import { CategoryMap } from './categoryTypes.ts';
import { RootState } from "../Store.ts";

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
