import { useState, createContext } from "react";
import PRODUCTS from "./../shop-data.json";

// the actual value you want to access
export const ProductsContext = createContext({
    products: [],
});

// the wrapper that provides the value
export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(PRODUCTS);
    const value = {products, setProducts};

    // you pass the state value and the setter so any child component can use it
    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}