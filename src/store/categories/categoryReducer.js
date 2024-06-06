import { categoriesActionType } from "./categoryTypes";

export const categoriesInitialState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (state = categoriesInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case categoriesActionType.fetchCategoriesStart:
      return { ...state, isLoading: true };
    case categoriesActionType.fetchCategoriesSuccess:
      return { ...state, categories: payload, isLoading: false };
    case categoriesActionType.fetchCategoriesFailed:
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};
