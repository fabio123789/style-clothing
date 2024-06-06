import { createAction } from "../../utils/reducer/reducer";
import { categoriesActionType } from "./categoryTypes";

export const fetchCategoriesStart = () =>
  createAction(categoriesActionType.fetchCategoriesStart);

export const fetchCategoriesSuccess = (categoriesArray) =>
  createAction(categoriesActionType.fetchCategoriesSuccess, categoriesArray);

export const fetchCategoriesFailure = (error) =>
  createAction(categoriesActionType.fetchCategoriesFailed, error);
