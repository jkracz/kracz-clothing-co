import "./checkout.styles.scss";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const Checkout = () => {
    const { cartItems } = useContext(CartContext);

    return (
        <div>
            {cartItems.map((cartItem) => {
                return <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            })}
        </div>
    )
}

export default Checkout;