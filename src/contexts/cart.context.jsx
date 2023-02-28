import { useState, createContext } from "react";

// the actual value you want to access
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {}
});

// the wrapper that provides the value
export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const value = {isCartOpen, setIsCartOpen};

    // you pass the state value and the setter so any child component can use it
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}