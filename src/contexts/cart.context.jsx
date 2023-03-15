import { useState, createContext, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
    // if found, increment quantity

    const itemInCart = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if (itemInCart) {
        return cartItems.map((cartItem) => {
            if (cartItem.id === productToAdd.id) {
                return { ...cartItem, quantity: cartItem.quantity + 1 }
            } else {
                return cartItem
            }
        });
    } else {
        return [...cartItems, { ...productToAdd, quantity: 1 }]
    }
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const updatedCart = cartItems.map((cartItem) => {
        if (cartItem.id === cartItemToRemove.id) {
            return {...cartItem, quantity: cartItem.quantity - 1}
        } else {
            return cartItem;
        }
    });
    return updatedCart.filter(cartItem => cartItem.quantity > 0);
}


const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartQuantity: 0,
    setCartQuantity: () => { },
    clearItemFromCart: () => { },
    total: 0
});

// the wrapper that provides the value
export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartQuantity, setCartQuantity] = useState(0);
    const [cartTotal, setTotal] = useState(0);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToRemove) => {
        setCartItems(clearCartItem(cartItems, cartItemToRemove));
    }

    useEffect(() => {
        const itemsInCart = cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0);
        setCartQuantity(itemsInCart);
    }, [cartItems]);

    useEffect(() => {
        const itemTotal = cartItems.reduce((accumulator, item) => accumulator + (item.quantity * item.price), 0);
        setTotal(itemTotal);
    }, [cartItems]);

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartQuantity, removeItemFromCart, clearItemFromCart, cartTotal };

    // you pass the state value and the setter so any child component can use it
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}