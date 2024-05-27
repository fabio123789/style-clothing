import { createContext, useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/Firebase";

export const categoriesMapContext = createContext({
  categoriesMap: [],
  setCategoriesMap: () => null,
});

export const CategoriesMapProvider = ({ children }) => {
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);
  const [categoriesMap, setCategoriesMap] = useState({});
  const value = { categoriesMap };
  return (
    <categoriesMapContext.Provider value={value}>
      {children}
    </categoriesMapContext.Provider>
  );
};
