import { createAction } from "../../utils/reducer/reducer";
import { categoriesActionType } from "./categoryTypes";

export const setCategories = (categories) => {
  return createAction(categoriesActionType.setCategories, categories);
};
