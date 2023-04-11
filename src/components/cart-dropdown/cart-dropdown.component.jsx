import { CartDropdownContainer, CartItems, EmptyMessage } from "./cart-dropdown.styles.jsx";

import { useNavigate } from "react-router-dom";

import { selectCartItems } from "../../store/cart/cart.selector.js";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { useSelector } from "react-redux";

const CartDropdown = () => {
    const navigate = useNavigate();
    const cartItems = useSelector(selectCartItems);

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