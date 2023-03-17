import { CartDropdownContainer, CartItems, EmptyMessage } from "./cart-dropdown.styles.jsx";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../contexts/cart.context";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
    const navigate = useNavigate();
    const { cartItems } = useContext(CartContext);

    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? (
                        cartItems.map((cartItem) => {
                            return <CartItem key={cartItem.id} cartItem={cartItem} />
                        })
                    ) : (
                        <EmptyMessage>Your cart is empty</EmptyMessage>
                    )
                }
            </CartItems>
            <Button onClick={() => navigate("checkout")}>CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;