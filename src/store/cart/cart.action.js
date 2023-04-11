import createAction from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

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

export const setIsCartOpen = (newVal) => {
    return createAction(CART_ACTION_TYPES.TOGGLE_CART, newVal);
}

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const clearItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = clearCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}