import { useState, createContext, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";
// the actual value you want to access
export const CategoriesContext = createContext({
    categoriesMap: [],
});

// the wrapper that provides the value
export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    // when using an async function inside useEffect, you need to create a new async function inside useEffect
    // you shouldn't pass an async function as the useEffect callback
    // async functions return promises
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    }, [])

    const value = {categoriesMap, setCategoriesMap};

    // you pass the state value and the setter so any child component can use it
    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}