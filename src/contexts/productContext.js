import { createContext, useState } from "react";
import DATASHOP from "../shop-data.json";

export const productContext = createContext({
  products: [],
  setProducts: () => null,
});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(DATASHOP);
  const value = { products, setProducts };
  return (
    <productContext.Provider value={value}>{children}</productContext.Provider>
  );
};
