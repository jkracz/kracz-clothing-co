import { useState, createContext } from "react";

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
    // if found, increment quantity

    const itemInCart = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if (itemInCart) {
        return cartItems.map((cartItem) => {
            if (cartItem.id === productToAdd.id) {
                return {...cartItem, quantity: cartItem.quantity + 1}
            } else {
                return cartItem
            }
        });
    } else {
        return [...cartItems, {...productToAdd, quantity: 1}]
    }
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {}
});

// the wrapper that provides the value
export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems};

    // you pass the state value and the setter so any child component can use it
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}