import "./checkout-item.styles.scss";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const { addItemToCart, removeItemFromCart } = useContext(CartContext);
    return (
        <div>
            <img src={imageUrl} alt={name} />
            <span>{name}</span>
            <span>{quantity}</span>
            <span>{price}</span>
            <button onClick={() => { addItemToCart(cartItem) }}>INCREMENT</button>
            <button onClick={() => { removeItemFromCart(cartItem) }}>DECREMENT</button>
        </div>
    )
}

export default CheckoutItem;