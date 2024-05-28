import { createContext, useEffect, useReducer } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/Firebase";

export const categoriesMapContext = createContext({
  categoriesMap: [],
  setCategoriesMap: () => null,
});

export const categoriesActionType = {
  setCategoriesMap: "setCategoriesMap",
};

const categoriesReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case categoriesActionType.setCategoriesMap:
      return {
        ...state,
        categoriesMap: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in user Reducer`);
  }
};

const initialState = {
  categoriesMap: [],
};

export const CategoriesMapProvider = ({ children }) => {
  const [{ categoriesMap }, dispatch] = useReducer(
    categoriesReducer,
    initialState
  );
  const setCategoriesMap = (categories) => {
    dispatch({
      type: categoriesActionType.setCategoriesMap,
      payload: categories,
    });
  };
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);
  const value = { categoriesMap };
  return (
    <categoriesMapContext.Provider value={value}>
      {children}
    </categoriesMapContext.Provider>
  );
};
