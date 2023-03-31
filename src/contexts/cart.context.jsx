import { createContext, useReducer } from "react";
import createAction from "../utils/reducer/reducer.utils";

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

const CART_ACTION_TYPES = {
    "TOGGLE_CART": "SET_IS_CART_OPEN",
    "SET_CART_ITEMS": "SET_CART_ITEMS",
    "SET_CART_QUANTITY": "SET_CART_QUANTITY",
    "SET_CART_TOTAL": "SET_CART_TOTAL"
}

const cartReducer = (state, action) => {
    const {type, payload} = action;
    switch(type) {
        case "SET_IS_CART_OPEN":
            return {
                ...state,
                isCartOpen: payload
            }
        case "SET_CART_ITEMS":
            return {
                ...state,
                ...payload
            }
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartQuantity: 0,
    cartTotal: 0
}

// the wrapper that provides the value
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const {isCartOpen, cartItems, cartQuantity, cartTotal} = state;

    const setIsCartOpen = (newVal) => {
        dispatch(createAction(CART_ACTION_TYPES.TOGGLE_CART, newVal));
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (cartItemToRemove) => {
        const newCartItems = clearCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const updateCartItemsReducer = (newCartItems) => {
        const itemsInCart = newCartItems.reduce((accumulator, item) => accumulator + item.quantity, 0);
        const itemsTotal = newCartItems.reduce((accumulator, item) => accumulator + (item.quantity * item.price), 0);

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
            cartItems: newCartItems,
            cartQuantity: itemsInCart,
            cartTotal: itemsTotal
        }))
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartQuantity, removeItemFromCart, clearItemFromCart, cartTotal };

    // you pass the state value and the setter so any child component can use it
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}