import "./cart-dropdown.styles.scss";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../contexts/cart.context";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
    const navigate = useNavigate();
    const { cartItems } = useContext(CartContext);

    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map((cartItem) => {
                    return <CartItem key={cartItem.id} cartItem={cartItem} />
                })}
            </div>
            <Button onClick={() => navigate("checkout")}>CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown;