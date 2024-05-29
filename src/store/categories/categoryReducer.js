import { categoriesActionType } from "./categoryTypes";

export const categoriesInitialState = {
  categories: [],
};

export const categoriesReducer = (state = categoriesInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case categoriesActionType.setCategories:
      return { ...state, categories: payload };
    default:
      return state;
  }
};
